#pragma once

#include <memory>

#include "MeshData.h"

namespace aperi {

/**
 * @brief Print a summary table of node counts (owned, ghosted, etc.) for the mesh.
 *
 * This function prints a formatted summary of node counts, including owned, ghosted,
 * and active nodes, as well as per-processor statistics if requested.
 *
 * @param meshData Shared pointer to the MeshData object.
 * @param print_each_processor If true, print counts for each processor individually.
 */
void PrintNodeCounts(std::shared_ptr<MeshData> meshData, bool print_each_processor = false);

/**
 * @brief Print a summary table of element (cell) counts for the mesh.
 *
 * This function prints a formatted summary of element counts, including total,
 * average, min, max, and imbalance statistics across all processors.
 *
 * @param meshData Shared pointer to the MeshData object.
 */
void PrintElementCounts(std::shared_ptr<MeshData> meshData);

}  // namespace aperi
