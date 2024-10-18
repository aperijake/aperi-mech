#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <cstdlib>
#include <memory>
#include <stdexcept>
#include <vector>

#include "ShapeFunctionsFunctorReproducingKernel.h"
#include "ShapeFunctionsFunctorTet4.h"
#include "UnitTestUtils.h"

// Fixture for ShapeFunctionsFunctors tests
class ShapeFunctionsFunctorsTest : public ::testing::Test {
   protected:
    // Setup
    void SetUp() override {
        m_evaluation_points_parametric_coordinates = {
            {0.0, 0.0, 0.0},
            {1.0, 0.0, 0.0},
            {0.0, 1.0, 0.0},
            {0.0, 0.0, 1.0},
            {0.5, 0.5, 0.0},
            {0.25, 0.25, 0.25}};

        m_expected_values = {
            {1.0, 0.0, 0.0, 0.0},
            {0.0, 1.0, 0.0, 0.0},
            {0.0, 0.0, 1.0, 0.0},
            {0.0, 0.0, 0.0, 1.0},
            {0.0, 0.5, 0.5, 0.0},
            {0.25, 0.25, 0.25, 0.25}};
        // Seed the random number generator
        std::srand(42);
    }

    // Check shape function completeness
    static void CheckShapeFunctionCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, size_t order, const Eigen::Matrix<double, Eigen::Dynamic, 3>& node_coordinates, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_points_parametric_coordinates) {
        double tolerance = 4.0e-13 * std::pow(10.0, order - 1);

        // Check the partition of unity
        CheckPartitionOfUnity(shape_functions, tolerance);

        // Calculate the physical coordinates of the evaluation point
        aperi::ShapeFunctionsFunctorTet4 functions_functor;
        // Calculate the shape functions at the evaluation point
        Eigen::Matrix<double, Eigen::Dynamic, 1> cell_shape_functions = functions_functor.Values(evaluation_points_parametric_coordinates, node_coordinates, node_coordinates, 4);
        const Eigen::Matrix<double, 1, 3>& evaluation_point_physical_coordinates = cell_shape_functions.transpose() * node_coordinates;

        if (order >= 1) {
            // Check the linear completeness
            CheckLinearCompleteness(shape_functions, neighbor_coordinates, evaluation_point_physical_coordinates, tolerance);
        }

        if (order >= 2) {
            // Check the quadratic completeness
            CheckQuadraticCompleteness(shape_functions, neighbor_coordinates, evaluation_point_physical_coordinates, tolerance);
        }

        if (order >= 3) {
            // Check the cubic completeness
            CheckCubicCompleteness(shape_functions, neighbor_coordinates, evaluation_point_physical_coordinates, tolerance);
        }

        if (order >= 4) {
            // Check the quartic completeness
            CheckQuarticCompleteness(shape_functions, neighbor_coordinates, evaluation_point_physical_coordinates, tolerance);
        }
    }

    // Check shape function values
    static void CheckShapeFunctionValues(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 1>& expected_shape_functions, size_t expected_num_shape_functions) {
        // Check the number of shape functions
        EXPECT_EQ((size_t)shape_functions.rows(), expected_num_shape_functions);

        // Check the shape function values
        for (size_t i = 0; i < expected_num_shape_functions; ++i) {
            EXPECT_NEAR(shape_functions[i], expected_shape_functions[i], 1.0e-12);
        }
    }

    // Check shape function derivative completeness
    static void CheckShapeFunctionDerivativeCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 3>& shape_function_derivatives) {
        // Check the shape function derivatives
        for (size_t j = 0; j < 3; ++j) {
            // Check the partition of nullity
            CheckPartitionOfNullity(shape_function_derivatives.col(j));
        }
    }

    // Check shape function derivative values
    static void CheckShapeFunctionDerivativeValues(const Eigen::Matrix<double, Eigen::Dynamic, 3>& shape_function_derivatives, const Eigen::Matrix<double, Eigen::Dynamic, 3>& expected_shape_function_derivatives, size_t expected_num_shape_functions) {
        // Check the number of shape functions
        EXPECT_EQ((size_t)shape_function_derivatives.rows(), expected_num_shape_functions);

        // Check the shape function derivatives
        for (size_t j = 0; j < 3; ++j) {
            // Check the shape function derivatives
            for (size_t i = 0; i < expected_num_shape_functions; ++i) {
                EXPECT_NEAR(shape_function_derivatives(i, j), expected_shape_function_derivatives(i, j), 1.0e-12);
            }
        }
    }

    template <typename FunctionsFunctor>
    void TestFunctionsFunctorValues(FunctionsFunctor& functions_functor, size_t order, const Eigen::Matrix<double, 4, 3>& node_coordinates, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const size_t expected_num_shape_functions = 4, bool check_values = true) {
        for (size_t i = 0; i < m_evaluation_points_parametric_coordinates.size(); ++i) {
            // Check the shape functions
            Eigen::Matrix<double, Eigen::Dynamic, 1> shape_functions = functions_functor.Values(m_evaluation_points_parametric_coordinates[i], node_coordinates, neighbor_coordinates, expected_num_shape_functions);
            CheckShapeFunctionCompleteness(shape_functions, order, node_coordinates, neighbor_coordinates, m_evaluation_points_parametric_coordinates[i]);
            if (check_values) {
                CheckShapeFunctionValues(shape_functions, m_expected_values[i], expected_num_shape_functions);
            }
        }
    }

    template <typename FunctionsFunctor>
    void TestFunctionsFunctorDerivatives(FunctionsFunctor& functions_functor, const Eigen::Matrix<double, 4, 3>& /*node_coordinates*/, const size_t expected_num_shape_functions = 4) {
        // Expected shape function derivatives
        Eigen::Matrix<double, 4, 3> expected_shape_function_derivatives;
        expected_shape_function_derivatives << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        // Check the shape function derivatives
        for (auto& m_evaluation_points_parametric_coordinate : m_evaluation_points_parametric_coordinates) {
            Eigen::Matrix<double, 4, 3> shape_function_derivatives = functions_functor.Derivatives(m_evaluation_points_parametric_coordinate);
            CheckShapeFunctionDerivativeCompleteness(shape_function_derivatives);
            CheckShapeFunctionDerivativeValues(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);
        }
    }

    std::vector<Eigen::Matrix<double, 3, 1>> m_evaluation_points_parametric_coordinates;
    std::vector<Eigen::Matrix<double, 4, 1>> m_expected_values;
};

