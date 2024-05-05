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
    double magnitude = velocity_node["magnitude"].as<double>();
    std::array<double, 3> direction = velocity_node["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {expected_velocity[0] * final_time, expected_velocity[1] * final_time, expected_velocity[2] * final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    EXPECT_GT(std::abs(magnitude), 0);
    EXPECT_GT((direction[0] * direction[0] + direction[1] * direction[1] + direction[2] * direction[2]), 0);

    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "displacement", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "velocity", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration", expected_acceleration, aperi::FieldQueryState::N);
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

    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*solver->GetMeshData(), {}, "displacement", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*solver->GetMeshData(), {}, "velocity", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*solver->GetMeshData(), {}, "acceleration", expected_acceleration, aperi::FieldQueryState::N);

    double density = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
    double mass = density * num_procs * num_blocks;  // 1x1x(num_procs * num_blocks) mesh
    std::array<double, 3> expected_mass = {mass, mass, mass};
    CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None);
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

    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "displacement", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "velocity", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration", expected_acceleration, aperi::FieldQueryState::N);
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

    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "displacement", expected_displacement_1, aperi::FieldQueryState::N); 
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "velocity", expected_velocity_1, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "acceleration", expected_acceleration_1, aperi::FieldQueryState::N);

    // Check the boundary conditions for the second set
    double magnitude_2 = boundary_conditions[1]["displacement"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> direction_2 = boundary_conditions[1]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_displacement_2 = {magnitude_2 * direction_2[0], magnitude_2 * direction_2[1], magnitude_2 * direction_2[2]};
    std::array<double, 3> expected_velocity_2 = {expected_displacement_2[0] / final_time, expected_displacement_2[1] / final_time, expected_displacement_2[2] / final_time};
    std::array<double, 3> expected_acceleration_2 = {0, 0, 0};

    // Get selector for the second set
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "displacement", expected_displacement_2, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "velocity", expected_velocity_2, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "acceleration", expected_acceleration_2, aperi::FieldQueryState::N);
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

    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "displacement", expected_displacement, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "velocity", expected_velocity, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration", expected_acceleration, aperi::FieldQueryState::N);
}

// Create the Taylor impact test
YAML::Node CreateTaylorImpactYaml(double time_increment, double end_time, size_t num_elem_x = 10, size_t num_elem_y = 10, size_t num_elem_z = 30) {
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
TEST_F(SolverTest, BenchmarkTaylorImpact1) {
    // This isn't really testing anything, just for benchmarking
    const bool do_benchmarking = false;
    if (!do_benchmarking) {
        return;
    }
    StopCapturingOutput();

    // The time increment
    double time_increment = 0.01;

    // Number of node-steps
    size_t num_node_steps = 8e7;

    // Number of refinements and refinement factor
    size_t num_refinements = 5;
    size_t refinement_factor = 2;

    // Initial mesh size
    size_t initial_num_elem_x = 7;
    size_t initial_num_elem_y = 7;
    size_t initial_num_elem_z = 21;

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
    num_steps.push_back(num_node_steps / num_nodes.back());
    end_times.push_back(time_increment * num_steps.back());

    for (size_t i = 1; i < num_refinements; ++i) {
        // Next refinement mesh
        num_elem_x.push_back(num_elem_x.back() * refinement_factor);
        num_elem_y.push_back(num_elem_y.back() * refinement_factor);
        num_elem_z.push_back(num_elem_z.back() * refinement_factor);
        num_nodes.push_back((num_elem_x.back() + 1) * (num_elem_y.back() + 1) * (num_elem_z.back() + 1));
        num_steps.push_back(num_node_steps / num_nodes.back());
        end_times.push_back(time_increment * num_steps.back());
    }

    // Print the run settings before running
    std::cout << "Number of node-steps: " << num_node_steps << std::endl;
    std::cout << "Time increment: " << time_increment << std::endl;
    std::cout << "Initial mesh size: " << initial_num_elem_x << "x" << initial_num_elem_y << "x" << initial_num_elem_z << std::endl;
    std::cout << "Refinement factor: " << refinement_factor << std::endl;
    std::cout << "Number of refinements: " << num_refinements << std::endl;
    std::cout << "--------------------------------------------------------------------------------" << std::endl;
    std::cout << std::setw(20) << "Mesh size" << std::setw(20) << "Number of nodes" << std::setw(20) << "Number of steps" << std::setw(20) << "End time" << std::endl;
    for (size_t i = 0; i < num_refinements; ++i) {
        std::cout << std::setw(20) << std::to_string(num_elem_x[i]) + "x" + std::to_string(num_elem_y[i]) + "x" + std::to_string(num_elem_z[i])
                  << std::setw(20) << num_nodes[i]
                  << std::setw(20) << num_steps[i]
                  << std::setw(20) << end_times[i] << std::endl;
    }
    std::cout << "--------------------------------------------------------------------------------" << std::endl;

    for (size_t i = 0; i < num_refinements; ++i) {
        ASSERT_GT((int)num_steps.back(), 10) << "Number of steps is too small. Adjust the parameters.";
    }

    for (size_t i = 0; i < num_refinements; ++i) {
        // Create the next refinement
        m_yaml_data = CreateTaylorImpactYaml(time_increment, end_times[i], num_elem_x[i], num_elem_y[i], num_elem_z[i]);
        CreateInputFile();
        CreateTestMesh(std::to_string(num_elem_x[i]) + "x" + std::to_string(num_elem_y[i]) + "x" + std::to_string(num_elem_z[i]) + "|sideset:z|tets");

        // Run the solver
        double average_increment_runtime = RunSolver();
        std::cout << "Average increment runtime: " << average_increment_runtime << " seconds" << std::endl;

        // Store the results
        runtimes.push_back(average_increment_runtime);

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
