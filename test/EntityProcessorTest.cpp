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
        std::array<aperi::FieldQueryData, 3> field_query_data_vec;
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
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);
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
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);
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
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);

    // Flipping the states should set the velocity_data_np1 to the initial_velocity
    m_mesh_data->UpdateFieldDataStates();  // Updates host only
    std::array<double, 3> expected_velocity_data_n = {m_initial_velocity, m_initial_velocity, m_initial_velocity};
    CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_mesh_data, {"block_1"}, "velocity", expected_velocity_data_n, aperi::FieldQueryState::NP1);

    // TODO(jake): Add test for field data on device
}

// TODO(jake): Add a lot more tests