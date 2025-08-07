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
#include <stk_mesh/base/FieldParallel.hpp>
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
#include "MathUtils.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

class MeshLabelerProcessor {
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
        m_active_field = StkGetField(FieldQueryData<Unsigned>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_active_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_active_field);

        // Get the temporary active field
        m_active_temp_field = StkGetField(FieldQueryData<UnsignedLong>{"active_temp", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_active_temp_field = &stk::mesh::get_updated_ngp_field<UnsignedLong>(*m_active_temp_field);

        // Get the cell id field
        m_cell_id_field = StkGetField(FieldQueryData<Unsigned>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_id_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_cell_id_field);

        // Get the subcell id field
        m_subcell_id_field = StkGetField(FieldQueryData<Unsigned>{"subcell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_subcell_id_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_subcell_id_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData<double>{m_mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);
    }

    void LabelForThexNodalIntegration(bool deactivate_small_subcells, double deactivate_subcells_smaller_than) {
        // Set the active field for nodal integration
        SetActiveFieldForNodalIntegrationHost(deactivate_small_subcells, deactivate_subcells_smaller_than);

        // Parallel sum the active field
        ParallelMaxActiveField();

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

        if (false) {
            // Add the center node to the active part
            AddActiveNodesAtElementCentersHost();
        }

        // Copy the temporary active field to the active field
        CopyTemporaryActiveFieldToActiveField();

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

        // Copy the temporary active field to the active field
        CopyTemporaryActiveFieldToActiveField();

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

        // Copy the temporary active field to the active field
        CopyTemporaryActiveFieldToActiveField();

        // Sync the fields to the device
        SyncFieldsToDevice();
    }

    void ParallelMaxActiveField() {
        stk::mesh::parallel_max(*m_bulk_data, {m_active_temp_field});
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

    void CopyTemporaryActiveFieldToActiveField() {
        // Copy the temporary active field to the active field
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                UnsignedLong *active_temp_field_data = stk::mesh::field_data(*m_active_temp_field, (*bucket)[i_node]);
                Unsigned *active_field_data = stk::mesh::field_data(*m_active_field, (*bucket)[i_node]);

                // Copy the value from the temporary active field to the active field
                active_field_data[0] = static_cast<Unsigned>(active_temp_field_data[0]);
            }
        }
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

    double GetHexVolume(const stk::mesh::Entity *nodes) {
        // Assume element is a hex with 8 nodes
        constexpr int num_nodes = 8;
        Eigen::Matrix<double, num_nodes, 3> coords;

        // Fill the Eigen matrix with node coordinates
        for (int i = 0; i < num_nodes; ++i) {
            const double *node_coords = stk::mesh::field_data(*m_coordinates_field, nodes[i]);
            coords.row(i) = Eigen::Vector3d(node_coords[0], node_coords[1], node_coords[2]);
        }

        // Compute and return the volume
        return aperi::ComputeHexahedronVolume(coords);
    }

    // Set the active field for nodal integration. This is the original nodes from the tet mesh befor the 'thex' operation.
    void SetActiveFieldForNodalIntegrationHost(bool deactivate_small_subcells, double deactivate_subcells_smaller_than) {
        // Set the active field to 0 for all nodes
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, (*bucket)[i_node]);
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

                if (deactivate_small_subcells && GetHexVolume(nodes) < deactivate_subcells_smaller_than) {
                    // Get the element
                    stk::mesh::Entity element = (*bucket)[i_elem];
                    // Set the m_subcell_id_field and m_cell_id_field to INVALID_ID
                    stk::mesh::field_data(*m_subcell_id_field, element)[0] = INVALID_ID;
                    stk::mesh::field_data(*m_cell_id_field, element)[0] = INVALID_ID;
                    continue;
                }

                // Get the minimum id
                Unsigned minimum_id = m_bulk_data->identifier(nodes[0]);
                size_t minimum_index = 0;
                for (size_t i = 1; i < num_nodes; ++i) {
                    Unsigned id = m_bulk_data->identifier(nodes[i]);
                    if (id < minimum_id) {
                        minimum_id = id;
                        minimum_index = i;
                    }
                }

                // Set the active value to 1 for the minimum id
                UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, nodes[minimum_index]);
                active_field_data[0] = 1;

                // If the center node is to be activated, set the active value to 1 for the center node
                if (m_activate_center_node) {
                    active_field_data = stk::mesh::field_data(*m_active_temp_field, nodes[GetCenterNodeIndex(minimum_index)]);
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
                unsigned num_nodes = m_bulk_data->num_nodes(element);

                // Throw an exception if an element has something other than 1 active node
                uint16_t num_active_nodes = 0;
                uint16_t num_center_nodes = 0;
                for (size_t i = 0; i < num_nodes; ++i) {
                    UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, nodes[i]);
                    if (active_field_data[0] == 1) {
                        num_active_nodes++;
                    } else if (active_field_data[0] == 2) {
                        num_center_nodes++;
                    }
                }
                if (num_active_nodes != 1) {
                    // Get the element
                    stk::mesh::Entity element = (*bucket)[i_elem];
                    // Can be 0 if the element is not in the active part
                    if (stk::mesh::field_data(*m_subcell_id_field, element)[0] == INVALID_ID) {
                        continue;
                    }
                    size_t element_id = m_bulk_data->identifier(element);
                    std::string message = "Nodal integration requires exactly one active node per element. Found " + std::to_string(num_active_nodes) + " active nodes in element " + std::to_string(element_id) + ". Nodes: \n";
                    for (size_t i = 0; i < num_nodes; ++i) {
                        UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, nodes[i]);
                        message += " ID: " + std::to_string(m_bulk_data->identifier(nodes[i])) + ", active value: " + std::to_string(active_field_data[0]) + "\n";
                    }
                    throw std::runtime_error(message);
                } else if (num_center_nodes != 1 && m_activate_center_node) {
                    size_t element_id = m_bulk_data->identifier(element);
                    std::string message = "Nodal integration requires exactly one center node per element. Found " + std::to_string(num_center_nodes) + " center nodes in element " + std::to_string(element_id) + ". Nodes: \n";
                    for (size_t i = 0; i < num_nodes; ++i) {
                        UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, nodes[i]);
                        message += " ID: " + std::to_string(m_bulk_data->identifier(nodes[i])) + ", active value: " + std::to_string(active_field_data[0]) + "\n";
                    }
                    throw std::runtime_error(message);
                }
            }
        }
        return true;
    }

    void CreateActivePartFromActiveFieldHost(UnsignedLong active_value = 1) {
        // Host operation and mesh modification
        stk::mesh::EntityVector nodes_to_change;

        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, (*bucket)[i_node]);
                if (active_field_data[0] == active_value) {
                    nodes_to_change.push_back((*bucket)[i_node]);
                }
            }
        }

        //  Change the nodes to the active part
        ChangePartsHost("universal_active_part", nodes_to_change, *m_bulk_data);
        ChangePartsHost(m_set + "_active", nodes_to_change, *m_bulk_data);
    }

    void AddActiveNodesAtElementCentersHost() {
        m_bulk_data->modification_begin();
        m_mesh_data->DeclareNodePart(m_set + "_extra_nodes");
        m_mesh_data->AddPartToOutput(m_set + "_extra_nodes");
        stk::mesh::PartVector parts;
        parts.push_back(m_bulk_data->mesh_meta_data().get_part(m_set));
        parts.push_back(m_bulk_data->mesh_meta_data().get_part(m_set + "_active"));
        parts.push_back(m_bulk_data->mesh_meta_data().get_part("universal_active_part"));
        parts.push_back(m_bulk_data->mesh_meta_data().get_part(m_set + "_extra_nodes"));

        // Declare the late field for the owning element of the extra nodes
        aperi::FieldData owning_element_field_data("owning_element", aperi::FieldDataRank::SCALAR, aperi::FieldDataTopologyRank::NODE, 1, 1, std::vector<aperi::Unsigned>{});
        m_mesh_data->DeclareLateField(owning_element_field_data, {m_set + "_extra_nodes"});

        // Get the number of elements
        unsigned num_requested = m_mesh_data->GetNumOwnedElements({m_set});
        std::vector<stk::mesh::EntityId> requested_ids;
        m_bulk_data->generate_new_ids(stk::topology::NODE_RANK, num_requested, requested_ids);

        // Counter for the new nodes
        unsigned new_node_counter = 0;

        // Get the node_sets, max_edge_length, and parent_cell fields
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        stk::mesh::Field<aperi::Unsigned> *node_sets_field = StkGetField(FieldQueryData<aperi::Unsigned>{"node_sets", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        stk::mesh::Field<aperi::Real> *max_edge_length_field = StkGetField(FieldQueryData<aperi::Real>{"max_edge_length", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        aperi::FieldQueryData<aperi::Unsigned> parent_cell_query = aperi::FieldQueryData<aperi::Unsigned>{"parent_cell", FieldQueryState::None, FieldDataTopologyRank::NODE};
        stk::mesh::Field<aperi::Unsigned> *parent_cell_field;
        bool parent_cell_field_exists = aperi::StkFieldExists(parent_cell_query, meta_data);
        if (parent_cell_field_exists) {
            parent_cell_field = StkGetField(FieldQueryData<aperi::Unsigned>{"parent_cell", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        }
        stk::mesh::Field<aperi::Unsigned> *owning_element_field = StkGetField(FieldQueryData<aperi::Unsigned>{"owning_element", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        stk::mesh::Field<aperi::Unsigned> *cell_id_field = StkGetField(FieldQueryData<aperi::Unsigned>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);

        // Get the various coordinate fields
        aperi::FieldQueryData<aperi::Real> current_coordinates_n_query_data{"current_coordinates_n", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        aperi::FieldQueryData<aperi::Real> current_coordinates_np1_query_data{"current_coordinates_np1", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        aperi::FieldQueryData<aperi::Real> reference_coordinates_query_data{"reference_coordinates", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        stk::mesh::Field<aperi::Real> *current_coordinates_n_field;
        stk::mesh::Field<aperi::Real> *current_coordinates_np1_field;
        stk::mesh::Field<aperi::Real> *reference_coordinates_field;
        bool extra_coordinates_fields_exist = aperi::StkFieldExists(current_coordinates_n_query_data, meta_data) &&
                                              aperi::StkFieldExists(current_coordinates_np1_query_data, meta_data) &&
                                              aperi::StkFieldExists(reference_coordinates_query_data, meta_data);
        if (extra_coordinates_fields_exist) {
            current_coordinates_n_field = StkGetField(FieldQueryData<aperi::Real>{"current_coordinates_n", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
            current_coordinates_np1_field = StkGetField(FieldQueryData<aperi::Real>{"current_coordinates_np1", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
            reference_coordinates_field = StkGetField(FieldQueryData<aperi::Real>{"reference_coordinates", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        }

        // Create a new node for each element center
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                // Get the element
                stk::mesh::Entity element = (*bucket)[i_elem];

                // Get the nodes of the element
                const stk::mesh::Entity *p_connected_nodes = m_bulk_data->begin_nodes(element);
                size_t num_connected_nodes = m_bulk_data->num_nodes(element);

                // Calculate the centroid of the element
                Eigen::Vector3d centroid(0.0, 0.0, 0.0);
                for (size_t i = 0; i < num_connected_nodes; ++i) {
                    double *p_this_node_coords = stk::mesh::field_data(*m_coordinates_field, p_connected_nodes[i]);
                    centroid += Eigen::Vector3d(p_this_node_coords[0], p_this_node_coords[1], p_this_node_coords[2]);
                }
                centroid /= num_connected_nodes;  // Average the coordinates to get the centroid

                // Compute the max distance from the centroid to the nodes, times 3
                double max_distance = 0.0;
                for (size_t i = 0; i < num_connected_nodes; ++i) {
                    double *p_this_node_coords = stk::mesh::field_data(*m_coordinates_field, p_connected_nodes[i]);
                    Eigen::Vector3d node_coords(p_this_node_coords[0], p_this_node_coords[1], p_this_node_coords[2]);
                    double distance = (node_coords - centroid).norm();
                    if (distance > max_distance) {
                        max_distance = distance;
                    }
                }
                max_distance *= 3.0;  // Triple the distance for the max edge length

                stk::mesh::Entity node = m_bulk_data->declare_node(requested_ids[new_node_counter++], parts);
                double *p_node_coords = stk::mesh::field_data(*m_coordinates_field, node);
                p_node_coords[0] = centroid[0];
                p_node_coords[1] = centroid[1];
                p_node_coords[2] = centroid[2];
                if (extra_coordinates_fields_exist) {
                    double *p_current_coords_n = stk::mesh::field_data(*current_coordinates_n_field, node);
                    double *p_current_coords_np1 = stk::mesh::field_data(*current_coordinates_np1_field, node);
                    double *p_reference_coords = stk::mesh::field_data(*reference_coordinates_field, node);
                    p_current_coords_n[0] = centroid[0];
                    p_current_coords_n[1] = centroid[1];
                    p_current_coords_n[2] = centroid[2];
                    p_current_coords_np1[0] = centroid[0];
                    p_current_coords_np1[1] = centroid[1];
                    p_current_coords_np1[2] = centroid[2];
                    p_reference_coords[0] = centroid[0];
                    p_reference_coords[1] = centroid[1];
                    p_reference_coords[2] = centroid[2];
                }

                // Set the active field for the new node
                UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, node);
                active_field_data[0] = 1;  // Set to active

                // Set the node_sets field for the new node
                // TODO(jake): This should be moved to the preprocessor
                aperi::Unsigned *node_sets_data = stk::mesh::field_data(*node_sets_field, node);
                node_sets_data[0] = 1;  // Set to the set of the mesh

                // Set the max_edge_length field for the new node
                aperi::Real *max_edge_length_data = stk::mesh::field_data(*max_edge_length_field, node);
                max_edge_length_data[0] = max_distance;

                // Set the owning_element field for the new node
                aperi::Unsigned *owning_element_data = stk::mesh::field_data(*owning_element_field, node);
                owning_element_data[0] = element.local_offset();

                // Set the parent_cell field for the new node
                if (parent_cell_field_exists) {
                    aperi::Unsigned *parent_cell_data = stk::mesh::field_data(*parent_cell_field, node);
                    aperi::Unsigned *cell_id_data = stk::mesh::field_data(*cell_id_field, element);
                    parent_cell_data[0] = cell_id_data[0];
                }
            }
        }
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
            stk::mesh::Selector owned_active_selector = active_selector & m_bulk_data->mesh_meta_data().locally_owned_part();

            // Loop over the active nodes, grab the first element in the connected entities list that is in the same set of parts
            for (stk::mesh::Bucket *bucket : owned_active_selector.get_buckets(stk::topology::NODE_RANK)) {
                for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                    stk::mesh::Entity node = (*bucket)[i_node];

                    // Get the connected elements
                    stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
                    size_t num_elems = elems.size();
                    for (size_t i = 0; i < num_elems; ++i) {
                        // Only consider elements in the same set of parts
                        if (!m_selector(m_bulk_data->bucket(elems[i]))) {
                            continue;
                        }
                        // Only consider elements that are not already labeled as INVALID_ID
                        if (stk::mesh::field_data(*m_subcell_id_field, elems[i])[0] == INVALID_ID) {
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
                    // Only consider elements that are not already labeled as INVALID_ID
                    if (stk::mesh::field_data(*m_subcell_id_field, element)[0] == INVALID_ID) {
                        continue;
                    }
                    elems_to_change.push_back(element);
                }
            }
        }

        //  Change the elements to the cells part
        ChangePartsHost("universal_cells_part", elems_to_change, *m_bulk_data);
        ChangePartsHost(m_set + "_cells", elems_to_change, *m_bulk_data);
    }

    void PutAllCellElementsOnTheSameProcessorHost(const std::unordered_map<Unsigned, int> &cell_id_to_processor_map) {
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

                // Only consider elements that aren't already labeled as INVALID_ID
                if (stk::mesh::field_data(*m_subcell_id_field, element)[0] == INVALID_ID) {
                    continue;
                }

                // Get the cell id
                Unsigned *cell_id = stk::mesh::field_data(*m_cell_id_field, element);

                // Get the processor, cast to Unsigned
                int processor = cell_id_to_processor_map.at(static_cast<Unsigned>(cell_id[0]));

                // If the processor is not the current processor, move the element
                if (processor != this_processor) {
                    element_processor_pairs.push_back(std::make_pair(element, processor));
                }
            }
        }

        // Move the elements
        m_bulk_data->change_entity_owner(element_processor_pairs);
    }

    std::unordered_map<Unsigned, int> MakeGlobalCellIdToProcMap(const std::vector<std::pair<Unsigned, int>> &local_cell_id_to_processor) {
        // Communicate the cell id to processor vector
        int local_size = local_cell_id_to_processor.size();

        // Gather the sizes
        std::vector<int> sizes(m_bulk_data->parallel_size());
        MPI_Allgather(&local_size, 1, MPI_INT, sizes.data(), 1, MPI_INT, MPI_COMM_WORLD);

        // Convert sizes to byte sizes
        std::vector<int> byte_sizes(sizes.size());
        std::transform(sizes.begin(), sizes.end(), byte_sizes.begin(), [](int size) {
            return size * sizeof(std::pair<Unsigned, int>);
        });

        // Calculate the displacements in bytes
        std::vector<int> displacements(m_bulk_data->parallel_size(), 0);
        std::partial_sum(byte_sizes.begin(), byte_sizes.end() - 1, displacements.begin() + 1);

        // Calculate the total size of the global buffer in bytes
        int total_byte_size = std::accumulate(byte_sizes.begin(), byte_sizes.end(), 0);

        // Gather the cell id to processor map
        std::vector<std::pair<Unsigned, int>> global_cell_id_to_processor(total_byte_size / sizeof(std::pair<Unsigned, int>));
        MPI_Allgatherv(local_cell_id_to_processor.data(), local_size * sizeof(std::pair<Unsigned, int>), MPI_BYTE,
                       global_cell_id_to_processor.data(), byte_sizes.data(), displacements.data(), MPI_BYTE, MPI_COMM_WORLD);

        // Put into a map
        std::unordered_map<Unsigned, int> cell_id_to_processor_map(global_cell_id_to_processor.begin(), global_cell_id_to_processor.end());

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
                UnsignedLong *minimum_id = stk::mesh::field_data(*m_active_temp_field, node);

                // Get the connected elements
                stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
                size_t num_elems = elems.size();

                // Loop over the connected elements and get the minimum id
                minimum_id[0] = UNSIGNED_MAX;
                for (size_t i = 0; i < num_elems; ++i) {
                    if (stk::mesh::field_data(*m_subcell_id_field, elems[i])[0] == INVALID_ID) {
                        continue;
                    }
                    bool is_in_selector = m_selector(m_bulk_data->bucket(elems[i]));  // Only consider elements in the same set of parts
                    Unsigned elem_id = m_bulk_data->identifier(elems[i]);
                    if (elem_id < minimum_id[0] && is_in_selector) {
                        minimum_id[0] = elem_id;
                    }
                }
            }
        }

        // Parallel min reduction of the cell id to processor map
        stk::mesh::parallel_min(*m_bulk_data, {m_active_temp_field});

        // Create an cell_id to processor vector
        std::vector<std::pair<Unsigned, int>> local_cell_id_to_processor;
        int proc = m_bulk_data->parallel_rank();

        // Loop over the active nodes on host, get the connected elements, and set the cell id to the value that was stored in the node active field
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                UnsignedLong *minimum_id = stk::mesh::field_data(*m_active_temp_field, node);
                assert(minimum_id[0] != UNSIGNED_MAX);

                // If this node is owned by the current processor, add the cell id to the local cell id to processor map
                if (m_owned_selector(m_bulk_data->bucket(node))) {
                    local_cell_id_to_processor.push_back(std::make_pair(minimum_id[0], proc));
                }

                // Get the connected elements
                stk::mesh::ConnectedEntities elems = m_bulk_data->get_connected_entities(node, stk::topology::ELEMENT_RANK);
                size_t num_elems = elems.size();

                // Loop over the connected elements and set the cell id to the minimum id
                for (size_t i = 0; i < num_elems; ++i) {
                    // Only consider elements in the same set of parts
                    if (!m_selector(m_bulk_data->bucket(elems[i]))) {
                        continue;
                    }
                    Unsigned *cell_id = stk::mesh::field_data(*m_cell_id_field, elems[i]);
                    cell_id[0] = minimum_id[0];
                }
            }
        }

        // Communicate the cell id to processor map
        std::unordered_map<Unsigned, int> cell_id_to_processor_map = MakeGlobalCellIdToProcMap(local_cell_id_to_processor);

        // Put all the cell elements on the same processor
        PutAllCellElementsOnTheSameProcessorHost(cell_id_to_processor_map);

        // Loop over the active nodes, set the active field back to 1
        for (stk::mesh::Bucket *bucket : active_selector.get_buckets(stk::topology::NODE_RANK)) {
            for (size_t i_node = 0; i_node < bucket->size(); ++i_node) {
                stk::mesh::Entity node = (*bucket)[i_node];

                // Get the active value
                UnsignedLong *active_field_data = stk::mesh::field_data(*m_active_temp_field, node);
                active_field_data[0] = 1;
            }
        }

        // Loop over the owned active nodes, set the smoothed cell id and cell id for the attached elements
        Unsigned cell_id_index = 0;
        Unsigned subcell_id_index = 0;
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
                    Unsigned *cell_id = stk::mesh::field_data(*m_cell_id_field, filtered_elems[i]);
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

    void LabelSubcellIds(const int &num_subcells, const stk::mesh::EntityVector &elems, Unsigned &subcell_id_index) {
        // Label the subcell ids
        // num_subcells < 1 = Each element is a subcell
        // num_subcells >= 1 = Each element is split into num_subcells subcells
        if (num_subcells < 1) {
            for (size_t i = 0; i < elems.size(); ++i) {
                Unsigned *subcell_id = stk::mesh::field_data(*m_subcell_id_field, elems[i]);
                subcell_id[0] = subcell_id_index++;
            }
        } else if (num_subcells == 1) {
            // Each element is split into num_subcells subcells
            for (size_t i = 0; i < elems.size(); ++i) {
                Unsigned *subcell_id = stk::mesh::field_data(*m_subcell_id_field, elems[i]);
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
        Unsigned cell_id_index = 0;
        Unsigned subcell_id_index = 0;
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            for (size_t i_elem = 0; i_elem < bucket->size(); ++i_elem) {
                stk::mesh::Entity element = (*bucket)[i_elem];
                Unsigned *cell_id = stk::mesh::field_data(*m_cell_id_field, element);
                cell_id[0] = cell_id_index++;
                // TODO(jake): This labels each element as a subcell for now. Add more logic later.
                Unsigned *subcell_id = stk::mesh::field_data(*m_subcell_id_field, element);
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
    std::shared_ptr<aperi::MeshData> m_mesh_data;   // The mesh data object.
    std::string m_set;                              // The set to process.
    size_t m_num_subcells;                          // The number of subcells.
    bool m_activate_center_node;                    // Whether to activate the center node
    stk::mesh::BulkData *m_bulk_data;               // The bulk data object.
    stk::mesh::Selector m_selector;                 // The selector
    stk::mesh::Selector m_owned_selector;           // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                  // The ngp mesh object.
    UnsignedField *m_active_field;                  // The active field
    UnsignedLongField *m_active_temp_field;         // The active temporary field
    UnsignedField *m_cell_id_field;                 // The cell id field
    UnsignedField *m_subcell_id_field;              // The subcell id field
    RealField *m_coordinates_field;                 // The coordinates field
    NgpUnsignedField *m_ngp_active_field;           // The ngp active field
    NgpUnsignedLongField *m_ngp_active_temp_field;  // The ngp active temporary field
    NgpUnsignedField *m_ngp_cell_id_field;          // The ngp cell id field
    NgpUnsignedField *m_ngp_subcell_id_field;       // The ngp subcell id field
    NgpRealField *m_ngp_coordinates_field;          // The ngp coordinates field
};

}  // namespace aperi
