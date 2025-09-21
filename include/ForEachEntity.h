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

/**
 * @brief Internal implementation details for ForEachEntity utilities.
 * Not intended for public use. Use the ForEachNode, ForEachElement, and ForEachFace functions instead.
 */
namespace detail {

/**
 * @brief Loop over each entity of a given rank and apply the provided function.
 *
 * @tparam Rank The entity rank (e.g., NODE_RANK, ELEMENT_RANK, etc.)
 * @tparam Func The type of the function to apply.
 * @param func The function to apply to each entity.
 * @param mesh_data The mesh data object.
 * @param selector The selector to filter entities.
 */
template <stk::topology::rank_t Rank, typename Func>
void ForEachEntity(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    // Get the stk selector from the aperi selector
    stk::mesh::Selector stk_selector = selector();

    // Get the device mesh (NgpMesh) from the bulk data
    stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*mesh_data.GetBulkData());

    // Loop over all entities of the specified rank and selector, applying func
    stk::mesh::for_each_entity_run(
        ngp_mesh, Rank, stk_selector,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
            // Wrap the entity index in an aperi::Index
            aperi::Index index = aperi::Index(entity);

            // Call the user-provided function
            func(index);
        });
}

/**
 * @brief Loop over each entity of a given rank and apply the provided function, using cached bucket IDs.
 *
 * @tparam Rank The entity rank.
 * @tparam Func The type of the function to apply.
 * @param func The function to apply to each entity.
 * @param mesh_data The mesh data object.
 * @param bucketIds The vector of bucket IDs to use for iteration.
 */
template <stk::topology::rank_t Rank, typename Func>
void ForEachEntity(const Func &func, const aperi::MeshData &mesh_data, stk::NgpVector<unsigned> bucketIds) {
    // Get the device mesh (NgpMesh) from the bulk data
    stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*mesh_data.GetBulkData());

    // Loop over all entities in the specified buckets, applying func
    stk::mesh::for_each_entity_run(
        ngp_mesh, Rank, bucketIds,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &entity) {
            // Wrap the entity index in an aperi::Index
            aperi::Index index = aperi::Index(entity);

            // Call the user-provided function
            func(index);
        },
        stk::ngp::ExecSpace());
}
}  // namespace detail

/**
 * @brief Specialization for looping over all nodes and applying a function.
 *
 * @tparam Func The type of the function to apply.
 * @param func The function to apply to each node.
 * @param mesh_data The mesh data object.
 * @param selector The selector to filter nodes.
 */
template <typename Func>
void ForEachNode(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    detail::ForEachEntity<stk::topology::NODE_RANK>(func, mesh_data, selector);
}

/**
 * @brief Specialization for looping over all elements and applying a function.
 *
 * @tparam Func The type of the function to apply.
 * @param func The function to apply to each element.
 * @param mesh_data The mesh data object.
 * @param selector The selector to filter elements.
 */
template <typename Func>
void ForEachElement(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    detail::ForEachEntity<stk::topology::ELEMENT_RANK>(func, mesh_data, selector);
}

/**
 * @brief Specialization for looping over all faces and applying a function.
 *
 * @tparam Func The type of the function to apply.
 * @param func The function to apply to each face.
 * @param mesh_data The mesh data object.
 * @param selector The selector to filter faces.
 */
template <typename Func>
void ForEachFace(const Func &func, const aperi::MeshData &mesh_data, const aperi::Selector &selector) {
    detail::ForEachEntity<stk::topology::FACE_RANK>(func, mesh_data, selector);
}

/**
 * @brief A class to handle entity iteration with caching of the bucket IDs for performance.
 *
 * @note This class is for internal use only. Users should use ForEachNodeWithCaching,
 * ForEachElementWithCaching, or ForEachFaceWithCaching instead of creating this class directly.
 *
 * This class is designed to reduce the overhead of repeatedly querying the mesh for bucket IDs
 * by caching them and updating only when necessary.
 *
 * @tparam Rank The rank of the entity (NODE_RANK, ELEMENT_RANK, FACE_RANK).
 */
