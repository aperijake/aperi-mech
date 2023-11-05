#include <MassUtils.h>
#include <gtest/gtest.h>

#include <vector>

#include "FieldManager.h"
#include "IoMesh.h"
#include "UnitTestUtils.h"
#include "stk_mesh/base/BulkData.hpp"
#include "stk_mesh/base/Field.hpp"
#include "stk_mesh/base/MetaData.hpp"
#include "stk_topology/topology.hpp"
#include "stk_util/parallel/Parallel.hpp"

#include "CaptureOutputTestFixture.h"

// Fixture for mass matrix tests
class MassMatrixTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        CaptureOutputTest::SetUp();
        m_comm = MPI_COMM_WORLD;

        // Test file names
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_mesh_filename = test_suite_name + "_" + test_name + ".exo";

        // Write the mesh to a temporary file and check that it is written correctly
        acm::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.compose_output = true;
        m_io_mesh = std::make_shared<acm::IoMesh>(m_comm, io_mesh_parameters);

        // Get number of mpi processes
        m_num_procs = stk::parallel_machine_size(m_comm);

        // Create a FieldManager
        std::vector<acm::FieldData> field_data = acm::GetFieldData();
        std::shared_ptr<acm::FieldManager> field_manager = acm::CreateFieldManager(field_data);

        // Make a 1x1xnum_procs mesh
        std::string mesh_string = "1x1x" + std::to_string(m_num_procs) + "|tets";
        WriteTestMesh(m_mesh_filename, *m_io_mesh, mesh_string, field_manager);
    }

    void TearDown() override {
        // Delete the temporary mesh file
        CleanUp(m_mesh_filename);

        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }

    std::string m_mesh_filename;
    std::shared_ptr<acm::IoMesh> m_io_mesh;
    stk::ParallelMachine m_comm;
    size_t m_num_procs;
};

// Test ComputeMassMatrix
TEST_F(MassMatrixTest, ComputeMassMatrix) {
    // Create a bulk data object
    stk::mesh::BulkData &bulk_data = m_io_mesh->GetBulkData();

    // Compute mass matrix
    double density = 1.23;
    double total_mass = acm::ComputeMassMatrix(bulk_data, density);

    // Check that the total mass is correct
    double expected_total_mass = 1.23 * m_num_procs;  // Multiply by m_num_procs because there is one unit cube per processor
    EXPECT_DOUBLE_EQ(total_mass, expected_total_mass);
}