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

                // Add the element volume to the cell volume
                Kokkos::atomic_add(&ngp_cell_volume_fraction_field(cell_parent_element_index, 0), ngp_element_volume_field(elem_index, 0));
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
    DoubleField *m_coordinates_field;                                              // The coordinates field
    DoubleField *m_element_volume_field;                                           // The element volume field
    DoubleField *m_cell_volume_fraction_field;                                     // The cell volume field
    UnsignedField *m_cell_id_field;                                                // The cell id field
    Kokkos::Array<DoubleField *, 3> m_element_function_derivatives_fields;         // The function derivatives fields
    NgpDoubleField *m_ngp_coordinates_field;                                       // The ngp coordinates field
    NgpDoubleField *m_ngp_element_volume_field;                                    // The ngp element volume field
    NgpDoubleField *m_ngp_cell_volume_fraction_field;                              // The ngp cell volume field
    NgpUnsignedField *m_ngp_cell_id_field;                                         // The ngp cell id field
    Kokkos::Array<NgpDoubleField *, 3> m_ngp_element_function_derivatives_fields;  // The ngp function derivatives fields
};

}  // namespace aperi