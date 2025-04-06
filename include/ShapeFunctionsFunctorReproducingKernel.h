#pragma once

#include <Eigen/Dense>

#include "Constants.h"
#include "MathUtils.h"

namespace aperi {

struct BasesLinear {
    constexpr static size_t size = 4;
    constexpr static size_t order = 1;

    KOKKOS_INLINE_FUNCTION
    void BuildBasisVector(const Eigen::Matrix<double, 3, 1>& coordinates, Eigen::Matrix<double, size, 1>& basis_vector) const {
        basis_vector(0) = 1.0;
        basis_vector.template segment<3>(1) = coordinates;
    }
};

struct BasesQuadratic {
    constexpr static size_t size = 10;
    constexpr static size_t order = 2;

    KOKKOS_INLINE_FUNCTION
    void BuildBasisVector(const Eigen::Matrix<double, 3, 1>& coordinates, Eigen::Matrix<double, size, 1>& basis_vector) const {
        basis_vector(0) = 1.0;
        basis_vector.template segment<3>(1) = coordinates;
        basis_vector(4) = coordinates(0) * coordinates(0);
        basis_vector(5) = coordinates(1) * coordinates(1);
        basis_vector(6) = coordinates(2) * coordinates(2);
        basis_vector(7) = coordinates(0) * coordinates(1);
        basis_vector(8) = coordinates(0) * coordinates(2);
        basis_vector(9) = coordinates(1) * coordinates(2);
    }
};

struct BasesCubic {
    constexpr static size_t size = 20;
    constexpr static size_t order = 3;

    KOKKOS_INLINE_FUNCTION
    void BuildBasisVector(const Eigen::Matrix<double, 3, 1>& coordinates, Eigen::Matrix<double, size, 1>& basis_vector) const {
        basis_vector(0) = 1.0;
        basis_vector.template segment<3>(1) = coordinates;
        basis_vector(4) = coordinates(0) * coordinates(0);
        basis_vector(5) = coordinates(1) * coordinates(1);
        basis_vector(6) = coordinates(2) * coordinates(2);
        basis_vector(7) = coordinates(0) * coordinates(1);
        basis_vector(8) = coordinates(0) * coordinates(2);
        basis_vector(9) = coordinates(1) * coordinates(2);
        basis_vector(10) = coordinates(0) * coordinates(0) * coordinates(0);
        basis_vector(11) = coordinates(1) * coordinates(1) * coordinates(1);
        basis_vector(12) = coordinates(2) * coordinates(2) * coordinates(2);
        basis_vector(13) = coordinates(0) * coordinates(0) * coordinates(1);
        basis_vector(14) = coordinates(0) * coordinates(0) * coordinates(2);
        basis_vector(15) = coordinates(1) * coordinates(1) * coordinates(0);
        basis_vector(16) = coordinates(1) * coordinates(1) * coordinates(2);
        basis_vector(17) = coordinates(2) * coordinates(2) * coordinates(0);
        basis_vector(18) = coordinates(2) * coordinates(2) * coordinates(1);
        basis_vector(19) = coordinates(0) * coordinates(1) * coordinates(2);
    }
};

struct BasesQuartic {
    constexpr static size_t size = 35;
    constexpr static size_t order = 4;

