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
 * @param mesh_data The mesh data.
 * @param part_name The name of the part for which to compute the mass matrix.
 * @param density The density used in the mass calculation.
 * @return The computed mass matrix.
 */
double ComputeMassMatrixForPart(const std::shared_ptr<aperi::MeshData>& mesh_data, const std::string& part_name, double density, bool uses_generalized_fields = false);

}  // namespace aperi
