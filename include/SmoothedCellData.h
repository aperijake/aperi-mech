#pragma once

#include <chrono>
#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <KokkosSparse_CrsMatrix.hpp>
#include <KokkosSparse_spmv.hpp>
#include <cstdint>
#include <numeric>
#include <utility>
#include <vector>

#include "LogUtils.h"

namespace aperi {

// Define the types for the sparse matrix
using Ordinal = int64_t;
using ExecSpace = Kokkos::DefaultExecutionSpace;
using MemorySpace = typename ExecSpace::memory_space;
using SizeType = int64_t;
using CrsMatrix = KokkosSparse::CrsMatrix<double, Ordinal, ExecSpace, void, SizeType>;

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
        : m_num_cells(num_cells), m_reserved_nodes(estimated_total_num_nodes), m_node_indices(num_cells), m_element_indices(num_cells), m_element_local_offsets("element_local_offsets", num_elements), m_node_local_offsets("node_local_offsets", estimated_total_num_nodes), m_function_derivatives("function_derivatives", estimated_total_num_nodes * k_num_dims), m_cell_volume("cell_volume", num_cells), m_total_num_elements(0) {
        // Fill the new elements with the maximum uint64_t value
        Kokkos::deep_copy(m_node_local_offsets, UINT64_MAX);
        Kokkos::deep_copy(m_element_local_offsets, UINT64_MAX);
        Kokkos::deep_copy(m_cell_volume, 0.0);

        // Create host views
        m_element_local_offsets_host = Kokkos::create_mirror_view(m_element_local_offsets);
        m_node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_cell_volume_host = Kokkos::create_mirror_view(m_cell_volume);

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
    }

    void CompleteAddingCellElementIndicesOnHost(bool set_starts_from_lengths = true) {
        m_element_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of elements
        m_total_num_elements = m_element_indices.RaggedArraySize();
    }

    // Should be called after AddCellNumNodesFunctor has been called for all cells and should not be called in a loop.
    void CompleteAddingCellNodeIndicesOnDevice(bool set_starts_from_lengths = true) {
        m_node_indices.FinishPopulatingOnDevice(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViews(m_total_num_nodes);
    }

    void CompleteAddingCellNodeIndicesOnHost(bool set_starts_from_lengths = true) {
        m_node_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViewsOnHost(m_total_num_nodes);
    }

    void CompleteSettingSizesOnDevice(bool set_starts_from_lengths = true) {
        CompleteAddingCellElementIndicesOnDevice(set_starts_from_lengths);
        CompleteAddingCellNodeIndicesOnDevice(set_starts_from_lengths);
    }

    void CompleteSettingSizesOnHost(bool set_starts_from_lengths = true) {
        CompleteAddingCellElementIndicesOnHost(set_starts_from_lengths);
        CompleteAddingCellNodeIndicesOnHost(set_starts_from_lengths);
    }

    void CopyCellElementViewsToHost() {
        m_element_local_offsets_host = Kokkos::create_mirror_view(m_element_local_offsets);
        m_cell_volume_host = Kokkos::create_mirror_view(m_cell_volume);
        Kokkos::deep_copy(m_element_local_offsets_host, m_element_local_offsets);
        Kokkos::deep_copy(m_cell_volume_host, m_cell_volume);
    }

    void CopyCellNodeViewsToHost() {
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);
        Kokkos::deep_copy(m_function_derivatives_host, m_function_derivatives);
        Kokkos::deep_copy(m_node_local_offsets_host, m_node_local_offsets);
    }

    void CopyCellViewsToHost() {
        CopyCellElementViewsToHost();
        CopyCellNodeViewsToHost();
    }

    void CopyCellElementViewsToDevice() {
        Kokkos::deep_copy(m_element_local_offsets, m_element_local_offsets_host);
        Kokkos::deep_copy(m_cell_volume, m_cell_volume_host);
    }

    void CopyCellNodeViewsToDevice() {
        Kokkos::deep_copy(m_function_derivatives, m_function_derivatives_host);
        Kokkos::deep_copy(m_node_local_offsets, m_node_local_offsets_host);
    }

    void CopyCellViewsToDevice() {
        CopyCellElementViewsToDevice();
        CopyCellNodeViewsToDevice();
    }

    // Functor to add an element to a cell, use the getter GetAddCellElementFunctor and call in a kokkos parallel for loop
    struct AddCellElementFunctor {
        Kokkos::View<uint64_t *> start_view;
        Kokkos::View<uint64_t *> length_view;
        Kokkos::View<uint64_t *> element_local_offsets_view;
        Kokkos::View<double *> cell_volume;

