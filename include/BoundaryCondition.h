#pragma once

#include <functional>
#include <memory>
#include <vector>

#include "EntityProcessor.h"
#include "MeshData.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {

class BoundaryCondition {
   public:
    BoundaryCondition(std::vector<std::pair<size_t, double>> components_and_values, std::pair<std::function<double(double)>, std::function<double(double)>> time_functions, std::vector<std::string> sets, std::shared_ptr<aperi::MeshData> mesh_data) : m_components_and_values(components_and_values), m_velocity_time_function(time_functions.first), m_acceleration_time_function(time_functions.second) {
        const std::array<FieldQueryData<double>, 1> velocity_field_query_data_vec = {FieldQueryData<double>{"velocity", FieldQueryState::NP1}};
        const std::array<FieldQueryData<double>, 1> acceleration_field_query_data_vec = {FieldQueryData<double>{"acceleration", FieldQueryState::NP1}};
        m_node_processor_velocity = std::make_shared<aperi::NodeProcessor<1>>(velocity_field_query_data_vec, mesh_data, sets);
        m_node_processor_acceleration = std::make_shared<aperi::NodeProcessor<1>>(acceleration_field_query_data_vec, mesh_data, sets);
    }

    ~BoundaryCondition() = default;

    // Apply the velocity boundary condition to the field
    void ApplyVelocity(double time);

    // Apply the acceleration boundary condition to the field
    void ApplyAcceleration(double time);

   private:
    std::vector<std::pair<size_t, double>> m_components_and_values;
    std::function<double(double)> m_velocity_time_function;
    std::function<double(double)> m_acceleration_time_function;
    std::shared_ptr<aperi::NodeProcessor<1>> m_node_processor_velocity;
    std::shared_ptr<aperi::NodeProcessor<1>> m_node_processor_acceleration;
};

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, const std::shared_ptr<aperi::MeshData>& mesh_data);

}  // namespace aperi