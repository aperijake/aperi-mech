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
void CopyField(const Field<T> &src, Field<T> &dest) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = src.GetMeshData();

    // Get the selector, universal part
    std::vector<std::string> sets = {};
    aperi::Selector selector = aperi::Selector(sets, mesh_data.get());

    // Create the copy functor
    CopyAperiFieldFunctor<T> copy_func(src, dest);

    // Loop over each entity and copy the field data
    ForEachNode(copy_func, *mesh_data, selector);
}

}  // namespace aperi