#pragma once

#include <memory>
#include <string>

#include "Constants.h"
#include "ContactForceContribution/Base.h"
#ifdef USE_PROTEGO_MECH
#include "ProtegoContactForceContribution/Pinball.h"
#include "ProtegoContactForceContribution/Planar.h"
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
 * @param uses_generalized_fields Whether the contact force contribution uses generalized fields.
 * @param formulation_type The Lagrangian formulation type to use.
 * @return Shared pointer to an ContactForceContribution, or nullptr if type is unrecognized.
 */
std::shared_ptr<ContactForceContribution> CreateContactForceContribution(YAML::Node &node, std::shared_ptr<MeshData> mesh_data, bool uses_generalized_fields, const aperi::LagrangianFormulationType &formulation_type);

}  // namespace aperi
