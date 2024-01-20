#include "BoundaryCondition.h"

#include <yaml-cpp/yaml.h>

#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>

#include "MathUtils.h"

namespace aperi {

// Should work for velocity, need delta time for displacement
void BoundaryCondition::Apply(double time, double delta_time) {
    // Loop over the nodes
    for (stk::mesh::Bucket* bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
        for (auto&& node : *bucket) {
            // Get the time function values
            std::vector<double> bc_values = m_time_function(time, delta_time);

            // Get the velocity field values for the node
            double* velocity_field_values = stk::mesh::field_data(*m_velocity_field, node);

            // Get the displacement field values for the node
            double* displacement_field_values = stk::mesh::field_data(*m_displacement_field, node);

            // Apply the boundary condition
            for (size_t i = 0; i < 3; ++i) {
                velocity_field_values[i] = bc_values[i];
                displacement_field_values[i] += bc_values[i] * delta_time;
            }
        }
    }
}

// Set the time function
std::function<std::vector<double>(double, double)> SetTimeFunction(const YAML::Node& boundary_condition, const std::vector<double>& component_value_vector, const std::string& bc_type) {
    // Get the time function node
    const YAML::Node time_function_node = boundary_condition["time_function"].begin()->second;

    // Get the type of time function
    std::string time_function_type = boundary_condition["time_function"].begin()->first.as<std::string>();

    // Create a time function
    std::function<std::vector<double>(double, double)> time_function;

    // Set the time function
    if (time_function_type == "ramp_function") {
        // Get the abscissa and ordinate
        std::vector<double> abscissa = time_function_node["abscissa_values"].as<std::vector<double>>();
        std::vector<double> ordinate = time_function_node["ordinate_values"].as<std::vector<double>>();

        // If type is 'displacement', convert ordinate to velocity. Will be a piecewise constant function
        if (bc_type == "displacement") {
            std::vector<double> ordinate_derivate(ordinate.size());
            for (size_t i = 0; i < ordinate.size() - 1; ++i) {
                ordinate_derivate[i] = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
            }
            ordinate_derivate[ordinate.size() - 1] = 0.0;
            time_function = [abscissa, ordinate_derivate, component_value_vector](double time, double delta_time) {
                double time_scale_factor = aperi::ConstantInterpolation(time, abscissa, ordinate_derivate);
                std::vector<double> result(component_value_vector.size());
                for (size_t i = 0; i < component_value_vector.size(); ++i) {
                    result[i] = component_value_vector[i] * time_scale_factor;
                }
                return result;
            };
        } else if (bc_type == "velocity") {
            time_function = [abscissa, ordinate, component_value_vector](double time, double delta_time) {
                double time_scale_factor = aperi::LinearInterpolation(time, abscissa, ordinate);
                std::vector<double> result(component_value_vector.size());
                for (size_t i = 0; i < component_value_vector.size(); ++i) {
                    result[i] = component_value_vector[i] * time_scale_factor;
                }
                return result;
            };
        } else {
            // Throw an error if the type is not 'velocity' or 'displacement'. Should not happen.
            throw std::runtime_error("Boundary condition type must be 'velocity' or 'displacement'. Found: " + bc_type + ".");
        }

    } else {
        throw std::runtime_error("Time function type " + time_function_type + " not found.");
    }
    return time_function;
}

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, stk::mesh::MetaData& meta_data) {
    // Get the boundary condition node
    const YAML::Node boundary_condition_node = boundary_condition.begin()->second;

    // Get the magnitude and direction, and change the length to match the magnitude
    const double magnitude = boundary_condition_node["magnitude"].as<double>();
    std::vector<double> vector = boundary_condition_node["direction"].as<std::vector<double>>();
    aperi::ChangeLength(vector, magnitude);

    // Get the type of boundary condition, lowercase
    std::string type = boundary_condition.begin()->first.as<std::string>();
    std::transform(type.begin(), type.end(), type.begin(), ::tolower);

    // Get the time function
    std::function<std::vector<double>(double, double)> time_function = SetTimeFunction(boundary_condition_node, vector, type);

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

    // Make sure type is 'velocity' or 'displacement'
    if (type != "velocity" && type != "displacement") {
        throw std::runtime_error("Boundary condition type must be 'velocity' or 'displacement'. Found: " + type + ".");
    }

    // Get the displacement field
    stk::mesh::Field<double, stk::mesh::Cartesian>* displacement_field = meta_data.get_field<stk::mesh::Field<double, stk::mesh::Cartesian>>(stk::topology::NODE_RANK, "displacement");
    // Throw an error if the field is not found
    if (displacement_field == nullptr) {
        throw std::runtime_error("Boundary condition. Displacement field not found.");
    }

    // Get the velocity field
    stk::mesh::Field<double, stk::mesh::Cartesian>* velocity_field = meta_data.get_field<stk::mesh::Field<double, stk::mesh::Cartesian>>(stk::topology::NODE_RANK, "velocity");
    // Throw an error if the field is not found
    if (velocity_field == nullptr) {
        throw std::runtime_error("Boundary condition. Velocity field not found.");
    }

    return std::make_shared<BoundaryCondition>(time_function, parts_selector, displacement_field, velocity_field);
}

}  // namespace aperi