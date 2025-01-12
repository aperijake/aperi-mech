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
#include "Material.h"
#include "MeshData.h"
#include "SmoothedCellData.h"

namespace aperi {

template <size_t NumFields, size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor, bool UsePrecomputedDerivatives = false>
class InternalForceProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    InternalForceProcessor(const std::vector<FieldQueryData<double>> &field_query_data_gather_vec, const FieldQueryData<double> field_query_data_scatter, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets, FunctionsFunctor &functions_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor) : m_mesh_data(mesh_data), m_sets(sets), m_functions_functor(functions_functor), m_integration_functor(integration_functor), m_stress_functor(stress_functor) {
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

        m_has_state = m_stress_functor.HasState();
        if (m_has_state) {
            m_state_old = StkGetField(FieldQueryData<double>{"state", FieldQueryState::N, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_state_old = &stk::mesh::get_updated_ngp_field<double>(*m_state_old);

            m_state_new = StkGetField(FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_state_new = &stk::mesh::get_updated_ngp_field<double>(*m_state_new);
        }

        // Get the element volume field
        m_element_volume = StkGetField(FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
        m_ngp_element_volume = &stk::mesh::get_updated_ngp_field<double>(*m_element_volume);

        if constexpr (UsePrecomputedDerivatives) {
            // Get the function derivatives fields
            std::vector<std::string> element_function_derivatives_field_names = {"function_derivatives_x", "function_derivatives_y", "function_derivatives_z"};
            for (size_t i = 0; i < 3; ++i) {
                m_element_function_derivatives_fields[i] = StkGetField(FieldQueryData<double>{element_function_derivatives_field_names[i], FieldQueryState::None, FieldDataTopologyRank::ELEMENT}, meta_data);
                m_ngp_element_function_derivatives_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_element_function_derivatives_fields[i]);
            }
        }
    }

    // Compute the element volume
    template <typename Func>
    void ComputeElementVolume(size_t coordinate_field_index, Func func) {
        // If using precomputed derivatives, the element volume is already computed
        if (UsePrecomputedDerivatives) {
            return;
        }

        auto ngp_mesh = m_ngp_mesh;
        auto ngp_element_volume = *m_ngp_element_volume;

        // Get the ngp fields
        auto ngp_coordinates_field = *m_ngp_fields_to_gather[coordinate_field_index];

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the neighbors
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                size_t num_nodes = nodes.size();

                // Set up the field data to gather
                Eigen::Matrix<double, NumNodes, 3> coordinate_field_data = Eigen::Matrix<double, NumNodes, 3>::Zero();

                // Gather the field data for each node
                for (size_t i = 0; i < num_nodes; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        coordinate_field_data(i, j) = ngp_coordinates_field(ngp_mesh.fast_mesh_index(nodes[i]), j);
                    }
                }

                // Apply the function to compute the element volume
                double element_volume;
                func.ComputeElementVolume(coordinate_field_data, element_volume);

                // Store the computed volume to the field
                ngp_element_volume(elem_index)[0] = element_volume;
            });
        // Sync the element volume field to the host
        m_ngp_element_volume->modify_on_device();
        m_ngp_element_volume->sync_to_host();
    }

