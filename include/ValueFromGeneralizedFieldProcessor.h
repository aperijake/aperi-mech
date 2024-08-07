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

namespace aperi {

template <size_t NumFields>
class ValueFromGeneralizedFieldProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

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
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the number of neighbors field
        m_num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_neighbors_field);

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
                size_t num_neighbors = ngp_num_neighbors_field(node_index, 0);

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