#pragma once

#include <Kokkos_Core.hpp>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/Ghosting.hpp>
#include <stk_topology/topology.hpp>

#include "MeshData.h"
#include "Types.h"

namespace aperi {

template <typename SearchViewType>
void GhostSearchResults(std::shared_ptr<aperi::MeshData> mesh_data,
                        const SearchViewType &host_search_results, stk::topology::rank_t range_rank) {
    static_assert(
        std::is_same<typename SearchViewType::memory_space, Kokkos::HostSpace>::value,
        "GhostSearchResults: host_search_results must be a Kokkos::View in HostSpace");

    using ResultType = typename SearchViewType::value_type;
    using Traits = SearchResultTraits<ResultType>;

    stk::mesh::BulkData *bulk_data = mesh_data->GetBulkData();
    // Skip if the parallel size is 1 or if there are no search results
    if (bulk_data->parallel_size() == 1 || host_search_results.size() == 0) {
        return;
    }
    bulk_data->modification_begin();
    stk::mesh::Ghosting &ghosting = bulk_data->create_ghosting("ghosting");
    std::vector<stk::mesh::EntityProc> entities_to_ghost;

    const int my_rank = bulk_data->parallel_rank();

    for (size_t i = 0; i < host_search_results.size(); ++i) {
        auto result = host_search_results(i);
        if (Traits::domain_proc(result) != my_rank && Traits::range_proc(result) == my_rank) {
            stk::mesh::Entity entity = bulk_data->get_entity(range_rank, Traits::range_id(result));
            entities_to_ghost.emplace_back(entity, Traits::domain_proc(result));
        }
    }

    bulk_data->change_ghosting(ghosting, entities_to_ghost);
    bulk_data->modification_end();
}

}  // namespace aperi
