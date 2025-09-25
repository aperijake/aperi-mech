#pragma once

#include <Eigen/Dense>
#include <cmath>
#include <limits>
#include <memory>
#include <stdexcept>
#include <string>

#include "FieldData.h"
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "MathUtils.h"

namespace aperi {

/**
 * @brief Enum representing the type of material.
 */
enum MaterialType {
    ELASTIC,                 /**< Elastic material type */
    LINEAR_ELASTIC,          /**< Linear elastic material type */
    NEO_HOOKEAN,             /**< Neo-Hookean material type */
    NEO_HOOKEAN_WITH_DAMAGE, /**< Neo-Hookean material type with damage */
    PLASTIC,                 /**< Plastic material type */
    DRUCKER_PRAGER,          /**< Drucker-Prager material type */
    POWER_LAW_CREEP,         /**< Power Law creep material type */
    NONE                     /**< No material type */
};

/**
 * @brief Enum representing the state of material separation.
 */
enum class MaterialSeparationState {
    INTACT,
    FAILED,
    JUST_FAILED
};

struct LinearElasticProperties {
    double shear_modulus = std::numeric_limits<double>::quiet_NaN();   // μ or G
    double lambda = std::numeric_limits<double>::quiet_NaN();          // λ (1st Lamé)
    double youngs_modulus = std::numeric_limits<double>::quiet_NaN();  // E
    double poisson_ratio = std::numeric_limits<double>::quiet_NaN();   // ν
    double bulk_modulus = std::numeric_limits<double>::quiet_NaN();    // K

