#include "Solver.h"

#include <numeric>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/environment/Env.hpp>  // for outputP0

#include "BoundaryCondition.h"
#include "ExternalForceContribution.h"
#include "FieldManager.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
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

void ExplicitSolver::ComputeAcceleration() {
    // Compute initial accelerations: a^{n} = M^{–1}(f^{n})

    // Get the field data
    DoubleField &acceleration_field_np1 = acceleration_field->field_of_state(stk::mesh::StateNP1);
    DoubleField &force_field_np1 = force_field->field_of_state(stk::mesh::StateNP1);
    DoubleField &mass_field_n = mass_field->field_of_state(stk::mesh::StateNone);

    unsigned num_values_per_node = 3;  // Number of values per node

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data->buckets(stk::topology::NODE_RANK)) {
        assert(num_values_per_node == stk::mesh::field_scalars_per_entity(*displacement_field, *bucket));
        // Get the field data for the bucket
        double *mass_data_n_for_bucket = stk::mesh::field_data(mass_field_n, *bucket);
        double *acceleration_data_np1_for_bucket = stk::mesh::field_data(acceleration_field_np1, *bucket);
        double *force_data_np1_for_bucket = stk::mesh::field_data(force_field_np1, *bucket);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            // Compute acceleration: a^{n} = M^{–1}(f^{n})
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                acceleration_data_np1_for_bucket[iI] = force_data_np1_for_bucket[iI] / mass_data_n_for_bucket[iI];
            }
        }
    }
}

void ExplicitSolver::ComputeFirstPartialUpdate(double time, double time_increment) {
    // Compute the time at the end of the time step, t^{n+1} = t^n + Δt^{n+½}
    double time_next = time + time_increment;

    // Compute the time at the midpoint of the time step, t^{n+½} = ½(t^n + t^{n+1})
    double time_mid = 0.5 * (time + time_next);

    // Get the velocity and acceleration fields
    DoubleField &velocity_field_n = velocity_field->field_of_state(stk::mesh::StateN);
    DoubleField &velocity_field_np1 = velocity_field->field_of_state(stk::mesh::StateNP1);

    DoubleField &acceleration_field_n = acceleration_field->field_of_state(stk::mesh::StateN);

    unsigned num_values_per_node = 3;  // Number of values per node

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data->buckets(stk::topology::NODE_RANK)) {
        assert(num_values_per_node == stk::mesh::field_scalars_per_entity(*displacement_field, *bucket));
        // Get the field data for the bucket
        double *velocity_data_n_for_bucket = stk::mesh::field_data(velocity_field_n, *bucket);
        double *acceleration_data_n_for_bucket = stk::mesh::field_data(acceleration_field_n, *bucket);

        double *velocity_data_np1_for_bucket = stk::mesh::field_data(velocity_field_np1, *bucket);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                velocity_data_np1_for_bucket[iI] = velocity_data_n_for_bucket[iI] + (time_mid - time) * acceleration_data_n_for_bucket[iI];
            }
        }
    }
}

// Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
void ExplicitSolver::UpdateNodalDisplacements(double time_increment) {
    // Get the displacement and velocity fields
    DoubleField &displacement_field_n = displacement_field->field_of_state(stk::mesh::StateN);
    DoubleField &displacement_field_np1 = displacement_field->field_of_state(stk::mesh::StateNP1);

    DoubleField &velocity_field_np1 = velocity_field->field_of_state(stk::mesh::StateNP1);

    unsigned num_values_per_node = 3;  // Number of values per node

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data->buckets(stk::topology::NODE_RANK)) {
        assert(num_values_per_node == stk::mesh::field_scalars_per_entity(*displacement_field, *bucket));
        // Get the field data for the bucket
        double *displacement_data_n_for_bucket = stk::mesh::field_data(displacement_field_n, *bucket);

        double *displacement_data_np1_for_bucket = stk::mesh::field_data(displacement_field_np1, *bucket);
        double *velocity_data_np1_for_bucket = stk::mesh::field_data(velocity_field_np1, *bucket);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                displacement_data_np1_for_bucket[iI] = displacement_data_n_for_bucket[iI] + time_increment * velocity_data_np1_for_bucket[iI];
            }
        }
    }

    // Parallel communication
    stk::mesh::communicate_field_data(*bulk_data, {&displacement_field_np1});
}

