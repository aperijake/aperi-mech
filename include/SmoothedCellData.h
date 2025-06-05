#pragma once

#include <Kokkos_Core.hpp>
#include <Kokkos_UnorderedMap.hpp>
#include <cstdint>
#include <numeric>
#include <utility>

#include "Constants.h"
#include "FlattenedRaggedArray.h"
#include "Index.h"
#include "Types.h"

namespace aperi {

struct SmoothedCellDataSizes {
    size_t num_cells;
    size_t num_subcells;
    size_t num_elements;
    size_t estimated_num_nodes;
};

// Struct holding the three unsigned for the map: cell_id, bucket_id, and bucket_ord
struct NodeToViewIndexMapKey {
    Unsigned cell_id;
    Unsigned bucket_id;
    Unsigned bucket_ord;

    KOKKOS_INLINE_FUNCTION
    NodeToViewIndexMapKey(Unsigned cell_id_in, Unsigned bucket_id_in, Unsigned bucket_ord_in) : cell_id(cell_id_in), bucket_id(bucket_id_in), bucket_ord(bucket_ord_in) {}

    KOKKOS_INLINE_FUNCTION
    NodeToViewIndexMapKey() : cell_id(UNSIGNED_MAX), bucket_id(UNSIGNED_MAX), bucket_ord(UNSIGNED_MAX) {}

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
    uint32_t operator()(const NodeToViewIndexMapKey &k) const {
        // 32-bit golden ratio prime (2^32 / φ)
        const uint32_t GOLDEN32 = 0x9E3779B9U;
        const uint32_t MIXER32 = 0xBF58476DU;

        uint32_t h1 = static_cast<uint32_t>(k.cell_id);
        uint32_t h2 = static_cast<uint32_t>(k.bucket_id) * 512 + k.bucket_ord;

        // Improved mixing sequence
        uint32_t combined = (h1 ^ (h2 * GOLDEN32)) * MIXER32;

        // 32-bit avalanche (based on MurmurHash3 finalizer)
        combined ^= combined >> 16;
        combined *= 0x85EBCA6BU;
        combined ^= combined >> 13;
        combined *= 0xC2B2AE35U;
        combined ^= combined >> 16;

        return combined;
    }
};

class SmoothedCellData {
   public:
    /**
     * @brief Constructs a SmoothedCellData object.
     *
     * @param num_cells The number of cells to construct the SmoothedCellData object with.
     * @param num_subcells The number of subcells.
     * @param num_elements The number of elements on this part and partition.
     * @param estimated_total_num_nodes The estimated total number of nodes in the cells.
     */
    SmoothedCellData(size_t num_cells,
                     size_t reserved_num_subcells,
                     size_t num_elements,
                     size_t estimated_total_num_nodes,
                     bool use_f_bar = false)
        : m_num_cells(num_cells),
          m_reserved_nodes(estimated_total_num_nodes),
          m_node_csr_indices(reserved_num_subcells),
          m_element_csr_indices(reserved_num_subcells),
          m_subcell_csr_indices(num_cells),
          m_element_indices("element_indices", num_elements),
          m_node_indices("node_indices", estimated_total_num_nodes),
          m_cell_subcells("cell_subcells", reserved_num_subcells),
          m_function_derivatives("function_derivatives", estimated_total_num_nodes * k_num_dims),
          m_cell_volume("cell_volume", num_cells),
          m_subcell_volume("subcell_volume", reserved_num_subcells),
          m_node_to_view_index_map(estimated_total_num_nodes * 2),
          m_total_num_nodes(0),
          m_total_num_elements(0),
          m_num_subcells(reserved_num_subcells),
          m_total_components(0) {
        // Fill the new elements with the maximum Unsigned value
        Kokkos::deep_copy(m_node_indices, aperi::Index());
        Kokkos::deep_copy(m_element_indices, aperi::Index(0, UINT_MAX));
        Kokkos::deep_copy(m_cell_subcells, UNSIGNED_MAX);
        Kokkos::deep_copy(m_cell_volume, 0.0);
        Kokkos::deep_copy(m_subcell_volume, 0.0);

        // Create host views
        m_element_indices_host = Kokkos::create_mirror_view(m_element_indices);
        m_node_indices_host = Kokkos::create_mirror_view(m_node_indices);
        m_function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        m_cell_volume_host = Kokkos::create_mirror_view(m_cell_volume);
        m_subcell_volume_host = Kokkos::create_mirror_view(m_subcell_volume);
        m_cell_subcells_host = Kokkos::create_mirror_view(m_cell_subcells);
        // Fill the new elements with the maximum value
        Kokkos::deep_copy(m_element_indices_host, aperi::Index(0, UINT_MAX));
        Kokkos::deep_copy(m_cell_subcells_host, UNSIGNED_MAX);

        // Initialize the unordered maps on the host
        m_node_to_view_index_map_host = Kokkos::create_mirror(m_node_to_view_index_map);
        Kokkos::deep_copy(m_node_to_view_index_map_host, m_node_to_view_index_map);

        // Initialize the F-bar fields
        if (use_f_bar) {
            m_subcell_j = Kokkos::View<double *>("subcell_j", reserved_num_subcells);
            m_cell_j_bar = Kokkos::View<double *>("cell_j_bar", num_cells);
            Kokkos::deep_copy(m_subcell_j, 0.0);
            Kokkos::deep_copy(m_cell_j_bar, 0.0);
        }
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

        // Fill the new elements with the maximum Unsigned value
        m_reserved_nodes = new_total_num_nodes;

        m_number_of_resizes++;
    }

