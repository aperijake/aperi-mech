#pragma once

#include <memory>
#include <vector>

#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldUtils.h"
#include "MeshData.h"
#include "Selector.h"

namespace aperi {

/**
 * @brief Struct for the explicit time integration fields.
 * @note These fields are used for all formulations.
 */
struct ExplicitTimeIntegrationFields {
    // Delete the default constructor
    ExplicitTimeIntegrationFields() = delete;

    // Constructor
    ExplicitTimeIntegrationFields(std::shared_ptr<aperi::MeshData> mesh_data)
        : mass_field(mesh_data, {"mass", FieldQueryState::None}),
          force_coefficients_field(mesh_data, {"force_coefficients", FieldQueryState::None}),
          acceleration_coefficients_n_field(mesh_data, {"acceleration_coefficients", FieldQueryState::N}),
          velocity_coefficients_n_field(mesh_data, {"velocity_coefficients", FieldQueryState::N}),
          displacement_coefficients_n_field(mesh_data, {"displacement_coefficients", FieldQueryState::N}),
          acceleration_coefficients_np1_field(mesh_data, {"acceleration_coefficients", FieldQueryState::NP1}),
          velocity_coefficients_np1_field(mesh_data, {"velocity_coefficients", FieldQueryState::NP1}),
          displacement_coefficients_np1_field(mesh_data, {"displacement_coefficients", FieldQueryState::NP1}) {}

    // Fields
    aperi::Field<double> mass_field;
    aperi::Field<double> force_coefficients_field;
    aperi::Field<double> acceleration_coefficients_n_field;
    aperi::Field<double> velocity_coefficients_n_field;
    aperi::Field<double> displacement_coefficients_n_field;
    aperi::Field<double> acceleration_coefficients_np1_field;
    aperi::Field<double> velocity_coefficients_np1_field;
    aperi::Field<double> displacement_coefficients_np1_field;
};

/**
 * @brief Add fields that are needed for the update Lagrangian formulation.
 */
struct ExplicitTimeIntegrationFieldsUpdated : public ExplicitTimeIntegrationFields {
    // Delete the default constructor
    ExplicitTimeIntegrationFieldsUpdated() = delete;

    // Constructor
    ExplicitTimeIntegrationFieldsUpdated(std::shared_ptr<aperi::MeshData> mesh_data)
        : ExplicitTimeIntegrationFields(mesh_data),
          displacement_coefficients_increment_field(mesh_data, {"displacement_coefficients_inc", FieldQueryState::None}),
          current_coordinates_n_field(mesh_data, {"current_coordinates", FieldQueryState::N}),
          current_coordinates_np1_field(mesh_data, {"current_coordinates", FieldQueryState::NP1}) {}

    // Fields
    aperi::Field<double> displacement_coefficients_increment_field;
    aperi::Field<double> current_coordinates_n_field;  // TODO(jake): probably should track current coordinates in all formulations
    aperi::Field<double> current_coordinates_np1_field;
};

/**
 * @brief Add fields that are needed for the semi Lagrangian formulation.
 */
struct ExplicitTimeIntegrationFieldsSemi : public ExplicitTimeIntegrationFieldsUpdated {
    // Delete the default constructor
    ExplicitTimeIntegrationFieldsSemi() = delete;

