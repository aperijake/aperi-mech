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
                 const FunctionsFunctor &functions_functor,
                 const IntegrationFunctor &integration_functor,
                 const Material &material)
        : m_has_state(material.HasState()),
          m_needs_velocity_gradient(material.NeedsVelocityGradient()),
          m_time_increment_device("TimeIncrementDevice"),
          m_functions_functor(functions_functor),
          m_integration_functor(integration_functor),
          m_stress_functor(*material.GetStressFunctor()) {
        // Set the initial time increment on the device to 0
        Kokkos::deep_copy(m_time_increment_device, 0.0);

        // Get the field data
        m_displacement_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{displacements_field_name, FieldQueryState::NP1});
        m_force_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{force_field_name, FieldQueryState::None});
        m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        if (m_has_state) {
            m_state_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
            m_state_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        }
    }

    void SetTimeIncrement(double time_increment) {
        // Set the time increment
        Kokkos::deep_copy(m_time_increment_device, time_increment);
    }

    void UpdateFields() {
        // Update the ngp fields
        m_displacement_np1_field.UpdateField();
        m_force_field.UpdateField();
        m_coordinates_field.UpdateField();
        if (m_has_state) {
            m_state_n_field.UpdateField();
            m_state_np1_field.UpdateField();
        }
    }

    KOKKOS_FUNCTION void operator()(const aperi::Index &elem_index, const Kokkos::Array<aperi::Index, NumNodes> &nodes, size_t actual_num_nodes) const {
        // Set up the field data to gather
        Eigen::Matrix<double, NumNodes, 3> node_coordinates = Eigen::Matrix<double, NumNodes, 3>::Zero();
        Eigen::Matrix<double, NumNodes, 3> node_displacements_np1 = Eigen::Matrix<double, NumNodes, 3>::Zero();

        // Gather the field data for each node
        for (size_t i = 0; i < actual_num_nodes; ++i) {
            node_coordinates.row(i).noalias() = m_coordinates_field.GetEigenMatrix<1, 3>(nodes[i]);
            node_displacements_np1.row(i).noalias() = m_displacement_np1_field.GetEigenMatrix<1, 3>(nodes[i]);
        }

        // Set up the results matrix
        Eigen::Matrix<double, NumNodes, 3> force = Eigen::Matrix<double, NumNodes, 3>::Zero();

        // Get the number of state variables
        const size_t num_state_variables = m_has_state ? m_stress_functor.NumberOfStateVariables() : 0;

        // Get the component stride
        const size_t component_stride = m_has_state ? num_state_variables : 0;

        // Get the time increment
        double time_increment = m_time_increment_device(0);

        // Loop over all gauss points and compute the internal force
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Compute the B matrix and integration weight for a given gauss point
            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);

            // Compute displacement gradient
            const Eigen::Matrix3d displacement_gradient_np1 = node_displacements_np1.transpose() * b_matrix_and_weight.first;

            // Compute the 1st pk stress and internal force of the element.
            Eigen::Matrix<double, 3, 3> pk1_stress;
            Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(3, 1);
            auto pk1_stress_map = Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(pk1_stress.data(), stride);
            auto displacement_gradient_np1_map = Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(displacement_gradient_np1.data(), stride);

            Eigen::InnerStride<Eigen::Dynamic> state_stride(component_stride);
            const auto state_n_map = m_has_state ? m_state_n_field.GetEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);
            auto state_np1_map = m_has_state ? m_state_np1_field.GetEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);

            m_stress_functor.GetStress(&displacement_gradient_np1_map, nullptr, &state_n_map, &state_np1_map, time_increment, pk1_stress_map);

            // Compute the internal force
            for (size_t i = 0; i < actual_num_nodes; ++i) {
                force.row(i).noalias() -= b_matrix_and_weight.first.row(i) * pk1_stress.transpose() * b_matrix_and_weight.second;
            }
        }

        // Scatter the force to the nodes
        for (size_t i = 0; i < actual_num_nodes; ++i) {
            m_force_field.AtomicAdd(nodes[i], force.row(i));
        }
    }

   private:
    const bool m_has_state;                // Whether the functor uses state
    const bool m_needs_velocity_gradient;  // Whether the functor needs the velocity gradient

    Kokkos::View<double *> m_time_increment_device;  // The time increment on the device

    aperi::Field<double> m_displacement_np1_field;   // The gather kernel for the node displacements
    mutable aperi::Field<double> m_force_field;      // The scatter kernel for the node mass from elements
    aperi::Field<double> m_coordinates_field;        // The gather kernel for the node coordinates
    aperi::Field<double> m_state_n_field;            // The gather kernel for the node state at time n
    mutable aperi::Field<double> m_state_np1_field;  // The gather kernel for the node state at time n+1

    const FunctionsFunctor &m_functions_functor;      // Functor for computing the shape function values and derivatives
    const IntegrationFunctor &m_integration_functor;  // Functor for computing the B matrix and integration weight
    const StressFunctor &m_stress_functor;            // Functor for computing the stress of the material
};

}  // namespace aperi
