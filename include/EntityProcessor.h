#pragma once

#include <Kokkos_Core.hpp>
#include <Kokkos_Random.hpp>
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
#include <stk_mesh/base/NgpReductions.hpp>
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

// Functor to copy a field
template <typename T>
struct CopyFieldFunctor {
    CopyFieldFunctor() {}
    KOKKOS_INLINE_FUNCTION void operator()(const T *src, T *dest) const { *dest = *src; }
};

// Functor to print a field
template <typename T>
struct PrintFieldFunctor {
    PrintFieldFunctor() {}
    KOKKOS_INLINE_FUNCTION void operator()(const T *value) const { printf(" %f\n", static_cast<double>(*value)); }
};

// Functor for randomizing the field
template <typename T>
struct RandomizeFunctor {
    T min;
    T max;
    Kokkos::Random_XorShift64_Pool<Kokkos::DefaultExecutionSpace> rand_pool;

    RandomizeFunctor(T min_val, T max_val, Kokkos::Random_XorShift64_Pool<Kokkos::DefaultExecutionSpace> rand_pool_)
        : min(min_val), max(max_val), rand_pool(rand_pool_) {}

    KOKKOS_INLINE_FUNCTION void operator()(T *value) const {
        auto rand_gen = rand_pool.get_state();
        T random_value = static_cast<T>(rand_gen.drand());
        *value = min + random_value * (max - min);
        rand_pool.free_state(rand_gen);
    }
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
    T GetFieldSumHost(size_t field_index) const {
        T field_sum = 0.0;
        stk::mesh::field_asum(field_sum, *m_fields[field_index], m_owned_selector, m_bulk_data->parallel());
        return field_sum;
    }

    // Loop over each entity and apply the function
    // Does not mark anything modified. Need to do that separately
    template <typename Func, size_t NumFields, std::size_t... Is>
    void for_each_component_impl(const Func &func, std::array<size_t, NumFields> field_indices, std::index_sequence<Is...>, const stk::mesh::Selector &selector) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Create an array of ngp fields
        Kokkos::Array<stk::mesh::NgpField<T>, NumFields> fields;
        for (size_t i = 0; i < NumFields; ++i) {
            assert(field_indices[i] < N && "field_index out of bounds");
            fields[i] = *m_ngp_fields[field_indices[i]];
        }

