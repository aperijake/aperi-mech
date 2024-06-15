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

TEST_F(CompadreApproximationFunctionTest, PerformanceBenchmark) {
    bool do_benchmark = false;
    if (!do_benchmark) {
        return;
    }

    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    // TODO(jake): This test is not working with more than 1 process
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }

    // Number of refinements and refinement factor
    size_t num_refinements = 5;
    size_t refinement_factor = 2;

    // Initial mesh size
    size_t initial_num_elem_x = 7;
    size_t initial_num_elem_y = 7;
    size_t initial_num_elem_z = 21;

    // Vectors to store the number of nodes and runtimes
    std::vector<double> num_nodes;
    std::vector<std::pair<double, double>> runtimes;

    // Mesh size vectors
    std::vector<size_t> num_elem_x;
    std::vector<size_t> num_elem_y;
    std::vector<size_t> num_elem_z;

    num_elem_x.push_back(initial_num_elem_x);
    num_elem_y.push_back(initial_num_elem_y);
    num_elem_z.push_back(initial_num_elem_z);

    // Calculate the number of nodes
    num_nodes.push_back((num_elem_x.back() + 1) * (num_elem_y.back() + 1) * (num_elem_z.back() + 1));

    for (size_t i = 1; i < num_refinements; ++i) {
        // Next refinement mesh
        num_elem_x.push_back(num_elem_x.back() * refinement_factor);
        num_elem_y.push_back(num_elem_y.back() * refinement_factor);
        num_elem_z.push_back(num_elem_z.back() * refinement_factor);
        num_nodes.push_back((num_elem_x.back() + 1) * (num_elem_y.back() + 1) * (num_elem_z.back() + 1));
    }

    // Print the run settings before running
    std::cout << "Initial mesh size: " << initial_num_elem_x << "x" << initial_num_elem_y << "x" << initial_num_elem_z << std::endl;
    std::cout << "Refinement factor: " << refinement_factor << std::endl;
    std::cout << "Number of refinements: " << num_refinements << std::endl;
    std::cout << "--------------------------------------------------------------------------------" << std::endl;
    std::cout << std::setw(20) << "Mesh size" << std::setw(20) << "Number of nodes" << std::setw(20) << std::endl;
    for (size_t i = 0; i < num_refinements; ++i) {
        std::cout << std::setw(20) << std::to_string(num_elem_x[i]) + "x" + std::to_string(num_elem_y[i]) + "x" + std::to_string(num_elem_z[i])
                  << std::setw(20) << num_nodes[i] << std::endl;
    }
    std::cout << "--------------------------------------------------------------------------------" << std::endl;

    for (size_t i = 0; i < num_refinements; ++i) {
        // Set the kernel factor
        m_kernel_factor = 1.1;

        // Create the next refinement
        m_num_elements_x = num_elem_x[i];
        m_num_elements_y = num_elem_y[i];
        m_num_elements_z = num_elem_z[i];

        // Create the mesh and processors
        double time_to_create_mesh_and_processors = CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z, ""); // Hex mesh
        std::cout << "Time to create mesh and processors: " << time_to_create_mesh_and_processors << " s" << std::endl;

        // Make sure the coordinates are not on a grid
        // RandomizeCoordinates(*m_mesh_data, -0.05, 0.05);

        // Test building approximation functions
        std::pair<double, double> this_runtimes = TestBuildingApproximationFunctions();
        std::cout << "Compadre runtime: " << this_runtimes.first << " s; Reproducing kernel runtime: " << this_runtimes.second << " s" << std::endl;

        // Store the results
        runtimes.push_back(this_runtimes);

        // Setup for the next refinement
        ResetCompadreApproximationFunction();

    }

    // Output the results
    std::ofstream file("shape_function_benchmark_results.csv");
    file << "Nodes, Compadre Runtime (s), Reproducing Kernel Runtime (s)" << std::endl;
    for (size_t i = 0; i < num_nodes.size(); ++i) {
        file << num_nodes[i] << ", " << runtimes[i].first << ", " << runtimes[i].second << std::endl;
    }
    file.close();
}