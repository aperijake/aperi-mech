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
    Index(const stk::mesh::FastMeshIndex& index) : m_index(index) {}

    /**
     * @brief Constructor that initializes the index with a bucket ID and bucket ordinal.
     *
     * @param bucket_id The bucket ID.
     * @param bucket_ord The bucket ordinal.
     */
    KOKKOS_FUNCTION
    Index(const unsigned bucket_id, const unsigned bucket_ord) : m_index({bucket_id, bucket_ord}) {}

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

    /**
     * @brief Get the bucket ID of the encapsulated index.
     *
     * @return The bucket ID.
     */
    KOKKOS_FUNCTION
    unsigned bucket_id() const {
        return m_index.bucket_id;
    }

    /**
     * @brief Get the bucket ordinal of the encapsulated index.
     *
     * @return The bucket ordinal.
     */
    KOKKOS_FUNCTION
    unsigned bucket_ord() const {
        return m_index.bucket_ord;
    }

    /**
     * @brief Overload the equality operator to compare two Index objects.
     *
     * @param lhs The left-hand side Index object.
     * @param rhs The right-hand side Index object.
     * @return True if the indices are equal, false otherwise.
     */
    friend KOKKOS_FUNCTION bool operator==(const Index& lhs, const Index& rhs) {
        return lhs.m_index == rhs.m_index;
    }

    /**
     * @brief Overload the stream insertion operator to print the Index.
     *
     * @param os The output stream.
     * @param index The Index object to print.
     * @return The output stream.
     */
    friend std::ostream& operator<<(std::ostream& os, const Index& index) {
        os << "(" << index.bucket_id() << ", " << index.bucket_ord() << ")";
        return os;
    }

   private:
    stk::mesh::FastMeshIndex m_index;  ///< The encapsulated index.
};

}  // namespace aperi