    // Constructor
    ExplicitTimeIntegrationFieldsSemi(std::shared_ptr<aperi::MeshData> mesh_data)
        : ExplicitTimeIntegrationFieldsUpdated(mesh_data),
          reference_coordinates_field(mesh_data, {"reference_coordinates", FieldQueryState::None}),
          reference_displacement_gradient_field(mesh_data, {"reference_displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT}),
          displacement_gradient_np1_field(mesh_data, {"displacement_gradient", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}) {}

    // Fields
    aperi::Field<double> reference_coordinates_field;
    aperi::Field<double> reference_displacement_gradient_field;
    aperi::Field<double> displacement_gradient_np1_field;
};

/**
 * @brief Functor for updating the nodal displacements for the total Lagrangian formulation.
 */
struct UpdateDisplacementsTotalFunctor {
    // Constructor
    UpdateDisplacementsTotalFunctor(const aperi::Field<double> &displacement_coefficients_n_field, const aperi::Field<double> &velocity_coefficients_np1_field, const aperi::Field<double> &displacement_coefficients_np1_field, const Kokkos::View<double> &time_increment_device)
        : m_displacement_coefficients_n_field(displacement_coefficients_n_field),
          m_velocity_coefficients_np1_field(velocity_coefficients_np1_field),
          m_displacement_coefficients_np1_field(displacement_coefficients_np1_field),
          m_time_increment_device(time_increment_device) {}

    void UpdateFields() {
        m_displacement_coefficients_n_field.UpdateField();
        m_velocity_coefficients_np1_field.UpdateField();
        m_displacement_coefficients_np1_field.UpdateField();
    }

    void MarkModifiedOnDevice() {
        m_displacement_coefficients_np1_field.MarkModifiedOnDevice();
    }

    // Functor
    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
        KOKKOS_ASSERT(3 == m_displacement_coefficients_n_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_velocity_coefficients_np1_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_displacement_coefficients_np1_field.GetNumComponentsPerEntity(index));
        double time_increment = m_time_increment_device();
        // Loop over each component and copy the data
        for (size_t i = 0; i < 3; ++i) {
            m_displacement_coefficients_np1_field(index, i) = m_displacement_coefficients_n_field(index, i) + time_increment * m_velocity_coefficients_np1_field(index, i);
        }
    }

   private:
    // Fields
    aperi::Field<double> m_displacement_coefficients_n_field;
    aperi::Field<double> m_velocity_coefficients_np1_field;
    mutable aperi::Field<double> m_displacement_coefficients_np1_field;
    const Kokkos::View<double> m_time_increment_device;
};

/**
 * @brief Functor for updating the nodal displacements for the semi Lagrangian formulation.
 * @note With updated Lagrangian, the displacement increment is for one time step.
 * @note With semi Lagrangian, the displacement increment is from the last reference configuration.
 */
struct UpdateDisplacementsUpdatedFunctor {
    // Constructor
    UpdateDisplacementsUpdatedFunctor(const aperi::Field<double> &displacement_coefficients_n_field, const aperi::Field<double> &velocity_coefficients_np1_field, const aperi::Field<double> &displacement_coefficients_np1_field, const aperi::Field<double> &displacement_coefficients_increment_field, const aperi::Field<double> &current_coordinates_n_field, const aperi::Field<double> &current_coordinates_np1_field, const Kokkos::View<double> &time_increment_device, bool is_semi_lagrangian = false)
        : m_displacement_coefficients_n_field(displacement_coefficients_n_field),
          m_velocity_coefficients_np1_field(velocity_coefficients_np1_field),
          m_displacement_coefficients_np1_field(displacement_coefficients_np1_field),
          m_displacement_coefficients_increment_field(displacement_coefficients_increment_field),
          m_current_coordinates_n_field(current_coordinates_n_field),
          m_current_coordinates_np1_field(current_coordinates_np1_field),
          m_time_increment_device(time_increment_device),
          m_is_semi_lagrangian(is_semi_lagrangian) {}

    void UpdateFields() {
        m_displacement_coefficients_n_field.UpdateField();
        m_velocity_coefficients_np1_field.UpdateField();
        m_displacement_coefficients_np1_field.UpdateField();
        m_displacement_coefficients_increment_field.UpdateField();
        m_current_coordinates_n_field.UpdateField();
        m_current_coordinates_np1_field.UpdateField();
    }

    void MarkModifiedOnDevice() {
        m_displacement_coefficients_np1_field.MarkModifiedOnDevice();
        m_current_coordinates_np1_field.MarkModifiedOnDevice();
        m_displacement_coefficients_increment_field.MarkModifiedOnDevice();
    }

