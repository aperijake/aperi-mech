#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <numeric>
#include <utility>
#include <vector>

#include "SmoothedCellData.h"

void PopulateLength(const Kokkos::View<uint64_t *> &length) {
    Kokkos::parallel_for(
        "PopulateLength", length.size(), KOKKOS_LAMBDA(const size_t i) {
            length(i) = i + 1;
        });
}

TEST(FlattenedRaggedArray, Create) {
    aperi::FlattenedRaggedArray fra(5);
    // Populate the length in a kokkos parallel for loop
    PopulateLength(fra.length);

    // Set the starts from the lengths
    fra.SetStartsFromLengths();

    // Get host view with copy of length
    auto start_host = fra.GetStartHost();

    // Create a host view with the expected start values
    Kokkos::View<uint64_t *>::HostMirror expected_start = Kokkos::create_mirror_view(fra.start);
    expected_start(0) = 0;
    expected_start(1) = 1;
    expected_start(2) = 3;
    expected_start(3) = 6;
    expected_start(4) = 10;

    // Get host view with copy of start
    for (size_t i = 0; i < 5; ++i) {
        EXPECT_EQ(start_host(i), expected_start(i));
    }
}

class SmoothedCellDataFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

   public:
    void BuildAndTestSmoothedCellData() const {
        // Create the SmoothedCellData object
        aperi::SmoothedCellData scd(m_num_cells, m_reserved_num_nodes);

        // Add cell num nodes in a kokkos parallel for loop
        auto add_cell_num_nodes_functor = scd.GetAddCellNumNodesFunctor();
        Kokkos::parallel_for(
            "AddCellNumNodes", m_num_cells, KOKKOS_LAMBDA(const size_t i) {
                add_cell_num_nodes_functor(i, i + 1);
            });
        scd.CompleteAddingCellIndices();

        // Add cell elements in a kokkos parallel for loop
        auto add_cell_element_functor = scd.GetAddCellElementFunctor<1>();
        Kokkos::parallel_for(
            "AddCellElements", m_num_cells, KOKKOS_LAMBDA(const size_t i) {
                for (size_t j = 0; j < i + 1; ++j) {
                    Eigen::Matrix<uint64_t, 1, 1> elem_node_local_offsets;
                    elem_node_local_offsets << j;
                    Eigen::Matrix<double, 1, 3> derivatives;
                    derivatives << 3 * j + 1, 3 * j + 2, 3 * j + 3;
                    add_cell_element_functor(i, elem_node_local_offsets, derivatives);
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
        auto second_add_cell_element_functor = scd.GetAddCellElementFunctor<3>();
        Kokkos::parallel_for(
            "AddCellElements", m_num_cells, KOKKOS_LAMBDA(const size_t i) {
                if (i != 2) {
                    return;
                }
                Eigen::Matrix<uint64_t, 3, 1> elem_node_local_offsets;
                elem_node_local_offsets << 0, 1, 2;
                Eigen::Matrix<double, 3, 3> derivatives;
                derivatives << -1.0, -2.0, -3.0,
                    -4.0, -5.0, -6.0,
                    -7.0, -8.0, -9.0;
                second_add_cell_element_functor(i, elem_node_local_offsets, derivatives);
            });

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

TEST_F(SmoothedCellDataFixture, BuildAndTestSmoothedCellDataWithGrowingArray) {
    m_reserved_num_nodes = 1;
    BuildAndTestSmoothedCellData();
}

TEST_F(SmoothedCellDataFixture, BuildAndTestSmoothedCellDataWithShrinkingArray) {
    m_reserved_num_nodes = 50;
    BuildAndTestSmoothedCellData();
}