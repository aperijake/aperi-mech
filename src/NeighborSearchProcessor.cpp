#include "NeighborSearchProcessor.h"

#include "Index.h"
#include "SearchUtils.h"

namespace aperi {

struct ParallelRunComparator {
    size_t m_rank;

    ParallelRunComparator(size_t my_rank) : m_rank(my_rank) {}

    KOKKOS_INLINE_FUNCTION
    bool operator()(const ResultViewType::value_type &a, const ResultViewType::value_type &b) const {
        if (a.domainIdentProc.proc() != m_rank) {
            return false;  // a is not on this rank, so it should come after b
        }
        if (b.domainIdentProc.proc() != m_rank) {
            return true;  // b is not on this rank, so a should come before b
        }
        // Compare based on the domainIdentProc.id() (which is the node index) and the rangeIdentProc.id().second (which is the distance squared)
        if (a.domainIdentProc.id() != b.domainIdentProc.id()) {
            return a.domainIdentProc.id() < b.domainIdentProc.id();
        }
        if (a.rangeIdentProc.id().second == b.rangeIdentProc.id().second) {
            // If squared distances are equal, compare by the first part of the id (which is the node index)
            return a.rangeIdentProc.id().first < b.rangeIdentProc.id().first;
        }
        return a.rangeIdentProc.id().second < b.rangeIdentProc.id().second;  // Compare squared distances
    }
};

struct SerialRunComparator {
    KOKKOS_INLINE_FUNCTION
    bool operator()(const ResultViewType::value_type &a, const ResultViewType::value_type &b) const {
        // Compare based on the domainIdentProc.id() (which is the node index) and the rangeIdentProc.id().second (which is the distance squared)
        if (a.domainIdentProc.id() != b.domainIdentProc.id()) {
            return a.domainIdentProc.id() < b.domainIdentProc.id();
        }
        if (a.rangeIdentProc.id().second == b.rangeIdentProc.id().second) {
            // If squared distances are equal, compare by the first part of the id (which is the node index)
            return a.rangeIdentProc.id().first < b.rangeIdentProc.id().first;
        }
        return a.rangeIdentProc.id().second < b.rangeIdentProc.id().second;  // Compare squared distances
    }
};

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

NeighborSearchProcessor::NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data)
    : m_mesh_data(mesh_data) {
    // Throw an exception if the mesh data is null.
    if (mesh_data == nullptr) {
        throw std::runtime_error("Mesh data is null.");
    }
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::Instantiate, aperi::neighbor_search_processor_timer_names_map);
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

void NeighborSearchProcessor::SetKernelRadius(const std::string &set, double kernel_radius) {
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::ComputeKernelRadius, aperi::neighbor_search_processor_timer_names_map);
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
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::ComputeKernelRadius, aperi::neighbor_search_processor_timer_names_map);
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

