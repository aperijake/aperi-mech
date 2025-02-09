#pragma once

#include <Eigen/Dense>
#include <cmath>
#include <memory>
#include <string>

#include "FieldData.h"
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "MathUtils.h"
#include "Materials/Base.h"

namespace aperi {

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
        void GetStress(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
                       const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
                       const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                       Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                       const double& timestep,
                       Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            // Assert that the displacement gradient is not null
            KOKKOS_ASSERT(displacement_gradient_np1 != nullptr);

            // Identity matrix
            const Eigen::Matrix<double, 3, 3> I = Eigen::Matrix<double, 3, 3>::Identity();

            // Compute the strain tensor
            const Eigen::Matrix<double, 3, 3> epsilon = 0.5 * (*displacement_gradient_np1 + displacement_gradient_np1->transpose());
            const double tr_epsilon = epsilon.trace();

            // Compute the Cauchy stress tensor (same as PK1 for small strains)
            pk1_stress = m_lambda * tr_epsilon * I + m_two_mu * epsilon;
        }

       private:
        double m_lambda; /**< The lambda parameter of the elastic material */
        double m_two_mu; /**< The two mu parameter of the elastic material */
    };
};

}  // namespace aperi
