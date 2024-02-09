#include "InitialConditionUtil.h"

#include <yaml-cpp/yaml.h>

#include "FieldManager.h"
#include "MathUtils.h"

namespace aperi {

void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::FieldManager> field_manager, stk::mesh::MetaData& meta) {
    // Loop over initial conditions
    for (const auto& initial_condition : initial_conditions) {
        // Get this initial condition node
        const YAML::Node initial_condition_node = initial_condition.begin()->second;

        // Get the magnitude and direction, and change the length to match the magnitude
        const double magnitude = initial_condition_node["magnitude"].as<double>();
        std::vector<double> vector = initial_condition_node["direction"].as<std::vector<double>>();
        aperi::ChangeLength(vector, magnitude);

        // Get the type of initial condition
        const std::string type = initial_condition.begin()->first.as<std::string>();

        // Loop over sets from initial condition
        std::cout << "Adding initial condition for sets:" << std::endl;
        std::vector<std::string> sets;
        if (initial_condition_node["sets"]) {
            sets = initial_condition_node["sets"].as<std::vector<std::string>>();
            std::cout << "  " << sets.back() << std::endl;
        }

        // Loop over sets
        for (const auto& set : sets) {
            int return_code = field_manager->SetInitialFieldValues(meta, set, type, vector);
            if (return_code == 1) {
                throw std::runtime_error("Initial condition field type " + type + " not found.");
            } else if (return_code == 2) {
                throw std::runtime_error("Initial condition set " + set + " not found.");
            }
        }
    }
}

}  // namespace aperi