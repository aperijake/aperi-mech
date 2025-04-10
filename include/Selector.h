#pragma once

#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "MeshData.h"

namespace aperi {

enum class SelectorOwnership { ALL,
                               OWNED,
                               SHARED,
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
        MaskUsingOwnership();
    }

    /**
     * @brief Default constructor that initializes the selector with a default value.
     */
    Selector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data, SelectorOwnership ownership = SelectorOwnership::ALL) : m_ownership(ownership) {
        stk::mesh::MetaData *meta_data = mesh_data->GetMetaData();
        m_selector = StkGetSelector(sets, meta_data);
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

   private:
    void MaskUsingOwnership() {
        stk::mesh::PartVector parts;
        m_selector.get_parts(parts);
        assert(parts.size() > 0);
        stk::mesh::MetaData *meta_data = &parts[0]->mesh_meta_data();
        if (m_ownership == SelectorOwnership::OWNED) {
            m_selector &= meta_data->locally_owned_part();
        } else if (m_ownership == SelectorOwnership::SHARED) {
            m_selector &= meta_data->globally_shared_part();
        } else if (m_ownership == SelectorOwnership::OWNED_AND_SHARED) {
            m_selector &= (meta_data->globally_shared_part() | meta_data->locally_owned_part());
        }
    }

    stk::mesh::Selector m_selector;  ///< The encapsulated selector.
    SelectorOwnership m_ownership;   ///< The ownership of the selector.
};

}  // namespace aperi