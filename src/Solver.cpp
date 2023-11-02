#include "Solver.h"

#include <numeric>
#include <stk_topology/topology.hpp>
#include <stk_util/environment/Env.hpp>  // for outputP0

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

// Compute the cross product of two vectors
// TODO: Move to a utility file, make more efficient
std::vector<double> CrossProduct(const std::vector<double> &v1, const std::vector<double> &v2) {
    if (v1.size() != 3 || v2.size() != 3) {
        throw std::invalid_argument("Both input vectors must have size 3.");
    }

    std::vector<double> cross(3);
    cross[0] = v1[1] * v2[2] - v1[2] * v2[1];
    cross[1] = v1[2] * v2[0] - v1[0] * v2[2];
    cross[2] = v1[0] * v2[1] - v1[1] * v2[0];

    return cross;
}

// Compute the volume of a tetrahedron
// TODO: Move to a utility file, make more efficient
double TetVolume(const std::vector<std::vector<double>> &tet) {
    std::vector<double> v1(3);
    std::vector<double> v2(3);
    std::vector<double> v3(3);

    for (int i = 0; i < 3; ++i) {
        v1[i] = tet[1][i] - tet[0][i];
        v2[i] = tet[2][i] - tet[0][i];
        v3[i] = tet[3][i] - tet[0][i];
    }

    std::vector<double> cross = CrossProduct(v2, v3);

    // compute dot product of v1 and cross
    double dot = 0;
    for (int i = 0; i < 3; ++i) {
        dot += v1[i] * cross[i];
    }
    return std::abs(dot) / 6.0;
}

// Compute the diagonal mass matrix
// TODO: Move to a utility file, make more efficient
void ComputeMassMatrix(const stk::mesh::BulkData &bulk_data) {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
    // get mesh meta data
    const stk::mesh::MetaData &meta_data = bulk_data.mesh_meta_data();
    VectorField *mass_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "mass");
    VectorField *coordinates_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, meta_data.coordinate_field_name());

    double density = 1.0;  // TODO: Get from input file
    double mass_sum = 0.0;
    int elem_count = 0;
    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data.buckets(stk::topology::ELEMENT_RANK)) {
        bool owned = bucket->owned();
        for (auto &&elem : *bucket) {
            // Get the number of nodes in the element
            unsigned num_nodes = bulk_data.num_nodes(elem);
            // assert(num_nodes == 4);

            // Get the element connectivity
            const stk::mesh::Entity *elem_nodes = bulk_data.begin_nodes(elem);

            // Coordinates of the element nodes
            std::vector<std::vector<double>> coordinates;
            for (unsigned i = 0; i < num_nodes; ++i) {
                stk::mesh::Entity node = elem_nodes[i];
                double *coordinate_values = stk::mesh::field_data(*coordinates_field, node);
                coordinates.push_back(std::vector<double>(coordinate_values, coordinate_values + 3));
            }
            double mass = density * TetVolume(coordinates) / num_nodes;
            if (owned) {
                mass_sum += mass * num_nodes;
                elem_count++;
            }

            for (unsigned i = 0; i < num_nodes; ++i) {
                stk::mesh::Entity node = elem_nodes[i];
                double *mass_values = stk::mesh::field_data(*mass_field, node);
                // add mass to mass_values
                mass_values[0] += mass;
                mass_values[1] += mass;
                mass_values[2] += mass;
            }
        }
    }
    // Parallel sum
    double mass_sum_global = 0.0;
    int elem_count_global = 0;
    stk::all_reduce_sum(bulk_data.parallel(), &mass_sum, &mass_sum_global, 1);
    stk::all_reduce_sum(bulk_data.parallel(), &elem_count, &elem_count_global, 1);
    sierra::Env::outputP0() << "Total Mass: " << mass_sum_global << std::endl;
    sierra::Env::outputP0() << "Element Count: " << elem_count_global << std::endl;
}

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
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
    VectorField *displacement_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "displacement");
    VectorField *velocity_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "velocity");
    VectorField *acceleration_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "acceleration");

    VectorField &displacement_field_n = displacement_field->field_of_state(stk::mesh::StateN);
    VectorField &displacement_field_np1 = displacement_field->field_of_state(stk::mesh::StateNP1);

    VectorField &velocity_field_n = velocity_field->field_of_state(stk::mesh::StateN);
    VectorField &velocity_field_np1 = velocity_field->field_of_state(stk::mesh::StateNP1);

    VectorField &acceleration_field_n = acceleration_field->field_of_state(stk::mesh::StateN);
    VectorField &acceleration_field_np1 = acceleration_field->field_of_state(stk::mesh::StateNP1);

    // Compute mass matrix
    ComputeMassMatrix(bulk_data);

    // Set the initial time, t = 0
    double time = 0.0;

    // Set the initial increment, n = 0
    size_t n = 0;

    // Output initial state
    sierra::Env::outputP0() << "Writing Results" << std::endl;
    m_io_mesh->WriteFieldResults(time);

    // Loop over time steps
    while (time < time_final) {
        sierra::Env::outputP0() << "Time: " << time << std::endl;

        // Move state n+1 to state n
        bulk_data.update_field_data_states();

        // Compute the time at the end of the time step, t^{n+1} = t^n + Δt^{n+½}
        double time_next = time + time_step;

        // Compute the time at the midpoint of the time step, t^{n+½} = ½(t^n + t^{n+1})
        double time_mid = 0.5 * (time + time_next);

        // Get the force, f^n = getforce()
        // TODO(jake): Write getforce

        // Compute acceleration: a^n = M^{–1}(f^n – C^{damp} v^{n–½})
        // TODO(jake): Compute acceleration

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : bulk_data.buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            double *displacement_data_n_for_bucket = stk::mesh::field_data(displacement_field_n, *bucket);
            double *velocity_data_n_for_bucket = stk::mesh::field_data(velocity_field_n, *bucket);
            double *acceleration_data_n_for_bucket = stk::mesh::field_data(acceleration_field_n, *bucket);

            double *displacement_data_np1_for_bucket = stk::mesh::field_data(displacement_field_np1, *bucket);
            double *velocity_data_np1_for_bucket = stk::mesh::field_data(velocity_field_np1, *bucket);
            double *acceleration_data_np1_for_bucket = stk::mesh::field_data(acceleration_field_np1, *bucket);

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

                // Get the force, f^{n+1} = getforce()
                // TODO(jake): Write getforce

                // Compute acceleration: a^{n+1} = M^{–1}(f^{n+1} – C^{damp} v^{n+½})
                // TODO(jake): Compute acceleration

                // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
                for (unsigned i = 0; i < num_values_per_node; i++) {
                    int iI = i_node * num_values_per_node + i;
                    velocity_data_np1_for_bucket[iI] = velocity_data_np1_for_bucket[iI] + (time_next - time_mid) * acceleration_data_np1_for_bucket[iI];
                }
            }
        }

        // Compute the energy balance
        // TODO(jake): Compute energy balance

        // Update the time, t = t^{n+1}
        time = time_next;

        // Update the increment, n = n + 1
        n = n + 1;

        // Output
        sierra::Env::outputP0() << "Writing Results" << std::endl;
        m_io_mesh->WriteFieldResults(time);
    }
}

}  // namespace acm
