#include <gtest/gtest.h>

#include <vector>

#include "ApplicationTestFixture.h"
#include "BoundaryCondition.h"
#include "FieldData.h"
#include "InitialConditionUtil.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "NodeProcessor.h"
#include "yaml-cpp/yaml.h"

// Fixture for BoundaryCondition tests
class BoundaryConditionTest : public ApplicationTest {
   protected:
    void SetUp() override {
        // Run ApplicationTest::SetUp first
        ApplicationTest::SetUp();

        // Initialize field data
        m_field_data.push_back({"velocity", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"displacement", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
        m_field_data.push_back({"acceleration", aperi::FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    }

    void TearDown() override {
        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

    // Add boundary conditions to field data
    void AddTestBoundaryConditions() {
        // Create a temporary mesh file
        CreateTestMesh(m_field_data);

        // Create an IO input file object and read the input file
        m_io_input_file = aperi::CreateIoInputFile(m_yaml_data);

        // Set boundary conditions
        std::vector<YAML::Node> boundary_conditions = m_io_input_file->GetBoundaryConditions(0);

        // Loop over boundary conditions and add them to the vector of boundary conditions
        for (auto boundary_condition : boundary_conditions) {
            std::string name = boundary_condition.begin()->first.as<std::string>();
            std::cout << "Adding boundary condition " << name << " to boundary conditions" << std::endl;
            m_boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition, m_io_mesh->GetMeshData()));
        }
    }

    void UpdateNodalDisplacements(double time_increment) {
        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}A

        // Field query data
        std::vector<aperi::FieldQueryData> field_query_data_vec;
        field_query_data_vec.push_back({"displacement", aperi::FieldQueryState::NP1});
        field_query_data_vec.push_back({"displacement", aperi::FieldQueryState::N});
        field_query_data_vec.push_back({"velocity", aperi::FieldQueryState::NP1});

        // Create a node processor
        aperi::NodeProcessor node_processor(field_query_data_vec, m_io_mesh->GetMeshData());

        // Loop over each node then DOF and apply the function
        node_processor.for_each_dof({time_increment}, [](size_t iI, const std::vector<double> &data, std::vector<double *> &field_data) {
            // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
            field_data[0][iI] = field_data[1][iI] + data[0] * field_data[2][iI];
        });
    }

    void CheckBoundaryConditions(std::string bc_type) {
        // Get the boundary condition from the yaml data
        YAML::Node boundary_condition = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];

        // Get the time stepper
        YAML::Node time_stepper = m_io_input_file->GetTimeStepper(0).begin()->second;

        // Make sure this is using a direct time stepper
        EXPECT_EQ(m_io_input_file->GetTimeStepper(0).begin()->first.as<std::string>(), "direct_time_stepper");

        // Get the time increment
        double time_increment = time_stepper["time_increment"].as<double>();

        // Get the final time
        double final_time = time_stepper["time_end"].as<double>();

        // Check the length of the boundary conditions
        EXPECT_EQ(m_boundary_conditions.size(), boundary_condition.size());
        EXPECT_TRUE(boundary_condition.size() > 0);

        // Set up the expected displacement and velocity values
        std::array<double, 3> expected_displacement = {0.0, 0.0, 0.0};
        std::array<double, 3> expected_velocity = {0.0, 0.0, 0.0};

        // Initial time
        for (size_t i = 0; i < m_boundary_conditions.size(); ++i) {
            m_io_mesh->GetMeshData()->UpdateFieldDataStates();
            m_boundary_conditions[i]->ApplyVelocity(0);
        }

        for (double time = 0.0; time < final_time; time += time_increment) {
            // Apply the boundary conditions
            for (size_t i = 0; i < m_boundary_conditions.size(); ++i) {
                m_io_mesh->GetMeshData()->UpdateFieldDataStates();
                m_boundary_conditions[i]->ApplyVelocity(time);
            }
            UpdateNodalDisplacements(time_increment);

            // Check the boundary conditions
            for (size_t i = 0; i < m_boundary_conditions.size(); ++i) {
                // Get boundary condition node
                YAML::Node bc_node = boundary_condition[i].begin()->second;

                // Get the part and selector for the boundary condition
                std::vector<std::string> sets = bc_node["sets"].as<std::vector<std::string>>();
                EXPECT_TRUE(sets.size() > 0);

                // Get the boundary condition magnitude
                double magnitude = 0;

                // Get the boundary condition direction
                std::array<double, 3> direction = {0.0, 0.0, 0.0};

                // If the boundary condition is specified with a vector
                bool is_vector_or_components = bc_node["vector"] || bc_node["components"];
                EXPECT_TRUE(is_vector_or_components);
                if (bc_node["vector"]) {
                    magnitude = bc_node["vector"]["magnitude"].as<double>();
                    direction = bc_node["vector"]["direction"].as<std::array<double, 3>>();
                } else if (bc_node["components"]) {
                    if (bc_node["components"]["X"]) {
                        direction[0] = bc_node["components"]["X"].as<double>();
                    }
                    if (bc_node["components"]["Y"]) {
                        direction[1] = bc_node["components"]["Y"].as<double>();
                    }
                    if (bc_node["components"]["Z"]) {
                        direction[2] = bc_node["components"]["Z"].as<double>();
                    }
                    magnitude = aperi::Normalize(direction);
                }

                // Get the time function type
                YAML::Node time_function = bc_node["time_function"];
                EXPECT_TRUE(time_function.begin()->first.as<std::string>() == "ramp_function") << "Found: " << time_function.begin()->first.as<std::string>();
                YAML::Node ramp_function = time_function.begin()->second;

                // Check the size of the abscissa and ordinate values
                EXPECT_TRUE(ramp_function["abscissa_values"].size() == 2);
                EXPECT_TRUE(ramp_function["ordinate_values"].size() == 2);

                // Get the abscissa values and ordinate values
                std::array<double, 2> abscissa = ramp_function["abscissa_values"].as<std::array<double, 2>>();
                std::array<double, 2> ordinate = ramp_function["ordinate_values"].as<std::array<double, 2>>();

                // Compute the ordinate derivative
                std::array<double, 2> ordinate_derivate;
                for (size_t i = 0; i < ordinate.size() - 1; ++i) {
                    ordinate_derivate[i] = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
                }
                ordinate_derivate[ordinate.size() - 1] = 0.0;

                // Interpolate the abscissa and ordinate values to get the time scale factor
                if (bc_type == "displacement") {
                    double displacement_time_scale_factor = aperi::LinearInterpolation(time, abscissa, ordinate);
                    expected_displacement = direction;
                    aperi::ChangeLength(expected_displacement, magnitude * displacement_time_scale_factor);

                    double velocity_time_scale_factor = aperi::ConstantInterpolation(time, abscissa, ordinate_derivate);
                    expected_velocity = direction;
                    aperi::ChangeLength(expected_velocity, magnitude * velocity_time_scale_factor);
                } else if (bc_type == "velocity") {
                    double velocity_time_scale_factor = aperi::LinearInterpolation(time - time_increment, abscissa, ordinate);  // TODO(jake): Double check this. Should it be time - time_increment due to central difference?
                    expected_velocity = direction;
                    aperi::ChangeLength(expected_velocity, magnitude * velocity_time_scale_factor);

                    // Integrate the displacement expected values when the boundary condition is velocity
                    for (size_t i = 0; i < expected_displacement.size(); ++i) {
                        expected_displacement[i] = expected_displacement[i] + expected_velocity[i] * time_increment;
                    }
                } else {
                    EXPECT_TRUE(false) << "Boundary condition type must be 'velocity' or 'displacement'. Found: " << bc_type << ".";
                }

                // Check the displacement and velocity values
                CheckNodeFieldValues(*m_io_mesh->GetMeshData(), sets, "displacement", expected_displacement);
                CheckNodeFieldValues(*m_io_mesh->GetMeshData(), sets, "velocity", expected_velocity);
            }
        }
    }

    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;
};

// Test adding a displacement boundary condition
TEST_F(BoundaryConditionTest, AddDisplacementBoundaryCondition) {
    m_yaml_data = CreateTestYaml();
    AddDisplacementBoundaryConditions(m_yaml_data);
    CreateTestMesh(m_field_data);
    CreateInputFile();

    // Add boundary conditions
    AddTestBoundaryConditions();

    // Check the boundary conditions
    CheckBoundaryConditions("displacement");
}

// Test adding a displacement boundary condition using components instead of a vector
TEST_F(BoundaryConditionTest, AddDisplacementBoundaryConditionComponents) {
    m_yaml_data = CreateTestYaml();
    AddDisplacementBoundaryConditionsComponents(m_yaml_data);
    CreateTestMesh(m_field_data);
    CreateInputFile();

    // Add boundary conditions
    AddTestBoundaryConditions();

    // Check the boundary conditions
    CheckBoundaryConditions("displacement");
}

// Test adding a velocity boundary condition
TEST_F(BoundaryConditionTest, AddVelocityBoundaryCondition) {
    m_yaml_data = CreateTestYaml();
    AddVelocityBoundaryConditions(m_yaml_data);
    CreateTestMesh(m_field_data);
    CreateInputFile();

    // Add boundary conditions
    AddTestBoundaryConditions();

    // Check the boundary conditions
    CheckBoundaryConditions("velocity");
}
