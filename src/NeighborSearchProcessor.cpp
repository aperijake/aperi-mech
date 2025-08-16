#include "NeighborSearchProcessor.h"

#include <Kokkos_Core.hpp>

#include "Index.h"
#include "NeighborSelectorFunctor.h"

namespace aperi {

struct ParallelRunComparator {
    const int m_rank;

    ParallelRunComparator(int my_rank) : m_rank(my_rank) {}

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

}  // namespace aperi
