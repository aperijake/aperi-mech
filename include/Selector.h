#pragma once

#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <vector>

#include "AperiStkUtils.h"

namespace aperi {

// Forward declaration for MeshData
class MeshData;

/**
 * @brief Enum for specifying selector ownership filtering.
 */
enum class SelectorOwnership {
    ALL,              ///< All entities (no ownership filtering)
    OWNED,            ///< Only locally owned entities
    SHARED,           ///< Only shared entities
    OWNED_OR_SHARED,  ///< Locally owned or shared entities
    OWNED_AND_SHARED  ///< Entities that are both owned and shared
};

/**
 * @brief A structure representing a selector in a mesh.
 *
 * This structure encapsulates a selector of type `stk::mesh::Selector` and provides
 * constructors and utility methods for mesh entity selection and counting.
 */
struct Selector {
    /**
     * @brief Default constructor that initializes the selector with a default value.
     */
    Selector();

    /**
     * @brief Construct from an existing stk::mesh::Selector and optional ownership mask.
     * @param selector The selector to initialize with.
     * @param ownership Ownership mask to apply (default: ALL).
     */
    Selector(const stk::mesh::Selector &selector, SelectorOwnership ownership = SelectorOwnership::ALL);

    /**
     * @brief Construct from a list of part names and a MeshData pointer.
     * @param sets List of part names to select.
     * @param mesh_data Pointer to MeshData for meta/bulk access.
     * @param ownership Ownership mask to apply (default: ALL).
     */
    Selector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data, SelectorOwnership ownership = SelectorOwnership::ALL);

    /**
     * @brief Get the encapsulated stk::mesh::Selector.
     * @return The encapsulated selector.
     */
    stk::mesh::Selector operator()() const;

    /**
     * @brief Get the ownership mask used by this selector.
     * @return The ownership mask.
     */
    SelectorOwnership GetOwnership() const;

    /**
     * @brief Get mesh entity counts for all entity ranks using this selector.
     * @return Vector of counts by rank.
     */
    std::vector<size_t> GetCommMeshCounts() const;

    /**
     * @brief Get the number of nodes selected (global count).
     */
    size_t GetNumNodes() const;

    /**
     * @brief Get the number of nodes selected (local to this rank).
     */
    size_t GetNumLocalNodes() const;

    /**
     * @brief Get the number of elements selected (global count).
     */
    size_t GetNumElements() const;

    /**
     * @brief Get the number of elements selected (local to this rank).
     */
    size_t GetNumLocalElements() const;

    /**
     * @brief Get the number of faces selected (global count).
     */
    size_t GetNumFaces() const;

    /**
     * @brief Get the number of faces selected (local to this rank).
     */
    size_t GetNumLocalFaces() const;

   private:
    /**
     * @brief Get the number of entities of a given rank selected (local to this rank).
     * @param rank The entity rank.
     * @return The local entity count.
     */
    size_t GetLocalEntityCount(const stk::topology::rank_t rank) const;

    /**
     * @brief Apply the ownership mask to the selector.
     */
    void MaskUsingOwnership();

    /**
     * @brief Set the meta and bulk data pointers from the selector's parts.
     */
    void SetBulkAndMetaDataFromStkSelector();

    stk::mesh::Selector m_selector;    ///< The encapsulated selector.
    SelectorOwnership m_ownership;     ///< The ownership of the selector.
    stk::mesh::MetaData *m_meta_data;  ///< The mesh metadata.
    stk::mesh::BulkData *m_bulk_data;  ///< The mesh bulk data.
};

}  // namespace aperi