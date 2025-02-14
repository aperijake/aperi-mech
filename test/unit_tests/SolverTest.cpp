#include <gtest/gtest.h>

#include <fstream>
#include <memory>
#include <string>

#include "MathUtils.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"

// Test that a basic explicit problem can be solved
TEST_F(SolverTest, Explicit) {
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    CreateInputFile();
    CreateTestMesh();
    RunSolver();
    const YAML::Node velocity_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"];
    double final_time = 1.0;
    auto magnitude = velocity_node["magnitude"].as<double>();
    auto direction = velocity_node["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {expected_velocity[0] * final_time, expected_velocity[1] * final_time, expected_velocity[2] * final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    EXPECT_GT(std::abs(magnitude), 0);
    EXPECT_GT((direction[0] * direction[0] + direction[1] * direction[1] + direction[2] * direction[2]), 0);

    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "displacement_coefficients", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "velocity_coefficients", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration_coefficients", expected_acceleration, aperi::FieldQueryState::N);
}

// Test that a basic explicit problem with the power method can be solved
TEST_F(SolverTest, ExplicitPowerMethod) {
    bool skip = false;
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
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"].remove("direct_time_stepper");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["power_method_time_stepper"]["scale_factor"] = 0.9;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["power_method_time_stepper"]["update_interval"] = 3;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["power_method_time_stepper"]["time_end"] = 1.0;
    // Increase the density to make the time step larger, try and make it near 0.1
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"] = 1.21 * 7.15555e9;
    CreateInputFile();
    CreateTestMesh();
    RunSolver();
    const YAML::Node velocity_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"];
    double final_time = 1.0;
    auto magnitude = velocity_node["magnitude"].as<double>();
    auto direction = velocity_node["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {expected_velocity[0] * final_time, expected_velocity[1] * final_time, expected_velocity[2] * final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    EXPECT_GT(std::abs(magnitude), 0);
    EXPECT_GT((direction[0] * direction[0] + direction[1] * direction[1] + direction[2] * direction[2]), 0);

    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "displacement_coefficients", expected_displacement, aperi::FieldQueryState::NP1);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "velocity_coefficients", expected_velocity, aperi::FieldQueryState::NP1);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration_coefficients", expected_acceleration, aperi::FieldQueryState::NP1);
}

// Driver function for gravity tests
void TestGravity(const YAML::Node& yaml_data, const std::shared_ptr<aperi::Solver>& solver, int num_procs, int num_blocks) {
    const YAML::Node velocity_node = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"];
    double final_time = 1.0;
    auto magnitude = velocity_node["magnitude"].as<double>();
    auto direction = velocity_node["direction"].as<std::array<double, 3>>();
    const YAML::Node gravity_node = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"]["vector"];
    auto gravity_magnitude = gravity_node["magnitude"].as<double>();
    auto gravity_direction = gravity_node["direction"].as<std::array<double, 3>>();

    std::array<double, 3> expected_acceleration = {gravity_magnitude * gravity_direction[0], gravity_magnitude * gravity_direction[1], gravity_magnitude * gravity_direction[2]};
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {magnitude * direction[0] * final_time, magnitude * direction[1] * final_time, magnitude * direction[2] * final_time};
    for (int i = 0; i < 3; ++i) {
        expected_velocity[i] += expected_acceleration[i] * final_time;
        expected_displacement[i] += 0.5 * expected_acceleration[i] * final_time * final_time;
    }

    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*solver->GetMeshData(), {}, "displacement_coefficients", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*solver->GetMeshData(), {}, "velocity_coefficients", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*solver->GetMeshData(), {}, "acceleration_coefficients", expected_acceleration, aperi::FieldQueryState::N);

    auto density = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
    double mass = density * num_procs * num_blocks;  // 1x1x(num_procs * num_blocks) mesh
    std::array<double, 3> expected_mass = {mass, mass, mass};
    CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None, 1.0e-12);
}

// Test that a basic explicit problem with gravity can be solved
TEST_F(SolverTest, ExplicitGravity) {
    m_yaml_data = CreateTestYaml();
    m_num_blocks = 1;
    CreateInputFile();
    CreateTestMesh();
    RunSolver();
    TestGravity(m_yaml_data, m_solver, m_num_procs, m_num_blocks);
}

// Test that a basic explicit problem with gravity can be solved with multiple blocks
TEST_F(SolverTest, ExplicitGravityMultipleBlocks) {
    // TODO(jake): add the ability to generate a mesh with multiple blocks and specify the number of blocks in the input file
    // STK QUESTION: How do I generate a mesh with multiple blocks?
    // Want something like this:
    /*
        Joined blocks:
         -------------------
        |         |         |
        | block_1 | block_2 |
        |         |         |
         --------------------
    */
    // Also, want something like this:
    /*
        Separated blocks:
         ---------    ---------
        |         |  |         |
        | block_1 |  | block_2 |
        |         |  |         |
         ---------    ----------
    */
    m_yaml_data = CreateTestYaml();
    m_num_blocks = 2;
    CreateInputFile();
    CreateTestMesh();
    RunSolver();
    TestGravity(m_yaml_data, m_solver, m_num_procs, m_num_blocks);
}
// TODO(jake): make a specific test for ExternalForceContributionGravity

