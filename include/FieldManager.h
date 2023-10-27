#pragma once

#include <stk_io/IossBridge.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <string>
#include <vector>

namespace acm {

// Enum for field data types
enum class FieldDataType { SCALAR,
                           VECTOR,
                           TENSOR };

// Struct for field data
struct FieldData {
    std::string name;
    FieldDataType data_type;
    int number_of_states;
    std::vector<double> initial_values;
};

class FieldManager {
   public:
    explicit FieldManager(std::vector<FieldData> field_data) : m_field_data(field_data) {}

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
    void SetupFields(stk::mesh::MetaData& meta_data) {
        // Loop over fields
        for (const auto& field : m_field_data) {
            AddField(meta_data, field);
        }
    }

   private:
    std::vector<FieldData> m_field_data;
};

// Field manager factory
inline std::unique_ptr<FieldManager> CreateFieldManager(std::vector<FieldData> field_data) {
    return std::make_unique<FieldManager>(field_data);
}

// Function to get default field data
inline std::vector<FieldData> GetFieldData() {
    std::vector<FieldData> field_data;
    field_data.push_back({"velocity", FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    field_data.push_back({"displacement", FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    field_data.push_back({"acceleration", FieldDataType::VECTOR, 2, {0.0, 0.0, 0.0}});
    return field_data;
}

}  // namespace acm