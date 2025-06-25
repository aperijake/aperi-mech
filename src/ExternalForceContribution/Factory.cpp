#include "ExternalForceContribution/Factory.h"

#include "IoInputFile.h"

namespace aperi {

/**
 * @brief Create an ExternalForceContribution based on YAML node type.
 */
std::shared_ptr<ExternalForceContribution> CreateExternalForceContribution(YAML::Node &load, std::shared_ptr<MeshData> mesh_data) {
    std::string type = load.begin()->first.as<std::string>();
    YAML::Node load_node = load.begin()->second;

    std::vector<std::pair<size_t, double>> components_and_values = aperi::GetComponentsAndValues(load_node);
    std::function<double(double)> time_function = GetTimeFunction(load_node);

    std::vector<std::string> sets;
    if (load_node["sets"]) {
        sets = load_node["sets"].as<std::vector<std::string>>();
    }

    if (type == "traction_load") {
        return std::make_shared<ExternalForceContributionTraction>(mesh_data, sets, components_and_values, time_function);
    } else if (type == "gravity_load") {
        return std::make_shared<ExternalForceContributionGravity>(mesh_data, sets, components_and_values, time_function);
    } else {
        return nullptr;
    }
}

}  // namespace aperi
