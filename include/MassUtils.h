#pragma once

#include <memory>
#include <string>

namespace aperi {

class MeshData;

/**
 * @brief Computes the diagonal mass matrix for a given part in the mesh.
 *
 * This function calculates the mass matrix for a specified part in the mesh using the provided density.
 *
 * @param bulk_data The bulk data object representing the mesh.
 * @param part The part for which the mass matrix is computed.
 * @param density The density used in the mass calculation.
 * @return The computed mass matrix.
 */
double ComputeMassMatrix(const std::shared_ptr<aperi::MeshData> mesh_data, const std::string& part_name, double density);

}  // namespace aperi
