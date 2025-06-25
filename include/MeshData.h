#pragma once

#include <memory>
#include <numeric>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "Constants.h"
#include "FieldData.h"
#include "Index.h"
#include "LogUtils.h"
#include "Types.h"

namespace aperi {

// Forward declaration
struct Selector;

class NgpMeshData {
   public:
    NgpMeshData(const stk::mesh::NgpMesh &ngp_mesh) : m_ngp_mesh(ngp_mesh) {}

    KOKKOS_INLINE_FUNCTION
    aperi::Index LocalOffsetToIndex(Unsigned local_offset) const {
        stk::mesh::Entity entity(local_offset);
        return aperi::Index(m_ngp_mesh.fast_mesh_index(entity));
    }

    KOKKOS_INLINE_FUNCTION
    aperi::Index EntityToIndex(const stk::mesh::Entity &entity) const {
        return aperi::Index(m_ngp_mesh.fast_mesh_index(entity));
    }

   private:
    stk::mesh::NgpMesh m_ngp_mesh;
};

class MeshData {
   public:
    MeshData(stk::mesh::BulkData *bulk_data);

    stk::mesh::BulkData *GetBulkData() const;
    stk::mesh::MetaData *GetMetaData() const;
    void UpdateFieldDataStates(bool rotate_device_states = false);
    NgpMeshData GetUpdatedNgpMesh();

    template <typename T, size_t N>
    void UpdateFieldDataStates(const std::array<T, N> &query, bool rotate_device_states = false) {
        for (auto &field_query_data : query) {
            stk::mesh::Field<double> *field = StkGetField(field_query_data, &m_bulk_data->mesh_meta_data());
            m_bulk_data->update_field_data_states(field, rotate_device_states);
        }
    }

    std::string GetCoordinatesFieldName() const;
    aperi::ElementTopology GetElementTopology(std::string part_name) const;
    std::vector<size_t> GetCommMeshCounts() const;
    size_t GetNumNodes() const;
    size_t GetNumElements() const;
    size_t GetNumFaces() const;
    size_t GetNumOwnedNodes(const std::vector<std::string> &sets);
    size_t GetNumOwnedElements(const std::vector<std::string> &sets);
    void ChangePartsHost(const std::string &part_name, const aperi::FieldDataTopologyRank &topo_rank, const Kokkos::View<aperi::Index *> &indices_to_change);
    void AddPartToOutput(const std::string &part_name);
    void DeclareFacePart(const std::string &part_name);
    void CreateExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name);
    bool CheckExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name) const;

   private:
    stk::mesh::BulkData *m_bulk_data;
};

}  // namespace aperi