#include "FieldData.h"

#include <string>
#include <variant>
#include <vector>

#include "Constants.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoFieldData.h"
#endif

namespace aperi {

size_t FieldDataRankToNumberComponents(FieldDataRank data_rank) {
    if (data_rank == FieldDataRank::SCALAR) {
        return 1;
    }
    if (data_rank == FieldDataRank::VECTOR) {
        return 3;
    }
    if (data_rank == FieldDataRank::TENSOR) {
        return 9;
    }
    throw std::invalid_argument("FieldData: Invalid data type.");
}

/**
 * @brief Function to get default field data.
 * @return A vector of default FieldData.
 */
std::vector<FieldData> GetFieldData(bool uses_generalized_fields, bool use_strain_smoothing, bool add_debug_fields) {
    std::vector<FieldData> field_data;

    // TODO(jake): Fields that are "*_coefficients" only need to be on the active part. Can rework this to only define them on the active part.
    // Node data
    if (uses_generalized_fields) {
        // Generalized fields, output as "_coefficients"
        field_data.push_back(FieldData("displacement_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The displacement field
        field_data.push_back(FieldData("velocity_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));      // The velocity field
        field_data.push_back(FieldData("acceleration_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The acceleration field
        // Actual field data at nodes, no state is needed as it is calculated from the coefficients which have states
        field_data.push_back(FieldData("displacement", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The displacement field
        field_data.push_back(FieldData("velocity", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));      // The velocity field
        field_data.push_back(FieldData("acceleration", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The acceleration field
        // Local force field
        field_data.push_back(FieldData("force_local", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));
    } else {
        // Field data at nodes is the same as generalized fields. Just output coefficients.
        field_data.push_back(FieldData("velocity_coefficients", "velocity", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));          // The velocity field, generalized
        field_data.push_back(FieldData("displacement_coefficients", "displacement", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The displacement field, generalized
        field_data.push_back(FieldData("acceleration_coefficients", "acceleration", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The acceleration field, generalized
    }
    field_data.push_back(FieldData("force_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The force field
    field_data.push_back(FieldData("mass_from_elements", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The mass as determined from the attached elements
    field_data.push_back(FieldData("mass", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                // The mass field (mass_from_elements as coefficients on the approximation functions)

    field_data.push_back(FieldData("displacement_np1_temp", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));    // The temporary displacement field, used in the power method calculation
    field_data.push_back(FieldData("force_coefficients_temp", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The temporary force field, used in the power method calculation
    field_data.push_back(FieldData("essential_boundary", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<uint64_t>{}));     // Indicator for essential boundary conditions

    // Element data
    field_data.push_back(FieldData("volume", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));
    field_data.push_back(FieldData("cell_volume_fraction", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));

    // TODO(jake): Add ability to turn this on / off per part
    if (use_strain_smoothing) {
        // TODO(jake): Some of these fields are only really needed for RK, but NeighborSearchProcessor needs to be refactored to allow for this
        // Node neighbor data.
        field_data.push_back(FieldData("num_neighbors", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<uint64_t>{}));  // The number of neighbors for the node
        if (uses_generalized_fields) {
            field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<uint64_t>{}));      // The neighbors of the node
            field_data.push_back(FieldData("function_values", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<double>{}));  // The function values of neighbors at the node
        } else {
            field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, FEM_NODE_NUM_NEIGHBORS, std::vector<uint64_t>{}));      // The neighbors of the node
            field_data.push_back(FieldData("function_values", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, FEM_NODE_NUM_NEIGHBORS, std::vector<double>{}));  // The function values of neighbors at the node
        }
        field_data.push_back(FieldData("kernel_radius", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The kernel radius for the node

        // Cell neighbor data.
        field_data.push_back(FieldData("function_derivatives_x", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NODES, std::vector<double>{}));  // The function derivatives in x of neighbors at the cell
        field_data.push_back(FieldData("function_derivatives_y", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NODES, std::vector<double>{}));  // The function derivatives in y of neighbors at the cell
        field_data.push_back(FieldData("function_derivatives_z", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NODES, std::vector<double>{}));  // The function derivatives in z of neighbors at the cell

#ifdef USE_PROTEGO_MECH
        std::vector<FieldData> protego_field_data = protego::GetFieldData();
        field_data.insert(field_data.end(), protego_field_data.begin(), protego_field_data.end());
#endif
    }

    if (add_debug_fields) {
        field_data.push_back(FieldData("neighbor_coordinates_x", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<double>{}));  // The x coordinates of the neighbors of the node
        field_data.push_back(FieldData("neighbor_coordinates_y", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<double>{}));  // The y coordinates of the neighbors of the node
        field_data.push_back(FieldData("neighbor_coordinates_z", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<double>{}));  // The z coordinates of the neighbors of the node
    }

    return field_data;
}

}  // namespace aperi
