#include <mpi.h>

#include <Kokkos_Core.hpp>
#include <chrono>
#include <ctime>
#include <iomanip>
#include <iostream>

#include "Application.h"
#include "LogUtils.h"
#include "git_commit.h"

void RunApplication(const std::string& input_filename, MPI_Comm comm) {
    // Create an application object
    aperi::Application application(comm);

    // Run the application
    application.CreateSolverAndRun(input_filename);
}

void PrintVersion() {
    std::string version;
    version += std::string(GIT_COMMIT_HASH) + "-" + std::string(BUILD_TYPE) + "-" + std::string(GPU_OR_CPU);
    if (std::string(PROTEGO_MECH) == "ON") {
        version += "-protego-mech";
    }
    if (std::string(GIT_DIRTY) == "dirty") {
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
    if (std::string(PROTEGO_MECH) == "ON") {
        aperi::CoutP0() << "  With protego-mech" << std::endl;
    }
    aperi::CoutP0() << "############################################\n"
                    << std::endl;
}

int main(int argc, char* argv[]) {
    // Initialize Kokkos and MPI and get communicator for the current process
    Kokkos::initialize(argc, argv);
    MPI_Init(&argc, &argv);
    MPI_Comm p_comm = MPI_COMM_WORLD;

    // Check if the first command-line argument is "--version"
    if (argc > 1 && std::string(argv[1]) == "--version") {
        PrintVersion();
        Kokkos::finalize();
        MPI_Finalize();
        return 0;
    }

    // Get size of the current process
    int size;
    MPI_Comm_size(p_comm, &size);

    // Print header and number of processes
    PrintHeader();
    auto start_time = std::chrono::system_clock::now();
    std::time_t start_time_t = std::chrono::system_clock::to_time_t(start_time);
    std::tm start_tm = *std::localtime(&start_time_t);

    aperi::CoutP0() << "Running on " << size << " processes." << std::endl;
    aperi::CoutP0() << "Started at: " << std::put_time(&start_tm, "%Y-%m-%d %H:%M:%S") << std::endl;

    // Check if input filename is provided as a command-line argument
    if (argc < 2) {
        aperi::CerrP0() << "Usage: " << argv[0] << " <input_filename>" << std::endl;
        MPI_Finalize();
        return 1;
    }

    // Get input filename from command-line argument
    std::string input_filename = argv[1];

    // Run the application
    RunApplication(input_filename, p_comm);

    // Print footer
    auto end_time = std::chrono::system_clock::now();
    std::time_t end_time_t = std::chrono::system_clock::to_time_t(end_time);
    std::tm end_tm = *std::localtime(&end_time_t);
    std::chrono::duration<double> total_time = end_time - start_time;

    aperi::CoutP0() << "aperi-mech finished successfully!" << std::endl;
    aperi::CoutP0() << "Finished at: " << std::put_time(&end_tm, "%Y-%m-%d %H:%M:%S") << std::endl;
    aperi::CoutP0() << "Total time: " << std::scientific << std::setprecision(2) << total_time.count() << " seconds" << std::endl;
    aperi::CoutP0() << "############################################" << std::endl;

    // Finalize Kokkos and MPI
    Kokkos::finalize();
    MPI_Finalize();

    return 0;
}