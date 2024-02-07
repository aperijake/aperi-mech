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
    BoundaryCondition(std::pair<std::function<std::vector<double>(double)>, std::function<std::vector<double>(double)>> time_functions, stk::mesh::Selector selector, stk::mesh::Field<double, stk::mesh::Cartesian>* displacement_field, stk::mesh::Field<double, stk::mesh::Cartesian>* velocity_field, stk::mesh::Field<double, stk::mesh::Cartesian>* acceleration_field)
        : m_velocity_time_function(time_functions.first), m_acceleration_time_function(time_functions.second), m_selector(selector), m_displacement_field(displacement_field), m_velocity_field(velocity_field), m_acceleration_field(acceleration_field) {}
    ~BoundaryCondition() = default;

    // Apply the velocity boundary condition to the field
    void ApplyVelocity(double time);

    // Apply the acceleration boundary condition to the field
    void ApplyAcceleration(double time);

    // Get the selector
    stk::mesh::Selector GetSelector() { return m_selector; }

   private:
    std::function<std::vector<double>(double)> m_velocity_time_function;
    std::function<std::vector<double>(double)> m_acceleration_time_function;
    stk::mesh::Selector m_selector;
    stk::mesh::Field<double, stk::mesh::Cartesian>* m_displacement_field;
    stk::mesh::Field<double, stk::mesh::Cartesian>* m_velocity_field;
    stk::mesh::Field<double, stk::mesh::Cartesian>* m_acceleration_field;
};

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, stk::mesh::MetaData& meta_data);

}  // namespace aperi