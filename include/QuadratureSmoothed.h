#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"

namespace aperi {

// For meshfree, NumFunctions is unknown at compile time
template <size_t MaxNumNeighbors>
struct SmoothedQuadrature {
    KOKKOS_INLINE_FUNCTION SmoothedQuadrature() {
        /* Face ordering
        4-node tetrahedron face node ordering per Seacas: https://sandialabs.github.io/seacas-docs/html/element_types.html
        */
        m_face_nodes << 0, 1, 3,
            1, 2, 3,
            0, 3, 2,
            0, 2, 1;
        /*
        Evaluation points. 1/3 for each node on face. Set to 1/3 everywhere below. Override the values that should be zero here.
        In shape function evaluation, the nodes are ordered as follows:
        - 1: u
        - 2: r = xi
        - 3: s = eta
        - 4: t = zeta
        */
        m_eval_points(0, 1) = 0.0;
        m_eval_points(2, 0) = 0.0;
        m_eval_points(3, 2) = 0.0;
    }

    // Compute the B matrix and integration weight for a given gauss point
    template <typename FunctionFunctor>
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, MaxNumNeighbors, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, MaxNumNeighbors, 3> &node_coordinates, FunctionFunctor &function_functor, int gauss_id) const {
        Kokkos::abort("Not implemented");
        return Kokkos::make_pair(Eigen::Matrix<double, MaxNumNeighbors, 3>::Zero(), 0.0);
    }

    // Compute the B matrix and integration weight for a given gauss point
    template <typename FunctionFunctor>
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, MaxNumNeighbors, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, 4, 3> &cell_node_coordinates, const Eigen::Matrix<double, MaxNumNeighbors, 3> &neighbor_node_coordinates, FunctionFunctor &function_functor, int gauss_id, size_t actual_num_neighbors) const {
        assert(gauss_id < 1);

        Eigen::Matrix<double, MaxNumNeighbors, 3> b_matrix = Eigen::Matrix<double, MaxNumNeighbors, 3>::Zero();

        double volume = 0.0;

        // Loop over faces
        for (size_t j = 0; j < m_num_faces; ++j) {
            // Get the area weighted face normal, cross product of two edges
            const Eigen::Vector3d edge1 = cell_node_coordinates.row(m_face_nodes(j, 1)) - cell_node_coordinates.row(m_face_nodes(j, 0));
            const Eigen::Vector3d edge2 = cell_node_coordinates.row(m_face_nodes(j, 2)) - cell_node_coordinates.row(m_face_nodes(j, 0));

            const Eigen::Vector3d face_normal = edge1.cross(edge2) / 2.0;  // Area weighted normal

            // Add the contribution of the current face to the volume
            volume += cell_node_coordinates.row(m_face_nodes(j, 0)).dot(face_normal);

            // Get the shape functions for the evaluation point. Only one evaluation point per face now.
            const Eigen::Matrix<double, MaxNumNeighbors, 1> shape_function_values = function_functor.values(m_eval_points.row(j), cell_node_coordinates, neighbor_node_coordinates, actual_num_neighbors);

            // Compute the smoothed shape function derivatives. Add the contribution of the current evaluation point to the smoothed shape function derivatives.
            for (size_t k = 0; k < MaxNumNeighbors; ++k) {
                b_matrix.row(k) += shape_function_values(k) * face_normal.transpose();
            }
        }
        volume /= 3.0;  // 3x volume
        b_matrix /= volume;

        return Kokkos::make_pair(b_matrix, volume);
    }

    KOKKOS_INLINE_FUNCTION int NumGaussPoints() const {
        return 1;
    }

    Eigen::Matrix<double, 4, 3> m_eval_points = Eigen::Matrix<double, 4, 3>::Constant(1.0 / 3.0);
    Eigen::Matrix<int, 4, 3> m_face_nodes;
    size_t m_num_faces = 4;
};
}  // namespace aperi