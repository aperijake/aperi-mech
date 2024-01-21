#pragma once

#include <functional>
#include <memory>
#include <stk_mesh/base/CoordinateSystems.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <vector>

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {

class BoundaryCondition {
   public:
    BoundaryCondition(std::function<std::vector<double>(double)> time_function, stk::mesh::Selector selector, stk::mesh::Field<double, stk::mesh::Cartesian>* displacement_field, stk::mesh::Field<double, stk::mesh::Cartesian>* velocity_field)
        : m_time_function(time_function), m_selector(selector), m_displacement_field(displacement_field), m_velocity_field(velocity_field) {}
    ~BoundaryCondition() = default;

    // Apply the boundary condition to the field
    void Apply(double time);

   private:
    std::function<std::vector<double>(double)> m_time_function;
    stk::mesh::Selector m_selector;
    stk::mesh::Field<double, stk::mesh::Cartesian>* m_displacement_field;
    stk::mesh::Field<double, stk::mesh::Cartesian>* m_velocity_field;
};

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, stk::mesh::MetaData& meta_data);

}  // namespace aperi