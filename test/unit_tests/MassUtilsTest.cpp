#include <MassUtils.h>
#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <vector>

#include "CaptureOutputTestFixture.h"
#include "FieldData.h"
#include "InternalForceContribution.h"
#include "InternalForceContributionParameters.h"
#include "IoMesh.h"
#include "MaxEdgeLengthProcessor.h"
#include "MeshLabeler.h"
#include "UnitTestUtils.h"

// Fixture for mass matrix tests
class MassMatrixTest : public CaptureOutputTest {
    struct PartParameters {
        aperi::MeshLabelerParameters mesh_labeler_parameters;
        double density;
    };

   protected:
    void SetUp() override {
        // Run CaptureOutputTest::SetUp first
        m_capture_output = false;
        CaptureOutputTest::SetUp();
        m_comm = MPI_COMM_WORLD;

        // Get number of mpi processes
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_procs);

        // Test file names
        std::string test_suite_name = ::testing::UnitTest::GetInstance()->current_test_info()->test_suite_name();
        std::string test_name = ::testing::UnitTest::GetInstance()->current_test_info()->name();
        m_mesh_filename = test_suite_name + "_" + test_name + ".exo";
        m_mesh_string = "1x1x" + std::to_string(m_num_procs * 2);
        m_volume = m_num_procs * 2;

        // Default to one part
        m_part_parameters.resize(1);
        m_part_parameters[0].density = 1.23;
        m_part_parameters[0].mesh_labeler_parameters.set = "block_1";
        m_part_parameters[0].mesh_labeler_parameters.smoothing_cell_type = aperi::SmoothingCellType::Element;
    }

    void TestComputeMassMatrix(const bool uses_generalized_fields, bool split_mesh_in_two = false, const std::string &override_mesh_string = "") {
        // Create FieldData
        bool uses_strain_smoothing = uses_generalized_fields;
        bool uses_incremental_formulation = false;
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, uses_strain_smoothing, uses_incremental_formulation, true /* output_coefficients */);

        // Add field data from mesh labeler
        aperi::MeshLabeler mesh_labeler;
        std::vector<aperi::FieldData> mesh_labeler_field_data = mesh_labeler.GetFieldData();
        field_data.insert(field_data.end(), mesh_labeler_field_data.begin(), mesh_labeler_field_data.end());

        // Write the mesh to a temporary file and check that it is written correctly
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.compose_output = true;

        // Write the mesh to a temporary file
        if (!override_mesh_string.empty()) {
            // Read the mesh from file
            m_io_mesh = std::make_shared<aperi::IoMesh>(m_comm, io_mesh_parameters);
            m_io_mesh->ReadMesh(override_mesh_string, {"block_1"});
            m_io_mesh->AddFields(field_data);
            m_io_mesh->CompleteInitialization();
        } else {
            io_mesh_parameters.mesh_type = "generated";
            m_io_mesh = std::make_shared<aperi::IoMesh>(m_comm, io_mesh_parameters);
            WriteTestMesh(m_mesh_filename, *m_io_mesh, m_mesh_string, field_data);
        }

        // Split the mesh in two
        if (split_mesh_in_two) {
            // Mid point of the mesh in z direction
            auto z_mid = static_cast<double>(m_num_procs);
            SplitMeshIntoTwoBlocks(*m_io_mesh->GetMeshData(), z_mid);
        }

        // Label the mesh for element integration
        for (auto &part : m_part_parameters) {
            part.mesh_labeler_parameters.mesh_data = m_io_mesh->GetMeshData();
            mesh_labeler.LabelPart(part.mesh_labeler_parameters);
        }

        // Create a max edge length processor
        aperi::MaxEdgeLengthProcessor max_edge_length_processor(m_io_mesh->GetMeshData(), std::vector<std::string>{});
        max_edge_length_processor.ComputeMaxEdgeLength();

        // Create an internal force contribution in order to populate the volume field, needed for the mass matrix computation
        for (auto &part : m_part_parameters) {
            aperi::InternalForceContributionParameters internal_force_contribution_parameters;
            internal_force_contribution_parameters.part_name = part.mesh_labeler_parameters.set;
            internal_force_contribution_parameters.mesh_data = m_io_mesh->GetMeshData();
            if (uses_generalized_fields) {
                double kernel_radius_scale_factor = 1.5;
                internal_force_contribution_parameters.approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);
                internal_force_contribution_parameters.integration_scheme_parameters = std::make_shared<aperi::IntegrationSchemeStrainSmoothingParameters>();
            } else {
                internal_force_contribution_parameters.approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceFiniteElementParameters>();
                internal_force_contribution_parameters.integration_scheme_parameters = std::make_shared<aperi::IntegrationSchemeGaussQuadratureParameters>();
            }
            // Yaml node for material, unused but needed for the internal force contribution
            YAML::Node material_node;
            material_node["elastic"]["youngs_modulus"] = 1.0;
            material_node["elastic"]["poissons_ratio"] = 0.3;
            material_node["elastic"]["density"] = part.density;
            internal_force_contribution_parameters.material = aperi::CreateMaterial(material_node);
            auto internal_force_contrib = CreateInternalForceContribution(internal_force_contribution_parameters);
            internal_force_contrib->Preprocess();
        }

        // Check element volume
        std::shared_ptr<aperi::MeshData> mesh_data = m_io_mesh->GetMeshData();
        double tolerance = 1.0e-13;
        double expected_total_mass = 0;
        for (auto &part : m_part_parameters) {
            double expected_part_volume = m_volume / m_part_parameters.size();  // Volume split evenly between parts

            std::array<aperi::FieldQueryData<double>, 1> volume_field_query_data;
            volume_field_query_data[0] = {"volume", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT, 1};
            aperi::ElementProcessor<1> element_processor(volume_field_query_data, mesh_data, {part.mesh_labeler_parameters.set});
            // Sync the field to the host
            element_processor.MarkFieldModifiedOnDevice(0);
            element_processor.SyncFieldDeviceToHost(0);
            double part_volume = element_processor.GetFieldSumHost(0);

            EXPECT_NEAR(part_volume, expected_part_volume, tolerance);

            expected_total_mass += part_volume * part.density;
        }

        // Compute mass matrix
        for (auto &part : m_part_parameters) {
            aperi::ComputeMassMatrixForPart(m_io_mesh->GetMeshData(), part.mesh_labeler_parameters.set, part.density);
        }
        double total_mass = aperi::FinishComputingMassMatrix(m_io_mesh->GetMeshData(), uses_generalized_fields);

        // Sum the mass at the nodes
        std::array<aperi::FieldQueryData<double>, 2> mass_field_query_data;
        mass_field_query_data[0] = {"mass", aperi::FieldQueryState::None};
        mass_field_query_data[1] = {"mass_from_elements", aperi::FieldQueryState::None};
        aperi::NodeProcessor<2> node_processor(mass_field_query_data, mesh_data);

        // Parallel sum
        double mass_sum_global = node_processor.GetFieldSumHost(0) / 3.0;  // Divide by 3 to get the mass per node as the mass is on the 3 DOFs
        double mass_from_elements_sum_global = node_processor.GetFieldSumHost(1) / 3.0;

        // Check that the total mass is correct
        EXPECT_NEAR(total_mass, expected_total_mass, tolerance);
        EXPECT_NEAR(mass_sum_global, expected_total_mass, tolerance);
        EXPECT_NEAR(mass_from_elements_sum_global, expected_total_mass, tolerance);

        // Sum the mass at the active nodes. For nodal integration, but should work in general
        std::array<aperi::FieldQueryData<double>, 1> mass_field_query_data_active;
        mass_field_query_data_active[0] = {"mass", aperi::FieldQueryState::None};
        std::vector<std::string> active_part_names;
        for (auto &part : m_part_parameters) {
            active_part_names.push_back(part.mesh_labeler_parameters.set + "_active");
        }
        aperi::NodeProcessor<1> node_processor_active(mass_field_query_data_active, mesh_data, active_part_names);

        // Parallel sum
        double mass_sum_active_global = node_processor_active.GetFieldSumHost(0) / 3.0;

        EXPECT_NEAR(mass_sum_active_global, expected_total_mass, tolerance);
    }

    void TearDown() override {
        // Delete the temporary mesh file
        CleanUp(m_mesh_filename);

        // Run CaptureOutputTest::TearDown last
        CaptureOutputTest::TearDown();
    }

    std::string m_mesh_filename;
    std::string m_mesh_string;
    double m_volume;
    std::vector<PartParameters> m_part_parameters;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    MPI_Comm m_comm;
    int m_num_procs;
};

