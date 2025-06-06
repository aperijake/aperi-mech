#pragma once

#include <memory>
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

/**
 * @brief Check the partition of unity property for function values.
 *
 * For each node in the mesh (selected by the selector), this function sums the function values
 * over all neighbors and checks if the sum is close to 1.0. If the error exceeds the warning
 * threshold, it prints an error message. If the error exceeds the error threshold, it sets a device flag.
 *
 * @param mesh_data The mesh data object.
 * @param selector The selector for the nodes to check.
 * @param warning_threshold The warning threshold for the error (default 1e-6).
 * @param error_threshold The error threshold for the error (default 1e-2).
 * @return true if the partition of unity is satisfied for all nodes, false otherwise.
 */
bool CheckPartitionOfUnity(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, double warning_threshold = 1.0e-6, double error_threshold = 1.0e-2);

}  // namespace aperi