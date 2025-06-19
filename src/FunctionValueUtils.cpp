#include "FunctionValueUtils.h"

#include <mpi.h>

#include <Kokkos_Core.hpp>
#include <iostream>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>

#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "LogUtils.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

void DebugPrintNeighborsField(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector) {
    Kokkos::fence();

    // Grab the fields from mesh_data
    UnsignedField *num_neighbors_field = StkGetField(FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, mesh_data->GetMetaData());
    UnsignedField *neighbors_field = StkGetField(FieldQueryData<aperi::Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, mesh_data->GetMetaData());
    RealField *coordinates_field = StkGetField(FieldQueryData<aperi::Real>{mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, mesh_data->GetMetaData());

    // Get the NGP fields
    auto ngp_neighbors_field = stk::mesh::get_updated_ngp_field<aperi::Unsigned>(*neighbors_field);
    auto ngp_num_neighbors_field = stk::mesh::get_updated_ngp_field<aperi::Unsigned>(*num_neighbors_field);
    auto ngp_coordinates_field = stk::mesh::get_updated_ngp_field<aperi::Real>(*coordinates_field);

    // Sync the fields to host
    ngp_neighbors_field.sync_to_host();
    ngp_num_neighbors_field.sync_to_host();
    ngp_coordinates_field.sync_to_host();

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    // Print the neighbors field for debugging purposes
    std::ostringstream oss;
    oss << "Neighbors Field Debug Output:" << std::endl;
    for (stk::mesh::Bucket *bucket : selector().get_buckets(stk::topology::NODE_RANK)) {
        for (size_t i = 0; i < bucket->size(); ++i) {
            stk::mesh::Entity node = (*bucket)[i];
            const aperi::Unsigned *num_neighbors = stk::mesh::field_data(*num_neighbors_field, node);
            const double *coordinates = stk::mesh::field_data(*coordinates_field, node);

            oss << rank << " node at coordinates ("
                << coordinates[0] << ", "
                << coordinates[1] << ", "
                << coordinates[2] << ") has " << num_neighbors[0] << " neighbors at coordinates:" << std::endl;
            for (size_t j = 0; j < num_neighbors[0]; ++j) {
                const aperi::Unsigned *neighbors = stk::mesh::field_data(*neighbors_field, node);
                stk::mesh::Entity neighbor(neighbors[j]);
                const double *neighbor_coordinates = stk::mesh::field_data(*coordinates_field, neighbor);
                // Compute the distance to the neighbor
                double distance = std::sqrt(std::pow(coordinates[0] - neighbor_coordinates[0], 2) +
                                            std::pow(coordinates[1] - neighbor_coordinates[1], 2) +
                                            std::pow(coordinates[2] - neighbor_coordinates[2], 2));
                oss << "     "
                    << "("
                    << neighbor_coordinates[0] << ", "
                    << neighbor_coordinates[1] << ", "
                    << neighbor_coordinates[2] << "). Distance: " << distance << std::endl;
            }
        }
    }
    aperi::Cout() << oss.str() << std::endl;
}

bool CheckPartitionOfUnity(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, double warning_threshold, double error_threshold) {
    Kokkos::fence();
    // Grab the fields from mesh_data
    const aperi::Field<aperi::Unsigned> num_neighbors_field(mesh_data,
                                                            aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    const aperi::Field<aperi::Unsigned> neighbors_field(mesh_data,
                                                        aperi::FieldQueryData<aperi::Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    const aperi::Field<aperi::Real> function_values_field(mesh_data,
                                                          aperi::FieldQueryData<aperi::Real>{"function_values", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    // Use a device-compatible flag for error detection
    Kokkos::View<int> error_flag("partition_of_unity_error_flag");
    Kokkos::deep_copy(error_flag, 0);

    aperi::ForEachNode(
        KOKKOS_LAMBDA(const aperi::Index &idx) {
            const size_t num_neighbors = num_neighbors_field(idx, 0);
            if (num_neighbors == 0) {
                return;
            }
            Real function_sum = 0.0;
            // Reverse order to match compute_value_from_generalized_field
            for (size_t k = num_neighbors; k-- > 0;) {
                function_sum += function_values_field(idx, k);
            }
            if (Kokkos::abs(function_sum - 1.0) > warning_threshold) {
                Kokkos::printf("Error: Partition of unity not satisfied at node. Error (1 - sum) = : %.8e\n", 1.0 - function_sum);
                for (size_t k = num_neighbors; k-- > 0;) {
                    const Real function_value = function_values_field(idx, k);
                    const aperi::Unsigned neighbor = neighbors_field(idx, k);
                    Kokkos::printf("Neighbor: %llu, Function Value: %.8e\n", (unsigned long long)neighbor, function_value);
                }
                if (Kokkos::abs(function_sum - 1.0) > error_threshold) {
                    // Set error flag
                    error_flag() = 1;
                }
            }
        },
        *mesh_data, selector);

    // Copy error flag back to host
    int host_error_flag = 0;
    Kokkos::deep_copy(host_error_flag, error_flag);

    return host_error_flag == 0;
}

bool CheckAllNodesHaveNeighbors(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, bool print_failures) {
    Kokkos::fence();
    const aperi::Field<aperi::Unsigned> num_neighbors_field(mesh_data,
                                                            aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    Kokkos::View<int> all_nodes_have_neighbors("all_nodes_have_neighbors");
    Kokkos::deep_copy(all_nodes_have_neighbors, 1);

    aperi::ForEachNode(
        KOKKOS_LAMBDA(const aperi::Index &idx) {
            const aperi::Unsigned num_neighbors = num_neighbors_field(idx, 0);
            if (num_neighbors == 0) {
                if (print_failures) {
                    Kokkos::printf("FAIL: Node (%llu, %llu) has no neighbors.\n",
                                   (unsigned long long)idx.bucket_id(),
                                   (unsigned long long)idx.bucket_ord());
                }
                Kokkos::atomic_exchange(&all_nodes_have_neighbors(), 0);
            }
        },
        *mesh_data, selector);
    int host_all_nodes_have_neighbors = 1;
    Kokkos::deep_copy(host_all_nodes_have_neighbors, all_nodes_have_neighbors);
    int global_all_nodes_have_neighbors = host_all_nodes_have_neighbors;
    MPI_Allreduce(MPI_IN_PLACE, &global_all_nodes_have_neighbors, 1, MPI_INT, MPI_MIN, MPI_COMM_WORLD);

    return global_all_nodes_have_neighbors;
}

bool CheckNeighborsAreActiveNodes(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, bool print_failures) {
    Kokkos::fence();
    const aperi::Field<aperi::Unsigned> num_neighbors_field(mesh_data,
                                                            aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    const aperi::Field<aperi::Unsigned> neighbors_field(mesh_data,
                                                        aperi::FieldQueryData<aperi::Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    const aperi::Field<aperi::Unsigned> active_field(mesh_data,
                                                     aperi::FieldQueryData<aperi::Unsigned>{"active", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    Kokkos::View<int> all_neighbors_active("all_neighbors_active");
    Kokkos::deep_copy(all_neighbors_active, 1);

    aperi::NgpMeshData ngp_mesh_data = mesh_data->GetUpdatedNgpMesh();

    aperi::ForEachNode(
        KOKKOS_LAMBDA(const aperi::Index &idx) {
            const aperi::Unsigned num_neighbors = num_neighbors_field(idx, 0);
            for (size_t i = 0; i < num_neighbors; ++i) {
                const aperi::Unsigned neighbor_local_offset = neighbors_field(idx, i);
                const aperi::Index neighbor_idx = ngp_mesh_data.LocalOffsetToIndex(neighbor_local_offset);
                const aperi::Unsigned neighbor_active = active_field(neighbor_idx, 0);
                if (neighbor_active == 0) {
                    Kokkos::atomic_exchange(&all_neighbors_active(), 0);
                    if (print_failures) {
                        Kokkos::printf("FAIL: Node (%llu, %llu) has inactive neighbor %llu.\n",
                                       (unsigned long long)idx.bucket_id(),
                                       (unsigned long long)idx.bucket_ord(),
                                       (unsigned long long)neighbor_local_offset);
                    }
                }
            }
        },
        *mesh_data, selector);

    int host_all_neighbors_active = 1;
    Kokkos::deep_copy(host_all_neighbors_active, all_neighbors_active);

    int global_all_neighbors_active = host_all_neighbors_active;
    MPI_Allreduce(MPI_IN_PLACE, &global_all_neighbors_active, 1, MPI_INT, MPI_MIN, MPI_COMM_WORLD);

    return global_all_neighbors_active;
}

bool CheckAllNeighborsAreWithinKernelRadius(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, bool print_failures) {
    Kokkos::fence();
    const aperi::Field<aperi::Real> kernel_radius_field(mesh_data,
                                                        aperi::FieldQueryData<aperi::Real>{"kernel_radius", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    const aperi::Field<aperi::Real> coordinates_field(mesh_data,
                                                      aperi::FieldQueryData<aperi::Real>{mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    const aperi::Field<aperi::Unsigned> num_neighbors_field(mesh_data,
                                                            aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    const aperi::Field<aperi::Unsigned> neighbors_field(mesh_data,
                                                        aperi::FieldQueryData<aperi::Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    aperi::NgpMeshData ngp_mesh_data = mesh_data->GetUpdatedNgpMesh();

    Kokkos::View<int> all_neighbors_within_kernel("all_neighbors_within_kernel");
    Kokkos::deep_copy(all_neighbors_within_kernel, 1);

    aperi::ForEachNode(
        KOKKOS_LAMBDA(const aperi::Index &idx) {
            const aperi::Real kernel_radius = kernel_radius_field(idx, 0);
            const aperi::Unsigned num_neighbors = num_neighbors_field(idx, 0);
            aperi::Real coords[3] = {coordinates_field(idx, 0), coordinates_field(idx, 1), coordinates_field(idx, 2)};
            for (size_t i = 0; i < num_neighbors; ++i) {
                const aperi::Unsigned neighbor_local_offset = neighbors_field(idx, i);
                const aperi::Index neighbor_idx = ngp_mesh_data.LocalOffsetToIndex(neighbor_local_offset);
                aperi::Real neighbor_coords[3] = {coordinates_field(neighbor_idx, 0), coordinates_field(neighbor_idx, 1), coordinates_field(neighbor_idx, 2)};
                const aperi::Real neighbor_kernel_radius = kernel_radius_field(neighbor_idx, 0);
                aperi::Real distance = 0.0;
                for (size_t j = 0; j < 3; ++j) {
                    const aperi::Real diff = coords[j] - neighbor_coords[j];
                    distance += diff * diff;
                }
                distance = Kokkos::sqrt(distance);
                if (distance > neighbor_kernel_radius) {
                    if (print_failures) {
                        Kokkos::printf("--------------------\n");
                        Kokkos::printf("Node coordinates: %f %f %f\n", coords[0], coords[1], coords[2]);
                        Kokkos::printf("Neighbor coordinates: %f %f %f\n", neighbor_coords[0], neighbor_coords[1], neighbor_coords[2]);
                        Kokkos::printf("Distance: %f\n", distance);
                        Kokkos::printf("Kernel radius: %f\n", kernel_radius);
                        Kokkos::printf("Neighbor Kernel radius: %f\n", neighbor_kernel_radius);
                        Kokkos::printf("FAIL: Node (%llu, %llu) has a neighbor %llu that is outside the neighbor kernel radius.\n",
                                       (unsigned long long)idx.bucket_id(),
                                       (unsigned long long)idx.bucket_ord(),
                                       (unsigned long long)neighbor_local_offset);
                    }
                    Kokkos::atomic_exchange(&all_neighbors_within_kernel(), 0);
                }
            }
        },
        *mesh_data, selector);

    int host_all_neighbors_within_kernel = 1;
    Kokkos::deep_copy(host_all_neighbors_within_kernel, all_neighbors_within_kernel);
    int global_all_neighbors_within_kernel = host_all_neighbors_within_kernel;
    MPI_Allreduce(MPI_IN_PLACE, &global_all_neighbors_within_kernel, 1, MPI_INT, MPI_MIN, MPI_COMM_WORLD);

    return global_all_neighbors_within_kernel;
}

NeighborStats GetNumNeighborStats(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector) {
    Kokkos::fence();

    double max_num_neighbors = 0;
    double min_num_neighbors = std::numeric_limits<double>::max();
    double total_num_neighbors = 0;
    double num_entities = 0;
    int reserved_memory = 0;

    // Get the field and reserved memory size
    const aperi::Field<aperi::Unsigned> num_neighbors_field(mesh_data,
                                                            aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    reserved_memory = aperi::MAX_NODE_NUM_NEIGHBORS;

    // Count the number of entities
    num_entities = stk::mesh::count_selected_entities(selector(), mesh_data->GetBulkData()->buckets(stk::topology::NODE_RANK));

    // Get local entity indices for parallel access
    auto entity_indices = aperi::GetLocalEntityIndices(stk::topology::NODE_RANK, selector(), mesh_data->GetBulkData());

    // Use Kokkos::parallel_reduce to calculate the min, max, and sum in parallel
    Kokkos::parallel_reduce(
        num_entities,
        KOKKOS_LAMBDA(const int i, double &max_val, double &min_val, double &sum_val) {
            aperi::Index idx = entity_indices(i);
            double num_neighbors = num_neighbors_field(idx, 0);
            if (num_neighbors > max_val) max_val = num_neighbors;
            if (num_neighbors < min_val) min_val = num_neighbors;
            sum_val += num_neighbors;
        },
        Kokkos::Max<double>(max_num_neighbors),
        Kokkos::Min<double>(min_num_neighbors),
        Kokkos::Sum<double>(total_num_neighbors));

    // Use MPI_Allreduce to calculate the min, max, and sum across all MPI ranks
    MPI_Allreduce(MPI_IN_PLACE, &max_num_neighbors, 1, MPI_DOUBLE, MPI_MAX, MPI_COMM_WORLD);
    MPI_Allreduce(MPI_IN_PLACE, &min_num_neighbors, 1, MPI_DOUBLE, MPI_MIN, MPI_COMM_WORLD);
    MPI_Allreduce(MPI_IN_PLACE, &total_num_neighbors, 1, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(MPI_IN_PLACE, &num_entities, 1, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

    NeighborStats stats;
    stats.max_num_neighbors = max_num_neighbors;
    stats.min_num_neighbors = min_num_neighbors;
    stats.avg_num_neighbors = (num_entities > 0) ? (total_num_neighbors / num_entities) : 0.0;
    stats.num_entities = num_entities;
    stats.reserved_memory_utilization = (num_entities > 0 && reserved_memory > 0)
                                            ? (total_num_neighbors / (num_entities * reserved_memory)) * 100.0
                                            : 0.0;
    return stats;
}

}  // namespace aperi
