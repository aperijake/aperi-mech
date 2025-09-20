#include "ExternalForceContribution/Factory.h"

#include <stdexcept>

#include "IoInputFile.h"

namespace aperi {

/**
 * @brief Create an ExternalForceContribution based on YAML node type.
 */
std::shared_ptr<ExternalForceContribution> CreateExternalForceContribution(YAML::Node &load, std::shared_ptr<MeshData> mesh_data) {
    std::string type = load.begin()->first.as<std::string>();
    YAML::Node load_node = load.begin()->second;

    std::vector<std::pair<size_t, double>> components_and_values = aperi::GetComponentsAndValues(load_node);
    std::array<double, 3> values = {0.0, 0.0, 0.0};
    for (const auto &component_value : components_and_values) {
        if (component_value.first < 3) {
            values[component_value.first] = component_value.second;
        } else {
            throw std::runtime_error("Error: Component index in external force contribution must be 0, 1, or 2.");
        }
    }
    std::function<double(double)> time_function = GetTimeFunction(load_node);

    std::vector<std::string> sets;
    if (load_node["sets"]) {
        sets = load_node["sets"].as<std::vector<std::string>>();
    }

    if (type == "traction_load") {
        return std::make_shared<ExternalForceContributionTraction>(mesh_data, sets, values, time_function);
    } else if (type == "gravity_load") {
        return std::make_shared<ExternalForceContributionGravity>(mesh_data, sets, values, time_function);
    } else {
        std::string error_message = "Unrecognized external force contribution type: " + type;
        // Throw, not supported
        throw std::runtime_error(error_message);
    }
}

}  // namespace aperi