    // Function to rehash the node to local index map
    void RehashNodeToViewIndexMap(size_t new_total_num_nodes) {
        // Clear the map
        m_node_to_view_index_map.clear();
        // Rehash the map
        if (!m_node_to_view_index_map.rehash(new_total_num_nodes)) {
            Kokkos::abort("RehashNodeToViewIndexMap failed on device");
        }
        if (!m_node_to_view_index_map_host.rehash(new_total_num_nodes)) {
            Kokkos::abort("RehashNodeToViewIndexMap failed on host");
        }
        // Create new host mirrors
        m_node_to_view_index_map_host = Kokkos::create_mirror(m_node_to_view_index_map);
    }

    // Return the AddSubcellNumNodesFunctor.length. Call this in a kokkos parallel for loop.
    FlattenedRaggedArray::AddNumItemsFunctor GetAddSubcellNumNodesFunctor() const {
        return m_node_csr_indices.GetAddNumItemsFunctor();
    }

    // Return the AddSubcellNumElementsFunctor.length. Call this in a kokkos parallel for loop.
    FlattenedRaggedArray::AddNumItemsFunctor GetAddSubcellNumElementsFunctor() const {
        return m_element_csr_indices.GetAddNumItemsFunctor();
    }

    // Return the AddCellNumSubcellsFunctor using the member variable m_subcell_csr_indices.length. Call this in a kokkos parallel for loop.
    FlattenedRaggedArray::AddNumItemsFunctor GetAddCellNumSubcellsFunctor() const {
        return m_subcell_csr_indices.GetAddNumItemsFunctor();
    }

    // Should be called after AddSubcellNumNodesFunctor has been called for all subcells and should not be called in a loop.
    void CompleteAddingSubcellElementCSRIndicesOnDevice(bool set_starts_from_lengths = true) {
        m_element_csr_indices.FinishPopulatingOnDevice(set_starts_from_lengths);

        // Get the total number of elements
        m_total_num_elements = m_element_csr_indices.RaggedArraySize();
    }

    void CompleteAddingCellNumSubcellsOnDevice() {
        m_subcell_csr_indices.FinishPopulatingOnDevice();

        // Get the total number of subcells
        m_num_subcells = m_subcell_csr_indices.RaggedArraySize();
    }

    void CompleteAddingSubcellElementCSRIndicesOnHost(bool set_starts_from_lengths = true) {
        m_element_csr_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of elements
        m_total_num_elements = m_element_csr_indices.RaggedArraySize();
    }

    void CompleteAddingSubcellNumSubcellsOnHost() {
        m_subcell_csr_indices.FinishPopulatingOnHost();

        // Get the total number of subcells
        m_num_subcells = m_subcell_csr_indices.RaggedArraySize();
    }

