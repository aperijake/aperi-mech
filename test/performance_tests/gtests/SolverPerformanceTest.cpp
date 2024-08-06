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
    // Golds just used for approximating the number of steps to give the desired runtime
    std::vector<double> gold_runtimes = {1.24661e-03, 9.811962e-03, 7.899994e-02};  // release, cpu
#ifndef NDEBUG
    mode = "debug";
    // Allow for a longer runtime in debug mode on cpu, do less refinements
    if (!using_gpu) {
        runtime = 50.0;
        num_refinements = 2;
        gold_runtimes = {3.25e-01, 2.6};  // debug, cpu
    } else {
        gold_runtimes = {1.195e-03, 1.32e-03, 3.3e-03};  // debug, gpu
    }
#endif
    if (using_gpu && mode == "release") {
        gold_runtimes = {8.8e-04, 1.0e-03, 3.0e-03};  // release, gpu
    }

    // Vectors to store the number of nodes and runtimes
    std::vector<double> num_nodes;

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
    std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
    std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
    std::string full_test_name = test_suite_name + "_" + test_name;

    std::string run_specs = "_" + mode + "_procs_" + std::to_string(m_num_procs) + (using_gpu ? "_gpu" : "_cpu");
    std::ofstream json_file("performance_gtest_" + full_test_name + run_specs + ".json");
    json_file << "[" << std::endl;

    for (size_t i = 0; i < num_refinements; ++i) {
        // Create the next refinement
        m_yaml_data = CreateTaylorImpactYaml(time_increment, end_times[i], num_elem_x[i], num_elem_y[i], num_elem_z[i]);
        CreateInputFile();
        CreateTestMesh(std::to_string(num_elem_x[i]) + "x" + std::to_string(num_elem_y[i]) + "x" + std::to_string(num_elem_z[i]) + "|sideset:z|tets");

        // Run the solver
        double average_increment_runtime = RunSolver();

        // Print the results
        aperi::CoutP0() << "  Runtime (s) / increment:      " << std::scientific << average_increment_runtime << std::endl;

        // Output the results to a json file
        if (i != 0) {
            json_file << "  },";  // close the previous benchmark
        }
        json_file << "  {" << std::endl;
        // Name of the benchmark: Taylor Impact: m_num_procs processors, cpu/gpu, num_elem_x x num_elem_y x num_elem_z elements, runtime per increment"
        std::string name = "Taylor Impact: " + std::to_string(m_num_procs) + " processors, " + (using_gpu ? "gpu" : "cpu") + ", " + std::to_string(num_elem_x[i]) + " x " + std::to_string(num_elem_y[i]) + " x " + std::to_string(num_elem_z[i]) + " elements, runtime per increment";
        json_file << R"(    "name": ")" << name << R"(",)" << std::endl;
        // Unit of the benchmark
        std::string unit = "milliseconds";
        json_file << R"(    "unit": ")" << unit << R"(",)" << std::endl;
        // Value of the benchmark
        double value = average_increment_runtime * 1000.0;
        json_file << R"(    "value": )" << value << std::endl;

        // Setup for the next refinement
        ResetSolverTest();
    }

    json_file << "  }" << std::endl;  // close the last benchmark
    json_file << "]" << std::endl;    // close the json file
    json_file.close();
}
