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

// Functor to fill a field with a value
template <typename T>
struct FillFieldFunctor {
    FillFieldFunctor(T value) : m_value(value) {}
    KOKKOS_INLINE_FUNCTION void operator()(T *value) const { *value = m_value; }
    T m_value;
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
template <stk::topology::rank_t Rank, bool ActiveFieldsOnly, size_t N, typename T = double>
class EntityProcessor {
   public:
    EntityProcessor(const std::array<FieldQueryData<T>, N> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }

        // Set the mesh data
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Set the selectors
        SetSelectors(sets);

        // Get the fields
        for (size_t i = 0; i < N; ++i) {
            m_fields.push_back(StkGetField(field_query_data_vec[i], meta_data));
            m_ngp_fields[i] = &stk::mesh::get_updated_ngp_field<T>(*m_fields.back());
        }
    }

    void SetSelectors(const std::vector<std::string> &sets) {
        if (ActiveFieldsOnly) {
            std::vector<std::string> active_sets;
            // If sets are named the same with _active at the end, use those.
            for (const auto &set : sets) {
                active_sets.push_back(set + "_active");
            }
            // If sets are not named, get the universal active part.
            if (active_sets.size() == 0) {
                active_sets.push_back("universal_active_part");
            }
            m_selector = StkGetSelector(active_sets, &m_bulk_data->mesh_meta_data());
        } else {
            m_selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
        }

        // Warn if the selector is empty.
        if (m_selector.is_empty(Rank)) {
            aperi::CoutP0() << "Warning: EntityProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & m_bulk_data->mesh_meta_data().locally_owned_part();
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
        std::vector<const stk::mesh::FieldBase *> fields = {m_fields[field_index]};
        stk::mesh::parallel_sum_including_ghosts(*m_bulk_data, fields);
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
        Kokkos::Array<stk::mesh::NgpField<T>, N> fields;
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
        Kokkos::Array<stk::mesh::NgpField<T>, N> fields;
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
                T *field_ptr = &field(entity, i);
                KOKKOS_ASSERT(field_ptr != nullptr);
                func(field_ptr);
            });
    }

    // Loop over each entity and apply the function. Using host data.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_entity_host(const Func &func, const stk::mesh::Selector &selector) const {
        std::array<T *, N> field_data = {};         // Array to hold field data
        std::array<size_t, N> num_components = {};  // Array to hold number of components for each field

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : selector.get_buckets(Rank)) {
            // Get the number of components for each field
            for (size_t i = 0; i < N; i++) {
                num_components[i] = stk::mesh::field_scalars_per_entity(*m_fields[i], *bucket);
            }

            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }

            // Loop over each entity in the bucket
            for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
                std::array<size_t, N> i_component_start = {};  // Array to hold start index for each field
                for (size_t i = 0; i < N; i++) {
                    i_component_start[i] = i_entity * num_components[i];  // Index into the field data
                }
                func(i_component_start, num_components, field_data);  // Call the function
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

    // Randomize the field
    void RandomizeField(size_t field_index, size_t seed = 0) {
        srand(seed);
        for_each_component_impl([](double *value) { *value = (double)rand() / RAND_MAX; }, field_index, m_selector);
    }

    // Calculate the norm of the field
    double CalculateFieldNorm(size_t field_index) {
        // Kokkos view for the field sum
        Kokkos::View<double *, Kokkos::DefaultExecutionSpace> field_sum("field_sum", 1);
        field_sum(0) = 0.0;

        // Get the field
        auto field = *m_ngp_fields[field_index];

        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                // Get the number of components
                const size_t num_components = field.get_num_components_per_entity(entity);
                // Sum the squares of the components
                double value_squared = 0.0;
                for (size_t i = 0; i < num_components; i++) {
                    double value = field(entity, i);
                    value_squared += value * value;
                }
                // Atomic add the value squared to the field sum
                Kokkos::atomic_add(&field_sum[0], value_squared);
            });

        // Host view for the field sum
        Kokkos::View<double *, Kokkos::HostSpace> field_sum_host("field_sum_host", 1);
        Kokkos::deep_copy(field_sum_host, field_sum);

        // Parallel sum the field sum
        double field_sum_value = field_sum_host(0);
        double field_sum_value_global = 0.0;
        stk::all_reduce_sum(m_bulk_data->parallel(), &field_sum_value, &field_sum_value_global, 1);

        // Do the square root of the sum
        double field_norm = std::sqrt(field_sum_value_global);

        return field_norm;
    }

    // Normalize the field
    double NormalizeField(size_t field_index) {
        // Calculate the field norm
        double field_norm = CalculateFieldNorm(field_index);

        // Get the field
        auto field = *m_ngp_fields[field_index];

        // Normalize the field
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                // Get the number of components
                const size_t num_components = field.get_num_components_per_entity(entity);
                // Normalize the components
                for (size_t i = 0; i < num_components; i++) {
                    field(entity, i) /= field_norm;
                }
            });

        return field_norm;
    }

    // Compute the dot product of two fields
    double ComputeDotProduct(size_t field_index_0, size_t field_index_1) {
        // Kokkos array for the dot product
        Kokkos::View<double *, Kokkos::DefaultExecutionSpace> dot_product("dot_product", 1);
        dot_product(0) = 0.0;

        // Get the fields
        auto field_0 = *m_ngp_fields[field_index_0];
        auto field_1 = *m_ngp_fields[field_index_1];

        // Compute the dot product
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                // Get the number of components
                const size_t num_components = field_0.get_num_components_per_entity(entity);
                // Compute the dot product
                double local_dot_product = 0.0;
                for (size_t i = 0; i < num_components; i++) {
                    local_dot_product += field_0(entity, i) * field_1(entity, i);
                }
                // Atomic add the local dot product to the dot product
                Kokkos::atomic_add(&dot_product[0], local_dot_product);
            });

        // Host view for the dot product
        Kokkos::View<double *, Kokkos::HostSpace> dot_product_host("dot_product_host", 1);
        Kokkos::deep_copy(dot_product_host, dot_product);

        // Parallel sum the dot product
        double dot_product_value = dot_product_host(0);
        double dot_product_value_global = 0.0;
        stk::all_reduce_sum(m_bulk_data->parallel(), &dot_product_value, &dot_product_value_global, 1);

        return dot_product_value_global;
    }

   private:
    Kokkos::Array<stk::mesh::NgpField<T> *, N> m_ngp_fields;  // The ngp fields to process
    std::vector<stk::mesh::Field<T> *> m_fields;              // The fields to process
    stk::mesh::BulkData *m_bulk_data;                         // The bulk data object.
    stk::mesh::NgpMesh m_ngp_mesh;                            // The ngp mesh object.
    stk::mesh::Selector m_selector;                           // The selector for the entities
    stk::mesh::Selector m_owned_selector;                     // The selector for the owned entities
};

// Node processor
template <size_t N, typename T = double>
using NodeProcessor = EntityProcessor<stk::topology::NODE_RANK, false, N, T>;

// Active ode processor
template <size_t N, typename T = double>
using ActiveNodeProcessor = EntityProcessor<stk::topology::NODE_RANK, true, N, T>;

// Element processor
template <size_t N, typename T = double>
using ElementProcessor = EntityProcessor<stk::topology::ELEMENT_RANK, false, N, T>;

// Change the aperi::FieldDataTopologyRank to stk::topology::rank_t and use the appropriate EntityProcessor
template <aperi::FieldDataTopologyRank Rank, size_t N, typename T = double>
using AperiEntityProcessor = std::conditional_t<Rank == aperi::FieldDataTopologyRank::NODE, NodeProcessor<N, T>, ElementProcessor<N, T>>;

}  // namespace aperi
