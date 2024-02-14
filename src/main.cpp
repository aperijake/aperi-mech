#include <mpi.h>
#include <yaml-cpp/yaml.h>

#include <iostream>
#include <stk_util/environment/Env.hpp>

#include "Application.h"

int main(int argc, char* argv[]) {
    // Initialize MPI and get communicator for the current process
    MPI_Init(&argc, &argv);
    MPI_Comm comm = MPI_COMM_WORLD;

    // Get rank and size of the current process
    int rank;
    int size;
    MPI_Comm_rank(comm, &rank);
    MPI_Comm_size(comm, &size);

    // Print number of processes
    sierra::Env::outputP0() << "Running on " << size << " processes." << std::endl;

    // Check if input filename is provided as a command-line argument
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <input_filename>" << std::endl;
        return 1;
    }

    // Get input filename from command-line argument
    std::string input_filename = argv[1];

    // Create an application object
    aperi::Application application(comm);

    // Run the application
    application.Run(input_filename);

    // Finalize MPI and clean up
    MPI_Finalize();

    return 0;
}