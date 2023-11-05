#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "Application.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "UnitTestUtils.h"
#include "mpi.h"
#include "stk_util/parallel/Parallel.hpp"

#include "CaptureOutputTestFixture.h"

// Fixture for Application tests
class ApplicationTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();
        m_comm = MPI_COMM_WORLD;

        // Test file names
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_filename = test_suite_name + "_" + test_name + ".yaml";
        m_mesh_filename = test_suite_name + "_" + test_name + ".exo";
        m_results_filename = test_suite_name + "_" + test_name + "_results.exo";

        // Create a temporary input file
        m_yaml_data = CreateTestYaml();
        m_yaml_data["mesh"]["file"] = m_mesh_filename;
        m_yaml_data["output"]["file"] = m_results_filename;
        acm::IoInputFile::Write(m_filename, m_yaml_data);

        // Write the mesh to a temporary file and check that it is written correctly
        acm::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.compose_output = true;
        acm::IoMesh io_mesh(m_comm, io_mesh_parameters);

        // Get number of mpi processes
        m_num_procs = stk::parallel_machine_size(m_comm);

        // Make a 1x1xnum_procs mesh
        std::string mesh_string = "1x1x" + std::to_string(m_num_procs);
        WriteTestMesh(m_mesh_filename, io_mesh, mesh_string);
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
    stk::ParallelMachine m_comm;
    size_t m_num_procs;
};