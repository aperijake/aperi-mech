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
        auto displacement_gradient = aperi::FieldData("displacement_gradient", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 2 /*number of states*/, std::vector<double>{});
        auto state = aperi::FieldData("state", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 2 /*number of states*/, 1 /*state size*/, initial_state);
        return {displacement_gradient, state};
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
        enum StateVariables {
            PLASTIC_STRAIN = 0, /**< The plastic strain */
        };

        KOKKOS_FUNCTION
        PlasticGetStressFunctor(double lambda, double two_mu, double yield_stress, double hardening_modulus) : m_lambda(lambda), m_mu(two_mu / 2.0), m_yield_stress(yield_stress), m_hardening_modulus(hardening_modulus) {}

        KOKKOS_INLINE_FUNCTION
        void GetStress(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
                       const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
                       const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_old,
                       Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_new,
                       const double& timestep,
                       Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress) const override {
            // in "Computational Methods for Plasticity", page 260, box 7.5

            // Assert that the displacement gradient is not null
            KOKKOS_ASSERT(displacement_gradient_np1 != nullptr);

            // Get the plastic strain state
            double plastic_strain = state_old->coeff(PLASTIC_STRAIN);

            // Identity matrix
            const Eigen::Matrix3d I = Eigen::Matrix3d::Identity();

            // Compute the small strain tensor
            const Eigen::Matrix<double, 3, 3> strain_elastic = 0.5 * (*displacement_gradient_np1 + displacement_gradient_np1->transpose());
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
            state_new->coeffRef(PLASTIC_STRAIN) = plastic_strain;

            pk1_stress = (deviatoric_stress + pressure * I);
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
        double m_lambda;            /**< The lambda parameter */
        double m_mu;                /**< The mu parameter */
        double m_yield_stress;      /**< The yield stress */
        double m_hardening_modulus; /**< The hardening modulus */
    };

    // TODO(jake): get rid of this in favor of the above HasState
    bool HasState() const override {
        return true;
    }
};

}  // namespace aperi
