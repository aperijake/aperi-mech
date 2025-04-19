#pragma once

#include <memory>  // For std::shared_ptr
#include <string>
#include <vector>

namespace aperi {
class MeshData;
}

/**
 * Calculate the number of elements in each direction for a nodal mesh
 * @param num_nodes_x Number of nodes in the x direction
 * @param num_nodes_y Number of nodes in the y direction
 * @param num_nodes_z Number of nodes in the z direction
 * @return Vector containing the number of elements in each direction
 */
std::vector<size_t> GetNumElementForNodalMesh(size_t num_nodes_x, size_t num_nodes_y, size_t num_nodes_z);

/**
 * Set the active field on a nodal mesh
 * @param mesh_data Shared pointer to the mesh data
 * @param activate_center_node Whether to activate the center node
 */
void SetActiveFieldOnNodalMesh(const std::shared_ptr<aperi::MeshData> &mesh_data, bool activate_center_node);

/**
 * Label a generated nodal mesh
 * @param mesh_data Shared pointer to the mesh data
 * @param num_subcells Number of subcells
 * @param activate_center_node Whether to activate the center node
 */
void LabelGeneratedNodalMesh(const std::shared_ptr<aperi::MeshData> &mesh_data, size_t num_subcells, bool activate_center_node);

/**
 * Label a generated element mesh
 * @param mesh_data Shared pointer to the mesh data
 * @param num_subcells Number of subcells
 * @param activate_center_node Whether to activate the center node
 */
void LabelGeneratedElementMesh(const std::shared_ptr<aperi::MeshData> &mesh_data, size_t num_subcells, bool activate_center_node);