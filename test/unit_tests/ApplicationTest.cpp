#include <gtest/gtest.h>

#include <memory>
#include <string>

#include "Application.h"
#include "ApplicationTestFixture.h"
#include "UnitTestUtils.h"

void RunValidInputFile(const std::string &filename, const std::string &results_filename, MPI_Comm comm, int num_procs) {
    // Create application object
    aperi::Application app(comm);

    // Run application
    app.CreateSolverAndRun(filename);

    // Read in the written mesh and check that it matches the expected mesh
    aperi::IoMeshParameters io_mesh_read_parameters;
    aperi::IoMesh io_mesh_read(comm, io_mesh_read_parameters);
    std::vector<size_t> expected_owned = {4U * static_cast<size_t>(num_procs + 1), 0U, 0U, static_cast<size_t>(num_procs * 6)};  // tet4
    io_mesh_read.ReadMesh(results_filename, {"block_1"});
    io_mesh_read.CompleteInitialization();
    CheckMeshCounts(*io_mesh_read.GetMeshData(), expected_owned);
}

// Test Run function with valid input file
TEST_F(ApplicationTest, RunValidInputFile) {
    m_yaml_data = CreateTestYaml();
    CreateInputFile();
    CreateTestMesh();
    RunValidInputFile(m_filename, m_results_filename, m_comm, m_num_procs);
}

// Test Run function with valid input file and mesh search directories
TEST_F(ApplicationTest, RunValidInputFileWithMeshSearchDirectories) {
    // Get the current working directory
    char cwd[1024];
    getcwd(cwd, sizeof(cwd));
    std::string current_working_directory(cwd);
    EXPECT_FALSE(current_working_directory.empty());

    // Get the last directory in the path
    std::string last_directory = current_working_directory.substr(current_working_directory.find_last_of("/\\") + 1);

    // Strip the last directory from the path
    std::string all_but_last_directory = current_working_directory.substr(0, current_working_directory.find_last_of("/\\"));

    // Create the yaml data
    m_yaml_data = CreateTestYaml();

    // Get the current mesh file, prepend the last directory to the mesh file, and replace the mesh file in the yaml data
    std::string mesh_file = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["mesh"].as<std::string>();
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["mesh"] = last_directory + "/" + mesh_file;

    // Add mesh search directories
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["mesh_search_directories"] = YAML::Node(YAML::NodeType::Sequence);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["mesh_search_directories"].push_back(all_but_last_directory);

    // Create the test mesh with the original mesh filename
    CreateTestMesh();

    // Change the mesh filename
    m_mesh_filename = last_directory + "/" + m_mesh_filename;

    // Create the input file with the new mesh filename
    CreateInputFile();
    RunValidInputFile(m_filename, m_results_filename, m_comm, m_num_procs);
}

// Test Run function with bad mesh search directories
TEST_F(ApplicationTest, RunWithBadMeshSearchDirectories) {
    // Get the current working directory
    char cwd[1024];
    getcwd(cwd, sizeof(cwd));
    std::string current_working_directory(cwd);
    EXPECT_FALSE(current_working_directory.empty());

    // Get the last directory in the path
    std::string last_directory = current_working_directory.substr(current_working_directory.find_last_of("/\\") + 1);

    // Strip the last directory from the path
    std::string all_but_last_directory = current_working_directory.substr(0, current_working_directory.find_last_of("/\\"));

    // Create the yaml data
    m_yaml_data = CreateTestYaml();

    // Add mesh search directories, leave mesh file as is so it will fail
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["mesh_search_directories"] = YAML::Node(YAML::NodeType::Sequence);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["mesh_search_directories"].push_back(all_but_last_directory);

    CreateInputFile();
    CreateTestMesh();

    // Create application object
    aperi::Application app(m_comm);

    // Run application
    EXPECT_THROW(app.CreateSolverAndRun(m_filename), std::runtime_error);
}

// Test Run function with invalid input file
TEST_F(ApplicationTest, RunInvalidInputFile) {
    // Create application object
    aperi::Application app(m_comm);

    // Run application
    std::string invalid_filename = "invalid_filename.yaml";
    EXPECT_THROW(app.CreateSolverAndRun(invalid_filename), std::runtime_error);
}
