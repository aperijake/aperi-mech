#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <vector>

#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

inline stk::mesh::Field<double> *StkGetField(const FieldQueryData &field_query_data, stk::mesh::MetaData *meta_data) {
    stk::mesh::Field<double> *field = meta_data->get_field<double>(stk::topology::NODE_RANK, field_query_data.name);
    if (field == nullptr) {
        throw std::runtime_error("Field " + field_query_data.name + " not found.");
    }
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
    NodeProcessor(const std::vector<FieldQueryData> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
        m_bulk_data = mesh_data->GetBulkData();
        if (sets.size() > 0) {
            stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
            stk::mesh::PartVector parts;
            for (const auto &set : sets) {
                stk::mesh::Part *part = meta_data->get_part(set);
                if (part == nullptr) {
                    throw std::runtime_error("Set " + set + " not found.");
                }
                parts.push_back(part);
            }
            m_selector = stk::mesh::selectUnion(parts);
        } else {
            m_selector = stk::mesh::Selector(m_bulk_data->mesh_meta_data().universal_part());
        }
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::NODE_RANK)) {
            aperi::CoutP0() << "Warning: NodeProcessor selector is empty." << std::endl;
        }

        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        for (const auto &field_query_data : field_query_data_vec) {
            m_fields.push_back(StkGetField(field_query_data, meta_data));
        }
    }

    // Loop over each node then DOF and apply the function
    void for_each_dof(const std::vector<double> &data, void (*func)(size_t iI, const std::vector<double> &data, std::vector<double *> &field_data)) const {
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
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

    // Loop over each node and apply the function
    void for_each_node(const std::vector<double> &data, const std::vector<std::pair<size_t, double>> &components_and_values, void (*func)(size_t iI, const std::vector<double> &data, const std::vector<std::pair<size_t, double>> &component_and_value, std::vector<double *> &field_data)) const {
        // void for_each_node(const std::vector<double> &data, const std::vector<std::pair<size_t, double>>& components_and_values, void (*func)(size_t iI, const std::vector<double> &data, const std::vector<std::pair<size_t, double>>& component_and_value, std::vector<double *> &field_data)) const {
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                size_t i_dof_start = i_node * num_values_per_node;           // Index into the field data
                func(i_dof_start, data, components_and_values, field_data);  // Call the function
            }
        }
    }

    // Parallel communication for a single field
    void CommunicateFieldData(int field_index) {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_fields[field_index]});
    }

    // Fill the field with a value
    void FillField(double value, size_t field_index) {
        stk::mesh::field_fill(value, *m_fields[field_index]);
    }

   private:
    std::vector<DoubleField *> m_fields;  // The fields to process
    stk::mesh::BulkData *m_bulk_data;     // The bulk data object.
    stk::mesh::Selector m_selector;       // The selector for the sets
};

}  // namespace aperi