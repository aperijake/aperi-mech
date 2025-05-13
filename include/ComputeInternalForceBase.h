#pragma once

#include <Eigen/Dense>
#include <memory>
#include <string>

#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "Index.h"
#include "Material.h"
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Base class for computing the internal force of elements.
 *
 * This class provides common functionality for computing the internal force of elements.
 * Derived classes should implement specific methods for different types of force computation.
 */
template <typename StressFunctor>
class ComputeInternalForceBase {
   public:
    /**
     * @brief Constructs a ComputeInternalForceBase object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param displacements_field_name The name of the displacements field.
     * @param force_field_name The name of the force field.
     * @param material The material object.
     * @param lagrangian_formulation_type The Lagrangian formulation type.
     * @param use_f_bar Whether to use f_bar.
     */
    ComputeInternalForceBase(std::shared_ptr<aperi::MeshData> mesh_data,
                             std::string displacements_field_name,
                             const std::string &force_field_name,
                             const Material &material,
                             const LagrangianFormulationType &lagrangian_formulation_type,
                             bool use_f_bar = false)
        : m_mesh_data(mesh_data),
          m_use_f_bar(use_f_bar),
          m_has_state(material.HasState()),
          m_needs_velocity_gradient(material.NeedsVelocityGradient()),
          m_needs_old_stress(material.NeedsOldStress()),
          m_has_damage(material.HasDamage()),
          m_lagrangian_formulation_type(lagrangian_formulation_type),
          m_time_increment_device("TimeIncrementDevice"),
          m_stress_functor(*material.GetStressFunctor()) {
        // Set the initial time increment on the device to 0
        Kokkos::deep_copy(m_time_increment_device, 0.0);

        // Throw an exception if the mesh data is null.
        if (m_mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }

        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi || m_lagrangian_formulation_type == LagrangianFormulationType::Incremental) {
            displacements_field_name += "_inc";
        }

