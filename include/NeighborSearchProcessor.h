#pragma once

#include <Eigen/Dense>
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
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

using ExecSpace = stk::ngp::ExecSpace;
using FastMeshIndicesViewType = Kokkos::View<stk::mesh::FastMeshIndex *, ExecSpace>;

class NeighborSearchProcessor {
    typedef stk::mesh::Field<double> DoubleField;  // TODO(jake): Change these to unsigned. Need to update FieldData to handle.
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_local_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_local_selector = m_selector & full_local_selector;

        // Get the node number of neighbors field
        m_node_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_node_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_node_num_neighbors_field);

        // Get the node neighbors field
        m_node_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_node_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_node_neighbors_field);

        // Get the element number of neighbors field
        m_element_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::ELEMENT}, meta_data);
        m_ngp_element_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_num_neighbors_field);

        // Get the element neighbors field
        m_element_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::ELEMENT}, meta_data);
        m_ngp_element_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_neighbors_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);
    }

    FastMeshIndicesViewType GetLocalEntityIndices(stk::mesh::EntityRank rank) {
        std::vector<stk::mesh::Entity> local_entities;
        stk::mesh::get_entities(*m_bulk_data, rank, m_local_selector, local_entities);

        FastMeshIndicesViewType mesh_indices("mesh_indices", local_entities.size());
        FastMeshIndicesViewType::HostMirror host_mesh_indices = Kokkos::create_mirror_view(Kokkos::WithoutInitializing, mesh_indices);

        for (size_t i = 0; i < local_entities.size(); ++i) {
            const stk::mesh::MeshIndex &mesh_index = m_bulk_data->mesh_index(local_entities[i]);
            host_mesh_indices(i) = stk::mesh::FastMeshIndex{mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal};
        }

        Kokkos::deep_copy(mesh_indices, host_mesh_indices);
        return mesh_indices;
    }

    // Loop over each element and add the element's nodes to the neighbors field
    void add_elements_ring_0_nodes() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_element_num_neighbors_field = *m_ngp_element_num_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;

        // Add the nodes attached to the element
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                double num_nodes = nodes.size();
                assert(num_nodes <= MAX_CELL_NUM_NEIGHBORS);

                double starting_num_nodes = ngp_element_num_neighbors_field(elem_index, 0);
                ngp_element_num_neighbors_field(elem_index, 0) += num_nodes;

                for (size_t i = 0; i < num_nodes; ++i) {
                    size_t index = starting_num_nodes + i;
                    ngp_element_neighbors_field(elem_index, index) = (double)nodes[i].local_offset();
                }
            });
    }

    // Loop over each element and add the element's nodes to the neighbors field
    void add_nodes_ring_0_nodes() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;

        // Add itself to the neighbors field

        // Slow host operation that is needed to get an index. There is plans to add this to the stk::mesh::NgpMesh.
        // FastMeshIndicesViewType local_node_indices = GetLocalEntityIndices(stk::topology::NODE_RANK);

        // const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, m_local_selector);

        // Kokkos::parallel_for(stk::ngp::DeviceRangePolicy(0, num_local_nodes), KOKKOS_LAMBDA(const unsigned &i) {
        //     stk::mesh::Entity node = m_ngp_mesh.get_entity(stk::topology::NODE_RANK, local_node_indices(i));
        //     stk::mesh::EntityFieldData<double> entity_num_neighbors = ngp_num_neighbors_field(local_node_indices(i));
        //     stk::mesh::EntityFieldData<double> entity_neighbors = ngp_neighbors_field(local_node_indices(i));
        //     double starting_num_nodes = entity_num_neighbors[0];
        //     entity_num_neighbors[0] += 1;
        //     entity_neighbors[starting_num_nodes] = (double)node.local_offset();
        // });

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the node entity
                stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
                double starting_num_nodes = ngp_node_num_neighbors_field(node_index, 0);
                ngp_node_num_neighbors_field(node_index, 0) += 1;
                ngp_node_neighbors_field(node_index, (size_t)starting_num_nodes) = (double)node.local_offset();
            });
    }

    template <size_t NumCellNodes>
    void set_element_neighbors_from_node_neighbors() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;
        auto ngp_element_num_neighbors_field = *m_ngp_element_num_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;

        // Add the nodes attached to the element
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                assert(nodes.size() == NumCellNodes);
                Kokkos::Array<size_t, MAX_NODE_NUM_NEIGHBORS * NumCellNodes> node_neighbors;

                // Get the node neighbors, full list with potential duplicates
                size_t total_num_neighbors = 0;
                for (size_t i = 0; i < NumCellNodes; ++i) {
                    stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                    size_t num_neighbors = (size_t)ngp_node_num_neighbors_field(node_index, 0);
                    for (size_t j = 0; j < num_neighbors; ++j) {
                        node_neighbors[total_num_neighbors] = (size_t)ngp_node_neighbors_field(node_index, j);
                        ++total_num_neighbors;
                    }
                }

                // Sort the node neighbors and remove duplicates
                total_num_neighbors = SortAndRemoveDuplicates(node_neighbors, total_num_neighbors);

                // Make sure we don't exceed the maximum number of neighbors
                // TODO(jake): Make ways of handling this
                KOKKOS_ASSERT(total_num_neighbors <= MAX_CELL_NUM_NEIGHBORS);

                // Set the element neighbors
                ngp_element_num_neighbors_field(elem_index, 0) = total_num_neighbors;
                for (size_t i = 0; i < total_num_neighbors; ++i) {
                    ngp_element_neighbors_field(elem_index, i) = (double)node_neighbors[i];
                }
            });
    }

    void MarkAndSyncFieldsToHost() {
        m_ngp_node_neighbors_field->modify_on_device();
        m_ngp_node_num_neighbors_field->modify_on_device();
        m_ngp_element_neighbors_field->modify_on_device();
        m_ngp_element_num_neighbors_field->modify_on_device();
        m_ngp_node_neighbors_field->sync_to_host();
        m_ngp_node_num_neighbors_field->sync_to_host();
        m_ngp_element_neighbors_field->sync_to_host();
        m_ngp_element_num_neighbors_field->sync_to_host();
    }

    void MarkAndSyncFieldsToDevice() {
        m_ngp_node_neighbors_field->modify_on_host();
        m_ngp_node_num_neighbors_field->modify_on_host();
        m_ngp_element_neighbors_field->modify_on_host();
        m_ngp_element_num_neighbors_field->modify_on_host();
        m_ngp_node_neighbors_field->sync_to_device();
        m_ngp_node_num_neighbors_field->sync_to_device();
        m_ngp_element_neighbors_field->sync_to_device();
        m_ngp_element_num_neighbors_field->sync_to_device();
    }

    void CommunicateAllFieldData() const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_node_neighbors_field, m_node_num_neighbors_field, m_element_neighbors_field, m_element_num_neighbors_field});
    }

    double GetNumElements() {
        return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;       // The mesh data object.
    std::vector<std::string> m_sets;                    // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                   // The bulk data object.
    stk::mesh::Selector m_selector;                     // The selector
    stk::mesh::Selector m_local_selector;               // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                      // The ngp mesh object.
    DoubleField *m_coordinates_field;                   // The coordinates field
    DoubleField *m_node_num_neighbors_field;            // The number of neighbors field
    DoubleField *m_node_neighbors_field;                // The neighbors field
    DoubleField *m_element_num_neighbors_field;         // The number of neighbors field
    DoubleField *m_element_neighbors_field;             // The neighbors field
    NgpDoubleField *m_ngp_coordinates_field;            // The ngp coordinates field
    NgpDoubleField *m_ngp_node_num_neighbors_field;     // The ngp number of neighbors field
    NgpDoubleField *m_ngp_node_neighbors_field;         // The ngp neighbors field
    NgpDoubleField *m_ngp_element_num_neighbors_field;  // The ngp number of neighbors field
    NgpDoubleField *m_ngp_element_neighbors_field;      // The ngp neighbors field
};

