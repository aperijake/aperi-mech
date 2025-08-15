#pragma once

#include <memory>

#include "InitialCondition/Base.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {
class MeshData;

/**
 * @brief Create an InitialCondition instance from a YAML node.
 *
 * @param initial_condition YAML node containing initial condition data.
 * @param mesh_data Shared pointer to mesh data object.
 * @return Unique pointer to the created InitialCondition instance.
 */
std::unique_ptr<InitialCondition> CreateInitialCondition(const YAML::Node& initial_condition, std::shared_ptr<aperi::MeshData> mesh_data);

}  // namespace aperi