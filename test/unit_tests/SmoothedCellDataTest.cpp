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
    Kokkos::fence();
}

TEST(FlattenedRaggedArray, Create) {
    aperi::FlattenedRaggedArray fra(5);
    // Populate the length in a kokkos parallel for loop
    PopulateLength(fra.length);

    // Set the starts from the lengths
    fra.FinishPopulatingOnDevice();

    // Get host view with copy of length
    auto start_host = fra.GetStartViewHost();

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
        /*
            3          4           5
            ___________  ___________
           |\          ||\          |
           |  \    1   ||  \    3   |
           |    \      ||    \      |
           |      \    ||      \    |
           |  0     \  ||   2    \  |
           |__________\||__________\|
           0           1           2

           Unit cubes.
           - 6 nodes
             - node 0: coordinates: 0, 0, 0
             - node 1: coordinates: 1, 0, 0
             - node 2: coordinates: 2, 0, 0
             - node 3: coordinates: 0, 1, 0
             - node 4: coordinates: 1, 1, 0
             - node 5: coordinates: 2, 1, 0
           - 4 elements
             - element 0: nodes: 0, 1, 3
             - element 1: nodes: 1, 4, 3
             - element 2: nodes: 1, 2, 4
             - element 3: nodes: 2, 5, 4
           - 3 subcells:
             - subcell 0: elements: 0     nodes: 0, 1, 3
             - subcell 1: elements: 1     nodes: 1, 4, 3
             - subcell 2: elements: 2, 3  nodes: 1, 2, 4, 5
           - 2 cells:
             - cell 0: subcells: 0, 1
             - cell 1: subcells: 2
        */

        std::vector<std::array<double, 3>> node_coords = {
            {0, 0, 0},
            {1, 0, 0},
            {2, 0, 0},
            {0, 1, 0},
            {1, 1, 0},
            {2, 1, 0},
        };

        std::vector<std::array<uint64_t, 3>> element_nodes = {
            {0, 1, 3},
            {1, 4, 3},
            {1, 2, 4},
            {2, 5, 4},
        };

        std::vector<std::vector<uint64_t>> subcell_elements = {
            {0},
            {1},
            {2, 3},
        };

        std::vector<std::vector<uint64_t>> cell_subcells = {
            {0, 1},
            {2},
        };

        // Element function derivatives, 3 components for each node on each element
        std::vector<std::vector<std::vector<double>>> element_function_derivatives = {
            {
                {-1, -1, 0},
                {1, 0, 0},
                {0, 1, 0},
            },
            {
                {0, -1, 0},
                {1, 1, 0},
                {-1, 0, 0},
            },
            {
                {-1, -1, 0},
                {1, 0, 0},
                {0, 1, 0},
            },
            {
                {0, -1, 0},
                {1, 1, 0},
                {-1, 0, 0},
            },
        };

        // Create the SmoothedCellData object
        aperi::SmoothedCellData scd(m_num_cells, m_num_subcells, m_num_elements, m_reserved_num_nodes);

        // Add subcell num elements in a kokkos parallel for loop
        auto add_subcell_num_elements_functor = scd.GetAddSubcellNumElementsFunctor();
        Kokkos::parallel_for(
            "AddSubcellNumElements", m_num_subcells, KOKKOS_LAMBDA(const size_t i) {
                if (i < 2) {
                    add_subcell_num_elements_functor(i, 1);
                } else {
                    add_subcell_num_elements_functor(i, 2);
                }
            });
        Kokkos::fence();
        scd.CompleteAddingSubcellElementCSRIndicesOnDevice();

        // Check the element indices before adding elements. Should be all UINT_MAX
        auto element_indices_host_pre = scd.GetElementIndicesHost();
        for (size_t i = 0; i < m_num_elements; ++i) {
            EXPECT_EQ(element_indices_host_pre(i), aperi::Index(0, UINT_MAX)) << "i: " << i;
        }

        double element_volume = 0.5;  // Volume of half of a unit cube

        // Add subcell elements in a kokkos parallel for loop
        auto add_subcell_element_functor = scd.GetAddSubcellElementFunctor();
        Kokkos::parallel_for(
            "AddSubcellElements", m_num_subcells, KOKKOS_LAMBDA(const size_t i) {
                aperi::Index element_index(0, i);
                add_subcell_element_functor(i, element_index);
                if (i == 2) {
                    aperi::Index element_index_2(0, i + 1);
                    add_subcell_element_functor(i, element_index_2);
                }
            });
        Kokkos::fence();

        // Add cell num subcells in a kokkos parallel for loop
        auto add_cell_num_subcells_functor = scd.GetAddCellNumSubcellsFunctor();
        Kokkos::parallel_for(
            "AddCellNumSubcells", m_num_cells, KOKKOS_LAMBDA(const size_t i) {
                if (i == 0) {
                    add_cell_num_subcells_functor(i, 2);
                } else {
                    add_cell_num_subcells_functor(i, 1);
                }
            });
        Kokkos::fence();
        scd.CompleteAddingCellNumSubcellsOnDevice();

        // Check the cell subcells before adding subcells. Should be all UINT64_MAX
        auto cell_subcells_host_pre = scd.GetCellSubcellsHost();
        for (size_t i = 0; i < m_num_cells; ++i) {
            EXPECT_EQ(cell_subcells_host_pre(i), UINT64_MAX) << "i: " << i;
        }

        // Add to the subcell volume in a kokkos parallel for loop
        auto subcell_volumes = scd.GetSubcellVolumes();
        Kokkos::parallel_for(
            "AddToSubcellVolume", m_num_subcells, KOKKOS_LAMBDA(const size_t i) {
                subcell_volumes(i) += element_volume;
                if (i == 2) {
                    subcell_volumes(i) += element_volume;
                }
            });
        Kokkos::fence();

        // Copy the subcell data to the host
        scd.CopySubcellViewsToHost();

        // Check the subcell volumes
        auto subcell_volume_host = scd.GetSubcellVolumesHost();
        EXPECT_EQ(subcell_volume_host(0), 0.5);
        EXPECT_EQ(subcell_volume_host(1), 0.5);
        EXPECT_EQ(subcell_volume_host(2), 1.0);

        // Get host views of the node index lengths and starts
        auto node_lengths = scd.GetNodeCSRIndices().GetLengthViewHost();
        auto node_starts = scd.GetNodeCSRIndices().GetStartViewHost();
        node_starts(0) = 0;  // Set the start for the first cell

        // Get host views of the node derivatives and indices
        auto node_function_derivatives = scd.GetFunctionDerivativesHost();
        auto node_indicies = scd.GetNodeIndicesHost();

        // Loop over all the subcells
        for (size_t i = 0, e = scd.NumSubcells(); i < e; ++i) {
            // Get the subcell element indices
            auto subcell_element_indices = scd.GetSubcellElementIndicesHost(i);
            // Check the GetSubcellElementIndicesHost function returns the correct size and values
            if (i < 2) {
                EXPECT_EQ(subcell_element_indices.size(), 1) << "i: " << i;
                EXPECT_EQ(subcell_element_indices[0], aperi::Index(0, i)) << "i: " << i;
            } else {
                EXPECT_EQ(subcell_element_indices.size(), 2) << "i: " << i;
                EXPECT_EQ(subcell_element_indices[0], aperi::Index(0, i)) << "i: " << i;
                EXPECT_EQ(subcell_element_indices[1], aperi::Index(0, i + 1)) << "i: " << i;
            }

            // Create a set of node entities. Using a set to ensure no duplicates.
            std::set<uint64_t> node_entities;

            // Loop over all the subcell element indices
            for (size_t j = 0, je = subcell_element_indices.size(); j < je; ++j) {
                auto element_index = subcell_element_indices[j];
                std::array<uint64_t, 3> this_element_nodes = element_nodes[element_index.bucket_ord()];
                for (uint64_t this_element_node : this_element_nodes) {
                    node_entities.insert(this_element_node);
                }
            }

            // Set the length to the length of the set
            node_lengths(i) = node_entities.size();

            // Check the node lengths
            if (i < 2) {
                EXPECT_EQ(node_lengths(i), 3) << "i: " << i;
            } else {
                EXPECT_EQ(node_lengths(i), 4) << "i: " << i;
            }

            // Set the start to the start + length of the previous subcell, if not the first subcell
            if (i > 0) {
                node_starts(i) = node_starts(i - 1) + node_lengths(i - 1);
            }

            // Resize the node views if necessary
            size_t node_indicies_size = node_starts(i) + node_lengths(i);
            size_t current_node_indicies_size = node_indicies.extent(0);
            if (node_indicies_size > current_node_indicies_size) {
                // Calculate the percent done
                double percent_done = static_cast<double>(i + 1) / static_cast<double>(e);

                // Estimate the expected size based on the percent done. Then multiply by 1.5 to give some buffer.
                auto expected_size = static_cast<size_t>(static_cast<double>(node_indicies_size) * 1.5 * (1.0 + percent_done));

                // Double the size of the node indices
                scd.ResizeNodeViewsOnHost(expected_size);

                // Get the new host views of the node indices
                node_function_derivatives = scd.GetFunctionDerivativesHost();
                node_indicies = scd.GetNodeIndicesHost();
            }

            // Loop over the node entities, create a map of local offsets to node indices
            std::map<size_t, size_t> node_local_offsets_to_index;
            size_t node_index = node_starts(i);
            for (auto &&node : node_entities) {
                uint64_t node_local_offset = node;  // Just use the node index as the local offset in this test
                aperi::Index node_id(0, node_local_offset);
                node_indicies(node_index) = node_id;
                node_local_offsets_to_index[node_local_offset] = node_index;
                ++node_index;
            }

            // Loop over all the subcell elements
            for (size_t j = 0, je = subcell_element_indices.size(); j < je; ++j) {
                auto element_index = subcell_element_indices[j];
                std::array<uint64_t, 3> this_element_nodes = element_nodes[element_index.bucket_ord()];

                std::vector<std::vector<double>> element_function_derivatives_data = element_function_derivatives[element_index.bucket_ord()];

                // Loop over all the nodes in the element
                for (size_t k = 0, ke = this_element_nodes.size(); k < ke; ++k) {
                    size_t node_component_index = node_local_offsets_to_index[this_element_nodes[k]] * 3;
                    // Add to the derivatives and set the node local offsets for the cell
                    for (size_t l = 0; l < 3; ++l) {
                        node_function_derivatives(node_component_index) += element_function_derivatives_data[k][l];
                        ++node_component_index;
                    }
                }
            }
        }
        bool set_start_from_lengths = false;  // The start array is already set above. This can be done as we are on host and looping through sequentially.
        scd.CompleteAddingSubcellNodeCSRIndicesOnHost(set_start_from_lengths);
        scd.CopySubcellNodeViewsToDevice();

        // Get the total number of nodes, element and components
        size_t total_num_nodes = scd.TotalNumNodes();
        size_t total_num_elements = scd.TotalNumElements();
        size_t total_num_components = scd.TotalNumComponents();
        size_t total_num_subcells = scd.NumSubcells();
        size_t total_num_cells = scd.NumCells();

        // Check the number of nodes and components
        EXPECT_EQ(total_num_nodes, 10);  // 3 for subcell 0, 3 for subcell 1, 4 for subcell 2
        EXPECT_EQ(total_num_elements, 4);
        EXPECT_EQ(total_num_components, 30);  // 3 for each node
        EXPECT_EQ(total_num_subcells, 3);
        EXPECT_EQ(total_num_cells, 2);

        // Copy the node indices to host
        auto node_indicies_host = scd.GetNodeIndicesHost();

        // Expected: 0 1 3 1 3 4 1 2 4 5, all with bucket 0
        std::vector<aperi::Index> expected_node_indices = {
            {0, 0},
            {0, 1},
            {0, 3},
            {0, 1},
            {0, 3},
            {0, 4},
            {0, 1},
            {0, 2},
            {0, 4},
            {0, 5},
        };

        // Check the node indices
        for (size_t i = 0; i < total_num_nodes; ++i) {
            EXPECT_EQ(node_indicies_host(i), expected_node_indices[i]) << "i: " << i;
        }

        // Copy the element indices to host
        auto element_indices_host = scd.GetElementIndicesHost();

        // Expected: 0, 1, 2, 3
        std::vector<aperi::Index> expected_element_indices = {aperi::Index(0, 0),
                                                              aperi::Index(0, 1),
                                                              aperi::Index(0, 2),
                                                              aperi::Index(0, 3)};

        // Check the element indices
        for (size_t i = 0; i < total_num_elements; ++i) {
            EXPECT_EQ(element_indices_host(i), expected_element_indices[i]) << "i: " << i;
        }

        // Copy the function derivatives to host
        auto function_derivatives_host = scd.GetFunctionDerivativesHost();

        // Check the function derivatives
        // First subcell should have the same as the first element
        std::vector<size_t> node_order = {0, 1, 2};
        for (size_t i = 0; i < 3; ++i) {
            for (size_t j = 0; j < 3; ++j) {
                EXPECT_EQ(function_derivatives_host(i * 3 + j), element_function_derivatives[0][node_order[i]][j]) << "i: " << i << " j: " << j;
            }
        }
        // Second subcell should have the same as the second element, but with the last two nodes transposed
        node_order = {0, 2, 1};
        for (size_t i = 0; i < 3; ++i) {
            for (size_t j = 0; j < 3; ++j) {
                EXPECT_EQ(function_derivatives_host(9 + i * 3 + j), element_function_derivatives[1][node_order[i]][j]) << "i: " << i << " j: " << j;
            }
        }
        // Third subcell
        std::vector<std::vector<double>> element_function_derivatives_3 = {
            {-1, -1, 0},
            {1, -1, 0},
            {-1, 1, 0},
            {1, 1, 0},
        };
        for (size_t i = 0; i < 4; ++i) {
            for (size_t j = 0; j < 3; ++j) {
                EXPECT_EQ(function_derivatives_host(18 + i * 3 + j), element_function_derivatives_3[i][j]) << "i: " << i << " j: " << j;
            }
        }
    }

    size_t m_num_cells = 2;
    size_t m_num_subcells = 3;
    size_t m_num_elements = 4;
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
