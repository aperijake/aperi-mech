#include "UnitTestUtils.h"

#include <gtest/gtest.h>

#include <filesystem>
#include <fstream>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_topology/topology.hpp>
#include <string>
#include <system_error>

#include "IoInputFile.h"
#include "IoMesh.h"

YAML::Node CreateTestYaml() {
    YAML::Node yaml_data;

    // Mesh section
    yaml_data["mesh"]["file"] = "one_element.exo";

    // Output section
    yaml_data["output"]["file"] = "one_element_out.exo";

    // Parts
    YAML::Node block_1;
    block_1["location"] = "block_1";
    block_1["name"] = "test_block";
    YAML::Node steel_model;
    steel_model["type"] = "elastic";
    steel_model["density"] = 7850;
    steel_model["youngs_modulus"] = 2.1e11;
    steel_model["poissons_ratio"] = 0.3;
    block_1["material"] = steel_model;
    yaml_data["parts"].push_back(block_1);

    // Loads section
    // Add a traction load
    // Note: this is not implemented yet
    // YAML::Node traction_node;
    // traction_node["name"] = "load";
    // traction_node["type"] = "traction";
    // traction_node["location"] = "surface_1";
    // traction_node["magnitude"] = 500;
    // traction_node["direction"].push_back(1);
    // traction_node["direction"].push_back(0);
    // traction_node["direction"].push_back(0);
    // yaml_data["loads"].push_back(traction_node);

    // Add a gravity load
    YAML::Node gravity_node;
    gravity_node["name"] = "gravity";
    gravity_node["type"] = "gravity";
    gravity_node["location"] = "block_1";
    gravity_node["magnitude"] = 9.81;
    gravity_node["direction"].push_back(0);
    gravity_node["direction"].push_back(0);
    gravity_node["direction"].push_back(-1);
    yaml_data["loads"].push_back(gravity_node);

    // Boundary Conditions section
    YAML::Node fixed_bc;
    fixed_bc["name"] = "fixed";
    fixed_bc["type"] = "displacement";
    fixed_bc["location"] = "surface_2";
    fixed_bc["magnitude"] = 0;
    fixed_bc["direction"].push_back(1);
    fixed_bc["direction"].push_back(1);
    fixed_bc["direction"].push_back(1);
    yaml_data["boundary_conditions"].push_back(fixed_bc);

    // Initial Conditions section
    YAML::Node initial_velocity;
    initial_velocity["name"] = "initial_velocity";
    initial_velocity["type"] = "velocity";
    initial_velocity["location"] = "block_1";
    initial_velocity["magnitude"] = 1.23;
    initial_velocity["direction"].push_back(1);
    initial_velocity["direction"].push_back(0);
    initial_velocity["direction"].push_back(0);
    yaml_data["initial_conditions"].push_back(initial_velocity);

    return yaml_data;
}

void WriteTestMesh(const std::string& filename, acm::IoMesh& io_mesh, const std::string& mesh_string, const std::shared_ptr<acm::FieldManager>& field_manager) {
    // Create a temporary mesh file
    CleanUp(filename);  // Remove any existing file
    // Make sure output doesn't already exist to prevent false positives
    std::ifstream before_write_file(filename);
    EXPECT_FALSE(before_write_file.good());

    // Generate a mesh
    io_mesh.ReadMesh(mesh_string, field_manager);
    // std::vector<size_t> expected_owned = {8, 0, 0, 1};
    // CheckMeshCounts(io_mesh.GetBulkData(), expected_owned);

    // Write the generated mesh
    io_mesh.CreateFieldResultsFile(filename);
    io_mesh.WriteFieldResults(0);
    std::ifstream after_write_file(filename);
    EXPECT_TRUE(after_write_file.good());
}

void CleanUp(const std::filesystem::path& filePath) {
    if (std::filesystem::exists(filePath)) {
        std::error_code ec;  // For error handling
        std::filesystem::remove(filePath, ec);
        EXPECT_FALSE(ec);
    }
}

void CheckMeshCounts(const stk::mesh::BulkData& bulk, const std::vector<size_t>& expected_owned) {
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