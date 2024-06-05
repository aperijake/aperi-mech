#pragma once

#include <Eigen/Dense>

#include "Constants.h"
#include "MathUtils.h"

namespace aperi {

template <size_t MaxNumNeighbors>
struct ShapeFunctionsFunctorReproducingKernel {
    /**
     * @brief Computes the shape functions of the element.
     * @param shifted_neighbor_coordinates The physical coordinates of the neighbors relative to the evaluation point (evaluation_point_physical_coordinates - neighbor_coordinates).
     * @param actual_num_neighbors The actual number of neighbors.
     * @return The shape function values at the evaluation point.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> values(const Eigen::Matrix<double, MaxNumNeighbors, 1>& kernel_values, const Eigen::Matrix<double, MaxNumNeighbors, 3>& shifted_neighbor_coordinates, size_t actual_num_neighbors) const {
        // Allocate function values
        Eigen::Matrix<double, MaxNumNeighbors, 1> function_values = Eigen::Matrix<double, MaxNumNeighbors, 1>::Zero();

        if (actual_num_neighbors == 0) {
            return function_values;
        } else if (actual_num_neighbors == 1) {
            function_values(0, 0) = 1.0;
            return function_values;
        }

        // Allocate moment matrix (M) and M^-1
        Eigen::Matrix<double, 4, 4> M = Eigen::Matrix<double, 4, 4>::Zero();
        Eigen::Matrix<double, 4, 4> M_inv;

        // Allocate basis vector (H)
        Eigen::Vector<double, 4> H = Eigen::Vector<double, 4>::Zero();
        H(0) = 1.0;

        // Loop over neighbor nodes
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            if (kernel_values(i, 0) == 0.0) {
                continue;
            }

            // Compute basis vector (H)
            H.segment(1, 3) = shifted_neighbor_coordinates.row(i);

            // Compute moment matrix (M)
            M += kernel_values(i, 0) * H * H.transpose();
        }

        // Compute M^-1
        M_inv = InvertMatrix(M);

        // Loop over neighbor nodes again
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            if (kernel_values(i, 0) == 0.0) {
                continue;
            }

            // Compute basis vector (H)
            H.segment(1, 3) = shifted_neighbor_coordinates.row(i);

            // Compute shape function value
            function_values(i, 0) = (M_inv.row(0) * H * kernel_values(i, 0))(0);
        }

        return function_values;
    }
};

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
     * @param neighbor_coordinates The physical coordinates of the neighbors.
     * @param actual_num_neighbors The actual number of neighbors.
     * @return The shape function values at the evaluation point.
     * @note This function is used for testing purposes only.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates, const Eigen::Matrix<double, TET4_NUM_NODES, 3>& cell_node_coordinates, const Eigen::Matrix<double, MaxNumNeighbors, 3>& neighbor_coordinates, size_t actual_num_neighbors) const {
        Eigen::Matrix<double, 1, TET4_NUM_NODES> cell_shape_functions;
        cell_shape_functions << 1.0 - parametric_coordinates(0) - parametric_coordinates(1) - parametric_coordinates(2),
            parametric_coordinates(0),
            parametric_coordinates(1),
            parametric_coordinates(2);
        Eigen::Matrix<double, 1, 3> evaluation_point_physical_coordinates = cell_shape_functions * cell_node_coordinates;
        Eigen::Matrix<double, MaxNumNeighbors, 3> shifted_neighbor_coordinates;
        Eigen::Matrix<double, MaxNumNeighbors, 1> kernel_values;
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            shifted_neighbor_coordinates.row(i) = evaluation_point_physical_coordinates - neighbor_coordinates.row(i);
            kernel_values(i, 0) = ComputeKernel(shifted_neighbor_coordinates.row(i), 1.76);
        }

        // Construct a ShapeFunctionsFunctorReproducingKernel object
        ShapeFunctionsFunctorReproducingKernel<MaxNumNeighbors> shape_functions_functor_reproducing_kernel;

        return shape_functions_functor_reproducing_kernel.values(kernel_values, shifted_neighbor_coordinates, actual_num_neighbors);
    }
};

}  // namespace aperi
