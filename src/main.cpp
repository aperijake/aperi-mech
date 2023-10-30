#include <yaml-cpp/yaml.h>

#include <iostream>
#include <stk_util/parallel/Parallel.hpp>

#include "Application.h"

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

    // Create an application object
    acm::Application application(comm);

    // Run the application
    application.Run(input_filename);

    // Finalize the application
    application.Finalize();

    // Finalize MPI and clean up
    stk::parallel_machine_finalize();

    return 0;
}