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
        m_io_input_file = acm::CreateIoInputFile(m_yaml_data);

        // Get field data and initial conditions
        std::vector<acm::FieldData> field_data = acm::GetFieldData();
        std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions();
        AddInitialConditions(initial_conditions, field_data);

        // Create field manager
        m_field_manager = CreateFieldManager(field_data);

        // Create an IO mesh object
        acm::IoMeshParameters io_mesh_parameters;  // Default parameters
        io_mesh_parameters.compose_output = true;
        m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

        // Read the mesh
        m_io_mesh->ReadMesh(m_io_input_file->GetMeshFile(), m_field_manager);

        // Create the field results file
        m_io_mesh->CreateFieldResultsFile(m_io_input_file->GetOutputFile());

        // Get parts
        std::vector<YAML::Node> parts = m_io_input_file->GetParts();

        // Loop over parts, create materials, and add parts to force contributions
        for (auto part : parts) {
            YAML::Node material_node = m_io_input_file->GetMaterialFromPart(part);
            std::shared_ptr<acm::Material> material = acm::CreateMaterial(material_node);
            std::string part_location = part["location"].as<std::string>();
            // TODO(jake): add part to ForceContribution
            m_internal_force_contributions.push_back(CreateInternalForceContribution(material));
        }

        // Get loads
        std::vector<YAML::Node> loads = m_io_input_file->GetLoads();

        // Loop over loads and add them to force contributions
        for (auto load : loads) {
            m_external_force_contributions.push_back(acm::CreateExternalForceContribution(load, m_io_mesh->GetMetaData()));
        }

        // Create solver
        m_solver = acm::CreateSolver(m_io_mesh, m_internal_force_contributions, m_external_force_contributions);

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
    std::shared_ptr<acm::IoInputFile> m_io_input_file;
    std::shared_ptr<acm::IoMesh> m_io_mesh;
    std::vector<std::shared_ptr<acm::InternalForceContribution>> m_internal_force_contributions;
    std::vector<std::shared_ptr<acm::ExternalForceContribution>> m_external_force_contributions;
    std::shared_ptr<acm::FieldManager> m_field_manager;
    std::shared_ptr<acm::Solver> m_solver;
};

// Test that a basic explicit problem can be solved
TEST_F(SolverTest, Explicit) {
    m_yaml_data = CreateTestYaml();
    m_yaml_data.remove("boundary_conditions");
    m_yaml_data.remove("loads");
    CreateInputFile();
    RunSolver();
    double final_time = 1.0;
    double magnitude = m_yaml_data["initial_conditions"][0]["magnitude"].as<double>();
    std::array<double, 3> direction = m_yaml_data["initial_conditions"][0]["direction"].as<std::array<double, 3>>();
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
    m_yaml_data.remove("boundary_conditions");
    CreateInputFile();
    RunSolver();
    double final_time = 1.0;
    double magnitude = m_yaml_data["initial_conditions"][0]["magnitude"].as<double>();
    std::array<double, 3> direction = m_yaml_data["initial_conditions"][0]["direction"].as<std::array<double, 3>>();
    double gravity_magnitude = m_yaml_data["loads"][0]["magnitude"].as<double>();
    std::array<double, 3> gravity_direction = m_yaml_data["loads"][0]["direction"].as<std::array<double, 3>>();

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
