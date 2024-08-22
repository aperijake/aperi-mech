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
#include "UnitTestUtils.h"

class CreateElementStrainSmoothedTest : public ::testing::Test {
   protected:
    // Run the strain smoothed formulation
    void CreateAndRunStrainSmoothedElement(int num_elems_z, const std::shared_ptr<aperi::ApproximationSpaceParameters>& approximation_space_parameters) {
        // Make a mesh
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.compose_output = true;
        m_io_mesh = CreateIoMesh(MPI_COMM_WORLD, io_mesh_parameters);
        bool uses_generalized_fields = approximation_space_parameters->UsesGeneralizedFields();
        bool use_strain_smoothing = true;
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, use_strain_smoothing);
        m_io_mesh->ReadMesh("1x1x" + std::to_string(num_elems_z) + "|tets", {"block_1"});
        m_io_mesh->AddFields(field_data);
        m_io_mesh->CompleteInitialization();
        std::shared_ptr<aperi::MeshData> mesh_data = m_io_mesh->GetMeshData();

        // Make an element processor
        std::vector<aperi::FieldQueryData<double>> field_query_data_gather_vec(3);  // not used, but needed for the ElementGatherScatterProcessor in CreateElement. TODO(jake) change this?
        field_query_data_gather_vec[0] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
        field_query_data_gather_vec[1] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
        field_query_data_gather_vec[2] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
        const std::vector<std::string> part_names = {"block_1"};

        // Strain smoothing parameters
        auto integration_scheme_parameters = std::make_shared<aperi::IntegrationSchemeStrainSmoothingParameters>();

        // Create the element. This will do the neighbor search, compute the shape functions, and do strain smoothing.
        std::shared_ptr<aperi::ElementBase> element = aperi::CreateElement(aperi::ElementTopology::Tetrahedron4, approximation_space_parameters, integration_scheme_parameters, field_query_data_gather_vec, part_names, mesh_data);

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
        expected_volume[0] = num_elems_z;
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

    std::shared_ptr<aperi::IoMesh> m_io_mesh;
};

// Smoothed tet4 element
TEST_F(CreateElementStrainSmoothedTest, SmoothedTet4Storing) {
    // Get number of processors
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);

    // Tet4 element
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceFiniteElementParameters>();

    CreateAndRunStrainSmoothedElement(num_procs, approximation_space_parameters);
}

// Smoothed reproducing kernel on tet4 element
TEST_F(CreateElementStrainSmoothedTest, ReproducingKernelOnTet4) {
    // Get number of processors
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);

    // Reproducing kernel on tet4 element
    double kernel_radius_scale_factor = 0.03;  // Small so it is like a tet4
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    CreateAndRunStrainSmoothedElement(num_procs, approximation_space_parameters);
}
