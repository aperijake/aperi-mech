#include <gtest/gtest.h>

#include <vector>

#include "ApplicationTestFixture.h"
#include "BoundaryCondition.h"
#include "FieldManager.h"
#include "InitialConditionUtil.h"
#include "MathUtils.h"
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

        // Create field manager
        m_field_manager = CreateFieldManager(m_field_data);
    }

    void TearDown() override {
        // Run ApplicationTest::TearDown last
        ApplicationTest::TearDown();
    }

    // Add boundary conditions to field data
    void AddTestBoundaryConditions() {
        // Create a temporary mesh file
        CreateTestMesh(m_field_manager);

        // Create an IO input file object and read the input file
        m_io_input_file = aperi::CreateIoInputFile(m_yaml_data);

        // Set boundary conditions
        std::vector<YAML::Node> boundary_conditions = m_io_input_file->GetBoundaryConditions(0);

        // Loop over boundary conditions and add them to the vector of boundary conditions
        for (auto boundary_condition : boundary_conditions) {
            std::string name = boundary_condition.begin()->first.as<std::string>();
            std::cout << "Adding boundary condition " << name << " to boundary conditions" << std::endl;
            m_boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition, m_io_mesh->GetMetaData()));
        }
    }

    void UpdateNodalDisplacements(double time_increment) {
        // Get the displacement and velocity fields
        typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
        VectorField *p_displacement_field = m_io_mesh->GetMetaData().get_field<VectorField>(stk::topology::NODE_RANK, "displacement");

        VectorField &displacement_field_n = p_displacement_field->field_of_state(stk::mesh::StateN);
        VectorField &displacement_field_np1 = p_displacement_field->field_of_state(stk::mesh::StateNP1);

        VectorField *p_velocity_field = m_io_mesh->GetMetaData().get_field<VectorField>(stk::topology::NODE_RANK, "velocity");
        VectorField &velocity_field_np1 = p_velocity_field->field_of_state(stk::mesh::StateNP1);

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_io_mesh->GetBulkData().buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            double *displacement_data_n_for_bucket = stk::mesh::field_data(displacement_field_n, *bucket);

            double *displacement_data_np1_for_bucket = stk::mesh::field_data(displacement_field_np1, *bucket);
            double *velocity_data_np1_for_bucket = stk::mesh::field_data(velocity_field_np1, *bucket);

            unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*p_displacement_field, *bucket);

            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
                for (unsigned i = 0; i < num_values_per_node; i++) {
                    int iI = i_node * num_values_per_node + i;
                    displacement_data_np1_for_bucket[iI] = displacement_data_n_for_bucket[iI] + time_increment * velocity_data_np1_for_bucket[iI];
                }
            }
        }
    }

    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;
    std::shared_ptr<aperi::FieldManager> m_field_manager;
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;
};

// Test adding a displacement boundary condition
TEST_F(BoundaryConditionTest, AddDisplacementBoundaryCondition) {

    m_yaml_data = CreateTestYaml();
    AddDisplacementBoundaryConditions(m_yaml_data);
    CreateTestMesh(m_field_manager);
    CreateInputFile();

    // Add boundary conditions
    AddTestBoundaryConditions();

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

    std::string bc_type = "displacement";

    // Loop over the time steps
    for (double time = 0.0; time < final_time; time += time_increment) {
        // Apply the boundary conditions
        for (size_t i = 0; i < m_boundary_conditions.size(); ++i) {
            m_io_mesh->GetBulkData().update_field_data_states();
            m_boundary_conditions[i]->Apply(time);
        }
        UpdateNodalDisplacements(time_increment);

        // Check the boundary conditions
        for (size_t i = 0; i < m_boundary_conditions.size(); ++i) {
            // Get boundary condition node
            YAML::Node bc_node = boundary_condition[i].begin()->second;

            // Get the part and selector for the boundary condition
            std::vector<std::string> sets = bc_node["sets"].as<std::vector<std::string>>();
            EXPECT_TRUE(sets.size() > 0);

            // Create a selector for the sets
            stk::mesh::PartVector parts;
            for (const auto &set : sets) {
                stk::mesh::Part *part = m_io_mesh->GetMetaData().get_part(set);
                EXPECT_TRUE(part != nullptr);
                parts.push_back(part);
            }
            stk::mesh::Selector parts_selector = stk::mesh::selectUnion(parts);

            // Check the selector
            EXPECT_TRUE(parts_selector == m_boundary_conditions[i]->GetSelector());

            // Get the time function type
            YAML::Node time_function = bc_node["time_function"];
            EXPECT_TRUE(time_function.begin()->first.as<std::string>() == "ramp_function") << "Found: " << time_function.begin()->first.as<std::string>();
            YAML::Node ramp_function = time_function.begin()->second;

            // Get the abscissa values and ordinate values
            std::vector<double> abscissa = ramp_function["abscissa_values"].as<std::vector<double>>();
            std::vector<double> ordinate = ramp_function["ordinate_values"].as<std::vector<double>>();

            // Interpolate the abscissa and ordinate values to get the time scale factor
            double time_scale_factor = 0.0;
            if (bc_type == "displacement"){
                time_scale_factor = aperi::LinearInterpolation(time, abscissa, ordinate); // TODO(jake): LinearInterpolation should be tested
            } else if (bc_type == "velocity") {
                // Compute the ordinate derivative
                std::vector<double> ordinate_derivate(ordinate.size());
                for (size_t i = 0; i < ordinate.size() - 1; ++i) {
                    ordinate_derivate[i] = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
                }
                ordinate_derivate[ordinate.size() - 1] = 0.0;
                time_scale_factor = aperi::ConstantInterpolation(time, abscissa, ordinate_derivate);
            } else {
                EXPECT_TRUE(false) << "Boundary condition type must be 'velocity' or 'displacement'. Found: " << bc_type << ".";
            }

            // Get the boundary condition magnitude
            double magnitude = bc_node["magnitude"].as<double>() * time_scale_factor;

            // Get the boundary condition direction
            std::array<double, 3> direction = bc_node["direction"].as<std::array<double, 3>>();

            // Reset the length of the direction to match the magnitude
            aperi::ChangeLength(direction, magnitude);

            // Check the field values
            CheckNodeFieldValues(m_io_mesh->GetBulkData(), parts_selector, "displacement", direction);
        }
    }
}
