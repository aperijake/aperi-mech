#include <gtest/gtest.h>

#include <vector>

#include "ApplicationTestFixture.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "InitialConditionUtil.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "yaml-cpp/yaml.h"

// Fixture for InitialConditionUtil tests
class InitialConditionUtilTest : public ApplicationTest {
   protected:
    void SetUp() override {
        // Run ApplicationTest::SetUp first
        ApplicationTest::SetUp();

        // Initialize field data
        m_field_data.push_back(aperi::FieldData("velocity", aperi::FieldDataType::VECTOR, aperi::FieldDataRank::NODE, 2));
        m_field_data.push_back(aperi::FieldData("displacement", aperi::FieldDataType::VECTOR, aperi::FieldDataRank::NODE, 2));
        m_field_data.push_back(aperi::FieldData("acceleration", aperi::FieldDataType::VECTOR, aperi::FieldDataRank::NODE, 2));
    }

    void TearDown() override {
        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

    // Add initial conditions to field data
    void AddTestInitialConditions() {
        // Create a temporary mesh file
        CreateTestMesh(m_field_data);

        // Create an IO input file object and read the input file
        m_io_input_file = aperi::CreateIoInputFile(m_yaml_data);

        // Set initial conditions
        // Should set on device for state NP1, and mark the initial conditions NP1 fields as modified on device
        std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(0);
        AddInitialConditions(initial_conditions, m_io_mesh->GetMeshData());

        // Create node processors for syncing field data
        std::vector<aperi::NodeProcessor<2>> node_processors;

        // Need to sync from device to host before updating states
        for (const auto& initial_condition : initial_conditions) {
            // Get the type and initial condition node
            std::string type = initial_condition.begin()->first.as<std::string>();
            const YAML::Node initial_condition_node = initial_condition.begin()->second;

            // Create the field query data
            std::array<aperi::FieldQueryData, 2> field_query_data;
            field_query_data[0] = {type, aperi::FieldQueryState::NP1};
            field_query_data[1] = {type, aperi::FieldQueryState::N};
            std::vector<std::string> sets;
            if (initial_condition_node["sets"]) {
                sets = initial_condition_node["sets"].as<std::vector<std::string>>();
            }
            aperi::NodeProcessor<2> node_processor(field_query_data, m_io_mesh->GetMeshData(), sets);
            node_processor.SyncAllFieldsDeviceToHost();
            node_processors.push_back(node_processor);
        }

        // Update the field data states. Should swap the field data states for state NP1 and N on host
        m_io_mesh->GetMeshData()->UpdateFieldDataStates();

        // Need to mark as modified on host after updating states, then sync from host to device
        for (auto& node_processor : node_processors) {
            node_processor.MarkAllFieldsModifiedOnHost();
            node_processor.SyncAllFieldsHostToDevice();
        }
    }

    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;
};

// Test AddInitialConditions function with valid input, using a vector input
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

    // Check the field values
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), {"block_1"}, "velocity", expected_values, aperi::FieldQueryState::N);
}

// Test AddInitialConditions function with valid input, using component values instead of vector
TEST_F(InitialConditionUtilTest, AddInitialConditionsValidInputComponentValues) {
    // Create input file
    m_yaml_data = CreateTestYaml();

    // Grab the vector values and remove the vector
    double magnitude = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> expected_values = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
    aperi::ChangeLength(expected_values, magnitude);
    EXPECT_GT(expected_values[0] * expected_values[0] + expected_values[1] * expected_values[1] + expected_values[2] * expected_values[2], 0.0);
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"].remove("vector");

    // Add the component values
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["components"]["X"] = expected_values[0];
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["components"]["Y"] = expected_values[1];
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["components"]["Z"] = expected_values[2];
    CreateInputFile();

    // Add initial conditions to field data
    AddTestInitialConditions();

    // Check the field values
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), {"block_1"}, "velocity", expected_values, aperi::FieldQueryState::N);
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

    // Check the field values for the first set
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), {"surface_1"}, "velocity", expected_values, aperi::FieldQueryState::N);

    // Check the field values for the second set
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), {"surface_2"}, "velocity", expected_values, aperi::FieldQueryState::N);
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

    // Check the field values for the first set
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), {"surface_1"}, "velocity", expected_values_1, aperi::FieldQueryState::N);

    // Get the initial condition values
    double magnitude_2 = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["magnitude"].as<double>();
    std::array<double, 3> expected_values_2 = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][1]["velocity"]["vector"]["direction"].as<std::array<double, 3>>();
    aperi::ChangeLength(expected_values_2, magnitude_2);
    EXPECT_GT(expected_values_2[0] * expected_values_2[0] + expected_values_2[1] * expected_values_2[1] + expected_values_2[2] * expected_values_2[2], 0.0);

    // Check the field values for the second set
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), {"surface_2"}, "velocity", expected_values_2, aperi::FieldQueryState::N);
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
