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

namespace aperi {

class NeighborSearchProcessor {
    using DoubleField = stk::mesh::Field<double>;
    using NgpDoubleField = stk::mesh::NgpField<double>;
    using UnsignedField = stk::mesh::Field<uint64_t>;
    using NgpUnsignedField = stk::mesh::NgpField<uint64_t>;
    using ExecSpace = stk::ngp::ExecSpace;
    using NodeIdentProc = stk::search::IdentProc<stk::mesh::EntityId, int>;
    using SphereIdentProc = stk::search::BoxIdentProc<stk::search::Sphere<double>, NodeIdentProc>;
    using PointIdentProc = stk::search::BoxIdentProc<stk::search::Point<double>, NodeIdentProc>;
    using Intersection = stk::search::IdentProcIntersection<NodeIdentProc, NodeIdentProc>;

    using RangeViewType = Kokkos::View<SphereIdentProc *, ExecSpace>;
    using DomainViewType = Kokkos::View<PointIdentProc *, ExecSpace>;
    using ResultViewType = Kokkos::View<Intersection *, ExecSpace>;

    using FastMeshIndicesViewType = Kokkos::View<stk::mesh::FastMeshIndex *, ExecSpace>;

   public:
    NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
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
        m_node_num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_node_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_node_num_neighbors_field);

