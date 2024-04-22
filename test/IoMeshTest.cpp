#include <gtest/gtest.h>

#include <filesystem>
#include <string>
#include <system_error>

#include "CaptureOutputTestFixture.h"
#include "IoMesh.h"
#include "UnitTestUtils.h"

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
    MPI_Comm comm = MPI_COMM_WORLD;
    aperi::IoMeshParameters io_mesh_parameters;
    io_mesh_parameters.mesh_type = "generated";
    io_mesh_parameters.compose_output = true;
    aperi::IoMesh io_mesh(comm, io_mesh_parameters);

    // Write the mesh to a temporary file and check that it is written correctly
    std::string output_f_name = "test_IoMesh_ReadWrite.exo";

    // Get number of mpi processes
    int num_procs;
    MPI_Comm_size(comm, &num_procs);

    // Make a 1x1xnum_procs mesh
    std::string mesh_string = "1x1x" + std::to_string(num_procs);
    WriteTestMesh(output_f_name, io_mesh, mesh_string);

    // Read in the written mesh and check that it matches the expected mesh
    aperi::IoMeshParameters io_mesh_read_parameters;
    aperi::IoMesh io_mesh_read(comm, io_mesh_read_parameters);
    std::vector<size_t> expected_owned = {4u * size_t(num_procs + 1), 0u, 0u, size_t(num_procs)};
    io_mesh_read.ReadMesh(output_f_name, {"block_1"});
    CheckMeshCounts(*io_mesh_read.GetMeshData(), expected_owned);

    // Clean up the temporary file
    CleanUp(output_f_name);
}

// Test that the IoMesh reading a mesh with bad parts throws an error
TEST_F(IoMeshTest, ReadBadParts) {
    // Create an IoMesh object with default parameters
    MPI_Comm comm = MPI_COMM_WORLD;
    aperi::IoMeshParameters io_mesh_parameters;
    io_mesh_parameters.mesh_type = "generated";
    io_mesh_parameters.compose_output = true;
    aperi::IoMesh io_mesh(comm, io_mesh_parameters);

    // Write the mesh to a temporary file and check that it is written correctly
    std::string output_f_name = "test_IoMesh_ReadBadParts.exo";

    // Get number of mpi processes
    int num_procs;
    MPI_Comm_size(comm, &num_procs);

    // Make a 1x1xnum_procs mesh
    std::string mesh_string = "1x1x" + std::to_string(num_procs);
    WriteTestMesh(output_f_name, io_mesh, mesh_string);

    // Read in the written mesh and check that it matches the expected mesh
    aperi::IoMeshParameters io_mesh_read_parameters;
    aperi::IoMesh io_mesh_read(comm, io_mesh_read_parameters);
    EXPECT_THROW(io_mesh_read.ReadMesh(output_f_name, {"block_2"}), std::runtime_error);

    // Clean up the temporary file
    CleanUp(output_f_name);
}
