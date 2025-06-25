#include <string>

#include "IoMesh.h"
#include "IoMeshTestFixture.h"
#include "Selector.h"
#include "UnitTestUtils.h"

class SkinMeshTestFixture : public IoMeshTestFixture {
   protected:
    void SetUp() override {
        // Run IoMeshTestFixture::SetUp first
        IoMeshTestFixture::SetUp();
        // Create an IoMesh object with default parameters
        CreateIoMeshGenerated();
    }

    void TearDown() override {
        // Run IoMeshTestFixture::TearDown last
        IoMeshTestFixture::TearDown();
    }

    void CreateGeneratedMesh() {
        std::string mesh_string = "generated:" + std::to_string(m_num_elem_x) + "x" + std::to_string(m_num_elem_y) + "x" + std::to_string(m_num_elem_z);
        m_io_mesh->FillGeneratedMesh(mesh_string);
        m_mesh_data = m_io_mesh->GetMeshData();

        size_t expected_num_nodes = (1U + m_num_elem_x) * (1U + m_num_elem_y) * (1U + m_num_elem_z);
        size_t expected_num_faces = (m_num_elem_x * m_num_elem_y * (m_num_elem_z + 1)) +
                                    (m_num_elem_x * m_num_elem_z * (m_num_elem_y + 1)) +
                                    (m_num_elem_y * m_num_elem_z * (m_num_elem_x + 1));
        size_t expected_num_elements = m_num_elem_x * m_num_elem_y * m_num_elem_z;
        EXPECT_EQ(expected_num_nodes, GetNumNodesInPart(*m_mesh_data, "block_1"));
        EXPECT_EQ(expected_num_faces, GetNumFacesInPart(*m_mesh_data, "block_1"));
        EXPECT_EQ(expected_num_elements, GetNumElementsInPart(*m_mesh_data, "block_1"));
    }

    size_t m_num_elem_x = 1;
    size_t m_num_elem_y = 1;
    size_t m_num_elem_z = 1;

    std::shared_ptr<aperi::MeshData> m_mesh_data = nullptr;
};

TEST_F(SkinMeshTestFixture, SkinOneElement) {
    // Only run on one process
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }

    // Make a 1x1x1 mesh
    CreateGeneratedMesh();

    aperi::Selector all_entities({"block_1"}, m_mesh_data.get());

    m_mesh_data->DeclareFacePart("skin");
    m_mesh_data->AddPartToOutput("skin");
    m_mesh_data->CreateExposedBlockBoundarySides(all_entities, "skin");

    EXPECT_TRUE(m_mesh_data->CheckExposedBlockBoundarySides(all_entities, "skin"));
    EXPECT_EQ(6U, GetNumFacesInPart(*m_mesh_data, "skin"));
}

TEST_F(SkinMeshTestFixture, SkinManyElements) {
    // Only run on four processes or fewer
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }

    // Make a 2x2x5 mesh
    m_num_elem_x = 2;
    m_num_elem_y = 2;
    m_num_elem_z = 5;
    CreateGeneratedMesh();

    aperi::Selector all_entities({"block_1"}, m_mesh_data.get());

    m_mesh_data->DeclareFacePart("skin");
    m_mesh_data->AddPartToOutput("skin");
    m_mesh_data->CreateExposedBlockBoundarySides(all_entities, "skin");

    EXPECT_TRUE(m_mesh_data->CheckExposedBlockBoundarySides(all_entities, "skin"));
    EXPECT_EQ(48U, GetNumFacesInPart(*m_mesh_data, "skin"));
}

TEST_F(SkinMeshTestFixture, TwoBlocks) {
    // Only run on four processes or fewer
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }

    // Make a 2x2x7 mesh. Have to have plenty of elements in the z direction to split the mesh into two blocks in parallel.
    m_num_elem_x = 2;
    m_num_elem_y = 2;
    m_num_elem_z = 7;
    CreateGeneratedMesh();

    aperi::Selector all_entities({"block_1"}, m_mesh_data.get());

    m_mesh_data->DeclareFacePart("skin");
    m_mesh_data->AddPartToOutput("skin");
    m_mesh_data->CreateExposedBlockBoundarySides(all_entities, "skin");

    EXPECT_TRUE(m_mesh_data->CheckExposedBlockBoundarySides(all_entities, "skin"));
    EXPECT_EQ(64U, GetNumFacesInPart(*m_mesh_data, "skin"));

    // Now split the mesh into two blocks
    m_mesh_data->DeclareElementPart("block_2");
    m_mesh_data->AddPartToOutput("block_2");

    // Remove the midddle plane of elements in the z direction
    Eigen::Vector3d element_to_remove_coordinates(0.5, 0.5, static_cast<double>(m_num_elem_z) / 2.0);
    for (size_t i = 0; i < m_num_elem_x; ++i) {
        for (size_t j = 0; j < m_num_elem_y; ++j) {
            element_to_remove_coordinates[0] = static_cast<double>(i) + 0.5;
            element_to_remove_coordinates[1] = static_cast<double>(j) + 0.5;
            DeleteElementAtCoordinates(*m_mesh_data, "block_1", element_to_remove_coordinates, true);
        }
    }

    // Split the mesh into two blocks
    SplitMeshIntoTwoBlocks(*m_mesh_data, static_cast<double>(m_num_elem_z) / 2.0);

    // Check the number of elements in each block
    size_t expected_num_elements_in_each_block = m_num_elem_x * m_num_elem_y * ((m_num_elem_z - 1) / 2);
    EXPECT_EQ(expected_num_elements_in_each_block, GetNumElementsInPart(*m_mesh_data, "block_1"));
    EXPECT_EQ(expected_num_elements_in_each_block, GetNumElementsInPart(*m_mesh_data, "block_2"));

    // Check the number of faces in the skin part. It hasn't been re-skinned yet so it should still be the same as before minus the removed elements.
    EXPECT_EQ(56U, GetNumFacesInPart(*m_mesh_data, "skin"));

    // Now re-skin the mesh
    aperi::Selector new_all_entities({"block_1", "block_2"}, m_mesh_data.get());
    m_mesh_data->CreateExposedBlockBoundarySides(new_all_entities, "skin");
    EXPECT_EQ(64U, GetNumFacesInPart(*m_mesh_data, "skin"));
}
