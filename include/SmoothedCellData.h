#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <Kokkos_UnorderedMap.hpp>
#include <cstdint>
#include <numeric>
#include <utility>
#include <vector>

#include "Index.h"

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

// Struct holding the three unsigned for the map: cell_id, bucket_id, and bucket_ord
struct NodeToViewIndexMapKey {
    uint64_t cell_id;
    uint64_t bucket_id;
    uint64_t bucket_ord;

    KOKKOS_INLINE_FUNCTION
    NodeToViewIndexMapKey(uint64_t cell_id_in, uint64_t bucket_id_in, uint64_t bucket_ord_in) : cell_id(cell_id_in), bucket_id(bucket_id_in), bucket_ord(bucket_ord_in) {}

    KOKKOS_INLINE_FUNCTION
    NodeToViewIndexMapKey() : cell_id(UINT64_MAX), bucket_id(UINT64_MAX), bucket_ord(UINT64_MAX) {}

    KOKKOS_INLINE_FUNCTION
    NodeToViewIndexMapKey(const NodeToViewIndexMapKey &) = default;

    KOKKOS_INLINE_FUNCTION
    NodeToViewIndexMapKey &operator=(const NodeToViewIndexMapKey &) = default;

    KOKKOS_INLINE_FUNCTION
    bool operator==(const NodeToViewIndexMapKey &other) const {
        return cell_id == other.cell_id && bucket_id == other.bucket_id && bucket_ord == other.bucket_ord;
    }
};

// Custom hash function for NodeToViewIndexMapKey
struct NodeToViewIndexMapKeyHash {
    KOKKOS_INLINE_FUNCTION
    size_t operator()(const NodeToViewIndexMapKey &key) const {
        // Combine the hash values of cell_id, bucket_id, and bucket_ord
        size_t h1 = key.cell_id;
        size_t h2 = key.bucket_id * 512 + key.bucket_ord;
        return h1 ^ (h2 * 173);
    }
};

class SmoothedCellData {
   public:
    /**
     * @brief Constructs a SmoothedCellData object.
     *
     * @param num_cells The number of cells to construct the SmoothedCellData object with.
     * @param num_elements The number of elements on this part and partition.
     */
    SmoothedCellData(size_t num_cells, size_t num_elements, size_t estimated_total_num_nodes)
        : m_num_cells(num_cells), m_reserved_nodes(estimated_total_num_nodes), m_node_csr_indices(num_cells), m_element_csr_indices(num_cells), m_element_indices("element_indices", num_elements), m_node_indices("node_indices", estimated_total_num_nodes), m_function_derivatives("function_derivatives", estimated_total_num_nodes * k_num_dims), m_cell_volume("cell_volume", num_cells), m_node_to_view_index_map(estimated_total_num_nodes * 2), m_total_num_nodes(0), m_total_num_elements(0), m_total_components(0) {
        // TODO(jake): come up with a better way to estimate the size of m_node_to_index_map
        // Fill the new elements with the maximum uint64_t value
        Kokkos::deep_copy(m_node_indices, aperi::Index());
        Kokkos::deep_copy(m_element_indices, aperi::Index(0, UINT_MAX));
        Kokkos::deep_copy(m_cell_volume, 0.0);

        // Create host views
        m_element_indices_host = Kokkos::create_mirror_view(m_element_indices);
        m_node_indices_host = Kokkos::create_mirror_view(m_node_indices);
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_cell_volume_host = Kokkos::create_mirror_view(m_cell_volume);

        // Fill the new elements with the maximum uint64_t value
        Kokkos::deep_copy(m_element_indices_host, aperi::Index(0, UINT_MAX));

        // Initialize the unordered maps on the host
        m_node_to_view_index_map_host = Kokkos::create_mirror(m_node_to_view_index_map);
        Kokkos::deep_copy(m_node_to_view_index_map_host, m_node_to_view_index_map);
    }

