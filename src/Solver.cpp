#include "Solver.h"

#include <numeric>

#include "BoundaryCondition.h"
#include "ExternalForceContribution.h"
#include "FieldData.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "LogUtils.h"
#include "MassUtils.h"
#include "Material.h"
#include "MeshData.h"
#include "NodeProcessor.h"
#include "Scheduler.h"
#include "TimeStepper.h"

namespace aperi {

/*
# Explicit time integration algorithm for nonlinear problems
Reference:
- Belytschko, Ted; Liu, Wing Kam; Moran, Brian; Elkhodary, Khalil. Nonlinear Finite Elements for Continua and Structures. Wiley. Kindle Edition.
  - Chapter 6.2.1 Explicit time integration algorithm for nonlinear problems
  - Box 6.1 Flow chart for explicit time integration, p. 333
    1. Initial conditions and initialization:
       a. set v^0, \sigma^0, and initial values of other material state variables
       b. d^0 = 0, n = 0, t = 0
       c. compute M
    2. getforce
    3. Compute accelerations a^n = M^{–1}(f^n – C^{damp} v^{n–½})
    4. Time update:
        - t^{n+1} = t^n + Δt^{n+½}
        - t^{n+½} = ½(t^n + t^{n+1})
    5. First partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
    6. Enforce velocity boundary conditions:
       a: if node I on \gamma_v_i : v_{iI}^{n+½} = \overbar{v}_I(x_I,t^{n+½})
    7. Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
    8. getforce
    9. compute a^{n+1}
    10. Second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
    11. Check energy balance at time step n + 1: see (6.2.14–18)
    12. Update counter: n ← n + 1
    13. Output; if simulation not complete, go to 4.
*/

void ExplicitSolver::ComputeForce() {
    // Set the force field to zero
    m_node_processor_force->FillField(0.0, 0);
    m_node_processor_force->MarkFieldModifiedOnDevice(0);

    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeForce();
    }
    for (const auto &external_force_contribution : m_external_force_contributions) {
        external_force_contribution->ComputeForce();
    }
}
struct ComputeAccelerationFunctor {
    KOKKOS_INLINE_FUNCTION
    void operator()(double *acceleration_data_np1, const double *force_data_np1, const double *mass_data_n) const {
        *acceleration_data_np1 = *force_data_np1 / *mass_data_n;
    }
};

void ExplicitSolver::ComputeAcceleration(const std::shared_ptr<NodeProcessor<3>> &node_processor_acceleration) {
    // Compute acceleration: a^{n} = M^{–1}(f^{n})
    ComputeAccelerationFunctor compute_acceleration_functor;
    node_processor_acceleration->for_each_dof(compute_acceleration_functor);
    node_processor_acceleration->MarkFieldModifiedOnDevice(0);
}

struct ComputeFirstPartialUpdateFunctor {
    ComputeFirstPartialUpdateFunctor(double half_time_increment) : m_half_time_increment(half_time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *velocity_data_np1, const double *velocity_data_n, const double *acceleration_data_n) const {
        *velocity_data_np1 = *velocity_data_n + m_half_time_increment * *acceleration_data_n;
    }
    double m_half_time_increment;
};

void ExplicitSolver::ComputeFirstPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor<3>> &node_processor_first_update) {
    // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
    ComputeFirstPartialUpdateFunctor compute_first_partial_update_functor(half_time_increment);
    node_processor_first_update->for_each_dof(compute_first_partial_update_functor);
    node_processor_first_update->MarkFieldModifiedOnDevice(0);
}

struct UpdateDisplacementsFunctor {
    UpdateDisplacementsFunctor(double time_increment) : m_time_increment(time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *displacement_data_np1, const double *displacement_data_n, const double *velocity_data_np1) const {
        *displacement_data_np1 = *displacement_data_n + m_time_increment * *velocity_data_np1;
    }
    double m_time_increment;
};

void ExplicitSolver::UpdateDisplacements(double time_increment, const std::shared_ptr<NodeProcessor<3>> &node_processor_update_displacements) {
    // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
    UpdateDisplacementsFunctor update_displacements_functor(time_increment);
    node_processor_update_displacements->for_each_dof(update_displacements_functor);
    node_processor_update_displacements->MarkFieldModifiedOnDevice(0);

    // If there is more than one processor, communicate the field data that other processors need
    if (m_num_processors > 1) {
        node_processor_update_displacements->SyncFieldDeviceToHost(0);
        node_processor_update_displacements->CommunicateFieldData(0);
        node_processor_update_displacements->MarkFieldModifiedOnHost(0);
        node_processor_update_displacements->SyncFieldHostToDevice(0);
    }
}

