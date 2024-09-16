#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <cstdint>
#include <numeric>
#include <utility>
#include <vector>

namespace aperi {

struct FlattenedRaggedArray {
    explicit FlattenedRaggedArray(size_t num_items_in) : num_items(num_items_in) {
        start = Kokkos::View<uint64_t *>("start", num_items);
        length = Kokkos::View<uint64_t *>("length", num_items);
        ragged_array_size_view = Kokkos::View<uint64_t *>("ragged_array_size", 1);
        num_items_view = Kokkos::View<uint64_t *>("num_items", 1);

        // Copy the num_items to the device
        Kokkos::View<uint64_t *>::HostMirror num_items_view_host = Kokkos::create_mirror_view(num_items_view);
        num_items_view_host(0) = num_items;
        Kokkos::deep_copy(num_items_view, num_items_view_host);
    }

    // Functor to set the starts from the lengths
    void SetStartsFromLengths() {
        const auto &length_ref = this->length;
        const auto &start_ref = this->start;
        const auto &num_items_ref = this->num_items_view;
        const auto &ragged_array_size_ref = this->ragged_array_size_view;
        Kokkos::parallel_scan(
            "SetStartsFromLengths", length_ref.size(), KOKKOS_LAMBDA(const int i, uint64_t &update, const bool final) {
                update += length_ref(i);
                if (final) {
                    start_ref(i) = update - length_ref(i);
                    if (i == static_cast<int>(num_items_ref(0)) - 1) {
                        ragged_array_size_ref(0) = update;
                    }
                }
            });
        // Copy the ragged array size to the host
        Kokkos::View<uint64_t *>::HostMirror ragged_array_size_view_host = Kokkos::create_mirror_view(ragged_array_size_view);
        Kokkos::deep_copy(ragged_array_size_view_host, ragged_array_size_view);
        ragged_array_size = ragged_array_size_view_host(0);
    }

    // Get the size of the ragged array
    uint64_t RaggedArraySize() const {
        return ragged_array_size;
    }

    // Get host view with copy of start. Expecting this isn't used in performance critical code. If this changes we should store the host view as a member variable.
    Kokkos::View<uint64_t *>::HostMirror GetStartHost() const {
        // Create a host view
        Kokkos::View<uint64_t *>::HostMirror start_host = Kokkos::create_mirror_view(start);
        // Copy the start to the host
        Kokkos::deep_copy(start_host, start);
        return start_host;
    }

    // Get host view with copy of length. Expecting this isn't used in performance critical code. If this changes we should store the host view as a member variable.
    Kokkos::View<uint64_t *>::HostMirror GetLengthHost() const {
        // Create a host view
        Kokkos::View<uint64_t *>::HostMirror length_host = Kokkos::create_mirror_view(length);
        // Copy the length to the host
        Kokkos::deep_copy(length_host, length);
        return length_host;
    }

    size_t num_items;                                 // Number of items with value in the ragged array
    uint64_t ragged_array_size{0};                    // Total number of elements in the ragged array
    Kokkos::View<uint64_t *> start;                   // Start indices for each item in the ragged array
    Kokkos::View<uint64_t *> length;                  // Length of each item in the ragged array
    Kokkos::View<uint64_t *> num_items_view;          // Number of items in the ragged array, on the device
    Kokkos::View<uint64_t *> ragged_array_size_view;  // Total number of elements in the ragged array, on the device
};

class SmoothedCellData {
   public:
    SmoothedCellData(size_t num_cells, size_t estimated_total_num_nodes)
        : m_reserved_nodes(estimated_total_num_nodes), m_indices(num_cells), m_function_derivatives("function_derivatives", 0), m_node_local_offsets("node_local_offsets", 0) {
        // Resize views
        ResizeViews(estimated_total_num_nodes);
        // Fill the new elements with the maximum uint64_t value
        InitializeLocalOffsets(0, estimated_total_num_nodes, m_node_local_offsets);
    }

    // Functor to add the number of nodes for each cell, use the getter GetAddCellNumNodesFunctor and call in a kokkos parallel for loop
    struct AddCellNumNodesFunctor {
        Kokkos::View<uint64_t *> length;

        explicit AddCellNumNodesFunctor(Kokkos::View<uint64_t *> length) : length(std::move(length)) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &cell_id, const size_t &num_nodes) const {
            // Add the length to the indices
            length(cell_id) = num_nodes;
        }
    };

    // Return the AddCellNumNodesFunctor using the member variable m_indices.length. Call this in a kokkos parallel for loop.
    AddCellNumNodesFunctor GetAddCellNumNodesFunctor() const {
        return AddCellNumNodesFunctor(m_indices.length);
    }

    // Populate the indices start. Should be called after AddCellNumNodesFunctor has been called for all cells and should not be called in a loop.
    void CompleteAddingCellIndices() {
        m_indices.SetStartsFromLengths();

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeViews(m_total_num_nodes);
    }

    // Functor to add an element to a cell, use the getter GetAddCellElementFunctor and call in a kokkos parallel for loop
    template <size_t NumNodes>
    struct AddCellElementFunctor {
        Kokkos::View<uint64_t *> start_view;
        Kokkos::View<uint64_t *> length_view;
        Kokkos::View<double *> function_derivatives_view;
        Kokkos::View<uint64_t *> node_local_offsets_view;

