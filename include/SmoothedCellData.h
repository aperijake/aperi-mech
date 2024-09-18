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
        ragged_array_size = start(num_items - 1) + length(num_items - 1);
    }

    // Get the size of the ragged array
    uint64_t RaggedArraySize() const {
        return ragged_array_size;
    }

    // Get host view with copy of start.
    Kokkos::View<uint64_t *>::HostMirror GetStartHost() const {
        return start_host;
    }

    // Get host view with copy of length.
    Kokkos::View<uint64_t *>::HostMirror GetLengthHost() const {
        return length_host;
    }

    size_t num_items;                                  // Number of items with value in the ragged array
    uint64_t ragged_array_size{0};                     // Total number of elements in the ragged array
    Kokkos::View<uint64_t *> start;                    // Start indices for each item in the ragged array
    Kokkos::View<uint64_t *> length;                   // Length of each item in the ragged array
    Kokkos::View<uint64_t *>::HostMirror start_host;   // Host view with copy of start
    Kokkos::View<uint64_t *>::HostMirror length_host;  // Host view with copy of length
};

class SmoothedCellData {
   public:
    SmoothedCellData(size_t num_cells, size_t num_elements, size_t estimated_total_num_nodes)
        : m_num_cells(num_cells), m_reserved_nodes(estimated_total_num_nodes), m_node_indices(num_cells), m_element_indices(num_cells), m_element_local_offsets("element_local_offsets", num_elements), m_node_local_offsets("node_local_offsets", 0), m_function_derivatives("function_derivatives", 0) {
        // Resize views
        ResizeNodeViews(estimated_total_num_nodes);
        // Fill the new elements with the maximum uint64_t value
        Kokkos::deep_copy(m_node_local_offsets, UINT64_MAX);
        Kokkos::deep_copy(m_element_local_offsets, UINT64_MAX);

        // Create host views
        m_element_local_offsets_host = Kokkos::create_mirror_view(m_element_local_offsets);
        m_node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);