void NeighborSearchProcessor::UnpackSearchResultsIntoField(ResultViewType &search_results, size_t num_domain_nodes) {
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::UnpackSearchResultsIntoField, aperi::neighbor_search_processor_timer_names_map);
    const int my_rank = m_bulk_data->parallel_rank();
    bool serial = (m_bulk_data->parallel_size() == 1);

    // Get aperi fields
    m_aperi_node_neighbors_field = aperi::Field(m_mesh_data, aperi::FieldQueryData<Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    m_aperi_num_neighbors_field = aperi::Field(m_mesh_data, aperi::FieldQueryData<Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    // Get the aperi::NgpMeshData
    auto ngp_mesh_data = m_mesh_data->GetUpdatedNgpMesh();

    Kokkos::View<size_t *> node_index_starts("node_index_starts", num_domain_nodes);
    // Initialize the node index starts to 0
    Kokkos::deep_copy(node_index_starts, 0);
    // Compute the start indices for each node. This is the location where the node index changes in the search results.
    Kokkos::parallel_scan(
        "ComputeNodeIndexStarts", Kokkos::RangePolicy<>(0, search_results.size()),
        KOKKOS_CLASS_LAMBDA(const size_t i, size_t &update, const bool final) {
            auto result = search_results(i);
            if (result.domainIdentProc.proc() != my_rank) {
                return;
            }
            bool is_new = (i == 0) || (result.domainIdentProc.id() != search_results(i - 1).domainIdentProc.id());
            if (final && is_new) {
                node_index_starts(update) = i;
            }
            update += is_new ? 1 : 0;
        });

    Kokkos::View<size_t, Kokkos::DefaultExecutionSpace> too_many_neighbors_count("too_many_neighbors_count", 1);
    Kokkos::deep_copy(too_many_neighbors_count, 0);

    Kokkos::parallel_for(
        "UnpackSearchResultsIntoField", Kokkos::RangePolicy<>(0, node_index_starts.size()), KOKKOS_CLASS_LAMBDA(const size_t i) {
            // Get the start index for this node
            size_t start_index = node_index_starts(i);
            size_t end_index = (i + 1 < node_index_starts.size()) ? node_index_starts(i + 1) : search_results.size();

            // Get the node and neighbor entities and their indices
            stk::mesh::Entity node(search_results(start_index).domainIdentProc.id());
            aperi::Index node_index = ngp_mesh_data.EntityToIndex(node);

            size_t insert_index = 0;
            size_t num_extra_neighbors = 0;

            for (size_t j = start_index; j < end_index; ++j) {
                // Get the search result for this node
                auto result = search_results(j);
                if (result.domainIdentProc.proc() != my_rank || result.rangeIdentProc.id().second == REAL_MAX) {
                    continue;
                }
                KOKKOS_ASSERT(result.domainIdentProc.id() == search_results(start_index).domainIdentProc.id());
                if (insert_index >= MAX_NODE_NUM_NEIGHBORS) {
                    // If the insert index exceeds the maximum number of neighbors, we need to truncate
                    num_extra_neighbors++;
                    continue;
                }

                // The neighbors should be already sorted by distance, so we can insert them directly
                auto identifier = result.rangeIdentProc.id().first;
                if (!serial) {
                    // If we are not in serial mode, we need to convert the global id to a local offset
                    // There is no "get_entity" on device, currently.
                    // TODO(jake): For multi-GPU support, we need to handle the case where the rangeIdentProc.id() is not a local offset.
                    stk::mesh::Entity neighbor = m_bulk_data->get_entity(stk::topology::NODE_RANK, identifier);
                    identifier = neighbor.local_offset();  // Convert the global id to a local offset
                }
                m_aperi_node_neighbors_field(node_index, insert_index) = static_cast<Unsigned>(identifier);
                insert_index++;
            }

            if (num_extra_neighbors > 0) {
                Kokkos::atomic_add(too_many_neighbors_count.data(), num_extra_neighbors);
            }

            // Set the number of neighbors for this node
            m_aperi_num_neighbors_field(node_index, 0) = static_cast<Unsigned>(insert_index);
        });

    // Report the number of extra neighbors
    size_t global_too_many_neighbors_count = 0;
    Kokkos::fence();  // Ensure all operations are complete before reducing
    auto host_too_many_neighbors_count = Kokkos::create_mirror_view(too_many_neighbors_count);
    Kokkos::deep_copy(host_too_many_neighbors_count, too_many_neighbors_count);
    size_t local_too_many_neighbors_count = host_too_many_neighbors_count.data()[0];
    MPI_Allreduce(&local_too_many_neighbors_count, &global_too_many_neighbors_count, 1, MPI_UNSIGNED_LONG, MPI_SUM, m_bulk_data->parallel());
    if (global_too_many_neighbors_count > 0) {
        aperi::CoutP0() << "Warning: Found " << global_too_many_neighbors_count << " total extra neighbors. Truncated any neighbor lists that were longer than " << MAX_NODE_NUM_NEIGHBORS << " neighbors. Removed furthest neighbors." << std::endl;
    }

    // Never communicate the neighbors field. The shared nodes need to have a processor local value and not the value of the owning processor.
    m_aperi_node_neighbors_field.MarkModifiedOnDevice();
    m_aperi_num_neighbors_field.MarkModifiedOnDevice();
}

void NeighborSearchProcessor::CalculateResultsDistances(ResultViewType &search_results) {
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::CalculateResultsDistances, aperi::neighbor_search_processor_timer_names_map);

    const int my_rank = m_bulk_data->parallel_rank();
    const bool serial = m_bulk_data->parallel_size() <= 1;

    // Get aperi fields
    auto coordinates_field = aperi::Field(m_mesh_data, aperi::FieldQueryData<Real>{m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    auto node_active_field = aperi::Field(m_mesh_data, aperi::FieldQueryData<Unsigned>{"active", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    auto ngp_mesh_data = m_mesh_data->GetUpdatedNgpMesh();

    Kokkos::parallel_for(
        "CalculateResultsDistances", Kokkos::RangePolicy<>(0, search_results.size()), KOKKOS_CLASS_LAMBDA(const size_t i) {
            auto &result = search_results(i);
            if (result.domainIdentProc.proc() == my_rank) {
                stk::mesh::Entity node(result.domainIdentProc.id());
                aperi::Index node_index = ngp_mesh_data.EntityToIndex(node);

                // There is no "get_entity" on device, currently.
                // TODO(jake): For multi-GPU support, we need to handle the case where the rangeIdentProc.id() is not a local offset.
                stk::mesh::Entity neighbor = serial ? stk::mesh::Entity(result.rangeIdentProc.id().first) : m_bulk_data->get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id().first);
                aperi::Index neighbor_index = ngp_mesh_data.EntityToIndex(neighbor);

                // Ensure the neighbor is active
                KOKKOS_ASSERT(node_active_field(neighbor_index, 0) != 0);

                Eigen::Matrix<Real, 3, 1> neighbor_coordinates = coordinates_field.GetEigenVectorMap(neighbor_index, 3);
                const Eigen::Matrix<Real, 3, 1> node_coordinates = coordinates_field.GetEigenVectorMap(node_index, 3);

                // Tweak the neighbor_coordinates to avoid numerical issues. Multiply x by 1+1.0e-6, y by 1+1.0e-7, and z by 1+1.0e-8
                neighbor_coordinates(0) *= 1 + 1.0e-6;
                neighbor_coordinates(1) *= 1 + 1.0e-7;
                neighbor_coordinates(2) *= 1 + 1.0e-8;

                const Eigen::Matrix<Real, 3, 1> neighbor_coordinates_diff = neighbor_coordinates - node_coordinates;

                // Calculate the squared distance between the node and the neighbor
                double distance_squared = neighbor_coordinates_diff.squaredNorm();

                // Store the distance in the result
                auto result_range_id = result.rangeIdentProc.id();
                result_range_id.second = distance_squared;
                result.rangeIdentProc.set_id(result_range_id);
            }
        });
}

void NeighborSearchProcessor::SortSearchResults(ResultViewType &search_results) {
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::SortSearchResults, aperi::neighbor_search_processor_timer_names_map);
    if (m_bulk_data->parallel_size() > 1) {
        const int my_rank = m_bulk_data->parallel_rank();
        Kokkos::sort(search_results, ParallelRunComparator(my_rank));
    } else {
        Kokkos::sort(search_results, SerialRunComparator());
    }
}

void NeighborSearchProcessor::DoBallSearch(const std::vector<std::string> &sets) {
    aperi::Selector domain_selector = GetDomainSelector(sets, m_mesh_data.get());
    aperi::Selector range_selector = GetRangeSelector(sets, m_mesh_data.get());

    DomainViewType node_points = CreateNodePoints(domain_selector);
    RangeViewType node_spheres = CreateNodeSpheres(range_selector);
    ResultViewType search_results;

    {
        auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::CoarseSearch, aperi::neighbor_search_processor_timer_names_map);
        stk::search::SearchMethod search_method = stk::search::MORTON_LBVH;
        stk::ngp::ExecSpace exec_space = Kokkos::DefaultExecutionSpace{};
        const bool results_parallel_symmetry = true;
        stk::search::coarse_search(node_points, node_spheres, search_method, m_bulk_data->parallel(), search_results, exec_space, results_parallel_symmetry);
    }

    if (m_bulk_data->parallel_size() > 1) {
        ResultViewType::HostMirror host_search_results = Kokkos::create_mirror_view(search_results);
        {
            auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::KokkosDeepCopy, aperi::neighbor_search_processor_timer_names_map);
            Kokkos::deep_copy(host_search_results, search_results);
        }
        auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::GhostNodeNeighbors, aperi::neighbor_search_processor_timer_names_map);
        aperi::GhostSearchResults(m_mesh_data, host_search_results, stk::topology::NODE_RANK);
    }

    CalculateResultsDistances(search_results);

    SortSearchResults(search_results);

    size_t num_domain_nodes = node_points.size();
    UnpackSearchResultsIntoField(search_results, num_domain_nodes);

    // Check the validity of the neighbors field
    aperi::Selector owned_selector(sets, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    KOKKOS_ASSERT(CheckAllNodesHaveNeighbors(m_mesh_data, owned_selector));
    KOKKOS_ASSERT(CheckAllNeighborsAreWithinKernelRadius(m_mesh_data, owned_selector));
    KOKKOS_ASSERT(CheckNeighborsAreActiveNodes(m_mesh_data, owned_selector));
}

}  // namespace aperi
