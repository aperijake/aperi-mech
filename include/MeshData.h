#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "Constants.h"
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

    template <typename T, size_t N>
    void UpdateFieldDataStates(const std::array<T, N> &query, bool rotate_device_states = false) {
        for (auto &field_query_data : query) {
            stk::mesh::Field<double> *field = StkGetField(field_query_data, &m_bulk_data->mesh_meta_data());
            m_bulk_data->update_field_data_states(field, rotate_device_states);
        }
    }

    std::string GetCoordinatesFieldName() const { return m_bulk_data->mesh_meta_data().coordinate_field_name(); }

    aperi::ElementTopology GetElementTopology(std::string part_name) const {
        stk::mesh::Part *part = m_bulk_data->mesh_meta_data().get_part(part_name);
        if (part == nullptr) {
            throw std::runtime_error("Part " + part_name + " not found.");
        }
        return aperi::GetElementTopology(part->topology());
    }

    std::vector<size_t> GetCommMeshCounts() const {
        std::vector<size_t> comm_mesh_counts;
        stk::mesh::comm_mesh_counts(*m_bulk_data, comm_mesh_counts);
        return comm_mesh_counts;
    }

    size_t GetNumNodes() const {
        return GetCommMeshCounts()[stk::topology::NODE_RANK];
    }

    size_t GetNumElement() const {
        return GetCommMeshCounts()[stk::topology::ELEMENT_RANK];
    }

    size_t GetNumOwnedNodes(const std::vector<std::string> &sets) {
        stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
        stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
        return stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, owned_selector);
    }

    size_t GetNumOwnedElements(const std::vector<std::string> &sets) {
        stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
        stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
        return stk::mesh::count_entities(*m_bulk_data, stk::topology::ELEMENT_RANK, owned_selector);
    }

   private:
    stk::mesh::BulkData *m_bulk_data;  // The bulk data object.
};

// Creation is in IoMesh as it knows about the mesh data (e.g. the bulk data and meta data).

}  // namespace aperi