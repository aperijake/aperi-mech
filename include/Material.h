#pragma once

#include <yaml-cpp/yaml.h>

#include <Eigen/Dense>
#include <cmath>
#include <memory>
#include <string>

#include "FieldData.h"
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "MathUtils.h"

namespace aperi {

KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 6, 1> ComputeGreenLagrangeStrainTensorVoigt(const Eigen::Matrix3d& displacement_gradient) {
    // Compute the Green Lagrange strain tensor, Voigt Notation.
    // E = 0.5 * (H + H^T + H^T * H)
    Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
    green_lagrange_strain_tensor_voigt << displacement_gradient(0, 0) + 0.5 * displacement_gradient.col(0).dot(displacement_gradient.col(0)),
        displacement_gradient(1, 1) + 0.5 * displacement_gradient.col(1).dot(displacement_gradient.col(1)),
        displacement_gradient(2, 2) + 0.5 * displacement_gradient.col(2).dot(displacement_gradient.col(2)),
        0.5 * (displacement_gradient(1, 2) + displacement_gradient(2, 1) + displacement_gradient.col(1).dot(displacement_gradient.col(2))),
        0.5 * (displacement_gradient(0, 2) + displacement_gradient(2, 0) + displacement_gradient.col(0).dot(displacement_gradient.col(2))),
        0.5 * (displacement_gradient(0, 1) + displacement_gradient(1, 0) + displacement_gradient.col(0).dot(displacement_gradient.col(1)));

    return green_lagrange_strain_tensor_voigt;
}

/**
 * @brief Enum representing the type of material.
 */
enum MaterialType {
    ELASTIC,        /**< Elastic material type */
    LINEAR_ELASTIC, /**< Linear elastic material type */
    NEO_HOOKEAN,    /**< Neo-Hookean material type */
    PLASTIC,        /**< Plastic material type */
    NONE            /**< No material type */
};

/**
 * @brief Struct representing the properties of a material.
 */
struct MaterialProperties {
    MaterialType material_type = MaterialType::NONE; /**< The type of material */
    double density;                                  /**< The density of the material */
    std::map<std::string, double> properties;        /**< Additional properties of the material */
};

/**
 * @brief Base class for materials.
 */
class Material {
   public:
    /**
     * @brief Constructor for Material class.
     * @param material_properties The properties of the material.
     */
    Material(std::shared_ptr<MaterialProperties> material_properties) : m_material_properties(material_properties) {}

    virtual ~Material() = default;

    /**
     * @brief Get the density of the material.
     * @return The density of the material.
     */
    double GetDensity() const {
        return m_material_properties->density;
    }

    /**
     * @brief Get the material properties.
     * @return The material properties.
     */
    std::shared_ptr<MaterialProperties> GetMaterialProperties() const {
        return m_material_properties;
    }

    /**
     * @brief Functor for getting the stress of the material.
     * @param displacement_gradient The displacement gradient of the material.
     * @return The stress of the material.
     */
    struct StressFunctor {
        KOKKOS_FUNCTION
        virtual void operator()(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& displacement_gradient_np1,
                                const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_n,
                                const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* deformation_gradient_dot,
                                const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                                Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                                double timestep,
                                Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const = 0;

        KOKKOS_INLINE_FUNCTION
        bool HasState() const {
            return false;
        }

        KOKKOS_INLINE_FUNCTION
        bool NeedsDeformationGradientDot() const {
            return false;
        }

        KOKKOS_INLINE_FUNCTION
        bool NeedsDisplacementGradientOld() const {
            return false;
        }
    };

    /**
     * @brief Get the stress functor of the material.
     * @return The stress functor of the material.
     */
    StressFunctor* GetStressFunctor() {
        return m_stress_functor;
    }

    /**
     * @brief Get the field data of the material.
     * @return The field data of the material.
     */
    virtual std::vector<aperi::FieldData> GetFieldData() {
        return {};
    }

    virtual bool HasState() {
        return m_stress_functor->HasState();
    }

