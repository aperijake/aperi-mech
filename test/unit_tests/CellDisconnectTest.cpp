#include <gtest/gtest.h>
#include <mpi.h>

#include <memory>
#include <stk_tools/mesh_tools/EntityDisconnectTool.hpp>

#include "CellDisconnectUtils.h"
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
        AddFieldsAndCreateMeshLabeler();
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

        std::string mesh_spec = std::to_string(num_nodes_x) + "x" + std::to_string(num_nodes_y) + "x" + std::to_string(num_nodes_z);

        unsigned expected_num_interior_faces = m_num_elements_x * m_num_elements_y * (m_num_elements_z - 1) +
                                               m_num_elements_x * (m_num_elements_y - 1) * m_num_elements_z +
                                               (m_num_elements_x - 1) * m_num_elements_y * m_num_elements_z;

        unsigned expected_num_interior_cell_faces = expected_num_interior_faces - (num_nodes_x - 2) * m_num_elements_y * m_num_elements_z - (num_nodes_y - 2) * m_num_elements_x * m_num_elements_z - (num_nodes_z - 2) * m_num_elements_x * m_num_elements_y;

        EXPECT_EQ(interior_faces.size(), expected_num_interior_cell_faces) << " for mesh: " << mesh_spec;

        unsigned expected_num_exterior_faces =
            2 * (m_num_elements_x * m_num_elements_y + m_num_elements_x * m_num_elements_z + m_num_elements_y * m_num_elements_z);
        EXPECT_EQ(exterior_faces.size(), expected_num_exterior_faces) << " for mesh: " << mesh_spec;

        aperi::DisconnectCells(m_mesh_data, {});

        GetInteriorAndExteriorCellFaces(*m_mesh_data, selector, interior_faces, exterior_faces);
        EXPECT_EQ(interior_faces.size(), 0U) << " for mesh: " << mesh_spec;
        // Each interior face should have been disconnected, creating two new exterior faces for each original interior face
        EXPECT_EQ(exterior_faces.size(), expected_num_exterior_faces + expected_num_interior_cell_faces * 2U) << " for mesh: " << mesh_spec;
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

        auto *p_bulk = m_mesh_data->GetBulkData();
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
    aperi::MakeDisconnectedViewForDebugging(m_mesh_data, {}, 0.5);

    // Write the mesh to a file for debugging
    // m_io_mesh->CreateFieldResultsFile("disconnected_view.exo");
    // m_io_mesh->WriteFieldResults(0.0);
    // m_io_mesh->CloseFieldResultsFile();
}
