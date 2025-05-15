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

#ifdef USE_PROTEGO_MECH
#include "ProtegoMaterialSeparator.h"
#endif

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
        std::vector<aperi::FieldData> field_data;
        std::vector<double> initial_state(2, 0.0);
        auto state = aperi::FieldData(
            "state",
            FieldDataRank::CUSTOM,
            FieldDataTopologyRank::ELEMENT,
            2 /*number of states*/,
            2 /*state size*/,
            initial_state);
        field_data.push_back(state);
#ifdef USE_PROTEGO_MECH
        // Add the material separator field data
        std::vector<aperi::FieldData> protego_field_data = protego::MaterialSeparator::GetFieldData();
        field_data.insert(field_data.end(), protego_field_data.begin(), protego_field_data.end());
#endif
        return field_data;
    }

    /**
     * @brief Create the stress functor for the neo-Hookean material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(NeoHookeanWithDamageGetStressFunctor));
        double lambda = m_material_properties->properties.at("lambda");
        double two_mu = m_material_properties->properties.at("two_mu");
        double I1_critical = m_material_properties->properties.at("I1_critical");
        double I1_failure = m_material_properties->properties.at("I1_failure");
        double alpha = m_material_properties->properties.at("alpha");
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int&) {
                new ((NeoHookeanWithDamageGetStressFunctor*)stress_functor) NeoHookeanWithDamageGetStressFunctor(lambda, two_mu, I1_critical, I1_failure, alpha);
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
        NeoHookeanWithDamageGetStressFunctor(double lambda, double two_mu, double I1_critical, double I1_failure, double alpha)
            : m_lambda(lambda), m_mu(two_mu / 2.0), m_I1_critical(I1_critical), m_I1_failure(I1_failure), m_alpha(alpha), m_max_effective_damage(0.99) {
            if (m_lambda < 0.0) {
                printf("NeoHookeanWithDamage: lambda: %f\n", m_lambda);
                Kokkos::abort("NeoHookeanWithDamage: lambda must be >= 0");
            }
            if (m_mu < 0.0) {
                printf("NeoHookeanWithDamage: mu: %f\n", m_mu);
                Kokkos::abort("NeoHookeanWithDamage: mu must be >= 0");
            }
            if (m_I1_critical < 0.0) {
                printf("NeoHookeanWithDamage: I1_critical: %f\n", m_I1_critical);
                Kokkos::abort("NeoHookeanWithDamage: I1_critical must be >= 0");
            }
            if (m_I1_failure < 0.0) {
                printf("NeoHookeanWithDamage: I1_failure: %f\n", m_I1_failure);
                Kokkos::abort("NeoHookeanWithDamage: I1_failure must be >= 0");
            }
            if (m_I1_critical >= m_I1_failure) {
                printf("I1_critical: %f, I1_failure: %f\n", m_I1_critical, m_I1_failure);
                Kokkos::abort("NeoHookeanWithDamage: I1_critical must be < I1_failure");
            }
            if (m_alpha < 0.0) {
                printf("NeoHookeanWithDamage: alpha: %f\n", m_alpha);
                Kokkos::abort("NeoHookeanWithDamage: alpha must be >= 0");
            }
            if (m_max_effective_damage < 0.0 || m_max_effective_damage > 1.0) {
                printf("NeoHookeanWithDamage: max_effective_damage: %f\n", m_max_effective_damage);
                Kokkos::abort("NeoHookeanWithDamage: max_effective_damage must be in [0, 1]");
            }
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
            Dn = Kokkos::clamp(Dn, 0.0, m_max_effective_damage);  // Ensure Dn is within [0, m_max_effective_damage]

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
            if (I1 > m_I1_failure) {
                // If I1 exceeds the failure threshold, set damage to 1.0
                Dnew = 1.0;
            } else if (I1 > m_I1_critical) {
                // Position along the damage evolution curve
                double s = (I1 - m_I1_critical) / (m_I1_failure - m_I1_critical);
                // Damage based on the evolution law. m_alpha is the exponent controlling the evolution rate
                Dnew = Kokkos::pow(s, m_alpha);
                Dnew = Kokkos::clamp(Dnew, 0.0, 1.0);  // Ensure Dnew is within [0, 1]
                Dnew = Kokkos::max(Dnew, Dn);          // Ensure damage does not decrease
            }

            // Early exit if damage is zero
            if (Dnew == 0.0) {
                pk1_stress_np1 = tau * InvertMatrix(F).transpose();
                state_np1->coeffRef(DAMAGE) = Dnew;
                return;
            }

            bool is_failed = false;
            if (Dnew >= m_max_effective_damage) {
                // If damage is close to 1.0, set it to the maximum effective damage
                is_failed = true;
                Dnew = m_max_effective_damage;
            }

            // First Piola–Kirchhoff stress and damage degradation
            pk1_stress_np1 = tau * InvertMatrix(F).transpose() * (1.0 - Dnew);

            // Check if this is a new failure, if so set Dnew to the failure magic number to indicate failure
            if (is_failed && Dn < m_max_effective_damage) {
                Dnew = m_failure_magic_number;
            }

            // Update state variable
            state_np1->coeffRef(DAMAGE) = Dnew;
        }

        KOKKOS_INLINE_FUNCTION
        virtual MaterialSeparationState CheckSeparationState(Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_np1) const {
            double D = state_np1->coeffRef(DAMAGE);
            if (D == m_failure_magic_number) {
                // Set to 1.0 and return JUST_FAILED
                state_np1->coeffRef(DAMAGE) = m_max_effective_damage;
                return MaterialSeparationState::JUST_FAILED;
            } else if (D >= 1.0) {
                return MaterialSeparationState::FAILED;
            }
            return MaterialSeparationState::INTACT;
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
        double m_lambda;                     /**< The lambda parameter */
        double m_mu;                         /**< The mu parameter */
        double m_I1_critical;                /**< Critical value of I1 for damage initiation */
        double m_I1_failure;                 /**< Critical value of I1 for complete failure */
        double m_alpha;                      /**< Damage evolution exponent */
        double m_max_effective_damage;       /**< Maximum effective damage value */
        double m_failure_magic_number = 2.0; /**< Magic number for failure */
    };

    // TODO(jake): get rid of this in favor of the above HasState
    bool HasState() const override {
        return true;
    }

    bool HasDamage() const override {
        return true;
    }
};

}  // namespace aperi