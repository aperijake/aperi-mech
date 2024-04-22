#include <gtest/gtest.h>
#include <mpi.h>
#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

#include "CaptureOutputTestFixture.h"
#include "IoInputFile.h"
#include "UnitTestUtils.h"

// Fixture for testing the aperi::IoInputFile class
class IoInputFileTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();

        MPI_Comm_rank(MPI_COMM_WORLD, &m_rank);
        // Create a temporary input file
        m_yaml_data = CreateTestYaml();
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_filename = test_suite_name + "_" + test_name + ".yaml";
    }

    aperi::IoInputFile GetIoInputFile(bool check_input = true) {
        // Create a temporary input file, only rank 0 writes the file
        if (m_rank == 0) aperi::IoInputFile::Write(m_filename, m_yaml_data);
        MPI_Barrier(MPI_COMM_WORLD);  // Make sure it's written before reading on other ranks

        EXPECT_TRUE(std::filesystem::exists(m_filename));

        // Read the input file
        aperi::IoInputFile io_input_file(m_filename, check_input);
        return io_input_file;
    }

    void TearDown() override {
        // Delete the temporary input file
        MPI_Barrier(MPI_COMM_WORLD);  // Make sure all processes have completed before deleting
        if (m_rank == 0) std::remove(m_filename.c_str());

        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }

    int m_rank;
    YAML::Node m_yaml_data;
    std::string m_filename;
};

// Test that the IoInputFile class can check input files correctly
TEST_F(IoInputFileTest, CheckInputValid) {
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 0);  // Verbose for coverage
}

// -------- Procedures Level --------
// Create an input file with missing mesh
TEST_F(IoInputFileTest, CheckInputMissingMeshNode) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"].remove("mesh");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with missing geometry
TEST_F(IoInputFileTest, CheckInputMissingGeometryNode) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("geometry");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with missing output node
TEST_F(IoInputFileTest, CheckInputMissingOutputNode) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("output");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with missing output file
TEST_F(IoInputFileTest, CheckInputMissingOutputFile) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["output"].remove("file");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// -------- Initial Conditions --------
// Create an input file without a vector or component specified for the initial conditions
TEST_F(IoInputFileTest, CheckInputMissingInitialConditionsVectorAndComponent) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"].remove("vector");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with both a vector and component specified for the initial conditions
TEST_F(IoInputFileTest, CheckInputInitialConditionsVectorAndComponents) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["components"]["X"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with missing initial conditions direction
TEST_F(IoInputFileTest, CheckInputMissingInitialConditionsDirection) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"].remove("direction");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with missing initial conditions magnitude
TEST_F(IoInputFileTest, CheckInputMissingInitialConditionsMagnitude) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"].remove("magnitude");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with bad initial conditions direction, too few items
TEST_F(IoInputFileTest, CheckInputShortInitialConditionsDirection) {
    // TODO(jake): This test is disabled because the schema does not catch this error. Fix this.
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"] = YAML::Load("[1, 2]");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with bad initial conditions direction, wrong data type
TEST_F(IoInputFileTest, CheckInputBadInitialConditionsDirection) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"] = YAML::Load("[a,b,c]");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with bad initial conditions direction, all zero
TEST_F(IoInputFileTest, CheckInputZeroInitialConditionsDirection) {
    // TODO(jake): This test is disabled because the schema does not catch this error. Fix this.
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"] = YAML::Load("[0,0,0]");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with components specified for the initial conditions
TEST_F(IoInputFileTest, CheckInputInitialConditionsComponent) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"].remove("vector");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["components"]["X"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 0);
}

// Create an input file with missing initial conditions sets
TEST_F(IoInputFileTest, CheckInputMissingInitialConditionsSet) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"].remove("sets");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with bad components specified for the initial conditions
TEST_F(IoInputFileTest, CheckInputBadInitialConditionsComponent) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["components"]["W"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with bad components specified for the initial conditions, lower case component
TEST_F(IoInputFileTest, CheckInputBadInitialConditionsComponentLower) {
    // TODO(jake): Probably want to make this input case insensitive eventually. So this test would fail and need to be fixed.
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["components"]["x"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// -------- Boundary Conditions --------
// Test adding boundary conditions to the input file
TEST_F(IoInputFileTest, AddDisplacementBoundaryConditions) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 0);
}

// Create an input file with missing boundary condition vector and components
TEST_F(IoInputFileTest, CheckInputMissingBoundaryConditionVectorAndComponent) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"].remove("vector");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with both a vector and component specified for the boundary conditions
TEST_F(IoInputFileTest, CheckInputBoundaryConditionVectorAndComponents) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["components"]["X"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with components specified for the boundary conditions
TEST_F(IoInputFileTest, CheckInputBoundaryConditionComponent) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"].remove("vector");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["components"]["X"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 0);
}

// Create an input file with missing boundary condition direction
TEST_F(IoInputFileTest, CheckInputMissingBoundaryConditionDirection) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"].remove("direction");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with missing boundary condition magnitude
TEST_F(IoInputFileTest, CheckInputMissingBoundaryConditionMagnitude) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"].remove("magnitude");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with bad boundary condition components
TEST_F(IoInputFileTest, CheckInputBadBoundaryConditionComponent) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["components"]["W"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with missing boundary condition sets
TEST_F(IoInputFileTest, CheckInputMissingBoundaryConditionSet) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"].remove("sets");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// Create an input file with missing boundary condition time function
TEST_F(IoInputFileTest, CheckInputMissingBoundaryConditionTimeFunction) {
    AddDisplacementBoundaryConditions(m_yaml_data);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"].remove("time_function");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
}

// -------- Parts --------
// Create an input file with missing parts material
TEST_F(IoInputFileTest, CheckInputMissingPartsMaterial) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"].remove("material");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with missing parts set
TEST_F(IoInputFileTest, CheckInputMissingPartsSet) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"].remove("set");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// -------- Loads --------
// Create an input file with missing loads set
TEST_F(IoInputFileTest, CheckInputMissingLoadsSet) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"].remove("sets");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with missing vector and component for the loads
TEST_F(IoInputFileTest, CheckInputMissingLoadsVectorAndComponent) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"].remove("vector");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with both a vector and component specified for the loads
TEST_F(IoInputFileTest, CheckInputLoadsVectorAndComponents) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"]["components"]["X"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with components specified for the loads
TEST_F(IoInputFileTest, CheckInputLoadsComponent) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"].remove("vector");
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"]["components"]["X"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 0);
}

// Create an input file with missing loads magnitude
TEST_F(IoInputFileTest, CheckInputMissingLoadsMagnitude) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"]["vector"].remove("magnitude");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with missing loads direction
TEST_F(IoInputFileTest, CheckInputMissingLoadsDirection) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"]["vector"].remove("direction");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with bad components specified for the loads
TEST_F(IoInputFileTest, CheckInputBadLoadsComponent) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["loads"][0]["gravity_load"]["components"]["W"] = 1.0;
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// -------- Time Stepper --------
// Create an input file with missing time stepper
TEST_F(IoInputFileTest, CheckInputMissingTimeStepper) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("time_stepper");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with direct time stepper and missing time increment
TEST_F(IoInputFileTest, CheckInputMissingTimeIncrementDirect) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["direct_time_stepper"].remove("time_increment");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// Create an input file with direct time stepper and missing time end
TEST_F(IoInputFileTest, CheckInputMissingTimeEndDirect) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["direct_time_stepper"].remove("time_end");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(true), 1);
}

// -------- Basic Checks --------
// Create an input file with a sequence where a scalar is expected
TEST_F(IoInputFileTest, CheckInputScalarSequence) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"] = YAML::Load("[1, 2, 3]");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
    MPI_Barrier(MPI_COMM_WORLD);  // Make sure all processes have done the check before modifying the file

    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"] = YAML::Load("1");
    io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 0);
}

