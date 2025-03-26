#include <gtest/gtest.h>

#include <cstdlib>
#include <memory>
#include <string>
#include <vector>

#include "ConnectedEntityProcessor.h"
#include "FieldData.h"
#include "IoMesh.h"
#include "UnitTestUtils.h"

class ConnectedEntityProcessorFixture : public ::testing::Test {
   protected:
    void SetUp() override {
        // Get number of processors
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_procs);

        // Skip the test if there are more than 4 processors
        if (m_num_procs > 4) {
            GTEST_SKIP() << "Skipping test for more than 4 processors";
        }

        m_io_mesh_parameters = std::make_shared<aperi::IoMeshParameters>();
        m_io_mesh_parameters->compose_output = true;
        m_io_mesh_parameters->mesh_type = "generated";

        // We'll use a simple 1x2x4 hex mesh (8 elements with 8 nodes each)
        m_mesh_string = "1x2x4";
    }

    void CreateAndRun() {
        // Make a mesh
        m_io_mesh = CreateIoMesh(MPI_COMM_WORLD, *m_io_mesh_parameters);

        // Read the mesh
        m_io_mesh->ReadMesh(m_mesh_string, {"block_1"});

        // Complete initialization
        m_io_mesh->CompleteInitialization();
        m_mesh_data = m_io_mesh->GetMeshData();
    }

    std::shared_ptr<aperi::IoMeshParameters> m_io_mesh_parameters;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::string m_mesh_string;
    int m_num_procs;
};

// Test that ConnectedEntityProcessor correctly identifies the right number of nodes per element
TEST_F(ConnectedEntityProcessorFixture, TestCheckNumNodes) {
    CreateAndRun();

    // Check that the mesh was created correctly
    ASSERT_NE(m_mesh_data, nullptr);
    EXPECT_EQ(GetNumElementsInPart(*m_mesh_data, "block_1"), 8);
    EXPECT_EQ(GetNumNodesInPart(*m_mesh_data, "block_1"), 30);

    // Create an ConnectedEntityProcessor with 8 nodes (hex elements)
    aperi::ConnectedEntityProcessor<8> processor(m_mesh_data, {"block_1"});

    // This should pass because hex elements have 8 nodes
    EXPECT_TRUE(processor.CheckNumEntities(8)) << "CheckNumEntities failed for 8 nodes";

    // This should also pass as we're allowing more nodes than needed
    EXPECT_TRUE(processor.CheckNumEntities(10)) << "CheckNumEntities failed for 10 nodes";
}

// Test the ForEachElementAndNodes method
TEST_F(ConnectedEntityProcessorFixture, TestForEachElementAndNodes) {
    CreateAndRun();

    // Create an ConnectedEntityProcessor with 8 nodes (hex elements)
    aperi::ConnectedEntityProcessor<8> processor(m_mesh_data, {"block_1"});

    // Create a counter to keep track of the number of elements processed
    int element_count = 0;
    int total_node_count = 0;

    // Create a host-side callback to count elements and nodes
    auto count_elements_and_nodes = [&](const aperi::Index& elem_index,
                                        const Kokkos::Array<aperi::Index, 8>& node_indices,
                                        const size_t num_nodes) {
        element_count++;
        total_node_count += num_nodes;
    };

    // Process the elements
    processor.ForEachElementAndNodes(count_elements_and_nodes);

    // Should have processed 8 elements with 8 nodes each
    EXPECT_EQ(element_count, 8) << "Incorrect number of elements processed";
    EXPECT_EQ(total_node_count, 64) << "Incorrect total number of nodes processed";

    // Verify that GetMeshData and GetSets return the expected values
    EXPECT_EQ(processor.GetMeshData(), m_mesh_data);
    EXPECT_EQ(processor.GetSets(), std::vector<std::string>({"block_1"}));
}
