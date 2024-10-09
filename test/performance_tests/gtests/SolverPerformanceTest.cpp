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
YAML::Node CreateTaylorImpactYaml(bool reproducing_kernel, double time_increment, double end_time, size_t /*num_elem_x*/ = 10, size_t /*num_elem_y*/ = 10, size_t /*num_elem_z*/ = 30) {
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

    // Change the approximation space to reproducing_kernel
    if (reproducing_kernel) {
        // Remove the finite element formulation
        yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"].remove("approximation_space");
        // Add the reproducing_kernel formulation
        yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["approximation_space"]["reproducing_kernel"]["kernel_radius_scale_factor"] = 1.1;

        // Remove the integration scheme
        yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"].remove("integration_scheme");

        // Add the strain smoothing integration scheme
        yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["integration_scheme"]["strain_smoothing"]["element_smoothing_cell"]["subdomains"] = 1.0;
    }

    return yaml_data;
}

class SolverPerformanceTest : public SolverTest {
   protected:
    void SetUp() override {
        // Run SolverTest::SetUp first
        SolverTest::SetUp();
        MPI_Comm_rank(MPI_COMM_WORLD, &m_rank);
    }

    void TearDown() override {
        // Run SolverTest::TearDown last
        SolverTest::TearDown();
    }

    void RunTaylorImpactTest(bool reproducing_kernel, double runtime, size_t num_refinements, std::vector<size_t> refinement_factors, size_t initial_num_elem_x, size_t initial_num_elem_y, size_t initial_num_elem_z, bool using_gpu, std::string mode, const std::vector<double> &gold_runtimes, const std::string &json_prefix = "performance") {
        // The time increment
        double time_increment = 0.01;

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
            size_t num_elem_x_next = num_elem_x.back() * refinement_factors[0];
            size_t num_elem_y_next = num_elem_y.back() * refinement_factors[1];
            size_t num_elem_z_next = num_elem_z.back() * refinement_factors[2];

            // If the number of elements is too large (greater than 36 million), stop the refinement
            size_t num_elem_next = (num_elem_x_next) * (num_elem_y_next) * (num_elem_z_next)*6;
            if (num_elem_next > 36e6) {
                aperi::CoutP0() << "Number of elements is too large. Stopping the refinement. Number of elements: " << num_elem_next << std::endl;
                num_refinements = i;
                break;
            }

            num_elem_x.push_back(num_elem_x_next);
            num_elem_y.push_back(num_elem_y_next);
            num_elem_z.push_back(num_elem_z_next);
            num_nodes.push_back((num_elem_x_next + 1) * (num_elem_y_next + 1) * (num_elem_z_next + 1));
            num_steps.push_back(runtime / gold_runtimes[i]);
            end_times.push_back(time_increment * num_steps.back());
        }

        // Print the run settings before running
        aperi::CoutP0() << "Desired runtime(s): " << runtime << std::endl;
        aperi::CoutP0() << "Time increment: " << time_increment << std::endl;
        aperi::CoutP0() << "Initial mesh size: " << initial_num_elem_x << "x" << initial_num_elem_y << "x" << initial_num_elem_z << std::endl;
        aperi::CoutP0() << "Refinement factors: " << refinement_factors[0] << "x" << refinement_factors[1] << "x" << refinement_factors[2] << std::endl;
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
        std::string json_string = "[\n";

        for (size_t i = 0; i < num_refinements; ++i) {
            // Create the next refinement
            m_yaml_data = CreateTaylorImpactYaml(reproducing_kernel, time_increment, end_times[i], num_elem_x[i], num_elem_y[i], num_elem_z[i]);
            CreateInputFile();
            CreateTestMesh(std::to_string(num_elem_x[i]) + "x" + std::to_string(num_elem_y[i]) + "x" + std::to_string(num_elem_z[i]) + "|sideset:z|tets");

            // Run the solver
            double average_increment_runtime = RunSolver();

            // Print the results
            aperi::CoutP0() << "  Runtime (s) / increment:      " << std::scientific << average_increment_runtime << std::endl;

            // Name of the benchmark: Taylor Impact: m_num_procs processors, cpu/gpu, num_elem_x x num_elem_y x num_elem_z elements, runtime per increment"
            std::string name = "Taylor Impact";
            name += (reproducing_kernel ? ", Reproducing Kernel:" : ":") + std::to_string(m_num_procs) + " processors, ";
            name += (using_gpu ? "gpu, " : "cpu, ") + std::to_string(num_elem_x[i]) + " x " + std::to_string(num_elem_y[i]) + " x " + std::to_string(num_elem_z[i]);
            name += " elements, runtime per increment";
            // Unit of the benchmark
            std::string unit = "milliseconds";
            // Value of the benchmark
            double value = average_increment_runtime * 1000.0;

            // Output the results to a json file
            if (i != 0) {
                json_string += "  },";
            }
            json_string += "  {\n";
            json_string += R"(    "name": ")" + name + R"(",)" + "\n";
            json_string += R"(    "unit": ")" + unit + R"(",)" + "\n";
            json_string += R"(    "value": )" + std::to_string(value) + "\n";

            // Setup for the next refinement
            ResetSolverTest();
        }