    // Functor
    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
        KOKKOS_ASSERT(3 == m_displacement_coefficients_n_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_velocity_coefficients_np1_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_displacement_coefficients_np1_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_displacement_coefficients_increment_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_current_coordinates_n_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_current_coordinates_np1_field.GetNumComponentsPerEntity(index));
        double time_increment = m_time_increment_device();
        // Loop over each component and copy the data
        for (size_t i = 0; i < 3; ++i) {
            double displacement_increment = time_increment * m_velocity_coefficients_np1_field(index, i);
            m_displacement_coefficients_np1_field(index, i) = m_displacement_coefficients_n_field(index, i) + displacement_increment;
            if (m_is_semi_lagrangian) {
                // With semi Lagrangian, the displacement increment is from the last reference configuration.
                m_displacement_coefficients_increment_field(index, i) += displacement_increment;
            } else {
                // With updated Lagrangian, the displacement increment is for one time step.
                m_displacement_coefficients_increment_field(index, i) = displacement_increment;
            }
            m_current_coordinates_np1_field(index, i) = m_current_coordinates_n_field(index, i) + displacement_increment;
        }
    }

   private:
    // Fields
    aperi::Field<double> m_displacement_coefficients_n_field;
    aperi::Field<double> m_velocity_coefficients_np1_field;
    mutable aperi::Field<double> m_displacement_coefficients_np1_field;
    mutable aperi::Field<double> m_displacement_coefficients_increment_field;
    aperi::Field<double> m_current_coordinates_n_field;
    mutable aperi::Field<double> m_current_coordinates_np1_field;
    const Kokkos::View<double> m_time_increment_device;
    bool m_is_semi_lagrangian;
};

// Functor for computing the acceleration
struct ComputeAccelerationFunctor {
    // Constructor
    ComputeAccelerationFunctor(const aperi::Field<double> &mass_field, const aperi::Field<double> &force_coefficients_field, const aperi::Field<double> &acceleration_coefficients_np1_field)
        : m_mass_field(mass_field), m_force_coefficients_field(force_coefficients_field), m_acceleration_coefficients_np1_field(acceleration_coefficients_np1_field) {}

    void UpdateFields() {
        m_acceleration_coefficients_np1_field.UpdateField();
        m_force_coefficients_field.UpdateField();
        m_mass_field.UpdateField();
    }

    void MarkModifiedOnDevice() {
        m_acceleration_coefficients_np1_field.MarkModifiedOnDevice();
    }

    // Functor
    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Compute the acceleration: a^{n+1} = M^{–1}(f^{n+1})
        KOKKOS_ASSERT(3 == m_force_coefficients_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_mass_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_acceleration_coefficients_np1_field.GetNumComponentsPerEntity(index));
        // Loop over each component and copy the data
        for (size_t i = 0; i < 3; ++i) {
            m_acceleration_coefficients_np1_field(index, i) = m_force_coefficients_field(index, i) / m_mass_field(index, i);
        }
    }

   private:
    // Fields
    aperi::Field<double> m_mass_field;
    aperi::Field<double> m_force_coefficients_field;
    mutable aperi::Field<double> m_acceleration_coefficients_np1_field;
};

// Functor for computing the first partial update
struct ComputeFirstPartialUpdateFunctor {
    // Constructor
    ComputeFirstPartialUpdateFunctor(const aperi::Field<double> &velocity_coefficients_n_field, const aperi::Field<double> &acceleration_coefficients_n_field, const aperi::Field<double> &velocity_coefficients_np1_field, const Kokkos::View<double> &half_time_increment_device)
        : m_velocity_coefficients_n_field(velocity_coefficients_n_field),
          m_acceleration_coefficients_n_field(acceleration_coefficients_n_field),
          m_velocity_coefficients_np1_field(velocity_coefficients_np1_field),
          m_half_time_increment_device(half_time_increment_device) {}

    void UpdateFields() {
        m_velocity_coefficients_n_field.UpdateField();
        m_acceleration_coefficients_n_field.UpdateField();
        m_velocity_coefficients_np1_field.UpdateField();
    }

    void MarkModifiedOnDevice() {
        m_velocity_coefficients_np1_field.MarkModifiedOnDevice();
    }

