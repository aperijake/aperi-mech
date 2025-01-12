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
#include "PowerMethodProcessor.h"
#include "Scheduler.h"
#include "TimeStepper.h"
#include "ValueFromGeneralizedFieldProcessor.h"

namespace aperi {

void ExplicitSolver::UpdateFieldStates() {
    auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::UpdateFieldStates);
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
    if (m_uses_generalized_fields && (!m_uses_one_pass_method)) {
        m_kinematics_from_generalized_field_processor->compute_value_from_generalized_field();
        m_kinematics_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        m_node_processor_force_local->FillField(0.0, 0);
        m_node_processor_force_local->MarkFieldModifiedOnDevice(0);
    }

    // Compute internal force contributions
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeForce();
    }

    // Scatter the local forces. May have to be done after the external forces are computed if things change in the future.
    if (m_uses_generalized_fields && (!m_uses_one_pass_method)) {
        if (m_num_processors > 1) {
            m_node_processor_force_local->SyncFieldDeviceToHost(0);
            m_node_processor_force_local->ParallelSumFieldData(0);
        }
        m_force_field_processor->ScatterOwnedLocalValues();
        // No need to sync back to device as the local force field is not used until the next time step
    }

    // Compute external force contributions
    for (const auto &external_force_contribution : m_external_force_contributions) {
        external_force_contribution->ComputeForce();
    }
}

void ExplicitSolver::ComputeForce(const SolverTimerType &timer_type) {
    auto timer = m_timer_manager->CreateScopedTimer(timer_type);
    ComputeForce();
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

void ExplicitSolver::CommunicateForce(const SolverTimerType &timer_type) {
    auto timer = m_timer_manager->CreateScopedTimer(timer_type);
    CommunicateForce();
}

void ExplicitSolver::WriteOutput(double time) {
    if (m_uses_generalized_fields) {
        UpdateFieldsFromGeneralizedFields();
    }
    // Write the field results
    m_node_processor_output->SyncAllFieldsDeviceToHost();
    m_io_mesh->WriteFieldResults(time);
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
    aperi::CoutP0() << "   - Computing mass matrix" << std::endl;
    auto start_mass_matrix = std::chrono::high_resolution_clock::now();
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        ComputeMassMatrixForPart(mp_mesh_data, internal_force_contribution->GetPartName(), internal_force_contribution->GetMaterial()->GetDensity());
    }
    double total_mass = FinishComputingMassMatrix(mp_mesh_data, m_uses_generalized_fields);
    aperi::CoutP0() << "     Total mass: " << total_mass << std::endl;
    auto end_mass_matrix = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "     Finished Computing Mass Matrix. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_mass_matrix - start_mass_matrix).count() << " ms" << std::endl;
}

