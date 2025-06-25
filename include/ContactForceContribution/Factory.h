#pragma once

#include <memory>
#include <string>

#include "ContactForceContribution/Base.h"
#ifdef USE_PROTEGO_MECH
#include "ProtegoContactForceContribution/Pinball.h"
#endif
#include "MeshData.h"

namespace YAML {
class Node;
}

namespace aperi {

/**
 * @brief Factory function to create an ContactForceContribution from a YAML node.
 * @param node YAML node describing the contact force contribution.
 * @param mesh_data Shared pointer to mesh data.
 * @return Shared pointer to an ContactForceContribution, or nullptr if type is unrecognized.
 */
std::shared_ptr<ContactForceContribution> CreateContactForceContribution(YAML::Node &node, std::shared_ptr<MeshData> mesh_data);

}  // namespace aperi
