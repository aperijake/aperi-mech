#pragma once

#include <gtest/gtest.h>
#include <unistd.h>
#include <yaml-cpp/yaml.h>

#include <Eigen/Dense>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <utility>
#include <vector>

#include "Constants.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "MeshData.h"

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
void RandomizeCoordinates(const aperi::MeshData& mesh_data, double min_value = -0.5, double max_value = 0.5);
void CheckPartitionOfUnity(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, double tolerance = 1.0e-12);
void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& shape_function_derivatives, double tolerance = 1.0e-12);
void CheckLinearCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);
void CheckQuadraticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);
void CheckCubicCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);
void CheckQuarticCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates, double tolerance = 1.0e-12);

// Check that the field values match the expected values
// Expects a uniform field, values for every entity are the same
template <aperi::FieldDataTopologyRank Rank, typename T, size_t N>
void CheckEntityFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<T, N>& expected_values, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData<T>, 1> field_query_data_array = {{{field_name, field_query_state, Rank}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data_array, mesh_data_ptr, set_names);

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<T*, 1>& field_data) {
        ASSERT_EQ(num_components[0], expected_values.size()) << "Number of components is not consistent for field " << field_name;
        for (size_t i = 0; i < num_components[0]; i++) {
            found_at_least_one_entity = true;
            if constexpr (std::is_floating_point_v<T>) {
                if (std::fabs(expected_values[i]) < 1.0e-12) {
                    EXPECT_NEAR(field_data[0][i_entity_start[0] + i], expected_values[i], tolerance) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << " is incorrect";
                } else {
                    EXPECT_NEAR(field_data[0][i_entity_start[0] + i], expected_values[i], std::fabs(tolerance * expected_values[i])) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << " is incorrect";
                }
            } else {
                EXPECT_EQ(field_data[0][i_entity_start[0] + i], expected_values[i]) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << " is incorrect";
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_entity);
}

// Get the Entity Field Values as an Eigen Matrix
template <aperi::FieldDataTopologyRank Rank, typename T, size_t N>
Eigen::Matrix<T, Eigen::Dynamic, N> GetEntityFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, aperi::FieldQueryState field_query_state) {
    std::array<aperi::FieldQueryData<T>, 1> field_query_data_array = {{{field_name, field_query_state, Rank}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data_array, mesh_data_ptr, set_names);

    // Get the sum of the field values
    size_t num_components = 0;
    bool num_components_set = false;
    size_t num_entities = 0;
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& /*i_entity_start*/, const std::array<size_t, 1>& entity_num_components, std::array<T*, 1>& /*field_data*/) {
        if (num_components_set) {
            EXPECT_EQ(entity_num_components[0], num_components) << "Number of components is not consistent";
        } else {
            num_components = entity_num_components[0];
            num_components_set = true;
        }
        num_entities++;
    });
    Eigen::Matrix<T, Eigen::Dynamic, N> field_values(num_entities, num_components);
    size_t i_entity = 0;
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& /*entity_num_components*/, std::array<T*, 1>& field_data) {
        for (size_t i = 0; i < num_components; i++) {
            field_values.row(i_entity) = Eigen::Map<Eigen::Matrix<T, 1, N>>(field_data[0] + i_entity_start[0]);
        }
        i_entity++;
    });

    return field_values;
}

