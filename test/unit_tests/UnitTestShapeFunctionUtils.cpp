#include "UnitTestShapeFunctionUtils.h"

#include <gtest/gtest.h>

// Check partition of unity
void CheckPartitionOfUnity(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, double tolerance) {
    // Check the partition of unity
    double sum = shape_functions.sum();
    EXPECT_NEAR(sum, 1.0, tolerance);
}

// Check partition of nullity
void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& shape_function_derivatives, double tolerance) {
    // Check the partition of nullity
    double sum = shape_function_derivatives.sum();
    EXPECT_NEAR(sum, 0.0, tolerance);
}

// Check linear completeness
void CheckLinearCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the linear completeness
    // x = /sum_i N_i * x_i
    const Eigen::Matrix<double, 1, 3>& calculated_physical_coordinates = shape_functions.transpose() * neighbor_coordinates;
    for (size_t i = 0; i < 3; ++i) {
        EXPECT_NEAR(calculated_physical_coordinates(0, i), evaluation_point_phyiscal_coordinates(0, i), tolerance);
    }
}

// Check quadratic completeness
void CheckQuadraticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the quadratic completeness
    // x_i * x_j = /sum_i N_i * x_i * x_j
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            double calculated_value = 0.0;
            for (size_t k = 0; k < static_cast<size_t>(shape_functions.rows()); ++k) {
                calculated_value += shape_functions(k) * neighbor_coordinates(k, i) * neighbor_coordinates(k, j);
            }
            EXPECT_NEAR(calculated_value, evaluation_point_phyiscal_coordinates(0, i) * evaluation_point_phyiscal_coordinates(0, j), tolerance);
        }
    }
}

// Check cubic completeness
void CheckCubicCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the cubic completeness
    // x_i * x_j * x_k = /sum_i N_i * x_i * x_j * x_k
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            for (size_t k = 0; k < 3; ++k) {
                double calculated_value = 0.0;
                for (size_t l = 0; l < static_cast<size_t>(shape_functions.rows()); ++l) {
                    calculated_value += shape_functions(l) * neighbor_coordinates(l, i) * neighbor_coordinates(l, j) * neighbor_coordinates(l, k);
                }
                EXPECT_NEAR(calculated_value, evaluation_point_phyiscal_coordinates(0, i) * evaluation_point_phyiscal_coordinates(0, j) * evaluation_point_phyiscal_coordinates(0, k), tolerance);
            }
        }
    }
}

// Check quartic completeness
void CheckQuarticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance) {
    // Check the quartic completeness
    // x_i * x_j * x_k * x_l = /sum_i N_i * x_i * x_j * x_k * x_l
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            for (size_t k = 0; k < 3; ++k) {
                for (size_t l = 0; l < 3; ++l) {
                    double calculated_value = 0.0;
                    for (size_t m = 0; m < static_cast<size_t>(shape_functions.rows()); ++m) {
                        calculated_value += shape_functions(m) * neighbor_coordinates(m, i) * neighbor_coordinates(m, j) * neighbor_coordinates(m, k) * neighbor_coordinates(m, l);
                    }
                    EXPECT_NEAR(calculated_value, evaluation_point_phyiscal_coordinates(0, i) * evaluation_point_phyiscal_coordinates(0, j) * evaluation_point_phyiscal_coordinates(0, k) * evaluation_point_phyiscal_coordinates(0, l), tolerance);
                }
            }
        }
    }
}