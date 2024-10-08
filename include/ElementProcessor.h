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

            // Get the cell volume field
            m_cell_volume_fraction = StkGetField(FieldQueryData<double>{"cell_volume_fraction", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_cell_volume_fraction = &stk::mesh::get_updated_ngp_field<double>(*m_cell_volume_fraction);

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
        auto ngp_cell_volume_fraction = *m_ngp_cell_volume_fraction;

        Kokkos::Array<NgpDoubleField, 3> ngp_element_function_derivatives_fields;
        for (size_t i = 0; i < 3; ++i) {
            ngp_element_function_derivatives_fields[i] = *m_ngp_element_function_derivatives_fields[i];
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

                // Apply the function to the gathered data
                // Kokkos::Profiling::pushRegion("apply_function");
                func(field_data_to_gather_gradient, results_to_scatter, B, element_volume, num_nodes);
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

                // Compute the stress and internal force of the element.
                double volume = scd.GetCellVolume(cell_id);
                const Eigen::Matrix<double, 3, 3> pk1_stress_neg_volume = stress_functor(field_data_to_gather_gradient) * -volume;

                // Scatter the force to the nodes
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Populate the function derivatives
                    const size_t derivative_offset = k * 3;
                    for (size_t j = 0; j < 3; ++j) {
                        function_derivatives(j) = node_function_derivatives(derivative_offset + j);
                    }

                    // Calculate the force
                    const Eigen::Matrix<double, 3, 1> force = pk1_stress_neg_volume * function_derivatives.transpose();

                    // Add the force to the node
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(node);
                    for (size_t j = 0; j < 3; ++j) {
                        Kokkos::atomic_add(&ngp_field_to_scatter(node_index, j), force(j));
                    }
                }
            });
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
    DoubleField *m_cell_volume_fraction;                                           // The cell volume field
    std::array<DoubleField *, 3> m_element_function_derivatives_fields;            // The function derivatives fields
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_fields_to_gather;             // The ngp fields to gather
    NgpDoubleField *m_ngp_field_to_scatter;                                        // The ngp field to scatter
    NgpDoubleField *m_ngp_element_volume;                                          // The ngp element volume field
    NgpDoubleField *m_ngp_cell_volume_fraction;                                    // The ngp cell volume field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
};

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

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the element volume field
        m_element_volume_field = StkGetField(FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_volume_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_volume_field);

        // Get the cell volume field
        m_cell_volume_fraction_field = StkGetField(FieldQueryData<double>{"cell_volume_fraction", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_volume_fraction_field = &stk::mesh::get_updated_ngp_field<double>(*m_cell_volume_fraction_field);

        // Get the cell id field
        m_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_cell_id_field);

        // Get the smoothed cell id field
        m_smoothed_cell_id_field = StkGetField(FieldQueryData<uint64_t>{"smoothed_cell_id", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_smoothed_cell_id_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_smoothed_cell_id_field);

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

                // Set up the field data to gather
                Eigen::Matrix<double, NumNodes, 3> cell_node_coordinates;

                // Gather the field data for each node
                for (size_t i = 0; i < num_nodes; ++i) {
                    stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                    for (size_t j = 0; j < 3; ++j) {
                        cell_node_coordinates(i, j) = ngp_coordinates_field(node_index, j);
                    }
                }

                // TODO(jake): Simplify further. This is leftover from the "single pass" implementation.
                assert(integration_functor->NumGaussPoints() == 1);
                Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> derivatives_and_weight = integration_functor->ComputeBMatrixAndWeight(cell_node_coordinates);
                ngp_element_volume_field(elem_index, 0) = derivatives_and_weight.second;
                for (size_t i = 0; i < num_nodes; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        ngp_element_function_derivatives_fields[j](elem_index, i) = derivatives_and_weight.first(i, j);
                    }
                }
            });
        // Mark modified fields
        m_ngp_element_volume_field->clear_sync_state();
        m_ngp_element_volume_field->modify_on_device();
        for (size_t i = 0; i < 3; ++i) {
            m_ngp_element_function_derivatives_fields[i]->clear_sync_state();
            m_ngp_element_function_derivatives_fields[i]->modify_on_device();
        }
    }

    // Should be call after for_each_neighbor_compute_derivatives so element volume is computed
    // - Loop over each element
    //   - Add the element volume to the cell volume for the element at the cell id
    // - Loop over each element again
    //   - Grab the cell volume for the element from the element at the cell id
    // - Loop over each element again
    //   - Set the volume fraction by dividing the element volume by the cell volume
    void ComputeCellVolumeFromElementVolume() {
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_element_volume_field = *m_ngp_element_volume_field;
        auto ngp_cell_volume_fraction_field = *m_ngp_cell_volume_fraction_field;
        auto ngp_cell_id_field = *m_ngp_cell_id_field;

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the cell parent element index
                stk::mesh::Entity cell_parent_element(ngp_cell_id_field(elem_index, 0));
                stk::mesh::FastMeshIndex cell_parent_element_index = ngp_mesh.fast_mesh_index(cell_parent_element);

                // Get the element volume
                double element_volume = ngp_element_volume_field(elem_index, 0);

                // Add the element volume to the cell volume
                Kokkos::atomic_add(&ngp_cell_volume_fraction_field(cell_parent_element_index, 0), element_volume);
            });

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the cell parent element index
                stk::mesh::Entity cell_parent_element(ngp_cell_id_field(elem_index, 0));
                stk::mesh::FastMeshIndex cell_parent_element_index = ngp_mesh.fast_mesh_index(cell_parent_element);

                // Get the cell volume
                double cell_volume_fraction = ngp_cell_volume_fraction_field(cell_parent_element_index, 0);

                // Set the cell volume
                ngp_cell_volume_fraction_field(elem_index, 0) = cell_volume_fraction;
            });

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element volume
                double element_volume = ngp_element_volume_field(elem_index, 0);

                // Get the cell volume
                double cell_volume_fraction = ngp_cell_volume_fraction_field(elem_index, 0);

                // Set the volume fraction
                ngp_cell_volume_fraction_field(elem_index, 0) = element_volume / cell_volume_fraction;
            });
    }

    bool CheckPartitionOfNullity(const std::shared_ptr<aperi::SmoothedCellData> &smoothed_cell_data) {
        // Loop over all the cells
        bool passed = true;
        for (size_t i = 0, e = smoothed_cell_data->NumCells(); i < e; ++i) {
            // Get the function derivatives
            auto cell_function_derivatives = smoothed_cell_data->GetCellFunctionDerivativesHost(i);
            std::array<double, 3> cell_function_derivatives_sum{0.0, 0.0, 0.0};
            for (size_t j = 0, je = cell_function_derivatives.size(); j < je; ++j) {
                cell_function_derivatives_sum[j % 3] += cell_function_derivatives[j];
            }
            for (size_t j = 0; j < 3; ++j) {
                if (std::abs(cell_function_derivatives_sum[j]) > 1.0e-12) {
                    aperi::CoutP0() << "Cell " << i << " has non-zero sum of function derivatives: " << cell_function_derivatives_sum[j] << std::endl;
                    passed = false;
                }
            }
        }
        return passed;
    }

    std::shared_ptr<aperi::SmoothedCellData> BuildSmoothedCellData(size_t estimated_num_nodes_per_cell, bool one_pass_method = true) {
        /* This needs a few things to be completed first:
           - The mesh labeler needs to be run to get the cell ids and create the _cells parts.
           - The node function derivatives need to be computed.
        */

        aperi::CoutP0() << "   - Building Smoothed Cell Data." << std::endl;
        auto start_time = std::chrono::high_resolution_clock::now();

        // Create the cells selector
        std::vector<std::string> cells_sets;
        // If sets are named the same with _cells at the end, use those.
        for (const auto &set : m_sets) {
            cells_sets.push_back(set + "_cells");
        }
        // If sets are not named, get the universal cells part.
        if (cells_sets.size() == 0) {
            cells_sets.push_back("universal_cells_part");
        }
        auto cell_selector = StkGetSelector(cells_sets, &m_bulk_data->mesh_meta_data());

        // Get the number of cells
        size_t num_cells = GetNumElements(cell_selector);

        // Get the number of elements
        size_t num_elements = GetNumElements();

        // Estimate the total number of nodes in the cells
        size_t estimated_num_nodes = num_cells * estimated_num_nodes_per_cell;

        // Create the smoothed cell data object
        std::shared_ptr<aperi::SmoothedCellData> smoothed_cell_data = std::make_shared<aperi::SmoothedCellData>(num_cells, num_elements, estimated_num_nodes);

        // Needed for the one pass method
        stk::mesh::Field<uint64_t> *neighbors_field = nullptr;
        stk::mesh::Field<uint64_t> *num_neighbors_field = nullptr;
        stk::mesh::Field<double> *function_values_field = nullptr;

        if (one_pass_method) {
            // Get the neighbors, num_neighbors, and function_values fields
            neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
            num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
            function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
            auto ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*neighbors_field);
            auto ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*num_neighbors_field);
            auto ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*function_values_field);
            ngp_neighbors_field->sync_to_host();
            ngp_num_neighbors_field->sync_to_host();
            ngp_function_values_field->sync_to_host();
        }

        // Get the ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Sync the fields
        m_ngp_element_volume_field->sync_to_host();
        for (size_t i = 0; i < 3; ++i) {
            m_ngp_element_function_derivatives_fields[i]->sync_to_host();
        }

        // Get the ngp fields
        auto ngp_smoothed_cell_id_field = *m_ngp_smoothed_cell_id_field;
        auto ngp_element_volume_field = *m_ngp_element_volume_field;

        // #### Set length and start for the elements in the smoothed cell data ####
        // Get the functor to add the number of elements to the smoothed cell data
        auto add_cell_num_elements_functor = smoothed_cell_data->GetAddCellNumElementsFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the smoothed_cell_id
                uint64_t smoothed_cell_id = ngp_smoothed_cell_id_field(elem_index, 0);

                // Add the number of elements to the smoothed cell data
                add_cell_num_elements_functor(smoothed_cell_id, 1);
            });
        // Number of cell elements ('length') is now set.
        // This populates the 'start' array from the 'length' array and collects other sizes.
        // Also copies the 'length' and 'start' arrays to host.
        smoothed_cell_data->CompleteAddingCellElementIndicesOnDevice();

        // #### Set the cell element local offsets for the smoothed cell data ####
        // Get the functor to add the element to the smoothed cell data
        auto add_cell_element_functor = smoothed_cell_data->GetAddCellElementFunctor();

        // Loop over all the elements
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the smoothed_cell_id
                uint64_t smoothed_cell_id = ngp_smoothed_cell_id_field(elem_index, 0);

                stk::mesh::Entity element = ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, elem_index);
                uint64_t element_local_offset = element.local_offset();
                double element_volume = ngp_element_volume_field(elem_index, 0);

                // Add the number of elements to the smoothed cell data
                add_cell_element_functor(smoothed_cell_id, element_local_offset, element_volume);
            });
        // Cell element local offsets (STK offsets) are now set. Copy to host.
        smoothed_cell_data->CopyCellElementViewsToHost();

        // #### Set the smoothed cell node ids from the smoothed cell elements ####
        // Get host views of the node index lengths and starts
        auto node_lengths = smoothed_cell_data->GetNodeIndices().GetLengthHost();
        auto node_starts = smoothed_cell_data->GetNodeIndices().GetStartHost();
        node_starts(0) = 0;

        // Get host views of the node derivatives
        auto node_function_derivatives = smoothed_cell_data->GetFunctionDerivativesHost();

        // Get host views of the node local offsets
        auto node_local_offsets = smoothed_cell_data->GetNodeLocalOffsetsHost();

        double average_num_neighbors = 0;
        double average_num_nodes = 0;
        // Loop over all the cells
        for (size_t i = 0, e = smoothed_cell_data->NumCells(); i < e; ++i) {
            // Get the cell element local offsets
            auto cell_element_local_offsets = smoothed_cell_data->GetCellElementLocalOffsetsHost(i);

            // Create a map of node entities to their indices
            std::unordered_map<uint64_t, size_t> node_entities;
            std::unordered_map<uint64_t, size_t> node_neighbor_entities;

            // Loop over all the cell element local offsets
            for (size_t j = 0, je = cell_element_local_offsets.size(); j < je; ++j) {
                auto element_local_offset = cell_element_local_offsets[j];
                stk::mesh::Entity element(element_local_offset);
                stk::mesh::Entity const *element_nodes = m_bulk_data->begin_nodes(element);
                // Loop over all the nodes in the element
                for (size_t k = 0, ke = m_bulk_data->num_nodes(element); k < ke; ++k) {
                    uint64_t node_local_offset = element_nodes[k].local_offset();
                    if (node_entities.find(node_local_offset) == node_entities.end()) {
                        node_entities[node_local_offset] = node_entities.size();
                        if (one_pass_method) {
                            // Get the node neighbors
                            uint64_t num_neighbors = stk::mesh::field_data(*num_neighbors_field, element_nodes[k])[0];
                            uint64_t *neighbors = stk::mesh::field_data(*neighbors_field, element_nodes[k]);
                            for (size_t l = 0; l < num_neighbors; ++l) {
                                uint64_t neighbor = neighbors[l];
                                if (node_neighbor_entities.find(neighbor) == node_neighbor_entities.end()) {
                                    node_neighbor_entities[neighbor] = node_neighbor_entities.size();
                                }
                            }
                        }
                    }
                }
            }

            // Set the length to the size of the map
            if (one_pass_method) {
                node_lengths(i) = node_neighbor_entities.size();
                average_num_neighbors += static_cast<double>(node_neighbor_entities.size());
            } else {
                node_lengths(i) = node_entities.size();
            }
            average_num_nodes += static_cast<double>(node_entities.size());

            // Set the start to the start + length of the previous cell, if not the first cell
            if (i > 0) {
                node_starts(i) = node_starts(i - 1) + node_lengths(i - 1);
            }

            // Resize the node views if necessary
            size_t node_local_offsets_size = node_starts(i) + node_lengths(i);
            size_t current_node_local_offsets_size = node_local_offsets.extent(0);
            if (node_local_offsets_size > current_node_local_offsets_size) {
                // Calculate the percent done
                double percent_done = static_cast<double>(i + 1) / static_cast<double>(e);

                // Estimate the expected size based on the percent done. Then multiply by 1.5 to give some buffer.
                auto expected_size = static_cast<size_t>(static_cast<double>(node_local_offsets_size) * 1.5 * (1.0 + percent_done));

                // Double the size of the node local offsets
                smoothed_cell_data->ResizeNodeViewsOnHost(expected_size);

                // Get the new host views of the node local offsets
                node_function_derivatives = smoothed_cell_data->GetFunctionDerivativesHost();
                node_local_offsets = smoothed_cell_data->GetNodeLocalOffsetsHost();
            }

            // Loop over the node entities, create a map of local offsets to node indices
            std::unordered_map<uint64_t, size_t> node_local_offsets_to_index;
            size_t node_index = node_starts(i);
            std::unordered_map<uint64_t, size_t> &node_entities_to_use = one_pass_method ? node_neighbor_entities : node_entities;
            for (const auto &node_pair : node_entities_to_use) {
                uint64_t node_local_offset = node_pair.first;
                node_local_offsets(node_index) = node_local_offset;
                node_local_offsets_to_index[node_local_offset] = node_index;
                ++node_index;
            }

            // Cell volume
            double cell_volume = smoothed_cell_data->GetCellVolumeHost(i);

            // Loop over all the cell elements
            for (size_t j = 0, je = cell_element_local_offsets.size(); j < je; ++j) {
                auto element_local_offset = cell_element_local_offsets[j];
                stk::mesh::Entity element(element_local_offset);
                stk::mesh::Entity const *element_nodes = m_bulk_data->begin_nodes(element);
                double element_volume = stk::mesh::field_data(*m_element_volume_field, element)[0];
                double cell_volume_fraction = element_volume / cell_volume;
                std::vector<double *> element_function_derivatives_data(3);
                for (size_t l = 0; l < 3; ++l) {
                    element_function_derivatives_data[l] = stk::mesh::field_data(*m_element_function_derivatives_fields[l], element);
                }
                // Loop over all the nodes in the element
                for (size_t k = 0, ke = m_bulk_data->num_nodes(element); k < ke; ++k) {
                    if (one_pass_method) {
                        uint64_t num_neighbors = stk::mesh::field_data(*num_neighbors_field, element_nodes[k])[0];
                        // Loop over the nodes neighbors
                        for (size_t l = 0; l < num_neighbors; ++l) {
                            uint64_t neighbor = stk::mesh::field_data(*neighbors_field, element_nodes[k])[l];
                            double function_value = stk::mesh::field_data(*function_values_field, element_nodes[k])[l];
                            auto neighbor_iter = node_local_offsets_to_index.find(neighbor);
                            assert(neighbor_iter != node_local_offsets_to_index.end());
                            if (neighbor_iter != node_local_offsets_to_index.end()) {
                                size_t neighbor_index = neighbor_iter->second;
                                // Atomic add to the derivatives and set the node local offsets for the cell
                                for (size_t m = 0; m < 3; ++m) {
                                    Kokkos::atomic_add(&node_function_derivatives(neighbor_index * 3 + m), element_function_derivatives_data[m][k] * cell_volume_fraction * function_value);
                                }
                            } else {
                                aperi::CoutP0() << "Node " << neighbor << " not found in node local offsets." << std::endl;
                            }
                        }
                    } else {
                        uint64_t node_local_offset = element_nodes[k].local_offset();
                        size_t node_component_index = node_local_offsets_to_index[node_local_offset] * 3;
                        // Atomic add to the derivatives and set the node local offsets for the cell
                        for (size_t l = 0; l < 3; ++l) {
                            Kokkos::atomic_add(&node_function_derivatives(node_component_index + l), element_function_derivatives_data[l][k] * cell_volume_fraction);
                        }
                    }
                }
            }
        }
        average_num_nodes /= static_cast<double>(num_cells);
        aperi::CoutP0() << "     - Average number of points defining a cell: " << average_num_nodes << std::endl;
        if (one_pass_method) {
            average_num_neighbors /= static_cast<double>(num_cells);
            aperi::CoutP0() << "     - Average number of neighbors for a cell: " << average_num_neighbors << std::endl;
        }
        bool set_start_from_lengths = false;  // The start array is already set above. This can be done as we are on host and looping through sequentially.
        smoothed_cell_data->CompleteAddingCellNodeIndicesOnHost(set_start_from_lengths);
        smoothed_cell_data->CopyCellNodeViewsToDevice();

        assert(CheckPartitionOfNullity(smoothed_cell_data));

        auto end_time = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::milliseconds>(end_time - start_time);
        aperi::CoutP0() << "     Finished building Smoothed Cell Data. Time: " << duration.count() << " ms." << std::endl;

        return smoothed_cell_data;
    }

    double GetNumElements(const stk::mesh::Selector &selector) const {
        return stk::mesh::count_selected_entities(selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

    // Overloaded version that uses m_selector
    double GetNumElements() const {
        return GetNumElements(m_selector);
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                                  // The mesh data object.
    std::vector<std::string> m_sets;                                               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                                              // The bulk data object.
    stk::mesh::Selector m_selector;                                                // The selector
    stk::mesh::Selector m_owned_selector;                                          // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                                                 // The ngp mesh object.
    DoubleField *m_coordinates_field;                                              // The coordinates field
    DoubleField *m_element_volume_field;                                           // The element volume field
    DoubleField *m_cell_volume_fraction_field;                                     // The cell volume field
    UnsignedField *m_cell_id_field;                                                // The cell id field
    UnsignedField *m_smoothed_cell_id_field;                                       // The smoothed cell id field
    Kokkos::Array<DoubleField *, 3> m_element_function_derivatives_fields;         // The function derivatives fields
    NgpDoubleField *m_ngp_coordinates_field;                                       // The ngp coordinates field
    NgpDoubleField *m_ngp_element_volume_field;                                    // The ngp element volume field
    NgpDoubleField *m_ngp_cell_volume_fraction_field;                              // The ngp cell volume field
    NgpUnsignedField *m_ngp_cell_id_field;                                         // The ngp cell id field
    NgpUnsignedField *m_ngp_smoothed_cell_id_field;                                // The ngp smoothed cell id field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
};

}  // namespace aperi
