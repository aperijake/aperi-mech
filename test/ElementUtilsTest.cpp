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
    void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& function_vals) {
        // Check the partition of nullity
        double sum = function_vals.sum();
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

    template <typename QuadratureFunctor, typename FunctionsFunctor>
    Kokkos::pair<Eigen::Matrix<double, 4, 3>, double> ComputeElementBMatrixAndWeight(QuadratureFunctor& quad1, const Eigen::Matrix<double, 4, 3>& node_coordinates, FunctionsFunctor& functions_functor) {
        return quad1.ComputeBMatrixAndWeight(node_coordinates, functions_functor, 0);
    }

    // TODO(jake): Generalize to more than tet4 elements
    template <typename QuadratureFunctor, typename FunctionsFunctor>
    Kokkos::pair<Eigen::Matrix<double, 4, 3>, double> ComputeCellBMatrixAndWeight(QuadratureFunctor& quad1, const Eigen::Matrix<double, 4, 3>& cell_node_coordinates, const Eigen::Matrix<double, 4, 3>& neighbor_coordinates, FunctionsFunctor& functions_functor) {
        return quad1.ComputeBMatrixAndWeight(cell_node_coordinates, neighbor_coordinates, functions_functor, 0, 4);
    }

    template <typename QuadratureFunctor, typename FunctionsFunctor>
    void RunAllTestCases(QuadratureFunctor& quad1, FunctionsFunctor& functions_functor, bool use_strain_smoothing = false) {
        // ------------------------------
        // Reference tetrahedron
        // ------------------------------
        // Set up node coordinates
        Eigen::Matrix<double, 4, 3> node_coordinates;
        node_coordinates << 0.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;

        Kokkos::pair<Eigen::Matrix<double, 4, 3>, double> b_matrix_and_weight;
        if (use_strain_smoothing) {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, node_coordinates, functions_functor, 0, 4);
        } else {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, functions_functor, 0);
        }

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

        if (use_strain_smoothing) {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, node_coordinates, functions_functor, 0, 4);
        } else {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, functions_functor, 0);
        }

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

        if (use_strain_smoothing) {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, node_coordinates, functions_functor, 0, 4);
        } else {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, functions_functor, 0);
        }

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

        if (use_strain_smoothing) {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, node_coordinates, functions_functor, 0, 4);
        } else {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, functions_functor, 0);
        }

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

        if (use_strain_smoothing) {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, node_coordinates, functions_functor, 0, 4);
        } else {
            b_matrix_and_weight = quad1.ComputeBMatrixAndWeight(node_coordinates, functions_functor, 0);
        }

        expected_b_matrix << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        expected_b_matrix *= deformation_gradient.inverse().transpose();

        expected_weight = deformation_gradient.determinant() * 1.0 / 6.0;

        CheckBMatrixAndWeight(b_matrix_and_weight, expected_b_matrix, expected_weight, "Deformed tetrahedron");
    }
};

// Test b matrix and weight for a 4-node tetrahedron element. This test is for a 1-point quadrature.
TEST_F(ElementUtilsTest, Tet4BMatrixAndWeight) {
    // Initialize the quadrature. TODO(jake): Move points and weights to a more general location.
    const Eigen::Matrix<double, 1, 3> gauss_points = Eigen::Matrix<double, 1, 3>::Constant(0.25);
    const Eigen::Matrix<double, 1, 1> gauss_weights = Eigen::Matrix<double, 1, 1>::Constant(1.0 / 6.0);
    aperi::Quadrature<1, 4> quad1(gauss_points, gauss_weights);

    aperi::Tet4FunctionsFunctor tet4_functions_functor;

    RunAllTestCases(quad1, tet4_functions_functor);
}

// Test b matrix and weight for a 4-node tetrahedron element. This test is for strain smoothing.
TEST_F(ElementUtilsTest, Tet4StrainSmoothingBMatrixAndWeight) {
    // Initialize the quadrature.
    aperi::SmoothedQuadrature<4> quad1;

    bool use_strain_smoothing = true;

    aperi::Tet4FunctionsFunctor tet4_functions_functor;

    RunAllTestCases(quad1, tet4_functions_functor, use_strain_smoothing);
}

// Test b matrix and weight for reproducing kernel strain smoothed on a 4-node tetrahedron element.
TEST_F(ElementUtilsTest, ReproducingKernelOnTet4BMatrixAndWeight) {
    // Initialize the quadrature.
    aperi::SmoothedQuadrature<4> quad1;

    bool use_strain_smoothing = true;

    aperi::ReproducingKernelOnTet4FunctionsFunctor<4> functions_functor;

    RunAllTestCases(quad1, functions_functor, use_strain_smoothing);
}