#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
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
    using DoubleField = stk::mesh::Field<double>;  // TODO(jake): Change these to unsigned. Need to update FieldData to handle.
    using NgpDoubleField = stk::mesh::NgpField<double>;
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
    NeighborSearchProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the node number of neighbors field
        m_node_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_node_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_node_num_neighbors_field);

        // Get the node neighbors field
        m_node_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_node_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_node_neighbors_field);

        // Get the element number of neighbors field
        m_element_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::ELEMENT}, meta_data);
        m_ngp_element_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_num_neighbors_field);

        // Get the element neighbors field
        m_element_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::ELEMENT}, meta_data);
        m_ngp_element_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_element_neighbors_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the kernel radius field
        m_kernel_radius_field = StkGetField(FieldQueryData{"kernel_radius", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_kernel_radius_field = &stk::mesh::get_updated_ngp_field<double>(*m_kernel_radius_field);
    }

    void SetKernelRadius(double kernel_radius) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the node's coordinates
                ngp_kernel_radius_field(node_index, 0) = kernel_radius;
            });
    }

    void ComputeKernelRadius(double scale_factor) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the node's coordinates
                Eigen::Matrix<double, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = ngp_coordinates_field(node_index, j);
                }
                // Get the kernel radius
                double kernel_radius = 0.0;
                stk::mesh::NgpMesh::ConnectedEntities connected_entities = ngp_mesh.get_connected_entities(stk::topology::NODE_RANK, node_index, stk::topology::ELEMENT_RANK);
                for (size_t i = 0; i < connected_entities.size(); ++i) {
                    stk::mesh::FastMeshIndex elem_index = ngp_mesh.fast_mesh_index(connected_entities[i]);
                    stk::mesh::NgpMesh::ConnectedNodes connected_nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                    for (size_t j = 0; j < connected_nodes.size(); ++j) {
                        stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(connected_nodes[j]);
                        Eigen::Matrix<double, 1, 3> neighbor_coordinates;
                        for (size_t k = 0; k < 3; ++k) {
                            neighbor_coordinates(0, k) = ngp_coordinates_field(neighbor_index, k);
                        }
                        double length = (coordinates - neighbor_coordinates).norm();
                        kernel_radius = Kokkos::max(kernel_radius, length);
                    }
                }
                ngp_kernel_radius_field(node_index, 0) = kernel_radius * scale_factor;
            });
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
        const unsigned num_local_nodes = stk::mesh::count_entities(*m_bulk_data, stk::topology::NODE_RANK, m_owned_selector);
        RangeViewType node_spheres("node_spheres", num_local_nodes);

        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_kernel_radius_field = *m_ngp_kernel_radius_field;
        const stk::mesh::NgpMesh &ngp_mesh = m_ngp_mesh;

        // Slow host operation that is needed to get an index. There is plans to add this to the stk::mesh::NgpMesh.
        FastMeshIndicesViewType node_indices = GetLocalEntityIndices(stk::topology::NODE_RANK, m_owned_selector);
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

    // Put the search results into the neighbors field. The neighbors field is a field of global node ids.
    void UnpackSearchResultsIntoField(const ResultViewType::HostMirror &host_search_results) {
        const int my_rank = m_bulk_data->parallel_rank();

        for (size_t i = 0; i < host_search_results.size(); ++i) {
            auto result = host_search_results(i);
            if (result.domainIdentProc.proc() == my_rank) {
                stk::mesh::Entity node = m_bulk_data->get_entity(stk::topology::NODE_RANK, result.domainIdentProc.id());
                stk::mesh::Entity neighbor = m_bulk_data->get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id());
                double *p_neighbor_data = stk::mesh::field_data(*m_node_neighbors_field, node);
                double &num_neighbors = *stk::mesh::field_data(*m_node_num_neighbors_field, node);
                if ((size_t)num_neighbors >= MAX_NODE_NUM_NEIGHBORS) {
                    printf("Node %ld has too many neighbors\n", m_bulk_data->identifier(node));  // TODO(jake): handle this better
                    continue;
                }
                // Store local offset, probably;
                p_neighbor_data[(size_t)num_neighbors] = (double)neighbor.local_offset();  // Store the local offset
                num_neighbors += 1;
            }
        }
        // Never communicate the neighbors field. The shared nodes need to have a processor local value and not the value of the owning processor.
        m_node_neighbors_field->modify_on_host();
        m_node_num_neighbors_field->modify_on_host();
        m_node_neighbors_field->sync_to_device();
        m_node_num_neighbors_field->sync_to_device();
    }

    // Loop over each element and add the element's nodes to the neighbors field
    void add_elements_ring_0_nodes() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_element_num_neighbors_field = *m_ngp_element_num_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;

        // Add the nodes attached to the element
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                double num_nodes = nodes.size();
                assert(num_nodes <= MAX_CELL_NUM_NEIGHBORS);

                double starting_num_nodes = ngp_element_num_neighbors_field(elem_index, 0);
                ngp_element_num_neighbors_field(elem_index, 0) += num_nodes;

                for (size_t i = 0; i < num_nodes; ++i) {
                    size_t index = starting_num_nodes + i;
                    ngp_element_neighbors_field(elem_index, index) = (double)nodes[i].local_offset();
                }
            });
    }

    // Loop over each element and add the element's nodes to the neighbors field
    void add_nodes_ring_0_nodes() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;

        // Add itself to the neighbors field
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the node entity
                stk::mesh::Entity node = ngp_mesh.get_entity(stk::topology::NODE_RANK, node_index);
                double starting_num_nodes = ngp_node_num_neighbors_field(node_index, 0);
                ngp_node_num_neighbors_field(node_index, 0) += 1;
                ngp_node_neighbors_field(node_index, (size_t)starting_num_nodes) = (double)node.local_offset();
            });
    }

    void DoBallSearch() {
        DomainViewType node_points = CreateNodePoints();
        RangeViewType node_spheres = CreateNodeSpheres();

        ResultViewType search_results;
        stk::search::SearchMethod search_method = stk::search::MORTON_LBVH;

        stk::ngp::ExecSpace exec_space = Kokkos::DefaultExecutionSpace{};
        const bool results_parallel_symmetry = true;

        stk::search::coarse_search(node_points, node_spheres, search_method, m_bulk_data->parallel(), search_results, exec_space, results_parallel_symmetry);

        ResultViewType::HostMirror host_search_results = Kokkos::create_mirror_view_and_copy(exec_space, search_results);

        GhostNodeNeighbors(host_search_results);

        UnpackSearchResultsIntoField(host_search_results);
    }

    void add_nodes_neighbors_within_variable_ball(double scale_factor) {
        ComputeKernelRadius(scale_factor);
        DoBallSearch();
    }

    void add_nodes_neighbors_within_constant_ball(double ball_radius) {
        SetKernelRadius(ball_radius);
        DoBallSearch();
    }

    // Create the element neighbors from the node neighbors. Neighbors are local offsets.
    template <size_t NumCellNodes>
    void set_element_neighbors_from_node_neighbors() {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_node_num_neighbors_field = *m_ngp_node_num_neighbors_field;
        auto ngp_node_neighbors_field = *m_ngp_node_neighbors_field;
        auto ngp_element_num_neighbors_field = *m_ngp_element_num_neighbors_field;
        auto ngp_element_neighbors_field = *m_ngp_element_neighbors_field;

        // Add the nodes attached to the element
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::ELEMENT_RANK, m_owned_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &elem_index) {
                // Get the element's nodes
                stk::mesh::NgpMesh::ConnectedNodes nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                assert(nodes.size() == NumCellNodes);
                Kokkos::Array<size_t, MAX_NODE_NUM_NEIGHBORS * NumCellNodes> node_neighbors;

                // Get the node neighbors, full list with potential duplicates
                size_t total_num_neighbors = 0;
                for (size_t i = 0; i < NumCellNodes; ++i) {
                    stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(nodes[i]);
                    size_t num_neighbors = (size_t)ngp_node_num_neighbors_field(node_index, 0);
                    for (size_t j = 0; j < num_neighbors; ++j) {
                        node_neighbors[total_num_neighbors] = (size_t)ngp_node_neighbors_field(node_index, j);
                        ++total_num_neighbors;
                    }
                }

                // Sort the node neighbors and remove duplicates
                total_num_neighbors = SortAndRemoveDuplicates(node_neighbors, total_num_neighbors);

                // Make sure we don't exceed the maximum number of neighbors
                // TODO(jake): Make ways of handling this
                if ((size_t)total_num_neighbors > MAX_CELL_NUM_NEIGHBORS) {
                    stk::mesh::Entity elem = ngp_mesh.get_entity(stk::topology::ELEMENT_RANK, elem_index);
                    printf("Element %ld has %ld neighbors. More than the maximum of %ld. Truncating.\n", ngp_mesh.identifier(elem), total_num_neighbors, MAX_CELL_NUM_NEIGHBORS);
                    total_num_neighbors = MAX_CELL_NUM_NEIGHBORS;
                }

                // Set the element neighbors
                ngp_element_num_neighbors_field(elem_index, 0) = total_num_neighbors;
                for (size_t i = 0; i < total_num_neighbors; ++i) {
                    ngp_element_neighbors_field(elem_index, i) = (double)node_neighbors[i];
                }
            });
    }

    std::map<std::string, double> GetNumNeighborStats(const aperi::FieldDataRank &rank) {
        // Initialize the min and max values
        double max_num_neighbors = 0;
        double min_num_neighbors = std::numeric_limits<double>::max();
        double total_num_neighbors = 0;
        double num_entities = 0;
        int reserved_memory = 0;
        NgpDoubleField ngp_num_neighbors_field;

        stk::topology::rank_t rank_type;
        if (rank == aperi::FieldDataRank::ELEMENT) {
            num_entities = GetNumOwnedElements();
            ngp_num_neighbors_field = *m_ngp_element_num_neighbors_field;
            rank_type = stk::topology::ELEMENT_RANK;
            reserved_memory = MAX_CELL_NUM_NEIGHBORS;
        } else if (rank == aperi::FieldDataRank::NODE) {
            num_entities = GetNumOwnedNodes();
            ngp_num_neighbors_field = *m_ngp_node_num_neighbors_field;
            rank_type = stk::topology::NODE_RANK;
            reserved_memory = MAX_NODE_NUM_NEIGHBORS;
        } else {
            throw std::runtime_error("Invalid rank type. Must be aperi::FieldDataRank::ELEMENT or aperi::FieldDataRank::NODE.");
        }

        FastMeshIndicesViewType entity_indices = GetLocalEntityIndices(rank_type, m_owned_selector);

        // Use Kokkos::parallel_reduce to calculate the min, max, and sum in parallel
        Kokkos::parallel_reduce(
            "calculate_stats",
            num_entities,
            KOKKOS_LAMBDA(int i, double &max_num_neighbors, double &min_num_neighbors, double &total_num_neighbors) {
                stk::mesh::EntityFieldData<double> num_neighbors_field = ngp_num_neighbors_field(entity_indices(i));
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
        std::map<std::string, double> node_stats = GetNumNeighborStats(aperi::FieldDataRank::NODE);

        aperi::CoutP0() << "Node Stats: " << std::endl;
        aperi::CoutP0() << "    Total Num Nodes: " << node_stats["num_entities"] << std::endl;
        aperi::CoutP0() << "  Max Num Neighbors: " << node_stats["max_num_neighbors"] << std::endl;
        aperi::CoutP0() << "  Min Num Neighbors: " << node_stats["min_num_neighbors"] << std::endl;
        aperi::CoutP0() << "  Avg Num Neighbors: " << node_stats["avg_num_neighbors"] << std::endl;
        aperi::CoutP0() << "  Reserved Memory Utilization: " << node_stats["reserved_memory_utilization"] << "%" << std::endl
                        << std::endl;  // Add a new line for readability

        // Element
        std::map<std::string, double> element_stats = GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);

        aperi::CoutP0() << "Element Stats: " << std::endl;
        aperi::CoutP0() << "  Total Num Elements: " << element_stats["num_entities"] << std::endl;
        aperi::CoutP0() << "   Max Num Neighbors: " << element_stats["max_num_neighbors"] << std::endl;
        aperi::CoutP0() << "   Min Num Neighbors: " << element_stats["min_num_neighbors"] << std::endl;
        aperi::CoutP0() << "   Avg Num Neighbors: " << element_stats["avg_num_neighbors"] << std::endl;
        aperi::CoutP0() << "   Reserved Memory Utilization: " << element_stats["reserved_memory_utilization"] << "%" << std::endl
                        << std::endl;  // Add a new line for readability
    }

    void MarkAndSyncFieldsToHost() {
        m_ngp_node_neighbors_field->modify_on_device();
        m_ngp_node_num_neighbors_field->modify_on_device();
        m_ngp_kernel_radius_field->modify_on_device();
        m_ngp_element_neighbors_field->modify_on_device();
        m_ngp_element_num_neighbors_field->modify_on_device();
        m_ngp_node_neighbors_field->sync_to_host();
        m_ngp_node_num_neighbors_field->sync_to_host();
        m_ngp_kernel_radius_field->sync_to_host();
        m_ngp_element_neighbors_field->sync_to_host();
        m_ngp_element_num_neighbors_field->sync_to_host();
    }

    void MarkAndSyncFieldsToDevice() {
        m_ngp_node_neighbors_field->modify_on_host();
        m_ngp_node_num_neighbors_field->modify_on_host();
        m_ngp_kernel_radius_field->modify_on_host();
        m_ngp_element_neighbors_field->modify_on_host();
        m_ngp_element_num_neighbors_field->modify_on_host();
        m_ngp_node_neighbors_field->sync_to_device();
        m_ngp_node_num_neighbors_field->sync_to_device();
        m_ngp_kernel_radius_field->sync_to_device();
        m_ngp_element_neighbors_field->sync_to_device();
        m_ngp_element_num_neighbors_field->sync_to_device();
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

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;       // The mesh data object.
    std::vector<std::string> m_sets;                    // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                   // The bulk data object.
    stk::mesh::Selector m_selector;                     // The selector
    stk::mesh::Selector m_owned_selector;               // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                      // The ngp mesh object.
    DoubleField *m_coordinates_field;                   // The coordinates field
    DoubleField *m_node_num_neighbors_field;            // The number of neighbors field
    DoubleField *m_node_neighbors_field;                // The neighbors field
    DoubleField *m_element_num_neighbors_field;         // The number of neighbors field
    DoubleField *m_element_neighbors_field;             // The neighbors field
    DoubleField *m_kernel_radius_field;                 // The kernel radius field
    NgpDoubleField *m_ngp_coordinates_field;            // The ngp coordinates field
    NgpDoubleField *m_ngp_node_num_neighbors_field;     // The ngp number of neighbors field
    NgpDoubleField *m_ngp_node_neighbors_field;         // The ngp neighbors field
    NgpDoubleField *m_ngp_element_num_neighbors_field;  // The ngp number of neighbors field
    NgpDoubleField *m_ngp_element_neighbors_field;      // The ngp neighbors field
    NgpDoubleField *m_ngp_kernel_radius_field;          // The ngp kernel radius field
};

class FunctionValueStorageProcessor {
    typedef stk::mesh::Field<double> DoubleField;  // TODO(jake): Change these to unsigned. Need to update FieldData to handle.
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    FunctionValueStorageProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the number of neighbors field
        m_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbors_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the function values field
        m_function_values_field = StkGetField(FieldQueryData{"function_values", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_function_values_field);

        // Get the kernel radius field
        m_kernel_radius_field = StkGetField(FieldQueryData{"kernel_radius", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_kernel_radius_field = &stk::mesh::get_updated_ngp_field<double>(*m_kernel_radius_field);
    }

    template <size_t NumNodes, typename FunctionFunctor>
    void compute_and_store_function_values(FunctionFunctor &function_functor) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_neighbors_field = *m_ngp_num_neighbors_field;
        auto ngp_neighbors_field = *m_ngp_neighbors_field;
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_function_values_field = *m_ngp_function_values_field;
        auto npg_kernel_radius_field = *m_ngp_kernel_radius_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of neighbors
                double num_neighbors = ngp_num_neighbors_field(node_index, 0);

                Eigen::Matrix<double, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = ngp_coordinates_field(node_index, j);
                }

                Eigen::Matrix<double, NumNodes, 3> shifted_neighbor_coordinates;
                Eigen::Matrix<double, NumNodes, 1> kernel_values;
                for (size_t i = 0; i < num_neighbors; ++i) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_neighbors_field(node_index, i));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);
                    // Get the neighbor's coordinates
                    for (size_t j = 0; j < 3; ++j) {
                        shifted_neighbor_coordinates(i, j) = coordinates(0, j) - ngp_coordinates_field(neighbor_index, j);
                    }
                    // Get the neighbor's kernel radius
                    double kernel_radius = npg_kernel_radius_field(neighbor_index, 0);
                    // Compute the kernel value
                    kernel_values(i, 0) = aperi::ComputeKernel(shifted_neighbor_coordinates.row(i), kernel_radius);
                }

                // Compute the function values
                Eigen::Matrix<double, NumNodes, 1> function_values = function_functor.values(kernel_values, shifted_neighbor_coordinates, num_neighbors);

                for (size_t i = 0; i < num_neighbors; ++i) {
                    ngp_function_values_field(node_index, i) = function_values(i, 0);
                }
            });
    }

    void MarkAndSyncFieldsToHost() {
        m_ngp_function_values_field->modify_on_device();
        m_ngp_function_values_field->sync_to_host();
    }

    void MarkAndSyncFieldsToDevice() {
        m_ngp_function_values_field->modify_on_host();
        m_ngp_function_values_field->modify_on_host();
    }

    void CommunicateAllFieldData() const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_function_values_field});
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_owned_selector;          // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
    DoubleField *m_num_neighbors_field;            // The number of neighbors field
    DoubleField *m_neighbors_field;                // The neighbors field
    DoubleField *m_coordinates_field;              // The coordinates field
    DoubleField *m_function_values_field;          // The function values field
    DoubleField *m_kernel_radius_field;            // The kernel radius field
    NgpDoubleField *m_ngp_num_neighbors_field;     // The ngp number of neighbors field
    NgpDoubleField *m_ngp_neighbors_field;         // The ngp neighbors field
    NgpDoubleField *m_ngp_coordinates_field;       // The ngp coordinates field
    NgpDoubleField *m_ngp_function_values_field;   // The ngp function values field
    NgpDoubleField *m_ngp_kernel_radius_field;     // The ngp kernel radius field
};

