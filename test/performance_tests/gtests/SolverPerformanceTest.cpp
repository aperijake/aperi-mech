#include <gtest/gtest.h>
#include <mpi.h>
#include <yaml-cpp/yaml.h>

#include <fstream>
#include <memory>
#include <string>
#include <vector>

#include "LogUtils.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"

// Create the Taylor impact test
YAML::Node CreateTaylorImpactYaml(double time_increment, double end_time, size_t /*num_elem_x*/ = 10, size_t /*num_elem_y*/ = 10, size_t /*num_elem_z*/ = 30) {
    // Start with the basic explicit test
    YAML::Node yaml_data = CreateTestYaml();

    // Change the time increment
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["direct_time_stepper"]["time_increment"] = time_increment;

    // Change the end time
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["direct_time_stepper"]["time_end"] = end_time;

    // Remove the loads
    yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");

    // Change the initial conditions
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"] = 10.0;
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"][0] = 0;
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"][1] = 0;
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"][2] = 1;

    // Add boundary conditions on the impact surface
    AddDisplacementBoundaryConditions(yaml_data);
    // Change boundary condition to apply to surface_1
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["sets"][0] = "surface_1";
    // Change the magnitude and direction of the boundary condition
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["magnitude"] = 0;
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][0] = 0;
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][1] = 0;
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][2] = 1;

    // Effectively turn off output
    yaml_data["procedures"][0]["explicit_dynamics_procedure"]["output"]["time_increment"] = end_time;

    return yaml_data;
}

