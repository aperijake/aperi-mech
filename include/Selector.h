#pragma once

#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "MeshData.h"

namespace aperi {

enum class SelectorOwnership { ALL,
                               OWNED,
                               SHARED,
                               OWNED_OR_SHARED,
                               OWNED_AND_SHARED };

/**
 * @brief A structure representing a selector in a mesh.
 *
 * This structure encapsulates a selector of type `stk::mesh::Selector` and provides
 * constructors and an operator to access the encapsulated selector.
 */
struct Selector {
    /**
     * @brief Default constructor that initializes the selector with a default value.
     */
    Selector() : m_selector() {}

    /**
     * @brief Constructor that initializes the selector with a given value.
     *
     * @param selector The selector to initialize with.
     */
    Selector(const stk::mesh::Selector &selector, SelectorOwnership ownership = SelectorOwnership::ALL) : m_selector(selector), m_ownership(ownership) {
        SetBulkAndMetaDataFromStkSelector();
        MaskUsingOwnership();
    }

    /**
     * @brief Default constructor that initializes the selector with a default value.
     */
    Selector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data, SelectorOwnership ownership = SelectorOwnership::ALL) : m_ownership(ownership) {
        m_meta_data = mesh_data->GetMetaData();
        m_bulk_data = mesh_data->GetBulkData();
        m_selector = StkGetSelector(sets, m_meta_data);
        MaskUsingOwnership();
    }

    /**
     * @brief Operator to access the encapsulated selector.
     *
     * @return The encapsulated `stk::mesh::Selector`.
     */
    stk::mesh::Selector operator()() const {
        return m_selector;
    }

    /**
     * @brief Get the ownership of the selector.
     *
     * @return The ownership of the selector.
     */
    SelectorOwnership GetOwnership() const { return m_ownership; }

    std::vector<size_t> GetCommMeshCounts() const {
        std::vector<size_t> comm_mesh_counts;
        stk::mesh::comm_mesh_counts(*m_bulk_data, comm_mesh_counts, &m_selector);
        return comm_mesh_counts;
    }

    size_t GetNumNodes() const {
        return GetCommMeshCounts()[stk::topology::NODE_RANK];
    }

    size_t GetNumLocalNodes() const {
        return GetLocalEntityCount(stk::topology::NODE_RANK);
    }

    size_t GetNumElements() const {
        return GetCommMeshCounts()[stk::topology::ELEMENT_RANK];
    }

    size_t GetNumLocalElements() const {
        return GetLocalEntityCount(stk::topology::ELEMENT_RANK);
    }

    size_t GetNumFaces() const {
        return GetCommMeshCounts()[stk::topology::FACE_RANK];
    }

    size_t GetNumLocalFaces() const {
        return GetLocalEntityCount(stk::topology::FACE_RANK);
    }

   private:
    size_t GetLocalEntityCount(const stk::topology::rank_t rank) const {
        return stk::mesh::count_entities(*m_bulk_data, rank, m_selector);
    }

    void MaskUsingOwnership() {
        if (m_ownership == SelectorOwnership::OWNED) {
            m_selector &= m_meta_data->locally_owned_part();
        } else if (m_ownership == SelectorOwnership::SHARED) {
            m_selector &= m_meta_data->globally_shared_part();
        } else if (m_ownership == SelectorOwnership::OWNED_AND_SHARED) {
            m_selector &= m_meta_data->globally_shared_part() & m_meta_data->locally_owned_part();
        } else if (m_ownership == SelectorOwnership::OWNED_OR_SHARED) {
            m_selector &= (m_meta_data->globally_shared_part() | m_meta_data->locally_owned_part());
        }
    }

    void SetBulkAndMetaDataFromStkSelector() {
        stk::mesh::PartVector parts;
        m_selector.get_parts(parts);
        assert(parts.size() > 0);
        m_meta_data = &parts[0]->mesh_meta_data();
        m_bulk_data = &parts[0]->mesh_bulk_data();
    }

    stk::mesh::Selector m_selector;    ///< The encapsulated selector.
    SelectorOwnership m_ownership;     ///< The ownership of the selector.
    stk::mesh::MetaData *m_meta_data;  ///< The mesh metadata.
    stk::mesh::BulkData *m_bulk_data;  ///< The mesh bulk data.
};

}  // namespace aperi