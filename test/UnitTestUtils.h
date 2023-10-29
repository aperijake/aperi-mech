#pragma once

#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

namespace acm {
class IoMesh;
}  // namespace acm
namespace stk {
namespace mesh {
class BulkData;
}  // namespace mesh
}  // namespace stk

YAML::Node CreateTestYaml();
void WriteTestFile(const std::string& filename);
void WriteTestMesh(const std::string& filename, acm::IoMesh& io_mesh, const std::string& mesh_string = "1x1x1");
void CleanUp(const std::filesystem::path& filePath);
void CheckMeshCounts(const stk::mesh::BulkData& bulk, const std::vector<size_t>& expected_owned);