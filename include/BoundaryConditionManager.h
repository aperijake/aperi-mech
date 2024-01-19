#pragma once

#include <memory>
#include <vector>

namespace YAML {
class Node;
}  // namespace YAML

namespace stk {
namespace mesh {
class MetaData;
}  // namespace mesh
}  // namespace stk

namespace aperi {
class FieldManager;
}  // namespace aperi

// Boundary condition class
// Boundary conditions will have:
// - A set of nodes
// - A type (displacement, velocity)
// - Direction components (x, y, z)
// - A value
// - A temporal function
// - A spatial function TODO(jake)

class BoundaryCondition {
   public:
    BoundaryCondition() = default;
    ~BoundaryCondition() = default;

   private:
};

inline std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, stk::mesh::MetaData& meta_data) {
    return std::make_shared<BoundaryCondition>();
}