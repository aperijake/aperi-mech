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
#include "Tensor.h"

namespace aperi {

/**
 * @brief Derived class for the power law creep model
 */
class PowerLawCreepMaterial : public Material {
   public:
    /**
     * @brief Constructor for PowerLawCreepMaterial class.
     * @param material_properties The properties
     */
    PowerLawCreepMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~PowerLawCreepMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Get the field data of the material.
     * @return The field data of the material.
     */
    std::vector<aperi::FieldData> GetFieldData() override {
        std::vector<double> initial_state(2, 0.0);
        auto displacement_gradient = aperi::FieldData(
            "displacement_gradient",
            FieldDataRank::TENSOR,
            FieldDataTopologyRank::ELEMENT,
            2 /*number of states*/,
            std::vector<double>{});
        auto state = aperi::FieldData(
            "state",
            FieldDataRank::CUSTOM,
            FieldDataTopologyRank::ELEMENT,
            2 /*number of states*/,
            2 /*state size*/,
            initial_state);
        return {displacement_gradient, state};
    }

    /**
     * @brief Create the stress functor for the power law creep material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(PowerLawCreepGetStressFunctor));
        double bulk_modulus = m_material_properties->properties.at("bulk_modulus");
        double shear_modulus = m_material_properties->properties.at("shear_modulus");
        double A = m_material_properties->properties.at("A");
        double n = m_material_properties->properties.at("n");
        double m = m_material_properties->properties.at("m");
        Kokkos::parallel_for(
            "CreateObjects",
            1,
            KOKKOS_LAMBDA(const int&) {
                new ((PowerLawCreepGetStressFunctor*)stress_functor) PowerLawCreepGetStressFunctor(bulk_modulus, shear_modulus, A, n, m);
            });
        m_stress_functor = stress_functor;
    }

    /**
     * @brief Destroy the stress functor for the power law creep material. Potentially on the device.
     */
    void DestroyStressFunctor() {
        auto stress_functor = m_stress_functor;
        Kokkos::parallel_for(
            "DestroyObjects",
            1,
            KOKKOS_LAMBDA(const int&) { stress_functor->~StressFunctor(); });
        Kokkos::kokkos_free(m_stress_functor);
        m_stress_functor = nullptr;
    }

    /**
     * @brief Functor for getting the 1st Piola-Kirchhoff stress.
     * @param displacement_gradient The displacement gradient.
     * @return The 1st Piola-Kirchhoff stress.
     */
    struct PowerLawCreepGetStressFunctor : public StressFunctor {
        enum StateVariables {
            EFFECTIVE_CREEP_STRAIN = 0, /* effective creep strain */
            EFFECTIVE_STRESS_RATE = 1   /* effective stress rate */
        };

        KOKKOS_FUNCTION
        PowerLawCreepGetStressFunctor(double K, double G, double A, double n, double m) : m_bulk_modulus(K),
                                                                                          m_shear_modulus(G),
                                                                                          m_A(A),
                                                                                          m_n(n),
                                                                                          m_m(m) {
            if (m_A < 0.0)
                Kokkos::abort("PowerLawCreep: A must be > 0");
            if (m_n < 0.0)
                Kokkos::abort("PowerLawCreep: n must be > 0");
            if (m_m < 0.0)
                Kokkos::abort("PowerLawCreep: m must be > 0");
        }