struct ComputeSecondPartialUpdateFunctor {
    ComputeSecondPartialUpdateFunctor(double half_time_increment) : m_half_time_increment(half_time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *velocity_data_np1, const double *acceleration_data_np1) const {
        *velocity_data_np1 += m_half_time_increment * *acceleration_data_np1;
    }
    double m_half_time_increment;
};

void ExplicitSolver::ComputeSecondPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor<2>> &node_processor_second_update) {
    // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
    ComputeSecondPartialUpdateFunctor compute_second_partial_update_functor(half_time_increment);
    node_processor_second_update->for_each_dof(compute_second_partial_update_functor);
    node_processor_second_update->MarkFieldModifiedOnDevice(0);
}

void ExplicitSolver::Solve() {
    // Compute mass matrix
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        ComputeMassMatrix(mp_mesh_data, internal_force_contribution->GetPartName(), internal_force_contribution->GetMaterial()->GetDensity());
    }
    // Mark and sync all mass from host to device
    // TODO(jake): Remove this line when possible. Needed while mass calc is on host.
    m_node_processor_all->MarkFieldModifiedOnHost(8);
    m_node_processor_all->SyncFieldHostToDevice(8);

    // Create node processors for each step of the time integration algorithm
    // The node processors are used to loop over the degrees of freedom (dofs) of the mesh and apply the time integration algorithm to each dof
    std::shared_ptr<NodeProcessor<3>> node_processor_first_update = CreateNodeProcessorFirstUpdate();
    std::shared_ptr<NodeProcessor<3>> node_processor_update_displacements = CreateNodeProcessorUpdateDisplacements();
    std::shared_ptr<NodeProcessor<3>> node_processor_acceleration = CreateNodeProcessorAcceleration();
    std::shared_ptr<NodeProcessor<2>> node_processor_second_update = CreateNodeProcessorSecondUpdate();

    // Set the initial time, t = 0
    double time = 0.0;

    // Set the initial increment, n = 0
    size_t n = 0;

    // Compute initial forces, done at state np1 as states will be swapped at the start of the time loop
    ComputeForce();

    // Compute initial accelerations, done at state np1 as states will be swapped at the start of the time loop
    ComputeAcceleration(node_processor_acceleration);

    // Output initial state
    aperi::CoutP0() << std::scientific << std::setprecision(6);  // Set output to scientific notation and 6 digits of precision
    if (m_output_scheduler->AtNextEvent(time)) {
        aperi::CoutP0() << "Writing Results at Time 0.0" << std::endl;
        m_io_mesh->WriteFieldResults(time);
    }

    // Get the initial time step
    double time_increment = m_time_stepper->GetTimeIncrement(time);

    // Loop over time steps
    while (m_time_stepper->AtEnd(time) == false) {
        aperi::CoutP0() << "Starting Time Increment " << n << ". Time " << time << " to " << time + time_increment << std::endl;

        // Move state n+1 to state n
        m_node_processor_all->SyncAllFieldsDeviceToHost();
        mp_mesh_data->UpdateFieldDataStates();
        m_node_processor_all->MarkAllFieldsModifiedOnHost();
        m_node_processor_all->SyncAllFieldsHostToDevice();

        double half_time_increment = 0.5 * time_increment;
        double time_midstep = time + half_time_increment;
        double time_next = time + time_increment;

        // Compute first partial update
        ComputeFirstPartialUpdate(half_time_increment, node_processor_first_update);

        // Enforce essential boundary conditions: node I on \gamma_v_i : v_{iI}^{n+½} = \overbar{v}_I(x_I,t^{n+½})
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyVelocity(time_midstep);
        }

        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
        UpdateDisplacements(time_increment, node_processor_update_displacements);

        // Compute the force, f^{n+1}
        ComputeForce();

        // Compute the acceleration, a^{n+1}
        ComputeAcceleration(node_processor_acceleration);

        // Set acceleration on essential boundary conditions. Overwrites acceleration from ComputeAcceleration above so that the acceleration is consistent with the velocity boundary condition.
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyAcceleration(time_next);
        }

        // Compute the second partial update
        ComputeSecondPartialUpdate(half_time_increment, node_processor_second_update);

        // Compute the energy balance
        // TODO(jake): Compute energy balance

        // Update the time, t = t^{n+1}
        time += time_increment;

        // Update the increment, n = n + 1
        n = n + 1;

        // Get the next time step, Δt^{n+½}
        time_increment = m_time_stepper->GetTimeIncrement(time);

        // Output
        if (m_output_scheduler->AtNextEvent(time)) {
            aperi::CoutP0() << "Writing Results at Time " << time << std::endl;
            m_node_processor_all->SyncAllFieldsDeviceToHost();
            m_io_mesh->WriteFieldResults(time);
        }
    }
}

}  // namespace aperi
