#pragma once

#include <stk_io/IossBridge.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <string>
#include <vector>

#include "LogUtils.h"

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

    /**
     * @brief Sets the initial field values for a set.
     * @param meta_data The meta data to set the initial field values in.
     * @param set_name The name of the set to set the initial field values for.
     * @param field_name The name of the field to set the initial field values for.
     * @param values The values to set the initial field values to.
     * @return 0 for success, 1 for failure to find the field, 2 for failure to find the part.
     * @note This function is hard coded to a vector field. Fix this.
     * @note This function is hard coded to a node rank. Fix this.
     */
    int SetInitialFieldValues(stk::mesh::MetaData& meta_data, const std::string& set_name, const std::string& field_name, const std::vector<std::pair<size_t, double>>& components_and_values) {
        // TODO(jake) This is hard coded to a vector field on node field. Fix this.
        typedef stk::mesh::Field<double> DoubleField;

        // Get the field
        DoubleField* field = meta_data.get_field<double>(stk::topology::NODE_RANK, field_name.c_str());
        // Return 1 for failure if the field is not found
        if (field == nullptr) {
            return 1;
        }

        stk::mesh::Part* set_part = meta_data.get_part(set_name);
        // Return 2 for failure if the part is not found
        if (set_part == nullptr) {
            return 2;
        }
        stk::mesh::Selector set_selector(*set_part);
        // Warn if the selector is empty.
        if (set_selector.is_empty(stk::topology::NODE_RANK)) {
            aperi::CoutP0() << "Warning: Initial Condition Set " << set_name << " is empty." << std::endl;
        }

        // Loop over all the buckets
        for (stk::mesh::Bucket* bucket : set_selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field values for the bucket
            double* field_values_for_bucket = stk::mesh::field_data(*field, *bucket);
            size_t num_values_per_node = 3;
            for (size_t i_node = 0, e = bucket->size(); i_node < e; i_node++) {
                assert(num_values_per_node == stk::mesh::field_scalars_per_entity(*field, *bucket));
                // Set the field values for the node
                for (size_t i = 0, e = components_and_values.size(); i < e; ++i) {
                    size_t iI = i_node * num_values_per_node + components_and_values[i].first;
                    field_values_for_bucket[iI] = components_and_values[i].second;
                }
            }
        }
        return 0;
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