    // Functor
    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
        KOKKOS_ASSERT(3 == m_velocity_coefficients_n_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_acceleration_coefficients_n_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_velocity_coefficients_np1_field.GetNumComponentsPerEntity(index));
        // Loop over each component and copy the data
        double half_time_increment = m_half_time_increment_device();
        for (size_t i = 0; i < 3; ++i) {
            m_velocity_coefficients_np1_field(index, i) = m_velocity_coefficients_n_field(index, i) + half_time_increment * m_acceleration_coefficients_n_field(index, i);
        }
    }

   private:
    // Fields
    aperi::Field<double> m_velocity_coefficients_n_field;
    aperi::Field<double> m_acceleration_coefficients_n_field;
    mutable aperi::Field<double> m_velocity_coefficients_np1_field;
    const Kokkos::View<double> m_half_time_increment_device;
};

// Functor for computing the second partial update
struct ComputeSecondPartialUpdateFunctor {
    // Constructor
    ComputeSecondPartialUpdateFunctor(const aperi::Field<double> &velocity_coefficients_np1_field, const aperi::Field<double> &acceleration_coefficients_np1_field, const Kokkos::View<double> &half_time_increment_device)
        : m_velocity_coefficients_np1_field(velocity_coefficients_np1_field),
          m_acceleration_coefficients_np1_field(acceleration_coefficients_np1_field),
          m_half_time_increment_device(half_time_increment_device) {}

    void UpdateFields() {
        m_velocity_coefficients_np1_field.UpdateField();
        m_acceleration_coefficients_np1_field.UpdateField();
    }

    void MarkModifiedOnDevice() {
        m_velocity_coefficients_np1_field.MarkModifiedOnDevice();
    }

    // Functor
    KOKKOS_INLINE_FUNCTION void operator()(const aperi::Index &index) const {
        // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
        KOKKOS_ASSERT(3 == m_velocity_coefficients_np1_field.GetNumComponentsPerEntity(index));
        KOKKOS_ASSERT(3 == m_acceleration_coefficients_np1_field.GetNumComponentsPerEntity(index));
        double half_time_increment = m_half_time_increment_device();
        // Loop over each component and copy the data
        for (size_t i = 0; i < 3; ++i) {
            m_velocity_coefficients_np1_field(index, i) += half_time_increment * m_acceleration_coefficients_np1_field(index, i);
        }
    }

   private:
    // Fields
    mutable aperi::Field<double> m_velocity_coefficients_np1_field;
    aperi::Field<double> m_acceleration_coefficients_np1_field;
    const Kokkos::View<double> m_half_time_increment_device;
};

/**
 * @brief Base class for the explicit time integrator.
 *
 * This class provides functionality for the explicit time integration of a system of equations.
 */
class ExplicitTimeIntegrator {
   public:
    // Constructor
    explicit ExplicitTimeIntegrator(const ExplicitTimeIntegrationFields &fields, std::shared_ptr<aperi::MeshData> mesh_data, aperi::Selector active_selector)
        : mp_mesh_data(mesh_data),
          m_active_selector(active_selector),
          m_time_increment_device("TimeIncrementDevice"),
          m_half_time_increment_device("HalfTimeIncrementDevice"),
          m_compute_acceleration_functor(fields.mass_field, fields.force_coefficients_field, fields.acceleration_coefficients_np1_field),
          m_compute_first_partial_update_functor(fields.velocity_coefficients_n_field, fields.acceleration_coefficients_n_field, fields.velocity_coefficients_np1_field, m_half_time_increment_device),
          m_compute_second_partial_update_functor(fields.velocity_coefficients_np1_field, fields.acceleration_coefficients_np1_field, m_half_time_increment_device) {
    }

    // Destructor
    virtual ~ExplicitTimeIntegrator() = default;

    void SetTimeIncrement(double time_increment) {
        // Set the time increment
        Kokkos::deep_copy(m_time_increment_device, time_increment);
        // Set the half time increment
        Kokkos::deep_copy(m_half_time_increment_device, 0.5 * time_increment);
    }

