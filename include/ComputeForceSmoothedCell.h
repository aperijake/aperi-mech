#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stk_mesh/base/Entity.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/NgpMesh.hpp>

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
template <typename StressFunctor>
class ComputeForceSmoothedCell {
   public:
    /**
     * @brief Constructs a ComputeForceSmoothedCell object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param displacements_field_name The name of the displacements field.
     * @param force_field_name The name of the force field.
     * @param material A shared pointer to the Material object.
     * @param lagrangian_formulation_type The Lagrangian formulation type.
     */
    ComputeForceSmoothedCell(std::shared_ptr<aperi::MeshData> mesh_data,
                             std::string displacements_field_name,
                             const std::string &force_field_name,
                             const Material &material,
                             const LagrangianFormulationType &lagrangian_formulation_type = LagrangianFormulationType::Total)
        : m_mesh_data(mesh_data),
          m_has_state(material.HasState()),
          m_needs_velocity_gradient(material.NeedsVelocityGradient()),
          m_lagrangian_formulation_type(lagrangian_formulation_type),
          m_time_increment_device("TimeIncrementDevice"),
          m_stress_functor(*material.GetStressFunctor()) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }

        // Set the initial time increment on the device to 0
        Kokkos::deep_copy(m_time_increment_device, 0.0);

        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            displacements_field_name += "_inc";
        }

        // Get the field data
        m_displacement_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{displacements_field_name, FieldQueryState::NP1});
        m_force_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{force_field_name, FieldQueryState::None});

        m_displacement_gradient_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
        m_displacement_gradient_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});

        m_pk1_stress_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"pk1_stress", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        SetCoordinateField(mesh_data);
        SetReferenceDisplacementGradientField(mesh_data);
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
        if (m_lagrangian_formulation_type != LagrangianFormulationType::Total) {
            m_reference_displacement_gradient_field.UpdateField();
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

    void ForEachCellComputeForce(const SmoothedCellData &scd) {
        // Get th ngp mesh
        stk::mesh::NgpMesh ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_mesh_data->GetBulkData());

        // Get the number of cells
        const size_t num_cells = scd.NumCells();

        // Get the stride
        const size_t stride = m_has_state ? m_state_np1_field.GetStride() : 0;

        // Default Stride for a 3x3 matrix
        const Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> mat3_stride(3, 1);

        // Get the boolean values
        bool has_state = m_has_state;
        bool needs_velocity_gradient = m_needs_velocity_gradient;

        // Loop over all the cells
        Kokkos::parallel_for(
            "for_each_cell_gather_scatter_nodal_data", num_cells, KOKKOS_CLASS_LAMBDA(const size_t cell_id) {
                // Create a map around the state_old and state_new pointers
                const auto element_local_offsets = scd.GetCellElementLocalOffsets(cell_id);
                const stk::mesh::Entity element(element_local_offsets[0]);
                const stk::mesh::FastMeshIndex elem_index = ngp_mesh.fast_mesh_index(element);

                // Get the node local offsets and function derivatives
                const auto node_local_offsets = scd.GetCellNodeLocalOffsets(cell_id);
                const auto node_function_derivatives = scd.GetCellFunctionDerivatives(cell_id);

                const size_t num_nodes = node_local_offsets.extent(0);

                // Create maps for the function derivatives and displacement
                Eigen::Map<const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor>> b_matrix_map(node_function_derivatives.data(), num_nodes, 3);
                Eigen::Matrix<double, 3, 3> this_displacement_gradient = Eigen::Matrix<double, 3, 3>::Zero();

                // Calculate the displacement gradient
                for (size_t k = 0; k < num_nodes; ++k) {
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const aperi::Index node_index(ngp_mesh.fast_mesh_index(node));
                    const auto displacement_np1 = m_displacement_np1_field.GetConstEigenVectorMap<3>(node_index);
                    // Perform the matrix multiplication for field_data_to_gather_gradient
                    this_displacement_gradient += displacement_np1 * b_matrix_map.row(k);
                }

                // Compute the field gradients
                m_displacement_gradient_np1_field.Assign(elem_index, this_displacement_gradient);

                const auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index);

                // Get the number of state variables
                const size_t num_state_variables = m_has_state ? m_stress_functor.NumberOfStateVariables() : 0;

                Eigen::InnerStride<Eigen::Dynamic> state_stride(stride);
                const auto state_n_map = has_state ? m_state_n_field.GetConstEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);
                auto state_np1_map = has_state ? m_state_np1_field.GetEigenVectorMap(elem_index, num_state_variables) : Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);

                // Compute the velocity gradient if needed
                const auto velocity_gradient_map = needs_velocity_gradient ? Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(ComputeVelocityGradient(elem_index).data(), 3, 3, mat3_stride) : Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(nullptr, 3, 3, mat3_stride);

                // Compute the stress and internal force of the element.
                double volume = scd.GetCellVolume(cell_id);

                // PK1 stress
                auto pk1_stress_map = m_pk1_stress_field.GetEigenMatrixMap<3, 3>(elem_index);

                // Create a map around the state_old and state_new pointers
                Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(3, 1);

                m_stress_functor.GetStress(&displacement_gradient_np1_map, &velocity_gradient_map, &state_n_map, &state_np1_map, m_time_increment_device(0), pk1_stress_map);

                const Eigen::Matrix<double, 3, 3> pk1_stress_transpose_neg_volume = pk1_stress_map.transpose() * -volume;

                // Scatter the force to the nodes
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Calculate the force
                    const Eigen::Matrix<double, 1, 3> force = b_matrix_map.row(k) * pk1_stress_transpose_neg_volume;

                    // Add the force to the node
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const aperi::Index node_index(ngp_mesh.fast_mesh_index(node));
                    // Scatter the force to the nodes
                    m_force_field.AtomicAdd(node_index, force);
                }
            });
    }

   private:
    void SetCoordinateField(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        // Get the coordinates field
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated) {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"current_coordinates", FieldQueryState::N});
        } else if (m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"reference_coordinates", FieldQueryState::None});
        } else {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        }
    }

    void SetReferenceDisplacementGradientField(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        // Get the reference displacement gradient field
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated) {
            m_reference_displacement_gradient_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
        } else if (m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            m_reference_displacement_gradient_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"reference_displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
        }
    }

    void SetStateFields(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        if (m_has_state) {
            m_state_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
            m_state_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        }
    }

    std::shared_ptr<aperi::MeshData> m_mesh_data;                          // The mesh data object.
    bool m_has_state;                                                      // Whether the material has state
    bool m_needs_velocity_gradient;                                        // Whether the material needs the velocity gradient
    const aperi::LagrangianFormulationType m_lagrangian_formulation_type;  // The Lagrangian formulation type

    Kokkos::View<double *> m_time_increment_device;  // The time increment on the device

    aperi::Field<double> m_displacement_np1_field;                   // The field for the node displacements
    mutable aperi::Field<double> m_force_field;                      // The field for the node mass from elements
    aperi::Field<double> m_coordinates_field;                        // The field for the node coordinates
    aperi::Field<double> m_state_n_field;                            // The field for the node state at time n
    mutable aperi::Field<double> m_state_np1_field;                  // The field for the node state at time n+1
    aperi::Field<double> m_displacement_gradient_n_field;            // The field for the element displacement gradient
    aperi::Field<double> m_reference_displacement_gradient_field;    // The field for the element reference displacement gradient
    mutable aperi::Field<double> m_displacement_gradient_np1_field;  // The field for the element displacement gradient at time n+1
    mutable aperi::Field<double> m_pk1_stress_field;                 // The field for the element pk1 stress

    const StressFunctor &m_stress_functor;  // Functor for computing the stress of the material
};

}  // namespace aperi