class FunctionValueStorageProcessor {
    typedef stk::mesh::Field<double> DoubleField;  // TODO(jake): Change these to unsigned. Need to update FieldData to handle.
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    FunctionValueStorageProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_local_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_local_selector = m_selector & full_local_selector;

        // Get the number of neighbors field
        m_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbors_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the function values field
        m_function_values_field = StkGetField(FieldQueryData{"function_values", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_function_values_field);
    }

    template <size_t NumNodes, typename FunctionFunctor>
    void compute_and_store_function_values(FunctionFunctor &function_functor) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_neighbors_field = *m_ngp_num_neighbors_field;
        auto ngp_neighbors_field = *m_ngp_neighbors_field;
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_function_values_field = *m_ngp_function_values_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of neighbors
                double num_neighbors = ngp_num_neighbors_field(node_index, 0);

                Eigen::Matrix<double, NumNodes, 3> neighbor_coordinates;
                for (size_t i = 0; i < num_neighbors; ++i) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_neighbors_field(node_index, i));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);
                    // Get the neighbor's coordinates
                    for (size_t j = 0; j < 3; ++j) {
                        neighbor_coordinates(i, j) = ngp_coordinates_field(neighbor_index, j);
                    }
                }

                Eigen::Matrix<double, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = ngp_coordinates_field(node_index, j);
                }

                // Compute the function values
                Eigen::Matrix<double, NumNodes, 1> function_values = function_functor.values(coordinates, neighbor_coordinates, num_neighbors);

                // Store the function values
                for (size_t i = 0; i < num_neighbors; ++i) {
                    ngp_function_values_field(node_index, i) = function_values(i, 0);
                }
            });
    }

    void MarkAndSyncFieldsToHost() {
        m_ngp_function_values_field->modify_on_device();
        m_ngp_function_values_field->sync_to_host();
    }

    void MarkAndSyncFieldsToDevice() {
        m_ngp_function_values_field->modify_on_host();
        m_ngp_function_values_field->modify_on_host();
    }

    void CommunicateAllFieldData() const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_function_values_field});
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_local_selector;          // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
    DoubleField *m_num_neighbors_field;            // The number of neighbors field
    DoubleField *m_neighbors_field;                // The neighbors field
    DoubleField *m_coordinates_field;              // The coordinates field
    DoubleField *m_function_values_field;          // The function values field
    NgpDoubleField *m_ngp_num_neighbors_field;     // The ngp number of neighbors field
    NgpDoubleField *m_ngp_neighbors_field;         // The ngp neighbors field
    NgpDoubleField *m_ngp_coordinates_field;       // The ngp coordinates field
    NgpDoubleField *m_ngp_function_values_field;   // The ngp function values field
};

