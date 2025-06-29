#include "Solver.h"

#include <chrono>
#include <numeric>

#include "BoundaryCondition.h"
#include "ContactForceContribution/Base.h"
#include "EntityProcessor.h"
#include "ExternalForceContribution/Base.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldUtils.h"
#include "FunctionEvaluationProcessor.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "LogUtils.h"
#include "ManualScopeTimerFactory.h"
#include "MassUtils.h"
#include "Materials/Base.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "PowerMethodProcessor.h"
#include "Scheduler.h"
#include "TimeStepper.h"

namespace aperi {

void ExplicitSolver::UpdateFieldStates() {
    bool rotate_device_states = true;
    mp_mesh_data->UpdateFieldDataStates(rotate_device_states);
}

void Solver::UpdateFieldsFromGeneralizedFields() {
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeValuesFromGeneralizedFields();
    }
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

void ExplicitSolver::ComputeForce(double time, double time_increment) {
    // Set the force field to zero
    m_node_processor_force->FillField(0.0, 0);
    m_node_processor_force->MarkFieldModifiedOnDevice(0);

    // Compute kinematic field values from the generalized fields
    if (m_uses_generalized_fields && (!m_uses_one_pass_method)) {
        m_kinematics_from_generalized_field_processor->ComputeValues();
        m_kinematics_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        m_node_processor_force_local->FillField(0.0, 0);
        m_node_processor_force_local->MarkFieldModifiedOnDevice(0);
    }

    // Compute internal force contributions
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeForce(time, time_increment);
    }

    // Scatter the local forces. May have to be done after the external forces are computed if things change in the future.
    if (m_uses_generalized_fields && (!m_uses_one_pass_method)) {
        if (m_num_processors > 1) {
            m_node_processor_force_local->SyncFieldDeviceToHost(0);
            m_node_processor_force_local->ParallelSumFieldData(0);
        }
        m_force_field_processor->ScatterValues();
        // No need to sync back to device as the local force field is not used until the next time step
    }

    // Compute external force contributions
    for (const auto &external_force_contribution : m_external_force_contributions) {
        external_force_contribution->ComputeForce(time, time_increment);
    }

    // Compute contact force contributions
    for (const auto &contact_force_contribution : m_contact_force_contributions) {
        contact_force_contribution->ComputeForce(time, time_increment);
    }
}

void ExplicitSolver::CommunicateForce() {
    // If there is more than one processor, communicate the field data that other processors need
    if (m_num_processors > 1) {
        m_node_processor_force->SyncFieldDeviceToHost(0);
        m_node_processor_force->ParallelSumFieldData(0);
        m_node_processor_force->MarkFieldModifiedOnHost(0);
        m_node_processor_force->SyncFieldHostToDevice(0);
    }
}

void ExplicitSolver::WriteOutput(double time) {
    if (m_uses_generalized_fields) {
        UpdateFieldsFromGeneralizedFields();
    }
    for (auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->PopulateElementOutputs();
    }
    // Write the field results
    for (auto &field : m_temporal_varying_output_fields) {
        field.UpdateField();
        field.SyncDeviceToHost();
    }
    m_io_mesh->WriteFieldResults(time);
}

void ExplicitSolver::UpdateShapeFunctions(size_t n, const std::shared_ptr<ExplicitTimeIntegrator> &explicit_time_integrator) {
    bool update_shape_functions = false;

    // If using the semi-Lagrangian formulation and it is time to update the reference configuration
    if (m_reference_configuration_update_scheduler && m_reference_configuration_update_scheduler->AtNextEvent(n)) {
        update_shape_functions = true;
    }

    // If has material separation and a material separation event is triggered
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        update_shape_functions = update_shape_functions || internal_force_contribution->CheckIfUpdateIsNeeded();
    }

    if (update_shape_functions) {
        explicit_time_integrator->UpdateReferenceConfiguration();
        for (const auto &internal_force_contribution : m_internal_force_contributions) {
            internal_force_contribution->UpdateShapeFunctions();
        }
    }
}

void LogLine(int width = 89) {
    aperi::CoutP0() << std::setw(width) << std::setfill('-') << "-" << std::endl;
    aperi::CoutP0() << std::setfill(' ');
}

void LogRow(const std::array<std::string, 5> &row) {
    aperi::CoutP0() << std::left
                    << std::setw(12) << row[0]
                    << std::setw(16) << row[1]
                    << std::setw(16) << row[2]
                    << std::setw(16) << row[3]
                    << std::setw(30) << row[4]
                    << std::endl
                    << std::right;
}

