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

        // Get the smoothe cell id field
        m_smoothed_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"smoothed_cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_smoothed_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_smoothed_cell_id_field);
    }

    void LabelForThexNodalIntegration() {
        // Set the active field for nodal integration
        SetActiveFieldForNodalIntegrationHost();

        // Communicate the active field so that it is up to date across all processors
        stk::mesh::communicate_field_data(*m_bulk_data, {m_active_field});

        // After setting the active field, check that the nodal integration mesh is correct
        CheckNodalIntegrationOnRefinedMeshHost();

        // Create the active part from the active field, host operation
        CreateActivePartFromActiveFieldHost();

        // Label the cell ids for nodal integration
        LabelCellIdsForNodalIntegrationHost();

        // Create the cells part from the cell id field, host operation
        CreateCellsPartFromCellIdFieldHost();

        // All operations are done on the host, so sync the fields to the device
        SyncFieldsToDevice();
    }

    void LabelForElementIntegration() {
        // Create the active part from the active field, host operation
        // Active field should be set to 1 for all nodes in the element already
        CreateActivePartFromActiveFieldHost();

        // Label the cell ids for element integration, host operation
        LabelCellIdsForElementIntegrationHost();

        // Create the cells part from the cell id field, host operation
        CreateCellsPartFromCellIdFieldHost();

        // Sync the fields to the device
        SyncFieldsToDevice();
    }

    void LabelForGaussianIntegration() {
        // Create the active part from the active field, host operation
        // Active field should be set to 1 for all nodes in the element already
        CreateActivePartFromActiveFieldHost();

        // Label the cell ids for element integration, host operation
        LabelCellIdsForElementIntegrationHost();

        // Create the cells part from the cell id field, host operation
        CreateCellsPartFromCellIdFieldHost();

        // Sync the fields to the device
        SyncFieldsToDevice();
    }

    void SyncFieldsToHost() {
        m_ngp_active_field->sync_to_host();
        m_ngp_cell_id_field->sync_to_host();
        m_ngp_smoothed_cell_id_field->sync_to_host();
    }

    void SyncFieldsToDevice() {
        m_ngp_active_field->sync_to_device();
        m_ngp_cell_id_field->sync_to_device();
        m_ngp_smoothed_cell_id_field->sync_to_device();
    }

    void CommunicateAllFieldData() const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_active_field, m_cell_id_field, m_smoothed_cell_id_field});
    }

    // Set the active field for nodal integration. This is the original nodes from the tet mesh befor the 'thex' operation.
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

        // Modified the active field, so clear the sync state and mark as modified
        m_ngp_active_field->clear_sync_state();
        m_ngp_active_field->modify_on_host();
    }

    // This is to check if a proper 'thex' or refined hex mesh was used to create the nodal integration mesh.
    bool CheckNodalIntegrationOnRefinedMeshHost() {
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];

                // Get the element nodes
                stk::mesh::Entity const *nodes = m_bulk_data->begin_nodes(element);
                uint64_t num_nodes = m_bulk_data->num_nodes(element);

                // Throw an exception if an element has something other than 1 active node
                uint64_t num_active_nodes = 0;
                for (size_t i = 0; i < num_nodes; ++i) {
                    uint64_t *active_field_data = stk::mesh::field_data(*m_active_field, nodes[i]);
                    if (active_field_data[0] == 1) {
                        num_active_nodes++;
                    }
                }
                if (num_active_nodes != 1) {
                    std::string message = "Nodal integration requires exactly one active node per element. Found " + std::to_string(num_active_nodes) + " active nodes.";
                    throw std::runtime_error(message);
                }
            }
        }
        return true;
    }

    void CreateActivePartFromActiveFieldHost() {
        // Host operation and mesh modification
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

    void CreateCellsPartFromCellIdFieldHost() {
        // Host operation and mesh modification
        stk::mesh::EntityVector elems_to_change;

        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                // Get the cell id, which is the local offset to the cell id parent
                uint64_t *cell_id_field_data = stk::mesh::field_data(*m_cell_id_field, (*bucket)[i_elem]);

                // Get the local offset of this element
                stk::mesh::Entity element = (*bucket)[i_elem];
                uint64_t local_offset = element.local_offset();

                // If the cell id is the same as the local offset, add the element to the list
                if (cell_id_field_data[0] == local_offset) {
                    elems_to_change.push_back(element);
                }
            }
        }
        // Get the MetaData from the bulk data
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Begin modification
        m_bulk_data->modification_begin();

        // Get or declare the universal cells part
        stk::mesh::Part *universal_cells_part = meta_data->get_part("universal_cells_part");
        if (universal_cells_part == nullptr) {
            universal_cells_part = &meta_data->declare_part("universal_cells_part", stk::topology::ELEMENT_RANK);
        }

        // Declare the cells part for the current set
        stk::mesh::Part &cells_part = meta_data->declare_part(m_set + "_cells", stk::topology::ELEMENT_RANK);

        // Prepare the parts to add and remove
        stk::mesh::PartVector add_parts = {&cells_part, universal_cells_part};
        stk::mesh::PartVector remove_parts;  // No parts to remove

        // Change entity parts
        m_bulk_data->change_entity_parts(elems_to_change, add_parts, remove_parts);

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
        // 6. Create a map from cell id to local offset
        // 7. Fill the cell id to local offset map
        // 8. Change the cell id to the local offset
        // 9. Set the active nodes active field back to 1

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
                stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
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
                stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
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

        // Map from cell id to local offset
        std::map<uint64_t, uint64_t> cell_id_to_local_offset;

        // Fill the cell id to local offset map
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];
                uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, element);
                if (cell_id[0] == m_bulk_data->identifier(element)) {
                    cell_id_to_local_offset[cell_id[0]] = element.local_offset();
                }
            }
        }

        // Create a set of cell ids for setting a the "smoothed_cell_id" field
        std::set<uint64_t> cell_ids;

        // Change the cell id to the local offset
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];
                uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, element);
                cell_id[0] = cell_id_to_local_offset[cell_id[0]];
                cell_ids.insert(cell_id[0]);
            }
        }

        // Set the smoothed cell id field
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];
                uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, element);
                uint64_t *smoothed_cell_id = stk::mesh::field_data(*m_smoothed_cell_id_field, element);

                // Find the index of the cell id in the set
                auto it = cell_ids.find(cell_id[0]);
                // Set the smoothed cell id to the index
                smoothed_cell_id[0] = std::distance(cell_ids.begin(), it);
            }
        }

        // Set the active nodes active field back to 1. Probably not necessary, but just in case.
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                uint64_t *active_field_data = stk::mesh::field_data(*m_active_field, node);
                active_field_data[0] = 1;
            }
        }

        // Modified the cell id field, so clear the sync state and mark as modified
        m_ngp_cell_id_field->clear_sync_state();
        m_ngp_cell_id_field->modify_on_host();

        // Modified the active field, so clear the sync state and mark as modified
        m_ngp_active_field->clear_sync_state();
        m_ngp_active_field->modify_on_host();
    }

    // This should be done after the active node field has been labeled and the active part has been created.
    void LabelCellIdsForElementIntegrationHost() {
        // Create a set of cell ids
        std::set<uint64_t> cell_ids;

        // Loop over the elements and set the cell id to the element id
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];
                uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, element);
                cell_id[0] = element.local_offset();
                cell_ids.insert(cell_id[0]);
            }
        }

        // Set the smoothed cell id field
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];
                uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, element);
                uint64_t *smoothed_cell_id = stk::mesh::field_data(*m_smoothed_cell_id_field, element);

                // Find the index of the cell id in the set
                auto it = cell_ids.find(cell_id[0]);
                // Set the smoothed cell id to the index
                smoothed_cell_id[0] = std::distance(cell_ids.begin(), it);
            }
        }

        // Modified the cell id field, so clear the sync state and mark as modified
        m_ngp_cell_id_field->clear_sync_state();
        m_ngp_cell_id_field->modify_on_host();
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;    // The mesh data object.
    std::string m_set;                               // The set to process.
    stk::mesh::BulkData *m_bulk_data;                // The bulk data object.
    stk::mesh::Selector m_selector;                  // The selector
    stk::mesh::Selector m_owned_selector;            // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                   // The ngp mesh object.
    UnsignedField *m_active_field;                   // The active field
    UnsignedField *m_cell_id_field;                  // The cell id field
    UnsignedField *m_smoothed_cell_id_field;         // The smoothed cell id field
    NgpUnsignedField *m_ngp_active_field;            // The ngp active field
    NgpUnsignedField *m_ngp_cell_id_field;           // The ngp cell id field
    NgpUnsignedField *m_ngp_smoothed_cell_id_field;  // The ngp smoothed cell id field
};

}  // namespace aperi
