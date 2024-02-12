#include <gtest/gtest.h>

#include <vector>

#include "ApplicationTestFixture.h"
#include "Element.h"
#include "FieldManager.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"
#include "stk_mesh/base/BulkData.hpp"
#include "stk_mesh/base/CoordinateSystems.hpp"
#include "stk_mesh/base/FieldBase.hpp"
#include "stk_mesh/base/MetaData.hpp"
#include "stk_topology/topology.hpp"
#include "yaml-cpp/yaml.h"

// Fixture for Element tests
class ElementTest : public ApplicationTest {
   protected:
    void SetUp() override {
        // Run ApplicationTest::SetUp first
        ApplicationTest::SetUp();

        // Initialize field data
        m_field_data.push_back({"velocity", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"displacement", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"acceleration", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});

        // Create field manager
        m_field_manager = CreateFieldManager(m_field_data);
    }

    // Create an element
    std::shared_ptr<aperi::Element> CreateElement() {
        // Get the bulk data
        stk::mesh::BulkData& bulk_data = m_io_mesh->GetBulkData();

        // Get part and selector
        stk::mesh::Part* p_part = &m_io_mesh->GetMetaData().declare_part("block_1", stk::topology::ELEMENT_RANK);
        stk::mesh::Selector selector(*p_part);
        EXPECT_FALSE(selector.is_empty(stk::topology::ELEMENT_RANK));

        // Get the element topology
        stk::topology element_topology = p_part->topology();
        return aperi::CreateElement(bulk_data, element_topology);
    }

    // Check partition of unity
    void CheckPartitionOfUnity(const std::vector<double>& shape_functions) {
        // Check the partition of unity
        double sum = 0.0;
        for (size_t i = 0; i < shape_functions.size(); ++i) {
            sum += shape_functions[i];
        }
        EXPECT_NEAR(sum, 1.0, 1.0e-12);
    }

    // Check partition of nullity
    void CheckPartitionOfNullity(const std::vector<double>& shape_function_derivatives) {
        // Check the partition of nullity
        double sum = 0.0;
        for (size_t i = 0; i < shape_function_derivatives.size(); ++i) {
            sum += shape_function_derivatives[i];
        }
        EXPECT_NEAR(sum, 0.0, 1.0e-12);
    }

    // Check shape functions
    void CheckShapeFunctions(const std::vector<double>& shape_functions, const std::vector<double>& expected_shape_functions, const int expected_num_shape_functions) {
        // Check the number of shape functions
        EXPECT_EQ(shape_functions.size(), expected_num_shape_functions);

        // Check the partition of unity
        CheckPartitionOfUnity(shape_functions);

        // Check the shape functions
        for (size_t i = 0; i < shape_functions.size(); ++i) {
            EXPECT_NEAR(shape_functions[i], expected_shape_functions[i], 1.0e-12);
        }
    }

    // Check shape function derivatives
    void CheckShapeFunctionDerivatives(const std::vector<std::array<double, 3>>& shape_function_derivatives, const std::vector<std::array<double, 3>>& expected_shape_function_derivatives, const int expected_num_shape_functions) {
        // Check the number of shape functions
        EXPECT_EQ(shape_function_derivatives.size(), expected_num_shape_functions);

        std::vector<double> shape_function_derivatives_j(shape_function_derivatives.size());

        // Check the shape function derivatives
        for (size_t j = 0; j < 3; ++j) {
            // Check the shape function derivatives
            for (size_t i = 0; i < shape_function_derivatives.size(); ++i) {
                EXPECT_NEAR(shape_function_derivatives[i][j], expected_shape_function_derivatives[i][j], 1.0e-12);
                shape_function_derivatives_j[i] = shape_function_derivatives[i][j];
            }
            // Check the partition of nullity
            CheckPartitionOfNullity(shape_function_derivatives_j);
        }
    }

