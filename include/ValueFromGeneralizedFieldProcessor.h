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
#include "MathUtils.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

template <size_t NumFields>
class ValueFromGeneralizedFieldProcessor {
   public:
    ValueFromGeneralizedFieldProcessor(const std::array<FieldQueryData<double>, NumFields> source_field_query_data, const std::array<FieldQueryData<double>, NumFields> destination_field_query_data, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
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
            aperi::CoutP0() << "Warning: ValueFromGeneralizedFieldProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the number of neighbors field
        m_num_neighbors_field = StkGetField(FieldQueryData<Unsigned>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData<Unsigned>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_neighbors_field);

        // Get the function values field
        m_function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_function_values_field);

        // Get the source (generalized) and destination fields
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields.push_back(StkGetField(source_field_query_data[i], meta_data));
            m_ngp_source_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_source_fields.back());
            m_destination_fields.push_back(StkGetField(destination_field_query_data[i], meta_data));
            m_ngp_destination_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_destination_fields.back());
        }
    }

    bool check_partition_of_unity() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_neighbors_field = *m_ngp_num_neighbors_field;
        auto ngp_neighbors_field = *m_ngp_neighbors_field;
        auto ngp_function_values_field = *m_ngp_function_values_field;

        double warning_threshold = 1.0e-6;
        double error_threshold = 1.0e-2;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of neighbors
                size_t num_neighbors = ngp_num_neighbors_field(node_index, 0);
                KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
                // If there are no neighbors then the partition of unity is satisfied in compute_value_from_generalized_field
                if (num_neighbors == 0) {
                    return;
                }

                double function_sum = 0.0;
                // Do in reverse order, just to be like compute_value_from_generalized_field
                for (size_t k = num_neighbors; k-- > 0;) {
                    // Get the function value
                    double function_value = ngp_function_values_field(node_index, k);
                    function_sum += function_value;
                }
                if (Kokkos::abs(function_sum - 1.0) > warning_threshold) {
                    Kokkos::printf("Error: Partition of unity not satisfied. Error (1 - sum) = : %.8e\n", 1.0 - function_sum);
                    for (size_t k = num_neighbors; k-- > 0;) {
                        // Get the function value
                        double function_value = ngp_function_values_field(node_index, k);
                        Unsigned neighbor = ngp_neighbors_field(node_index, k);
                        Kokkos::printf("Neighbor: %lu, Function Value: %.8e\n", neighbor, function_value);
                    }
                    if (Kokkos::abs(function_sum - 1.0) > error_threshold) {
                        // If the error is too large, abort
                        Kokkos::abort("Partition of unity assertion failed");
                    }
                }
            });

        return true;  // Should throw with Kokkos::abort if partition of unity is not satisfied
    }

    // Compute the value of the destination fields from the source fields and function values.
    // This is the construction of the field from the shape functions and their coefficients.
    void compute_value_from_generalized_field() {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // destination_fields(i) = /sum_{j=0}^{num_neighbors} source_fields(neighbors(i, j)) * function_values(i, j)
        KOKKOS_ASSERT(check_partition_of_unity());

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
                size_t num_neighbors = ngp_num_neighbors_field(node_index, 0);
                KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
                const int num_components = 3;  // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general

                // If there are no neighbors, set the destination field to the source field
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            ngp_destination_fields[i](node_index, j) = ngp_source_fields[i](node_index, j);
                        }
                    }
                    return;
                } else {  // Zero out the destination field and prepare for the sum in the next loop
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            ngp_destination_fields[i](node_index, j) = 0.0;
                        }
                    }
                }

                // If there are neighbors, compute the destination field from the function values and source fields.
                // Do in reverse order. Adding smaller function_value terms first to help with parallel consistency
                for (size_t k = num_neighbors; k-- > 0;) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_neighbors_field(node_index, k));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);

                    // Get the function value
                    double function_value = ngp_function_values_field(node_index, k);

                    // Get the source field values
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            double source_value = ngp_source_fields[i](neighbor_index, j);
                            ngp_destination_fields[i](node_index, j) += source_value * function_value;
                        }
                    }
                }
            });
    }

    // Loop over all evaluation points and scatter the values to their neighbors (active nodes) using the function values as weights.
    void scatter_local_values(const stk::mesh::Selector &selector) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        KOKKOS_ASSERT(check_partition_of_unity());  // Only perform check in Debug builds

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
            ngp_mesh, stk::topology::NODE_RANK, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of neighbors
                size_t num_neighbors = ngp_num_neighbors_field(node_index, 0);
                KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
                const int num_components = 3;  // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general

                // If there are no neighbors, set the destination field to the source field as there is nothing to scatter
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            ngp_destination_fields[i](node_index, j) = ngp_source_fields[i](node_index, j);
                        }
                    }
                    return;
                }

                for (size_t k = 0; k < num_neighbors; ++k) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_neighbors_field(node_index, k));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);

                    // Get the function value
                    double function_value = ngp_function_values_field(node_index, k);

                    // Get the source field values
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            double source_value = ngp_source_fields[i](node_index, j);
                            Kokkos::atomic_add(&ngp_destination_fields[i](neighbor_index, j), source_value * function_value);
                        }
                    }
                }
            });
    }

    void ScatterOwnedLocalValues() {
        scatter_local_values(m_owned_selector);
    }

    void ScatterLocalValues() {
        scatter_local_values(m_selector);
    }

    // Marking modified on device
    void MarkDestinationFieldModifiedOnDevice(size_t field_index) {
        m_ngp_destination_fields[field_index]->clear_sync_state();
        m_ngp_destination_fields[field_index]->modify_on_device();
    }

    void MarkSourceFieldModifiedOnDevice(size_t field_index) {
        m_ngp_source_fields[field_index]->clear_sync_state();
        m_ngp_source_fields[field_index]->modify_on_device();
    }

    void MarkAllDestinationFieldsModifiedOnDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkDestinationFieldModifiedOnDevice(i);
        }
    }

    void MarkAllSourceFieldsModifiedOnDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkSourceFieldModifiedOnDevice(i);
        }
    }

    // Mark modified on host
    void MarkDestinationFieldModifiedOnHost(size_t field_index) {
        m_ngp_destination_fields[field_index]->modify_on_host();
    }

    void MarkSourceFieldModifiedOnHost(size_t field_index) {
        m_ngp_source_fields[field_index]->modify_on_host();
    }

    void MarkAllDestinationFieldsModifiedOnHost() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkDestinationFieldModifiedOnHost(i);
        }
    }

    void MarkAllSourceFieldsModifiedOnHost() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkSourceFieldModifiedOnHost(i);
        }
    }

    // Syncing, device to host
    void SyncDestinationFieldDeviceToHost(size_t field_index) {
        m_ngp_destination_fields[field_index]->sync_to_host();
    }

    void SyncSourceFieldDeviceToHost(size_t field_index) {
        m_ngp_source_fields[field_index]->sync_to_host();
    }

    void SyncAllDestinationFieldsDeviceToHost() {
        for (size_t i = 0; i < NumFields; i++) {
            SyncDestinationFieldDeviceToHost(i);
        }
    }

    void SyncAllSourceFieldsDeviceToHost() {
        for (size_t i = 0; i < NumFields; i++) {
            SyncSourceFieldDeviceToHost(i);
        }
    }

    // Syncing, host to device
    void SyncDestinationFieldHostToDevice(size_t field_index) {
        m_ngp_destination_fields[field_index]->sync_to_device();
    }

    void SyncSourceFieldHostToDevice(size_t field_index) {
        m_ngp_source_fields[field_index]->sync_to_device();
    }

    void SyncAllDestinationFieldsHostToDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            SyncDestinationFieldHostToDevice(i);
        }
    }

    void SyncAllSourceFieldsHostToDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            SyncSourceFieldHostToDevice(i);
        }
    }

    // Parallel communication
    void CommunicateDestinationFieldData(int field_index) const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_destination_fields[field_index]});
    }

    void CommunicateSourceFieldData(int field_index) const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_source_fields[field_index]});
    }

    void CommunicateAllDestinationFieldData() const {
        for (size_t i = 0; i < NumFields; i++) {
            CommunicateDestinationFieldData(i);
        }
    }

    void CommunicateAllSourceFieldData() const {
        for (size_t i = 0; i < NumFields; i++) {
            CommunicateSourceFieldData(i);
        }
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                         // The mesh data object.
    std::vector<std::string> m_sets;                                      // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                                     // The bulk data object.
    stk::mesh::Selector m_selector;                                       // The selector
    stk::mesh::Selector m_owned_selector;                                 // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                                        // The ngp mesh object.
    UnsignedField *m_num_neighbors_field;                                 // The number of neighbors field
    UnsignedField *m_neighbors_field;                                     // The neighbors field
    DoubleField *m_function_values_field;                                 // The function values field
    NgpUnsignedField *m_ngp_num_neighbors_field;                          // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_neighbors_field;                              // The ngp neighbors field
    NgpDoubleField *m_ngp_function_values_field;                          // The ngp function values field
    std::vector<DoubleField *> m_source_fields;                           // The fields to process
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_source_fields;       // The ngp fields to process
    std::vector<DoubleField *> m_destination_fields;                      // The fields to process
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_destination_fields;  // The ngp fields to process
};

}  // namespace aperi
