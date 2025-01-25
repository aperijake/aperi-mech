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
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Functor for computing the internal force of an element using standard quadrature.
 * @tparam NumNodes The max number of nodes in the element.
 * @tparam FunctionsFunctor The functor for computing the shape functions.
 * @tparam IntegrationFunctor The functor for computing the integration points and weights.
 * @tparam StressFunctor The functor for computing the stress.
 *
 * @param mesh_data The mesh data.
 * @param displacements_field_name The name of the displacements field.
 * @param force_field_name The name of the force field.
 * @param functions_functor The functor for computing the shape functions.
 * @param integration_functor The functor for computing the integration points and weights.
 * @param material The material.
 * @param incremental_formulation Whether to use the incremental formulation.
 *
 * @todo This is setup with total Lagrangian being the primary formulation. The incremental formulation is not optimized.
 * @todo The field indexing only is set up for a single gauss point. This needs to be updated to handle multiple gauss points.
 *
 * This functor computes the internal force of an element using standard quadrature. The internal force is computed by looping over all gauss points and computing the B matrix and integration weight for each gauss point. The displacement gradient is then computed and the 1st pk stress and internal force of the element are computed.
 *
 */
template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeForce {
    ComputeForce(const std::shared_ptr<aperi::MeshData> &mesh_data,
                 std::string displacements_field_name,
                 const std::string &force_field_name,
                 const FunctionsFunctor &functions_functor,
                 const IntegrationFunctor &integration_functor,
                 const Material &material,
                 const bool incremental_formulation = false)
        : m_has_state(material.HasState()),
          m_needs_velocity_gradient(material.NeedsVelocityGradient()),
          m_incremental_formulation(incremental_formulation),
          m_time_increment_device("TimeIncrementDevice"),
          m_functions_functor(functions_functor),
          m_integration_functor(integration_functor),
          m_stress_functor(*material.GetStressFunctor()) {
        // Set the initial time increment on the device to 0
        Kokkos::deep_copy(m_time_increment_device, 0.0);

        if (m_incremental_formulation) {
            displacements_field_name += "_inc";
        }

        // Get the field data
        m_displacement_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{displacements_field_name, FieldQueryState::NP1});
        m_force_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{force_field_name, FieldQueryState::None});
        m_displacement_gradient_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
        m_displacement_gradient_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        m_pk1_stress_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"pk1_stress", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        SetCoordinateField(mesh_data);
        SetStateFields(mesh_data);
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
        m_displacement_gradient_n_field.UpdateField();
        m_displacement_gradient_np1_field.UpdateField();
        m_pk1_stress_field.UpdateField();
        if (m_has_state) {
            m_state_n_field.UpdateField();
            m_state_np1_field.UpdateField();
        }
    }

    void MarkFieldsModifiedOnDevice() {
        // Mark the fields as modified
        m_force_field.MarkModifiedOnDevice();
        m_displacement_gradient_np1_field.MarkModifiedOnDevice();
        m_pk1_stress_field.MarkModifiedOnDevice();
        if (m_has_state) {
            m_state_np1_field.MarkModifiedOnDevice();
        }
    }

    /**
     * @brief Compute the displacement gradient and assign it to the field.
     * @param elem_index The element index.
     * @todo This should be moved to a separate functor.
     */
    KOKKOS_INLINE_FUNCTION void ComputeDisplacementGradient(const aperi::Index &elem_index, const Eigen::Matrix<double, NumNodes, 3> &node_displacements_np1, const Eigen::Matrix<double, NumNodes, 3> &b_matrix) const {
        // Compute the displacement gradient
        /*
          node_displacements_np1.transpose() for a 3D element with 4 nodes is a 3x4 matrix:
            | u_x1 u_x2 u_x3 u_x4 |
            | u_y1 u_y2 u_y3 u_y4 |
            | u_z1 u_z2 u_z3 u_z4 |

            b_matrix for a 3D element with 4 nodes is a 4x3 matrix:
            | ∂N_1/∂X ∂N_1/∂Y ∂N_1/∂Z |
            | ∂N_2/∂X ∂N_2/∂Y ∂N_2/∂Z |
            | ∂N_3/∂X ∂N_3/∂Y ∂N_3/∂Z |
            | ∂N_4/∂X ∂N_4/∂Y ∂N_4/∂Z |

          H = node_displacements_np1.transpose() * b_matrix:
            | u_x1 u_x2 u_x3 u_x4 |   | ∂N_1/∂X ∂N_1/∂Y ∂N_1/∂Z |   | ∂u_x/∂X ∂u_x/∂Y ∂u_x/∂Z |
            | u_y1 u_y2 u_y3 u_y4 | * | ∂N_2/∂X ∂N_2/∂Y ∂N_2/∂Z | = | ∂u_y/∂X ∂u_y/∂Y ∂u_y/∂Z |
            | u_z1 u_z2 u_z3 u_z4 |   | ∂N_3/∂X ∂N_3/∂Y ∂N_3/∂Z |   | ∂u_z/∂X ∂u_z/∂Y ∂u_z/∂Z |
                                      | ∂N_4/∂X ∂N_4/∂Y ∂N_4/∂Z |

           where u_x, u_y, and u_z are the displacements in the x, y, and z directions, respectively, and X, Y, and Z are the directions in the reference configuration.
        */
        if (m_incremental_formulation) {
            // Incremental formulation. Displacement is the increment. B matrix is in the current configuration.
            // Calculate the displacement gradient from the increment and previous displacement gradient.
            //  - ΔH^{n+1} = B * Δd^{n+½}
            //  - H^{n+1} = ΔH^{n+1} + H^{n} + ΔH^{n+1} * H^{n}
            const auto displacement_gradient_n_map = m_displacement_gradient_n_field.GetConstEigenMatrixMap<3, 3>(elem_index);
            const Eigen::Matrix<double, 3, 3> displacement_gradient_increment = node_displacements_np1.transpose() * b_matrix;
            m_displacement_gradient_np1_field.Assign(elem_index, displacement_gradient_increment + displacement_gradient_n_map + displacement_gradient_increment * displacement_gradient_n_map);

        } else {
            // Total formulation. Displacement is the total displacement. B matrix is in the reference configuration.
            m_displacement_gradient_np1_field.Assign(elem_index, node_displacements_np1.transpose() * b_matrix);
        }
    }

    /**
     * @brief Compute the velocity gradient.
     * @param elem_index The element index.
     * @return The velocity gradient.
     * @todo This should be moved to a separate functor.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 3, 3> ComputeVelocityGradient(const aperi::Index &elem_index) const {
        // (F_n+1 - F_n) / dt * F_n_inv
        const auto displacement_gradient_n_map = m_displacement_gradient_n_field.GetConstEigenMatrixMap<3, 3>(elem_index);
        const auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index);
        return (displacement_gradient_np1_map - displacement_gradient_n_map) / m_time_increment_device(0) * InvertMatrix<3>(displacement_gradient_n_map + Eigen::Matrix3d::Identity());
    }

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
        const size_t stride = m_has_state ? m_state_np1_field.GetStride() : 0;

        // Default Stride for a 3x3 matrix
        const Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> mat3_stride(3, 1);

        // Get the time increment
        double time_increment = m_time_increment_device(0);

        // Loop over all gauss points and compute the internal force.
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Compute the B matrix and integration weight for a given gauss point.
            // For total formulation, the values are with respect to the reference configuration. For incremental formulation, the values are with respect to the configuration at time n.
            Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);
            Eigen::Matrix<double, NumNodes, 3> &b_matrix = b_matrix_and_weight.first;
            double &weight = b_matrix_and_weight.second;

            // Compute displacement gradient, put it in the field
            ComputeDisplacementGradient(elem_index, node_displacements_np1, b_matrix);

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

            m_stress_functor.GetStress(&displacement_gradient_np1_map, &velocity_gradient_map, &state_n_map, &state_np1_map, time_increment, pk1_stress_map);

            // If using the incremental formulation the b_matrix and weight are computed in the current configuration, adjust the b_matrix and weight to the reference configuration
            if (m_incremental_formulation) {
                // Compute the deformation gradient
                const Eigen::Matrix<double, 3, 3> F_n = Eigen::Matrix3d::Identity() + m_displacement_gradient_n_field.GetEigenMatrix<3, 3>(elem_index);

                // Compute the deformation gradient determinant
                const double j_n = F_n.determinant();

                // Compute the b matrix in the reference configuration
                //   b_current matrix is (NumNodes x 3):      b_current_ij = dN_i/dx_j
                //   F is (3 x 3):                                    F_jk = dx_j/dX_k
                //   b_reference matrix is (NumNodes x 3):  b_reference_ik = b_current_ij * F_jk
                b_matrix *= F_n;

                // Compute the weight
                weight /= j_n;
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
    void SetCoordinateField(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        // Get the coordinates field
        if (m_incremental_formulation) {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"current_coordinates", FieldQueryState::N});
        } else {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        }
    }

    void SetStateFields(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        if (m_has_state) {
            m_state_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
            m_state_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        }
    }

    const bool m_has_state;                // Whether the functor uses state
    const bool m_needs_velocity_gradient;  // Whether the functor needs the velocity gradient
    const bool m_incremental_formulation;  // Whether the functor uses the incremental formulation

    Kokkos::View<double *> m_time_increment_device;  // The time increment on the device

    aperi::Field<double> m_displacement_np1_field;                   // The field for the node displacements
    mutable aperi::Field<double> m_force_field;                      // The field for the node mass from elements
    aperi::Field<double> m_coordinates_field;                        // The field for the node coordinates
    aperi::Field<double> m_state_n_field;                            // The field for the node state at time n
    mutable aperi::Field<double> m_state_np1_field;                  // The field for the node state at time n+1
    aperi::Field<double> m_displacement_gradient_n_field;            // The field for the element displacement gradient
    mutable aperi::Field<double> m_displacement_gradient_np1_field;  // The field for the element displacement gradient at time n+1
    mutable aperi::Field<double> m_pk1_stress_field;                 // The field for the element pk1 stress

    const FunctionsFunctor &m_functions_functor;      // Functor for computing the shape function values and derivatives
    const IntegrationFunctor &m_integration_functor;  // Functor for computing the B matrix and integration weight
    const StressFunctor &m_stress_functor;            // Functor for computing the stress of the material
};

}  // namespace aperi
