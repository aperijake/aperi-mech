#include "Solver.h"
#include "IoMesh.h"
#include "FieldManager.h"
#include <stk_topology/topology.hpp>

namespace acm {

void ExplicitSolver::Solve(){
    // Get the bulk data
    stk::mesh::BulkData &bulk_data = m_io_mesh->GetBulkData();

    // Get the meta data
    stk::mesh::MetaData &meta_data = m_io_mesh->GetMetaData();

    // Get the displacements field
    stk::mesh::Field<double>* displacement_field = meta_data.get_field<double>(stk::topology::NODE_RANK, "displacement");

    // Loop over all the buckets
    for (stk::mesh::Bucket *bucket : bulk_data.buckets(stk::topology::NODE_RANK)) {
        // Get the field data for the bucket
        double *displacement_data_for_bucket = stk::mesh::field_data(*displacement_field, *bucket);

        for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
            unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*displacement_field, *bucket);
            for (unsigned i = 0; i < num_values_per_node; i++) {
                displacement_data_for_bucket[i_node * num_values_per_node + i] = 99.9;
            }
        }
    }

}

}  // namespace acm