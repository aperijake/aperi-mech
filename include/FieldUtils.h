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

/**
 * @brief Fill a field with a value.
 * @param field The field to fill.
 * @param value The value to fill the field with.
 * @param selector The selector for the field.
 */
template <typename T>
void Fill(Field<T> &field, const T &value, const aperi::Selector &selector) {
    stk::mesh::field_fill(value, *field.GetField(), selector(), stk::ngp::ExecSpace());
}

/**
 * @brief Fill a field with a value.
 * @param field The field to fill.
 * @param value The value to fill the field with.
 * @param sets The sets used to get the selector.
 */
template <typename T>
void Fill(Field<T> &field, const T &value, std::vector<std::string> sets = {}) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Fill the field
    Fill(field, value, selector);
}

/**
 * @brief Zero a field.
 * @param field The field to zero.
 * @param selector The selector for the field.
 */
template <typename T>
void Zero(Field<T> &field, const aperi::Selector &selector) {
    Fill(field, static_cast<T>(0), selector);
}

/**
 * @brief Zero a field.
 * @param field The field to zero.
 * @param sets The sets used to get the selector.
 */
template <typename T>
void Zero(Field<T> &field, std::vector<std::string> sets = {}) {
    Fill(field, static_cast<T>(0), sets);
}

}  // namespace aperi