        // Get the node neighbors field
        m_node_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_node_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_node_neighbors_field);

        // Get the node active field
        m_node_active_field = StkGetField(FieldQueryData<uint64_t>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_node_active_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_node_active_field);

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

    void PopulateDebugFields() {
        DoubleField *m_neighbor_coordinates_x_field = StkGetField(FieldQueryData<double>{"neighbor_coordinates_x", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
        NgpDoubleField *m_ngp_coordinates_x_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbor_coordinates_x_field);
        DoubleField *m_neighbor_coordinates_y_field = StkGetField(FieldQueryData<double>{"neighbor_coordinates_y", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
        NgpDoubleField *m_ngp_coordinates_y_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbor_coordinates_y_field);
        DoubleField *m_neighbor_coordinates_z_field = StkGetField(FieldQueryData<double>{"neighbor_coordinates_z", FieldQueryState::None, FieldDataTopologyRank::NODE}, &m_bulk_data->mesh_meta_data());
        NgpDoubleField *m_ngp_coordinates_z_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbor_coordinates_z_field);

        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;
        auto ngp_coordinates_x_field = *m_ngp_coordinates_x_field;
        auto ngp_coordinates_y_field = *m_ngp_coordinates_y_field;
        auto ngp_coordinates_z_field = *m_ngp_coordinates_z_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                uint64_t num_neighbors = ngp_node_num_neighbors_field(node_index, 0);
                for (size_t i = 0; i < num_neighbors; ++i) {
                    stk::mesh::Entity neighbor(ngp_node_neighbors_field(node_index, i));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(neighbor);
                    stk::mesh::EntityFieldData<double> neighbor_coords = ngp_coordinates_field(neighbor_index);
                    ngp_coordinates_x_field(node_index, i) = neighbor_coords[0];
                    ngp_coordinates_y_field(node_index, i) = neighbor_coords[1];
                    ngp_coordinates_z_field(node_index, i) = neighbor_coords[2];
                }
            });
    }

    bool CheckAllNeighborsAreWithinKernelRadius() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_active_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the node's coordinates
                double kernel_radius = ngp_kernel_radius_field(node_index, 0);
                stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_index);
                uint64_t num_neighbors = ngp_node_num_neighbors_field(node_index, 0);
                stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
                for (size_t i = 0; i < num_neighbors; ++i) {
                    stk::mesh::Entity neighbor(ngp_node_neighbors_field(node_index, i));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(neighbor);
                    stk::mesh::EntityFieldData<double> neighbor_coords = ngp_coordinates_field(neighbor_index);
                    double neighbor_kernel_radius = ngp_kernel_radius_field(neighbor_index, 0);
                    double distance = 0.0;
                    for (size_t j = 0; j < 3; ++j) {
                        distance += (coords[j] - neighbor_coords[j]) * (coords[j] - neighbor_coords[j]);
                    }
                    distance = sqrt(distance);
                    if (distance > neighbor_kernel_radius) {
                        Kokkos::printf("--------------------\n");
                        Kokkos::printf("Node coordinates: %f %f %f\n", coords[0], coords[1], coords[2]);
                        Kokkos::printf("Neighbor coordinates: %f %f %f\n", neighbor_coords[0], neighbor_coords[1], neighbor_coords[2]);
                        Kokkos::printf("Distance: %f\n", distance);
                        Kokkos::printf("Kernel radius: %f\n", kernel_radius);
                        Kokkos::printf("Neighbor Kernel radius (relevant for traditional RK): %f\n", kernel_radius);
                        Kokkos::printf("FAIL: Node %lu has a neighbor %lu that is outside the neighbor kernel radius.\n", static_cast<long unsigned int>(ngp_mesh.identifier(node)), static_cast<long unsigned int>(ngp_mesh.identifier(neighbor)));
                        Kokkos::abort("Neighbor outside kernel radius.");
                    }
                }
            });
        return true;
    }

    // Check that all neighbors are active nodes. Loops on the host.
    // Neighbors should also be checked inline in UnpackSearchResultsIntoField. This is a double check for testing.
    // This has issues. It only works in serial and on some meshes. STK QUESTION: How to fix this?
    bool CheckNeighborsAreActiveNodesHost(bool print_failures = true) {
        int num_procs;
        MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
        if (num_procs > 1) {
            aperi::CoutP0() << "Warning: CheckNeighborsAreActiveNodesHost only works in serial." << std::endl;
            return true;
        }
        bool all_neighbors_active = true;
        bool all_nodes_have_neighbors = true;
        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_owned_selector.get_buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            uint64_t *node_num_neighbors = stk::mesh::field_data(*m_node_num_neighbors_field, *bucket);
            uint64_t *node_neighbors = stk::mesh::field_data(*m_node_neighbors_field, *bucket);
            const size_t len_neighbors = stk::mesh::field_scalars_per_entity(*m_node_neighbors_field, *bucket);
            assert(1 == stk::mesh::field_scalars_per_entity(*m_node_num_neighbors_field, *bucket));
            // Loop over each entity in the bucket
            for (size_t i_entity = 0; i_entity < bucket->size(); i_entity++) {
                size_t i_neighbor_start = i_entity * len_neighbors;
                uint64_t num_neighbors = node_num_neighbors[i_entity];
                if (num_neighbors == 0) {
                    all_nodes_have_neighbors = false;
                    if (print_failures) {
                        aperi::CoutP0() << "FAIL: Node " << m_bulk_data->identifier(bucket->operator[](i_entity)) << " has no neighbors." << std::endl;
                    }
                }
                for (size_t i = 0; i < num_neighbors; i++) {
                    // TODO(jake): This only works in serial. The neighbor index is not the global id and the field_data call is not working.
                    uint64_t neighbor_index = node_neighbors[i_neighbor_start + i];
                    stk::mesh::Entity neighbor = m_bulk_data->get_entity(stk::topology::NODE_RANK, neighbor_index);
                    // Active value of the neighbor
                    uint64_t neighbor_active = stk::mesh::field_data(*m_node_active_field, neighbor)[0];
                    if (neighbor_active == 0) {
                        all_neighbors_active = false;
                        if (print_failures) {
                            aperi::CoutP0() << "FAIL: Node " << m_bulk_data->identifier(bucket->operator[](i_entity)) << " has a neighbor " << neighbor_index << " that is not active." << std::endl;
                        }
                    }
                }
            }
        }
        return all_neighbors_active && all_nodes_have_neighbors;
    }

    void SetKernelRadius(double kernel_radius) {
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

    void ComputeKernelRadius(double scale_factor) {
        // Add a small number to the scale factor to avoid too much variation in the number of neighbors.
        // If the in/out check can flip one way or the other if a neighbor is right on the edge.
        if (scale_factor == 1.0) {
            scale_factor += 1.0e-6;
        }
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;
        auto ngp_max_edge_length_field = *m_ngp_max_edge_length_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_active_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the max edge length
                double max_edge_length = ngp_max_edge_length_field(node_index, 0);
                ngp_kernel_radius_field(node_index, 0) = max_edge_length * scale_factor;
            });
        ngp_kernel_radius_field.clear_sync_state();
        ngp_kernel_radius_field.modify_on_device();
        ngp_kernel_radius_field.sync_to_host();
    }

    // Create local entities on host and copy to device
    FastMeshIndicesViewType GetLocalEntityIndices(stk::mesh::EntityRank rank, stk::mesh::Selector selector) {
        std::vector<stk::mesh::Entity> local_entities;
        stk::mesh::get_entities(*m_bulk_data, rank, selector, local_entities);

        FastMeshIndicesViewType mesh_indices("mesh_indices", local_entities.size());
        FastMeshIndicesViewType::HostMirror host_mesh_indices = Kokkos::create_mirror_view(Kokkos::WithoutInitializing, mesh_indices);

        for (size_t i = 0; i < local_entities.size(); ++i) {
            const stk::mesh::MeshIndex &mesh_index = m_bulk_data->mesh_index(local_entities[i]);
            host_mesh_indices(i) = stk::mesh::FastMeshIndex{mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal};
        }

        Kokkos::deep_copy(mesh_indices, host_mesh_indices);
        return mesh_indices;
    }

    // The domain will be the nodes. Search will find the nodes within the spheres from above.
    // The identifiers will be the global node ids.
    DomainViewType CreateNodePoints() {
        const stk::mesh::MetaData &meta = m_bulk_data->mesh_meta_data();
        const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, m_owned_selector | meta.globally_shared_part());
        DomainViewType node_points("node_points", num_local_nodes);

        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;

        // Slow host operation that is needed to get an index. There is plans to add this to the stk::mesh::NgpMesh.
        FastMeshIndicesViewType node_indices = GetLocalEntityIndices(stk::topology::NODE_RANK, m_owned_selector | meta.globally_shared_part());
        const int my_rank = m_bulk_data->parallel_rank();

        Kokkos::parallel_for(
            stk::ngp::DeviceRangePolicy(0, num_local_nodes), KOKKOS_LAMBDA(const unsigned &i) {
                stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_indices(i));
                stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_indices(i));
                node_points(i) = PointIdentProc{stk::search::Point<double>(coords[0], coords[1], coords[2]), NodeIdentProc(ngp_mesh.identifier(node), my_rank)};
            });

        return node_points;
    }

    // Sphere range. Will be used to find the nodes within a ball defined by the sphere.
    // The identifiers will be the global node ids.
    RangeViewType CreateNodeSpheres() {
        const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, m_owned_and_active_selector);
        RangeViewType node_spheres("node_spheres", num_local_nodes);

        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;
        const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;

        // Slow host operation that is needed to get an index. There is plans to add this to the stk::mesh::NgpMesh.
        FastMeshIndicesViewType node_indices = GetLocalEntityIndices(stk::topology::NODE_RANK, m_owned_and_active_selector);
        const int my_rank = m_bulk_data->parallel_rank();

        Kokkos::parallel_for(
            stk::ngp::DeviceRangePolicy(0, num_local_nodes), KOKKOS_LAMBDA(const unsigned &i) {
                stk::mesh::EntityFieldData<double> coords = ngp_coordinates_field(node_indices(i));
                stk::search::Point<double> center(coords[0], coords[1], coords[2]);
                stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_indices(i));
                double radius = ngp_kernel_radius_field(node_indices(i), 0);
                node_spheres(i) = SphereIdentProc{stk::search::Sphere<double>(center, radius), NodeIdentProc(ngp_mesh.identifier(node), my_rank)};
            });

        return node_spheres;
    }

    // Ghost the neighbors to the nodes processor
    void GhostNodeNeighbors(const ResultViewType::HostMirror &host_search_results) {
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

    bool NodeIsActive(stk::mesh::Entity node) {
        return stk::mesh::field_data(*m_node_active_field, node)[0] == 1;
    }

    // Put the search results into the neighbors field. The neighbors field is a field of global node ids. The neighbors are sorted by distance. Near to far.
    void UnpackSearchResultsIntoField(const ResultViewType::HostMirror &host_search_results) {
        const int my_rank = m_bulk_data->parallel_rank();

        for (size_t i = 0; i < host_search_results.size(); ++i) {
            auto result = host_search_results(i);
            if (result.domainIdentProc.proc() == my_rank) {
                stk::mesh::Entity node = m_bulk_data->get_entity(stk::topology::NODE_RANK, result.domainIdentProc.id());
                stk::mesh::Entity neighbor = m_bulk_data->get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id());
                assert(NodeIsActive(neighbor));
                const double *p_neighbor_coordinates = stk::mesh::field_data(*m_coordinates_field, neighbor);
                const double *p_node_coordinates = stk::mesh::field_data(*m_coordinates_field, node);
                uint64_t *p_neighbor_data = stk::mesh::field_data(*m_node_neighbors_field, node);
                uint64_t &num_neighbors = *stk::mesh::field_data(*m_node_num_neighbors_field, node);
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

                // Shift the function values and neighbors to make room for the new neighbor
                size_t reverse_start_index = (size_t)num_neighbors;
                if (reverse_start_index == MAX_NODE_NUM_NEIGHBORS) {
                    printf("Node %lu has too many neighbors. The furthest neighbor will be removed.\n", static_cast<long unsigned int>(m_bulk_data->identifier(node)));
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
            }
        }
        // Never communicate the neighbors field. The shared nodes need to have a processor local value and not the value of the owning processor.
        m_node_neighbors_field->modify_on_host();
        m_node_num_neighbors_field->modify_on_host();
        m_node_neighbors_field->sync_to_device();
        m_node_num_neighbors_field->sync_to_device();
    }

    // Loop over each element and add the element's nodes to the neighbors field
    void add_nodes_ring_0_nodes(bool set_first_function_value_to_one = false) {
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
                ngp_node_num_neighbors_field(node_index, 0) += 1;
                ngp_node_neighbors_field(node_index, (size_t)starting_num_nodes) = (double)node.local_offset();
                if (set_first_function_value_to_one) {
                    ngp_node_function_values_field(node_index, (size_t)starting_num_nodes) = 1.0;
                }
            });
        m_ngp_node_num_neighbors_field->clear_sync_state();
        m_ngp_node_num_neighbors_field->modify_on_device();
        if (set_first_function_value_to_one) {
            m_ngp_node_function_values_field->clear_sync_state();
            m_ngp_node_function_values_field->modify_on_device();
        }
    }

    void DoBallSearch(bool populate_debug_fields = false) {
        auto start_search_time = std::chrono::high_resolution_clock::now();
        DomainViewType node_points = CreateNodePoints();
        RangeViewType node_spheres = CreateNodeSpheres();

        ResultViewType search_results;
        stk::search::SearchMethod search_method = stk::search::MORTON_LBVH;

        stk::ngp::ExecSpace exec_space = Kokkos::DefaultExecutionSpace{};
        const bool results_parallel_symmetry = true;

        stk::search::coarse_search(node_points, node_spheres, search_method, m_bulk_data->parallel(), search_results, exec_space, results_parallel_symmetry);
        auto end_search_time = std::chrono::high_resolution_clock::now();
        aperi::CoutP0() << "     - Time to search: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_search_time - start_search_time).count() << " ms" << std::endl;
        auto start_copy_and_ghost_time = std::chrono::high_resolution_clock::now();

        ResultViewType::HostMirror host_search_results = Kokkos::create_mirror_view(search_results);
        Kokkos::deep_copy(host_search_results, search_results);

        GhostNodeNeighbors(host_search_results);
        auto end_copy_and_ghost_time = std::chrono::high_resolution_clock::now();
        aperi::CoutP0() << "     - Time to copy and ghost: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_copy_and_ghost_time - start_copy_and_ghost_time).count() << " ms" << std::endl;
        auto start_unpack_time = std::chrono::high_resolution_clock::now();

        UnpackSearchResultsIntoField(host_search_results);
        auto end_unpack_time = std::chrono::high_resolution_clock::now();
        aperi::CoutP0() << "     - Time to unpack: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_unpack_time - start_unpack_time).count() << " ms" << std::endl;

        // Check the validity of the neighbors field
        assert(CheckAllNeighborsAreWithinKernelRadius());
        // This has issues. It only works in serial and on some meshes. STK QUESTION: How to fix this?
        // assert(CheckNeighborsAreActiveNodesHost());

        if (populate_debug_fields) {
            PopulateDebugFields();
        }
    }

    void add_nodes_neighbors_within_variable_ball(double scale_factor, bool populate_debug_fields = false) {
        aperi::CoutP0() << "   - Finding Neighbors." << std::endl;
        auto start_time = std::chrono::high_resolution_clock::now();
        ComputeKernelRadius(scale_factor);
        DoBallSearch(populate_debug_fields);
        auto end_time = std::chrono::high_resolution_clock::now();
        aperi::CoutP0() << "   - Time to find neighbors: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_time - start_time).count() << " ms" << std::endl;
    }

    void add_nodes_neighbors_within_constant_ball(double ball_radius, bool populate_debug_fields = false) {
        SetKernelRadius(ball_radius);
        DoBallSearch(populate_debug_fields);
    }

    std::map<std::string, double> GetNumNeighborStats() {
        // Initialize the min and max values
        double max_num_neighbors = 0;
        double min_num_neighbors = std::numeric_limits<double>::max();
        double total_num_neighbors = 0;
        double num_entities = 0;
        int reserved_memory = 0;
        NgpUnsignedField ngp_num_neighbors_field;

        num_entities = GetNumOwnedNodes();
        ngp_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        reserved_memory = MAX_NODE_NUM_NEIGHBORS;

        FastMeshIndicesViewType entity_indices = GetLocalEntityIndices(stk::topology::NODE_RANK, m_owned_selector);

        // Use Kokkos::parallel_reduce to calculate the min, max, and sum in parallel
        Kokkos::parallel_reduce(
            "calculate_stats",
            num_entities,
            KOKKOS_LAMBDA(int i, double &max_num_neighbors, double &min_num_neighbors, double &total_num_neighbors) {
                stk::mesh::EntityFieldData<uint64_t> num_neighbors_field = ngp_num_neighbors_field(entity_indices(i));
                double num_neighbors = num_neighbors_field[0];
                max_num_neighbors = Kokkos::max(max_num_neighbors, num_neighbors);
                min_num_neighbors = Kokkos::min(min_num_neighbors, num_neighbors);
                total_num_neighbors += num_neighbors;
            },
            Kokkos::Max<double>(max_num_neighbors),
            Kokkos::Min<double>(min_num_neighbors),
            Kokkos::Sum<double>(total_num_neighbors));

        // Use MPI_Allreduce to calculate the min, max, and sum across all MPI ranks
        MPI_Allreduce(MPI_IN_PLACE, &max_num_neighbors, 1, MPI_DOUBLE, MPI_MAX, MPI_COMM_WORLD);
        MPI_Allreduce(MPI_IN_PLACE, &min_num_neighbors, 1, MPI_DOUBLE, MPI_MIN, MPI_COMM_WORLD);
        MPI_Allreduce(MPI_IN_PLACE, &total_num_neighbors, 1, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);
        MPI_Allreduce(MPI_IN_PLACE, &num_entities, 1, MPI_DOUBLE, MPI_SUM, MPI_COMM_WORLD);

        std::map<std::string, double> stats;
        stats["max_num_neighbors"] = max_num_neighbors;
        stats["min_num_neighbors"] = min_num_neighbors;
        stats["avg_num_neighbors"] = total_num_neighbors / num_entities;
        stats["num_entities"] = num_entities;
        stats["reserved_memory_utilization"] = total_num_neighbors / (num_entities * reserved_memory) * 100.0;
        return stats;
    }

    void PrintNumNeighborsStats() {
        // Node
        std::map<std::string, double> node_stats = GetNumNeighborStats();

        aperi::CoutP0() << "   - Neighbor Stats: " << std::endl;
        aperi::CoutP0() << "     - Total Num Nodes: " << node_stats["num_entities"] << std::endl;
        aperi::CoutP0() << "     - Max Num Neighbors: " << node_stats["max_num_neighbors"] << std::endl;
        aperi::CoutP0() << "     - Min Num Neighbors: " << node_stats["min_num_neighbors"] << std::endl;
        aperi::CoutP0() << "     - Avg Num Neighbors: " << node_stats["avg_num_neighbors"] << std::endl;
        aperi::CoutP0() << "     - Reserved Memory Utilization: " << node_stats["reserved_memory_utilization"] << "%" << std::endl;
    }

    void SyncFieldsToHost() {
        m_ngp_node_num_neighbors_field->sync_to_host();
        m_ngp_node_function_values_field->sync_to_host();
        m_ngp_kernel_radius_field->clear_sync_state();
        m_ngp_kernel_radius_field->sync_to_host();
    }

    void CommunicateAllFieldData() const {
        // Should not communicate these fields. The shared nodes need to have a processor local value and not the value of the owning processor.
        // This is because the neighbors field is a local offset and not a global id.
        // Throw an exception if this is called.
        throw std::runtime_error("NeighborSearchProcessor::CommunicateAllFieldData should not be called.");
    }

    double GetNumElements() {
        return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

    double GetNumOwnedElements() {
        return stk::mesh::count_selected_entities(m_owned_selector, m_bulk_data->buckets(stk::topology::ELEMENT_RANK));
    }

    double GetNumNodes() {
        return stk::mesh::count_selected_entities(m_selector, m_bulk_data->buckets(stk::topology::NODE_RANK));
    }

    double GetNumOwnedNodes() {
        return stk::mesh::count_selected_entities(m_owned_selector, m_bulk_data->buckets(stk::topology::NODE_RANK));
    }

    double GetNumOwnedAndSharedNodes() {
        stk::mesh::Selector shared_selector = m_bulk_data->mesh_meta_data().globally_shared_part();
        stk::mesh::Selector shared_and_owned_selector = shared_selector | m_owned_selector;
        return stk::mesh::count_selected_entities(shared_and_owned_selector, m_bulk_data->buckets(stk::topology::NODE_RANK));
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;      // The mesh data object.
    std::vector<std::string> m_sets;                   // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                  // The bulk data object.
    stk::mesh::Selector m_selector;                    // The selector
    stk::mesh::Selector m_active_selector;             // The active selector
    stk::mesh::Selector m_owned_selector;              // The local selector
    stk::mesh::Selector m_owned_and_active_selector;   // The local and active selector
    stk::mesh::NgpMesh m_ngp_mesh;                     // The ngp mesh object.
    DoubleField *m_coordinates_field;                  // The coordinates field
    UnsignedField *m_node_num_neighbors_field;         // The number of neighbors field
    UnsignedField *m_node_neighbors_field;             // The neighbors field
    UnsignedField *m_node_active_field;                // The active field
    DoubleField *m_kernel_radius_field;                // The kernel radius field
    DoubleField *m_max_edge_length_field;              // The max edge length field
    DoubleField *m_node_function_values_field;         // The function values field
    NgpDoubleField *m_ngp_coordinates_field;           // The ngp coordinates field
    NgpUnsignedField *m_ngp_node_num_neighbors_field;  // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_node_neighbors_field;      // The ngp neighbors field
    NgpUnsignedField *m_ngp_node_active_field;         // The ngp active field
    NgpDoubleField *m_ngp_kernel_radius_field;         // The ngp kernel radius field
    NgpDoubleField *m_ngp_max_edge_length_field;       // The ngp max edge length field
    NgpDoubleField *m_ngp_node_function_values_field;  // The ngp function values field
};

}  // namespace aperi