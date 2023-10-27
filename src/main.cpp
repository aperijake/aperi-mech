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

void SetupFields(stk::mesh::MetaData& meta_data) {
    // Define the field data type
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorFieldType;

    // Define the field name and number of states
    std::string field_name = "velocity";
    unsigned num_states = 1;

    // Create the field
    VectorFieldType& vector_field = meta_data.declare_field<VectorFieldType>(stk::topology::NODE_RANK, field_name, num_states);

    // Set the field properties
    const double initial_value[3] = {1.0, 2.0, 3.0};
    stk::mesh::put_field_on_entire_mesh_with_initial_value(vector_field, initial_value);

    // Set the field role to TRANSIENT
    stk::io::set_field_role(vector_field, Ioss::Field::TRANSIENT);
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