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
        m_io_mesh_parameters->add_faces = true;

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

struct ElementNodeCounter {
    Kokkos::View<int*> element_count;
    Kokkos::View<int*> total_node_count;

    ElementNodeCounter() : element_count("element_count", 1),
                           total_node_count("total_node_count", 1) {
        // Initialize to zero
        Kokkos::deep_copy(element_count, 0);
        Kokkos::deep_copy(total_node_count, 0);
    }

    KOKKOS_FUNCTION
    void operator()(const aperi::Index& elem_index,
                    const Kokkos::Array<aperi::Index, 8>& node_indices,
                    const size_t num_nodes) const {
        Kokkos::atomic_inc(&element_count(0));
        Kokkos::atomic_add(&total_node_count(0), num_nodes);
    }

    int GetElementCount() {
        // Create a host mirror of the view
        auto element_count_h = Kokkos::create_mirror_view(element_count);
        // Copy data from device to host
        Kokkos::deep_copy(element_count_h, element_count);
        // Return the host value
        return element_count_h(0);
    }

    int GetTotalNodeCount() {
        // Create a host mirror of the view
        auto total_node_count_h = Kokkos::create_mirror_view(total_node_count);
        // Copy data from device to host
        Kokkos::deep_copy(total_node_count_h, total_node_count);
        // Return the host value
        return total_node_count_h(0);
    }
};

struct ElementFaceCounter {
    aperi::ConnectedEntityProcessor processor;
    Kokkos::View<int*> element_count;
    Kokkos::View<int*> total_face_count;
    Kokkos::View<int*> total_face_node_count;
    Kokkos::View<int*> total_face_element_count;

    explicit ElementFaceCounter(const std::shared_ptr<aperi::MeshData>& mesh_data) : processor(mesh_data),
                                                                                     element_count("element_count", 1),
                                                                                     total_face_count("total_face_count", 1),
                                                                                     total_face_node_count("total_face_node_count", 1),
                                                                                     total_face_element_count("total_face_element_count", 1) {
        // Initialize to zero
        Kokkos::deep_copy(element_count, 0);
        Kokkos::deep_copy(total_face_count, 0);
        Kokkos::deep_copy(total_face_node_count, 0);
        Kokkos::deep_copy(total_face_element_count, 0);
    }

    KOKKOS_FUNCTION
    void operator()(const aperi::Index& /*elem_index*/,
                    const Kokkos::Array<aperi::Index, 6>& face_indices,
                    const size_t num_faces) const {
        Kokkos::atomic_inc(&element_count(0));
        Kokkos::atomic_add(&total_face_count(0), num_faces);

        // For each face, we can get the connected nodes and elements
        for (size_t i = 0; i < num_faces; ++i) {
            aperi::ConnectedEntities face_nodes = processor.GetFaceNodes(face_indices[i]);
            Kokkos::atomic_add(&total_face_node_count(0), face_nodes.size());

            aperi::ConnectedEntities face_elements = processor.GetFaceElements(face_indices[i]);
            Kokkos::atomic_add(&total_face_element_count(0), face_elements.size());
        }
    }

    // Getter methods that use host mirrors
    int GetElementCount() {
        auto host_view = Kokkos::create_mirror_view(element_count);
        Kokkos::deep_copy(host_view, element_count);
        return host_view(0);
    }

    int GetTotalFaceCount() {
        auto host_view = Kokkos::create_mirror_view(total_face_count);
        Kokkos::deep_copy(host_view, total_face_count);
        return host_view(0);
    }

    int GetTotalFaceNodeCount() {
        auto host_view = Kokkos::create_mirror_view(total_face_node_count);
        Kokkos::deep_copy(host_view, total_face_node_count);
        return host_view(0);
    }

    int GetTotalFaceElementCount() {
        auto host_view = Kokkos::create_mirror_view(total_face_element_count);
        Kokkos::deep_copy(host_view, total_face_element_count);
        return host_view(0);
    }
};

// Test the ForEachElementAndConnectedNodes method
TEST_F(ConnectedEntityProcessorFixture, TestForEachElementAndConnectedNodes) {
    CreateMesh();

    // Create an ConnectedEntityProcessor
    aperi::Selector selector({"block_1"}, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    aperi::ConnectedEntityProcessor processor(m_mesh_data);

    // Verify that GetMeshData returns the expected values
    EXPECT_EQ(processor.GetMeshData(), m_mesh_data);

    // Create the counter with a pointer to processor
    ElementNodeCounter counter;

    // Process the elements
    processor.ForEachElementAndConnectedNodes<8>(counter, selector);

    int global_element_count = 0;
    int global_node_count = 0;

    // Use MPI to sum the counts across all processes
    int local_element_count = counter.GetElementCount();
    int local_node_count = counter.GetTotalNodeCount();
    MPI_Allreduce(&local_element_count, &global_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_node_count, &global_node_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);

    // Should have processed 8 elements with 8 nodes each
    EXPECT_EQ(global_element_count, 8) << "Incorrect number of elements processed";
    EXPECT_EQ(global_node_count, 64) << "Incorrect total number of nodes processed";
}

// Test the ForEachElementAndConnectedFaces method
TEST_F(ConnectedEntityProcessorFixture, TestForEachElementAndConnectedFaces) {
    CreateMesh();

    // Create an ConnectedEntityProcessor
    aperi::Selector selector({"block_1"}, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
    aperi::ConnectedEntityProcessor processor(m_mesh_data);

    // Verify that GetMeshData returns the expected values
    EXPECT_EQ(processor.GetMeshData(), m_mesh_data);

    // Create a counter to keep track of the number of elements processed
    ElementFaceCounter count_elements_and_faces(m_mesh_data);

    // Process the elements
    processor.ForEachElementAndConnectedFaces<6>(count_elements_and_faces, selector);

    int global_element_count = 0;
    int global_face_count = 0;
    int global_face_node_count = 0;
    int global_face_element_count = 0;

    // Use MPI to sum the counts across all processes
    int local_element_count = count_elements_and_faces.GetElementCount();
    int local_face_count = count_elements_and_faces.GetTotalFaceCount();
    int local_face_node_count = count_elements_and_faces.GetTotalFaceNodeCount();
    int local_face_element_count = count_elements_and_faces.GetTotalFaceElementCount();
    MPI_Allreduce(&local_element_count, &global_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_face_count, &global_face_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_face_node_count, &global_face_node_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_face_element_count, &global_face_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);

    // Should have processed 8 elements with 6 faces each
    EXPECT_EQ(global_element_count, 8) << "Incorrect number of elements processed";                   // As set in the test, 1x2x4 mesh
    EXPECT_EQ(global_face_count, 48) << "Incorrect total number of faces processed";                  // 6 * num_elements
    EXPECT_EQ(global_face_node_count, 192) << "Incorrect total number of face nodes processed";       // 4 * num_faces
    EXPECT_EQ(global_face_element_count, 68) << "Incorrect total number of face elements processed";  // (48-28) * 2 + 28, 28 is the number of external faces
}