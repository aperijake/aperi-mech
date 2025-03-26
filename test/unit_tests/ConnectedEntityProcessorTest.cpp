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
        m_io_mesh_parameters->aura_option = true;
        m_io_mesh_parameters->mesh_type = "generated";

        // We'll use a simple 1x2x4 hex mesh (8 elements with 8 nodes each)
        m_mesh_string = "1x2x4";
    }

    void CreateMesh() {
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

// Test the ForEachElementAndConnectedNodes method
TEST_F(ConnectedEntityProcessorFixture, TestForEachElementAndConnectedNodes) {
    CreateMesh();

    // Create an ConnectedEntityProcessor
    aperi::ConnectedEntityProcessor processor(m_mesh_data, {"block_1"});

    // Verify that GetMeshData and GetSets return the expected values
    EXPECT_EQ(processor.GetMeshData(), m_mesh_data);
    EXPECT_EQ(processor.GetSets(), std::vector<std::string>({"block_1"}));

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
    processor.ForEachElementAndConnectedNodes<8>(count_elements_and_nodes);

    int global_element_count = 0;
    int global_node_count = 0;

    // Use MPI to sum the counts across all processes
    MPI_Allreduce(&element_count, &global_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&total_node_count, &global_node_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);

    // Should have processed 8 elements with 8 nodes each
    EXPECT_EQ(global_element_count, 8) << "Incorrect number of elements processed";
    EXPECT_EQ(global_node_count, 64) << "Incorrect total number of nodes processed";
}

// Test the ForEachElementAndConnectedFaces method
TEST_F(ConnectedEntityProcessorFixture, TestForEachElementAndConnectedFaces) {
    CreateMesh();

    // Create an ConnectedEntityProcessor
    aperi::ConnectedEntityProcessor processor(m_mesh_data, {"block_1"});

    // Verify that GetMeshData and GetSets return the expected values
    EXPECT_EQ(processor.GetMeshData(), m_mesh_data);
    EXPECT_EQ(processor.GetSets(), std::vector<std::string>({"block_1"}));

    // Create a counter to keep track of the number of elements processed
    int element_count = 0;
    int total_face_count = 0;
    int total_face_node_count = 0;
    int total_face_element_count = 0;

    // Create a host-side callback to count elements and faces
    auto count_elements_and_faces = [&](const aperi::Index& elem_index,
                                        const Kokkos::Array<aperi::Index, 6>& face_indices,
                                        const size_t num_faces) {
        element_count++;
        total_face_count += num_faces;
        // For each face, we can get the connected nodes and elements
        for (size_t i = 0; i < num_faces; ++i) {
            Kokkos::Array<aperi::Index, 4> face_nodes;
            size_t num_nodes = processor.GetFaceNodes(face_indices[i], face_nodes);
            total_face_node_count += num_nodes;

            Kokkos::Array<aperi::Index, 2> face_elements;
            size_t num_elements = processor.GetFaceElements(face_indices[i], face_elements);
            total_face_element_count += num_elements;
        }
    };

    // Process the elements
    processor.ForEachElementAndConnectedFaces<6>(count_elements_and_faces);

    int global_element_count = 0;
    int global_face_count = 0;
    int global_face_node_count = 0;
    int global_face_element_count = 0;

    // Use MPI to sum the counts across all processes
    MPI_Allreduce(&element_count, &global_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&total_face_count, &global_face_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&total_face_node_count, &global_face_node_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&total_face_element_count, &global_face_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);

    // Should have processed 8 elements with 6 faces each
    EXPECT_EQ(global_element_count, 8) << "Incorrect number of elements processed";                   // As set in the test, 1x2x4 mesh
    EXPECT_EQ(global_face_count, 48) << "Incorrect total number of faces processed";                  // 6 * num_elements
    EXPECT_EQ(global_face_node_count, 192) << "Incorrect total number of face nodes processed";       // 4 * num_faces
    EXPECT_EQ(global_face_element_count, 68) << "Incorrect total number of face elements processed";  // (48-28) * 2 + 28, 28 is the number of external faces
}