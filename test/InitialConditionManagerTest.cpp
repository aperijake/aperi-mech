#include <gtest/gtest.h>

#include <vector>

#include "FieldManager.h"
#include "InitialConditionManager.h"
#include "yaml-cpp/yaml.h"

// Fixture for InitialConditionManager tests
class InitialConditionManagerTest : public ::testing::Test {
   protected:
    void SetUp() override {
        // Initialize field data
        m_field_data.push_back({"velocity", acm::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"displacement", acm::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"acceleration", acm::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    }

    std::vector<acm::FieldData> m_field_data;
};

// Test AddInitialConditions function with valid input
TEST_F(InitialConditionManagerTest, AddInitialConditionsValidInput) {
    // Create initial conditions
    std::vector<YAML::Node> initial_conditions;
    YAML::Node initial_velocity;
    initial_velocity["velocity"]["set"] = "block_1";
    initial_velocity["velocity"]["magnitude"] = 1.23;
    initial_velocity["velocity"]["direction"].push_back(1);
    initial_velocity["velocity"]["direction"].push_back(0);
    initial_velocity["velocity"]["direction"].push_back(0);
    initial_conditions.push_back(initial_velocity);

    // Add initial conditions to field data
    AddInitialConditions(initial_conditions, m_field_data);

    // Check that initial conditions were added correctly
    EXPECT_EQ(m_field_data[0].data_type, acm::FieldDataType::VECTOR);
    EXPECT_EQ(m_field_data[0].name, "velocity");
    EXPECT_EQ(m_field_data[0].number_of_states, 2);
    EXPECT_EQ(m_field_data[0].initial_values.size(), 3);
    EXPECT_DOUBLE_EQ(m_field_data[0].initial_values[0], 1.23);
    EXPECT_DOUBLE_EQ(m_field_data[0].initial_values[1], 0.0);
    EXPECT_DOUBLE_EQ(m_field_data[0].initial_values[2], 0.0);
}

// Test AddInitialConditions function with invalid type
TEST_F(InitialConditionManagerTest, AddInitialConditionsInvalidType) {
    // Create initial conditions with invalid type
    std::vector<YAML::Node> initial_conditions;
    YAML::Node bad_type;
    bad_type["bad_type"]["set"] = "block_1";
    bad_type["bad_type"]["magnitude"] = 1.23;
    bad_type["bad_type"]["direction"].push_back(1);
    bad_type["bad_type"]["direction"].push_back(0);
    bad_type["bad_type"]["direction"].push_back(0);
    initial_conditions.push_back(bad_type);

    // Add initial conditions to field data and expect an exception to be thrown
    EXPECT_THROW(AddInitialConditions(initial_conditions, m_field_data), std::exception);
}