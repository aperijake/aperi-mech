#include "Solver.h"

#include <numeric>
#include <stk_topology/topology.hpp>
#include <stk_util/environment/Env.hpp>  // for outputP0

#include "FieldManager.h"
#include "ForceContribution.h"
#include "IoMesh.h"
#include "MassUtils.h"
#include "Material.h"

namespace acm {

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
    VectorField &acceleration_field_np1 = acceleration_field->field_of_state(stk::mesh::StateNP1);
    VectorField &force_field_np1 = force_field->field_of_state(stk::mesh::StateNP1);
    VectorField &mass_field_n = mass_field->field_of_state(stk::mesh::StateNone);

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data->buckets(stk::topology::NODE_RANK)) {
        // Get the field data for the bucket
        double *mass_data_n_for_bucket = stk::mesh::field_data(mass_field_n, *bucket);
        double *acceleration_data_np1_for_bucket = stk::mesh::field_data(acceleration_field_np1, *bucket);
        double *force_data_np1_for_bucket = stk::mesh::field_data(force_field_np1, *bucket);

        unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*displacement_field, *bucket);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            // Compute acceleration: a^{n} = M^{–1}(f^{n})
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                acceleration_data_np1_for_bucket[iI] = force_data_np1_for_bucket[iI] / mass_data_n_for_bucket[iI];
            }
        }
    }
}

void ExplicitSolver::ComputeFirstPartialUpdate(double time, double time_step) {
    // Compute the time at the end of the time step, t^{n+1} = t^n + Δt^{n+½}
    double time_next = time + time_step;

    // Compute the time at the midpoint of the time step, t^{n+½} = ½(t^n + t^{n+1})
    double time_mid = 0.5 * (time + time_next);

    // Get the displacement, velocity, and acceleration fields
    VectorField &displacement_field_n = displacement_field->field_of_state(stk::mesh::StateN);
    VectorField &displacement_field_np1 = displacement_field->field_of_state(stk::mesh::StateNP1);

    VectorField &velocity_field_n = velocity_field->field_of_state(stk::mesh::StateN);
    VectorField &velocity_field_np1 = velocity_field->field_of_state(stk::mesh::StateNP1);

    VectorField &acceleration_field_n = acceleration_field->field_of_state(stk::mesh::StateN);

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data->buckets(stk::topology::NODE_RANK)) {
        // Get the field data for the bucket
        double *displacement_data_n_for_bucket = stk::mesh::field_data(displacement_field_n, *bucket);
        double *velocity_data_n_for_bucket = stk::mesh::field_data(velocity_field_n, *bucket);
        double *acceleration_data_n_for_bucket = stk::mesh::field_data(acceleration_field_n, *bucket);

        double *displacement_data_np1_for_bucket = stk::mesh::field_data(displacement_field_np1, *bucket);
        double *velocity_data_np1_for_bucket = stk::mesh::field_data(velocity_field_np1, *bucket);

        unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*displacement_field, *bucket);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                velocity_data_np1_for_bucket[iI] = velocity_data_n_for_bucket[iI] + (time_mid - time) * acceleration_data_n_for_bucket[iI];
            }

            // Enforce velocity boundary conditions
            // TODO(jake): Enforce velocity boundary conditions

            // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
            for (unsigned i = 0; i < num_values_per_node; i++) {
                int iI = i_node * num_values_per_node + i;
                displacement_data_np1_for_bucket[iI] = displacement_data_n_for_bucket[iI] + time_step * velocity_data_np1_for_bucket[iI];
            }
        }
    }
}

void ExplicitSolver::ComputeSecondPartialUpdate(double time, double time_step) {
    // Compute the time at the end of the time step, t^{n+1} = t^n + Δt^{n+½}
    double time_next = time + time_step;

    // Compute the time at the midpoint of the time step, t^{n+½} = ½(t^n + t^{n+1})
    double time_mid = 0.5 * (time + time_next);

    // Get the field data
    VectorField &velocity_field_np1 = velocity_field->field_of_state(stk::mesh::StateNP1);
    VectorField &acceleration_field_np1 = acceleration_field->field_of_state(stk::mesh::StateNP1);

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data->buckets(stk::topology::NODE_RANK)) {
        // Get the field data for the bucket
        double *velocity_data_np1_for_bucket = stk::mesh::field_data(velocity_field_np1, *bucket);
        double *acceleration_data_np1_for_bucket = stk::mesh::field_data(acceleration_field_np1, *bucket);

        unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*displacement_field, *bucket);

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
    // Get the final time, t_{final}. TODO: Get from input file
    double time_final = 1.0;  // m_io_input_file->GetTimeFinal();

    // Get the time step, Δt^{n+½}. TODO: Get from input file
    double time_step = 0.1;  // m_io_input_file->GetTimeStep();

    // Compute mass matrix
    // TODO(jake): Do part-by-part
    ComputeMassMatrix(*bulk_data, m_internal_force_contributions[0]->GetMaterial()->GetDensity());

    // Set the initial time, t = 0
    double time = 0.0;

    // Set the initial increment, n = 0
    size_t n = 0;

    // Compute initial forces, done at state np1 as states will be swapped at the start of the time loop
    ComputeForce();

    // Compute initial accelerations, done at state np1 as states will be swapped at the start of the time loop
    ComputeAcceleration();

    // Output initial state
    sierra::Env::outputP0() << "Writing Results" << std::endl;
    m_io_mesh->WriteFieldResults(time);

    // Loop over time steps
    while (time < time_final) {
        sierra::Env::outputP0() << "Time: " << time << std::endl;

        // Move state n+1 to state n
        bulk_data->update_field_data_states();

        // Compute first partial update
        ComputeFirstPartialUpdate(time, time_step);

        // Compute the force, f^{n+1}
        ComputeForce();

        // Compute the acceleration, a^{n+1}
        ComputeAcceleration();

        // Compute the second partial update
        ComputeSecondPartialUpdate(time, time_step);

        // Compute the energy balance
        // TODO(jake): Compute energy balance

        // Update the time, t = t^{n+1}
        time += time_step;

        // Update the increment, n = n + 1
        n = n + 1;

        // Output
        sierra::Env::outputP0() << "Writing Results" << std::endl;
        m_io_mesh->WriteFieldResults(time);
    }
}

}  // namespace acm
