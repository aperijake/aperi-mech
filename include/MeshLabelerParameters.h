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
    MeshLabelerParameters() : smoothing_cell_type(SmoothingCellType::Nodal), num_subcells(1), set(""), activate_center_node(false) {}

    MeshLabelerParameters(SmoothingCellType smoothing_cell_type, size_t num_subcells, const std::string &set, bool activate_center_node)
        : smoothing_cell_type(smoothing_cell_type), num_subcells(num_subcells), set(set), activate_center_node(activate_center_node) {}

    MeshLabelerParameters(const YAML::Node &part)
        : smoothing_cell_type(SmoothingCellType::None),
          num_subcells(1),
          set(part["set"].as<std::string>()),
          activate_center_node(false) {
        // Check if integration scheme is "strain_smoothing"
        if (part["formulation"]["integration_scheme"]["strain_smoothing"]) {
            smoothing_cell_type = SmoothingCellType::Element;
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]["nodal_smoothing_cell"]) {
                smoothing_cell_type = SmoothingCellType::Nodal;
                num_subcells = part["formulation"]["integration_scheme"]["strain_smoothing"]["nodal_smoothing_cell"]["subdomains"].as<size_t>();
            } else {
                num_subcells = part["formulation"]["integration_scheme"]["strain_smoothing"]["element_smoothing_cell"]["subdomains"].as<size_t>();
            }
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]["activate_center_node"]) {
                activate_center_node = part["formulation"]["integration_scheme"]["strain_smoothing"]["activate_center_node"].as<bool>();
            }
        }
    }

    SmoothingCellType smoothing_cell_type;  // The type of smoothing cell
    size_t num_subcells;                    // The number of subcells
    std::string set;                        // The set to process
    bool activate_center_node;              // Whether to activate the center node
};

}  // namespace aperi