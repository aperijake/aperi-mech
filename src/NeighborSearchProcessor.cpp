#include "NeighborSearchProcessor.h"

namespace aperi {

NeighborSearchProcessor::NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data,
                                                 const std::vector<std::string> &sets,
                                                 bool enable_accurate_timers)
    : m_mesh_data(mesh_data),
      m_sets(sets),
      m_timer_manager("Neighbor Search Processor", neighbor_search_processor_timer_names_map, enable_accurate_timers) {
    // Throw an exception if the mesh data is null.
    if (mesh_data == nullptr) {
        throw std::runtime_error("Mesh data is null.");
    }
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::Instantiate, "Neighbor Search Processor Instantiation");
    m_bulk_data = mesh_data->GetBulkData();
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

    // Create the selector for the sets
    m_selector = StkGetSelector(sets, meta_data);
    // Warn if the selector is empty.
    if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
        aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
    }

    // Create the selector for the owned entities
    stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
    m_owned_selector = m_selector & full_owned_selector;

    // Append "_active" to each set name and create a selector for the active entities
    std::vector<std::string> active_sets;
    for (const std::string &set : sets) {
        active_sets.push_back(set + "_active");
    }
    m_active_selector = StkGetSelector(active_sets, meta_data);
    // Warn if the active selector is empty.
    if (m_active_selector.is_empty(stk::topology::NODE_RANK)) {
        aperi::CoutP0() << "Warning: NeighborSearchProcessor active selector is empty." << std::endl;
    }

    // Create the selector for the owned and active entities
    m_owned_and_active_selector = m_owned_selector & m_active_selector;

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

void NeighborSearchProcessor::add_nodes_ring_0_nodes(bool set_first_function_value_to_one) {
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    auto ngp_mesh = m_ngp_mesh;
    // Get the ngp fields
    auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
    auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;
    auto ngp_node_function_values_field = *m_ngp_node_function_values_field;

    // Add itself to the neighbors field
    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, m_selector,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get the node entity
            stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
            double starting_num_nodes = ngp_node_num_neighbors_field(node_index, 0);
            KOKKOS_ASSERT(starting_num_nodes < MAX_NODE_NUM_NEIGHBORS);
            ngp_node_num_neighbors_field(node_index, 0) += 1;
            ngp_node_neighbors_field(node_index, (size_t)starting_num_nodes) = (double)node.local_offset();
            if (set_first_function_value_to_one) {
                ngp_node_function_values_field(node_index, (size_t)starting_num_nodes) = 1.0;
            }
        });
    m_ngp_node_num_neighbors_field->clear_sync_state();
    m_ngp_node_num_neighbors_field->modify_on_device();
    m_ngp_node_neighbors_field->clear_sync_state();
    m_ngp_node_neighbors_field->modify_on_device();
    if (set_first_function_value_to_one) {
        m_ngp_node_function_values_field->clear_sync_state();
        m_ngp_node_function_values_field->modify_on_device();
    }
}

void NeighborSearchProcessor::add_nodes_neighbors_within_variable_ball(const std::vector<std::string> &sets,
                                                                       const std::vector<double> &kernel_radius_scale_factors) {
    // Create the selector for the sets
    stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
    // Append "_active" to each set name and create a selector for the active entities
    std::vector<std::string> active_sets;
    for (const std::string &set : sets) {
        active_sets.push_back(set + "_active");
    }
    stk::mesh::Selector active_selector = StkGetSelector(active_sets, meta_data);
    // Warn if the active selector is empty.
    if (active_selector.is_empty(stk::topology::NODE_RANK)) {
        aperi::CoutP0() << "Warning: NeighborSearchProcessor active selector is empty." << std::endl;
    }

    for (double scale_factor : kernel_radius_scale_factors) {
        ComputeKernelRadius(scale_factor, active_selector);
    }
    DoBallSearch();
}

void NeighborSearchProcessor::PrintNumNeighborsStats() {
    // Node
    aperi::Selector selector(m_owned_selector);
    NeighborStats node_stats = GetNumNeighborStats(m_mesh_data, selector);
    node_stats.Print();
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

size_t NeighborSearchProcessor::GetNumNodes() {
    return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::NODE_RANK));
}

size_t NeighborSearchProcessor::GetNumOwnedNodes() {
    return stk::mesh::count_selected_entities(m_owned_selector, m_bulk_data->buckets(stk::topology::NODE_RANK));
}

size_t NeighborSearchProcessor::GetNumOwnedAndSharedNodes() {
    stk::mesh::Selector shared_selector = m_bulk_data->mesh_meta_data().globally_shared_part();
    stk::mesh::Selector shared_and_owned_selector = shared_selector | m_owned_selector;
    return stk::mesh::count_selected_entities(shared_and_owned_selector, m_bulk_data->buckets(stk::topology::NODE_RANK));
}