    //
    //    KOKKOS_INLINE_FUNCTION void ComputeElementVolume(const Eigen::Matrix<double, NumNodes, 3> &node_coordinates, double &volume) const {
    //        volume = 0.0;
    //
    //        // Loop over all gauss points
    //        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
    //            // Compute the B matrix and integration weight for a given gauss point
    //            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);
    //
    //            // Compute the volume of the element
    //            volume += b_matrix_and_weight.second;
    //        }
    //    }
    //
    //    FunctionsFunctor &m_functions_functor;      ///< Functor for computing the shape function values and derivatives
    //    IntegrationFunctor &m_integration_functor;  ///< Functor for computing the B matrix and integration weight
    //    StressFunctor &m_stress_functor;            ///< Functor for computing the stress of the material
    //};
    // Loop over each element and apply the function
    void ForEachElementComputeForceNotPrecomputed() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        assert(NumFields == 2);
        NgpDoubleField ngp_coordinates_field = *m_ngp_fields_to_gather[0];
        NgpDoubleField ngp_displacements_field = *m_ngp_fields_to_gather[1];
        auto ngp_force_field = *m_ngp_field_to_scatter;

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
                Eigen::Matrix<double, NumNodes, 3> node_coordinates = Eigen::Matrix<double, NumNodes, 3>::Zero();
                Eigen::Matrix<double, NumNodes, 3> node_displacements = Eigen::Matrix<double, NumNodes, 3>::Zero();

                // Gather the field data for each node
                for (size_t i = 0; i < num_nodes; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        node_coordinates(i, j) = ngp_coordinates_field(ngp_mesh.fast_mesh_index(nodes[i]), j);
                        node_displacements(i, j) = ngp_displacements_field(ngp_mesh.fast_mesh_index(nodes[i]), j);
                    }
                }

                // Get the state fields
                const double *state_old = has_state ? &ngp_state_old(elem_index, 0) : nullptr;
                double *state_new = has_state ? &ngp_state_new(elem_index, 0) : nullptr;
                size_t state_bucket_offset = 1;  // TODO(jake): get from field

                // Set up the results matrix
                Eigen::Matrix<double, NumNodes, 3> force = Eigen::Matrix<double, NumNodes, 3>::Zero();

                // Loop over all gauss points and compute the internal force
                for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
                    // Compute the B matrix and integration weight for a given gauss point
                    const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);

                    // Compute displacement gradient
                    const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix_and_weight.first;

                    // Create a map around the state_old and state_new pointers
                    Eigen::InnerStride<Eigen::Dynamic> state_stride(state_bucket_offset);
                    auto state_old_map = Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_old, m_stress_functor.NumberOfStateVariables(), state_stride);
                    auto state_new_map = Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_new, m_stress_functor.NumberOfStateVariables(), state_stride);

                    // Compute the 1st pk stress and internal force of the element.
                    Eigen::Matrix<double, 3, 3> pk1_stress;
                    Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(3, 1);
                    auto pk1_stress_map = Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(pk1_stress.data(), stride);
                    auto displacement_gradient_map = Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(displacement_gradient.data(), stride);
                    double timestep = 1.0;  // TODO(jake): This should be passed in

                    m_stress_functor.GetStress(&displacement_gradient_map, nullptr, &state_old_map, &state_new_map, timestep, pk1_stress_map);

                    // Compute the internal force
                    for (size_t i = 0; i < num_nodes; ++i) {
                        force.row(i).noalias() -= b_matrix_and_weight.first.row(i) * pk1_stress.transpose() * b_matrix_and_weight.second;
                    }
                }

                // Scatter the force to the nodes
                for (size_t i = 0; i < num_nodes; ++i) {
                    for (size_t j = 0; j < 3; ++j) {
                        Kokkos::atomic_add(&ngp_force_field(ngp_mesh.fast_mesh_index(nodes[i]), j), force(i, j));
                    }
                }
            });
    }

    // Loop over each element and apply the function
    template <size_t NumCellNodes, typename Func>
    void ForEachElementComputeForce(Func func) {
        // if constexpr (UsePrecomputedDerivatives) {
        //     for_each_element_gather_scatter_nodal_data_precomputed<NumCellNodes, Func>(func);
        // } else {
        ForEachElementComputeForceNotPrecomputed();
        //}
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                                  // The mesh data object.
    std::vector<std::string> m_sets;                                               // The sets to process.
    FunctionsFunctor &m_functions_functor;                                         // Functor for computing the shape function values and derivatives
    IntegrationFunctor &m_integration_functor;                                     // Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;                                               // Functor for computing the stress of the material
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
