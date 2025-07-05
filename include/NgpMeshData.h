#pragma once

#include <Kokkos_Core.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/Ngp.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>

#include "Index.h"
#include "Selector.h"
#include "Types.h"

namespace aperi {

/**
 * @brief Lightweight wrapper for stk::mesh::NgpMesh providing index conversion utilities.
 */
class NgpMeshData {
   public:
    NgpMeshData(const stk::mesh::NgpMesh &ngp_mesh) : m_ngp_mesh(ngp_mesh), m_bulk_data(&ngp_mesh.get_bulk_on_host()) {}

    // Default constructor
    NgpMeshData() : m_ngp_mesh(stk::mesh::NgpMesh()), m_bulk_data(nullptr) {}

    KOKKOS_INLINE_FUNCTION aperi::Index GetEntityIndex(const stk::mesh::Entity &entity) const {
        return aperi::Index(m_ngp_mesh.fast_mesh_index(entity));
    }

    template <stk::mesh::EntityRank EntityType, stk::mesh::EntityRank ConnectedType>
    KOKKOS_INLINE_FUNCTION ConnectedEntities GetConnectedEntities(const aperi::Index &entity_index) const {
        return m_ngp_mesh.get_connected_entities(EntityType, entity_index(), ConnectedType);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetElementNodes(const aperi::Index &element_index) const {
        return GetConnectedEntities<stk::topology::ELEMENT_RANK, stk::topology::NODE_RANK>(element_index);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetElementFaces(const aperi::Index &element_index) const {
        return GetConnectedEntities<stk::topology::ELEMENT_RANK, stk::topology::FACE_RANK>(element_index);
    }

    KOKKOS_INLINE_FUNCTION ConnectedEntities GetFaceNodes(const aperi::Index &face_index) const {
        return GetConnectedEntities<stk::topology::FACE_RANK, stk::topology::NODE_RANK>(face_index);
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

    template <size_t MaxEntities>
    KOKKOS_INLINE_FUNCTION Kokkos::Array<aperi::Index, MaxEntities> ConnectedEntitiesToIndices(const aperi::ConnectedEntities &connected_entities) const {
        KOKKOS_ASSERT(connected_entities.size() <= MaxEntities);
        Kokkos::Array<aperi::Index, MaxEntities> indices;
        for (size_t i = 0; i < connected_entities.size(); ++i) {
            indices[i] = GetEntityIndex(connected_entities[i]);
        }
        return indices;
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

    template <size_t N>
    KOKKOS_INLINE_FUNCTION Kokkos::Array<aperi::Index, N> GetFaceNodeIndices(const aperi::Index &face_index) const {
        return ConnectedEntitiesToIndices<N>(GetFaceNodes(face_index));
    }

    KOKKOS_INLINE_FUNCTION
    aperi::Index LocalOffsetToIndex(Unsigned local_offset) const {
        stk::mesh::Entity entity(local_offset);
        return aperi::Index(m_ngp_mesh.fast_mesh_index(entity));
    }

    KOKKOS_INLINE_FUNCTION
    aperi::Index EntityToIndex(const stk::mesh::Entity &entity) const {
        return aperi::Index(m_ngp_mesh.fast_mesh_index(entity));
    }

    KOKKOS_INLINE_FUNCTION
    Unsigned ElementIndexToLocalOffset(const aperi::Index &index) const {
        return m_ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, index()).local_offset();
    }

    KOKKOS_INLINE_FUNCTION
    uint64_t ElementIndexToGlobalId(const aperi::Index &index) const {
        stk::mesh::Entity entity = m_ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, index());
        return m_ngp_mesh.identifier(entity);
    }

    KOKKOS_INLINE_FUNCTION
    uint64_t ElementLocalOffsetToGlobalId(Unsigned local_offset) const {
        stk::mesh::Entity entity(local_offset);
        return m_ngp_mesh.identifier(entity);
    }

    Unsigned ElementGlobalIdToLocalOffset(uint64_t identifier) const {
        // Convert the global id to a local offset
        // There is no "get_entity" on device, currently.
        // TODO(jake): For multi-GPU support, we need to handle the case where the identifier is not a local offset.
        stk::mesh::Entity entity = m_bulk_data->get_entity(stk::topology::ELEMENT_RANK, identifier);
        return entity.local_offset();  // Convert the global id to a local offset
    }

    template <stk::mesh::EntityRank EntityType, stk::mesh::EntityRank ConnectedType, size_t MaxNumConnectedEntities, typename ActionFunc>
    void ForEachEntityAndConnected(ActionFunc &action_func, const aperi::Selector &selector) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        auto func = action_func;
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, EntityType, selector(),
            KOKKOS_CLASS_LAMBDA(const stk::mesh::FastMeshIndex &entity_index) {
                auto connected_entities = m_ngp_mesh.get_connected_entities(EntityType, entity_index, ConnectedType);
                size_t num_connected_entities = connected_entities.size();
                KOKKOS_ASSERT(num_connected_entities <= MaxNumConnectedEntities);

                Kokkos::Array<aperi::Index, MaxNumConnectedEntities> connected_indices;
                for (size_t i = 0; i < num_connected_entities; ++i) {
                    connected_indices[i] = aperi::Index(m_ngp_mesh.fast_mesh_index(connected_entities[i]));
                }
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

   private:
    stk::mesh::NgpMesh m_ngp_mesh;
    const stk::mesh::BulkData *m_bulk_data;
};

}  // namespace aperi
