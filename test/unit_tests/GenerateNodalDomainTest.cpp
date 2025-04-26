#include <gtest/gtest.h>

#include <string>

#include "GenerateNodalDomainTestFixture.h"

// Check that node active values can be set correctly for nodal smoothing
TEST_F(GenerateNodalDomainTestFixture, LabelFieldsForNodalSmoothing) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Create and read the nodal mesh
    CreateAndReadNodalMesh();
    AddFieldsAndCreateMeshLabeler();

    // Input mesh is a tet that has been divided into hexes, so should have 4 active nodes
    size_t num_elements_x = (m_num_nodes_x - 1) * 2;
    size_t num_elements_y = (m_num_nodes_y - 1) * 2;
    size_t num_elements_z = (m_num_nodes_z - 1) * 2;

    LabelGeneratedNodalMesh(m_mesh_data, m_num_subcells, m_activate_center_node);

    size_t total_nodes = (num_elements_x + 1) * (num_elements_y + 1) * (num_elements_z + 1);
    size_t active_nodes = m_num_nodes_x * m_num_nodes_y * m_num_nodes_z;
    size_t num_elements = num_elements_x * num_elements_y * num_elements_z;
    size_t num_unique_cell_ids = active_nodes;
    CheckMeshLabels(total_nodes, active_nodes, num_elements, num_unique_cell_ids);
}