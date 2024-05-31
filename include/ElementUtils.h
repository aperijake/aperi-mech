#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"
#include "Material.h"

namespace aperi {

KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 6, 1> ComputeGreenLagrangeStrainTensorVoigt(const Eigen::Matrix3d &displacement_gradient) {
    // Compute the Green Lagrange strain tensor, Voigt Notation.
    // E = 0.5 * (H + H^T + H^T * H)
    Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
    green_lagrange_strain_tensor_voigt << displacement_gradient(0, 0) + 0.5 * displacement_gradient.col(0).dot(displacement_gradient.col(0)),
        displacement_gradient(1, 1) + 0.5 * displacement_gradient.col(1).dot(displacement_gradient.col(1)),
        displacement_gradient(2, 2) + 0.5 * displacement_gradient.col(2).dot(displacement_gradient.col(2)),
        0.5 * (displacement_gradient(1, 2) + displacement_gradient(2, 1) + displacement_gradient.col(1).dot(displacement_gradient.col(2))),
        0.5 * (displacement_gradient(0, 2) + displacement_gradient(2, 0) + displacement_gradient.col(0).dot(displacement_gradient.col(2))),
        0.5 * (displacement_gradient(0, 1) + displacement_gradient(1, 0) + displacement_gradient.col(0).dot(displacement_gradient.col(1)));

    return green_lagrange_strain_tensor_voigt;
}

// Compute (B_I F)^T * stress_volume, 3 x 1
KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 1, 3> ComputeForce(const Eigen::Matrix<double, 1, 3> &bI_vector, const Eigen::Matrix<double, 3, 3> &displacement_gradient, const Eigen::Matrix<double, 6, 1> &stress_volume) {
    Eigen::Matrix<double, 1, 3> force;
    force(0) = -(bI_vector(0, 0) * (displacement_gradient(0, 0) + 1.0) * stress_volume(0) +
                 bI_vector(0, 1) * displacement_gradient(0, 1) * stress_volume(1) +
                 bI_vector(0, 2) * displacement_gradient(0, 2) * stress_volume(2) +
                 (bI_vector(0, 1) * displacement_gradient(0, 2) + bI_vector(0, 2) * displacement_gradient(0, 1)) * stress_volume(3) +
                 (bI_vector(0, 0) * displacement_gradient(0, 2) + bI_vector(0, 2) * (displacement_gradient(0, 0) + 1.0)) * stress_volume(4) +
                 (bI_vector(0, 0) * displacement_gradient(0, 1) + bI_vector(0, 1) * (displacement_gradient(0, 0) + 1.0)) * stress_volume(5));
    force(1) = -(bI_vector(0, 0) * displacement_gradient(1, 0) * stress_volume(0) +
                 bI_vector(0, 1) * (displacement_gradient(1, 1) + 1.0) * stress_volume(1) +
                 bI_vector(0, 2) * displacement_gradient(1, 2) * stress_volume(2) +
                 (bI_vector(0, 1) * displacement_gradient(1, 2) + bI_vector(0, 2) * (displacement_gradient(1, 1) + 1.0)) * stress_volume(3) +
                 (bI_vector(0, 0) * displacement_gradient(1, 2) + bI_vector(0, 2) * displacement_gradient(1, 0)) * stress_volume(4) +
                 (bI_vector(0, 0) * (displacement_gradient(1, 1) + 1.0) + bI_vector(0, 1) * displacement_gradient(1, 0)) * stress_volume(5));
    force(2) = -(bI_vector(0, 0) * displacement_gradient(2, 0) * stress_volume(0) +
                 bI_vector(0, 1) * displacement_gradient(2, 1) * stress_volume(1) +
                 bI_vector(0, 2) * (displacement_gradient(2, 2) + 1.0) * stress_volume(2) +
                 (bI_vector(0, 1) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 1)) * stress_volume(3) +
                 (bI_vector(0, 0) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 0)) * stress_volume(4) +
                 (bI_vector(0, 0) * displacement_gradient(2, 1) + bI_vector(0, 1) * displacement_gradient(2, 0)) * stress_volume(5));

    return force;
}

