#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <chrono>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/FieldParallel.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_search/BoxIdent.hpp>
#include <stk_search/CoarseSearch.hpp>
#include <stk_search/IdentProc.hpp>
#include <stk_search/Point.hpp>
#include <stk_search/SearchMethod.hpp>
#include <stk_search/Sphere.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/ngp/NgpSpaces.hpp>

#include "AperiStkUtils.h"
#include "Field.h"
#include "FieldData.h"
#include "FunctionValueUtils.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "SearchUtils.h"
#include "Selector.h"
#include "SimpleTimerFactory.h"
#include "Timer.h"
#include "TimerTypes.h"
#include "Types.h"

namespace aperi {

class NeighborSearchProcessor {
   public:
    NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data);

    void AddSelfAsNeighbor(const std::vector<std::string> &sets);

    template <typename Functor>
    void AddNeighborsWithinVariableSizedBall(const std::vector<std::string> &sets,
                                             const std::vector<double> &kernel_radius_scale_factors,
                                             Functor functor);

    template <typename Functor>
    void AddNeighborsWithinConstantSizedBall(const std::vector<std::string> &sets,
                                             const std::vector<double> &kernel_radii,
                                             Functor functor);

    void SyncFieldsToHost();
    void CommunicateAllFieldData() const;

    void SetKernelRadius(const std::string &set_name, double kernel_radius);
    void ComputeKernelRadius(const std::string &set_name, double scale_factor);
    void CalculateResultsDistances(ResultViewType &search_results);
    void SortSearchResults(ResultViewType &search_results);

    DomainViewType CreateNodePoints(const aperi::Selector &selector);
    RangeViewType CreateNodeSpheres(const aperi::Selector &selector);

   private:
    template <typename Functor>
    void DoBallSearch(const std::vector<std::string> &sets, Functor functor);

    template <typename Functor>
    void UnpackSearchResultsIntoField(ResultViewType &search_results, size_t num_domain_nodes, Functor functor);

    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.

    stk::mesh::BulkData *m_bulk_data;                  // The bulk data object.
    stk::mesh::Selector m_selector;                    // The selector
    stk::mesh::Selector m_active_selector;             // The active selector
    stk::mesh::Selector m_owned_selector;              // The local selector
    stk::mesh::Selector m_owned_and_active_selector;   // The local and active selector
    stk::mesh::NgpMesh m_ngp_mesh;                     // The ngp mesh object.
    RealField *m_coordinates_field;                    // The coordinates field
    UnsignedField *m_node_num_neighbors_field;         // The number of neighbors field
    UnsignedField *m_node_neighbors_field;             // The neighbors field
    UnsignedField *m_node_active_field;                // The active field
    RealField *m_kernel_radius_field;                  // The kernel radius field
    RealField *m_max_edge_length_field;                // The max edge length field
    RealField *m_node_function_values_field;           // The function values field
    NgpRealField *m_ngp_coordinates_field;             // The ngp coordinates field
    NgpUnsignedField *m_ngp_node_num_neighbors_field;  // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_node_neighbors_field;      // The ngp neighbors field
    NgpUnsignedField *m_ngp_node_active_field;         // The ngp active field
    NgpRealField *m_ngp_kernel_radius_field;           // The ngp kernel radius field
    NgpRealField *m_ngp_max_edge_length_field;         // The ngp max edge length field
    NgpRealField *m_ngp_node_function_values_field;    // The ngp function values field
};

inline DomainViewType NeighborSearchProcessor::CreateNodePoints(const aperi::Selector &selector) {
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::CreateNodePoints, aperi::neighbor_search_processor_timer_names_map);

    const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, selector());
    DomainViewType node_points("node_points", num_local_nodes);

    auto ngp_coordinates_field = *m_ngp_coordinates_field;
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;

    const int my_rank = m_bulk_data->parallel_rank();

    // Create atomic counter for indexing into the result array
    Kokkos::View<unsigned, ExecSpace> counter("counter");
    Kokkos::deep_copy(counter, 0);

    // Directly iterate over entities using for_each_entity_run
    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, selector(),
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get current index atomically
            const unsigned i = Kokkos::atomic_fetch_add(&counter(), 1u);

            stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_index);
            stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
            node_points(i) = PointIdentProc{stk::search::Point<double>(coords[0], coords[1], coords[2]), NodeIdentProc(node.local_offset(), my_rank)};
        });

    return node_points;
}

