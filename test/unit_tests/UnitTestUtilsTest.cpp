#include <gtest/gtest.h>

#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "Index.h"
#include "IoMesh.h"
#include "UnitTestUtils.h"

// Fixture for UnitTestUtils tests
class UnitTestUtilsTestFixture : public ::testing::Test {
   protected:
    void SetUp() override {
        // Get number of mpi processes
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_procs);

        // Test file names
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_mesh_filename = test_suite_name + "_" + test_name + ".exo";

        // Create FieldData
        m_field_data = aperi::GetFieldData(false, false, aperi::LagrangianFormulationType::Total, false);
    }

    void TearDown() override {
        // Delete the temporary mesh file
        CleanUp(m_mesh_filename);
    }

    void WriteMesh() {
        // Write the mesh to a temporary file an
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.compose_output = true;

        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.minimize_open_files = false;
        m_io_mesh = std::make_shared<aperi::IoMesh>(MPI_COMM_WORLD, io_mesh_parameters);
        WriteTestMesh(m_mesh_filename, *m_io_mesh, m_mesh_string, m_field_data);
    }

    void CheckNumElementsInPart(const std::string& part_name, size_t expected_num_elems) {
        EXPECT_EQ(expected_num_elems, GetNumElementsInPart(*m_io_mesh->GetMeshData(), part_name)) << "Part: " << part_name;
    }

    void CheckNumNodesInPart(const std::string& part_name, size_t expected_num_nodes) {
        EXPECT_EQ(expected_num_nodes, GetNumNodesInPart(*m_io_mesh->GetMeshData(), part_name)) << "Part: " << part_name;
    }

    int m_num_procs;
    std::string m_mesh_filename;
    std::string m_mesh_string;
    std::vector<aperi::FieldData> m_field_data;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
};

// Test WriteTestMesh
TEST_F(UnitTestUtilsTestFixture, WriteTestMesh) {
    // Test WriteTestMesh
    m_mesh_string = "1x1x" + std::to_string(m_num_procs);
    WriteMesh();

    // Check that the mesh file exists
    std::filesystem::path mesh_file_path(m_mesh_filename);
    ASSERT_TRUE(std::filesystem::exists(mesh_file_path));

    // Check that the mesh has the correct number of elements
    CheckNumElementsInPart("block_1", m_num_procs);

    // Check that the mesh has the correct number of nodes
    CheckNumNodesInPart("block_1", (m_num_procs + 1) * 4);
}

// Test SplitMeshIntoTwoBlocks
TEST_F(UnitTestUtilsTestFixture, SplitMeshIntoTwoBlocks) {
    // Write the mesh
    m_mesh_string = "1x1x" + std::to_string(m_num_procs * 2);
    WriteMesh();

    // Check that the mesh file exists
    std::filesystem::path mesh_file_path(m_mesh_filename);
    ASSERT_TRUE(std::filesystem::exists(mesh_file_path));

    // Check that the mesh has the correct number of elements
    CheckNumElementsInPart("block_1", m_num_procs * 2);

    // Check that the mesh has the correct number of nodes
    CheckNumNodesInPart("block_1", (m_num_procs * 2 + 1) * 4);

    // Split the mesh into two blocks
    SplitMeshIntoTwoBlocks(*m_io_mesh->GetMeshData(), static_cast<double>(m_num_procs));

    // Check that the mesh has the correct number of elements
    CheckNumElementsInPart("block_1", m_num_procs);
    CheckNumElementsInPart("block_2", m_num_procs);

    // Check that the mesh has the correct number of nodes
    CheckNumNodesInPart("block_1", (m_num_procs + 1) * 4);
    CheckNumNodesInPart("block_2", (m_num_procs + 1) * 4);
}

struct GetCoordinatesFunctor {
    aperi::Field<double> coordinates_field;
    aperi::Index node_index;
    Kokkos::View<double*> coordinates_view;

    GetCoordinatesFunctor(const aperi::Field<double>& field, const aperi::Index& idx, Kokkos::View<double*> view)
        : coordinates_field(field), node_index(idx), coordinates_view(view) {}

    KOKKOS_FUNCTION void operator()(const int&) const {
        coordinates_view(0) = coordinates_field(node_index, 0);
        coordinates_view(1) = coordinates_field(node_index, 1);
        coordinates_view(2) = coordinates_field(node_index, 2);
    }
};

// Test find node index at coordinates
TEST_F(UnitTestUtilsTestFixture, FindNodeIndexAtCoordinates) {
    // Write the mesh
    m_mesh_string = "1x1x" + std::to_string(m_num_procs);
    WriteMesh();

    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = m_io_mesh->GetMeshData();

    // Get the coordinates of the first node
    aperi::Index node_index = GetNodeIndexAtCoordinates(*mesh_data, "block_1", Eigen::Vector3d(0.0, 0.0, 0.0));
    // Parallel accumulate the neighbor index
    std::vector<aperi::Index> node_indices(m_num_procs);
    MPI_Allgather(&node_index, sizeof(aperi::Index), MPI_BYTE, node_indices.data(), sizeof(aperi::Index), MPI_BYTE, MPI_COMM_WORLD);

    // Make sure one of the neighbor indices is valid
    bool found_valid_index = false;
    for (const auto& index : node_indices) {
        if (index.IsValid()) {
            found_valid_index = true;
            break;
        }
    }
    ASSERT_TRUE(found_valid_index) << "No valid neighbor index found";

    // Check that the node index is valid. The processor that owns the node will have a valid index
    if (node_index.IsValid()) {
        // Get the coordinates field
        aperi::Field coordinates_field = aperi::Field<double>(mesh_data, aperi::FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});

        Kokkos::View<double*> coordinates_view("found_node_coords", 3);
        Kokkos::View<double*>::HostMirror coordinates_view_host = Kokkos::create_mirror_view(coordinates_view);

        // Get the coordinates of the node
        GetCoordinatesFunctor get_coordinates_functor(coordinates_field, node_index, coordinates_view);
        Kokkos::parallel_for("GetCoordinates", 1, get_coordinates_functor);

        Eigen::Matrix<double, 1, 3> node_coords;
        Kokkos::deep_copy(coordinates_view_host, coordinates_view);
        node_coords = Eigen::Map<Eigen::Matrix<double, 1, 3>>(coordinates_view_host.data());

        // Check that the coordinates are correct
        EXPECT_NEAR(node_coords(0, 0), 0.0, 1.0e-12);
        EXPECT_NEAR(node_coords(0, 1), 0.0, 1.0e-12);
        EXPECT_NEAR(node_coords(0, 2), 0.0, 1.0e-12);

        // Check that the node index is correct
        EXPECT_EQ(node_index, aperi::Index(0, 0));
    }
}

// Test find node index at coordinates, invalid case
TEST_F(UnitTestUtilsTestFixture, FindInvalidNodeIndexAtCoordinates) {
    // Write the mesh
    m_mesh_string = "1x1x" + std::to_string(m_num_procs);
    WriteMesh();

    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = m_io_mesh->GetMeshData();

    // Get the coordinates of the first node
    aperi::Index node_index = GetNodeIndexAtCoordinates(*mesh_data, "block_1", Eigen::Vector3d(0.5, 0.0, 0.0));

    // Check that the node index is valid
    EXPECT_TRUE(node_index == aperi::Index::Invalid()) << "Node index is valid and should be invalid";
}
