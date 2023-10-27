#include <Ioss_ElementBlock.h>
#include <Ioss_IOFactory.h>
#include <Ioss_NodeBlock.h>

#include <iostream>
#include <stk_io/Heartbeat.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_util/parallel/Parallel.hpp>

#include "IoInputFile.h"
#include "IoMesh.h"
#include "IoUtils.h"

// Enum for field data types
enum class FieldDataType { SCALAR,
                           VECTOR,
                           TENSOR };

struct FieldData {
    std::string name;
    FieldDataType data_type;
    int number_of_states;
    std::vector<double> initial_values;
};

void SetupFields(stk::mesh::MetaData& meta_data) {
    std::vector<FieldData> field_data;
    field_data.push_back({"velocity", FieldDataType::VECTOR, 2, {1.0, 2.0, 3.0}});
    field_data.push_back({"displacement", FieldDataType::VECTOR, 2, {4.0, 5.0, 6.0}});
    field_data.push_back({"acceleration", FieldDataType::VECTOR, 2, {-4.0, -5.0, -6.0}});

    // Loop over fields
    for (const auto& field : field_data) {
        // Define the field data type
        typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorFieldType;

        // Create the field
        VectorFieldType& vector_field = meta_data.declare_field<VectorFieldType>(stk::topology::NODE_RANK, field.name, field.number_of_states);

        // Set the field properties
        stk::mesh::put_field_on_entire_mesh_with_initial_value(vector_field, field.initial_values.data());

        // Set the field role to TRANSIENT
        stk::io::set_field_role(vector_field, Ioss::Field::TRANSIENT);
    }
}

int main(int argc, char* argv[]) {
    // Initialize MPI and get communicator for the current process
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Get the rank and number of processes
    int my_rank = stk::parallel_machine_rank(comm);
    int num_procs = stk::parallel_machine_size(comm);

    // Print rank and number of processes
    std::cout << "Process " << my_rank << " out of " << num_procs << " processes." << std::endl;

    // Check if input filename is provided as a command-line argument
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <input_filename>" << std::endl;
        return 1;
    }

    // Get input filename from command-line argument
    std::string input_filename = argv[1];

    // Read input file
    IoInputFile io_input_file = ReadInputFile(input_filename);

    // Read mesh
    IoMesh io_mesh = ReadMesh(comm, io_input_file.GetMeshFile(), std::bind(SetupFields, std::placeholders::_1));

    // Write results
    WriteResults(io_mesh, io_input_file.GetOutputFile());

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}