#include <gtest/gtest.h>

#include <filesystem>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_topology/topology.hpp>
#include <string>
#include <system_error>

#include "IoMesh.h"
#include "UnitTestUtils.h"

#include "CaptureOutputTestFixture.h"

// IoMeshTest fixture
class IoMeshTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();
    }

    void TearDown() override {
        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }
};

// Test that the IoMesh class can read and write mesh files correctly
TEST_F(IoMeshTest, ReadWrite) {
    // Create an IoMesh object with default parameters
    stk::ParallelMachine comm = MPI_COMM_WORLD;
    acm::IoMeshParameters io_mesh_parameters;
    io_mesh_parameters.mesh_type = "generated";
    io_mesh_parameters.compose_output = true;
    acm::IoMesh io_mesh(comm, io_mesh_parameters);

    // Write the mesh to a temporary file and check that it is written correctly
    std::string output_f_name = "test_IoMesh_ReadWrite.exo";

    // Get number of mpi processes
    size_t num_procs = stk::parallel_machine_size(comm);

    // Make a 1x1xnum_procs mesh
    std::string mesh_string = "1x1x" + std::to_string(num_procs);
    WriteTestMesh(output_f_name, io_mesh, mesh_string);

    // Read in the written mesh and check that it matches the expected mesh
    acm::IoMeshParameters io_mesh_read_parameters;
    acm::IoMesh io_mesh_read(comm, io_mesh_read_parameters);
    std::vector<size_t> expected_owned = {4 * (num_procs + 1), 0, 0, num_procs};
    io_mesh_read.ReadMesh(output_f_name);
    CheckMeshCounts(io_mesh_read.GetBulkData(), expected_owned);

    // Clean up the temporary file
    CleanUp(output_f_name);
}
