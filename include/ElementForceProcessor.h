#pragma once

#include <Eigen/Dense>
#include <array>
#include <chrono>
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
#include "SmoothedCellData.h"

namespace aperi {

/**
 * @brief A class for processing elements in a mesh.
 *
 * This class provides functionality to process elements in a mesh.
 * It can gather data from fields on the nodes of the elements, apply a function to the gathered data, and scatter the results back to the nodes.
 */
template <size_t NumFields, bool UsePrecomputedDerivatives = false>
class ElementForceProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    /**
     * @brief Constructs an ElementForceProcessor object.
     * @param field_query_data_gather_vec An array of FieldQueryData objects representing the fields to gather.
     * @param field_query_data_scatter A FieldQueryData object representing the field to scatter.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param sets A vector of strings representing the sets to process.
     */
    ElementForceProcessor(const std::vector<FieldQueryData<double>> &field_query_data_gather_vec, const FieldQueryData<double> field_query_data_scatter, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets, bool has_state = false) : m_mesh_data(mesh_data), m_sets(sets), m_has_state(has_state) {
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
            aperi::CoutP0() << "Warning: ElementForceProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & meta_data->locally_owned_part();

        // Get the fields to gather and scatter
        for (size_t i = 0; i < NumFields; ++i) {
            m_fields_to_gather[i] = StkGetField(field_query_data_gather_vec[i], meta_data);
            m_ngp_fields_to_gather[i] = &stk::mesh::get_updated_ngp_field<double>(*m_fields_to_gather[i]);
        }
        m_field_to_scatter = StkGetField(field_query_data_scatter, meta_data);
        m_ngp_field_to_scatter = &stk::mesh::get_updated_ngp_field<double>(*m_field_to_scatter);

        if (has_state) {
            m_state_old = StkGetField(FieldQueryData<double>{"state", FieldQueryState::N, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_state_old = &stk::mesh::get_updated_ngp_field<double>(*m_state_old);

            m_state_new = StkGetField(FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_state_new = &stk::mesh::get_updated_ngp_field<double>(*m_state_new);
        }

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

        bool has_state = m_has_state;

        // Get the state fields
        NgpDoubleField ngp_state_old;
        NgpDoubleField ngp_state_new;
        if (has_state) {
            ngp_state_old = *m_ngp_state_old;
            ngp_state_new = *m_ngp_state_new;
        }

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

                // Get the state fields
                const double *state_old = has_state ? &ngp_state_old(elem_index, 0) : nullptr;
                double *state_new = has_state ? &ngp_state_new(elem_index, 0) : nullptr;
                size_t state_bucket_size = 1;

                // Apply the function to the gathered data
                func(field_data_to_gather, results_to_scatter, num_nodes, state_old, state_new, state_bucket_size);

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

        bool has_state = m_has_state;

        // Get the state fields
        NgpDoubleField ngp_state_old;
        NgpDoubleField ngp_state_new;
        if (has_state) {
            ngp_state_old = *m_ngp_state_old;
            ngp_state_new = *m_ngp_state_new;
        }

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the neighbors
                // Kokkos::Profiling::pushRegion("get_neighbors");
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                size_t num_nodes = nodes.size();
                // Kokkos::Profiling::popRegion();

                // Build the B matrix
                // Kokkos::Profiling::pushRegion("build_B");
                Eigen::Matrix<double, NumNodes, 3> B;
                for (size_t j = 0; j < 3; ++j) {
                    for (size_t i = 0; i < num_nodes; ++i) {
                        B(i, j) = ngp_element_function_derivatives_fields[j](elem_index, i);
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
                            stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[k]);
                            double field_data_ki = ngp_fields_to_gather[f](node_index, i);
                            field_data_to_gather_gradient[f].row(i) += field_data_ki * B.row(k);
                        }
                    }
                }
                // Kokkos::Profiling::popRegion();

                // Get the element volume
                // Kokkos::Profiling::pushRegion("get_volume");
                double element_volume = ngp_element_volume(elem_index, 0);
                // Kokkos::Profiling::popRegion();

                // Get the state fields
                const double *state_old = has_state ? &ngp_state_old(elem_index, 0) : nullptr;
                double *state_new = has_state ? &ngp_state_new(elem_index, 0) : nullptr;
                size_t state_bucket_size = 1;

                // Apply the function to the gathered data
                // Kokkos::Profiling::pushRegion("apply_function");
                func(field_data_to_gather_gradient, results_to_scatter, B, element_volume, num_nodes, state_old, state_new, state_bucket_size);
                // Kokkos::Profiling::popRegion();

                // Scatter the force to the nodes
                // Kokkos::Profiling::pushRegion("scatter_data");
                for (size_t j = 0; j < 3; ++j) {
                    for (size_t i = 0; i < num_nodes; ++i) {
                        stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                        Kokkos::atomic_add(&ngp_field_to_scatter(node_index, j), results_to_scatter(i, j));
                    }
                }
                // Kokkos::Profiling::popRegion();
            });
    }

    // Loop over each element and apply the function
    template <size_t NumCellNodes, typename Func>
    void for_each_element_gather_scatter_nodal_data(Func func) {
        if constexpr (UsePrecomputedDerivatives) {
            for_each_element_gather_scatter_nodal_data_precomputed<NumCellNodes, Func>(func);
        } else {
            for_each_element_gather_scatter_nodal_data_not_precomputed<NumCellNodes, Func>(func);
        }
    }

    template <typename StressFunctor>
    void for_each_cell_gather_scatter_nodal_data(const SmoothedCellData &scd, StressFunctor &stress_functor) {
        // Get th ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        Kokkos::Array<NgpDoubleField, NumFields> ngp_fields_to_gather;
        for (size_t i = 0; i < NumFields; ++i) {
            ngp_fields_to_gather[i] = *m_ngp_fields_to_gather[i];
        }
        auto ngp_field_to_scatter = *m_ngp_field_to_scatter;

        // Get the number of cells
        const size_t num_cells = scd.NumCells();

        bool has_state = m_has_state;

        // Get the state fields
        NgpDoubleField ngp_state_old;
        NgpDoubleField ngp_state_new;
        if (has_state) {
            ngp_state_old = *m_ngp_state_old;
            ngp_state_new = *m_ngp_state_new;
        }

        // Loop over all the cells
        Kokkos::parallel_for(
            "for_each_cell_gather_scatter_nodal_data", num_cells, KOKKOS_LAMBDA(const size_t cell_id) {
                // Set up the field data to gather
                Kokkos::Array<Eigen::Matrix<double, 3, 3>, NumFields> field_data_to_gather_gradient;
                for (size_t f = 0; f < NumFields; ++f) {
                    field_data_to_gather_gradient[f].setZero();
                }

                const auto node_local_offsets = scd.GetCellNodeLocalOffsets(cell_id);
                const auto node_function_derivatives = scd.GetCellFunctionDerivatives(cell_id);

                const size_t num_nodes = node_local_offsets.extent(0);

                // Pre-allocation for the function derivatives
                Eigen::Matrix<double, 1, 3> function_derivatives;

                // Compute the field gradients
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Populate the function derivatives
                    const size_t derivative_offset = k * 3;
                    for (size_t j = 0; j < 3; ++j) {
                        function_derivatives(j) = node_function_derivatives(derivative_offset + j);
                    }

                    // Add the field gradient
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(node);
                    for (size_t f = 0; f < NumFields; ++f) {
                        // Perform the matrix multiplication for field_data_to_gather_gradient
                        for (size_t i = 0; i < 3; ++i) {
                            field_data_to_gather_gradient[f].row(i) += ngp_fields_to_gather[f](node_index, i) * function_derivatives;
                        }
                    }
                }

                // Get the state fields
                double *state_new = nullptr;
                double *state_old = nullptr;
                if (has_state) {
                    const auto element_local_offsets = scd.GetCellElementLocalOffsets(cell_id);
                    const stk::mesh::Entity element(element_local_offsets[0]);
                    const stk::mesh::FastMeshIndex elem_index = ngp_mesh.fast_mesh_index(element);
                    state_old = &ngp_state_old(elem_index, 0);
                    state_new = &ngp_state_new(elem_index, 0);
                }
                size_t state_bucket_size = 1;

                // Compute the stress and internal force of the element.
                double volume = scd.GetCellVolume(cell_id);
                const Eigen::Matrix<double, 3, 3> pk1_stress_neg_volume = stress_functor(field_data_to_gather_gradient, state_old, state_new, state_bucket_size) * -volume;

                // Scatter the force to the nodes
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Populate the function derivatives
                    const size_t derivative_offset = k * 3;
                    for (size_t j = 0; j < 3; ++j) {
                        function_derivatives(j) = node_function_derivatives(derivative_offset + j);
                    }

                    // Calculate the force
                    const Eigen::Matrix<double, 1, 3> force = function_derivatives * pk1_stress_neg_volume;

                    // Add the force to the node
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(node);
                    for (size_t j = 0; j < 3; ++j) {
                        Kokkos::atomic_add(&ngp_field_to_scatter(node_index, j), force(j));
                    }
                }
            });
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
    bool m_has_state;                                                              // Whether the material has state
    stk::mesh::BulkData *m_bulk_data;                                              // The bulk data object.
    stk::mesh::Selector m_selector;                                                // The selector
    stk::mesh::Selector m_owned_selector;                                          // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                                                 // The ngp mesh object.
    std::array<DoubleField *, NumFields> m_fields_to_gather;                       // The fields to gather
    DoubleField *m_field_to_scatter;                                               // The field to scatter
    DoubleField *m_element_volume;                                                 // The element volume field
    DoubleField *m_state_new;                                                      // The state field
    DoubleField *m_state_old;                                                      // The state field
    std::array<DoubleField *, 3> m_element_function_derivatives_fields;            // The function derivatives fields
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_fields_to_gather;             // The ngp fields to gather
    NgpDoubleField *m_ngp_field_to_scatter;                                        // The ngp field to scatter
    NgpDoubleField *m_ngp_element_volume;                                          // The ngp element volume field
    NgpDoubleField *m_ngp_state_new;                                               // The ngp state field
    NgpDoubleField *m_ngp_state_old;                                               // The ngp state field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
};

}  // namespace aperi
