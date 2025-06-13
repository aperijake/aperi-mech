#include "NeighborSearchProcessor.h"

namespace aperi {

// Append "_active" to each set name and create a selector for the active entities
inline std::vector<std::string> AppendActiveSuffix(const std::vector<std::string> &sets) {
    std::vector<std::string> active_sets(sets.size());
    for (size_t i = 0; i < sets.size(); ++i) {
        active_sets[i] = sets[i] + "_active";
    }
    return active_sets;
}

inline aperi::Selector GetRangeSelector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data) {
    std::vector<std::string> active_sets = AppendActiveSuffix(sets);
    aperi::Selector selector(active_sets, mesh_data, aperi::SelectorOwnership::OWNED);
    return selector;
}

inline aperi::Selector GetDomainSelector(const std::vector<std::string> &sets, aperi::MeshData *mesh_data) {
    aperi::Selector selector(sets, mesh_data, aperi::SelectorOwnership::OWNED_OR_SHARED);
    return selector;
}

NeighborSearchProcessor::NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data,
                                                 bool enable_accurate_timers)
    : m_mesh_data(mesh_data),
      m_timer_manager("Neighbor Search Processor", neighbor_search_processor_timer_names_map, enable_accurate_timers) {
    // Throw an exception if the mesh data is null.
    if (mesh_data == nullptr) {
        throw std::runtime_error("Mesh data is null.");
    }
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::Instantiate, "Neighbor Search Processor Instantiation");
    m_bulk_data = mesh_data->GetBulkData();
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

    // Get the node number of neighbors field
    m_node_num_neighbors_field = StkGetField(FieldQueryData<Unsigned>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_node_num_neighbors_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_node_num_neighbors_field);

    // Get the node neighbors field
    m_node_neighbors_field = StkGetField(FieldQueryData<Unsigned>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_node_neighbors_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_node_neighbors_field);

    // Get the node active field
    m_node_active_field = StkGetField(FieldQueryData<Unsigned>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_node_active_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*m_node_active_field);

    // Get the coordinates field
    m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

    // Get the kernel radius field
    m_kernel_radius_field = StkGetField(FieldQueryData<double>{"kernel_radius", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_kernel_radius_field = &stk::mesh::get_updated_ngp_field<double>(*m_kernel_radius_field);

    // Get the max edge length field
    m_max_edge_length_field = StkGetField(FieldQueryData<double>{"max_edge_length", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_max_edge_length_field = &stk::mesh::get_updated_ngp_field<double>(*m_max_edge_length_field);

    // Get the function values field
    m_node_function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_node_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_node_function_values_field);
}

void NeighborSearchProcessor::AddSelfAsNeighbor(const std::vector<std::string> &sets) {
    aperi::Selector selector(sets, m_mesh_data.get());
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    auto ngp_mesh = m_ngp_mesh;
    // Get the ngp fields
    auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
    auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;
    auto ngp_node_function_values_field = *m_ngp_node_function_values_field;

    // Add itself to the neighbors field
    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, selector(),
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get the node entity
            stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
            double starting_num_nodes = ngp_node_num_neighbors_field(node_index, 0);
            KOKKOS_ASSERT(starting_num_nodes < MAX_NODE_NUM_NEIGHBORS);
            ngp_node_num_neighbors_field(node_index, 0) += 1;
            ngp_node_neighbors_field(node_index, (size_t)starting_num_nodes) = (double)node.local_offset();
            ngp_node_function_values_field(node_index, (size_t)starting_num_nodes) = 1.0;
        });
    m_ngp_node_num_neighbors_field->clear_sync_state();
    m_ngp_node_num_neighbors_field->modify_on_device();
    m_ngp_node_neighbors_field->clear_sync_state();
    m_ngp_node_neighbors_field->modify_on_device();
    m_ngp_node_function_values_field->clear_sync_state();
    m_ngp_node_function_values_field->modify_on_device();
}

void NeighborSearchProcessor::AddNeighborsWithinVariableSizedBall(const std::vector<std::string> &sets,
                                                                  const std::vector<double> &kernel_radius_scale_factors) {
    if (kernel_radius_scale_factors.size() != sets.size()) {
        throw std::runtime_error("NeighborSearchProcessor::AddNeighborsWithinVariableSizedBall: kernel_radius_scale_factors must have the same number of elements as sets.");
    }

    std::vector<std::string> active_sets = AppendActiveSuffix(sets);
    for (size_t i = 0; i < sets.size(); ++i) {
        ComputeKernelRadius(active_sets[i], kernel_radius_scale_factors[i]);
    }
    DoBallSearch(sets);
}

void NeighborSearchProcessor::AddNeighborsWithinConstantSizedBall(const std::vector<std::string> &sets,
                                                                  const std::vector<double> &kernel_radii) {
    if (kernel_radii.size() != sets.size()) {
        throw std::runtime_error("NeighborSearchProcessor::AddNeighborsWithinConstantSizedBall: kernel_radii must have the same number of elements as sets.");
    }

    std::vector<std::string> active_sets = AppendActiveSuffix(sets);
    for (size_t i = 0; i < sets.size(); ++i) {
        SetKernelRadius(active_sets[i], kernel_radii[i]);
    }
    DoBallSearch(sets);
}

