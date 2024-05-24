#include "Solver.h"

#include <chrono>
#include <numeric>

#include "BoundaryCondition.h"
#include "EntityProcessor.h"
#include "ExternalForceContribution.h"
#include "FieldData.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "LogUtils.h"
#include "MassUtils.h"
#include "Material.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
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
    node_processor_acceleration->for_each_component(compute_acceleration_functor);
    node_processor_acceleration->MarkFieldModifiedOnDevice(0);
}

struct ComputeFirstPartialUpdateFunctor {
    explicit ComputeFirstPartialUpdateFunctor(double half_time_increment) : m_half_time_increment(half_time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *velocity_data_np1, const double *velocity_data_n, const double *acceleration_data_n) const {
        *velocity_data_np1 = *velocity_data_n + m_half_time_increment * *acceleration_data_n;
    }
    double m_half_time_increment;
};

void ExplicitSolver::ComputeFirstPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor<3>> &node_processor_first_update) {
    // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
    ComputeFirstPartialUpdateFunctor compute_first_partial_update_functor(half_time_increment);
    node_processor_first_update->for_each_component(compute_first_partial_update_functor);
    node_processor_first_update->MarkFieldModifiedOnDevice(0);
}

struct UpdateDisplacementsFunctor {
    explicit UpdateDisplacementsFunctor(double time_increment) : m_time_increment(time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *displacement_data_np1, const double *displacement_data_n, const double *velocity_data_np1) const {
        *displacement_data_np1 = *displacement_data_n + m_time_increment * *velocity_data_np1;
    }
    double m_time_increment;
};

void ExplicitSolver::UpdateDisplacements(double time_increment, const std::shared_ptr<NodeProcessor<3>> &node_processor_update_displacements) {
    // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
    UpdateDisplacementsFunctor update_displacements_functor(time_increment);
    node_processor_update_displacements->for_each_component(update_displacements_functor);
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
    explicit ComputeSecondPartialUpdateFunctor(double half_time_increment) : m_half_time_increment(half_time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *velocity_data_np1, const double *acceleration_data_np1) const {
        *velocity_data_np1 += m_half_time_increment * *acceleration_data_np1;
    }
    double m_half_time_increment;
};

void ExplicitSolver::ComputeSecondPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor<2>> &node_processor_second_update) {
    // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
    ComputeSecondPartialUpdateFunctor compute_second_partial_update_functor(half_time_increment);
    node_processor_second_update->for_each_component(compute_second_partial_update_functor);
    node_processor_second_update->MarkFieldModifiedOnDevice(0);
}

void ExplicitSolver::UpdateFieldStates() {
    bool rotate_device_states = true;
    mp_mesh_data->UpdateFieldDataStates(rotate_device_states);
}

void ExplicitSolver::WriteOutput(double time) {
    /** We are done with state N at this point. For fields that are generalized, calculate values from the stored function value coefficients:
    //   - Rotate states to put N into NP1
    //   - Calculate physical quantities at the temporary NP1
    //   - Write output (along with any other fields that are not generalized)
    //   - Rotate back
    */
    std::array<aperi::FieldQueryData, 3> dest_field_query_data;
    dest_field_query_data[0] = {"displacement", FieldQueryState::NP1};
    dest_field_query_data[1] = {"velocity", FieldQueryState::NP1};
    dest_field_query_data[2] = {"acceleration", FieldQueryState::NP1};
    bool rotate_device_states = true;
    mp_mesh_data->UpdateFieldDataStates(dest_field_query_data, rotate_device_states);

    std::array<aperi::FieldQueryData, 3> src_field_query_data;
    src_field_query_data[0] = {"displacement", FieldQueryState::N};
    src_field_query_data[1] = {"velocity", FieldQueryState::N};
    src_field_query_data[2] = {"acceleration", FieldQueryState::N};
    std::shared_ptr<aperi::ValueFromGeneralizedFieldProcessor<3>> value_from_generalized_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<3>>(src_field_query_data, dest_field_query_data, mp_mesh_data);
    value_from_generalized_field_processor->compute_value_from_generalized_field();
    value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();

    m_node_processor_all->SyncAllFieldsDeviceToHost();
    m_io_mesh->WriteFieldResults(time);

    mp_mesh_data->UpdateFieldDataStates(dest_field_query_data, rotate_device_states);
}

void LogHeader() {
    aperi::CoutP0() << std::setw(65) << "---------------------------------------------------------------------------------------" << std::endl;
    aperi::CoutP0() << std::setw(20) << "Increment Number"
                    << std::setw(20) << "Time"
                    << std::setw(25) << "Mean Runtime/Increment"
                    << std::setw(20) << "Event" << std::endl;
    aperi::CoutP0() << std::setw(20) << "(N)"
                    << std::setw(20) << "(seconds)"
                    << std::setw(25) << "(seconds)"
                    << std::setw(20) << " " << std::endl;
    aperi::CoutP0() << std::setw(65) << "---------------------------------------------------------------------------------------" << std::endl;
}

void LogFooter() {
    aperi::CoutP0() << std::setw(65) << "---------------------------------------------------------------------------------------" << std::endl;
}

void LogEvent(const size_t n, const double time, const double average_runtime, const std::string &event = "") {
    aperi::CoutP0() << std::setw(20) << n
                    << std::setw(20) << time
                    << std::setw(25) << average_runtime
                    << std::setw(20) << event
                    << std::endl;
}

double ExplicitSolver::Solve() {
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

    // Get the initial time step
    double time_increment = m_time_stepper->GetTimeIncrement(time);

    // Initialize total runtime, average runtime, for benchmarking
    double total_runtime = 0.0;
    double average_runtime = 0.0;

    // Print the number of nodes
    size_t num_nodes = mp_mesh_data->GetNumNodes();
    aperi::CoutP0() << "Number of Nodes: " << num_nodes << std::endl;

    // Print the table header before the loop
    LogHeader();

    // Create a scheduler for logging, outputting every 2 seconds. TODO(jake): Make this configurable in input file
    aperi::TimeIncrementScheduler log_scheduler(0.0, 1e8, 2.0);

    // Output initial state
    aperi::CoutP0() << std::scientific << std::setprecision(6);  // Set output to scientific notation and 6 digits of precision
    if (m_output_scheduler->AtNextEvent(time)) {
        LogEvent(n, time, average_runtime, "Write Field Output");
        WriteOutput(time);
    }

    // Loop over time steps
    while (!m_time_stepper->AtEnd(time)) {
        if (log_scheduler.AtNextEvent(total_runtime)) {
            LogEvent(n, time, average_runtime, "");
        }

        // Benchmarking
        auto start_time = std::chrono::high_resolution_clock::now();

        // Move state n+1 to state n
        UpdateFieldStates();

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

        // Benchmarking
        auto end_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> runtime = end_time - start_time;
        total_runtime += runtime.count();
        average_runtime = total_runtime / n;

        // Output
        if (m_output_scheduler->AtNextEvent(time)) {
            LogEvent(n, time, average_runtime, "Write Field Output");
            WriteOutput(time);
        }
    }
    LogEvent(n, time, average_runtime, "End of Simulation");
    LogFooter();

    return average_runtime;
}

}  // namespace aperi
