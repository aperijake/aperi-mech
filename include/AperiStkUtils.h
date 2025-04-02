#pragma once

#include <stdexcept>
#include <stk_io/IossBridge.hpp>
#include <stk_mesh/base/Entity.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/FieldState.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <string>
#include <vector>

#include "Constants.h"
#include "FieldData.h"
#include "Index.h"
#include "LogUtils.h"

namespace aperi {

// Function to get the aperi::ElementTopology from a stk::topology
inline aperi::ElementTopology GetElementTopology(const stk::topology &topology) {
    if (topology == stk::topology::TET_4) {
        return aperi::ElementTopology::Tetrahedron4;
    } else if (topology == stk::topology::HEX_8) {
        return aperi::ElementTopology::Hexahedron8;
    } else {
        throw std::invalid_argument("Element topology not supported.");
    }
    return aperi::ElementTopology::None;
}

// Function to get the topology rank
inline stk::topology::rank_t GetTopologyRank(FieldDataTopologyRank data_topology_rank) {
    if (data_topology_rank == FieldDataTopologyRank::NODE) {
        return stk::topology::NODE_RANK;
    }
    if (data_topology_rank == FieldDataTopologyRank::ELEMENT) {
        return stk::topology::ELEMENT_RANK;
    }
    throw std::invalid_argument("FieldData: Invalid data topology rank.");
}

// Function to get the field output type
inline stk::io::FieldOutputType GetFieldOutputType(FieldDataRank data_rank) {
    switch (data_rank) {
        case FieldDataRank::SCALAR:
            return stk::io::FieldOutputType::SCALAR;
        case FieldDataRank::VECTOR:
            return stk::io::FieldOutputType::VECTOR_3D;
        case FieldDataRank::TENSOR:
            return stk::io::FieldOutputType::SYM_TENSOR_33;
        case FieldDataRank::CUSTOM:
            return stk::io::FieldOutputType::CUSTOM;
        default:
            throw std::invalid_argument("FieldData: Invalid data type.");
    }
}

template <typename T>
inline bool StkFieldExists(const FieldQueryData<T> &field_query_data, stk::mesh::MetaData *meta_data) {
    stk::topology::rank_t topology_rank = GetTopologyRank(field_query_data.topology_rank);
    stk::mesh::Field<T> *field = meta_data->get_field<T>(topology_rank, field_query_data.name);
    return field != nullptr;
}

template <typename T>
inline stk::mesh::Field<T> *StkGetField(const FieldQueryData<T> &field_query_data, stk::mesh::MetaData *meta_data) {
    stk::topology::rank_t topology_rank = GetTopologyRank(field_query_data.topology_rank);
    stk::mesh::Field<T> *field = meta_data->get_field<T>(topology_rank, field_query_data.name);
    if (field == nullptr) {
        throw std::runtime_error("Field " + field_query_data.name + " not found.");
    }
    stk::mesh::FieldState state = stk::mesh::StateNone;
    if (field_query_data.state == FieldQueryState::N) {
        state = stk::mesh::StateN;
    } else if (field_query_data.state == FieldQueryState::NP1) {
        state = stk::mesh::StateNP1;
    } else {
        if (field_query_data.state != FieldQueryState::None) {
            throw std::runtime_error("Invalid field state");
        }
    }
    return &field->field_of_state(state);
}

// Get a stk::mesh::Selector from a list of set names.
inline stk::mesh::Selector StkGetSelector(const std::vector<std::string> &sets, stk::mesh::MetaData *meta_data) {
    if (sets.size() == 0) {
        return stk::mesh::Selector(meta_data->universal_part());
    }
    stk::mesh::PartVector parts;
    for (const auto &set : sets) {
        stk::mesh::Part *part = meta_data->get_part(set);
        if (part == nullptr) {
            throw std::runtime_error("Set " + set + " not found.");
        }
        parts.push_back(part);
    }
    return stk::mesh::selectUnion(parts);
}

// Create local entities on host and copy to device
inline Kokkos::View<stk::mesh::FastMeshIndex *, stk::ngp::ExecSpace> GetLocalEntityIndices(stk::mesh::EntityRank rank, stk::mesh::Selector selector, stk::mesh::BulkData *bulk_data) {
    // TODO(jake): This is a temporary solution. STK is working on having the local entities available on the device.

    // Get the local entities
    std::vector<stk::mesh::Entity> local_entities;
    stk::mesh::get_entities(*bulk_data, rank, selector, local_entities);

    // Create the mesh indices views
    Kokkos::View<stk::mesh::FastMeshIndex *, stk::ngp::ExecSpace> mesh_indices("mesh_indices", local_entities.size());
    Kokkos::View<stk::mesh::FastMeshIndex *, stk::ngp::ExecSpace>::HostMirror host_mesh_indices = Kokkos::create_mirror_view(Kokkos::WithoutInitializing, mesh_indices);

    // Put the local entities in the host view
    for (size_t i = 0; i < local_entities.size(); ++i) {
        const stk::mesh::MeshIndex &mesh_index = bulk_data->mesh_index(local_entities[i]);
        host_mesh_indices(i) = stk::mesh::FastMeshIndex{mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal};
    }

    // Copy to device
    Kokkos::deep_copy(mesh_indices, host_mesh_indices);

    return mesh_indices;
}

// Check if a field exists on a part
template <typename T>
inline bool StkFieldExistsOn(const FieldQueryData<T> &field_query_data, const std::string &part_name, stk::mesh::MetaData *meta_data) {
    assert(meta_data != nullptr);
    stk::topology::rank_t topology_rank = GetTopologyRank(field_query_data.topology_rank);
    stk::mesh::Part *part = meta_data->get_part(part_name);
    assert(part != nullptr);

    stk::mesh::Field<T> *field = meta_data->get_field<T>(topology_rank, field_query_data.name);
    if (field == nullptr) {
        return false;
    }
    return field->defined_on(*part);
}

inline aperi::Index EntityToIndex(stk::mesh::Entity entity, stk::mesh::BulkData &bulk) {
    const stk::mesh::MeshIndex &mesh_index = bulk.mesh_index(entity);
    return aperi::Index(mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal);
}

}  // namespace aperi