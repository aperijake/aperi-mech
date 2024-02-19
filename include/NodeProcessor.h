#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <vector>

#include "MeshData.h"

namespace aperi {

enum class FieldQueryState { None,
                             N,
                             NP1 };

struct FieldQueryData {
    std::string name;       // The name of the field.
    FieldQueryState state;  // The state of the field.
};

inline stk::mesh::Field<double>* StkGetField(const FieldQueryData& field_query_data, stk::mesh::MetaData *meta_data) {
    stk::mesh::Field<double> *field = meta_data->get_field<double>(stk::topology::NODE_RANK, field_query_data.name);
    stk::mesh::FieldState state = stk::mesh::StateNone;
    if (field_query_data.state == FieldQueryState::N) {
        state = stk::mesh::StateN;
    } else if (field_query_data.state == FieldQueryState::NP1) {
        state = stk::mesh::StateNP1;
    } else {
        if (field_query_data.state != FieldQueryState::None) {
            throw std::runtime_error("Invalid field state");
        }
    }   
    return &field->field_of_state(state);
}

class NodeProcessor {
    typedef stk::mesh::Field<double> DoubleField;

   public:
    NodeProcessor(const std::vector<FieldQueryData> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data){
        m_bulk_data = mesh_data->GetBulkData();
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        for (const auto &field_query_data : field_query_data_vec) {
            m_fields.push_back(StkGetField(field_query_data, meta_data));
        }
    }

    // Loop over each node and apply the function
    void for_each_dof(const std::vector<double> &data, void (*func)(size_t iI, const std::vector<double> &data, std::vector<double *> &field_data)) const {
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_bulk_data->buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Loop over each component of the node
                for (size_t i = 0; i < num_values_per_node; i++) {
                    size_t iI = i_node * num_values_per_node + i;  // Index into the field data
                    func(iI, data, field_data);                    // Call the function
                }
            }
        }
    }

    // Parallel communication for a single field
    void communicate_field_data(int field_index) {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_fields[field_index]});
    }

   private:
    std::vector<DoubleField *> m_fields;  // The fields to process
    stk::mesh::BulkData *m_bulk_data;           // The bulk data object.
};

}  // namespace aperi