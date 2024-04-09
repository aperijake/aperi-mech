#pragma once

#include <Eigen/Dense>
#include <array>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
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

    // Get the sum of the field to scatter
    double GetFieldToScatterSum() {
        double field_to_scatter_sum = 0.0;
        stk::mesh::field_asum(field_to_scatter_sum, *m_field_to_scatter, m_selector, m_bulk_data->parallel());
        return field_to_scatter_sum;
    }

   private:
    size_t m_num_nodes_per_element;                   ///< The number of nodes per element
    stk::mesh::BulkData *m_bulk_data;                 ///< The bulk data object.
    stk::mesh::Selector m_selector;                   ///< The selector
    std::array<DoubleField *, N> m_fields_to_gather;  ///< The fields to gather
    DoubleField *m_field_to_scatter;                  ///< The field to scatter
};

template <size_t N>
class ElementProcessorStkNgp {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    ElementProcessorStkNgp(const std::array<FieldQueryData, N> field_query_data_gather_vec, const FieldQueryData field_query_data_scatter, size_t nodes_per_element, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_num_nodes_per_element(nodes_per_element) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        // Set the selector. TODO(jake) Move this to a separate function. It is the same as in NodeProcessor.
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
            m_ngp_fields_to_gather[i] = StkGetNgpField(m_fields_to_gather[i]);
        }
        m_field_to_scatter = StkGetField(field_query_data_scatter, meta_data);
        m_ngp_field_to_scatter = StkGetNgpField(m_field_to_scatter);
    }

    // Loop over each element and apply the function
    template <typename Func>
    void for_each_element(const Func &func) {
        size_t num_nodes_per_element = m_num_nodes_per_element;
        auto ngp_mesh = m_ngp_mesh;
        auto ngp_fields_to_gather = m_ngp_fields_to_gather;
        auto ngp_field_to_scatter = m_ngp_field_to_scatter;
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Set up the field data to gather
                Kokkos::Array<Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3>, N> field_data_to_gather;
                for (size_t f = 0; f < N; ++f) {
                    field_data_to_gather[f].resize(num_nodes_per_element, 3);
                }

                // Set up the results matrix
                Kokkos::Array<Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3>, 1> results_to_scatter;
                results_to_scatter[0].resize(num_nodes_per_element, 3);

                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                assert(nodes.size() == num_nodes_per_element);

                // Gather the field data for each node
                for (size_t f = 0; f < N; ++f) {
                    for (size_t i = 0; i < num_nodes_per_element; ++i) {
                        for (size_t j = 0; j < 3; ++j) {
                            field_data_to_gather[f](i, j) = ngp_fields_to_gather[f](ngp_mesh.fast_mesh_index(nodes[i]), j);
                        }
                    }
                }

                // Apply the function to the gathered data
                func(field_data_to_gather, results_to_scatter[0]);
                // Scatter the force to the nodes
                for (size_t i = 0; i < num_nodes_per_element; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        ngp_field_to_scatter(ngp_mesh.fast_mesh_index(nodes[i]), j) += results_to_scatter[0](i, j);
                    }
                }
            });
    }

    // Loop over each element and apply the function
    template <typename Func>
    void for_each_element_debug(const Func &func) {
        printf("for_each_element_debug\n");
        // STK Question: explain capturing in for_each_entity_run. Doesn't like using member variables inside. Implicit capturing of this. Other variables are captured as const.
        size_t num_nodes_per_element = m_num_nodes_per_element;
        auto ngp_mesh = m_ngp_mesh;
        auto ngp_fields_to_gather = m_ngp_fields_to_gather;
        auto ngp_field_to_scatter = m_ngp_field_to_scatter;
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            m_ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                printf("start for_each_entity_run\n");

                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                assert(nodes.size() == num_nodes_per_element);

                // Set up the field data to gather
                Kokkos::Array<Eigen::Matrix<double, 4, 3>, N> field_data_to_gather;

                // Set up the results matrix
                Kokkos::Array<Eigen::Matrix<double, 4, 3>, 1> results_to_scatter;

                // Gather the field data for each node
                for (size_t f = 0; f < N; ++f) {
                    for (size_t i = 0; i < num_nodes_per_element; ++i) {
                        for (size_t j = 0; j < 3; ++j) {
                            field_data_to_gather[f](i, j) = ngp_fields_to_gather[f](ngp_mesh.fast_mesh_index(nodes[i]), j);
                        }
                    }
                }

                // Apply the function to the gathered data
                func(field_data_to_gather, results_to_scatter[0]);

                // Print the results
                printf("results_to_scatter[0](0,0): %f\n", results_to_scatter[0](0, 0));

                // Scatter the force to the nodes
                for (size_t i = 0; i < num_nodes_per_element; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        ngp_field_to_scatter(ngp_mesh.fast_mesh_index(nodes[i]), j) -= results_to_scatter[0](i, j);
                    }
                }

                printf("end for_each_entity_run\n");
            });
    }

    // Loop over each element and apply the function on host data
    template <typename Func>
    void for_each_element_host(const Func &func) {
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

    // Get the sum of the field to scatter
    double GetFieldToScatterSum() {
        double field_to_scatter_sum = 0.0;
        stk::mesh::field_asum(field_to_scatter_sum, *m_field_to_scatter, m_selector, m_bulk_data->parallel());
        return field_to_scatter_sum;
    }

   private:
    size_t m_num_nodes_per_element;                           // The number of nodes per element
    stk::mesh::BulkData *m_bulk_data;                         // The bulk data object.
    stk::mesh::Selector m_selector;                           // The selector
    stk::mesh::NgpMesh m_ngp_mesh;                            // The ngp mesh object.
    std::array<DoubleField *, N> m_fields_to_gather;          // The fields to gather
    DoubleField *m_field_to_scatter;                          // The field to scatter
    Kokkos::Array<NgpDoubleField, N> m_ngp_fields_to_gather;  // The ngp fields to gather
    NgpDoubleField m_ngp_field_to_scatter;                   // The ngp field to scatter
};

}  // namespace aperi