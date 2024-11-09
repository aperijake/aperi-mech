#include <gtest/gtest.h>
#include <mpi.h>

#include <filesystem>
#include <iomanip>
#include <stk_io/StkMeshIoBroker.hpp>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/MeshBuilder.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Types.hpp>

#include "EntityProcessor.h"
#include "FieldData.h"
#include "MeshData.h"
#include "UnitTestUtils.h"

using DoubleField = stk::mesh::Field<double>;

struct UpdateVelocity {
    double time_increment;

    explicit UpdateVelocity(double time_increment) : time_increment(time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *velocity_data_np1, const double *velocity_data_n, const double *acceleration_data_n) const {
        *velocity_data_np1 = *velocity_data_n + time_increment * *acceleration_data_n;
    }
};

class NodeProcessingTestFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

    void AddMeshDatabase(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z) {
        MPI_Comm p_communicator = MPI_COMM_WORLD;
        m_bulk_data = stk::mesh::MeshBuilder(p_communicator).create();
        m_bulk_data->mesh_meta_data().use_simple_fields();
        stk::mesh::MetaData *p_meta_data = &m_bulk_data->mesh_meta_data();

        stk::io::StkMeshIoBroker mesh_reader;
        mesh_reader.set_bulk_data(*m_bulk_data);
        const std::string mesh_spec = "generated:" + std::to_string(num_elements_x) + "x" + std::to_string(num_elements_y) + "x" + std::to_string(num_elements_z);
        mesh_reader.add_mesh_database(mesh_spec, stk::io::READ_MESH);
        mesh_reader.create_input_mesh();
        mesh_reader.add_all_mesh_fields_as_input_fields();

        // Create the fields
        DoubleField *p_velocity_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "velocity", 2);
        stk::mesh::put_field_on_entire_mesh(*p_velocity_field, 3);
        stk::io::set_field_output_type(*p_velocity_field, stk::io::FieldOutputType::VECTOR_3D);
        stk::io::set_field_role(*p_velocity_field, Ioss::Field::TRANSIENT);

        DoubleField *p_acceleration_field = &p_meta_data->declare_field<double>(stk::topology::NODE_RANK, "acceleration", 2);
        stk::mesh::put_field_on_entire_mesh(*p_acceleration_field, 3);
        stk::io::set_field_output_type(*p_acceleration_field, stk::io::FieldOutputType::VECTOR_3D);
        stk::io::set_field_role(*p_acceleration_field, Ioss::Field::TRANSIENT);

        mesh_reader.populate_bulk_data();

        // Get the field states
        m_velocity_field_np1 = &p_velocity_field->field_of_state(stk::mesh::StateNP1);

        // Create the mesh data
        m_mesh_data = std::make_shared<aperi::MeshData>(m_bulk_data.get());

        // Create the field query data
        std::array<aperi::FieldQueryData<double>, 3> field_query_data_vec;
        field_query_data_vec[0] = {"velocity", aperi::FieldQueryState::NP1};
        field_query_data_vec[1] = {"velocity", aperi::FieldQueryState::N};
        field_query_data_vec[2] = {"acceleration", aperi::FieldQueryState::N};

        // Create the node processor
        m_node_processor_stk_ngp = std::make_shared<aperi::NodeProcessor<3>>(field_query_data_vec, m_mesh_data);

        // Fill the fields with initial values
        FillFields();
    }

    void FillFields() {
        // On device
        m_node_processor_stk_ngp->FillField(0.0, 0);
        m_node_processor_stk_ngp->FillField(m_initial_velocity, 1);
        m_node_processor_stk_ngp->FillField(m_initial_acceleration, 2);

        // Mark Modified
        m_node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();

        // Sync to host
        m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    }

    void ForEachEntityRun(double time_increment) {
        UpdateVelocity update_velocity(time_increment);
        m_node_processor_stk_ngp->for_each_component(update_velocity);
        m_node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    }

    double m_time_increment = 0.123;
    double m_initial_velocity = -2.7;
    double m_initial_acceleration = 3.1;
    size_t m_num_elements_x = 10;
    size_t m_num_elements_y = 10;
    size_t m_num_elements_z = 10;
    std::shared_ptr<stk::mesh::BulkData> m_bulk_data;
    DoubleField *m_velocity_field_np1;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::NodeProcessor<3>> m_node_processor_stk_ngp;
};

// Test FillFields method
TEST_F(NodeProcessingTestFixture, FillFields) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    std::array<double, 3> expected_velocity_data_np1 = {1.78, 1.78, 1.78};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);
}

// Test RandomizeField method
TEST_F(NodeProcessingTestFixture, RandomizeField) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Randomize the last two fields with the same seed
    m_node_processor_stk_ngp->RandomizeField(1, 0, 1, 3);
    m_node_processor_stk_ngp->RandomizeField(2, 0, 1, 3);
    m_node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    CheckThatFieldsMatch<aperi::FieldDataTopologyRank::NODE, double>(*m_mesh_data, {"block_1"}, "velocity", "acceleration", aperi::FieldQueryState::N);
    // Make sure the norm is not zero
    EXPECT_NE(m_node_processor_stk_ngp->CalculateFieldNorm(1), 0.0);
}