void ExplicitSolver::ComputeSecondPartialUpdate(double time, double time_increment) {
    // Compute the time at the end of the time step, t^{n+1} = t^n + Δt^{n+½}
    double time_next = time + time_increment;

    // Compute the time at the midpoint of the time step, t^{n+½} = ½(t^n + t^{n+1})
    double time_mid = 0.5 * (time + time_next);

    // Get the field data
    DoubleField &velocity_field_np1 = velocity_field->field_of_state(stk::mesh::StateNP1);
    DoubleField &acceleration_field_np1 = acceleration_field->field_of_state(stk::mesh::StateNP1);

    unsigned num_values_per_node = 3;  // Number of values per node

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data->buckets(stk::topology::NODE_RANK)) {
        assert(num_values_per_node == stk::mesh::field_scalars_per_entity(*displacement_field, *bucket));
        // Get the field data for the bucket
        double *velocity_data_np1_for_bucket = stk::mesh::field_data(velocity_field_np1, *bucket);
        double *acceleration_data_np1_for_bucket = stk::mesh::field_data(acceleration_field_np1, *bucket);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                velocity_data_np1_for_bucket[iI] += (time_next - time_mid) * acceleration_data_np1_for_bucket[iI];
            }
        }
    }
}

void ExplicitSolver::Solve() {
    // Compute mass matrix
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        stk::mesh::Part *p_part = internal_force_contribution->GetPart();
        ComputeMassMatrix(*bulk_data, p_part, internal_force_contribution->GetMaterial()->GetDensity());
    }

    // Set the initial time, t = 0
    double time = 0.0;

    // Set the initial increment, n = 0
    size_t n = 0;

    // Compute initial forces, done at state np1 as states will be swapped at the start of the time loop
    ComputeForce();

    // Compute initial accelerations, done at state np1 as states will be swapped at the start of the time loop
    ComputeAcceleration();

    // Output initial state
    sierra::Env::outputP0() << std::scientific << std::setprecision(6);  // Set output to scientific notation and 6 digits of precision
    if (m_output_scheduler->AtNextEvent(time)) {
        sierra::Env::outputP0() << "Writing Results at Time 0.0" << std::endl;
        m_io_mesh->WriteFieldResults(time);
    }

    // Get the initial time step
    double time_increment = m_time_stepper->GetTimeIncrement(time);

    // Loop over time steps
    while (m_time_stepper->AtEnd(time) == false) {
        sierra::Env::outputP0() << "Starting Time Increment " << n << ". Time " << time << " to " << time + time_increment << std::endl;

        // Move state n+1 to state n
        bulk_data->update_field_data_states();

        // Compute first partial update
        ComputeFirstPartialUpdate(time, time_increment);

        // Enforce essential boundary conditions: node I on \gamma_v_i : v_{iI}^{n+½} = \overbar{v}_I(x_I,t^{n+½})
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyVelocity(time + 0.5 * time_increment);
        }

        // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
        UpdateNodalDisplacements(time_increment);

        // Compute the force, f^{n+1}
        ComputeForce();

        // Compute the acceleration, a^{n+1}
        ComputeAcceleration();

        // Set acceleration on essential boundary conditions. Overwrites acceleration from ComputeAcceleration above so that the acceleration is consistent with the velocity boundary condition.
        for (const auto &boundary_condition : m_boundary_conditions) {
            boundary_condition->ApplyAcceleration(time + time_increment);
        }

        // Compute the second partial update
        ComputeSecondPartialUpdate(time, time_increment);

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
            sierra::Env::outputP0() << "Writing Results at Time " << time << std::endl;
            m_io_mesh->WriteFieldResults(time);
        }
    }
}

}  // namespace aperi
