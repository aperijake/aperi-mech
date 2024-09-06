#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>

#include "Constants.h"
#include "FieldData.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "NeighborSearchProcessorTestFixture.h"
#include "UnitTestUtils.h"

TEST_F(NeighborSearchProcessorTestFixture, Ring0SearchNode) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    bool set_first_function_value = true;
    m_search_processor->add_nodes_ring_0_nodes(set_first_function_value);
    m_search_processor->SyncFieldsToHost();
    std::array<uint64_t, 1> expected_num_neighbors_data = {1};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    std::array<double, aperi::MAX_NODE_NUM_NEIGHBORS> expected_function_values_data;
    expected_function_values_data.fill(0.0);
    expected_function_values_data[0] = 1.0;
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "function_values", expected_function_values_data, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats();
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], 1);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);
}

TEST_F(NeighborSearchProcessorTestFixture, FillElementFromNodeRing0Search) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->SyncFieldsToHost();
    std::array<double, aperi::MAX_CELL_NUM_NODES> expected_neighbors_data;
    expected_neighbors_data.fill(0.0);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats();
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], 1);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);
}

TEST_F(NeighborSearchProcessorTestFixture, BallSearchSmall) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double kernel_radius = 0.5;  // Small ball radius, only 1 neighbor
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);
    m_search_processor->SyncFieldsToHost();
    std::array<uint64_t, 1> expected_num_neighbors_data = {1};
    std::array<double, 1> expected_kernel_radius = {kernel_radius};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radius, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats();
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], 1);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);
}

TEST_F(NeighborSearchProcessorTestFixture, BallSearchLarge) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Diagonal length of the mesh
    double diagonal_length = std::sqrt(m_num_elements_x * m_num_elements_x + m_num_elements_y * m_num_elements_y + m_num_elements_z * m_num_elements_z);
    double kernel_radius = 1.01 * diagonal_length;  // Large ball radius, all nodes are neighbors
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);
    m_search_processor->SyncFieldsToHost();
    // Num nodes
    uint64_t num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    std::array<uint64_t, 1> expected_num_neighbors_data = {num_nodes};
    std::array<double, 1> expected_kernel_radius = {kernel_radius};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radius, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats();
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], num_nodes);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], num_nodes);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], num_nodes);
    EXPECT_EQ(node_neighbor_stats["num_entities"], num_nodes);
}

TEST_F(NeighborSearchProcessorTestFixture, BallSearchMid) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 2;
    m_num_elements_y = 2;
    m_num_elements_z = 4;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double kernel_radius = 1.01;  // Mid ball radius
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);
    m_search_processor->SyncFieldsToHost();
    std::array<double, 1> expected_kernel_radius = {kernel_radius};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radius, aperi::FieldQueryState::None);
    // 8 corners of the mesh = 4 neighbors
    // 20 edges of the mesh = 5 neighbors
    // 14 faces of the mesh = 6 neighbors
    // 3 interior nodes = 7 neighbors
    // Make a pair with value (num neighbors) and expected count
    std::vector<std::pair<uint64_t, size_t>> expected_num_neighbors_data = {{4, 8}, {5, 20}, {6, 14}, {7, 3}};
    CheckEntityFieldValueCount<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats();
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 4);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 7);
    double expected_avg_num_neighbors = (8.0 * 4.0 + 20.0 * 5.0 + 14.0 * 6.0 + 3.0 * 7.0) / expected_num_nodes;
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], expected_avg_num_neighbors);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);
}

TEST_F(NeighborSearchProcessorTestFixture, VariableBallSearch) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 5) {
        GTEST_SKIP_("Test only runs with 5 or fewer processes.");
    }
    m_num_elements_x = 5;
    m_num_elements_y = 5;
    m_num_elements_z = 5;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double ball_scale_factor = 1.1;
    m_search_processor->add_nodes_neighbors_within_variable_ball(ball_scale_factor);
    m_search_processor->SyncFieldsToHost();

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats();
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 8);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 27);
    EXPECT_NEAR(node_neighbor_stats["avg_num_neighbors"], 18.713, 0.001);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);
}

TEST_F(NeighborSearchProcessorTestFixture, KernelRadius) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double kernel_radius_scale_factor = 1.01;  // Slightly larger to make sure and capture neighbors that would have been exactly on the radius
    m_search_processor->add_nodes_neighbors_within_variable_ball(kernel_radius_scale_factor);
    m_search_processor->SyncFieldsToHost();
    // After htet, each hex element has one pair of tets that cut across the diagonal of the hex. The rest cut across the faces.
    std::vector<std::pair<double, size_t>> expected_kernel_radii = {{std::sqrt(2.0) * kernel_radius_scale_factor, 12}, {std::sqrt(3.0) * kernel_radius_scale_factor, 8}};
    CheckEntityFieldValueCount<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radii, aperi::FieldQueryState::None);
    // 8 corners of the mesh, 2 nodes will have the larger sqrt(3) radius, 6 nodes will have the smaller sqrt(2) radius.
    // 12 edges of the mesh, 6 nodes will have the larger sqrt(3) radius, 6 nodes will have the smaller sqrt(2) radius.
    // Make a pair with value (num neighbors) and expected count
    std::vector<std::pair<uint64_t, size_t>> expected_num_neighbors_data = {{7, 4}, {8, 4}, {10, 6}, {11, 2}, {12, 4}};
    CheckEntityFieldValueCount<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
}

TEST_F(NeighborSearchProcessorTestFixture, NeighborsAreActive) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;

    // Create the mesh and processors
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    // Set the active field to 0 or 1
    int seed = 42;
    RandomSetValuesFromList<aperi::FieldDataTopologyRank::NODE, uint64_t>(*m_mesh_data, {"block_1"}, "active", {0, 1}, aperi::FieldQueryState::None, seed);

    // Check that the active field has 1s and 0s
    auto active_values = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, uint64_t, 1>(*m_mesh_data, {"block_1"}, "active", aperi::FieldQueryState::None);
    size_t num_zeros = 0;
    size_t num_ones = 0;
    for (int i = 0; i < active_values.rows(); i++) {
        if (active_values(i, 0) == 0) {
            num_zeros++;
        } else if (active_values(i, 0) == 1) {
            num_ones++;
        } else {
            FAIL() << "Active field value is not 0 or 1";
        }
    }

    size_t global_num_zeros = 0;
    size_t global_num_ones = 0;
    MPI_Allreduce(&num_zeros, &global_num_zeros, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&num_ones, &global_num_ones, 1, MPI_UNSIGNED_LONG, MPI_SUM, MPI_COMM_WORLD);

    EXPECT_GT(global_num_zeros, 0);
    EXPECT_GT(global_num_ones, 0);
    EXPECT_EQ(global_num_zeros + global_num_ones, (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1));

    // Add neighbors within a ball
    double kernel_radius_scale_factor = 1.1;  // Slightly larger to make sure and capture neighbors that would have been exactly on the radius
    m_search_processor->add_nodes_neighbors_within_variable_ball(kernel_radius_scale_factor);
    m_search_processor->SyncFieldsToHost();

    // Check that the neighbors are active
    // CheckNeighborsAreActive();
}