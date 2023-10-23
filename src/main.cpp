#include <Ioss_ElementBlock.h>
#include <Ioss_IOFactory.h>
#include <Ioss_NodeBlock.h>

#include <iostream>
#include <stk_io/Heartbeat.hpp>
#include <stk_util/parallel/Parallel.hpp>

#include "IoMesh.h"

int main(int argc, char* argv[]) {
    // Initialize MPI and get communicator for the current process
    stk::ParallelMachine comm = stk::parallel_machine_init(&argc, &argv);

    // Get the rank and number of processes
    int my_rank = stk::parallel_machine_rank(comm);
    int num_procs = stk::parallel_machine_size(comm);

    // Print rank and number of processes
    std::cout << "Process " << my_rank << " out of " << num_procs << " processes." << std::endl;

    /* Create input file format. Replace with data from input file. To start, also need:
       - Material:
          - Density
          - Young's Modulus
          - Poisson's Ratio
       - Timestep
       - Output frequency
       - Boundary conditions
       - Initial conditions
    */
    std::string input_filename = "./cylinder.exo";  // Input mesh file
    std::string output_filename = "./results.exo";  // Output results file

    std::string type = "exodusii";    // File type.  One of: exodusii
    int interpolation_intervals = 0;  // Number of intervals to divide each input time step into

    // Read mesh
    IoMeshParameters io_mesh_parameters;  // Default parameters
    IoMesh io_mesh(comm, io_mesh_parameters);
    io_mesh.ReadMesh(type, input_filename, interpolation_intervals);

    // Write results
    stk::io::HeartbeatType heartbeat_type = stk::io::NONE;  // Format of heartbeat output. One of binary = stk::io::NONE, stk::io::BINARY, stk::io::CSV, stk::io::TS_CSV, stk::io::TEXT, stk::io::TS_TEXT, stk::io::SPYHIS;
    io_mesh.WriteFieldResults(type, output_filename, heartbeat_type, interpolation_intervals);

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}