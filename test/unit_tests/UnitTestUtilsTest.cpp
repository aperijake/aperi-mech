#include <FieldData.h>
#include <IoMesh.h>
#include <UnitTestUtils.h>
#include <gtest/gtest.h>

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
        m_field_data = aperi::GetFieldData(false, false);
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
        m_io_mesh = std::make_shared<aperi::IoMesh>(MPI_COMM_WORLD, io_mesh_parameters);
        WriteTestMesh(m_mesh_filename, *m_io_mesh, m_mesh_string, m_field_data);
    }

    void CheckNumElementsInPart(const std::string& part_name, size_t expected_num_elems) {
        stk::mesh::Part* p_part = m_io_mesh->GetMetaData().get_part(part_name);
        ASSERT_TRUE(p_part != nullptr);
        stk::mesh::Selector selector(*p_part);
        std::vector<size_t> counts;
        stk::mesh::comm_mesh_counts(m_io_mesh->GetBulkData(), counts, &selector);
        EXPECT_EQ(expected_num_elems, counts[stk::topology::ELEM_RANK]);
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

    // Split the mesh into two blocks
    SplitMeshIntoTwoBlocks(*m_io_mesh->GetMeshData(), m_num_procs * 2);

    // Check that the mesh has the correct number of elements
    CheckNumElementsInPart("block_1", m_num_procs);
    CheckNumElementsInPart("block_2", m_num_procs);
}