    // Check the displacement gradient, deformation gradient, and strain
    void CheckGradientsAndStrain(const std::shared_ptr<aperi::Element>& element, const std::array<std::array<double, 3>, 3>& expected_displacement_gradient, const std::vector<std::array<double, 3>>& nodal_coordinates, const std::vector<double>& nodal_displacements) {
        // Expected deformation gradient = expected_displacement_gradient + identity
        std::array<std::array<double, 3>, 3> expected_deformation_gradient = expected_displacement_gradient;
        for (size_t i = 0; i < 3; ++i) {
            expected_deformation_gradient[i][i] += 1.0;
        }

        // Expected Green Lagrange strain = 0.5 * (expected_deformation_gradient^T * expected_deformation_gradient - identity)
        std::array<std::array<double, 3>, 3> expected_strain;
        for (size_t i = 0; i < 3; ++i) {
            for (size_t j = 0; j < 3; ++j) {
                expected_strain[i][j] = 0.0;
                for (size_t k = 0; k < 3; ++k) {
                    expected_strain[i][j] += 0.5 * (expected_deformation_gradient[k][i] * expected_deformation_gradient[k][j]);
                }
                if (i == j) {
                    expected_strain[i][j] -= 0.5;
                }
            }
        }

        std::array<std::array<double, 3>, 3> displacement_gradient = element->ComputeDisplacementGradient(0.0, 0.0, 0.0, nodal_coordinates, nodal_displacements);
        std::array<std::array<double, 3>, 3> deformation_gradient = element->ComputeDeformationGradient(0.0, 0.0, 0.0, nodal_coordinates, nodal_displacements);
        std::array<std::array<double, 3>, 3> other_deformation_gradient = element->ComputeDeformationGradient(displacement_gradient);
        std::array<std::array<double, 3>, 3> strain = element->ComputeGreenLagrangeStrainTensor(0.0, 0.0, 0.0, nodal_coordinates, nodal_displacements);
        std::array<std::array<double, 3>, 3> other_strain = element->ComputeGreenLagrangeStrainTensor(displacement_gradient);

        EXPECT_NEAR_2D(displacement_gradient, expected_displacement_gradient, 1.0e-12);
        EXPECT_NEAR_2D(deformation_gradient, expected_deformation_gradient, 1.0e-12);
        EXPECT_NEAR_2D(other_deformation_gradient, expected_deformation_gradient, 1.0e-12);
        EXPECT_NEAR_2D(strain, expected_strain, 1.0e-12);
        EXPECT_NEAR_2D(other_strain, expected_strain, 1.0e-12);
    }