        KOKKOS_INLINE_FUNCTION
        void GetStress(
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
            const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
            Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
            const double& timestep,
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* pk1_stress_n,
            Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            KOKKOS_ASSERT(displacement_gradient_np1 != nullptr);

            const Eigen::Matrix<double, 3, 3> I = Eigen::Matrix<double, 3, 3>::Identity();
            auto F = *displacement_gradient_np1 + I;
            auto J = F.determinant();
            Eigen::Matrix<double, 3, 3> stress = 1.0 / J * pk1_stress * F.transpose();
            auto stress_deviator = tensor::deviatoric_part(stress);

            auto de = 0.5 * (*velocity_gradient_np1 + velocity_gradient_np1->transpose()) * timestep;
            auto dedev = tensor::deviatoric_part(de);

            const auto amult = 0.98;

            const int max_steps = 100;
            double min_stepsize = timestep / max_steps;

            /* We don't yet track a temperature */
            auto temp_old = 0.0;
            auto a1 = (temp_old == 0.0) ? 0.0 : m_A * Kokkos::exp(-m_m / temp_old);

            /* We don't yet track a temperature */
            auto temp_new = 0.0;
            auto da = (temp_new == 0.0) ? -a1 : m_A * Kokkos::exp(-m_m / temp_new) - a1;

            Eigen::Matrix<double, 3, 3> creep_strain = dedev + stress_deviator / 2.0 / m_shear_modulus;

            // time step estimate
            auto effective_stress = tensor::magnitude(stress_deviator) * Kokkos::sqrt(3.0 / 2.0);
            auto edotvm = a1 * Kokkos::pow(effective_stress, m_n - 1.0);

            auto critical_timestep = (edotvm == 0.0) ? 1.1 * timestep : 4.0 * amult / (6.0 * m_shear_modulus * m_n * edotvm);
            auto dt = Kokkos::min(critical_timestep, timestep);

            auto tn = 0.0;
            auto tp = dt;
            while (true) {
                auto dt_n = timestep;
                auto dp = 3.0 / 2.0 * stress_deviator * edotvm;
                auto sdot = 2.0 * m_shear_modulus * (dedev / timestep - dp);

                stress_deviator += sdot * dt;
                effective_stress = tensor::magnitude(stress_deviator) * Kokkos::sqrt(3.0 / 2.0);

                auto a = (timestep <= 0.0) ? a1 : a1 + tp * da / timestep;
                edotvm = a * Kokkos::pow(effective_stress, m_n - 1.0);

                critical_timestep = (edotvm == 0.0) ? 1.1 * timestep : 4.0 * amult / (6.0 * m_shear_modulus * m_n * edotvm);

                dt_n = Kokkos::min(critical_timestep, dt_n);
                if (dt_n < min_stepsize)
                    dt_n = min_stepsize;

                tn = tp;
                if (tn >= timestep)
                    break;

                tp = Kokkos::min(timestep, tp + dt_n);
                dt = tp - tn;
            }

            auto trde = de.trace();
            auto mean_stress = stress.trace() / 3.0 + m_bulk_modulus * trde;
            stress = mean_stress * I + stress_deviator;

            // Update the state
            creep_strain -= stress_deviator / 2.0 / m_shear_modulus;
            auto eff_creep_strain = Kokkos::sqrt(2.0 / 3.0) * tensor::magnitude(creep_strain);
            state_new->coeffRef(EFFECTIVE_CREEP_STRAIN) += eff_creep_strain;

            // effective stress rate
            auto ds = 2.0 * m_shear_modulus * (dedev / timestep - 3.0 * edotvm * stress_deviator / 2.0);
            state_new->coeffRef(EFFECTIVE_STRESS_RATE) = Kokkos::sqrt(3.0 / 2.0) * tensor::magnitude(ds);
            pk1_stress = J * stress * F.inverse().transpose();
        }

        KOKKOS_INLINE_FUNCTION
        bool HasState() const override {
            return true;
        }

        KOKKOS_INLINE_FUNCTION
        size_t NumberOfStateVariables() const override {
            return 2;
        }

        KOKKOS_INLINE_FUNCTION
        bool NeedsVelocityGradient() const override {
            return true;
        }

       private:
        double m_bulk_modulus;
        double m_shear_modulus;
        double m_A;  // creep constant
        double m_n;  // creep exponent
        double m_m;  // thermal constant
    };

    // TODO(jake): get rid of this in favor of the above HasState
    bool HasState() const override {
        return true;
    }

    // TODO(jake): get rid of this in favor of the above NeedsVelocityGradient
    bool NeedsVelocityGradient() const override {
        return true;
    }
};

}  // namespace aperi
