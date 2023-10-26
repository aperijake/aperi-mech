#include "IoUtils.h"
#include "UnitTestUtils.h"
#include "gtest/gtest.h"

// Test that the input file is read correctly
TEST(IoUtils, ReadInputFile) {
    // Create a temporary input file
    std::string filename = "test_ReadInputFile.yaml";
    WriteTestFile(filename);

    // Read the input file
    IoInputFile io_input_file = ReadInputFile(filename);

    // Check that the data read from the file matches the expected data
    EXPECT_EQ(io_input_file.GetMeshFile(), "one_element.exo");
    EXPECT_EQ(io_input_file.GetOutputFile(), "one_element_out.exo");

    // Delete the temporary input file
    std::remove(filename.c_str());
}

// Test that the mesh file is read correctly
TEST(IoUtils, ReadMesh) {
    // Create a temporary mesh file
    stk::ParallelMachine comm = MPI_COMM_WORLD;
    IoMeshParameters io_mesh_parameters;  // Default parameters
    IoMesh io_mesh(comm, io_mesh_parameters);
    std::string output_f_name = "test_ReadMesh.exo";
    WriteTestMesh(output_f_name, io_mesh);

    // Read in the written mesh and check
    IoMesh io_mesh_read = ReadMesh(comm, output_f_name);
    std::vector<size_t> expected_owned = {8, 0, 0, 1};
    CheckMeshCounts(io_mesh_read.GetBulkData(), expected_owned);

    // Delete the temporary file
    CleanUp(output_f_name);
}

// Test that the results file is written correctly
TEST(IoUtils, WriteResults) {
    // Create a temporary mesh file
    stk::ParallelMachine comm = MPI_COMM_WORLD;
    IoMeshParameters io_mesh_parameters;  // Default parameters
    IoMesh io_mesh(comm, io_mesh_parameters);
    std::string output_f_name = "test_WriteResults.exo";
    WriteTestMesh(output_f_name, io_mesh);

    // Write the results to a temporary file
    std::string output_f_name2 = "test_WriteResults2.exo";
    CleanUp(output_f_name2);  // Make sure output doesn't already exist to prevent false positives
    WriteResults(io_mesh, output_f_name2);

    // Read in the written mesh and check
    IoMesh io_mesh_read = ReadMesh(comm, output_f_name2);
    std::vector<size_t> expected_owned = {8, 0, 0, 1};
    CheckMeshCounts(io_mesh_read.GetBulkData(), expected_owned);

    // Clean up the temporary files
    CleanUp(output_f_name);
    CleanUp(output_f_name2);
}