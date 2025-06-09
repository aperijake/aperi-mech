#pragma once

#include <memory>
#include <stk_mesh/base/NgpFieldBLAS.hpp>
#include <vector>

#include "Field.h"
#include "ForEachEntity.h"
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
 * @brief Compute z = ax + by for fields.
 * @param a The scalar a.
 * @param x The field x.
 * @param b The scalar b.
 * @param y The field y.
 * @param z The field z.
 * @param selector The selector for the field.
 */
template <typename T>
void AXPBYZField(const T &a, const Field<T> &x, const T &b, const Field<T> &y, Field<T> &z, const aperi::Selector &selector) {
    // Fields cannot be the same
    assert(x != y && x != z && y != z);
    // Get the bulk data
    const stk::mesh::BulkData &bulk_data = *x.GetMeshData()->GetBulkData();
    stk::mesh::field_axpbyz(bulk_data, a, *x.GetField(), b, *y.GetField(), *z.GetField(), selector(), stk::ngp::ExecSpace());
}

/**
 * @brief Compute z = ax + by for fields.
 * @param a The scalar a.
 * @param x The field x.
 * @param b The scalar b.
 * @param y The field y.
 * @param z The field z.
 * @param sets The sets used to get the selector.
 */
template <typename T>
void AXPBYZField(const T &a, const Field<T> &x, const T &b, const Field<T> &y, Field<T> &z, std::vector<std::string> sets = {}) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = x.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Compute the field
    AXPBYZField(a, x, b, y, z, selector);
}

/**
 * @brief Swap the values of two fields.
 * @param x The field x.
 * @param y The field y.
 */
template <typename T>
void SwapFields(const Field<T> &x, const Field<T> &y) {
    // Get the bulk data
    const stk::mesh::BulkData &bulk_data = *x.GetMeshData()->GetBulkData();
    stk::mesh::field_swap(bulk_data, *x.GetField(), *y.GetField(), stk::ngp::ExecSpace());
}

template <typename T>
struct AddValueFunctor {
    double m_value;           // The value to add
    aperi::Field<T> m_field;  // The field to add the value to

    // Constructor to initialize the value and field
    AddValueFunctor(double value, const aperi::Field<T> &field)
        : m_value(value), m_field(field) {}

    // Kokkos functor to add the value to the field
    KOKKOS_FUNCTION void operator()(const aperi::Index &index) const {
        // Get the number of components in the field
        const size_t num_components = m_field.GetNumComponentsPerEntity(index);

        // Add the value to the field
        for (size_t i = 0; i < num_components; ++i) {
            m_field(index, i) += m_value;
        }
    }
};

/**
 * @brief Add the value to the field.
 * @tparam T The type of the field.
 * @param field The field to add the value to.
 * @param value The value to add to the field.
 * @param selector The selector for the field.
 * @return None.
 */
template <typename T>
void AddValue(const Field<T> &field, const double &value, const aperi::Selector &selector) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();
    // Create the functor
    AddValueFunctor<T> add_value_functor(value, field);
    // Loop over the nodes and add the value
    ForEachNode(add_value_functor, *mesh_data, selector);
}

/**
 * @brief Add the value to the field.
 * @tparam T The type of the field.
 * @param field The field to add the value to.
 * @param value The value to add to the field.
 * @param sets The sets used to get the selector.
 * @return None.
 */
template <typename T>
void AddValue(const Field<T> &field, const double &value, const std::vector<std::string> &sets) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Create the functor
    AddValueFunctor<T> add_value_functor(value, field);

    // Loop over the nodes and add the value
    ForEachNode(add_value_functor, *mesh_data, selector);
}

}  // namespace aperi