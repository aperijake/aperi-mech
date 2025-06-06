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
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "Selector.h"
#include "Types.h"

namespace aperi {

template <size_t NumFields>
class ValueFromGeneralizedFieldProcessor {
   public:
    ValueFromGeneralizedFieldProcessor(
        const std::array<FieldQueryData<double>, NumFields> &source_field_query_data,
        const std::array<FieldQueryData<double>, NumFields> &destination_field_query_data,
        std::shared_ptr<aperi::MeshData> mesh_data,
        const std::vector<std::string> &sets = {})
        : m_mesh_data(mesh_data) {
        if (!m_mesh_data) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_selector = aperi::Selector(sets, mesh_data.get());
        // Get fields using aperi::Field
        m_num_neighbors_field = aperi::Field<Unsigned>(mesh_data, FieldQueryData<Unsigned>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE});
        m_neighbors_field = aperi::Field<Unsigned>(mesh_data, FieldQueryData<Unsigned>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE});
        m_function_values_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE});
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields[i] = aperi::Field<double>(mesh_data, source_field_query_data[i]);
            m_destination_fields[i] = aperi::Field<double>(mesh_data, destination_field_query_data[i]);
        }
    }

    // Compute the value of the destination fields from the source fields and function values.
    void ComputeValues() {
        // Sync fields to device
        m_num_neighbors_field.UpdateField();
        m_neighbors_field.UpdateField();
        m_function_values_field.UpdateField();
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields[i].UpdateField();
            m_destination_fields[i].UpdateField();
        }

        KOKKOS_ASSERT(CheckPartitionOfUnity(m_mesh_data, m_selector));

        // Loop over nodes using ForEachNode
        aperi::ForEachNode(
            KOKKOS_CLASS_LAMBDA(const aperi::Index &idx) {
                size_t num_neighbors = m_num_neighbors_field(idx, 0);
                KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
                const int num_components = 3;  // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general

                // If there are no neighbors, set the destination field to the source field
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            m_destination_fields[i](idx, j) = m_source_fields[i](idx, j);
                        }
                    }
                    return;
                } else {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            m_destination_fields[i](idx, j) = 0.0;
                        }
                    }
                }

                aperi::NgpMeshData ngp_mesh_data = m_mesh_data->GetUpdatedNgpMesh();

                // Compute destination field from neighbors
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

    // Scatter the values to their neighbors using the function values as weights.
    void ScatterValues() {
        // Sync fields to device
        m_num_neighbors_field.UpdateField();
        m_neighbors_field.UpdateField();
        m_function_values_field.UpdateField();
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields[i].UpdateField();
            m_destination_fields[i].UpdateField();
        }

        KOKKOS_ASSERT(CheckPartitionOfUnity(m_mesh_data, m_selector));

        aperi::NgpMeshData ngp_mesh_data = m_mesh_data->GetUpdatedNgpMesh();

        aperi::ForEachNode(
            KOKKOS_CLASS_LAMBDA(const aperi::Index &idx) {
                size_t num_neighbors = m_num_neighbors_field(idx, 0);
                KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
                const int num_components = 3;  // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general

                // If there are no neighbors, set the destination field to the source field
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            m_destination_fields[i](idx, j) = m_source_fields[i](idx, j);
                        }
                    }
                    return;
                }

                for (size_t k = 0; k < num_neighbors; ++k) {
                    aperi::Unsigned neighbor_local_offset = m_neighbors_field(idx, k);
                    aperi::Index neighbor_idx = ngp_mesh_data.LocalOffsetToIndex(neighbor_local_offset);
                    double function_value = m_function_values_field(idx, k);
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            double source_value = m_source_fields[i](idx, j);
                            Kokkos::atomic_add(&m_destination_fields[i](neighbor_idx, j), source_value * function_value);
                        }
                    }
                }
            },
            *m_mesh_data, m_selector);
    }

    // Marking modified on device
    void MarkDestinationFieldModifiedOnDevice(size_t field_index) {
        m_destination_fields[field_index].MarkModifiedOnDevice();
    }

    void MarkAllDestinationFieldsModifiedOnDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkDestinationFieldModifiedOnDevice(i);
        }
    }

    // Mark modified on host
    void MarkSourceFieldModifiedOnHost(size_t field_index) {
        m_source_fields[field_index].MarkModifiedOnHost();
    }

    void MarkAllSourceFieldsModifiedOnHost() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkSourceFieldModifiedOnHost(i);
        }
    }

    // Syncing, device to host
    void SyncDestinationFieldDeviceToHost(size_t field_index) {
        m_destination_fields[field_index].SyncDeviceToHost();
    }

    void SyncSourceFieldDeviceToHost(size_t field_index) {
        m_source_fields[field_index].SyncDeviceToHost();
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
    void SyncSourceFieldHostToDevice(size_t field_index) {
        m_source_fields[field_index].SyncHostToDevice();
    }

    void SyncAllSourceFieldsHostToDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            SyncSourceFieldHostToDevice(i);
        }
    }

    // Parallel communication
    void CommunicateSourceFieldData(int field_index) {
        // Communicate the source field data, no pre-sync or post-sync from device to host / host to device
        m_source_fields[field_index].Communicate(false, false);
    }

    void CommunicateAllSourceFieldData() {
        for (size_t i = 0; i < NumFields; i++) {
            CommunicateSourceFieldData(i);
        }
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    aperi::Selector m_selector;
    aperi::Field<Unsigned> m_num_neighbors_field;
    aperi::Field<Unsigned> m_neighbors_field;
    aperi::Field<double> m_function_values_field;
    std::array<aperi::Field<double>, NumFields> m_source_fields;
    std::array<aperi::Field<double>, NumFields> m_destination_fields;
};

}  // namespace aperi
