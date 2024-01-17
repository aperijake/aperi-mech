#pragma once

namespace stk {
namespace mesh {
class BulkData;
class Part;
}  // namespace mesh
}  // namespace stk

namespace aperi {

// Compute the diagonal mass matrix
double ComputeMassMatrix(const stk::mesh::BulkData& bulk_data, const stk::mesh::Part* part, double density);

}  // namespace aperi
