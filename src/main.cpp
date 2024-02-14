#include <mpi.h>
#include <yaml-cpp/yaml.h>

#include <iostream>

#include "Application.h"

void RunApplication(const std::string& input_filename, MPI_Comm comm) {
    // Create an application object
    aperi::Application application(comm);

    // Run the application
    application.Run(input_filename);
}

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
    if (rank == 0) {
        std::cout << "Running on " << size << " processes." << std::endl;
    }

    // Check if input filename is provided as a command-line argument
    if (argc < 2) {
        if (rank == 0) {
            std::cerr << "Usage: " << argv[0] << " <input_filename>" << std::endl;
        }
        MPI_Finalize();
        return 1;
    }

    // Get input filename from command-line argument
    std::string input_filename = argv[1];

    // Run the application
    RunApplication(input_filename, comm);

    // Finalize MPI and clean up
    MPI_Finalize();

    if (rank == 0) {
        std::cout << "aperi-mech finished successfully!" << std::endl;
    }

    return 0;
}