// Test ComputeMassMatrix
TEST_F(MassMatrixTest, ComputeMassMatrix) {
    m_mesh_string += "|tets";
    bool uses_generalized_fields = false;
    TestComputeMassMatrix(uses_generalized_fields);
}

// Test ComputeMassMatrix with generalized fields for tet elements
TEST_F(MassMatrixTest, ComputeMassMatrixGeneralizedFieldsTets) {
    m_mesh_string += "|tets";
    bool uses_generalized_fields = true;
    TestComputeMassMatrix(uses_generalized_fields);
}

// Test ComputeMassMatrix with generalized fields for hex elements
TEST_F(MassMatrixTest, ComputeMassMatrixGeneralizedFieldsHexes) {
    bool uses_generalized_fields = true;
    TestComputeMassMatrix(uses_generalized_fields);
}

// Test ComputeMassMatrix with generalized fields for nodal integration
TEST_F(MassMatrixTest, ComputeMassMatrixGeneralizedFieldsNodalIntegration) {
    bool uses_generalized_fields = true;
    std::string override_mesh_string = "test_inputs/thex_2x2x2_brick.exo";
    m_volume = 8.0;
    m_part_parameters[0].mesh_labeler_parameters.smoothing_cell_type = aperi::SmoothingCellType::Nodal;
    TestComputeMassMatrix(uses_generalized_fields, false, override_mesh_string);
}

// Test ComputeMassMatrix on two parts
TEST_F(MassMatrixTest, ComputeMassMatrixTwoParts) {
    m_mesh_string += "|tets";
    bool uses_generalized_fields = false;
    m_part_parameters.resize(2);
    m_part_parameters[1].density = 2.34;
    m_part_parameters[1].mesh_labeler_parameters.set = "block_2";
    m_part_parameters[1].mesh_labeler_parameters.smoothing_cell_type = aperi::SmoothingCellType::Element;
    TestComputeMassMatrix(uses_generalized_fields, true);
}
