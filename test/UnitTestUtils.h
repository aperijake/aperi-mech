#pragma once

#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

namespace aperi {
class IoMesh;
class FieldManager;
}  // namespace aperi
namespace stk {
namespace mesh {
class BulkData;
}  // namespace mesh
}  // namespace stk

YAML::Node CreateTestYaml();
void WriteTestFile(const std::string& filename);
void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::shared_ptr<aperi::FieldManager>& field_manager = nullptr);
void CleanUp(const std::filesystem::path& filePath);
void CheckMeshCounts(const stk::mesh::BulkData& bulk, const std::vector<size_t>& expected_owned);
void CheckNodeFieldValues(const stk::mesh::BulkData& bulk, const std::string& field_name, const std::array<double, 3>& expected_values);
void CheckNodeFieldSum(const stk::mesh::BulkData& bulk, const std::string& field_name, const std::array<double, 3>& expected_values);