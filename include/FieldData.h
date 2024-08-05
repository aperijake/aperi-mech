#pragma once

#include <string>
#include <variant>
#include <vector>

#include "Constants.h"

namespace aperi {

using FieldDataType = std::variant<int, double>;

/**
 * @enum FieldDataRank
 * @brief Enum for field data ranks.
 */
enum class FieldDataRank { SCALAR,
                           VECTOR,
                           TENSOR,
                           CUSTOM };

/**
 * @enum FieldDataTopologyRank
 * @brief Enum for the topology rank the field data is associated with.
 */
enum class FieldDataTopologyRank { NODE,
                                   ELEMENT };

/**
 * @struct FieldData
 * @brief Represents the data of a field.
 */
struct FieldData {
    // For non-custom fields
    template <typename T>
    FieldData(std::string name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, std::vector<T> initial_values_in = {})
        : name(name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), data_type(T{}) {
        if (data_rank == FieldDataRank::SCALAR) {
            number_of_components = 1;
        } else if (data_rank == FieldDataRank::VECTOR) {
            number_of_components = 3;
        } else if (data_rank == FieldDataRank::TENSOR) {
            number_of_components = 9;
        } else {
            // Throw an exception to indicate to use another constructor
            throw std::invalid_argument("FieldData: Invalid data type. Use another constructor.");
        }
        if (initial_values_in.size() == 0) {
            initial_values = std::vector<FieldDataType>(number_of_components, 0);
        } else if (initial_values_in.size() != number_of_components) {
            throw std::invalid_argument("FieldData: Size of initial values does not match number of components.");
        } else {
            initial_values.assign(initial_values_in.begin(), initial_values_in.end());
        }
    }

    // Mainly for custom fields
    template <typename T>
    FieldData(std::string name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, size_t number_of_components_in, std::vector<T> initial_values_in = {})
        : name(name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), number_of_components(number_of_components_in), data_type(T{}) {
        if (initial_values_in.size() == 0) {
            initial_values = std::vector<FieldDataType>(number_of_components, 0);
        } else if (initial_values_in.size() != number_of_components) {
            throw std::invalid_argument("FieldData: Size of initial values does not match number of components.");
        } else {
            initial_values.assign(initial_values_in.begin(), initial_values_in.end());
        }
    }

    std::string name;                           ///< The name of the field.
    FieldDataRank data_rank;                    ///< The rank of the field.
    FieldDataTopologyRank data_topology_rank;   ///< The topology rank the field data is associated with.
    size_t number_of_states;                    ///< The number of states of the field.
    size_t number_of_components;                ///< The number of components of the field.
    FieldDataType data_type;                    ///< The data type of the field.
    std::vector<FieldDataType> initial_values;  ///< The initial values of the field. Only used to apply to entire mesh. Not used for individual sets.
};

/**
 * @enum FieldQueryState
 * @brief Enum for field query states.
 */
enum class FieldQueryState { None,
                             N,
                             NP1 };

/**
 * @struct FieldQueryData
 * @brief Represents the data of a field query.
 */
struct FieldQueryData {
    std::string name;                                                   // The name of the field.
    FieldQueryState state;                                              // The state of the field.
    FieldDataTopologyRank topology_rank = FieldDataTopologyRank::NODE;  // The rank of the field.
    FieldDataType data_type = double(0);                                // The data type of the field.
};

/**
 * @brief Function to get default field data.
 * @return A vector of default FieldData.
 */
inline std::vector<FieldData> GetFieldData(bool has_reproducing_kernel = true, bool use_strain_smoothing = true) {
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
        field_data.push_back(FieldData("num_neighbors", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                            // The number of neighbors for the node
        field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<double>{}));        // The neighbors of the node
        field_data.push_back(FieldData("function_values", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, MAX_NODE_NUM_NEIGHBORS, std::vector<double>{}));  // The function values of neighbors at the node
        field_data.push_back(FieldData("kernel_radius", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                            // The kernel radius for the node

        // Cell neighbor data.
        field_data.push_back(FieldData("num_neighbors", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));                                   // The number of neighbors for the cell
        field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<double>{}));               // The neighbors of the cell
        field_data.push_back(FieldData("function_derivatives_x", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<double>{}));  // The function derivatives in x of neighbors at the cell
        field_data.push_back(FieldData("function_derivatives_y", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<double>{}));  // The function derivatives in y of neighbors at the cell
        field_data.push_back(FieldData("function_derivatives_z", FieldDataRank::CUSTOM, FieldDataTopologyRank::ELEMENT, 1, MAX_CELL_NUM_NEIGHBORS, std::vector<double>{}));  // The function derivatives in z of neighbors at the cell
    }
    return field_data;
}

}  // namespace aperi
