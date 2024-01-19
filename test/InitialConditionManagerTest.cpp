#include <gtest/gtest.h>

#include <vector>

#include "ApplicationTestFixture.h"
#include "FieldManager.h"
#include "InitialConditionManager.h"
#include "yaml-cpp/yaml.h"

// Fixture for InitialConditionManager tests
class InitialConditionManagerTest : public ApplicationTest {
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

        // Create a temporary mesh file
        CreateTestMesh(m_field_manager);
    }

    void TearDown() override {
        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

    // Add initial conditions to field data
    void AddTestInitialConditions() {
        // Create an IO input file object and read the input file
        m_io_input_file = aperi::CreateIoInputFile(m_yaml_data);

        // Set initial conditions
        std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(0);
        AddInitialConditions(initial_conditions, m_field_manager, m_io_mesh->GetMetaData());
    }

    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;
    std::shared_ptr<aperi::FieldManager> m_field_manager;
};

// Test AddInitialConditions function with valid input
TEST_F(InitialConditionManagerTest, AddInitialConditionsValidInput) {
    // Create input file
    m_yaml_data = CreateTestYaml();
    CreateInputFile();

    // Add initial conditions to field data
    AddTestInitialConditions();

    // Default: velocity: [1.23,0,0] on block_1
    std::vector<double> expected_values = {1.23, 0.0, 0.0};

    // Get the field
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
    VectorField* p_field = m_io_mesh->GetMetaData().get_field<VectorField>(stk::topology::NODE_RANK, "velocity");
    EXPECT_TRUE(p_field != nullptr);

    // Get the part and selector
    stk::mesh::Part* p_set_part = m_io_mesh->GetMetaData().get_part("block_1");
    stk::mesh::Selector set_selector(*p_set_part);

    bool found = false;  // Prevents false positive if no nodes are found
    // Loop over all the buckets
    for (stk::mesh::Bucket* bucket : set_selector.get_buckets(stk::topology::NODE_RANK)) {
        for (auto&& node : *bucket) {
            // Get the field values for the node
            double* field_values = stk::mesh::field_data(*p_field, node);

            // Check the field values for the node
            for (size_t i = 0; i < p_field->number_of_states(); ++i) {
                EXPECT_DOUBLE_EQ(field_values[i], expected_values[i]);
            }
            found = true;
        }
    }
    EXPECT_TRUE(found);
}

// Test AddInitialConditions function with invalid type
TEST_F(InitialConditionManagerTest, AddInitialConditionsInvalidType) {
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
TEST_F(InitialConditionManagerTest, AddInitialConditionsInvalidSet) {
    // Create input file
    m_yaml_data = CreateTestYaml();

    // Create an invalid set
    m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["initial_conditions"][0]["velocity"]["sets"][0] = "invalid_set";

    CreateInputFile();

    // Add initial conditions to field data and expect an exception to be thrown
    EXPECT_THROW(AddTestInitialConditions(), std::exception);
}