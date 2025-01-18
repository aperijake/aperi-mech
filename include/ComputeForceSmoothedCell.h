#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stk_mesh/base/Entity.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/NgpMesh.hpp>

#include "Field.h"
#include "FieldData.h"
#include "Index.h"
#include "MeshData.h"
#include "SmoothedCellData.h"

namespace aperi {

/**
 * @brief Functor for computing the internal force of an element using strain smoothing.
 */
class ComputeForceSmoothedCell {
   public:
    /**
     * @brief Constructs a ComputeForceSmoothedCell object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param displacements_field_name The name of the displacements field.
     * @param force_field_name The name of the force field.
     * @param sets A vector of strings representing the sets to process.
     */
    ComputeForceSmoothedCell(std::shared_ptr<aperi::MeshData> mesh_data,
                             const std::string &displacements_field_name,
                             const std::string &force_field_name,
                             const std::vector<std::string> &sets,
                             const Material &material)
        : m_mesh_data(mesh_data),
          m_sets(sets),
          m_has_state(material.HasState()),
          m_needs_velocity_gradient(material.NeedsVelocityGradient()),
          m_time_increment_device("TimeIncrementDevice") {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }

        // Set the initial time increment on the device to 0
        Kokkos::deep_copy(m_time_increment_device, 0.0);

        m_displacement_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{displacements_field_name, FieldQueryState::NP1});
        m_force_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{force_field_name, FieldQueryState::None});

        m_displacement_gradient_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
        m_displacement_gradient_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});

        m_pk1_stress_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"pk1_stress", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});

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

    template <typename StressFunctor>
    void ForEachCellComputeForce(const SmoothedCellData &scd, const StressFunctor *stress_functor) {
        // Get th ngp mesh
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_mesh_data->GetBulkData());

        // Get the number of cells
        const size_t num_cells = scd.NumCells();

        // Get the number of state variables
        const size_t num_state_variables = m_has_state ? stress_functor->NumberOfStateVariables() : 0;

        // Get the stride
        const size_t stride = m_has_state ? m_state_np1_field.GetStride() : 0;

        // Default Stride for a 3x3 matrix
        const Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> mat3_stride(3, 1);

        bool has_state = m_has_state;

        // Loop over all the cells
        Kokkos::parallel_for(
            "for_each_cell_gather_scatter_nodal_data", num_cells, KOKKOS_LAMBDA(const size_t cell_id) {
                // Create a map around the state_old and state_new pointers
                const auto element_local_offsets = scd.GetCellElementLocalOffsets(cell_id);
                const stk::mesh::Entity element(element_local_offsets[0]);
                const stk::mesh::FastMeshIndex elem_index = ngp_mesh.fast_mesh_index(element);

                // Set up the field data to gather
                Eigen::Matrix<double, 3, 3> displacement_gradient_np1 = Eigen::Matrix<double, 3, 3>::Zero();

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
                    const aperi::Index ni(node_index);
                    const auto displacement_np1 = m_displacement_np1_field.GetConstEigenVectorMap(ni, 3);
                    // Perform the matrix multiplication for field_data_to_gather_gradient
                    displacement_gradient_np1 += displacement_np1 * function_derivatives;
                }
                m_displacement_gradient_np1_field.Assign(elem_index, displacement_gradient_np1);
                const auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index);

                Eigen::InnerStride<Eigen::Dynamic> state_stride(stride);
                const auto state_n_map = has_state ? m_state_n_field.GetConstEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);
                auto state_np1_map = has_state ? m_state_np1_field.GetEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);

                // Compute the velocity gradient if needed
                const auto velocity_gradient_map = m_needs_velocity_gradient ? Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(ComputeVelocityGradient(elem_index).data(), 3, 3, mat3_stride) : Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(nullptr, 3, 3, mat3_stride);

                // Compute the stress and internal force of the element.
                double volume = scd.GetCellVolume(cell_id);

                // PK1 stress
                auto pk1_stress_map = m_pk1_stress_field.GetEigenMatrixMap<3, 3>(elem_index);

                // Create a map around the state_old and state_new pointers
                Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(3, 1);

                stress_functor->GetStress(&displacement_gradient_np1_map, &velocity_gradient_map, &state_n_map, &state_np1_map, m_time_increment_device(0), pk1_stress_map);

                const Eigen::Matrix<double, 3, 3> pk1_stress_transpose_neg_volume = pk1_stress_map.transpose() * -volume;

                // Scatter the force to the nodes
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Populate the function derivatives
                    const size_t derivative_offset = k * 3;
                    for (size_t j = 0; j < 3; ++j) {
                        function_derivatives(j) = node_function_derivatives(derivative_offset + j);
                    }

                    // Calculate the force
                    const Eigen::Matrix<double, 1, 3> force = function_derivatives * pk1_stress_transpose_neg_volume;

                    // Add the force to the node
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(node);
                    const aperi::Index ni(node_index);
                    // Scatter the force to the nodes
                    m_force_field.AtomicAdd(ni, force);
                }
            });
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.
    bool m_has_state;                              // Whether the material has state
    bool m_needs_velocity_gradient;                // Whether the material needs the velocity gradient

    Kokkos::View<double *> m_time_increment_device;  // The time increment on the device

    aperi::Field<double> m_displacement_np1_field;                   // The field for the node displacements
    mutable aperi::Field<double> m_force_field;                      // The field for the node mass from elements
    aperi::Field<double> m_state_n_field;                            // The field for the node state at time n
    mutable aperi::Field<double> m_state_np1_field;                  // The field for the node state at time n+1
    aperi::Field<double> m_displacement_gradient_n_field;            // The field for the element displacement gradient
    mutable aperi::Field<double> m_displacement_gradient_np1_field;  // The field for the element displacement gradient at time n+1
    mutable aperi::Field<double> m_pk1_stress_field;                 // The field for the element pk1 stress
};

}  // namespace aperi
