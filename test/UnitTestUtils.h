#pragma once

#include <yaml-cpp/yaml.h>

#include <Eigen/Dense>
#include <filesystem>
#include <string>
#include <vector>

#include "FieldData.h"

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
void CheckMeshCounts(const aperi::MeshData& mesh_data, const std::vector<int>& expected_owned);
void CheckNodeFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12);
void CheckNodeFieldValues(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values, double tolerance = 1.0e-12);
void CheckNodeFieldSum(const aperi::MeshData& mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::array<double, 3>& expected_values, double tolerance = 1.0e-12);
void CheckNodeFieldPatchValues(const aperi::MeshData& mesh_data, const std::string& field_name, const Eigen::Vector3d& center_of_mass, const Eigen::Matrix3d& field_gradients, aperi::FieldQueryState field_query_state, double tolerance = 1.0e-12);