void NeighborSearchProcessor::SyncFieldsToHost() {
    m_ngp_node_num_neighbors_field->sync_to_host();
    m_ngp_node_function_values_field->sync_to_host();
    m_ngp_kernel_radius_field->clear_sync_state();
    m_ngp_kernel_radius_field->sync_to_host();
}

void NeighborSearchProcessor::CommunicateAllFieldData() const {
    // Should not communicate these fields. The shared nodes need to have a processor local value and not the value of the owning processor.
    // This is because the neighbors field is a local offset and not a global id.
    // Throw an exception if this is called.
    throw std::runtime_error("NeighborSearchProcessor::CommunicateAllFieldData should not be called.");
}

void NeighborSearchProcessor::WriteTimerCSV(const std::string &output_file) {
    m_timer_manager.WriteCSV(output_file);
}

std::shared_ptr<aperi::TimerManager<NeighborSearchProcessorTimerType>> NeighborSearchProcessor::GetTimerManager() {
    return std::make_shared<aperi::TimerManager<NeighborSearchProcessorTimerType>>(m_timer_manager);
}

void NeighborSearchProcessor::SetKernelRadius(const std::string &set, double kernel_radius) {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::ComputeKernelRadius, "Set Kernel Radius");
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    auto ngp_mesh = m_ngp_mesh;
    // Get the ngp fields
    auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;

    // Get the selector for the set
    aperi::Selector selector({set}, m_mesh_data.get());

    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, selector(),
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get the node's coordinates
            ngp_kernel_radius_field(node_index, 0) = kernel_radius;
        });
    ngp_kernel_radius_field.clear_sync_state();
    ngp_kernel_radius_field.modify_on_device();
    ngp_kernel_radius_field.sync_to_host();
}

void NeighborSearchProcessor::ComputeKernelRadius(const std::string &set, double scale_factor) {
    // Add a small number to the scale factor to avoid too much variation in the number of neighbors.
    // If the in/out check can flip one way or the other if a neighbor is right on the edge.
    if (scale_factor < 0.0) {
        throw std::runtime_error("Kernel radius scale factor must be non-negative.");
    }
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::ComputeKernelRadius, "Compute Kernel Radius");
    if (scale_factor == 1.0) {
        scale_factor += 1.0e-6;
    }
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    auto ngp_mesh = m_ngp_mesh;
    // Get the ngp fields
    auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;
    auto ngp_max_edge_length_field = *m_ngp_max_edge_length_field;

    // Get the selector for the set
    aperi::Selector selector({set}, m_mesh_data.get());

    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, selector(),
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get the max edge length
            double max_edge_length = ngp_max_edge_length_field(node_index, 0);
            ngp_kernel_radius_field(node_index, 0) = max_edge_length * scale_factor;
        });
    ngp_kernel_radius_field.clear_sync_state();
    ngp_kernel_radius_field.modify_on_device();
    ngp_kernel_radius_field.sync_to_host();
}

bool NeighborSearchProcessor::NodeIsActive(stk::mesh::Entity node) {
    return stk::mesh::field_data(*m_node_active_field, node)[0] != 0;
}

void NeighborSearchProcessor::GhostNodeNeighbors(const ResultViewType::HostMirror &host_search_results) {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::GhostNodeNeighbors, "Ghost Node Neighbors");
    // Skip if the parallel size is 1 or if there are no search results
    if (m_bulk_data->parallel_size() == 1 || host_search_results.size() == 0) {
        return;
    }
    m_bulk_data->modification_begin();
    stk::mesh::Ghosting &neighbor_ghosting = m_bulk_data->create_ghosting("neighbors");
    std::vector<stk::mesh::EntityProc> nodes_to_ghost;

    const int my_rank = m_bulk_data->parallel_rank();

    for (size_t i = 0; i < host_search_results.size(); ++i) {
        auto result = host_search_results(i);
        if (result.domainIdentProc.proc() != my_rank && result.rangeIdentProc.proc() == my_rank) {
            stk::mesh::Entity node = m_bulk_data->get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id());
            nodes_to_ghost.emplace_back(node, result.domainIdentProc.proc());
        }
    }

    m_bulk_data->change_ghosting(neighbor_ghosting, nodes_to_ghost);
    m_bulk_data->modification_end();
}