// Test shape functions for a tet4 element
TEST_F(ShapeFunctionsFunctorsTest, Tet4) {
    // Create the tet4 functions functor
    aperi::ShapeFunctionsFunctorTet4 functions_functor;

    const Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    size_t order = 1;
    TestFunctionsFunctorValues(functions_functor, order, node_coordinates, node_coordinates);
    TestFunctionsFunctorDerivatives(functions_functor, node_coordinates);
}

template <size_t MaxNumNeighbors, typename FunctionsFunctor, typename Bases>
struct ShapeFunctionsFunctorReproducingKernelOnTet4 {
    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @param cell_node_coordinates The physical coordinates of the nodes of the element.
     * @param neighbor_coordinates The physical coordinates of the neighbors.
     * @param actual_num_neighbors The actual number of neighbors.
     * @return The shape function values at the evaluation point.
     * @note This function is used for testing purposes only.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> Values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates, const Eigen::Matrix<double, aperi::TET4_NUM_NODES, 3>& cell_node_coordinates, const Eigen::Matrix<double, MaxNumNeighbors, 3>& neighbor_coordinates, size_t actual_num_neighbors) const {
        Eigen::Matrix<double, 1, aperi::TET4_NUM_NODES> cell_shape_functions;
        cell_shape_functions << 1.0 - parametric_coordinates(0) - parametric_coordinates(1) - parametric_coordinates(2),
            parametric_coordinates(0),
            parametric_coordinates(1),
            parametric_coordinates(2);
        Eigen::Matrix<double, 1, 3> evaluation_point_physical_coordinates = cell_shape_functions * cell_node_coordinates;
        Eigen::Matrix<double, MaxNumNeighbors, 3> shifted_neighbor_coordinates;
        Eigen::Matrix<double, MaxNumNeighbors, 1> kernel_values;
        for (size_t i = 0; i < actual_num_neighbors; i++) {
            shifted_neighbor_coordinates.row(i) = evaluation_point_physical_coordinates - neighbor_coordinates.row(i);
            kernel_values(i, 0) = aperi::ComputeKernel(shifted_neighbor_coordinates.row(i), 1.76);
        }

        FunctionsFunctor functions_functor = FunctionsFunctor();
        Bases bases;

        return functions_functor.Values(kernel_values, bases, shifted_neighbor_coordinates, actual_num_neighbors);
    }
};

