#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <numeric>
#include <vector>

namespace aperi {

struct FlattenedRaggedArray {

    explicit FlattenedRaggedArray(size_t num_items) {
        Resize(num_items);
    }

    void Resize(size_t num_items) {
        start = Kokkos::View<uint64_t*>("start", num_items);
        length = Kokkos::View<uint64_t*>("length", num_items);
    }

    void SetStartsFromLengths() {
        Kokkos::parallel_scan("SetStartsFromLengths", length.size(), KOKKOS_LAMBDA(const int i, uint64_t& update, const bool final) {
            update += length(i);
            if (final) {
                start(i) = update - length(i);
            }
        });
    }

    Kokkos::View<uint64_t*> start;
    Kokkos::View<uint64_t*> length;
};

class SmoothedCellData {
   public:
    SmoothedCellData(size_t num_cells, size_t estimated_total_num_nodes)
        : m_num_cells(num_cells), m_reserved_nodes(estimated_total_num_nodes), m_indices(num_cells), m_function_derivatives("function_derivatives", 0), m_node_local_offsets("node_local_offsets", 0) {
        // Resize views
        ResizeViews(estimated_total_num_nodes);
        // Fill the new elements with the maximum uint64_t value
        Kokkos::parallel_for("FillNewLocalOffsets", Kokkos::RangePolicy<>(0, estimated_total_num_nodes), KOKKOS_LAMBDA(const size_t i) {
            m_node_local_offsets(i) = std::numeric_limits<uint64_t>::max();
        });
    }

    // Function to add cell num_nodes. This should be called first after creating the SmoothedCellData object and can be called in a loop.
    void AddCellNumNodes(size_t cell_id, size_t num_nodes) {
        // Add the length to the indices
        m_indices.length(cell_id) = num_nodes;
    }

    // Populate the indices start. Should be called after AddCellNumNodes has been called for all cells and should not be called in a loop.
    void CompleteAddingCellIndices() {
        m_indices.SetStartsFromLengths();

        // Get the total number of nodes and number of components
        m_total_num_nodes = m_indices.start(m_num_cells - 1) + m_indices.length(m_num_cells - 1);
        m_total_components = m_total_num_nodes * k_num_dims;

        // Resize the views
        ResizeViews(m_total_num_nodes);
    }

    // Add an element to the cell
    template <size_t NumNodes>
    void AddCellElement(size_t cell_id, const Eigen::Matrix<uint64_t, NumNodes, 1> &elem_node_local_offsets, const Eigen::Matrix<double, NumNodes, 3> &derivatives) {
        // Get the start and length for the cell
        uint64_t start = m_indices.start(cell_id);
        uint64_t length = m_indices.length(cell_id);
        uint64_t end = start + length - 1;

        // Get the current number of nodes by finding the first element in the array that is the maximum uint64_t value
        size_t current_cell_num_nodes = 0;
        for (size_t j = start; j < end + 1; j++) {
            if (m_node_local_offsets(j) == std::numeric_limits<uint64_t>::max()) {
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
                if (m_node_local_offsets(j) == elem_node_local_offsets(i)) {
                    found = true;
                    node_i = j;
                    break;
                }
            }
            m_node_local_offsets(node_i) = elem_node_local_offsets(i);
            for (size_t j = 0; j < k_num_dims; j++) {
                // Atomically add the derivatives to the function_derivatives
                Kokkos::atomic_add(&m_function_derivatives(node_i * k_num_dims + j), derivatives(i, j));
            }
            if (!found) {
                current_cell_num_nodes++;
            }
        }
    }

    // Function to finalize and resize views. Should be called last and not in a loop.
    void Finalize() {
        ResizeViews(m_total_num_nodes);
    }

    // Get host view with copy of function derivatives
    Kokkos::View<double*>::HostMirror GetFunctionDerivativesHost() {
        // Create a host view
        Kokkos::View<double*>::HostMirror function_derivatives_host = Kokkos::create_mirror_view(m_function_derivatives);
        // Copy the function derivatives to the host
        Kokkos::deep_copy(function_derivatives_host, m_function_derivatives);
        return function_derivatives_host;
    }

    // Get host view with copy of node local offsets
    Kokkos::View<uint64_t*>::HostMirror GetNodeLocalOffsetsHost() {
        // Create a host view
        Kokkos::View<uint64_t*>::HostMirror node_local_offsets_host = Kokkos::create_mirror_view(m_node_local_offsets);
        // Copy the node local offsets to the host
        Kokkos::deep_copy(node_local_offsets_host, m_node_local_offsets);
        return node_local_offsets_host;
    }

    // Get the total number of nodes
    size_t TotalNumNodes() {
        return m_total_num_nodes;
    }

    // Get the total number of components
    size_t TotalNumComponents() {
        return m_total_components;
    }

   private:
    // Function to resize views
    void ResizeViews(size_t new_total_num_nodes) {
        Kokkos::resize(m_function_derivatives, new_total_num_nodes * k_num_dims);
        Kokkos::resize(m_node_local_offsets, new_total_num_nodes);
        // Fill the new elements with the maximum uint64_t value
        Kokkos::parallel_for("FillNewLocalOffsets", Kokkos::RangePolicy<>(m_reserved_nodes, new_total_num_nodes), KOKKOS_LAMBDA(const size_t i) {
            m_node_local_offsets(i) = std::numeric_limits<uint64_t>::max();
        });
        m_reserved_nodes = new_total_num_nodes;
    }

    // Member variables
    size_t m_num_cells;
    size_t m_reserved_nodes;
    FlattenedRaggedArray m_indices;
    Kokkos::View<double*> m_function_derivatives;
    Kokkos::View<uint64_t*> m_node_local_offsets;
    size_t m_total_num_nodes = 0;
    size_t m_total_components = 0;
    static constexpr size_t k_num_dims = 3;
};

}  // namespace aperi

