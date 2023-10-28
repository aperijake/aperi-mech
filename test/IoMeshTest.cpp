#include <gtest/gtest.h>

#include <filesystem>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_topology/topology.hpp>
#include <string>
#include <system_error>

#include "UnitTestUtils.h"
#include "iomesh.h"

// Test that the IoMesh class can read and write mesh files correctly
TEST(IoMesh, ReadWrite) {
    // Create an IoMesh object with default parameters
    stk::ParallelMachine comm = MPI_COMM_WORLD;
    IoMeshParameters io_mesh_parameters;
    io_mesh_parameters.mesh_type = "generated";
    IoMesh io_mesh(comm, io_mesh_parameters);

    // Write the mesh to a temporary file and check that it is written correctly
    std::string output_f_name = "test_IoMesh_ReadWrite.exo";
    WriteTestMesh(output_f_name, io_mesh);

    // Read in the written mesh and check that it matches the expected mesh
    IoMeshParameters io_mesh_read_parameters;
    IoMesh io_mesh_read(comm, io_mesh_read_parameters);
    std::vector<size_t> expected_owned = {8, 0, 0, 1};
    io_mesh_read.ReadMesh(output_f_name);
    CheckMeshCounts(io_mesh_read.GetBulkData(), expected_owned);

    // Clean up the temporary file
    CleanUp(output_f_name);
}