    // Compute the acceleration
    void ComputeAcceleration() {
        // Loop over each entity and compute the acceleration
        m_compute_acceleration_functor.UpdateFields();
        ForEachNode(m_compute_acceleration_functor, *mp_mesh_data, m_active_selector);
        m_compute_acceleration_functor.MarkModifiedOnDevice();
    }

    // Compute the first partial update
    void ComputeFirstPartialUpdate() {
        // Loop over each entity and compute the first partial update
        m_compute_first_partial_update_functor.UpdateFields();
        ForEachNode(m_compute_first_partial_update_functor, *mp_mesh_data, m_active_selector);
        m_compute_first_partial_update_functor.MarkModifiedOnDevice();
    }

    // Update the displacements
    virtual void UpdateDisplacements() = 0;

    // Update the reference coordinates
    virtual void UpdateReferenceConfiguration() {}

    // Compute the second partial update
    void ComputeSecondPartialUpdate() {
        // Loop over each entity and compute the second partial update
        m_compute_second_partial_update_functor.UpdateFields();
        ForEachNode(m_compute_second_partial_update_functor, *mp_mesh_data, m_active_selector);
        m_compute_second_partial_update_functor.MarkModifiedOnDevice();
    }

   protected:
    std::shared_ptr<aperi::MeshData> mp_mesh_data;  // Mesh data
    aperi::Selector m_active_selector;              // Active selector

    Kokkos::View<double> m_time_increment_device;       // Device view of the time increment
    Kokkos::View<double> m_half_time_increment_device;  // Device view of the half time increment

    ComputeAccelerationFunctor m_compute_acceleration_functor;                  // Acceleration functor
    ComputeFirstPartialUpdateFunctor m_compute_first_partial_update_functor;    // First partial update functor
    ComputeSecondPartialUpdateFunctor m_compute_second_partial_update_functor;  // Second partial update functor
};

class ExplicitTimeIntegratorTotal : public ExplicitTimeIntegrator {
   public:
    // Constructor
    explicit ExplicitTimeIntegratorTotal(const ExplicitTimeIntegrationFields &fields, std::shared_ptr<aperi::MeshData> mesh_data, aperi::Selector active_selector)
        : ExplicitTimeIntegrator(fields, mesh_data, active_selector), m_update_displacements_functor(fields.displacement_coefficients_n_field, fields.velocity_coefficients_np1_field, fields.displacement_coefficients_np1_field, m_time_increment_device) {}

    // Update the displacements
    void UpdateDisplacements() override {
        // Loop over each entity and update the displacements
        m_update_displacements_functor.UpdateFields();
        ForEachNode(m_update_displacements_functor, *mp_mesh_data, m_active_selector);
        m_update_displacements_functor.MarkModifiedOnDevice();
    }

   private:
    UpdateDisplacementsTotalFunctor m_update_displacements_functor;  // Update displacements functor
};

class ExplicitTimeIntegratorUpdated : public ExplicitTimeIntegrator {
   public:
    // Constructor
    explicit ExplicitTimeIntegratorUpdated(const ExplicitTimeIntegrationFieldsUpdated &fields, std::shared_ptr<aperi::MeshData> mesh_data, aperi::Selector active_selector)
        : ExplicitTimeIntegrator(fields, mesh_data, active_selector), m_update_displacements_functor(fields.displacement_coefficients_n_field, fields.velocity_coefficients_np1_field, fields.displacement_coefficients_np1_field, fields.displacement_coefficients_increment_field, fields.current_coordinates_n_field, fields.current_coordinates_np1_field, m_time_increment_device) {}

    // Update the displacements
    void UpdateDisplacements() override {
        // Loop over each entity and update the displacements
        m_update_displacements_functor.UpdateFields();
        ForEachNode(m_update_displacements_functor, *mp_mesh_data, m_active_selector);
        m_update_displacements_functor.MarkModifiedOnDevice();
    }

   private:
    UpdateDisplacementsUpdatedFunctor m_update_displacements_functor;  // Update displacements functor
};

