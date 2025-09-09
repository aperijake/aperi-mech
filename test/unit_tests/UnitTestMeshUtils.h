#pragma once

#include <Eigen/Core>
#include <filesystem>
#include <string>
#include <vector>

#include "Types.h"

namespace aperi {
struct FieldData;
struct Index;
class IoMesh;
class MeshData;
struct Selector;
}  // namespace aperi

namespace stk {
namespace mesh {
class Entity;
}  // namespace mesh
}  // namespace stk

// Mesh Utils
void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::vector<aperi::FieldData>& field_data = {});
void GenerateMesh(aperi::IoMesh& io_mesh, aperi::MeshData& mesh_data, unsigned num_elem_x, unsigned num_elem_y, unsigned num_elem_z, bool tetrahedral = false);
void CleanUp(const std::filesystem::path& filePath);
void CheckMeshCounts(const aperi::MeshData& mesh_data, const std::vector<size_t>& expected_owned);
void RandomizeCoordinates(const aperi::MeshData& mesh_data, double min_value = -0.5, double max_value = 0.5);
void SplitMeshIntoTwoBlocks(const aperi::MeshData& mesh_data, const double z_plane_offset);
size_t GetNumElementsInPart(const aperi::MeshData& mesh_data, const std::string& part_name);
size_t GetNumNodesInPart(const aperi::MeshData& mesh_data, const std::string& part_name);
size_t GetNumFacesInPart(const aperi::MeshData& mesh_data, const std::string& part_name);
size_t GetNumEdgesInPart(const aperi::MeshData& mesh_data, const std::string& part_name);
aperi::Index GetNodeIndexAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found = true);
aperi::Index GetElementIndexAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found = true);
stk::mesh::Entity GetElementAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found = true);
void DeleteElementAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found = true);
std::vector<std::pair<aperi::Index, Eigen::Vector3d>> GetElementIndicesAndCentroids(const aperi::MeshData& mesh_data, const aperi::Selector& selector);
std::vector<std::pair<aperi::Index, std::vector<aperi::Unsigned>>> GetNodeIndicesAndElements(const aperi::MeshData& mesh_data, const aperi::Selector& selector);
std::vector<std::pair<aperi::Unsigned, Eigen::Vector3d>> GetNodeLocalOffsetsAndCoordinates(const aperi::MeshData& mesh_data, const aperi::Selector& selector);
std::vector<std::pair<aperi::Unsigned, Eigen::Vector3d>> GetFaceLocalOffsetsAndCentroids(const aperi::MeshData& mesh_data, const aperi::Selector& selector);
void GetInteriorAndExteriorFaces(const aperi::MeshData& mesh_data, const aperi::Selector& selector, aperi::EntityVector& interior_faces, aperi::EntityVector& exterior_faces);
void GetInteriorAndExteriorCellFaces(const aperi::MeshData& mesh_data, const aperi::Selector& selector, aperi::EntityVector& interior_faces, aperi::EntityVector& exterior_faces);