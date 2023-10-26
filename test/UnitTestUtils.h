#pragma once

#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <string>

class IoMesh;
namespace stk {
namespace mesh {
class BulkData;
}
}  // namespace stk

YAML::Node CreateTestYaml();
void WriteTestFile(const std::string& filename);
void WriteTestMesh(const std::string& filename, IoMesh& io_mesh);
void CleanUp(const std::filesystem::path& filePath);
void CheckMeshCounts(const stk::mesh::BulkData& bulk, const std::vector<size_t>& expected_owned);