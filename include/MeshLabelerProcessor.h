#pragma once

#include <mpi.h>

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <algorithm>
#include <array>
#include <iterator>
#include <map>
#include <memory>
#include <numeric>
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
#include <vector>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

class MeshLabelerProcessor {
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

   public:
    MeshLabelerProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::string &set) : m_mesh_data(mesh_data), m_set(set) {
        assert(mesh_data != nullptr);

        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Get the selector
        assert(!m_set.empty());
        std::vector<std::string> sets;
        m_selector = StkGetSelector(sets, meta_data);
        assert(m_selector.is_empty(stk::topology::ELEMENT_RANK) == false);

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the active field
        m_active_field = StkGetField(FieldQueryData<uint64_t>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_active_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_active_field);

        // Get the cell id field
        m_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_cell_id_field);
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
                    std::string message = "Nodal integration requires exactly one active node per element. Found " + std::to_string(num_active_nodes) + " active nodes.";
                    Kokkos::abort(message.c_str());
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
        // Get the MetaData from the bulk data
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Begin modification
        m_bulk_data->modification_begin();

        // Get or declare the universal active part
        stk::mesh::Part *universal_active_part = meta_data->get_part("universal_active_part");
        if (universal_active_part == nullptr) {
            universal_active_part = &meta_data->declare_part("universal_active_part", stk::topology::NODE_RANK);
        }

        // Declare the active part for the current set
        stk::mesh::Part &active_part = meta_data->declare_part(m_set + "_active", stk::topology::NODE_RANK);

        // Prepare the parts to add and remove
        stk::mesh::PartVector add_parts = {&active_part, universal_active_part};
        stk::mesh::PartVector remove_parts;  // No parts to remove

        // Change entity parts
        m_bulk_data->change_entity_parts(nodes_to_change, add_parts, remove_parts);

        // End modification
        m_bulk_data->modification_end();
    }

    void PutAllCellElementsOnTheSameProcessorHost(const std::map<uint64_t, int> &cell_id_to_processor_map) {
        int this_processor = m_bulk_data->parallel_rank();

        // Create the active selector
        std::vector<std::string> active_sets;
        active_sets.push_back(m_set + "_active");
        stk::mesh::Selector active_selector = StkGetSelector(active_sets, &m_bulk_data->mesh_meta_data());

        // Vector of element processor pairs to move
        std::vector<std::pair<stk::mesh::Entity, int>> element_processor_pairs;

        // Loop buckets then elements on host
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];

                // Get the cell id
                uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, element);

                // Get the processor
                int processor = cell_id_to_processor_map.at(cell_id[0]);

                // If the processor is not the current processor, move the element
                if (processor != this_processor) {
                    element_processor_pairs.push_back(std::make_pair(element, processor));
                }
            }
        }

        // Move the elements
        m_bulk_data->change_entity_owner(element_processor_pairs);
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

    std::map<uint64_t, int> MakeGlobalCellIdToProcMap(const std::vector<std::pair<uint64_t, int>> &local_cell_id_to_processor) {
        // Communicate the cell id to processor vector
        int local_size = local_cell_id_to_processor.size();

        // Gather the sizes
        std::vector<int> sizes(m_bulk_data->parallel_size());
        MPI_Allgather(&local_size, 1, MPI_INT, sizes.data(), 1, MPI_INT, MPI_COMM_WORLD);

        // Convert sizes to byte sizes
        std::vector<int> byte_sizes(sizes.size());
        std::transform(sizes.begin(), sizes.end(), byte_sizes.begin(), [](int size) {
            return size * sizeof(std::pair<uint64_t, int>);
        });

        // Calculate the displacements in bytes
        std::vector<int> displacements(m_bulk_data->parallel_size(), 0);
        std::partial_sum(byte_sizes.begin(), byte_sizes.end() - 1, displacements.begin() + 1);

        // Calculate the total size of the global buffer in bytes
        int total_byte_size = std::accumulate(byte_sizes.begin(), byte_sizes.end(), 0);

        // Gather the cell id to processor map
        std::vector<std::pair<uint64_t, int>> global_cell_id_to_processor(total_byte_size / sizeof(std::pair<uint64_t, int>));
        MPI_Allgatherv(local_cell_id_to_processor.data(), local_size * sizeof(std::pair<uint64_t, int>), MPI_BYTE,
                       global_cell_id_to_processor.data(), byte_sizes.data(), displacements.data(), MPI_BYTE, MPI_COMM_WORLD);

        // Put into a map
        std::map<uint64_t, int> cell_id_to_processor_map(global_cell_id_to_processor.begin(), global_cell_id_to_processor.end());

        return cell_id_to_processor_map;
    }

    // This should be done after the active node field has been labeled and the active part has been created.
    void LabelCellIdsForNodalIntegrationHost() {
        // To make this work in parallel:
        // 1. Loop the owned and active nodes on host
        //    a. Get the connected elements, and set the active node's cell id to the minimum cell id of the connected elements
        //    b. create a cell id to processor map
        // 2. Communicate the node's cell id to make sure all the active nodes have the correct cell id
        // 3. Loop over the active nodes
        //    a. get the connected elements, and set the cell id to the minimum cell id that was set for the node above
        // 4. Communicate the cell id to processor map
        // 5. Call function to put all the cell elements on the same processor

        auto ngp_mesh = m_ngp_mesh;

        // Create the active selector
        std::vector<std::string> active_sets;
        active_sets.push_back(m_set + "_active");
        stk::mesh::Selector active_selector = StkGetSelector(active_sets, &m_bulk_data->mesh_meta_data());

        // Create the owned and active selector
        stk::mesh::Selector owned_active_selector = m_owned_selector & active_selector;

        // Create an cell_id to processor vector
        std::vector<std::pair<uint64_t, int>> local_cell_id_to_processor;
        int proc = m_bulk_data->parallel_rank();

        // Loop over the owned active nodes on host, get the connected elements, and set the cell id to the minimum cell id of the connected elements
        for (stk::mesh::Bucket *bucket : owned_active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                uint64_t *minimum_id = stk::mesh::field_data(*m_active_field, node);

                // Get the connected elements
                stk::mesh::NgpMesh::ConnectedEntities elems = m_ngp_mesh.get_elements(stk::topology::NODE_RANK, m_ngp_mesh.fast_mesh_index(node));
                uint64_t num_elems = elems.size();

                // Loop over the connected elements and get the minimum id
                minimum_id[0] = m_bulk_data->identifier(elems[0]);
                for (size_t i = 1; i < num_elems; ++i) {
                    uint64_t elem_id = m_bulk_data->identifier(elems[i]);
                    if (elem_id < minimum_id[0]) {
                        minimum_id[0] = elem_id;
                    }
                }

                // Add the minimum id to the cell id to processor map
                local_cell_id_to_processor.push_back(std::make_pair(minimum_id[0], proc));
            }
        }

        // Communicate the active field, then the cell id should be correct across all processors
        stk::mesh::communicate_field_data(*m_bulk_data, {m_active_field});

        // Loop over the active nodes on host, get the connected elements, and set the cell id to the value that was stored in the node active field
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                uint64_t *minimum_id = stk::mesh::field_data(*m_active_field, node);

                // Get the connected elements
                stk::mesh::NgpMesh::ConnectedEntities elems = m_ngp_mesh.get_elements(stk::topology::NODE_RANK, m_ngp_mesh.fast_mesh_index(node));
                uint64_t num_elems = elems.size();

                // Loop over the connected elements and set the cell id to the minimum id
                for (size_t i = 0; i < num_elems; ++i) {
                    uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, elems[i]);
                    cell_id[0] = minimum_id[0];
                }
            }
        }

        // Communicate the cell id to processor map
        std::map<uint64_t, int> cell_id_to_processor_map = MakeGlobalCellIdToProcMap(local_cell_id_to_processor);

        // Put all the cell elements on the same processor
        PutAllCellElementsOnTheSameProcessorHost(cell_id_to_processor_map);

        // Set the active nodes active field back to 1. Probably not necessary, but just in case.
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                uint64_t *active_field_data = stk::mesh::field_data(*m_active_field, node);
                active_field_data[0] = 1;
            }
        }
    }

    // This should be done after the active node field has been labeled and the active part has been created.
    void LabelCellIdsForElementIntegration() {
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_cell_id_field = *m_ngp_cell_id_field;

        // Loop over the elements and set the cell id to the element id
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Convert FastMeshIndex to Entity
                stk::mesh::Entity elem_entity = ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, elem_index);

                // Set the cell id to the element id
                ngp_cell_id_field(elem_index, 0) = ngp_mesh.identifier(elem_entity);
            });
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
    UnsignedField *m_cell_id_field;                // The cell id field
    NgpUnsignedField *m_ngp_active_field;          // The ngp active field
    NgpUnsignedField *m_ngp_cell_id_field;         // The ngp cell id field
};

}  // namespace aperi