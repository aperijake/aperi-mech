#pragma once

#include <memory>
#include <vector>

#include "ConnectedEntityProcessor.h"
#include "Field.h"
#include "MeshData.h"
#include "Selector.h"
#include "Types.h"

namespace aperi {

/**
 * @brief Computes the maximum edge length for each node in a mesh.
 *
 * This processor iterates over mesh nodes and computes the maximum distance
 * to any connected node, optionally scaling the distance if the neighbor is inactive.
 * The result is stored in a field named "max_edge_length" for each node.
 */
class MaxEdgeLengthProcessor {
   public:
    /**
     * @brief Construct a new MaxEdgeLengthProcessor.
     *
     * @param mesh_data Shared pointer to the mesh data.
     * @param sets Optional list of mesh set names to operate on.
     */
    MaxEdgeLengthProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {});

    /**
     * @brief Compute the maximum edge length for each node.
     *
     * For each node, finds the maximum distance to any connected node,
     * scaling by 2.0 if the neighbor is inactive, and writes the result
     * to the "max_edge_length" field.
     */
    void ComputeMaxEdgeLength();

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;    ///< The mesh data object.
    std::vector<std::string> m_sets;                 ///< The sets to process.
    aperi::Selector m_selector;                      ///< Selector for the sets.
    aperi::Selector m_active_selector;               ///< Selector for active sets.
    aperi::Field<Real> m_coordinates_field;          ///< Coordinates field.
    aperi::Field<Unsigned> m_node_active_field;      ///< Node activity field.
    aperi::Field<Real> m_max_edge_length_field;      ///< Output field for max edge length.
    aperi::ConnectedEntityProcessor m_connectivity;  ///< Connectivity processor.
};

}  // namespace aperi