        // Loop over all the entities
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                const size_t num_components = fields[0].get_num_components_per_entity(entity);
                // assert each other field has same number of components
                for (size_t i = 1; i < NumFields; i++) {
                    KOKKOS_ASSERT(fields[i].get_num_components_per_entity(entity) == num_components);
                }
                for (size_t j = 0; j < num_components; j++) {
                    func(&fields[Is](entity, j)...);
                }
            });
    }

    // Wrapper for above function
    template <typename Func, size_t NumFields>
    void for_each_component_impl(const Func &func, std::array<size_t, NumFields> field_indices, const stk::mesh::Selector &selector) {
        for_each_component_impl(func, field_indices, std::make_index_sequence<NumFields>{}, selector);
    }

    // Loop over each entity and apply the function
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_each_component_impl(const Func &func, std::index_sequence<Is...>, const stk::mesh::Selector &selector) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

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
                    KOKKOS_ASSERT(fields[i].get_num_components_per_entity(entity) == num_components);
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
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
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
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = *m_ngp_fields[field_index];

        // Loop over all the entities
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                const size_t num_components = field.get_num_components_per_entity(entity);
                for (size_t i = 0; i < num_components; i++) {
                    T *field_ptr = &field(entity, i);
                    KOKKOS_ASSERT(field_ptr != nullptr);
                    func(field_ptr);
                }
            });
    }

    // Loop over each entity and apply the function. Two fields.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func>
    void for_each_component_impl(const Func &func, size_t field_index_0, size_t field_index_1, const stk::mesh::Selector &selector) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

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
                    T *field_0_ptr = &field_0(entity, i);
                    T *field_1_ptr = &field_1(entity, i);
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
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

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
    void debug_print_field_with_id_host_impl(size_t field_index, const stk::mesh::Selector &selector) const {
        T *field_data;
        // Loop over all the buckets
        std::string output = "";
        for (stk::mesh::Bucket *bucket : selector.get_buckets(Rank)) {
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

    // Debug printing. Only should do for small meshes.
    void debug_print_field_with_id_host(size_t field_index) const {
        debug_print_field_with_id_host_impl(field_index, m_selector);
    }

    // Debug printing. Only should do for small meshes. Owned entities only.
    void debug_print_field_with_id_owned_host(size_t field_index) const {
        debug_print_field_with_id_host_impl(field_index, m_owned_selector);
    }

    template <typename Func>
    void for_each_owned_entity_host(const Func &func) const {
        for_each_entity_host(func, m_owned_selector);
    }

    // Loop over each entity and apply the function to component i. Using host data.
    // Does not mark anything modified. Need to do that separately.
    template <typename Func, std::size_t... Is>
    void for_component_i_host_impl(const Func &func, size_t i, std::index_sequence<Is...>, const stk::mesh::Selector &selector) const {
        std::array<T *, N> field_data;  // Array to hold field data
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
        auto print_functor = PrintFieldFunctor<T>();
        for_component_i(print_functor, i, field_index);
    }

    // Just print the value of component i owned
    void print_component_i_owned(size_t i, size_t field_index = 0) {
        auto print_functor = PrintFieldFunctor<T>();
        for_component_i(print_functor, i, field_index, m_owned_selector);
    }

    // Just print the value of component i on the host
    void print_component_i_host(size_t i, size_t field_index = 0) const {
        T *field_data;
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
    void FillField(T value, size_t field_index) {
        FillFieldFunctor functor(value);
        for_each_component_impl(functor, field_index, m_selector);
    }

    // Copy the field to another field
    void CopyFieldData(size_t src_field_index, size_t dest_field_index) {
        CopyFieldFunctor<T> functor;
        std::array<size_t, 2> field_indices = {src_field_index, dest_field_index};
        for_each_component_impl(functor, field_indices, std::make_index_sequence<2>{}, m_selector);
        // for_each_component_impl(functor, src_field_index, dest_field_index, m_selector);
    }

    // Randomize the field
    void RandomizeField(size_t field_index, const T &min = 0.0, const T &max = 1.0, size_t seed = 0) {
        Kokkos::Random_XorShift64_Pool<Kokkos::DefaultExecutionSpace> rand_pool(seed);
        RandomizeFunctor<T> randomize_functor(min, max, rand_pool);
        for_each_component_impl(randomize_functor, field_index, m_selector);
    }

    // Consistently randomize the field. This will give the same result regardless of the number of processors.
    void ConsistentlyRandomizeField(size_t field_index, const T &min = 0.0, const T &max = 1.0, size_t global_seed = 0) {
        assert(field_index < m_ngp_fields.size() && "field_index out of bounds");
        auto field = *m_ngp_fields[field_index];

        // Get the node indices
        Kokkos::View<stk::mesh::FastMeshIndex *, stk::ngp::ExecSpace> entity_indices = GetLocalEntityIndices(Rank, m_selector, m_bulk_data);

        // Get the number of local entities
        const unsigned num_local_entities = stk::mesh::count_entities(*m_bulk_data, Rank, m_selector);

        // Get the mesh
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        auto ngp_mesh = m_ngp_mesh;

        // Loop over all the entities
        Kokkos::parallel_for(
            stk::ngp::DeviceRangePolicy(0, num_local_entities), KOKKOS_LAMBDA(const unsigned &i) {
                // Get the fast mesh index
                stk::mesh::FastMeshIndex entity_index = entity_indices(i);

                // Set the seed based on the entity id and the global seed
                stk::mesh::Entity entity = ngp_mesh.get_entity(Rank, entity_index);
                size_t seed = global_seed + ngp_mesh.identifier(entity);

                // Set up the random number generator
                Kokkos::Random_XorShift64<stk::ngp::ExecSpace> rand_gen(seed);

                // Get the number of components and loop over them
                const size_t num_components = field.get_num_components_per_entity(entity_index);
                stk::mesh::EntityFieldData<T> field_values = field(entity_index);
                for (size_t j = 0; j < num_components; j++) {
                    // Get the random value
                    T random_value = static_cast<T>(rand_gen.drand());
                    // Set the field value
                    field_values[j] = min + random_value * (max - min);
                }
            });
    }

    // Calculate the sum of the field
    T SumField(size_t field_index) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Kokkos view for the field sum
        Kokkos::View<T *, Kokkos::DefaultExecutionSpace> field_sum("field_sum", 1);
        auto field_sum_host = Kokkos::create_mirror_view(field_sum);
        field_sum_host(0) = 0.0;
        Kokkos::deep_copy(field_sum, field_sum_host);

        // Get the field
        auto field = *m_ngp_fields[field_index];

        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                // Get the number of components
                const size_t num_components = field.get_num_components_per_entity(entity);
                // Sum the squares of the components
                T value_sum = 0.0;
                for (size_t i = 0; i < num_components; i++) {
                    T value = field(entity, i);
                    value_sum += value;
                }
                // Atomic add the value squared to the field sum
                Kokkos::atomic_add(&field_sum[0], value_sum);
            });

        // Host view for the field sum
        Kokkos::deep_copy(field_sum_host, field_sum);

        // Parallel sum the field sum
        T field_sum_value = field_sum_host(0);
        T field_sum_value_global = 0.0;
        stk::all_reduce_sum(m_bulk_data->parallel(), &field_sum_value, &field_sum_value_global, 1);

        return field_sum_value_global;
    }

    // Calculate the min and max of the field
    std::pair<T, T> MinMaxField(size_t field_index) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        // Kokkos view for the field min and max
        Kokkos::View<T *, Kokkos::DefaultExecutionSpace> field_min("field_min", 1);
        Kokkos::View<T *, Kokkos::DefaultExecutionSpace> field_max("field_max", 1);
        auto field_min_host = Kokkos::create_mirror_view(field_min);
        auto field_max_host = Kokkos::create_mirror_view(field_max);
        field_min_host(0) = std::numeric_limits<T>::max();
        field_max_host(0) = std::numeric_limits<T>::lowest();
        Kokkos::deep_copy(field_min, field_min_host);
        Kokkos::deep_copy(field_max, field_max_host);

        // Get the field
        auto field = *m_ngp_fields[field_index];

        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                // Get the number of components
                const size_t num_components = field.get_num_components_per_entity(entity);
                // Find the min and max of the components
                for (size_t i = 0; i < num_components; i++) {
                    T value = field(entity, i);
                    Kokkos::atomic_min(&field_min[0], value);
                    Kokkos::atomic_max(&field_max[0], value);
                }
            });

        // Host view for the field min and max
        Kokkos::deep_copy(field_min_host, field_min);
        Kokkos::deep_copy(field_max_host, field_max);

        return std::make_pair(field_min_host(0), field_max_host(0));
    }

    // Calculate the norm of the field
    T CalculateFieldNorm(size_t field_index) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        // Kokkos view for the field sum
        Kokkos::View<T *, Kokkos::DefaultExecutionSpace> field_sum("field_sum", 1);
        auto field_sum_host = Kokkos::create_mirror_view(field_sum);
        field_sum_host(0) = 0.0;
        Kokkos::deep_copy(field_sum, field_sum_host);

        // Get the field
        auto field = *m_ngp_fields[field_index];

        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                // Get the number of components
                const size_t num_components = field.get_num_components_per_entity(entity);
                // Sum the squares of the components
                T value_squared = 0.0;
                for (size_t i = 0; i < num_components; i++) {
                    T value = field(entity, i);
                    value_squared += value * value;
                }
                // Atomic add the value squared to the field sum
                Kokkos::atomic_add(&field_sum[0], value_squared);
            });

        // Host view for the field sum
        Kokkos::deep_copy(field_sum_host, field_sum);

        // Parallel sum the field sum
        T field_sum_value = field_sum_host(0);
        T field_sum_value_global = 0.0;
        stk::all_reduce_sum(m_bulk_data->parallel(), &field_sum_value, &field_sum_value_global, 1);

        // Do the square root of the sum
        T field_norm = std::sqrt(field_sum_value_global);

        return field_norm;
    }

    // Normalize the field
    T NormalizeField(size_t field_index) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        // Calculate the field norm
        T field_norm = CalculateFieldNorm(field_index);

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
    T ComputeDotProduct(size_t field_index_0, size_t field_index_1) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        // Get the fields
        auto field_0 = *m_ngp_fields[field_index_0];
        auto field_1 = *m_ngp_fields[field_index_1];

        // Define a functor to compute the local dot product per entity
        struct DotProductFunctor {
            stk::mesh::NgpField<T> field0, field1;

            DotProductFunctor(stk::mesh::NgpField<T> f0, stk::mesh::NgpField<T> f1) : field0(f0), field1(f1) {}

            KOKKOS_INLINE_FUNCTION
            void operator()(const stk::mesh::FastMeshIndex &entity, T &update) const {
                T local_dot_product = 0.0;
                const size_t num_components = field0.get_num_components_per_entity(entity);
                for (size_t i = 0; i < num_components; ++i) {
                    local_dot_product += field0(entity, i) * field1(entity, i);
                }
                update += local_dot_product;  // Accumulate into the reduction
            }
        };

        // Use STK's for_each_entity_reduce with a Sum reduction
        T local_sum = 0.0;
        Kokkos::Sum<T> sum_reduction(local_sum);
        stk::mesh::for_each_entity_reduce(m_ngp_mesh, Rank, m_owned_selector, sum_reduction, DotProductFunctor(field_0, field_1));

        // Perform MPI all-reduce for global sum across processors
        T global_dot_product = 0.0;
        stk::all_reduce_sum(m_bulk_data->parallel(), &local_sum, &global_dot_product, 1);

        return global_dot_product;
    }

    // Scale and multiply fields
    void ScaleAndMultiplyField(size_t field_index_1, size_t field_index_2, double a) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        // Get the fields
        auto field_1 = *m_ngp_fields[field_index_1];
        auto field_2 = *m_ngp_fields[field_index_2];

        // Perform the operation field_1 = field_1 * a * field_2
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, Rank, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
                // Get the number of components
                const size_t num_components = field_1.get_num_components_per_entity(entity);
                // Perform the element-wise operation
                for (size_t i = 0; i < num_components; i++) {
                    field_1(entity, i) = field_1(entity, i) * a * field_2(entity, i);
                }
            });
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

