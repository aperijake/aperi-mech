#pragma once

#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>

#include "Types.h"

namespace aperi {

class MeshData;
struct Selector;

/**
 * @brief Prints the neighbors field for debugging purposes. Done on host
 * @param mesh_data A shared pointer to the MeshData object containing the mesh information.
 * @param selector A selector that defines the subset of entities to process.
 * @note This function is intended for debugging purposes and should not be used in production code.
 */
void DebugPrintNeighborsField(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector);

bool CheckPartitionOfUnity(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, double warning_threshold = 1.0e-6, double error_threshold = 1.0e-2);

}  // namespace aperi