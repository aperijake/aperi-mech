// Copyright 2002 - 2008, 2010, 2011 National Technology Engineering // Solutions of Sandia, LLC (NTESS). Under the terms of Contract // DE-NA0003525 with NTESS, the U.S. Government retains certain rights // in this software.
//
// Redistribution and use in source and binary forms, with or without // modification, are permitted provided that the following conditions are // met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//
//     * Neither the name of NTESS nor the names of its contributors
//       may be used to endorse or promote products derived from this
//       software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS // "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT // LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR // A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT // OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, // SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT // LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, // DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY // THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT // (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE // OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
#include <gtest/gtest.h>
#include <stk_util/stk_config.h>

#include <stk_io/FillMesh.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Comm.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_search/CoarseSearch.hpp>
#include <stk_util/parallel/Parallel.hpp>

using ExecSpace = stk::ngp::ExecSpace;
using ElemIdentProc = stk::search::IdentProc<unsigned, int>;
using NodeIdentProc = stk::search::IdentProc<stk::mesh::EntityId, int>;
using SphereIdentProc = stk::search::BoxIdentProc<stk::search::Sphere<double>, ElemIdentProc>;
using PointIdentProc = stk::search::BoxIdentProc<stk::search::Point<double>, NodeIdentProc>;
using Intersection = stk::search::IdentProcIntersection<ElemIdentProc, NodeIdentProc>;

using DomainViewType = Kokkos::View<SphereIdentProc*, ExecSpace>;
using RangeViewType = Kokkos::View<PointIdentProc*, ExecSpace>;
using ResultViewType = Kokkos::View<Intersection*, ExecSpace>;

using FastMeshIndicesViewType = Kokkos::View<stk::mesh::FastMeshIndex*, ExecSpace>;

constexpr unsigned k_max_num_neighbors = 16;  // we're only expecting 8 per element

FastMeshIndicesViewType GetLocalIndices(const stk::mesh::BulkData& mesh, stk::mesh::EntityRank rank) {
    const stk::mesh::MetaData& meta = mesh.mesh_meta_data();
    std::vector<stk::mesh::Entity> local_entities;
    stk::mesh::get_entities(mesh, rank, meta.locally_owned_part(), local_entities);

    FastMeshIndicesViewType mesh_indices("meshIndices", local_entities.size());
    FastMeshIndicesViewType::HostMirror host_mesh_indices = Kokkos::create_mirror_view(Kokkos::WithoutInitializing, mesh_indices);

    for (size_t i = 0; i < local_entities.size(); ++i) {
        const stk::mesh::MeshIndex& mesh_index = mesh.mesh_index(local_entities[i]);
        host_mesh_indices(i) = stk::mesh::FastMeshIndex{mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal};
    }

    Kokkos::deep_copy(mesh_indices, host_mesh_indices);
    return mesh_indices;
}

DomainViewType CreateElemSpheres(const stk::mesh::BulkData& mesh, double radius) {
    const stk::mesh::MetaData& meta = mesh.mesh_meta_data();
    const unsigned num_local_elems = stk::mesh::count_entities(mesh, stk::topology::ELEM_RANK, meta.locally_owned_part());
    DomainViewType elemSpheres("elemSpheres", num_local_elems);

    const stk::mesh::FieldBase* p_coord_field = meta.coordinate_field();
    const stk::mesh::NgpField<double>& ngpCoords = stk::mesh::get_updated_ngp_field<double>(*p_coord_field);
    const stk::mesh::NgpMesh& ngpMesh = stk::mesh::get_updated_ngp_mesh(mesh);

    FastMeshIndicesViewType elemIndices = GetLocalIndices(mesh, stk::topology::ELEM_RANK);
    const int myRank = mesh.parallel_rank();

    Kokkos::parallel_for(
        stk::ngp::DeviceRangePolicy(0, num_local_elems), KOKKOS_LAMBDA(const unsigned& i) {
      stk::mesh::ConnectedNodes nodes = ngpMesh.get_nodes(stk::topology::ELEM_RANK, elemIndices(i));
      stk::search::Point<double> center(0,0,0);
      for(unsigned i=0; i<nodes.size(); ++i) {
        stk::mesh::FastMeshIndex node_index = ngpMesh.fast_mesh_index(nodes[i]);
        stk::mesh::EntityFieldData<double> coords = ngpCoords(node_index);
        center[0] += coords[0];
        center[1] += coords[1];
        center[2] += coords[2];
      }

      center[0] /= nodes.size();
      center[1] /= nodes.size();
      center[2] /= nodes.size();

      stk::mesh::Entity elem_entity = ngpMesh.get_entity(stk::topology::ELEM_RANK, elemIndices(i));
      elemSpheres(i) = SphereIdentProc{stk::search::Sphere<double>(center, radius), ElemIdentProc(elem_entity.local_offset(), myRank)}; });

    return elemSpheres;
}