// Functor for computing the internal force of an element with NumNodes nodes.
// IntegrationFunctor is a functor that computes the B matrix and integration weight for a given gauss point.
// StressFunctor is a functor that computes the stress of the material.
template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeInternalForceFunctor {
    ComputeInternalForceFunctor(FunctionsFunctor &functions_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor)
        : m_functions_functor(functions_functor), m_integration_functor(integration_functor), m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 2> &gathered_node_data, Eigen::Matrix<double, NumNodes, 3> &force, const Eigen::Matrix<double, 3, NumNodes> &full_B, double volume, size_t actual_num_neighbors) const {
        Kokkos::abort("Not implemented");
    }

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 3> &gathered_node_data, Eigen::Matrix<double, NumNodes, 3> &force, size_t actual_num_neighbors) const {
        const Eigen::Matrix<double, NumNodes, 3> &node_coordinates = gathered_node_data[0];
        const Eigen::Matrix<double, NumNodes, 3> &node_displacements = gathered_node_data[1];
        // const Eigen::Matrix<double, NumNodes, 3> &node_velocities = gathered_node_data[2];

        force.fill(0.0);

        // Loop over all gauss points
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Compute the B matrix and integration weight for a given gauss point
            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);

            // Compute displacement gradient
            const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix_and_weight.first;

            // Compute the Green Lagrange strain tensor, Voigt Notation.
            const Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt = ComputeGreenLagrangeStrainTensorVoigt(displacement_gradient);

            // Compute the stress and internal force of the element.
            const Eigen::Matrix<double, 6, 1> stress_volume = m_stress_functor(green_lagrange_strain_tensor_voigt) * b_matrix_and_weight.second;

            // Compute the internal force
            for (size_t i = 0; i < NumNodes; ++i) {
                force.row(i).noalias() += ComputeForce(b_matrix_and_weight.first.row(i), displacement_gradient, stress_volume);
            }
        }
    }

    FunctionsFunctor &m_functions_functor;      ///< Functor for computing the shape function values and derivatives
    IntegrationFunctor &m_integration_functor;  ///< Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;            ///< Functor for computing the stress of the material
};

template <size_t MaxNumNodes, typename StressFunctor>
struct FlexibleComputeInternalForceFunctor {
    FlexibleComputeInternalForceFunctor(StressFunctor &stress_functor)
        : m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, MaxNumNodes, 3>, 3> &gathered_node_data, Eigen::Matrix<double, MaxNumNodes, 3> &force, size_t actual_num_neighbors) const {
        Kokkos::abort("Not implemented");
    }

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, 3, 3>, 2> &gathered_node_data_gradient, Eigen::Matrix<double, MaxNumNodes, 3> &force, const Eigen::Matrix<double, MaxNumNodes, 3> &b_matrix, double volume, size_t actual_num_neighbors) const {
        const Eigen::Matrix3d& displacement_gradient = gathered_node_data_gradient[0];
        // const Eigen::Matrix3d& velocity_gradient = gathered_node_data_gradient[1];

        // Compute the Green Lagrange strain tensor, Voigt Notation.
        const Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt = ComputeGreenLagrangeStrainTensorVoigt(displacement_gradient);

        // Compute the stress and internal force of the element.
        const Eigen::Matrix<double, 6, 1> stress_volume = m_stress_functor(green_lagrange_strain_tensor_voigt) * volume;

        // Compute the internal force
        for (size_t i = 0; i < actual_num_neighbors; ++i) {
            force.row(i).noalias() = ComputeForce(b_matrix.row(i), displacement_gradient, stress_volume);
        }
    }
    StressFunctor &m_stress_functor;  ///< Functor for computing the stress of the material
};

}  // namespace aperi