// Test a large, square cross section, taylor impact test
TEST_F(SolverTest, BenchmarkTaylorImpact) {
    StopCapturingOutput();

    bool using_gpu = Kokkos::DefaultExecutionSpace::concurrency() > 1;

    // Desired runtime
    double runtime = 10.0;

    // The time increment
    double time_increment = 0.01;

    // Number of refinements and refinement factor
    size_t num_refinements = 3;
    size_t refinement_factor = 2;

    // Initial mesh size
    size_t initial_num_elem_x = 7;
    size_t initial_num_elem_y = 7;
    size_t initial_num_elem_z = 21;

    std::string mode = "release";
#ifndef NDEBUG
    mode = "debug";
    // Allow for a longer runtime in debug mode on cpu, do less refinements
    if (!using_gpu) {
        runtime = 50.0;
        num_refinements = 2;
    }
#endif

    // Read gold values from file
    std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
    std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
    std::string full_test_name = test_suite_name + "_" + test_name;

    std::vector<double> gold_runtimes = ReadGoldRuntimes(full_test_name, mode, using_gpu);
    ASSERT_EQ(gold_runtimes.size(), num_refinements) << "Gold values are not set up correctly for the test " << full_test_name;

    // Vectors to store the number of nodes and runtimes
    std::vector<double> num_nodes;
    std::vector<double> runtimes;

    // Mesh size vectors
    std::vector<size_t> num_elem_x;
    std::vector<size_t> num_elem_y;
    std::vector<size_t> num_elem_z;

    num_elem_x.push_back(initial_num_elem_x);
    num_elem_y.push_back(initial_num_elem_y);
    num_elem_z.push_back(initial_num_elem_z);

    // Calculate the number of nodes
    num_nodes.push_back((num_elem_x.back() + 1) * (num_elem_y.back() + 1) * (num_elem_z.back() + 1));

    // Calculate the number of steps and end times
    std::vector<size_t> num_steps;
    std::vector<double> end_times;

    // Test node-steps
    num_steps.push_back(runtime / gold_runtimes[0]);
    end_times.push_back(time_increment * num_steps.back());

    for (size_t i = 1; i < num_refinements; ++i) {
        // Next refinement mesh
        num_elem_x.push_back(num_elem_x.back() * refinement_factor);
        num_elem_y.push_back(num_elem_y.back() * refinement_factor);
        num_elem_z.push_back(num_elem_z.back() * refinement_factor);
        num_nodes.push_back((num_elem_x.back() + 1) * (num_elem_y.back() + 1) * (num_elem_z.back() + 1));
        num_steps.push_back(runtime / gold_runtimes[i]);
        end_times.push_back(time_increment * num_steps.back());
    }

    // Print the run settings before running
    aperi::CoutP0() << "Desired runtime(s): " << runtime << std::endl;
    aperi::CoutP0() << "Time increment: " << time_increment << std::endl;
    aperi::CoutP0() << "Initial mesh size: " << initial_num_elem_x << "x" << initial_num_elem_y << "x" << initial_num_elem_z << std::endl;
    aperi::CoutP0() << "Refinement factor: " << refinement_factor << std::endl;
    aperi::CoutP0() << "Number of refinements: " << num_refinements << std::endl;
    aperi::CoutP0() << "--------------------------------------------------------------------------------" << std::endl;
    aperi::CoutP0() << std::setw(20) << "Mesh size" << std::setw(20) << "Number of nodes" << std::setw(20) << "Number of steps" << std::setw(20) << "End time" << std::endl;
    for (size_t i = 0; i < num_refinements; ++i) {
        aperi::CoutP0() << std::setw(20) << std::to_string(num_elem_x[i]) + "x" + std::to_string(num_elem_y[i]) + "x" + std::to_string(num_elem_z[i])
                        << std::setw(20) << num_nodes[i]
                        << std::setw(20) << num_steps[i]
                        << std::setw(20) << end_times[i] << std::endl;
    }
    aperi::CoutP0() << "--------------------------------------------------------------------------------" << std::endl;

    for (size_t i = 0; i < num_refinements; ++i) {
        ASSERT_GT(static_cast<int>(num_steps.back()), 3) << "Number of steps is too small. Adjust the parameters.";
    }

    // Create a json file with the benchmark results
    /*
    // Example of the json output
    [
        {
            "name": "Taylor Impact: 1 processors, cpu, 10 x 10 x 30 elements, runtime per increment",
            "unit": "milliseconds",
            "value": "0.123"
        }
    ]
    */
    std::ofstream json_file("performance_" + full_test_name + ".json");
    json_file << "[" << std::endl;

    for (size_t i = 0; i < num_refinements; ++i) {
        // Create the next refinement
        m_yaml_data = CreateTaylorImpactYaml(time_increment, end_times[i], num_elem_x[i], num_elem_y[i], num_elem_z[i]);
        CreateInputFile();
        CreateTestMesh(std::to_string(num_elem_x[i]) + "x" + std::to_string(num_elem_y[i]) + "x" + std::to_string(num_elem_z[i]) + "|sideset:z|tets");

        // Run the solver
        double average_increment_runtime = RunSolver();
        aperi::CoutP0() << "Average increment runtime: " << average_increment_runtime << " seconds" << std::endl;

        // Store the results
        runtimes.push_back(average_increment_runtime);

        // Check the runtimes
        aperi::CoutP0() << "  Runtime / increment:      " << std::scientific << average_increment_runtime << std::endl;
        aperi::CoutP0() << "  Gold runtime / increment: " << std::scientific << gold_runtimes[i] << std::endl;
        aperi::CoutP0() << "  Percent difference:       " << std::defaultfloat << 100.0 * (average_increment_runtime - gold_runtimes[i]) / gold_runtimes[i] << "%" << std::endl;

        double relative_tolerance = 0.5;  // 50% relative tolerance, this is a large tolerance. Performance tests should be monitored by inspecting the charts at: https://aperijake.github.io/aperi-mech/
        std::string error_msg = "Gold values are determined for the system AperiAzureGPU1. If you are running on a different system, adjust the gold values.";
        // Release mode, perform the check
        if (m_num_procs == 1) {
            EXPECT_NEAR(average_increment_runtime, gold_runtimes[i], relative_tolerance * gold_runtimes[i]) << error_msg;
        } else {
            // Found tests to be too flaky with multiple processors
            aperi::CoutP0() << "WARNING: Gold values are not available for the number of processors: " << m_num_procs << ". Have gold values for 1 processors. Skipping checks.";
        }

        // Output the results to a json file
        if (i != 0) {
            json_file << "  },";  // close the previous benchmark
        }
        json_file << "  {" << std::endl;
        // Name of the benchmark: Taylor Impact: m_num_procs processors, cpu/gpu, hostname, num_elem_x x num_elem_y x num_elem_z elements, runtime per increment"
        std::string name = "Taylor Impact: " + std::to_string(m_num_procs) + " processors, " + (using_gpu ? "gpu" : "cpu") + ", hostname: " + GetHostName() + ", " + std::to_string(num_elem_x[i]) + " x " + std::to_string(num_elem_y[i]) + " x " + std::to_string(num_elem_z[i]) + " elements, runtime per increment";
        json_file << "    \"name\": \"" << name << "\"," << std::endl;
        // Unit of the benchmark
        std::string unit = "milliseconds";
        json_file << "    \"unit\": \"" << unit << "\"," << std::endl;
        // Value of the benchmark
        double value = average_increment_runtime * 1000.0;
        json_file << "    \"value\": " << value << std::endl;

        // Setup for the next refinement
        ResetSolverTest();
    }

    json_file << "  }" << std::endl;  // close the last benchmark
    json_file << "]" << std::endl;    // close the json file
    json_file.close();
}
