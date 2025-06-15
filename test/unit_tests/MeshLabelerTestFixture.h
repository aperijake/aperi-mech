#pragma once

#include <gtest/gtest.h>

#include <string>

#include "IoMeshTestFixture.h"
#include "MeshData.h"
#include "MeshLabeler.h"
#include "Types.h"
#include "UnitTestUtils.h"

class MeshLabelerTestFixture : public IoMeshTestFixture {
   protected:
    void SetUp() override {
        // Run IoMeshTestFixture::SetUp first
        IoMeshTestFixture::SetUp();
    }

    void TearDown() override {
        // Run IoMeshTestFixture::TearDown last
        IoMeshTestFixture::TearDown();
    }

    void AddFieldsAndCreateMeshLabeler(const std::vector<aperi::FieldData>& additional_field_data = {}) {
        std::vector<aperi::FieldData> field_data = m_mesh_labeler->GetFieldData();
        field_data.insert(field_data.end(), additional_field_data.begin(), additional_field_data.end());
        // Add fields to the mesh and complete initialization
        AddFieldsAndCompleteInitialization(field_data);
        m_mesh_data = m_io_mesh->GetMeshData();
        // Create a mesh labeler
        m_mesh_labeler = aperi::CreateMeshLabeler(m_mesh_data);
    }

    void ReadThexMesh(const std::string& mesh_string = "share/aperi-mech/test_inputs/thex.exo") {
        CreateIoMeshFile();
        m_io_mesh->ReadMesh(mesh_string, {"block_1"});
        AddFieldsAndCreateMeshLabeler();
    }

    void CheckNodeLabels(aperi::Unsigned expected_num_total_nodes, aperi::Unsigned expected_num_active_nodes) {
        // Check the active node field
        auto active_nodes = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, aperi::Unsigned, 1>(*m_mesh_data, {"block_1"}, "active", aperi::FieldQueryState::None);
        if (m_num_procs == 1) {
            ASSERT_EQ(active_nodes.rows(), expected_num_total_nodes);
            ASSERT_EQ(active_nodes.cols(), 1);
        }

        aperi::Unsigned num_active_nodes = 0;
        for (int i = 0; i < active_nodes.size(); ++i) {
            EXPECT_TRUE(active_nodes(i) == 0 || active_nodes(i) == 1);
            if (active_nodes(i) == 1) {
                num_active_nodes++;
            }
        }
        aperi::Unsigned num_active_nodes_global = 0;
        MPI_Allreduce(&num_active_nodes, &num_active_nodes_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_active_nodes_global, expected_num_active_nodes);

        // Check the number of node in the active part
        aperi::Unsigned num_nodes_total = m_mesh_data->GetNumOwnedNodes({"block_1"});
        aperi::Unsigned num_nodes_total_global = 0;
        MPI_Allreduce(&num_nodes_total, &num_nodes_total_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_nodes_total_global, expected_num_total_nodes);

        aperi::Unsigned num_nodes_in_active_part = m_mesh_data->GetNumOwnedNodes({"block_1_active"});
        aperi::Unsigned num_nodes_in_active_part_global = 0;
        MPI_Allreduce(&num_nodes_in_active_part, &num_nodes_in_active_part_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_nodes_in_active_part_global, expected_num_active_nodes);

        aperi::Unsigned num_nodes_in_universal_active_part = m_mesh_data->GetNumOwnedNodes({"universal_active_part"});
        aperi::Unsigned num_nodes_in_universal_active_part_global = 0;
        MPI_Allreduce(&num_nodes_in_universal_active_part, &num_nodes_in_universal_active_part_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_nodes_in_universal_active_part_global, expected_num_active_nodes);
    }

