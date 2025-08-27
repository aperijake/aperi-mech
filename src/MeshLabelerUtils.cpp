#include "MeshLabelerUtils.h"

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

void AddExtraNodesToSurfaceParts(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets) {
    stk::mesh::BulkData *bulk_data = mesh_data->GetBulkData();
    stk::mesh::MetaData &meta_data = bulk_data->mesh_meta_data();

    // Get the extra node field
    aperi::FieldQueryData<aperi::Unsigned> extra_node_query = aperi::FieldQueryData<aperi::Unsigned>{"extra_node", FieldQueryState::None, FieldDataTopologyRank::FACE};
    stk::mesh::Field<aperi::Unsigned> *extra_node_field;
    bool extra_node_field_exists = aperi::StkFieldExists(extra_node_query, &meta_data);
    if (!extra_node_field_exists) {
        return;  // Extra node field does not exist, nothing to do
    }
    extra_node_field = StkGetField(FieldQueryData<aperi::Unsigned>{"extra_node", FieldQueryState::None, FieldDataTopologyRank::FACE}, &meta_data);
    extra_node_field->sync_to_host();

    for (const std::string &set : sets) {
        // Get the selector
        stk::mesh::Selector selector = StkGetSelector({set}, &meta_data);

        stk::mesh::Selector full_owned_selector = meta_data.locally_owned_part();
        stk::mesh::Selector owned_selector = selector & full_owned_selector;

        // Host operation and mesh modification
        stk::mesh::EntityVector nodes_to_change;

        for (stk::mesh::Bucket *bucket : owned_selector.get_buckets(stk::topology::FACE_RANK)) {
            for (size_t i = 0; i < bucket->size(); ++i) {
                stk::mesh::Entity face = (*bucket)[i];
                aperi::Unsigned *extra_node_data = stk::mesh::field_data(*extra_node_field, face);
                aperi::Unsigned extra_node_id = extra_node_data[0];
                if (extra_node_id != aperi::Index::INVALID_ID) {
                    stk::mesh::Entity node(extra_node_id);
                    nodes_to_change.push_back(node);
                }
            }
        }

        //  Change the nodes to the active part
        ChangePartsHost(set, nodes_to_change, *bulk_data);
    }
}

}  // namespace aperi
