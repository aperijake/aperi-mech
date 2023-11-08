#include "InitialConditionManager.h"

#include <yaml-cpp/yaml.h>

#include "FieldManager.h"

// Change the length of a vector
// TODO (jake) get rid of this for a more general function
void ChangeLength(std::vector<double>& vector, double new_magnitude) {
    double magnitude = 0.0;
    for (const auto& component : vector) {
        magnitude += component * component;
    }
    double scale_factor = new_magnitude / std::sqrt(magnitude);
    for (auto& component : vector) {
        component *= scale_factor;
    }
}

void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::vector<acm::FieldData>& field_data) {
    // Add initial condition to field data
    // TODO(jake) add location, assuming everywhere for now
    // TODO(jake) do something with name?
    for (const auto& initial_condition : initial_conditions) {
        const std::string type = initial_condition.begin()->first.as<std::string>();
        const YAML::Node initial_condition_node = initial_condition.begin()->second;
        bool found = false;
        for (auto& field : field_data) {
            if (type == field.name) {
                const double magnitude = initial_condition_node["magnitude"].as<double>();
                std::vector<double> vector = initial_condition_node["direction"].as<std::vector<double>>();
                ChangeLength(vector, magnitude);
                // Set initial values
                field.initial_values = vector;
                found = true;
            }
        }
        if (!found) {
            throw std::runtime_error("Initial condition type not found in field data");
        }
    }
}