        // Fill the new elements with the maximum uint64_t value
        Kokkos::deep_copy(m_node_local_offsets_host, UINT64_MAX);
        Kokkos::deep_copy(m_element_local_offsets_host, UINT64_MAX);
    }

    // Function to resize views
    void ResizeNodeViews(size_t new_total_num_nodes) {
        // Resize the views
        Kokkos::resize(m_function_derivatives, new_total_num_nodes * k_num_dims);
        Kokkos::resize(m_node_local_offsets, new_total_num_nodes);

        // Create new host mirrors
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);

        // Fill the new elements with the maximum uint64_t value
        InitializeLocalOffsets(m_reserved_nodes, new_total_num_nodes, m_node_local_offsets);
        m_reserved_nodes = new_total_num_nodes;
    }

    // Function to resize the node views on host
    void ResizeNodeViewsOnHost(size_t new_total_num_nodes) {
        // TODO(jake): Figure out if there is a better way to do this that doesn't require all the copying.
        // Copy the existing data to the device
        Kokkos::deep_copy(m_function_derivatives, m_function_derivatives_host);
        Kokkos::deep_copy(m_node_local_offsets, m_node_local_offsets_host);

        // Resize the views
        Kokkos::resize(m_function_derivatives, new_total_num_nodes * k_num_dims);
        Kokkos::resize(m_node_local_offsets, new_total_num_nodes);

        // Create new host mirrors
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);

        // Fill the new elements with the maximum uint64_t value
        InitializeLocalOffsets(m_reserved_nodes, new_total_num_nodes, m_node_local_offsets);
        m_reserved_nodes = new_total_num_nodes;

        // Copy the new data to the host
        Kokkos::deep_copy(m_function_derivatives_host, m_function_derivatives);
        Kokkos::deep_copy(m_node_local_offsets_host, m_node_local_offsets);
    }

    // Function to initialize the local offsets to the maximum uint64_t value
    static void InitializeLocalOffsets(const size_t start, const size_t stop, const Kokkos::View<uint64_t *> &local_offsets) {
        // No need to do anything if shrinking
        if (start >= stop) {
            return;
        }
        Kokkos::parallel_for(
            "FillNewLocalOffsets", Kokkos::RangePolicy<>(start, stop), KOKKOS_LAMBDA(const size_t i) {
                local_offsets(i) = UINT64_MAX;
            });
    }

    // Functor to add the number of item for each cell, use the getter GetAddCellNumNodesFunctor or GetAddCellNumElementsFunctor and call in a kokkos parallel for loop
    struct AddCellNumItemsFunctor {
        Kokkos::View<uint64_t *> length;

        explicit AddCellNumItemsFunctor(Kokkos::View<uint64_t *> length) : length(std::move(length)) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &cell_id, const size_t &num_items) const {
            // Add the num_times to the existing length
            Kokkos::atomic_add(&length(cell_id), num_items);
        }
    };

    // Return the AddCellNumNodesFunctor using the member variable m_node_indices.length. Call this in a kokkos parallel for loop.
    AddCellNumItemsFunctor GetAddCellNumNodesFunctor() const {
        return AddCellNumItemsFunctor(m_node_indices.length);
    }

    // Return the AddCellNumElementsFunctor using the member variable m_element_indices.length. Call this in a kokkos parallel for loop.
    AddCellNumItemsFunctor GetAddCellNumElementsFunctor() const {
        return AddCellNumItemsFunctor(m_element_indices.length);
    }

    // Should be called after AddCellNumElementsFunctor has been called for all cells and should not be called in a loop.
    void CompleteAddingCellElementIndicesOnDevice(bool set_starts_from_lengths = true) {
        m_element_indices.FinishPopulatingOnDevice(set_starts_from_lengths);

        // Get the total number of elements
        m_total_num_elements = m_element_indices.RaggedArraySize();

        // Copy the element local offsets to the host
        m_element_local_offsets_host = Kokkos::create_mirror_view(m_element_local_offsets);
        Kokkos::deep_copy(m_element_local_offsets_host, m_element_local_offsets);
    }

    void CompleteAddingCellElementIndicesOnHost(bool set_starts_from_lengths = true) {
        m_element_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of elements
        m_total_num_elements = m_element_indices.RaggedArraySize();

        // Copy the element local offsets to the device
        Kokkos::deep_copy(m_element_local_offsets, m_element_local_offsets_host);
    }

    // Should be called after AddCellNumNodesFunctor has been called for all cells and should not be called in a loop.
    void CompleteAddingCellNodeIndicesOnDevice(bool set_starts_from_lengths = true) {
        m_node_indices.FinishPopulatingOnDevice(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViews(m_total_num_nodes);

        // Copy the node local offsets to the host
        m_node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);
        Kokkos::deep_copy(m_node_local_offsets_host, m_node_local_offsets);
    }

    void CompleteAddingCellNodeIndicesOnHost(bool set_starts_from_lengths = true) {
        m_node_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViews(m_total_num_nodes);

        // Copy the node local offsets to the device
        Kokkos::deep_copy(m_node_local_offsets, m_node_local_offsets_host);
    }

    void CompleteAddingFunctionDerivativesOnDevice() {
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        Kokkos::deep_copy(m_function_derivatives_host, m_function_derivatives);
    }

    void CompleteAddingFunctionDerivativesOnHost() {
        Kokkos::deep_copy(m_function_derivatives, m_function_derivatives_host);
    }

    // Functor to add an element to a cell, use the getter GetAddCellElementFunctor and call in a kokkos parallel for loop
    struct AddCellElementFunctor {
        Kokkos::View<uint64_t *> start_view;
        Kokkos::View<uint64_t *> length_view;
        Kokkos::View<uint64_t *> element_local_offsets_view;

        AddCellElementFunctor(Kokkos::View<uint64_t *> start_view_in, Kokkos::View<uint64_t *> length_view_in, Kokkos::View<uint64_t *> element_local_offsets_view_in)
            : start_view(std::move(start_view_in)), length_view(std::move(length_view_in)), element_local_offsets_view(std::move(element_local_offsets_view_in)) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &cell_id, const size_t &element_local_offset) const {
            // Get the start and length for the cell
            uint64_t start = start_view(cell_id);
            uint64_t length = length_view(cell_id);
            uint64_t end = start + length - 1;

            // Find the first slot that is the maximum uint64_t value
            bool found = false;
            for (size_t i = start; i <= end + 1; i++) {
                uint64_t expected = UINT64_MAX;
                if (Kokkos::atomic_compare_exchange(&element_local_offsets_view(i), expected, element_local_offset) == expected) {
                    found = true;
                    break;
                }
            }
            // Throw with kokkos if not found
            if (!found) {
                Kokkos::abort("Could not find an empty slot to add the element to the cell.");
            }
        }
    };

    // Return the AddCellElementFunctor using the member variables m_element_indices.start, m_element_indices.length, and m_element_local_offsets. Call this in a kokkos parallel for loop.
    AddCellElementFunctor GetAddCellElementFunctor() {
        return AddCellElementFunctor(m_element_indices.start, m_element_indices.length, m_element_local_offsets);
    }

    // Functor to add an element to a cell, use the getter GetAddCellElementFunctorOrig and call in a kokkos parallel for loop
    template <size_t NumNodes>
    struct AddCellElementFunctorOrig {
        Kokkos::View<uint64_t *> start_view;
        Kokkos::View<uint64_t *> length_view;
        Kokkos::View<double *> function_derivatives_view;
        Kokkos::View<uint64_t *> node_local_offsets_view;

        AddCellElementFunctorOrig(Kokkos::View<uint64_t *> start_view_in, Kokkos::View<uint64_t *> length_view_in, Kokkos::View<double *> function_derivatives_view_in, Kokkos::View<uint64_t *> node_local_offsets_view_in)
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

    // Return the AddCellElementFunctorOrig using the member variables m_node_indices.start, m_node_indices.length, m_function_derivatives, and m_node_local_offsets. Call this in a kokkos parallel for loop.
    template <size_t NumNodes>
    AddCellElementFunctorOrig<NumNodes> GetAddCellElementFunctorOrig() {
        return AddCellElementFunctorOrig<NumNodes>(m_node_indices.start, m_node_indices.length, m_function_derivatives, m_node_local_offsets);
    }

    // Get host view with copy of function derivatives
    Kokkos::View<double *>::HostMirror GetFunctionDerivativesHost() {
        return m_function_derivatives_host;
    }

    // Get host view with copy of node local offsets
    Kokkos::View<uint64_t *>::HostMirror GetNodeLocalOffsetsHost() {
        return m_node_local_offsets_host;
    }

    // Get host view with copy of element local offsets
    Kokkos::View<uint64_t *>::HostMirror GetElementLocalOffsetsHost() {
        return m_element_local_offsets_host;
    }

    // Get the local offsets for the elements in a cell. Return a kokkos subview of the element local offsets.
    Kokkos::View<uint64_t *> GetCellElementLocalOffsetsHost(size_t cell_id) {
        size_t start = m_element_indices.start_host(cell_id);
        size_t length = m_element_indices.length_host(cell_id);
        size_t end = start + length;
        return Kokkos::subview(m_element_local_offsets_host, std::make_pair(start, end));
    }

    // Get the total number of nodes
    size_t TotalNumNodes() const {
        return m_total_num_nodes;
    }

    // Get the total number of elements
    size_t TotalNumElements() const {
        return m_total_num_elements;
    }

    // Get the total number of components
    size_t TotalNumComponents() const {
        return m_total_components;
    }

    // Get the number of cells
    size_t NumCells() const {
        return m_num_cells;
    }

    // Get a reference to the node indices
    FlattenedRaggedArray &GetNodeIndices() {
        return m_node_indices;
    }

    // Get a reference to the element indices
    FlattenedRaggedArray &GetElementIndices() {
        return m_element_indices;
    }

   private:
    size_t m_num_cells;                                                 // Number of cells
    size_t m_reserved_nodes;                                            // Estimated total number of nodes
    FlattenedRaggedArray m_node_indices;                                // Indices for the cells
    FlattenedRaggedArray m_element_indices;                             // Indices for the elements
    Kokkos::View<uint64_t *> m_element_local_offsets;                   // Element local offsets
    Kokkos::View<uint64_t *> m_node_local_offsets;                      // Node local offsets
    Kokkos::View<double *> m_function_derivatives;                      // Function derivatives
    Kokkos::View<uint64_t *>::HostMirror m_element_local_offsets_host;  // Host view with copy of element local offsets
    Kokkos::View<uint64_t *>::HostMirror m_node_local_offsets_host;     // Host view with copy of node local offsets
    Kokkos::View<double *>::HostMirror m_function_derivatives_host;     // Host view with copy of function derivatives
    size_t m_total_num_nodes = 0;                                       // Total number of nodes
    size_t m_total_num_elements = 0;                                    // Total number of elements
    size_t m_total_components = 0;                                      // Total number of components (total number of nodes * number of dimensions)
    static constexpr size_t k_num_dims = 3;                             // Number of dimensions
};

}  // namespace aperi