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
        size_t expected_num_faces = (2U * m_num_elem_x * m_num_elem_y) + (2U * m_num_elem_x * m_num_elem_z) + (2U * m_num_elem_y * m_num_elem_z);
        size_t expected_num_elements = m_num_elem_x * m_num_elem_y * m_num_elem_z;
        EXPECT_EQ(expected_num_nodes, GetNumNodesInPart(*m_mesh_data, "block_1"));
        EXPECT_EQ(expected_num_faces, GetNumFacesInPart(*m_mesh_data, "block_1"));
        EXPECT_EQ(expected_num_elements, GetNumElementsInPart(*m_mesh_data, "block_1"));
    }

   protected:
    size_t m_num_elem_x = 1;
    size_t m_num_elem_y = 1;
    size_t m_num_elem_z = 1;

    std::shared_ptr<aperi::MeshData> m_mesh_data = nullptr;
};

TEST_F(SkinMeshTestFixture, SkinOneElement) {
    // Only run on one process
    MPI_Comm communicator = MPI_COMM_WORLD;
    int rank;
    MPI_Comm_rank(communicator, &rank);
    if (rank != 0) {
        GTEST_SKIP_("Test only runs on process 0.");
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
