#pragma once

#include <memory>
#include <string>
#include <vector>

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {
class MeshData;

/**
 * @brief Sets the initial field values for a set.
 *
 * This function sets the initial field values for a set in the mesh data.
 *
 * @param mesh_data The mesh data to set the initial field values for.
 * @param set_names The names of the sets to set the initial field values for.
 * @param field_name The name of the field to set the initial field values for.
 * @param components_and_values The components and values to set the initial field values to.
 */
void SetInitialFieldValues(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string>& set_name, const std::string& field_name, const std::vector<std::pair<size_t, double>>& components_and_values);

/**
 * @brief Adds initial conditions to field data.
 *
 * This function takes a YAML node representing initial conditions and adds them to the mesh data.
 *
 * @param initial_conditions A YAML nodes representing the initial conditions.
 * @param mesh_data A shared pointer to a MeshData object.
 */
void AddInitialConditions(const YAML::Node& initial_conditions, const std::shared_ptr<aperi::MeshData>& mesh_data);

}  // namespace aperi