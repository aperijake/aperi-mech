#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ComputeInternalForceBase.h"
#include "Field.h"
#include "FieldData.h"
#include "Index.h"
#include "Material.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "SmoothedCellData.h"

namespace aperi {

/**
 * @brief Functor for computing the internal force of an element using strain smoothing.
 */
class ComputeInternalForceSmoothedCell : public ComputeInternalForceBase<aperi::Material::StressFunctor> {
   public:
    /**
     * @brief Constructs a ComputeInternalForceSmoothedCell object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param displacements_field_name The name of the displacements field.
     * @param force_field_name The name of the force field.
     * @param material The material object.
     * @param lagrangian_formulation_type The Lagrangian formulation type.
     */
    ComputeInternalForceSmoothedCell(std::shared_ptr<aperi::MeshData> mesh_data,
                                     std::string displacements_field_name,
                                     const std::string &force_field_name,
                                     const Material &material,
                                     const LagrangianFormulationType &lagrangian_formulation_type)
        : ComputeInternalForceBase(mesh_data, displacements_field_name, force_field_name, material, lagrangian_formulation_type),
          m_mesh_data(mesh_data) {
        // Throw an exception if the mesh data is null.
        if (m_mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
    }

    /**
     * @brief Computes the internal force for each cell.
     * @param scd The smoothed cell data.
     */
    void ForEachCellComputeForce(const SmoothedCellData &scd) {
        // Get the NGP mesh
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_mesh_data->GetBulkData());

        // Get the number of cells
        const size_t num_cells = scd.NumCells();

        // Get the stride
        const size_t stride = m_has_state ? m_state_np1_field.GetStride() : 0;

        // Default stride for a 3x3 matrix
        const Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> mat3_stride(3, 1);

        // Get the boolean values
        bool has_state = m_has_state;
        bool needs_velocity_gradient = m_needs_velocity_gradient;

        // Loop over all the cells
        Kokkos::parallel_for(
            "for_each_cell_gather_scatter_nodal_data", num_cells, KOKKOS_CLASS_LAMBDA(const size_t cell_id) {
                // Create a map around the state_old and state_new pointers
                const auto element_indices = scd.GetCellElementIndices(cell_id);
                const aperi::Index elem_index = element_indices(0);

                // Get the node local offsets and function derivatives
                const auto node_indicies = scd.GetCellNodeCSRIndices(cell_id);
                const auto node_function_derivatives = scd.GetCellFunctionDerivatives(cell_id);

                const size_t num_nodes = node_indicies.extent(0);

                // Create maps for the function derivatives and displacement
                Eigen::Map<const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor>> b_matrix_map(node_function_derivatives.data(), num_nodes, 3);
                Eigen::Matrix<double, 3, 3> this_displacement_gradient = Eigen::Matrix<double, 3, 3>::Zero();

                // Calculate the displacement gradient
                for (size_t k = 0; k < num_nodes; ++k) {
                    const aperi::Index node_index = node_indicies(k);
                    const auto displacement_np1 = m_displacement_np1_field.GetConstEigenVectorMap<3>(node_index);
                    // Perform the matrix multiplication for field_data_to_gather_gradient
                    this_displacement_gradient += displacement_np1 * b_matrix_map.row(k);
                }

                // Compute the field gradients
                ComputeDisplacementGradient(elem_index(), this_displacement_gradient);

                // Get the displacement gradient map
                const auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index());

                // Compute the velocity gradient if needed
                const auto velocity_gradient_map = needs_velocity_gradient ? Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(ComputeVelocityGradient(elem_index()).data(), 3, 3, mat3_stride) : Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(nullptr, 3, 3, mat3_stride);

                // Get the number of state variables
                const size_t num_state_variables = m_has_state ? m_stress_functor.NumberOfStateVariables() : 0;

                // Get the state maps
                Eigen::InnerStride<Eigen::Dynamic> state_stride(stride);
                const auto state_n_map = has_state ? m_state_n_field.GetConstEigenVectorMap(elem_index(), num_state_variables) : Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);
                auto state_np1_map = has_state ? m_state_np1_field.GetEigenVectorMap(elem_index(), num_state_variables) : Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);

                // Get the pk1 stress map
                auto pk1_stress_map = m_pk1_stress_field.GetEigenMatrixMap<3, 3>(elem_index());

                // Compute the stress
                m_stress_functor.GetStress(&displacement_gradient_np1_map, &velocity_gradient_map, &state_n_map, &state_np1_map, m_time_increment_device(0), pk1_stress_map);

                // Compute the stress and internal force of the element.
                double volume = scd.GetCellVolume(cell_id);

                Eigen::Matrix<double, 3, 3> stress_term = pk1_stress_map.transpose() * -volume;

                // Adjust for the B matrix and weight not being in the original configuration for updated or semi Lagrangian formulations
                if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
                    // Compute the deformation gradient
                    const Eigen::Matrix<double, 3, 3> F_reference = Eigen::Matrix3d::Identity() + m_reference_displacement_gradient_field.GetEigenMatrix<3, 3>(elem_index());

                    // Adjust the stress to account for the difference in configuration
                    stress_term = F_reference * stress_term / F_reference.determinant();
                }

                // Scatter the force to the nodes
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Calculate the force
                    const Eigen::Matrix<double, 1, 3> force = b_matrix_map.row(k) * stress_term;

                    // Add the force to the node
                    const aperi::Index node_index = node_indicies(k);
                    // Scatter the force to the nodes
                    m_force_field.AtomicAdd(node_index, force);
                }
            });
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
};

}  // namespace aperi