RangeViewType CreateNodePoints(const stk::mesh::BulkData& mesh) {
    const stk::mesh::MetaData& meta = mesh.mesh_meta_data();
    const unsigned num_local_nodes = stk::mesh::count_entities(mesh, stk::topology::NODE_RANK, meta.locally_owned_part());
    RangeViewType nodePoints("nodePoints", num_local_nodes);

    const stk::mesh::FieldBase* p_coord_field = meta.coordinate_field();
    const stk::mesh::NgpField<double>& ngpCoords = stk::mesh::get_updated_ngp_field<double>(*p_coord_field);
    const stk::mesh::NgpMesh& ngpMesh = stk::mesh::get_updated_ngp_mesh(mesh);

    // Slow host operation that is needed to get an index. There is plans to add this to the stk::mesh::NgpMesh.
    FastMeshIndicesViewType nodeIndices = GetLocalIndices(mesh, stk::topology::NODE_RANK);
    const int myRank = mesh.parallel_rank();

    Kokkos::parallel_for(
        stk::ngp::DeviceRangePolicy(0, num_local_nodes), KOKKOS_LAMBDA(const unsigned& i) {
      stk::mesh::EntityFieldData<double> coords = ngpCoords(nodeIndices(i));
      stk::mesh::Entity node = ngpMesh.get_entity(stk::topology::NODE_RANK, nodeIndices(i));
      nodePoints(i) = PointIdentProc{stk::search::Point<double>(coords[0], coords[1], coords[2]), NodeIdentProc(ngpMesh.identifier(node), myRank)}; });

    return nodePoints;
}

template <class ExecSpace>
void GhostNodeNeighborsToElements(stk::mesh::BulkData& mesh, const ResultViewType& searchResults, ExecSpace& execSpace) {
    ResultViewType::HostMirror host_search_results = Kokkos::create_mirror_view_and_copy(execSpace, searchResults);

    mesh.modification_begin();
    stk::mesh::Ghosting& neighbor_ghosting = mesh.create_ghosting("neighbors");
    std::vector<stk::mesh::EntityProc> nodes_to_ghost;

    const int my_rank = mesh.parallel_rank();

    for (size_t i = 0; i < host_search_results.size(); ++i) {
        auto result = host_search_results(i);
        if (result.domainIdentProc.proc() != my_rank && result.rangeIdentProc.proc() == my_rank) {
            stk::mesh::Entity node = mesh.get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id());
            nodes_to_ghost.emplace_back(node, result.domainIdentProc.proc());
        }
    }

    mesh.change_ghosting(neighbor_ghosting, nodes_to_ghost);
    mesh.modification_end();
}

template <class ExecSpace>
void UnpackSearchResultsIntoField(stk::mesh::BulkData& mesh,
                                  stk::mesh::Field<unsigned>& neighborField,
                                  const ResultViewType& searchResults,
                                  ExecSpace& execSpace) {
    ResultViewType::HostMirror host_search_results = Kokkos::create_mirror_view_and_copy(execSpace, searchResults);

    const int my_rank = mesh.parallel_rank();

    for (size_t i = 0; i < host_search_results.size(); ++i) {
        auto result = host_search_results(i);
        if (result.domainIdentProc.proc() == my_rank) {
            stk::mesh::Entity elem(result.domainIdentProc.id());
            stk::mesh::Entity node = mesh.get_entity(stk::topology::NODE_RANK, result.rangeIdentProc.id());
            ASSERT_TRUE(mesh.is_valid(node));
            unsigned* p_neighbor_data = stk::mesh::field_data(neighborField, elem);
            unsigned& num_neighbors = p_neighbor_data[0];
            ASSERT_TRUE(num_neighbors < k_max_num_neighbors);
            p_neighbor_data[1 + num_neighbors] = node.local_offset();
            ++num_neighbors;
        }
    }
    neighborField.modify_on_host();
}

