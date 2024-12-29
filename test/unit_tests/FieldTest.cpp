#include <gtest/gtest.h>
#include <mpi.h>

#include "AperiStkUtils.h"
#include "EntityProcessor.h"
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