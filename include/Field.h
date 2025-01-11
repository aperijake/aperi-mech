#pragma once

#include <Eigen/Dense>
#include <array>
#include <chrono>
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
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "Index.h"
#include "LogUtils.h"
#include "MeshData.h"
#include "Selector.h"

namespace aperi {

template <typename T>
class Field {
   public:
    Field(const std::shared_ptr<aperi::MeshData> &mesh_data, const aperi::FieldQueryData<T> &field_query_data)
        : m_mesh_data(mesh_data),
          m_field(StkGetField(field_query_data, mesh_data->GetMetaData())),
          m_ngp_field(stk::mesh::get_updated_ngp_field<T>(*m_field)) {}

    /**
     * @brief Gather the field data for the entity and store it in an array.
     * @param index The index of the entity.
     * @return An array of the field data.
     */
    KOKKOS_FUNCTION T *data(const aperi::Index &index) {
        return &m_ngp_field(index(), 0);
    }

    /**
     * @brief Gather the field data for the entity and store it in an array.
     * @param index The index of the entity.
     * @return A const array of the field data.
     */
    KOKKOS_FUNCTION const T *data(const aperi::Index &index) const {
        return &m_ngp_field(index(), 0);
    }

    /**
     * @brief Get the stride of the field data.
     * @return The stride of the field data.
     */
    KOKKOS_FUNCTION unsigned GetStride() const {
        return m_ngp_field.get_component_stride();
    }

    /**
     * @brief Gather the field data for the entity and component and return it.
     * @param index The index of the entity.
     * @param i The component index.
     * @return Reference to the value of the field data at the given index
     */
    KOKKOS_FUNCTION T &operator()(const aperi::Index &index, size_t i) {
        KOKKOS_ASSERT(i < m_ngp_field.get_num_components_per_entity(index()));
        return m_ngp_field(index(), i);
    }

    /**
     * @brief Gather the field data for the entity and component and return it.
     * @param index The index of the entity.
     * @param i The component index.
     * @return Const reference to the value of the field data at the given index
     */
    KOKKOS_FUNCTION const T &operator()(const aperi::Index &index, size_t i) const {
        KOKKOS_ASSERT(i < m_ngp_field.get_num_components_per_entity(index()));
        return m_ngp_field(index(), i);
    }

    /**
     * @brief Gather the field data for the entity and component and return it.
     * @param index The index of the entity.
     * @param i The component index.
     * @return The value of the field data at the given index
     */
    KOKKOS_FUNCTION T GetValue(const aperi::Index &index, size_t i) const {
        KOKKOS_ASSERT(i < m_ngp_field.get_num_components_per_entity(index()));
        return m_ngp_field(index(), i);
    }

    /**
     * @brief Get the number of components per entity.
     * @param index The index of the entity.
     * @return The number of components per entity.
     */
    KOKKOS_FUNCTION size_t GetNumComponentsPerEntity(const aperi::Index &index) const {
        return m_ngp_field.get_num_components_per_entity(index());
    }

