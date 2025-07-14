#pragma once

#include <memory>
#include <string>
#include <vector>

#include "Types.h"

namespace aperi {

class MeshData;
template <typename T>
struct FieldQueryData;

/**
 * @brief Disconnect cells at their boundary faces.
 *
 * This function disconnects cells at their boundary faces for the specified parts in the mesh.
 *
 * @param mesh_data The mesh data.
 * @param part_names The names of the parts for which to disconnect cells.
 */
void DisconnectCells(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::vector<std::string>& part_names);

/**
 * @brief Get the boundary faces of the cells in the mesh.
 *
 * This function retrieves the boundary faces of the cells in the mesh that are connected to two elements
 * with different cell IDs.
 *
 * @param mesh_data The mesh data.
 * @param part_names The names of the parts for which to get boundary faces.
 * @return A vector of boundary faces.
 */
aperi::EntityVector GetCellBoundaryFaces(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::vector<std::string>& part_names);

}  // namespace aperi