    // Should be called after node lengths has been set for all subcells and should not be called in a loop.
    void CompleteAddingSubcellNodeCSRIndicesOnDevice(bool set_starts_from_lengths = true) {
        m_node_csr_indices.FinishPopulatingOnDevice(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_csr_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViews(m_total_num_nodes);
    }

    void CompleteAddingSubcellNodeCSRIndicesOnHost(bool set_starts_from_lengths = true) {
        m_node_csr_indices.FinishPopulatingOnHost(set_starts_from_lengths);

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_node_csr_indices.RaggedArraySize();
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeNodeViewsOnHost(m_total_num_nodes);
    }

    void CompleteSettingSizesOnDevice(bool set_starts_from_lengths = true) {
        CompleteAddingSubcellElementCSRIndicesOnDevice(set_starts_from_lengths);
        CompleteAddingSubcellNodeCSRIndicesOnDevice(set_starts_from_lengths);
    }

    void CompleteSettingSizesOnHost(bool set_starts_from_lengths = true) {
        CompleteAddingSubcellElementCSRIndicesOnHost(set_starts_from_lengths);
        CompleteAddingSubcellNodeCSRIndicesOnHost(set_starts_from_lengths);
    }

    void CopySubcellElementIndicesToHost() {
        Kokkos::deep_copy(m_element_indices_host, m_element_indices);
    }

    void CopyCellSubcellsToHost() {
        Kokkos::deep_copy(m_cell_subcells_host, m_cell_subcells);
    }

    void CopyCellVolumeToHost() {
        Kokkos::deep_copy(m_cell_volume_host, m_cell_volume);
    }

    void CopySubcellVolumeToHost() {
        Kokkos::deep_copy(m_subcell_volume_host, m_subcell_volume);
    }

    void CopySubcellElementViewsToHost() {
        CopySubcellElementIndicesToHost();
        CopySubcellVolumeToHost();
    }

    void CopySubcellNodeViewsToHost() {
        Kokkos::deep_copy(m_function_derivatives_host, m_function_derivatives);
        Kokkos::deep_copy(m_node_indices_host, m_node_indices);
    }

    void CopySubcellViewsToHost() {
        CopySubcellElementViewsToHost();
        CopySubcellNodeViewsToHost();
    }

    void CopyCellVolumeToDevice() {
        Kokkos::deep_copy(m_cell_volume, m_cell_volume_host);
    }

    void CopySubcellVolumeToDevice() {
        Kokkos::deep_copy(m_subcell_volume, m_subcell_volume_host);
    }

    void CopySubcellElementIndicesToDevice() {
        Kokkos::deep_copy(m_element_indices, m_element_indices_host);
    }

    void CopySubcellElementViewsToDevice() {
        CopySubcellVolumeToDevice();
        CopySubcellElementIndicesToDevice();
    }

    void CopySubcellNodeIndicesToDevice() {
        Kokkos::deep_copy(m_node_indices, m_node_indices_host);
    }

    void CopySubcellNodeToViewIndexMapToDevice() {
        Kokkos::deep_copy(m_node_to_view_index_map, m_node_to_view_index_map_host);
    }

    void CopySubcellFunctionDerivativesToDevice() {
        Kokkos::deep_copy(m_function_derivatives, m_function_derivatives_host);
    }

    void CopySubcellNodeViewsToDevice() {
        CopySubcellNodeIndicesToDevice();
        CopySubcellFunctionDerivativesToDevice();
    }

    void CopySubcellViewsToDevice() {
        CopySubcellElementViewsToDevice();
        CopySubcellNodeViewsToDevice();
    }

    // Return the AddItemsFunctor using m_element_indices. Call this in a kokkos parallel for loop.
    FlattenedRaggedArray::AddItemsFunctor<aperi::Index> GetAddSubcellElementFunctor() {
        return m_element_csr_indices.GetAddItemsFunctor(m_element_indices, aperi::Index(0, UINT_MAX));
    }

    // Return the AddItemsFunctor using m_cell_subcells. Call this in a kokkos parallel for loop.
    FlattenedRaggedArray::AddItemsFunctor<Unsigned> GetAddCellSubcellsFunctor() {
        return m_subcell_csr_indices.GetAddItemsFunctor(m_cell_subcells, UNSIGNED_MAX);
    }

    // Get device view of function derivatives
    Kokkos::View<double *> GetFunctionDerivatives() {
        return m_function_derivatives;
    }

    // Get host view of function derivatives
    Kokkos::View<double *>::HostMirror GetFunctionDerivativesHost() {
        return m_function_derivatives_host;
    }

    // Get host view of node indices
    Kokkos::View<aperi::Index *>::HostMirror GetNodeIndicesHost() {
        return m_node_indices_host;
    }

    // Get device view of node indices
    Kokkos::View<aperi::Index *> GetNodeIndices() {
        return m_node_indices;
    }

    // Get host view of element indices
    Kokkos::View<aperi::Index *>::HostMirror GetElementIndicesHost() {
        return m_element_indices_host;
    }

    // Get device view of element indices
    Kokkos::View<aperi::Index *> GetElementIndices() {
        return m_element_indices;
    }

    // Get host view of cell subcells
    Kokkos::View<Unsigned *>::HostMirror GetCellSubcellsHost() {
        return m_cell_subcells_host;
    }

    // Get device view of cell subcells
    Kokkos::View<Unsigned *> GetCellSubcells() {
        return m_cell_subcells;
    }

    // Get device view of cell volume
    Kokkos::View<double *> GetCellVolumes() {
        return m_cell_volume;
    }

    // Get device view of subcell volume
    Kokkos::View<double *> GetSubcellVolumes() {
        return m_subcell_volume;
    }

    // Get host view of cell volume
    Kokkos::View<double *>::HostMirror GetCellVolumesHost() {
        return m_cell_volume_host;
    }

    // Get host view of subcell volume
    Kokkos::View<double *>::HostMirror GetSubcellVolumesHost() {
        return m_subcell_volume_host;
    }

    // Get device view of subcell J
    KOKKOS_INLINE_FUNCTION
    double &GetSubcellJ(const size_t subcell_id) const {
        return m_subcell_j(subcell_id);
    }

    // Get device view of cell J-bar
    KOKKOS_INLINE_FUNCTION
    double &GetCellJBar(const size_t cell_id) const {
        return m_cell_j_bar(cell_id);
    }

    // Get the cell volume for a cell
    KOKKOS_INLINE_FUNCTION
    double GetCellVolume(size_t cell_id) const {
        return m_cell_volume(cell_id);
    }

    // Get the subcell volume for a cell
    KOKKOS_INLINE_FUNCTION
    double GetSubcellVolume(size_t subcell_id) const {
        return m_subcell_volume(subcell_id);
    }

    // Get the cell volume for a cell
    double GetCellVolumeHost(size_t cell_id) {
        return m_cell_volume_host(cell_id);
    }

    // Get the subcell volume for a cell
    double GetSubcellVolumeHost(size_t subcell_id) {
        return m_subcell_volume_host(subcell_id);
    }

    // Get the indices for the elements in a subcell. Return a kokkos subview of the element indices.
    Kokkos::View<aperi::Index *>::HostMirror GetSubcellElementIndicesHost(size_t subcell_id) {
        size_t start = m_element_csr_indices.start_host(subcell_id);
        size_t length = m_element_csr_indices.length_host(subcell_id);
        size_t end = start + length;
        return Kokkos::subview(m_element_indices_host, Kokkos::make_pair(start, end));
    }

    // Get the indices for the elements in a subcell. Return a kokkos subview of the element indices.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<aperi::Index *> GetSubcellElementIndices(size_t subcell_id) const {
        size_t start = m_element_csr_indices.start(subcell_id);
        size_t length = m_element_csr_indices.length(subcell_id);
        size_t end = start + length;
        return Kokkos::subview(m_element_indices, Kokkos::make_pair(start, end));
    }

