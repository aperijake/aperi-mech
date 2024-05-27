#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/Types.hpp>

#include "Constants.h"
#include "FieldData.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"
#include "UnitTestUtils.h"

using DoubleField = stk::mesh::Field<double>;
using NgpDoubleField = stk::mesh::NgpField<double>;

class NeighborSearchProcessorTestFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

    void CreateMeshAndProcessors(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z, const std::vector<aperi::FieldQueryData> &extra_fields = {}) {
        MPI_Comm p_communicator = MPI_COMM_WORLD;
        m_bulk_data = stk::mesh::MeshBuilder(p_communicator).create();
        m_bulk_data->mesh_meta_data().use_simple_fields();
        stk::mesh::MetaData *p_meta_data = &m_bulk_data->mesh_meta_data();

        stk::io::StkMeshIoBroker mesh_reader;
        mesh_reader.set_bulk_data(*m_bulk_data);
        const std::string mesh_spec = "generated:" + std::to_string(num_elements_x) + "x" + std::to_string(num_elements_y) + "x" + std::to_string(num_elements_z) + "|tets";
        mesh_reader.add_mesh_database(mesh_spec, stk::io::READ_MESH);
        mesh_reader.create_input_mesh();
        mesh_reader.add_all_mesh_fields_as_input_fields();

        // Create the fields, start with nodes
        m_node_num_neighbors_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "num_neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_num_neighbors_field, 1);

        m_node_neighbors_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_neighbors_field, aperi::MAX_NODE_NUM_NEIGHBORS);

        m_node_neighbors_function_values_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "function_values", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_neighbors_function_values_field, aperi::MAX_NODE_NUM_NEIGHBORS);

        m_kernel_radius_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "kernel_radius", 1);
        stk::mesh::put_field_on_entire_mesh(*m_kernel_radius_field, 1);

        // Create the fields, same thing for elements
        m_element_num_neighbors_field = &p_meta_data->declare_field<double>(stk::topology::ELEMENT_RANK, "num_neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_element_num_neighbors_field, 1);

        m_element_neighbors_field = &p_meta_data->declare_field<double>(stk::topology::ELEMENT_RANK, "neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_element_neighbors_field, aperi::MAX_CELL_NUM_NEIGHBORS);

        // Create the extra fields
        for (const auto &field_query_data : extra_fields) {
            stk::mesh::Field<double> *p_field = &p_meta_data->declare_field<double>(field_query_data.rank == aperi::FieldDataRank::NODE ? stk::topology::NODE_RANK : stk::topology::ELEMENT_RANK, field_query_data.name, 1);
            stk::mesh::put_field_on_entire_mesh(*p_field, 3);  // Hardcoded to 3 components. TODO(jake): Make this more flexible
        }

        mesh_reader.populate_bulk_data();

        // Create the mesh data
        m_mesh_data = std::make_shared<aperi::MeshData>(m_bulk_data.get());

        // Create the NeighborSearchProcessor
        m_search_processor = std::make_shared<aperi::NeighborSearchProcessor>(m_mesh_data);
    }

    size_t m_num_elements_x = 1;
    size_t m_num_elements_y = 1;
    size_t m_num_elements_z = 4;
    std::shared_ptr<stk::mesh::BulkData> m_bulk_data;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    DoubleField *m_node_num_neighbors_field;
    DoubleField *m_node_neighbors_field;
    DoubleField *m_node_neighbors_function_values_field;
    DoubleField *m_kernel_radius_field;
    DoubleField *m_element_num_neighbors_field;
    DoubleField *m_element_neighbors_field;
    std::vector<aperi::FieldQueryData> m_extra_fields;
    std::shared_ptr<aperi::NeighborSearchProcessor> m_search_processor;
};

TEST_F(NeighborSearchProcessorTestFixture, Ring0SearchElement) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    CreateMeshAndProcessors(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_elements_ring_0_nodes();
    m_search_processor->MarkAndSyncFieldsToHost();
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
    m_search_processor->MarkAndSyncFieldsToHost();
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
    m_search_processor->MarkAndSyncFieldsToHost();
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
    m_search_processor->add_nodes_neighbors_within_constant_ball(0.5);  // Small ball radius, only neighbor is itself
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->MarkAndSyncFieldsToHost();
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
    m_search_processor->add_nodes_neighbors_within_constant_ball(1.01 * diagonal_length);  // Large ball radius, all nodes are neighbors
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->MarkAndSyncFieldsToHost();
    // Num nodes
    double num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    std::array<double, 1> expected_num_neighbors_data = {num_nodes};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

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
    m_search_processor->add_nodes_neighbors_within_constant_ball(1.01);  // Mid ball radius
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->MarkAndSyncFieldsToHost();
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
    m_search_processor->MarkAndSyncFieldsToHost();

    BuildFunctionValueStorageProcessor();

    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_function_value_storage_processor->MarkAndSyncFieldsToHost();

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