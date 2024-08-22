#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <cmath>
#include <cstdlib>
#include <vector>

#include "Element.h"
#include "FieldData.h"
#include "QuadratureGaussian.h"
#include "QuadratureSmoothed.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"
#include "ShapeFunctionsFunctorTet4.h"
#include "UnitTestUtils.h"
#include "yaml-cpp/yaml.h"

// Set of inputs and expected values for the ComputeBMatrixAndWeight function
std::vector<std::tuple<Eigen::Matrix<double, 4, 3>, Eigen::Matrix<double, 4, 3>, double, std::string>> GetComputeBMatrixAndWeightInputsAndGolds() {
    // Cases:
    // 1. Reference tetrahedron
    // 2. Contracted (dilation < 1) reference tetrahedron
    // 3. Translated reference tetrahedron
    // 4. Rotated reference tetrahedron
    // 5. Random deformed tetrahedron

    std::vector<std::tuple<Eigen::Matrix<double, 4, 3>, Eigen::Matrix<double, 4, 3>, double, std::string>> inputs_and_golds;
    // ------------------------------
    // Reference tetrahedron
    // ------------------------------
    // Set up node coordinates
    Eigen::Matrix<double, 4, 3> node_coordinates;
    node_coordinates << 0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0;

    Eigen::Matrix<double, 4, 3> expected_b_matrix;
    expected_b_matrix << -1.0, -1.0, -1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0;
    double expected_weight = 1.0 / 6.0;

    inputs_and_golds.emplace_back(node_coordinates, expected_b_matrix, expected_weight, "Reference tetrahedron");

    // ------------------------------
    // Contracted (dilation < 1) reference tetrahedron
    // ------------------------------
    double factor = 0.78;

    // Set up node coordinates
    node_coordinates *= factor;

    // Check the B matrix and weight
    expected_b_matrix /= factor;
    expected_weight *= factor * factor * factor;

    inputs_and_golds.emplace_back(node_coordinates, expected_b_matrix, expected_weight, "Contracted reference tetrahedron");

    // ------------------------------
    // Translated reference tetrahedron
    // ------------------------------
    Eigen::Vector3d translation(0.512, -4.79, 103.1);

    // Set up node coordinates
    node_coordinates.rowwise() += translation.transpose();

    inputs_and_golds.emplace_back(node_coordinates, expected_b_matrix, expected_weight, "Contracted and translated reference tetrahedron");

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

    expected_b_matrix << -1.0, -1.0, -1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0;
    expected_b_matrix *= rotation;

    expected_weight = 1.0 / 6.0;

    inputs_and_golds.emplace_back(node_coordinates, expected_b_matrix, expected_weight, "Rotated reference tetrahedron");

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
    // Find the bounding box of the deformed tetrahedron
    Eigen::Matrix<double, 3, 1> min = node_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = node_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    node_coordinates = (node_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    deformation_gradient = deformation_gradient * bounding_box_dimensions.asDiagonal().inverse();

    expected_b_matrix << -1.0, -1.0, -1.0,
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0;
    expected_b_matrix *= deformation_gradient.inverse().transpose();

    expected_weight = deformation_gradient.determinant() * 1.0 / 6.0;

    inputs_and_golds.emplace_back(node_coordinates, expected_b_matrix, expected_weight, "Deformed tetrahedron");

    return inputs_and_golds;
}

// Base fixture for quadrature tests
class QuadratureTest : public ::testing::Test {
   protected:
    // Set up the test fixture
    void SetUp() override {
        // Seed the random number generator
        std::srand(42);
    }

    // Check b matrix and weight
    static void CheckBMatrixAndWeight(const Kokkos::pair<Eigen::Matrix<double, 4, 3>, double>& b_matrix_and_weight, const Eigen::Matrix<double, 4, 3>& expected_b_matrix, const double expected_weight, const std::string& message = "") {
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

    static void RunAllTestCasesGaussQuadrature() {
        // Initialize the quadrature. TODO(jake): Move points and weights to a more general location.
        const Eigen::Matrix<double, 1, 3> gauss_points = Eigen::Matrix<double, 1, 3>::Constant(0.25);
        const Eigen::Matrix<double, 1, 1> gauss_weights = Eigen::Matrix<double, 1, 1>::Constant(1.0 / 6.0);
        aperi::Quadrature<1, 4> quad1(gauss_points, gauss_weights);

        aperi::ShapeFunctionsFunctorTet4 tet4_functions_functor;

        // Get the inputs and expected values
        auto inputs_and_golds = GetComputeBMatrixAndWeightInputsAndGolds();

        EXPECT_GT(inputs_and_golds.size(), 0) << "No test cases found";

        // Loop over the test cases
        for (const auto& [node_coordinates, expected_b_matrix, expected_weight, message] : inputs_and_golds) {
            Kokkos::pair<Eigen::Matrix<double, 4, 3>, double> b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, tet4_functions_functor, 0);
            CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, message);
        }
    }

    static void RunAllTestCasesStrainSmoothing() {
        // Initialize the quadrature.
        aperi::SmoothedQuadrature<4> quad1;

        // Get the inputs and expected values
        auto inputs_and_golds = GetComputeBMatrixAndWeightInputsAndGolds();

        EXPECT_GT(inputs_and_golds.size(), 0) << "No test cases found";

        // Loop over the test cases
        for (const auto& [node_coordinates, expected_b_matrix, expected_weight, message] : inputs_and_golds) {
            Kokkos::pair<Eigen::Matrix<double, 4, 3>, double> b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates);
            CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, message);
        }
    }
};

// Test b matrix and weight for a 4-node tetrahedron element. This test is for a 1-point quadrature.
TEST_F(QuadratureTest, Tet4GaussQuadrature) {
    RunAllTestCasesGaussQuadrature();
}

// Test b matrix and weight for a 4-node tetrahedron element. This test is for strain smoothing.
TEST_F(QuadratureTest, Tet4StrainSmoothing) {
    RunAllTestCasesStrainSmoothing();
}