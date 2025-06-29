#include <gtest/gtest.h>

#include <cstdlib>
#include <memory>
#include <string>
#include <vector>

#include "FieldData.h"
#include "IoMesh.h"
#include "MeshData.h"
#include "NgpMeshData.h"
#include "Selector.h"
#include "UnitTestUtils.h"

class NgpMeshDataTestFixture : public ::testing::Test {
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
        m_ngp_mesh_data = std::make_unique<aperi::NgpMeshData>(m_mesh_data->GetUpdatedNgpMesh());
    }

    std::shared_ptr<aperi::IoMeshParameters> m_io_mesh_parameters;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::unique_ptr<aperi::NgpMeshData> m_ngp_mesh_data;
    std::string m_mesh_string;
    int m_num_procs;
};

struct ElementNodeCounter {
    Kokkos::View<int*> element_count;
    Kokkos::View<int*> total_node_count;

    ElementNodeCounter() : element_count("element_count", 1),
                           total_node_count("total_node_count", 1) {
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
        auto element_count_h = Kokkos::create_mirror_view(element_count);
        Kokkos::deep_copy(element_count_h, element_count);
        return element_count_h(0);
    }

    int GetTotalNodeCount() {
        auto total_node_count_h = Kokkos::create_mirror_view(total_node_count);
        Kokkos::deep_copy(total_node_count_h, total_node_count);
        return total_node_count_h(0);
    }
};

struct ElementFaceCounter {
    aperi::NgpMeshData ngp_mesh_data;
    Kokkos::View<int*> element_count;
    Kokkos::View<int*> total_face_count;
    Kokkos::View<int*> total_face_node_count;
    Kokkos::View<int*> total_face_element_count;

    explicit ElementFaceCounter(const aperi::NgpMeshData& ngp_mesh_data_in)
        : ngp_mesh_data(ngp_mesh_data_in),
          element_count("element_count", 1),
          total_face_count("total_face_count", 1),
          total_face_node_count("total_face_node_count", 1),
          total_face_element_count("total_face_element_count", 1) {
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

        for (size_t i = 0; i < num_faces; ++i) {
            aperi::ConnectedEntities face_nodes = ngp_mesh_data.GetFaceNodes(face_indices[i]);
            Kokkos::atomic_add(&total_face_node_count(0), face_nodes.size());

            aperi::ConnectedEntities face_elements = ngp_mesh_data.GetFaceElements(face_indices[i]);
            Kokkos::atomic_add(&total_face_element_count(0), face_elements.size());
        }
    }

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
TEST_F(NgpMeshDataTestFixture, TestForEachElementAndConnectedNodes) {
    CreateMesh();

    aperi::Selector selector({"block_1"}, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

    ElementNodeCounter counter;

    m_ngp_mesh_data->ForEachElementAndConnectedNodes<8>(counter, selector);

    int global_element_count = 0;
    int global_node_count = 0;

    int local_element_count = counter.GetElementCount();
    int local_node_count = counter.GetTotalNodeCount();
    MPI_Allreduce(&local_element_count, &global_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_node_count, &global_node_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);

    EXPECT_EQ(global_element_count, 8) << "Incorrect number of elements processed";
    EXPECT_EQ(global_node_count, 64) << "Incorrect total number of nodes processed";
}

// Test the ForEachElementAndConnectedFaces method
TEST_F(NgpMeshDataTestFixture, TestForEachElementAndConnectedFaces) {
    CreateMesh();

    aperi::Selector selector({"block_1"}, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);

    ElementFaceCounter count_elements_and_faces(*m_ngp_mesh_data);

    m_ngp_mesh_data->ForEachElementAndConnectedFaces<6>(count_elements_and_faces, selector);

    int global_element_count = 0;
    int global_face_count = 0;
    int global_face_node_count = 0;
    int global_face_element_count = 0;

    int local_element_count = count_elements_and_faces.GetElementCount();
    int local_face_count = count_elements_and_faces.GetTotalFaceCount();
    int local_face_node_count = count_elements_and_faces.GetTotalFaceNodeCount();
    int local_face_element_count = count_elements_and_faces.GetTotalFaceElementCount();
    MPI_Allreduce(&local_element_count, &global_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_face_count, &global_face_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_face_node_count, &global_face_node_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);
    MPI_Allreduce(&local_face_element_count, &global_face_element_count, 1, MPI_INT, MPI_SUM, MPI_COMM_WORLD);

    EXPECT_EQ(global_element_count, 8) << "Incorrect number of elements processed";
    EXPECT_EQ(global_face_count, 48) << "Incorrect total number of faces processed";
    EXPECT_EQ(global_face_node_count, 192) << "Incorrect total number of face nodes processed";
    EXPECT_EQ(global_face_element_count, 68) << "Incorrect total number of face elements processed";
}