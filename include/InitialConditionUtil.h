#pragma once

#include <memory>
#include <vector>

namespace YAML {
class Node;
}  // namespace YAML

namespace stk {
namespace mesh {
class MetaData;
}  // namespace mesh
}  // namespace stk

namespace aperi {
class FieldManager;

/**
 * @brief Adds initial conditions to field data.
 *
 * This function takes a vector of YAML nodes representing initial conditions,
 * and a vector of FieldData objects. It modifies the FieldData objects to include
 * the initial conditions.
 *
 * @param initial_conditions A vector of YAML nodes representing the initial conditions.
 * @param field_manager A shared pointer to a FieldManager object to which the initial conditions are added.
 * @param meta_data The meta data to add the initial conditions to.
 */
void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::FieldManager> field_manager, stk::mesh::MetaData& meta_data);

}  // namespace aperi