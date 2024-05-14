#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"

namespace aperi {

// Functor for 1-pt gauss quadrature on a tetrahedron
template <size_t NumQuadPoints, size_t NumFunctions>
struct Quadrature {
    KOKKOS_INLINE_FUNCTION Quadrature(const Eigen::Matrix<double, NumQuadPoints, 3> &gauss_points, const Eigen::Matrix<double, NumQuadPoints, 1> &gauss_weights) : m_gauss_points(gauss_points), m_gauss_weights(gauss_weights) {}

    // Compute the B matrix and integration weight for a given gauss point
    template <typename FunctionFunctor>
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, NumFunctions, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, NumFunctions, 3> &cell_node_coordinates, const Eigen::Matrix<double, 4, 3> &neighbor_node_coordinates, FunctionFunctor &function_functor, int gauss_id, size_t actual_num_neighbors) const {
        Kokkos::abort("Not implemented");
        return Kokkos::make_pair(Eigen::Matrix<double, NumFunctions, 3>::Zero(), 0.0);
    }

    // Compute the B matrix and integration weight for a given gauss point
    template <typename FunctionFunctor>
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, NumFunctions, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, NumFunctions, 3> &node_coordinates, FunctionFunctor &function_functor, int gauss_id) const {
        assert((size_t)gauss_id <= NumQuadPoints);

        // Compute shape function derivatives
        const Eigen::Matrix<double, NumFunctions, 3> shape_function_derivatives = function_functor.derivatives(m_gauss_points.row(gauss_id));

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