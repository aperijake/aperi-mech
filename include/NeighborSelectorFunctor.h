#pragma once

#include <Kokkos_Core.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Entity.hpp>
#include <stk_mesh/base/GetEntities.hpp>

#include "Field.h"
#include "FieldData.h"
#include "Index.h"
#include "MeshData.h"
#include "NgpMeshData.h"

namespace aperi {

/**
 * @brief Functor to select neighbors for each node based on search results.
 */
struct NeighborSelectorFunctor {
    aperi::Field<aperi::Unsigned> m_node_neighbors_field;  // Field to store neighbor node IDs
    aperi::Field<aperi::Unsigned> m_num_neighbors_field;   // Field to store the number of neighbors
    stk::mesh::BulkData* m_bulk_data;                      // Pointer to the bulk data
    aperi::NgpMeshData m_ngp_mesh_data;                    // NGP mesh data
    int m_rank;                                            // Rank of the current process
    bool m_serial;                                         // Flag indicating if the process is serial

    /**
     * @brief Constructor for NeighborSelectorFunctor.
     *
     * @param mesh_data Shared pointer to the mesh data.
     */
    NeighborSelectorFunctor(std::shared_ptr<aperi::MeshData> mesh_data)
        : m_node_neighbors_field(aperi::Field(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE})),
          m_num_neighbors_field(aperi::Field(mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE})),
          m_bulk_data(mesh_data->GetBulkData()),
          m_ngp_mesh_data(mesh_data->GetUpdatedNgpMesh()),
          m_rank(m_bulk_data->parallel_rank()),
          m_serial(m_bulk_data->parallel_size() == 1) {}

    /**
     * @brief Finalize any necessary operations.
     */
    void Finish() {
        // Never communicate the neighbors field. The shared nodes need to have a processor local value and not the value of the owning processor.
        m_node_neighbors_field.MarkModifiedOnDevice();
        m_num_neighbors_field.MarkModifiedOnDevice();
    }

    /**
     * @brief Operator to select neighbors for each node based on search results.
     *
     * @param node_results View of node search results.
     * @param too_many_neighbors_count Counter for nodes with too many neighbors.
     */
    KOKKOS_FUNCTION
    void operator()(const Kokkos::View<ResultViewType::value_type*, Kokkos::DefaultExecutionSpace, Kokkos::MemoryTraits<Kokkos::Unmanaged>>& node_results,
                    Kokkos::View<size_t, Kokkos::DefaultExecutionSpace> too_many_neighbors_count) const {
        // Get the node and neighbor entities and their indices
        auto& first_result = node_results(0);
        stk::mesh::Entity node(first_result.domainIdentProc.id());
        aperi::Index node_index = m_ngp_mesh_data.EntityToIndex(node);

        size_t insert_index = 0;
        size_t num_extra_neighbors = 0;

        for (size_t j = 0; j < node_results.extent(0); ++j) {
            auto result = node_results(j);
            if (result.domainIdentProc.proc() != m_rank || result.rangeIdentProc.id().second == REAL_MAX) {
                continue;
            }
            KOKKOS_ASSERT(result.domainIdentProc.id() == first_result.domainIdentProc.id());
            if (insert_index >= MAX_NODE_NUM_NEIGHBORS) {
                num_extra_neighbors++;
                continue;
            }
            auto identifier = result.rangeIdentProc.id().first;
            if (!m_serial) {
                // If we are not in serial mode, we need to convert the global id to a local offset
                // There is no "get_entity" on device, currently.
                // TODO(jake): For multi-GPU support, we need to handle the case where the rangeIdentProc.id() is not a local offset.
                stk::mesh::Entity neighbor = m_bulk_data->get_entity(stk::topology::NODE_RANK, identifier);
                identifier = neighbor.local_offset();
            }
            m_node_neighbors_field(node_index, insert_index) = static_cast<Unsigned>(identifier);
            insert_index++;
        }
        if (num_extra_neighbors > 0) {
            Kokkos::atomic_add(too_many_neighbors_count.data(), num_extra_neighbors);
        }
        m_num_neighbors_field(node_index, 0) = static_cast<Unsigned>(insert_index);
    }
};

}  // namespace aperi
