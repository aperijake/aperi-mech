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
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "Timer.h"
#include "TimerTypes.h"
#include "Types.h"

namespace aperi {

class NeighborSearchProcessor {
   public:
    NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data,
                            const std::vector<std::string> &sets,
                            bool enable_accurate_timers);

    std::vector<std::string> GetPartNames() const;
    void PopulateDebugFields();
    bool CheckAllNeighborsAreWithinKernelRadius();
    bool CheckNeighborsAreActiveNodes(bool print_failures = true);
    void SetKernelRadius(double kernel_radius);
    void ComputeKernelRadius(double scale_factor, const stk::mesh::Selector &selector);
    bool NodeIsActive(stk::mesh::Entity node);
    void GhostNodeNeighbors(const ResultViewType::HostMirror &host_search_results);
    void UnpackSearchResultsIntoField(const ResultViewType::HostMirror &host_search_results);
    void add_nodes_ring_0_nodes(bool set_first_function_value_to_one = false);
    void DoBallSearch(bool populate_debug_fields = false);
    void add_nodes_neighbors_within_variable_ball(const std::vector<std::string> &sets,
                                                  const std::vector<double> &kernel_radius_scale_factors,
                                                  bool populate_debug_fields = false);
    void add_nodes_neighbors_within_constant_ball(double ball_radius, bool populate_debug_fields = false);
    std::map<std::string, double> GetNumNeighborStats();
    void PrintNumNeighborsStats();
    void SyncFieldsToHost();
    void CommunicateAllFieldData() const;
    double GetNumElements();
    double GetNumOwnedElements();
    double GetNumNodes();
    double GetNumOwnedNodes();
    double GetNumOwnedAndSharedNodes();
    void WriteTimerCSV(const std::string &output_file);
    std::shared_ptr<aperi::TimerManager<NeighborSearchProcessorTimerType>> GetTimerManager();

    // Device-related methods that must stay in header
    DomainViewType CreateNodePoints();
    RangeViewType CreateNodeSpheres();

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                           // The mesh data object.
    std::vector<std::string> m_sets;                                        // The sets to process.
    aperi::TimerManager<NeighborSearchProcessorTimerType> m_timer_manager;  // The timer manager.

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

inline DomainViewType NeighborSearchProcessor::CreateNodePoints() {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::CreateNodePoints, "Create Node Points");
    const stk::mesh::MetaData &meta = m_bulk_data->mesh_meta_data();
    const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, m_owned_selector | meta.globally_shared_part());
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
        ngp_mesh, stk::topology::NODE_RANK, m_owned_selector | meta.globally_shared_part(),
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get current index atomically
            const unsigned i = Kokkos::atomic_fetch_add(&counter(), 1u);

            stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_index);
            stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
            node_points(i) = PointIdentProc{stk::search::Point<double>(coords[0], coords[1], coords[2]), NodeIdentProc(ngp_mesh.identifier(node), my_rank)};
        });

    return node_points;
}

inline RangeViewType NeighborSearchProcessor::CreateNodeSpheres() {
    auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(NeighborSearchProcessorTimerType::CreateNodeSpheres, "Create Node Spheres");
    const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, m_owned_and_active_selector);
    RangeViewType node_spheres("node_spheres", num_local_nodes);

    auto ngp_coordinates_field = *m_ngp_coordinates_field;
    auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;

    const int my_rank = m_bulk_data->parallel_rank();

    // Create atomic counter for indexing into the result array
    Kokkos::View<unsigned, ExecSpace> counter("counter");
    Kokkos::deep_copy(counter, 0);

    // Directly iterate over entities using for_each_entity_run
    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, m_owned_and_active_selector,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            // Get current index atomically
            const unsigned i = Kokkos::atomic_fetch_add(&counter(), 1u);

            stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_index);
            stk::search::Point<double> center(coords[0], coords[1], coords[2]);
            stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
            double radius = ngp_kernel_radius_field(node_index, 0);
            node_spheres(i) = SphereIdentProc{stk::search::Sphere<double>(center, radius), NodeIdentProc(ngp_mesh.identifier(node), my_rank)};
        });

    return node_spheres;
}

// Check that all neighbors are active nodes.
inline bool NeighborSearchProcessor::CheckNeighborsAreActiveNodes(bool print_failures) {
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    auto ngp_mesh = m_ngp_mesh;
    auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
    auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;
    auto ngp_node_active_field = *m_ngp_node_active_field;

    // Use Kokkos reductions for the checks
    Kokkos::View<int, ExecSpace> all_neighbors_active("all_neighbors_active");
    Kokkos::View<int, ExecSpace> all_nodes_have_neighbors("all_nodes_have_neighbors");
    Kokkos::deep_copy(all_neighbors_active, 1);
    Kokkos::deep_copy(all_nodes_have_neighbors, 1);

    stk::mesh::for_each_entity_run(
        ngp_mesh, stk::topology::NODE_RANK, m_owned_selector,
        KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
            Unsigned num_neighbors = ngp_node_num_neighbors_field(node_index, 0);
            if (num_neighbors == 0) {
                Kokkos::atomic_exchange(&all_nodes_have_neighbors(), 0);
            }
            for (size_t i = 0; i < num_neighbors; ++i) {
                stk::mesh::Entity neighbor(ngp_node_neighbors_field(node_index, i));
                stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(neighbor);
                Unsigned neighbor_active = ngp_node_active_field(neighbor_index, 0);
                if (neighbor_active == 0) {
                    Kokkos::atomic_exchange(&all_neighbors_active(), 0);
                    if (print_failures) {
                        // Optionally print, but Kokkos::printf is device-wide and may be noisy
                        Kokkos::printf("FAIL: Node %llu has a neighbor %llu that is not active.\n",
                                       static_cast<unsigned long long>(ngp_mesh.identifier(ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index))),
                                       static_cast<unsigned long long>(ngp_mesh.identifier(neighbor)));
                    }
                }
            }
        });

    int host_all_neighbors_active = 1;
    int host_all_nodes_have_neighbors = 1;
    Kokkos::deep_copy(host_all_neighbors_active, all_neighbors_active);
    Kokkos::deep_copy(host_all_nodes_have_neighbors, all_nodes_have_neighbors);

    int global_all_neighbors_active = host_all_neighbors_active;
    int global_all_nodes_have_neighbors = host_all_nodes_have_neighbors;
    MPI_Allreduce(MPI_IN_PLACE, &global_all_neighbors_active, 1, MPI_INT, MPI_MIN, m_bulk_data->parallel());
    MPI_Allreduce(MPI_IN_PLACE, &global_all_nodes_have_neighbors, 1, MPI_INT, MPI_MIN, m_bulk_data->parallel());

    return global_all_neighbors_active && global_all_nodes_have_neighbors;
}

}  // namespace aperi
