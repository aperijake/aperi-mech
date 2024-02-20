#pragma once

#include <Eigen/Dense>
#include <array>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_topology/topology.hpp>

#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"
#include "NodeProcessor.h"  // Include NodeProcessor.h to use StkGetField. TODO(jake): Move StkGetField to a separate file.

namespace aperi {

template <size_t N>
class ElementProcessor {
    typedef stk::mesh::Field<double> DoubleField;

   public:
    ElementProcessor(const std::array<FieldQueryData, N> field_query_data_gather_vec, const FieldQueryData field_query_data_scatter, size_t nodes_per_element, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_num_nodes_per_element(nodes_per_element), m_bulk_data(mesh_data->GetBulkData()) {
        // Set the selector
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        if (sets.size() > 0) {
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
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: ElementProcessor selector is empty." << std::endl;
        }

        // Get the fields to gather and scatter
        for (size_t i = 0; i < N; ++i) {
            m_fields_to_gather[i] = StkGetField(field_query_data_gather_vec[i], meta_data);
        }
        m_field_to_scatter = StkGetField(field_query_data_scatter, meta_data);
    }

    // Loop over each element and apply the function
    template <typename Func>
    void for_each_element(const Func &func) {
        // Set up the field data to gather
        std::array<Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3>, N> field_data_to_gather;
        for (size_t f = 0; f < N; ++f) {
            field_data_to_gather[f].resize(m_num_nodes_per_element, 3);
        }

        // Set up the results matrix
        Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> results_to_scatter;
        results_to_scatter.resize(m_num_nodes_per_element, 3);

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            // Loop over the elements
            for (auto &&mesh_element : *bucket) {
                // Get the element's nodes
                stk::mesh::Entity const *element_nodes = m_bulk_data->begin_nodes(mesh_element);

                // Gather the coordinates, displacements, and velocities of the nodes
                for (size_t f = 0; f < N; ++f) {
                    for (size_t i = 0; i < m_num_nodes_per_element; ++i) {
                        double *element_node_data = stk::mesh::field_data(*m_fields_to_gather[f], element_nodes[i]);
                        for (size_t j = 0; j < 3; ++j) {
                            field_data_to_gather[f](i, j) = element_node_data[j];
                        }
                    }
                }
                // Apply the function to the gathered data
                func(field_data_to_gather, results_to_scatter);

                // Scatter the force to the nodes
                for (size_t i = 0; i < m_num_nodes_per_element; ++i) {
                    double *element_node_data = stk::mesh::field_data(*m_field_to_scatter, element_nodes[i]);
                    for (size_t j = 0; j < 3; ++j) {
                        element_node_data[j] += results_to_scatter(i, j);
                    }
                }
            }
        }
    }

   private:
    size_t m_num_nodes_per_element;                   ///< The number of nodes per element
    stk::mesh::BulkData *m_bulk_data;                 ///< The bulk data object.
    stk::mesh::Selector m_selector;                   ///< The selector
    std::array<DoubleField *, N> m_fields_to_gather;  ///< The fields to gather
    DoubleField *m_field_to_scatter;                  ///< The field to scatter
};

}  // namespace aperi