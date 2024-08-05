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

    double relative_tolerance = 0.5;  // 50% relative tolerance, this is a large tolerance. Performance tests should be monitored by inspecting the charts at: https://aperijake.github.io/aperi-mech/
    std::string mode = "release";

#ifndef NDEBUG
    mode = "debug";
    if (!using_gpu) {
        num_refinements = 1;  // Do less refinements in debug mode as it takes longer
    }
#endif

    // Set up gold values. Will need to adjust if parameters or system change.
    // First vector is Compadre runtime, second vector is Reproducing kernel runtime
    std::pair<std::vector<double>, std::vector<double>> gold_runtimes;
    gold_runtimes.first.resize(num_refinements);
    gold_runtimes.second.resize(num_refinements);

    // Read gold values from file
    std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
    std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
    std::string full_test_name = test_suite_name + "_" + test_name;

    std::vector<double> golds_from_file = ReadGoldRuntimes(full_test_name, mode, using_gpu);
    ASSERT_EQ(golds_from_file.size(), 2 * num_refinements) << "Gold values are not set up correctly for the test " << full_test_name;

    // Set the gold values
    for (size_t i = 0; i < num_refinements; ++i) {
        gold_runtimes.first[i] = golds_from_file[i];
        gold_runtimes.second[i] = golds_from_file[i + num_refinements];
    }

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

    std::ofstream json_file_compadre("performance_" + full_test_name + "_compadre.json");
    std::ofstream json_file_reproducing_kernel("performance_" + full_test_name + "_reproducing_kernel.json");
    json_file_compadre << "[" << std::endl;
    json_file_reproducing_kernel << "[" << std::endl;

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
        EXPECT_LT(this_runtimes.first, gold_runtimes.first[i] * (1 + relative_tolerance)) << error_msg;
        if (this_runtimes.first < gold_runtimes.first[i] * (1 - relative_tolerance)) {
            aperi::CoutP0() << "Warning: Compadre runtime is less than gold runtime. Consider adjusting the gold runtime." << std::endl;
        }

        // Check the runtimes, Reproducing kernel
        aperi::CoutP0() << "  Runtime, Reproducing kernel:            " << std::scientific << this_runtimes.second << std::endl;
        aperi::CoutP0() << "  Gold runtime, Reproducing kernel:       " << std::scientific << gold_runtimes.second[i] << std::endl;
        aperi::CoutP0() << "  Percent difference, Reproducing kernel: " << std::defaultfloat << 100.0 * (this_runtimes.second - gold_runtimes.second[i]) / gold_runtimes.second[i] << "%" << std::endl;

        EXPECT_LT(this_runtimes.second, gold_runtimes.second[i] * (1 + relative_tolerance)) << error_msg;
        if (this_runtimes.second < gold_runtimes.second[i] * (1 - relative_tolerance)) {
            aperi::CoutP0() << "Warning: Reproducing kernel runtime is less than gold runtime. Consider adjusting the gold runtime." << std::endl;
        }

        // Output the results to a json file
        if (i != 0) {
            json_file_compadre << "  },";            // close the previous benchmark
            json_file_reproducing_kernel << "  },";  // close the previous benchmark
        }
        json_file_compadre << "  {" << std::endl;
        json_file_reproducing_kernel << "  {" << std::endl;
        // Name of the benchmark: Shape Function Construction: num_procs processors, cpu/gpu, hostname, num_elem_x x num_elem_y x num_elem_z elements, runtime"
        std::string compadre_name = "Compadre Shape Function Construction: " + std::to_string(num_procs) + " processors, " + (using_gpu ? "gpu" : "cpu") + ", hostname: " + GetHostName() + ", " + std::to_string(num_elem_x[i]) + " x " + std::to_string(num_elem_y[i]) + " x " + std::to_string(num_elem_z[i]) + " elements, runtime";
        json_file_compadre << "    \"name\": \"" << compadre_name << "\"," << std::endl;
        std::string reproducing_kernel_name = "Reproducing Kernel Shape Function Construction: " + std::to_string(num_procs) + " processors, " + (using_gpu ? "gpu" : "cpu") + ", hostname: " + GetHostName() + ", " + std::to_string(num_elem_x[i]) + " x " + std::to_string(num_elem_y[i]) + " x " + std::to_string(num_elem_z[i]) + " elements, runtime";
        json_file_reproducing_kernel << "    \"name\": \"" << reproducing_kernel_name << "\"," << std::endl;
        // Unit of the benchmark
        std::string unit = "seconds";
        json_file_compadre << "    \"unit\": \"" << unit << "\"," << std::endl;
        json_file_reproducing_kernel << "    \"unit\": \"" << unit << "\"," << std::endl;
        // Value of the benchmark
        json_file_compadre << "    \"value\": " << this_runtimes.first << std::endl;
        json_file_reproducing_kernel << "    \"value\": " << this_runtimes.second << std::endl;

        // Setup for the next refinement
        ResetCompadreApproximationFunction();
    }

    // Close the json file
    json_file_compadre << "  }" << std::endl;  // close the last benchmark
    json_file_compadre << "]" << std::endl;    // close the json file
    json_file_compadre.close();
    json_file_reproducing_kernel << "  }" << std::endl;  // close the last benchmark
    json_file_reproducing_kernel << "]" << std::endl;    // close the json file
    json_file_reproducing_kernel.close();
}
