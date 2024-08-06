#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>

#include "Constants.h"
#include "FieldData.h"
#include "FunctionValueStorageProcessorTestFixture.h"
#include "MeshData.h"
#include "UnitTestUtils.h"

TEST_F(FunctionValueStorageProcessorTestFixture, NodeFunctionValueStorage) {
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