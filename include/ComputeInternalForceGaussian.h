#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ComputeInternalForceBase.h"
#include "Constants.h"
#include "Field.h"
#include "Index.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Functor for computing the internal force of an element using standard quadrature.
 * @tparam NumNodes The max number of nodes in the element.
 * @tparam FunctionsFunctor The functor for computing the shape functions.
 * @tparam IntegrationFunctor The functor for computing the integration points and weights.
 * @tparam StressFunctor The functor for computing the stress.
 *
 * @todo(jake) Passing in the base class StressFunctor. This likely causes polymorphism vtable lookups, but avoids bloating with all Material / Element classes.
 * Leaving as is for now. My need to rethink how this is done in the Material class. Use a function pointer to get stress?
 */
template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor>
struct ComputeInternalForceGaussian : public ComputeInternalForceBase<aperi::Material::StressFunctor> {
    /**
     * @brief Constructs a ComputeInternalForceGaussian object.
     * @param mesh_data The mesh data.
     * @param displacements_field_name The name of the displacements field.
     * @param force_field_name The name of the force field.
     * @param functions_functor The functor for computing the shape functions.
     * @param integration_functor The functor for computing the integration points and weights.
     * @param material The material.
     * @param lagrangian_formulation_type The Lagrangian formulation type.
     *
     * @todo This is setup with total Lagrangian being the primary formulation. The updated Lagrangian formulation is not optimized.
     * @todo The field indexing only is set up for a single gauss point. This needs to be updated to handle multiple gauss points.
     */
    ComputeInternalForceGaussian(const std::shared_ptr<aperi::MeshData> &mesh_data,
                                 std::string displacements_field_name,
                                 const std::string &force_field_name,
                                 const FunctionsFunctor &functions_functor,
                                 const IntegrationFunctor &integration_functor,
                                 const Material &material,
                                 const LagrangianFormulationType &lagrangian_formulation_type = LagrangianFormulationType::Total)
        : ComputeInternalForceBase<aperi::Material::StressFunctor>(mesh_data, displacements_field_name, force_field_name, material, lagrangian_formulation_type),
          m_functions_functor(functions_functor),
          m_integration_functor(integration_functor) {}

    /**
     * @brief Functor for computing the internal force of an element.
     * @param elem_index The element index.
     * @param nodes The nodes of the element.
     * @param actual_num_nodes The actual number of nodes in the element.
     */
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

        // Get the stride
        const size_t stride = m_has_state ? m_state_np1_field.GetStride(elem_index()) : 0;

        // Default Stride for a 3x3 matrix
        const Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> mat3_stride(3, 1);

        // Get the time increment
        double time_increment = m_time_increment_device(0);

        // Loop over all gauss points and compute the internal force.
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Compute the B matrix and integration weight for a given gauss point.
            auto [b_matrix, weight] = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);

            // Compute the displacement gradient
            ComputeDisplacementGradient(elem_index, node_displacements_np1.transpose() * b_matrix);

            // Get the displacement gradient map
            const auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index);

            // Compute the velocity gradient if needed
            const auto velocity_gradient_map = m_needs_velocity_gradient ? Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(ComputeVelocityGradient(elem_index).data(), 3, 3, mat3_stride) : Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(nullptr, 3, 3, mat3_stride);

            // Get the state maps
            Eigen::InnerStride<Eigen::Dynamic> state_stride(stride);
            const auto state_n_map = m_has_state ? m_state_n_field.GetEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);
            auto state_np1_map = m_has_state ? m_state_np1_field.GetEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);

            // Get the pk1 stress map
            auto pk1_stress_map = m_pk1_stress_field.GetEigenMatrixMap<3, 3>(elem_index);
            const auto pk1_stress_n_map = m_needs_old_stress ? m_pk1_stress_n_field.GetConstEigenMatrixMap<3, 3>(elem_index) : Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(nullptr, 3, 3, mat3_stride);

            // Compute the stress
            m_stress_functor.GetStress(&displacement_gradient_np1_map, &velocity_gradient_map, &state_n_map, &state_np1_map, time_increment, &pk1_stress_n_map, pk1_stress_map);

            // Adjust the B matrix and weight for updated or semi Lagrangian formulations
            if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
                // Compute the deformation gradient
                const Eigen::Matrix<double, 3, 3> F_reference = Eigen::Matrix3d::Identity() + m_reference_displacement_gradient_field.GetEigenMatrix<3, 3>(elem_index);

                // Compute the B matrix in the original configuration
                b_matrix = b_matrix * F_reference;

                // Compute the weight
                weight = weight / F_reference.determinant();
            }

            // Compute the internal force
            for (size_t i = 0; i < actual_num_nodes; ++i) {
                force.row(i).noalias() -= b_matrix.row(i) * pk1_stress_map.transpose() * weight;
            }
        }

        // Scatter the force to the nodes
        for (size_t i = 0; i < actual_num_nodes; ++i) {
            m_force_field.AtomicAdd(nodes[i], force.row(i));
        }
    }

   private:
    const FunctionsFunctor &m_functions_functor;      // Functor for computing the shape function values and derivatives
    const IntegrationFunctor &m_integration_functor;  // Functor for computing the B matrix and integration weight
};

}  // namespace aperi
