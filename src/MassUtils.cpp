#include "MassUtils.h"

#include <array>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/environment/Env.hpp>  // for outputP0
#include <stk_util/parallel/ParallelReduce.hpp>

#include "MathUtils.h"

namespace aperi {

// Compute the diagonal mass matrix
double ComputeMassMatrix(const stk::mesh::BulkData &bulk_data, const stk::mesh::Part *part, double density) {
    // STK QUESTION: Just a general review of how I am using STK here would be helpful
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
    const stk::mesh::MetaData &meta_data = bulk_data.mesh_meta_data();
    stk::mesh::Selector part_selector(*part);
    VectorField *mass_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "mass");
    VectorField *coordinates_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, meta_data.coordinate_field_name());

    double mass_sum = 0.0;
    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : part_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
        bool owned = bucket->owned();
        for (auto &&elem : *bucket) {
            // Get the number of nodes in the element
            // unsigned num_nodes = bulk_data.num_nodes(elem);
            // assert(num_nodes == 4);
            size_t num_nodes = 4;

            // Get the element connectivity
            const stk::mesh::Entity *elem_nodes = bulk_data.begin_nodes(elem);

            // Coordinates of the element nodes
            std::array<std::array<double, 3>, 4> coordinates;
            for (unsigned i = 0; i < num_nodes; ++i) {
                stk::mesh::Entity node = elem_nodes[i];
                double *coordinate_values = stk::mesh::field_data(*coordinates_field, node);
                coordinates[i] = {coordinate_values[0], coordinate_values[1], coordinate_values[2]};
            }
            double mass = density * TetVolume(coordinates) / num_nodes;
            if (owned) mass_sum += mass * num_nodes;

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
    stk::all_reduce_sum(bulk_data.parallel(), &mass_sum, &mass_sum_global, 1);
    sierra::Env::outputP0() << "Total Mass for Part " << part->name() << ": " << mass_sum_global << std::endl;
    return mass_sum_global;
}

}  // namespace aperi
