#include <gtest/gtest.h>

#include <string>

#include "MeshData.h"
#include "MeshLabeler.h"
#include "MeshLabelerTestFixture.h"
#include "Types.h"
#include "UnitTestUtils.h"

// Basic test to check that the mesh labeler can be created
TEST_F(MeshLabelerTestFixture, CreateMeshLabeler) {
    // Read the mesh
    ReadThexMesh();

    // Check that the mesh labeler object is not null
    ASSERT_NE(m_mesh_labeler, nullptr);

    // Check that the field data is not empty
    std::vector<aperi::FieldData> field_data = m_mesh_labeler->GetFieldData();
    ASSERT_GT(field_data.size(), 0);
}

// Check converting a YAML node to a MeshLabelerParameters object
TEST_F(MeshLabelerTestFixture, CreateMeshLabelerParameters) {
    // Create a YAML node
    YAML::Node part;
    part["set"] = "block_1";
    part["formulation"]["integration_scheme"]["strain_smoothing"]["nodal_smoothing_cell"]["subdomains"] = 1;

    // Create a mesh labeler parameters object
    aperi::MeshLabelerParameters mesh_labeler_parameters(part);

    // Check the smoothing cell type
    ASSERT_EQ(mesh_labeler_parameters.smoothing_cell_type, aperi::SmoothingCellType::Nodal);

    // Check the number of subcells
    ASSERT_EQ(mesh_labeler_parameters.num_subcells, 1);

    // Check the set
    ASSERT_EQ(mesh_labeler_parameters.set, "block_1");
}

// Check that the mesh labeler can be created and the field data can be retrieved
TEST_F(MeshLabelerTestFixture, CheckFieldsAreCreated) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    ReadThexMesh();

    // Check the active node field
    auto active_nodes = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, aperi::Unsigned, 1>(*m_mesh_data, {"block_1"}, "active", aperi::FieldQueryState::None);

    size_t num_rows = active_nodes.rows();
    size_t num_rows_global = 0;
    MPI_Allreduce(&num_rows, &num_rows_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
    ASSERT_EQ(num_rows_global, 15);
    ASSERT_EQ(active_nodes.cols(), 1);

    for (int i = 0; i < active_nodes.size(); ++i) {
        EXPECT_EQ(active_nodes(i), 1);
    }

    // Check the cell id field
    auto cell_id = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, aperi::Unsigned, 1>(*m_mesh_data, {"block_1"}, "cell_id", aperi::FieldQueryState::None);

    num_rows = cell_id.rows();
    num_rows_global = 0;
    MPI_Allreduce(&num_rows, &num_rows_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
    ASSERT_EQ(num_rows_global, 4);
    ASSERT_EQ(cell_id.cols(), 1);

    for (int i = 0; i < cell_id.size(); ++i) {
        EXPECT_EQ(cell_id(i), 0);
    }

    // Check the subcell id field
    auto subcell_id = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, aperi::Unsigned, 1>(*m_mesh_data, {"block_1"}, "subcell_id", aperi::FieldQueryState::None);

    num_rows = subcell_id.rows();
    num_rows_global = 0;
    MPI_Allreduce(&num_rows, &num_rows_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
    ASSERT_EQ(num_rows_global, 4);
    ASSERT_EQ(subcell_id.cols(), 1);

    for (int i = 0; i < subcell_id.size(); ++i) {
        EXPECT_EQ(subcell_id(i), 0);
    }
}

// Check that node active values can be set correctly for nodal smoothing
TEST_F(MeshLabelerTestFixture, LabelFieldsForNodalSmoothing) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    ReadThexMesh();
    // Input mesh is a tet that has been divided into hexes, so should have 4 active nodes
    size_t total_nodes = 15;
    size_t active_nodes = 4;
    size_t num_elements = 4;
    size_t num_unique_cell_ids = 4;
    LabelMesh(aperi::SmoothingCellType::Nodal);
    CheckMeshLabels(total_nodes, active_nodes, num_elements, num_unique_cell_ids);
}

// Check that node active values can be set correctly for nodal smoothing, on a larger mesh
TEST_F(MeshLabelerTestFixture, LabelFieldsForNodalSmoothingLargerMesh) {
    // Skip this test if we have more than 20 processes. Probably can do a bit bigger mesh than 20, but this is a good test for now.
    if (m_num_procs > 20) {
        GTEST_SKIP() << "This test is only valid for 20 or fewer processes.";
    }
    ReadThexMesh("test_inputs/thex_2x2x2_brick.exo");
    // Input mesh is a tet that has been divided into hexes, so should have 4 active nodes
    size_t total_nodes = 293;
    size_t active_nodes = 27;
    size_t num_elements = 2 * 2 * 2 * 6 * 4;  // Number of hexes in the thex'd mesh
    size_t num_unique_cell_ids = 27;          // One cell id per active node
    LabelMesh(aperi::SmoothingCellType::Nodal);
    CheckMeshLabels(total_nodes, active_nodes, num_elements, num_unique_cell_ids);
}

// Check that node active values can be set correctly for element smoothing
TEST_F(MeshLabelerTestFixture, LabelFieldsForElementSmoothing) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    ReadThexMesh();
    size_t total_nodes = 15;
    size_t active_nodes = 15;
    size_t num_elements = 4;
    size_t num_unique_cell_ids = 4;
    LabelMesh(aperi::SmoothingCellType::Element);
    CheckMeshLabels(total_nodes, active_nodes, num_elements, num_unique_cell_ids);
}
