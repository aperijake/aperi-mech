#include <gtest/gtest.h>
#include <mpi.h>

#include "AperiStkUtils.h"
#include "EntityProcessor.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldTestFixture.h"
#include "MeshData.h"

// Test node field access using raw pointers
TEST_F(FieldTestFixture, NodalFieldAccessRawPointer) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_node_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    SubtractFieldValuesFromRawPointer<3, 1>(field_query_data);

    // Get the norm
    double new_norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test element field access using raw pointers
TEST_F(FieldTestFixture, ElementFieldAccessRawPointer) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_element_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    SubtractFieldValuesFromRawPointer<3, 3>(field_query_data);

    // Get the norm
    double new_norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test node field access using Eigen maps
TEST_F(FieldTestFixture, NodalFieldAccessEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_node_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    SubtractFieldValuesFromEigenMap<3, 1>(field_query_data);

    // Get the norm
    double new_norm = m_node_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test element field access using Eigen maps
TEST_F(FieldTestFixture, ElementFieldAccessEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double min = 0.0;
    double max = 1.0;
    size_t seed = 3;

    // Randomize the field
    m_element_processor->RandomizeField(0, min, max, seed);

    // Get the norm
    double norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is not zero
    EXPECT_NE(norm, 0.0);

    // Subtract the field values
    aperi::FieldQueryData<double> field_query_data{"element_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
    SubtractFieldValuesFromEigenMap<3, 3>(field_query_data);

    // Get the norm
    double new_norm = m_element_processor->CalculateFieldNorm(0);

    // Make sure the norm is zero
    EXPECT_NEAR(new_norm, 0.0, 1.0e-8) << "Original norm: " << norm << ", New norm: " << new_norm;
}

// Test AtomicAdd method
TEST_F(FieldTestFixture, AtomicAdd) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    aperi::Index index(stk::mesh::FastMeshIndex{0, 0});
    field.AtomicAdd(index, data);

    Eigen::Vector3d result = field.GetEigenMatrix<3, 1>(index);
    EXPECT_EQ(result, data);
}

// Test Add method
TEST_F(FieldTestFixture, Add) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    aperi::Index index(stk::mesh::FastMeshIndex{0, 0});
    field.Add(index, data);

    Eigen::Vector3d result = field.GetEigenMatrix<3, 1>(index);
    EXPECT_EQ(result, data);
}

// Test AtomicAssign method
TEST_F(FieldTestFixture, AtomicAssign) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    aperi::Index index(stk::mesh::FastMeshIndex{0, 0});
    field.AtomicAssign(index, data);

    Eigen::Vector3d result = field.GetEigenMatrix<3, 1>(index);
    EXPECT_EQ(result, data);
}

// Test Assign method
TEST_F(FieldTestFixture, Assign) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    Eigen::Vector3d data(1.0, 2.0, 3.0);
    aperi::Index index(stk::mesh::FastMeshIndex{0, 0});
    field.Assign(index, data);

    Eigen::Vector3d result = field.GetEigenMatrix<3, 1>(index);
    EXPECT_EQ(result, data);
}

// Test data method
TEST_F(FieldTestFixture, DataMethod) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    aperi::Index index(stk::mesh::FastMeshIndex{0, 0});
    double* data_ptr = field.data(index);

    // Check that the data pointer is not null
    EXPECT_NE(data_ptr, nullptr);

    // Assign some values and check
    data_ptr[0] = 1.0;
    data_ptr[1] = 2.0;
    data_ptr[2] = 3.0;

    Eigen::Vector3d result = field.GetEigenMatrix<3, 1>(index);
    EXPECT_EQ(result, Eigen::Vector3d(1.0, 2.0, 3.0));
}

// Test operator() method
TEST_F(FieldTestFixture, OperatorMethod) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    aperi::Index index(stk::mesh::FastMeshIndex{0, 0});

    // Assign some values using the operator() method
    field(index, 0) = 1.0;
    field(index, 1) = 2.0;
    field(index, 2) = 3.0;

    Eigen::Vector3d result = field.GetEigenMatrix<3, 1>(index);
    EXPECT_EQ(result, Eigen::Vector3d(1.0, 2.0, 3.0));
}

// Test GetEigenMap method
TEST_F(FieldTestFixture, GetEigenMap) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    aperi::FieldQueryData<double> field_query_data{"nodal_field", aperi::FieldQueryState::NP1};
    aperi::Field<double> field(m_mesh_data, field_query_data);

    aperi::Index index(stk::mesh::FastMeshIndex{0, 0});

    // Assign some values using the data method
    double* data_ptr = field.data(index);
    data_ptr[0] = 1.0;
    data_ptr[1] = 2.0;
    data_ptr[2] = 3.0;

    // Get the Eigen map and check the values
    auto eigen_map = field.GetEigenMap<3, 1>(index);
    EXPECT_EQ(eigen_map(0, 0), 1.0);
    EXPECT_EQ(eigen_map(1, 0), 2.0);
    EXPECT_EQ(eigen_map(2, 0), 3.0);

    // Modify the values using the Eigen map and check again
    eigen_map(0, 0) = 4.0;
    eigen_map(1, 0) = 5.0;
    eigen_map(2, 0) = 6.0;

    Eigen::Vector3d result = field.GetEigenMatrix<3, 1>(index);
    EXPECT_EQ(result, Eigen::Vector3d(4.0, 5.0, 6.0));
}