        json_string += "  }\n]";
        if (m_rank == 0) {
            std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
            std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
            std::string full_test_name = test_suite_name + "_" + test_name;
            std::string run_specs = "_" + mode + "_procs_" + std::to_string(m_num_procs) + (using_gpu ? "_gpu" : "_cpu");

            std::ofstream json_file(json_prefix + "_gtest_" + full_test_name + run_specs + ".json");
            json_file << json_string;
            json_file.close();
        }
    }

    void RunStandardPerformanceTest(bool reproducing_kernel = false) {
        StopCapturingOutput();

        bool using_gpu = Kokkos::DefaultExecutionSpace::concurrency() > 1;

        // Desired runtime
        double runtime = 10.0;

        // Number of refinements and refinement factor
        size_t num_refinements = 3;
        std::vector<size_t> refinement_factors = {2, 2, 2};

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

        RunTaylorImpactTest(reproducing_kernel, runtime, num_refinements, refinement_factors, initial_num_elem_x, initial_num_elem_y, initial_num_elem_z, using_gpu, mode, gold_runtimes, "performance");
    }

    void RunScalingTest(bool reproducing_kernel = false) {
        StopCapturingOutput();
#ifndef NDEBUG
        // Skip this test in debug mode
        aperi::CoutP0() << "Skipping scaling test in debug mode. If this is needed then the timing estimates should be adjusted." << std::endl;
        return;
#endif

        bool using_gpu = Kokkos::DefaultExecutionSpace::concurrency() > 1;

        // Desired runtime
        double runtime = 20.0;

        // Number of refinements and refinement factor
        size_t num_refinements = using_gpu ? 13 : 10;
        std::vector<size_t> refinement_factors = {2, 1, 1};

        // Initial mesh size
        size_t initial_num_elem_x = 1;
        size_t initial_num_elem_y = 32;
        size_t initial_num_elem_z = 256;

        std::string mode = "release";

        double base_time_per_element_cpu = 0.7e-06;
        double base_time_per_element_gpu = 5.2e-09;

        size_t starting_num_elements_per_proc = initial_num_elem_x * initial_num_elem_y * initial_num_elem_z / m_num_procs;
        double base_time_per_element = using_gpu ? base_time_per_element_gpu : base_time_per_element_cpu;

        std::vector<double> gold_runtimes;
        for (size_t i = 0; i < num_refinements; ++i) {
            size_t num_elements = starting_num_elements_per_proc * std::pow(refinement_factors[0], i) * std::pow(refinement_factors[1], i) * std::pow(refinement_factors[2], i);
            gold_runtimes.push_back(base_time_per_element * num_elements);
        }

        RunTaylorImpactTest(reproducing_kernel, runtime, num_refinements, refinement_factors, initial_num_elem_x, initial_num_elem_y, initial_num_elem_z, using_gpu, mode, gold_runtimes, "scaling");
    }

    int m_rank;
};

// Test a large, square cross section, taylor impact test, FEM
TEST_F(SolverPerformanceTest, BenchmarkTaylorImpact) {
    bool reproducing_kernel = false;
    RunStandardPerformanceTest(reproducing_kernel);
}

// Test a large, square cross section, taylor impact test, reproducing kernel
TEST_F(SolverPerformanceTest, BenchmarkTaylorImpactReproducingKernel) {
    bool reproducing_kernel = true;
    RunStandardPerformanceTest(reproducing_kernel);
}

// Test a large, square cross section, taylor impact test, FEM scaling
TEST_F(SolverPerformanceTest, DISABLED_BenchmarkTaylorImpactScaling) {
    bool reproducing_kernel = false;
    RunScalingTest(reproducing_kernel);
}

// Test a large, square cross section, taylor impact test, reproducing kernel scaling
TEST_F(SolverPerformanceTest, DISABLED_BenchmarkTaylorImpactReproducingKernelScaling) {
    bool reproducing_kernel = true;
    RunScalingTest(reproducing_kernel);
}