// Test ComputeDotProduct method
TEST_F(NodeProcessingTestFixture, ComputeDotProduct) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    size_t num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    size_t num_components = 3;
    size_t num_dofs = num_nodes * num_components;
    // Fill the fields with initial values
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->FillField(2.89, 1);
    m_node_processor_stk_ngp->FillField(3.79, 2);
    m_node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Compute the dot product
    double dot_product_01 = m_node_processor_stk_ngp->ComputeDotProduct(0, 1);
    double dot_product_02 = m_node_processor_stk_ngp->ComputeDotProduct(0, 2);
    double dot_product_12 = m_node_processor_stk_ngp->ComputeDotProduct(1, 2);
    // Expected dot products
    double expected_dot_product_01 = num_dofs * 1.78 * 2.89;
    double expected_dot_product_02 = num_dofs * 1.78 * 3.79;
    double expected_dot_product_12 = num_dofs * 2.89 * 3.79;
    // Check the dot products
    EXPECT_NEAR(dot_product_01, expected_dot_product_01, 1.0e-8);
    EXPECT_NEAR(dot_product_02, expected_dot_product_02, 1.0e-8);
    EXPECT_NEAR(dot_product_12, expected_dot_product_12, 1.0e-8);
}

// Tests SumField method
TEST_F(NodeProcessingTestFixture, SumField) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    size_t num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    size_t num_components = 3;
    size_t num_dofs = num_nodes * num_components;
    // Fill the fields with initial values
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->FillField(2.89, 1);
    m_node_processor_stk_ngp->FillField(3.79, 2);
    // Expected magnitudes
    double expected_magnitude_0 = num_dofs * 1.78;
    double expected_magnitude_1 = num_dofs * 2.89;
    double expected_magnitude_2 = num_dofs * 3.79;
    // Check the magnitudes
    EXPECT_NEAR(m_node_processor_stk_ngp->SumField(0), expected_magnitude_0, 1.0e-8);
    EXPECT_NEAR(m_node_processor_stk_ngp->SumField(1), expected_magnitude_1, 1.0e-8);
    EXPECT_NEAR(m_node_processor_stk_ngp->SumField(2), expected_magnitude_2, 1.0e-8);
}

// Test MinMaxField method
TEST_F(NodeProcessingTestFixture, MinMaxField) {
    // TODO(jake): Use something other then a constant value for the fields
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Fill the fields with initial values
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->FillField(2.89, 1);
    m_node_processor_stk_ngp->FillField(3.79, 2);
    m_node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Compute the min and max values
    std::pair<double, double> min_max_0 = m_node_processor_stk_ngp->MinMaxField(0);
    std::pair<double, double> min_max_1 = m_node_processor_stk_ngp->MinMaxField(1);
    std::pair<double, double> min_max_2 = m_node_processor_stk_ngp->MinMaxField(2);
    // Expected min and max values
    std::pair<double, double> expected_min_max_0 = {1.78, 1.78};
    std::pair<double, double> expected_min_max_1 = {2.89, 2.89};
    std::pair<double, double> expected_min_max_2 = {3.79, 3.79};
    // Check the min and max values
    EXPECT_EQ(min_max_0, expected_min_max_0);
    EXPECT_EQ(min_max_1, expected_min_max_1);
    EXPECT_EQ(min_max_2, expected_min_max_2);
}

// Test ComputeNorm method
TEST_F(NodeProcessingTestFixture, CalculateFieldNorm) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    size_t num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    size_t num_components = 3;
    size_t num_dofs = num_nodes * num_components;
    // Fill the fields with initial values
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->FillField(2.89, 1);
    m_node_processor_stk_ngp->FillField(3.79, 2);
    // Expected magnitudes
    double expected_magnitude_0 = std::sqrt(num_dofs * (1.78 * 1.78));
    double expected_magnitude_1 = std::sqrt(num_dofs * (2.89 * 2.89));
    double expected_magnitude_2 = std::sqrt(num_dofs * (3.79 * 3.79));
    // Check the magnitudes
    EXPECT_NEAR(m_node_processor_stk_ngp->CalculateFieldNorm(0), expected_magnitude_0, 1.0e-8);
    EXPECT_NEAR(m_node_processor_stk_ngp->CalculateFieldNorm(1), expected_magnitude_1, 1.0e-8);
    EXPECT_NEAR(m_node_processor_stk_ngp->CalculateFieldNorm(2), expected_magnitude_2, 1.0e-8);
}

