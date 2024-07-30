#include <gtest/gtest.h>

#include <Kokkos_Core.hpp>
#include <vector>

#include "ApplicationTestFixture.h"
#include "BoundaryCondition.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "InitialConditionUtil.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "yaml-cpp/yaml.h"

// Functor to update the nodal displacements
struct DispUpdateFunctor {
    explicit DispUpdateFunctor(double time_increment) : m_time_increment(time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *displacement_data_np1, const double *displacement_data_n, const double *velocity_data_np1) const {
        *displacement_data_np1 = *displacement_data_n + m_time_increment * *velocity_data_np1;
    }
    double m_time_increment;
};

// Fixture for BoundaryCondition tests
class BoundaryConditionTest : public ApplicationTest {
   protected:
    void SetUp() override {
        // Run ApplicationTest::SetUp first
        ApplicationTest::SetUp();

        // Initialize field data
        m_field_data.emplace_back("velocity", aperi::FieldDataType::VECTOR, aperi::FieldDataRank::NODE, 2);
        m_field_data.emplace_back("displacement", aperi::FieldDataType::VECTOR, aperi::FieldDataRank::NODE, 2);
        m_field_data.emplace_back("acceleration", aperi::FieldDataType::VECTOR, aperi::FieldDataRank::NODE, 2);
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
            auto name = boundary_condition.begin()->first.as<std::string>();
            std::cout << "Adding boundary condition " << name << " to boundary conditions" << std::endl;
            m_boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition, m_io_mesh->GetMeshData()));
        }

        // Create a node processor for all fields
        std::array<aperi::FieldQueryData, 6> field_query_data_vec;
        field_query_data_vec[0] = {"velocity", aperi::FieldQueryState::NP1};
        field_query_data_vec[1] = {"velocity", aperi::FieldQueryState::N};
        field_query_data_vec[2] = {"displacement", aperi::FieldQueryState::NP1};
        field_query_data_vec[3] = {"displacement", aperi::FieldQueryState::N};
        field_query_data_vec[4] = {"acceleration", aperi::FieldQueryState::NP1};
        field_query_data_vec[5] = {"acceleration", aperi::FieldQueryState::N};

        m_all_field_node_processor = std::make_shared<aperi::NodeProcessor<6>>(field_query_data_vec, m_io_mesh->GetMeshData());
    }

    void UpdateNodalDisplacements(double time_increment) {
        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}A

        // Field query data
        std::array<aperi::FieldQueryData, 3> field_query_data_array;
        field_query_data_array[0] = {"displacement", aperi::FieldQueryState::NP1};
        field_query_data_array[1] = {"displacement", aperi::FieldQueryState::N};
        field_query_data_array[2] = {"velocity", aperi::FieldQueryState::NP1};

        // Create a node processor
        aperi::NodeProcessor<3> node_processor(field_query_data_array, m_io_mesh->GetMeshData());

        auto disp_update_functor = DispUpdateFunctor(time_increment);

        // Loop over each node then DOF and apply the function
        node_processor.for_each_component(disp_update_functor);
        node_processor.MarkAllFieldsModifiedOnDevice();
    }

    static void GetExpectedValues(double time, double time_increment, const std::array<double, 2> &abscissa, const std::array<double, 2> &ordinate, const std::array<double, 3> &direction, double magnitude, const std::string &ramp_type, const std::string &bc_type, std::array<double, 3> &expected_displacement, std::array<double, 3> &expected_velocity) {
        double velocity_time_scale_factor = 1.0;
        // Interpolate the abscissa and ordinate values to get the time scale factor
        if (bc_type == "displacement") {
            if (ramp_type == "ramp_function") {
                // Compute the ordinate derivative
                std::array<double, 2> ordinate_derivate;
                for (size_t i = 0; i < ordinate.size() - 1; ++i) {
                    ordinate_derivate[i] = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
                }
                ordinate_derivate[ordinate.size() - 1] = 0.0;

                velocity_time_scale_factor = aperi::ConstantInterpolation(time, abscissa, ordinate_derivate);
            } else if (ramp_type == "smooth_step_function") {
                velocity_time_scale_factor = aperi::SmoothStepInterpolationDerivative(time, abscissa, ordinate);
            } else {
                EXPECT_TRUE(false) << "Ramp type must be 'ramp_function' or 'smooth_step_function'. Found: " << ramp_type << ".";
            }
        } else if (bc_type == "velocity") {
            if (ramp_type == "ramp_function") {
                velocity_time_scale_factor = aperi::LinearInterpolation(time, abscissa, ordinate);
            } else if (ramp_type == "smooth_step_function") {
                velocity_time_scale_factor = aperi::SmoothStepInterpolation(time, abscissa, ordinate);
            }
        } else {
            EXPECT_TRUE(false) << "Boundary condition type must be 'velocity' or 'displacement'. Found: " << bc_type << ".";
        }
        expected_velocity = direction;
        aperi::ChangeLength(expected_velocity, magnitude * velocity_time_scale_factor);
        // Integrate the displacement expected values when the boundary condition
        for (size_t i = 0; i < expected_displacement.size(); ++i) {
            expected_displacement[i] = expected_displacement[i] + expected_velocity[i] * time_increment;
        }
        std::array<std::array<double, 3>, 2> expected_values;
        expected_values[0] = expected_displacement;
        expected_values[1] = expected_velocity;
    }

    void CheckBoundaryConditions(const std::string &bc_type) {
        // Get the boundary condition from the yaml data
        YAML::Node boundary_condition = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];

        // Get the time stepper
        YAML::Node time_stepper = m_io_input_file->GetTimeStepper(0).begin()->second;

        // Make sure this is using a direct time stepper
        EXPECT_EQ(m_io_input_file->GetTimeStepper(0).begin()->first.as<std::string>(), "direct_time_stepper");

        // Get the time increment
        auto time_increment = time_stepper["time_increment"].as<double>();

        // Get the final time
        auto final_time = time_stepper["time_end"].as<double>();

        // Check the length of the boundary conditions
        EXPECT_EQ(m_boundary_conditions.size(), boundary_condition.size());
        EXPECT_TRUE(boundary_condition.size() > 0);

        // Set up the expected displacement and velocity values
        std::array<double, 3> expected_displacement = {0.0, 0.0, 0.0};
        std::array<double, 3> expected_velocity = {0.0, 0.0, 0.0};

        for (double time = 0.0; time < final_time; time += time_increment) {
            // Apply the boundary conditions
            for (auto &m_boundary_condition : m_boundary_conditions) {
                m_boundary_condition->ApplyVelocity(time);
            }
            UpdateNodalDisplacements(time_increment);

            // Sync the fields
            m_all_field_node_processor->SyncAllFieldsDeviceToHost();
            m_io_mesh->GetMeshData()->UpdateFieldDataStates();
            m_all_field_node_processor->MarkAllFieldsModifiedOnHost();
            m_all_field_node_processor->SyncAllFieldsHostToDevice();

            // Check the boundary conditions
            for (size_t i = 0; i < m_boundary_conditions.size(); ++i) {
                // Get boundary condition node
                YAML::Node bc_node = boundary_condition[i].begin()->second;

                // Get the part and selector for the boundary condition
                auto sets = bc_node["sets"].as<std::vector<std::string>>();
                EXPECT_TRUE(!sets.empty());

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
                auto function_type = time_function.begin()->first.as<std::string>();

                // Make sure the time function is a ramp_function or smooth_step_function
                EXPECT_TRUE(function_type == "ramp_function" || function_type == "smooth_step_function") << "Time function type must be 'ramp_function' or 'smooth_step_function'. Found: " << function_type << ".";
                YAML::Node ramp_function = time_function.begin()->second;

                // Check the size of the abscissa and ordinate values
                EXPECT_TRUE(ramp_function["abscissa_values"].size() == 2);
                EXPECT_TRUE(ramp_function["ordinate_values"].size() == 2);

                // Get the abscissa values and ordinate values
                auto abscissa = ramp_function["abscissa_values"].as<std::array<double, 2>>();
                auto ordinate = ramp_function["ordinate_values"].as<std::array<double, 2>>();

                // Get the expected values
                GetExpectedValues(time, time_increment, abscissa, ordinate, direction, magnitude, function_type, bc_type, expected_displacement, expected_velocity);

                // Check the displacement and velocity values
                m_all_field_node_processor->SyncAllFieldsDeviceToHost();
                CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), sets, "displacement", expected_displacement, aperi::FieldQueryState::N);
                CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_io_mesh->GetMeshData(), sets, "velocity", expected_velocity, aperi::FieldQueryState::N);
            }
        }
    }

    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;
    std::shared_ptr<aperi::NodeProcessor<6>> m_all_field_node_processor;
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

// Add smooth step boundary conditions, displacement
TEST_F(BoundaryConditionTest, AddSmoothStepBoundaryConditionDisplacement) {
    m_yaml_data = CreateTestYaml();

    // Add smooth step boundary conditions
    AddDisplacementBoundaryConditions(m_yaml_data, "smooth_step_function");

    CreateTestMesh(m_field_data);
    CreateInputFile();

    // Add boundary conditions
    AddTestBoundaryConditions();

    // Check the boundary conditions
    CheckBoundaryConditions("displacement");
}

// Add smooth step boundary conditions, velocity
TEST_F(BoundaryConditionTest, AddSmoothStepBoundaryConditionVelocity) {
    m_yaml_data = CreateTestYaml();

    // Add smooth step boundary conditions
    AddVelocityBoundaryConditions(m_yaml_data, "smooth_step_function");

    CreateTestMesh(m_field_data);
    CreateInputFile();

    // Add boundary conditions
    AddTestBoundaryConditions();

    // Check the boundary conditions
    CheckBoundaryConditions("velocity");
}
