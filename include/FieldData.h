#pragma once

#include <stdexcept>
#include <string>
#include <variant>
#include <vector>

#include "Constants.h"

namespace aperi {

using FieldDataType = std::variant<uint64_t, double>;

/**
 * @enum FieldDataRank
 * @brief Enum for field data ranks.
 */
enum class FieldDataRank { SCALAR,
                           VECTOR,
                           TENSOR,
                           CUSTOM };

size_t FieldDataRankToNumberComponents(FieldDataRank data_rank);

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
        : name(name_in), output_name(name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), data_type(T{}) {
        number_of_components = FieldDataRankToNumberComponents(data_rank);
        AssignInitialValues(initial_values_in);
    }

    template <typename T>
    FieldData(std::string name_in, std::string output_name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, std::vector<T> initial_values_in = {})
        : name(name_in), output_name(output_name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), data_type(T{}) {
        number_of_components = FieldDataRankToNumberComponents(data_rank);
        AssignInitialValues(initial_values_in);
    }

    // Mainly for custom fields
    template <typename T>
    FieldData(std::string name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, size_t number_of_components_in, std::vector<T> initial_values_in = {})
        : name(name_in), output_name(name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), number_of_components(number_of_components_in), data_type(T{}) {
        AssignInitialValues(initial_values_in);
    }

    template <typename T>
    FieldData(std::string name_in, std::string output_name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, size_t number_of_components_in, std::vector<T> initial_values_in = {})
        : name(name_in), output_name(output_name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), number_of_components(number_of_components_in), data_type(T{}) {
        AssignInitialValues(initial_values_in);
    }

    template <typename T>
    void AssignInitialValues(const std::vector<T> &initial_values_in) {
        initial_values.resize(number_of_components);
        if (initial_values_in.size() == 0) {
            for (size_t i = 0; i < number_of_components; ++i) {
                initial_values[i] = T{};
            }
        } else if (initial_values_in.size() != number_of_components) {
            throw std::invalid_argument("FieldData: Size of initial values does not match number of components.");
        } else {
            for (size_t i = 0; i < number_of_components; ++i) {
                initial_values[i] = initial_values_in[i];
            }
        }
    }

    std::string name;                           ///< The name of the field.
    std::string output_name;                    ///< The name of the field in the output file.
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
template <typename T = double>
struct FieldQueryData {
    std::string name;                                                   // The name of the field.
    FieldQueryState state;                                              // The state of the field.
    FieldDataTopologyRank topology_rank = FieldDataTopologyRank::NODE;  // The rank of the field.
};

/**
 * @brief Function to get default field data.
 * @return A vector of default FieldData.
 */
std::vector<FieldData> GetFieldData(bool use_strain_smoothing = true);

}  // namespace aperi
