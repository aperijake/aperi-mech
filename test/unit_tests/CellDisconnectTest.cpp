#include <gtest/gtest.h>
#include <mpi.h>

#include <memory>
#include <stk_tools/mesh_tools/EntityDisconnectTool.hpp>

#include "CellDisconnect.h"
#include "GenerateNodalDomainTestFixture.h"

class CellDisconnectTestFixture : public GenerateNodalDomainTestFixture {
   protected:
    void ResetCellDisconnectTestFixture() {
        ResetGenerateNodalDomainTestFixture();
    }

    void RunCellDisconnectTest(int num_nodes_x, int num_nodes_y, int num_nodes_z) {
        ResetCellDisconnectTestFixture();
        m_num_nodes_x = num_nodes_x;
        m_num_nodes_y = num_nodes_y;
        m_num_nodes_z = num_nodes_z;
        CreateAndReadNodalMesh();

        std::vector<aperi::FieldData> field_data;
        std::vector<aperi::Unsigned> initial_values(1, aperi::UNSIGNED_MAX);
        field_data.emplace_back("node_disconnect_id", aperi::FieldDataRank::SCALAR, aperi::FieldDataTopologyRank::NODE, 1, initial_values);
        field_data.emplace_back("owning_element", aperi::FieldDataRank::SCALAR, aperi::FieldDataTopologyRank::NODE, 1, initial_values);

        AddFieldsAndCreateMeshLabeler(field_data);
        m_mesh_data = m_io_mesh->GetMeshData();
        LabelGeneratedNodalMesh(m_mesh_data, m_num_subcells, m_activate_center_node);
        ASSERT_TRUE(m_mesh_data != nullptr);

        // Expected total number of elements
        unsigned expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z;
        EXPECT_EQ(m_mesh_data->GetNumElements(), expected_num_elements);

        // Universal part selector
        aperi::Selector selector({}, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

        aperi::EntityVector interior_faces;
        aperi::EntityVector exterior_faces;

        GetInteriorAndExteriorCellFaces(*m_mesh_data, selector, interior_faces, exterior_faces);

        std::vector<std::pair<aperi::Index, std::vector<aperi::Unsigned>>> node_elements = GetNodeIndicesAndElements(*m_mesh_data, selector);
        std::vector<std::pair<aperi::Index, Eigen::Vector3d>> elements_and_centroids = GetElementIndicesAndCentroids(*m_mesh_data, selector);
        std::vector<std::pair<aperi::Unsigned, Eigen::Vector3d>> nodes_and_coordinates = GetNodeLocalOffsetsAndCoordinates(*m_mesh_data, selector);
        std::vector<std::pair<aperi::Unsigned, Eigen::Vector3d>> faces_and_centroids = GetFaceLocalOffsetsAndCentroids(*m_mesh_data, selector);

        std::string mesh_spec = std::to_string(num_nodes_x) + "x" + std::to_string(num_nodes_y) + "x" + std::to_string(num_nodes_z);

        unsigned expected_num_interior_faces = m_num_elements_x * m_num_elements_y * (m_num_elements_z - 1) +
                                               m_num_elements_x * (m_num_elements_y - 1) * m_num_elements_z +
                                               (m_num_elements_x - 1) * m_num_elements_y * m_num_elements_z;

        unsigned expected_num_interior_cell_faces = expected_num_interior_faces - (num_nodes_x - 2) * m_num_elements_y * m_num_elements_z - (num_nodes_y - 2) * m_num_elements_x * m_num_elements_z - (num_nodes_z - 2) * m_num_elements_x * m_num_elements_y;

        EXPECT_EQ(interior_faces.size(), expected_num_interior_cell_faces) << " for mesh: " << mesh_spec;

        unsigned expected_num_exterior_faces =
            2 * (m_num_elements_x * m_num_elements_y + m_num_elements_x * m_num_elements_z + m_num_elements_y * m_num_elements_z);
        EXPECT_EQ(exterior_faces.size(), expected_num_exterior_faces) << " for mesh: " << mesh_spec;

        // Disconnect the mesh
        aperi::CellDisconnect cell_disconnect(m_mesh_data, {});
        cell_disconnect.DisconnectCells();

        GetInteriorAndExteriorCellFaces(*m_mesh_data, selector, interior_faces, exterior_faces);

        std::vector<std::pair<aperi::Unsigned, Eigen::Vector3d>> new_nodes_and_coordinates = GetNodeLocalOffsetsAndCoordinates(*m_mesh_data, selector);
        std::vector<std::pair<aperi::Unsigned, Eigen::Vector3d>> new_faces_and_centroids = GetFaceLocalOffsetsAndCentroids(*m_mesh_data, selector);

        EXPECT_EQ(interior_faces.size(), 0U) << " for mesh: " << mesh_spec;
        // Each interior face should have been disconnected, creating two new exterior faces for each original interior face
        EXPECT_EQ(exterior_faces.size(), expected_num_exterior_faces + expected_num_interior_cell_faces * 2U) << " for mesh: " << mesh_spec;

        // Check that the element indices are the same after disconnection
        for (const auto& [index, centroid] : elements_and_centroids) {
            EXPECT_EQ(GetElementIndexAtCoordinates(*m_mesh_data, "block_1", centroid, true), index)
                << "Element index at centroid " << centroid.transpose() << " does not match expected index.";
        }

        // Check that the node local offsets are the same after disconnection, but more nodes may have been created (Index may change)
        EXPECT_GT(new_nodes_and_coordinates.size(), nodes_and_coordinates.size());
        // The original nodes should still be present
        for (const auto& [index, coord] : nodes_and_coordinates) {
            bool found = false;
            for (const auto& [new_index, new_coord] : new_nodes_and_coordinates) {
                if (index == new_index) {
                    EXPECT_TRUE(coord.isApprox(new_coord, 1e-6))
                        << "Node coordinates at index " << index << " do not match expected coordinates.";
                    found = true;
                    break;
                }
            }
            EXPECT_TRUE(found) << "Node index " << index << " not found after disconnection.";
        }

        // Check that the face local offsets are the same after disconnection, but more faces will have been created (Index may change)
        // The original faces should still be present
        EXPECT_GT(new_faces_and_centroids.size(), faces_and_centroids.size());
        for (const auto& [index, coord] : faces_and_centroids) {
            bool found = false;
            for (const auto& [new_index, new_coord] : new_faces_and_centroids) {
                if (index == new_index) {
                    EXPECT_TRUE(coord.isApprox(new_coord, 1e-6))
                        << "Face coordinates at index " << index << " do not match expected coordinates.";
                    found = true;
                    break;
                }
            }
            EXPECT_TRUE(found) << "Face index " << index << " not found after disconnection.";
        }

        aperi::FieldQueryData<aperi::Unsigned> node_disconnect_id_query_data({"node_disconnect_id", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
        EXPECT_TRUE(aperi::StkFieldExists(node_disconnect_id_query_data, m_mesh_data->GetMetaData()));
        // Get the node_disconnect_id field
        aperi::Field<aperi::Unsigned> node_disconnect_id_field(m_mesh_data, node_disconnect_id_query_data);

        // Check the node-element data.
        stk::mesh::BulkData* p_bulk = m_mesh_data->GetBulkData();
        // Loop through each node and check the connected elements
        for (stk::mesh::Bucket* p_bucket : selector().get_buckets(stk::topology::NODE_RANK)) {
            for (const stk::mesh::Entity& node : *p_bucket) {
                const stk::mesh::MeshIndex& mesh_index = p_bulk->mesh_index(node);
                aperi::Index node_index = aperi::Index(mesh_index.bucket->bucket_id(), mesh_index.bucket_ordinal);
                aperi::Unsigned node_id = node_disconnect_id_field(node_index, 0);
                // Get the connected elements for this node
                Kokkos::View<aperi::Unsigned*>::HostMirror connected_elements_host = cell_disconnect.GetNodeElementsHost(node_index);
                for (auto& node_element : node_elements) {
                    aperi::Unsigned new_node_id = node_disconnect_id_field(node_element.first, 0);
                    if (new_node_id == node_id) {
                        // Check that the connected elements match the original elements
                        EXPECT_EQ(connected_elements_host.extent(0), node_element.second.size());
                        for (size_t j = 0; j < connected_elements_host.extent(0); ++j) {
                            EXPECT_EQ(connected_elements_host(j), node_element.second[j]);
                        }
                        break;
                    }
                }
            }
        }
    }

    void RunElementDisconnectTest(int num_elems_x, int num_elems_y, int num_elems_z) {
        ResetCellDisconnectTestFixture();
        m_num_elements_x = num_elems_x;
        m_num_elements_y = num_elems_y;
        m_num_elements_z = num_elems_z;
        CreateIoMeshGenerated();
        m_mesh_data = m_io_mesh->GetMeshData();
        ASSERT_TRUE(m_mesh_data != nullptr);

        GenerateMesh(*m_io_mesh, *m_mesh_data, num_elems_x, num_elems_y, num_elems_z);

        // Universal part selector
        aperi::Selector selector({}, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

        aperi::EntityVector interior_faces;
        aperi::EntityVector exterior_faces;
        GetInteriorAndExteriorFaces(*m_mesh_data, selector, interior_faces, exterior_faces);

        std::string mesh_spec = std::to_string(num_elems_x) + "x" + std::to_string(num_elems_y) + "x" + std::to_string(num_elems_z);

        unsigned expected_num_interior_faces = num_elems_x * num_elems_y * (num_elems_z - 1) +
                                               num_elems_x * (num_elems_y - 1) * num_elems_z +
                                               (num_elems_x - 1) * num_elems_y * num_elems_z;
        EXPECT_EQ(interior_faces.size(), expected_num_interior_faces) << " for mesh: " << mesh_spec;

        unsigned expected_num_exterior_faces =
            2 * (num_elems_x * num_elems_y + num_elems_x * num_elems_z + num_elems_y * num_elems_z);
        EXPECT_EQ(exterior_faces.size(), expected_num_exterior_faces) << " for mesh: " << mesh_spec;

        auto* p_bulk = m_mesh_data->GetBulkData();
        stk::experimental::EntityDisconnectTool disconnecter(*p_bulk, interior_faces);
        disconnecter.determine_new_nodes();
        disconnecter.modify_mesh();

        GetInteriorAndExteriorFaces(*m_mesh_data, selector, interior_faces, exterior_faces);
        EXPECT_EQ(interior_faces.size(), 0U) << " for mesh: " << mesh_spec;
        // Each interior face should have been disconnected, creating two new exterior faces for each original interior face
        EXPECT_EQ(exterior_faces.size(),
                  expected_num_exterior_faces +
                      expected_num_interior_faces * 2U)
            << " for mesh: " << mesh_spec;
    }
};

TEST_F(CellDisconnectTestFixture, ElementDisconnectTest) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs in serial");
    }
    unsigned mesh_dims[] = {1U, 2U, 3U, 4U, 5U};
    for (unsigned x : mesh_dims) {
        for (unsigned y : mesh_dims) {
            for (unsigned z : mesh_dims) {
                RunElementDisconnectTest(x, y, z);
            }
        }
    }
}

TEST_F(CellDisconnectTestFixture, CellDisconnectTest) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs in serial");
    }
    unsigned mesh_dims[] = {2U, 3U, 4U};
    for (unsigned x : mesh_dims) {
        for (unsigned y : mesh_dims) {
            for (unsigned z : mesh_dims) {
                RunCellDisconnectTest(x, y, z);
            }
        }
    }
}

TEST_F(CellDisconnectTestFixture, MakeDisconnectedView) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs in serial");
    }
    RunCellDisconnectTest(3, 3, 3);
    aperi::CellDisconnect cell_disconnect(m_mesh_data, {"block_1"});
    cell_disconnect.MakeDisconnectedViewForDebugging(0.5);

    // Write the mesh to a file for debugging
    // m_io_mesh->CreateFieldResultsFile("disconnected_view.exo");
    // m_io_mesh->WriteFieldResults(0.0);
    // m_io_mesh->CloseFieldResultsFile();
}
