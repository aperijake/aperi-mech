#pragma once

#include <Kokkos_Core.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>

#include "Index.h"
#include "MeshData.h"
#include "Selector.h"

namespace aperi {

// Loop over each entity and apply the function
template <stk::topology::rank_t Rank, typename Func>
void ForEachEntity(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    // Get the stk selector
    stk::mesh::Selector stk_selector = selector();

    // Get the ngp mesh
    stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*mesh_data.GetBulkData());

    // Loop over all the entities
    stk::mesh::for_each_entity_run(
        ngp_mesh, Rank, stk_selector,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
            // Create an aperi::Index
            aperi::Index index = aperi::Index(entity);

            // Call the function
            func(index);
        });
}

// Helper function for nodes
template <typename Func>
void ForEachNode(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    ForEachEntity<stk::topology::NODE_RANK>(func, mesh_data, selector);
}

// Helper function for elements
template <typename Func>
void ForEachElement(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    ForEachEntity<stk::topology::ELEMENT_RANK>(func, mesh_data, selector);
}

// Helper function for faces
template <typename Func>
void ForEachFace(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    ForEachEntity<stk::topology::FACE_RANK>(func, mesh_data, selector);
}

}  // namespace aperi