        AddCellElementFunctor(Kokkos::View<uint64_t *> start_view_in, Kokkos::View<uint64_t *> length_view_in, Kokkos::View<uint64_t *> element_local_offsets_view_in, Kokkos::View<double *> cell_volume_in)
            : start_view(std::move(start_view_in)), length_view(std::move(length_view_in)), element_local_offsets_view(std::move(element_local_offsets_view_in)), cell_volume(std::move(cell_volume_in)) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &cell_id, const size_t &element_local_offset, const double &element_volume) const {
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

            // Atomically add the element volume to the cell volume
            Kokkos::atomic_add(&cell_volume(cell_id), element_volume);
        }
    };

    // Return the AddCellElementFunctor using the member variables m_element_indices.start, m_element_indices.length, and m_element_local_offsets. Call this in a kokkos parallel for loop.
    AddCellElementFunctor GetAddCellElementFunctor() {
        return AddCellElementFunctor(m_element_indices.start, m_element_indices.length, m_element_local_offsets, m_cell_volume);
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

    // Get host view with copy of cell volume
    Kokkos::View<double *>::HostMirror GetCellVolumeHost() {
        return m_cell_volume_host;
    }

    // Get the cell volume for a cell
    KOKKOS_INLINE_FUNCTION
    double GetCellVolume(size_t cell_id) const {
        return m_cell_volume(cell_id);
    }

    // Get the cell volume for a cell
    double GetCellVolumeHost(size_t cell_id) {
        return m_cell_volume_host(cell_id);
    }

    // Get the local offsets for the elements in a cell. Return a kokkos subview of the element local offsets.
    Kokkos::View<uint64_t *>::HostMirror GetCellElementLocalOffsetsHost(size_t cell_id) {
        size_t start = m_element_indices.start_host(cell_id);
        size_t length = m_element_indices.length_host(cell_id);
        size_t end = start + length;
        return Kokkos::subview(m_element_local_offsets_host, Kokkos::make_pair(start, end));
    }

    // Get the local offsets for the nodes in a cell. Return a kokkos subview of the node local offsets.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<uint64_t *> GetCellNodeLocalOffsets(size_t cell_id) const {
        size_t start = m_node_indices.start(cell_id);
        size_t length = m_node_indices.length(cell_id);
        size_t end = start + length;
        return Kokkos::subview(m_node_local_offsets, Kokkos::make_pair(start, end));
    }

    // Get the function derivatives for the nodes in a cell. Return a kokkos subview of the function derivatives.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<double *> GetCellFunctionDerivatives(size_t cell_id) const {
        size_t start = m_node_indices.start(cell_id) * k_num_dims;
        size_t length = m_node_indices.length(cell_id) * k_num_dims;
        size_t end = start + length;
        return Kokkos::subview(m_function_derivatives, Kokkos::make_pair(start, end));
    }

    // Get the function derivatives for the nodes in a cell. Return a kokkos subview of the function derivatives.
    Kokkos::View<double *>::HostMirror GetCellFunctionDerivativesHost(size_t cell_id) {
        size_t start = m_node_indices.start_host(cell_id) * k_num_dims;
        size_t length = m_node_indices.length_host(cell_id) * k_num_dims;
        size_t end = start + length;
        return Kokkos::subview(m_function_derivatives_host, Kokkos::make_pair(start, end));
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

    // Debug print on host
    void DebugPrint() {
        // Set the precision
        std::cout << std::fixed << std::setprecision(12);

        // Print the number of cells
        std::cout << "Number of Cells: " << m_num_cells << std::endl;

        // Print the total number of nodes, elements, and components
        std::cout << "Total Number of Nodes: " << m_total_num_nodes << std::endl;
        std::cout << "Total Number of Elements: " << m_total_num_elements << std::endl;
        std::cout << "Total Number of Components: " << m_total_components << std::endl;

        // Print the node indices
        std::cout << "Node Indices" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_node_indices.start_host(i);
            size_t length = m_node_indices.length_host(i);
            std::cout << "Cell " << i << ": start = " << start << ", length = " << length << std::endl;
            size_t end = start + length;
            for (size_t j = start; j < end; ++j) {
                std::cout << m_node_local_offsets_host(j) << " ";
            }
            std::cout << std::endl;
        }

        // Print the element indices
        std::cout << "Element Indices" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_element_indices.start_host(i);
            size_t length = m_element_indices.length_host(i);
            std::cout << "Cell " << i << ": start = " << start << ", length = " << length << std::endl;
            size_t end = start + length;
            for (size_t j = start; j < end; ++j) {
                std::cout << m_element_local_offsets_host(j) << " ";
            }
            std::cout << std::endl;
        }

        // Print the cell volume
        std::cout << "Cell Volume" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            std::cout << "Cell " << i << ": " << m_cell_volume_host(i) << std::endl;
        }

        // Print the function derivatives
        std::cout << "Function Derivatives" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_node_indices.start_host(i) * k_num_dims;
            size_t length = m_node_indices.length_host(i) * k_num_dims;
            size_t end = start + length;
            std::cout << "Cell " << i << ": ";
            for (size_t j = start; j < end; j += 3) {
                std::cout << "  Node " << j / 3 << ": ";
                std::cout << m_function_derivatives_host(j) << " " << m_function_derivatives_host(j + 1) << " " << m_function_derivatives_host(j + 2) << std::endl;
            }
        }

        // Print the element local offsets
        std::cout << "Element Local Offsets" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_element_indices.start_host(i);
            size_t length = m_element_indices.length_host(i);
            size_t end = start + length;
            std::cout << "Cell " << i << ": ";
            for (size_t j = start; j < end; ++j) {
                std::cout << m_element_local_offsets_host(j) << " ";
            }
            std::cout << std::endl;
        }

        // Print the node local offsets
        std::cout << "Node Local Offsets" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_node_indices.start_host(i);
            size_t length = m_node_indices.length_host(i);
            size_t end = start + length;
            std::cout << "Cell " << i << ": ";
            for (size_t j = start; j < end; ++j) {
                std::cout << m_node_local_offsets_host(j) << " ";
            }
            std::cout << std::endl;
        }
    }

    // Function to create a sparse matrix
    void CreateCrsMatrix(){
        // This is to calculate the displacement gradient.
        // This matrix will hold the function derivatives for each node in each cell and will multiply by the displacement field to get the displacement gradient.
        // The displacement field is a vector field with 3 components for each node.
        // The displacement gradient is a matrix field with 9 components for each node.
        // The matrix will be a sparse matrix with 3 * num_nodes columns and 9 * num_nodes rows.
        /*
        Displacement gradient matrix in 3x3 form:
        [du1/dX1 du1/dX2 du1/dX3]
        [du2/dX1 du2/dX2 du2/dX3]
        [du3/dX1 du3/dX2 du3/dX3]

        Dispalcement gradient matrix in 9x1 form:
        [du1/dX1 du1/dX2 du1/dX3 du2/dX1 du2/dX2 du2/dX3 du3/dX1 du3/dX2 du3/dX3].T
        Example for 1 node with 1 neighbor: (9 x 3) * (3 x 1) = (9 x 1)

        [d/dX1 0    0   ]  [u1]  = [du1/dX1]
        [d/dX2 0    0   ]  [u2]    [du1/dX2]
        [d/dX3 0    0   ]  [u3]    [du1/dX3]
        [0    d/dX1 0   ]          [du2/dX1]
        [0    d/dX2 0   ]          [du2/dX2]
        [0    d/dX3 0   ]          [du2/dX3]
        [0    0    d/dX1]          [du3/dX1]
        [0    0    d/dX2]          [du3/dX2]
        [0    0    d/dX3]          [du3/dX3]
        */

        // Get the number of nodes, equal to the number of cells for nodal integration
        size_t num_nodes = m_num_cells;
        size_t num_field_gradient_components = k_num_dims * k_num_dims;
        int64_t num_rows = num_nodes * num_field_gradient_components;
        int64_t num_cols = num_nodes * k_num_dims;

        // The number of non-zeros is the number of m_total_num_nodes * num_field_gradient_components
        int64_t num_non_zeros = m_total_num_nodes * num_field_gradient_components;

        // Create the row map
        Kokkos::View<Ordinal *> row_map("row_map", num_rows + 1);
        Kokkos::View<Ordinal *>::HostMirror row_map_host = Kokkos::create_mirror_view(row_map);

        // Create the column indices
        Kokkos::View<Ordinal *> column_indices("column_indices", num_non_zeros);
        Kokkos::View<Ordinal *>::HostMirror column_indices_host = Kokkos::create_mirror_view(column_indices);

        // Create the values
        Kokkos::View<double *> values("values", num_non_zeros);
        Kokkos::View<double *>::HostMirror values_host = Kokkos::create_mirror_view(values);

        // Fill the row map, equal to to the length in m_node_indices
        row_map_host(0) = 0;
        for (size_t i = 1; i < num_nodes; ++i) {
            size_t length = m_node_indices.length_host(i - 1);
            size_t start_index = i * k_num_dims * k_num_dims;
            for (size_t j = 0; j < num_field_gradient_components; ++j) {
                row_map_host(start_index + j) = row_map_host(start_index + j - 1) + length;
            }
        }
        row_map_host(num_rows) = num_non_zeros;
        Kokkos::deep_copy(row_map, row_map_host);

        // Fill the column indices and values
        // Column index will be the neighbor node index * k_num_dims + the component index
        // Value will be the derivative of the function
        size_t index = 0;
        for (size_t i = 0; i < num_nodes; ++i) {
            size_t start = m_node_indices.start_host(i);
            size_t length = m_node_indices.length_host(i);
            size_t row_start_index = i * k_num_dims * k_num_dims;
            for (size_t j = 0; j < length; ++j) {
                size_t node_index = m_node_local_offsets_host(start + j);
                for (size_t k = 0; k < k_num_dims; ++k) {
                    int64_t column = node_index * k_num_dims + k;
                    size_t row_index = row_start_index + k * k_num_dims;
                    for (size_t l = 0; l < k_num_dims; ++l) {
                        column_indices_host(index) = column;
                        values_host(index) = m_function_derivatives_host(node_index * k_num_dims + l);
                        ++index;
                    }
                }
            }
        }
        Kokkos::deep_copy(column_indices, column_indices_host);
        Kokkos::deep_copy(values, values_host);

        // Create the matrix
        m_gradient_operator = CrsMatrix("gradient_operator", num_rows, num_cols, num_non_zeros, values, row_map, column_indices);

        // Create a dummy displacement field of ones and length m_num_cells * k_num_dims
        Kokkos::resize(m_dummy_displacement_field, m_num_cells * k_num_dims);
        m_dummy_displacement_field_host = Kokkos::create_mirror_view(m_dummy_displacement_field);
        for (size_t i = 0; i < m_num_cells * k_num_dims; ++i) {
            m_dummy_displacement_field_host(i) = 1.0;
        }
        Kokkos::deep_copy(m_dummy_displacement_field, m_dummy_displacement_field_host);

        // Create the displacement gradient
        Kokkos::resize(m_displacement_gradient, m_num_cells * num_field_gradient_components);
        m_displacement_gradient_host = Kokkos::create_mirror_view(m_displacement_gradient);

    }

    void ApplyDisplacementGradientOperator() const {
        // Apply the displacement gradient operator
        auto timer_start = std::chrono::high_resolution_clock::now();
        KokkosSparse::spmv("N", 1.0, m_gradient_operator, m_dummy_displacement_field, 0.0, m_displacement_gradient);
        auto timer_end = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> elapsed_seconds = timer_end - timer_start;
        aperi::CoutP0() << "Time to apply displacement gradient operator: " << elapsed_seconds.count() << " s" << std::endl;

        // Since the displacement is ones, this should be a check on the partition of nullity. Check that the displacement gradient is all zeros.
        Kokkos::deep_copy(m_displacement_gradient_host, m_displacement_gradient);
        for (size_t i = 0; i < m_num_cells * k_num_dims * k_num_dims; ++i) {
            if (std::abs(m_displacement_gradient_host(i)) > 1.0e-12) {
                aperi::CoutP0() << "Displacement gradient is not zero: " << m_displacement_gradient_host(i) << std::endl;
            }
        }
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
    Kokkos::View<double *> m_cell_volume;                               // Cell volume
    Kokkos::View<double *>::HostMirror m_cell_volume_host;              // Host view with copy of cell volume
    CrsMatrix m_gradient_operator;                                      // Displacement gradient operator
    Kokkos::View<double *> m_dummy_displacement_field;                  // Dummy displacement field
    Kokkos::View<double *>::HostMirror m_dummy_displacement_field_host; // Host view with copy of dummy displacement field
    Kokkos::View<double *> m_displacement_gradient;                     // Displacement gradient
    Kokkos::View<double *>::HostMirror m_displacement_gradient_host;    // Host view with copy of displacement gradient
    size_t m_total_num_nodes = 0;                                       // Total number of nodes
    size_t m_total_num_elements = 0;                                    // Total number of elements
    size_t m_total_components = 0;                                      // Total number of components (total number of nodes * number of dimensions)
    static constexpr size_t k_num_dims = 3;                             // Number of dimensions
};

}  // namespace aperi