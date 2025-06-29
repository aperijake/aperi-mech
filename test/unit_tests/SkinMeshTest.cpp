#include <string>

#include "Selector.h"
#include "SkinMeshTestFixture.h"
#include "UnitTestUtils.h"

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

    // Split the mesh into two blocks
    SplitMesh();

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
