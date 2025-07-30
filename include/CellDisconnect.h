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
 * @brief Utility class for disconnecting cells at their boundary faces.
 *
 *
 */
class CellDisconnect {
   public:
    /**
     * @brief Constructor for CellDisconnect.
     * @param mesh_data The mesh data to operate on.
     * @param part_names The names of the parts to disconnect.
     */
    CellDisconnect(const std::shared_ptr<aperi::MeshData>& mesh_data,
                   const std::vector<std::string>& part_names);

    /**
     * @brief Disconnect cells at their boundary faces.
     */
    void DisconnectCells();

    /**
     * @brief Get the boundary faces of the cells in the mesh.
     * @return A vector of boundary faces.
     */
    aperi::EntityVector GetCellBoundaryFaces();

    /**
     * @brief Make a disconnect view for debugging.
     * @param shrink_factor Factor to shrink cells towards their center.
     */
    void MakeDisconnectedViewForDebugging(double shrink_factor = 0.1);

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::vector<std::string> m_part_names;
};

}  // namespace aperi