#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"
#include "Material.h"

namespace aperi {

// Compute (B_I F)^T, voigt notation, 3 x 6
KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 3, 6> ComputeBFTranspose(const Eigen::Matrix<double, 1, 3> &bI_vector, const Eigen::Matrix<double, 3, 3> &displacement_gradient) {
    Eigen::Matrix<double, 3, 6> bf_transpose;
    bf_transpose(0, 0) = bI_vector(0, 0) * (displacement_gradient(0, 0) + 1.0);
    bf_transpose(1, 1) = bI_vector(0, 1) * (displacement_gradient(1, 1) + 1.0);
    bf_transpose(2, 2) = bI_vector(0, 2) * (displacement_gradient(2, 2) + 1.0);

    bf_transpose(0, 1) = bI_vector(0, 1) * displacement_gradient(0, 1);
    bf_transpose(0, 2) = bI_vector(0, 2) * displacement_gradient(0, 2);
    bf_transpose(1, 0) = bI_vector(0, 0) * displacement_gradient(1, 0);
    bf_transpose(1, 2) = bI_vector(0, 2) * displacement_gradient(1, 2);
    bf_transpose(2, 0) = bI_vector(0, 0) * displacement_gradient(2, 0);
    bf_transpose(2, 1) = bI_vector(0, 1) * displacement_gradient(2, 1);

    bf_transpose(0, 3) = bI_vector(0, 1) * displacement_gradient(0, 2) + bI_vector(0, 2) * displacement_gradient(0, 1);
    bf_transpose(0, 4) = bI_vector(0, 0) * displacement_gradient(0, 2) + bI_vector(0, 2) * (displacement_gradient(0, 0) + 1.0);
    bf_transpose(0, 5) = bI_vector(0, 0) * displacement_gradient(0, 1) + bI_vector(0, 1) * (displacement_gradient(0, 0) + 1.0);

    bf_transpose(1, 3) = bI_vector(0, 1) * displacement_gradient(1, 2) + bI_vector(0, 2) * (displacement_gradient(1, 1) + 1.0);
    bf_transpose(1, 4) = bI_vector(0, 0) * displacement_gradient(1, 2) + bI_vector(0, 2) * displacement_gradient(1, 0);
    bf_transpose(1, 5) = bI_vector(0, 0) * (displacement_gradient(1, 1) + 1.0) + bI_vector(0, 1) * displacement_gradient(1, 0);

    bf_transpose(2, 3) = bI_vector(0, 1) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 1);
    bf_transpose(2, 4) = bI_vector(0, 0) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 0);
    bf_transpose(2, 5) = bI_vector(0, 0) * displacement_gradient(2, 1) + bI_vector(0, 1) * displacement_gradient(2, 0);

    return bf_transpose;
}

// Functor for computing the internal force of an element with NumNodes nodes.
// IntegrationFunctor is a functor that computes the B matrix and integration weight for a given gauss point.
// StressFunctor is a functor that computes the stress of the material.
template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeInternalForceFunctor {
    ComputeInternalForceFunctor(FunctionsFunctor &functions_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor)
        : m_functions_functor(functions_functor), m_integration_functor(integration_functor), m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 3> &gathered_node_data, Eigen::Matrix<double, NumNodes, 3> &force, const Eigen::Matrix<double, 3, NumNodes> &full_B, double volume, size_t actual_num_neighbors) const {
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
            // For meshfree, I tried using blocking (~15% slower) or manually looping to compute the displacement gradient (~8% slower).

            // Compute the Green Lagrange strain tensor. TODO: Get rid of this and go straight to voigt notation
            // E = 0.5 * (H + H^T + H^T * H)
            const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (displacement_gradient + displacement_gradient.transpose() + displacement_gradient.transpose() * displacement_gradient);

            // Green Lagrange strain tensor in voigt notation
            Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
            green_lagrange_strain_tensor_voigt << green_lagrange_strain_tensor(0, 0), green_lagrange_strain_tensor(1, 1), green_lagrange_strain_tensor(2, 2), green_lagrange_strain_tensor(1, 2), green_lagrange_strain_tensor(0, 2), green_lagrange_strain_tensor(0, 1);

            // Compute the stress and internal force of the element.
            const Eigen::Matrix<double, 6, 1> stress = m_stress_functor(green_lagrange_strain_tensor_voigt);

            for (size_t i = 0; i < NumNodes; ++i) {
                // Compute (B_I F)^T
                const Eigen::Matrix<double, 3, 6> bF_IT = ComputeBFTranspose(b_matrix_and_weight.first.row(i), displacement_gradient);

                force.row(i) -= (bF_IT * stress).transpose() * b_matrix_and_weight.second;
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

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, MaxNumNodes, 3>, 3> &gathered_node_data, Eigen::Matrix<double, MaxNumNodes, 3> &force, const Eigen::Matrix<double, MaxNumNodes, 3> &full_B, double volume, size_t actual_num_neighbors) const {
        // const Eigen::Matrix<double, MaxNumNodes, 3> &node_coordinates = gathered_node_data[0]; // Not used when derivatives are precomputed
        const Eigen::Matrix<double, MaxNumNodes, 3> &node_displacements = gathered_node_data[1];  // MaxNumNodes not known at compile time for meshfree
        // const Eigen::Matrix<double, MaxNumNodes, 3> &node_velocities = gathered_node_data[2];

        force.fill(0.0);

        const Eigen::Block<const Eigen::Matrix<double, MaxNumNodes, 3>> b_matrix = full_B.block(0, 0, actual_num_neighbors, 3);
        // For meshfree, I tried using blocking (~15% slower) or manually looping to compute the displacement gradient (~8% slower).

        // Compute displacement gradient
        const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix;

        // Compute the Green Lagrange strain tensor. TODO: Get rid of this and go straight to voigt notation
        // E = 0.5 * (H + H^T + H^T * H)
        const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (displacement_gradient + displacement_gradient.transpose() + displacement_gradient.transpose() * displacement_gradient);

        // Green Lagrange strain tensor in voigt notation
        Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
        green_lagrange_strain_tensor_voigt << green_lagrange_strain_tensor(0, 0), green_lagrange_strain_tensor(1, 1), green_lagrange_strain_tensor(2, 2), green_lagrange_strain_tensor(1, 2), green_lagrange_strain_tensor(0, 2), green_lagrange_strain_tensor(0, 1);

        // Compute the stress and internal force of the element.
        const Eigen::Matrix<double, 6, 1> stress = m_stress_functor(green_lagrange_strain_tensor_voigt);

        for (size_t i = 0; i < MaxNumNodes; ++i) {
            // Compute (B_I F)^T
            const Eigen::Matrix<double, 3, 6> bF_IT = ComputeBFTranspose(b_matrix.row(i), displacement_gradient);

            force.row(i) -= (bF_IT * stress).transpose() * volume;
        }
    }
    StressFunctor &m_stress_functor;  ///< Functor for computing the stress of the material
};

}  // namespace aperi