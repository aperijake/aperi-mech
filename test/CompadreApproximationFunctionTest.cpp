#include <gtest/gtest.h>
#include <mpi.h>

#include <Compadre_GMLS.hpp>
#include <Kokkos_Core.hpp>
#include <cstdlib>

#include "CompadreApproximationFunctionTestFixture.h"
#include "UnitTestUtils.h"

TEST_F(CompadreApproximationFunctionTest, TransferFieldsToKokkosView) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    // TODO(jake): This test is not working with more than 1 process
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;

    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Perform non-Compadre neighbor search
    double diagonal_length = std::sqrt(m_num_elements_x * m_num_elements_x + m_num_elements_y * m_num_elements_y + m_num_elements_z * m_num_elements_z);
    m_kernel_factor = 1.01 * diagonal_length;  // Large ball radius, all nodes are neighbors
    m_search_processor->add_nodes_neighbors_within_constant_ball(m_kernel_factor);

    SetupFieldToViewTransfer();
}

TEST_F(CompadreApproximationFunctionTest, BuildApproximationFunctions) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    // TODO(jake): This test is not working with more than 1 process
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }

    // Number of elements in each direction
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;

    // Create the mesh and processors
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    // Make sure the coordinates are not on a grid
    RandomizeCoordinates(*m_mesh_data, -0.1, 0.1);

    // Set the kernel factor
    m_kernel_factor = 1.8;

    // Test building approximation functions
    TestBuildingApproximationFunctions();
}