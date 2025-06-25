#include "MeshData.h"

#include <stdexcept>
#include <stk_io/IossBridge.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/SkinBoundary.hpp>
#include <stk_mesh/base/Types.hpp>
#include <string>
#include <vector>

#include "Selector.h"

namespace aperi {

// MeshData constructor: checks for null pointer and stores bulk data pointer
MeshData::MeshData(stk::mesh::BulkData *bulk_data) : m_bulk_data(bulk_data) {
    if (m_bulk_data == nullptr) {
        throw std::runtime_error("Bulk data is null.");
    }
}

// Return pointer to underlying stk::mesh::BulkData
stk::mesh::BulkData *MeshData::GetBulkData() const { return m_bulk_data; }

// Return pointer to underlying stk::mesh::MetaData
stk::mesh::MetaData *MeshData::GetMetaData() const { return &m_bulk_data->mesh_meta_data(); }

// Update field data states for all fields
void MeshData::UpdateFieldDataStates(bool rotate_device_states) {
    m_bulk_data->update_field_data_states(rotate_device_states);
}

// Return a device mesh wrapper with updated state
NgpMeshData MeshData::GetUpdatedNgpMesh() {
    return NgpMeshData(stk::mesh::get_updated_ngp_mesh(*m_bulk_data));
}

// Get the name of the coordinates field
std::string MeshData::GetCoordinatesFieldName() const {
    return m_bulk_data->mesh_meta_data().coordinate_field_name();
}

// Get the element topology for a given part name
aperi::ElementTopology MeshData::GetElementTopology(std::string part_name) const {
    stk::mesh::Part *p_part = m_bulk_data->mesh_meta_data().get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    return aperi::GetElementTopology(p_part->topology());
}

// Get mesh entity counts for all entity ranks
std::vector<size_t> MeshData::GetCommMeshCounts() const {
    std::vector<size_t> comm_mesh_counts;
    stk::mesh::comm_mesh_counts(*m_bulk_data, comm_mesh_counts);
    return comm_mesh_counts;
}

// Get the number of nodes in the mesh
size_t MeshData::GetNumNodes() const {
    return GetCommMeshCounts()[stk::topology::NODE_RANK];
}

// Get the number of elements in the mesh
size_t MeshData::GetNumElements() const {
    return GetCommMeshCounts()[stk::topology::ELEMENT_RANK];
}

// Get the number of faces in the mesh
size_t MeshData::GetNumFaces() const {
    return GetCommMeshCounts()[stk::topology::FACE_RANK];
}

// Get the number of owned nodes in the given sets
size_t MeshData::GetNumOwnedNodes(const std::vector<std::string> &sets) {
    stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
    stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
    return stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, owned_selector);
}

// Get the number of owned elements in the given sets
size_t MeshData::GetNumOwnedElements(const std::vector<std::string> &sets) {
    stk::mesh::Selector selector = StkGetSelector(sets, &m_bulk_data->mesh_meta_data());
    stk::mesh::Selector owned_selector = selector & m_bulk_data->mesh_meta_data().locally_owned_part();
    return stk::mesh::count_entities(*m_bulk_data, stk::topology::ELEMENT_RANK, owned_selector);
}

// Change the parts of entities on the host
void MeshData::ChangePartsHost(const std::string &part_name, const aperi::FieldDataTopologyRank &topo_rank, const Kokkos::View<aperi::Index *> &indices_to_change) {
    // Get the topology rank
    stk::topology::rank_t rank = aperi::GetTopologyRank(topo_rank);

    // If the indices to change are empty, return
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

// Mark a part for output in the results file
void MeshData::AddPartToOutput(const std::string &part_name) {
    stk::mesh::Part *p_part = m_bulk_data->mesh_meta_data().get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    stk::io::put_io_part_attribute(*p_part);
}

// Declare a new face part in the mesh metadata
void MeshData::DeclareFacePart(const std::string &part_name) {
    stk::mesh::MetaData &meta_data = m_bulk_data->mesh_meta_data();
    stk::mesh::Part *p_part = &meta_data.declare_part(part_name, stk::topology::FACE_RANK);
    if (p_part == nullptr) {
        throw std::runtime_error("Part '" + part_name + "' could not be declared.");
    }
}

// Create exposed block boundary sides for a selector and part
void MeshData::CreateExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name) {
    stk::mesh::MetaData &meta_data = m_bulk_data->mesh_meta_data();
    stk::mesh::Part *p_part = meta_data.get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    stk::mesh::create_exposed_block_boundary_sides(*m_bulk_data, selector(), {p_part});
}

// Check that exposed block boundary sides exist for a selector and part
bool MeshData::CheckExposedBlockBoundarySides(const aperi::Selector &selector, const std::string &part_name) const {
    stk::mesh::MetaData &meta_data = m_bulk_data->mesh_meta_data();
    stk::mesh::Part *p_part = meta_data.get_part(part_name);
    if (p_part == nullptr) {
        throw std::runtime_error("Part " + part_name + " not found.");
    }
    return stk::mesh::check_exposed_block_boundary_sides(*m_bulk_data, selector(), *p_part);
}

}  // namespace aperi