    void CompleteProperties() {
        const int defined_count = [&] {
            int count = 0;
            if (!std::isnan(shear_modulus)) count++;
            if (!std::isnan(lambda)) count++;
            if (!std::isnan(youngs_modulus)) count++;
            if (!std::isnan(poisson_ratio)) count++;
            if (!std::isnan(bulk_modulus)) count++;
            return count;
        }();

        if (defined_count != 2) {
            throw std::runtime_error("Exactly two properties must be defined. Defined: " + std::to_string(defined_count));
        }

        // Case 1: K and E
        if (!std::isnan(bulk_modulus) && !std::isnan(youngs_modulus)) {
            poisson_ratio = (3 * bulk_modulus - youngs_modulus) / (6 * bulk_modulus);
            shear_modulus = youngs_modulus / (2 * (1 + poisson_ratio));
            lambda = (youngs_modulus * poisson_ratio) / ((1 + poisson_ratio) * (1 - 2 * poisson_ratio));
        }
        // Case 2: K and λ
        else if (!std::isnan(bulk_modulus) && !std::isnan(lambda)) {
            shear_modulus = (3 * (bulk_modulus - lambda)) / 2;
            poisson_ratio = lambda / (2 * (lambda + shear_modulus));
            youngs_modulus = 2 * shear_modulus * (1 + poisson_ratio);
        }
        // Case 3: K and μ
        else if (!std::isnan(bulk_modulus) && !std::isnan(shear_modulus)) {
            lambda = bulk_modulus - (2.0 / 3.0) * shear_modulus;
            poisson_ratio = lambda / (2 * (lambda + shear_modulus));
            youngs_modulus = 2 * shear_modulus * (1 + poisson_ratio);
        }
        // Case 4: K and ν
        else if (!std::isnan(bulk_modulus) && !std::isnan(poisson_ratio)) {
            youngs_modulus = 3 * bulk_modulus * (1 - 2 * poisson_ratio);
            shear_modulus = youngs_modulus / (2 * (1 + poisson_ratio));
            lambda = (youngs_modulus * poisson_ratio) / ((1 + poisson_ratio) * (1 - 2 * poisson_ratio));
        }
        // Case 5: E and λ
        else if (!std::isnan(youngs_modulus) && !std::isnan(lambda)) {
            const double a = 2 * lambda;
            const double b = lambda + youngs_modulus;
            const double c = -lambda;
            const double discriminant = b * b - 4 * a * c;
            poisson_ratio = (-b + std::sqrt(discriminant)) / (2 * a);
            shear_modulus = youngs_modulus / (2 * (1 + poisson_ratio));
            bulk_modulus = lambda + (2.0 / 3.0) * shear_modulus;
        }
        // Case 6: E and μ
        else if (!std::isnan(youngs_modulus) && !std::isnan(shear_modulus)) {
            poisson_ratio = (youngs_modulus / (2 * shear_modulus)) - 1;
            lambda = (youngs_modulus * poisson_ratio) / ((1 + poisson_ratio) * (1 - 2 * poisson_ratio));
            bulk_modulus = lambda + (2.0 / 3.0) * shear_modulus;
        }
        // Case 7: E and ν
        else if (!std::isnan(youngs_modulus) && !std::isnan(poisson_ratio)) {
            shear_modulus = youngs_modulus / (2 * (1 + poisson_ratio));
            lambda = (youngs_modulus * poisson_ratio) / ((1 + poisson_ratio) * (1 - 2 * poisson_ratio));
            bulk_modulus = youngs_modulus / (3 * (1 - 2 * poisson_ratio));
        }
        // Case 8: λ and μ
        else if (!std::isnan(lambda) && !std::isnan(shear_modulus)) {
            bulk_modulus = lambda + (2.0 / 3.0) * shear_modulus;
            poisson_ratio = lambda / (2 * (lambda + shear_modulus));
            youngs_modulus = 2 * shear_modulus * (1 + poisson_ratio);
        }
        // Case 9: λ and ν
        else if (!std::isnan(lambda) && !std::isnan(poisson_ratio)) {
            youngs_modulus = (lambda * (1 + poisson_ratio) * (1 - 2 * poisson_ratio)) / poisson_ratio;
            shear_modulus = youngs_modulus / (2 * (1 + poisson_ratio));
            bulk_modulus = lambda + (2.0 / 3.0) * shear_modulus;
        }
        // Case 10: μ and ν
        else if (!std::isnan(shear_modulus) && !std::isnan(poisson_ratio)) {
            youngs_modulus = 2 * shear_modulus * (1 + poisson_ratio);
            lambda = (2 * shear_modulus * poisson_ratio) / (1 - 2 * poisson_ratio);
            bulk_modulus = (2 * shear_modulus * (1 + poisson_ratio)) / (3 * (1 - 2 * poisson_ratio));
        } else {
            throw std::runtime_error("Unsupported property pair combination");
        }
        CheckPhysicalBounds();
    }

   private:
    void CheckPhysicalBounds() const {
        // Validate Poisson's ratio bounds [-1, 0.5)
        if (poisson_ratio < -1.0 || poisson_ratio >= 0.5) {
            throw std::runtime_error(
                "Poisson's ratio violation: " + std::to_string(poisson_ratio) +
                " must be in [-1, 0.5)");
        }

        // Validate positive moduli
        auto check_positive = [](double value, const std::string& name) {
            if (value <= 0.0) {
                throw std::runtime_error(
                    name + " must be positive: " + std::to_string(value));
            }
        };

        check_positive(youngs_modulus, "Young's modulus");
        check_positive(shear_modulus, "Shear modulus");
        check_positive(bulk_modulus, "Bulk modulus");

        // Validate λ > -2G/3 (derived from K > 0)
        if (lambda <= -(2.0 / 3.0) * shear_modulus) {
            throw std::runtime_error(
                "Lamé's parameter violation: λ=" + std::to_string(lambda) +
                " must be > -2G/3=" + std::to_string(-(2.0 / 3.0) * shear_modulus));
        }
    }
};

/**
 * @brief Struct representing the properties of a material.
 */
struct MaterialProperties {
    MaterialType material_type = MaterialType::NONE;   /**< The type of material */
    double density;                                    /**< The density of the material */
    LinearElasticProperties linear_elastic_properties; /**< The linear elastic properties of the material */
    std::map<std::string, double> properties;          /**< Additional properties of the material */
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
        virtual void GetStress(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
                               const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
                               const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_n,
                               Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_np1,
                               const double& timestep,
                               const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* pk1_stress_n,
                               Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress_np1) const = 0;

