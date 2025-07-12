#include <mpi.h>

#include <memory>
#include <stk_io/FillMesh.hpp>
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_topology/topology.hpp>

#include "gtest/gtest.h"
#include "stk_mesh/base/CreateFaces.hpp"
#include "stk_tools/mesh_tools/DisjointSet.hpp"
#include "stk_tools/mesh_tools/EntityDisconnectTool.hpp"

class CellDisconnectTestFixture : public ::testing::Test {
   protected:
    void SetUp() override {
        if (stk::parallel_machine_size(MPI_COMM_WORLD) > 1) {
            GTEST_SKIP_("Test only runs in serial");
        }
    }

    void TearDown() override {
    }

    // Function to get interior and exterior faces
    void GetInteriorAndExteriorFaces(stk::mesh::BulkData *bulk, const stk::mesh::Selector &selector,
                                     stk::mesh::EntityVector &interior_faces, stk::mesh::EntityVector &exterior_faces) {
        // Get the interior and exterior faces
        interior_faces.clear();
        exterior_faces.clear();

        // Loop over all the faces and check if they are connected to two elements
        for (stk::mesh::Bucket *bucket : selector.get_buckets(stk::topology::FACE_RANK)) {
            for (stk::mesh::Entity face : *bucket) {
                if (bulk->get_connected_entities(face, stk::topology::ELEMENT_RANK).size() == 2U) {
                    interior_faces.push_back(face);
                } else {
                    exterior_faces.push_back(face);
                }
            }
        }
    }

    void RunDisconnectTest(int num_elems_x, int num_elems_y, int num_elems_z) {
        stk::mesh::MeshBuilder builder(MPI_COMM_WORLD);
        std::shared_ptr<stk::mesh::BulkData> bulk = builder.create();
        stk::mesh::MetaData &meta_data = bulk->mesh_meta_data();

        std::string mesh_spec = "generated:" + std::to_string(num_elems_x) + "x" + std::to_string(num_elems_y) + "x" + std::to_string(num_elems_z);

        std::cout << "Running disconnect test with mesh spec: " << mesh_spec << std::endl;

        stk::io::fill_mesh(mesh_spec, *bulk);
        stk::mesh::create_faces(*bulk);

        // Universal part selector
        stk::mesh::Selector selector = meta_data.universal_part() & meta_data.locally_owned_part();

        stk::mesh::EntityVector interior_faces;
        stk::mesh::EntityVector exterior_faces;
        GetInteriorAndExteriorFaces(bulk.get(), selector, interior_faces, exterior_faces);

        int expected_num_interior_faces = num_elems_x * num_elems_y * (num_elems_z - 1) + num_elems_x * (num_elems_y - 1) * num_elems_z + (num_elems_x - 1) * num_elems_y * num_elems_z;
        EXPECT_EQ(interior_faces.size(), expected_num_interior_faces);

        int expected_num_exterior_faces = 2 * (num_elems_x * num_elems_y + num_elems_x * num_elems_z + num_elems_y * num_elems_z);
        EXPECT_EQ(exterior_faces.size(), expected_num_exterior_faces);

        stk::experimental::EntityDisconnectTool disconnecter(*bulk, interior_faces);
        disconnecter.determine_new_nodes();
        disconnecter.modify_mesh();

        GetInteriorAndExteriorFaces(bulk.get(), selector, interior_faces, exterior_faces);
        EXPECT_EQ(interior_faces.size(), 0);
        EXPECT_EQ(exterior_faces.size(), expected_num_exterior_faces + expected_num_interior_faces * 2);  // Each interior face should have been disconnected, creating two new exterior faces for each original interior face
    }

    int rank;
    int num_procs;
};

TEST_F(CellDisconnectTestFixture, CellDisconnectTest) {
    std::vector<int> num_elems_x_values = {1, 2, 3, 4, 5};
    std::vector<int> num_elems_y_values = {1, 2, 3, 4, 5};
    std::vector<int> num_elems_z_values = {1, 2, 3, 4, 5};
    for (int num_elems_x : num_elems_x_values)
        for (int num_elems_y : num_elems_y_values)
            for (int num_elems_z : num_elems_z_values)
                if (num_elems_x > 0 && num_elems_y > 0 && num_elems_z > 0)
                    RunDisconnectTest(num_elems_x, num_elems_y, num_elems_z);
}
