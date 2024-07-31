#include <gtest/gtest.h>
#include <mpi.h>

#include <Compadre_GMLS.hpp>
#include <Kokkos_Core.hpp>
#include <cstdlib>

#include "CompadreApproximationFunctionTestFixture.h"
#include "UnitTestUtils.h"

TEST_F(CompadreApproximationFunctionTest, PerformanceBenchmark) {
    bool using_gpu = Kokkos::DefaultExecutionSpace::concurrency() > 1;

    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    // TODO(jake): This test is not working with more than 1 process
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }

    // Number of refinements and refinement factor
    size_t num_refinements = 2;
    size_t refinement_factor = 2;

    // Initial mesh size
    size_t initial_num_elem_x = 48;
    size_t initial_num_elem_y = 48;
    size_t initial_num_elem_z = 144;

    // Set up gold values. Will need to adjust if parameters or system change.
    // First vector is Compadre runtime, second vector is Reproducing kernel runtime
    std::pair<std::vector<double>, std::vector<double>> gold_runtimes;
    gold_runtimes.first.resize(num_refinements);
    gold_runtimes.second.resize(num_refinements);
    double relative_tolerance = 0.2;

#ifndef NDEBUG
    // Allow for a longer runtime in debug mode, do less refinements
    if (using_gpu) {
        relative_tolerance = 0.5;
        gold_runtimes.first = {3.3e-01, 1.5e+00};
        gold_runtimes.second = {1.55e-02, 6.0e-02};
    } else {
        num_refinements = 1;
        gold_runtimes.first.resize(num_refinements);
        gold_runtimes.second.resize(num_refinements);
        gold_runtimes.first = {1.95e+01};
        gold_runtimes.second = {7.75e+01};
    }
#else
    gold_runtimes.first.resize(num_refinements);
    gold_runtimes.second.resize(num_refinements);
    if (using_gpu) {
        gold_runtimes.first = {2.1e-01, 1.55e+00};
        gold_runtimes.second = {8.54e-03, 4.55e-02};
    } else {
        gold_runtimes.first = {1.66e+00, 1.31e+01};
        gold_runtimes.second = {4.89e-01, 3.85e+00};
    }
#endif

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
        double time_to_create_mesh_and_processors = CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z, "");  // Hex mesh
        std::cout << "Time to create mesh and processors: " << time_to_create_mesh_and_processors << " s" << std::endl;

        // Make sure the coordinates are not on a grid
        // RandomizeCoordinates(*m_mesh_data, -0.05, 0.05);

        // Test building approximation functions
        std::pair<double, double> this_runtimes = TestBuildingApproximationFunctions();
        std::cout << "Compadre runtime: " << this_runtimes.first << " s; Reproducing kernel runtime: " << this_runtimes.second << " s" << std::endl;

        // Store the results
        runtimes.push_back(this_runtimes);

        // Check the runtimes, Compadre
        aperi::CoutP0() << "  Runtime, Compadre:            " << std::scientific << this_runtimes.first << std::endl;
        aperi::CoutP0() << "  Gold runtime, Compadre:       " << std::scientific << gold_runtimes.first[i] << std::endl;
        aperi::CoutP0() << "  Percent difference, Compadre: " << std::defaultfloat << 100.0 * (this_runtimes.first - gold_runtimes.first[i]) / gold_runtimes.first[i] << "%" << std::endl;

        std::string error_msg = "Gold values are determined for the system AperiAzureGPU1. If you are running on a different system, adjust the gold values.";
        EXPECT_NEAR(this_runtimes.first, gold_runtimes.first[i], relative_tolerance * gold_runtimes.first[i]) << error_msg;

        // Check the runtimes, Reproducing kernel
        aperi::CoutP0() << "  Runtime, Reproducing kernel:            " << std::scientific << this_runtimes.second << std::endl;
        aperi::CoutP0() << "  Gold runtime, Reproducing kernel:       " << std::scientific << gold_runtimes.second[i] << std::endl;
        aperi::CoutP0() << "  Percent difference, Reproducing kernel: " << std::defaultfloat << 100.0 * (this_runtimes.second - gold_runtimes.second[i]) / gold_runtimes.second[i] << "%" << std::endl;

        EXPECT_NEAR(this_runtimes.second, gold_runtimes.second[i], relative_tolerance * gold_runtimes.second[i]) << error_msg;

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
