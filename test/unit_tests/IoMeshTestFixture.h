#pragma once
#include <gtest/gtest.h>
#include <mpi.h>

#include <string>

#include "CaptureOutputTestFixture.h"
#include "IoMesh.h"
#include "UnitTestUtils.h"

class IoMeshTestFixture : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();
        // Create an IoMesh object with default parameters
        m_comm = MPI_COMM_WORLD;

        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_mesh_filename = test_suite_name + "_" + test_name + ".exo";

        // Get number of mpi processes
        MPI_Comm_size(m_comm, &m_num_procs);
    }

    void CreateIoMeshGenerated() {
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.compose_output = true;
        m_io_mesh = std::make_shared<aperi::IoMesh>(m_comm, io_mesh_parameters);
    }

    void CreateIoMeshFile() {
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.compose_output = true;
        m_io_mesh = std::make_shared<aperi::IoMesh>(m_comm, io_mesh_parameters);
    }

    void TearDown() override {
        // Clean up the temporary file
        CleanUp(m_mesh_filename);

        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }

    MPI_Comm m_comm;
    int m_num_procs;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    std::string m_mesh_filename;
};