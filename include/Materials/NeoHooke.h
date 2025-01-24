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
        void GetStress(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
                       const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
                       const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                       Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                       const double& timestep,
                       Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            // Assert that the displacement gradient is not null
            KOKKOS_ASSERT(displacement_gradient_np1 != nullptr);

            // Left Cauchy-Green tensor - I
            const Eigen::Matrix3d B_minus_I = *displacement_gradient_np1 * displacement_gradient_np1->transpose() + displacement_gradient_np1->transpose() + *displacement_gradient_np1;
            const double J_minus_1 = aperi::DetApIm1(*displacement_gradient_np1);
            const Eigen::Matrix3d I = Eigen::Matrix3d::Identity();

            // Kirchhoff stress
            const Eigen::Matrix3d tau = m_lambda * std::log1p(J_minus_1) * I + m_mu * B_minus_I;

            // Deformation gradient
            const Eigen::Matrix3d F = *displacement_gradient_np1 + I;

            // First Piola-Kirchhoff stress
            pk1_stress = tau * InvertMatrix(F).transpose();
        }

       private:
        double m_lambda; /**< The lambda parameter */
        double m_mu;     /**< The mu parameter */
    };
};

}  // namespace aperi