    void TearDown() override {
        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::FieldManager> m_field_manager;
};

// Test shape functions for a tet4 element
TEST_F(ElementTest, Tet4ShapeFunctions) {
    // Create a temporary mesh file, tet4 by default
    CreateTestMesh(m_field_manager);

    // Create the tet4 element
    std::shared_ptr<aperi::Element> element = CreateElement();

    int expected_num_shape_functions = 4;

    // Check the shape functions
    std::vector<double> shape_functions = element->ComputeShapeFunctions(0.0, 0.0, 0.0);
    std::vector<double> expected_shape_functions = {1.0, 0.0, 0.0, 0.0};
    CheckShapeFunctions(shape_functions, expected_shape_functions, expected_num_shape_functions);
    // Check the shape function derivatives
    std::vector<std::array<double, 3>> shape_function_derivatives = element->ComputeShapeFunctionDerivatives(0.0, 0.0, 0.0);
    std::vector<std::array<double, 3>> expected_shape_function_derivatives = {{-1.0, -1.0, -1.0}, {1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}, {0.0, 0.0, 1.0}};
    CheckShapeFunctionDerivatives(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);

    shape_functions = element->ComputeShapeFunctions(1.0, 0.0, 0.0);
    shape_function_derivatives = element->ComputeShapeFunctionDerivatives(1.0, 0.0, 0.0);
    expected_shape_functions = {0.0, 1.0, 0.0, 0.0};
    CheckShapeFunctions(shape_functions, expected_shape_functions, expected_num_shape_functions);
    CheckShapeFunctionDerivatives(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);

    shape_functions = element->ComputeShapeFunctions(0.0, 1.0, 0.0);
    shape_function_derivatives = element->ComputeShapeFunctionDerivatives(0.0, 1.0, 0.0);
    expected_shape_functions = {0.0, 0.0, 1.0, 0.0};
    CheckShapeFunctions(shape_functions, expected_shape_functions, expected_num_shape_functions);
    CheckShapeFunctionDerivatives(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);

    shape_functions = element->ComputeShapeFunctions(0.0, 0.0, 1.0);
    shape_function_derivatives = element->ComputeShapeFunctionDerivatives(0.0, 0.0, 1.0);
    expected_shape_functions = {0.0, 0.0, 0.0, 1.0};
    CheckShapeFunctions(shape_functions, expected_shape_functions, expected_num_shape_functions);
    CheckShapeFunctionDerivatives(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);

    shape_functions = element->ComputeShapeFunctions(0.5, 0.5, 0.0);
    shape_function_derivatives = element->ComputeShapeFunctionDerivatives(0.5, 0.5, 0.0);
    expected_shape_functions = {0.0, 0.5, 0.5, 0.0};
    CheckShapeFunctions(shape_functions, expected_shape_functions, expected_num_shape_functions);
    CheckShapeFunctionDerivatives(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);

    shape_functions = element->ComputeShapeFunctions(0.25, 0.25, 0.25);
    shape_function_derivatives = element->ComputeShapeFunctionDerivatives(0.25, 0.25, 0.25);
    expected_shape_functions = {0.25, 0.25, 0.25, 0.25};
    CheckShapeFunctions(shape_functions, expected_shape_functions, expected_num_shape_functions);
    CheckShapeFunctionDerivatives(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);
}

// Test Jacobian, Jacobian determinant, inverse Jacobian, and B matrix for a tet4 element
TEST_F(ElementTest, Tet4BMatrix) {
    // Create a temporary mesh file, tet4 by default
    CreateTestMesh(m_field_manager);

    // Create the tet4 element
    std::shared_ptr<aperi::Element> element = CreateElement();

    // Create some nodal coordinates
    std::vector<std::array<double, 3>> nodal_coordinates = {{0.0, 0.0, 0.0}, {1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}, {0.0, 0.0, 1.0}};  // Parent coordinates

    // Check the Jacobian
    std::array<std::array<double, 3>, 3> jacobian = element->ComputeJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    std::array<std::array<double, 3>, 3> expected_jacobian;
    expected_jacobian[0] = {1.0, 0.0, 0.0};
    expected_jacobian[1] = {0.0, 1.0, 0.0};
    expected_jacobian[2] = {0.0, 0.0, 1.0};

    EXPECT_NEAR_2D(jacobian, expected_jacobian, 1.0e-12);

    // Check the Jacobian determinant
    double jacobian_determinant = element->ComputeJacobianDeterminant(0.0, 0.0, 0.0, nodal_coordinates);
    double expected_jacobian_determinant = 1.0;

    // Check the inverse Jacobian
    std::array<std::array<double, 3>, 3> inverse_jacobian = element->ComputeInverseJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    std::array<std::array<double, 3>, 3> expected_inverse_jacobian;
    expected_inverse_jacobian[0] = {1.0, 0.0, 0.0};
    expected_inverse_jacobian[1] = {0.0, 1.0, 0.0};
    expected_inverse_jacobian[2] = {0.0, 0.0, 1.0};

    EXPECT_NEAR(jacobian_determinant, expected_jacobian_determinant, 1.0e-12);

    // Check the B matrix
    std::vector<std::array<double, 3>> b_matrix = element->ComputeBMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    std::vector<std::array<double, 3>> expected_b_matrix = {{-1.0, -1.0, -1.0},
                                                            {1.0, 0.0, 0.0},
                                                            {0.0, 1.0, 0.0},
                                                            {0.0, 0.0, 1.0}};

    EXPECT_NEAR_2D(b_matrix, expected_b_matrix, 1.0e-12);

    // 2 x larger tet4 element
    nodal_coordinates = {{0.0, 0.0, 0.0}, {2.0, 0.0, 0.0}, {0.0, 2.0, 0.0}, {0.0, 0.0, 2.0}};  // Parent coordinates
    jacobian = element->ComputeJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian[0] = {2.0, 0.0, 0.0};
    expected_jacobian[1] = {0.0, 2.0, 0.0};
    expected_jacobian[2] = {0.0, 0.0, 2.0};

    EXPECT_NEAR_2D(jacobian, expected_jacobian, 1.0e-12);

    jacobian_determinant = element->ComputeJacobianDeterminant(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian_determinant = 8.0;

    inverse_jacobian = element->ComputeInverseJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_inverse_jacobian[0] = {0.5, 0.0, 0.0};
    expected_inverse_jacobian[1] = {0.0, 0.5, 0.0};
    expected_inverse_jacobian[2] = {0.0, 0.0, 0.5};

    EXPECT_NEAR(jacobian_determinant, expected_jacobian_determinant, 1.0e-12);

    b_matrix = element->ComputeBMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_b_matrix = {{-0.5, -0.5, -0.5},
                         {0.5, 0.0, 0.0},
                         {0.0, 0.5, 0.0},
                         {0.0, 0.0, 0.5}};
    EXPECT_NEAR_2D(b_matrix, expected_b_matrix, 1.0e-12);

    // 2 x larger in one direction tet4 element
    nodal_coordinates = {{0.0, 0.0, 0.0}, {2.0, 0.0, 0.0}, {0.0, 1.0, 0.0}, {0.0, 0.0, 1.0}};  // Parent coordinates
    jacobian = element->ComputeJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian[0] = {2.0, 0.0, 0.0};
    expected_jacobian[1] = {0.0, 1.0, 0.0};
    expected_jacobian[2] = {0.0, 0.0, 1.0};

    EXPECT_NEAR_2D(jacobian, expected_jacobian, 1.0e-12);

    jacobian_determinant = element->ComputeJacobianDeterminant(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian_determinant = 2.0;

    inverse_jacobian = element->ComputeInverseJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_inverse_jacobian[0] = {0.5, 0.0, 0.0};
    expected_inverse_jacobian[1] = {0.0, 1.0, 0.0};
    expected_inverse_jacobian[2] = {0.0, 0.0, 1.0};

    EXPECT_NEAR(jacobian_determinant, expected_jacobian_determinant, 1.0e-12);

    b_matrix = element->ComputeBMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_b_matrix = {{-0.5, -1.0, -1.0},
                         {0.5, 0.0, 0.0},
                         {0.0, 1.0, 0.0},
                         {0.0, 0.0, 1.0}};

    EXPECT_NEAR_2D(b_matrix, expected_b_matrix, 1.0e-12);

    // 2 x larger in another direction tet4 element
    nodal_coordinates = {{0.0, 0.0, 0.0}, {1.0, 0.0, 0.0}, {0.0, 2.0, 0.0}, {0.0, 0.0, 1.0}};  // Parent coordinates
    jacobian = element->ComputeJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian[0] = {1.0, 0.0, 0.0};
    expected_jacobian[1] = {0.0, 2.0, 0.0};
    expected_jacobian[2] = {0.0, 0.0, 1.0};

    EXPECT_NEAR_2D(jacobian, expected_jacobian, 1.0e-12);

    jacobian_determinant = element->ComputeJacobianDeterminant(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian_determinant = 2.0;

    inverse_jacobian = element->ComputeInverseJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_inverse_jacobian[0] = {1.0, 0.0, 0.0};
    expected_inverse_jacobian[1] = {0.0, 0.5, 0.0};
    expected_inverse_jacobian[2] = {0.0, 0.0, 1.0};

    EXPECT_NEAR(jacobian_determinant, expected_jacobian_determinant, 1.0e-12);

    b_matrix = element->ComputeBMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_b_matrix = {{-1.0, -0.5, -1.0},
                         {1.0, 0.0, 0.0},
                         {0.0, 0.5, 0.0},
                         {0.0, 0.0, 1.0}};
    EXPECT_NEAR_2D(b_matrix, expected_b_matrix, 1.0e-12);

    // 2 x larger in another direction tet4 element
    nodal_coordinates = {{0.0, 0.0, 0.0}, {1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}, {0.0, 0.0, 2.0}};  // Parent coordinates
    jacobian = element->ComputeJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian[0] = {1.0, 0.0, 0.0};
    expected_jacobian[1] = {0.0, 1.0, 0.0};
    expected_jacobian[2] = {0.0, 0.0, 2.0};

    EXPECT_NEAR_2D(jacobian, expected_jacobian, 1.0e-12);

    jacobian_determinant = element->ComputeJacobianDeterminant(0.0, 0.0, 0.0, nodal_coordinates);
    expected_jacobian_determinant = 2.0;

    inverse_jacobian = element->ComputeInverseJacobianMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_inverse_jacobian[0] = {1.0, 0.0, 0.0};
    expected_inverse_jacobian[1] = {0.0, 1.0, 0.0};
    expected_inverse_jacobian[2] = {0.0, 0.0, 0.5};

    EXPECT_NEAR(jacobian_determinant, expected_jacobian_determinant, 1.0e-12);

    b_matrix = element->ComputeBMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    expected_b_matrix = {{-1.0, -1.0, -0.5},
                         {1.0, 0.0, 0.0},
                         {0.0, 1.0, 0.0},
                         {0.0, 0.0, 0.5}};
    EXPECT_NEAR_2D(b_matrix, expected_b_matrix, 1.0e-12);
}

// Test the displacement and deformation gradient for a tet4 element
TEST_F(ElementTest, Tet4DisplacementAndDeformationGradient) {
    // Create a temporary mesh file, tet4 by default
    CreateTestMesh(m_field_manager);

    // Create the tet4 element
    std::shared_ptr<aperi::Element> element = CreateElement();

    // Create some nodal coordinates
    std::vector<std::array<double, 3>> nodal_coordinates = {{0.0, 0.0, 0.0}, {1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}, {0.0, 0.0, 1.0}};  // Parent coordinates

    // Create some nodal displacements
    std::vector<double> nodal_displacements = {0.0, 0.0, 0.0,
                                               0.0, 0.0, 0.0,
                                               0.0, 0.0, 0.0,
                                               0.0, 0.0, 0.0};

    // Check the displacement gradient
    std::array<std::array<double, 3>, 3> expected_displacement_gradient;
    expected_displacement_gradient[0] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, dialate the tet4 element
    nodal_displacements = {0.0, 0.0, 0.0,
                           1.0, 0.0, 0.0,
                           0.0, 1.0, 0.0,
                           0.0, 0.0, 1.0};

    expected_displacement_gradient[0] = {1.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 1.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 1.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, stretch the tet4 element in one direction
    nodal_displacements = {0.0, 0.0, 0.0,
                           1.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0};

    expected_displacement_gradient[0] = {1.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, stretch the tet4 element in another direction
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 1.0, 0.0,
                           0.0, 0.0, 0.0};
    expected_displacement_gradient[0] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 1.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, stretch the tet4 element in another direction
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 1.0};
    expected_displacement_gradient[0] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 1.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, shear the tet4 element in XY plane
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 1.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0};
    expected_displacement_gradient[0] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {1.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, shear the tet4 element in ZX plane
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 0.0, 1.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0};
    expected_displacement_gradient[0] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {1.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, shear the tet4 element in ZY plane
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 1.0,
                           0.0, 0.0, 0.0};
    expected_displacement_gradient[0] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 1.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, shear the tet4 element in XY plane
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           1.0, 0.0, 0.0,
                           0.0, 0.0, 0.0};
    expected_displacement_gradient[0] = {0.0, 1.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, shear the tet4 element in XZ plane
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           1.0, 0.0, 0.0};
    expected_displacement_gradient[0] = {0.0, 0.0, 1.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);

    // ---------------------------------------------------------
    // Create some nodal displacements, shear the tet4 element in YZ plane
    nodal_displacements = {0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0,
                           0.0, 1.0, 0.0};

    expected_displacement_gradient[0] = {0.0, 0.0, 0.0};
    expected_displacement_gradient[1] = {0.0, 0.0, 1.0};
    expected_displacement_gradient[2] = {0.0, 0.0, 0.0};

    CheckGradientsAndStrain(element, expected_displacement_gradient, nodal_coordinates, nodal_displacements);
}

// Fixture for Element patch tests
class ElementPatchTest : public SolverTest {
   protected:
    void SetUp() override {
        // Run SolverTest::SetUp first
        SolverTest::SetUp();
    }

    void TearDown() override {
        // Run SolverTest::TearDown last
        SolverTest::TearDown();
    }

    void RunFullyPrescribedBoundaryConditionProblem(const std::string& mesh_string, const std::array<double, 3>& displacement_direction, double magnitude) {
        // Displacement boundary conditions
        m_yaml_data = CreateTestYaml();
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("initial_conditions");
        AddDisplacementBoundaryConditions(m_yaml_data);
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["sets"][0] = "surface_1";
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["magnitude"] = -magnitude;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][0] = displacement_direction[0];
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][1] = displacement_direction[1];
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][2] = displacement_direction[2];

