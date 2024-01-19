#pragma once
#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "CaptureOutputTestFixture.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "UnitTestUtils.h"
#include "mpi.h"
#include "stk_util/parallel/Parallel.hpp"

// Fixture for Application tests
class ApplicationTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();
        m_comm = MPI_COMM_WORLD;

        // Get number of mpi processes
        m_num_procs = stk::parallel_machine_size(m_comm);

        // Test file names
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_filename = test_suite_name + "_" + test_name + ".yaml";
        m_mesh_filename = test_suite_name + "_" + test_name + ".exo";
        m_results_filename = test_suite_name + "_" + test_name + "_results.exo";

        // No sidesets by default
        m_mesh_sidesets = "";

        // Set to 1 block by default
        m_num_blocks = 1;
    }

    // Write the test mesh to a file
    void CreateTestMesh(const std::shared_ptr<aperi::FieldManager>& field_manager = nullptr) {
        // Write the mesh to a temporary file and check that it is written correctly
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.compose_output = true;
        m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

        // Make a 1x1x(num_procs*num_blocks) mesh
        std::string mesh_string = "1x1x" + std::to_string(m_num_procs * m_num_blocks) + m_mesh_sidesets + "|tets";
        WriteTestMesh(m_mesh_filename, *m_io_mesh, mesh_string, field_manager);
    }

    void CreateInputFile() {
        // Create a temporary input file
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["mesh"] = m_mesh_filename;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["output"]["file"] = m_results_filename;
        aperi::IoInputFile::Write(m_filename, m_yaml_data);
    }

    void TearDown() override {
        // Delete the temporary input file
        CleanUp(m_filename);

        // Delete the temporary mesh file
        CleanUp(m_mesh_filename);

        // Delete the temporary results file
        CleanUp(m_results_filename);

        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }

    YAML::Node m_yaml_data;
    std::string m_filename;
    std::string m_mesh_filename;
    std::string m_results_filename;
    std::string m_mesh_sidesets;
    stk::ParallelMachine m_comm;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    size_t m_num_procs;
    size_t m_num_blocks;
};