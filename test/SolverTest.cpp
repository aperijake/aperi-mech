#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "Application.h"
#include "ApplicationTestFixture.h"
#include "FieldManager.h"
#include "ForceContribution.h"
#include "InitialConditionManager.h"
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

        // Get field data and initial conditions
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData();
        std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(0);
        AddInitialConditions(initial_conditions, field_data);

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

        // Get the time stepper
        std::shared_ptr<aperi::TimeStepper> time_stepper = aperi::CreateTimeStepper(m_io_input_file->GetTimeStepper(0));

        // Create solver
        m_solver = aperi::CreateSolver(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, time_stepper);

        //// Run solver
        m_solver->Solve();
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
    std::shared_ptr<aperi::FieldManager> m_field_manager;
    std::shared_ptr<aperi::Solver> m_solver;
};

// Test that a basic explicit problem can be solved
TEST_F(SolverTest, Explicit) {
    m_yaml_data = CreateTestYaml();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
    CreateInputFile();
    RunSolver();
    const YAML::Node velocity_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"];
    double final_time = 1.0;
    double magnitude = velocity_node["magnitude"].as<double>();
    std::array<double, 3> direction = velocity_node["direction"].as<std::array<double, 3>>();
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {expected_velocity[0] * final_time, expected_velocity[1] * final_time, expected_velocity[2] * final_time};
    std::array<double, 3> expected_acceleration = {0, 0, 0};

    CheckNodeFieldValues(*m_solver->GetBulkData(), "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetBulkData(), "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetBulkData(), "acceleration", expected_acceleration);
}

// Test that a basic explicit problem with gravity can be solved
TEST_F(SolverTest, ExplicitGravity) {
    m_yaml_data = CreateTestYaml();
    CreateInputFile();
    RunSolver();
    const YAML::Node velocity_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"];
    double final_time = 1.0;
    double magnitude = velocity_node["magnitude"].as<double>();
    std::array<double, 3> direction = velocity_node["direction"].as<std::array<double, 3>>();
    const YAML::Node gravity_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"];
    double gravity_magnitude = gravity_node["magnitude"].as<double>();
    std::array<double, 3> gravity_direction = gravity_node["direction"].as<std::array<double, 3>>();

    std::array<double, 3> expected_acceleration = {gravity_magnitude * gravity_direction[0], gravity_magnitude * gravity_direction[1], gravity_magnitude * gravity_direction[2]};
    std::array<double, 3> expected_velocity = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
    std::array<double, 3> expected_displacement = {magnitude * direction[0] * final_time, magnitude * direction[1] * final_time, magnitude * direction[2] * final_time};
    for (int i = 0; i < 3; ++i) {
        expected_velocity[i] += expected_acceleration[i] * final_time;
        expected_displacement[i] += 0.5 * expected_acceleration[i] * final_time * final_time;
    }

    CheckNodeFieldValues(*m_solver->GetBulkData(), "displacement", expected_displacement);
    CheckNodeFieldValues(*m_solver->GetBulkData(), "velocity", expected_velocity);
    CheckNodeFieldValues(*m_solver->GetBulkData(), "acceleration", expected_acceleration);

    // TODO(jake): make a specific test for ExternalForceContributionGravity
}