    void CheckCellLabels(aperi::Unsigned expected_num_elements, aperi::Unsigned expected_num_unique_cell_ids, const std::string& field_name, bool check_min_max) {
        // Check the cell id field
        auto cell_ids = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, aperi::Unsigned, 1>(*m_mesh_data, {"block_1"}, field_name, aperi::FieldQueryState::None);

        if (m_num_procs == 1) {
            ASSERT_EQ(cell_ids.rows(), expected_num_elements);
            ASSERT_EQ(cell_ids.cols(), 1);
        }

        std::set<aperi::Unsigned> unique_cell_ids;
        for (int i = 0; i < cell_ids.size(); ++i) {
            unique_cell_ids.insert(cell_ids(i));
        }

        // Check the number of unique cell ids
        aperi::Unsigned num_unique_cell_ids = unique_cell_ids.size();
        aperi::Unsigned num_unique_cell_ids_global = 0;
        MPI_Allreduce(&num_unique_cell_ids, &num_unique_cell_ids_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_unique_cell_ids_global, expected_num_unique_cell_ids);

        // Check the number of cells
        aperi::Unsigned num_cells_total = m_mesh_data->GetNumOwnedElements({"block_1"});
        aperi::Unsigned num_cells_total_global = 0;
        MPI_Allreduce(&num_cells_total, &num_cells_total_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_cells_total_global, expected_num_elements);

        aperi::Unsigned num_elems_in_cells_part = m_mesh_data->GetNumOwnedElements({"block_1_cells"});
        aperi::Unsigned num_elems_in_cells_part_global = 0;
        MPI_Allreduce(&num_elems_in_cells_part, &num_elems_in_cells_part_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_elems_in_cells_part_global, expected_num_unique_cell_ids);

        aperi::Unsigned num_elems_in_universal_cells_part = m_mesh_data->GetNumOwnedElements({"universal_cells_part"});
        aperi::Unsigned num_elems_in_universal_cells_part_global = 0;
        MPI_Allreduce(&num_elems_in_universal_cells_part, &num_elems_in_universal_cells_part_global, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
        EXPECT_EQ(num_elems_in_universal_cells_part_global, expected_num_unique_cell_ids);

        // Check the minimum and maximum cell ids
        if (check_min_max) {
            aperi::Unsigned min_cell_id = *std::min_element(cell_ids.begin(), cell_ids.end());
            aperi::Unsigned max_cell_id = *std::max_element(cell_ids.begin(), cell_ids.end());
            // Local min and max cell ids so no need to communicate
            EXPECT_EQ(min_cell_id, 0);
            EXPECT_EQ(max_cell_id, unique_cell_ids.size() - 1);
        }
    }

    void LabelMesh(const aperi::SmoothingCellType& smoothing_cell_type) {
        // Label the mesh
        aperi::MeshLabelerParameters mesh_labeler_parameters;
        mesh_labeler_parameters.smoothing_cell_type = smoothing_cell_type;
        mesh_labeler_parameters.num_subcells = 1;
        mesh_labeler_parameters.set = "block_1";
        m_mesh_labeler->LabelPart(mesh_labeler_parameters);
    }

    void CheckMeshLabels(aperi::Unsigned expected_num_total_nodes, aperi::Unsigned expected_num_active_nodes, aperi::Unsigned expected_num_elements, aperi::Unsigned expected_num_unique_cell_ids) {
        CheckNodeLabels(expected_num_total_nodes, expected_num_active_nodes);
        CheckCellLabels(expected_num_elements, expected_num_unique_cell_ids, "cell_id", true);
        CheckCellLabels(expected_num_elements, expected_num_unique_cell_ids, "subcell_id", true);
        CheckThatFieldsMatch<aperi::FieldDataTopologyRank::ELEMENT, aperi::Unsigned>(*m_mesh_data, {"block_1"}, "cell_id", "subcell_id", aperi::FieldQueryState::None);
    }

    std::shared_ptr<aperi::MeshLabeler> m_mesh_labeler;  ///< The mesh labeler object
    std::shared_ptr<aperi::MeshData> m_mesh_data;        ///< The mesh data object
};