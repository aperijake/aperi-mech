#pragma once

#include <memory>
#include <string>

#include "LogUtils.h"

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

/**
 * @brief Check that all nodes have neighbors.
 *
 * For each node in the mesh (selected by the selector, this function checks that it has at least one neighbor.
 * Optionally prints failures.
 *
 * @param mesh_data The mesh data object.
 * @param selector The selector for the nodes to check.
 * @param print_failures Whether to print failures (default true).
 * @return true if all nodes have neighbors, false otherwise.
 */
bool CheckAllNodesHaveNeighbors(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, bool print_failures = true);

/**
 * @brief Check that all neighbors are active nodes.
 *
 * For each node in the mesh (selected by the selector), this function checks that all neighbors are active.
 * Optionally prints failures.
 *
 * @param mesh_data The mesh data object.
 * @param selector The selector for the nodes to check.
 * @param print_failures Whether to print failures (default true).
 * @return true if all neighbors are active, false otherwise. Will return true if there are no neighbors.
 */
bool CheckNeighborsAreActiveNodes(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, bool print_failures = true);

/**
 * @brief Check that all neighbors are within the neighbor's kernel radius.
 *
 * For each node in the mesh (selected by the selector), this function checks that all neighbors are within the neighbor's kernel radius.
 * Prints details and aborts if a violation is found.
 *
 * @param mesh_data The mesh data object.
 * @param selector The selector for the nodes to check.
 * @param print_failures Whether to print failures (default true).
 * @return true if all neighbors are within kernel radius, false otherwise.
 */
bool CheckAllNeighborsAreWithinKernelRadius(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, bool print_failures = true);

/**
 * @brief Struct holding statistics about node neighbors in a mesh.
 */
struct NeighborStats {
    double max_num_neighbors;
    double min_num_neighbors;
    double avg_num_neighbors;
    double num_entities;
    double reserved_memory_utilization;

    void Print() const {
        aperi::CoutP0() << "   - Neighbor Stats: " << std::endl;
        aperi::CoutP0() << "     - Total Num Nodes: " << num_entities << std::endl;
        aperi::CoutP0() << "     - Max Num Neighbors: " << max_num_neighbors << std::endl;
        aperi::CoutP0() << "     - Min Num Neighbors: " << min_num_neighbors << std::endl;
        aperi::CoutP0() << "     - Avg Num Neighbors: " << avg_num_neighbors << std::endl;
        aperi::CoutP0() << "     - Reserved Memory Utilization: " << reserved_memory_utilization << "%" << std::endl;
    }
};

/**
 * @brief Get statistics about the number of neighbors for nodes in the mesh.
 *
 * This function computes statistics about the number of neighbors for nodes selected
 * by the selector, including the minimum, maximum, and average number of neighbors,
 * as well as memory utilization.
 *
 * @param mesh_data The mesh data object.
 * @param selector The selector for the nodes to check.
 * @return NeighborStats Structure containing neighbor statistics.
 */
NeighborStats GetNumNeighborStats(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector);

}  // namespace aperi