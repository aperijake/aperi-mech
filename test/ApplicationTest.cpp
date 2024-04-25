#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "Application.h"
#include "ApplicationTestFixture.h"
#include "UnitTestUtils.h"

// Test Run function with valid input file
TEST_F(ApplicationTest, RunValidInputFile) {
    // Create application object
    aperi::Application app(m_comm);

    m_yaml_data = CreateTestYaml();
    CreateInputFile();
    CreateTestMesh();

    // Run application
    app.Run(m_filename);

    // Read in the written mesh and check that it matches the expected mesh
    aperi::IoMeshParameters io_mesh_read_parameters;
    aperi::IoMesh io_mesh_read(m_comm, io_mesh_read_parameters);
    std::vector<size_t> expected_owned = {4u * size_t(m_num_procs + 1), 0u, 0u, size_t(m_num_procs * 6)};  // tet4
    io_mesh_read.ReadMesh(m_results_filename, {"block_1"});
    CheckMeshCounts(*io_mesh_read.GetMeshData(), expected_owned);
}

// Test Run function with invalid input file
TEST_F(ApplicationTest, RunInvalidInputFile) {
    // Create application object
    aperi::Application app(m_comm);

    // Run application
    std::string invalid_filename = "invalid_filename.yaml";
    EXPECT_THROW(app.Run(invalid_filename), std::runtime_error);
}
