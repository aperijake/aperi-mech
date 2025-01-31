#pragma once

#include <memory>
#include <stk_mesh/base/NgpFieldBLAS.hpp>
#include <vector>

#include "Field.h"
#include "Selector.h"

namespace aperi {

/**
 * @brief Copy a field from one field to another.
 * @param src The source field.
 * @param dest The destination field.
 * @param selector The selector for the field.
 */
template <typename T>
void CopyField(const Field<T> &src, Field<T> &dest, const aperi::Selector &selector) {
    stk::mesh::field_copy(*src.GetField(), *dest.GetField(), selector(), stk::ngp::ExecSpace());
}

/**
 * @brief Copy a field from one field to another.
 * @param src The source field.
 * @param dest The destination field.
 * @param sets The sets used to get the selector.
 */
template <typename T>
void CopyField(const Field<T> &src, Field<T> &dest, std::vector<std::string> sets = {}) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = src.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Copy the field
    CopyField(src, dest, selector);
}

}  // namespace aperi