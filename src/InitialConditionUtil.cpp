#include "InitialConditionUtil.h"

#include <yaml-cpp/yaml.h>

#include "FieldManager.h"
#include "IoInputFile.h"
#include "LogUtils.h"
#include "MathUtils.h"

namespace aperi {

void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::FieldManager> field_manager, stk::mesh::MetaData& meta) {
    // Loop over initial conditions
    for (const auto& initial_condition : initial_conditions) {
        // Get this initial condition node
        const YAML::Node initial_condition_node = initial_condition.begin()->second;

        // Get the components and values
        std::vector<std::pair<int, double>> components_and_values = aperi::GetComponentsAndValues(initial_condition_node);

        // Get the type of initial condition
        const std::string type = initial_condition.begin()->first.as<std::string>();

        // Loop over sets from initial condition
        aperi::CoutP0() << "Adding initial condition for sets:" << std::endl;
        std::vector<std::string> sets;
        if (initial_condition_node["sets"]) {
            sets = initial_condition_node["sets"].as<std::vector<std::string>>();
            aperi::CoutP0() << "  " << sets.back() << std::endl;
        }

        // Loop over sets
        for (const auto& set : sets) {
            int return_code = field_manager->SetInitialFieldValues(meta, set, type, components_and_values);
            if (return_code == 1) {
                throw std::runtime_error("Initial condition field type " + type + " not found.");
            } else if (return_code == 2) {
                throw std::runtime_error("Initial condition set " + set + " not found.");
            }
        }
    }
}

}  // namespace aperi