template <stk::topology::rank_t Rank>
struct ForEachEntityWithCaching {
    std::shared_ptr<aperi::MeshData> mp_mesh_data;  ///< Pointer to the mesh data
    aperi::Selector m_selector;                     ///< Selector for active sets
    stk::NgpVector<unsigned> m_bucket_ids;          ///< Cached bucket IDs for the selected entities
    size_t m_sync_count;                            ///< Last synchronization count for the mesh

    /**
     * @brief Default constructor.
     * Leaves the object in an uninitialized state. You must initialize mp_mesh_data and m_selector later.
     */
    ForEachEntityWithCaching() : mp_mesh_data(nullptr), m_selector(), m_bucket_ids(), m_sync_count(0) {}

    /**
     * @brief Constructor.
     *
     * @param mesh_data Shared pointer to mesh data.
     * @param selector Selector for entities.
     * @note This constructor is for internal use only.
     */
    ForEachEntityWithCaching(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector)
        : mp_mesh_data(mesh_data), m_selector(selector), m_bucket_ids(), m_sync_count(0) {
        if (!mp_mesh_data) {
            throw std::runtime_error("Mesh data is null.");
        }
    }

    /**
     * @brief Update the cached bucket IDs if the mesh has changed.
     */
    void UpdateBucketIds() {
        stk::mesh::BulkData *bulk_data = mp_mesh_data->GetBulkData();
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*bulk_data);
        m_bucket_ids = ngp_mesh.get_bucket_ids(Rank, m_selector());
        m_sync_count = bulk_data->synchronized_count();
    }
};

/**
 * @brief Specialization for node iteration with caching.
 */
struct ForEachNodeWithCaching : public ForEachEntityWithCaching<stk::topology::NODE_RANK> {
    using ForEachEntityWithCaching<stk::topology::NODE_RANK>::ForEachEntityWithCaching;

    /**
     * @brief Loop over all nodes and apply the provided function, using cached bucket IDs.
     *
     * @tparam Func The type of the function to apply.
     * @param func The function to apply to each node.
     */
    template <typename Func>
    void ForEachNode(const Func &func) {
        // Update bucket IDs if the mesh has changed since last sync
        if (this->m_sync_count < this->mp_mesh_data->GetBulkData()->synchronized_count()) {
            this->UpdateBucketIds();
        }
        detail::ForEachEntity<stk::topology::NODE_RANK>(func, *this->mp_mesh_data, this->m_bucket_ids);
    }
};

/**
 * @brief Specialization for element iteration with caching.
 */
struct ForEachElementWithCaching : public ForEachEntityWithCaching<stk::topology::ELEMENT_RANK> {
    using ForEachEntityWithCaching<stk::topology::ELEMENT_RANK>::ForEachEntityWithCaching;

    /**
     * @brief Loop over all elements and apply the provided function, using cached bucket IDs.
     *
     * @tparam Func The type of the function to apply.
     * @param func The function to apply to each element.
     */
    template <typename Func>
    void ForEachElement(const Func &func) {
        // Update bucket IDs if the mesh has changed since last sync
        if (this->m_sync_count < this->mp_mesh_data->GetBulkData()->synchronized_count()) {
            this->UpdateBucketIds();
        }
        detail::ForEachEntity<stk::topology::ELEMENT_RANK>(func, *this->mp_mesh_data, this->m_bucket_ids);
    }
};

/**
 * @brief Specialization for face iteration with caching.
 */
struct ForEachFaceWithCaching : public ForEachEntityWithCaching<stk::topology::FACE_RANK> {
    using ForEachEntityWithCaching<stk::topology::FACE_RANK>::ForEachEntityWithCaching;

    /**
     * @brief Loop over all faces and apply the provided function, using cached bucket IDs.
     *
     * @tparam Func The type of the function to apply.
     * @param func The function to apply to each face.
     */
    template <typename Func>
    void ForEachFace(const Func &func) {
        // Update bucket IDs if the mesh has changed since last sync
        if (this->m_sync_count < this->mp_mesh_data->GetBulkData()->synchronized_count()) {
            this->UpdateBucketIds();
        }
        detail::ForEachEntity<stk::topology::FACE_RANK>(func, *this->mp_mesh_data, this->m_bucket_ids);
    }
};

}  // namespace aperi