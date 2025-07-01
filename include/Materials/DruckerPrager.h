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
 * @brief Derived class for the Drucker-Prager pressure dependent plastic material.
 */
class DruckerPragerMaterial : public Material {
   public:
    /**
     * @brief Constructor for DruckerPragerMaterial class.
     * @param material_properties The properties
     */
    DruckerPragerMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~DruckerPragerMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Get the field data of the material.
     * @return The field data of the material.
     */
    std::vector<aperi::FieldData> GetFieldData() override {
        std::vector<double> initial_state(2, 0.0);
        auto displacement_gradient = aperi::FieldData("displacement_gradient", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 2 /*number of states*/, std::vector<double>{});
        auto state = aperi::FieldData("state", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 2 /*number of states*/, 2 /*state size*/, initial_state);
        return {displacement_gradient, state};
    }

    /**
     * @brief Create the stress functor for the Drucker-Prager material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(DruckerPragerGetStressFunctor));
        double bulk_modulus = m_material_properties->linear_elastic_properties.bulk_modulus;
        double shear_modulus = m_material_properties->linear_elastic_properties.shear_modulus;
        double A1 = m_material_properties->properties.at("A1");
        double A2 = m_material_properties->properties.at("A2");
        double A2G = m_material_properties->properties.at("A2G");
        Kokkos::parallel_for(
            "CreateObjects",
            1,
            KOKKOS_LAMBDA(const int&) {
                new ((DruckerPragerGetStressFunctor*)stress_functor) DruckerPragerGetStressFunctor(bulk_modulus, shear_modulus, A1, A2, A2G);
            });
        m_stress_functor = stress_functor;
    }

    /**
     * @brief Destroy the stress functor for the Drucker Prager material. Potentially on the device.
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
    struct DruckerPragerGetStressFunctor : public StressFunctor {
        enum StateVariables {
            PLASTIC_STRAIN = 0,            /**< The plastic strain */
            VOLUMETRIC_PLASTIC_STRAIN = 1, /**< The volumetric plastic strain */
        };

        KOKKOS_FUNCTION
        DruckerPragerGetStressFunctor(double K, double G, double A1, double A2, double A2G) : m_bulk_modulus(K),
                                                                                              m_shear_modulus(G),
                                                                                              m_A1(A1),
                                                                                              m_A2(A2),
                                                                                              m_A2G(A2G) {}

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
            auto Ez = I / Kokkos::sqrt(3.0);
            auto F = *displacement_gradient_np1 + I;
            Eigen::Matrix<double, 3, 3> tau = *pk1_stress_n * F.transpose();

            // Trial stress

            Eigen::Matrix<double, 3, 3> de = (0.5 * timestep) * (*velocity_gradient_np1 + velocity_gradient_np1->transpose());
            double trde = de.trace();
            auto dedev = tensor::deviatoric_part(de);

            tau += m_bulk_modulus * trde * I + 2 * m_shear_modulus * dedev;

            double zt, st;
            Eigen::Matrix<double, 3, 3> Es;
            tensor::get_lode_components(tau, zt, st, Es);

            auto dstrain = 0.5 * (*displacement_gradient_np1 + displacement_gradient_np1->transpose()) * timestep;
            Eigen::Matrix<double, 3, 3> dee(dstrain);
            Eigen::Matrix<double, 3, 3> dep;
            dep.setZero();

            auto f = m_A1 - m_A2 * zt;
            auto g = st / Kokkos::sqrt(2.0) - f;

            if (g > 1.0e-4) {
                // plastic
                bool converged = false;

                // Apply oblique return to put stress on yield surface

                // Newton iterations to find magnitude of projection from the trial stress state to the yield
                // surface.
                for (auto iter = 0; iter < 25; iter++) {
                    // Yield normal N and flow direction M
                    auto Nz = m_A2;
                    auto Ns = 1.0 / Kokkos::sqrt(2.0);

                    // Flow direction
                    auto Mz = m_A2G;
                    auto Ms = Ns;

                    Eigen::Matrix<double, 3, 3> N;
                    Eigen::Matrix<double, 3, 3> M;
                    for (auto i = 0; i < 3; i++) {
                        for (auto j = 0; j < 3; j++) {
                            N(i, j) = Nz * Ez(i, j) + Ns * Es(i, j);
                            M(i, j) = Mz * Ez(i, j) + Ms * Es(i, j);
                        }
                    }

                    // Components of A tensor
                    auto Az = m_bulk_modulus * Mz;
                    auto As = 2.0 * m_shear_modulus * Ms;

                    // Scaled components of return direction tensor
                    auto fac = Kokkos::sqrt((zt * zt + st * st) / (Mz * Mz + Ms * Ms)) / m_bulk_modulus;
                    auto Pz = fac * Az;
                    auto Ps = fac * As;

                    // Projection "magnitude"
                    auto beta = -g / (Nz * Pz + Ns * Ps);

                    // Check for convergence
                    if (Kokkos::abs(beta) < 1.0e-10) {
                        converged = true;
                        break;
                    }

                    // Improved estimates for the test stress
                    zt += beta * Pz;
                    st += beta * Ps;

                    f = m_A1 - m_A2 * zt;
                    g = st / Kokkos::sqrt(2.0) - f;
                }

                if (!converged)
                    Kokkos::abort("Drucker-Prager Newton iterations failed");

                // Updated stress and increment
                Eigen::Matrix<double, 3, 3> dtau;
                for (auto i = 0; i < 3; i++) {
                    for (auto j = 0; j < 3; j++) {
                        dtau(i, j) = zt * Ez(i, j) + st * Es(i, j) - tau(i, j);
                        tau(i, j) += dtau(i, j);
                    }
                }
                double dz = 0.0;
                double ds = 0.0;
                Eigen::Matrix<double, 3, 3> EDS;
                tensor::get_lode_components(dtau, dz, ds, EDS);

                // Elastic and plastic strain increments
                for (auto i = 0; i < 3; i++) {
                    for (auto j = 0; j < 3; j++) {
                        dee(i, j) = 1.0 / 3.0 / m_bulk_modulus * dz * Ez(i, j) + 1.0 / 2.0 / m_shear_modulus * ds * EDS(i, j);
                        dep(i, j) = dstrain(i, j) - dee(i, j);
                    }
                }
            }

            auto depdev = tensor::deviatoric_part(dep);
            const double dep_trace = dep.trace();
            auto deqps = Kokkos::sqrt(tensor::double_dot(depdev, depdev) + (dep_trace * dep_trace) / 3.0);

            // Update the state
            state_np1->coeffRef(PLASTIC_STRAIN) = state_n->coeff(PLASTIC_STRAIN) + deqps;
            state_np1->coeffRef(VOLUMETRIC_PLASTIC_STRAIN) = state_n->coeff(VOLUMETRIC_PLASTIC_STRAIN) + dep_trace;

            pk1_stress_np1 = tau * F.inverse().transpose();
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
        double m_A1;
        double m_A2;
        double m_A2G;
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
