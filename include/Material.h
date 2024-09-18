#pragma once

#include <yaml-cpp/yaml.h>

#include <Eigen/Dense>
#include <cmath>
#include <memory>
#include <string>

#include "Kokkos_Core.hpp"
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
    ELASTIC,     /**< Elastic material type */
    NEO_HOOKEAN, /**< Neo-Hookean material type */
    NONE         /**< No material type */
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
        virtual ~StressFunctor() = default;
        KOKKOS_FUNCTION
        virtual Eigen::Matrix<double, 3, 3> operator()(const Eigen::Matrix<double, 3, 3>& displacement_gradient) const = 0;
    };

    /**
     * @brief Get the stress functor of the material.
     * @return The stress functor of the material.
     */
    StressFunctor* GetStressFunctor() {
        return m_stress_functor;
    }

    /**
     * @brief Get the 1st Piola-Kirchhoff stress of the material.
     * @param displacement_gradient The displacement gradient of the material.
     * @return The 1st Piola-Kirchhoff stress of the material.
     */
    virtual Eigen::Matrix<double, 3, 3> GetStress(const Eigen::Matrix<double, 3, 3>& displacement_gradient) const = 0;

   protected:
    std::shared_ptr<MaterialProperties> m_material_properties; /**< The properties of the material */
    StressFunctor* m_stress_functor;                           /**< The stress functor of the elastic material */
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
        Eigen::Matrix<double, 3, 3> operator()(const Eigen::Matrix<double, 3, 3>& displacement_gradient) const override {
            // Compute the Green Lagrange strain tensor, Voigt Notation.
            const Eigen::Matrix<double, 6, 1> green_lagrange_strain = ComputeGreenLagrangeStrainTensorVoigt(displacement_gradient);

            // Compute the 2nd Piola-Kirchhoff stress
            Eigen::Matrix<double, 3, 3> pk2_stress;
            const double lambda_trace_strain = m_lambda * (green_lagrange_strain(0) + green_lagrange_strain(1) + green_lagrange_strain(2));
            pk2_stress(0, 0) = lambda_trace_strain + m_two_mu * green_lagrange_strain(0);
            pk2_stress(1, 1) = lambda_trace_strain + m_two_mu * green_lagrange_strain(1);
            pk2_stress(2, 2) = lambda_trace_strain + m_two_mu * green_lagrange_strain(2);
            pk2_stress(1, 2) = pk2_stress(2, 1) = m_two_mu * green_lagrange_strain(3);
            pk2_stress(0, 2) = pk2_stress(2, 0) = m_two_mu * green_lagrange_strain(4);
            pk2_stress(0, 1) = pk2_stress(1, 0) = m_two_mu * green_lagrange_strain(5);

            // Compute the 1st Piola-Kirchhoff stress
            const Eigen::Matrix<double, 3, 3> F = displacement_gradient + Eigen::Matrix<double, 3, 3>::Identity();
            const Eigen::Matrix<double, 3, 3> pk1_stress = F * pk2_stress;
            return pk1_stress;
        }

       private:
        double m_lambda; /**< The lambda parameter of the elastic material */
        double m_two_mu; /**< The two mu parameter of the elastic material */
    };

    /**
     * @brief Get the 1st Piola-Kirchhoff stress
     * @param displacement_gradient The displacement gradient
     * @return The 1st Piola-Kirchhoff stress
     */
    Eigen::Matrix<double, 3, 3> GetStress(const Eigen::Matrix<double, 3, 3>& displacement_gradient) const override {
        return m_stress_functor->operator()(displacement_gradient);
    }
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
        Eigen::Matrix<double, 3, 3> operator()(const Eigen::Matrix<double, 3, 3>& displacement_gradient) const override {
            // Left Cauchy-Green tensor - I
            const Eigen::Matrix3d B_minus_I = displacement_gradient * displacement_gradient.transpose() + displacement_gradient.transpose() + displacement_gradient;
            const double J_minus_1 = aperi::DetApIm1(displacement_gradient);
            const Eigen::Matrix3d I = Eigen::Matrix3d::Identity();

            // Kirchhoff stress
            const Eigen::Matrix3d tau = m_lambda * std::log1p(J_minus_1) * I + m_mu * B_minus_I;

            // Deformation gradient
            const Eigen::Matrix3d F = displacement_gradient + I;

            // First Piola-Kirchhoff stress
            Eigen::Matrix<double, 3, 3> pk1_stress = tau * InvertMatrix(F).transpose();
            return pk1_stress;
        }

       private:
        double m_lambda; /**< The lambda parameter */
        double m_mu;     /**< The mu parameter */
    };

    /**
     * @brief Get the 1st Piola-Kirchhoff stress
     * @param displacement_gradient The displacement gradient
     * @return The 1st Piola-Kirchhoff stress
     */
    Eigen::Matrix<double, 3, 3> GetStress(const Eigen::Matrix<double, 3, 3>& displacement_gradient) const override {
        return m_stress_functor->operator()(displacement_gradient);
    }
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
    } else {
        return nullptr;
    }
}

}  // namespace aperi
