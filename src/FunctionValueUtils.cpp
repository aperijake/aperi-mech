#include "FunctionValueUtils.h"

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

#include "Field.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

void DebugPrintNeighborsField(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector) {
    // Get the bulk data and meta data
    stk::mesh::BulkData *bulk_data = mesh_data->GetBulkData();
    stk::mesh::MetaData *meta_data = &bulk_data->mesh_meta_data();

    UnsignedField *neighbors_field = StkGetField(aperi::FieldQueryData<aperi::Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, meta_data);
    NgpUnsignedField ngp_neighbors_field = stk::mesh::get_updated_ngp_field<aperi::Unsigned>(*neighbors_field);

    UnsignedField *num_neighbors_field = StkGetField(aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, meta_data);
    NgpUnsignedField ngp_num_neighbors_field = stk::mesh::get_updated_ngp_field<aperi::Unsigned>(*num_neighbors_field);

    RealField *coordinates_field = StkGetField(aperi::FieldQueryData<double>{"coordinates", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}, meta_data);
    NgpRealField ngp_coordinates_field = stk::mesh::get_updated_ngp_field<double>(*coordinates_field);

    // Sync the fields to host
    ngp_neighbors_field.sync_to_host();
    ngp_num_neighbors_field.sync_to_host();
    ngp_coordinates_field.sync_to_host();

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);

    // Print the neighbors field for debugging purposes
    std::cout << "Rank " << rank << " Neighbors Field Debug Output:" << std::endl;
    for (stk::mesh::Bucket *bucket : selector().get_buckets(stk::topology::NODE_RANK)) {
        for (size_t i = 0; i < bucket->size(); ++i) {
            stk::mesh::Entity node = (*bucket)[i];
            const aperi::Unsigned *num_neighbors = stk::mesh::field_data(*num_neighbors_field, node);

            const double *coordinates = stk::mesh::field_data(*coordinates_field, node);

            std::cout << rank << " node at coordinates ("
                      << coordinates[0] << ", "
                      << coordinates[1] << ", "
                      << coordinates[2] << ") has " << num_neighbors[0] << " neighbors at coordinates:" << std::endl;
            for (size_t j = 0; j < num_neighbors[0]; ++j) {
                const aperi::Unsigned *neighbors = stk::mesh::field_data(*neighbors_field, node);
                stk::mesh::Entity neighbor(neighbors[j]);
                const double *neighbor_coordinates = stk::mesh::field_data(*coordinates_field, neighbor);
                std::cout << "     "
                          << "("
                          << neighbor_coordinates[0] << ", "
                          << neighbor_coordinates[1] << ", "
                          << neighbor_coordinates[2] << ")" << std::endl;
            }
        }
    }
}

// destination_fields(i) = /sum_{j=0}^{num_neighbors} source_fields(neighbors(i, j)) * function_values(i, j)
bool CheckPartitionOfUnity(std::shared_ptr<aperi::MeshData> mesh_data, const aperi::Selector &selector, double warning_threshold, double error_threshold) {
    // Grab the fields from mesh_data
    aperi::Field<aperi::Unsigned> num_neighbors_field(mesh_data,
                                                      aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    aperi::Field<aperi::Unsigned> neighbors_field(mesh_data,
                                                  aperi::FieldQueryData<aperi::Unsigned>{"neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
    aperi::Field<aperi::Real> function_values_field(mesh_data,
                                                    aperi::FieldQueryData<aperi::Real>{"function_values", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

    // Use a device-compatible flag for error detection
    Kokkos::View<int> error_flag("partition_of_unity_error_flag");
    Kokkos::deep_copy(error_flag, 0);

    aperi::ForEachNode(
        KOKKOS_LAMBDA(const aperi::Index &idx) {
            size_t num_neighbors = num_neighbors_field(idx, 0);
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
                    Real function_value = function_values_field(idx, k);
                    aperi::Unsigned neighbor = neighbors_field(idx, k);
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

}  // namespace aperi