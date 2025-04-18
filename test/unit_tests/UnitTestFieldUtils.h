#pragma once

#include <gtest/gtest.h>
#include <mpi.h>

#include <Eigen/Dense>
#include <array>
#include <memory>
#include <string>
#include <utility>
#include <vector>

#include "EntityProcessor.h"
#include "FieldData.h"
#include "MeshData.h"

// Check that the field values match the expected values
// Expects a uniform field, values for every entity are the same
template <aperi::FieldDataTopologyRank Rank, typename T, size_t N>
void CheckEntityFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<T, N>& expected_values, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12) {
    std::array<aperi::FieldQueryData<T>, 1> field_query_data_array = {{{field_name, field_query_state, Rank}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data_array, mesh_data_ptr, set_names);
    entity_processor.SyncAllFieldsDeviceToHost();

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<T*, 1>& field_data) {
        ASSERT_EQ(num_components[0], expected_values.size()) << "Number of components is not consistent for field " << field_name;
        for (size_t i = 0; i < num_components[0]; i++) {
            found_at_least_one_entity = true;
            if constexpr (std::is_floating_point_v<T>) {
                if (std::fabs(expected_values[i]) < 1.0e-12) {
                    EXPECT_NEAR(field_data[0][i_entity_start[0] + i], expected_values[i], tolerance) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << " is incorrect" << std::endl;
                } else {
                    EXPECT_NEAR(field_data[0][i_entity_start[0] + i], expected_values[i], std::fabs(tolerance * expected_values[i])) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << " is incorrect" << std::endl;
                }
            } else {
                EXPECT_EQ(field_data[0][i_entity_start[0] + i], expected_values[i]) << "Field " << field_name << " value at entity " << i_entity_start[0] << " dof " << i << " is incorrect" << std::endl;
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
    entity_processor.SyncAllFieldsDeviceToHost();

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
    entity_processor.SyncAllFieldsDeviceToHost();

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
    entity_processor.SyncAllFieldsDeviceToHost();

    bool found_at_least_one_entity = false;

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 2>& i_entity_start, const std::array<size_t, 2>& num_components, std::array<T*, 2>& field_data) {
        EXPECT_EQ(num_components[0], num_components[1]) << "Number of components is not consistent";
        for (size_t i = 0; i < num_components[0]; i++) {
            found_at_least_one_entity = true;
            if constexpr (std::is_floating_point_v<T>) {
                if (std::abs(field_data[0][i_entity_start[0] + i]) < 1.0e-12) {
                    EXPECT_NEAR(field_data[0][i_entity_start[0] + i], field_data[1][i_entity_start[1] + i], tolerance) << "Field " << field_1_name << " and " << field_2_name << " values do not match. i_entity_start[0] = " << i_entity_start[0] << ", i_entity_start[1] = " << i_entity_start[1] << ", i = " << i;
                } else {
                    EXPECT_NEAR(field_data[0][i_entity_start[0] + i], field_data[1][i_entity_start[1] + i], std::abs(tolerance * field_data[0][i_entity_start[0] + i])) << "Field " << field_1_name << " and " << field_2_name << " values do not match. i_entity_start[0] = " << i_entity_start[0] << ", i_entity_start[1] = " << i_entity_start[1] << ", i = " << i;
                }
            } else {
                // For non-floating point types, just use exact equality
                EXPECT_EQ(field_data[0][i_entity_start[0] + i], field_data[1][i_entity_start[1] + i]) << "Field " << field_1_name << " and " << field_2_name << " values do not match. i_entity_start[0] = " << i_entity_start[0] << ", i_entity_start[1] = " << i_entity_start[1] << ", i = " << i;
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
    entity_processor.SyncAllFieldsDeviceToHost();

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
void CheckEntityFieldSum(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<T, N>& expected_values, aperi::FieldQueryState field_query_state, double tolerance) {
    // Field Query Data
    std::array<aperi::FieldQueryData<T>, 1> field_query_data = {{{field_name, field_query_state, Rank}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<Rank, 1, T> entity_processor(field_query_data, mesh_data_ptr, set_names);
    entity_processor.SyncAllFieldsDeviceToHost();

    // Get the sum of the field values
    size_t local_num_components = 0;
    bool num_components_set = false;
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& /*i_entity_start*/, const std::array<size_t, 1>& entity_num_components, std::array<T*, 1>& /*field_data*/) {
        if (num_components_set) {
            EXPECT_EQ(entity_num_components[0], local_num_components) << "Number of components is not consistent";
        } else {
            local_num_components = entity_num_components[0];
            num_components_set = true;
        }
    });
    // Parallel max on the number of components
    size_t num_components;
    MPI_Allreduce(&local_num_components, &num_components, 1, MPI_UNSIGNED_LONG, MPI_MAX, MPI_COMM_WORLD);
    EXPECT_GT(num_components, 0);
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
    entity_processor.SyncAllFieldsDeviceToHost();

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

inline void RotateDisplacements(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const Eigen::Matrix3d& rotation_matrix, const Eigen::Vector3d& rotation_center, aperi::FieldQueryState field_query_state) {
    std::array<aperi::FieldQueryData<double>, 2> field_query_data_array;
    field_query_data_array[0] = {mesh_data.GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
    field_query_data_array[1] = {field_name, field_query_state, aperi::FieldDataTopologyRank::NODE};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<aperi::FieldDataTopologyRank::NODE, 2, double> entity_processor(field_query_data_array, mesh_data_ptr, set_names);
    entity_processor.SyncAllFieldsDeviceToHost();

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 2>& i_entity_start, const std::array<size_t, 2>& num_components, std::array<double*, 2>& field_data) {
        ASSERT_EQ(num_components[0], 3) << "Number of components is not consistent for coordinates field";
        ASSERT_EQ(num_components[1], 3) << "Number of components is not consistent for field " << field_name;
        // Get current coordinates = coordinates + displacements
        Eigen::Vector3d current_coordinates = {field_data[0][i_entity_start[0]] + field_data[1][i_entity_start[1]], field_data[0][i_entity_start[0] + 1] + field_data[1][i_entity_start[1] + 1], field_data[0][i_entity_start[0] + 2] + field_data[1][i_entity_start[1] + 2]};

        // Calculate rotated position
        Eigen::Vector3d rotated_position = rotation_matrix * (current_coordinates - rotation_center) + rotation_center;

        // Calculate displacement as difference between rotated and original position
        Eigen::Vector3d displacement = rotated_position - current_coordinates;

        // Store displacement
        field_data[1][i_entity_start[1]] += displacement(0);
        field_data[1][i_entity_start[1] + 1] += displacement(1);
        field_data[1][i_entity_start[1] + 2] += displacement(2);
    });

    // Parallel communicate field values
    entity_processor.CommunicateAllFieldData();

    // Sync the fields to the device
    entity_processor.SyncAllFieldsHostToDevice();
}

inline void AddRandomValueToDisplacements(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, double min, double max, aperi::FieldQueryState field_query_state, int seed = 42) {
    std::array<aperi::FieldQueryData<double>, 1> field_query_data_array;
    field_query_data_array[0] = {field_name, field_query_state, aperi::FieldDataTopologyRank::NODE};

    // Seed the random number generator
    std::srand(seed);

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<aperi::FieldDataTopologyRank::NODE, 1, double> entity_processor(field_query_data_array, mesh_data_ptr, set_names);

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<double*, 1>& field_data) {
        for (size_t i = 0; i < num_components[0]; i++) {
            double random_value = min + static_cast<double>(std::rand()) / (static_cast<double>(RAND_MAX / (max - min)));
            field_data[0][i_entity_start[0] + i] += random_value;
        }
    });

    // Parallel communicate field values
    entity_processor.CommunicateAllFieldData();

    // Sync the fields to the device
    entity_processor.SyncAllFieldsHostToDevice();
}

inline void ApplyLinearDeformationGradient(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const Eigen::Matrix3d& deformation_gradient, aperi::FieldQueryState field_query_state) {
    std::array<aperi::FieldQueryData<double>, 2> field_query_data_array;
    field_query_data_array[0] = {mesh_data.GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
    field_query_data_array[1] = {field_name, field_query_state, aperi::FieldDataTopologyRank::NODE};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<aperi::FieldDataTopologyRank::NODE, 2, double> entity_processor(field_query_data_array, mesh_data_ptr, set_names);
    entity_processor.SyncAllFieldsDeviceToHost();

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 2>& i_entity_start, const std::array<size_t, 2>& num_components, std::array<double*, 2>& field_data) {
        ASSERT_EQ(num_components[0], 3) << "Number of components is not consistent for coordinates field";
        ASSERT_EQ(num_components[1], 3) << "Number of components is not consistent for field " << field_name;
        // Get current coordinates = coordinates + displacements
        Eigen::Vector3d current_coordinates = {field_data[0][i_entity_start[0]] + field_data[1][i_entity_start[1]], field_data[0][i_entity_start[0] + 1] + field_data[1][i_entity_start[1] + 1], field_data[0][i_entity_start[0] + 2] + field_data[1][i_entity_start[1] + 2]};

        // Calculate new position
        Eigen::Vector3d new_position = deformation_gradient * current_coordinates;

        // Calculate displacement as difference between new and original position
        Eigen::Vector3d displacement = new_position - current_coordinates;

        // Store displacement
        field_data[1][i_entity_start[1]] += displacement(0);
        field_data[1][i_entity_start[1] + 1] += displacement(1);
        field_data[1][i_entity_start[1] + 2] += displacement(2);
    });

    // Parallel communicate field values
    entity_processor.CommunicateAllFieldData();

    // Sync the fields to the device
    entity_processor.SyncAllFieldsHostToDevice();
}