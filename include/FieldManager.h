#pragma once

#include <stk_io/IossBridge.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <string>
#include <vector>

#include "LogUtils.h"
#include "MeshData.h"

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
 * @class FieldManager
 * @brief Class for managing fields.
 *
 * This class provides methods for adding fields and setting up fields.
 */
class FieldManager {
   public:
    /**
     * @brief Constructor that takes a vector of FieldData.
     * @param field_data The field data to use.
     */
    explicit FieldManager(std::vector<FieldData> field_data) : m_field_data(field_data) {}

    /**
     * @brief Adds a field to the meta data.
     * @param meta_data The meta data to add the field to.
     * @param field_data The field data to add.
     */
    void AddField(stk::mesh::MetaData& meta_data, const FieldData& field_data) {
        // Create the field
        stk::mesh::FieldBase& vector_field = meta_data.declare_field<double>(stk::topology::NODE_RANK, field_data.name, field_data.number_of_states);

        // Set the field properties
        stk::mesh::put_field_on_entire_mesh_with_initial_value(vector_field, 3, field_data.initial_values.data());
        stk::io::set_field_output_type(vector_field, stk::io::FieldOutputType::VECTOR_3D);

        // Set the field role to TRANSIENT
        stk::io::set_field_role(vector_field, Ioss::Field::TRANSIENT);
    }

    /**
     * @brief Sets up the fields in the meta data.
     * @param meta_data The meta data to set up the fields in.
     */
    void SetupFields(stk::mesh::MetaData& meta_data) {
        // Loop over fields
        for (const auto& field : m_field_data) {
            AddField(meta_data, field);
        }
    }

   private:
    std::vector<FieldData> m_field_data;
};

/**
 * @brief Factory function for creating a FieldManager.
 * @param field_data The field data to use.
 * @return A unique_ptr to a FieldManager.
 */
inline std::unique_ptr<FieldManager> CreateFieldManager(std::vector<FieldData> field_data) {
    return std::make_unique<FieldManager>(field_data);
}

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
