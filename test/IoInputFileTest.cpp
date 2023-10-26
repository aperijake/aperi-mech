#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

#include "IoInputFile.h"
#include "IoUtils.h"
#include "UnitTestUtils.h"

// Test that the IoInputFile class can read input files correctly
TEST(IoInputFile, Read) {
    // Create a temporary input file
    std::string filename = "test_IoInputFileRead.yaml";
    WriteTestFile(filename);

    // Check that the input file exists
    EXPECT_TRUE(std::filesystem::exists(filename));

    // Read the input file
    IoInputFile io_input_file(filename);

    // Check that the data read from the file matches the expected data
    EXPECT_EQ(io_input_file.GetMeshFile(), "one_element.exo");
    EXPECT_EQ(io_input_file.GetOutputFile(), "one_element_out.exo");

    // Delete the temporary input file
    std::remove(filename.c_str());
}