// Test NormalizeField method
TEST_F(NodeProcessingTestFixture, NormalizeField) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    size_t num_nodes = (m_num_elements_x + 1) * (m_num_elements_y + 1) * (m_num_elements_z + 1);
    size_t num_components = 3;
    size_t num_dofs = num_nodes * num_components;
    // Fill the fields with initial values
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->FillField(2.89, 1);
    m_node_processor_stk_ngp->FillField(3.79, 2);
    m_node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Normalize the fields
    double magnitude_0 = m_node_processor_stk_ngp->NormalizeField(0);
    double magnitude_1 = m_node_processor_stk_ngp->NormalizeField(1);
    double magnitude_2 = m_node_processor_stk_ngp->NormalizeField(2);
    m_node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Expected magnitudes
    double expected_magnitude_0 = std::sqrt(num_dofs * (1.78 * 1.78));
    double expected_magnitude_1 = std::sqrt(num_dofs * (2.89 * 2.89));
    double expected_magnitude_2 = std::sqrt(num_dofs * (3.79 * 3.79));
    // Check the magnitudes
    EXPECT_NEAR(magnitude_0, expected_magnitude_0, 1.0e-8);
    EXPECT_NEAR(magnitude_1, expected_magnitude_1, 1.0e-8);
    EXPECT_NEAR(magnitude_2, expected_magnitude_2, 1.0e-8);
    // Expected normalized values
    double expected_normalized_0 = 1.78 / expected_magnitude_0;
    double expected_normalized_1 = 2.89 / expected_magnitude_1;
    double expected_normalized_2 = 3.79 / expected_magnitude_2;
    // Check the normalized values
    std::array<double, 3> expected_normalized_data_0 = {expected_normalized_0, expected_normalized_0, expected_normalized_0};
    std::array<double, 3> expected_normalized_data_1 = {expected_normalized_1, expected_normalized_1, expected_normalized_1};
    std::array<double, 3> expected_normalized_data_2 = {expected_normalized_2, expected_normalized_2, expected_normalized_2};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_normalized_data_0, aperi::FieldQueryState::NP1);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_normalized_data_1, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "acceleration", expected_normalized_data_2, aperi::FieldQueryState::N);
}

// Test ScaleAndMultiplyField method
TEST_F(NodeProcessingTestFixture, ScaleAndMultiplyField) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Fill the fields with initial values
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->FillField(2.89, 1);
    // Scale and multiply the fields
    m_node_processor_stk_ngp->ScaleAndMultiplyField(0, 1, 0.5);
    m_node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Expected values
    std::array<double, 3> expected_data_01 = {2.5721, 2.5721, 2.5721};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_data_01, aperi::FieldQueryState::NP1);
}

// Test CopyFieldData method
TEST_F(NodeProcessingTestFixture, CopyFieldData) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Fill the fields with initial values
    m_node_processor_stk_ngp->FillField(1.78, 0);
    m_node_processor_stk_ngp->FillField(2.89, 1);
    m_node_processor_stk_ngp->FillField(3.79, 2);
    // Copy the fields
    m_node_processor_stk_ngp->CopyFieldData(0, 1);
    m_node_processor_stk_ngp->CopyFieldData(0, 2);
    m_node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Expected values
    std::array<double, 3> expected_velocity_data_np1 = {1.78, 1.78, 1.78};
    std::array<double, 3> expected_velocity_data_n = {1.78, 1.78, 1.78};
    std::array<double, 3> expected_acceleration_data_n = {1.78, 1.78, 1.78};
    // Check the copied values
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_n, aperi::FieldQueryState::N);
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "acceleration", expected_acceleration_data_n, aperi::FieldQueryState::N);
}

// Test for_component_i method
TEST_F(NodeProcessingTestFixture, NodeProcessorForDofI) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);

    aperi::FillFieldFunctor fill_field_functor_1(2.89);
    m_node_processor_stk_ngp->for_component_i(fill_field_functor_1, 1, 0);
    m_node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();

    aperi::FillFieldFunctor fill_field_functor_2(3.79);
    m_node_processor_stk_ngp->for_component_i(fill_field_functor_2, 2, 0);
    m_node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();

    std::array<double, 3> expected_velocity_data_np1 = {0.0, 2.89, 3.79};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);
}

// Test for_each_component method
TEST_F(NodeProcessingTestFixture, NodeProcessorForEachDof) {
    AddMeshDatabase(m_num_elements_x, m_num_elements_y, m_num_elements_z);
    // Run the for_each_component method
    ForEachEntityRun(m_time_increment);
    m_node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Velocity should be updated to initial_velocity + time_increment * initial_acceleration
    double expected_velocity = m_initial_velocity + m_time_increment * m_initial_acceleration;
    std::array<double, 3> expected_velocity_data_np1 = {expected_velocity, expected_velocity, expected_velocity};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);

    // Flipping the states should set the velocity_data_np1 to the initial_velocity
    m_mesh_data->UpdateFieldDataStates();  // Updates host only
    std::array<double, 3> expected_velocity_data_n = {m_initial_velocity, m_initial_velocity, m_initial_velocity};
    CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_n, aperi::FieldQueryState::NP1);

    // TODO(jake): Add test for field data on device
}

// TODO(jake): Add a lot more tests