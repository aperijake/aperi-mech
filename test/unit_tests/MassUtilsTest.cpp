#include <MassUtils.h>
#include <gtest/gtest.h>

#include <vector>

#include "CaptureOutputTestFixture.h"
#include "FieldData.h"
#include "InternalForceContribution.h"
#include "InternalForceContributionParameters.h"
#include "IoMesh.h"
#include "MeshLabeler.h"
#include "UnitTestUtils.h"

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
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.compose_output = true;
        m_io_mesh = std::make_shared<aperi::IoMesh>(m_comm, io_mesh_parameters);

        // Get number of mpi processes
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_procs);
    }

    void TestComputeMassMatrix(const bool uses_generalized_fields, const bool tet_elements = true, const double density = 1.23) {
        // Create FieldData
        bool uses_strain_smoothing = uses_generalized_fields;
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, uses_strain_smoothing);

        // Add field data from mesh labeler
        aperi::MeshLabeler mesh_labeler;
        std::vector<aperi::FieldData> mesh_labeler_field_data = mesh_labeler.GetFieldData();
        field_data.insert(field_data.end(), mesh_labeler_field_data.begin(), mesh_labeler_field_data.end());

        // Make a 1x1xnum_procs mesh
        std::string mesh_string = "1x1x" + std::to_string(m_num_procs);
        if (tet_elements) {
            mesh_string = mesh_string + "|tets";
        }
        WriteTestMesh(m_mesh_filename, *m_io_mesh, mesh_string, field_data);

        if (uses_generalized_fields) {
            // Create an internal force contribution in order to run strain smoothing and populate the volume field, needed for the mass matrix computation
            aperi::InternalForceContributionParameters internal_force_contribution_parameters;
            internal_force_contribution_parameters.part_name = "block_1";
            internal_force_contribution_parameters.mesh_data = m_io_mesh->GetMeshData();
            internal_force_contribution_parameters.approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>();
            internal_force_contribution_parameters.integration_scheme_parameters = std::make_shared<aperi::IntegrationSchemeStrainSmoothingParameters>();

            auto internal_force_contrib = CreateInternalForceContribution(internal_force_contribution_parameters);
            internal_force_contrib->Preprocess();
        }

        // Compute mass matrix
        double total_mass = aperi::ComputeMassMatrix(m_io_mesh->GetMeshData(), "block_1", density, uses_generalized_fields);

        // Get the mass fields
        std::shared_ptr<aperi::MeshData> mesh_data = m_io_mesh->GetMeshData();
        // Sum the mass at the nodes
        std::array<aperi::FieldQueryData<double>, 2> mass_field_query_data;
        mass_field_query_data[0] = {"mass", aperi::FieldQueryState::None};
        mass_field_query_data[1] = {"mass_from_elements", aperi::FieldQueryState::None};
        aperi::NodeProcessor<2> node_processor(mass_field_query_data, mesh_data);

        // Parallel sum
        double mass_sum_global = node_processor.GetFieldSumHost(0) / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
        double mass_from_elements_sum_global = node_processor.GetFieldSumHost(1) / 3.0;

        // Check that the total mass is correct
        double expected_total_mass = density * m_num_procs;  // Multiply by m_num_procs because there is one unit cube per processor
        EXPECT_DOUBLE_EQ(total_mass, expected_total_mass);
        EXPECT_DOUBLE_EQ(mass_sum_global, expected_total_mass);
        EXPECT_DOUBLE_EQ(mass_from_elements_sum_global, expected_total_mass);
    }

    void TearDown() override {
        // Delete the temporary mesh file
        CleanUp(m_mesh_filename);

        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }

    std::string m_mesh_filename;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    MPI_Comm m_comm;
    int m_num_procs;
};

// Test ComputeMassMatrix
TEST_F(MassMatrixTest, ComputeMassMatrix) {
    TestComputeMassMatrix(false);
}

// Test ComputeMassMatrix with generalized fields for tet elements
TEST_F(MassMatrixTest, ComputeMassMatrixGeneralizedFieldsTets) {
    TestComputeMassMatrix(true);
}

// Test ComputeMassMatrix with generalized fields for hex elements
TEST_F(MassMatrixTest, ComputeMassMatrixGeneralizedFieldsHexes) {
    TestComputeMassMatrix(true, false);
}