        // Deep copy the first boundary condition to create a second boundary condition
        YAML::Node second_boundary_condition = Clone(m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]);
        // Change the boundary condition to apply to a different set
        second_boundary_condition["displacement"]["sets"][0] = "surface_2";
        // Change the magnitude and direction of the second boundary condition
        second_boundary_condition["displacement"]["vector"]["magnitude"] = magnitude;
        // Add a second boundary condition
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"].push_back(second_boundary_condition);

        // Change the young's modulus, poisson's ratio, and density
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["youngs_modulus"] = 1.0;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["poissons_ratio"] = 0.0;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"] = 8.0;  // Each node has a mass of around 1.0

        CreateInputFile();

        CreateTestMesh(mesh_string);

        RunSolver();
    }

    std::array<double, 3> GetExpectedPositiveForces(int face_direction, double cross_section_area, const std::array<double, 6>& expected_second_piola_kirchhoff_stress, const std::array<std::array<double, 3>, 3>& expected_deformation_gradient) {
        // S = P * F^-T
        // P = S F^T
        // Force = /sum_ip B P J w = /sum_ip B S F^T J w // sum over integration points, ip
        // Unit cube:
        //  Force = B S F^T
        std::array<double, 3> expected_force;
        if (face_direction == 0) {
            expected_force[0] = expected_second_piola_kirchhoff_stress[0] * expected_deformation_gradient[0][0] + expected_second_piola_kirchhoff_stress[5] * expected_deformation_gradient[0][1] + expected_second_piola_kirchhoff_stress[4] * expected_deformation_gradient[0][2];
            expected_force[1] = expected_second_piola_kirchhoff_stress[0] * expected_deformation_gradient[1][0] + expected_second_piola_kirchhoff_stress[5] * expected_deformation_gradient[1][1] + expected_second_piola_kirchhoff_stress[4] * expected_deformation_gradient[1][2];
            expected_force[2] = expected_second_piola_kirchhoff_stress[0] * expected_deformation_gradient[2][0] + expected_second_piola_kirchhoff_stress[5] * expected_deformation_gradient[2][1] + expected_second_piola_kirchhoff_stress[4] * expected_deformation_gradient[2][2];
        } else if (face_direction == 1) {
            expected_force[0] = expected_second_piola_kirchhoff_stress[5] * expected_deformation_gradient[0][0] + expected_second_piola_kirchhoff_stress[1] * expected_deformation_gradient[0][1] + expected_second_piola_kirchhoff_stress[3] * expected_deformation_gradient[0][2];
            expected_force[1] = expected_second_piola_kirchhoff_stress[5] * expected_deformation_gradient[1][0] + expected_second_piola_kirchhoff_stress[1] * expected_deformation_gradient[1][1] + expected_second_piola_kirchhoff_stress[3] * expected_deformation_gradient[1][2];
            expected_force[2] = expected_second_piola_kirchhoff_stress[5] * expected_deformation_gradient[2][0] + expected_second_piola_kirchhoff_stress[1] * expected_deformation_gradient[2][1] + expected_second_piola_kirchhoff_stress[3] * expected_deformation_gradient[2][2];
        } else if (face_direction == 2) {
            expected_force[0] = expected_second_piola_kirchhoff_stress[4] * expected_deformation_gradient[0][0] + expected_second_piola_kirchhoff_stress[3] * expected_deformation_gradient[0][1] + expected_second_piola_kirchhoff_stress[2] * expected_deformation_gradient[0][2];
            expected_force[1] = expected_second_piola_kirchhoff_stress[4] * expected_deformation_gradient[1][0] + expected_second_piola_kirchhoff_stress[3] * expected_deformation_gradient[1][1] + expected_second_piola_kirchhoff_stress[2] * expected_deformation_gradient[1][2];
            expected_force[2] = expected_second_piola_kirchhoff_stress[4] * expected_deformation_gradient[2][0] + expected_second_piola_kirchhoff_stress[3] * expected_deformation_gradient[2][1] + expected_second_piola_kirchhoff_stress[2] * expected_deformation_gradient[2][2];
        } else {
            throw std::runtime_error("Invalid face direction");
        }
        // Size multiplier due to the number of unit cubes
        expected_force[0] *= cross_section_area;
        expected_force[1] *= cross_section_area;
        expected_force[2] *= cross_section_area;
        return expected_force;
    }

    void CheckForcesAndFields(const std::array<double, 3>& expected_force, double volume) {
        // Get the expected negative force
        std::array<double, 3> expected_force_negative = {-expected_force[0], -expected_force[1], -expected_force[2]};

        // Check the force balance
        std::array<double, 3> expected_zero = {0.0, 0.0, 0.0};
        CheckNodeFieldSum(*m_solver->GetBulkData(), m_universal_selector, "force", expected_zero);

        // Get selector for the first set
        stk::mesh::Part* p_set_part_1 = m_io_mesh->GetMetaData().get_part("surface_1");
        stk::mesh::Selector set_selector_1(*p_set_part_1);

        CheckNodeFieldSum(*m_solver->GetBulkData(), set_selector_1, "force", expected_force);

        // Get selector for the second set
        stk::mesh::Part* p_set_part_2 = m_io_mesh->GetMetaData().get_part("surface_2");
        stk::mesh::Selector set_selector_2(*p_set_part_2);

        CheckNodeFieldSum(*m_solver->GetBulkData(), set_selector_2, "force", expected_force_negative);

        // Check the mass
        double density = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
        double mass = density * volume;
        std::array<double, 3> expected_mass = {mass, mass, mass};
        CheckNodeFieldSum(*m_solver->GetBulkData(), m_universal_selector, "mass", expected_mass);

        // Check the boundary conditions
        const YAML::Node boundary_conditions = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];
        std::array<double, 3> direction = boundary_conditions[1]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
        double magnitude = boundary_conditions[1]["displacement"]["vector"]["magnitude"].as<double>();
        double final_time = 1.0;
        std::array<double, 3> expected_displacement_positive = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
        std::array<double, 3> expected_velocity_positive = {expected_displacement_positive[0] / final_time, expected_displacement_positive[1] / final_time, expected_displacement_positive[2] / final_time};
        std::array<double, 3> expected_displacement_negative = {-expected_displacement_positive[0], -expected_displacement_positive[1], -expected_displacement_positive[2]};
        std::array<double, 3> expected_velocity_negative = {-expected_velocity_positive[0], -expected_velocity_positive[1], -expected_velocity_positive[2]};

        CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_1, "displacement", expected_displacement_negative);
        CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_2, "displacement", expected_displacement_positive);
        CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_1, "velocity", expected_velocity_negative);
        CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_2, "velocity", expected_velocity_positive);
        CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "acceleration", expected_zero);
    }
};

