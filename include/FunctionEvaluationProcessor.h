#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <memory>
#include <vector>

#include "Field.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "FunctionValueUtils.h"
#include "MeshData.h"
#include "Selector.h"
#include "Types.h"

namespace aperi {

/**
 * @brief Processes function values between source and destination fields on a mesh.
 *
 * This class provides utilities to compute and scatter values between fields using
 * function values (e.g., weights) defined on mesh nodes and their neighbors.
 *
 * @tparam NumFields Number of fields to process simultaneously.
 */
template <size_t NumFields>
class FunctionEvaluationProcessor {
   public:
    /**
     * @brief Construct a new FunctionEvaluationProcessor.
     *
     * @param source_field_query_data Array of query data for source fields.
     * @param destination_field_query_data Array of query data for destination fields.
     * @param mesh_data Shared pointer to mesh data.
     * @param sets Optional list of mesh sets to operate on.
     */
    FunctionEvaluationProcessor(
        const std::array<FieldQueryData<double>, NumFields> &source_field_query_data,
        const std::array<FieldQueryData<double>, NumFields> &destination_field_query_data,
        std::shared_ptr<aperi::MeshData> mesh_data,
        const std::vector<std::string> &sets = {})
        : m_mesh_data(mesh_data) {
        if (!m_mesh_data) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_selector = aperi::Selector(sets, mesh_data.get());
        m_owned_selector = aperi::Selector(sets, mesh_data.get(), aperi::SelectorOwnership::OWNED);
        // Initialize fields for neighbor info and function values
        m_num_neighbors_field = aperi::Field<Unsigned>(mesh_data, FieldQueryData<Unsigned>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE});
        m_neighbors_field = aperi::Field<Unsigned>(mesh_data, FieldQueryData<Unsigned>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE});
        m_function_values_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE});
        // Initialize source and destination fields
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields[i] = aperi::Field<double>(mesh_data, source_field_query_data[i]);
            m_destination_fields[i] = aperi::Field<double>(mesh_data, destination_field_query_data[i]);
        }
    }

    /**
     * @brief Compute the value of the destination fields from the source fields and function values.
     *
     * For each node, computes a weighted sum of source field values from neighboring nodes,
     * using the function values as weights, and stores the result in the destination fields.
     */
    void ComputeValues() {
        // Update all relevant fields to ensure they are ready for computation
        m_num_neighbors_field.UpdateField();
        m_neighbors_field.UpdateField();
        m_function_values_field.UpdateField();
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields[i].UpdateField();
            m_destination_fields[i].UpdateField();
        }

        // Ensure function values form a partition of unity
        KOKKOS_ASSERT(CheckPartitionOfUnity(m_mesh_data, m_selector));

        aperi::NgpMeshData ngp_mesh_data = m_mesh_data->GetUpdatedNgpMesh();

        // Loop over all nodes in the mesh
        aperi::ForEachNode(
            KOKKOS_CLASS_LAMBDA(const aperi::Index &idx) {
                size_t num_neighbors = m_num_neighbors_field(idx, 0);
                KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
                const int num_components = 3;  // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general

                // If no neighbors, copy source to destination directly
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            m_destination_fields[i](idx, j) = m_source_fields[i](idx, j);
                        }
                    }
                    return;
                } else {
                    // Otherwise, initialize destination to zero
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            m_destination_fields[i](idx, j) = 0.0;
                        }
                    }
                }

                // Accumulate weighted sum from neighbors
                for (size_t k = num_neighbors; k-- > 0;) {
                    aperi::Unsigned neighbor_local_offset = m_neighbors_field(idx, k);
                    aperi::Index neighbor_idx = ngp_mesh_data.LocalOffsetToIndex(neighbor_local_offset);
                    double function_value = m_function_values_field(idx, k);
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            double source_value = m_source_fields[i](neighbor_idx, j);
                            m_destination_fields[i](idx, j) += source_value * function_value;
                        }
                    }
                }
            },
            *m_mesh_data, m_selector);
    }

    /**
     * @brief Scatter the values to their neighbors using the function values as weights.
     *
     * For each node, distributes its source field value to its neighbors, weighted by the function values,
     * and accumulates the result in the destination fields of the neighbors.
     */
    void ScatterValues() {
        // Update all relevant fields to ensure they are ready for computation
        m_num_neighbors_field.UpdateField();
        m_neighbors_field.UpdateField();
        m_function_values_field.UpdateField();
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields[i].UpdateField();
            m_destination_fields[i].UpdateField();
        }

        // Ensure function values form a partition of unity
        KOKKOS_ASSERT(CheckPartitionOfUnity(m_mesh_data, m_selector));

        aperi::NgpMeshData ngp_mesh_data = m_mesh_data->GetUpdatedNgpMesh();

        // Loop over all nodes in the mesh
        aperi::ForEachNode(
            KOKKOS_CLASS_LAMBDA(const aperi::Index &idx) {
                size_t num_neighbors = m_num_neighbors_field(idx, 0);
                KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
                const int num_components = 3;  // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general

                // If no neighbors, copy source to destination directly
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            m_destination_fields[i](idx, j) = m_source_fields[i](idx, j);
                        }
                    }
                    return;
                }

                // Scatter weighted values to each neighbor
                for (size_t k = 0; k < num_neighbors; ++k) {
                    aperi::Unsigned neighbor_local_offset = m_neighbors_field(idx, k);
                    aperi::Index neighbor_idx = ngp_mesh_data.LocalOffsetToIndex(neighbor_local_offset);
                    double function_value = m_function_values_field(idx, k);
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            double source_value = m_source_fields[i](idx, j);
                            // Use atomic add to avoid race conditions
                            Kokkos::atomic_add(&m_destination_fields[i](neighbor_idx, j), source_value * function_value);
                        }
                    }
                }
            },
            *m_mesh_data, m_owned_selector);
    }

    /**
     * @brief Mark a specific destination field as modified on the device.
     *
     * @param field_index Index of the destination field.
     */
    void MarkDestinationFieldModifiedOnDevice(size_t field_index) {
        // Mark the specified destination field as modified on device
        m_destination_fields[field_index].MarkModifiedOnDevice();
    }

    /**
     * @brief Mark all destination fields as modified on the device.
     */
    void MarkAllDestinationFieldsModifiedOnDevice() {
        // Mark all destination fields as modified on device
        for (size_t i = 0; i < NumFields; i++) {
            MarkDestinationFieldModifiedOnDevice(i);
        }
    }

    /**
     * @brief Mark a specific source field as modified on the host.
     *
     * @param field_index Index of the source field.
     */
    void MarkSourceFieldModifiedOnHost(size_t field_index) {
        // Mark the specified source field as modified on host
        m_source_fields[field_index].MarkModifiedOnHost();
    }

    /**
     * @brief Mark all source fields as modified on the host.
     */
    void MarkAllSourceFieldsModifiedOnHost() {
        // Mark all source fields as modified on host
        for (size_t i = 0; i < NumFields; i++) {
            MarkSourceFieldModifiedOnHost(i);
        }
    }

    /**
     * @brief Synchronize a specific destination field from device to host.
     *
     * @param field_index Index of the destination field.
     */
    void SyncDestinationFieldDeviceToHost(size_t field_index) {
        // Sync the specified destination field from device to host
        m_destination_fields[field_index].SyncDeviceToHost();
    }

    /**
     * @brief Synchronize a specific source field from device to host.
     *
     * @param field_index Index of the source field.
     */
    void SyncSourceFieldDeviceToHost(size_t field_index) {
        // Sync the specified source field from device to host
        m_source_fields[field_index].SyncDeviceToHost();
    }

    /**
     * @brief Synchronize all destination fields from device to host.
     */
    void SyncAllDestinationFieldsDeviceToHost() {
        // Sync all destination fields from device to host
        for (size_t i = 0; i < NumFields; i++) {
            SyncDestinationFieldDeviceToHost(i);
        }
    }

    /**
     * @brief Synchronize all source fields from device to host.
     */
    void SyncAllSourceFieldsDeviceToHost() {
        // Sync all source fields from device to host
        for (size_t i = 0; i < NumFields; i++) {
            SyncSourceFieldDeviceToHost(i);
        }
    }

    /**
     * @brief Synchronize a specific source field from host to device.
     *
     * @param field_index Index of the source field.
     */
    void SyncSourceFieldHostToDevice(size_t field_index) {
        // Sync the specified source field from host to device
        m_source_fields[field_index].SyncHostToDevice();
    }

    /**
     * @brief Synchronize all source fields from host to device.
     */
    void SyncAllSourceFieldsHostToDevice() {
        // Sync all source fields from host to device
        for (size_t i = 0; i < NumFields; i++) {
            SyncSourceFieldHostToDevice(i);
        }
    }

    /**
     * @brief Communicate the source field data in parallel.
     *
     * @param field_index Index of the source field.
     */
    void CommunicateSourceFieldData(int field_index) {
        // Communicate the specified source field data in parallel (no pre/post sync)
        m_source_fields[field_index].Communicate(false, false);
    }

    /**
     * @brief Communicate all source field data in parallel.
     */
    void CommunicateAllSourceFieldData() {
        // Communicate all source field data in parallel
        for (size_t i = 0; i < NumFields; i++) {
            CommunicateSourceFieldData(i);
        }
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    aperi::Selector m_selector;
    aperi::Selector m_owned_selector;
    aperi::Field<Unsigned> m_num_neighbors_field;
    aperi::Field<Unsigned> m_neighbors_field;
    aperi::Field<double> m_function_values_field;
    std::array<aperi::Field<double>, NumFields> m_source_fields;
    std::array<aperi::Field<double>, NumFields> m_destination_fields;
};

}  // namespace aperi
