#include "BoundaryCondition.h"

#include <yaml-cpp/yaml.h>

#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>

#include "MathUtils.h"

namespace aperi {

// Should work for velocity, need delta time for displacement
void BoundaryCondition::Apply(double time) {
    // Loop over the nodes
    for (stk::mesh::Bucket* bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
        for (auto&& node : *bucket) {
            // Get the time function values
            std::vector<double> bc_values = m_time_function(time);

            // Get the field values
            double* field_values = stk::mesh::field_data(*m_field, node);

            // Apply the boundary condition
            for (size_t i = 0; i < 3; ++i) {
                field_values[i] = bc_values[i];
            }
        }
    }
}

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, stk::mesh::MetaData& meta_data) {
    // Get the boundary condition node
    const YAML::Node boundary_condition_node = boundary_condition.begin()->second;

    // Get the magnitude and direction, and change the length to match the magnitude
    const double magnitude = boundary_condition_node["magnitude"].as<double>();
    std::vector<double> vector = boundary_condition_node["direction"].as<std::vector<double>>();
    aperi::ChangeLength(vector, magnitude);

    // Get the time function. TODO(jake) Implement this
    std::function<std::vector<double>(double)> time_function = [&vector](double time) {
        std::vector<double> result = vector;
        for (auto& value : result) {
            value *= time;
        }
        return result;
    };

    // Loop over sets from boundary condition
    std::vector<std::string> sets;
    if (boundary_condition_node["sets"]) {
        sets = boundary_condition_node["sets"].as<std::vector<std::string>>();
    }

    // Create a selector for the sets
    stk::mesh::PartVector parts;
    for (const auto& set : sets) {
        stk::mesh::Part* part = meta_data.get_part(set);
        // Throw an error if the part is not found
        if (part == nullptr) {
            throw std::runtime_error("Boundary condition set " + set + " not found.");
        }
        parts.push_back(part);
    }
    stk::mesh::Selector parts_selector = stk::mesh::selectUnion(parts);

    // Get the type of boundary condition
    const std::string type = boundary_condition.begin()->first.as<std::string>();

    // Get the field
    stk::mesh::Field<double, stk::mesh::Cartesian>* field = meta_data.get_field<stk::mesh::Field<double, stk::mesh::Cartesian>>(stk::topology::NODE_RANK, type);
    // Throw an error if the field is not found
    if (field == nullptr) {
        throw std::runtime_error("Boundary condition field type " + type + " not found.");
    }

    return std::make_shared<BoundaryCondition>(time_function, parts_selector, field);
}

}  // namespace aperi