#include "MassUtils.h"

#include <numeric>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/environment/Env.hpp>  // for outputP0
#include <stk_util/parallel/ParallelReduce.hpp>
#include <vector>

namespace acm {
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
// TODO(jake): Move to a utility file, make more efficient
void ComputeMassMatrix(const stk::mesh::BulkData &bulk_data, double density) {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
    const stk::mesh::MetaData &meta_data = bulk_data.mesh_meta_data();
    VectorField *mass_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "mass");
    VectorField *coordinates_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, meta_data.coordinate_field_name());

    double mass_sum = 0.0;
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
    sierra::Env::outputP0() << "Total Mass: " << mass_sum_global << std::endl;
}

}  // namespace acm
