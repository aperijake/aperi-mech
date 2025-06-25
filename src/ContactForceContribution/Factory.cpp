#include "ContactForceContribution/Factory.h"

#include <stdexcept>

#include "IoInputFile.h"

namespace aperi {

/**
 * @brief Create an ContactForceContribution based on YAML node type.
 */
std::shared_ptr<ContactForceContribution> CreateContactForceContribution(YAML::Node &node, std::shared_ptr<MeshData> mesh_data) {
    std::string type = node.begin()->first.as<std::string>();
    YAML::Node contact_node = node.begin()->second;

    if (type == "pinball") {
#ifdef USE_PROTEGO_MECH
        std::vector<std::string> sets;
        return std::make_shared<ContactForceContributionPinball>(mesh_data, sets);
#else
        std::string error_message = "Pinball contact force contribution is not implemented in aperi-mech. Please use protego-mech for this feature.";
        // Throw, not supported
        throw std::runtime_error(error_message);
#endif
    } else {
        std::string error_message = "Unrecognized external force contribution type: " + type;
        // Throw, not supported
        throw std::runtime_error(error_message);
    }
}

}  // namespace aperi
