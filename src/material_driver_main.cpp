#include <mpi.h>

#include <Kokkos_Core.hpp>
#include <iostream>
#include <string>

#include "LogUtils.h"
#include "MaterialDriver.h"

int main(int argc, char* argv[]) {
    // Initialize Kokkos and MPI and get communicator for the current process
    Kokkos::initialize(argc, argv);
    MPI_Init(&argc, &argv);

    // Check if input filename is provided as a command-line argument
    if (argc < 2) {
        aperi::CerrP0() << "Usage: " << argv[0] << " <input_filename>" << std::endl;
        MPI_Finalize();
        return 1;
    }

    // Get input filename from command-line argument
    std::string input_filename = argv[1];

    // Run the application
    aperi::RunMaterialDriver(input_filename);

    // Finalize Kokkos and MPI
    Kokkos::finalize();
    MPI_Finalize();

    return 0;
}