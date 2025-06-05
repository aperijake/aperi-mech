#include "FunctionValueUtils.h"

#include <iostream>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>

#include "Types.h"

namespace aperi {

void DebugPrintNeighborsField(const stk::mesh::Field<aperi::Unsigned> &neighbors_field, const stk::mesh::Field<aperi::Unsigned> &num_neighbors_field, const stk::mesh::Field<double> &coordinates_field, const stk::mesh::Selector &selector, stk::mesh::BulkData & /*bulk_data*/) {
    // Get the NGP fields
    auto ngp_neighbors_field = stk::mesh::get_updated_ngp_field<aperi::Unsigned>(neighbors_field);
    auto ngp_num_neighbors_field = stk::mesh::get_updated_ngp_field<aperi::Unsigned>(num_neighbors_field);
    auto ngp_coordinates_field = stk::mesh::get_updated_ngp_field<double>(coordinates_field);

    // Sync the fields to host
    ngp_neighbors_field.sync_to_host();
    ngp_num_neighbors_field.sync_to_host();
    ngp_coordinates_field.sync_to_host();

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    // Print the neighbors field for debugging purposes
    std::cout << "Rank " << rank << " Neighbors Field Debug Output:" << std::endl;
    for (stk::mesh::Bucket *bucket : selector.get_buckets(stk::topology::NODE_RANK)) {
        for (size_t i = 0; i < bucket->size(); ++i) {
            stk::mesh::Entity node = (*bucket)[i];
            const aperi::Unsigned *num_neighbors = stk::mesh::field_data(num_neighbors_field, node);

            const double *coordinates = stk::mesh::field_data(coordinates_field, node);

            std::cout << rank << " node at coordinates ("
                      << coordinates[0] << ", "
                      << coordinates[1] << ", "
                      << coordinates[2] << ") has " << num_neighbors[0] << " neighbors at coordinates:" << std::endl;
            for (size_t j = 0; j < num_neighbors[0]; ++j) {
                const aperi::Unsigned *neighbors = stk::mesh::field_data(neighbors_field, node);
                stk::mesh::Entity neighbor(neighbors[j]);
                const double *neighbor_coordinates = stk::mesh::field_data(coordinates_field, neighbor);
                std::cout << "     "
                          << "("
                          << neighbor_coordinates[0] << ", "
                          << neighbor_coordinates[1] << ", "
                          << neighbor_coordinates[2] << ")" << std::endl;
            }
        }
    }
}

}  // namespace aperi