// Test reproducing kernel shape functions on a tet4 element
// This is a basic, small test to ensure the reproducing kernel shape functions are working
TEST_F(ShapeFunctionsFunctorsTest, ReproducingKernelOnTet4ShapeFunctionsTetOnly) {
    // Create the tet4 functions functor
    ShapeFunctionsFunctorReproducingKernelOnTet4<4, aperi::ShapeFunctionsFunctorReproducingKernel<4>, aperi::BasesLinear> functions_functor;

    Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    size_t order = 1;
    TestFunctionsFunctorValues(functions_functor, order, node_coordinates, node_coordinates);

    // Randomize the node coordinates
    node_coordinates = Eigen::Matrix<double, 4, 3>::Random();
    // Find the bounding box dimensions
    Eigen::Matrix<double, 3, 1> min = node_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = node_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    node_coordinates = (node_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    TestFunctionsFunctorValues(functions_functor, order, node_coordinates, node_coordinates);
}

// Test reproducing kernel shape functions on a tet4 element
// This is a basic, small test to ensure the reproducing kernel shape functions are working
TEST_F(ShapeFunctionsFunctorsTest, ReproducingKernelOnTet4ShapeFunctionsMoreNeighbors) {
    // Create the tet4 functions functor
    ShapeFunctionsFunctorReproducingKernelOnTet4<8, aperi::ShapeFunctionsFunctorReproducingKernel<8>, aperi::BasesLinear> functions_functor;

    Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    Eigen::Matrix<double, 8, 3> neighbor_coordinates = Eigen::Matrix<double, 8, 3>::Random() * 3.0;
    // Find the bounding box dimensions
    Eigen::Matrix<double, 3, 1> min = neighbor_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = neighbor_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    neighbor_coordinates = (neighbor_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    size_t order = 1;
    TestFunctionsFunctorValues(functions_functor, order, node_coordinates, neighbor_coordinates, 8, false);
}

// Test quadratic reproducing kernel shape functions on a tet4 element
TEST_F(ShapeFunctionsFunctorsTest, ReproducingKernelOnTet4ShapeFunctionsQuadratic) {
    constexpr size_t k_num_neighbors = 20;
    // Create the tet4 functions functor
    ShapeFunctionsFunctorReproducingKernelOnTet4<k_num_neighbors, aperi::ShapeFunctionsFunctorReproducingKernel<k_num_neighbors>, aperi::BasesQuadratic> functions_functor;

    Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    Eigen::Matrix<double, k_num_neighbors, 3> neighbor_coordinates = Eigen::Matrix<double, k_num_neighbors, 3>::Random() * 3.0;
    // Find the bounding box dimensions
    Eigen::Matrix<double, 3, 1> min = neighbor_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = neighbor_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    neighbor_coordinates = (neighbor_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    size_t order = 2;
    TestFunctionsFunctorValues(functions_functor, order, node_coordinates, neighbor_coordinates, k_num_neighbors, false);
}

// Test cubic reproducing kernel shape functions on a tet4 element
TEST_F(ShapeFunctionsFunctorsTest, ReproducingKernelOnTet4ShapeFunctionsCubic) {
    constexpr size_t k_num_neighbors = 40;
    // Create the tet4 functions functor
    ShapeFunctionsFunctorReproducingKernelOnTet4<k_num_neighbors, aperi::ShapeFunctionsFunctorReproducingKernel<k_num_neighbors>, aperi::BasesCubic> functions_functor;

    Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    Eigen::Matrix<double, k_num_neighbors, 3> neighbor_coordinates = Eigen::Matrix<double, k_num_neighbors, 3>::Random() * 3.0;
    // Find the bounding box dimensions
    Eigen::Matrix<double, 3, 1> min = neighbor_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = neighbor_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    neighbor_coordinates = (neighbor_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    size_t order = 3;
    TestFunctionsFunctorValues(functions_functor, order, node_coordinates, neighbor_coordinates, k_num_neighbors, false);
}

// Test quartic reproducing kernel shape functions on a tet4 element
TEST_F(ShapeFunctionsFunctorsTest, ReproducingKernelOnTet4ShapeFunctionsQuartic) {
    constexpr size_t k_num_neighbors = 70;
    // Create the tet4 functions functor
    ShapeFunctionsFunctorReproducingKernelOnTet4<k_num_neighbors, aperi::ShapeFunctionsFunctorReproducingKernel<k_num_neighbors>, aperi::BasesQuartic> functions_functor;

    Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    Eigen::Matrix<double, k_num_neighbors, 3> neighbor_coordinates = Eigen::Matrix<double, k_num_neighbors, 3>::Random() * 3.0;
    // Find the bounding box dimensions
    Eigen::Matrix<double, 3, 1> min = neighbor_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = neighbor_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    neighbor_coordinates = (neighbor_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    size_t order = 4;
    TestFunctionsFunctorValues(functions_functor, order, node_coordinates, neighbor_coordinates, k_num_neighbors, false);
}