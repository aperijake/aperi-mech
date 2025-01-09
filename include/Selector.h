#pragma once

#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief A structure representing a selector in a mesh.
 *
 * This structure encapsulates a selector of type `stk::mesh::Selector` and provides
 * constructors and an operator to access the encapsulated selector.
 */
struct Selector {
    /**
     * @brief Constructor that initializes the selector with a given value.
     *
     * @param selector The selector to initialize with.
     */
    Selector(const stk::mesh::Selector &selector) : m_selector(selector) {}

    /**
     * @brief Default constructor that initializes the selector with a default value.
     */
    Selector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data) {
        stk::mesh::MetaData *meta_data = mesh_data->GetMetaData();
        m_selector = StkGetSelector(sets, meta_data);
    }

    /**
     * @brief Operator to access the encapsulated selector.
     *
     * @return The encapsulated `stk::mesh::Selector`.
     */
    stk::mesh::Selector operator()() const {
        return m_selector;
    }

   private:
    stk::mesh::Selector m_selector;  ///< The encapsulated selector.
};

}  // namespace aperi