    // Get the indices for the nodes in a subcell. Return a kokkos subview of the node indices.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<aperi::Index *> GetSubcellNodeIndices(size_t subcell_id) const {
        size_t start = m_node_csr_indices.start(subcell_id);
        size_t length = m_node_csr_indices.length(subcell_id);
        size_t end = start + length;
        return Kokkos::subview(m_node_indices, Kokkos::make_pair(start, end));
    }

    // Get the function derivatives for the nodes in a subcell. Return a kokkos subview of the function derivatives.
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<double *> GetSubcellFunctionDerivatives(size_t subcell_id) const {
        size_t start = m_node_csr_indices.start(subcell_id) * k_num_dims;
        size_t length = m_node_csr_indices.length(subcell_id) * k_num_dims;
        size_t end = start + length;
        return Kokkos::subview(m_function_derivatives, Kokkos::make_pair(start, end));
    }

    // Get the function derivatives for the nodes in a subcell. Return a kokkos subview of the function derivatives.
    Kokkos::View<double *>::HostMirror GetSubcellFunctionDerivativesHost(size_t subcell_id) {
        size_t start = m_node_csr_indices.start_host(subcell_id) * k_num_dims;
        size_t length = m_node_csr_indices.length_host(subcell_id) * k_num_dims;
        size_t end = start + length;
        return Kokkos::subview(m_function_derivatives_host, Kokkos::make_pair(start, end));
    }

