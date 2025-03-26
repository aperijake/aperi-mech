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

template <size_t NumEntities>
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

    bool CheckNumEntities(size_t max_allowed_entities) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        auto ngp_mesh = m_ngp_mesh;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the entites of the element
                stk::mesh::NgpMesh::ConnectedEntities entities = ngp_mesh.get_connected_entities(stk::topology::ELEM_RANK, elem_index, stk::topology::NODE_RANK);
                size_t num_entities = entities.size();

                if (num_entities > NumEntities) {
                    Kokkos::abort("Error: num_entities > max_allowed_entities");
                }
            });

        return true;
    }

    template <stk::mesh::EntityRank EntityType, stk::mesh::EntityRank ConnectedType, typename ActionFunc>
    void ForEachEntityAndConnected(ActionFunc &action_func) {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        auto ngp_mesh = m_ngp_mesh;

        auto func = action_func;

        assert(CheckNumEntities(NumEntities));

        stk::mesh::for_each_entity_run(
            ngp_mesh, EntityType, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity_index) {
                // Get the entities of the element
                stk::mesh::NgpMesh::ConnectedEntities connected_entities = ngp_mesh.get_connected_entities(EntityType, entity_index, ConnectedType);
                size_t num_connected_entities = connected_entities.size();

                // Allocate for the connected indices
                Kokkos::Array<aperi::Index, NumEntities> connected_indices;

                // Get the node indices
                for (size_t i = 0; i < num_connected_entities; ++i) {
                    connected_indices[i] = aperi::Index(ngp_mesh.fast_mesh_index(connected_entities[i]));
                }

                // Call the action function
                func(aperi::Index(entity_index), connected_indices, num_connected_entities);
            });
    }

    template <typename ActionFunc>
    void ForEachElementAndNodes(ActionFunc &action_func) {
        ForEachEntityAndConnected<stk::topology::ELEMENT_RANK, stk::topology::NODE_RANK>(action_func);
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