void NeighborSearchProcessor::WriteTimerCSV(const std::string &output_file) {
    m_timer_manager.WriteCSV(output_file);
}

std::shared_ptr<aperi::TimerManager<NeighborSearchProcessorTimerType>>
NeighborSearchProcessor::GetTimerManager() {
    return std::make_shared<aperi::TimerManager<NeighborSearchProcessorTimerType>>(m_timer_manager);
}

void NeighborSearchProcessor::add_nodes_neighbors_within_constant_ball(double ball_radius) {
    SetKernelRadius(ball_radius);
    DoBallSearch();
}

void NeighborSearchProcessor::SetKernelRadius(double kernel_radius) {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::ComputeKernelRadius, "Set Kernel Radius");
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    auto ngp_mesh = m_ngp_mesh;
    // Get the ngp fields
    auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;

    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, m_active_selector,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get the node's coordinates
            ngp_kernel_radius_field(node_index, 0) = kernel_radius;
        });
    ngp_kernel_radius_field.clear_sync_state();
    ngp_kernel_radius_field.modify_on_device();
    ngp_kernel_radius_field.sync_to_host();
}

void NeighborSearchProcessor::ComputeKernelRadius(double scale_factor, const stk::mesh::Selector &selector) {
    // Add a small number to the scale factor to avoid too much variation in the number of neighbors.
    // If the in/out check can flip one way or the other if a neighbor is right on the edge.
    if (selector.is_null()) {
        throw std::runtime_error("Selector is null. Cannot compute kernel radius.");
    }
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

    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, selector,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get the max edge length
            double max_edge_length = ngp_max_edge_length_field(node_index, 0);
            ngp_kernel_radius_field(node_index, 0) = max_edge_length * scale_factor;
        });
    ngp_kernel_radius_field.clear_sync_state();
    ngp_kernel_radius_field.modify_on_device();
    ngp_kernel_radius_field.sync_to_host();
}

void NeighborSearchProcessor::UnpackSearchResultsIntoField(const ResultViewType::HostMirror &host_search_results) {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::UnpackSearchResultsIntoField, "Unpack Search Results Into Field");
    const int my_rank = m_bulk_data->parallel_rank();

    size_t too_many_neighbors_count = 0;

    for (size_t i = 0; i < host_search_results.size(); ++i) {
        auto result = host_search_results(i);
        if (result.domainIdentProc.proc() == my_rank) {
            stk::mesh::Entity node = m_bulk_data->get_entity(stk::topology::NODE_RANK, result.domainIdentProc.id());
            stk::mesh::Entity neighbor = m_bulk_data->get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id());
            assert(NodeIsActive(neighbor));
            const double *p_neighbor_coordinates = stk::mesh::field_data(*m_coordinates_field, neighbor);
            const double *p_node_coordinates = stk::mesh::field_data(*m_coordinates_field, node);
            Unsigned *p_neighbor_data = stk::mesh::field_data(*m_node_neighbors_field, node);
            Unsigned &num_neighbors = *stk::mesh::field_data(*m_node_num_neighbors_field, node);
            assert(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);
            double *p_function_values = stk::mesh::field_data(*m_node_function_values_field, node);

            // Calculate the squared distance between the node and the neighbor
            double distance_squared = 0.0;
            for (size_t j = 0; j < 3; ++j) {
                const double value = p_neighbor_coordinates[j] - p_node_coordinates[j];
                distance_squared += value * value;
            }

            // Find where to insert the neighbor, based on the distance
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

void NeighborSearchProcessor::DoBallSearch() {
    DomainViewType node_points = CreateNodePoints();
    RangeViewType node_spheres = CreateNodeSpheres();

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
    KOKKOS_ASSERT(CheckAllNodesHaveNeighbors(m_mesh_data, m_owned_selector));
    KOKKOS_ASSERT(CheckAllNeighborsAreWithinKernelRadius(m_mesh_data, m_owned_selector));
    KOKKOS_ASSERT(CheckNeighborsAreActiveNodes(m_mesh_data, m_owned_selector));
}

bool NeighborSearchProcessor::NodeIsActive(stk::mesh::Entity node) {
    return stk::mesh::field_data(*m_node_active_field, node)[0] != 0;
}

void NeighborSearchProcessor::GhostNodeNeighbors(const ResultViewType::HostMirror &host_search_results) {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::GhostNodeNeighbors, "Ghost Node Neighbors");
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

}  // namespace aperi
