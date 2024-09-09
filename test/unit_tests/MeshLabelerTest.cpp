#include <gtest/gtest.h>

#include <string>

#include "IoMeshTestFixture.h"
#include "MeshData.h"
#include "MeshLabeler.h"
#include "UnitTestUtils.h"

class MeshLabelerTestFixture : public IoMeshTestFixture {
   protected:
    void SetUp() override {
        // Run IoMeshTestFixture::SetUp first
        IoMeshTestFixture::SetUp();

        // Create a mesh labeler
        m_mesh_labeler = aperi::CreateMeshLabeler();
    }

    void TearDown() override {
        // Run IoMeshTestFixture::TearDown last
        IoMeshTestFixture::TearDown();
    }

    void ReadThexMesh(const std::string& mesh_string = "test_inputs/thex.exo") {
        CreateIoMeshFile();
        m_io_mesh->ReadMesh(mesh_string, {"block_1"});
        std::vector<aperi::FieldData> field_data = m_mesh_labeler->GetFieldData();
        // Add fields to the mesh and complete initialization
        m_io_mesh->AddFields(field_data);
        m_io_mesh->CompleteInitialization();
        m_mesh_data = m_io_mesh->GetMeshData();
    }

    void CheckThexMeshLabels(const aperi::SmoothingCellType& smoothing_cell_type, uint64_t expected_num_total_nodes, uint64_t expected_num_active_nodes) {
        // Set the node active values
        aperi::MeshLabelerParameters mesh_labeler_parameters;
        mesh_labeler_parameters.mesh_data = m_mesh_data;
        mesh_labeler_parameters.smoothing_cell_type = smoothing_cell_type;
        mesh_labeler_parameters.num_subcells = 1;
        mesh_labeler_parameters.set = "block_1";
        m_mesh_labeler->LabelPart(mesh_labeler_parameters);

        // Check the active node field
        auto active_nodes = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, uint64_t, 1>(*m_mesh_data, {"block_1"}, "active", aperi::FieldQueryState::None);
        if (m_num_procs == 1) {
            ASSERT_EQ(active_nodes.rows(), expected_num_total_nodes);
            ASSERT_EQ(active_nodes.cols(), 1);
        }

        uint64_t num_active_nodes = 0;
        for (int i = 0; i < active_nodes.size(); ++i) {
            EXPECT_TRUE(active_nodes(i) == 0 || active_nodes(i) == 1);
            if (active_nodes(i) == 1) {
                num_active_nodes++;
            }
        }
        uint64_t num_active_nodes_global = 0;
        MPI_Allreduce(&num_active_nodes, &num_active_nodes_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_active_nodes_global, expected_num_active_nodes);

        // Check the number of node in the active part
        uint64_t num_nodes_total = m_mesh_data->GetNumOwnedNodes({"block_1"});
        uint64_t num_nodes_total_global = 0;
        MPI_Allreduce(&num_nodes_total, &num_nodes_total_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_nodes_total_global, expected_num_total_nodes);

        uint64_t num_nodes_in_active_part = m_mesh_data->GetNumOwnedNodes({"block_1_active"});
        uint64_t num_nodes_in_active_part_global = 0;
        MPI_Allreduce(&num_nodes_in_active_part, &num_nodes_in_active_part_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_nodes_in_active_part_global, expected_num_active_nodes);

        uint64_t num_nodes_in_universal_active_part = m_mesh_data->GetNumOwnedNodes({"universal_active_part"});
        uint64_t num_nodes_in_universal_active_part_global = 0;
        MPI_Allreduce(&num_nodes_in_universal_active_part, &num_nodes_in_universal_active_part_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_nodes_in_universal_active_part_global, expected_num_active_nodes);
    }

    std::shared_ptr<aperi::MeshLabeler> m_mesh_labeler;  ///< The mesh labeler object
    std::shared_ptr<aperi::MeshData> m_mesh_data;        ///< The mesh data object
};

// Basic test to check that the mesh labeler can be created
TEST_F(MeshLabelerTestFixture, CreateMeshLabeler) {
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
    aperi::MeshLabelerParameters mesh_labeler_parameters(part, m_mesh_data);

    // Check the mesh data
    ASSERT_EQ(mesh_labeler_parameters.mesh_data, m_mesh_data);

    // Check the smoothing cell type
    ASSERT_EQ(mesh_labeler_parameters.smoothing_cell_type, aperi::SmoothingCellType::Nodal);

    // Check the number of subcells
    ASSERT_EQ(mesh_labeler_parameters.num_subcells, 1);

    // Check the set
    ASSERT_EQ(mesh_labeler_parameters.set, "block_1");
}

// Check that the mesh labeler can be created and the field data can be retrieved
TEST_F(MeshLabelerTestFixture, CheckFieldsAreCreated) {
    ReadThexMesh();

    // Check the active node field
    auto active_nodes = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, uint64_t, 1>(*m_mesh_data, {"block_1"}, "active", aperi::FieldQueryState::None);

    size_t num_rows = active_nodes.rows();
    size_t num_rows_global = 0;
    MPI_Allreduce(&num_rows, &num_rows_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
    ASSERT_EQ(num_rows_global, 15);
    ASSERT_EQ(active_nodes.cols(), 1);

    for (int i = 0; i < active_nodes.size(); ++i) {
        EXPECT_EQ(active_nodes(i), 1);
    }

    // Check the cell id field
    auto cell_id = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, uint64_t, 1>(*m_mesh_data, {"block_1"}, "cell_id", aperi::FieldQueryState::None);

    num_rows = cell_id.rows();
    num_rows_global = 0;
    MPI_Allreduce(&num_rows, &num_rows_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
    ASSERT_EQ(num_rows_global, 4);
    ASSERT_EQ(cell_id.cols(), 1);

    for (int i = 0; i < cell_id.size(); ++i) {
        EXPECT_EQ(cell_id(i), 0);
    }

    // Check the subcell id field
    auto subcell_id = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, uint64_t, 1>(*m_mesh_data, {"block_1"}, "subcell_id", aperi::FieldQueryState::None);

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
TEST_F(MeshLabelerTestFixture, SetNodeActiveValuesForNodeSmoothing) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    ReadThexMesh();
    // Input mesh is a tet that has been divided into hexes, so should have 4 active nodes
    CheckThexMeshLabels(aperi::SmoothingCellType::Nodal, 15, 4);
}

// Check that node active values can be set correctly for nodal smoothing, on a larger mesh
TEST_F(MeshLabelerTestFixture, SetNodeActiveValuesForNodeSmoothingLargerMesh) {
    // Skip this test if we have more than 20 processes. Probably can do a bit bigger mesh than 20, but this is a good test for now.
    if (m_num_procs > 20) {
        GTEST_SKIP() << "This test is only valid for 20 or fewer processes.";
    }
    ReadThexMesh("test_inputs/thex_2x2x2_brick.exo");
    // Input mesh is a tet that has been divided into hexes, so should have 4 active nodes
    CheckThexMeshLabels(aperi::SmoothingCellType::Nodal, 293, 27);
}

// Check that node active values can be set correctly for element smoothing
TEST_F(MeshLabelerTestFixture, SetNodeActiveValuesForElementSmoothing) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    ReadThexMesh();
    CheckThexMeshLabels(aperi::SmoothingCellType::Element, 15, 15);
}