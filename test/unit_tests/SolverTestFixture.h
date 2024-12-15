#pragma once
#include <gtest/gtest.h>

#include <chrono>
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
#include "LogUtils.h"
#include "Material.h"
#include "MeshLabeler.h"
#include "Preprocessor.h"
#include "Scheduler.h"
#include "Solver.h"
#include "TimeStepper.h"
#include "UnitTestUtils.h"
#include "YamlUtils.h"

// Solver test fixture
class SolverTest : public ApplicationTest {
   protected:
    void SetUp() override {
        // Run ApplicationTest::SetUp first
        ApplicationTest::SetUp();
    }

    void CreateSolver() {
        // Create an application object
        m_application = std::make_shared<aperi::Application>(m_comm);

        // Create the solver
        m_solver = m_application->CreateSolver(m_yaml_data);
    }

    double RunSolver() {
        // Create solver
        CreateSolver();

        // Run solver
        aperi::CoutP0() << " - Starting Solver" << std::endl;
        auto start_solver = std::chrono::high_resolution_clock::now();
        double time = m_solver->Solve();
        auto end_solver = std::chrono::high_resolution_clock::now();
        aperi::CoutP0() << "   Finished Solver. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_solver - start_solver).count() << " ms" << std::endl;

        // Finalize the IO mesh
        MPI_Barrier(m_comm);
        m_io_mesh->Finalize();

        return time;
    }

    void ResetSolverTest(bool keep_mesh = false, std::string append_to_filename = "") {
        ResetApplicationTest(keep_mesh, append_to_filename);
        // m_io_input_file.reset();
        // m_io_mesh.reset();
        // m_internal_force_contributions.clear();
        // m_external_force_contributions.clear();
        // m_boundary_conditions.clear();
        m_application.reset();
        m_solver.reset();
    }

    void TearDown() override {
        MPI_Barrier(m_comm);
        // m_io_mesh->Finalize();

        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

   protected:
    std::shared_ptr<aperi::Application> m_application;
    std::shared_ptr<aperi::Solver> m_solver;
    // std::shared_ptr<aperi::IoInputFile> m_io_input_file;
    // std::shared_ptr<aperi::IoMesh> m_io_mesh;
    // std::vector<std::shared_ptr<aperi::InternalForceContribution>> m_internal_force_contributions;
    // std::vector<std::shared_ptr<aperi::ExternalForceContribution>> m_external_force_contributions;
    // std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;
};
