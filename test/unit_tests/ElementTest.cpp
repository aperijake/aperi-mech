#include <gtest/gtest.h>

#include <cstdlib>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "Constants.h"
#include "Element.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "IoMesh.h"
#include "Material.h"
#include "MaxEdgeLengthProcessor.h"
#include "MeshLabeler.h"
#include "SmoothedCellData.h"
#include "UnitTestUtils.h"

class CreateElementStrainSmoothedTest : public ::testing::Test {
   protected:
    void SetUp() override {
        m_io_mesh_parameters = std::make_shared<aperi::IoMeshParameters>();
        m_io_mesh_parameters->compose_output = true;
        m_io_mesh_parameters->mesh_type = "generated";

        // Get number of processors
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_procs);
        m_num_elems_z = m_num_procs;
        m_expected_volume = m_num_elems_z;

        m_mesh_string = "1x1x" + std::to_string(m_num_elems_z) + "|tets";
    }

    // Run the strain smoothed formulation
    void CreateAndRunStrainSmoothedElement(const std::shared_ptr<aperi::ApproximationSpaceParameters>& approximation_space_parameters, const aperi::SmoothingCellType smoothing_cell_type = aperi::SmoothingCellType::Element) {
        // Make a mesh
        m_io_mesh = CreateIoMesh(MPI_COMM_WORLD, *m_io_mesh_parameters);
        bool uses_generalized_fields = approximation_space_parameters->UsesGeneralizedFields();
        bool use_strain_smoothing = true;
        aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;

        // Get field data
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, use_strain_smoothing, lagrangian_formulation_type, true /* output_coefficients*/);

        // Add field data from mesh labeler
        aperi::MeshLabeler mesh_labeler;
        std::vector<aperi::FieldData> mesh_labeler_field_data = mesh_labeler.GetFieldData();
        field_data.insert(field_data.end(), mesh_labeler_field_data.begin(), mesh_labeler_field_data.end());

        // Read the mesh
        m_io_mesh->ReadMesh(m_mesh_string, {"block_1"});

        // Add the fields to the mesh
        m_io_mesh->AddFields(field_data);

        // Complete initialization
        m_io_mesh->CompleteInitialization();
        std::shared_ptr<aperi::MeshData> mesh_data = m_io_mesh->GetMeshData();

        // Label the mesh for element integration
        aperi::MeshLabelerParameters mesh_labeler_parameters;
        mesh_labeler_parameters.mesh_data = m_io_mesh->GetMeshData();
        mesh_labeler_parameters.set = "block_1";
        mesh_labeler_parameters.smoothing_cell_type = smoothing_cell_type;
        mesh_labeler.LabelPart(mesh_labeler_parameters);

        // Create a max edge length processor
        aperi::MaxEdgeLengthProcessor max_edge_length_processor(mesh_data, std::vector<std::string>{});
        max_edge_length_processor.ComputeMaxEdgeLength();

        // Make an element processor
        const std::string displacement_field_name = "displacement_coefficients";
        const std::vector<std::string> part_names = {"block_1"};

        // Strain smoothing parameters
        auto integration_scheme_parameters = std::make_shared<aperi::IntegrationSchemeStrainSmoothingParameters>(m_use_one_pass_method);

        // Make a dummy material
        auto material_properties = std::make_shared<aperi::MaterialProperties>();
        material_properties->material_type = aperi::MaterialType::LINEAR_ELASTIC;
        material_properties->density = 0.0;
        material_properties->properties.emplace("poissons_ratio", 0.0);
        material_properties->properties.emplace("youngs_modulus", 0.0);
        material_properties->properties.emplace("two_mu", 0.0);
        material_properties->properties.emplace("lambda", 0.0);
        auto material = std::make_shared<aperi::Material>(material_properties);

        // Create the element. This will do the neighbor search, compute the shape functions, and do strain smoothing.
        m_element = aperi::CreateElement(m_element_topology, approximation_space_parameters, integration_scheme_parameters, displacement_field_name, lagrangian_formulation_type, part_names, mesh_data, material);

        std::array<aperi::FieldQueryData<double>, 5> elem_field_query_data_gather_vec;
        elem_field_query_data_gather_vec[0] = {"function_values", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        elem_field_query_data_gather_vec[1] = {"function_derivatives_x", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        elem_field_query_data_gather_vec[2] = {"function_derivatives_y", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        elem_field_query_data_gather_vec[3] = {"function_derivatives_z", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        elem_field_query_data_gather_vec[4] = {"volume", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        auto entity_processor = std::make_shared<aperi::ElementProcessor<5>>(elem_field_query_data_gather_vec, mesh_data, part_names);
        entity_processor->MarkAllFieldsModifiedOnDevice();
        entity_processor->SyncAllFieldsDeviceToHost();

        // Check the volume
        std::array<double, 1> expected_volume;
        expected_volume[0] = m_expected_volume;
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "volume", expected_volume, aperi::FieldQueryState::None);

        // Check the partition of unity for the shape functions. Shape functions are tested more rigorously in the ShapeFunctionsFunctor tests. This is just a basic check to help identify issues should they arise.
        if (approximation_space_parameters->GetApproximationSpaceType() == aperi::ApproximationSpaceType::ReproducingKernel) {  // not storing shape function values for FiniteElement
            CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::NODE>(*mesh_data, {"block_1"}, "function_values", 1.0, aperi::FieldQueryState::None);
        }

        // Check partition of nullity for the shape function derivatives
        CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_x", 0.0, aperi::FieldQueryState::None);
        CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_y", 0.0, aperi::FieldQueryState::None);
        CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_z", 0.0, aperi::FieldQueryState::None);
    }

    void CheckSmoothedCellData() {
        // Check the smoothed cell data is not null
        auto smoothed_cell_data = m_element->GetSmoothedCellData();
        EXPECT_NE(smoothed_cell_data, nullptr);
    }

    std::shared_ptr<aperi::IoMeshParameters> m_io_mesh_parameters;
    std::shared_ptr<aperi::IoMesh> m_io_mesh;
    std::string m_mesh_string;
    int m_num_elems_z;
    int m_num_procs;
    double m_expected_volume;
    bool m_use_one_pass_method = true;
    aperi::ElementTopology m_element_topology = aperi::ElementTopology::Tetrahedron4;
    std::shared_ptr<aperi::ElementBase> m_element;
};

// Smoothed tet4 element
TEST_F(CreateElementStrainSmoothedTest, SmoothedTet4Storing) {
    // Tet4 element
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceFiniteElementParameters>();
    CreateAndRunStrainSmoothedElement(approximation_space_parameters);
    CheckSmoothedCellData();
}

// Smoothed reproducing kernel on tet4 element
TEST_F(CreateElementStrainSmoothedTest, ReproducingKernelOnTet4OnePass) {
    // Reproducing kernel on tet4 element
    double kernel_radius_scale_factor = 0.03;  // Small so it is like a tet4
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    CreateAndRunStrainSmoothedElement(approximation_space_parameters);
    CheckSmoothedCellData();
}

// Smoothed reproducing kernel on tet4 element
TEST_F(CreateElementStrainSmoothedTest, ReproducingKernelOnTet4TwoPass) {
    // Reproducing kernel on tet4 element
    double kernel_radius_scale_factor = 0.03;  // Small so it is like a tet4
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    m_use_one_pass_method = false;
    CreateAndRunStrainSmoothedElement(approximation_space_parameters);
    CheckSmoothedCellData();
}

// Smoothed reproducing kernel on hex8 element
TEST_F(CreateElementStrainSmoothedTest, ReproducingKernelOnHex8OnePass) {
    // Hex8 element
    m_element_topology = aperi::ElementTopology::Hexahedron8;
    m_mesh_string = "1x1x" + std::to_string(m_num_elems_z);

    // Reproducing kernel on hex8 element
    double kernel_radius_scale_factor = 0.03;  // Small so it is like a tet4
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    CreateAndRunStrainSmoothedElement(approximation_space_parameters);
    CheckSmoothedCellData();
}

// Smoothed reproducing kernel on hex8 element
TEST_F(CreateElementStrainSmoothedTest, ReproducingKernelOnHex8TwoPass) {
    // Hex8 element
    m_element_topology = aperi::ElementTopology::Hexahedron8;
    m_mesh_string = "1x1x" + std::to_string(m_num_elems_z);

    // Reproducing kernel on hex8 element
    double kernel_radius_scale_factor = 0.03;  // Small so it is like a tet4
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    m_use_one_pass_method = false;
    CreateAndRunStrainSmoothedElement(approximation_space_parameters);
    CheckSmoothedCellData();
}

// Smoothed reproducing kernel on nodal integration
TEST_F(CreateElementStrainSmoothedTest, ReproducingKernelNodalOnePass) {
    // Hex8 element
    m_element_topology = aperi::ElementTopology::Hexahedron8;
    m_mesh_string = "test_inputs/thex_2x2x2_brick.exo";
    m_io_mesh_parameters->mesh_type = "exodusII";
    aperi::SmoothingCellType smoothing_cell_type = aperi::SmoothingCellType::Nodal;
    m_expected_volume = 8;

    // Reproducing kernel on hex8 element
    double kernel_radius_scale_factor = 1.01;
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    CreateAndRunStrainSmoothedElement(approximation_space_parameters, smoothing_cell_type);
    CheckSmoothedCellData();
}

// Smoothed reproducing kernel on nodal integration
TEST_F(CreateElementStrainSmoothedTest, ReproducingKernelNodalTwoPass) {
    // Hex8 element
    m_element_topology = aperi::ElementTopology::Hexahedron8;
    m_mesh_string = "test_inputs/thex_2x2x2_brick.exo";
    m_io_mesh_parameters->mesh_type = "exodusII";
    aperi::SmoothingCellType smoothing_cell_type = aperi::SmoothingCellType::Nodal;
    m_expected_volume = 8;

    // Reproducing kernel on hex8 element
    double kernel_radius_scale_factor = 1.01;
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    m_use_one_pass_method = false;
    CreateAndRunStrainSmoothedElement(approximation_space_parameters, smoothing_cell_type);
    CheckSmoothedCellData();
}
