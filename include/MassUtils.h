#pragma once

namespace stk {
namespace mesh {
class BulkData;
}
}  // namespace stk

namespace aperi {

// Compute the diagonal mass matrix
double ComputeMassMatrix(const stk::mesh::BulkData &bulk_data, double density);

}  // namespace aperi
