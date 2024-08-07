#include "FieldData.h"

#include <string>
#include <variant>
#include <vector>

#include "Constants.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoFieldData.h"
#endif

namespace aperi {

/**
 * @brief Function to get default field data.
 * @return A vector of default FieldData.
 */
std::vector<FieldData> GetFieldData(bool use_strain_smoothing) {
    std::vector<FieldData> field_data;

    // Node data
    field_data.push_back(FieldData("velocity", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));            // The velocity field, generalized
    field_data.push_back(FieldData("displacement", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));        // The displacement field, generalized
    field_data.push_back(FieldData("acceleration", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));        // The acceleration field, generalized
    field_data.push_back(FieldData("force", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));               // The force field, generalized
    field_data.push_back(FieldData("mass_from_elements", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The mass as determined from the attached elements
    field_data.push_back(FieldData("mass", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                // The mass field (mass_from_elements as coefficients on the approximation functions)

    // Element data
    field_data.push_back(FieldData("volume", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));

    // TODO(jake): Add ability to turn this on / off per part
    if (use_strain_smoothing) {
        // TODO(jake): Some of these fields are only really needed for RK, but NeighborSearchProcessor needs to be refactored to allow for this
        // Node neighbor data.
        field_data.push_back(FieldData("num_neighbors", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<uint64_t>{}));                          // The number of neighbors for the node
        field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<uint64_t>{}));      // The neighbors of the node
        field_data.push_back(FieldData("function_values", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<double>{}));  // The function values of neighbors at the node
        field_data.push_back(FieldData("kernel_radius", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                            // The kernel radius for the node

        // Cell neighbor data.
        field_data.push_back(FieldData("num_neighbors", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<uint64_t>{}));                                 // The number of neighbors for the cell
        field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<uint64_t>{}));             // The neighbors of the cell
        field_data.push_back(FieldData("function_derivatives_x", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<double>{}));  // The function derivatives in x of neighbors at the cell
        field_data.push_back(FieldData("function_derivatives_y", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<double>{}));  // The function derivatives in y of neighbors at the cell
        field_data.push_back(FieldData("function_derivatives_z", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<double>{}));  // The function derivatives in z of neighbors at the cell

#ifdef USE_PROTEGO_MECH
        std::vector<FieldData> protego_field_data = protego::GetFieldData();
        field_data.insert(field_data.end(), protego_field_data.begin(), protego_field_data.end());
#endif
    }
    return field_data;
}

}  // namespace aperi
