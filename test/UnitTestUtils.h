#pragma once

#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

namespace aperi {
class IoMesh;
class FieldData;
}  // namespace aperi
namespace stk {
namespace mesh {
class BulkData;
class Selector;
}  // namespace mesh
}  // namespace stk

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
void AddDisplacementBoundaryConditions(YAML::Node& root);
void AddDisplacementBoundaryConditionsComponents(YAML::Node& root);
void AddVelocityBoundaryConditions(YAML::Node& root);
void WriteTestFile(const std::string& filename);
void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::vector<aperi::FieldData>& field_data = {});
void CleanUp(const std::filesystem::path& filePath);
void CheckMeshCounts(const stk::mesh::BulkData& bulk, const std::vector<size_t>& expected_owned);
void CheckNodeFieldValues(const stk::mesh::BulkData& bulk, const stk::mesh::Selector& selector, const std::string& field_name, const std::array<double, 3>& expected_values);
void CheckNodeFieldSum(const stk::mesh::BulkData& bulk, const stk::mesh::Selector& selector, const std::string& field_name, const std::array<double, 3>& expected_values);
