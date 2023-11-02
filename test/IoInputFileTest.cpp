#include <gtest/gtest.h>
#include <mpi.h>
#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

#include "IoInputFile.h"
#include "UnitTestUtils.h"

// Fixture for testing the acm::IoInputFile class
class IoInputFileTest : public ::testing::Test {
   protected:
    void SetUp() override {
        MPI_Comm_rank(MPI_COMM_WORLD, &m_rank);
        // Create a temporary input file
        m_yaml_data = CreateTestYaml();
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_filename = test_suite_name + "_" + test_name + ".yaml";
    }

    acm::IoInputFile GetIoInputFile(bool check_input = true) {
        // Create a temporary input file, only rank 0 writes the file
        if (m_rank == 0) acm::IoInputFile::Write(m_filename, m_yaml_data);
        MPI_Barrier(MPI_COMM_WORLD);  // Make sure it's written before reading on other ranks

        EXPECT_TRUE(std::filesystem::exists(m_filename));

        // Read the input file
        acm::IoInputFile io_input_file(m_filename, check_input);
        return io_input_file;
    }

    void TearDown() override {
        // Delete the temporary input file
        MPI_Barrier(MPI_COMM_WORLD);  // Make sure all processes have completed before deleting
        if (m_rank == 0) std::remove(m_filename.c_str());
    }

    int m_rank;
    YAML::Node m_yaml_data;
    std::string m_filename;
};

// Test that the IoInputFile class can check input files correctly
TEST_F(IoInputFileTest, CheckInputValid) {
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(true), 0);  // Verbose for coverage
}

// Create an input file with missing mesh node
TEST_F(IoInputFileTest, CheckInputMissingMeshNode) {
    m_yaml_data.remove("mesh");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing mesh file
TEST_F(IoInputFileTest, CheckInputMissingMeshFile) {
    m_yaml_data["mesh"].remove("file");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing output node
TEST_F(IoInputFileTest, CheckInputMissingOutputNode) {
    m_yaml_data.remove("output");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing output file
TEST_F(IoInputFileTest, CheckInputMissingOutputFile) {
    m_yaml_data["output"].remove("file");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing initial conditions type
TEST_F(IoInputFileTest, CheckInputMissingInitialConditionsType) {
    m_yaml_data["initial_conditions"][0].remove("type");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with missing initial conditions direction
TEST_F(IoInputFileTest, CheckInputMissingInitialConditionsDirection) {
    m_yaml_data["initial_conditions"][0].remove("direction");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with bad initial conditions type
TEST_F(IoInputFileTest, CheckInputBadInitialConditionsType) {
    m_yaml_data["initial_conditions"][0]["type"] = "bad_type";
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with bad initial conditions direction, too few items
TEST_F(IoInputFileTest, CheckInputShortInitialConditionsDirection) {
    m_yaml_data["initial_conditions"][0]["direction"] = YAML::Load("[0, 0]");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with bad initial conditions direction, wrong data type
TEST_F(IoInputFileTest, CheckInputBadInitialConditionsDirection) {
    m_yaml_data["initial_conditions"][0]["direction"] = YAML::Load("['a', 'b', 'c']");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with bad initial conditions direction, all zero
TEST_F(IoInputFileTest, CheckInputZeroInitialConditionsDirection) {
    m_yaml_data["initial_conditions"][0]["direction"] = YAML::Load("[0, 0, 0]");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
}

// Create an input file with a sequence where a scalar is expected
TEST_F(IoInputFileTest, CheckInputScalarSequence) {
    m_yaml_data["initial_conditions"][0]["magnitude"] = YAML::Load("[1, 2, 3]");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
    MPI_Barrier(MPI_COMM_WORLD);  // Make sure all processes have done the check before modifying the file

    m_yaml_data["initial_conditions"][0]["magnitude"] = YAML::Load("1");
    io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 0);
}

// Create an input file with a scalar where a sequence is expected
TEST_F(IoInputFileTest, CheckInputSequenceScalar) {
    m_yaml_data["initial_conditions"][0]["direction"] = YAML::Load("1");
    acm::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 1);
    MPI_Barrier(MPI_COMM_WORLD);  // Make sure all processes have done the check before modifying the file

    m_yaml_data["initial_conditions"][0]["direction"] = YAML::Load("[1, 2, 3]");
    io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInput(), 0);
}

// Test that the IoInputFile class can read input files correctly
TEST_F(IoInputFileTest, Read) {
    acm::IoInputFile io_input_file = GetIoInputFile();

    // Check that the data read from the file matches the expected data
    EXPECT_EQ(io_input_file.GetMeshFile(), "one_element.exo");
    EXPECT_EQ(io_input_file.GetOutputFile(), "one_element_out.exo");
    EXPECT_EQ(io_input_file.GetInitialConditions().size(), 1);
    EXPECT_EQ(acm::GetValueSequence<YAML::Node>(m_yaml_data, "initial_conditions", false).first.size(), 1);  // another way to get initial conditions
    EXPECT_EQ(io_input_file.GetParts().size(), 1);
    EXPECT_EQ(acm::GetValueSequence<YAML::Node>(m_yaml_data, "parts", false).first.size(), 1);  // another way to get parts conditions
}

// Test that reading a missing input file throws an exception
TEST_F(IoInputFileTest, ReadMissingFile) {
    std::string filename = "missing_file.yaml";  // Missing file

    // Check that reading a missing input file throws an exception
    EXPECT_THROW(acm::IoInputFile io_input_file(filename), std::runtime_error);
}

// Test that IoInputFile::Write throws when the file cannot be opened for writing
TEST_F(IoInputFileTest, WriteErrorCases) {
    std::string m_filename = "nonexistent_directory/test.yaml";
    acm::IoInputFile io_input_file = GetIoInputFile();
    int result = acm::IoInputFile::Write(m_filename, m_yaml_data);
    EXPECT_EQ(result, 1);
}