   protected:
    std::shared_ptr<MaterialProperties> m_material_properties; /**< The properties of the material */
    StressFunctor* m_stress_functor;                           /**< The stress functor of the elastic material */
};

/**
 * @brief Derived class for linear elastic materials.
 */
class LinearElasticMaterial : public Material {
   public:
    /**
     * @brief Constructor for LinearElasticMaterial class.
     * @param material_properties The properties of the elastic material.
     */
    LinearElasticMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~LinearElasticMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Create the stress functor for the elastic material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(LinearElasticGetStressFunctor));
        double lambda = m_material_properties->properties.at("lambda");
        double two_mu = m_material_properties->properties.at("two_mu");
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int&) {
                new ((LinearElasticGetStressFunctor*)stress_functor) LinearElasticGetStressFunctor(lambda, two_mu);
            });
        m_stress_functor = stress_functor;
    }

    /**
     * @brief Destroy the stress functor for the elastic material. Potentially on the device.
     */
    void DestroyStressFunctor() {
        auto stress_functor = m_stress_functor;
        Kokkos::parallel_for(
            "DestroyObjects", 1, KOKKOS_LAMBDA(const int&) {
                stress_functor->~StressFunctor();
            });
        Kokkos::kokkos_free(m_stress_functor);
        m_stress_functor = nullptr;
    }

    /**
     * @brief Functor for getting the stress of the linear elastic material.
     * @param displacement_gradient The displacement gradient of the linear elastic material.
     * @return The stress of the elastic material.
     */
    struct LinearElasticGetStressFunctor : public StressFunctor {
        KOKKOS_FUNCTION
        LinearElasticGetStressFunctor(double lambda, double two_mu) : m_lambda(lambda), m_two_mu(two_mu) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& displacement_gradient_np1,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_n,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* deformation_gradient_dot,
                        const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                        Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                        double timestep,
                        Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            const Eigen::Matrix<double, 3, 3> I = Eigen::Matrix<double, 3, 3>::Identity();

            // Compute the strain tensor
            const Eigen::Matrix<double, 3, 3> epsilon = 0.5 * (displacement_gradient_np1 + displacement_gradient_np1.transpose());
            const double tr_epsilon = epsilon.trace();

            // Compute the Cauchy stress tensor (same as PK1 for small strains)
            pk1_stress = m_lambda * tr_epsilon * I + m_two_mu * epsilon;
        }

       private:
        double m_lambda; /**< The lambda parameter of the elastic material */
        double m_two_mu; /**< The two mu parameter of the elastic material */
    };
};

/**
 * @brief Derived class for elastic materials.
 */
class ElasticMaterial : public Material {
   public:
    /**
     * @brief Constructor for ElasticMaterial class.
     * @param material_properties The properties of the elastic material.
     */
    ElasticMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~ElasticMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Create the stress functor for the elastic material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(ElasticGetStressFunctor));
        double lambda = m_material_properties->properties.at("lambda");
        double two_mu = m_material_properties->properties.at("two_mu");
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int&) {
                new ((ElasticGetStressFunctor*)stress_functor) ElasticGetStressFunctor(lambda, two_mu);
            });
        m_stress_functor = stress_functor;
    }

    /**
     * @brief Destroy the stress functor for the elastic material. Potentially on the device.
     */
    void DestroyStressFunctor() {
        auto stress_functor = m_stress_functor;
        Kokkos::parallel_for(
            "DestroyObjects", 1, KOKKOS_LAMBDA(const int&) {
                stress_functor->~StressFunctor();
            });
        Kokkos::kokkos_free(m_stress_functor);
        m_stress_functor = nullptr;
    }

    /**
     * @brief Functor for getting the stress of the elastic material.
     * @param displacement_gradient The displacement gradient of the elastic material.
     * @return The stress of the elastic material.
     */
    struct ElasticGetStressFunctor : public StressFunctor {
        KOKKOS_FUNCTION
        ElasticGetStressFunctor(double lambda, double two_mu) : m_lambda(lambda), m_two_mu(two_mu) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& displacement_gradient_np1,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_n,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* deformation_gradient_dot,
                        const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                        Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                        double timestep,
                        Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            // Compute the Green Lagrange strain tensor. E = 0.5 * (H + H^T + H^T * H)
            const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (displacement_gradient_np1 + displacement_gradient_np1.transpose() + displacement_gradient_np1.transpose() * displacement_gradient_np1);

            // Compute the second Piola-Kirchhoff stress
            Eigen::Matrix3d pk2_stress = m_two_mu * green_lagrange_strain_tensor;
            pk2_stress.diagonal().array() += m_lambda * green_lagrange_strain_tensor.trace();

            // Compute the 1st Piola-Kirchhoff stress, P = F * S = (I + displacement_gradient) * pk2_stress
            pk1_stress = (Eigen::Matrix3d::Identity() + displacement_gradient_np1) * pk2_stress;
        }

       private:
        double m_lambda; /**< The lambda parameter of the elastic material */
        double m_two_mu; /**< The two mu parameter of the elastic material */
    };
};

/**
 * @brief Derived class for the Neo-Hookean material.
 */