void LogHeader() {
    LogLine();
    LogRow({" ", " ", " ", "Running Mean", " "});
    LogRow({"Increment", "Time", "Time Step", "Walltime/Step", "Event Message"});
    LogRow({"(N)", "(seconds)", "(seconds)", "(seconds)", " "});
    LogLine();
}

void LogEvent(const size_t n, const double time, const double time_increment, const double average_runtime, const std::string &event = "") {
    aperi::CoutP0() << std::left
                    << std::setw(12) << n
                    << std::setw(16) << time
                    << std::setw(16) << time_increment
                    << std::setw(16) << average_runtime
                    << std::setw(30) << event
                    << std::endl
                    << std::right;
}

void ExplicitSolver::BuildMassMatrix() {
    // Compute mass matrix
    aperi::CoutP0() << "  Computing mass matrix" << std::endl;
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        ComputeMassMatrixForPart(mp_mesh_data, internal_force_contribution->GetPartName(), internal_force_contribution->GetMaterial()->GetDensity());
    }
    double total_mass = FinishComputingMassMatrix(mp_mesh_data, m_uses_generalized_fields);
    aperi::CoutP0() << "     Total mass: " << total_mass << std::endl;
}

double ExplicitSolver::Solve() {
    // Add the simple timer for the explicit solver
    auto explicit_solver_timer = aperi::SimpleTimerFactory::Create(aperi::SolverTimerType::Total, aperi::explicit_solver_timer_names_map);

    // Build the mass matrix
    BuildMassMatrix();

    // Create the explicit time integrator
    std::shared_ptr<ExplicitTimeIntegrator> explicit_time_integrator = aperi::CreateExplicitTimeIntegrator(mp_mesh_data, m_active_selector, m_lagrangian_formulation_type, m_uses_generalized_fields);

    // Set the initial time, t = 0
    double time = 0.0;

    // Set the initial increment, n = 0
    size_t n = 0;

    // Initialize the time stepper
    m_time_stepper->Initialize(mp_mesh_data, shared_from_this());

    // Initialize total runtime, average runtime, for benchmarking
    double total_runtime = 0.0;
    double average_runtime = 0.0;

    // Print the table header before the loop
    aperi::CoutP0() << std::endl
                    << "Marching through time steps:" << std::endl;
    LogHeader();

    // Create ManualScopeTimers for each function you want to accumulate
    auto update_field_states_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::UpdateFieldStates, explicit_solver_timer_names_map);
    auto compute_force_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::ComputeForce, explicit_solver_timer_names_map);
    auto communicate_force_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::CommunicateForce, explicit_solver_timer_names_map);
    auto update_shape_functions_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::UpdateShapeFunctions, explicit_solver_timer_names_map);
    auto write_output_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::WriteOutput, explicit_solver_timer_names_map);
    auto time_step_compute_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::TimeStepCompute, explicit_solver_timer_names_map);
    auto time_integration_nodal_updates_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::TimeIntegrationNodalUpdates, explicit_solver_timer_names_map);
    auto apply_boundary_conditions_timer = aperi::ManualScopeTimerFactory::Create(SolverTimerType::ApplyBoundaryConditions, explicit_solver_timer_names_map);

    // Compute first time step
    aperi::TimeStepperData time_increment_data;
    time_step_compute_timer->Start();
    time_increment_data = m_time_stepper->GetTimeStepperData(time, n);
    time_step_compute_timer->Stop();

    double time_increment = time_increment_data.time_increment;
    LogEvent(n, time, time_increment, average_runtime, time_increment_data.message);

    // Compute initial forces, done at state np1 as states will be swapped at the start of the time loop
    compute_force_timer->Start();
    ComputeForce(time, time_increment);
    compute_force_timer->Stop();

    communicate_force_timer->Start();
    CommunicateForce();
    communicate_force_timer->Stop();

    // Compute initial accelerations, done at state np1 as states will be swapped at the start of the time loop
    time_integration_nodal_updates_timer->Start();
    explicit_time_integrator->ComputeAcceleration();
    time_integration_nodal_updates_timer->Stop();

    // Create a scheduler for logging, outputting every 2 seconds. TODO(jake): Make this configurable in input file
    aperi::TimeIncrementScheduler log_scheduler(0.0, 1e8, 2.0);

    // Output initial state
    aperi::CoutP0() << std::scientific << std::setprecision(6);  // Set output to scientific notation and 6 digits of precision
    if (m_output_scheduler->AtNextEvent(time)) {
        LogEvent(n, time, 0.0, average_runtime, "Write Field Output");
        write_output_timer->Start();
        WriteOutput(time);
        write_output_timer->Stop();
    }

    // Loop over time steps
    while (!m_time_stepper->AtEnd(time)) {
        if (log_scheduler.AtNextEvent(total_runtime) && n > 0) {
            LogEvent(n, time, time_increment, average_runtime, "");
        }

        // Benchmarking
        auto start_time = std::chrono::high_resolution_clock::now();

        // Swap states n and np1
        update_field_states_timer->Start();
        UpdateFieldStates();
        update_field_states_timer->Stop();

        // Get the next time step, Δt^{n+½}
        time_step_compute_timer->Start();
        time_increment_data = m_time_stepper->GetTimeStepperData(time, n);
        time_step_compute_timer->Stop();

        time_increment = time_increment_data.time_increment;
        if (time_increment_data.updated) {
            LogEvent(n, time, time_increment, average_runtime, time_increment_data.message);
        }

        // Compute the time increment, time midstep, and time next
        double time_midstep = time + 0.5 * time_increment;
        double time_next = time + time_increment;
        explicit_time_integrator->SetTimeIncrement(time_increment);

        // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
        time_integration_nodal_updates_timer->Start();
        explicit_time_integrator->ComputeFirstPartialUpdate();
        time_integration_nodal_updates_timer->Stop();

        // Enforce essential boundary conditions: node I on \gamma_v_i : v_{iI}^{n+½} = \overbar{v}_I(x_I,t^{n+½})
        apply_boundary_conditions_timer->Start();
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyVelocity(time_midstep);
        }
        apply_boundary_conditions_timer->Stop();

        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
        time_integration_nodal_updates_timer->Start();
        explicit_time_integrator->UpdateDisplacements();
        time_integration_nodal_updates_timer->Stop();

        // Compute the force, f^{n+1}
        compute_force_timer->Start();
        ComputeForce(time, time_increment);
        compute_force_timer->Stop();

        // Communicate the force field data
        communicate_force_timer->Start();
        CommunicateForce();
        communicate_force_timer->Stop();

        // Compute acceleration: a^{n+1} = M^{–1}(f^{n+1})
        time_integration_nodal_updates_timer->Start();
        explicit_time_integrator->ComputeAcceleration();
        time_integration_nodal_updates_timer->Stop();

        // Set acceleration on essential boundary conditions. Overwrites acceleration from ComputeAcceleration above so that the acceleration is consistent with the velocity boundary condition.
        apply_boundary_conditions_timer->Start();
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyAcceleration(time_next);
        }
        apply_boundary_conditions_timer->Stop();

        // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
        time_integration_nodal_updates_timer->Start();
        explicit_time_integrator->ComputeSecondPartialUpdate();
        time_integration_nodal_updates_timer->Stop();

        // Compute the energy balance
        // TODO(jake): Compute energy balance

        // Update the time, t = t^{n+1}
        time += time_increment;

        // Update the increment, n = n + 1
        n = n + 1;

        // Benchmarking
        auto end_time = std::chrono::high_resolution_clock::now();
        std::chrono::duration<double> runtime = end_time - start_time;
        total_runtime += runtime.count();
        average_runtime = total_runtime / n;

        // Output
        if (m_output_scheduler->AtNextEvent(time)) {
            LogEvent(n, time, time_increment, average_runtime, "Write Field Output");
            write_output_timer->Start();
            WriteOutput(time);
            write_output_timer->Stop();
        }

        // Update the shape functions
        update_shape_functions_timer->Start();
        UpdateShapeFunctions(n, explicit_time_integrator);
        update_shape_functions_timer->Stop();
    }
    LogEvent(n, time, time_increment, average_runtime, "End of Simulation");
    LogLine();

    // After the loop, dump the accumulated timing results
    update_field_states_timer->Dump();
    compute_force_timer->Dump();
    communicate_force_timer->Dump();
    update_shape_functions_timer->Dump();
    write_output_timer->Dump();
    time_step_compute_timer->Dump();
    time_integration_nodal_updates_timer->Dump();
    apply_boundary_conditions_timer->Dump();

    return average_runtime;
}

}  // namespace aperi
