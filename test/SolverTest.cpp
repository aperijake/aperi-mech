#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "Application.h"
#include "ApplicationTestFixture.h"
#include "BoundaryCondition.h"
#include "ExternalForceContribution.h"
#include "FieldManager.h"
#include "InitialConditionUtil.h"
#include "InternalForceContribution.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "Material.h"
#include "Solver.h"
#include "TimeStepper.h"
#include "UnitTestUtils.h"

// Solver test fixture
class SolverTest : public ApplicationTest {
   protected:
    void SetUp() override {
        // Run ApplicationTest::SetUp first
        ApplicationTest::SetUp();
    }

    void RunSolver() {
        // Create an IO input file object and read the input file
        m_io_input_file = aperi::CreateIoInputFile(m_yaml_data);

        // Get field data
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData();

        // Create field manager
        m_field_manager = CreateFieldManager(field_data);

        // Create an IO mesh object
        aperi::IoMeshParameters io_mesh_parameters;  // Default parameters
        io_mesh_parameters.compose_output = true;
        m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

        // Read the mesh
        m_io_mesh->ReadMesh(m_io_input_file->GetMeshFile(0), m_field_manager);

        // Create the field results file
        m_io_mesh->CreateFieldResultsFile(m_io_input_file->GetOutputFile(0));

        // Get parts
        std::vector<YAML::Node> parts = m_io_input_file->GetParts(0);

        // Loop over parts, create materials, and add parts to force contributions
        for (auto part : parts) {
            YAML::Node material_node = m_io_input_file->GetMaterialFromPart(part);
            std::shared_ptr<aperi::Material> material = aperi::CreateMaterial(material_node);
            std::string part_location = part["set"].as<std::string>();
            std::cout << "Adding part " << part_location << " to force contributions" << std::endl;
            // TODO(jake): Make sure the part exists. This will just continue if it doesn't.
            stk::mesh::Part* stk_part = &m_io_mesh->GetMetaData().declare_part(part_location, stk::topology::ELEMENT_RANK);
            m_internal_force_contributions.push_back(CreateInternalForceContribution(material, stk_part));
        }

        // Get loads
        std::vector<YAML::Node> loads = m_io_input_file->GetLoads(0);

        // Loop over loads and add them to force contributions
        for (auto load : loads) {
            m_external_force_contributions.push_back(aperi::CreateExternalForceContribution(load, m_io_mesh->GetMetaData()));
        }

        // Set initial conditions
        std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(0);
        aperi::AddInitialConditions(initial_conditions, m_field_manager, m_io_mesh->GetMetaData());

        // Get boundary conditions
        std::vector<YAML::Node> boundary_conditions = m_io_input_file->GetBoundaryConditions(0);

        // Loop over boundary conditions and add them to the vector of boundary conditions
        for (auto boundary_condition : boundary_conditions) {
            std::string name = boundary_condition.begin()->first.as<std::string>();
            std::cout << "Adding boundary condition " << name << " to boundary conditions" << std::endl;
            m_boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition, m_io_mesh->GetMetaData()));
        }

        // Get the time stepper
        std::shared_ptr<aperi::TimeStepper> time_stepper = aperi::CreateTimeStepper(m_io_input_file->GetTimeStepper(0));

        // Create solver
        m_solver = aperi::CreateSolver(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, m_boundary_conditions, time_stepper);

        //// Run solver
        m_solver->Solve();

        // Get universal selector
        m_universal_selector = m_io_mesh->GetMetaData().universal_part();
    }

    void TearDown() override {
        MPI_Barrier(m_comm);
        // m_io_mesh->Finalize();

        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

   protected:
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> m_internal_force_contributions;
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> m_external_force_contributions;
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;
    std::shared_ptr<aperi::FieldManager> m_field_manager;
    std::shared_ptr<aperi::Solver> m_solver;
    stk::mesh::Selector m_universal_selector;
};