        KOKKOS_INLINE_FUNCTION
        virtual MaterialSeparationState CheckSeparationState(Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_np1, const double& time) const {
            return MaterialSeparationState::INTACT;
        }

        KOKKOS_INLINE_FUNCTION
        bool CheckInput(
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
            const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_n,
            const Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_np1,
            const double& timestep,
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* pk1_stress_n,
            Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress_np1) const {
            KOKKOS_ASSERT(displacement_gradient_np1 != nullptr);
            KOKKOS_ASSERT(displacement_gradient_np1->data() != nullptr);

            if (NeedsVelocityGradient()) {
                KOKKOS_ASSERT(velocity_gradient_np1 != nullptr);
                KOKKOS_ASSERT(velocity_gradient_np1->data() != nullptr);
            }

            if (HasState()) {
                KOKKOS_ASSERT(state_n != nullptr);
                KOKKOS_ASSERT(state_n->data() != nullptr);
                KOKKOS_ASSERT(state_np1 != nullptr);
                KOKKOS_ASSERT(state_np1->data() != nullptr);
                KOKKOS_ASSERT(state_n->size() == static_cast<Eigen::Index>(NumberOfStateVariables()));
                KOKKOS_ASSERT(state_np1->size() == static_cast<Eigen::Index>(NumberOfStateVariables()));
            }

            KOKKOS_ASSERT(timestep > 0.0);

            if (NeedsOldStress()) {
                KOKKOS_ASSERT(pk1_stress_n != nullptr);
                KOKKOS_ASSERT(pk1_stress_n->data() != nullptr);
            }

            KOKKOS_ASSERT(pk1_stress_np1.data() != nullptr);

            return true;
        }

        KOKKOS_INLINE_FUNCTION
        virtual bool HasState() const {
            return false;
        }

        KOKKOS_INLINE_FUNCTION
        virtual size_t NumberOfStateVariables() const {
            return 0;
        }

        KOKKOS_INLINE_FUNCTION
        virtual bool NeedsDisplacementGradient() const {
            return true;
        }

        KOKKOS_INLINE_FUNCTION
        virtual bool NeedsVelocityGradient() const {
            return false;
        }

        KOKKOS_INLINE_FUNCTION
        virtual bool NeedsOldStress() const {
            return false;
        }
    };

    /**
     * @brief Get the stress functor of the material.
     * @return The stress functor of the material.
     */
    StressFunctor* GetStressFunctor() const {
        return m_stress_functor;
    }

    /**
     * @brief Get the field data of the material.
     * @return The field data of the material.
     */
    virtual std::vector<aperi::FieldData> GetFieldData() {
        return {};
    }

    // TODO(jake): Make this not virtual and call the StressFunctor directly to get its value. Need to create a host StressFunctor to do this.
    // Or, put a member boolean that is set in the derived class constructor for this. That way we don't have to set values in both Material and StressFunctor.
    virtual bool HasState() const {
        return false;
    }

    // TODO(jake): Make this not virtual and call the StressFunctor directly to get its value. Need to create a host StressFunctor to do this.
    // Or, put a member boolean that is set in the derived class constructor for this. That way we don't have to set values in both Material and StressFunctor.
    virtual bool NeedsVelocityGradient() const {
        return false;
    }

    virtual bool NeedsOldStress() const {
        return false;
    }

    virtual bool HasDamage() const {
        return false;
    }

   protected:
    std::shared_ptr<MaterialProperties> m_material_properties; /**< The properties of the material */
    StressFunctor* m_stress_functor;                           /**< The stress functor of the elastic material */
};

}  // namespace aperi
