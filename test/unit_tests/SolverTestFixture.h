#pragma once
#include <gtest/gtest.h>

#include <chrono>
#include <memory>
#include <string>

#include "Application.h"
#include "ApplicationTestFixture.h"
#include "Solvers/Base.h"
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
        double average_compute_time_per_step = m_application->Run(m_solver);

        return average_compute_time_per_step;
    }

    void ResetSolverTest(bool keep_mesh = false, std::string append_to_filename = "") {
        m_application.reset();
        m_solver.reset();
        ResetApplicationTest(keep_mesh, append_to_filename);
    }

    void TearDown() override {
        MPI_Barrier(m_comm);

        // Run ApplicationTest::TearDown last
        m_application.reset();
        m_solver.reset();
        ApplicationTest::TearDown();
    }

   protected:
    std::shared_ptr<aperi::Application> m_application;
    std::shared_ptr<aperi::Solver> m_solver;
};