// Test that a basic explicit problem can be solved
TEST_F(SolverTest, Explicit) {
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    CreateInputFile();
    CreateTestMesh();
    RunSolver();
    const YAML::Node velocity_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"];
    double final_time = 1.0;
    double magnitude = velocity_node["magnitude"].as<double>();
    std::array<double, 3> direction = velocity_node["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {expected_velocity[0] * final_time, expected_velocity[1] * final_time, expected_velocity[2] * final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "acceleration", expected_acceleration);
}

// Driver function for gravity tests
void TestGravity(const YAML::Node& yaml_data, std::shared_ptr<aperi::Solver> solver, int num_procs, int num_blocks) {
    const YAML::Node velocity_node = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"];
    double final_time = 1.0;
    double magnitude = velocity_node["magnitude"].as<double>();
    std::array<double, 3> direction = velocity_node["direction"].as<std::array<double, 3>>();
    const YAML::Node gravity_node = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"];
    double gravity_magnitude = gravity_node["magnitude"].as<double>();
    std::array<double, 3> gravity_direction = gravity_node["direction"].as<std::array<double, 3>>();

    std::array<double, 3> expected_acceleration = {gravity_magnitude * gravity_direction[0], gravity_magnitude * gravity_direction[1], gravity_magnitude * gravity_direction[2]};
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {magnitude * direction[0] * final_time, magnitude * direction[1] * final_time, magnitude * direction[2] * final_time};
    for (int i = 0; i < 3; ++i) {
        expected_velocity[i] += expected_acceleration[i] * final_time;
        expected_displacement[i] += 0.5 * expected_acceleration[i] * final_time * final_time;
    }

    stk::mesh::Selector selector = solver->GetBulkData()->mesh_meta_data().universal_part();

    CheckNodeFieldValues(*solver->GetBulkData(), selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*solver->GetBulkData(), selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*solver->GetBulkData(), selector, "acceleration", expected_acceleration);

    double density = yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
    double mass = density * num_procs * num_blocks;  // 1x1x(num_procs * num_blocks) mesh
    std::array<double, 3> expected_mass = {mass, mass, mass};
    CheckNodeFieldSum(*solver->GetBulkData(), selector, "mass", expected_mass);
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
    double magnitude = boundary_conditions[0]["displacement"]["magnitude"].as<double>();
    std::array<double, 3> direction = boundary_conditions[0]["displacement"]["direction"].as<std::array<double, 3>>();
    double final_time = 1.0;
    std::array<double, 3> expected_displacement = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_velocity = {expected_displacement[0] / final_time, expected_displacement[1] / final_time, expected_displacement[2] / final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "acceleration", expected_acceleration);
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
    second_boundary_condition["displacement"]["magnitude"] = 2.0;
    second_boundary_condition["displacement"]["direction"][1] = 1.0;
    second_boundary_condition["displacement"]["direction"][2] = 0.0;
    // Add a second boundary condition
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"].push_back(second_boundary_condition);

    CreateInputFile();
    // Add a sideset to the mesh
    m_mesh_sidesets = "|sideset:xX";
    CreateTestMesh();
    RunSolver();

    // Check the boundary conditions for the first set
    const YAML::Node boundary_conditions = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];
    double magnitude_1 = boundary_conditions[0]["displacement"]["magnitude"].as<double>();
    std::array<double, 3> direction_1 = boundary_conditions[0]["displacement"]["direction"].as<std::array<double, 3>>();
    double final_time = 1.0;
    std::array<double, 3> expected_displacement_1 = {magnitude_1 * direction_1[0], magnitude_1 * direction_1[1], magnitude_1 * direction_1[2]};
    std::array<double, 3> expected_velocity_1 = {expected_displacement_1[0] / final_time, expected_displacement_1[1] / final_time, expected_displacement_1[2] / final_time};
    std::array<double, 3> expected_acceleration_1 = {0, 0, 0};

    // Get selector for the first set
    stk::mesh::Part* p_set_part_1 = m_io_mesh->GetMetaData().get_part("surface_1");
    stk::mesh::Selector set_selector_1(*p_set_part_1);

    CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_1, "displacement", expected_displacement_1);
    CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_1, "velocity", expected_velocity_1);
    CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_1, "acceleration", expected_acceleration_1);

    // Check the boundary conditions for the second set
    double magnitude_2 = boundary_conditions[1]["displacement"]["magnitude"].as<double>();
    std::array<double, 3> direction_2 = boundary_conditions[1]["displacement"]["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_displacement_2 = {magnitude_2 * direction_2[0], magnitude_2 * direction_2[1], magnitude_2 * direction_2[2]};
    std::array<double, 3> expected_velocity_2 = {expected_displacement_2[0] / final_time, expected_displacement_2[1] / final_time, expected_displacement_2[2] / final_time};
    std::array<double, 3> expected_acceleration_2 = {0, 0, 0};

    // Get selector for the second set
    stk::mesh::Part* p_set_part_2 = m_io_mesh->GetMetaData().get_part("surface_2");
    stk::mesh::Selector set_selector_2(*p_set_part_2);

    CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_2, "displacement", expected_displacement_2);
    CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_2, "velocity", expected_velocity_2);
    CheckNodeFieldValues(*m_solver->GetBulkData(), set_selector_2, "acceleration", expected_acceleration_2);
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
    double magnitude = boundary_conditions[0]["velocity"]["magnitude"].as<double>();
    std::array<double, 3> direction = boundary_conditions[0]["velocity"]["direction"].as<std::array<double, 3>>();
    double final_time = 1.0;
    double delta_time = 0.1;
    double second_final_time = final_time - delta_time;
    std::array<double, 3> expected_velocity = {magnitude * direction[0] * second_final_time, magnitude * direction[1] * second_final_time, magnitude * direction[2] * second_final_time};
    // Integrate the velocity to get the displacement
    std::array<double, 3> expected_displacement = {0.0, 0.0, 0.0};
    double time = 0.0;
    for (size_t i = 0; i < static_cast<size_t>(final_time / delta_time); ++i) {
        // Increment the displacement
        expected_displacement[0] += magnitude * direction[0] * time * delta_time;
        expected_displacement[1] += magnitude * direction[1] * time * delta_time;
        expected_displacement[2] += magnitude * direction[2] * time * delta_time;
        time += delta_time;
    }
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetBulkData(), m_universal_selector, "acceleration", expected_acceleration);
}