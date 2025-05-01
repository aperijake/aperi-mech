#pragma once

#include "Materials/Base.h"

namespace aperi {

/**
 * @brief Derived class for elastic materials.
 */
class ElasticMaterial : public Material {
   public:
    /**
     * @brief Constructor for ElasticMaterial class.
     * @param material_properties The properties of the elastic material.
     */
    ElasticMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        CreateStressFunctor();
    }

    ~ElasticMaterial() {
        DestroyStressFunctor();
    }

    /**
     * @brief Create the stress functor for the elastic material. Potentially on the device.
     */
    void CreateStressFunctor() {
        StressFunctor* stress_functor = (StressFunctor*)Kokkos::kokkos_malloc(sizeof(ElasticGetStressFunctor));
        double lambda = m_material_properties->properties.at("lambda");
        double two_mu = m_material_properties->properties.at("two_mu");
        Kokkos::parallel_for(
            "CreateObjects", 1, KOKKOS_LAMBDA(const int&) {
                new ((ElasticGetStressFunctor*)stress_functor) ElasticGetStressFunctor(lambda, two_mu);
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
     * @brief Functor for getting the stress of the elastic material.
     * @param displacement_gradient The displacement gradient of the elastic material.
     * @return The stress of the elastic material.
     */
    struct ElasticGetStressFunctor : public StressFunctor {
        KOKKOS_FUNCTION
        ElasticGetStressFunctor(double lambda, double two_mu) : m_lambda(lambda), m_two_mu(two_mu) {}

        KOKKOS_INLINE_FUNCTION
        void GetStress(const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* displacement_gradient_np1,
                       const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* velocity_gradient_np1,
                       const Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_n,
                       Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>* state_np1,
                       const double& timestep,
                       const Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>* pk1_stress_n,
                       Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>& pk1_stress_np1) const override {
            KOKKOS_ASSERT(CheckInput(displacement_gradient_np1, velocity_gradient_np1, state_n, state_np1, timestep, pk1_stress_n, pk1_stress_np1));

            // Compute the Green Lagrange strain tensor. E = 0.5 * (H + H^T + H^T * H)
            const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (*displacement_gradient_np1 + displacement_gradient_np1->transpose() + displacement_gradient_np1->transpose() * *displacement_gradient_np1);

            // Compute the second Piola-Kirchhoff stress
            Eigen::Matrix3d pk2_stress = m_two_mu * green_lagrange_strain_tensor;
            pk2_stress.diagonal().array() += m_lambda * green_lagrange_strain_tensor.trace();

            // Compute the 1st Piola-Kirchhoff stress, P = F * S = (I + displacement_gradient) * pk2_stress
            pk1_stress_np1 = (Eigen::Matrix3d::Identity() + *displacement_gradient_np1) * pk2_stress;
        }

       private:
        double m_lambda; /**< The lambda parameter of the elastic material */
        double m_two_mu; /**< The two mu parameter of the elastic material */
    };
};

}  // namespace aperi
