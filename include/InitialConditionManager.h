#pragma once

#include <vector>

namespace YAML {
class Node;
}  // namespace YAML
namespace acm {
class FieldData;
}  // namespace acm

void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::vector<acm::FieldData>& field_data);