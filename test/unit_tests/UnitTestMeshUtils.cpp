#include "UnitTestMeshUtils.h"

#include <mpi.h>

#include <array>
#include <cassert>
#include <filesystem>
#include <fstream>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/DestroyElements.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/parallel/Parallel.hpp>
#include <string>
#include <system_error>
#include <vector>

#include "EntityProcessor.h"
#include "FieldData.h"
#include "Index.h"
#include "IoMesh.h"
#include "MeshData.h"
#include "gtest/gtest.h"

void WriteTestMesh(const std::string& filename, aperi::IoMesh& io_mesh, const std::string& mesh_string, const std::vector<aperi::FieldData>& field_data) {
    // Create a temporary mesh file
    CleanUp(filename);  // Remove any existing file
    // Make sure output doesn't already exist to prevent false positives
    std::ifstream before_write_file(filename);
    EXPECT_FALSE(before_write_file.good());

    // Generate a mesh
    io_mesh.ReadMesh(mesh_string, {"block_1"});
    io_mesh.AddFields(field_data);
    io_mesh.CompleteInitialization();
    // std::vector<size_t> expected_owned = {8, 0, 0, 1};
    // CheckMeshCounts(*io_mesh.GetMeshData(), expected_owned);

    // Write the generated mesh
    io_mesh.CreateFieldResultsFile(filename);
    io_mesh.AddFieldResultsOutput(field_data);
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

void CheckMeshCounts(const aperi::MeshData& mesh_data, const std::vector<size_t>& expected_owned) {
    const stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();
    constexpr auto k_num_ranks = static_cast<unsigned>(stk::topology::ELEM_RANK + 1);
    std::vector<size_t> global_counts(k_num_ranks, 0);
    std::vector<size_t> min_global_counts(k_num_ranks, 0);
    std::vector<size_t> max_global_counts(k_num_ranks, 0);
    std::vector<size_t> aura_global_counts(k_num_ranks, 0);
    std::vector<size_t> shared_not_owned_counts(k_num_ranks, 0);
    // STK QUESTION: It is not super clear what this is returning.
    stk::mesh::comm_mesh_counts(bulk, global_counts, min_global_counts, max_global_counts);
    stk::mesh::Selector shared_not_owned = bulk.mesh_meta_data().globally_shared_part() & !bulk.mesh_meta_data().locally_owned_part();
    stk::mesh::count_entities(shared_not_owned, bulk, shared_not_owned_counts);
    stk::all_reduce(MPI_COMM_WORLD, stk::ReduceSum<k_num_ranks>(shared_not_owned_counts.data()));
    stk::mesh::Selector aura = bulk.mesh_meta_data().aura_part();
    stk::mesh::count_entities(aura, bulk, aura_global_counts);
    stk::all_reduce(MPI_COMM_WORLD, stk::ReduceSum<k_num_ranks>(aura_global_counts.data()));

    // TODO(jake): test in parallel and add in checks for shared-not-owned and aura
    EXPECT_EQ(global_counts.size(), 4U);
    EXPECT_EQ(expected_owned.size(), 4U);
    for (int i = 0, e = expected_owned.size(); i < e; ++i) {
        EXPECT_EQ(global_counts[i], expected_owned[i]) << " for rank " << i;
    }
}

void RandomizeCoordinates(const aperi::MeshData& mesh_data, double min_value, double max_value) {
    std::array<aperi::FieldQueryData<double>, 1> field_query_data_array = {{{mesh_data.GetCoordinatesFieldName(), aperi::FieldQueryState::NP1, aperi::FieldDataTopologyRank::NODE}}};

    // Make a entity processor
    std::shared_ptr<aperi::MeshData> mesh_data_ptr = std::make_shared<aperi::MeshData>(mesh_data);
    aperi::AperiEntityProcessor<aperi::FieldDataTopologyRank::NODE, 1> entity_processor(field_query_data_array, mesh_data_ptr, {});

    // Seed the random number generator
    std::srand(17);

    // Get the sum of the field values
    entity_processor.for_each_owned_entity_host([&](const std::array<size_t, 1>& i_entity_start, const std::array<size_t, 1>& num_components, std::array<double*, 1>& coords) {
        Eigen::Vector3d shift = Eigen::Vector3d::Random() * (max_value - min_value) + Eigen::Vector3d::Constant(min_value);
        for (size_t i = 0; i < num_components[0]; ++i) {
            coords[0][i + i_entity_start[0]] += shift(i);
        }
    });
    entity_processor.CommunicateAllFieldData();
    entity_processor.MarkAllFieldsModifiedOnHost();
    entity_processor.SyncAllFieldsHostToDevice();
}

void SplitMeshIntoTwoBlocks(const aperi::MeshData& mesh_data, double z_plane_offset) {
    // Get the bulk data
    stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();

    // Create a selector for block 1
    stk::mesh::Selector selector = mesh_data.GetMetaData()->locally_owned_part() & mesh_data.GetMetaData()->universal_part();

    // Get the coordinates field
    stk::mesh::Field<double>& coordinates_field = *mesh_data.GetMetaData()->get_field<double>(stk::topology::NODE_RANK, mesh_data.GetCoordinatesFieldName());

    // Elements to move
    stk::mesh::EntityVector elements_to_move;

    // Nodes to move
    stk::mesh::EntityVector nodes_to_move;

    // Topology rank
    stk::topology block_1_topology;

    int rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    // Loop over all the element buckets
    for (stk::mesh::Bucket* bucket : selector.get_buckets(stk::topology::ELEM_RANK)) {
        // Loop over each entity in the bucket
        for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
            // Get the nodes of the element
            stk::mesh::Entity element = (*bucket)[i_entity];
            const stk::mesh::Entity* nodes = bucket->begin_nodes(i_entity);
            size_t num_nodes = bucket->num_nodes(i_entity);

            // Set the topology
            block_1_topology = bulk.bucket(element).topology();

            double z_average = 0.0;

            // Loop over the nodes of the element
            for (size_t i_node = 0; i_node < num_nodes; ++i_node) {
                // Get the node
                stk::mesh::Entity node = nodes[i_node];
                double* node_coords = stk::mesh::field_data(coordinates_field, node);

                // Add nodes to move if they are above the z plane offset with a little bit of tolerance
                if (node_coords[2] >= z_plane_offset - 1.0e-12) {
                    // Only move if owned
                    if (bulk.bucket(node).owned()) {
                        nodes_to_move.push_back(node);
                    }
                }

                // Get the average z value
                z_average += node_coords[2];
            }

            // Get the average z value
            z_average /= num_nodes;

            // Add elements to move
            if (z_average > z_plane_offset) {
                elements_to_move.push_back(element);
            }
        }
    }

    bulk.modification_begin();
    // Create a new part
    stk::mesh::Part& add_part = mesh_data.GetMetaData()->declare_part_with_topology("block_2", block_1_topology);

    // Prepare the parts to add and remove
    stk::mesh::PartVector add_parts = {&add_part};
    stk::mesh::Part& remove_part = *bulk.mesh_meta_data().get_part("block_1");
    stk::mesh::PartVector remove_parts = {&remove_part};
    stk::mesh::PartVector empty_parts;  // No parts to remove for nodes

    // Change entity parts
    bulk.change_entity_parts(elements_to_move, add_parts, remove_parts);
    bulk.change_entity_parts(nodes_to_move, add_parts, empty_parts);

    bulk.modification_end();
}

