#pragma once

#include <memory>
#include <string>

#include "ExternalForceContribution/Base.h"
#include "ExternalForceContribution/Gravity.h"
#include "ExternalForceContribution/Traction.h"
#include "MeshData.h"

namespace YAML {
class Node;
}

namespace aperi {

/**
 * @brief Factory function to create an ExternalForceContribution from a YAML node.
 * @param load YAML node describing the force.
 * @param mesh_data Shared pointer to mesh data.
 * @return Shared pointer to an ExternalForceContribution, or nullptr if type is unrecognized.
 */
std::shared_ptr<ExternalForceContribution> CreateExternalForceContribution(YAML::Node &load, std::shared_ptr<MeshData> mesh_data);

}  // namespace aperi
