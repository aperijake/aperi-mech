#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

#include "IoInputFile.h"
#include "IoUtils.h"
#include "UnitTestUtils.h"

// Fixture for testing the IoInputFile class
class IoInputFileTest : public ::testing::Test {
   protected:
    void SetUp() override {
        // Create a temporary input file
        m_yaml_data = CreateTestYaml();
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_filename = test_suite_name + "_" + test_name + ".yaml";
    }

    IoInputFile GetIoInputFile(bool check_input = true) {
        // Create a temporary input file
        IoInputFile::Write(m_filename, m_yaml_data);
        EXPECT_TRUE(std::filesystem::exists(m_filename));

        // Read the input file
        IoInputFile io_input_file(m_filename, check_input);
        return io_input_file;
    }

    void TearDown() override {
        // Delete the temporary input file
        std::remove(m_filename.c_str());
    }

    YAML::Node m_yaml_data;
    std::string m_filename;
};

// Test that the IoInputFile class can check input files correctly
TEST_F(IoInputFileTest, CheckInputValid) {
    IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 0);
}

// Create an input file with missing mesh node
TEST_F(IoInputFileTest, CheckInputMissingMeshNode) {
    m_yaml_data.remove("mesh");
    IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing mesh file
TEST_F(IoInputFileTest, CheckInputMissingMeshFile) {
    m_yaml_data["mesh"].remove("file");
    IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing output node
TEST_F(IoInputFileTest, CheckInputMissingOutputNode) {
    m_yaml_data.remove("output");
    IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing output file
TEST_F(IoInputFileTest, CheckInputMissingOutputFile) {
    m_yaml_data["output"].remove("file");
    IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing initial conditions type
TEST_F(IoInputFileTest, CheckInputMissingInitialConditionsType) {
    m_yaml_data["initial_conditions"][0].remove("type");
    IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Test that the IoInputFile class can read input files correctly
TEST_F(IoInputFileTest, Read) {
    IoInputFile io_input_file = GetIoInputFile();

    // Check that the data read from the file matches the expected data
    EXPECT_EQ(io_input_file.GetMeshFile(), "one_element.exo");
    EXPECT_EQ(io_input_file.GetOutputFile(), "one_element_out.exo");
    EXPECT_EQ(io_input_file.GetInitialConditions().size(), 1);
}