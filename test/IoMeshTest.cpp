#include <gtest/gtest.h>

#include <filesystem>
#include <stk_mesh/base/bulkdata.hpp>
#include <stk_topology/topology.hpp>
#include <string>
#include <system_error>

#include "UnitTestUtils.h"
#include "iomesh.h"

// Test that the IoMesh class can read and write mesh files correctly
// This is also tested in test/IoUtilsTest.cpp, but this test is more direct
TEST(IoMesh, ReadWrite) {
    // Create an IoMesh object with default parameters
    stk::ParallelMachine comm = MPI_COMM_WORLD;
    IoMeshParameters io_mesh_parameters;
    IoMesh io_mesh(comm, io_mesh_parameters);

    // Write the mesh to a temporary file and check that it is written correctly
    std::string output_f_name = "test_IoMesh_ReadWrite.exo";
    WriteTestMesh(output_f_name, io_mesh);

    // Read in the written mesh and check that it matches the expected mesh
    IoMesh io_mesh_read(comm, io_mesh_parameters);
    std::vector<size_t> expected_owned = {8, 0, 0, 1};
    int interpolation_intervals = 0;
    io_mesh_read.ReadMesh("exodusii", output_f_name, interpolation_intervals);
    CheckMeshCounts(io_mesh_read.GetBulkData(), expected_owned);

    // Clean up the temporary file
    CleanUp(output_f_name);
}