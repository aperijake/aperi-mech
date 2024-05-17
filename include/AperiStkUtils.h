#pragma once

#include <stdexcept>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/FieldState.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <string>
#include <vector>

#include "FieldData.h"
#include "LogUtils.h"

namespace aperi {

inline stk::mesh::Field<double> *StkGetField(const FieldQueryData &field_query_data, stk::mesh::MetaData *meta_data) {
    stk::topology::rank_t rank = field_query_data.rank == FieldDataRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK;
    stk::mesh::Field<double> *field = meta_data->get_field<double>(rank, field_query_data.name);
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

}  // namespace aperi