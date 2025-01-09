#pragma once

#include <stk_mesh/base/Types.hpp>

namespace aperi {

/**
 * @brief A structure representing an index in a mesh.
 *
 * This structure encapsulates an index of type `stk::mesh::FastMeshIndex` and provides
 * constructors and an operator to access the encapsulated index.
 */
struct Index {
    /**
     * @brief Constructor that initializes the index with a given value.
     *
     * @param index The index to initialize with.
     */
    KOKKOS_FUNCTION
    Index(const stk::mesh::FastMeshIndex &index) : m_index(index) {}

    /**
     * @brief Default constructor that initializes the index with a default value.
     */
    KOKKOS_FUNCTION
    Index() : m_index(stk::mesh::FastMeshIndex()) {}

    /**
     * @brief Operator to access the encapsulated index.
     *
     * @return The encapsulated `stk::mesh::FastMeshIndex`.
     */
    KOKKOS_FUNCTION
    stk::mesh::FastMeshIndex operator()() const {
        return m_index;
    }

   private:
    stk::mesh::FastMeshIndex m_index;  ///< The encapsulated index.
};

}  // namespace aperi