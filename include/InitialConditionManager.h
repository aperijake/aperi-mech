#pragma once

#include <vector>

namespace YAML {
class Node;
}  // namespace YAML
namespace aperi {
class FieldData;
}  // namespace aperi

/**
 * @brief Adds initial conditions to field data.
 *
 * This function takes a vector of YAML nodes representing initial conditions,
 * and a vector of FieldData objects. It modifies the FieldData objects to include
 * the initial conditions.
 *
 * @param initial_conditions A vector of YAML nodes representing the initial conditions.
 * @param field_data A vector of FieldData objects to add the initial conditions to.
 */
void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::vector<aperi::FieldData>& field_data);