class NeoHookeanMaterial : public Material {
   public:
    /**
     * @brief Constructor for NeoHookeanMaterial class.
     * @param material_properties The properties
     */
    NeoHookeanMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~NeoHookeanMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Create the stress functor for the neo-Hookean material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(NeoHookeanGetStressFunctor));
        double lambda = m_material_properties->properties.at("lambda");
        double two_mu = m_material_properties->properties.at("two_mu");
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int&) {
                new ((NeoHookeanGetStressFunctor*)stress_functor) NeoHookeanGetStressFunctor(lambda, two_mu);
            });
        m_stress_functor = stress_functor;
    }

    /**
     * @brief Destroy the stress functor for the elastic material. Potentially on the device.
     */
    void DestroyStressFunctor() {
        auto stress_functor = m_stress_functor;
        Kokkos::parallel_for(
            "DestroyObjects", 1, KOKKOS_LAMBDA(const int&) {
                stress_functor->~StressFunctor();
            });
        Kokkos::kokkos_free(m_stress_functor);
        m_stress_functor = nullptr;
    }

    /**
     * @brief Functor for getting the 1st Piola-Kirchhoff stress.
     * @param displacement_gradient The displacement gradient.
     * @return The 1st Piola-Kirchhoff stress.
     */
    struct NeoHookeanGetStressFunctor : public StressFunctor {
        KOKKOS_FUNCTION
        NeoHookeanGetStressFunctor(double lambda, double two_mu) : m_lambda(lambda), m_mu(two_mu / 2.0) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& displacement_gradient_np1,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_n,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* deformation_gradient_dot,
                        const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                        Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                        double timestep,
                        Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            // Left Cauchy-Green tensor - I
            const Eigen::Matrix3d B_minus_I = displacement_gradient_np1 * displacement_gradient_np1.transpose() + displacement_gradient_np1.transpose() + displacement_gradient_np1;
            const double J_minus_1 = aperi::DetApIm1(displacement_gradient_np1);
            const Eigen::Matrix3d I = Eigen::Matrix3d::Identity();

            // Kirchhoff stress
            const Eigen::Matrix3d tau = m_lambda * std::log1p(J_minus_1) * I + m_mu * B_minus_I;

            // Deformation gradient
            const Eigen::Matrix3d F = displacement_gradient_np1 + I;

            // First Piola-Kirchhoff stress
            pk1_stress = tau * InvertMatrix(F).transpose();
        }

       private:
        double m_lambda; /**< The lambda parameter */
        double m_mu;     /**< The mu parameter */
    };
};

/**
 * @brief Derived class for the Plastic material.
 * @note This is small strain plasticity.
 */
class PlasticMaterial : public Material {
   public:
    /**
     * @brief Constructor for PlasticMaterial class.
     * @param material_properties The properties
     */
    PlasticMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~PlasticMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Get the field data of the material.
     * @return The field data of the material.
     */
    std::vector<aperi::FieldData> GetFieldData() override {
        std::vector<double> initial_state(1, 0.0);
        return {FieldData("state", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 2, 1, initial_state)};
    }

    bool HasState() override {
        return true;
    }

    /**
     * @brief Create the stress functor for the plastic material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(PlasticGetStressFunctor));
        double lambda = m_material_properties->properties.at("lambda");
        double two_mu = m_material_properties->properties.at("two_mu");
        double yield_stress = m_material_properties->properties.at("yield_stress");
        double hardening_modulus = m_material_properties->properties.at("hardening_modulus");
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int&) {
                new ((PlasticGetStressFunctor*)stress_functor) PlasticGetStressFunctor(lambda, two_mu, yield_stress, hardening_modulus);
            });
        m_stress_functor = stress_functor;
    }

    /**
     * @brief Destroy the stress functor for the plastic material. Potentially on the device.
     */
    void DestroyStressFunctor() {
        auto stress_functor = m_stress_functor;
        Kokkos::parallel_for(
            "DestroyObjects", 1, KOKKOS_LAMBDA(const int&) {
                stress_functor->~StressFunctor();
            });
        Kokkos::kokkos_free(m_stress_functor);
        m_stress_functor = nullptr;
    }

    /**
     * @brief Functor for getting the 1st Piola-Kirchhoff stress.
     * @param displacement_gradient The displacement gradient.
     * @return The 1st Piola-Kirchhoff stress.
     */
    struct PlasticGetStressFunctor : public StressFunctor {
        KOKKOS_FUNCTION
        PlasticGetStressFunctor(double lambda, double two_mu, double yield_stress, double hardening_modulus) : m_lambda(lambda), m_mu(two_mu / 2.0), m_yield_stress(yield_stress), m_hardening_modulus(hardening_modulus) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& displacement_gradient_np1,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_n,
                        const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* deformation_gradient_dot,
                        const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                        Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                        double timestep,
                        Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            // in "Computational Methods for Plasticity", page 260, box 7.5

