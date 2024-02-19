#pragma once

#include <string>
#include <vector>

namespace aperi {

/**
 * @enum FieldDataType
 * @brief Enum for field data types.
 */
enum class FieldDataType { SCALAR,
                           VECTOR,
                           TENSOR };

/**
 * @struct FieldData
 * @brief Represents the data of a field.
 */
struct FieldData {
    std::string name;                    ///< The name of the field.
    FieldDataType data_type;             ///< The data type of the field.
    int number_of_states;                ///< The number of states of the field.
    std::vector<double> initial_values;  ///< The initial values of the field. Only used to apply to entire mesh. Not used for individual sets.
};

/**
 * @brief Function to get default field data.
 * @return A vector of default FieldData.
 */
inline std::vector<FieldData> GetFieldData() {
    std::vector<FieldData> field_data;
    field_data.push_back({"velocity", FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    field_data.push_back({"displacement", FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    field_data.push_back({"acceleration", FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    field_data.push_back({"force", FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    field_data.push_back({"mass", FieldDataType::VECTOR, 1, {0.0, 0.0, 0.0}});
    return field_data;
}

}  // namespace aperi