    // Function to resize views
    void ResizeNodeViews(size_t new_total_num_nodes) {
        // Resize the views
        Kokkos::resize(m_function_derivatives, new_total_num_nodes * k_num_dims);
        Kokkos::resize(m_node_indices, new_total_num_nodes);

        // Create new host mirrors
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_node_indices_host = Kokkos::create_mirror_view(m_node_indices);

        m_reserved_nodes = new_total_num_nodes;
        m_number_of_resizes++;
    }

    // Function to resize the node views on host
    void ResizeNodeViewsOnHost(size_t new_total_num_nodes) {
        // Resize the views
        Kokkos::resize(m_function_derivatives, new_total_num_nodes * k_num_dims);
        Kokkos::resize(m_node_indices, new_total_num_nodes);
        Kokkos::resize(m_function_derivatives_host, new_total_num_nodes * k_num_dims);
        Kokkos::resize(m_node_indices_host, new_total_num_nodes);

        // Fill the new elements with the maximum uint64_t value
        m_reserved_nodes = new_total_num_nodes;

        m_number_of_resizes++;
    }

    // Function to rehash the node to local index map on host
    void RehashNodeToViewIndexMapOnHost(size_t new_total_num_nodes) {
        // Rehash the map
        m_node_to_view_index_map_host.rehash(new_total_num_nodes);
        m_node_to_view_index_map.rehash(new_total_num_nodes);
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

    // Return the AddCellNumNodesFunctor using the member variable m_node_csr_indices.length. Call this in a kokkos parallel for loop.
    AddCellNumItemsFunctor GetAddCellNumNodesFunctor() const {
        return AddCellNumItemsFunctor(m_node_csr_indices.length);
    }

    // Return the AddCellNumElementsFunctor using the member variable m_element_csr_indices.length. Call this in a kokkos parallel for loop.
    AddCellNumItemsFunctor GetAddCellNumElementsFunctor() const {
        return AddCellNumItemsFunctor(m_element_csr_indices.length);
    }

    // Should be called after AddCellNumElementsFunctor has been called for all cells and should not be called in a loop.
    void CompleteAddingCellElementCSRIndicesOnDevice(bool set_starts_from_lengths = true) {
        m_element_csr_indices.FinishPopulatingOnDevice(set_starts_from_lengths);

        // Get the total number of elements
        m_total_num_elements = m_element_csr_indices.RaggedArraySize();
    }

    void CompleteAddingCellElementCSRIndicesOnHost(bool set_starts_from_lengths = true) {
        m_element_csr_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of elements
        m_total_num_elements = m_element_csr_indices.RaggedArraySize();
    }

    // Should be called after AddCellNumNodesFunctor has been called for all cells and should not be called in a loop.
    void CompleteAddingCellNodeCSRIndicesOnDevice(bool set_starts_from_lengths = true) {
        m_node_csr_indices.FinishPopulatingOnDevice(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_csr_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViews(m_total_num_nodes);
    }

    void CompleteAddingCellNodeCSRIndicesOnHost(bool set_starts_from_lengths = true) {
        m_node_csr_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_csr_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViewsOnHost(m_total_num_nodes);
    }

    void CompleteSettingSizesOnDevice(bool set_starts_from_lengths = true) {
        CompleteAddingCellElementCSRIndicesOnDevice(set_starts_from_lengths);
        CompleteAddingCellNodeCSRIndicesOnDevice(set_starts_from_lengths);
    }

    void CompleteSettingSizesOnHost(bool set_starts_from_lengths = true) {
        CompleteAddingCellElementCSRIndicesOnHost(set_starts_from_lengths);
        CompleteAddingCellNodeCSRIndicesOnHost(set_starts_from_lengths);
    }

    void CopyCellElementIndicesToHost() {
        m_element_indices_host = Kokkos::create_mirror_view(m_element_indices);
        Kokkos::deep_copy(m_element_indices_host, m_element_indices);
    }

    void CopyCellVolumeToHost() {
        m_cell_volume_host = Kokkos::create_mirror_view(m_cell_volume);
        Kokkos::deep_copy(m_cell_volume_host, m_cell_volume);
    }

    void CopyCellElementViewsToHost() {
        CopyCellElementIndicesToHost();
        CopyCellVolumeToHost();
    }

    void CopyCellNodeViewsToHost() {
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_node_indices_host = Kokkos::create_mirror_view(m_node_indices);
        Kokkos::deep_copy(m_function_derivatives_host, m_function_derivatives);
        Kokkos::deep_copy(m_node_indices_host, m_node_indices);
    }

    void CopyCellViewsToHost() {
        CopyCellElementViewsToHost();
        CopyCellNodeViewsToHost();
    }

    void CopyCellVolumeToDevice() {
        Kokkos::deep_copy(m_cell_volume, m_cell_volume_host);
    }

    void CopyCellElementIndicesToDevice() {
        Kokkos::deep_copy(m_element_indices, m_element_indices_host);
    }

    void CopyCellElementViewsToDevice() {
        CopyCellVolumeToDevice();
        CopyCellElementIndicesToDevice();
    }

    void CopyCellNodeIndicesToDevice() {
        Kokkos::deep_copy(m_node_indices, m_node_indices_host);
    }

    void CopyCellFunctionDerivativesToDevice() {
        Kokkos::deep_copy(m_function_derivatives, m_function_derivatives_host);
    }

    void CopyCellNodeViewsToDevice() {
        CopyCellNodeIndicesToDevice();
        CopyCellFunctionDerivativesToDevice();
    }

    void CopyCellViewsToDevice() {
        CopyCellElementViewsToDevice();
        CopyCellNodeViewsToDevice();
    }

    // Functor to add an element to a cell, use the getter GetAddCellElementFunctor and call in a kokkos parallel for loop
    struct AddCellElementFunctor {
        Kokkos::View<uint64_t *> start_view;
        Kokkos::View<uint64_t *> length_view;
        Kokkos::View<aperi::Index *> element_indices_view;

        AddCellElementFunctor(Kokkos::View<uint64_t *> start_view_in, Kokkos::View<uint64_t *> length_view_in, Kokkos::View<aperi::Index *> element_indices_view_in)
            : start_view(std::move(start_view_in)), length_view(std::move(length_view_in)), element_indices_view(std::move(element_indices_view_in)) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &cell_id, const aperi::Index &element_index) const {
            // Get the start and length for the cell
            uint64_t start = start_view(cell_id);
            uint64_t length = length_view(cell_id);
            uint64_t end = start + length - 1;

            aperi::Index expected(0, UINT_MAX);
            // Find the first slot that is the maximum uint64_t value
            bool found = false;
            for (size_t i = start; i <= end + 1; i++) {
                if (Kokkos::atomic_compare_exchange(&element_indices_view(i), expected, element_index) == expected) {
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

    // Return the AddCellElementFunctor using the member variables m_element_csr_indices.start, m_element_csr_indices.length, and m_element_indices. Call this in a kokkos parallel for loop.
    AddCellElementFunctor GetAddCellElementFunctor() {
        return AddCellElementFunctor(m_element_csr_indices.start, m_element_csr_indices.length, m_element_indices);
    }

    // Functor to add volume to a cell, use the getter GetAddToCellVolumeFunctor and call in a kokkos parallel for loop
    struct AddToCellVolumeFunctor {
        Kokkos::View<double *> cell_volume;

        AddToCellVolumeFunctor(Kokkos::View<double *> cell_volume_in)
            : cell_volume(std::move(cell_volume_in)) {}

        KOKKOS_INLINE_FUNCTION
        void operator()(const size_t &cell_id, const double &element_volume) const {
            // Atomically add the element volume to the cell volume
            Kokkos::atomic_add(&cell_volume(cell_id), element_volume);
        }
    };

    // Return the AddCellElementFunctor using the member variable m_cell_volume. Call this in a kokkos parallel for loop.
    AddToCellVolumeFunctor GetAddToCellVolumeFunctor() {
        return AddToCellVolumeFunctor(m_cell_volume);
    }

    // Get host view with copy of function derivatives
    Kokkos::View<double *>::HostMirror GetFunctionDerivativesHost() {
        return m_function_derivatives_host;
    }

    // Get host view with copy of node indices
    Kokkos::View<aperi::Index *>::HostMirror GetNodeIndicesHost() {
        return m_node_indices_host;
    }

    // Get host view with copy of element indices
    Kokkos::View<aperi::Index *>::HostMirror GetElementIndicesHost() {
        return m_element_indices_host;
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

    // Add to cell volume, host
    void AddToCellVolumeHost(size_t cell_id, double value) {
        m_cell_volume_host(cell_id) += value;
    }

    // Get the indices for the elements in a cell. Return a kokkos subview of the element indices.
    Kokkos::View<aperi::Index *>::HostMirror GetCellElementIndicesHost(size_t cell_id) {
        size_t start = m_element_csr_indices.start_host(cell_id);
        size_t length = m_element_csr_indices.length_host(cell_id);
        size_t end = start + length;
        return Kokkos::subview(m_element_indices_host, Kokkos::make_pair(start, end));
    }

    // Get the indices for the elements in a cell. Return a kokkos subview of the element indices.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<aperi::Index *> GetCellElementIndices(size_t cell_id) const {
        size_t start = m_element_csr_indices.start(cell_id);
        size_t length = m_element_csr_indices.length(cell_id);
        size_t end = start + length;
        return Kokkos::subview(m_element_indices, Kokkos::make_pair(start, end));
    }

    // Get the indices for the nodes in a cell. Return a kokkos subview of the node indices.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<aperi::Index *> GetCellNodeCSRIndices(size_t cell_id) const {
        size_t start = m_node_csr_indices.start(cell_id);
        size_t length = m_node_csr_indices.length(cell_id);
        size_t end = start + length;
        return Kokkos::subview(m_node_indices, Kokkos::make_pair(start, end));
    }

    // Get the function derivatives for the nodes in a cell. Return a kokkos subview of the function derivatives.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<double *> GetCellFunctionDerivatives(size_t cell_id) const {
        size_t start = m_node_csr_indices.start(cell_id) * k_num_dims;
        size_t length = m_node_csr_indices.length(cell_id) * k_num_dims;
        size_t end = start + length;
        return Kokkos::subview(m_function_derivatives, Kokkos::make_pair(start, end));
    }

    // Get the function derivatives for the nodes in a cell. Return a kokkos subview of the function derivatives.
    Kokkos::View<double *>::HostMirror GetCellFunctionDerivativesHost(size_t cell_id) {
        size_t start = m_node_csr_indices.start_host(cell_id) * k_num_dims;
        size_t length = m_node_csr_indices.length_host(cell_id) * k_num_dims;
        size_t end = start + length;
        return Kokkos::subview(m_function_derivatives_host, Kokkos::make_pair(start, end));
    }

    // Get the map from node to local index, host
    Kokkos::UnorderedMap<NodeToViewIndexMapKey, uint64_t, Kokkos::DefaultHostExecutionSpace, NodeToViewIndexMapKeyHash>::HostMirror &GetNodeToViewIndexMapHost() {
        return m_node_to_view_index_map_host;
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

    // Get the number of resizes
    size_t NumberOfResizes() const {
        return m_number_of_resizes;
    }

    // Get a reference to the node indices
    FlattenedRaggedArray &GetNodeCSRIndices() {
        return m_node_csr_indices;
    }

    // Get a reference to the element indices
    FlattenedRaggedArray &GetElementCSRIndices() {
        return m_element_csr_indices;
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
        std::cout << "Node CSR Indices" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_node_csr_indices.start_host(i);
            size_t length = m_node_csr_indices.length_host(i);
            std::cout << "Cell " << i << ": start = " << start << ", length = " << length << std::endl;
        }

        // Print the element indices
        std::cout << "Element CSR Indices" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_element_csr_indices.start_host(i);
            size_t length = m_element_csr_indices.length_host(i);
            std::cout << "Cell " << i << ": start = " << start << ", length = " << length << std::endl;
        }

        // Print the cell volume
        std::cout << "Cell Volume" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            std::cout << "Cell " << i << ": " << m_cell_volume_host(i) << std::endl;
        }

        // Print the function derivatives
        std::cout << "Function Derivatives" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_node_csr_indices.start_host(i) * k_num_dims;
            size_t length = m_node_csr_indices.length_host(i) * k_num_dims;
            size_t end = start + length;
            std::cout << "Cell " << i << ": ";
            for (size_t j = start; j < end; j += 3) {
                std::cout << "  Node " << j / 3 << ": ";
                std::cout << m_function_derivatives_host(j) << " " << m_function_derivatives_host(j + 1) << " " << m_function_derivatives_host(j + 2) << std::endl;
            }
        }

        // Print the element Aperi indices
        std::cout << "Element Aperi Indices" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_element_csr_indices.start_host(i);
            size_t length = m_element_csr_indices.length_host(i);
            size_t end = start + length;
            std::cout << "Cell " << i << ": ";
            for (size_t j = start; j < end; ++j) {
                std::cout << m_element_indices_host(j) << " ";
            }
            std::cout << std::endl;
        }

