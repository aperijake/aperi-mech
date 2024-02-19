#pragma once

#include <memory>
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
 * @param set_name The name of the set to set the initial field values for.
 * @param field_name The name of the field to set the initial field values for.
 * @param components_and_values The components and values to set the initial field values to.
 */
void SetInitialFieldValues(std::shared_ptr<aperi::MeshData> mesh_data, const std::string& set_name, const std::string& field_name, const std::vector<std::pair<size_t, double>>& components_and_values);

/**
 * @brief Adds initial conditions to field data.
 *
 * This function takes a vector of YAML nodes representing initial conditions,
 * and a vector of FieldData objects. It modifies the FieldData objects to include
 * the initial conditions.
 *
 * @param initial_conditions A vector of YAML nodes representing the initial conditions.
 * @param mesh_data A shared pointer to a MeshData object.
 */
void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::MeshData> mesh_data);

}  // namespace aperi