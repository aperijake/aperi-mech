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

#include "FieldData.h"
#include "MeshData.h"
#include "NodeProcessor.h"
#include "UnitTestUtils.h"

typedef stk::mesh::Field<double> DoubleField;

struct UpdateVelocity {
    double time_increment;

    UpdateVelocity(double time_increment) : time_increment(time_increment) {}

    KOKKOS_INLINE_FUNCTION
    void operator()(double *velocity_data_np1, double *velocity_data_n, double *acceleration_data_n) const {
        *velocity_data_np1 = *velocity_data_n + time_increment * *acceleration_data_n;
    }
};

class NodeProcessingTestFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

    void AddMeshDatabase(size_t num_elements_x, size_t num_elements_y, size_t num_elements_z) {
        MPI_Comm communicator = MPI_COMM_WORLD;
        bulk_data = stk::mesh::MeshBuilder(communicator).create();
        bulk_data->mesh_meta_data().use_simple_fields();
        stk::mesh::MetaData *meta_data = &bulk_data->mesh_meta_data();

        stk::io::StkMeshIoBroker mesh_reader;
        mesh_reader.set_bulk_data(*bulk_data);
        const std::string mesh_spec = "generated:" + std::to_string(num_elements_x) + "x" + std::to_string(num_elements_y) + "x" + std::to_string(num_elements_z);
        mesh_reader.add_mesh_database(mesh_spec, stk::io::READ_MESH);
        mesh_reader.create_input_mesh();
        mesh_reader.add_all_mesh_fields_as_input_fields();

        // Create the fields
        DoubleField *velocity_field = &meta_data->declare_field<double>(stk::topology::NODE_RANK, "velocity", 2);
        stk::mesh::put_field_on_entire_mesh(*velocity_field, 3);
        stk::io::set_field_output_type(*velocity_field, stk::io::FieldOutputType::VECTOR_3D);
        stk::io::set_field_role(*velocity_field, Ioss::Field::TRANSIENT);

        DoubleField *acceleration_field = &meta_data->declare_field<double>(stk::topology::NODE_RANK, "acceleration", 2);
        stk::mesh::put_field_on_entire_mesh(*acceleration_field, 3);
        stk::io::set_field_output_type(*acceleration_field, stk::io::FieldOutputType::VECTOR_3D);
        stk::io::set_field_role(*acceleration_field, Ioss::Field::TRANSIENT);

        mesh_reader.populate_bulk_data();

        // Get the field states
        velocity_field_np1 = &velocity_field->field_of_state(stk::mesh::StateNP1);

        // Create the mesh data
        mesh_data = std::make_shared<aperi::MeshData>(bulk_data.get());

        // Create the field query data
        std::array<aperi::FieldQueryData, 3> field_query_data_vec;
        field_query_data_vec[0] = {"velocity", aperi::FieldQueryState::NP1};
        field_query_data_vec[1] = {"velocity", aperi::FieldQueryState::N};
        field_query_data_vec[2] = {"acceleration", aperi::FieldQueryState::N};

        // Create the node processor
        node_processor_stk_ngp = std::make_shared<aperi::NodeProcessor<3>>(field_query_data_vec, mesh_data);

        // Fill the fields with initial values
        FillFields();
    }

    void FillFields() {
        // On device
        node_processor_stk_ngp->FillField(0.0, 0);
        node_processor_stk_ngp->FillField(initial_velocity, 1);
        node_processor_stk_ngp->FillField(initial_acceleration, 2);

        // Mark Modified
        node_processor_stk_ngp->MarkAllFieldsModifiedOnDevice();

        // Sync to host
        node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    }

    void ForEachEntityRun(double time_increment) {
        UpdateVelocity update_velocity(time_increment);
        node_processor_stk_ngp->for_each_component(update_velocity);
        node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    }

    double time_increment = 0.123;
    double initial_velocity = -2.7;
    double initial_acceleration = 3.1;
    size_t num_elements_x = 10;
    size_t num_elements_y = 10;
    size_t num_elements_z = 10;
    std::shared_ptr<stk::mesh::BulkData> bulk_data;
    DoubleField *velocity_field_np1;
    std::shared_ptr<aperi::MeshData> mesh_data;
    std::shared_ptr<aperi::NodeProcessor<3>> node_processor_stk_ngp;
};

// Test FillFields method
TEST_F(NodeProcessingTestFixture, FillFields) {
    AddMeshDatabase(num_elements_x, num_elements_y, num_elements_z);
    node_processor_stk_ngp->FillField(1.78, 0);
    node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    std::array<double, 3> expected_velocity_data_np1 = {1.78, 1.78, 1.78};
    CheckNodeFieldValues(*mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);
}

// Test for_component_i method
TEST_F(NodeProcessingTestFixture, NodeProcessorForDofI) {
    AddMeshDatabase(num_elements_x, num_elements_y, num_elements_z);

    aperi::FillFieldFunctor fill_field_functor_1(2.89);
    node_processor_stk_ngp->for_component_i(fill_field_functor_1, 1, 0);
    node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    node_processor_stk_ngp->SyncAllFieldsDeviceToHost();

    aperi::FillFieldFunctor fill_field_functor_2(3.79);
    node_processor_stk_ngp->for_component_i(fill_field_functor_2, 2, 0);
    node_processor_stk_ngp->MarkFieldModifiedOnDevice(0);
    node_processor_stk_ngp->SyncAllFieldsDeviceToHost();

    std::array<double, 3> expected_velocity_data_np1 = {0.0, 2.89, 3.79};
    CheckNodeFieldValues(*mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);
}

// Test for_each_component method
TEST_F(NodeProcessingTestFixture, NodeProcessorForEachDof) {
    AddMeshDatabase(num_elements_x, num_elements_y, num_elements_z);
    // Run the for_each_component method
    ForEachEntityRun(time_increment);
    node_processor_stk_ngp->SyncAllFieldsDeviceToHost();
    // Velocity should be updated to initial_velocity + time_increment * initial_acceleration
    double expected_velocity = initial_velocity + time_increment * initial_acceleration;
    std::array<double, 3> expected_velocity_data_np1 = {expected_velocity, expected_velocity, expected_velocity};
    CheckNodeFieldValues(*mesh_data, {"block_1"}, "velocity", expected_velocity_data_np1, aperi::FieldQueryState::NP1);

    // Flipping the states should set the velocity_data_np1 to the initial_velocity
    mesh_data->UpdateFieldDataStates();  // Updates host only
    std::array<double, 3> expected_velocity_data_n = {initial_velocity, initial_velocity, initial_velocity};
    CheckNodeFieldValues(*mesh_data, {"block_1"}, "velocity", expected_velocity_data_n, aperi::FieldQueryState::NP1);

    // TODO(jake): Add test for field data on device
}

// TODO(jake): Add a lot more tests