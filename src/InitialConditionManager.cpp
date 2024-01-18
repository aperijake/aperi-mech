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

void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::FieldManager> field_manager, stk::mesh::MetaData& meta) {
    // Loop over initial conditions
    for (const auto& initial_condition : initial_conditions) {
        // Get this initial condition node
        const YAML::Node initial_condition_node = initial_condition.begin()->second;

        // Get the magnitude and direction, and change the length to match the magnitude
        const double magnitude = initial_condition_node["magnitude"].as<double>();
        std::vector<double> vector = initial_condition_node["direction"].as<std::vector<double>>();
        ChangeLength(vector, magnitude);

        // Get the type of initial condition
        const std::string type = initial_condition.begin()->first.as<std::string>();

        // Loop over sets from initial condition
        std::vector<std::string> sets;
        if (initial_condition_node["sets"]) {
            sets = initial_condition_node["sets"].as<std::vector<std::string>>();
        }

        // Loop over sets
        for (const auto& set : sets) {
            if (field_manager->SetInitialFieldValues(meta, set, type, vector) == 1) {
                throw std::runtime_error("Initial condition field type " + type + " not found.");
            }
        }
    }
}