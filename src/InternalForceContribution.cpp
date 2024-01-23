#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>

namespace aperi {

void InternalForceContribution::ComputeForce() {
    // Get the part selector
    stk::mesh::Selector selector = stk::mesh::Selector(*m_part);

    // Get the bulk data and meta data
    stk::mesh::BulkData &bulk_data = m_part->mesh_meta_data().mesh_bulk_data();
    stk::mesh::MetaData &meta_data = m_part->mesh_meta_data();

    // Get the force field
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
    VectorField *force_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "force");

    // Loop over the elements
    for (stk::mesh::Bucket *bucket : selector.get_buckets(stk::topology::ELEMENT_RANK)) {
        if (!bucket->owned()) {
            continue;
        }
        for (auto &&element : *bucket) {
            // Get the element's nodes
            stk::mesh::Entity const *nodes = bulk_data.begin_nodes(element);
            int num_nodes = bulk_data.num_nodes(element);
            for (int i = 0; i < num_nodes; ++i) {
                // Get the node
                stk::mesh::Entity node = nodes[i];
                // Get the node's force
                double *node_force = stk::mesh::field_data(*force_field, node);
                // Compute the internal force
                for (size_t j = 0; j < 3; ++j) {
                    node_force[j] += 0.0;
                }
            }
        }
    }
}

}  // namespace aperi