            // Get the plastic strain state
            double plastic_strain = state_old->coeff(0);

            // Identity matrix
            const Eigen::Matrix3d I = Eigen::Matrix3d::Identity();

            // Compute the small strain tensor
            const Eigen::Matrix<double, 3, 3> strain_elastic = 0.5 * (displacement_gradient_np1 + displacement_gradient_np1.transpose());
            const double trace_strain_elastic = strain_elastic.trace();

            // Bulk modulus
            const double bulk_modulus = m_lambda + 2.0 * m_mu / 3.0;

            // Compute the hydrostatic pressure
            const double pressure = bulk_modulus * trace_strain_elastic;

            // Compute the deviatoric stress
            Eigen::Matrix<double, 3, 3> deviatoric_stress = 2.0 * m_mu * (strain_elastic - (1.0 / 3.0) * trace_strain_elastic * I);

            Eigen::Matrix<double, 3, 3> eta = deviatoric_stress;  // - state.beta; // but beta is zero for now

            double eta_norm = eta.norm();

            const double q = sqrt(3.0 / 2.0) * eta_norm;

            const double phi = q - (m_yield_stress + m_hardening_modulus * plastic_strain);

            if (phi > 0.0) {
                const double plastic_strain_inc = phi / (3.0 * m_mu + m_hardening_modulus);  // should be 3 * G + m_hardening_modulus + m_kinematic_hardening_modulus, but kinematic hardening is zero for now

                deviatoric_stress -= (sqrt(6.0) * m_mu * plastic_strain_inc / eta_norm) * eta;

                plastic_strain += plastic_strain_inc;

                // If kinematic hardening is present, would have
                // beta += sqrt(2.0 / 3.0) * m_kinematic_hardening_modulus * plastic_strain_inc * eta;
            }

            // Update the state
            state_new->coeffRef(0) = plastic_strain;

            pk1_stress = (deviatoric_stress + pressure * I);
        }

       private:
        double m_lambda;            /**< The lambda parameter */
        double m_mu;                /**< The mu parameter */
        double m_yield_stress;      /**< The yield stress */
        double m_hardening_modulus; /**< The hardening modulus */
    };
};

/**
 * @brief Create a material based on the given YAML node.
 * @param material_node The YAML node representing the material.
 * @return A shared pointer to the created material, or nullptr if the material type is not defined.
 */
inline std::shared_ptr<Material> CreateMaterial(YAML::Node& material_node) {
    auto material_properties = std::make_shared<MaterialProperties>();

    if (material_node["elastic"].IsDefined()) {
        YAML::Node elastic_node = material_node["elastic"];
        material_properties->material_type = MaterialType::ELASTIC;
        material_properties->density = elastic_node["density"].as<double>();
        double poissons_ratio = elastic_node["poissons_ratio"].as<double>();
        double youngs_modulus = elastic_node["youngs_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        return std::make_shared<ElasticMaterial>(material_properties);

    } else if (material_node["linear_elastic"].IsDefined()) {
        YAML::Node elastic_node = material_node["linear_elastic"];
        material_properties->material_type = MaterialType::LINEAR_ELASTIC;
        material_properties->density = elastic_node["density"].as<double>();
        double poissons_ratio = elastic_node["poissons_ratio"].as<double>();
        double youngs_modulus = elastic_node["youngs_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        return std::make_shared<LinearElasticMaterial>(material_properties);

    } else if (material_node["neo_hookean"].IsDefined()) {
        YAML::Node neo_hookean_node = material_node["neo_hookean"];
        material_properties->material_type = MaterialType::NEO_HOOKEAN;
        material_properties->density = neo_hookean_node["density"].as<double>();
        double poissons_ratio = neo_hookean_node["poissons_ratio"].as<double>();
        double youngs_modulus = neo_hookean_node["youngs_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        return std::make_shared<NeoHookeanMaterial>(material_properties);

    } else if (material_node["plastic"].IsDefined()) {
        YAML::Node plastic_node = material_node["plastic"];
        material_properties->material_type = MaterialType::PLASTIC;
        material_properties->density = plastic_node["density"].as<double>();
        double poissons_ratio = plastic_node["poissons_ratio"].as<double>();
        double youngs_modulus = plastic_node["youngs_modulus"].as<double>();
        double yield_stress = plastic_node["yield_stress"].as<double>();
        double hardening_modulus = plastic_node["hardening_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        material_properties->properties.emplace("yield_stress", yield_stress);
        material_properties->properties.emplace("hardening_modulus", hardening_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        return std::make_shared<PlasticMaterial>(material_properties);
    } else {
        return nullptr;
    }
}

}  // namespace aperi
