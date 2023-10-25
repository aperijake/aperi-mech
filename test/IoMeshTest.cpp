#include <gtest/gtest.h>

#include <filesystem>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_topology/topology.hpp>
#include <string>
#include <system_error>

#include "IoMesh.h"

void CleanUp(const std::filesystem::path& filePath) {
    if (std::filesystem::exists(filePath)) {
        std::error_code ec;  // For error handling
        std::filesystem::remove(filePath, ec);
        EXPECT_FALSE(ec);
    }
}

void CheckCounts(const stk::mesh::BulkData& bulk, const std::vector<size_t>& expected_owned) {
    constexpr unsigned k_num_ranks = static_cast<unsigned>(stk::topology::ELEM_RANK + 1);
    std::vector<size_t> global_counts(k_num_ranks, 0);
    std::vector<size_t> min_global_counts(k_num_ranks, 0);
    std::vector<size_t> max_global_counts(k_num_ranks, 0);
    std::vector<size_t> aura_global_counts(k_num_ranks, 0);
    std::vector<size_t> shared_not_owned_counts(k_num_ranks, 0);
    stk::mesh::comm_mesh_counts(bulk, global_counts, min_global_counts, max_global_counts);
    stk::mesh::Selector shared_not_owned = bulk.mesh_meta_data().globally_shared_part() & !bulk.mesh_meta_data().locally_owned_part();
    stk::mesh::count_entities(shared_not_owned, bulk, shared_not_owned_counts);
    stk::all_reduce(MPI_COMM_WORLD, stk::ReduceSum<k_num_ranks>(shared_not_owned_counts.data()));
    stk::mesh::Selector aura = bulk.mesh_meta_data().aura_part();
    stk::mesh::count_entities(aura, bulk, aura_global_counts);
    stk::all_reduce(MPI_COMM_WORLD, stk::ReduceSum<k_num_ranks>(aura_global_counts.data()));

    // TODO(jake): test in parallel and add in checks for shared-not-owned and aura
    EXPECT_EQ(global_counts.size(), 4);
    EXPECT_EQ(expected_owned.size(), 4);
    for (int i = 0, e = expected_owned.size(); i < e; ++i) {
        EXPECT_EQ(global_counts[i], expected_owned[i]);
    }
}

TEST(IoMesh, ReadWrite) {
    stk::ParallelMachine comm = MPI_COMM_WORLD;
    IoMeshParameters io_mesh_parameters;  // Default parameters
    IoMesh io_mesh(comm, io_mesh_parameters);

    // Make sure output doesn't already exist to prevent false positives
    std::string output_f_name = "IoMeshReadWrite.exo";
    CleanUp(output_f_name);
    std::ifstream before_write_file(output_f_name);
    EXPECT_FALSE(before_write_file.good());

    // Generate a mesh
    int interpolation_intervals = 0;
    io_mesh.ReadMesh("generated", "1x1x1", interpolation_intervals);
    std::vector<size_t> expected_owned = {8, 0, 0, 1};
    CheckCounts(io_mesh.GetBulkData(), expected_owned);

    // Write the generated mesh
    stk::io::HeartbeatType heartbeat_type = stk::io::NONE;
    io_mesh.WriteFieldResults(output_f_name, heartbeat_type, interpolation_intervals);
    std::ifstream after_write_file(output_f_name);
    EXPECT_TRUE(after_write_file.good());

    // Read in the written mesh and check
    IoMesh io_mesh_read(comm, io_mesh_parameters);
    io_mesh_read.ReadMesh("exodusii", output_f_name, interpolation_intervals);
    CheckCounts(io_mesh_read.GetBulkData(), expected_owned);

    // Clean for next run
    CleanUp(output_f_name);
}