size_t GetNumEntitiesInPart(const aperi::MeshData& mesh_data, const std::string& part_name, stk::topology::rank_t rank) {
    stk::mesh::Part* p_part = mesh_data.GetMetaData()->get_part(part_name);
    assert(p_part != nullptr);
    stk::mesh::Selector selector(*p_part);
    std::vector<size_t> counts;
    stk::mesh::comm_mesh_counts(*mesh_data.GetBulkData(), counts, &selector);
    return counts[rank];
}

size_t GetNumElementsInPart(const aperi::MeshData& mesh_data, const std::string& part_name) {
    return GetNumEntitiesInPart(mesh_data, part_name, stk::topology::ELEM_RANK);
}

size_t GetNumNodesInPart(const aperi::MeshData& mesh_data, const std::string& part_name) {
    return GetNumEntitiesInPart(mesh_data, part_name, stk::topology::NODE_RANK);
}

aperi::Index GetNodeIndexAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found) {
    // Get the bulk data
    stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();
    stk::mesh::MetaData& meta = *mesh_data.GetMetaData();
    stk::mesh::Part* p_part = meta.get_part(part_name);
    assert(p_part != nullptr);
    stk::mesh::Selector selector(*p_part);

    // Get the coordinates field
    stk::mesh::Field<double>& coordinates_field = *mesh_data.GetMetaData()->get_field<double>(stk::topology::NODE_RANK, mesh_data.GetCoordinatesFieldName());

    bool found = false;
    aperi::Index node_index;

    // Loop over the nodes in the part
    for (stk::mesh::Bucket* p_bucket : selector.get_buckets(stk::topology::NODE_RANK)) {
        // Loop over each entity in the bucket
        for (auto node : *p_bucket) {
            // Get the coordinates of the node
            double* p_node_coords = stk::mesh::field_data(coordinates_field, node);
            Eigen::Vector3d node_coordinates(p_node_coords[0], p_node_coords[1], p_node_coords[2]);

            // Check if the coordinates match
            if ((node_coordinates - coordinates).norm() < 1.0e-12) {
                // If the coordinates match, return the node index
                const stk::mesh::MeshIndex& mesh_index = bulk.mesh_index(node);
                node_index = aperi::Index(mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal);
                found = true;
                break;
            }
        }
    }

    if (!found) {
        // If no node was found, return an invalid index
        node_index = aperi::Index::Invalid();
    }

    if (check_found) {
        // Parallel communicate found to make sure one rank found the node
        bool found_global = false;
        MPI_Allreduce(&found, &found_global, 1, MPI_CXX_BOOL, MPI_LOR, MPI_COMM_WORLD);
        EXPECT_TRUE(found_global) << "Node not found at coordinates " << coordinates.transpose() << " in part " << part_name;
    }

    return node_index;
}

