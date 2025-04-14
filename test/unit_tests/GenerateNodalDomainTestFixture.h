#pragma once

#include <gtest/gtest.h>

#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_topology/topology.hpp>
#include <string>

#include "AperiStkUtils.h"
#include "MeshData.h"
#include "MeshLabeler.h"
#include "MeshLabelerTestFixture.h"
#include "UnitTestUtils.h"

class GenerateNodalDomainTestFixture : public MeshLabelerTestFixture {
   protected:
    void SetUp() override {
        m_capture_output = false;
        // Run MeshLabelerTestFixture::SetUp first
        MeshLabelerTestFixture::SetUp();
    }

    void TearDown() override {
        // Run MeshLabelerTestFixture::TearDown last
        MeshLabelerTestFixture::TearDown();
    }

    std::string CreateNodalMeshString() {
        // Create a nodal mesh string

        // Must have 2 or more nodes in each direction
        if (m_num_nodes_x < 2 || m_num_nodes_y < 2 || m_num_nodes_z < 2) {
            throw std::runtime_error("Nodal mesh must have at least 2 nodes in each direction");
        }

        // Number of elements in each direction = (num_nodes - 1) * 2
        m_num_elements_x = (m_num_nodes_x - 1) * 2;
        m_num_elements_y = (m_num_nodes_y - 1) * 2;
        m_num_elements_z = (m_num_nodes_z - 1) * 2;
        return std::to_string(m_num_elements_x) + "x" + std::to_string(m_num_elements_y) + "x" + std::to_string(m_num_elements_z);
    }

    void CreateAndReadNodalMesh() {
        // Create a nodal mesh string
        std::string mesh_string = CreateNodalMeshString();
        // Create the mesh
        CreateIoMeshGenerated();
        m_io_mesh->ReadMesh(mesh_string, {"block_1"});
    }

    void SetActiveFieldOnNodalMesh() {
        // Get the mesh data
        stk::mesh::BulkData *bulk_data = m_mesh_data->GetBulkData();
        stk::mesh::MetaData *meta_data = &bulk_data->mesh_meta_data();
        // Get the selector
        stk::mesh::Selector selector = aperi::StkGetSelector({}, meta_data);
        // Get the owned selector
        stk::mesh::Selector full_owned_selector = bulk_data->mesh_meta_data().locally_owned_part();
        stk::mesh::Selector owned_selector = selector & full_owned_selector;

        // Get the active field
        stk::mesh::Field<unsigned long> *active_field = aperi::StkGetField(aperi::FieldQueryData<unsigned long>{"active", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, meta_data);

        // Get the coordinates field
        stk::mesh::Field<double> *coordinates_field = aperi::StkGetField(aperi::FieldQueryData<double>{m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, meta_data);

        // Set the active field for nodal integration
        for (stk::mesh::Bucket *bucket : owned_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                unsigned long *active_field_data = stk::mesh::field_data(*active_field, (*bucket)[i_node]);
                double *coordinates_data = stk::mesh::field_data(*coordinates_field, (*bucket)[i_node]);
                // If all coordinates are evenly divisible by 2.0, set the active field to 1
                if (std::fmod(coordinates_data[0], 2.0) == 0.0 && std::fmod(coordinates_data[1], 2.0) == 0.0 && std::fmod(coordinates_data[2], 2.0) == 0.0) {
                    active_field_data[0] = 1;
                } else {
                    // Set the active field to 0
                    active_field_data[0] = 0;
                }
            }
        }
    }

    void LabelGeneratedNodalMesh() {
        // Set the active field for nodal integration
        SetActiveFieldOnNodalMesh();

        std::string set = "block_1";

        // Create the mesh labeler parameters
        aperi::MeshLabelerProcessor mesh_labeler_processor(m_mesh_data, set, m_num_subcells, m_activate_center_node);

        // Communicate the field data
        mesh_labeler_processor.CommunicateAllFieldData();

        // After setting the active field, check that the nodal integration mesh is correct
        mesh_labeler_processor.CheckNodalIntegrationOnRefinedMeshHost();

        // Create the active part from the active field, host operation
        mesh_labeler_processor.CreateActivePartFromActiveFieldHost();

        // Label the cell and subcell ids for nodal integration
        mesh_labeler_processor.LabelCellAndSubcellIdsForNodalIntegrationHost(m_num_subcells);

        // Create the cells part from the cell id field, host operation
        mesh_labeler_processor.CreateCellsPartFromCellIdFieldHost(true);

        // Add the center node part to the active part, if the center node is to be activated
        if (m_activate_center_node) {
            mesh_labeler_processor.CreateActivePartFromActiveFieldHost(2);
        }
    }

    size_t m_num_nodes_x = 2;
    size_t m_num_nodes_y = 2;
    size_t m_num_nodes_z = 5;     // 4 was causing issues with 4 procs as 1 proc was getting cells
    size_t m_num_elements_x = 2;  // Will be adjusted in CreateNodalMeshString
    size_t m_num_elements_y = 2;
    size_t m_num_elements_z = 8;
    size_t m_num_subcells = 1;
    bool m_activate_center_node = false;
};