// Face processor
template <size_t N, typename T = double>
using FaceProcessor = EntityProcessor<stk::topology::FACE_RANK, false, N, T>;

// Error helper for unsupported ranks
template <aperi::FieldDataTopologyRank Rank, size_t N, typename T = double>
struct UnsupportedRankError {
    static_assert(Rank == aperi::FieldDataTopologyRank::NODE ||
                      Rank == aperi::FieldDataTopologyRank::ELEMENT ||
                      Rank == aperi::FieldDataTopologyRank::FACE,
                  "Unsupported topology rank in AperiEntityProcessor");
    using type = void;
};

// Change the aperi::FieldDataTopologyRank to stk::topology::rank_t and use the appropriate EntityProcessor
template <aperi::FieldDataTopologyRank Rank, size_t N, typename T = double>
using AperiEntityProcessor =
    std::conditional_t<
        Rank == aperi::FieldDataTopologyRank::NODE,
        NodeProcessor<N, T>,
        std::conditional_t<
            Rank == aperi::FieldDataTopologyRank::ELEMENT,
            ElementProcessor<N, T>,
            std::conditional_t<
                Rank == aperi::FieldDataTopologyRank::FACE,
                FaceProcessor<N, T>,
                typename UnsupportedRankError<Rank, N, T>::type> > >;

}  // namespace aperi
