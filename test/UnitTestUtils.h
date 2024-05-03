#pragma once

#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <Eigen/Dense>
#include <filesystem>
#include <string>
#include <vector>

#include "FieldData.h"
#include "MeshData.h"
#include "NodeProcessor.h"

namespace aperi {
class IoMesh;
class MeshData;
}  // namespace aperi

#define EXPECT_NEAR_2D(container1, container2, tolerance)                                                   \
    do {                                                                                                    \
        ASSERT_EQ(container1.size(), container2.size());                                                    \
        for (size_t i = 0; i < container1.size(); ++i) {                                                    \
            ASSERT_EQ(container1[i].size(), container2[i].size());                                          \
            for (size_t j = 0; j < container1[i].size(); ++j) {                                             \
                EXPECT_NEAR(container1[i][j], container2[i][j], tolerance) << "i = " << i << ", j = " << j; \
            }                                                                                               \
        }                                                                                                   \
    } while (0)

YAML::Node CreateTestYaml();
void AddDisplacementBoundaryConditions(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");
void AddDisplacementBoundaryConditionsComponents(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");
void AddVelocityBoundaryConditions(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");
void WriteTestFile(const std::string& filename);
void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::vector<aperi::FieldData>& field_data = {});
void CleanUp(const std::filesystem::path& filePath);
void CheckMeshCounts(const aperi::MeshData& mesh_data, const std::vector<size_t>& expected_owned);

// Check that the field values match the expected values
// Expects a uniform field, values for every entity are the same
template <aperi::FieldDataRank Rank>
void CheckEntityFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData, 1> field_query_data_array = {{field_name, field_query_state}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1> entity_processor_stk_ngp(field_query_data_array, mesh_data_ptr, set_names);

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor_stk_ngp.for_each_entity_host([&](size_t i_entity_start, std::array<double*, 1>& field_data) {
        for (size_t i = 0; i < 3; i++) {
            found_at_least_one_entity = true;
            if (std::abs(expected_values[i]) < 1.0e-12) {
                EXPECT_NEAR(field_data[0][i_entity_start + i], expected_values[i], tolerance) << "Field " << field_name << " value at entity " << i_entity_start << " dof " << i << " is incorrect";
            } else {
                EXPECT_NEAR(field_data[0][i_entity_start + i], expected_values[i], std::abs(tolerance * expected_values[i])) << "Field " << field_name << " value at entity " << i_entity_start << " dof " << i << " is incorrect";
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_entity);
}

// Check that the sum of the nodal field values match the expected values
template <aperi::FieldDataRank Rank>
void CheckEntityFieldSum(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values, double tolerance = 1.0e-12) {
    // Field Query Data
    aperi::FieldQueryState field_query_state = field_name == "mass" ? aperi::FieldQueryState::None : aperi::FieldQueryState::N;
    std::array<aperi::FieldQueryData, 1> field_query_data = {{field_name, field_query_state}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1> entity_processor(field_query_data, mesh_data_ptr, set_names);

    // Get the sum of the field values
    std::array<double, 3> sum_values_local = {0.0, 0.0, 0.0};
    entity_processor.for_each_owned_entity_host([&](size_t i_entity_start, std::array<double*, 1>& field_data) {
        for (size_t i = 0; i < 3; i++) {
            sum_values_local[i] += field_data[0][i_entity_start + i];
        }
    });

    // Parallel sum
    std::array<double, 3> sum_values_global = {0.0, 0.0, 0.0};
    MPI_Allreduce(sum_values_local.data(), sum_values_global.data(), 3, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

    for (size_t i = 0; i < 3; i++) {
        if (std::abs(expected_values[i]) < 1.0e-12) {
            EXPECT_NEAR(sum_values_global[i], expected_values[i], tolerance) << "Field " << field_name << " sum of values is incorrect for component " << i << std::endl;
        } else {
            EXPECT_NEAR(sum_values_global[i], expected_values[i], std::abs(tolerance * expected_values[i])) << "Field " << field_name << " sum of values is incorrect for component " << i << std::endl;
        }
    }
}

inline Eigen::Vector3d GetExpectedPatchValues(const Eigen::Vector3d& center_of_mass, const Eigen::Vector3d& coordinates, const Eigen::Matrix3d& field_gradients) {
    return field_gradients * (coordinates - center_of_mass);
}

template <aperi::FieldDataRank Rank>
void CheckEntityFieldPatchValues(const aperi::MeshData& mesh_data, const std::string& field_name, const Eigen::Vector3d& center_of_mass, const Eigen::Matrix3d& field_gradients, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData, 2> field_query_data_array;
    field_query_data_array[0] = {field_name, field_query_state};
    field_query_data_array[1] = {mesh_data.GetCoordinatesFieldName(), aperi::FieldQueryState::None};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 2> entity_processor_stk_ngp(field_query_data_array, mesh_data_ptr);

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor_stk_ngp.for_each_owned_entity_host([&](size_t i_entity_start, std::array<double*, 2>& field_data) {
        found_at_least_one_entity = true;
        Eigen::Vector3d coordinates = {field_data[1][i_entity_start], field_data[1][i_entity_start + 1], field_data[1][i_entity_start + 2]};
        Eigen::Vector3d expected_values = GetExpectedPatchValues(center_of_mass, coordinates, field_gradients);
        for (size_t i = 0; i < 3; i++) {
            if (std::abs(expected_values(i)) < 1.0e-12) {
                EXPECT_NEAR(field_data[0][i_entity_start + i], expected_values(i), tolerance) << "Field " << field_name << " value at entity " << i_entity_start << " dof " << i << ", coordinates: " << coordinates.transpose() << ", is incorrect\n";
            } else {
                EXPECT_NEAR(field_data[0][i_entity_start + i], expected_values(i), std::abs(tolerance * expected_values(i))) << "Field " << field_name << " value at entity " << i_entity_start << " dof " << i << ", coordinates: " << coordinates.transpose() << ", is incorrect\n";
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_entity);
}