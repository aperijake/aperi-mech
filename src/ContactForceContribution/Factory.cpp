#include "ContactForceContribution/Factory.h"

#include <yaml-cpp/yaml.h>

#include <stdexcept>

#include "IoInputFile.h"

namespace aperi {

/**
 * @brief Create an ContactForceContribution based on YAML node type.
 */
std::shared_ptr<ContactForceContribution> CreateContactForceContribution(YAML::Node &node, std::shared_ptr<MeshData> mesh_data, bool uses_generalized_fields, const aperi::LagrangianFormulationType &formulation_type) {
    std::string type = node.begin()->first.as<std::string>();
    YAML::Node contact_node = node.begin()->second;

    if (type == "pinball") {
#ifdef USE_PROTEGO_MECH
        std::vector<std::string> sets;
        bool all_exterior_surfaces = false;
        double penalty_scale_factor = 1.0;
        if (contact_node["sets"]) {
            sets = contact_node["sets"].as<std::vector<std::string>>();
        } else if (contact_node["all_exterior_surfaces"]) {
            all_exterior_surfaces = true;
        } else {
            std::string error_message = "Pinball contact force contribution requires 'sets' or 'all_exterior_surfaces' to be specified.";
            throw std::runtime_error(error_message);
        }
        if (contact_node["penalty_scale_factor"]) {
            penalty_scale_factor = contact_node["penalty_scale_factor"].as<double>();
        }
        return std::make_shared<ContactForceContributionPinball>(mesh_data, sets, all_exterior_surfaces, penalty_scale_factor, uses_generalized_fields, formulation_type);
#else
        std::string error_message = "Pinball contact force contribution is not implemented in aperi-mech. Please use protego-mech for this feature.";
        // Throw, not supported
        throw std::runtime_error(error_message);
#endif
    } else {
        std::string error_message = "Unrecognized contact force contribution type: " + type;
        // Throw, not supported
        throw std::runtime_error(error_message);
    }
}

}  // namespace aperi
