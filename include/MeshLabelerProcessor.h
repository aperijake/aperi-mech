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
    typedef stk::mesh::Field<unsigned long> UnsignedLongField;
    typedef stk::mesh::NgpField<unsigned long> NgpUnsignedLongField;

   public:
    MeshLabelerProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::string &set, const size_t &num_subcells, bool activate_center_node) : m_mesh_data(mesh_data), m_set(set), m_num_subcells(num_subcells), m_activate_center_node(activate_center_node) {
        assert(mesh_data != nullptr);

        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Get the selector
        assert(!m_set.empty());
        std::vector<std::string> sets;
        sets.push_back(m_set);
        m_selector = StkGetSelector(sets, meta_data);

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the active field
        m_active_field = StkGetField(FieldQueryData<unsigned long>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_active_field = &stk::mesh::get_updated_ngp_field<unsigned long>(*m_active_field);

        // Get the cell id field
        m_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_cell_id_field);

        // Get the subcell id field
        m_subcell_id_field = StkGetField(FieldQueryData<uint64_t>{"subcell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_subcell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_subcell_id_field);
    }

    void LabelForThexNodalIntegration() {
        // Set the active field for nodal integration
        SetActiveFieldForNodalIntegrationHost();

        // Parallel sum the active field
        ParallelSumActiveField();

        // After setting the active field, check that the nodal integration mesh is correct
        CheckNodalIntegrationOnRefinedMeshHost();

        // Create the active part from the active field, host operation
        CreateActivePartFromActiveFieldHost();

        // Label the cell and subcell ids for nodal integration
        LabelCellAndSubcellIdsForNodalIntegrationHost(m_num_subcells);

        // Create the cells part from the cell id field, host operation
        CreateCellsPartFromCellIdFieldHost(true);

        // Add the center node part to the active part, if the center node is to be activated
        if (m_activate_center_node) {
            CreateActivePartFromActiveFieldHost(2);
        }

        // All operations are done on the host, so sync the fields to the device
        SyncFieldsToDevice();
    }

    void LabelForElementIntegration() {
        // Create the active part from the active field, host operation
        // Active field should be set to 1 for all nodes in the element already
        CreateActivePartFromActiveFieldHost();

        // Label the cell and subcell ids for element integration, host operation
        LabelCellAndSubcellIdsForElementIntegrationHost(m_num_subcells);

        // Create the cells part from the cell id field, host operation
        CreateCellsPartFromCellIdFieldHost(false);

        // Sync the fields to the device
        SyncFieldsToDevice();
    }

    void LabelForGaussianIntegration() {
        // Create the active part from the active field, host operation
        // Active field should be set to 1 for all nodes in the element already
        CreateActivePartFromActiveFieldHost();

        // Label the cell and subcell ids for element integration, host operation
        LabelCellAndSubcellIdsForElementIntegrationHost(m_num_subcells);

        // Create the cells part from the cell id field, host operation
        CreateCellsPartFromCellIdFieldHost(false);

        // Sync the fields to the device
        SyncFieldsToDevice();
    }

    void ParallelSumActiveField() {
        stk::mesh::parallel_max(*m_bulk_data, {m_active_field});
    }

    void SyncFieldsToHost() {
        m_ngp_active_field->sync_to_host();
        m_ngp_cell_id_field->sync_to_host();
        m_ngp_subcell_id_field->sync_to_host();
    }

    void SyncFieldsToDevice() {
        m_ngp_active_field->sync_to_device();
        m_ngp_cell_id_field->sync_to_device();
        m_ngp_subcell_id_field->sync_to_device();
    }

    void CommunicateAllFieldData() const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_active_field, m_cell_id_field});
    }

    size_t GetCenterNodeIndex(const size_t &minimum_index) {
        if (minimum_index == 0) {
            return 6;
        } else if (minimum_index == 1) {
            return 7;
        } else if (minimum_index == 2) {
            return 4;
        } else if (minimum_index == 3) {
            return 5;
        } else if (minimum_index == 4) {
            return 2;
        } else if (minimum_index == 5) {
            return 3;
        } else if (minimum_index == 6) {
            return 0;
        } else if (minimum_index == 7) {
            return 1;
        } else {
            throw std::runtime_error("Minimum index is out of range");
        }
    }

    // Set the active field for nodal integration. This is the original nodes from the tet mesh befor the 'thex' operation.
    void SetActiveFieldForNodalIntegrationHost() {
        // Set the active field to 0 for all nodes
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                unsigned long *active_field_data = stk::mesh::field_data(*m_active_field, (*bucket)[i_node]);
                active_field_data[0] = 0;
            }
        }

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
                }

                // Set the active value to 1 for the minimum id
                unsigned long *active_field_data = stk::mesh::field_data(*m_active_field, nodes[minimum_index]);
                active_field_data[0] = 1;

                // If the center node is to be activated, set the active value to 1 for the center node
                if (m_activate_center_node) {
                    active_field_data = stk::mesh::field_data(*m_active_field, nodes[GetCenterNodeIndex(minimum_index)]);
                    active_field_data[0] = 2;
                }
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
                uint64_t num_center_nodes = 0;
                for (size_t i = 0; i < num_nodes; ++i) {
                    unsigned long *active_field_data = stk::mesh::field_data(*m_active_field, nodes[i]);
                    if (active_field_data[0] == 1) {
                        num_active_nodes++;
                    } else if (active_field_data[0] == 2) {
                        num_center_nodes++;
                    }
                }
                if (num_active_nodes != 1) {
                    size_t element_id = m_bulk_data->identifier(element);
                    std::string message = "Nodal integration requires exactly one active node per element. Found " + std::to_string(num_active_nodes) + " active nodes in element " + std::to_string(element_id) + ". Nodes: \n";
                    for (size_t i = 0; i < num_nodes; ++i) {
                        unsigned long *active_field_data = stk::mesh::field_data(*m_active_field, nodes[i]);
                        message += " ID: " + std::to_string(m_bulk_data->identifier(nodes[i])) + ", active value: " + std::to_string(active_field_data[0]) + "\n";
                    }
                    throw std::runtime_error(message);
                } else if (num_center_nodes != 1 && m_activate_center_node) {
                    size_t element_id = m_bulk_data->identifier(element);
                    std::string message = "Nodal integration requires exactly one center node per element. Found " + std::to_string(num_center_nodes) + " center nodes in element " + std::to_string(element_id) + ". Nodes: \n";
                    for (size_t i = 0; i < num_nodes; ++i) {
                        unsigned long *active_field_data = stk::mesh::field_data(*m_active_field, nodes[i]);
                        message += " ID: " + std::to_string(m_bulk_data->identifier(nodes[i])) + ", active value: " + std::to_string(active_field_data[0]) + "\n";
                    }
                    throw std::runtime_error(message);
                }
            }
        }
        return true;
    }

    void CreateActivePartFromActiveFieldHost(unsigned long active_value = 1) {
        // Host operation and mesh modification
        stk::mesh::EntityVector nodes_to_change;

        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                unsigned long *active_field_data = stk::mesh::field_data(*m_active_field, (*bucket)[i_node]);
                if (active_field_data[0] == active_value) {
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
        stk::mesh::Part *active_part = meta_data->get_part(m_set + "_active");
        if (active_part == nullptr) {
            active_part = &meta_data->declare_part(m_set + "_active", stk::topology::NODE_RANK);
        }

        // Prepare the parts to add and remove
        stk::mesh::PartVector add_parts = {active_part, universal_active_part};
        stk::mesh::PartVector remove_parts;  // No parts to remove

        // Change entity parts
        m_bulk_data->change_entity_parts(nodes_to_change, add_parts, remove_parts);

        // End modification
        m_bulk_data->modification_end();
    }

    void CreateCellsPartFromCellIdFieldHost(bool nodal_from_thex) {
        // Host operation and mesh modification
        stk::mesh::EntityVector elems_to_change;

        if (nodal_from_thex) {
            // Create the active selector
            std::vector<std::string> active_sets;
            active_sets.push_back(m_set + "_active");
            stk::mesh::Selector active_selector = StkGetSelector(active_sets, &m_bulk_data->mesh_meta_data());

            // Loop over the active nodes, grab the first element in the connected entities list that is in the same set of parts
            for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
                for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                    stk::mesh::Entity node = (*bucket)[i_node];

                    // Get the connected elements
                    stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
                    uint64_t num_elems = elems.size();
                    for (size_t i = 0; i < num_elems; ++i) {
                        // Only consider elements in the same set of parts
                        if (!m_selector(m_bulk_data->bucket(elems[i]))) {
                            continue;
                        }
                        elems_to_change.push_back(elems[i]);
                        break;
                    }
                }
            }
        } else {  // All elements are cells
            for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
                for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                    stk::mesh::Entity element = (*bucket)[i_elem];
                    // Only consider elements in the same set of parts
                    if (!m_selector(m_bulk_data->bucket(element))) {
                        continue;
                    }
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

    void PutAllCellElementsOnTheSameProcessorHost(const std::unordered_map<unsigned long, int> &cell_id_to_processor_map) {
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

                // Get the processor, cast to unsigned long
                int processor = cell_id_to_processor_map.at(static_cast<unsigned long>(cell_id[0]));

                // If the processor is not the current processor, move the element
                if (processor != this_processor) {
                    element_processor_pairs.push_back(std::make_pair(element, processor));
                }
            }
        }

        // Move the elements
        m_bulk_data->change_entity_owner(element_processor_pairs);
    }

    std::unordered_map<unsigned long, int> MakeGlobalCellIdToProcMap(const std::vector<std::pair<unsigned long, int>> &local_cell_id_to_processor) {
        // Communicate the cell id to processor vector
        int local_size = local_cell_id_to_processor.size();

        // Gather the sizes
        std::vector<int> sizes(m_bulk_data->parallel_size());
        MPI_Allgather(&local_size, 1, MPI_INT, sizes.data(), 1, MPI_INT, MPI_COMM_WORLD);

        // Convert sizes to byte sizes
        std::vector<int> byte_sizes(sizes.size());
        std::transform(sizes.begin(), sizes.end(), byte_sizes.begin(), [](int size) {
            return size * sizeof(std::pair<unsigned long, int>);
        });

        // Calculate the displacements in bytes
        std::vector<int> displacements(m_bulk_data->parallel_size(), 0);
        std::partial_sum(byte_sizes.begin(), byte_sizes.end() - 1, displacements.begin() + 1);

        // Calculate the total size of the global buffer in bytes
        int total_byte_size = std::accumulate(byte_sizes.begin(), byte_sizes.end(), 0);

        // Gather the cell id to processor map
        std::vector<std::pair<unsigned long, int>> global_cell_id_to_processor(total_byte_size / sizeof(std::pair<unsigned long, int>));
        MPI_Allgatherv(local_cell_id_to_processor.data(), local_size * sizeof(std::pair<unsigned long, int>), MPI_BYTE,
                       global_cell_id_to_processor.data(), byte_sizes.data(), displacements.data(), MPI_BYTE, MPI_COMM_WORLD);

        // Put into a map
        std::unordered_map<unsigned long, int> cell_id_to_processor_map(global_cell_id_to_processor.begin(), global_cell_id_to_processor.end());

        return cell_id_to_processor_map;
    }

    // This should be done after the active node field has been labeled and the active part has been created.
    void LabelCellAndSubcellIdsForNodalIntegrationHost(int num_subcells = 1) {
        // To make this work in parallel:
        // 1. Loop the owned and active nodes on host
        //    a. Get the connected elements, and set the active node's cell id to the minimum cell id of the connected elements
        //    b. create a cell id to processor map
        // 2. Communicate the node's cell id to make sure all the active nodes have the correct cell id
        // 3. Loop over the active nodes
        //    a. get the connected elements, and set the cell id to the minimum cell id that was set for the node above
        // 4. Communicate the cell id to processor map
        // 5. Call function to put all the cell elements on the same processor
        // 6. Set the active nodes active field back to 1 and set the smoothed cell id and cell id for the attached elements
        // 7. Set the subcell ids

        // Create the active selector
        std::vector<std::string> active_sets;
        active_sets.push_back(m_set + "_active");
        stk::mesh::Selector active_selector = StkGetSelector(active_sets, &m_bulk_data->mesh_meta_data());

        // Create the owned and active selector
        stk::mesh::Selector owned_active_selector = m_owned_selector & active_selector;

        // Loop over the active nodes on host, get the connected elements, and set the cell id to the minimum cell id of the connected elements
        // Looping over all active nodes, not just the owned ones. With multiple blocks, an owned active node may not have any connected elements in the same set of parts.
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                unsigned long *minimum_id = stk::mesh::field_data(*m_active_field, node);

                // Get the connected elements
                stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
                uint64_t num_elems = elems.size();

                // Loop over the connected elements and get the minimum id
                minimum_id[0] = UINT64_MAX;
                for (size_t i = 0; i < num_elems; ++i) {
                    bool is_in_selector = m_selector(m_bulk_data->bucket(elems[i]));  // Only consider elements in the same set of parts
                    unsigned long elem_id = m_bulk_data->identifier(elems[i]);
                    if (elem_id < minimum_id[0] && is_in_selector) {
                        minimum_id[0] = elem_id;
                    }
                }
            }
        }

        // Parallel min reduction of the cell id to processor map
        stk::mesh::parallel_min(*m_bulk_data, {m_active_field});

        // Create an cell_id to processor vector
        std::vector<std::pair<unsigned long, int>> local_cell_id_to_processor;
        int proc = m_bulk_data->parallel_rank();

        // Loop over the active nodes on host, get the connected elements, and set the cell id to the value that was stored in the node active field
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                unsigned long *minimum_id = stk::mesh::field_data(*m_active_field, node);
                assert(minimum_id[0] != UINT64_MAX);

                // If this node is owned by the current processor, add the cell id to the local cell id to processor map
                if (m_owned_selector(m_bulk_data->bucket(node))) {
                    local_cell_id_to_processor.push_back(std::make_pair(minimum_id[0], proc));
                }

                // Get the connected elements
                stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
                uint64_t num_elems = elems.size();

                // Loop over the connected elements and set the cell id to the minimum id
                for (size_t i = 0; i < num_elems; ++i) {
                    // Only consider elements in the same set of parts
                    if (!m_selector(m_bulk_data->bucket(elems[i]))) {
                        continue;
                    }
                    uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, elems[i]);
                    cell_id[0] = minimum_id[0];
                }
            }
        }

        // Communicate the cell id to processor map
        std::unordered_map<unsigned long, int> cell_id_to_processor_map = MakeGlobalCellIdToProcMap(local_cell_id_to_processor);

        // Put all the cell elements on the same processor
        PutAllCellElementsOnTheSameProcessorHost(cell_id_to_processor_map);

        // Loop over the active nodes, set the active field back to 1
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                unsigned long *active_field_data = stk::mesh::field_data(*m_active_field, node);
                active_field_data[0] = 1;
            }
        }

        // Loop over the owned active nodes, set the smoothed cell id and cell id for the attached elements
        uint64_t cell_id_index = 0;
        uint64_t subcell_id_index = 0;
        for (stk::mesh::Bucket *bucket : owned_active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];
                // Set the smoothed cell id and cell id for the attached elements
                stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
                stk::mesh::EntityVector filtered_elems;
                for (size_t i = 0; i < elems.size(); ++i) {
                    // Only consider elements in the same set of parts
                    if (!m_selector(m_bulk_data->bucket(elems[i]))) {
                        continue;
                    }
                    filtered_elems.push_back(elems[i]);
                }
                for (size_t i = 0; i < filtered_elems.size(); ++i) {
                    uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, filtered_elems[i]);
                    cell_id[0] = cell_id_index;
                }
                cell_id_index++;
                // Label the subcell ids and update the subcell id index
                LabelSubcellIds(num_subcells, filtered_elems, subcell_id_index);
            }
        }

        // Modified the cell id field, so clear the sync state and mark as modified
        m_ngp_cell_id_field->clear_sync_state();
        m_ngp_cell_id_field->modify_on_host();

        // Modified the active field, so clear the sync state and mark as modified
        m_ngp_active_field->clear_sync_state();
        m_ngp_active_field->modify_on_host();

        // Modified the subcell id field, so clear the sync state and mark as modified
        m_ngp_subcell_id_field->clear_sync_state();
        m_ngp_subcell_id_field->modify_on_host();
    }

    void LabelSubcellIds(const int &num_subcells, const stk::mesh::EntityVector &elems, uint64_t &subcell_id_index) {
        // Label the subcell ids
        // num_subcells < 1 = Each element is a subcell
        // num_subcells >= 1 = Each element is split into num_subcells subcells
        if (num_subcells < 1) {
            for (size_t i = 0; i < elems.size(); ++i) {
                uint64_t *subcell_id = stk::mesh::field_data(*m_subcell_id_field, elems[i]);
                subcell_id[0] = subcell_id_index++;
            }
        } else if (num_subcells == 1) {
            // Each element is split into num_subcells subcells
            for (size_t i = 0; i < elems.size(); ++i) {
                uint64_t *subcell_id = stk::mesh::field_data(*m_subcell_id_field, elems[i]);
                subcell_id[0] = subcell_id_index;
            }
            subcell_id_index++;
        } else {
            // TODO(jake): Implement clustering of subcells
            throw std::runtime_error("num_subcells > 1 is not implemented yet");
        }
    }

    // This should be done after the active node field has been labeled and the active part has been created.
    void LabelCellAndSubcellIdsForElementIntegrationHost(const int &num_subcells) {
        // TODO(jake): Implement clustering of subcells
        if (num_subcells != 1) {
            aperi::CoutP0() << "Warning: only 1 subdomain is supported for element integration smoothing. Will use 1 subdomain." << std::endl;
        }

        // Loop over the elements and set the cell id to the element id
        uint64_t cell_id_index = 0;
        uint64_t subcell_id_index = 0;
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];
                uint64_t *cell_id = stk::mesh::field_data(*m_cell_id_field, element);
                cell_id[0] = cell_id_index++;
                // TODO(jake): This labels each element as a subcell for now. Add more logic later.
                uint64_t *subcell_id = stk::mesh::field_data(*m_subcell_id_field, element);
                subcell_id[0] = subcell_id_index++;
            }
        }

        // Modified the cell id field, so clear the sync state and mark as modified
        m_ngp_cell_id_field->clear_sync_state();
        m_ngp_cell_id_field->modify_on_host();

        // Modified the subcell id field, so clear the sync state and mark as modified
        m_ngp_subcell_id_field->clear_sync_state();
        m_ngp_subcell_id_field->modify_on_host();
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::string m_set;                             // The set to process.
    size_t m_num_subcells;                         // The number of subcells.
    bool m_activate_center_node;                   // Whether to activate the center node
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_owned_selector;          // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
    UnsignedLongField *m_active_field;             // The active field
    UnsignedField *m_cell_id_field;                // The cell id field
    UnsignedField *m_subcell_id_field;             // The subcell id field
    NgpUnsignedLongField *m_ngp_active_field;      // The ngp active field
    NgpUnsignedField *m_ngp_cell_id_field;         // The ngp cell id field
    NgpUnsignedField *m_ngp_subcell_id_field;      // The ngp subcell id field
};

}  // namespace aperi
