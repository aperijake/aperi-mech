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

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief A class for processing elements in a mesh.
 *
 * This class provides functionality to process elements in a mesh.
 * It can gather data from fields on the nodes of the elements, apply a function to the gathered data, and scatter the results back to the nodes.
 */
template <size_t NumFields, bool UsePrecomputedDerivatives = false>
class ElementGatherScatterProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

   public:
    /**
     * @brief Constructs an ElementGatherScatterProcessor object.
     * @param field_query_data_gather_vec An array of FieldQueryData objects representing the fields to gather.
     * @param field_query_data_scatter A FieldQueryData object representing the field to scatter.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param sets A vector of strings representing the sets to process.
     */
    ElementGatherScatterProcessor(const std::vector<FieldQueryData<double>> &field_query_data_gather_vec, const FieldQueryData<double> field_query_data_scatter, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: ElementGatherScatterProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & meta_data->locally_owned_part();

        // Get the fields to gather and scatter
        for (size_t i = 0; i < NumFields; ++i) {
            m_fields_to_gather[i] = StkGetField(field_query_data_gather_vec[i], meta_data);
            m_ngp_fields_to_gather[i] = &stk::mesh::get_updated_ngp_field<double>(*m_fields_to_gather[i]);
        }
        m_field_to_scatter = StkGetField(field_query_data_scatter, meta_data);
        m_ngp_field_to_scatter = &stk::mesh::get_updated_ngp_field<double>(*m_field_to_scatter);

        if constexpr (UsePrecomputedDerivatives) {
            // Get the element volume field
            m_element_volume = StkGetField(FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_element_volume = &stk::mesh::get_updated_ngp_field<double>(*m_element_volume);

            // Get the function derivatives fields
            std::vector<std::string> element_function_derivatives_field_names = {"function_derivatives_x", "function_derivatives_y", "function_derivatives_z"};
            for (size_t i = 0; i < 3; ++i) {
                m_element_function_derivatives_fields[i] = StkGetField(FieldQueryData<double>{element_function_derivatives_field_names[i], FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
                m_ngp_element_function_derivatives_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_element_function_derivatives_fields[i]);
            }

            // Get the node function values field
            m_node_function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
            m_ngp_node_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_node_function_values_field);

            // Get the element number of neighbors field
            m_num_element_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_num_element_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_num_element_neighbors_field);

            // Get the element neighbors field
            m_element_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_element_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_element_neighbors_field);

            // Get the node number of neighbors field
            m_num_node_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
            m_ngp_num_node_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_num_node_neighbors_field);

            // Get the node neighbors field
            m_node_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
            m_ngp_node_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_node_neighbors_field);
        }
    }

    // Loop over each element and apply the function
    template <size_t NumNodes, typename Func>
    void for_each_element_gather_scatter_nodal_data_not_precomputed(Func func) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        Kokkos::Array<NgpDoubleField, NumFields> ngp_fields_to_gather;
        for (size_t i = 0; i < NumFields; ++i) {
            ngp_fields_to_gather[i] = *m_ngp_fields_to_gather[i];
        }
        auto ngp_field_to_scatter = *m_ngp_field_to_scatter;
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                // assert(nodes.size() == NumNodes);
                size_t num_nodes = nodes.size();

                // Set up the field data to gather
                Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, NumFields> field_data_to_gather;

                // Set up the results matrix
                Eigen::Matrix<double, NumNodes, 3> results_to_scatter;

                // Gather the field data for each node
                for (size_t f = 0; f < NumFields; ++f) {
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

    // Loop over each element and apply the function
    template <size_t NumNodes, typename Func>
    void for_each_element_gather_scatter_nodal_data_precomputed(Func func) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        Kokkos::Array<NgpDoubleField, NumFields> ngp_fields_to_gather;
        for (size_t i = 0; i < NumFields; ++i) {
            ngp_fields_to_gather[i] = *m_ngp_fields_to_gather[i];
        }

        auto ngp_field_to_scatter = *m_ngp_field_to_scatter;

        auto ngp_element_volume = *m_ngp_element_volume;

        Kokkos::Array<NgpDoubleField, 3> ngp_element_function_derivatives_fields;
        for (size_t i = 0; i < 3; ++i) {
            ngp_element_function_derivatives_fields[i] = *m_ngp_element_function_derivatives_fields[i];
        }

        auto ngp_num_element_neighbors_field = *m_ngp_num_element_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the number of neighbors
                size_t num_nodes = ngp_num_element_neighbors_field(elem_index, 0);

                // Get the neighbors
                // Kokkos::Profiling::pushRegion("get_neighbors");
                Kokkos::Array<stk::mesh::FastMeshIndex, NumNodes> nodes;
                for (size_t i = 0; i < num_nodes; ++i) {
                    // Reverse the order of the neighbors. Later neighbors should have smaller function values. Want to sum smaller values first for better parallel consistency.
                    stk::mesh::Entity entity(ngp_element_neighbors_field(elem_index, num_nodes - i - 1));  // Reverse the order of the neighbors
                    nodes[i] = ngp_mesh.fast_mesh_index(entity);
                }
                // Kokkos::Profiling::popRegion();

                // Build the B matrix
                // Kokkos::Profiling::pushRegion("build_B");
                Eigen::Matrix<double, NumNodes, 3> B;
                for (size_t j = 0; j < 3; ++j) {
                    for (size_t i = 0; i < num_nodes; ++i) {
                        B(i, j) = ngp_element_function_derivatives_fields[j](elem_index, num_nodes - i - 1);  // Reverse the order of the neighbors
                    }
                }
                // Kokkos::Profiling::popRegion();

                // Set up the field data to gather
                // Kokkos::Profiling::pushRegion("gather_data");
                Kokkos::Array<Eigen::Matrix<double, 3, 3>, NumFields> field_data_to_gather_gradient;

                // Set up the results matrix
                Eigen::Matrix<double, NumNodes, 3> results_to_scatter;

                // Gather the field data for each node
                for (size_t f = 0; f < NumFields; ++f) {
                    field_data_to_gather_gradient[f].fill(0.0);
                    for (size_t i = 0; i < 3; ++i) {
                        for (size_t k = 0; k < num_nodes; ++k) {
                            double field_data_ki = ngp_fields_to_gather[f](nodes[k], i);
                            field_data_to_gather_gradient[f].row(i) += field_data_ki * B.row(k);
                        }
                    }
                }
                // Kokkos::Profiling::popRegion();

                // Get the element volume
                // Kokkos::Profiling::pushRegion("get_volume");
                double element_volume = ngp_element_volume(elem_index, 0);
                // Kokkos::Profiling::popRegion();

                // Apply the function to the gathered data
                // Kokkos::Profiling::pushRegion("apply_function");
                func(field_data_to_gather_gradient, results_to_scatter, B, element_volume, num_nodes);
                // Kokkos::Profiling::popRegion();

                // Scatter the force to the nodes
                // Kokkos::Profiling::pushRegion("scatter_data");
                for (size_t j = 0; j < 3; ++j) {
                    for (size_t i = 0; i < num_nodes; ++i) {
                        Kokkos::atomic_add(&ngp_field_to_scatter(nodes[i], j), results_to_scatter(i, j));
                    }
                }
                // Kokkos::Profiling::popRegion();
            });
    }

    // Loop over each element and apply the function
    template <size_t NumCellNodes, size_t NumNodeNeighbors, typename Func>
    void for_each_element_gather_scatter_nodal_data_precomputed_2(Func func) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp gather fields
        Kokkos::Array<NgpDoubleField, NumFields> ngp_fields_to_gather;
        for (size_t i = 0; i < NumFields; ++i) {
            ngp_fields_to_gather[i] = *m_ngp_fields_to_gather[i];
        }

        // Get the ngp scatter field
        auto ngp_field_to_scatter = *m_ngp_field_to_scatter;

        // Get the ngp element volume field
        auto ngp_element_volume = *m_ngp_element_volume;

        // Get the ngp element function derivatives fields
        Kokkos::Array<NgpDoubleField, 3> ngp_element_function_derivatives_fields;
        for (size_t i = 0; i < 3; ++i) {
            ngp_element_function_derivatives_fields[i] = *m_ngp_element_function_derivatives_fields[i];
        }

        // Get the ngp node function values field
        auto ngp_num_element_neighbors_field = *m_ngp_num_element_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;

        // Get the ngp node number of neighbors field
        auto ngp_num_node_neighbors_field = *m_ngp_num_node_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;

        // Get the ngp node function values field
        auto ngp_node_function_values_field = *m_ngp_node_function_values_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the number of cell nodes
                size_t num_cell_nodes = ngp_num_element_neighbors_field(elem_index, 0);
                assert(num_cell_nodes <= NumCellNodes);

                // Get the cell nodes
                // Kokkos::Profiling::pushRegion("get_cell_nodes");
                Kokkos::Array<stk::mesh::FastMeshIndex, NumCellNodes> cell_nodes;
                for (size_t i = 0; i < num_cell_nodes; ++i) {
                    // Reverse the order of the neighbors. Later neighbors should have smaller function values. Want to sum smaller values first for better parallel consistency.
                    stk::mesh::Entity entity(ngp_element_neighbors_field(elem_index, num_cell_nodes - i - 1));  // Reverse the order of the neighbors
                    cell_nodes[i] = ngp_mesh.fast_mesh_index(entity);
                }
                // Kokkos::Profiling::popRegion();

                // Build the B matrix
                // Kokkos::Profiling::pushRegion("build_B");
                Eigen::Matrix<double, NumCellNodes, 3> B;
                for (size_t j = 0; j < 3; ++j) {
                    for (size_t i = 0; i < num_cell_nodes; ++i) {
                        B(i, j) = ngp_element_function_derivatives_fields[j](elem_index, num_cell_nodes - i - 1);  // Reverse the order of the neighbors
                    }
                }
                // Kokkos::Profiling::popRegion();

                // Build the node neighbor matrix
                // Kokkos::Profiling::pushRegion("build_node_neighbors");
                Kokkos::Array<Kokkos::Array<stk::mesh::FastMeshIndex, NumNodeNeighbors>, NumCellNodes> node_neighbors;
                Kokkos::Array<Kokkos::Array<double, NumNodeNeighbors>, NumCellNodes> node_neighbor_values;
                for (size_t i = 0; i < num_cell_nodes; ++i) {
                    size_t num_node_neighbors = ngp_num_node_neighbors_field(cell_nodes[i], 0);
                    // printf("node: %lu\n", cell_nodes[i]);
                    // printf("  num_node_neighbors: %lu\n", num_node_neighbors);
                    assert(num_node_neighbors <= NumNodeNeighbors);
                    for (size_t j = 0; j < num_node_neighbors; ++j) {
                        // Reverse the order of the neighbors. Later neighbors should have smaller function values. Want to sum smaller values first for better parallel consistency.
                        stk::mesh::Entity entity(ngp_node_neighbors_field(cell_nodes[i], num_node_neighbors - j - 1));  // Reverse the order of the neighbors
                        node_neighbors[i][j] = ngp_mesh.fast_mesh_index(entity);
                        node_neighbor_values[i][j] = ngp_node_function_values_field(node_neighbors[i][j], 0);
                        // printf("    neighbor: %lu, value: %f\n", node_neighbors[i][j], node_neighbor_values[i][j]);
                    }
                }

                // Set up the field data to gather
                // Kokkos::Profiling::pushRegion("gather_data");
                Kokkos::Array<Eigen::Matrix<double, 3, 3>, NumFields> field_data_to_gather_gradient;

                // Set up the results matrix
                Eigen::Matrix<double, NumCellNodes, 3> results_to_scatter;

                // Gather the field data for each node
                for (size_t f = 0; f < NumFields; ++f) {
                    field_data_to_gather_gradient[f].fill(0.0);
                    // Gradient in the x, y, and z directions
                    for (size_t i = 0; i < 3; ++i) {
                        // Each cell node
                        for (size_t k = 0; k < num_cell_nodes; ++k) {
                            double field_data_ki = ngp_fields_to_gather[f](cell_nodes[k], i);
                            uint64_t num_node_neighbors = ngp_num_node_neighbors_field(cell_nodes[k], 0);
                            // Scale by each node neighbor value
                            for (size_t j = 0; j < num_node_neighbors; ++j) {
                                field_data_to_gather_gradient[f].row(i) += field_data_ki * B.row(k) * node_neighbor_values[k][j];
                            }
                        }
                    }
                }
                // Kokkos::Profiling::popRegion();

                // Get the element volume
                // Kokkos::Profiling::pushRegion("get_volume");
                double element_volume = ngp_element_volume(elem_index, 0);
                // Kokkos::Profiling::popRegion();

                // Apply the function to the gathered data
                // Kokkos::Profiling::pushRegion("apply_function");
                func(field_data_to_gather_gradient, results_to_scatter, B, element_volume, num_cell_nodes);
                // Kokkos::Profiling::popRegion();

                // Scatter the force to the nodes
                // Kokkos::Profiling::pushRegion("scatter_data");
                for (size_t j = 0; j < 3; ++j) {
                    for (size_t i = 0; i < num_cell_nodes; ++i) {
                        uint64_t num_node_neighbors = ngp_num_node_neighbors_field(cell_nodes[i], 0);
                        for (size_t k = 0; k < num_node_neighbors; ++k) {
                            Kokkos::atomic_add(&ngp_field_to_scatter(node_neighbors[i][k], j), results_to_scatter(i, j) * node_neighbor_values[i][k]);
                        }
                    }
                }
                // Kokkos::Profiling::popRegion();
            });
    }

    // Loop over each element and apply the function
    template <size_t NumNodes, typename Func>
    void for_each_element_gather_scatter_nodal_data(Func func) {
        if constexpr (UsePrecomputedDerivatives) {
            // for_each_element_gather_scatter_nodal_data_precomputed<NumNodes, Func>(func);
            for_each_element_gather_scatter_nodal_data_precomputed_2<NumNodes, 1, Func>(func);
        } else {
            for_each_element_gather_scatter_nodal_data_not_precomputed<NumNodes, Func>(func);
        }
    }

    // Loop over each element and apply the function on host data
    template <size_t NumNodes, typename Func>
    void for_each_element_host_gather_scatter_nodal_data(const Func &func) {
        // Throw if trying to use precomputed derivatives
        if constexpr (UsePrecomputedDerivatives) {
            throw std::invalid_argument("for_each_element_host_gather_scatter_nodal_data does not support precomputed derivatives.");
        }
        // Set up the field data to gather
        Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, NumFields> field_data_to_gather;
        for (size_t f = 0; f < NumFields; ++f) {
            field_data_to_gather[f].resize(NumNodes, 3);
        }

        // Set up the results matrix
        Eigen::Matrix<double, NumNodes, 3> results_to_scatter;
        results_to_scatter.resize(NumNodes, 3);

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
            // Loop over the elements
            for (auto &&mesh_element : *bucket) {
                // Get the element's nodes
                stk::mesh::Entity const *element_nodes = m_bulk_data->begin_nodes(mesh_element);

                // Gather the coordinates, displacements, and velocities of the nodes
                for (size_t f = 0; f < NumFields; ++f) {
                    for (size_t i = 0; i < NumNodes; ++i) {
                        double *element_node_data = stk::mesh::field_data(*m_fields_to_gather[f], element_nodes[i]);
                        for (size_t j = 0; j < 3; ++j) {
                            field_data_to_gather[f](i, j) = element_node_data[j];
                        }
                    }
                }
                // Apply the function to the gathered data
                func(field_data_to_gather, results_to_scatter, NumNodes);

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
        stk::mesh::field_asum(field_to_scatter_sum, *m_field_to_scatter, m_owned_selector, m_bulk_data->parallel());
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
    std::shared_ptr<aperi::MeshData> m_mesh_data;                                  // The mesh data object.
    std::vector<std::string> m_sets;                                               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                                              // The bulk data object.
    stk::mesh::Selector m_selector;                                                // The selector
    stk::mesh::Selector m_owned_selector;                                          // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                                                 // The ngp mesh object.
    std::array<DoubleField *, NumFields> m_fields_to_gather;                       // The fields to gather
    DoubleField *m_field_to_scatter;                                               // The field to scatter
    DoubleField *m_element_volume;                                                 // The element volume field
    std::array<DoubleField *, 3> m_element_function_derivatives_fields;            // The function derivatives fields
    UnsignedField *m_num_element_neighbors_field;                                  // The number of neighbors field
    UnsignedField *m_element_neighbors_field;                                      // The neighbors field
    UnsignedField *m_num_node_neighbors_field;                                     // The number of neighbors field
    UnsignedField *m_node_neighbors_field;                                         // The neighbors field
    DoubleField *m_node_function_values_field;                                     // The node function values field
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_fields_to_gather;             // The ngp fields to gather
    NgpDoubleField *m_ngp_field_to_scatter;                                        // The ngp field to scatter
    NgpDoubleField *m_ngp_element_volume;                                          // The ngp element volume field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
    NgpUnsignedField *m_ngp_num_element_neighbors_field;                           // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_element_neighbors_field;                               // The ngp neighbors field
    NgpUnsignedField *m_ngp_num_node_neighbors_field;                              // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_node_neighbors_field;                                  // The ngp neighbors field;
    NgpDoubleField *m_ngp_node_function_values_field;                              // The ngp node function values field
};

// TODO(jake): Probably dont need to keep both of these classes. Can probably just use the one with the precomputed derivatives. Leaving both for now.
class StrainSmoothingProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

   public:
    StrainSmoothingProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: StrainSmoothingProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & meta_data->locally_owned_part();

        // Get the number of neighbors field
        m_num_element_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_num_element_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_num_element_neighbors_field);

        // Get the neighbors field
        m_element_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_element_neighbors_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the element volume field
        m_element_volume_field = StkGetField(FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_volume_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_volume_field);

        // Get the function derivatives fields
        std::vector<std::string> element_function_derivatives_field_names = {"function_derivatives_x", "function_derivatives_y", "function_derivatives_z"};
        for (size_t i = 0; i < 3; ++i) {
            m_element_function_derivatives_fields[i] = StkGetField(FieldQueryData<double>{element_function_derivatives_field_names[i], FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_element_function_derivatives_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_element_function_derivatives_fields[i]);
        }
    }

    template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor>
    void for_each_neighbor_compute_derivatives(const FunctionsFunctor &functions_functor, const IntegrationFunctor &integration_functor) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_element_neighbors_field = *m_ngp_num_element_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_element_volume_field = *m_ngp_element_volume_field;
        Kokkos::Array<NgpDoubleField, 3> ngp_element_function_derivatives_fields;
        for (size_t i = 0; i < 3; ++i) {
            ngp_element_function_derivatives_fields[i] = *m_ngp_element_function_derivatives_fields[i];
        }
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                size_t num_nodes = nodes.size();
                assert(num_nodes == 4);  // TODO(jake): Support other element topologies. (tet4 is hardcoded here.)

                // Set up the field data to gather
                Eigen::Matrix<double, 4 /*tet4 hard code for now*/, 3> cell_node_coordinates;

                // Gather the field data for each node
                for (size_t i = 0; i < num_nodes; ++i) {
                    stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                    for (size_t j = 0; j < 3; ++j) {
                        cell_node_coordinates(i, j) = ngp_coordinates_field(node_index, j);
                    }
                }

                size_t num_neighbors = ngp_num_element_neighbors_field(elem_index, 0);
                Eigen::Matrix<double, NumNodes, 3> neighbor_coordinates;
                for (size_t i = 0; i < num_neighbors; ++i) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_element_neighbors_field(elem_index, i));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);
                    // Get the neighbor's coordinates
                    for (size_t j = 0; j < 3; ++j) {
                        neighbor_coordinates(i, j) = ngp_coordinates_field(neighbor_index, j);
                    }
                }
                assert(integration_functor->NumGaussPoints() == 1);
                Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> derivatives_and_weight = integration_functor->ComputeBMatrixAndWeight(cell_node_coordinates, neighbor_coordinates, *functions_functor, 0, num_neighbors);
                ngp_element_volume_field(elem_index, 0) = derivatives_and_weight.second;
                for (size_t i = 0; i < num_neighbors; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        ngp_element_function_derivatives_fields[j](elem_index, i) = derivatives_and_weight.first(i, j);
                    }
                }
            });
    }

    double GetNumElements() {
        return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                                  // The mesh data object.
    std::vector<std::string> m_sets;                                               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                                              // The bulk data object.
    stk::mesh::Selector m_selector;                                                // The selector
    stk::mesh::Selector m_owned_selector;                                          // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                                                 // The ngp mesh object.
    UnsignedField *m_num_element_neighbors_field;                                  // The number of neighbors field
    UnsignedField *m_element_neighbors_field;                                      // The neighbors field
    DoubleField *m_coordinates_field;                                              // The coordinates field
    DoubleField *m_element_volume_field;                                           // The element volume field
    Kokkos::Array<DoubleField *, 3> m_element_function_derivatives_fields;         // The function derivatives fields
    NgpUnsignedField *m_ngp_num_element_neighbors_field;                           // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_element_neighbors_field;                               // The ngp neighbors field
    NgpDoubleField *m_ngp_coordinates_field;                                       // The ngp coordinates field
    NgpDoubleField *m_ngp_element_volume_field;                                    // The ngp element volume field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
};

class StrainSmoothingFromStoredNodeValuesProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

   public:
    StrainSmoothingFromStoredNodeValuesProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: StrainSmoothingProcessor selector is empty." << std::endl;
        }

        m_owned_selector = meta_data->locally_owned_part() & m_selector;

        // Get the node number of neighbors field
        m_node_num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_node_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_node_num_neighbors_field);

        // Get the node neighbors field
        m_node_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_node_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_node_neighbors_field);

        // Get th node function values field
        m_node_function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_node_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_node_function_values_field);

        // Get the element number of neighbors field
        m_element_num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_element_num_neighbors_field);

        // Get the element neighbors field
        m_element_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_element_neighbors_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the element volume field
        m_element_volume_field = StkGetField(FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_volume_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_volume_field);

        // Get the function derivatives fields
        std::vector<std::string> element_function_derivatives_field_names = {"function_derivatives_x", "function_derivatives_y", "function_derivatives_z"};
        for (size_t i = 0; i < 3; ++i) {
            m_element_function_derivatives_fields[i] = StkGetField(FieldQueryData<double>{element_function_derivatives_field_names[i], FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_element_function_derivatives_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_element_function_derivatives_fields[i]);
        }
    }

    template <size_t NumNodes, typename IntegrationFunctor>
    void for_each_neighbor_compute_derivatives(const IntegrationFunctor &integration_functor) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;
        auto ngp_node_function_values_field = *m_ngp_node_function_values_field;
        auto ngp_element_num_neighbors_field = *m_ngp_element_num_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_element_volume_field = *m_ngp_element_volume_field;
        Kokkos::Array<NgpDoubleField, 3> ngp_element_function_derivatives_fields;
        for (size_t i = 0; i < 3; ++i) {
            ngp_element_function_derivatives_fields[i] = *m_ngp_element_function_derivatives_fields[i];
        }
        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes cell_nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                size_t num_cell_nodes = cell_nodes.size();
                assert(num_cell_nodes == 4);  // TODO(jake): Support other element topologies. (tet4 is hardcoded here.)

                // Set up the field data to gather
                Eigen::Matrix<double, 4 /*tet4 hard code for now*/, 3> cell_node_coordinates;

                // Gather the field data for each node
                for (size_t i = 0; i < num_cell_nodes; ++i) {
                    stk::mesh::FastMeshIndex cell_node_index = ngp_mesh.fast_mesh_index(cell_nodes[i]);
                    for (size_t j = 0; j < 3; ++j) {
                        cell_node_coordinates(i, j) = ngp_coordinates_field(cell_node_index, j);
                    }
                }

                size_t num_cell_neighbors = ngp_element_num_neighbors_field(elem_index, 0);
                Eigen::Matrix<double, NumNodes, 4> cell_neighbor_function_values = Eigen::Matrix<double, NumNodes, 4>::Zero();
                // Loop over the cell's neighbors, find where the cell's nodes are in the neighbor's neighbors, and get the function values
                for (size_t i = 0; i < num_cell_neighbors; ++i) {
                    // The neighbor of the cell
                    stk::mesh::Entity cell_neighbor_node(ngp_element_neighbors_field(elem_index, i));
                    // Loop over the cell's nodes
                    for (size_t j = 0; j < num_cell_nodes; ++j) {
                        // The cell's node
                        stk::mesh::FastMeshIndex cell_node_index = ngp_mesh.fast_mesh_index(cell_nodes[j]);
                        size_t num_cell_node_neighbors = ngp_node_num_neighbors_field(cell_node_index, 0);
                        // Loop over the cell's node's neighbors
                        for (size_t k = 0; k < num_cell_node_neighbors; ++k) {
                            stk::mesh::Entity cell_node_neighbor_node(ngp_node_neighbors_field(cell_node_index, k));
                            // If the cell's node's neighbor is the cell's neighbor, get the function value
                            if (cell_node_neighbor_node == cell_neighbor_node) {
                                cell_neighbor_function_values(i, j) = ngp_node_function_values_field(cell_node_index, k);
                                break;
                            }
                        }
                    }
                }
                assert(integration_functor->NumGaussPoints() == 1);
                Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> derivatives_and_weight = integration_functor->ComputeBMatrixAndWeight(cell_node_coordinates, cell_neighbor_function_values, 0, num_cell_neighbors);
                ngp_element_volume_field(elem_index, 0) = derivatives_and_weight.second;
                for (size_t i = 0; i < num_cell_neighbors; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        ngp_element_function_derivatives_fields[j](elem_index, i) = derivatives_and_weight.first(i, j);
                    }
                }
            });
    }

    double GetNumElements() {
        return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                                  // The mesh data object.
    std::vector<std::string> m_sets;                                               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                                              // The bulk data object.
    stk::mesh::Selector m_selector;                                                // The selector
    stk::mesh::Selector m_owned_selector;                                          // The owned selector
    stk::mesh::NgpMesh m_ngp_mesh;                                                 // The ngp mesh object.
    UnsignedField *m_node_num_neighbors_field;                                     // The number of neighbors field
    UnsignedField *m_node_neighbors_field;                                         // The neighbors field
    DoubleField *m_node_function_values_field;                                     // The function values field
    UnsignedField *m_element_num_neighbors_field;                                  // The number of neighbors field
    UnsignedField *m_element_neighbors_field;                                      // The neighbors field
    DoubleField *m_coordinates_field;                                              // The coordinates field
    DoubleField *m_element_volume_field;                                           // The element volume field
    Kokkos::Array<DoubleField *, 3> m_element_function_derivatives_fields;         // The function derivatives fields
    NgpUnsignedField *m_ngp_node_num_neighbors_field;                              // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_node_neighbors_field;                                  // The ngp neighbors field
    NgpDoubleField *m_ngp_node_function_values_field;                              // The ngp function values field
    NgpUnsignedField *m_ngp_element_num_neighbors_field;                           // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_element_neighbors_field;                               // The ngp neighbors field
    NgpDoubleField *m_ngp_coordinates_field;                                       // The ngp coordinates field
    NgpDoubleField *m_ngp_element_volume_field;                                    // The ngp element volume field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
};

}  // namespace aperi