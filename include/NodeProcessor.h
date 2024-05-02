#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <vector>

#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

inline stk::mesh::Field<double> *StkGetField(const FieldQueryData &field_query_data, stk::mesh::MetaData *meta_data, stk::topology::rank_t rank = stk::topology::NODE_RANK) {
    stk::mesh::Field<double> *field = meta_data->get_field<double>(rank, field_query_data.name);
    if (field == nullptr) {
        throw std::runtime_error("Field " + field_query_data.name + " not found.");
    }
    stk::mesh::FieldState state = stk::mesh::StateNone;
    if (field_query_data.state == FieldQueryState::N) {
        state = stk::mesh::StateN;
    } else if (field_query_data.state == FieldQueryState::NP1) {
        state = stk::mesh::StateNP1;
    } else {
        if (field_query_data.state != FieldQueryState::None) {
            throw std::runtime_error("Invalid field state");
        }
    }
    return &field->field_of_state(state);
}

struct FillFieldFunctor {
    FillFieldFunctor(double value) : m_value(value) {}
    KOKKOS_INLINE_FUNCTION void operator()(double *value) const { *value = m_value; }
    double m_value;
};

struct PrintFieldFunctor {
    PrintFieldFunctor() {}
    KOKKOS_INLINE_FUNCTION void operator()(const double *value) const { printf(" %f\n", *value); }
};

