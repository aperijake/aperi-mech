#pragma once

#include <functional>
#include <memory>
#include <vector>

#include "EntityProcessor.h"
#include "MeshData.h"
#include "Types.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {

class BoundaryCondition {
   public:
    BoundaryCondition(std::vector<std::pair<size_t, double>> components_and_values, std::pair<std::function<double(double)>, std::function<double(double)>> time_functions, std::vector<std::string> sets, std::shared_ptr<aperi::MeshData> mesh_data, double active_time_start = 0.0, double active_time_end = std::numeric_limits<double>::max()) : m_components_and_values(components_and_values), m_velocity_time_function(time_functions.first), m_acceleration_time_function(time_functions.second), m_active_time_start(active_time_start), m_active_time_end(active_time_end), m_sets(sets) {
        const std::array<FieldQueryData<double>, 1> velocity_field_query_data_vec = {FieldQueryData<double>{"velocity_coefficients", FieldQueryState::NP1}};
        const std::array<FieldQueryData<double>, 1> acceleration_field_query_data_vec = {FieldQueryData<double>{"acceleration_coefficients", FieldQueryState::NP1}};
        m_node_processor_velocity = std::make_shared<aperi::NodeProcessor<1>>(velocity_field_query_data_vec, mesh_data, sets);
        m_node_processor_acceleration = std::make_shared<aperi::NodeProcessor<1>>(acceleration_field_query_data_vec, mesh_data, sets);

        const std::array<FieldQueryData<Unsigned>, 1> boundary_field_query_data_vec = {FieldQueryData<Unsigned>{"essential_boundary", FieldQueryState::None}};
        m_node_processor_boundary = std::make_shared<aperi::NodeProcessor<1, Unsigned>>(boundary_field_query_data_vec, mesh_data, sets);

        // Set the flag to mark the field as on an essential boundary
        SetEssentialBoundaryFlag();
    }

    ~BoundaryCondition() = default;

    // Preprocess the boundary condition
    void Preprocess(){};

    // Apply the velocity boundary condition to the field
    void ApplyVelocity(double time) const;

    // Apply the acceleration boundary condition to the field
    void ApplyAcceleration(double time) const;

    // Set the flag to mark the field as on an essential boundary
    void SetEssentialBoundaryFlag();

    // Get the set names
    std::vector<std::string> GetSetNames() const { return m_sets; }

   private:
    std::vector<std::pair<size_t, double>> m_components_and_values;
    std::function<double(double)> m_velocity_time_function;
    std::function<double(double)> m_acceleration_time_function;
    double m_active_time_start;
    double m_active_time_end;
    std::vector<std::string> m_sets;
    std::shared_ptr<aperi::NodeProcessor<1>> m_node_processor_velocity;
    std::shared_ptr<aperi::NodeProcessor<1>> m_node_processor_acceleration;
    std::shared_ptr<aperi::NodeProcessor<1, Unsigned>> m_node_processor_boundary;
};

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, const std::shared_ptr<aperi::MeshData>& mesh_data);

}  // namespace aperi