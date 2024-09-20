#include "Solver.h"

#include <chrono>
#include <iomanip>
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
#include "Scheduler.h"
#include "TimeStepper.h"
#include "ValueFromGeneralizedFieldProcessor.h"

namespace aperi {

void Solver::UpdateFieldStates() {
    bool rotate_device_states = true;
    mp_mesh_data->UpdateFieldDataStates(rotate_device_states);
}

void Solver::UpdateFieldsFromGeneralizedFields() {
    // Make sure all source fields are up to date on the device
    m_output_value_from_generalized_field_processor->SyncAllSourceFieldsDeviceToHost();
    m_output_value_from_generalized_field_processor->CommunicateAllSourceFieldData();
    m_output_value_from_generalized_field_processor->MarkAllSourceFieldsModifiedOnHost();
    m_output_value_from_generalized_field_processor->SyncAllSourceFieldsHostToDevice();

    // Compute the values of the destination fields from the source fields
    m_output_value_from_generalized_field_processor->compute_value_from_generalized_field();
    m_output_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
    m_output_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();
}

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

    // Compute kinematic field values from the generalized fields
    auto start_kinematics_from_generalized_field = std::chrono::high_resolution_clock::now();
    if (m_uses_generalized_fields) {
        m_kinematics_from_generalized_field_processor->compute_value_from_generalized_field();
        m_kinematics_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        m_node_processor_force_local->FillField(0.0, 0);
        m_node_processor_force_local->MarkFieldModifiedOnDevice(0);
    }
    auto end_kinematics_from_generalized_field = std::chrono::high_resolution_clock::now();
    auto duration_kinematics_from_generalized_field = std::chrono::duration_cast<std::chrono::microseconds>(end_kinematics_from_generalized_field - start_kinematics_from_generalized_field);

    // Compute internal force contributions
    // timer for internal force contributions
    auto start_internal_force_contributions = std::chrono::high_resolution_clock::now();
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeForce();
    }
    auto end_internal_force_contributions = std::chrono::high_resolution_clock::now();
    auto duration_internal_force_contributions = std::chrono::duration_cast<std::chrono::microseconds>(end_internal_force_contributions - start_internal_force_contributions);

    // Scatter the local forces. May have to be done after the external forces are computed if things change in the future.
    auto start_scatter_local_forces = std::chrono::high_resolution_clock::now();
    if (m_uses_generalized_fields) {
        if (m_num_processors > 1) {
            m_node_processor_force_local->SyncFieldDeviceToHost(0);
            m_node_processor_force_local->ParallelSumFieldData(0);
        }
        m_force_field_processor->ScatterOwnedLocalValues();
        // No need to sync back to device as the local force field is not used until the next time step
    }
    auto end_scatter_local_forces = std::chrono::high_resolution_clock::now();
    auto duration_scatter_local_forces = std::chrono::duration_cast<std::chrono::microseconds>(end_scatter_local_forces - start_scatter_local_forces);
    auto total_duration = std::chrono::duration_cast<std::chrono::microseconds>(end_scatter_local_forces - start_kinematics_from_generalized_field);
    double percent_kinematics_from_generalized_field = 100. * duration_kinematics_from_generalized_field.count() / total_duration.count();
    double percent_internal_force_contributions = 100. * duration_internal_force_contributions.count() / total_duration.count();
    double percent_scatter_local_forces = 100. * duration_scatter_local_forces.count() / total_duration.count();
    aperi::CoutP0() << "Compute Fields: " << duration_kinematics_from_generalized_field.count() << " microseconds. Percent: " << percent_kinematics_from_generalized_field << std::endl;
    aperi::CoutP0() << "Compute Force:  " << duration_internal_force_contributions.count() << " microseconds. Percent: " << percent_internal_force_contributions << std::endl;
    aperi::CoutP0() << "Scatter Force:  " << duration_scatter_local_forces.count() << " microseconds. Percent: " << percent_scatter_local_forces << std::endl;

    // Compute external force contributions
    for (const auto &external_force_contribution : m_external_force_contributions) {
        external_force_contribution->ComputeForce();
    }

    // If there is more than one processor, communicate the field data that other processors need
    if (m_num_processors > 1) {
        m_node_processor_force->SyncFieldDeviceToHost(0);
        m_node_processor_force->ParallelSumFieldData(0);
        m_node_processor_force->MarkFieldModifiedOnHost(0);
        m_node_processor_force->SyncFieldHostToDevice(0);
    }
}
struct ComputeAccelerationFunctor {
    KOKKOS_INLINE_FUNCTION
    void operator()(double *acceleration_data_np1, const double *force_data_np1, const double *mass_data_n) const {
        *acceleration_data_np1 = *force_data_np1 / *mass_data_n;
    }
};