// A Node processor that uses the stk::mesh::NgpForEachEntity to apply a lambda function to each degree of freedom of each node
template <size_t N>
class NodeProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    NodeProcessor(const std::array<FieldQueryData, N> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        if (sets.size() > 0) {
            stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
            stk::mesh::PartVector parts;
            for (const auto &set : sets) {
                stk::mesh::Part *part = meta_data->get_part(set);
                if (part == nullptr) {
                    throw std::runtime_error("Set " + set + " not found.");
                }
                parts.push_back(part);
            }
            m_selector = stk::mesh::selectUnion(parts);
        } else {
            m_selector = stk::mesh::Selector(m_bulk_data->mesh_meta_data().universal_part());
        }
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::NODE_RANK)) {
            aperi::CoutP0() << "Warning: NodeProcessor selector is empty." << std::endl;
        }

        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        for (size_t i = 0; i < N; ++i) {
            m_fields.push_back(StkGetField(field_query_data_vec[i], meta_data));
            m_ngp_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_fields.back());
        }
    }

    // Marking modified
    void MarkFieldModifiedOnDevice(size_t field_index) {
        // STK QUESTION: Should I always clear sync state before marking modified?
        m_ngp_fields[field_index]->clear_sync_state();
        m_ngp_fields[field_index]->modify_on_device();
    }

    void MarkFieldModifiedOnHost(size_t field_index) {
        // STK QUESTION: Should I always clear sync state before marking modified?
        m_ngp_fields[field_index]->clear_sync_state();
        m_ngp_fields[field_index]->modify_on_host();
    }

    void MarkAllFieldsModifiedOnDevice() {
        for (size_t i = 0; i < N; i++) {
            MarkFieldModifiedOnDevice(i);
        }
    }

    void MarkAllFieldsModifiedOnHost() {
        for (size_t i = 0; i < N; i++) {
            MarkFieldModifiedOnHost(i);
        }
    }

    // Syncing
    void SyncFieldHostToDevice(size_t field_index) {
        m_ngp_fields[field_index]->sync_to_device();
    }

    void SyncFieldDeviceToHost(size_t field_index) {
        m_ngp_fields[field_index]->sync_to_host();
    }

    void SyncAllFieldsHostToDevice() {
        for (size_t i = 0; i < N; i++) {
            SyncFieldHostToDevice(i);
        }
    }

    void SyncAllFieldsDeviceToHost() {
        for (size_t i = 0; i < N; i++) {
            SyncFieldDeviceToHost(i);
        }
    }

    // Parallel communication
    void CommunicateFieldData(int field_index) const {
        // STK Question: Is this how I should do this? Keep separate fields and ngp fields?
        stk::mesh::communicate_field_data(*m_bulk_data, {m_fields[field_index]});
    }

    void CommunicateAllFieldData() const {
        for (size_t i = 0; i < N; i++) {
            CommunicateFieldData(i);
        }
    }

    // Loop over each node and apply the function
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_each_dof_impl(const Func &func, std::index_sequence<Is...>) {
        // Create an array of ngp fields
        Kokkos::Array<NgpDoubleField, N> fields;
        for (size_t i = 0; i < N; ++i) {
            fields[i] = *m_ngp_fields[i];
        }
        // Loop over all the nodes
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                for (size_t j = 0; j < 3; j++) {
                    func(&fields[Is](entity, j)...);
                }
            });
    }

    // Loop over each node and apply the function to dof i
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_dof_i_impl(const Func &func, size_t i, std::index_sequence<Is...>) {
        // Create an array of ngp fields
        Kokkos::Array<NgpDoubleField, N> fields;
        for (size_t i = 0; i < N; ++i) {
            fields[i] = *m_ngp_fields[i];
        }
        // Loop over all the nodes
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                func(&fields[Is](entity, i)...);
            });
    }

    // Loop over each node and apply the function. Just a single field.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_dof_impl(const Func &func, size_t field_index) {
        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = *m_ngp_fields[field_index];

        // Loop over all the nodes
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                for (size_t i = 0; i < 3; i++) {
                    double *field_ptr = &field(entity, i);
                    KOKKOS_ASSERT(field_ptr != nullptr);
                    func(field_ptr);
                }
            });
    }

    // Loop over each node and apply the function to dof i. Just a single field.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_dof_i(const Func &func, size_t i, size_t field_index) {
        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = *m_ngp_fields[field_index];
        // Loop over all the nodes
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                double *field_ptr = &field(entity, i);
                KOKKOS_ASSERT(field_ptr != nullptr);
                func(field_ptr);
            });
    }

    // Loop over each node and apply the function. Using host data.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_node_host(const Func &func, const stk::mesh::Selector &selector) const {
        std::array<double *, N> field_data = {};  // Array to hold field data
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                size_t i_dof_start = i_node * 3;  // Index into the field data, 3 is number of values per node
                func(i_dof_start, field_data);    // Call the function
            }
        }
    }

    template <typename Func>
    void for_each_owned_node_host(const Func &func) const {
        for_each_node_host(func, m_selector & m_bulk_data->mesh_meta_data().locally_owned_part());
    }

    // Loop over each node and apply the function to dof i. Using host data.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_dof_i_host_impl(const Func &func, size_t i, std::index_sequence<Is...>) {
        assert(i < 3 && "i out of bounds");
        std::array<double *, N> field_data;  // Array to hold field data
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t j = 0, e = N; j < e; ++j) {
                field_data[j] = stk::mesh::field_data(*m_fields[j], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                size_t i_dof_start = i_node * 3;  // Index into the field data, 3 is number of values per node
                func(&field_data[Is][i_dof_start + i]...);
            }
        }
    }

    template <typename Func>
    void for_each_node_host(const Func &func) const {
        for_each_node_host(func, m_selector);
    }

    // Just print the value of dof i
    void print_dof_i(size_t i, size_t field_index = 0) {
        auto print_functor = PrintFieldFunctor();
        for_dof_i(print_functor, i, field_index);
    }

    // Just print the value of dof i on the host
    void print_dof_i_host(size_t i, size_t field_index = 0) const {
        double *field_data;
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            field_data = stk::mesh::field_data(*m_fields[field_index], *bucket);
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                size_t i_dof_start = i_node * 3;  // Index into the field data
                printf(" %f\n", field_data[i_dof_start + i]);
            }
        }
    }

    template <typename Func>
    void for_each_dof(const Func &func) {
        for_each_dof_impl(func, std::make_index_sequence<N>{});
    }

    template <typename Func>
    void for_dof_i(const Func &func, size_t i) {
        for_dof_i_impl(func, i, std::make_index_sequence<N>{});
    }

    template <typename Func>
    void for_dof_i_host(const Func &func, size_t i) {
        for_dof_i_host_impl(func, i, std::make_index_sequence<N>{});
    }

    // Fill the field with a value
    void FillField(double value, size_t field_index) {
        FillFieldFunctor functor(value);
        for_each_dof_impl(functor, field_index);
    }

   private:
    Kokkos::Array<NgpDoubleField *, N> m_ngp_fields;  // The ngp fields to process
    std::vector<DoubleField *> m_fields;              // The fields to process
    stk::mesh::BulkData *m_bulk_data;                 // The bulk data object.
    stk::mesh::NgpMesh m_ngp_mesh;                    // The ngp mesh object.
    stk::mesh::Selector m_selector;                   // The selector for the nodes
};

}  // namespace aperi