// Create an input file with a scalar where a sequence is expected
TEST_F(IoInputFileTest, CheckInputSequenceScalar) {
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"] = YAML::Load("1");
    aperi::IoInputFile io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 1);
    MPI_Barrier(MPI_COMM_WORLD);  // Make sure all processes have done the check before modifying the file

    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"] = YAML::Load("[1, 2, 3]");
    io_input_file = GetIoInputFile(false);

    // Check input file
    EXPECT_EQ(io_input_file.CheckInputWithSchema(), 0);
}

// -------- IO --------
// Test that the IoInputFile class can read input files correctly
TEST_F(IoInputFileTest, Read) {
    aperi::IoInputFile io_input_file = GetIoInputFile();

    // Check that the data read from the file matches the expected data
    EXPECT_EQ(io_input_file.GetMeshFile(0), "one_element.exo");
    EXPECT_EQ(io_input_file.GetOutputFile(0), "one_element_out.exo");
    EXPECT_EQ(io_input_file.GetInitialConditions(0).size(), 1u);
    const YAML::Node procedure_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"];
    EXPECT_EQ(aperi::GetValueSequence<YAML::Node>(procedure_node, "initial_conditions", false).first.size(), 1u);  // another way to get initial conditions
    EXPECT_EQ(io_input_file.GetParts(0).size(), 1u);
    const YAML::Node geometry_node = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"];
    EXPECT_EQ(aperi::GetValueSequence<YAML::Node>(geometry_node, "parts", false).first.size(), 1u);  // another way to get parts conditions
}

// Test that reading a missing input file throws an exception
TEST_F(IoInputFileTest, ReadMissingFile) {
    std::string filename = "missing_file.yaml";  // Missing file

    // Check that reading a missing input file throws an exception
    EXPECT_THROW(aperi::IoInputFile io_input_file(filename), std::runtime_error);
}

// Test that IoInputFile::Write throws when the file cannot be opened for writing
TEST_F(IoInputFileTest, WriteErrorCases) {
    std::string m_filename = "nonexistent_directory/test.yaml";
    aperi::IoInputFile io_input_file = GetIoInputFile();
    int result = aperi::IoInputFile::Write(m_filename, m_yaml_data);
    EXPECT_EQ(result, 1);
}