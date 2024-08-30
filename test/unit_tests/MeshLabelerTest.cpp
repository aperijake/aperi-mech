#include <gtest/gtest.h>

#include <string>

#include "IoMeshTestFixture.h"
#include "MeshLabeler.h"
#include "UnitTestUtils.h"

class MeshLabelerTestFixture : public IoMeshTestFixture {
   protected:
    void SetUp() override {
        // Run IoMeshTestFixture::SetUp first
        IoMeshTestFixture::SetUp();

        // Create a mesh labeler
        m_mesh_labeler = aperi::CreateMeshLabeler();
    }

    void TearDown() override {
        // Run IoMeshTestFixture::TearDown last
        IoMeshTestFixture::TearDown();
    }

    void ReadThexMesh() {
        CreateIoMeshFile();
        std::string mesh_string = "test_inputs/thex.exo";
        m_io_mesh->ReadMesh(mesh_string, {"block_1"});
        std::vector<aperi::FieldData> field_data = m_mesh_labeler->GetFieldData();
        // Add fields to the mesh and complete initialization
        m_io_mesh->AddFields(field_data);
        m_io_mesh->CompleteInitialization();
        m_mesh_data = m_io_mesh->GetMeshData();
    }

    std::shared_ptr<aperi::MeshLabeler> m_mesh_labeler;  ///< The mesh labeler object
    std::shared_ptr<aperi::MeshData> m_mesh_data;        ///< The mesh data object
};

TEST_F(MeshLabelerTestFixture, CreateMeshLabeler) {
    // Check that the mesh labeler object is not null
    ASSERT_NE(m_mesh_labeler, nullptr);

    // Check that the field data is not empty
    std::vector<aperi::FieldData> field_data = m_mesh_labeler->GetFieldData();
    ASSERT_GT(field_data.size(), 0);
}

TEST_F(MeshLabelerTestFixture, CheckFieldsAreCreated) {
    ReadThexMesh();
    // Check the active node field
    auto active_nodes = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, uint64_t, 1>(*m_mesh_data, {"block_1"}, "active", aperi::FieldQueryState::None);
    ASSERT_EQ(active_nodes.rows(), 15);
    ASSERT_EQ(active_nodes.cols(), 1);

    for (int i = 0; i < active_nodes.size(); ++i) {
        EXPECT_EQ(active_nodes(i), 1);
    }
}