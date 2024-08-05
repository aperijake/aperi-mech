#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/FieldParallel.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

struct FillFieldFunctor {
    FillFieldFunctor(double value) : m_value(value) {}
    KOKKOS_INLINE_FUNCTION void operator()(double *value) const { *value = m_value; }
    double m_value;
};

struct CopyFieldFunctor {
    CopyFieldFunctor() {}
    KOKKOS_INLINE_FUNCTION void operator()(const double *src, double *dest) const { *dest = *src; }
};

struct PrintFieldFunctor {
    PrintFieldFunctor() {}
    KOKKOS_INLINE_FUNCTION void operator()(const double *value) const { printf(" %f\n", *value); }
};

// A Entity processor that uses the stk::mesh::NgpForEachEntity to apply a lambda function to each component of each entity
template <stk::topology::rank_t Rank, size_t N>
class EntityProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    EntityProcessor(const std::array<FieldQueryData, N> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        m_selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
        // Warn if the selector is empty.
        if (m_selector.is_empty(Rank)) {
            aperi::CoutP0() << "Warning: EntityProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & m_bulk_data->mesh_meta_data().locally_owned_part();

        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        for (size_t i = 0; i < N; ++i) {
            m_fields.push_back(StkGetField<double>(field_query_data_vec[i], meta_data));
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

    // Parallel sum including ghosted values
    void ParallelSumFieldData(int field_index) const {
        stk::mesh::parallel_sum_including_ghosts(*m_bulk_data, {m_fields[field_index]});
    }

    void ParallelSumAllFieldData() const {
        for (size_t i = 0; i < N; i++) {
            ParallelSumFieldData(i);
        }
    }

    // Get the sum of a field
    double GetFieldSumHost(size_t field_index) const {
        double field_sum = 0.0;
        stk::mesh::field_asum(field_sum, *m_fields[field_index], m_owned_selector, m_bulk_data->parallel());
        return field_sum;
    }

    // Loop over each entity and apply the function
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_each_component_impl(const Func &func, std::index_sequence<Is...>, const stk::mesh::Selector &selector) {
        // Create an array of ngp fields
        Kokkos::Array<NgpDoubleField, N> fields;
        for (size_t i = 0; i < N; ++i) {
            fields[i] = *m_ngp_fields[i];
        }
        // Loop over all the entities
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                const size_t num_components = fields[0].get_num_components_per_entity(entity);
                // assert each other field has same number of components
                for (size_t i = 1; i < N; i++) {
                    assert(fields[i].get_num_components_per_entity(entity) == num_components);
                }
                for (size_t j = 0; j < num_components; j++) {
                    func(&fields[Is](entity, j)...);
                }
            });
    }

    // Loop over each entity and apply the function to component i
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_component_i_impl(const Func &func, size_t i, std::index_sequence<Is...>, const stk::mesh::Selector &selector) {
        // Create an array of ngp fields
        Kokkos::Array<NgpDoubleField, N> fields;
        for (size_t i = 0; i < N; ++i) {
            fields[i] = *m_ngp_fields[i];
        }
        // Loop over all the entities
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                func(&fields[Is](entity, i)...);
            });
    }

    // Loop over each entity and apply the function. Just a single field.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_component_impl(const Func &func, size_t field_index, const stk::mesh::Selector &selector) {
        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = *m_ngp_fields[field_index];

        // Loop over all the entities
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                const size_t num_components = field.get_num_components_per_entity(entity);
                for (size_t i = 0; i < num_components; i++) {
                    double *field_ptr = &field(entity, i);
                    KOKKOS_ASSERT(field_ptr != nullptr);
                    func(field_ptr);
                }
            });
    }

    // Loop over each entity and apply the function. Two fields.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_component_impl(const Func &func, size_t field_index_0, size_t field_index_1, const stk::mesh::Selector &selector) {
        assert(field_index_0 < m_ngp_fields.size() && "field_index_0 out of bounds");
        assert(field_index_1 < m_ngp_fields.size() && "field_index_1 out of bounds");
        auto field_0 = *m_ngp_fields[field_index_0];
        auto field_1 = *m_ngp_fields[field_index_1];

        // Loop over all the entities
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                const size_t num_components = field_0.get_num_components_per_entity(entity);
                KOKKOS_ASSERT(field_1.get_num_components_per_entity(entity) == num_components);
                for (size_t i = 0; i < num_components; i++) {
                    double *field_0_ptr = &field_0(entity, i);
                    double *field_1_ptr = &field_1(entity, i);
                    KOKKOS_ASSERT(field_0_ptr != nullptr);
                    KOKKOS_ASSERT(field_1_ptr != nullptr);
                    func(field_0_ptr, field_1_ptr);
                }
            });
    }

    // Loop over each entity and apply the function to component i. Just a single field.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_component_i(const Func &func, size_t i, size_t field_index, const stk::mesh::Selector &selector) {
        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = *m_ngp_fields[field_index];
        // Loop over all the entities
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                double *field_ptr = &field(entity, i);
                KOKKOS_ASSERT(field_ptr != nullptr);
                func(field_ptr);
            });
    }

    // Loop over each entity and apply the function. Using host data.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_entity_host(const Func &func, const stk::mesh::Selector &selector) const {
        std::array<double *, N> field_data = {};  // Array to hold field data
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : selector.get_buckets(Rank)) {
            const size_t num_components = stk::mesh::field_scalars_per_entity(*m_fields[0], *bucket);
            // assert each other field has same number of components
            for (size_t i = 1; i < N; i++) {
                assert(stk::mesh::field_scalars_per_entity(*m_fields[i], *bucket) == num_components);
            }
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each entity in the bucket
            for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
                size_t i_component_start = i_entity * num_components;  // Index into the field data
                func(i_component_start, num_components, field_data);   // Call the function
            }
        }
    }

    // Debug printing. Only should do for small meshes.
    void debug_print_field_with_id_host(size_t field_index) const {
        double *field_data;
        // Loop over all the buckets
        std::string output = "";
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(Rank)) {
            const size_t num_components = stk::mesh::field_scalars_per_entity(*m_fields[field_index], *bucket);
            // Get the field data for the bucket
            field_data = stk::mesh::field_data(*m_fields[field_index], *bucket);
            // Loop over each entity in the bucket
            for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
                size_t i_component_start = i_entity * num_components;  // Index into the field data
                output += "\nEntity ID: " + std::to_string(m_bulk_data->identifier(bucket->operator[](i_entity))) + ", Field Data: ";
                for (size_t i = 0; i < num_components; i++) {
                    std::ostringstream oss;
                    oss << std::scientific << std::setprecision(10) << field_data[i_component_start + i];
                    output += oss.str() + " ";
                }
            }
        }
        aperi::Cout() << output << std::endl;
    }

    template <typename Func>
    void for_each_owned_entity_host(const Func &func) const {
        for_each_entity_host(func, m_owned_selector);
    }

    // Loop over each entity and apply the function to component i. Using host data.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_component_i_host_impl(const Func &func, size_t i, std::index_sequence<Is...>, const stk::mesh::Selector &selector) const {
        std::array<double *, N> field_data;  // Array to hold field data
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : selector.get_buckets(Rank)) {
            const size_t num_components = stk::mesh::field_scalars_per_entity(*m_fields[0], *bucket);
            assert(i < num_components && "i out of bounds");
            // assert each other field has same number of components
            for (size_t j = 1; j < N; i++) {
                assert(stk::mesh::field_scalars_per_entity(*m_fields[j], *bucket) == num_components);
            }
            // Get the field data for the bucket
            for (size_t j = 0, e = N; j < e; ++j) {
                field_data[j] = stk::mesh::field_data(*m_fields[j], *bucket);
            }
            // Loop over each entity in the bucket
            for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
                size_t i_component_start = i_entity * num_components;  // Index into the field data
                func(&field_data[Is][i_component_start + i]...);
            }
        }
    }

    template <typename Func>
    void for_each_entity_host(const Func &func) const {
        for_each_entity_host(func, m_selector);
    }

    // Just print the value of component i
    void print_component_i(size_t i, size_t field_index = 0) {
        auto print_functor = PrintFieldFunctor();
        for_component_i(print_functor, i, field_index);
    }

    // Just print the value of component i on the host
    void print_component_i_host(size_t i, size_t field_index = 0) const {
        double *field_data;
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(Rank)) {
            const size_t num_components = stk::mesh::field_scalars_per_entity(*m_fields[field_index], *bucket);
            assert(i < num_components && "i out of bounds");
            // Get the field data for the bucket
            field_data = stk::mesh::field_data(*m_fields[field_index], *bucket);
            // Loop over each entity in the bucket
            for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
                size_t i_component_start = i_entity * num_components;  // Index into the field data
                printf(" %f\n", field_data[i_component_start + i]);
            }
        }
    }

    template <typename Func>
    void for_each_component(const Func &func) {
        for_each_component_impl(func, std::make_index_sequence<N>{}, m_selector);
    }

    template <typename Func>
    void for_each_component_owned(const Func &func) {
        for_each_component_impl(func, std::make_index_sequence<N>{}, m_owned_selector);
    }

    template <typename Func>
    void for_component_i(const Func &func, size_t i) {
        for_component_i_impl(func, i, std::make_index_sequence<N>{}, m_selector);
    }

    template <typename Func>
    void for_component_i(const Func &func, size_t i, size_t field_index) {
        for_component_i(func, i, field_index, m_selector);
    }

    template <typename Func>
    void for_component_i_owned(const Func &func, size_t i) {
        for_component_i_impl(func, i, std::make_index_sequence<N>{}, m_owned_selector);
    }

    template <typename Func>
    void for_component_i_host(const Func &func, size_t i) {
        for_component_i_host_impl(func, i, std::make_index_sequence<N>{}, m_selector);
    }

    template <typename Func>
    void for_component_i_owned_host(const Func &func, size_t i) {
        for_component_i_host_impl(func, i, std::make_index_sequence<N>{}, m_owned_selector);
    }

    // Fill the field with a value
    void FillField(double value, size_t field_index) {
        FillFieldFunctor functor(value);
        for_each_component_impl(functor, field_index, m_selector);
    }

    // Copy the field to another field
    void CopyFieldData(size_t src_field_index, size_t dest_field_index) {
        CopyFieldFunctor functor;
        for_each_component_impl(functor, src_field_index, dest_field_index, m_selector);
    }

   private:
    Kokkos::Array<NgpDoubleField *, N> m_ngp_fields;  // The ngp fields to process
    std::vector<DoubleField *> m_fields;              // The fields to process
    stk::mesh::BulkData *m_bulk_data;                 // The bulk data object.
    stk::mesh::NgpMesh m_ngp_mesh;                    // The ngp mesh object.
    stk::mesh::Selector m_selector;                   // The selector for the entities
    stk::mesh::Selector m_owned_selector;             // The selector for the owned entities
};

// Node processor
template <size_t N>
using NodeProcessor = EntityProcessor<stk::topology::NODE_RANK, N>;

// Element processor
template <size_t N>
using ElementProcessor = EntityProcessor<stk::topology::ELEMENT_RANK, N>;

// Change the aperi::FieldDataTopologyRank to stk::topology::rank_t and use the appropriate EntityProcessor
template <aperi::FieldDataTopologyRank Rank, size_t N>
using AperiEntityProcessor = std::conditional_t<Rank == aperi::FieldDataTopologyRank::NODE, NodeProcessor<N>, ElementProcessor<N>>;

}  // namespace aperi
