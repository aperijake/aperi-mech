#pragma once

#include <stk_io/IossBridge.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
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
 * @brief Struct for field data.
 */
struct FieldData {
    std::string name;
    FieldDataType data_type;
    int number_of_states;
    std::vector<double> initial_values;
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
        // Define the field data type
        typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorFieldType;

        // Create the field
        VectorFieldType& vector_field = meta_data.declare_field<VectorFieldType>(stk::topology::NODE_RANK, field_data.name, field_data.number_of_states);

        // Set the field properties
        stk::mesh::put_field_on_entire_mesh_with_initial_value(vector_field, field_data.initial_values.data());

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