// Test that a basic explicit problem with boundary conditions can be solved
TEST_F(SolverTest, ExplicitBoundaryConditions) {
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("initial_conditions");
    AddDisplacementBoundaryConditions(m_yaml_data);
    CreateInputFile();
    CreateTestMesh();
    RunSolver();

    // Check the boundary conditions
    const YAML::Node boundary_conditions = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];
    auto magnitude = boundary_conditions[0]["displacement"]["vector"]["magnitude"].as<double>();
    auto direction = boundary_conditions[0]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
    double final_time = 1.0;
    std::array<double, 3> expected_displacement = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_velocity = {expected_displacement[0] / final_time, expected_displacement[1] / final_time, expected_displacement[2] / final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "displacement_coefficients", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "velocity_coefficients", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration_coefficients", expected_acceleration, aperi::FieldQueryState::N);
}

// Test that a basic explicit problem with two boundary conditions can be solved
TEST_F(SolverTest, ExplicitBoundaryConditionsTwoSets) {
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("initial_conditions");

    AddDisplacementBoundaryConditions(m_yaml_data);
    // Change the boundary condition to apply to a different set
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["sets"][0] = "surface_1";

    // Deep copy the first boundary condition to create a second boundary condition
    YAML::Node second_boundary_condition = Clone(m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]);
    // Change the boundary condition to apply to a different set
    second_boundary_condition["displacement"]["sets"][0] = "surface_2";
    // Change the magnitude and direction of the second boundary condition
    second_boundary_condition["displacement"]["vector"]["magnitude"] = 2.0;
    second_boundary_condition["displacement"]["vector"]["direction"][1] = 1.0;
    second_boundary_condition["displacement"]["vector"]["direction"][2] = 0.0;
    // Add a second boundary condition
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"].push_back(second_boundary_condition);

    CreateInputFile();
    // Add a sideset to the mesh
    m_mesh_sidesets = "|sideset:xX";
    CreateTestMesh();
    RunSolver();

    // Check the boundary conditions for the first set
    const YAML::Node boundary_conditions = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];
    auto magnitude_1 = boundary_conditions[0]["displacement"]["vector"]["magnitude"].as<double>();
    auto direction_1 = boundary_conditions[0]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
    double final_time = 1.0;
    std::array<double, 3> expected_displacement_1 = {magnitude_1 * direction_1[0], magnitude_1 * direction_1[1], magnitude_1 * direction_1[2]};
    std::array<double, 3> expected_velocity_1 = {expected_displacement_1[0] / final_time, expected_displacement_1[1] / final_time, expected_displacement_1[2] / final_time};
    std::array<double, 3> expected_acceleration_1 = {0, 0, 0};

    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "displacement_coefficients", expected_displacement_1, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "velocity_coefficients", expected_velocity_1, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "acceleration_coefficients", expected_acceleration_1, aperi::FieldQueryState::N);

    // Check the boundary conditions for the second set
    auto magnitude_2 = boundary_conditions[1]["displacement"]["vector"]["magnitude"].as<double>();
    auto direction_2 = boundary_conditions[1]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_displacement_2 = {magnitude_2 * direction_2[0], magnitude_2 * direction_2[1], magnitude_2 * direction_2[2]};
    std::array<double, 3> expected_velocity_2 = {expected_displacement_2[0] / final_time, expected_displacement_2[1] / final_time, expected_displacement_2[2] / final_time};
    std::array<double, 3> expected_acceleration_2 = {0, 0, 0};

    // Get selector for the second set
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "displacement_coefficients", expected_displacement_2, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "velocity_coefficients", expected_velocity_2, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "acceleration_coefficients", expected_acceleration_2, aperi::FieldQueryState::N);
}

// Test that a basic explicit problem with a velocity boundary condition can be solved
TEST_F(SolverTest, ExplicitVelocityBoundaryConditions) {
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("initial_conditions");
    AddVelocityBoundaryConditions(m_yaml_data);
    CreateInputFile();
    CreateTestMesh();
    RunSolver();

    // Check the boundary conditions
    const YAML::Node boundary_conditions = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];
    auto magnitude = boundary_conditions[0]["velocity"]["vector"]["magnitude"].as<double>();
    auto direction = boundary_conditions[0]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
    EXPECT_GT(std::abs(magnitude), 0);
    EXPECT_GT((direction[0] * direction[0] + direction[1] * direction[1] + direction[2] * direction[2]), 0);
    double final_time = 1.0;
    double delta_time = 0.1;
    std::array<double, 3> expected_velocity = {magnitude * direction[0] * final_time, magnitude * direction[1] * final_time, magnitude * direction[2] * final_time};
    // Integrate the velocity to get the displacement
    std::array<double, 3> expected_displacement = {0.0, 0.0, 0.0};
    double time = 0.0;
    for (size_t i = 0; i < static_cast<size_t>(final_time / delta_time); ++i) {
        // Increment the displacement
        expected_displacement[0] += magnitude * direction[0] * (time + 0.5 * delta_time) * delta_time;
        expected_displacement[1] += magnitude * direction[1] * (time + 0.5 * delta_time) * delta_time;
        expected_displacement[2] += magnitude * direction[2] * (time + 0.5 * delta_time) * delta_time;
        time += delta_time;
    }
    std::array<double, 3> expected_acceleration = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};

    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "displacement_coefficients", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "velocity_coefficients", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration_coefficients", expected_acceleration, aperi::FieldQueryState::N);
}