// Check that the number of field values with an expected value matches the expected count
template <aperi::FieldDataTopologyRank Rank, typename T>
void CheckEntityFieldValueCount(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::vector<std::pair<T, size_t>>& expected_values, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData<T>, 1> field_query_data_array = {{{field_name, field_query_state, Rank}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data_array, mesh_data_ptr, set_names);

    std::vector<int> actual_count(expected_values.size(), 0);

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<T*, 1>& field_data) {
        for (size_t i = 0; i < num_components[0]; i++) {
            found_at_least_one_entity = true;
            for (size_t j = 0; j < expected_values.size(); j++) {
                if constexpr (std::is_floating_point_v<T>) {
                    if (std::abs(field_data[0][i_entity_start[0] + i] - expected_values[j].first) < tolerance) {
                        actual_count[j]++;
                    }
                } else {
                    if (field_data[0][i_entity_start[0] + i] == expected_values[j].first) {
                        actual_count[j]++;
                    }
                }
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_entity);

    // Parallel sum
    std::vector<int> actual_count_global(actual_count.size(), 0);
    MPI_Allreduce(actual_count.data(), actual_count_global.data(), actual_count.size(), MPI_INT, MPI_SUM, MPI_COMM_WORLD);

    for (size_t i = 0; i < expected_values.size(); i++) {
        EXPECT_EQ(actual_count_global[i], expected_values[i].second) << "Field " << field_name << " value count for value " << expected_values[i].first << " is incorrect";
    }
}

// Check that two fields' values match the expected values
template <aperi::FieldDataTopologyRank Rank, typename T>
void CheckThatFieldsMatch(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_1_name, const std::string& field_2_name, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData<T>, 2> field_query_data_array;
    field_query_data_array[0] = {field_1_name, field_query_state, Rank};
    field_query_data_array[1] = {field_2_name, field_query_state, Rank};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 2, T> entity_processor(field_query_data_array, mesh_data_ptr, set_names);

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 2>& i_entity_start, const std::array<size_t, 2>& num_components, std::array<T*, 2>& field_data) {
        EXPECT_EQ(num_components[0], num_components[1]) << "Number of components is not consistent";
        for (size_t i = 0; i < num_components[0]; i++) {
            found_at_least_one_entity = true;
            if (std::abs(field_data[0][i_entity_start[0] + i]) < 1.0e-12) {
                EXPECT_NEAR(field_data[0][i_entity_start[0] + i], field_data[1][i_entity_start[1] + i], tolerance) << "Field " << field_1_name << " and " << field_2_name << " values do not match. i_entity_start[0] = " << i_entity_start[0] << ", i_entity_start[1] = " << i_entity_start[1] << ", i = " << i;
            } else {
                EXPECT_NEAR(field_data[0][i_entity_start[0] + i], field_data[1][i_entity_start[1] + i], std::abs(tolerance * field_data[0][i_entity_start[0] + i])) << "Field " << field_1_name << " and " << field_2_name << " values do not match. i_entity_start[0] = " << i_entity_start[0] << ", i_entity_start[1] = " << i_entity_start[1] << ", i = " << i;
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_entity);
}

// Check that the sum of different field values for an entity match the expected values
template <aperi::FieldDataTopologyRank Rank, typename T>
void CheckEntityFieldSumOfComponents(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, T expected_value, aperi::FieldQueryState field_query_state, bool verify_nonuniform = true, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData<T>, 1> field_query_data_array = {{{field_name, field_query_state, Rank}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data_array, mesh_data_ptr, set_names);

    bool found_at_least_one_entity = false;

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<T*, 1>& field_data) {
        double sum = 0.0;
        double min_value = field_data[0][i_entity_start[0]];
        double max_value = field_data[0][i_entity_start[0]];
        for (size_t i = 0; i < num_components[0]; i++) {
            found_at_least_one_entity = true;
            sum += field_data[0][i_entity_start[0] + i];
            min_value = std::min(min_value, field_data[0][i_entity_start[0] + i]);
            max_value = std::max(max_value, field_data[0][i_entity_start[0] + i]);
        }
        if (std::abs(expected_value) < 1.0e-12) {
            EXPECT_NEAR(sum, expected_value, tolerance) << "Field " << field_name << " sum of values is incorrect. Rank: " << rank;
        } else {
            EXPECT_NEAR(sum, expected_value, std::abs(tolerance * expected_value)) << "Field " << field_name << " sum of values is incorrect. Rank: " << rank;
        }
        if (verify_nonuniform) {
            EXPECT_NE(min_value, max_value) << "Field " << field_name << " values are uniform. Rank: " << rank;
        }
    });
    EXPECT_TRUE(found_at_least_one_entity);
}

// Check that the sum of the nodal field values match the expected values
template <aperi::FieldDataTopologyRank Rank, typename T, size_t N>
void CheckEntityFieldSum(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<T, N>& expected_values, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    // Field Query Data
    std::array<aperi::FieldQueryData<T>, 1> field_query_data = {{{field_name, field_query_state, Rank}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data, mesh_data_ptr, set_names);

    // Get the sum of the field values
    size_t num_components = 0;
    bool num_components_set = false;
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& /*i_entity_start*/, const std::array<size_t, 1>& entity_num_components, std::array<T*, 1>& /*field_data*/) {
        if (num_components_set) {
            EXPECT_EQ(entity_num_components[0], num_components) << "Number of components is not consistent";
        } else {
            num_components = entity_num_components[0];
            num_components_set = true;
        }
    });
    std::vector<double> sum_values_local(num_components, 0.0);
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<T*, 1>& field_data) {
        for (size_t i = 0; i < num_components[0]; i++) {
            sum_values_local[i] += field_data[0][i_entity_start[0] + i];
        }
    });

    // Parallel sum
    std::vector<double> sum_values_global(num_components, 0.0);
    MPI_Allreduce(sum_values_local.data(), sum_values_global.data(), num_components, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

    for (size_t i = 0; i < num_components; i++) {
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

template <aperi::FieldDataTopologyRank Rank>
void CheckEntityFieldPatchValues(const aperi::MeshData& mesh_data, const std::string& field_name, const Eigen::Vector3d& center_of_mass, const Eigen::Matrix3d& field_gradients, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData<double>, 2> field_query_data_array;
    field_query_data_array[0] = {field_name, field_query_state, Rank};
    field_query_data_array[1] = {mesh_data.GetCoordinatesFieldName(), aperi::FieldQueryState::None};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 2, double> entity_processor(field_query_data_array, mesh_data_ptr);

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 2>& i_entity_start, const std::array<size_t, 2>& num_components, std::array<double*, 2>& field_data) {
        found_at_least_one_entity = true;
        Eigen::Vector3d coordinates = {field_data[1][i_entity_start[1]], field_data[1][i_entity_start[1] + 1], field_data[1][i_entity_start[1] + 2]};
        Eigen::Vector3d expected_values = GetExpectedPatchValues(center_of_mass, coordinates, field_gradients);
        EXPECT_EQ(num_components[0], num_components[1]) << "Number of components is not consistent";
        for (size_t i = 0; i < num_components[0]; i++) {
            if (std::abs(expected_values(i)) < 1.0e-12) {
                EXPECT_NEAR(field_data[0][i_entity_start[0] + i], expected_values(i), tolerance) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << ", coordinates: " << coordinates.transpose() << ", is incorrect\n";
            } else {
                EXPECT_NEAR(field_data[0][i_entity_start[0] + i], expected_values(i), std::abs(tolerance * expected_values(i))) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << ", coordinates: " << coordinates.transpose() << ", is incorrect\n";
            }
        }
    });
    EXPECT_TRUE(found_at_least_one_entity);
}

// Randomly set a field to values from a list
template <aperi::FieldDataTopologyRank Rank, typename T>
void RandomSetValuesFromList(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::vector<T>& values, aperi::FieldQueryState field_query_state, int seed = 42) {
    std::array<aperi::FieldQueryData<T>, 1> field_query_data_array;
    field_query_data_array[0] = {field_name, field_query_state, Rank};

    // Seed the random number generator
    std::srand(seed);

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data_array, mesh_data_ptr, set_names);

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<T*, 1>& field_data) {
        for (size_t i = 0; i < num_components[0]; i++) {
            T value = values[std::rand() % values.size()];
            field_data[0][i_entity_start[0] + i] = value;
        }
    });

    // Parallel communicate field values
    entity_processor.CommunicateAllFieldData();

    // Sync the fields to the device
    entity_processor.SyncAllFieldsHostToDevice();
}
