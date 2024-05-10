#pragma once

#include <Eigen/Dense>

#include "Constants.h"

namespace aperi {

KOKKOS_FORCEINLINE_FUNCTION Eigen::Matrix<double, 4, 4> InvertMatrix(const Eigen::Matrix<double, 4, 4>& mat) {
#ifndef KOKKOS_ENABLE_CUDA
    assert(mat.fullPivLu().isInvertible());
    return mat.fullPivLu().inverse();  // Does not work on the gpu as of eigen 3.4
#else
    return mat.inverse();
#endif
}

KOKKOS_INLINE_FUNCTION double ComputeKernel(const Eigen::Vector<double, 3>& vector_neighbor_to_point, double R = 4.0, double alpha = 1.6) { // TODO(jake): Make R and alpha parameters
    const double normalized_radius = vector_neighbor_to_point.norm() / (R * alpha);
    // Calculate the kernel value using a cubic b-spline kernel
    if (normalized_radius < 0.5) {
        return 1.0 + 6.0 * normalized_radius * normalized_radius * (-1.0 + normalized_radius);
    } else if (normalized_radius < 1.0) {
        return 2.0 * ( 1.0 + normalized_radius * ( -3.0 + 3.0 * normalized_radius - 1.0 * normalized_radius * normalized_radius));
    }
    return 0.0;
}

template <size_t MaxNumNeighbors>
struct ShapeFunctionsFunctorReproducingKernelOnTet4 {
    /**
     * @brief Computes the shape function derivatives of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 3> derivatives(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Kokkos::abort("Not implemented. Should not be calling derivatives on ShapeFunctionsFunctorReproducingKernelOnTet4 now.");
        return Eigen::Matrix<double, MaxNumNeighbors, 3>::Zero();
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function values of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Kokkos::abort("Not implemented. Reproducing kernel needs physical coordinates. Call 'values' with physical coordinates.");
        return Eigen::Matrix<double, MaxNumNeighbors, 1>::Zero();
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @param cell_node_coordinates The physical coordinates of the nodes of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates, const Eigen::Matrix<double, tet4_num_nodes, 3>& cell_node_coordinates, const Eigen::Matrix<double, MaxNumNeighbors, 3>& neighbor_coordinates, size_t actual_num_neighbors) const {
        Eigen::Matrix<double, 1, tet4_num_nodes> cell_shape_functions;
        cell_shape_functions << 1.0 - parametric_coordinates(0) - parametric_coordinates(1) - parametric_coordinates(2),
            parametric_coordinates(0),
            parametric_coordinates(1),
            parametric_coordinates(2);
        Eigen::Matrix<double, 1, 3> evaluation_point_physical_coordinates = cell_shape_functions * cell_node_coordinates;

        // Allocate moment matrix (M) and M^-1
        Eigen::Matrix<double, 4, 4> M = Eigen::Matrix<double, 4, 4>::Zero();
        Eigen::Matrix<double, 4, 4> M_inv;

        // Allocate basis vector (H)
        Eigen::Vector<double, 4> H = Eigen::Vector<double, 4>::Zero();
        H(0) = 1.0;

        // Loop over neighbor nodes
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            // Vector from neighbor to evaluation_point
            Eigen::Vector<double, 3> vector_neighbor_to_point = evaluation_point_physical_coordinates - neighbor_coordinates.row(i);

            // Compute kernel value 
            double phi_z = ComputeKernel(vector_neighbor_to_point);

            if (phi_z == 0.0) {
                continue;
            }

            // Compute basis vector (H)
            H.segment(1, 3) = vector_neighbor_to_point;

            // Compute moment matrix (M)
            M += phi_z * H * H.transpose();
        }

        // Compute M^-1
        M_inv = InvertMatrix(M);

        // Loop over neighbor nodes again
        Eigen::Matrix<double, MaxNumNeighbors, 1> function_values = Eigen::Matrix<double, MaxNumNeighbors, 1>::Zero();
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            // Vector from neighbor to evaluation_point
            Eigen::Vector<double, 3> vector_neighbor_to_point = evaluation_point_physical_coordinates - neighbor_coordinates.row(i);

            // Compute kernel value
            double phi_z = ComputeKernel(vector_neighbor_to_point);

            if (phi_z == 0.0) {
                continue;
            }
            
            // Compute basis vector (H)
            H.segment(1, 3) = vector_neighbor_to_point;

            // Compute shape function value
            function_values(i, 0) = (M_inv.row(0) * H * phi_z)(0);
        }

        return function_values;
    }
};

}  // namespace aperi
