#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <vector>

#include "MeshData.h"

namespace aperi {

enum class SmoothingCellType {
    None,
    Nodal,
    Element
};

// TODO(jake): Move to own file, create constructor that takes in a part YAML node
struct MeshLabelerParameters {
    MeshLabelerParameters() : mesh_data(nullptr), smoothing_cell_type(SmoothingCellType::Nodal), num_subcells(1), set("") {}

    MeshLabelerParameters(std::shared_ptr<MeshData> mesh_data, SmoothingCellType smoothing_cell_type, size_t num_subcells, const std::string &set)
        : mesh_data(mesh_data), smoothing_cell_type(smoothing_cell_type), num_subcells(num_subcells), set(set) {}

    MeshLabelerParameters(const YAML::Node &part, std::shared_ptr<MeshData> mesh_data)
        : mesh_data(mesh_data), set(part["set"].as<std::string>()) {
        // Check if integration scheme is "strain_smoothing"
        if (part["formulation"]["integration_scheme"]["strain_smoothing"]) {
            smoothing_cell_type = SmoothingCellType::Element;
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]["nodal_smoothing_cell"]) {
                smoothing_cell_type = SmoothingCellType::Nodal;
            }
        } else {
            smoothing_cell_type = SmoothingCellType::None;
        }
        num_subcells = 1;  // TODO(jake): Add support for multiple subcells
    }

    std::shared_ptr<MeshData> mesh_data;    // The mesh data object
    SmoothingCellType smoothing_cell_type;  // The type of smoothing cell
    size_t num_subcells;                    // The number of subcells
    std::string set;                        // The set to process
};

}  // namespace aperi