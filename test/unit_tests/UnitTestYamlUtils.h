#pragma once

#include <yaml-cpp/yaml.h>

#include <string>

// YAML Utils
YAML::Node CreateTestYaml();
void AddDisplacementBoundaryConditions(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");
void AddDisplacementBoundaryConditionsComponents(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");
void AddDisplacementBoundaryConditionsWithActiveRange(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");
void AddVelocityBoundaryConditions(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");
void AddVelocityBoundaryConditionsWithActiveRange(YAML::Node& root, const std::string& ramp_function_type = "ramp_function");