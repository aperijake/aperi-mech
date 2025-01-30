#pragma once

#include <memory>
#include <vector>

#include "Field.h"
#include "ForEachEntity.h"
#include "Selector.h"

namespace aperi {

// Functor to copy a field
// TODO(jake): Perhaps there is a more direct way to copy the field data than looping over each entity
template <typename T>
struct CopyAperiFieldFunctor {
    CopyAperiFieldFunctor(const aperi::Field<T> &src_field, aperi::Field<T> &dest_field)
        : m_src_field(src_field), m_dest_field(dest_field) {}

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Get the number of components
        const size_t num_components = m_src_field.GetNumComponentsPerEntity(index);
        KOKKOS_ASSERT(num_components == m_dest_field.GetNumComponentsPerEntity(index));
        // Loop over each component and copy the data
        for (size_t i = 0; i < num_components; ++i) {
            m_dest_field(index, i) = m_src_field(index, i);
        }
    }

   private:
    aperi::Field<T> m_src_field;
    mutable aperi::Field<T> m_dest_field;
};

template <typename T>
void CopyField(const Field<T> &src, Field<T> &dest, const aperi::Selector &selector) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = src.GetMeshData();

    // Create the copy functor
    CopyAperiFieldFunctor<T> copy_func(src, dest);

    // Loop over each entity and copy the field data
    ForEachNode(copy_func, *mesh_data, selector);
}

template <typename T>
void CopyField(const Field<T> &src, Field<T> &dest, std::vector<std::string> sets = {}) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = src.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Copy the field
    CopyField(src, dest, selector);
}

// Functor to fill a field with a constant value
template <typename T>
struct FillAperiFieldFunctor {
    FillAperiFieldFunctor(aperi::Field<T> &field, const T &value)
        : m_field(field), m_value(value) {}

    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Get the number of components
        const size_t num_components = m_field.GetNumComponentsPerEntity(index);
        // Loop over each component and fill the data
        for (size_t i = 0; i < num_components; ++i) {
            m_field(index, i) = m_value;
        }
    }

   private:
    mutable aperi::Field<T> m_field;
    const T m_value;
};

template <typename T>
void Fill(Field<T> &field, const T &value, const aperi::Selector &selector) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();

    // Create the fill functor
    FillAperiFieldFunctor<T> fill_func(field, value);

    // Loop over each entity and fill the field data
    ForEachNode(fill_func, *mesh_data, selector);
}

template <typename T>
void Fill(Field<T> &field, const T &value, std::vector<std::string> sets = {}) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = field.GetMeshData();

    // Get the selector
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Fill the field
    Fill(field, value, selector);
}

// Fill a field with zeros
template <typename T>
void Zero(Field<T> &field, const aperi::Selector &selector) {
    Fill(field, static_cast<T>(0), selector);
}

template <typename T>
void Zero(Field<T> &field, std::vector<std::string> sets = {}) {
    FillField(field, static_cast<T>(0), sets);
}

}  // namespace aperi