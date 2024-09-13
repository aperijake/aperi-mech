#include <gtest/gtest.h>

#include <string>
#include <system_error>

#include "IoMesh.h"
#include "IoMeshTestFixture.h"
#include "UnitTestUtils.h"

// Test that the IoMesh class can read and write mesh files correctly
TEST_F(IoMeshTestFixture, ReadWrite) {
    CreateIoMeshGenerated();
    // Make a 1x1xnum_procs mesh
    std::string mesh_string = "1x1x" + std::to_string(m_num_procs);
    WriteTestMesh(m_mesh_filename, *m_io_mesh, mesh_string);

    // Read in the written mesh and check that it matches the expected mesh
    aperi::IoMeshParameters io_mesh_read_parameters;
    aperi::IoMesh io_mesh_read(m_comm, io_mesh_read_parameters);
    std::vector<size_t> expected_owned = {4U * static_cast<size_t>(m_num_procs + 1), 0U, 0U, static_cast<size_t>(m_num_procs)};
    io_mesh_read.ReadMesh(m_mesh_filename, {"block_1"});
    io_mesh_read.CompleteInitialization();
    CheckMeshCounts(*io_mesh_read.GetMeshData(), expected_owned);
}

// Test that the IoMesh reading a mesh with bad parts throws an error
TEST_F(IoMeshTestFixture, ReadBadParts) {
    CreateIoMeshGenerated();
    // Make a 1x1xnum_procs mesh
    std::string mesh_string = "1x1x" + std::to_string(m_num_procs);
    WriteTestMesh(m_mesh_filename, *m_io_mesh, mesh_string);

    // Read in the written mesh and check that it matches the expected mesh
    aperi::IoMeshParameters io_mesh_read_parameters;
    aperi::IoMesh io_mesh_read(m_comm, io_mesh_read_parameters);
    EXPECT_THROW(io_mesh_read.ReadMesh(m_mesh_filename, {"block_2"}), std::runtime_error);
}
