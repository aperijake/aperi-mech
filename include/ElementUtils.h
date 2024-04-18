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
template <size_t NumNodes, typename FunctionDerivativesFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeInternalForceFunctor {
    ComputeInternalForceFunctor(FunctionDerivativesFunctor &function_derivatives_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor)
        : m_function_derivatives_functor(function_derivatives_functor), m_integration_functor(integration_functor), m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 3> &field_data_to_gather, Eigen::Matrix<double, NumNodes, 3> &force) const {
        const Eigen::Matrix<double, NumNodes, 3> &node_coordinates = field_data_to_gather[0];
        const Eigen::Matrix<double, NumNodes, 3> &node_displacements = field_data_to_gather[1];
        // const Eigen::Matrix<double, NumNodes, 3> &node_velocities = field_data_to_gather[2];

        force.fill(0.0);

        // Loop over all gauss points
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Get the gauss point
            const Eigen::Matrix<double, 1, 3> gauss_point = m_integration_functor.GetGaussPoint(gauss_id);

            // Get the shape function derivatives for the given gauss point
            const Eigen::Matrix<double, NumNodes, 3> shape_function_derivatives = m_function_derivatives_functor(gauss_point(0), gauss_point(1), gauss_point(2));

            // Compute the B matrix and integration weight for a given gauss point
            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, shape_function_derivatives, gauss_id);

            // Compute displacement gradient
            const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix_and_weight.first;

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

    FunctionDerivativesFunctor &m_function_derivatives_functor;  ///< Functor for computing the shape function derivatives
    IntegrationFunctor &m_integration_functor;                   ///< Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;                             ///< Functor for computing the stress of the material
};

// Functor for 1-pt gauss quadrature on a tetrahedron
template <size_t NumQuadPoints, size_t NumFunctions>
struct Quadrature {
    KOKKOS_INLINE_FUNCTION Quadrature(const Eigen::Matrix<double, NumQuadPoints, 3> &gauss_points, const Eigen::Matrix<double, NumQuadPoints, 1> &gauss_weights) : m_gauss_points(gauss_points), m_gauss_weights(gauss_weights) {}

    // Get the ith gauss point
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 1, 3> GetGaussPoint(int gauss_id) const {
        assert(gauss_id <= NumQuadPoints);
        return m_gauss_points.row(gauss_id);
    }

    // Compute the B matrix and integration weight for a given gauss point
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, NumFunctions, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, NumFunctions, 3> &node_coordinates, const Eigen::Matrix<double, NumFunctions, 3> &shape_function_derivatives, int gauss_id) const {
        assert(gauss_id <= NumQuadPoints);

        // Compute Jacobian matrix
        const Eigen::Matrix3d jacobian = node_coordinates.transpose() * shape_function_derivatives;

        // Compute Jacobian determinant
        const double jacobian_determinant = jacobian.determinant();

        // Compute inverse of Jacobian matrix
        const Eigen::Matrix3d inverse_jacobian = jacobian.inverse();

        // Compute B matrix
        const Eigen::Matrix<double, NumFunctions, 3> b_matrix = shape_function_derivatives * inverse_jacobian;

        // Compute the integration weight
        const double integration_weight = m_gauss_weights(gauss_id) * jacobian_determinant;

        return Kokkos::make_pair(b_matrix, integration_weight);
    }

    KOKKOS_INLINE_FUNCTION int NumGaussPoints() const {
        return NumQuadPoints;
    }

    Eigen::Matrix<double, NumQuadPoints, 3> m_gauss_points;
    Eigen::Matrix<double, NumQuadPoints, 1> m_gauss_weights;
};

}  // namespace aperi