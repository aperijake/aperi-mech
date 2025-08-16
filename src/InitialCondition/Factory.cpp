#include "InitialCondition/Factory.h"

#include <yaml-cpp/yaml.h>

#include "InitialCondition/ComponentAndValueInitialCondition.h"
#include "IoInputFile.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Create an InitialCondition instance from a YAML node.
 */
std::unique_ptr<InitialCondition> CreateInitialCondition(const YAML::Node& initial_condition, std::shared_ptr<aperi::MeshData> mesh_data) {
    // Parse YAML node
    const YAML::Node initial_condition_node = initial_condition.begin()->second;
    std::vector<std::pair<size_t, double>> components_and_values = aperi::GetComponentsAndValues(initial_condition_node);
    std::string field = initial_condition.begin()->first.as<std::string>() + "_coefficients";
    std::vector<std::string> sets;
    if (initial_condition_node["sets"]) {
        sets = initial_condition_node["sets"].as<std::vector<std::string>>();
    }
    return std::make_unique<ComponentAndValueInitialCondition>(mesh_data, field, sets, components_and_values);
}

}  // namespace aperi
