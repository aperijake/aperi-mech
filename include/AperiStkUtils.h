#pragma once

#include <stdexcept>
#include <stk_io/IossBridge.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/FieldState.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>
#include <string>
#include <vector>

#include "FieldData.h"
#include "LogUtils.h"

namespace aperi {

template <typename T>
inline stk::mesh::Field<T> *StkGetField(const FieldQueryData &field_query_data, stk::mesh::MetaData *meta_data) {
    stk::topology::rank_t topology_rank = field_query_data.topology_rank == FieldDataTopologyRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK;
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

}  // namespace aperi