        // Print the node aperi indices
        std::cout << "Node Aperi Indices" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            size_t start = m_node_csr_indices.start_host(i);
            size_t length = m_node_csr_indices.length_host(i);
            size_t end = start + length;
            std::cout << "Cell " << i << ": ";
            for (size_t j = start; j < end; ++j) {
                std::cout << m_node_indices_host(j) << " ";
            }
            std::cout << std::endl;
        }
    }

   private:
    size_t m_num_cells;       // Number of cells
    size_t m_reserved_nodes;  // Estimated total number of nodes

    FlattenedRaggedArray m_node_csr_indices;     // Indices for the cells
    FlattenedRaggedArray m_element_csr_indices;  // Indices for the elements

    Kokkos::View<aperi::Index *> m_element_indices;  // Element indices
    Kokkos::View<aperi::Index *> m_node_indices;     // Node indices
    Kokkos::View<double *> m_function_derivatives;   // Function derivatives
    Kokkos::View<double *> m_cell_volume;            // Cell volume

    Kokkos::View<aperi::Index *>::HostMirror m_element_indices_host;  // Host view with copy of element indices
    Kokkos::View<aperi::Index *>::HostMirror m_node_indices_host;     // Host view with copy of node indices
    Kokkos::View<double *>::HostMirror m_function_derivatives_host;   // Host view with copy of function derivatives
    Kokkos::View<double *>::HostMirror m_cell_volume_host;            // Host view with copy of cell volume

    Kokkos::UnorderedMap<NodeToViewIndexMapKey, uint64_t, Kokkos::DefaultExecutionSpace, NodeToViewIndexMapKeyHash> m_node_to_view_index_map;                       // Map from node to local index
    Kokkos::UnorderedMap<NodeToViewIndexMapKey, uint64_t, Kokkos::DefaultHostExecutionSpace, NodeToViewIndexMapKeyHash>::HostMirror m_node_to_view_index_map_host;  // Host map from node to local index

    size_t m_total_num_nodes = 0;            // Total number of nodes
    size_t m_total_num_elements = 0;         // Total number of elements
    size_t m_total_components = 0;           // Total number of components (total number of nodes * number of dimensions)
    size_t m_number_of_resizes = 0;          // Number of resizes
    static constexpr size_t k_num_dims = 3;  // Number of dimensions
};

}  // namespace aperi
