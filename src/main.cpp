#include <mpi.h>

#include <Kokkos_Core.hpp>
#include <iostream>
#include <mfem.hpp>

#include "Application.h"
#include "LogUtils.h"
#include "git_commit.h"

void RunApplication(const std::string& input_filename, MPI_Comm comm) {
    // Create an application object
    aperi::Application application(comm);

    // Run the application
    application.Run(input_filename);
}

void PrintVersion() {
    std::string version;
    version += std::string(GIT_COMMIT_HASH) + "-" + std::string(BUILD_TYPE) + "-" + std::string(GPU_OR_CPU);
    if (std::string(GIT_DIRTY) == "dirty"){
        version += "-uncommitted_changes";
    }
    aperi::CoutP0() << version << std::endl;
}

void PrintHeader() {
    aperi::CoutP0() << "############################################" << std::endl;
    aperi::CoutP0() << "                aperi-mech\n"
                    << std::endl;
    aperi::CoutP0() << "  Version: ";
    PrintVersion();
    aperi::CoutP0() << "  Git Branch: " << GIT_BRANCH << std::endl;
    aperi::CoutP0() << "  Git Tag: " << GIT_TAG << std::endl;
    aperi::CoutP0() << "  Build Date: " << BUILD_DATE << std::endl;
    aperi::CoutP0() << "  Build Time: " << BUILD_TIME << std::endl;
    aperi::CoutP0() << "############################################\n"
                    << std::endl;
}

int main(int argc, char* argv[]) {
    // Initialize Kokkos and MPI and get communicator for the current process
    Kokkos::initialize(argc, argv);
    MPI_Init(&argc, &argv);
    MPI_Comm comm = MPI_COMM_WORLD;

    // Check if the first command-line argument is "--version"
    if (argc > 1 && std::string(argv[1]) == "--version") {
        PrintVersion();
        Kokkos::finalize();
        MPI_Finalize();
        return 0;
    }

    // Get size of the current process
    int size;
    MPI_Comm_size(comm, &size);

    // Print header and number of processes
    PrintHeader();
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

    // Finalize Kokkos and MPI
    Kokkos::finalize();
    MPI_Finalize();

    return 0;
}