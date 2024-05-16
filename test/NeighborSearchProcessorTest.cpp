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

typedef stk::mesh::Field<double> DoubleField;
typedef stk::mesh::NgpField<double> NgpDoubleField;

class NeighborSearchProcessorTestFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

    void AddMeshDatabase(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z) {
        MPI_Comm communicator = MPI_COMM_WORLD;
        m_bulk_data = stk::mesh::MeshBuilder(communicator).create();
        m_bulk_data->mesh_meta_data().use_simple_fields();
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        stk::io::StkMeshIoBroker mesh_reader;
        mesh_reader.set_bulk_data(*m_bulk_data);
        const std::string mesh_spec = "generated:" + std::to_string(num_elements_x) + "x" + std::to_string(num_elements_y) + "x" + std::to_string(num_elements_z) + "|tets";
        mesh_reader.add_mesh_database(mesh_spec, stk::io::READ_MESH);
        mesh_reader.create_input_mesh();
        mesh_reader.add_all_mesh_fields_as_input_fields();

        // Create the fields, start with nodes
        m_node_num_neighbors_field = &meta_data->declare_field<double>(stk::topology::NODE_RANK, "num_neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_num_neighbors_field, 1);

        m_node_neighbors_field = &meta_data->declare_field<double>(stk::topology::NODE_RANK, "neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_neighbors_field, aperi::MAX_NODE_NUM_NEIGHBORS);

        m_node_neighbors_function_values_field = &meta_data->declare_field<double>(stk::topology::NODE_RANK, "function_values", 1);
        stk::mesh::put_field_on_entire_mesh(*m_node_neighbors_function_values_field, aperi::MAX_NODE_NUM_NEIGHBORS);

        // Create the fields, same thing for elements
        m_element_num_neighbors_field = &meta_data->declare_field<double>(stk::topology::ELEMENT_RANK, "num_neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_element_num_neighbors_field, 1);

        m_element_neighbors_field = &meta_data->declare_field<double>(stk::topology::ELEMENT_RANK, "neighbors", 1);
        stk::mesh::put_field_on_entire_mesh(*m_element_neighbors_field, aperi::MAX_CELL_NUM_NEIGHBORS);

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
    DoubleField *m_element_num_neighbors_field;
    DoubleField *m_element_neighbors_field;
    std::shared_ptr<aperi::NeighborSearchProcessor> m_search_processor;
};

TEST_F(NeighborSearchProcessorTestFixture, TestRing0SearchElement) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_elements_ring_0_nodes();
    m_search_processor->MarkAndSyncFieldsToHost();
    m_search_processor->CommunicateAllFieldData();
    std::array<double, 1> expected_num_neighbors_data = {4};
    CheckEntityFieldValues<aperi::FieldDataRank::ELEMENT>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
}

TEST_F(NeighborSearchProcessorTestFixture, TestRing0SearchNode) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->MarkAndSyncFieldsToHost();
    m_search_processor->CommunicateAllFieldData();
    std::array<double, 1> expected_num_neighbors_data = {1};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
}

TEST_F(NeighborSearchProcessorTestFixture, TestFillingElementFromNodeRing0Search) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->set_element_neighbors_from_node_neighbors<4>();
    m_search_processor->MarkAndSyncFieldsToHost();
    m_search_processor->CommunicateAllFieldData();
    std::array<double, aperi::MAX_CELL_NUM_NEIGHBORS> expected_neighbors_data;
    expected_neighbors_data.fill(0.0);
    std::array<double, 1> expected_num_neighbors_data = {4};
    CheckEntityFieldValues<aperi::FieldDataRank::ELEMENT>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);
}

class FunctionValueStorageProcessorTestFixture : public NeighborSearchProcessorTestFixture {
   protected:
    void SetUp() override {
        NeighborSearchProcessorTestFixture::SetUp();
    }

    void BuildFunctors() {
        // Create the ShapeFunctionsFunctorReproducingKernel functor
        m_shape_functions_functor_reproducing_kernel = std::make_shared<aperi::ShapeFunctionsFunctorReproducingKernel<aperi::MAX_NODE_NUM_NEIGHBORS>>();

        // Create the function value storage processor
        m_function_value_storage_processor = std::make_shared<aperi::FunctionValueStorageProcessor>(m_mesh_data);
    }

    std::shared_ptr<aperi::ShapeFunctionsFunctorReproducingKernel<aperi::MAX_NODE_NUM_NEIGHBORS>> m_shape_functions_functor_reproducing_kernel;
    std::shared_ptr<aperi::FunctionValueStorageProcessor> m_function_value_storage_processor;
};

TEST_F(FunctionValueStorageProcessorTestFixture, TestNodeFunctionValueStorage) {
    // Skip if running with more than 4 processes
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 4) {
        GTEST_SKIP_("Test only runs with 4 or fewer processes.");
    }
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_search_processor->add_nodes_ring_0_nodes();
    m_search_processor->MarkAndSyncFieldsToHost();
    m_search_processor->CommunicateAllFieldData();

    BuildFunctors();

    m_function_value_storage_processor->compute_and_store_function_values<aperi::MAX_NODE_NUM_NEIGHBORS>(*m_shape_functions_functor_reproducing_kernel);

    m_function_value_storage_processor->MarkAndSyncFieldsToHost();
    m_function_value_storage_processor->CommunicateAllFieldData();

    std::array<double, 1> expected_num_neighbors_data = {1};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors_data, aperi::FieldQueryState::None);

    std::array<double, aperi::MAX_NODE_NUM_NEIGHBORS> expected_function_values_data;
    expected_function_values_data.fill(0.0);
    expected_function_values_data[0] = 1.0;
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "function_values", expected_function_values_data, aperi::FieldQueryState::None);
}