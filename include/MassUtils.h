#pragma once

namespace stk {
namespace mesh {
class BulkData;
class Part;
}  // namespace mesh
}  // namespace stk

namespace aperi {

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
double ComputeMassMatrix(const stk::mesh::BulkData& bulk_data, const stk::mesh::Part* part, double density);

}  // namespace aperi