void ExplicitSolver::ComputeAcceleration(const std::shared_ptr<ActiveNodeProcessor<3>> &node_processor_acceleration) {
    // Compute acceleration: a^{n+1} = M^{–1}(f^{n+1})
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

void ExplicitSolver::ComputeFirstPartialUpdate(double half_time_increment, const std::shared_ptr<ActiveNodeProcessor<3>> &node_processor_first_update) {
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

void ExplicitSolver::UpdateDisplacements(double time_increment, const std::shared_ptr<ActiveNodeProcessor<3>> &node_processor_update_displacements) {
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

void ExplicitSolver::ComputeSecondPartialUpdate(double half_time_increment, const std::shared_ptr<ActiveNodeProcessor<2>> &node_processor_second_update) {
    // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
    ComputeSecondPartialUpdateFunctor compute_second_partial_update_functor(half_time_increment);
    node_processor_second_update->for_each_component(compute_second_partial_update_functor);
    node_processor_second_update->MarkFieldModifiedOnDevice(0);
}

void ExplicitSolver::WriteOutput(double time) {
    if (m_uses_generalized_fields) {
        UpdateFieldsFromGeneralizedFields();
    }
    // Write the field results
    m_node_processor_all->SyncAllFieldsDeviceToHost();
    m_io_mesh->WriteFieldResults(time);
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
    // Start a timer for benchmarking
    auto start_time = std::chrono::high_resolution_clock::now();

    // Compute mass matrix
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        ComputeMassMatrix(mp_mesh_data, internal_force_contribution->GetPartName(), internal_force_contribution->GetMaterial()->GetDensity(), internal_force_contribution->UsesGeneralizedFields());
    }

    // Create node processors for each step of the time integration algorithm
    // The node processors are used to loop over the degrees of freedom (dofs) of the mesh and apply the time integration algorithm to each dof
    std::shared_ptr<ActiveNodeProcessor<3>> node_processor_first_update = CreateNodeProcessorFirstUpdate();
    std::shared_ptr<ActiveNodeProcessor<3>> node_processor_update_displacements = CreateNodeProcessorUpdateDisplacements();
    std::shared_ptr<ActiveNodeProcessor<3>> node_processor_acceleration = CreateNodeProcessorAcceleration();
    std::shared_ptr<ActiveNodeProcessor<2>> node_processor_second_update = CreateNodeProcessorSecondUpdate();

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

    // Time for solver pre-processing
    auto end_pre_time = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> this_pre_time = end_pre_time - start_time;
    double pre_time = this_pre_time.count();

    // Accumulate times
    double total_step_time = 0.0;
    double update_field_states_time = 0.0;
    double compute_first_partial_update_time = 0.0;
    double enforce_velocity_boundary_conditions_time = 0.0;
    double update_displacements_time = 0.0;
    double compute_force_time = 0.0;
    double compute_acceleration_time = 0.0;
    double apply_acceleration_boundary_conditions_time = 0.0;
    double compute_second_partial_update_time = 0.0;
    double write_output_time = 0.0;

    // Loop over time steps
    while (!m_time_stepper->AtEnd(time)) {
        if (log_scheduler.AtNextEvent(total_runtime)) {
            LogEvent(n, time, average_runtime, "");
        }

        // Benchmarking
        auto start_time = std::chrono::high_resolution_clock::now();

        // Move state n+1 to state n
        UpdateFieldStates();
        auto end_update_field_states_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_update_field_states_time = end_update_field_states_time - start_time;
        update_field_states_time += this_update_field_states_time.count();

        double half_time_increment = 0.5 * time_increment;
        double time_midstep = time + half_time_increment;
        double time_next = time + time_increment;

        // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
        ComputeFirstPartialUpdate(half_time_increment, node_processor_first_update);
        auto end_compute_first_partial_update_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_compute_first_partial_update_time = end_compute_first_partial_update_time - end_update_field_states_time;
        compute_first_partial_update_time += this_compute_first_partial_update_time.count();

        // Enforce essential boundary conditions: node I on \gamma_v_i : v_{iI}^{n+½} = \overbar{v}_I(x_I,t^{n+½})
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyVelocity(time_midstep);
        }
        auto end_enforce_velocity_boundary_conditions_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_enforce_velocity_boundary_conditions_time = end_enforce_velocity_boundary_conditions_time - end_compute_first_partial_update_time;
        enforce_velocity_boundary_conditions_time += this_enforce_velocity_boundary_conditions_time.count();

        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
        UpdateDisplacements(time_increment, node_processor_update_displacements);
        auto end_update_displacements_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_update_displacements_time = end_update_displacements_time - end_enforce_velocity_boundary_conditions_time;
        update_displacements_time += this_update_displacements_time.count();

        // Compute the force, f^{n+1}
        ComputeForce();
        auto end_compute_force_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_compute_force_time = end_compute_force_time - end_update_displacements_time;
        compute_force_time += this_compute_force_time.count();

        // Compute acceleration: a^{n+1} = M^{–1}(f^{n+1})
        ComputeAcceleration(node_processor_acceleration);
        auto end_compute_acceleration_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_compute_acceleration_time = end_compute_acceleration_time - end_compute_force_time;
        compute_acceleration_time += this_compute_acceleration_time.count();

        // Set acceleration on essential boundary conditions. Overwrites acceleration from ComputeAcceleration above so that the acceleration is consistent with the velocity boundary condition.
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyAcceleration(time_next);
        }
        auto end_apply_acceleration_boundary_conditions_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_apply_acceleration_boundary_conditions_time = end_apply_acceleration_boundary_conditions_time - end_compute_acceleration_time;
        apply_acceleration_boundary_conditions_time += this_apply_acceleration_boundary_conditions_time.count();

        // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
        ComputeSecondPartialUpdate(half_time_increment, node_processor_second_update);
        auto end_compute_second_partial_update_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_compute_second_partial_update_time = end_compute_second_partial_update_time - end_apply_acceleration_boundary_conditions_time;
        compute_second_partial_update_time += this_compute_second_partial_update_time.count();

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
        auto end_write_output_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_write_output_time = end_write_output_time - end_compute_second_partial_update_time;
        write_output_time += this_write_output_time.count();

        auto end_step_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> this_step_time = end_step_time - start_time;
        total_step_time += this_step_time.count();
    }
    LogEvent(n, time, average_runtime, "End of Simulation");
    LogFooter();
    auto end_time = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> runtime = end_time - start_time;

    // Calculate the percentage of time spent in each event
    double total_time = total_runtime;
    double pre_time_percentage = pre_time / total_time * 100;
    double update_field_states_percentage = update_field_states_time / total_time * 100;
    double compute_first_partial_update_percentage = compute_first_partial_update_time / total_time * 100;
    double enforce_velocity_boundary_conditions_percentage = enforce_velocity_boundary_conditions_time / total_time * 100;
    double update_displacements_percentage = update_displacements_time / total_time * 100;
    double compute_force_percentage = compute_force_time / total_time * 100;
    double compute_acceleration_percentage = compute_acceleration_time / total_time * 100;
    double apply_acceleration_boundary_conditions_percentage = apply_acceleration_boundary_conditions_time / total_time * 100;
    double compute_second_partial_update_percentage = compute_second_partial_update_time / total_time * 100;
    double write_output_percentage = write_output_time / total_time * 100;

    // Print the percentage of time spent in each event, formatted to 2 decimal places and tabulated
    // aperi::CoutP0() << "###########################################" << std::endl;
    // aperi::CoutP0() << "Total Runtime: " << runtime << " seconds" << std::endl;
    // aperi::CoutP0() << "Pre-Processing Time: " << pre_time << " seconds (" << std::fixed << std::setprecision(2) << pre_time_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Update Field States Time: " << update_field_states_time << " seconds (" << std::fixed << std::setprecision(2) << update_field_states_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Compute First Partial Update Time: " << compute_first_partial_update_time << " seconds (" << std::fixed << std::setprecision(2) << compute_first_partial_update_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Enforce Velocity Boundary Conditions Time: " << enforce_velocity_boundary_conditions_time << " seconds (" << std::fixed << std::setprecision(2) << enforce_velocity_boundary_conditions_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Update Displacements Time: " << update_displacements_time << " seconds (" << std::fixed << std::setprecision(2) << update_displacements_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Compute Force Time: " << compute_force_time << " seconds (" << std::fixed << std::setprecision(2) << compute_force_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Compute Acceleration Time: " << compute_acceleration_time << " seconds (" << std::fixed << std::setprecision(2) << compute_acceleration_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Apply Acceleration Boundary Conditions Time: " << apply_acceleration_boundary_conditions_time << " seconds (" << std::fixed << std::setprecision(2) << apply_acceleration_boundary_conditions_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Compute Second Partial Update Time: " << compute_second_partial_update_time << " seconds (" << std::fixed << std::setprecision(2) << compute_second_partial_update_percentage << "%)" << std::endl;
    // aperi::CoutP0() << "Write Output Time: " << write_output_time << " seconds (" << std::fixed << std::setprecision(2) << write_output_percentage << "%)" << std::endl;

    const int label_width = 40;
    const int value_width = 10;
    const int percentage_width = 6;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Total Runtime:"
                    << std::right << std::setw(value_width) << runtime.count() << " seconds" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Pre-Processing Time:"
                    << std::right << std::setw(value_width) << pre_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << pre_time_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Update Field States Time:"
                    << std::right << std::setw(value_width) << update_field_states_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << update_field_states_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Compute First Partial Update Time:"
                    << std::right << std::setw(value_width) << compute_first_partial_update_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << compute_first_partial_update_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Enforce Velocity Boundary Conditions Time:"
                    << std::right << std::setw(value_width) << enforce_velocity_boundary_conditions_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << enforce_velocity_boundary_conditions_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Update Displacements Time:"
                    << std::right << std::setw(value_width) << update_displacements_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << update_displacements_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Compute Force Time:"
                    << std::right << std::setw(value_width) << compute_force_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << compute_force_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Compute Acceleration Time:"
                    << std::right << std::setw(value_width) << compute_acceleration_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << compute_acceleration_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Apply Acceleration Boundary Conditions Time:"
                    << std::right << std::setw(value_width) << apply_acceleration_boundary_conditions_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << apply_acceleration_boundary_conditions_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Compute Second Partial Update Time:"
                    << std::right << std::setw(value_width) << compute_second_partial_update_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << compute_second_partial_update_percentage << "%)" << std::endl;

    aperi::CoutP0() << std::left << std::setw(label_width) << "Write Output Time:"
                    << std::right << std::setw(value_width) << write_output_time << " seconds ("
                    << std::fixed << std::setprecision(2) << std::setw(percentage_width) << write_output_percentage << "%)" << std::endl;
    aperi::CoutP0() << "###########################################" << std::endl;

    return average_runtime;
}

}  // namespace aperi
