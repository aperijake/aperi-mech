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
    }

    double RunPowerMethodProcessor() {
        // Get the solver
        m_explicit_solver = dynamic_cast<aperi::ExplicitSolver *>(m_solver.get());

        // Build the mass matrix
        m_explicit_solver->BuildMassMatrix();

        // Create a PowerMethodProcessor object
        m_power_method_processor = std::make_shared<aperi::PowerMethodProcessor>(m_solver->GetMeshData(), std::vector<std::string>{}, m_explicit_solver);
        // Run the power method processor
        double stable_time_step = m_power_method_processor->ComputeStableTimeIncrement(500);
        return stable_time_step;
    }

    std::shared_ptr<aperi::PowerMethodProcessor> m_power_method_processor;  ///< The power method processor object.
    aperi::ExplicitSolver *m_explicit_solver;                               ///< The explicit solver object.
};

// Test that the PowerMethodProcessor can be run
TEST_F(PowerMethodProcessorTest, PowerMethodProcessor) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    CreateInputFile();
    std::string mesh_string = "1x1x4|tets";
    CreateTestMesh(mesh_string);
    CreateSolver();
    double stable_time_step = RunPowerMethodProcessor();
    double expected_stable_time_step = 0.0001;
    EXPECT_NEAR(stable_time_step, expected_stable_time_step, 1e-4);
}