void NeighborSearchProcessor::UnpackSearchResultsIntoField(const ResultViewType::HostMirror &host_search_results) {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::UnpackSearchResultsIntoField, "Unpack Search Results Into Field");
    const int my_rank = m_bulk_data->parallel_rank();
    const bool serial = m_bulk_data->parallel_size() <= 1;

    size_t too_many_neighbors_count = 0;

    for (size_t i = 0; i < host_search_results.size(); ++i) {
        auto result = host_search_results(i);
        if (result.domainIdentProc.proc() == my_rank) {
            stk::mesh::Entity node(result.domainIdentProc.id());
            stk::mesh::Entity neighbor = serial ? stk::mesh::Entity(result.rangeIdentProc.id()) : m_bulk_data->get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id());
            KOKKOS_ASSERT(NodeIsActive(neighbor));

            Unsigned &num_neighbors = *stk::mesh::field_data(*m_node_num_neighbors_field, node);
            KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);

            const double *p_neighbor_coordinates = stk::mesh::field_data(*m_coordinates_field, neighbor);
            const double *p_node_coordinates = stk::mesh::field_data(*m_coordinates_field, node);

            // Calculate the squared distance between the node and the neighbor
            double distance_squared = 0.0;
            for (size_t j = 0; j < 3; ++j) {
                const double value = p_neighbor_coordinates[j] - p_node_coordinates[j];
                distance_squared += value * value;
            }

            // Find where to insert the neighbor, based on the distance
            double *p_function_values = stk::mesh::field_data(*m_node_function_values_field, node);
            size_t insert_index = (size_t)num_neighbors;  // Default to the end of the list
            for (size_t j = 0; j < insert_index; ++j) {
                if (distance_squared < p_function_values[j]) {
                    insert_index = j;
                    break;
                }
            }

            // If we're at max neighbors and the new neighbor is further than all existing ones, skip it
            if (num_neighbors == MAX_NODE_NUM_NEIGHBORS && insert_index == MAX_NODE_NUM_NEIGHBORS) {
                continue;  // Skip to the next node in the loop
            }

            // Shift the function values and neighbors to make room for the new neighbor
            size_t reverse_start_index = (size_t)num_neighbors;
            if (reverse_start_index == MAX_NODE_NUM_NEIGHBORS) {
                ++too_many_neighbors_count;
                --reverse_start_index;
            } else {
                num_neighbors += 1;
            }

            Unsigned *p_neighbor_data = stk::mesh::field_data(*m_node_neighbors_field, node);
            for (size_t j = reverse_start_index; j > insert_index; --j) {
                p_function_values[j] = p_function_values[j - 1];
                p_neighbor_data[j] = p_neighbor_data[j - 1];
            }

            // Insert the new neighbor
            p_function_values[insert_index] = distance_squared;
            p_neighbor_data[insert_index] = (double)neighbor.local_offset();
            KOKKOS_ASSERT(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
        }
    }

    // Report the number of extra neighbors
    size_t global_too_many_neighbors_count = 0;
    MPI_Allreduce(&too_many_neighbors_count, &global_too_many_neighbors_count, 1, MPI_UNSIGNED_LONG, MPI_SUM, m_bulk_data->parallel());
    if (global_too_many_neighbors_count > 0) {
        aperi::CoutP0() << "Warning: Found " << global_too_many_neighbors_count << " total extra neighbors. Truncated any neighbor lists that were longer than " << MAX_NODE_NUM_NEIGHBORS << " neighbors. Removed furthest neighbors." << std::endl;
    }

    // Never communicate the neighbors field. The shared nodes need to have a processor local value and not the value of the owning processor.
    m_node_neighbors_field->modify_on_host();
    m_node_num_neighbors_field->modify_on_host();
    m_node_neighbors_field->sync_to_device();
    m_node_num_neighbors_field->sync_to_device();
}

void NeighborSearchProcessor::DoBallSearch(const std::vector<std::string> &sets) {
    aperi::Selector domain_selector = GetDomainSelector(sets, m_mesh_data.get());
    aperi::Selector range_selector = GetRangeSelector(sets, m_mesh_data.get());

    DomainViewType node_points = CreateNodePoints(domain_selector);
    RangeViewType node_spheres = CreateNodeSpheres(range_selector);

    ResultViewType search_results;
    stk::search::SearchMethod search_method = stk::search::MORTON_LBVH;

    stk::ngp::ExecSpace exec_space = Kokkos::DefaultExecutionSpace{};
    const bool results_parallel_symmetry = true;

    {
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::CoarseSearch, "Coarse Search");
        stk::search::coarse_search(node_points, node_spheres, search_method, m_bulk_data->parallel(), search_results, exec_space, results_parallel_symmetry);
    }

    ResultViewType::HostMirror host_search_results = Kokkos::create_mirror_view(search_results);
    {
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::KokkosDeepCopy, "Kokkos DeepCopy");
        Kokkos::deep_copy(host_search_results, search_results);
    }

    GhostNodeNeighbors(host_search_results);

    UnpackSearchResultsIntoField(host_search_results);

    // Check the validity of the neighbors field
    aperi::Selector owned_selector(sets, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    KOKKOS_ASSERT(CheckAllNodesHaveNeighbors(m_mesh_data, owned_selector));
    KOKKOS_ASSERT(CheckAllNeighborsAreWithinKernelRadius(m_mesh_data, owned_selector));
    KOKKOS_ASSERT(CheckNeighborsAreActiveNodes(m_mesh_data, owned_selector));
}

}  // namespace aperi
