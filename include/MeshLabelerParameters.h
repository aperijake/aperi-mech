#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <vector>
namespace aperi {

enum class SmoothingCellType {
    None,
    Nodal,
    Element
};

// TODO(jake): Move to own file, create constructor that takes in a part YAML node
struct MeshLabelerParameters {
    MeshLabelerParameters() : smoothing_cell_type(SmoothingCellType::Nodal), num_subcells(1), set("") {}

    MeshLabelerParameters(SmoothingCellType smoothing_cell_type, size_t num_subcells, const std::string &set)
        : smoothing_cell_type(smoothing_cell_type), num_subcells(num_subcells), set(set) {}

    MeshLabelerParameters(const YAML::Node &part)
        : set(part["set"].as<std::string>()) {
        // Check if integration scheme is "strain_smoothing"
        if (part["formulation"]["integration_scheme"]["strain_smoothing"]) {
            smoothing_cell_type = SmoothingCellType::Element;
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]["nodal_smoothing_cell"]) {
                smoothing_cell_type = SmoothingCellType::Nodal;
                num_subcells = part["formulation"]["integration_scheme"]["strain_smoothing"]["nodal_smoothing_cell"]["subdomains"].as<size_t>();
            } else {
                num_subcells = part["formulation"]["integration_scheme"]["strain_smoothing"]["element_smoothing_cell"]["subdomains"].as<size_t>();
            }
        } else {
            smoothing_cell_type = SmoothingCellType::None;
        }
    }

    SmoothingCellType smoothing_cell_type;  // The type of smoothing cell
    size_t num_subcells;                    // The number of subcells
    std::string set;                        // The set to process
};

}  // namespace aperi