TEST(FlattenedRaggedArray, Create) {
    aperi::FlattenedRaggedArray fra(5);
    fra.length(0) = 1;
    fra.length(1) = 2;
    fra.length(2) = 3;
    fra.length(3) = 4;
    fra.length(4) = 5;
    fra.SetStartsFromLengths();
    Kokkos::View<uint64_t*> expected_start("expected_start", 5);
    expected_start(0) = 0;
    expected_start(1) = 1;
    expected_start(2) = 3;
    expected_start(3) = 6;
    expected_start(4) = 10;
    for (size_t i = 0; i < 5; ++i) {
        EXPECT_EQ(fra.start(i), expected_start(i));
    }
}

class SmoothedCellDataFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

    void BuildAndTestSmoothedCellData() {
        // Create the SmoothedCellData object
        aperi::SmoothedCellData scd(m_num_cells, m_reserved_num_nodes);

        // Add cell num nodes in a kokkos parallel for loop
        Kokkos::parallel_for("AddCellNumNodes", m_num_cells, [&scd](const size_t i) {
            scd.AddCellNumNodes(i, i + 1);
        });
        scd.CompleteAddingCellIndices();

        // Add cell elements in a kokkos parallel for loop
        Kokkos::parallel_for("AddCellElements", m_num_cells, [&scd](const size_t i) {
            for (size_t j = 0; j < i + 1; ++j) {
                Eigen::Matrix<uint64_t, 1, 1> elem_node_local_offsets;
                elem_node_local_offsets << j;
                Eigen::Matrix<double, 1, 3> derivatives;
                derivatives << 3 * j + 1, 3 * j + 2, 3 * j + 3;
                scd.AddCellElement<1>(i, elem_node_local_offsets, derivatives);
            }
        });
        scd.Finalize();

        // Get the total number of nodes and total number of components
        size_t total_num_nodes = scd.TotalNumNodes();
        size_t total_num_components = scd.TotalNumComponents();

        // Check the number of nodes and components
        EXPECT_EQ(total_num_nodes, 6);
        EXPECT_EQ(total_num_components, 18);

        // Copy the node local offsets to host
        auto node_local_offsets_host = scd.GetNodeLocalOffsetsHost();

        // Expected: 0, 0, 1, 0, 1, 2
        std::vector<uint64_t> expected_node_local_offsets = {0, 0, 1, 0, 1, 2};

        // Check the node local offsets.
        for (size_t i = 0; i < total_num_nodes; ++i) {
            EXPECT_EQ(node_local_offsets_host(i), expected_node_local_offsets[i]) << "i: " << i;
        }

        // Copy the function derivatives to host
        auto function_derivatives_host = scd.GetFunctionDerivativesHost();

        // Check the function derivatives
        size_t node_i = 0;
        for (size_t i = 0; i < m_num_cells; ++i) {
            Eigen::Matrix<double, 1, 3> expected_derivatives;
            expected_derivatives << 1.0, 2.0, 3.0;
            for (size_t j = 0; j < i + 1; ++j) {
                for (size_t k = 0; k < 3; ++k) {
                    EXPECT_EQ(function_derivatives_host(node_i * 3 + k), expected_derivatives(k)) << "i: " << i << " j: " << j << " k: " << k;
                }
                ++node_i;
                expected_derivatives << expected_derivatives(0) + 3.0, expected_derivatives(1) + 3.0, expected_derivatives(2) + 3.0;
            }
        }

        // Add more elements to the last cell in the  SmoothedCellData object to cancel out the derivative values
        Eigen::Matrix<uint64_t, 3, 1> elem_node_local_offsets;
        elem_node_local_offsets << 0, 1, 2;
        Eigen::Matrix<double, 3, 3> derivatives;
        derivatives <<  -1.0, -2.0, -3.0,
                        -4.0, -5.0, -6.0,
                        -7.0, -8.0, -9.0;
        scd.AddCellElement<3>(2, elem_node_local_offsets, derivatives);

        // Get the total number of nodes and total number of components
        total_num_nodes = scd.TotalNumNodes();
        total_num_components = scd.TotalNumComponents();

        // Check the number of nodes and components, unchanged
        EXPECT_EQ(total_num_nodes, 6);
        EXPECT_EQ(total_num_components, 18);

        // Copy the function derivatives to host
        function_derivatives_host = scd.GetFunctionDerivativesHost();

        // Check the function derivatives
        node_i = 0;
        for (size_t i = 0; i < m_num_cells; ++i) {
            Eigen::Matrix<double, 1, 3> expected_derivatives = Eigen::Matrix<double, 1, 3>::Zero();
            if (i < 2) {
                expected_derivatives << 1.0, 2.0, 3.0;
            }
            for (size_t j = 0; j < i + 1; ++j) {
                for (size_t k = 0; k < 3; ++k) {
                    EXPECT_EQ(function_derivatives_host(node_i * 3 + k), expected_derivatives(k)) << "i: " << i << " j: " << j << " k: " << k;
                }
                ++node_i;
                if (i < 2) {
                    expected_derivatives << expected_derivatives(0) + 3.0, expected_derivatives(1) + 3.0, expected_derivatives(2) + 3.0;
                }
            }
        }
    }

    size_t m_num_cells = 3;
    size_t m_reserved_num_nodes = 6;
};

TEST_F(SmoothedCellDataFixture, BuildAndTestSmoothedCellData) {
    BuildAndTestSmoothedCellData();
}

TEST_F(SmoothedCellDataFixture, BuildAndTestSmoothedCellDataWithResizing) { 
    m_reserved_num_nodes = 1;
    BuildAndTestSmoothedCellData();
}