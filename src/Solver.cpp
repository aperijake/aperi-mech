#include "Solver.h"

#include <stk_topology/topology.hpp>

#include "FieldManager.h"
#include "IoMesh.h"

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

void ExplicitSolver::Solve() {
    // Get the final time, t_{final}. TODO: Get from input file
    double time_final = 1.0;  // m_io_input_file->GetTimeFinal();

    // Get the time step, Δt^{n+½}. TODO: Get from input file
    double time_step = 0.1;  // m_io_input_file->GetTimeStep();

    // Get the bulk data
    stk::mesh::BulkData &bulk_data = m_io_mesh->GetBulkData();

    // Get the meta data
    stk::mesh::MetaData &meta_data = m_io_mesh->GetMetaData();

    // Get the displacement, velocity, and acceleration fields
    stk::mesh::Field<double> *displacement_field = meta_data.get_field<double>(stk::topology::NODE_RANK, "displacement");
    stk::mesh::Field<double> *velocity_field = meta_data.get_field<double>(stk::topology::NODE_RANK, "velocity");
    stk::mesh::Field<double> *acceleration_field = meta_data.get_field<double>(stk::topology::NODE_RANK, "acceleration");

    // Compute mass matrix
    // TODO: Compute mass matrix

    // Set the initial time, t = 0
    double time = 0.0;

    // Set the initial increment, n = 0
    size_t n = 0;

    // Loop over time steps
    while (time < time_final) {
        // Move state n+1 to state n
        // HERE

        // Get the force, f^n = getforce()
        // TODO: Write getforce

        // Compute acceleration: a^n = M^{–1}(f^n – C^{damp} v^{n–½})
        // TODO: Compute acceleration

        // Compute the time at the end of the time step, t^{n+1} = t^n + Δt^{n+½}
        double time_next = time + time_step;

        // Compute the time at the midpoint of the time step, t^{n+½} = ½(t^n + t^{n+1})
        double time_mid = 0.5 * (time + time_next);

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : bulk_data.buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            double *displacement_data_for_bucket = stk::mesh::field_data(*displacement_field, *bucket);
            double *velocity_data_for_bucket = stk::mesh::field_data(*velocity_field, *bucket);
            double *acceleration_data_for_bucket = stk::mesh::field_data(*acceleration_field, *bucket);

            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
                // HERE

                // Enforce velocity boundary conditions
                // TODO: Enforce velocity boundary conditions

                // Update nodal displacements: d^{n+1} = d^n+ Δt^{n+½}v^{n+½}
                // HERE

                // Get the force, f^{n+1} = getforce()
                // TODO: Write getforce

                // Compute acceleration: a^{n+1} = M^{–1}(f^{n+1} – C^{damp} v^{n+½})
                // TODO: Compute acceleration

                // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
                // HERE

                // unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*displacement_field, *bucket);
                // for (unsigned i = 0; i < num_values_per_node; i++) {
                //     displacement_data_for_bucket[i_node * num_values_per_node + i] = 99.9;
                // }
            }
        }

        // Compute the energy balance
        // TODO: Compute energy balance

        // Update the time, t = t^{n+1}
        time = time_next;

        // Update the increment, n = n + 1
        n = n + 1;

        // Output
        // HERE
    }
}

}  // namespace acm