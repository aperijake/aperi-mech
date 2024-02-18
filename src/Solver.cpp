#include "Solver.h"

#include <numeric>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_topology/topology.hpp>

#include "BoundaryCondition.h"
#include "ExternalForceContribution.h"
#include "FieldManager.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "LogUtils.h"
#include "MassUtils.h"
#include "Material.h"
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
    stk::mesh::field_fill(0.0, *force_field);

    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeForce();
    }
    for (const auto &external_force_contribution : m_external_force_contributions) {
        external_force_contribution->ComputeForce();
    }
}

void ExplicitSolver::ComputeAcceleration(const std::shared_ptr<NodeProcessor> &node_processor_acceleration) {
    // Compute acceleration: a^{n} = M^{–1}(f^{n})
    // field_data[0] = acceleration_data_np1
    // field_data[1] = force_data_np1
    // field_data[2] = mass_data_n
    node_processor_acceleration->for_each_dof({}, [](size_t iI, const std::vector<double> &data, std::vector<double *> &field_data) {
        field_data[0][iI] = field_data[1][iI] / field_data[2][iI];
    });
}

void ExplicitSolver::ComputeFirstPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor> &node_processor_first_update) {
    // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
    // field_data[0] = velocity_data_n
    // field_data[1] = acceleration_data_n
    // field_data[2] = velocity_data_np1
    // data[0] = half_time_increment
    node_processor_first_update->for_each_dof({half_time_increment}, [](size_t iI, const std::vector<double> &data, std::vector<double *> &field_data) {
        field_data[0][iI] = field_data[1][iI] + data[0] * field_data[2][iI];
    });
}

void ExplicitSolver::UpdateDisplacements(double time_increment, const std::shared_ptr<NodeProcessor> &node_processor_update_displacements) {
    // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
    // field_data[0] = displacement_data_np1
    // field_data[1] = displacement_data_n
    // field_data[2] = velocity_data_np1
    // data[0] = time_increment
    node_processor_update_displacements->for_each_dof({time_increment}, [](size_t iI, const std::vector<double> &data, std::vector<double *> &field_data) {
        field_data[0][iI] = field_data[1][iI] + data[0] * field_data[2][iI];
    });
    // Parallel communication
    stk::mesh::communicate_field_data(*bulk_data, {displacement_field_np1});
}

void ExplicitSolver::ComputeSecondPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor> &node_processor_second_update) {
    // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
    // field_data[0] = velocity_data_np1
    // field_data[1] = acceleration_data_np1
    // data[0] = half_time_increment
    node_processor_second_update->for_each_dof({half_time_increment}, [](size_t iI, const std::vector<double> &data, std::vector<double *> &field_data) {
        field_data[0][iI] += data[0] * field_data[1][iI];
    });
}

void ExplicitSolver::Solve() {
    // Compute mass matrix
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        stk::mesh::Part *p_part = internal_force_contribution->GetPart();
        ComputeMassMatrix(*bulk_data, p_part, internal_force_contribution->GetMaterial()->GetDensity());
    }

    // Create node processors for each step of the time integration algorithm
    // The node processors are used to loop over the degrees of freedom (dofs) of the mesh and apply the time integration algorithm to each dof
    std::shared_ptr<NodeProcessor> node_processor_first_update = CreateNodeProcessorFirstUpdate();
    std::shared_ptr<NodeProcessor> node_processor_update_displacements = CreateNodeProcessorUpdateDisplacements();
    std::shared_ptr<NodeProcessor> node_processor_acceleration = CreateNodeProcessorAcceleration();
    std::shared_ptr<NodeProcessor> node_processor_second_update = CreateNodeProcessorSecondUpdate();

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
        bulk_data->update_field_data_states();

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
            m_io_mesh->WriteFieldResults(time);
        }
    }
}

}  // namespace aperi
