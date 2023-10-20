#include <Ioss_ElementBlock.h>
#include <Ioss_IOFactory.h>
#include <Ioss_NodeBlock.h>

#include <iostream>
#include <stk_io/Heartbeat.hpp>
#include <stk_util/parallel/Parallel.hpp>

#include "../include/IoMesh.h"

IoMesh CreateIoMesh(const stk::ParallelMachine& comm) {
    bool add_edges = false;                 //  create all internal edges in the mesh
    bool add_faces = false;                 //  create all internal faces in the mesh
    bool upward_connectivity = true;        // create upward connectivity/adjacency in the mesh
    bool aura_option = false;               //  create aura ghosting around each MPI rank
    std::string parallel_io = "pnetcdf";    // Method to use for parallel io. One of mpiio, mpiposix, or pnetcdf
    std::string decomp_method = "rcb";      // Decomposition method.  One of: linear, rcb, rib, hsfc, block, cyclic, random, kway, geom_kway, metis_sfc
    bool compose_output = false;            // Create a single output file: true|false"
    int compression_level = 0;              // Compression level [1..9] to use
    bool compression_shuffle = false;       // Use shuffle filter prior to compressing data: true|false
    bool lower_case_variable_names = true;  // Convert variable names to lowercase and replace spaces in names with underscore
    int integer_size = 4;                   // Use 4 or 8-byte integers for input and output
    // int initial_bucket_capacity = 0;
    // int maximum_bucket_capacity = 0;

    IoMesh io_mesh(comm, add_edges, add_faces, upward_connectivity, aura_option, parallel_io, decomp_method,
                   compose_output, compression_level, compression_shuffle, lower_case_variable_names, integer_size);

    return io_mesh;
}

int main(int argc, char* argv[]) {
    // Initialize MPI and get communicator for the current process
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Get the rank and number of processes
    int my_rank = stk::parallel_machine_rank(comm);
    int num_procs = stk::parallel_machine_size(comm);

    // Print rank and number of processes
    std::cout << "Process " << my_rank << " out of " << num_procs << " processes." << std::endl;

    std::string working_directory = "./";         // Working directory with trailing '/'
    std::string input_filename = "cylinder.exo";  // Input mesh file
    std::string output_filename = "results.exo";  // Output results file
    std::string type = "exodusii";                // File type.  One of: exodusii
    int interpolation_intervals = 0;              // Number of intervals to divide each input time step into

    // Read mesh
    IoMesh io_mesh = CreateIoMesh(comm);
    io_mesh.ReadMesh(type, working_directory, input_filename, interpolation_intervals);

    // Write results
    stk::io::HeartbeatType heartbeat_type = stk::io::NONE;  // Format of heartbeat output. One of binary = stk::io::NONE, stk::io::BINARY, stk::io::CSV, stk::io::TS_CSV, stk::io::TEXT, stk::io::TS_TEXT, stk::io::SPYHIS;
    io_mesh.WriteFieldResults(type, working_directory, output_filename, heartbeat_type, interpolation_intervals);

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}