#include <Ioss_ElementBlock.h>
#include <Ioss_IOFactory.h>
#include <Ioss_NodeBlock.h>

#include <iostream>
#include <stk_io/Heartbeat.hpp>
#include <stk_util/parallel/Parallel.hpp>

#include "IoInputFile.h"
#include "IoMesh.h"
#include "IoUtils.h"

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
    IoMesh io_mesh = ReadMesh(comm, io_input_file.GetMeshFile());

    // Write results
    WriteResults(io_mesh, io_input_file.GetOutputFile());

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}