    // Get the cell subcells for a cell
    Kokkos::View<Unsigned *>::HostMirror GetCellSubcellsHost(size_t cell_id) {
        size_t start = m_subcell_csr_indices.start_host(cell_id);
        size_t length = m_subcell_csr_indices.length_host(cell_id);
        return Kokkos::subview(m_cell_subcells_host, Kokkos::make_pair(start, start + length));
    }

    // Get the cell subcells for a cell
    KOKKOS_INLINE_FUNCTION
    Kokkos::View<Unsigned *> GetCellSubcells(size_t cell_id) const {
        size_t start = m_subcell_csr_indices.start(cell_id);
        size_t length = m_subcell_csr_indices.length(cell_id);
        return Kokkos::subview(m_cell_subcells, Kokkos::make_pair(start, start + length));
    }

    // Get the map from node to local index, device
    Kokkos::UnorderedMap<NodeToViewIndexMapKey, Unsigned, Kokkos::DefaultExecutionSpace, NodeToViewIndexMapKeyHash> &GetNodeToViewIndexMap() {
        return m_node_to_view_index_map;
    }

    // Get the map from node to local index, host
    Kokkos::UnorderedMap<NodeToViewIndexMapKey, Unsigned, Kokkos::DefaultHostExecutionSpace, NodeToViewIndexMapKeyHash>::HostMirror &GetNodeToViewIndexMapHost() {
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

    // Get the number of subcells
    size_t NumSubcells() const {
        return m_num_subcells;
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

    // Get a reference to the subcell indices
    FlattenedRaggedArray &GetSubcellCSRIndices() {
        return m_subcell_csr_indices;
    }

    // Debug print on host
    void DebugPrint() {
        // Set the precision
        std::cout << std::fixed << std::setprecision(12);

        // Print the number of cells
        std::cout << "Number of Cells: " << m_num_cells << std::endl;

        // Print the number of subcells
        std::cout << "Number of Subcells: " << m_num_subcells << std::endl;

        // Print the total number of nodes, elements, and components
        std::cout << "Total Number of Nodes: " << m_total_num_nodes << std::endl;
        std::cout << "Total Number of Elements: " << m_total_num_elements << std::endl;
        std::cout << "Total Number of Components: " << m_total_components << std::endl;

        // Print the node indices
        std::cout << "Node CSR Indices" << std::endl;
        for (size_t i = 0; i < m_num_subcells; ++i) {
            size_t start = m_node_csr_indices.start_host(i);
            size_t length = m_node_csr_indices.length_host(i);
            std::cout << "Subcell " << i << ": start = " << start << ", length = " << length << std::endl;
        }

        // Print the element indices
        std::cout << "Element CSR Indices" << std::endl;
        for (size_t i = 0; i < m_num_subcells; ++i) {
            size_t start = m_element_csr_indices.start_host(i);
            size_t length = m_element_csr_indices.length_host(i);
            std::cout << "Subcell " << i << ": start = " << start << ", length = " << length << std::endl;
        }

        // Print the cell volume
        std::cout << "Cell Volume" << std::endl;
        for (size_t i = 0; i < m_num_cells; ++i) {
            std::cout << "Cell " << i << ": " << m_cell_volume_host(i) << std::endl;
        }

        // Print the subcell volume
        std::cout << "Subcell Volume" << std::endl;
        for (size_t i = 0; i < m_num_subcells; ++i) {
            std::cout << "Subcell " << i << ": " << m_subcell_volume_host(i) << std::endl;
        }

        // Print the function derivatives
        std::cout << "Function Derivatives" << std::endl;
        for (size_t i = 0; i < m_num_subcells; ++i) {
            size_t start = m_node_csr_indices.start_host(i) * k_num_dims;
            size_t length = m_node_csr_indices.length_host(i) * k_num_dims;
            size_t end = start + length;
            std::cout << "Subcell " << i << ": ";
            for (size_t j = start; j < end; j += 3) {
                std::cout << "  Node " << j / 3 << ": ";
                std::cout << m_function_derivatives_host(j) << " " << m_function_derivatives_host(j + 1) << " " << m_function_derivatives_host(j + 2) << std::endl;
            }
        }

        // Print the element Aperi indices
        std::cout << "Element Aperi Indices" << std::endl;
        for (size_t i = 0; i < m_num_subcells; ++i) {
            size_t start = m_element_csr_indices.start_host(i);
            size_t length = m_element_csr_indices.length_host(i);
            size_t end = start + length;
            std::cout << "Subcell " << i << ": ";
            for (size_t j = start; j < end; ++j) {
                std::cout << m_element_indices_host(j) << " ";
            }
            std::cout << std::endl;
        }

        // Print the node aperi indices
        std::cout << "Node Aperi Indices" << std::endl;
        for (size_t i = 0; i < m_num_subcells; ++i) {
            size_t start = m_node_csr_indices.start_host(i);
            size_t length = m_node_csr_indices.length_host(i);
            size_t end = start + length;
            std::cout << "Subcell " << i << ": ";
            for (size_t j = start; j < end; ++j) {
                std::cout << m_node_indices_host(j) << " ";
            }
            std::cout << std::endl;
        }
    }

   private:
    size_t m_num_cells;       // Number of cells
    size_t m_reserved_nodes;  // Estimated total number of nodes

    FlattenedRaggedArray m_node_csr_indices;     // Indices for the nodes covering the subcells
    FlattenedRaggedArray m_element_csr_indices;  // Indices for the elements in the subcells
    FlattenedRaggedArray m_subcell_csr_indices;  // Indices for the subcells in the cells

    Kokkos::View<aperi::Index *> m_element_indices;  // Element indices
    Kokkos::View<aperi::Index *> m_node_indices;     // Node indices
    Kokkos::View<Unsigned *> m_cell_subcells;        // Subcell ids for the cells
    Kokkos::View<double *> m_function_derivatives;   // Function derivatives
    Kokkos::View<double *> m_cell_volume;            // Cell volume
    Kokkos::View<double *> m_subcell_volume;         // Subcell volume

    Kokkos::View<aperi::Index *>::HostMirror m_element_indices_host;                                                                                                // Host view of element indices
    Kokkos::View<aperi::Index *>::HostMirror m_node_indices_host;                                                                                                   // Host view of node indices
    Kokkos::View<double *>::HostMirror m_function_derivatives_host;                                                                                                 // Host view of function derivatives
    Kokkos::View<double *>::HostMirror m_cell_volume_host;                                                                                                          // Host view of cell volume
    Kokkos::View<double *>::HostMirror m_subcell_volume_host;                                                                                                       // Host view of subcell volume
    Kokkos::View<Unsigned *>::HostMirror m_cell_subcells_host;                                                                                                      // Host view of cell subcells
    Kokkos::UnorderedMap<NodeToViewIndexMapKey, Unsigned, Kokkos::DefaultExecutionSpace, NodeToViewIndexMapKeyHash> m_node_to_view_index_map;                       // Map from node to local index
    Kokkos::UnorderedMap<NodeToViewIndexMapKey, Unsigned, Kokkos::DefaultHostExecutionSpace, NodeToViewIndexMapKeyHash>::HostMirror m_node_to_view_index_map_host;  // Host map from node to local index

    size_t m_total_num_nodes = 0;            // Total number of nodes
    size_t m_total_num_elements = 0;         // Total number of elements
    size_t m_num_subcells = 0;               // Total number of subcells
    size_t m_total_components = 0;           // Total number of components (total number of nodes * number of dimensions)
    size_t m_number_of_resizes = 0;          // Number of resizes
    static constexpr size_t k_num_dims = 3;  // Number of dimensions

    // F-bar fields
    Kokkos::View<double *> m_subcell_j;   // J for each subcell
    Kokkos::View<double *> m_cell_j_bar;  // J-bar for each cell
};

}  // namespace aperi
