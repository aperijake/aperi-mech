#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"
#include "Material.h"

namespace aperi {

// Functor for computing the internal force of an element with NumNodes nodes.
// IntegrationFunctor is a functor that computes the B matrix and integration weight for a given gauss point.
// StressFunctor is a functor that computes the stress of the material.
template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeInternalForceFromIntegrationPointFunctor {
    ComputeInternalForceFromIntegrationPointFunctor(FunctionsFunctor &functions_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor)
        : m_functions_functor(functions_functor), m_integration_functor(integration_functor), m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 2> &gathered_node_data, Eigen::Matrix<double, NumNodes, 3> &force, size_t actual_num_neighbors) const {
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

            // Compute the 2nd pk stress and internal force of the element.
            const Eigen::Matrix<double, 3, 3> pk1_stress_neg_transpose_volume = m_stress_functor(displacement_gradient).transpose() * -b_matrix_and_weight.second;

            // Compute the internal force
            for (size_t i = 0; i < actual_num_neighbors; ++i) {
                force.row(i).noalias() = b_matrix_and_weight.first.row(i) * pk1_stress_neg_transpose_volume;
            }
        }
    }

    FunctionsFunctor &m_functions_functor;      ///< Functor for computing the shape function values and derivatives
    IntegrationFunctor &m_integration_functor;  ///< Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;            ///< Functor for computing the stress of the material
};

template <size_t MaxNumNodes, typename StressFunctor>
struct ComputeInternalForceFromSmoothingCellFunctor {
    ComputeInternalForceFromSmoothingCellFunctor(StressFunctor &stress_functor)
        : m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, 3, 3>, 1> &gathered_node_data_gradient, Eigen::Matrix<double, MaxNumNodes, 3> &force, const Eigen::Matrix<double, MaxNumNodes, 3> &b_matrix, double volume, size_t actual_num_neighbors) const {
        const Eigen::Matrix3d &displacement_gradient = gathered_node_data_gradient[0];
        // const Eigen::Matrix3d& velocity_gradient = gathered_node_data_gradient[1];

        // Compute the stress and internal force of the element.
        const Eigen::Matrix<double, 3, 3> pk1_stress_neg_transpose_volume = m_stress_functor(displacement_gradient).transpose() * -volume;

        // Compute the internal force
        for (size_t i = 0; i < actual_num_neighbors; ++i) {
            force.row(i).noalias() = b_matrix.row(i) * pk1_stress_neg_transpose_volume;
        }
    }
    StressFunctor &m_stress_functor;  ///< Functor for computing the stress of the material
};

template <typename StressFunctor>
struct ComputeStressOnSmoothingCellFunctor {
    ComputeStressOnSmoothingCellFunctor(StressFunctor &stress_functor)
        : m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION const Eigen::Matrix<double, 3, 3> operator()(const Kokkos::Array<Eigen::Matrix<double, 3, 3>, 1> &gathered_node_data_gradient) const {
        const Eigen::Matrix3d &displacement_gradient = gathered_node_data_gradient[0];
        // const Eigen::Matrix3d& velocity_gradient = gathered_node_data_gradient[1];

        // Compute the stress
        return m_stress_functor(displacement_gradient);
    }
    StressFunctor &m_stress_functor;  ///< Functor for computing the stress of the material
};

}  // namespace aperi