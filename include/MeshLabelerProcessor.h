#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

class MeshLabelerProcessor {
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

   public:
    MeshLabelerProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::string &set = "") : m_mesh_data(mesh_data), m_set(set) {
        assert(mesh_data != nullptr);

        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Get the selector
        std::vector<std::string> sets;
        if (!m_set.empty()) {
            sets.push_back(m_set);
        }
        m_selector = StkGetSelector(sets, meta_data);
        assert(m_selector.is_empty(stk::topology::ELEMENT_RANK) == false);

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the active field
        m_active_field = StkGetField(FieldQueryData<uint64_t>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_active_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_active_field);
    }

    // This is to check if a proper 'thex' or refined hex mesh was used to create the nodal integration mesh.
    bool CheckNodalIntegrationOnRefinedMesh() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_active_field = *m_ngp_active_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                uint64_t num_nodes = nodes.size();

                // Throw an exception if an element has something other than 1 active node
                uint64_t num_active_nodes = 0;
                for (size_t i = 0; i < num_nodes; ++i) {
                    stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                    if (ngp_active_field(node_index, 0) == 1) {
                        num_active_nodes++;
                    }
                }
                if (num_active_nodes != 1) {
                    Kokkos::abort("Nodal integration requires exactly one active node per element.");
                }
            });

        return true;
    }

    void CreateActivePartFromActiveField() {
        // Host operation
        stk::mesh::EntityVector nodes_to_change;

        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                uint64_t *active_field_data = stk::mesh::field_data(*m_active_field, (*bucket)[i_node]);
                if (active_field_data[0] == 1) {
                    nodes_to_change.push_back((*bucket)[i_node]);
                }
            }
        }
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        stk::mesh::Part &active_part = meta_data->declare_part(m_set + "_active", stk::topology::NODE_RANK);
        stk::mesh::PartVector add_parts = {&active_part};
        stk::mesh::PartVector remove_parts;  // No parts to remove
        m_bulk_data->modification_begin();
        m_bulk_data->change_entity_parts(nodes_to_change, add_parts, remove_parts);
        m_bulk_data->modification_end();
    }

    void SetActiveFieldForNodalIntegrationHost() {
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                size_t num_nodes = bucket->num_nodes(i_elem);
                // Throw an exception if the number of nodes is not 8
                if (num_nodes != 8) {
                    throw std::runtime_error("Nodal integration will only work correctly when being built from hexahedral elements. Use 'thex' to divide a tetrahedral mesh into hexahedral elements.");
                }
                const stk::mesh::Entity *nodes = bucket->begin_nodes(i_elem);

                // Get the minimum id
                uint64_t minimum_id = m_bulk_data->identifier(nodes[0]);
                size_t minimum_index = 0;
                for (size_t i = 1; i < num_nodes; ++i) {
                    uint64_t id = m_bulk_data->identifier(nodes[i]);
                    if (id < minimum_id) {
                        minimum_id = id;
                        minimum_index = i;
                    }
                    // Set active value to 0
                    uint64_t *active_field_data = stk::mesh::field_data(*m_active_field, nodes[i]);
                    active_field_data[0] = 0;
                }

                // Set the active value to 1 for the minimum id
                uint64_t *active_field_data = stk::mesh::field_data(*m_active_field, nodes[minimum_index]);
                active_field_data[0] = 1;
            }
        }

        m_ngp_active_field->clear_sync_state();
        m_ngp_active_field->modify_on_host();
    }

    void SetActiveFieldForNodalIntegration() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_active_field = *m_ngp_active_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                uint64_t num_nodes = nodes.size();

                // Throw an exception if the number of nodes is not 8
                if (num_nodes != 8) {
                    Kokkos::abort("Nodal integration will only work correctly when being built from hexahedral elements. Use 'thex' to divide a tetrahedral mesh into hexahedral elements.");
                }

                // Get the minimum id
                uint64_t minimum_id = ngp_mesh.identifier(nodes[0]);
                size_t minimum_index = 0;
                for (size_t i = 1; i < nodes.size(); ++i) {
                    uint64_t id = ngp_mesh.identifier(nodes[i]);
                    if (id < minimum_id) {
                        minimum_id = id;
                        minimum_index = i;
                    }
                    // Set active value to 0
                    stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                    ngp_active_field(node_index, 0) = 0;
                }

                // Set the active value to 1 for the minimum id
                stk::mesh::FastMeshIndex min_node_index = ngp_mesh.fast_mesh_index(nodes[minimum_index]);
                ngp_active_field(min_node_index, 0) = 1;
            });

        m_ngp_active_field->clear_sync_state();
        m_ngp_active_field->modify_on_device();
    }

    void SyncFieldsToHost() {
        m_ngp_active_field->sync_to_host();
    }

    void SyncFieldsToDevice() {
        m_ngp_active_field->sync_to_device();
    }

    void CommunicateAllFieldData() const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_active_field});
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::string m_set;                             // The set to process.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_owned_selector;          // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
    UnsignedField *m_active_field;                 // The active field
    NgpUnsignedField *m_ngp_active_field;          // The ngp active field
};

}  // namespace aperi