#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "FieldData.h"

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

    void UpdateFieldDataStates(bool rotate_device_states = false) { m_bulk_data->update_field_data_states(rotate_device_states); }

    template<typename T>
    void UpdateFieldDataStates(const T &query, bool rotate_device_states = false) {
        for (auto &field_query_data : query) {
            stk::mesh::Field<double> *field = StkGetField(field_query_data, &m_bulk_data->mesh_meta_data());
            m_bulk_data->update_field_data_states(field, rotate_device_states);
        }
    }

    std::string GetCoordinatesFieldName() const { return m_bulk_data->mesh_meta_data().coordinate_field_name(); }

    size_t GetNumNodesPerElement(std::string part_name) const {
        stk::mesh::Part *part = m_bulk_data->mesh_meta_data().get_part(part_name);
        if (part == nullptr) {
            throw std::runtime_error("Part " + part_name + " not found.");
        }
        stk::topology topology = part->topology();
        return topology.num_nodes();
    }

    size_t GetNumNodes() const {
        size_t local_num_nodes = stk::mesh::count_selected_entities(m_bulk_data->mesh_meta_data().universal_part(), m_bulk_data->buckets(stk::topology::NODE_RANK));
        size_t num_nodes = 0;
        MPI_Reduce(&local_num_nodes, &num_nodes, 1, MPI_UNSIGNED_LONG, MPI_SUM, 0, MPI_COMM_WORLD);
        return num_nodes;
    }

   private:
    stk::mesh::BulkData *m_bulk_data;  // The bulk data object.
};

// Creation is in IoMesh as it knows about the mesh data (e.g. the bulk data and meta data).

}  // namespace aperi