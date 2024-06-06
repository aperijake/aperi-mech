#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>

#include "Constants.h"
#include "FieldData.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "NeighborSearchProcessorTestFixture.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"
#include "UnitTestUtils.h"

TEST_F(NeighborSearchProcessorTestFixture, Ring0SearchElement) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_elements_ring_0_nodes();
    m_search_processor->SyncFieldsToHost();
    std::array<double, 1> expected_num_neighbors_data = {4};
    CheckEntityFieldValues<aperi::FieldDataRank::ELEMENT>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::NODE);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 0);  // 0 because these were not filled
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 0);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], 0);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);

    // - Element
    std::map<std::string, double> element_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);
    EXPECT_EQ(element_neighbor_stats["min_num_neighbors"], 4);
    EXPECT_EQ(element_neighbor_stats["max_num_neighbors"], 4);
    EXPECT_EQ(element_neighbor_stats["avg_num_neighbors"], 4);
    size_t expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z * 6;  // 6 tets per hex
    EXPECT_EQ(element_neighbor_stats["num_entities"], expected_num_elements);
}

TEST_F(NeighborSearchProcessorTestFixture, Ring0SearchNode) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->SyncFieldsToHost();
    std::array<double, 1> expected_num_neighbors_data = {1};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::NODE);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], 1);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);

    // - Element
    std::map<std::string, double> element_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);
    EXPECT_EQ(element_neighbor_stats["min_num_neighbors"], 0);  // 0 because these were not filled
    EXPECT_EQ(element_neighbor_stats["max_num_neighbors"], 0);
    EXPECT_EQ(element_neighbor_stats["avg_num_neighbors"], 0);
    size_t expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z * 6;  // 6 tets per hex
    EXPECT_EQ(element_neighbor_stats["num_entities"], expected_num_elements);
}

TEST_F(NeighborSearchProcessorTestFixture, FillElementFromNodeRing0Search) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->SyncFieldsToHost();
    std::array<double, aperi::MAX_CELL_NUM_NEIGHBORS> expected_neighbors_data;
    expected_neighbors_data.fill(0.0);
    std::array<double, 1> expected_num_neighbors_data = {4};
    CheckEntityFieldValues<aperi::FieldDataRank::ELEMENT>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::NODE);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], 1);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);

    // - Element
    std::map<std::string, double> element_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);
    EXPECT_EQ(element_neighbor_stats["min_num_neighbors"], 4);
    EXPECT_EQ(element_neighbor_stats["max_num_neighbors"], 4);
    EXPECT_EQ(element_neighbor_stats["avg_num_neighbors"], 4);
    size_t expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z * 6;  // 6 tets per hex
    EXPECT_EQ(element_neighbor_stats["num_entities"], expected_num_elements);
}

TEST_F(NeighborSearchProcessorTestFixture, BallSearchSmall) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double kernel_radius = 0.5;  // Small ball radius, only 1 neighbor
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->SyncFieldsToHost();
    std::array<double, 1> expected_num_neighbors_data = {1};
    std::array<double, 1> expected_kernel_radius = {kernel_radius};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radius, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::NODE);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 1);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], 1);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);

    // - Element
    std::map<std::string, double> element_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);
    EXPECT_EQ(element_neighbor_stats["min_num_neighbors"], 4);
    EXPECT_EQ(element_neighbor_stats["max_num_neighbors"], 4);
    EXPECT_EQ(element_neighbor_stats["avg_num_neighbors"], 4);
    size_t expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z * 6;  // 6 tets per hex
    EXPECT_EQ(element_neighbor_stats["num_entities"], expected_num_elements);
}

TEST_F(NeighborSearchProcessorTestFixture, BallSearchLarge) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Diagonal length of the mesh
    double diagonal_length = std::sqrt(m_num_elements_x * m_num_elements_x + m_num_elements_y * m_num_elements_y + m_num_elements_z * m_num_elements_z);
    double kernel_radius = 1.01 * diagonal_length;  // Large ball radius, all nodes are neighbors
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->SyncFieldsToHost();
    // Num nodes
    double num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    std::array<double, 1> expected_num_neighbors_data = {num_nodes};
    std::array<double, 1> expected_kernel_radius = {kernel_radius};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radius, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::NODE);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], num_nodes);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], num_nodes);
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], num_nodes);
    EXPECT_EQ(node_neighbor_stats["num_entities"], num_nodes);

    // - Element
    std::map<std::string, double> element_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);
    EXPECT_EQ(element_neighbor_stats["min_num_neighbors"], num_nodes);
    EXPECT_EQ(element_neighbor_stats["max_num_neighbors"], num_nodes);
    EXPECT_EQ(element_neighbor_stats["avg_num_neighbors"], num_nodes);
    size_t expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z * 6;  // 6 tets per hex
    EXPECT_EQ(element_neighbor_stats["num_entities"], expected_num_elements);
}