        AddCellElementFunctor(Kokkos::View<uint64_t *> start_view_in, Kokkos::View<uint64_t *> length_view_in, Kokkos::View<double *> function_derivatives_view_in, Kokkos::View<uint64_t *> node_local_offsets_view_in)
            : start_view(std::move(start_view_in)), length_view(std::move(length_view_in)), function_derivatives_view(std::move(function_derivatives_view_in)), node_local_offsets_view(std::move(node_local_offsets_view_in)) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &cell_id, const Eigen::Matrix<uint64_t, NumNodes, 1> &elem_node_local_offsets, const Eigen::Matrix<double, NumNodes, 3> &derivatives) const {
            // Get the start and length for the cell
            uint64_t start = start_view(cell_id);
            uint64_t length = length_view(cell_id);
            uint64_t end = start + length - 1;

            // Get the current number of nodes by finding the first element in the array that is the maximum uint64_t value
            size_t current_cell_num_nodes = 0;
            for (size_t j = start; j < end + 1; j++) {
                if (node_local_offsets_view(j) == UINT64_MAX) {
                    current_cell_num_nodes = j - start;
                    break;
                }
            }

            // See if the elem_node_local_offsets is already in the array, if not add it
            // TODO(jake): This is not efficient and should be improved
            for (size_t i = 0; i < NumNodes; i++) {
                bool found = false;
                size_t node_i = current_cell_num_nodes + start;
                for (size_t j = start; j < end + 1; j++) {
                    if (node_local_offsets_view(j) == elem_node_local_offsets(i)) {
                        found = true;
                        node_i = j;
                        break;
                    }
                }
                node_local_offsets_view(node_i) = elem_node_local_offsets(i);
                for (size_t j = 0; j < k_num_dims; j++) {
                    // Atomically add the derivatives to the function_derivatives
                    Kokkos::atomic_add(&function_derivatives_view(node_i * k_num_dims + j), derivatives(i, j));
                }
                if (!found) {
                    current_cell_num_nodes++;
                }
            }
        }
    };

    // Return the AddCellElementFunctor using the member variables m_indices.start, m_indices.length, m_function_derivatives, and m_node_local_offsets. Call this in a kokkos parallel for loop.
    template <size_t NumNodes>
    AddCellElementFunctor<NumNodes> GetAddCellElementFunctor() {
        return AddCellElementFunctor<NumNodes>(m_indices.start, m_indices.length, m_function_derivatives, m_node_local_offsets);
    }

    // Function to finalize and resize views. Should be called last and not in a loop.
    void Finalize() {
        ResizeViews(m_total_num_nodes);
    }

    // Get host view with copy of function derivatives
    Kokkos::View<double *>::HostMirror GetFunctionDerivativesHost() {
        // Create a host view
        Kokkos::View<double *>::HostMirror function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        // Copy the function derivatives to the host
        Kokkos::deep_copy(function_derivatives_host, m_function_derivatives);
        return function_derivatives_host;
    }

    // Get host view with copy of node local offsets
    Kokkos::View<uint64_t *>::HostMirror GetNodeLocalOffsetsHost() {
        // Create a host view
        Kokkos::View<uint64_t *>::HostMirror node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);
        // Copy the node local offsets to the host
        Kokkos::deep_copy(node_local_offsets_host, m_node_local_offsets);
        return node_local_offsets_host;
    }

    // Get the total number of nodes
    size_t TotalNumNodes() const {
        return m_total_num_nodes;
    }

    // Get the total number of components
    size_t TotalNumComponents() const {
        return m_total_components;
    }

    // Function to resize views
    void ResizeViews(size_t new_total_num_nodes) {
        Kokkos::resize(m_function_derivatives, new_total_num_nodes * k_num_dims);
        Kokkos::resize(m_node_local_offsets, new_total_num_nodes);
        // Fill the new elements with the maximum uint64_t value
        InitializeLocalOffsets(m_reserved_nodes, new_total_num_nodes, m_node_local_offsets);
        m_reserved_nodes = new_total_num_nodes;
    }

    // Function to initialize the local offsets to the maximum uint64_t value
    static void InitializeLocalOffsets(const size_t start, const size_t stop, const Kokkos::View<uint64_t *> &node_local_offsets) {
        // No need to do anything if shrinking
        if (start >= stop) {
            return;
        }
        Kokkos::parallel_for(
            "FillNewLocalOffsets", Kokkos::RangePolicy<>(start, stop), KOKKOS_LAMBDA(const size_t i) {
                node_local_offsets(i) = UINT64_MAX;
            });
    }

   private:
    size_t m_reserved_nodes;                        // Estimated total number of nodes
    FlattenedRaggedArray m_indices;                 // Indices for the cells
    Kokkos::View<double *> m_function_derivatives;  // Function derivatives
    Kokkos::View<uint64_t *> m_node_local_offsets;  // Node local offsets
    size_t m_total_num_nodes = 0;                   // Total number of nodes
    size_t m_total_components = 0;                  // Total number of components (total number of nodes * number of dimensions)
    static constexpr size_t k_num_dims = 3;         // Number of dimensions
};

}  // namespace aperi