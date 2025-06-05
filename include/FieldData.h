#pragma once

#include <cstdint>
#include <stdexcept>
#include <string>
#include <variant>
#include <vector>

#include "Constants.h"

namespace aperi {

template <typename>
inline constexpr bool always_false_v = false;

using FieldDataType = std::variant<Unsigned, unsigned long, double>;

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
                                   ELEMENT,
                                   FACE };

/**
 * @struct FieldData
 * @brief Represents the data of a field.
 */
struct FieldData {
    template <typename T>
    static constexpr size_t GetVariantIndex() {
        if constexpr (std::is_same_v<T, Unsigned>)
            return 0;
        else if constexpr (std::is_same_v<T, unsigned long>)
            return 1;
        else if constexpr (std::is_same_v<T, double>)
            return 2;
        else
            static_assert(always_false_v<T>, "Unsupported type for FieldData");
    }

    template <typename T>
    FieldData(std::string name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, std::vector<T> initial_values_in, bool output_in = true)
        : name(name_in), output_name(name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), data_type(std::in_place_index<GetVariantIndex<T>()>, T{}), output(output_in) {
        number_of_components = FieldDataRankToNumberComponents(data_rank);
        AssignInitialValues(initial_values_in);
    }

    template <typename T>
    FieldData(std::string name_in, std::string output_name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, std::vector<T> initial_values_in, bool output_in = true)
        : name(name_in), output_name(output_name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), data_type(std::in_place_index<GetVariantIndex<T>()>, T{}), output(output_in) {
        number_of_components = FieldDataRankToNumberComponents(data_rank);
        AssignInitialValues(initial_values_in);
    }

    // Mainly for custom fields
    template <typename T>
    FieldData(std::string name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, size_t number_of_components_in, std::vector<T> initial_values_in, bool output_in = true)
        : name(name_in), output_name(name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), number_of_components(number_of_components_in), data_type(std::in_place_index<GetVariantIndex<T>()>, T{}), output(output_in) {
        AssignInitialValues(initial_values_in);
    }

    template <typename T>
    FieldData(std::string name_in, std::string output_name_in, FieldDataRank data_rank_in, FieldDataTopologyRank data_topology_rank_in, size_t number_of_states_in, size_t number_of_components_in, std::vector<T> initial_values_in, bool output_in = true)
        : name(name_in), output_name(output_name_in), data_rank(data_rank_in), data_topology_rank(data_topology_rank_in), number_of_states(number_of_states_in), number_of_components(number_of_components_in), data_type(std::in_place_index<GetVariantIndex<T>()>, T{}), output(output_in) {
        AssignInitialValues(initial_values_in);
    }

    template <typename T>
    void AssignInitialValues(const std::vector<T> &initial_values_in) {
        initial_values.resize(number_of_components);
        if (initial_values_in.size() == 0) {
            for (size_t i = 0; i < number_of_components; ++i) {
                initial_values[i] = FieldDataType(std::in_place_index<GetVariantIndex<T>()>, T{});
            }
        } else if (initial_values_in.size() != number_of_components) {
            throw std::invalid_argument("FieldData: Size of initial values does not match number of components.");
        } else {
            for (size_t i = 0; i < number_of_components; ++i) {
                initial_values[i] = FieldDataType(std::in_place_index<GetVariantIndex<T>()>, initial_values_in[i]);
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
    bool output = true;                         ///< Whether to output the field.
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
 * @tparam T The data type of the field.
 * @todo Separate what is needed for creating fields and what is needed for querying fields.
 */
template <typename T = double>
struct FieldQueryData {
    std::string name;                                                   // The name of the field.
    FieldQueryState state;                                              // The state of the field.
    FieldDataTopologyRank topology_rank = FieldDataTopologyRank::NODE;  // The rank of the field.
    size_t number_of_components = 3;                                    // The number of components of the field. Not relevant for most queries, I think it is just for creating fields.
};

/**
 * @brief Function to get default field data.
 * @return A vector of default FieldData.
 */
std::vector<FieldData> GetFieldData(bool uses_generalized_fields, bool use_strain_smoothing, aperi::LagrangianFormulationType formulation_type, bool output_coefficients, bool add_debug_fields = false);

}  // namespace aperi