double ExplicitSolver::Solve() {
    // Print the number of nodes
    mp_mesh_data->PrintNodeCounts();

    // Build the mass matrix
    BuildMassMatrix();

    // Create the explicit time integrator
    aperi::ExplicitTimeIntegrationFields explicit_time_integration_fields(mp_mesh_data);
    std::shared_ptr<ExplicitTimeIntegrator> explicit_time_integrator = std::make_shared<ExplicitTimeIntegrator>(explicit_time_integration_fields, mp_mesh_data, m_active_selector);

    // Set the initial time, t = 0
    double time = 0.0;

    // Set the initial increment, n = 0
    size_t n = 0;

    // Initialize the time stepper
    m_time_stepper->Initialize(mp_mesh_data, shared_from_this());

    // Compute initial forces, done at state np1 as states will be swapped at the start of the time loop
    ComputeForce(aperi::SolverTimerType::ComputeForce);
    CommunicateForce(aperi::SolverTimerType::CommunicateForce);

    // Compute initial accelerations, done at state np1 as states will be swapped at the start of the time loop
    {
        auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::TimeIntegrationNodalUpdates);
        explicit_time_integrator->ComputeAcceleration();
    }

    // Initialize total runtime, average runtime, for benchmarking
    double total_runtime = 0.0;
    double average_runtime = 0.0;

    // Print the table header before the loop
    aperi::CoutP0() << std::endl
                    << "Marching through time steps:" << std::endl;
    LogHeader();

    // Create a scheduler for logging, outputting every 2 seconds. TODO(jake): Make this configurable in input file
    aperi::TimeIncrementScheduler log_scheduler(0.0, 1e8, 2.0);

    // Output initial state
    aperi::CoutP0() << std::scientific << std::setprecision(6);  // Set output to scientific notation and 6 digits of precision
    if (m_output_scheduler->AtNextEvent(time)) {
        LogEvent(n, time, 0.0, average_runtime, "Write Field Output");
        WriteOutput(time);
    }

    // Compute first time step
    aperi::TimeStepperData time_increment_data;
    {
        auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::TimeStepCompute);
        time_increment_data = m_time_stepper->GetTimeStepperData(time, n);
    }
    double time_increment = time_increment_data.time_increment;
    LogEvent(n, time, time_increment, average_runtime, time_increment_data.message);

    // Loop over time steps
    while (!m_time_stepper->AtEnd(time)) {
        if (log_scheduler.AtNextEvent(total_runtime) && n > 0) {
            LogEvent(n, time, time_increment, average_runtime, "");
        }

        // Benchmarking
        auto start_time = std::chrono::high_resolution_clock::now();

        // Get the next time step, Δt^{n+½}
        {
            auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::TimeStepCompute);
            time_increment_data = m_time_stepper->GetTimeStepperData(time, n);
        }
        time_increment = time_increment_data.time_increment;
        if (time_increment_data.updated) {
            LogEvent(n, time, time_increment, average_runtime, time_increment_data.message);
        }

        // Compute the time increment, time midstep, and time next
        double time_midstep = time + 0.5 * time_increment;
        double time_next = time + time_increment;
        explicit_time_integrator->SetTimeIncrement(time_increment);

        // Move state n+1 to state n
        UpdateFieldStates();

        // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
        {
            auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::TimeIntegrationNodalUpdates);
            explicit_time_integrator->ComputeFirstPartialUpdate();
        }

        // Enforce essential boundary conditions: node I on \gamma_v_i : v_{iI}^{n+½} = \overbar{v}_I(x_I,t^{n+½})
        {
            auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::ApplyBoundaryConditions);
            for (const auto &boundary_condition : m_boundary_conditions) {
                boundary_condition->ApplyVelocity(time_midstep);
            }
        }

        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
        {
            auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::TimeIntegrationNodalUpdates);
            explicit_time_integrator->UpdateDisplacements();
        }

        // Compute the force, f^{n+1}
        ComputeForce(aperi::SolverTimerType::ComputeForce);

        // Communicate the force field data
        CommunicateForce(aperi::SolverTimerType::CommunicateForce);

        // Compute acceleration: a^{n+1} = M^{–1}(f^{n+1})
        {
            auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::TimeIntegrationNodalUpdates);
            explicit_time_integrator->ComputeAcceleration();
        }

        // Set acceleration on essential boundary conditions. Overwrites acceleration from ComputeAcceleration above so that the acceleration is consistent with the velocity boundary condition.
        {
            auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::ApplyBoundaryConditions);
            for (const auto &boundary_condition : m_boundary_conditions) {
                boundary_condition->ApplyAcceleration(time_next);
            }
        }

        // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
        {
            auto timer = m_timer_manager->CreateScopedTimer(SolverTimerType::TimeIntegrationNodalUpdates);
            explicit_time_integrator->ComputeSecondPartialUpdate();
        }

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
            WriteOutput(time);
        }
    }
    LogEvent(n, time, time_increment, average_runtime, "End of Simulation");
    LogLine();

    return average_runtime;
}

}  // namespace aperi