TEST_F(NeighborSearchProcessorTestFixture, BallSearchMid) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 2;
    m_num_elements_y = 2;
    m_num_elements_z = 4;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double kernel_radius = 1.01;  // Mid ball radius
    m_search_processor->add_nodes_neighbors_within_constant_ball(kernel_radius);
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->SyncFieldsToHost();
    std::array<double, 1> expected_kernel_radius = {kernel_radius};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radius, aperi::FieldQueryState::None);
    // 8 corners of the mesh = 4 neighbors
    // 20 edges of the mesh = 5 neighbors
    // 14 faces of the mesh = 6 neighbors
    // 3 interior nodes = 7 neighbors
    // Make a pair with value (num neighbors) and expected count
    std::vector<std::pair<double, size_t>> expected_num_neighbors_data = {{4, 8}, {5, 20}, {6, 14}, {7, 3}};
    CheckEntityFieldValueCount<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::NODE);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 4);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 7);
    double expected_avg_num_neighbors = (8.0 * 4.0 + 20.0 * 5.0 + 14.0 * 6.0 + 3.0 * 7.0) / expected_num_nodes;
    EXPECT_EQ(node_neighbor_stats["avg_num_neighbors"], expected_avg_num_neighbors);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);

    // - Element
    std::map<std::string, double> element_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);
    EXPECT_EQ(element_neighbor_stats["min_num_neighbors"], 12);
    EXPECT_EQ(element_neighbor_stats["max_num_neighbors"], 18);
    EXPECT_EQ(element_neighbor_stats["avg_num_neighbors"], 15);
    size_t expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z * 6;  // 6 tets per hex
    EXPECT_EQ(element_neighbor_stats["num_entities"], expected_num_elements);
}

TEST_F(NeighborSearchProcessorTestFixture, VariableBallSearch_5x5x5) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 5) {
        GTEST_SKIP_("Test only runs with 5 or fewer processes.");
    }
    m_num_elements_x = 5;
    m_num_elements_y = 5;
    m_num_elements_z = 5;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double ball_scale_factor = 1.1;
    m_search_processor->add_nodes_neighbors_within_variable_ball(ball_scale_factor);
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->SyncFieldsToHost();

    // Check the neighbor stats
    // - Node
    std::map<std::string, double> node_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::NODE);
    EXPECT_EQ(node_neighbor_stats["min_num_neighbors"], 8);
    EXPECT_EQ(node_neighbor_stats["max_num_neighbors"], 27);
    EXPECT_NEAR(node_neighbor_stats["avg_num_neighbors"], 18.713, 0.001);
    size_t expected_num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    EXPECT_EQ(node_neighbor_stats["num_entities"], expected_num_nodes);

    // - Element
    std::map<std::string, double> element_neighbor_stats = m_search_processor->GetNumNeighborStats(aperi::FieldDataRank::ELEMENT);
    EXPECT_EQ(element_neighbor_stats["min_num_neighbors"], 22);
    EXPECT_EQ(element_neighbor_stats["max_num_neighbors"], 54);
    EXPECT_NEAR(element_neighbor_stats["avg_num_neighbors"], 40.16, 0.001);
    size_t expected_num_elements = m_num_elements_x * m_num_elements_y * m_num_elements_z * 6;  // 6 tets per hex
    EXPECT_EQ(element_neighbor_stats["num_entities"], expected_num_elements);
}

TEST_F(NeighborSearchProcessorTestFixture, KernelRadius) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    m_num_elements_x = 1;
    m_num_elements_y = 1;
    m_num_elements_z = 4;
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    double kernel_radius_scale_factor = 1.01;  // Slightly larger to make sure and capture neighbors that would have been exactly on the radius
    m_search_processor->add_nodes_neighbors_within_variable_ball(kernel_radius_scale_factor);
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->SyncFieldsToHost();
    // After htet, each hex element has one pair of tets that cut across the diagonal of the hex. The rest cut across the faces.
    std::vector<std::pair<double, size_t>> expected_kernel_radii = {{std::sqrt(2.0) * kernel_radius_scale_factor, 12}, {std::sqrt(3.0) * kernel_radius_scale_factor, 8}};
    CheckEntityFieldValueCount<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "kernel_radius", expected_kernel_radii, aperi::FieldQueryState::None);
    // 8 corners of the mesh, 2 nodes will have the larger sqrt(3) radius, 6 nodes will have the smaller sqrt(2) radius.
    // 12 edges of the mesh, 6 nodes will have the larger sqrt(3) radius, 6 nodes will have the smaller sqrt(2) radius.
    // Make a pair with value (num neighbors) and expected count
    std::vector<std::pair<double, size_t>> expected_num_neighbors_data = {{7, 4}, {8, 4}, {10, 6}, {11, 2}, {12, 4}};
    CheckEntityFieldValueCount<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
}

