#pragma once

#include <Eigen/Dense>
#include <cmath>
#include <memory>
#include <string>

#include "FieldData.h"
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "Materials/Base.h"
#include "MathUtils.h"

namespace aperi {

/**
 * @brief Derived class for the Neo-Hookean material.
 */
class NeoHookeanWithDamageMaterial : public Material {
   public:
    /**
     * @brief Constructor for NeoHookeanWithDamageMaterial class.
     * @param material_properties The properties
     */
    NeoHookeanWithDamageMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~NeoHookeanWithDamageMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Get the field data of the material.
     * @return The field data of the material.
     */
    std::vector<aperi::FieldData> GetFieldData() override {
        std::vector<double> initial_state(2, 0.0);
        auto state = aperi::FieldData(
            "state",
            FieldDataRank::CUSTOM,
            FieldDataTopologyRank::ELEMENT,
            2 /*number of states*/,
            2 /*state size*/,
            initial_state);
        return {state};
    }

    /**
     * @brief Create the stress functor for the neo-Hookean material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(NeoHookeanWithDamageGetStressFunctor));
        double lambda = m_material_properties->properties.at("lambda");
        double two_mu = m_material_properties->properties.at("two_mu");
        double I1_critical = m_material_properties->properties.at("I1_critical");
        double beta = m_material_properties->properties.at("beta");
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int&) {
                new ((NeoHookeanWithDamageGetStressFunctor*)stress_functor) NeoHookeanWithDamageGetStressFunctor(lambda, two_mu, I1_critical, beta);
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
     * @param displacement_gradient_np1 The displacement gradient at the new time step.
     * @param velocity_gradient_np1 The velocity gradient at the new time step.
     * @param state_n The state variables at the previous time step.
     * @param state_np1 The state variables at the new time step.
     * @param timestep The time step size.
     * @param pk1_stress_n The 1st Piola-Kirchhoff stress at the previous time step.
     * @param pk1_stress_np1 The 1st Piola-Kirchhoff stress at the new time step.
     * @return The 1st Piola-Kirchhoff stress.
     */
    struct NeoHookeanWithDamageGetStressFunctor : public StressFunctor {
        KOKKOS_FUNCTION
        NeoHookeanWithDamageGetStressFunctor(double lambda, double two_mu, double I1_critical, double beta)
            : m_lambda(lambda), m_mu(two_mu / 2.0), I1_critical(I1_critical), beta(beta) {
            if (m_lambda < 0.0)
                Kokkos::abort("NeoHookeanWithDamage: lambda must be >= 0");
            if (m_mu < 0.0)
                Kokkos::abort("NeoHookeanWithDamage: mu must be >= 0");
            if (I1_critical < 0.0)
                Kokkos::abort("NeoHookeanWithDamage: I1_critical must be >= 0");
            if (beta < 0.0)
                Kokkos::abort("NeoHookeanWithDamage: beta must be >= 0");
        }

        enum StateVariables {
            DAMAGE = 0,  /**< Damage state variable */
            I1_STATE = 1 /**< First invariant of the left Cauchy-Green tensor */
        };

        KOKKOS_INLINE_FUNCTION
        void GetStress(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
                       const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
                       const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_n,
                       Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_np1,
                       const double& timestep,
                       const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* pk1_stress_n,
                       Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress_np1) const override {
            KOKKOS_ASSERT(CheckInput(displacement_gradient_np1, velocity_gradient_np1, state_n, state_np1, timestep, pk1_stress_n, pk1_stress_np1));

            // Read previous damage
            double Dn = state_n->coeffRef(DAMAGE);

            if (Dn >= 1.0) {
                // If damage is already at maximum, return zero stress
                pk1_stress_np1.setZero();
                state_np1->coeffRef(DAMAGE) = 1.0;
                return;
            }

            // Left Cauchy-Green tensor - I
            const Eigen::Matrix3d B_minus_I = *displacement_gradient_np1 * displacement_gradient_np1->transpose() + displacement_gradient_np1->transpose() + *displacement_gradient_np1;
            double I1 = B_minus_I.trace() + 3.0;  // I1 = trace(B) + 3
            state_np1->coeffRef(I1_STATE) = I1;   // Store I1 in the state variable
            const double J_minus_1 = aperi::DetApIm1(*displacement_gradient_np1);
            const Eigen::Matrix3d I = Eigen::Matrix3d::Identity();

            // Kirchhoff stress
            const Eigen::Matrix3d tau = m_lambda * std::log1p(J_minus_1) * I + m_mu * B_minus_I;

            // Deformation gradient
            const Eigen::Matrix3d F = *displacement_gradient_np1 + I;

            // Damage evolution
            double Dnew = Dn;
            if (I1 > I1_critical) {
                double D_increment = beta * (I1 - I1_critical);
                // Update damage state, ensuring it does not decrease
                Dnew = D_increment > 0.0 ? Dn + D_increment : Dn;
                // Ensure damage does not exceed 1.0
                if (Dnew > 1.0) {
                    Dnew = 1.0;
                }
            }
            // Update state variable
            state_np1->coeffRef(DAMAGE) = Dnew;

            // First Piola–Kirchhoff stress and damage degradation
            pk1_stress_np1 = tau * InvertMatrix(F).transpose() * (1.0 - Dnew);
        }

        KOKKOS_INLINE_FUNCTION
        bool HasState() const override {
            return true;
        }

        KOKKOS_INLINE_FUNCTION
        size_t NumberOfStateVariables() const override {
            return 1;
        }

       private:
        double m_lambda;    /**< The lambda parameter */
        double m_mu;        /**< The mu parameter */
        double I1_critical; /**< Critical value of I1 for damage initiation */
        double beta;        /**< Damage evolution rate */
    };

    // TODO(jake): get rid of this in favor of the above HasState
    bool HasState() const override {
        return true;
    }
};

}  // namespace aperi