#include <gtest/gtest.h>

#include <filesystem>
#include <memory>
#include <string>

#include "Application.h"
#include "ApplicationTestFixture.h"
#include "UnitTestUtils.h"

void RunValidInputFile(const std::string &filename, const std::string &results_filename, MPI_Comm comm, int num_procs) {
    // Create application object
    aperi::Application app(comm);

    // Run application
    bool add_faces = true;
    app.CreateSolverAndRun(filename, add_faces);

    // Read in the written mesh and check that it matches the expected mesh
    aperi::IoMeshParameters io_mesh_read_parameters;
    io_mesh_read_parameters.add_faces = add_faces;
    aperi::IoMesh io_mesh_read(comm, io_mesh_read_parameters);
    size_t expected_num_nodes = 4U * static_cast<size_t>(num_procs + 1);
    size_t expected_num_faces = 16U * static_cast<size_t>(num_procs) + 2U;  // tet4 faces
    auto expected_num_elements = static_cast<size_t>(num_procs * 6);        // tet4 elements
    std::vector<size_t> expected = {expected_num_nodes, 0U, expected_num_faces, expected_num_elements};
    io_mesh_read.ReadMesh(results_filename, {"block_1"});
    io_mesh_read.CompleteInitialization();
    CheckMeshCounts(*io_mesh_read.GetMeshData(), expected);
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
    std::filesystem::path current_path = std::filesystem::current_path();
    std::string current_working_directory = current_path.string();
    EXPECT_FALSE(current_working_directory.empty());

    // Get the last directory in the path
    std::string last_directory = current_path.filename().string();

    // Strip the last directory from the path
    std::filesystem::path parent_path = current_path.parent_path();
    std::string all_but_last_directory = parent_path.string();

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
    std::filesystem::path current_path = std::filesystem::current_path();
    std::string current_working_directory = current_path.string();
    EXPECT_FALSE(current_working_directory.empty());

    // Get the last directory in the path
    std::string last_directory = current_path.filename().string();

    // Strip the last directory from the path
    std::filesystem::path parent_path = current_path.parent_path();
    std::string all_but_last_directory = parent_path.string();

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
