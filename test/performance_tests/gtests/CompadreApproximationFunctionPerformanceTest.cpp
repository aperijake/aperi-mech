#include <gtest/gtest.h>
#include <mpi.h>

#include <Compadre_GMLS.hpp>
#include <Kokkos_Core.hpp>
#include <cstdlib>

#include "CompadreApproximationFunctionTestFixture.h"

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

    std::string mode = "release";

#ifndef NDEBUG
    mode = "debug";
    if (!using_gpu) {
        num_refinements = 1;  // Do less refinements in debug mode as it takes longer
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

    // Create the json file
    std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
    std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
    std::string full_test_name = test_suite_name + "_" + test_name;

    std::string run_specs = "_" + mode + "_procs_" + std::to_string(num_procs) + (using_gpu ? "_gpu" : "_cpu");
    std::ofstream json_file("performance_gtest_" + full_test_name + run_specs + ".json");
    json_file << "[" << std::endl;

    for (size_t i = 0; i < num_refinements; ++i) {
        // Set the kernel factor
        m_kernel_factor = 1.1;

        // Create the next refinement
        m_num_elements_x = num_elem_x[i];
        m_num_elements_y = num_elem_y[i];
        m_num_elements_z = num_elem_z[i];

        // Create the mesh and processors
        double time_to_create_mesh_and_processors = CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z, "");  // Hex mesh
        aperi::CoutP0() << "  Runtime, Create mesh and processors: " << time_to_create_mesh_and_processors << " s" << std::endl;

        // Make sure the coordinates are not on a grid
        // RandomizeCoordinates(*m_mesh_data, -0.05, 0.05);

        // Test building approximation functions
        std::map<std::string, double> this_runtimes = TestBuildingApproximationFunctions();

        // Print the runtimes
        for (auto &runtime : this_runtimes) {
            aperi::CoutP0() << "  Runtime, " << runtime.first << ": " << runtime.second << " s" << std::endl;
        }
        // Name of the benchmark: pair.first: num_procs processors, cpu/gpu, hostname, num_elem_x x num_elem_y x num_elem_z elements, runtime"
        std::string name_end = std::to_string(num_procs) + " processors, " + (using_gpu ? "gpu" : "cpu") + ", " + std::to_string(num_elem_x[i]) + " x " + std::to_string(num_elem_y[i]) + " x " + std::to_string(num_elem_z[i]) + " elements, runtime";
        std::string unit = "seconds";
        int i_runtimes = 0;
        for (auto &runtime : this_runtimes) {
            // Output the results to a json file
            if (i != 0 || i_runtimes != 0) {
                json_file << "  }," << std::endl;  // close the previous benchmark
            }
            i_runtimes++;
            json_file << "  {" << std::endl;
            json_file << R"(    "name": ")" << runtime.first << ": " << name_end << R"(",)" << std::endl;
            json_file << R"(    "unit": ")" << unit << R"(",)" << std::endl;
            json_file << R"(    "value": )" << runtime.second << std::endl;
        }

        // Setup for the next refinement
        ResetCompadreApproximationFunction();
    }

    // Close the json file
    json_file << "  }" << std::endl;  // close the last benchmark
    json_file << "]" << std::endl;    // close the json file
    json_file.close();
}
