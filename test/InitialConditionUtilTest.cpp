#include <gtest/gtest.h>

#include <vector>

#include "ApplicationTestFixture.h"
#include "FieldManager.h"
#include "InitialConditionUtil.h"
#include "MathUtils.h"
#include "yaml-cpp/yaml.h"

// Fixture for InitialConditionUtil tests
class InitialConditionUtilTest : public ApplicationTest {
   protected:
    void SetUp() override {
        // Run ApplicationTest::SetUp first
        ApplicationTest::SetUp();

        // Initialize field data
        m_field_data.push_back({"velocity", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"displacement", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"acceleration", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});

        // Create field manager
        m_field_manager = CreateFieldManager(m_field_data);
    }

    void TearDown() override {
        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

    // Add initial conditions to field data
    void AddTestInitialConditions() {
        // Create a temporary mesh file
        CreateTestMesh(m_field_manager);

        // Create an IO input file object and read the input file
        m_io_input_file = aperi::CreateIoInputFile(m_yaml_data);

        // Set initial conditions
        std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(0);
        AddInitialConditions(initial_conditions, m_field_manager, m_io_mesh->GetMetaData());

        m_io_mesh->GetBulkData().update_field_data_states();
    }

    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;
    std::shared_ptr<aperi::FieldManager> m_field_manager;
};

// Test AddInitialConditions function with valid input
TEST_F(InitialConditionUtilTest, AddInitialConditionsValidInput) {
    // Create input file
    m_yaml_data = CreateTestYaml();
    CreateInputFile();

    // Add initial conditions to field data
    AddTestInitialConditions();

    // Get the initial condition values
    double magnitude = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> expected_values = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
    aperi::ChangeLength(expected_values, magnitude);
    EXPECT_GT(expected_values[0] * expected_values[0] + expected_values[1] * expected_values[1] + expected_values[2] * expected_values[2], 0.0);

    // Get the part and selector
    stk::mesh::Part* p_set_part = m_io_mesh->GetMetaData().get_part("block_1");
    stk::mesh::Selector set_selector(*p_set_part);

    // Check the field values
    CheckNodeFieldValues(m_io_mesh->GetBulkData(), set_selector, "velocity", expected_values);
}

// Test initial conditions on multiple sets
TEST_F(InitialConditionUtilTest, AddInitialConditionsMultipleSets) {
    // Create input file
    m_yaml_data = CreateTestYaml();

    // Add a sideset to the mesh
    m_mesh_sidesets = "|sideset:xX";

    // Change the initial conditions to apply to two sets
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["sets"][0] = "surface_1";
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["sets"].push_back("surface_2");

    CreateInputFile();

    // Add initial conditions to field data
    AddTestInitialConditions();

    // Get the initial condition values
    double magnitude = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> expected_values = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
    aperi::ChangeLength(expected_values, magnitude);
    EXPECT_GT(expected_values[0] * expected_values[0] + expected_values[1] * expected_values[1] + expected_values[2] * expected_values[2], 0.0);

    // Get the part and selector for the first set
    stk::mesh::Part* p_set_part = m_io_mesh->GetMetaData().get_part("surface_1");
    stk::mesh::Selector set_selector_1(*p_set_part);

    // Check the field values for the first set
    CheckNodeFieldValues(m_io_mesh->GetBulkData(), set_selector_1, "velocity", expected_values);

    // Get the part and selector for the second set
    p_set_part = m_io_mesh->GetMetaData().get_part("surface_2");
    stk::mesh::Selector set_selector_2(*p_set_part);

    // Check the field values for the second set
    CheckNodeFieldValues(m_io_mesh->GetBulkData(), set_selector_2, "velocity", expected_values);
}

// Test Adding two initial conditions
TEST_F(InitialConditionUtilTest, AddInitialConditionsTwoInitialConditions) {
    // Create input file
    m_yaml_data = CreateTestYaml();

    // Add in side sets
    m_mesh_sidesets = "|sideset:xX";

    // Deep copy the first initial condition to create a second initial condition
    YAML::Node second_initial_condition = Clone(m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]);

    // Add a second initial condition
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"].push_back(second_initial_condition);

    // Change the first initial condition to apply to a different set
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["sets"][0] = "surface_1";

    // Change the second initial condition to apply to a different set
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["sets"][0] = "surface_2";

    // Change the magnitude and direction of the second initial condition
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["magnitude"] = 2.34;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["direction"][0] = 5.9;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["direction"][1] = -6.2;
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["direction"][2] = 11.0;

    CreateInputFile();

    // Add initial conditions to field data
    AddTestInitialConditions();

    // Get the initial condition values
    double magnitude_1 = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> expected_values_1 = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
    aperi::ChangeLength(expected_values_1, magnitude_1);
    EXPECT_GT(expected_values_1[0] * expected_values_1[0] + expected_values_1[1] * expected_values_1[1] + expected_values_1[2] * expected_values_1[2], 0.0);

    // Get the part and selector for the first set
    stk::mesh::Part* p_set_part = m_io_mesh->GetMetaData().get_part("surface_1");
    stk::mesh::Selector set_selector_1(*p_set_part);

    // Check the field values for the first set
    CheckNodeFieldValues(m_io_mesh->GetBulkData(), set_selector_1, "velocity", expected_values_1);

    // Get the part and selector for the second set
    p_set_part = m_io_mesh->GetMetaData().get_part("surface_2");
    stk::mesh::Selector set_selector_2(*p_set_part);

    // Get the initial condition values
    double magnitude_2 = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> expected_values_2 = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
    aperi::ChangeLength(expected_values_2, magnitude_2);
    EXPECT_GT(expected_values_2[0] * expected_values_2[0] + expected_values_2[1] * expected_values_2[1] + expected_values_2[2] * expected_values_2[2], 0.0);

    // Check the field values for the second set
    CheckNodeFieldValues(m_io_mesh->GetBulkData(), set_selector_2, "velocity", expected_values_2);
}

// Test AddInitialConditions function with invalid type
TEST_F(InitialConditionUtilTest, AddInitialConditionsInvalidType) {
    // Create input file
    m_yaml_data = CreateTestYaml();

    // Create an invalid type
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["invalid_type"] = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"];
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0].remove("velocity");

    CreateInputFile();

    // Add initial conditions to field data and expect an exception to be thrown
    EXPECT_THROW(AddTestInitialConditions(), std::exception);
}

// Test AddInitialConditions function with invalid set
TEST_F(InitialConditionUtilTest, AddInitialConditionsInvalidSet) {
    // Create input file
    m_yaml_data = CreateTestYaml();

    // Create an invalid set
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["sets"][0] = "invalid_set";

    CreateInputFile();

    // Add initial conditions to field data and expect an exception to be thrown
    EXPECT_THROW(AddTestInitialConditions(), std::exception);
}