    KOKKOS_INLINE_FUNCTION
    void BuildBasisVector(const Eigen::Matrix<double, 3, 1>& coordinates, Eigen::Matrix<double, size, 1>& basis_vector) const {
        basis_vector(0) = 1.0;
        basis_vector.template segment<3>(1) = coordinates;
        basis_vector(4) = coordinates(0) * coordinates(0);
        basis_vector(5) = coordinates(1) * coordinates(1);
        basis_vector(6) = coordinates(2) * coordinates(2);
        basis_vector(7) = coordinates(0) * coordinates(1);
        basis_vector(8) = coordinates(0) * coordinates(2);
        basis_vector(9) = coordinates(1) * coordinates(2);
        basis_vector(10) = coordinates(0) * coordinates(0) * coordinates(0);
        basis_vector(11) = coordinates(1) * coordinates(1) * coordinates(1);
        basis_vector(12) = coordinates(2) * coordinates(2) * coordinates(2);
        basis_vector(13) = coordinates(0) * coordinates(0) * coordinates(1);
        basis_vector(14) = coordinates(0) * coordinates(0) * coordinates(2);
        basis_vector(15) = coordinates(1) * coordinates(1) * coordinates(0);
        basis_vector(16) = coordinates(1) * coordinates(1) * coordinates(2);
        basis_vector(17) = coordinates(2) * coordinates(2) * coordinates(0);
        basis_vector(18) = coordinates(2) * coordinates(2) * coordinates(1);
        basis_vector(19) = coordinates(0) * coordinates(1) * coordinates(2);
        basis_vector(20) = coordinates(0) * coordinates(0) * coordinates(0) * coordinates(0);
        basis_vector(21) = coordinates(1) * coordinates(1) * coordinates(1) * coordinates(1);
        basis_vector(22) = coordinates(2) * coordinates(2) * coordinates(2) * coordinates(2);
        basis_vector(23) = coordinates(0) * coordinates(0) * coordinates(0) * coordinates(1);
        basis_vector(24) = coordinates(0) * coordinates(0) * coordinates(0) * coordinates(2);
        basis_vector(25) = coordinates(1) * coordinates(1) * coordinates(1) * coordinates(0);
        basis_vector(26) = coordinates(1) * coordinates(1) * coordinates(1) * coordinates(2);
        basis_vector(27) = coordinates(2) * coordinates(2) * coordinates(2) * coordinates(0);
        basis_vector(28) = coordinates(2) * coordinates(2) * coordinates(2) * coordinates(1);
        basis_vector(29) = coordinates(0) * coordinates(0) * coordinates(1) * coordinates(1);
        basis_vector(30) = coordinates(0) * coordinates(0) * coordinates(2) * coordinates(2);
        basis_vector(31) = coordinates(1) * coordinates(1) * coordinates(2) * coordinates(2);
        basis_vector(32) = coordinates(0) * coordinates(0) * coordinates(1) * coordinates(2);
        basis_vector(33) = coordinates(1) * coordinates(1) * coordinates(0) * coordinates(2);
        basis_vector(34) = coordinates(2) * coordinates(2) * coordinates(0) * coordinates(1);
    }
};

template <size_t MaxNumNeighbors>
struct ShapeFunctionsFunctorReproducingKernel {
    /**
     * @brief Checks if the kernel values form a partition of unity.
     * @param kernel_values The kernel values.
     * @param actual_num_neighbors The actual number of neighbors.
     * @return True if the kernel values form a partition of unity, false otherwise.
     */
    KOKKOS_INLINE_FUNCTION bool CheckPartitionOfUnity(const Eigen::Matrix<double, MaxNumNeighbors, 1>& kernel_values, size_t actual_num_neighbors) const {
        double sum = 0.0;
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            sum += kernel_values(i, 0);
        }
        double diff = Kokkos::abs(sum - 1.0);
        if (diff > 1.0e-6) {
            Kokkos::printf("Sum of kernel values: %.8e\n", sum);
            for (size_t i = 0; i < actual_num_neighbors; i++) {
                Kokkos::printf("Kernel value %zu: %.8e\n", i, kernel_values(i, 0));
            }
            return false;
        }
        return true;
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param shifted_neighbor_coordinates The physical coordinates of the neighbors relative to the evaluation point (evaluation_point_physical_coordinates - neighbor_coordinates).
     * @param actual_num_neighbors The actual number of neighbors.
     * @return The shape function values at the evaluation point.
     */
    template <typename Bases>
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> Values(const Eigen::Matrix<double, MaxNumNeighbors, 1>& kernel_values, const Bases& bases, const Eigen::Matrix<double, MaxNumNeighbors, 3>& shifted_neighbor_coordinates, size_t actual_num_neighbors) const {
        // Allocate function values
        Eigen::Matrix<double, MaxNumNeighbors, 1> function_values = Eigen::Matrix<double, MaxNumNeighbors, 1>::Zero();

        if (actual_num_neighbors == 0) {
            return function_values;
        } else if (actual_num_neighbors == 1) {
            function_values(0, 0) = 1.0;
            return function_values;
        } else if (actual_num_neighbors < Bases::size) {
            // Throw an error if the number of neighbors is less than the matrix size
            printf("The number of neighbors is less than the matrix size. Number of neighbors: %zu, Matrix size: %zu\n", actual_num_neighbors, Bases::size);
            Kokkos::abort("Aborting due to insufficient number of neighbors.");
        }

        // Allocate moment matrix (M) and M^-1
        Eigen::Matrix<double, Bases::size, Bases::size> M = Eigen::Matrix<double, Bases::size, Bases::size>::Zero();

        // Allocate basis vector (H)
        Eigen::Matrix<double, Bases::size, 1> H = Eigen::Matrix<double, Bases::size, 1>::Zero();

        // Loop over neighbor nodes
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            if (kernel_values(i, 0) == 0.0) {
                continue;
            }

            // Compute basis vector (H)
            bases.BuildBasisVector(shifted_neighbor_coordinates.row(i), H);

            // Compute moment matrix (M)
            M += kernel_values(i, 0) * H * H.transpose();
        }

        // Compute M^-1
        Eigen::Matrix<double, Bases::size, Bases::size> M_inv = InvertMatrix(M);

        // Loop over neighbor nodes again
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            if (kernel_values(i, 0) == 0.0) {
                continue;
            }

            // Compute basis vector (H)
            bases.BuildBasisVector(shifted_neighbor_coordinates.row(i), H);

            // Compute shape function value
            function_values(i, 0) = (M_inv.row(0) * H * kernel_values(i, 0))(0);
        }

        // Check partition of unity
        KOKKOS_ASSERT(CheckPartitionOfUnity(function_values, actual_num_neighbors));

        return function_values;
    }
};

}  // namespace aperi
