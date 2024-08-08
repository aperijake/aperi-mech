#pragma once
#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "Application.h"
#include "ApplicationTestFixture.h"
#include "BoundaryCondition.h"
#include "ExternalForceContribution.h"
#include "FieldData.h"
#include "InitialConditionUtil.h"
#include "InternalForceContribution.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "Material.h"
#include "Preprocessor.h"
#include "Scheduler.h"
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

    double RunSolver() {
        // Create an IO input file object and read the input file
        m_io_input_file = aperi::CreateIoInputFile(m_yaml_data);

        // Create an IO mesh object
        aperi::IoMeshParameters io_mesh_parameters;  // Default parameters
        io_mesh_parameters.compose_output = true;
        m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

        // Get parts
        std::vector<YAML::Node> parts = m_io_input_file->GetParts(0);

        // Get the part names
        std::vector<std::string> part_names;
        part_names.reserve(parts.size());
        bool has_strain_smoothing = false;
        for (auto part : parts) {
            part_names.push_back(part["set"].as<std::string>());
            // Check if integration scheme is "strain_smoothing"
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]) {
                has_strain_smoothing = true;
            }
        }

        // Get field data
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData(has_strain_smoothing);

        // Read the mesh
        m_io_mesh->ReadMesh(m_io_input_file->GetMeshFile(0), part_names, field_data);

        // Create the field results file
        m_io_mesh->CreateFieldResultsFile(m_io_input_file->GetOutputFile(0));

        // Loop over parts, create materials, and add parts to force contributions
        for (auto part : parts) {
            // Create InternalForceContributionParameters
            aperi::InternalForceContributionParameters internal_force_contribution_parameters(part, m_io_input_file, m_io_mesh->GetMeshData());
            m_internal_force_contributions.push_back(aperi::CreateInternalForceContribution(internal_force_contribution_parameters));
        }

        // Get loads
        std::vector<YAML::Node> loads = m_io_input_file->GetLoads(0);

        // Loop over loads and add them to force contributions
        for (auto load : loads) {
            m_external_force_contributions.push_back(aperi::CreateExternalForceContribution(load, m_io_mesh->GetMeshData()));
        }

        // Set initial conditions
        std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(0);
        aperi::AddInitialConditions(initial_conditions, m_io_mesh->GetMeshData());

        // Get boundary conditions
        std::vector<YAML::Node> boundary_conditions = m_io_input_file->GetBoundaryConditions(0);

        // Loop over boundary conditions and add them to the vector of boundary conditions
        for (auto boundary_condition : boundary_conditions) {
            std::string name = boundary_condition.begin()->first.as<std::string>();
            std::cout << "Adding boundary condition " << name << " to boundary conditions" << std::endl;
            m_boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition, m_io_mesh->GetMeshData()));
        }

        // Get the time stepper
        std::shared_ptr<aperi::TimeStepper> time_stepper = aperi::CreateTimeStepper(m_io_input_file->GetTimeStepper(0));

        // Get the output scheduler
        std::shared_ptr<aperi::Scheduler> output_scheduler = aperi::CreateScheduler(m_io_input_file->GetOutputScheduler(0));

        // Do preprocessing
        aperi::DoPreprocessing(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, m_boundary_conditions);

        // Create solver
        m_solver = aperi::CreateSolver(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, m_boundary_conditions, time_stepper, output_scheduler);

        //// Run solver
        return m_solver->Solve();
    }

    void ResetSolverTest() {
        ResetApplicationTest();
        m_io_input_file.reset();
        m_io_mesh.reset();
        m_internal_force_contributions.clear();
        m_external_force_contributions.clear();
        m_boundary_conditions.clear();
        m_solver.reset();
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
    std::shared_ptr<aperi::Solver> m_solver;
};