class FunctionValueStorageProcessorTestFixture : public NeighborSearchProcessorTestFixture {
   protected:
    void SetUp() override {
        NeighborSearchProcessorTestFixture::SetUp();
    }

    void BuildFunctionValueStorageProcessor() {
        // Create the ShapeFunctionsFunctorReproducingKernel functor
        m_shape_functions_functor_reproducing_kernel = std::make_shared<aperi::ShapeFunctionsFunctorReproducingKernel<aperi::MAX_NODE_NUM_NEIGHBORS>>();

        // Create the function value storage processor
        m_function_value_storage_processor = std::make_shared<aperi::FunctionValueStorageProcessor>(m_mesh_data);
    }

    std::shared_ptr<aperi::ShapeFunctionsFunctorReproducingKernel<aperi::MAX_NODE_NUM_NEIGHBORS>> m_shape_functions_functor_reproducing_kernel;
    std::shared_ptr<aperi::FunctionValueStorageProcessor> m_function_value_storage_processor;
};

TEST_F(FunctionValueStorageProcessorTestFixture, NodeFunctionValueStorage) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->SyncFieldsToHost();

    BuildFunctionValueStorageProcessor();

    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_function_value_storage_processor->SyncFieldsToHost();

    std::array<double, 1> expected_num_neighbors_data = {1};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    std::array<double, aperi::MAX_NODE_NUM_NEIGHBORS> expected_function_values_data;
    expected_function_values_data.fill(0.0);
    expected_function_values_data[0] = 1.0;
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "function_values", expected_function_values_data, aperi::FieldQueryState::None);
}

struct FillLinearFieldFunctor {
    explicit FillLinearFieldFunctor(double slope) : m_slope(slope) {}
    KOKKOS_INLINE_FUNCTION void operator()(const double *coordinate, double *src_value, double * /*dest_value*/) const { *src_value = m_slope * *coordinate; }
    double m_slope;
};

class ValueFromGeneralizedFieldProcessorTestFixture : public FunctionValueStorageProcessorTestFixture {
   protected:
    void SetUp() override {
        FunctionValueStorageProcessorTestFixture::SetUp();
        m_src_and_dest_field_query_data.resize(2);
        m_src_and_dest_field_query_data[0] = {"src_field", aperi::FieldQueryState::None};
        m_src_and_dest_field_query_data[1] = {"dest_field", aperi::FieldQueryState::None};
    }

    void BuildValueFromGeneralizedFieldProcessor() {
        NeighborSearchProcessorTestFixture::CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z, m_src_and_dest_field_query_data);
        FunctionValueStorageProcessorTestFixture::BuildFunctionValueStorageProcessor();
        // Create the ValueFromGeneralizedFieldProcessor
        std::array<aperi::FieldQueryData, 1> src_field = {m_src_and_dest_field_query_data[0]};
        std::array<aperi::FieldQueryData, 1> dest_field = {m_src_and_dest_field_query_data[1]};
        m_value_from_generalized_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<1>>(src_field, dest_field, m_mesh_data);

        // Create the field query data, coordinates and the src and dest fields
        std::array<aperi::FieldQueryData, 3> field_query_data_vec;
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

    std::vector<aperi::FieldQueryData> m_src_and_dest_field_query_data;
    std::shared_ptr<aperi::ValueFromGeneralizedFieldProcessor<1>> m_value_from_generalized_field_processor;
    std::shared_ptr<aperi::NodeProcessor<3>> m_node_processor;
};

// Test the ValueFromGeneralizedFieldProcessor
TEST_F(ValueFromGeneralizedFieldProcessorTestFixture, ValueFromGeneralizedFieldProcessor) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    BuildValueFromGeneralizedFieldProcessor();
    FillSrcFieldWithLinearFieldsValues(1.0, {2.0, 3.0, 4.0});

    m_search_processor->add_nodes_ring_0_nodes();
    BuildFunctionValueStorageProcessor();
    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_value_from_generalized_field_processor->compute_value_from_generalized_field();
    m_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
    m_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();

    CheckThatFieldsMatch<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, m_src_and_dest_field_query_data[0].name, m_src_and_dest_field_query_data[1].name, aperi::FieldQueryState::None);
}

// Test the ValueFromGeneralizedFieldProcessor with more neighbors
TEST_F(ValueFromGeneralizedFieldProcessorTestFixture, ValueFromGeneralizedFieldProcessorMoreNeighbors) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    BuildValueFromGeneralizedFieldProcessor();
    FillSrcFieldWithLinearFieldsValues(1.0, {2.0, 3.0, 4.0});

    m_search_processor->add_nodes_neighbors_within_constant_ball(2.00);
    BuildFunctionValueStorageProcessor();
    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_value_from_generalized_field_processor->compute_value_from_generalized_field();
    m_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
    m_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();

    CheckThatFieldsMatch<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, m_src_and_dest_field_query_data[0].name, m_src_and_dest_field_query_data[1].name, aperi::FieldQueryState::None);
}