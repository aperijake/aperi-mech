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
#include "EntityProcessor.h"  // Include EntityProcessor.h to use StkGetField. TODO(jake): Move StkGetField to a separate file.

namespace aperi {

/**
 * @brief A class for processing elements in a mesh.
 *
 * This class provides functionality to process elements in a mesh.
 * It can gather data from fields on the nodes of the elements, apply a function to the gathered data, and scatter the results back to the nodes.
 */
template <size_t N>
class ElementGatherScatterProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    /**
     * @brief Constructs an ElementGatherScatterProcessor object.
     * @param field_query_data_gather_vec An array of FieldQueryData objects representing the fields to gather.
     * @param field_query_data_scatter A FieldQueryData object representing the field to scatter.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param sets A vector of strings representing the sets to process.
     */
    ElementGatherScatterProcessor(const std::array<FieldQueryData, N> field_query_data_gather_vec, const FieldQueryData field_query_data_scatter, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
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
            aperi::CoutP0() << "Warning: ElementGatherScatterProcessor selector is empty." << std::endl;
        }

        // Get the fields to gather and scatter
        for (size_t i = 0; i < N; ++i) {
            m_fields_to_gather[i] = StkGetField(field_query_data_gather_vec[i], meta_data);
            m_ngp_fields_to_gather[i] = &stk::mesh::get_updated_ngp_field<double>(*m_fields_to_gather[i]);
        }
        m_field_to_scatter = StkGetField(field_query_data_scatter, meta_data);
        m_ngp_field_to_scatter = &stk::mesh::get_updated_ngp_field<double>(*m_field_to_scatter);
    }

    // Loop over each element and apply the function
    template <size_t NumNodes, typename Func>
    void for_each_element_gather_scatter_nodal_data(const Func &func) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        Kokkos::Array<NgpDoubleField, N> ngp_fields_to_gather;
        for (size_t i = 0; i < N; ++i) {
            ngp_fields_to_gather[i] = *m_ngp_fields_to_gather[i];
        }
        auto ngp_field_to_scatter = *m_ngp_field_to_scatter;
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                // assert(nodes.size() == NumNodes);
                size_t num_nodes = nodes.size();

                // Set up the field data to gather
                Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, N> field_data_to_gather;

                // Set up the results matrix
                Eigen::Matrix<double, NumNodes, 3> results_to_scatter;

                // Gather the field data for each node
                for (size_t f = 0; f < N; ++f) {
                    for (size_t i = 0; i < num_nodes; ++i) {
                        for (size_t j = 0; j < 3; ++j) {
                            field_data_to_gather[f](i, j) = ngp_fields_to_gather[f](ngp_mesh.fast_mesh_index(nodes[i]), j);
                        }
                    }
                }

                // Apply the function to the gathered data
                func(field_data_to_gather, results_to_scatter, num_nodes);

                // Scatter the force to the nodes
                for (size_t i = 0; i < num_nodes; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        Kokkos::atomic_add(&ngp_field_to_scatter(ngp_mesh.fast_mesh_index(nodes[i]), j), results_to_scatter(i, j));
                    }
                }
            });
    }

    // Loop over each element and apply the function on host data
    template <size_t NumNodes, typename Func>
    void for_each_element_host_gather_scatter_nodal_data(const Func &func) {
        // Set up the field data to gather
        Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, N> field_data_to_gather;
        for (size_t f = 0; f < N; ++f) {
            field_data_to_gather[f].resize(NumNodes, 3);
        }

        // Set up the results matrix
        Eigen::Matrix<double, NumNodes, 3> results_to_scatter;
        results_to_scatter.resize(NumNodes, 3);

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            // Loop over the elements
            for (auto &&mesh_element : *bucket) {
                // Get the element's nodes
                stk::mesh::Entity const *element_nodes = m_bulk_data->begin_nodes(mesh_element);

                // Gather the coordinates, displacements, and velocities of the nodes
                for (size_t f = 0; f < N; ++f) {
                    for (size_t i = 0; i < NumNodes; ++i) {
                        double *element_node_data = stk::mesh::field_data(*m_fields_to_gather[f], element_nodes[i]);
                        for (size_t j = 0; j < 3; ++j) {
                            field_data_to_gather[f](i, j) = element_node_data[j];
                        }
                    }
                }
                // Apply the function to the gathered data
                func(field_data_to_gather, results_to_scatter);

                // Scatter the force to the nodes
                for (size_t i = 0; i < NumNodes; ++i) {
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

    double GetNumElements() {
        return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

    std::shared_ptr<aperi::MeshData> GetMeshData() {
        return m_mesh_data;
    }

    std::vector<std::string> GetSets() {
        return m_sets;
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;             // The mesh data object.
    std::vector<std::string> m_sets;                          // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                         // The bulk data object.
    stk::mesh::Selector m_selector;                           // The selector
    stk::mesh::NgpMesh m_ngp_mesh;                            // The ngp mesh object.
    std::array<DoubleField *, N> m_fields_to_gather;          // The fields to gather
    DoubleField *m_field_to_scatter;                          // The field to scatter
    Kokkos::Array<NgpDoubleField *, N> m_ngp_fields_to_gather;  // The ngp fields to gather
    NgpDoubleField *m_ngp_field_to_scatter;                     // The ngp field to scatter
};

class MeshNeighborSearchProcessor {
    typedef stk::mesh::Field<double> DoubleField; // TODO(jake): Change these to unsigned. Need to update FieldData to handle.
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    MeshNeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
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
            aperi::CoutP0() << "Warning: MeshNeighborSearchProcessor selector is empty." << std::endl;
        }

        m_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None}, meta_data, stk::topology::ELEMENT_RANK);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None}, meta_data, stk::topology::ELEMENT_RANK);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbors_field);
    }

    // Loop over each element and add the element's nodes to the neighbors field
    void add_element_nodes() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_neighbors_field = *m_ngp_num_neighbors_field;
        auto ngp_neighbors_field = *m_ngp_neighbors_field;
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                double num_nodes = nodes.size();

                ngp_num_neighbors_field(elem_index, 0) = num_nodes;

                for (size_t i = 0; i < num_nodes; ++i) {
                    ngp_neighbors_field(elem_index, i) = (double)nodes[i].local_offset();
                }
            });
    }

    double GetNumElements() {
        return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;             // The mesh data object.
    std::vector<std::string> m_sets;                          // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                         // The bulk data object.
    stk::mesh::Selector m_selector;                           // The selector
    stk::mesh::NgpMesh m_ngp_mesh;                            // The ngp mesh object.
    DoubleField *m_num_neighbors_field;                       // The number of neighbors field
    DoubleField *m_neighbors_field;                           // The neighbors field
    NgpDoubleField *m_ngp_num_neighbors_field;                // The ngp number of neighbors field
    NgpDoubleField *m_ngp_neighbors_field;                    // The ngp neighbors field
};

}  // namespace aperi