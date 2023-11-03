#pragma once

#include <vector>

namespace stk {
namespace mesh {
class BulkData;
}
}  // namespace stk

namespace acm {

// Compute the cross product of two vectors
std::vector<double> CrossProduct(const std::vector<double> &v1, const std::vector<double> &v2);

// Compute the volume of a tetrahedron
double TetVolume(const std::vector<std::vector<double>> &tet);

// Compute the diagonal mass matrix
void ComputeMassMatrix(const stk::mesh::BulkData &bulk_data, double density);

}  // namespace acm