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
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> Values(const Eigen::Matrix<double, MaxNumNeighbors, 1>& kernel_values, const Eigen::Matrix<double, MaxNumNeighbors, 3>& shifted_neighbor_coordinates, size_t actual_num_neighbors) const {
        constexpr size_t matrix_size = 4;

        // Allocate function values
        Eigen::Matrix<double, MaxNumNeighbors, 1> function_values = Eigen::Matrix<double, MaxNumNeighbors, 1>::Zero();

        if (actual_num_neighbors == 0) {
            return function_values;
        } else if (actual_num_neighbors == 1) {
            function_values(0, 0) = 1.0;
            return function_values;
        } else if (actual_num_neighbors < matrix_size) {
            // Throw an error if the number of neighbors is less than the matrix size
            printf("The number of neighbors is less than the matrix size. Number of neighbors: %zu, Matrix size: %zu\n", actual_num_neighbors, matrix_size);
            Kokkos::abort("Aborting due to insufficient number of neighbors.");
        }

        // Allocate moment matrix (M) and M^-1
        Eigen::Matrix<double, matrix_size, matrix_size> M = Eigen::Matrix<double, matrix_size, matrix_size>::Zero();

        // Allocate basis vector (H)
        Eigen::Vector<double, matrix_size> H = Eigen::Vector<double, matrix_size>::Zero();
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
        Eigen::Matrix<double, matrix_size, matrix_size> M_inv = InvertMatrix(M);

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
struct ShapeFunctionsFunctorReproducingKernelQuadratic {
    /**
     * @brief Computes the shape functions of the element.
     * @param shifted_neighbor_coordinates The physical coordinates of the neighbors relative to the evaluation point (evaluation_point_physical_coordinates - neighbor_coordinates).
     * @param actual_num_neighbors The actual number of neighbors.
     * @return The shape function values at the evaluation point.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> Values(const Eigen::Matrix<double, MaxNumNeighbors, 1>& kernel_values, const Eigen::Matrix<double, MaxNumNeighbors, 3>& shifted_neighbor_coordinates, size_t actual_num_neighbors) const {
        // Allocate function values
        Eigen::Matrix<double, MaxNumNeighbors, 1> function_values = Eigen::Matrix<double, MaxNumNeighbors, 1>::Zero();

        constexpr size_t matrix_size = 10;

        if (actual_num_neighbors == 0) {
            return function_values;
        } else if (actual_num_neighbors == 1) {
            function_values(0, 0) = 1.0;
            return function_values;
        } else if (actual_num_neighbors < matrix_size) {
            // Throw an error if the number of neighbors is less than the matrix size
            printf("The number of neighbors is less than the matrix size. Number of neighbors: %zu, Matrix size: %zu\n", actual_num_neighbors, matrix_size);
            Kokkos::abort("Aborting due to insufficient number of neighbors.");
        }

        // Allocate moment matrix (M) and M^-1
        Eigen::Matrix<double, matrix_size, matrix_size> M = Eigen::Matrix<double, matrix_size, matrix_size>::Zero();

        // Allocate basis vector (H)
        Eigen::Vector<double, matrix_size> H = Eigen::Vector<double, matrix_size>::Zero();
        H(0) = 1.0;

        // Loop over neighbor nodes
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            if (kernel_values(i, 0) == 0.0) {
                continue;
            }

            // Compute basis vector (H)
            H.segment(1, 3) = shifted_neighbor_coordinates.row(i);
            H(4) = H(1) * H(1);
            H(5) = H(2) * H(2);
            H(6) = H(3) * H(3);
            H(7) = H(2) * H(3);
            H(8) = H(1) * H(3);
            H(9) = H(1) * H(2);

            // Compute moment matrix (M)
            M += kernel_values(i, 0) * H * H.transpose();
        }

        // Compute M^-1
        Eigen::Matrix<double, matrix_size, matrix_size> M_inv = InvertMatrix(M);

        // Loop over neighbor nodes again
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            if (kernel_values(i, 0) == 0.0) {
                continue;
            }

            // Compute basis vector (H)
            H.segment(1, 3) = shifted_neighbor_coordinates.row(i);
            H(4) = H(1) * H(1);
            H(5) = H(2) * H(2);
            H(6) = H(3) * H(3);
            H(7) = H(2) * H(3);
            H(8) = H(1) * H(3);
            H(9) = H(1) * H(2);

            // Compute shape function value
            function_values(i, 0) = (M_inv.row(0) * H * kernel_values(i, 0))(0);
        }

        return function_values;
    }
};

}  // namespace aperi