void Verify8NeighborsPerElement(const stk::mesh::BulkData& mesh,
                                const stk::mesh::Field<unsigned>& neighborField) {
    stk::mesh::for_each_entity_run(mesh, stk::topology::ELEM_RANK, mesh.mesh_meta_data().locally_owned_part(),
                                   [&](const stk::mesh::BulkData& /*bulk*/, stk::mesh::Entity elem) {
                                       const unsigned* p_neighbor_data = stk::mesh::field_data(neighborField, elem);
                                       EXPECT_EQ(8U, p_neighbor_data[0]);
                                   });
}

TEST(HowToNgpSearch, elemNodeNeighbors) {
    if (stk::parallel_machine_size(MPI_COMM_WORLD) > 4) {
        GTEST_SKIP();
    }

    std::unique_ptr<stk::mesh::BulkData> bulk_ptr = stk::mesh::MeshBuilder(MPI_COMM_WORLD)
                                                        .set_aura_option(stk::mesh::BulkData::NO_AUTO_AURA)
                                                        .set_spatial_dimension(3)
                                                        .create();
    stk::mesh::MetaData& meta = bulk_ptr->mesh_meta_data();
    meta.use_simple_fields();

    std::string mesh_spec("generated:4x4x4|bbox:-1,-1,-1,1,1,1");
    // std::string meshSpec("generated:1x1x2|bbox:0,0,0,0.5,0.5,1");
    const double radius = 0.5;  // elems are 0.5 cubes, so radius 0.5 should find 8 nodes per hex

    stk::mesh::Field<unsigned>& neighbor_field = meta.declare_field<unsigned>(stk::topology::ELEM_RANK, "nodeNeighbors");
    stk::mesh::put_field_on_mesh(neighbor_field, meta.universal_part(), k_max_num_neighbors + 1, nullptr);

    stk::io::fill_mesh(mesh_spec, *bulk_ptr);

    DomainViewType elem_spheres = CreateElemSpheres(*bulk_ptr, radius);
    RangeViewType node_points = CreateNodePoints(*bulk_ptr);

    const unsigned num_local_elems = stk::mesh::count_entities(*bulk_ptr, stk::topology::ELEM_RANK, meta.locally_owned_part());
    const unsigned num_local_owned_nodes = stk::mesh::count_entities(*bulk_ptr, stk::topology::NODE_RANK, meta.locally_owned_part());
    stk::mesh::Selector shared_and_owned = meta.globally_shared_part() & meta.locally_owned_part();
    const unsigned num_shared_and_owned_nodes = stk::mesh::count_entities(*bulk_ptr, stk::topology::NODE_RANK, shared_and_owned);

    EXPECT_EQ(elem_spheres.size(), num_local_elems);
    EXPECT_EQ(node_points.size(), num_local_owned_nodes);

    ResultViewType search_results;
    stk::search::SearchMethod search_method = stk::search::MORTON_LBVH;

    stk::ngp::ExecSpace exec_space = Kokkos::DefaultExecutionSpace{};
    const bool results_parallel_symmetry = true;

    stk::search::coarse_search(elem_spheres, node_points, search_method, bulk_ptr->parallel(), search_results, exec_space, results_parallel_symmetry);

    constexpr unsigned k_num_nodes_per_element = 8;
    unsigned expected_num_results = num_local_elems * k_num_nodes_per_element;
    if (results_parallel_symmetry) {
        EXPECT_GE(search_results.size(), expected_num_results + num_shared_and_owned_nodes);
    } else {
        EXPECT_EQ(search_results.size(), expected_num_results);
    }

    GhostNodeNeighborsToElements(*bulk_ptr, search_results, exec_space);

    UnpackSearchResultsIntoField(*bulk_ptr, neighbor_field, search_results, exec_space);

    Verify8NeighborsPerElement(*bulk_ptr, neighbor_field);
}