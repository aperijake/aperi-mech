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
#include "Field.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {
using ConnectedEntities = stk::mesh::NgpMesh::ConnectedEntities;

class ConnectedEntityProcessor {
   public:
    /**
     * @brief Constructs an ConnectedEntityProcessor object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param sets A vector of strings representing the sets to process.
     */
    ConnectedEntityProcessor(std::shared_ptr<aperi::MeshData> mesh_data) : m_mesh_data(mesh_data) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    }

    KOKKOS_INLINE_FUNCTION aperi::Index GetEntityIndex(const stk::mesh::Entity &entity) const {
        return aperi::Index(m_ngp_mesh.fast_mesh_index(entity));
    }

    template <size_t MaxEntities>
    KOKKOS_INLINE_FUNCTION Kokkos::Array<aperi::Index, MaxEntities> ConnectedEntitiesToIndices(const aperi::ConnectedEntities &connected_entities) const {
        KOKKOS_ASSERT(connected_entities.size() <= MaxEntities);
        Kokkos::Array<aperi::Index, MaxEntities> indices;
        for (size_t i = 0; i < connected_entities.size(); ++i) {
            indices[i] = GetEntityIndex(connected_entities[i]);
        }
        return indices;
    }

    template <stk::mesh::EntityRank EntityType, stk::mesh::EntityRank ConnectedType>
    KOKKOS_INLINE_FUNCTION ConnectedEntities GetConnectedEntities(const aperi::Index &entity_index) const {
        // Get the entities of the element
        return m_ngp_mesh.get_connected_entities(EntityType, entity_index(), ConnectedType);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetElementFaces(const aperi::Index &element_index) const {
        return GetConnectedEntities<stk::topology::ELEMENT_RANK, stk::topology::FACE_RANK>(element_index);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetElementNodes(const aperi::Index &element_index) const {
        return GetConnectedEntities<stk::topology::ELEMENT_RANK, stk::topology::NODE_RANK>(element_index);
    }

    template <size_t N>
    KOKKOS_INLINE_FUNCTION Kokkos::Array<aperi::Index, N> GetElementNodeIndices(const aperi::Index &element_index) const {
        return ConnectedEntitiesToIndices<N>(GetElementNodes(element_index));
    }

    template <size_t N>
    KOKKOS_INLINE_FUNCTION Kokkos::Array<aperi::Index, N> GetElementNodeIndices(const aperi::Index &element_index, size_t &num_nodes) const {
        aperi::ConnectedEntities connected_entities = GetElementNodes(element_index);
        num_nodes = connected_entities.size();
        KOKKOS_ASSERT(num_nodes <= N);
        return ConnectedEntitiesToIndices<N>(connected_entities);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetFaceNodes(const aperi::Index &face_index) const {
        return GetConnectedEntities<stk::topology::FACE_RANK, stk::topology::NODE_RANK>(face_index);
    }

    template <size_t N>
    KOKKOS_INLINE_FUNCTION Kokkos::Array<aperi::Index, N> GetFaceNodeIndices(const aperi::Index &face_index) const {
        return ConnectedEntitiesToIndices<N>(GetFaceNodes(face_index));
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetFaceElements(const aperi::Index &face_index) const {
        return GetConnectedEntities<stk::topology::FACE_RANK, stk::topology::ELEMENT_RANK>(face_index);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetNodeElements(const aperi::Index &node_index) const {
        return GetConnectedEntities<stk::topology::NODE_RANK, stk::topology::ELEMENT_RANK>(node_index);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetNodeFaces(const aperi::Index &node_index) const {
        return GetConnectedEntities<stk::topology::NODE_RANK, stk::topology::FACE_RANK>(node_index);
    }

    template <stk::mesh::EntityRank EntityType, stk::mesh::EntityRank ConnectedType, size_t MaxNumConnectedEntities, typename ActionFunc>
    void ForEachEntityAndConnected(ActionFunc &action_func, const aperi::Selector &selector) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        auto func = action_func;

        stk::mesh::for_each_entity_run(
            m_ngp_mesh, EntityType, selector(),
            KOKKOS_CLASS_LAMBDA(const stk::mesh::FastMeshIndex &entity_index) {
                // Get the entities of the element
                stk::mesh::NgpMesh::ConnectedEntities connected_entities = m_ngp_mesh.get_connected_entities(EntityType, entity_index, ConnectedType);
                size_t num_connected_entities = connected_entities.size();
                KOKKOS_ASSERT(num_connected_entities <= MaxNumConnectedEntities);

                // Get the node indices
                Kokkos::Array<aperi::Index, MaxNumConnectedEntities> connected_indices;
                for (size_t i = 0; i < num_connected_entities; ++i) {
                    connected_indices[i] = GetEntityIndex(connected_entities[i]);
                }

                // Call the action function
                func(aperi::Index(entity_index), connected_indices, num_connected_entities);
            });
    }

    template <size_t MaxNumConnectedEntities, typename ActionFunc>
    void ForEachElementAndConnectedNodes(ActionFunc &action_func, const aperi::Selector &selector) {
        ForEachEntityAndConnected<stk::topology::ELEMENT_RANK, stk::topology::NODE_RANK, MaxNumConnectedEntities>(action_func, selector);
    }

    template <size_t MaxNumConnectedEntities, typename ActionFunc>
    void ForEachElementAndConnectedFaces(ActionFunc &action_func, const aperi::Selector &selector) {
        ForEachEntityAndConnected<stk::topology::ELEMENT_RANK, stk::topology::FACE_RANK, MaxNumConnectedEntities>(action_func, selector);
    }

    template <typename ActionFunc>
    void ForEachFaceAndConnectedElements(ActionFunc &action_func, const aperi::Selector &selector) {
        ForEachEntityAndConnected<stk::topology::FACE_RANK, stk::topology::ELEMENT_RANK, 2>(action_func, selector);
    }

    std::shared_ptr<aperi::MeshData> GetMeshData() {
        return m_mesh_data;
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
};

}  // namespace aperi