// Tests element calculations. Explicit test for a simple cube in tension in x. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitTensionX) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = "1x" + std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "|sideset:xX|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0 + 2.0 * magnitude, 0.0, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0, 0.0};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.22, 0.0, 0.0, 0.0, 0.0, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);
    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in compression in x. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitCompressionX) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = -0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = "1x" + std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "|sideset:xX|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0 + 2.0 * magnitude, 0.0, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0, 0.0};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {-0.18, 0.0, 0.0, 0.0, 0.0, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in tension in y. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitTensionY) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 1.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:yY|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 0.0, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0 + 2.0 * magnitude, 0.0};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.0, 0.22, 0.0, 0.0, 0.0, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in tension in z. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitTensionZ) {
    // Exit if the number of processors is not 1
    // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
    // Thus, all DOFs are not constrained and some noise will be present in the fields.
    if (m_num_procs != 1) {
        return;
    }
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1 * m_num_procs;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 0.0, 1.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:zZ|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 0.0, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0, 0.0};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0 + 2.0 * magnitude / m_num_procs};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.0, 0.0, 0.22, 0.0, 0.0, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitShearYX) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 1.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = "1x" + std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "|sideset:xX|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 0.0, 0.0};
    expected_deformation_gradient[1] = {2.0 * magnitude, 1.0, 0.0};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.02, 0.0, 0.0, 0.0, 0.0, 0.1};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitShearZX) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 0.0, 1.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = "1x" + std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "|sideset:xX|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 0.0, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0, 0.0};
    expected_deformation_gradient[2] = {2.0 * magnitude, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.02, 0.0, 0.0, 0.0, 0.1, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitShearXY) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:yY|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 2.0 * magnitude, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0, 0.0};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.0, 0.02, 0.0, 0.0, 0.0, 0.1};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitShearZY) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 0.0, 1.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:yY|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 0.0, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0, 0.0};
    expected_deformation_gradient[2] = {0.0, 2.0 * magnitude, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.0, 0.02, 0.0, 0.1, 0.0, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitShearXZ) {
    // Exit if the number of processors is not 1
    // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
    // Thus, all DOFs are not constrained and some noise will be present in the fields.
    if (m_num_procs != 1) {
        return;
    }

    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1 * m_num_procs;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:zZ|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 0.0, 2.0 * magnitude / m_num_procs};
    expected_deformation_gradient[1] = {0.0, 1.0, 0.0};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.0, 0.0, 0.02, 0.0, 0.1, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchTest, ExplicitShearYZ) {
    // Exit if the number of processors is not 1
    // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
    // Thus, all DOFs are not constrained and some noise will be present in the fields.
    if (m_num_procs != 1) {
        return;
    }
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1 * m_num_procs;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 1.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "x1" + "|sideset:zZ|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude);

    // Set the expected deformation gradient
    std::array<std::array<double, 3>, 3> expected_deformation_gradient;
    expected_deformation_gradient[0] = {1.0, 0.0, 0.0};
    expected_deformation_gradient[1] = {0.0, 1.0, 2.0 * magnitude / m_num_procs};
    expected_deformation_gradient[2] = {0.0, 0.0, 1.0};

    // Set the expected second piola kirchhoff stress
    std::array<double, 6> expected_second_piola_kirchhoff_stress = {0.0, 0.0, 0.02, 0.1, 0.0, 0.0};

    // Get the expected forces
    std::array<double, 3> expected_force = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, expected_deformation_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}