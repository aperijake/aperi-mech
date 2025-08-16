#pragma once

#include <yaml-cpp/yaml.h>

#include <string>

namespace aperi {

/**
 * @brief Enum representing the type of smoothing cell used in mesh labeling.
 *
 * This enum defines the different types of smoothing cells that can be used in mesh labeling,
 * including Nodal, Element, and None.
 */
enum class SmoothingCellType {
    None,    ///< No smoothing cell
    Nodal,   ///< Nodal smoothing cell
    Element  ///< Element smoothing cell
};

/**
 * @brief Represents parameters for mesh labeling.
 *
 * This struct contains parameters used for labeling parts of a mesh, including the type of smoothing cell,
 * the number of subcells, and other related settings.
 */
struct MeshLabelerParameters {
    SmoothingCellType smoothing_cell_type = SmoothingCellType::None;  ///< The type of smoothing cell
    size_t num_subcells = 1;                                          ///< The number of subcells
    std::string set;                                                  ///< The set to process
    bool activate_center_node = false;                                ///< Whether to activate the center node
    bool activate_subcell_center_node = false;                        ///< Whether to activate the center node for subcells
    bool deactivate_small_subcells = false;                           ///< Whether to deactivate subcells smaller than a certain size
    double deactivate_subcells_smaller_than = 0.0;                    ///< The size below which subcells are deactivated

    MeshLabelerParameters() = default;

    /**
     * @brief Construct parameters from a YAML node.
     * @param part The YAML node describing the mesh part and labeling options.
     */
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
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]["activate_center_node"]) {
                activate_center_node = part["formulation"]["integration_scheme"]["strain_smoothing"]["activate_center_node"].as<bool>();
            }
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]["activate_subcell_center_node"]) {
                activate_subcell_center_node = part["formulation"]["integration_scheme"]["strain_smoothing"]["activate_subcell_center_node"].as<bool>();
            }
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]["deactivate_subcells_smaller_than"]) {
                deactivate_small_subcells = true;
                deactivate_subcells_smaller_than = part["formulation"]["integration_scheme"]["strain_smoothing"]["deactivate_subcells_smaller_than"].as<double>();
            }
        }
    }
};

}  // namespace aperi