inline RangeViewType NeighborSearchProcessor::CreateNodeSpheres(const aperi::Selector &selector) {
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::CreateNodeSpheres, aperi::neighbor_search_processor_timer_names_map);
    const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, selector());
    RangeViewType node_spheres("node_spheres", num_local_nodes);

    auto ngp_coordinates_field = *m_ngp_coordinates_field;
    auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;

    // Get my rank
    const int my_rank = m_bulk_data->parallel_rank();

    // Get the parallel size
    const bool serial = m_bulk_data->parallel_size() <= 1;

    // Create atomic counter for indexing into the result array
    Kokkos::View<unsigned, ExecSpace> counter("counter");
    Kokkos::deep_copy(counter, 0);

    // Directly iterate over entities using for_each_entity_run
    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, selector(),
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get current index atomically
            const unsigned i = Kokkos::atomic_fetch_add(&counter(), 1u);

            stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_index);
            stk::search::Point<double> center(coords[0], coords[1], coords[2]);
            stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
            double radius = ngp_kernel_radius_field(node_index, 0);
            node_spheres(i) = serial ? SphereIdentProc{stk::search::Sphere<double>(center, radius), NodeAndDistanceIdentProc({node.local_offset(), REAL_MAX}, my_rank)}
                                     : SphereIdentProc{stk::search::Sphere<double>(center, radius), NodeAndDistanceIdentProc({ngp_mesh.identifier(node), REAL_MAX}, my_rank)};
        });

    return node_spheres;
}

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

template <typename Functor>
void NeighborSearchProcessor::AddNeighborsWithinVariableSizedBall(const std::vector<std::string> &sets,
                                                                  const std::vector<double> &kernel_radius_scale_factors,
                                                                  Functor functor) {
    if (kernel_radius_scale_factors.size() != sets.size()) {
        throw std::runtime_error("NeighborSearchProcessor::AddNeighborsWithinVariableSizedBall: kernel_radius_scale_factors must have the same number of elements as sets.");
    }
    std::vector<std::string> active_sets = AppendActiveSuffix(sets);
    for (size_t i = 0; i < sets.size(); ++i) {
        ComputeKernelRadius(active_sets[i], kernel_radius_scale_factors[i]);
    }
    DoBallSearch(sets, functor);
}

template <typename Functor>
void NeighborSearchProcessor::AddNeighborsWithinConstantSizedBall(const std::vector<std::string> &sets,
                                                                  const std::vector<double> &kernel_radii,
                                                                  Functor functor) {
    if (kernel_radii.size() != sets.size()) {
        throw std::runtime_error("NeighborSearchProcessor::AddNeighborsWithinConstantSizedBall: kernel_radii must have the same number of elements as sets.");
    }
    std::vector<std::string> active_sets = AppendActiveSuffix(sets);
    for (size_t i = 0; i < sets.size(); ++i) {
        SetKernelRadius(active_sets[i], kernel_radii[i]);
    }
    DoBallSearch(sets, functor);
}

template <typename Functor>
void NeighborSearchProcessor::DoBallSearch(const std::vector<std::string> &sets, Functor functor) {
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

    UnpackSearchResultsIntoField(search_results, num_domain_nodes, functor);

    // Check the validity of the neighbors field
    aperi::Selector owned_selector(sets, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    KOKKOS_ASSERT(CheckAllNodesHaveNeighbors(m_mesh_data, owned_selector));
    KOKKOS_ASSERT(CheckAllNeighborsAreWithinKernelRadius(m_mesh_data, owned_selector));
    KOKKOS_ASSERT(CheckNeighborsAreActiveNodes(m_mesh_data, owned_selector));
}

template <typename Functor>
void NeighborSearchProcessor::UnpackSearchResultsIntoField(ResultViewType &search_results, size_t num_domain_nodes, Functor functor) {
    auto simple_timer = aperi::SimpleTimerFactory::Create(NeighborSearchProcessorTimerType::UnpackSearchResultsIntoField, aperi::neighbor_search_processor_timer_names_map);
    const int my_rank = m_bulk_data->parallel_rank();

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
            size_t start_index = node_index_starts(i);
            size_t end_index = (i + 1 < node_index_starts.size()) ? node_index_starts(i + 1) : search_results.size();

            // Create a subview for this node's results
            auto node_results = Kokkos::subview(search_results, Kokkos::pair<size_t, size_t>(start_index, end_index));

            // Call the user-provided functor
            functor(node_results, too_many_neighbors_count);
        });
    functor.Finish();

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
}

}  // namespace aperi
