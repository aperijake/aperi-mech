#include <gtest/gtest.h>

#include <vector>

#include "ApplicationTestFixture.h"
#include "Element.h"
#include "FieldManager.h"
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
        m_capture_output = false;
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
    std::vector<std::vector<double>> b_matrix = element->ComputeBMatrix(0.0, 0.0, 0.0, nodal_coordinates);
    std::vector<std::vector<double>> expected_b_matrix = {{-1.0, 1.0, 0.0, 0.0},
                                                          {-1.0, 0.0, 1.0, 0.0},
                                                          {-1.0, 0.0, 0.0, 1.0}};

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
    expected_b_matrix = {{-0.5, 0.5, 0.0, 0.0},
                         {-0.5, 0.0, 0.5, 0.0},
                         {-0.5, 0.0, 0.0, 0.5}};
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
    expected_b_matrix = {{-0.5, 0.5, 0.0, 0.0},
                         {-1.0, 0.0, 1.0, 0.0},
                         {-1.0, 0.0, 0.0, 1.0}};
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
    expected_b_matrix = {{-1.0, 1.0, 0.0, 0.0},
                         {-0.5, 0.0, 0.5, 0.0},
                         {-1.0, 0.0, 0.0, 1.0}};
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
    expected_b_matrix = {{-1.0, 1.0, 0.0, 0.0},
                         {-1.0, 0.0, 1.0, 0.0},
                         {-0.5, 0.0, 0.0, 0.5}};
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
}
