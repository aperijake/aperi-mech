#include <gtest/gtest.h>

#include <fstream>
#include <memory>
#include <string>

#include "MathUtils.h"
#include "PowerMethodProcessor.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"

// Class for PowerMethodProcessor tests
class PowerMethodProcessorTest : public SolverTest {
   protected:
    void SetUp() override {
        // Run SolverTest::SetUp first
        SolverTest::SetUp();

        // Remove the loads from the input file
        m_yaml_data = CreateTestYaml();
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");

        // Change the time stepper to a power method time stepper, not really used, just need it so fields are generated
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"].remove("direct_time_stepper");
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["power_method_time_stepper"]["scale_factor"] = 1.0;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["power_method_time_stepper"]["update_interval"] = 500;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["power_method_time_stepper"]["time_end"] = 0.1;
    }

    void TearDown() override {
        // Run SolverTest::TearDown last
        SolverTest::TearDown();
    }

    void RunPowerMethodProcessor(bool expected_converged, double expected_stable_time_step, size_t expected_num_iterations, double relative_tolerance = 0.1) {
        // Get the solver
        auto explicit_solver = std::dynamic_pointer_cast<aperi::ExplicitSolver>(m_solver);
        ASSERT_TRUE(m_solver != nullptr);

        // Build the mass matrix
        explicit_solver->BuildMassMatrix();

        // Create a PowerMethodProcessor object
        aperi::PowerMethodProcessor power_method_processor(m_solver->GetMeshData(), explicit_solver);
        // Run the power method processor
        double time = 0.1;            // Shouldn't matter for this material, just need to pass something in
        double time_increment = 0.1;  // Shouldn't matter for this material, just need to pass something in
        size_t num_iterations = 500;
        double stable_time_step = power_method_processor.ComputeStableTimeIncrement(time, time_increment, num_iterations);
        EXPECT_NEAR(stable_time_step, expected_stable_time_step, relative_tolerance * expected_stable_time_step);

        // Get and check the stats
        auto stats = power_method_processor.GetPowerMethodStats();
        EXPECT_EQ(stats.converged, expected_converged);
        EXPECT_EQ(stats.num_iterations, expected_num_iterations);
    }
};

// Test that the PowerMethodProcessor can be run
TEST_F(PowerMethodProcessorTest, PowerMethodProcessor) {
    bool skip = false;
    if (m_num_procs > 4) {
        skip = true;
    }
    // Skip if running on GPU and in Release mode
    // TODO(jake): Get rid of this when we can. It is only here because of some strange compiling issues that lead to a segfault.
    // As with ShapeFunctionsFunctorReproducingKernel, a segfault on the GPU in Release mode, but works fine in Debug mode or on the CPU.
    // Spent a lot of time trying to figure out why, but couldn't find the issue.
#ifdef NDEBUG
    bool using_gpu = Kokkos::DefaultExecutionSpace::concurrency() > 1;
    if (using_gpu) {
        skip = true;
    }
#endif
    // Skip this test if we have more than 4 processes
    if (skip) {
        GTEST_SKIP();
    }

    CreateInputFile();
    std::string mesh_string = "1x1x4|tets";
    CreateTestMesh(mesh_string);
    CreateSolver();
    bool expected_converged = true;
    double expected_stable_time_step = 0.0001;
    size_t expected_num_iterations = 57;
    RunPowerMethodProcessor(expected_converged, expected_stable_time_step, expected_num_iterations);
}

// Test that the PowerMethodProcessor will throw an exception if the all nodes are fixed
TEST_F(PowerMethodProcessorTest, AllFixed) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    AddVelocityBoundaryConditions(m_yaml_data);  // Fixes all nodes
    CreateInputFile();
    std::string mesh_string = "1x1x4|tets";
    CreateTestMesh(mesh_string);
    CreateSolver();
    EXPECT_THROW(RunPowerMethodProcessor(true, 0.0, 0), std::runtime_error);
}
