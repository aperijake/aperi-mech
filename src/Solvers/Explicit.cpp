#include "Solvers/Explicit.h"

#include <chrono>
#include <numeric>

#include "BoundaryCondition.h"
#include "ContactForceContribution/Base.h"
#include "EntityProcessor.h"
#include "ExplicitTimeIntegrator.h"
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

std::vector<FieldData> ExplicitSolver::GetFieldData(bool uses_generalized_fields, bool use_strain_smoothing, aperi::LagrangianFormulationType lagrangian_formulation_type, bool output_coefficients) {
    std::vector<FieldData> field_data = Solver::GetFieldData(uses_generalized_fields, use_strain_smoothing, lagrangian_formulation_type, output_coefficients);

    // TODO(jake): Fields that are "*_coefficients" only need to be on the active part. Can rework this to only define them on the active part.
    // Node data
    if (uses_generalized_fields) {
        // Generalized fields, output as "_coefficients"
        field_data.push_back(FieldData("displacement_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}, output_coefficients));  // The displacement field, generalized
        field_data.push_back(FieldData("velocity_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}, output_coefficients));      // The velocity field, generalized
        field_data.push_back(FieldData("acceleration_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}, output_coefficients));  // The acceleration field, generalized
        field_data.push_back(FieldData("force_coefficients", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}, output_coefficients));         // The force field
        // Actual field data at nodes, no state is needed as it is calculated from the coefficients which have states
        field_data.push_back(FieldData("displacement", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The displacement field
        field_data.push_back(FieldData("velocity", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));      // The velocity field
        field_data.push_back(FieldData("acceleration", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The acceleration field
        field_data.push_back(FieldData("force", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));
        if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated || lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
            field_data.push_back(FieldData("displacement_inc", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The displacement increment field, physical
        }
    } else {
        // Field data at nodes is the same as generalized fields. Just output coefficients.
        field_data.push_back(FieldData("velocity_coefficients", "velocity", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));          // The velocity field, generalized / full
        field_data.push_back(FieldData("displacement_coefficients", "displacement", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The displacement field, generalized / full
        field_data.push_back(FieldData("acceleration_coefficients", "acceleration", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 2, std::vector<double>{}));  // The acceleration field, generalized / full
        field_data.push_back(FieldData("force_coefficients", "force", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                // The force field
    }
    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated || lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        field_data.push_back(FieldData("displacement_coefficients_inc", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The displacement increment field, generalized
        // The current coordinates field, manually states as they will not be updated every time step
        field_data.push_back(FieldData("current_coordinates_n", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));    // The current coordinates field
        field_data.push_back(FieldData("current_coordinates_np1", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The current coordinates field
    }
    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        field_data.push_back(FieldData("reference_coordinates", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The last reference coordinates field
    }
    field_data.push_back(FieldData("mass_from_elements", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));  // The mass as determined from the attached elements
    field_data.push_back(FieldData("mass", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));                // The mass field (mass_from_elements as coefficients on the approximation functions)

    // Element data
    field_data.push_back(FieldData("mass", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));

    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        field_data.push_back(FieldData("reference_displacement_gradient", "reference_disp_grad", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));
    }
    return field_data;
}

void ExplicitSolver::SetTemporalVaryingOutputFields() {
    m_temporal_varying_output_fields.push_back(aperi::Field<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"force_coefficients", FieldQueryState::None, FieldDataTopologyRank::NODE}));
    m_temporal_varying_output_fields.push_back(aperi::Field<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"displacement_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}));
    m_temporal_varying_output_fields.push_back(aperi::Field<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"velocity_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}));
    m_temporal_varying_output_fields.push_back(aperi::Field<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"acceleration_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}));
    m_temporal_varying_output_fields.push_back(aperi::Field<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"displacement_gradient", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}));
    m_temporal_varying_output_fields.push_back(aperi::Field<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"pk1_stress", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}));

    std::shared_ptr<aperi::Field<aperi::Real>> state_field_ptr = aperi::GetField<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
    if (state_field_ptr != nullptr) {
        m_temporal_varying_output_fields.push_back(*state_field_ptr);
    }
    std::shared_ptr<aperi::Field<aperi::Real>> ref_disp_grad_field_ptr = aperi::GetField<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"reference_displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
    if (ref_disp_grad_field_ptr != nullptr) {
        m_temporal_varying_output_fields.push_back(*ref_disp_grad_field_ptr);
    }
}

// Create a node processor for force
std::shared_ptr<ActiveNodeProcessor<1>> ExplicitSolver::CreateNodeProcessorForce() {
    std::array<FieldQueryData<aperi::Real>, 1> field_query_data_vec;
    field_query_data_vec[0] = {"force_coefficients", FieldQueryState::None};
    return std::make_shared<ActiveNodeProcessor<1>>(field_query_data_vec, mp_mesh_data);
}

// Create a node processor for local force
std::shared_ptr<NodeProcessor<1>> ExplicitSolver::CreateNodeProcessorForceLocal() {
    std::array<FieldQueryData<aperi::Real>, 1> field_query_data_vec;
    field_query_data_vec[0] = {"force", FieldQueryState::None};
    return std::make_shared<NodeProcessor<1>>(field_query_data_vec, mp_mesh_data);
}

void ExplicitSolver::UpdateFieldStates() {
    bool rotate_device_states = true;
    mp_mesh_data->UpdateFieldDataStates(rotate_device_states);
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
    // Zero the force field
    m_node_processor_force->FillField(0.0, 0);
    m_node_processor_force->MarkFieldModifiedOnDevice(0);

    // Compute kinematic field values from generalized fields if needed
    if (m_uses_generalized_fields && (!m_uses_one_pass_method)) {
        m_kinematics_from_generalized_field_processor->ComputeValues();
        m_kinematics_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        m_node_processor_force_local->FillField(0.0, 0);
        m_node_processor_force_local->MarkFieldModifiedOnDevice(0);
    }

    // Compute internal forces
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
        // No need to sync back to device as local force field is not used until next time step
    }

    // Compute external forces
    for (const auto &external_force_contribution : m_external_force_contributions) {
        external_force_contribution->ComputeForce(time, time_increment);
    }

    // Compute contact forces
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
    // Write field results
    for (auto &field : m_temporal_varying_output_fields) {
        field.UpdateField();
        field.SyncDeviceToHost();
    }
    m_io_mesh->WriteFieldResults(time);
}

void ExplicitSolver::UpdateShapeFunctions(size_t n, const std::shared_ptr<ExplicitTimeIntegrator> &explicit_time_integrator) {
    bool update_shape_functions = false;

    // Check if reference configuration update is needed
    if (m_reference_configuration_update_scheduler && m_reference_configuration_update_scheduler->AtNextEvent(n)) {
        update_shape_functions = true;
    }

    // Check for material separation events
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

inline void LogLine(int width = 89) {
    aperi::CoutP0() << std::setw(width) << std::setfill('-') << "-" << std::endl;
    aperi::CoutP0() << std::setfill(' ');
}

inline void LogRow(const std::array<std::string, 5> &row) {
    aperi::CoutP0() << std::left
                    << std::setw(12) << row[0]
                    << std::setw(16) << row[1]
                    << std::setw(16) << row[2]
                    << std::setw(16) << row[3]
                    << std::setw(30) << row[4]
                    << std::endl
                    << std::right;
}

inline void LogHeader() {
    LogLine();
    LogRow({" ", " ", " ", "Running Mean", " "});
    LogRow({"Increment", "Time", "Time Step", "Walltime/Step", "Event Message"});
    LogRow({"(N)", "(seconds)", "(seconds)", "(seconds)", " "});
    LogLine();
}

inline void LogEvent(const size_t n, const double time, const double time_increment, const double this_runtime, const std::string &event = "") {
    aperi::CoutP0() << std::left
                    << std::setw(12) << n
                    << std::setw(16) << time
                    << std::setw(16) << time_increment
                    << std::setw(16) << this_runtime
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
    double this_runtime = 0.0;

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
    LogEvent(n, time, time_increment, this_runtime, time_increment_data.message);

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
        LogEvent(n, time, 0.0, this_runtime, "Write Field Output");
        write_output_timer->Start();
        WriteOutput(time);
        write_output_timer->Stop();
    }

    // Loop over time steps
    while (!m_time_stepper->AtEnd(time)) {
        if (log_scheduler.AtNextEvent(total_runtime) && n > 0) {
            LogEvent(n, time, time_increment, this_runtime, "");
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
            LogEvent(n, time, time_increment, this_runtime, time_increment_data.message);
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
        this_runtime = runtime.count();

        // Output
        if (m_output_scheduler->AtNextEvent(time)) {
            LogEvent(n, time, time_increment, this_runtime, "Write Field Output");
            write_output_timer->Start();
            WriteOutput(time);
            write_output_timer->Stop();
        }

        // Update the shape functions
        update_shape_functions_timer->Start();
        UpdateShapeFunctions(n, explicit_time_integrator);
        update_shape_functions_timer->Stop();
    }
    LogEvent(n, time, time_increment, this_runtime, "End of Simulation");
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
