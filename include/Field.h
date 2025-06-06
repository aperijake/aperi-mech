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
#include <stk_mesh/base/NgpFieldBLAS.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "Index.h"
#include "LogUtils.h"
#include "MeshData.h"
#include "Selector.h"

namespace aperi {

/**
 * @brief A wrapper class for a field.
 *
 * This class provides a wrapper around a field and provides methods to access the field data.
 *
 * @tparam T The type of the field data.
 * @todo STK NgpFields are layout right (row major) whereas Eigen matrices are layout left (column major). This may cause performance issues and should be investigated.
 *
 */
template <typename T>
class Field {
   public:
    // Default constructor
    Field() : m_mesh_data(nullptr), m_field(nullptr) {}

    Field(const std::shared_ptr<aperi::MeshData> &mesh_data, const aperi::FieldQueryData<T> &field_query_data)
        : m_mesh_data(mesh_data),
          m_field(StkGetField(field_query_data, mesh_data->GetMetaData())),
          m_ngp_field(stk::mesh::get_updated_ngp_field<T>(*m_field)) {}

    void UpdateField() {
        assert(m_field != nullptr);
        m_ngp_field = stk::mesh::get_updated_ngp_field<T>(*m_field);
    }

    /**
     * @brief Gather the field data for the entity and store it in an array.
     * @param index The index of the entity.
     * @return An array of the field data.
     */
    KOKKOS_FUNCTION T *data(const aperi::Index &index) const {
        return &m_ngp_field(index(), 0);
    }

    /**
     * @brief Get the stride of the field data.
     * @return The stride of the field data.
     */
    KOKKOS_FUNCTION unsigned GetStride(const aperi::Index &index) const {
        return m_ngp_field.get_component_stride(index());
    }

    /**
     * @brief Gather the field data for the entity and component and return it.
     * @param index The index of the entity.
     * @param i The component index.
     * @return Reference to the value of the field data at the given index
     */
    KOKKOS_FUNCTION T &operator()(const aperi::Index &index, size_t i) const {
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
     * @param num_rows The number of rows in the matrix
     * @param num_cols The number of columns in the matrix
     * @return An Eigen::Map<Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> to the field data.
     */
    template <int Rows = Eigen::Dynamic, int Cols = Eigen::Dynamic>
    KOKKOS_FUNCTION Eigen::Map<Eigen::Matrix<T, Rows, Cols>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> GetEigenMatrixMap(const aperi::Index &index, size_t num_rows = Rows, size_t num_cols = Cols) {
        const unsigned component_stride = m_ngp_field.get_component_stride(index());
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, component_stride * num_cols);
        return Eigen::Map<Eigen::Matrix<T, Rows, Cols>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(&m_ngp_field(index(), 0), num_rows, num_cols, stride);
    }

    /**
     * @brief Gather the field data for the entity and return it as a strided Eigen::Map.
     * @param index The index of the entity
     * @param num_rows The number of rows in the matrix
     * @param num_cols The number of columns in the matrix
     * @return An Eigen::Map<const Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> to the field data.
     */
    template <int Rows = Eigen::Dynamic, int Cols = Eigen::Dynamic>
    KOKKOS_FUNCTION Eigen::Map<const Eigen::Matrix<T, Rows, Cols>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> GetEigenMatrixMap(const aperi::Index &index, size_t num_rows = Rows, size_t num_cols = Cols) const {
        const unsigned component_stride = m_ngp_field.get_component_stride(index());
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, component_stride * num_cols);
        return Eigen::Map<const Eigen::Matrix<T, Rows, Cols>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(&m_ngp_field(index(), 0), num_rows, num_cols, stride);
    }

