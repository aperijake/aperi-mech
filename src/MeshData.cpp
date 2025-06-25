#include "MeshData.h"

#include <stk_mesh/base/SkinBoundary.hpp>

#include "Selector.h"

namespace aperi {

// MeshData methods
MeshData::MeshData(stk::mesh::BulkData *bulk_data) : m_bulk_data(bulk_data) {
    if (m_bulk_data == nullptr) {
        throw std::runtime_error("Bulk data is null.");
    }
}

stk::mesh::BulkData *MeshData::GetBulkData() const { return m_bulk_data; }

stk::mesh::MetaData *MeshData::GetMetaData() const { return &m_bulk_data->mesh_meta_data(); }

void MeshData::UpdateFieldDataStates(bool rotate_device_states) { m_bulk_data->update_field_data_states(rotate_device_states); }

NgpMeshData MeshData::GetUpdatedNgpMesh() { return NgpMeshData(stk::mesh::get_updated_ngp_mesh(*m_bulk_data)); }

std::string MeshData::GetCoordinatesFieldName() const { return m_bulk_data->mesh_meta_data().coordinate_field_name(); }

aperi::ElementTopology MeshData::GetElementTopology(std::string part_name) const {
    stk::mesh::Part *p_part = m_bulk_data->mesh_meta_data().get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    return aperi::GetElementTopology(p_part->topology());
}

std::vector<size_t> MeshData::GetCommMeshCounts() const {
    std::vector<size_t> comm_mesh_counts;
    stk::mesh::comm_mesh_counts(*m_bulk_data, comm_mesh_counts);
    return comm_mesh_counts;
}

size_t MeshData::GetNumNodes() const { return GetCommMeshCounts()[stk::topology::NODE_RANK]; }

size_t MeshData::GetNumElements() const { return GetCommMeshCounts()[stk::topology::ELEMENT_RANK]; }

size_t MeshData::GetNumFaces() const { return GetCommMeshCounts()[stk::topology::FACE_RANK]; }

size_t MeshData::GetNumOwnedNodes(const std::vector<std::string> &sets) {
    stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
    stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
    return stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, owned_selector);
}

size_t MeshData::GetNumOwnedElements(const std::vector<std::string> &sets) {
    stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
    stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
    return stk::mesh::count_entities(*m_bulk_data, stk::topology::ELEMENT_RANK, owned_selector);
}

void MeshData::ChangePartsHost(const std::string &part_name, const aperi::FieldDataTopologyRank &topo_rank, const Kokkos::View<aperi::Index *> &indices_to_change) {
    // Get the topology rank
    stk::topology::rank_t rank = aperi::GetTopologyRank(topo_rank);

    // If the indicies to change are empty, return
    if (indices_to_change.size() == 0) {
        return;
    }

    // Get the entities to change
    Kokkos::View<stk::mesh::Entity *> entities_to_change("entities_to_change", indices_to_change.size());
    IndexViewToEntityView(indices_to_change, *m_bulk_data, rank, entities_to_change);

    // Copy the entities to change to the host
    Kokkos::View<stk::mesh::Entity *>::HostMirror host_entities_to_change = Kokkos::create_mirror_view(entities_to_change);
    Kokkos::deep_copy(host_entities_to_change, entities_to_change);
    stk::mesh::EntityVector elems_to_change(host_entities_to_change.data(), host_entities_to_change.data() + host_entities_to_change.size());

    aperi::ChangePartsHost(part_name, rank, elems_to_change, *m_bulk_data);
}

void MeshData::AddPartToOutput(const std::string &part_name) {
    stk::mesh::Part *p_part = m_bulk_data->mesh_meta_data().get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    stk::io::put_io_part_attribute(*p_part);
}

void MeshData::DeclareFacePart(const std::string &part_name) {
    stk::mesh::MetaData &meta_data = m_bulk_data->mesh_meta_data();
    stk::mesh::Part *p_part = &meta_data.declare_part(part_name, stk::topology::FACE_RANK);
    if (p_part == nullptr) {
        throw std::runtime_error("Part '" + part_name + "' could not be declared.");
    }
}

void MeshData::CreateExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name) {
    stk::mesh::MetaData &meta_data = m_bulk_data->mesh_meta_data();
    stk::mesh::Part *p_part = meta_data.get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    stk::mesh::create_exposed_block_boundary_sides(*m_bulk_data, selector(), {p_part});
}

bool MeshData::CheckExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name) const {
    stk::mesh::MetaData &meta_data = m_bulk_data->mesh_meta_data();
    stk::mesh::Part *p_part = meta_data.get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    return stk::mesh::check_exposed_block_boundary_sides(*m_bulk_data, selector(), *p_part);
}

}  // namespace aperi