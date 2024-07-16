#include <gtest/gtest.h>

#include <fstream>
#include <memory>
#include <mpi.h>
#include <string>
#include <vector>
#include <yaml-cpp/yaml.h>

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

    // Set up gold values. Will need to adjust if parameters or system change.
    std::vector<double> gold_runtimes(4);
#ifndef NDEBUG
    // Allow for a longer runtime in debug mode, do less refinements
    if (using_gpu) {
        gold_runtimes = {1.195e-03, 1.32e-03, 2.89e-03};
    } else {
        runtime = 50.0;
        num_refinements = 2;
        gold_runtimes = {3.61e-01, 2.89};
    }
#else
    if (using_gpu) {
        gold_runtimes = {8.201956e-04, 9.459842e-04, 2.550356e-03};
    } else {
        gold_runtimes = {1.246661e-03, 9.811962e-03, 7.899994e-02};
    }
#endif

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
        ASSERT_GT((int)num_steps.back(), 3) << "Number of steps is too small. Adjust the parameters.";
    }

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

        double relative_tolerance = 0.05;
        std::string error_msg = "Gold values are determined for the system AperiAzureGPU1. If you are running on a different system, adjust the gold values.";
        // Release mode, perform the check
        if (m_num_procs == 1) {
            EXPECT_NEAR(average_increment_runtime, gold_runtimes[i], relative_tolerance * gold_runtimes[i]) << error_msg;
        } else {
            // Found tests to be too flaky with multiple processors
            aperi::CoutP0() << "WARNING: Gold values are not available for the number of processors: " << m_num_procs << ". Have gold values for 1 processors. Skipping checks.";
        }

        // Setup for the next refinement
        ResetSolverTest();
    }

    // Output the results
    std::ofstream file("benchmark_results.csv");
    file << "Nodes, Runtime per increment (s)" << std::endl;
    for (size_t i = 0; i < num_nodes.size(); ++i) {
        file << num_nodes[i] << ", " << runtimes[i] << std::endl;
    }
    file.close();
}
