#pragma once

#include <Kokkos_Core.hpp>
#include <cstdint>
#include <numeric>
#include <utility>

#include "FlattenedRaggedArray.h"

namespace aperi {

template <typename T>
class FlattenedRaggedArrayData {
   public:
    /**
     * @brief Default constructor.
     * Initializes the flattened ragged array data with zero items and an invalid value.
     */
    FlattenedRaggedArrayData() : m_num_items(0), m_invalid_value(T()), m_flattened_array_indices(0) {
        m_flattened_data = Kokkos::View<T *>("flattened_data", 0);
    }

    /**
     * @brief Constructs a FlattenedRaggedArrayData object.
     *
     * @param num_items The number of items.
     * @param invalid_value The invalid (default) value for the flattened data used to find empty slots.
     */
    FlattenedRaggedArrayData(size_t num_items, T invalid_value)
        : m_num_items(num_items),
          m_invalid_value(invalid_value),
          m_flattened_array_indices(num_items),
          m_flattened_data("flattened_data", 0) {}

    // Return the AddNumItemsFunctor. Call this in a kokkos parallel for loop.
    aperi::FlattenedRaggedArray::AddNumItemsFunctor GetAddNumItemsFunctor() {
        return m_flattened_array_indices.GetAddNumItemsFunctor();
    }

    // Should be called after lengths has been set for all items and should not be called in a loop.
    void CompleteAddingNumItems() {
        // Finish populating the flattened ragged array indices
        m_flattened_array_indices.FinishPopulatingOnDevice();

        // Resize the data view
        Kokkos::resize(m_flattened_data, m_flattened_array_indices.RaggedArraySize());
        Kokkos::deep_copy(m_flattened_data, m_invalid_value);
    }

    // Return the AddItemsFunctor. Call this in a kokkos parallel for loop.
    aperi::FlattenedRaggedArray::AddItemsFunctor<T> GetAddItemsFunctor() {
        return m_flattened_array_indices.GetAddItemsFunctor(m_flattened_data, m_invalid_value);
    }

    // Complete adding items to the flattened array.
    void CompleteAddingItems() {
        // Copy the flattened data to the host
        m_flattened_data_host = Kokkos::create_mirror_view(m_flattened_data);
        Kokkos::deep_copy(m_flattened_data_host, m_flattened_data);
    }

    // Get the data for an item in the flattened array
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<T *> GetData(size_t item) const {
        size_t start = m_flattened_array_indices.start(item);
        size_t length = m_flattened_array_indices.length(item);
        return Kokkos::subview(m_flattened_data, Kokkos::make_pair(start, start + length));
    }

    // Get the data for an item in the flattened array on the host
    typename Kokkos::View<T *>::HostMirror GetDataHost(size_t item) const {
        size_t start = m_flattened_array_indices.start_host(item);
        size_t length = m_flattened_array_indices.length_host(item);
        return Kokkos::subview(m_flattened_data_host, Kokkos::make_pair(start, start + length));
    }

    // Get a reference to the flattened array indices
    aperi::FlattenedRaggedArray &GetFlattenedArrayIndices() {
        return m_flattened_array_indices;
    }

   private:
    size_t m_num_items;  // The number of items
    T m_invalid_value;   // The invalid (default) value for the flattened data used to find empty slots

    aperi::FlattenedRaggedArray m_flattened_array_indices;         // Indices for the flattened array
    Kokkos::View<T *> m_flattened_data;                            // The flattened data view
    typename Kokkos::View<T *>::HostMirror m_flattened_data_host;  // Host mirror view of the flattened data
};

}  // namespace aperi