    /**
     * @brief Gather the field data for the entity and return it as a const strided Eigen::Map.
     * @param index The index of the entity
     * @param num_rows The number of rows in the matrix
     * @param num_cols The number of columns in the matrix
     * @return An Eigen::Map<const Eigen::Matrix<T, Eigen::Dynamic, Eigen::Dynamic>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> to the field data.
     */
    template <int Rows = Eigen::Dynamic, int Cols = Eigen::Dynamic>
    KOKKOS_FUNCTION Eigen::Map<const Eigen::Matrix<T, Rows, Cols>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> GetConstEigenMatrixMap(const aperi::Index &index, size_t num_rows = Rows, size_t num_cols = Cols) const {
        const unsigned component_stride = m_ngp_field.get_component_stride(index());
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, component_stride * num_cols);
        return Eigen::Map<const Eigen::Matrix<T, Rows, Cols>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(&m_ngp_field(index(), 0), num_rows, num_cols, stride);
    }

    /**
     * @brief Gather the field data for the entity and return it as a strided Eigen::Map.
     * @param index The index of the entity
     * @param size The size of the vector
     * @return An Eigen::Map<Eigen::Vector<T, Eigen::Dynamic>, 0, Eigen::InnerStride<Eigen::Dynamic>> to the field data.
     */
    template <int Size = Eigen::Dynamic>
    KOKKOS_FUNCTION Eigen::Map<Eigen::Vector<T, Size>, 0, Eigen::InnerStride<Eigen::Dynamic>> GetEigenVectorMap(const aperi::Index &index, size_t size = Size) {
        const unsigned component_stride = m_ngp_field.get_component_stride(index());
        Eigen::InnerStride<Eigen::Dynamic> stride(component_stride);
        return Eigen::Map<Eigen::Vector<T, Size>, 0, Eigen::InnerStride<Eigen::Dynamic>>(&m_ngp_field(index(), 0), size, stride);
    }

    /**
     * @brief Gather the field data for the entity and return it as a strided Eigen::Map.
     * @param index The index of the entity
     * @param size The size of the vector
     * @return An Eigen::Map<const Eigen::Vector<T, Eigen::Dynamic>, 0, Eigen::InnerStride<Eigen::Dynamic>> to the field data.
     */
    template <int Size = Eigen::Dynamic>
    KOKKOS_FUNCTION Eigen::Map<const Eigen::Vector<T, Size>, 0, Eigen::InnerStride<Eigen::Dynamic>> GetEigenVectorMap(const aperi::Index &index, size_t size = Size) const {
        const unsigned component_stride = m_ngp_field.get_component_stride(index());
        Eigen::InnerStride<Eigen::Dynamic> stride(component_stride);
        return Eigen::Map<const Eigen::Vector<T, Size>, 0, Eigen::InnerStride<Eigen::Dynamic>>(&m_ngp_field(index(), 0), size, stride);
    }

    /**
     * @brief Gather the field data for the entity and return it as a const strided Eigen::Map.
     * @param index The index of the entity
     * @param size The size of the vector
     * @return An Eigen::Map<const Eigen::Vector<T, Eigen::Dynamic>, 0, Eigen::InnerStride<Eigen::Dynamic>> to the field data.
     */
    template <int Size = Eigen::Dynamic>
    KOKKOS_FUNCTION Eigen::Map<const Eigen::Vector<T, Size>, 0, Eigen::InnerStride<Eigen::Dynamic>> GetConstEigenVectorMap(const aperi::Index &index, size_t size = Size) const {
        const unsigned component_stride = m_ngp_field.get_component_stride(index());
        Eigen::InnerStride<Eigen::Dynamic> stride(component_stride);
        return Eigen::Map<const Eigen::Vector<T, Size>, 0, Eigen::InnerStride<Eigen::Dynamic>>(&m_ngp_field(index(), 0), size, stride);
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

    /**
     * @brief Fill the field with a value.
     * @param value The value to fill the field with.
     * @param selector The selector for the field.
     */
    void Fill(const T &value, const aperi::Selector &selector) {
        stk::mesh::field_fill(value, *m_field, selector(), stk::ngp::ExecSpace());
    }

    /**
     * @brief Fill the field with a value.
     * @param value The value to fill the field with.
     * @param sets The sets used to get the selector.
     */
    void Fill(const T &value, std::vector<std::string> sets = {}) {
        // Get the selector
        aperi::Selector selector = aperi::Selector(sets, m_mesh_data.get());

        // Fill the field
        stk::mesh::field_fill(value, *m_field, selector(), stk::ngp::ExecSpace());
    }

    /**
     * @brief Zero a field.
     * @param field The field to zero.
     * @param selector The selector for the field.
     */
    void Zero(const aperi::Selector &selector) {
        Fill(0, selector);
    }

    /**
     * @brief Zero a field.
     * @param field The field to zero.
     * @param sets The sets used to get the selector.
     */
    void Zero(Field<T> &field, std::vector<std::string> sets = {}) {
        Fill(0, sets);
    }

    // Get the sum of a field
    T GetSumHost() const {
        assert(m_field != nullptr);
        return stk::mesh::field_asum(*m_field);
    }

    // Marking modified
    void MarkModifiedOnDevice() {
        // STK QUESTION: Should I always clear sync state before marking modified?
        assert(m_field != nullptr);
        m_ngp_field.clear_sync_state();
        m_ngp_field.modify_on_device();
    }

    void MarkModifiedOnHost() {
        // STK QUESTION: Should I always clear sync state before marking modified?
        assert(m_field != nullptr);
        m_ngp_field.clear_sync_state();
        m_ngp_field.modify_on_host();
    }

    // Syncing
    void SyncHostToDevice() {
        assert(m_field != nullptr);
        m_ngp_field.sync_to_device();
    }

    void SyncDeviceToHost() {
        assert(m_field != nullptr);
        m_ngp_field.sync_to_host();
    }

    // Parallel communication
    void Communicate(bool pre_sync_from_device_to_host = true, bool post_sync_from_host_to_device = true) {
        assert(m_field != nullptr);
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
        assert(m_field != nullptr);
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

    /**
     * @brief Get the field object.
     * @return The field object.
     */
    stk::mesh::Field<T> *GetField() const {
        return m_field;
    }

    /**
     * @brief == operator to compare two fields.
     * @param other The other field to compare with.
     * @return True if the fields are equal, false otherwise.
     */
    bool operator==(const aperi::Field<T> &other) const {
        return m_field == other.m_field;
    }

    /**
     * @brief != operator to compare two fields.
     * @param other The other field to compare with.
     * @return True if the fields are not equal, false otherwise.
     */
    bool operator!=(const aperi::Field<T> &other) const {
        return !(*this == other);
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    stk::mesh::Field<T> *m_field;                  // The field object.
    mutable stk::mesh::NgpField<T> m_ngp_field;    // The ngp field object.
};

// Check if a field exists
template <typename T>
bool FieldExists(const aperi::FieldQueryData<T> &field_query_data, const std::shared_ptr<aperi::MeshData> &meta_data) {
    if (meta_data == nullptr) {
        return false;
    }
    return aperi::StkFieldExists(field_query_data, meta_data->GetMetaData());
}

// Check if a field exists on a part
template <typename T>
bool FieldExistsOn(const aperi::FieldQueryData<T> &field_query_data, const std::string &part_name, const std::shared_ptr<aperi::MeshData> &meta_data) {
    if (meta_data == nullptr) {
        return false;
    }
    return aperi::StkFieldExistsOn(field_query_data, part_name, meta_data->GetMetaData());
}

// Get a field if it exists
template <typename T>
std::shared_ptr<aperi::Field<T>> GetField(const std::shared_ptr<aperi::MeshData> &mesh_data, const aperi::FieldQueryData<T> &field_query_data) {
    if (mesh_data == nullptr || !FieldExists(field_query_data, mesh_data)) {
        return nullptr;
    }
    return std::make_shared<aperi::Field<T>>(mesh_data, field_query_data);
}

}  // namespace aperi
