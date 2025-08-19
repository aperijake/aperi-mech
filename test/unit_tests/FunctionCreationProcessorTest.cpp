#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>

#include "Constants.h"
#include "FieldData.h"
#include "FunctionCreationProcessorTestFixture.h"
#include "FunctionEvaluationProcessor.h"
#include "MeshData.h"
#include "NeighborSearchProcessorTestFixture.h"
#include "NeighborSelectorFunctor.h"
#include "UnitTestUtils.h"

struct FillLinearFieldFunctor {
    explicit FillLinearFieldFunctor(double slope) : m_slope(slope) {}
    KOKKOS_INLINE_FUNCTION void operator()(const double *coordinate, double *src_value, double * /*dest_value*/) const { *src_value = m_slope * *coordinate; }
    double m_slope;
};

class FunctionEvaluationProcessorTestFixture : public FunctionCreationProcessorTestFixture {
   protected:
    void SetUp() override {
        FunctionCreationProcessorTestFixture::SetUp();
        m_src_and_dest_field_query_data.resize(2);
        m_src_and_dest_field_query_data[0] = {"src_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE, 3};
        m_src_and_dest_field_query_data[1] = {"dest_field", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE, 3};
    }

    void BuildFunctionEvaluationProcessor() {
        NeighborSearchProcessorTestFixture::CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z, "|tets", m_src_and_dest_field_query_data);
        FunctionCreationProcessorTestFixture::BuildFunctionCreationProcessor();
        // Create the FunctionEvaluationProcessor
        std::array<aperi::FieldQueryData<double>, 1> src_field = {m_src_and_dest_field_query_data[0]};
        std::array<aperi::FieldQueryData<double>, 1> dest_field = {m_src_and_dest_field_query_data[1]};
        m_value_from_generalized_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<1>>(src_field, dest_field, m_mesh_data);

        // Create the field query data, coordinates and the src and dest fields
        std::array<aperi::FieldQueryData<double>, 3> field_query_data_vec;
        field_query_data_vec[0] = {m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
        field_query_data_vec[1] = m_src_and_dest_field_query_data[0];
        field_query_data_vec[2] = m_src_and_dest_field_query_data[1];

        // Create the node processor
        m_node_processor = std::make_shared<aperi::NodeProcessor<3>>(field_query_data_vec, m_mesh_data);
    }

    void FillSrcFieldWithLinearFieldsValues(const double constant_value, const std::array<double, 3> &slope) {
        m_node_processor->FillField(constant_value, 1);
        FillLinearFieldFunctor fill_linear_field_x_functor(slope[0]);
        FillLinearFieldFunctor fill_linear_field_y_functor(slope[1]);
        FillLinearFieldFunctor fill_linear_field_z_functor(slope[2]);
        m_node_processor->for_component_i(fill_linear_field_x_functor, 0);
        m_node_processor->for_component_i(fill_linear_field_y_functor, 1);
        m_node_processor->for_component_i(fill_linear_field_z_functor, 2);
        m_node_processor->MarkAllFieldsModifiedOnDevice();
        m_node_processor->SyncAllFieldsDeviceToHost();
    }

    std::vector<aperi::FieldQueryData<double>> m_src_and_dest_field_query_data;
    std::shared_ptr<aperi::FunctionEvaluationProcessor<1>> m_value_from_generalized_field_processor;
    std::shared_ptr<aperi::NodeProcessor<3>> m_node_processor;
};

// Test the FunctionEvaluationProcessor
TEST_F(FunctionEvaluationProcessorTestFixture, FunctionEvaluationProcessor) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    BuildFunctionEvaluationProcessor();
    FillSrcFieldWithLinearFieldsValues(1.0, {2.0, 3.0, 4.0});

    m_search_processor->AddSelfAsNeighbor({"block_1"});
    BuildFunctionCreationProcessor();
    aperi::BasesLinear bases;
    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel, bases);

    m_value_from_generalized_field_processor->ComputeValues();
    m_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
    m_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();

    CheckThatFieldsMatch<aperi::FieldDataTopologyRank::NODE, double>(*m_mesh_data, {"block_1"}, m_src_and_dest_field_query_data[0].name, m_src_and_dest_field_query_data[1].name, aperi::FieldQueryState::None);
}

// Test the FunctionEvaluationProcessor with more neighbors
TEST_F(FunctionEvaluationProcessorTestFixture, FunctionEvaluationProcessorMoreNeighbors) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    BuildFunctionEvaluationProcessor();
    FillSrcFieldWithLinearFieldsValues(1.0, {2.0, 3.0, 4.0});

    aperi::NeighborSelectorFunctor functor(m_mesh_data);
    m_search_processor->AddNeighborsWithinConstantSizedBall({"block_1"}, {2.0}, functor);
    BuildFunctionCreationProcessor();
    aperi::BasesLinear bases;
    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel, bases);

    m_value_from_generalized_field_processor->ComputeValues();
    m_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
    m_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();

    CheckThatFieldsMatch<aperi::FieldDataTopologyRank::NODE, double>(*m_mesh_data, {"block_1"}, m_src_and_dest_field_query_data[0].name, m_src_and_dest_field_query_data[1].name, aperi::FieldQueryState::None);
}