class ExplicitTimeIntegratorSemi : public ExplicitTimeIntegrator {
   public:
    // Constructor
    explicit ExplicitTimeIntegratorSemi(const ExplicitTimeIntegrationFieldsSemi &fields, std::shared_ptr<aperi::MeshData> mesh_data, aperi::Selector active_selector)
        : ExplicitTimeIntegrator(fields, mesh_data, active_selector), m_update_displacements_functor(fields.displacement_coefficients_n_field, fields.velocity_coefficients_np1_field, fields.displacement_coefficients_np1_field, fields.displacement_coefficients_increment_field, fields.current_coordinates_n_field, fields.current_coordinates_np1_field, m_time_increment_device, true), m_current_coordinates_np1_field(fields.current_coordinates_np1_field), m_reference_coordinates_field(fields.reference_coordinates_field), m_displacement_coefficients_increment_field(fields.displacement_coefficients_increment_field), m_displacement_gradient_np1_field(fields.displacement_gradient_np1_field), m_reference_displacement_gradient_field(fields.reference_displacement_gradient_field) {}

    // Update the displacements
    void UpdateDisplacements() override {
        // Loop over each entity and update the displacements
        m_update_displacements_functor.UpdateFields();
        ForEachNode(m_update_displacements_functor, *mp_mesh_data, m_active_selector);
        m_update_displacements_functor.MarkModifiedOnDevice();
    }

    // Update the reference coordinates
    void UpdateReferenceConfiguration() override {
        // Update the fields
        m_current_coordinates_np1_field.UpdateField();
        m_reference_coordinates_field.UpdateField();
        m_displacement_coefficients_increment_field.UpdateField();
        m_displacement_gradient_np1_field.UpdateField();
        m_reference_displacement_gradient_field.UpdateField();

        // Copy the current coordinates to the reference coordinates
        aperi::CopyField(m_current_coordinates_np1_field, m_reference_coordinates_field, m_active_selector);

        // Zero the displacement increment
        m_displacement_coefficients_increment_field.Zero(m_active_selector);

        // Copy the displacement gradient to the reference displacement gradient
        aperi::CopyField(m_displacement_gradient_np1_field, m_reference_displacement_gradient_field);

        // Mark the m_as modified
        m_reference_coordinates_field.MarkModifiedOnDevice();
        m_displacement_coefficients_increment_field.MarkModifiedOnDevice();
        m_reference_displacement_gradient_field.MarkModifiedOnDevice();
    }

   private:
    UpdateDisplacementsUpdatedFunctor m_update_displacements_functor;  // Update displacements functor
    aperi::Field<double> m_current_coordinates_np1_field;              // The field for the node current coordinates at time n+1
    aperi::Field<double> m_reference_coordinates_field;                // The field for the node reference coordinates
    aperi::Field<double> m_displacement_coefficients_increment_field;  // The field for the node displacement increment
    aperi::Field<double> m_displacement_gradient_np1_field;            // The field for the element displacement gradient at time n+1
    aperi::Field<double> m_reference_displacement_gradient_field;      // The field for the element reference displacement gradient
};

// Create the explicit time integrator
inline std::shared_ptr<ExplicitTimeIntegrator> CreateExplicitTimeIntegrator(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &active_selector, const aperi::LagrangianFormulationType &lagrangian_formulation_type) {
    // Create the explicit time integration fields

    // Create the explicit time integrator
    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated) {
        ExplicitTimeIntegrationFieldsUpdated fields(mesh_data);
        return std::make_shared<ExplicitTimeIntegratorUpdated>(fields, mesh_data, active_selector);
    } else if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Total) {
        ExplicitTimeIntegrationFields fields(mesh_data);
        return std::make_shared<ExplicitTimeIntegratorTotal>(fields, mesh_data, active_selector);
    } else if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        ExplicitTimeIntegrationFieldsSemi fields(mesh_data);
        return std::make_shared<ExplicitTimeIntegratorSemi>(fields, mesh_data, active_selector);
    } else {
        // Throw an logic error
        throw std::logic_error("Invalid Lagrangian formulation type.");
    }
}

}  // namespace aperi
