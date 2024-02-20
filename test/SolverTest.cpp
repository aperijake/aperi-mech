#include <gtest/gtest.h>

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
    double magnitude = velocity_node["magnitude"].as<double>();
    std::array<double, 3> direction = velocity_node["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {expected_velocity[0] * final_time, expected_velocity[1] * final_time, expected_velocity[2] * final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    EXPECT_GT(std::abs(magnitude), 0);
    EXPECT_GT((direction[0] * direction[0] + direction[1] * direction[1] + direction[2] * direction[2]), 0);

    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "acceleration", expected_acceleration);
}

// Driver function for gravity tests
void TestGravity(const YAML::Node& yaml_data, std::shared_ptr<aperi::Solver> solver, int num_procs, int num_blocks) {
    const YAML::Node velocity_node = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"];
    double final_time = 1.0;
    double magnitude = velocity_node["magnitude"].as<double>();
    std::array<double, 3> direction = velocity_node["direction"].as<std::array<double, 3>>();
    const YAML::Node gravity_node = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"]["vector"];
    double gravity_magnitude = gravity_node["magnitude"].as<double>();
    std::array<double, 3> gravity_direction = gravity_node["direction"].as<std::array<double, 3>>();

    std::array<double, 3> expected_acceleration = {gravity_magnitude * gravity_direction[0], gravity_magnitude * gravity_direction[1], gravity_magnitude * gravity_direction[2]};
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {magnitude * direction[0] * final_time, magnitude * direction[1] * final_time, magnitude * direction[2] * final_time};
    for (int i = 0; i < 3; ++i) {
        expected_velocity[i] += expected_acceleration[i] * final_time;
        expected_displacement[i] += 0.5 * expected_acceleration[i] * final_time * final_time;
    }

    stk::mesh::Selector selector = solver->GetMeshData()->GetBulkData()->mesh_meta_data().universal_part();

    CheckNodeFieldValues(*solver->GetMeshData()->GetBulkData(), selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*solver->GetMeshData()->GetBulkData(), selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*solver->GetMeshData()->GetBulkData(), selector, "acceleration", expected_acceleration);

    double density = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
    double mass = density * num_procs * num_blocks;  // 1x1x(num_procs * num_blocks) mesh
    std::array<double, 3> expected_mass = {mass, mass, mass};
    CheckNodeFieldSum(*solver->GetMeshData()->GetBulkData(), selector, "mass", expected_mass);
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
    double magnitude = boundary_conditions[0]["displacement"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> direction = boundary_conditions[0]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
    double final_time = 1.0;
    std::array<double, 3> expected_displacement = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_velocity = {expected_displacement[0] / final_time, expected_displacement[1] / final_time, expected_displacement[2] / final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "acceleration", expected_acceleration);
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
    double magnitude_1 = boundary_conditions[0]["displacement"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> direction_1 = boundary_conditions[0]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
    double final_time = 1.0;
    std::array<double, 3> expected_displacement_1 = {magnitude_1 * direction_1[0], magnitude_1 * direction_1[1], magnitude_1 * direction_1[2]};
    std::array<double, 3> expected_velocity_1 = {expected_displacement_1[0] / final_time, expected_displacement_1[1] / final_time, expected_displacement_1[2] / final_time};
    std::array<double, 3> expected_acceleration_1 = {0, 0, 0};

    // Get selector for the first set
    stk::mesh::Part* p_set_part_1 = m_io_mesh->GetMetaData().get_part("surface_1");
    stk::mesh::Selector set_selector_1(*p_set_part_1);

    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), set_selector_1, "displacement", expected_displacement_1);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), set_selector_1, "velocity", expected_velocity_1);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), set_selector_1, "acceleration", expected_acceleration_1);

    // Check the boundary conditions for the second set
    double magnitude_2 = boundary_conditions[1]["displacement"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> direction_2 = boundary_conditions[1]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_displacement_2 = {magnitude_2 * direction_2[0], magnitude_2 * direction_2[1], magnitude_2 * direction_2[2]};
    std::array<double, 3> expected_velocity_2 = {expected_displacement_2[0] / final_time, expected_displacement_2[1] / final_time, expected_displacement_2[2] / final_time};
    std::array<double, 3> expected_acceleration_2 = {0, 0, 0};

    // Get selector for the second set
    stk::mesh::Part* p_set_part_2 = m_io_mesh->GetMetaData().get_part("surface_2");
    stk::mesh::Selector set_selector_2(*p_set_part_2);

    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), set_selector_2, "displacement", expected_displacement_2);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), set_selector_2, "velocity", expected_velocity_2);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), set_selector_2, "acceleration", expected_acceleration_2);
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
    double magnitude = boundary_conditions[0]["velocity"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> direction = boundary_conditions[0]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
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

    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetMeshData()->GetBulkData(), m_universal_selector, "acceleration", expected_acceleration);
}

// Test a large, square cross section, taylor impact test
TEST_F(SolverTest, DISABLED_TaylorImpact) {
    // This isn't really testing anything

    // Start with the basic explicit test
    m_yaml_data = CreateTestYaml();

    // Change the time increment
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["direct_time_stepper"]["time_increment"] = 0.01;

    // Remove the loads
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");

    // Change the initial conditions
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"] = 10.0;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"][0] = 0;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"][1] = 0;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"][2] = 1;

    // Add boundary conditions on the impact surface
    AddDisplacementBoundaryConditions(m_yaml_data);
    // Change boundary condition to apply to surface_1
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["sets"][0] = "surface_1";
    // Change the magnitude and direction of the boundary condition
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["magnitude"] = 0;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][0] = 0;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][1] = 0;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][2] = 1;

    CreateInputFile();
    CreateTestMesh("4x4x10|sideset:z|tets");
    RunSolver();
}