template <size_t NumFields>
class ValueFromGeneralizedFieldProcessor {
    typedef stk::mesh::Field<double> DoubleField;  // TODO(jake): Change these to unsigned. Need to update FieldData to handle.
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    ValueFromGeneralizedFieldProcessor(const std::array<FieldQueryData, NumFields> source_field_query_data, const std::array<FieldQueryData, NumFields> destination_field_query_data, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the number of neighbors field
        m_num_neighbors_field = StkGetField(FieldQueryData{"num_neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData{"neighbors", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<double>(*m_neighbors_field);

        // Get the function values field
        m_function_values_field = StkGetField(FieldQueryData{"function_values", FieldQueryState::None, FieldDataRank::NODE}, meta_data);
        m_ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_function_values_field);

        // Get the source (generalized) and destination fields
        for (size_t i = 0; i < NumFields; ++i) {
            m_source_fields.push_back(StkGetField(source_field_query_data[i], meta_data));
            m_ngp_source_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_source_fields.back());
            m_destination_fields.push_back(StkGetField(destination_field_query_data[i], meta_data));
            m_ngp_destination_fields[i] = &stk::mesh::get_updated_ngp_field<double>(*m_destination_fields.back());
        }
    }

    void compute_value_from_generalized_field() {
        // destination_fields(i) = /sum_{j=0}^{num_neighbors} source_fields(neighbors(i, j)) * function_values(i, j)

        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_neighbors_field = *m_ngp_num_neighbors_field;
        auto ngp_neighbors_field = *m_ngp_neighbors_field;
        auto ngp_function_values_field = *m_ngp_function_values_field;
        Kokkos::Array<NgpDoubleField, NumFields> ngp_source_fields;
        Kokkos::Array<NgpDoubleField, NumFields> ngp_destination_fields;
        for (size_t i = 0; i < NumFields; i++) {
            ngp_source_fields[i] = *m_ngp_source_fields[i];
            ngp_destination_fields[i] = *m_ngp_destination_fields[i];
        }

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of neighbors
                double num_neighbors = ngp_num_neighbors_field(node_index, 0);

                const int num_components = 3;  // Hardcoded 3 (vector field) for now. TODO(jake): Make this more general

                // If there are no neighbors, set the destination field to the source field
                if (num_neighbors == 0) {
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            ngp_destination_fields[i](node_index, j) = ngp_source_fields[i](node_index, j);
                        }
                    }
                } else {  // Zero out the destination field and prepare for the sum in the next loop
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            ngp_destination_fields[i](node_index, j) = 0.0;
                        }
                    }
                }

                // If there are neighbors, compute the destination field from the function values and source fields
                for (size_t k = 0; k < num_neighbors; ++k) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_neighbors_field(node_index, k));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);

                    // Get the function value
                    double function_value = ngp_function_values_field(node_index, k);

                    // Get the source field values
                    for (size_t i = 0; i < NumFields; ++i) {
                        for (size_t j = 0; j < num_components; ++j) {
                            double source_value = ngp_source_fields[i](neighbor_index, j);
                            ngp_destination_fields[i](node_index, j) += source_value * function_value;
                        }
                    }
                }
            });
    }

    // Marking modified
    void MarkDestinationFieldModifiedOnDevice(size_t field_index) {
        m_ngp_destination_fields[field_index]->clear_sync_state();
        m_ngp_destination_fields[field_index]->modify_on_device();
    }

    void MarkAllDestinationFieldsModifiedOnDevice() {
        for (size_t i = 0; i < NumFields; i++) {
            MarkDestinationFieldModifiedOnDevice(i);
        }
    }

    // Syncing
    void SyncDestinationFieldDeviceToHost(size_t field_index) {
        m_ngp_destination_fields[field_index]->sync_to_host();
    }

    void SyncAllDestinationFieldsDeviceToHost() {
        for (size_t i = 0; i < NumFields; i++) {
            SyncDestinationFieldDeviceToHost(i);
        }
    }

    // Parallel communication
    void CommunicateDestinationFieldData(int field_index) const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_destination_fields[field_index]});
    }

    void CommunicateAllDestinationFieldData() const {
        for (size_t i = 0; i < NumFields; i++) {
            CommunicateDestinationFieldData(i);
        }
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                         // The mesh data object.
    std::vector<std::string> m_sets;                                      // The sets to process.
    stk::mesh::BulkData *m_bulk_data;                                     // The bulk data object.
    stk::mesh::Selector m_selector;                                       // The selector
    stk::mesh::Selector m_owned_selector;                                 // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                                        // The ngp mesh object.
    DoubleField *m_num_neighbors_field;                                   // The number of neighbors field
    DoubleField *m_neighbors_field;                                       // The neighbors field
    DoubleField *m_function_values_field;                                 // The function values field
    NgpDoubleField *m_ngp_num_neighbors_field;                            // The ngp number of neighbors field
    NgpDoubleField *m_ngp_neighbors_field;                                // The ngp neighbors field
    NgpDoubleField *m_ngp_function_values_field;                          // The ngp function values field
    std::vector<DoubleField *> m_source_fields;                           // The fields to process
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_source_fields;       // The ngp fields to process
    std::vector<DoubleField *> m_destination_fields;                      // The fields to process
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_destination_fields;  // The ngp fields to process
};

}  // namespace aperi