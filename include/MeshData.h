#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <vector>

namespace aperi {

class MeshData {
   public:
    MeshData(stk::mesh::BulkData *bulk_data) : m_bulk_data(bulk_data) {
        // Throw an exception if the bulk data is null.
        if (m_bulk_data == nullptr) {
            throw std::runtime_error("Bulk data is null.");
        }
    }

    stk::mesh::BulkData *GetBulkData() const { return m_bulk_data; }

    void UpdateFieldDataStates() { m_bulk_data->update_field_data_states(); }

    std::string GetCoordinatesFieldName() const { return m_bulk_data->mesh_meta_data().coordinate_field_name(); }

    size_t GetNumNodesPerElement(std::string part_name) const {
        stk::mesh::Part *part = m_bulk_data->mesh_meta_data().get_part(part_name);
        if (part == nullptr) {
            throw std::runtime_error("Part " + part_name + " not found.");
        }
        stk::topology topology = part->topology();
        return topology.num_nodes();
    }

   private:
    stk::mesh::BulkData *m_bulk_data;  // The bulk data object.
};

// Creation is in IoMesh as it knows about the mesh data (e.g. the bulk data and meta data).

}  // namespace aperi