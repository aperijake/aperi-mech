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

class ConnectedEntityProcessor {
   public:
    /**
     * @brief Constructs an ConnectedEntityProcessor object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param sets A vector of strings representing the sets to process.
     */
    ConnectedEntityProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        m_owned_selector = m_selector & meta_data->locally_owned_part();
    }

    template <stk::mesh::EntityRank EntityType, stk::mesh::EntityRank ConnectedType, size_t MaxNumConnectedEntities>
    KOKKOS_INLINE_FUNCTION
        size_t
        GetConnectedEntities(const stk::mesh::FastMeshIndex &entity_index, Kokkos::Array<aperi::Index, MaxNumConnectedEntities> &connected_indices) const {
        // Get the entities of the element
        stk::mesh::NgpMesh::ConnectedEntities connected_entities = m_ngp_mesh.get_connected_entities(EntityType, entity_index, ConnectedType);
        size_t num_connected_entities = connected_entities.size();
        KOKKOS_ASSERT(num_connected_entities <= MaxNumConnectedEntities);

        // Get the node indices
        for (size_t i = 0; i < num_connected_entities; ++i) {
            connected_indices[i] = aperi::Index(m_ngp_mesh.fast_mesh_index(connected_entities[i]));
        }

        return num_connected_entities;
    }

    template <size_t MaxNumConnectedEntities>
    KOKKOS_INLINE_FUNCTION
        size_t
        GetElementFaces(const aperi::Index &element_index, Kokkos::Array<aperi::Index, MaxNumConnectedEntities> &face_indices) const {
        return GetConnectedEntities<stk::topology::ELEMENT_RANK, stk::topology::FACE_RANK, MaxNumConnectedEntities>(element_index(), face_indices);
    }

    template <size_t MaxNumConnectedEntities>
    KOKKOS_INLINE_FUNCTION
        size_t
        GetElementNodes(const aperi::Index &element_index, Kokkos::Array<aperi::Index, MaxNumConnectedEntities> &node_indices) const {
        return GetConnectedEntities<stk::topology::ELEMENT_RANK, stk::topology::NODE_RANK, MaxNumConnectedEntities>(element_index(), node_indices);
    }

    template <size_t MaxNumConnectedEntities>
    KOKKOS_INLINE_FUNCTION
        size_t
        GetFaceNodes(const aperi::Index &face_index, Kokkos::Array<aperi::Index, MaxNumConnectedEntities> &node_indices) const {
        return GetConnectedEntities<stk::topology::FACE_RANK, stk::topology::NODE_RANK, MaxNumConnectedEntities>(face_index(), node_indices);
    }

    template <size_t MaxNumConnectedEntities>
    KOKKOS_INLINE_FUNCTION
        size_t
        GetFaceElements(const aperi::Index &face_index, Kokkos::Array<aperi::Index, MaxNumConnectedEntities> &element_indices) const {
        return GetConnectedEntities<stk::topology::FACE_RANK, stk::topology::ELEMENT_RANK, MaxNumConnectedEntities>(face_index(), element_indices);
    }

    template <size_t MaxNumConnectedEntities>
    KOKKOS_INLINE_FUNCTION
        size_t
        GetNodeElements(const aperi::Index &node_index, Kokkos::Array<aperi::Index, MaxNumConnectedEntities> &element_indices) const {
        return GetConnectedEntities<stk::topology::NODE_RANK, stk::topology::ELEMENT_RANK, MaxNumConnectedEntities>(node_index(), element_indices);
    }

    template <size_t MaxNumConnectedEntities>
    KOKKOS_INLINE_FUNCTION
        size_t
        GetNodeFaces(const aperi::Index &node_index, Kokkos::Array<aperi::Index, MaxNumConnectedEntities> &face_indices) const {
        return GetConnectedEntities<stk::topology::NODE_RANK, stk::topology::FACE_RANK, MaxNumConnectedEntities>(node_index(), face_indices);
    }

    template <stk::mesh::EntityRank EntityType, stk::mesh::EntityRank ConnectedType, size_t MaxNumConnectedEntities, typename ActionFunc>
    void ForEachEntityAndConnected(ActionFunc &action_func) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        auto func = action_func;

        stk::mesh::for_each_entity_run(
            m_ngp_mesh, EntityType, m_owned_selector,
            KOKKOS_CLASS_LAMBDA(const stk::mesh::FastMeshIndex &entity_index) {
                // Get the entities of the element
                Kokkos::Array<aperi::Index, MaxNumConnectedEntities> connected_indices;
                size_t num_connected_entities = this->GetConnectedEntities<EntityType, ConnectedType, MaxNumConnectedEntities>(entity_index, connected_indices);

                // Call the action function
                func(aperi::Index(entity_index), connected_indices, num_connected_entities);
            });
    }

    template <size_t MaxNumConnectedEntities, typename ActionFunc>
    void ForEachElementAndConnectedNodes(ActionFunc &action_func) {
        ForEachEntityAndConnected<stk::topology::ELEMENT_RANK, stk::topology::NODE_RANK, MaxNumConnectedEntities>(action_func);
    }

    template <size_t MaxNumConnectedEntities, typename ActionFunc>
    void ForEachElementAndConnectedFaces(ActionFunc &action_func) {
        ForEachEntityAndConnected<stk::topology::ELEMENT_RANK, stk::topology::FACE_RANK, MaxNumConnectedEntities>(action_func);
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

}  // namespace aperi