stk::mesh::Entity GetElementAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found) {
    // Get the bulk data
    stk::mesh::MetaData& meta = *mesh_data.GetMetaData();
    stk::mesh::Part* p_part = meta.get_part(part_name);
    assert(p_part != nullptr);
    stk::mesh::Selector selector(*p_part);

    // Get the coordinates field
    stk::mesh::Field<double>& coordinates_field = *mesh_data.GetMetaData()->get_field<double>(stk::topology::NODE_RANK, mesh_data.GetCoordinatesFieldName());

    bool found = false;
    stk::mesh::Entity found_element;

    // Loop over the elements in the part
    for (stk::mesh::Bucket* p_bucket : selector.get_buckets(stk::topology::ELEM_RANK)) {
        // Loop over each entity in the bucket
        for (size_t i_entity = 0; i_entity < p_bucket->size(); i_entity++) {
            // Get the nodes of the element
            stk::mesh::Entity element = (*p_bucket)[i_entity];
            const stk::mesh::Entity* nodes = p_bucket->begin_nodes(i_entity);
            size_t num_nodes = p_bucket->num_nodes(i_entity);
            Eigen::Vector3d element_centroid(0.0, 0.0, 0.0);
            // Loop over the nodes of the element
            for (size_t i_node = 0; i_node < num_nodes; ++i_node) {
                // Get the node
                stk::mesh::Entity node = nodes[i_node];
                double* p_node_coords = stk::mesh::field_data(coordinates_field, node);
                Eigen::Vector3d node_coordinates(p_node_coords[0], p_node_coords[1], p_node_coords[2]);
                element_centroid += node_coordinates;
            }
            // Get the centroid of the element
            element_centroid /= num_nodes;

            // Check if the coordinates match
            if ((element_centroid - coordinates).norm() < 1.0e-12) {
                // If the coordinates match, return the element
                found = true;
                found_element = element;
                break;
            }
        }
    }

    if (!found) {
        // If no element was found, return an invalid entity
        found_element = stk::mesh::Entity();
    }

    if (check_found) {
        // Parallel communicate found to make sure one rank found the node
        bool found_global = false;
        MPI_Allreduce(&found, &found_global, 1, MPI_CXX_BOOL, MPI_LOR, MPI_COMM_WORLD);
        EXPECT_TRUE(found_global) << "Element not found at coordinates " << coordinates.transpose() << " in part " << part_name;
    }

    return found_element;
}

aperi::Index GetElementIndexAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found) {
    stk::mesh::Entity element = GetElementAtCoordinates(mesh_data, part_name, coordinates, check_found);
    stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();
    aperi::Index element_index;
    if (bulk.is_valid(element)) {
        const stk::mesh::MeshIndex& mesh_index = bulk.mesh_index(element);
        element_index = aperi::Index(mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal);
    } else {
        element_index = aperi::Index::Invalid();
    }
    return element_index;
}

void DeleteElementAtCoordinates(const aperi::MeshData& mesh_data, const std::string& part_name, const Eigen::Vector3d& coordinates, bool check_found) {
    stk::mesh::BulkData& bulk = *mesh_data.GetBulkData();
    stk::mesh::Entity entity_to_delete = GetElementAtCoordinates(mesh_data, part_name, coordinates, check_found);
    stk::mesh::EntityVector elements_to_delete = {entity_to_delete};
    stk::mesh::destroy_elements(bulk, elements_to_delete);
}