    /**
     * @brief Gather the field data for the entity and store it in an Eigen::Matrix.
     * @param index The index of the entity.
     * @return An Eigen::Matrix of the field data.
     */
    template <size_t N, size_t M>
    KOKKOS_FUNCTION Eigen::Matrix<T, N, M> GetEigenMatrix(const aperi::Index &index) const {
        stk::mesh::FastMeshIndex fast_index = index();
        Eigen::Matrix<T, N, M> data;
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                data(i, j) = m_ngp_field(fast_index, i * M + j);
            }
        }
        return data;
    }

    /**
     * @brief Gather the field data for the entity and return it as a strided Eigen::Map.
     * @param index The index of the entity
     * @return An Eigen::Map to the field data.
     */
    template <size_t N, size_t M>
    KOKKOS_FUNCTION Eigen::Map<Eigen::Matrix<T, N, M>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> GetEigenMap(const aperi::Index &index) {
        const unsigned component_stride = m_ngp_field.get_component_stride();
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, M * component_stride);
        return Eigen::Map<Eigen::Matrix<T, N, M>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(&m_ngp_field(index(), 0), stride);
    }

    /**
     * @brief Gather the field data for the entity and return it as a strided Eigen::Map.
     * @param index The index of the entity
     * @return An Eigen::Map<const Eigen::Matrix<T, N, M>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> to the field data.
     */
    template <size_t N, size_t M>
    KOKKOS_FUNCTION Eigen::Map<const Eigen::Matrix<T, N, M>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> GetEigenMap(const aperi::Index &index) const {
        const unsigned component_stride = m_ngp_field.get_component_stride();
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, M * component_stride);
        return Eigen::Map<const Eigen::Matrix<T, N, M>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(&m_ngp_field(index(), 0), stride);
    }

    /**
     * @brief Atomically add the input data to the field data.
     * @param index The index of the entity.
     * @param data The data to add.
     * @return None.
     */
    template <typename Derived>
    KOKKOS_FUNCTION void AtomicAdd(const aperi::Index &index, const Eigen::MatrixBase<Derived> &data) {
        constexpr size_t N = Eigen::MatrixBase<Derived>::RowsAtCompileTime;
        constexpr size_t M = Eigen::MatrixBase<Derived>::ColsAtCompileTime;
        stk::mesh::FastMeshIndex fast_index = index();
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                Kokkos::atomic_add(&m_ngp_field(fast_index, i * M + j), data(i, j));
            }
        }
    }

    /**
     * @brief Add the input data to the field data.
     * @param index The index of the entity.
     * @param data The data to add.
     * @return None.
     */
    template <typename Derived>
    KOKKOS_FUNCTION void Add(const aperi::Index &index, const Eigen::MatrixBase<Derived> &data) {
        constexpr size_t N = Eigen::MatrixBase<Derived>::RowsAtCompileTime;
        constexpr size_t M = Eigen::MatrixBase<Derived>::ColsAtCompileTime;
        stk::mesh::FastMeshIndex fast_index = index();
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                m_ngp_field(fast_index, i * M + j) += data(i, j);
            }
        }
    }

    /**
     * @brief Atomically assign the field data with the input data.
     * @param index The index of the entity.
     * @param data The data to assign.
     * @return None.
     */
    template <typename Derived>
    KOKKOS_FUNCTION void AtomicAssign(const aperi::Index &index, const Eigen::MatrixBase<Derived> &data) {
        constexpr size_t N = Eigen::MatrixBase<Derived>::RowsAtCompileTime;
        constexpr size_t M = Eigen::MatrixBase<Derived>::ColsAtCompileTime;
        stk::mesh::FastMeshIndex fast_index = index();
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                Kokkos::atomic_store(&m_ngp_field(fast_index, i * M + j), data(i, j));
            }
        }
    }

    /**
     * @brief Assign the field data with the input data.
     * @param index The index of the entity.
     * @param data The data to assign.
     * @return None.
     */
    template <typename Derived>
    KOKKOS_FUNCTION void Assign(const aperi::Index &index, const Eigen::MatrixBase<Derived> &data) {
        constexpr size_t N = Eigen::MatrixBase<Derived>::RowsAtCompileTime;
        constexpr size_t M = Eigen::MatrixBase<Derived>::ColsAtCompileTime;
        stk::mesh::FastMeshIndex fast_index = index();
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                m_ngp_field(fast_index, i * M + j) = data(i, j);
            }
        }
    }

    // Get the sum of a field
    T GetSumHost() const {
        return stk::mesh::field_asum(*m_field);
    }

    // Marking modified
    void MarkModifiedOnDevice() {
        // STK QUESTION: Should I always clear sync state before marking modified?
        m_ngp_field.clear_sync_state();
        m_ngp_field.modify_on_device();
    }

    void MarkModifiedOnHost() {
        // STK QUESTION: Should I always clear sync state before marking modified?
        m_ngp_field.clear_sync_state();
        m_ngp_field.modify_on_host();
    }

    // Syncing
    void SyncHostToDevice() {
        m_ngp_field.sync_to_device();
    }

    void SyncDeviceToHost() {
        m_ngp_field.sync_to_host();
    }

    // Parallel communication
    void Communicate(bool pre_sync_from_device_to_host = true, bool post_sync_from_host_to_device = true) {
        if (pre_sync_from_device_to_host) {
            m_ngp_field.sync_to_host();
        }
        std::vector<const stk::mesh::FieldBase *> fields = {m_field};
        stk::mesh::communicate_field_data(*m_mesh_data->GetBulkData(), fields);
        MarkModifiedOnHost();
        if (post_sync_from_host_to_device) {
            m_ngp_field.sync_to_device();
        }
    }

    // Parallel sum including ghosted values
    void ParallelSum(bool pre_sync_from_device_to_host = true, bool post_sync_from_host_to_device = true) {
        if (pre_sync_from_device_to_host) {
            m_ngp_field.sync_to_host();
        }
        std::vector<const stk::mesh::FieldBase *> fields = {m_field};
        stk::mesh::parallel_sum_including_ghosts(*m_mesh_data->GetBulkData(), fields);
        MarkModifiedOnHost();
        if (post_sync_from_host_to_device) {
            m_ngp_field.sync_to_device();
        }
    }

    /**
     * @brief Get the mesh data object.
     * @return The mesh data object.
     */
    std::shared_ptr<aperi::MeshData> GetMeshData() const {
        return m_mesh_data;
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    stk::mesh::Field<T> *m_field;                  // The field object.
    stk::mesh::NgpField<T> m_ngp_field;            // The ngp field object.
};

}  // namespace aperi
