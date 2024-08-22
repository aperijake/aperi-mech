#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>

#include "Constants.h"
#include "FieldData.h"
#include "FunctionValueStorageProcessorTestFixture.h"
#include "MeshData.h"
#include "UnitTestUtils.h"

// These tests ensure:
// 1. The function value storage processor can compute and store function values for reproducing kernel shape functions.
// 2. The shape functions are computed correctly (pass partition of unity test).
// This is mainly an integration test to ensure the function value storage processor works correctly with the shape functions functor.
// The shape functions functor is tested in more detail in the ShapeFunctionsFunctorsTest.cpp file.
TEST_F(FunctionValueStorageProcessorTestFixture, OneNeighbor) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->SyncFieldsToHost();

    BuildFunctionValueStorageProcessor();

    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_function_value_storage_processor->SyncFieldsToHost();

    std::array<uint64_t, 1> expected_num_neighbors_data = {1};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    std::array<double, aperi::MAX_NODE_NUM_NEIGHBORS> expected_function_values_data;
    expected_function_values_data.fill(0.0);
    expected_function_values_data[0] = 1.0;
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "function_values", expected_function_values_data, aperi::FieldQueryState::None);
}

TEST_F(FunctionValueStorageProcessorTestFixture, MoreNeighborsStructuredMesh) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double kernel_radius = 1.9;
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);
    m_search_processor->SyncFieldsToHost();

    BuildFunctionValueStorageProcessor();

    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_function_value_storage_processor->SyncFieldsToHost();

    // Get the coordinates of the nodes
    const Eigen::Matrix<double, Eigen::Dynamic, 3> coordinates = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, {"block_1"}, m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None);

    // Get the number of neighbors
    const Eigen::Matrix<uint64_t, Eigen::Dynamic, 1> num_neighbors = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, uint64_t, 1>(*m_mesh_data, {"block_1"}, "num_neighbors", aperi::FieldQueryState::None);

    // Check the number of neighbors
    EXPECT_GT(num_neighbors.size(), 0);
    EXPECT_EQ(num_neighbors.size(), coordinates.rows());
    for (int i = 0; i < num_neighbors.size(); ++i) {
        if (coordinates(i, 2) == 0.0 || coordinates(i, 2) == m_num_elements_z) {
            EXPECT_EQ(num_neighbors(i), 8);
        } else {
            EXPECT_EQ(num_neighbors(i), 12);
        }
    }

    // Get the function values
    const Eigen::Matrix<double, Eigen::Dynamic, aperi::MAX_NODE_NUM_NEIGHBORS> function_values = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, aperi::MAX_NODE_NUM_NEIGHBORS>(*m_mesh_data, {"block_1"}, "function_values", aperi::FieldQueryState::None);

    // Check the function values, partition of unity
    for (int i = 0; i < function_values.rows(); ++i) {
        CheckPartitionOfUnity(function_values.row(i));
        // Make sure the values beyond num_neighbors are zero
        for (size_t j = num_neighbors(i); j < aperi::MAX_NODE_NUM_NEIGHBORS; ++j) {
            EXPECT_NEAR(function_values(i, j), 0.0, 1.0e-12);
        }
    }
}

TEST_F(FunctionValueStorageProcessorTestFixture, MoreNeighborsRandomizedMesh) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    RandomizeCoordinates(*m_mesh_data);
    double kernel_radius = 1.5;
    m_search_processor->add_nodes_neighbors_within_variable_ball(kernel_radius);
    m_search_processor->SyncFieldsToHost();

    BuildFunctionValueStorageProcessor();

    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_function_value_storage_processor->SyncFieldsToHost();

    // Get the coordinates of the nodes
    const Eigen::Matrix<double, Eigen::Dynamic, 3> coordinates = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, {"block_1"}, m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None);

    // Get the number of neighbors
    const Eigen::Matrix<uint64_t, Eigen::Dynamic, 1> num_neighbors = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, uint64_t, 1>(*m_mesh_data, {"block_1"}, "num_neighbors", aperi::FieldQueryState::None);

    // Check the number of neighbors
    EXPECT_GT(num_neighbors.size(), 0);
    EXPECT_EQ(num_neighbors.size(), coordinates.rows());
    for (int i = 0; i < num_neighbors.size(); ++i) {
        EXPECT_GT(num_neighbors(i), 0);
    }

    // Get the function values
    const Eigen::Matrix<double, Eigen::Dynamic, aperi::MAX_NODE_NUM_NEIGHBORS> function_values = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, aperi::MAX_NODE_NUM_NEIGHBORS>(*m_mesh_data, {"block_1"}, "function_values", aperi::FieldQueryState::None);

    // Check the function values, partition of unity
    for (int i = 0; i < function_values.rows(); ++i) {
        CheckPartitionOfUnity(function_values.row(i));
        // Make sure the values beyond num_neighbors are zero
        for (size_t j = num_neighbors(i); j < aperi::MAX_NODE_NUM_NEIGHBORS; ++j) {
            EXPECT_NEAR(function_values(i, j), 0.0, 1.0e-12);
        }
    }
}