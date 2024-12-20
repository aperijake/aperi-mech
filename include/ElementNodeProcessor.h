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

class ElementNodeProcessor {
   public:
    /**
     * @brief Constructs an ElementNodeProcessor object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param sets A vector of strings representing the sets to process.
     */
    ElementNodeProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets) : m_mesh_data(mesh_data), m_sets(sets) {
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
            aperi::CoutP0() << "Warning: ElementNodeProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & meta_data->locally_owned_part();
    }

    bool CheckNumNodes(size_t max_allowed_nodes) {
        auto ngp_mesh = m_ngp_mesh;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the nodes of the element
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                size_t num_nodes = nodes.size();

                // Allocate for the node indices
                if (num_nodes > HEX8_NUM_NODES) {
                    Kokkos::abort("Error: num_nodes > max_allowed_nodes");
                }
            });

        return true;
    }

    template <typename ActionFunc>
    void for_each_element_and_nodes(ActionFunc action_func) {
        auto ngp_mesh = m_ngp_mesh;

        auto func = action_func;

        assert(CheckNumNodes(HEX8_NUM_NODES));

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the nodes of the element
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                size_t num_nodes = nodes.size();

                // Allocate for the node indices
                Kokkos::Array<stk::mesh::FastMeshIndex, HEX8_NUM_NODES> node_indices;

                // Get the node indices
                for (size_t i = 0; i < num_nodes; ++i) {
                    node_indices[i] = ngp_mesh.fast_mesh_index(nodes[i]);
                }

                // Call the action function
                func(elem_index, node_indices, num_nodes);
            });
    }

    std::shared_ptr<aperi::MeshData> GetMeshData() {
        return m_mesh_data;
    }

    std::vector<std::string> GetSets() {
        return m_sets;
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_owned_selector;          // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
};

// Define the gather kernel
template <typename T, size_t N>
struct GatherKernel {
    GatherKernel(const aperi::MeshData &mesh_data, const aperi::FieldQueryData<T> &field_query_data)
        : field(stk::mesh::get_updated_ngp_field<T>(*StkGetField(field_query_data, mesh_data.GetMetaData()))) {
    }

    KOKKOS_FUNCTION void operator()(const stk::mesh::FastMeshIndex &index, Eigen::Vector<T, N> &data) const {
        for (size_t i = 0; i < N; ++i) {
            data(i) = field(index, i);
        }
    }

   private:
    stk::mesh::NgpField<T> field;
};

// Define a scatter kernel
template <typename T, size_t N>
struct ScatterKernel {
    ScatterKernel(const aperi::MeshData &mesh_data, const aperi::FieldQueryData<T> &field_query_data)
        : field(stk::mesh::get_updated_ngp_field<T>(*StkGetField(field_query_data, mesh_data.GetMetaData()))) {
    }

    KOKKOS_FUNCTION void AtomicAdd(const stk::mesh::FastMeshIndex &index, const Eigen::Vector<T, N> &data) const {
        for (size_t i = 0; i < N; ++i) {
            Kokkos::atomic_add(&field(index, i), data(i));
        }
    }

    KOKKOS_FUNCTION void Overwrite(const stk::mesh::FastMeshIndex &index, const Eigen::Vector<T, N> &data) const {
        for (size_t i = 0; i < N; ++i) {
            field(index, i) = data(i);
        }
    }

   private:
    stk::mesh::NgpField<T> field;
};

}  // namespace aperi