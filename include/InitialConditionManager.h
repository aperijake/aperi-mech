#pragma once

#include <vector>

namespace YAML {
class Node;
}  // namespace YAML
namespace aperi {
class FieldData;
}  // namespace aperi

void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::vector<aperi::FieldData>& field_data);