        // Get the field data
        m_displacement_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{displacements_field_name, FieldQueryState::NP1});
        m_force_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{force_field_name, FieldQueryState::None});

        m_displacement_gradient_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
        m_displacement_gradient_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});

        m_pk1_stress_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"pk1_stress", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});

        if (m_needs_old_stress) {
            m_pk1_stress_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"pk1_stress", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
        }

        if (m_use_f_bar) {
            m_displacement_gradient_bar_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient_bar", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
            m_displacement_gradient_bar_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient_bar", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
            m_pk1_stress_bar_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"pk1_stress_bar", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
            if (m_needs_old_stress) {
                m_pk1_stress_bar_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"pk1_stress_bar", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
            }
        }

        SetCoordinateField(mesh_data);
        SetReferenceDisplacementGradientField(mesh_data);
        SetStateFields(mesh_data);
    }

    /**
     * @brief Sets the time increment.
     * @param time_increment The time increment.
     */
    void SetTimeIncrement(double time_increment) {
        Kokkos::deep_copy(m_time_increment_device, time_increment);
    }

    /**
     * @brief Updates the fields.
     */
    void UpdateFields() {
        m_displacement_np1_field.UpdateField();
        m_force_field.UpdateField();
        m_coordinates_field.UpdateField();
        m_displacement_gradient_n_field.UpdateField();
        m_displacement_gradient_np1_field.UpdateField();
        m_pk1_stress_field.UpdateField();
        if (m_needs_old_stress) {
            m_pk1_stress_n_field.UpdateField();
        }
        if (m_use_f_bar) {
            m_displacement_gradient_bar_n_field.UpdateField();
            m_displacement_gradient_bar_np1_field.UpdateField();
            m_pk1_stress_bar_field.UpdateField();
            if (m_needs_old_stress) {
                m_pk1_stress_bar_n_field.UpdateField();
            }
        }
        if (m_has_state) {
            m_state_n_field.UpdateField();
            m_state_np1_field.UpdateField();
        }
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            m_reference_displacement_gradient_field.UpdateField();
        }
    }

    /**
     * @brief Marks the fields as modified on the device.
     */
    void MarkFieldsModifiedOnDevice() {
        m_force_field.MarkModifiedOnDevice();
        m_displacement_gradient_np1_field.MarkModifiedOnDevice();
        m_pk1_stress_field.MarkModifiedOnDevice();
        if (m_use_f_bar) {
            m_displacement_gradient_bar_np1_field.MarkModifiedOnDevice();
            m_pk1_stress_bar_field.MarkModifiedOnDevice();
        }
        if (m_has_state) {
            m_state_np1_field.MarkModifiedOnDevice();
        }
    }

    /**
     * @brief Compute the displacement gradient and assign it to the field.
     * @param elem_index The element index.
     * @todo This should be moved to a separate functor.
     */
    KOKKOS_INLINE_FUNCTION void ComputeDisplacementGradient(const aperi::Index &elem_index, const Eigen::Matrix<double, 3, 3> &input_displacement_gradient) const {
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            // Updated Lagrangian formulation. Displacement is the increment. B matrix is in the current configuration.
            // Calculate the displacement gradient from the increment and previous displacement gradient.
            //  - ΔH^{n+1} = B * Δd^{n+½}
            //  - H^{n+1} = ΔH^{n+1} + H^{n} + ΔH^{n+1} * H^{n}
            const auto reference_displacement_gradient_map = m_reference_displacement_gradient_field.GetConstEigenMatrixMap<3, 3>(elem_index);
            m_displacement_gradient_np1_field.Assign(elem_index, input_displacement_gradient + reference_displacement_gradient_map + input_displacement_gradient * reference_displacement_gradient_map);

        } else if (m_lagrangian_formulation_type == LagrangianFormulationType::Incremental) {
            const auto displacement_gradient_n_map = m_displacement_gradient_n_field.GetConstEigenMatrixMap<3, 3>(elem_index);
            m_displacement_gradient_np1_field.Assign(elem_index, input_displacement_gradient + displacement_gradient_n_map);
        } else {
            // Total formulation. Displacement is the total displacement. B matrix is in the reference configuration. Input displacement gradient is the total displacement gradient.
            m_displacement_gradient_np1_field.Assign(elem_index, input_displacement_gradient);
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
        const auto displacement_gradient_n_map = m_use_f_bar ? m_displacement_gradient_bar_n_field.GetConstEigenMatrixMap<3, 3>(elem_index) : m_displacement_gradient_n_field.GetConstEigenMatrixMap<3, 3>(elem_index);
        const auto displacement_gradient_np1_map = m_use_f_bar ? m_displacement_gradient_bar_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index) : m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index);
        return (displacement_gradient_np1_map - displacement_gradient_n_map) / m_time_increment_device(0) * InvertMatrix<3>(displacement_gradient_n_map + Eigen::Matrix3d::Identity());
    }

   protected:
    /**
     * @brief Sets the coordinate field.
     * @param mesh_data A shared pointer to the MeshData object.
     */
    void SetCoordinateField(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated) {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"current_coordinates_n", FieldQueryState::None});
        } else if (m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"reference_coordinates", FieldQueryState::None});
        } else {
            m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        }
    }

    /**
     * @brief Sets the reference displacement gradient field.
     * @param mesh_data A shared pointer to the MeshData object.
     */
    void SetReferenceDisplacementGradientField(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated) {
            m_reference_displacement_gradient_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"displacement_gradient", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
        } else if (m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            m_reference_displacement_gradient_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"reference_displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
        }
    }

    /**
     * @brief Sets the state fields.
     * @param mesh_data A shared pointer to the MeshData object.
     */
    void SetStateFields(const std::shared_ptr<aperi::MeshData> &mesh_data) {
        if (m_has_state) {
            m_state_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::N, FieldDataTopologyRank::ELEMENT});
            m_state_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        }
    }

    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    bool m_use_f_bar;
    bool m_has_state;                                                      // Whether the material has state.
    bool m_needs_velocity_gradient;                                        // Whether the material needs the velocity gradient.
    bool m_needs_old_stress;                                               // Whether the material needs the old stress.
    bool m_has_damage;                                                     // Whether the material has damage.
    const aperi::LagrangianFormulationType m_lagrangian_formulation_type;  // The Lagrangian formulation type.

    Kokkos::View<double *> m_time_increment_device;  // The time increment on the device.

    aperi::Field<double> m_displacement_np1_field;                       // The field for the node displacements.
    mutable aperi::Field<double> m_force_field;                          // The field for the node mass from elements.
    aperi::Field<double> m_coordinates_field;                            // The field for the node coordinates.
    aperi::Field<double> m_state_n_field;                                // The field for the node state at time n.
    mutable aperi::Field<double> m_state_np1_field;                      // The field for the node state at time n+1.
    aperi::Field<double> m_displacement_gradient_n_field;                // The field for the element displacement gradient.
    aperi::Field<double> m_displacement_gradient_bar_n_field;            // The field for the element displacement gradient bar.
    aperi::Field<double> m_reference_displacement_gradient_field;        // The field for the element reference displacement gradient.
    mutable aperi::Field<double> m_displacement_gradient_np1_field;      // The field for the element displacement gradient at time n+1.
    mutable aperi::Field<double> m_displacement_gradient_bar_np1_field;  // The field for the element displacement gradient bar at time n+1.
    aperi::Field<double> m_pk1_stress_n_field;                           // The field for the element pk1 stress.
    aperi::Field<double> m_pk1_stress_bar_n_field;                       // The field for the element pk1 stress bar.
    mutable aperi::Field<double> m_pk1_stress_field;                     // The field for the element pk1 stress.
    mutable aperi::Field<double> m_pk1_stress_bar_field;                 // The field for the element pk1 stress bar.

    const StressFunctor &m_stress_functor;  // Functor for computing the stress of the material
};

}  // namespace aperi