template <size_t NumFields>
class ValueFromGeneralizedFieldProcessor {
    typedef stk::mesh::Field<double> DoubleField;  // TODO(jake): Change these to unsigned. Need to update FieldData to handle.
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    ValueFromGeneralizedFieldProcessor(const std::array<FieldQueryData, NumFields> source_field_query_data, const std::array<FieldQueryData, NumFields> destination_field_query_data, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_local_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_local_selector = m_selector & full_local_selector;

        // Get the number of neighbors field
        m_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbors_field);

        // Get the function values field
        m_function_values_field = StkGetField(FieldQueryData{"function_values", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_function_values_field);

        // Get the source (generalized) and destination fields
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields.push_back(StkGetField(source_field_query_data[i], meta_data));
            m_ngp_source_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_source_fields.back());
            m_destination_fields.push_back(StkGetField(destination_field_query_data[i], meta_data));
            m_ngp_destination_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_destination_fields.back());
        }
    }

    void compute_value_from_generalized_field() {
        // destination_fields(i) = /sum_{j=0}^{num_neighbors} source_fields(neighbors(i, j)) * function_values(i, j)

        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_neighbors_field = *m_ngp_num_neighbors_field;
        auto ngp_neighbors_field = *m_ngp_neighbors_field;
        auto ngp_function_values_field = *m_ngp_function_values_field;
        Kokkos::Array<NgpDoubleField, NumFields> ngp_source_fields;
        Kokkos::Array<NgpDoubleField, NumFields> ngp_destination_fields;
        for (size_t i = 0; i < NumFields; i++) {
            ngp_source_fields[i] = *m_ngp_source_fields[i];
            ngp_destination_fields[i] = *m_ngp_destination_fields[i];
        }

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of neighbors
                double num_neighbors = ngp_num_neighbors_field(node_index, 0);

                // If there are no neighbors, set the destination field to the source field
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < 3; ++j) { // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general
                            ngp_destination_fields[i](node_index, j) = ngp_source_fields[i](node_index, j);
                        }
                    }
                }

                // If there are neighbors, compute the destination field from the function values and source fields
                for (size_t i = 0; i < num_neighbors; ++i) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_neighbors_field(node_index, i));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);

                    // Get the function value
                    double function_value = ngp_function_values_field(node_index, i);

                    // Get the source field values
                    for (size_t j = 0; j < NumFields; ++j) {
                        // Zero out the destination field
                        for (size_t k = 0; k < 3; ++k) { // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general
                            ngp_destination_fields[j](node_index, k) = 0.0;
                        }
                        for (size_t k = 0; k < 3; ++k) { // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general
                            double source_value = ngp_source_fields[j](neighbor_index, k);
                            ngp_destination_fields[j](node_index, k) += source_value * function_value;
                        }
                    }
                }
            });
    }


    // Marking modified
    void MarkDestinationFieldModifiedOnDevice(size_t field_index) {
        // STK QUESTION: Should I always clear sync state before marking modified?
        m_ngp_destination_fields[field_index]->clear_sync_state();
        m_ngp_destination_fields[field_index]->modify_on_device();
    }

    void MarkAllDestinationFieldsModifiedOnDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkDestinationFieldModifiedOnDevice(i);
        }
    }

    // Syncing
    void SyncDestinationFieldDeviceToHost(size_t field_index) {
        m_ngp_destination_fields[field_index]->sync_to_host();
    }

    void SyncAllDestinationFieldsDeviceToHost() {
        for (size_t i = 0; i < NumFields; i++) {
            SyncDestinationFieldDeviceToHost(i);
        }
    }

    // Parallel communication
    void CommunicateDestinationFieldData(int field_index) const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_destination_fields[field_index]});
    }

    void CommunicateAllDestinationFieldData() const {
        for (size_t i = 0; i < NumFields; i++) {
            CommunicateDestinationFieldData(i);
        }
    }


   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                         // The mesh data object.
    std::vector<std::string> m_sets;                                      // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                                     // The bulk data object.
    stk::mesh::Selector m_selector;                                       // The selector
    stk::mesh::Selector m_local_selector;                                 // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                                        // The ngp mesh object.
    DoubleField *m_num_neighbors_field;                                   // The number of neighbors field
    DoubleField *m_neighbors_field;                                       // The neighbors field
    DoubleField *m_function_values_field;                                 // The function values field
    NgpDoubleField *m_ngp_num_neighbors_field;                            // The ngp number of neighbors field
    NgpDoubleField *m_ngp_neighbors_field;                                // The ngp neighbors field
    NgpDoubleField *m_ngp_function_values_field;                          // The ngp function values field
    std::vector<DoubleField *> m_source_fields;                           // The fields to process
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_source_fields;       // The ngp fields to process
    std::vector<DoubleField *> m_destination_fields;                      // The fields to process
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_destination_fields;  // The ngp fields to process
};

}  // namespace aperi