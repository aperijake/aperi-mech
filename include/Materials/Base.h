#pragma once

#include <Eigen/Dense>
#include <memory>
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
    ELASTIC,        /**< Elastic material type */
    LINEAR_ELASTIC, /**< Linear elastic material type */
    NEO_HOOKEAN,    /**< Neo-Hookean material type */
    PLASTIC,        /**< Plastic material type */
    DRUCKER_PRAGER, /**< Drucker-Prager material type */
    POWER_LAW_CREEP, /**< Power Law creep material type */
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
        virtual void GetStress(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
                               const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
                               const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                               Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                               const double& timestep,
                               Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const = 0;

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

   protected:
    std::shared_ptr<MaterialProperties> m_material_properties; /**< The properties of the material */
    StressFunctor* m_stress_functor;                           /**< The stress functor of the elastic material */
};


}  // namespace aperi
