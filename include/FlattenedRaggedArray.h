#pragma once

#include <Kokkos_Core.hpp>
#include <cstdint>

namespace aperi {

struct FlattenedRaggedArray {
    explicit FlattenedRaggedArray(size_t num_items_in) : num_items(num_items_in) {
        start = Kokkos::View<uint64_t *>("start", num_items);
        length = Kokkos::View<uint64_t *>("length", num_items);
        Kokkos::deep_copy(start, 0);
        Kokkos::deep_copy(length, 0);

        start_host = Kokkos::create_mirror_view(start);
        length_host = Kokkos::create_mirror_view(length);
    }

    // Copy the start and length to the host and set the ragged array size. Conditionally set the starts from the lengths.
    void FinishPopulatingOnDevice(bool set_starts_from_lengths = true) {
        if (set_starts_from_lengths) {
            // Set the start from the length
            const auto &length_ref = this->length;
            const auto &start_ref = this->start;
            Kokkos::parallel_scan(
                "FinishPopulatingOnDevice", length_ref.size(), KOKKOS_LAMBDA(const int i, uint64_t &update, const bool final) {
                    update += length_ref(i);
                    if (final) {
                        start_ref(i) = update - length_ref(i);
                    }
                });
        }

        // Copy the start and length to the host
        Kokkos::deep_copy(start_host, start);
        Kokkos::deep_copy(length_host, length);

        // Set the ragged array size to the last start + length
        ragged_array_size = start_host(num_items - 1) + length_host(num_items - 1);
    }

    // Copy the start and length to the device and set the ragged array size. Conditionally set the starts from the lengths.
    void FinishPopulatingOnHost(bool set_starts_from_lengths = true) {
        if (set_starts_from_lengths) {
            // Set the start from the length
            start_host(0) = 0;
            for (size_t i = 1; i < num_items; ++i) {
                start_host(i) = start_host(i - 1) + length_host(i - 1);
            }
        }
        // Copy the start and length to the device
        Kokkos::deep_copy(start, start_host);
        Kokkos::deep_copy(length, length_host);

        // Set the ragged array size to the last start + length
        ragged_array_size = start_host(num_items - 1) + length_host(num_items - 1);
    }

    // Get the size of the ragged array
    uint64_t RaggedArraySize() const {
        return ragged_array_size;
    }

    // Get device view of start.
    const Kokkos::View<uint64_t *> &GetStartView() const {
        return start;
    }

    // Get device view of length.
    const Kokkos::View<uint64_t *> &GetLengthView() const {
        return length;
    }

    // Get host view of start.
    Kokkos::View<uint64_t *>::HostMirror GetStartViewHost() const {
        return start_host;
    }

    // Get host view of length.
    Kokkos::View<uint64_t *>::HostMirror GetLengthViewHost() const {
        return length_host;
    }

    // Functor to add an item to a view for a ragged array
    template <typename ItemType>
    struct AddItemsFunctor {
        Kokkos::View<uint64_t *> start_view;
        Kokkos::View<uint64_t *> length_view;
        Kokkos::View<ItemType *> item_view;
        ItemType expected;

        AddItemsFunctor(Kokkos::View<uint64_t *> start_view_in, Kokkos::View<uint64_t *> length_view_in, Kokkos::View<ItemType *> item_view_in, ItemType expected_in)
            : start_view(start_view_in), length_view(length_view_in), item_view(item_view_in), expected(expected_in) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &item_id, const ItemType &item) const {
            // Get the start and length for the item
            uint64_t start = start_view(item_id);
            uint64_t length = length_view(item_id);
            uint64_t end = start + length;

            // Find the first slot that is the maximum uint value
            bool found = false;
            for (size_t i = start; i <= end; i++) {
                if (Kokkos::atomic_compare_exchange(&item_view(i), expected, item) == expected) {
                    found = true;
                    break;
                }
            }
            // Throw with kokkos if not found
            if (!found) {
                Kokkos::abort("Could not find an empty slot to add the item to the ragged array.");
            }
        }
    };

    // Functor to add to the number of items
    struct AddNumItemsFunctor {
        Kokkos::View<uint64_t *> length;

        explicit AddNumItemsFunctor(Kokkos::View<uint64_t *> length_in) : length(length_in) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &item_index, const size_t &num_items) const {
            // Add the num_times to the existing length
            Kokkos::atomic_add(&length(item_index), num_items);
        }
    };

    // Get an AddItemsFunctor
    template <typename ItemType>
    AddItemsFunctor<ItemType> GetAddItemsFunctor(Kokkos::View<ItemType *> item_view, ItemType expected) {
        return AddItemsFunctor<ItemType>(start, length, item_view, expected);
    }

    // Get an AddNumItemsFunctor
    AddNumItemsFunctor GetAddNumItemsFunctor() const {
        return AddNumItemsFunctor(length);
    }

    size_t num_items;                                  // Number of items with value in the ragged array
    uint64_t ragged_array_size{0};                     // Total number of elements in the ragged array
    Kokkos::View<uint64_t *> start;                    // Start indices for each item in the ragged array
    Kokkos::View<uint64_t *> length;                   // Length of each item in the ragged array
    Kokkos::View<uint64_t *>::HostMirror start_host;   // Host view of start
    Kokkos::View<uint64_t *>::HostMirror length_host;  // Host view of length
};

}  // namespace aperi
