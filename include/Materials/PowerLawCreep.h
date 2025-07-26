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
        double bulk_modulus = m_material_properties->linear_elastic_properties.bulk_modulus;
        double shear_modulus = m_material_properties->linear_elastic_properties.shear_modulus;
        double A = m_material_properties->properties.at("A");
        double n = m_material_properties->properties.at("n");
        double m = m_material_properties->properties.at("m");
        bool use_constant_temperature = m_material_properties->properties.at("use_constant_temperature") > 0;
        double constant_temperature = m_material_properties->properties.at("constant_temperature");
        Kokkos::parallel_for(
            "CreateObjects",
            1,
            KOKKOS_LAMBDA(const int&) {
                new ((PowerLawCreepGetStressFunctor*)stress_functor) PowerLawCreepGetStressFunctor(bulk_modulus, shear_modulus, A, n, m, use_constant_temperature, constant_temperature);
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
        PowerLawCreepGetStressFunctor(double K, double G, double A, double n, double m, bool use_constant_temperature, double constant_temperature)
            : m_bulk_modulus(K),
              m_shear_modulus(G),
              m_A(A),
              m_n(n),
              m_m(m),
              m_use_constant_temperature(use_constant_temperature),
              m_constant_temperature(constant_temperature) {
            if (m_A < 0.0)
                Kokkos::abort("PowerLawCreep: A must be > 0");
            if (m_n < 0.0)
                Kokkos::abort("PowerLawCreep: n must be > 0");
            if (m_m < 0.0)
                Kokkos::abort("PowerLawCreep: m must be > 0");
            if (!m_use_constant_temperature)
                Kokkos::abort("PowerLawCreep: currently have to use constant temperature, but use_constant_temperature is false");
        }

        KOKKOS_INLINE_FUNCTION
        void GetStress(
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
            const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_n,
            Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_np1,
            const double& timestep,
            const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* pk1_stress_n,
            Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress_np1) const override {
            KOKKOS_ASSERT(CheckInput(displacement_gradient_np1, velocity_gradient_np1, state_n, state_np1, timestep, pk1_stress_n, pk1_stress_np1));

            const Eigen::Matrix<double, 3, 3> I = Eigen::Matrix<double, 3, 3>::Identity();
            auto F = *displacement_gradient_np1 + I;
            auto J = F.determinant();
            Eigen::Matrix<double, 3, 3> stress = 1.0 / J * *pk1_stress_n * F.transpose();
            auto stress_deviator = tensor::deviatoric_part(stress);

            auto de = 0.5 * (*velocity_gradient_np1 + velocity_gradient_np1->transpose()) * timestep;
            auto dedev = tensor::deviatoric_part(de);
            Eigen::Matrix<double, 3, 3> creep_strain = dedev + stress_deviator / 2.0 / m_shear_modulus;

            const auto amult = 0.98;
            const int max_steps = 100;
            double min_stepsize = timestep / max_steps;

            auto temp_n = m_use_constant_temperature ? m_constant_temperature : 0.0;
            auto an = (temp_n == 0.0) ? m_A * Kokkos::exp(-m_m) : m_A * Kokkos::exp(-m_m / temp_n);

            auto temp_np1 = m_use_constant_temperature ? m_constant_temperature : 0.0;
            auto anp1 = (temp_np1 == 0.0) ? m_A * Kokkos::exp(-m_m) : m_A * Kokkos::exp(-m_m / temp_np1);

            // time step estimate
            double sqrtThreeOverTwo = Kokkos::sqrt(3.0 / 2.0);
            auto effective_stress = tensor::magnitude(stress_deviator) * sqrtThreeOverTwo;
            auto edotvm = an * Kokkos::pow(effective_stress, m_n - 1.0);

            auto critt = (edotvm == 0.0) ? 1.1 * timestep : 4.0 * amult / (6.0 * m_shear_modulus * m_n * edotvm);
            auto delt = Kokkos::min(critt, timestep);

            auto tm0 = 0.0;
            auto tm1 = delt;
            size_t step_count = 0;
            while (true) {
                auto deltn = timestep;

                // strain rate
                auto dp = 1.5 * stress_deviator * edotvm;

                // subincrement stress rate
                auto sdot = 2.0 * m_shear_modulus * (dedev / timestep - dp);

                // update subincrement stress
                stress_deviator += sdot * delt;

                // time step estimate for next subincrement
                effective_stress = tensor::magnitude(stress_deviator) * sqrtThreeOverTwo;
                auto a = (timestep <= 0.0) ? an : an + tm1 * (anp1 - an) / timestep;
                critt = (edotvm == 0.0) ? 1.1 * timestep : 4.0 * amult / (6.0 * m_shear_modulus * m_n * edotvm);
                edotvm = a * Kokkos::pow(effective_stress, m_n - 1.0);
                deltn = Kokkos::min(critt, deltn);

                if (tm1 <= timestep) {
                    break;
                } else if (step_count++ > max_steps) {
                    Kokkos::abort("PowerLawCreep: Maximum number of steps exceeded without reaching the timestep.");
                }
                tm0 = tm1;
                tm1 = Kokkos::min(timestep, tm1 + deltn);
                delt = tm1 - tm0;
            }

            auto trde = de.trace();
            auto mean_stress = stress.trace() / 3.0 + m_bulk_modulus * trde;
            stress = mean_stress * I + stress_deviator;

            // Update the state
            creep_strain -= stress_deviator / 2.0 / m_shear_modulus;
            auto eff_creep_strain = Kokkos::sqrt(2.0 / 3.0) * tensor::magnitude(creep_strain);
            state_np1->coeffRef(EFFECTIVE_CREEP_STRAIN) = state_n->coeff(EFFECTIVE_CREEP_STRAIN) + eff_creep_strain;

            // effective stress rate
            auto ds = 2.0 * m_shear_modulus * (dedev / timestep - 3.0 * edotvm * stress_deviator / 2.0);
            state_np1->coeffRef(EFFECTIVE_STRESS_RATE) = sqrtThreeOverTwo * tensor::magnitude(ds);
            pk1_stress_np1 = J * stress * F.inverse().transpose();
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

        KOKKOS_INLINE_FUNCTION
        bool NeedsOldStress() const override {
            return true;
        }

       private:
        double m_bulk_modulus;
        double m_shear_modulus;
        double m_A;                       // creep constant
        double m_n;                       // creep exponent
        double m_m;                       // thermal constant
        bool m_use_constant_temperature;  // use a constant temperature
        double m_constant_temperature;    // constant temperature value
    };

    // TODO(jake): get rid of this in favor of the above HasState
    bool HasState() const override {
        return true;
    }

    // TODO(jake): get rid of this in favor of the above NeedsVelocityGradient
    bool NeedsVelocityGradient() const override {
        return true;
    }

    // TODO(jake): get rid of this in favor of the above NeedsOldStress
    bool NeedsOldStress() const override {
        return true;
    }
};

}  // namespace aperi
