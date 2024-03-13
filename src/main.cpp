#include <mpi.h>
#include <mfem.hpp>

#include <iostream>

#include "Application.h"
#include "LogUtils.h"

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

    // Get size of the current process
    int size;
    MPI_Comm_size(comm, &size);

    // Print number of processes
    aperi::CoutP0() << "Running on " << size << " processes." << std::endl;

    // Check if input filename is provided as a command-line argument
    if (argc < 2) {
        aperi::CerrP0() << "Usage: " << argv[0] << " <input_filename>" << std::endl;
        MPI_Finalize();
        return 1;
    }

    // Get input filename from command-line argument
    std::string input_filename = argv[1];

    // Run the application
    RunApplication(input_filename, comm);

    aperi::CoutP0() << "aperi-mech finished successfully!" << std::endl;

    // Finalize MPI and clean up
    MPI_Finalize();

    return 0;
}