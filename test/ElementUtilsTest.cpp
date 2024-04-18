#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <cmath>
#include <vector>

#include "Element.h"
#include "ElementUtils.h"
#include "FieldData.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"
#include "yaml-cpp/yaml.h"

// Fixture for ElementBase tests
class ElementUtilsTest : public ::testing::Test {
   protected:
    // Check partition of nullity
    void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& shape_function_derivatives) {
        // Check the partition of nullity
        double sum = shape_function_derivatives.sum();
        EXPECT_NEAR(sum, 0.0, 1.0e-12);
    }

    // Check b matrix and weight
    void CheckBMatrixAndWeight(const Kokkos::pair<Eigen::Matrix<double, 4, 3>, double>& b_matrix_and_weight, const Eigen::Matrix<double, 4, 3>& expected_b_matrix, const double expected_weight, std::string message = "") {
        // Check the shape function derivatives
        for (size_t j = 0; j < 3; ++j) {
            // Check the shape function derivatives
            for (size_t i = 0; i < 4; ++i) {
                EXPECT_NEAR(b_matrix_and_weight.first(i, j), expected_b_matrix(i, j), 1.0e-12) << message;
            }
            // Check the partition of nullity
            CheckPartitionOfNullity(b_matrix_and_weight.first.col(j));
        }

        // Check the weight
        EXPECT_NEAR(b_matrix_and_weight.second, expected_weight, 1.0e-12) << message;
    }

    template <typename QuadratureFunctor>
    void RunAllTestCases(QuadratureFunctor& quad1) {
        // Initialize the shape function derivatives functor
        aperi::Tet4FunctionDerivativesFunctor tet4_function_derivatives_functor;

        // Get the shape function derivatives
        Eigen::Matrix<double, 4, 3> shape_function_derivatives = tet4_function_derivatives_functor(0.25, 0.25, 0.25);

        // ------------------------------
        // Reference tetrahedron
        // ------------------------------
        // Set up node coordinates
        Eigen::Matrix<double, 4, 3> node_coordinates;
        node_coordinates << 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;

        Kokkos::pair<Eigen::Matrix<double, 4, 3>, double> b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, shape_function_derivatives, 0);

        // Check the B matrix and weight
        Eigen::Matrix<double, 4, 3> expected_b_matrix;
        expected_b_matrix << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        double expected_weight = 1.0 / 6.0;

        CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, "Reference tetrahedron");

        // ------------------------------
        // Dilated reference tetrahedron
        // ------------------------------
        double factor = 1.27;

        // Set up node coordinates
        node_coordinates *= factor;

        b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, shape_function_derivatives, 0);

        // Check the B matrix and weight
        expected_b_matrix /= factor;
        expected_weight *= factor * factor * factor;

        CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, "Dilated reference tetrahedron");

        // ------------------------------
        // Translated reference tetrahedron
        // ------------------------------
        Eigen::Vector3d translation(0.512, -4.79, 103.1);

        // Set up node coordinates
        node_coordinates.rowwise() += translation.transpose();

        b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, shape_function_derivatives, 0);

        CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, "Translated reference tetrahedron");

        // ------------------------------
        // Rotated reference tetrahedron
        // ------------------------------
        Eigen::Vector3d axis(1.2, -2.3, 1.4);
        axis.normalize();
        double angle = 0.36 * M_PI;

        // Set up node coordinates
        Eigen::Matrix3d rotation = Eigen::AngleAxisd(angle, axis).toRotationMatrix();
        node_coordinates << 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        node_coordinates *= rotation;

        b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, shape_function_derivatives, 0);

        expected_b_matrix << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        expected_b_matrix *= rotation;

        expected_weight = 1.0 / 6.0;

        CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, "Rotated reference tetrahedron");

        // ------------------------------
        // Deformed tetrahedron
        // ------------------------------
        // Set up node coordinates
        node_coordinates << 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;

        Eigen::Matrix3d deformation_gradient = Eigen::Matrix3d::Random();
        node_coordinates *= deformation_gradient;

        b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, shape_function_derivatives, 0);

        expected_b_matrix << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        expected_b_matrix *= deformation_gradient.inverse().transpose();

        expected_weight = deformation_gradient.determinant() * 1.0 / 6.0;

        CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, "Deformed tetrahedron");
    }
};

// Test shape functions for a tet4 element
TEST_F(ElementUtilsTest, Tet4BMatrixAndWeight) {
    // Initialize the quadrature. TODO(jake): Move points and weights to a more general location.
    const Eigen::Matrix<double, 1, 3> gauss_points = Eigen::Matrix<double, 1, 3>::Constant(0.25);
    const Eigen::Matrix<double, 1, 1> gauss_weights = Eigen::Matrix<double, 1, 1>::Constant(1.0 / 6.0);
    aperi::Quadrature<1, 4> quad1(gauss_points, gauss_weights);

    RunAllTestCases(quad1);
}