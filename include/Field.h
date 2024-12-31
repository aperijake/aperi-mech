#pragma once

#include <Eigen/Dense>
#include <array>
#include <chrono>
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
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

struct Index {
    KOKKOS_FUNCTION
    Index(const stk::mesh::FastMeshIndex &index) : m_index(index) {}

    KOKKOS_FUNCTION
    Index() : m_index(stk::mesh::FastMeshIndex()) {}

    KOKKOS_FUNCTION
    stk::mesh::FastMeshIndex operator()() const {
        return m_index;
    }

   private:
    stk::mesh::FastMeshIndex m_index;
};

template <typename T, size_t N = 1, size_t M = 1>
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
    KOKKOS_FUNCTION T *data(const aperi::Index &index) const {
        return &m_ngp_field(index(), 0);
    }

    /**
     * @brief Gather the field data for the entity and return it as a strided Eigen::Map.
     * @param index The index of the entity.
     * @param i The index of the field data.
     * @return Value of the field data at the given index
     */
    KOKKOS_FUNCTION T &operator()(const aperi::Index &index, size_t i) const {
        return m_ngp_field(index(), i);
    }

    /**
     * @brief Gather the field data for the entity and store it in an Eigen::Matrix.
     * @param index The index of the entity.
     * @return An Eigen::Matrix of the field data.
     */
    KOKKOS_FUNCTION Eigen::Matrix<T, N, M> GetEigenMatrix(const aperi::Index &index) const {
        stk::mesh::FastMeshIndex fast_index = index();
        Eigen::Matrix<T, N, M> data;
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                data(i, j) = m_ngp_field(fast_index, i * M + j);
            }
        }
    }

    /**
     * @brief Gather the field data for the entity and return it as a strided Eigen::Map.
     * @param index The index of the entity
     * @return An Eigen::Map to the field data.
     */
    KOKKOS_FUNCTION Eigen::Map<Eigen::Matrix<T, N, M>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> GetEigenMap(const aperi::Index &index) const {
        const unsigned component_stride = m_ngp_field.get_component_stride();
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(component_stride, M * component_stride);
        return Eigen::Map<Eigen::Matrix<T, N, M>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(&m_ngp_field(index(), 0), stride);
    }

    /**
     * @brief Atomically add the input data to the field data.
     * @param index The index of the entity.
     * @param data The data to add.
     * @return None.
     */
    KOKKOS_FUNCTION void AtomicAdd(const aperi::Index &index, const Eigen::Matrix<T, N, M> &data) const {
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
    KOKKOS_FUNCTION void Add(const aperi::Index &index, const Eigen::Matrix<T, N, M> &data) const {
        stk::mesh::FastMeshIndex fast_index = index();
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                m_ngp_field(fast_index, i * M + j) += data(i, j);
            }
        }
    }

    /**
     * @brief Atomically overwrite the field data with the input data.
     * @param index The index of the entity.
     * @param data The data to overwrite.
     * @return None.
     */
    KOKKOS_FUNCTION void AtomicOverwrite(const aperi::Index &index, const Eigen::Matrix<T, N, M> &data) const {
        stk::mesh::FastMeshIndex fast_index = index();
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                Kokkos::atomic_assign(&m_ngp_field(fast_index, i * M + j), data(i, j));
            }
        }
    }

    /**
     * @brief Overwrite the field data with the input data.
     * @param index The index of the entity.
     * @param data The data to overwrite.
     * @return None.
     */
    KOKKOS_FUNCTION void Overwrite(const aperi::Index &index, const Eigen::Matrix<T, N, M> &data) const {
        stk::mesh::FastMeshIndex fast_index = index();
        for (size_t i = 0; i < N; ++i) {
            for (size_t j = 0; j < M; ++j) {
                m_ngp_field(fast_index, i * M + j) = data(i, j);
            }
        }
    }

    /**
     * @brief Get the mesh data object.
     * @return The mesh data object.
     */
    std::shared_ptr<aperi::MeshData> GetMeshData() {
        return m_mesh_data;
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    stk::mesh::Field<T> *m_field;                  // The field object.
    stk::mesh::NgpField<T> m_ngp_field;            // The ngp field object.
};

}  // namespace aperi