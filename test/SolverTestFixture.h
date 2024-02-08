#pragma once
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