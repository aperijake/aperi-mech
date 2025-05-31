#pragma once

#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>

namespace aperi {

/**
 * @brief Prints the neighbors field for debugging purposes. Done on host
 * @param neighbors_field The neighbors field to print.
 * @param num_neighbors_field The number of neighbors field to print.
 * @param bulk_data The bulk data object.
 * @note This function is intended for debugging purposes and should not be used in production code.
 */
void DebugPrintNeighborsField(const stk::mesh::Field<uint64_t> &neighbors_field, const stk::mesh::Field<uint64_t> &num_neighbors_field, const stk::mesh::Field<double> &coordinates_field, const stk::mesh::Selector &selector, stk::mesh::BulkData &bulk_data);

}  // namespace aperi