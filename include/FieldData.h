#pragma once

#include <string>
#include <vector>

#include "Constants.h"

namespace aperi {

/**
 * @enum FieldDataType
 * @brief Enum for field data types.
 */
enum class FieldDataType { SCALAR,
                           VECTOR,
                           TENSOR,
                           CUSTOM };

/**
 * @enum FieldDataRank
 * @brief Enum for field data ranks.
 */
enum class FieldDataRank { NODE,
                           ELEMENT };

/**
 * @struct FieldData
 * @brief Represents the data of a field.
 */
struct FieldData {
    // For non-custom fields
    FieldData(std::string name_in, FieldDataType data_type_in, FieldDataRank data_rank_in, size_t number_of_states_in, std::vector<double> initial_values_in = {})
        : name(name_in), data_type(data_type_in), data_rank(data_rank_in), number_of_states(number_of_states_in), initial_values(initial_values_in) {
        if (data_type == FieldDataType::SCALAR) {
            number_of_components = 1;
        } else if (data_type == FieldDataType::VECTOR) {
            number_of_components = 3;
        } else if (data_type == FieldDataType::TENSOR) {
            number_of_components = 9;
        } else {
            // Throw an exception to indicate to use another constructor
            throw std::invalid_argument("FieldData: Invalid data type. Use another constructor.");
        }
        if (initial_values_in.size() == 0) {
            initial_values = std::vector<double>(number_of_components, 0.0);
        }
        // Throw an exception if the number of components and the size of the initial values do not match
        if (number_of_components != initial_values.size()) {
            throw std::invalid_argument("FieldData: The number of components and the size of the initial values do not match.");
        }
    }

    // Mainly for custom fields
    FieldData(std::string name_in, FieldDataType data_type_in, FieldDataRank data_rank_in, size_t number_of_states_in, size_t number_of_components_in, std::vector<double> initial_values_in = {})
        : name(name_in), data_type(data_type_in), data_rank(data_rank_in), number_of_states(number_of_states_in), number_of_components(number_of_components_in), initial_values(initial_values_in) {
        if (initial_values_in.size() == 0) {
            initial_values = std::vector<double>(number_of_components, 0.0);
        }
        if (number_of_components != initial_values.size()) {
            throw std::invalid_argument("FieldData: The number of components and the size of the initial values do not match.");
        }
    }

    std::string name;                    ///< The name of the field.
    FieldDataType data_type;             ///< The data type of the field.
    FieldDataRank data_rank;             ///< The rank of the field.
    size_t number_of_states;             ///< The number of states of the field.
    size_t number_of_components;         ///< The number of components of the field.
    std::vector<double> initial_values;  ///< The initial values of the field. Only used to apply to entire mesh. Not used for individual sets.
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
    std::string name;                          // The name of the field.
    FieldQueryState state;                     // The state of the field.
    FieldDataRank rank = FieldDataRank::NODE;  // The rank of the field.
};

/**
 * @brief Function to get default field data.
 * @return A vector of default FieldData.
 */
inline std::vector<FieldData> GetFieldData() {
    std::vector<FieldData> field_data;
    field_data.push_back(FieldData("velocity", FieldDataType::VECTOR, FieldDataRank::NODE, 2));
    field_data.push_back(FieldData("displacement", FieldDataType::VECTOR, FieldDataRank::NODE, 2));
    field_data.push_back(FieldData("acceleration", FieldDataType::VECTOR, FieldDataRank::NODE, 2));
    field_data.push_back(FieldData("force", FieldDataType::VECTOR, FieldDataRank::NODE, 2));
    field_data.push_back(FieldData("mass", FieldDataType::VECTOR, FieldDataRank::NODE, 1));

    field_data.push_back(FieldData("num_neighbors", FieldDataType::SCALAR, FieldDataRank::ELEMENT, 1));
    field_data.push_back(FieldData("volume", FieldDataType::SCALAR, FieldDataRank::ELEMENT, 1));
    field_data.push_back(FieldData("neighbors", FieldDataType::CUSTOM, FieldDataRank::ELEMENT, 1, max_num_neighbors));
    field_data.push_back(FieldData("function_derivatives_x", FieldDataType::CUSTOM, FieldDataRank::ELEMENT, 1, max_num_neighbors));
    field_data.push_back(FieldData("function_derivatives_y", FieldDataType::CUSTOM, FieldDataRank::ELEMENT, 1, max_num_neighbors));
    field_data.push_back(FieldData("function_derivatives_z", FieldDataType::CUSTOM, FieldDataRank::ELEMENT, 1, max_num_neighbors));
    return field_data;
}

}  // namespace aperi
