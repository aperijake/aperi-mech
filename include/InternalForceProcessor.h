#pragma once

#include <Eigen/Dense>
#include <array>
#include <chrono>
#include <memory>

#include "ElementNodeProcessor.h"
#include "Field.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeForce {
    ComputeForce(const std::shared_ptr<aperi::MeshData> &mesh_data,
                 const std::string &displacements_field_name,
                 const std::string &force_field_name,
                 FunctionsFunctor &functions_functor,
                 IntegrationFunctor &integration_functor,
                 StressFunctor &stress_functor,
                 bool uses_coordinates = true,
                 bool uses_state = false)
        : m_uses_state(uses_state),
          m_functions_functor(functions_functor),
          m_integration_functor(integration_functor),
          m_stress_functor(stress_functor) {
        m_displacements_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{displacements_field_name, FieldQueryState::NP1});
        m_force = aperi::Field<double>(mesh_data, FieldQueryData<double>{force_field_name, FieldQueryState::None});
        if (uses_coordinates) {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        }
        if (m_uses_state) {
            m_state_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::N});
            m_state_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::NP1});
        }
    }

    KOKKOS_FUNCTION void operator()(const aperi::Index &elem_index, const Kokkos::Array<aperi::Index, NumNodes> &nodes, size_t actual_num_nodes) const {
        // Set up the field data to gather
        Eigen::Matrix<double, NumNodes, 3> node_coordinates = Eigen::Matrix<double, NumNodes, 3>::Zero();
        Eigen::Matrix<double, NumNodes, 3> node_displacements = Eigen::Matrix<double, NumNodes, 3>::Zero();

        // Gather the field data for each node
        for (size_t i = 0; i < actual_num_nodes; ++i) {
            node_coordinates.row(i).noalias() = m_coordinates_field.GetEigenMatrix<1, 3>(nodes[i]);
            node_displacements.row(i).noalias() = m_displacements_field.GetEigenMatrix<1, 3>(nodes[i]);
        }

        // Get the state fields
        // const double *state_old = has_state ? &ngp_state_old(elem_index, 0) : nullptr;
        // double *state_new = has_state ? &ngp_state_new(elem_index, 0) : nullptr;
        // size_t state_bucket_offset = 1;  // TODO(jake): get from field

        // Set up the results matrix
        Eigen::Matrix<double, NumNodes, 3> force = Eigen::Matrix<double, NumNodes, 3>::Zero();

        // Loop over all gauss points and compute the internal force
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Compute the B matrix and integration weight for a given gauss point
            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);

            // Compute displacement gradient
            const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix_and_weight.first;

            // Create a map around the state_old and state_new pointers
            // Eigen::InnerStride<Eigen::Dynamic> state_stride(state_bucket_offset);
            // auto state_old_map = Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_old, m_stress_functor.NumberOfStateVariables(), state_stride);
            // auto state_new_map = Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_new, m_stress_functor.NumberOfStateVariables(), state_stride);

            // Compute the 1st pk stress and internal force of the element.
            Eigen::Matrix<double, 3, 3> pk1_stress;
            Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(3, 1);
            auto pk1_stress_map = Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(pk1_stress.data(), stride);
            auto displacement_gradient_map = Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(displacement_gradient.data(), stride);
            double timestep = 1.0;  // TODO(jake): This should be passed in

            // m_stress_functor.GetStress(&displacement_gradient_map, nullptr, &state_old_map, &state_new_map, timestep, pk1_stress_map);
            m_stress_functor.GetStress(&displacement_gradient_map, nullptr, nullptr, nullptr, timestep, pk1_stress_map);

            // Compute the internal force
            for (size_t i = 0; i < actual_num_nodes; ++i) {
                force.row(i).noalias() -= b_matrix_and_weight.first.row(i) * pk1_stress.transpose() * b_matrix_and_weight.second;
            }
        }

        // Scatter the force to the nodes
        for (size_t i = 0; i < actual_num_nodes; ++i) {
            m_force.AtomicAdd(nodes[i], force.row(i));
        }
    }

   private:
    bool m_uses_state;  // Whether the functor uses state

    aperi::Field<double> m_displacements_field;  // The gather kernel for the node displacements
    mutable aperi::Field<double> m_force;        // The scatter kernel for the node mass from elements
    aperi::Field<double> m_coordinates_field;    // The gather kernel for the node coordinates
    aperi::Field<double> m_state_n_field;        // The gather kernel for the node state at time n
    aperi::Field<double> m_state_np1_field;      // The gather kernel for the node state at time n+1

    FunctionsFunctor &m_functions_functor;      // Functor for computing the shape function values and derivatives
    IntegrationFunctor &m_integration_functor;  // Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;            // Functor for computing the stress of the material
};

template <size_t NumFields, size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor, bool UsePrecomputedDerivatives = false>
class InternalForceProcessor {
   public:
    InternalForceProcessor(const std::vector<FieldQueryData<double>> &field_query_data_gather_vec, const FieldQueryData<double> field_query_data_scatter, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets, FunctionsFunctor &functions_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor)
        : m_element_node_processor(mesh_data, sets),
          m_mesh_data(mesh_data),
          m_functions_functor(functions_functor),
          m_integration_functor(integration_functor),
          m_stress_functor(stress_functor) {}

    void ForEachElementComputeForceNotPrecomputed() {
        // Define the action kernel
        ComputeForce<NumNodes, FunctionsFunctor, IntegrationFunctor, StressFunctor> action_kernel(m_mesh_data, "displacement_coefficients", "force_coefficients", m_functions_functor, m_integration_functor, m_stress_functor);

        // Call the for_each_element_and_node function
        m_element_node_processor.for_each_element_and_nodes(action_kernel);
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
    aperi::ElementNodeProcessor<NumNodes> m_element_node_processor;  // The element node processor.
    std::shared_ptr<aperi::MeshData> m_mesh_data;                    // The mesh data object.
    FunctionsFunctor &m_functions_functor;                           // Functor for computing the shape function values and derivatives
    IntegrationFunctor &m_integration_functor;                       // Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;                                 // Functor for computing the stress of the material
};

}  // namespace aperi
