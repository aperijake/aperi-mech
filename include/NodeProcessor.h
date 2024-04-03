#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
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

inline stk::mesh::Field<double> *StkGetField(const FieldQueryData &field_query_data, stk::mesh::MetaData *meta_data) {
    stk::mesh::Field<double> *field = meta_data->get_field<double>(stk::topology::NODE_RANK, field_query_data.name);
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

inline stk::mesh::NgpField<double> StkGetNgpField(const FieldQueryData &field_query_data, stk::mesh::MetaData *meta_data) {
    return stk::mesh::get_updated_ngp_field<double>(*StkGetField(field_query_data, meta_data));
}

inline stk::mesh::NgpField<double> StkGetNgpField(stk::mesh::Field<double> *field) {
    return stk::mesh::get_updated_ngp_field<double>(*field);
}

class NodeProcessor {
    typedef stk::mesh::Field<double> DoubleField;

   public:
    NodeProcessor(const std::vector<FieldQueryData> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
        m_bulk_data = mesh_data->GetBulkData();
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
        for (const auto &field_query_data : field_query_data_vec) {
            m_fields.push_back(StkGetField(field_query_data, meta_data));
        }
    }

    // Loop over each node then DOF and apply the function
    void for_each_dof(const std::vector<double> &data, void (*func)(size_t iI, const std::vector<double> &data, std::vector<double *> &field_data)) const {
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Loop over each component of the node
                for (size_t i = 0; i < num_values_per_node; i++) {
                    size_t iI = i_node * num_values_per_node + i;  // Index into the field data
                    func(iI, data, field_data);                    // Call the function
                }
            }
        }
    }

    // Loop over each node and apply the function
    void for_each_node(const std::vector<double> &data, const std::vector<std::pair<size_t, double>> &components_and_values, void (*func)(size_t iI, const std::vector<double> &data, const std::vector<std::pair<size_t, double>> &component_and_value, std::vector<double *> &field_data)) const {
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                size_t i_dof_start = i_node * num_values_per_node;           // Index into the field data
                func(i_dof_start, data, components_and_values, field_data);  // Call the function
            }
        }
    }

    template <typename Func>
    void for_each_node(const Func &func, const stk::mesh::Selector &selector) const {
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                size_t i_dof_start = i_node * num_values_per_node;  // Index into the field data
                func(i_dof_start, field_data);                      // Call the function
            }
        }
    }

    template <typename Func>
    void for_each_node(const Func &func) const {
        for_each_node(func, m_selector);
    }

    template <typename Func>
    void for_each_owned_node(const Func &func) const {
        for_each_node(func, m_selector & m_bulk_data->mesh_meta_data().locally_owned_part());
    }

    // Parallel communication for a single field
    void CommunicateFieldData(int field_index) const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_fields[field_index]});
    }

    // Fill the field with a value
    void FillField(double value, size_t field_index) {
        stk::mesh::field_fill(value, *m_fields[field_index]);
    }

    // Get the sum of the field to scatter
    double GetFieldSum(int field_index) const {
        double field_sum = 0.0;
        stk::mesh::field_asum(field_sum, *m_fields[field_index], m_selector, m_bulk_data->parallel());
        return field_sum;
    }

   private:
    std::vector<DoubleField *> m_fields;  // The fields to process
    stk::mesh::BulkData *m_bulk_data;     // The bulk data object.
    stk::mesh::Selector m_selector;       // The selector for the sets
};

struct FillFieldFunctor {
    FillFieldFunctor(double value) : m_value(value) {}
    KOKKOS_INLINE_FUNCTION void operator()(double *value) const { *value = m_value; }
    double m_value;
};

struct PrintFieldFunctor {
    PrintFieldFunctor() {}
    KOKKOS_INLINE_FUNCTION void operator()(double *value) const { printf(" %f\n", *value); }
};

// A Node processor that uses the stk::mesh::NgpForEachEntity to apply a lambda function to each degree of freedom of each node
template <size_t N>
class NodeProcessorStkNgp {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    NodeProcessorStkNgp(const std::array<FieldQueryData, N> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
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
            m_ngp_fields[i] = StkGetNgpField(m_fields[i]);
        }
    }

    // Marking modified
    void MarkFieldModifiedOnDevice(size_t field_index) {
        // STK QUESTION: Should I always clear sync state before marking modified?
        m_ngp_fields[field_index].clear_sync_state();
        m_ngp_fields[field_index].modify_on_device();
    }

    void MarkFieldModifiedOnHost(size_t field_index) {
        // STK QUESTION: Should I always clear sync state before marking modified?
        m_ngp_fields[field_index].clear_sync_state();
        m_ngp_fields[field_index].modify_on_host();
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
        m_ngp_fields[field_index].sync_to_device();
    }

    void SyncFieldDeviceToHost(size_t field_index) {
        m_ngp_fields[field_index].sync_to_host();
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
        auto fields = m_ngp_fields;
        // Loop over all the nodes
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                for (size_t j = 0; j < 3; j++) {
                    func(&fields[Is](entity, j)...);
                }
            });
    }

    // Loop over each node and apply the function. Just a single field.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_dof_impl(const Func &func, size_t field_index) {
        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = m_ngp_fields[field_index];
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
    void for_dof_i(const Func &func, size_t i, size_t field_index = 0) {
        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = m_ngp_fields[field_index];
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
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                size_t i_dof_start = i_node * num_values_per_node;  // Index into the field data
                func(i_dof_start, field_data);                      // Call the function
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

    // Fill the field with a value
    void FillField(double value, size_t field_index) {
        FillFieldFunctor functor(value);
        for_each_dof_impl(functor, field_index);
    }

   private:
    Kokkos::Array<NgpDoubleField, N> m_ngp_fields;  // The fields to process
    std::vector<DoubleField *> m_fields;            // The fields to process
    stk::mesh::BulkData *m_bulk_data;               // The bulk data object.
    stk::mesh::NgpMesh m_ngp_mesh;                  // The ngp mesh object.
    stk::mesh::Selector m_selector;                 // The selector for the nodes
};

}  // namespace aperi
