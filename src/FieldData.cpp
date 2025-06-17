#include "FieldData.h"

#include <string>
#include <variant>
#include <vector>

#include "Constants.h"
#include "Types.h"

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
std::vector<FieldData> GetFieldData(bool uses_generalized_fields, bool use_strain_smoothing, aperi::LagrangianFormulationType lagrangian_formulation_type, bool output_coefficients) {
    std::vector<FieldData> field_data;

    // TODO(jake): Fields that are "*_coefficients" only need to be on the active part. Can rework this to only define them on the active part.
    // Node data
    if (uses_generalized_fields) {
        // Generalized fields, output as "_coefficients"
        field_data.push_back(FieldData("displacement_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}, output_coefficients));  // The displacement field, generalized
        field_data.push_back(FieldData("velocity_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}, output_coefficients));      // The velocity field, generalized
        field_data.push_back(FieldData("acceleration_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}, output_coefficients));  // The acceleration field, generalized
        field_data.push_back(FieldData("force_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}, output_coefficients));         // The force field
        // Actual field data at nodes, no state is needed as it is calculated from the coefficients which have states
        field_data.push_back(FieldData("displacement", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The displacement field
        field_data.push_back(FieldData("velocity", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));      // The velocity field
        field_data.push_back(FieldData("acceleration", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The acceleration field
        field_data.push_back(FieldData("force", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));
        if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated || lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
            field_data.push_back(FieldData("displacement_inc", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The displacement increment field, physical
        }
    } else {
        // Field data at nodes is the same as generalized fields. Just output coefficients.
        field_data.push_back(FieldData("velocity_coefficients", "velocity", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));          // The velocity field, generalized / full
        field_data.push_back(FieldData("displacement_coefficients", "displacement", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The displacement field, generalized / full
        field_data.push_back(FieldData("acceleration_coefficients", "acceleration", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The acceleration field, generalized / full
        field_data.push_back(FieldData("force_coefficients", "force", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                // The force field
    }
    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated || lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        field_data.push_back(FieldData("displacement_coefficients_inc", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The displacement increment field, generalized
        // The current coordinates field, manually states as they will not be updated every time step
        field_data.push_back(FieldData("current_coordinates_n", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));    // The current coordinates field
        field_data.push_back(FieldData("current_coordinates_np1", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The current coordinates field
    }
    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        field_data.push_back(FieldData("reference_coordinates", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The last reference coordinates field
    }
    field_data.push_back(FieldData("mass_from_elements", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The mass as determined from the attached elements
    field_data.push_back(FieldData("mass", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                // The mass field (mass_from_elements as coefficients on the approximation functions)
    field_data.push_back(FieldData("max_edge_length", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));     // The maximum edge length for the node

    field_data.push_back(FieldData("essential_boundary", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<Unsigned>{}));  // Indicator for essential boundary conditions
    field_data.push_back(FieldData("node_locks", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<Unsigned>{}, false));   // Node locks, used for gpu parallelization guarding

    // Element data
    field_data.push_back(FieldData("displacement_gradient", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
    field_data.push_back(FieldData("pk1_stress", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
    field_data.push_back(FieldData("volume", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));

    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        field_data.push_back(FieldData("reference_displacement_gradient", "reference_disp_grad", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));
    }

    // TODO(jake): Add ability to turn this on / off per part
    if (use_strain_smoothing) {
        // TODO(jake): Some of these fields are only really needed for RK, but NeighborSearchProcessor needs to be refactored to allow for this

        // Node neighbor data.
        field_data.push_back(FieldData("num_neighbors", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<Unsigned>{}));  // The number of neighbors for the node
        field_data.push_back(FieldData("kernel_radius", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));    // The kernel radius for the node

        Unsigned max_node_num_neighbors = uses_generalized_fields ? MAX_NODE_NUM_NEIGHBORS : FEM_NODE_NUM_NEIGHBORS;
        field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, max_node_num_neighbors, std::vector<Unsigned>{}, false));      // The neighbors of the node
        field_data.push_back(FieldData("function_values", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, max_node_num_neighbors, std::vector<double>{}, false));  // The function values of neighbors at the node

#ifdef USE_PROTEGO_MECH
        std::vector<FieldData> protego_field_data = protego::GetFieldData();
        field_data.insert(field_data.end(), protego_field_data.begin(), protego_field_data.end());
#endif
    }

    return field_data;
}

}  // namespace aperi
