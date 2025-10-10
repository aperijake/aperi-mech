#include <Trilinos_version.h>
#include <mpi.h>

#include <Kokkos_Core.hpp>
#include <chrono>
#include <ctime>
#include <iomanip>
#include <iostream>
#include <stk_util/Version.hpp>
#include <string>

#include "Application.h"
#include "LogUtils.h"
#include "SimpleTimerFactory.h"
#include "TimerTypes.h"
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

void PrintHeader(const std::chrono::system_clock::time_point& start_time, int size) {
    aperi::CoutP0() << "############################################\n";
    aperi::CoutP0() << "                aperi-mech\n";
    aperi::CoutP0() << "############################################\n"
                    << std::endl;
    aperi::CoutP0() << "Compile time information:\n";
    aperi::CoutP0() << "  Version: ";
    PrintVersion();
    aperi::CoutP0() << "  Git Branch: " << GIT_BRANCH << std::endl;
    aperi::CoutP0() << "  Git Tag: " << GIT_TAG << std::endl;
    aperi::CoutP0() << "  Trilinos Version: " << TRILINOS_VERSION_STRING << std::endl;
    aperi::CoutP0() << "  STK Version: " << stk::version_string() << std::endl;
    aperi::CoutP0() << "  Build Date: " << BUILD_DATE << std::endl;
    aperi::CoutP0() << "  Build Time: " << BUILD_TIME << std::endl;
    if (std::string(PROTEGO_MECH) == "ON") {
        aperi::CoutP0() << "  With protego-mech" << std::endl;
    }
    aperi::CoutP0() << "############################################\n"
                    << std::endl;
    std::time_t start_time_t = std::chrono::system_clock::to_time_t(start_time);
    std::tm start_tm = *std::localtime(&start_time_t);

    // Print runtime information
    aperi::CoutP0() << "Runtime information:" << std::endl;
    aperi::CoutP0() << "  MPI rank count: " << size << std::endl;
#if defined(KOKKOS_ENABLE_CUDA)
    aperi::CoutP0() << "  Execution Space: CUDA (GPU)" << std::endl;
    aperi::CoutP0() << "  CUDA concurrency: " << Kokkos::Cuda::concurrency() << std::endl;
#elif defined(KOKKOS_ENABLE_HIP)
    aperi::CoutP0() << "  Execution Space: HIP (GPU)" << std::endl;
    aperi::CoutP0() << "  HIP concurrency: " << Kokkos::HIP::concurrency() << std::endl;
#elif defined(KOKKOS_ENABLE_OPENMP)
    aperi::CoutP0() << "  Execution Space: OpenMP (CPU)" << std::endl;
    aperi::CoutP0() << "  OpenMP concurrency: " << Kokkos::OpenMP::concurrency() << std::endl;
#elif defined(KOKKOS_ENABLE_THREADS)
    aperi::CoutP0() << "  Execution Space: Threads (CPU)" << std::endl;
    aperi::CoutP0() << "  Threads concurrency: " << Kokkos::Threads::concurrency() << std::endl;
#elif defined(KOKKOS_ENABLE_SERIAL)
    aperi::CoutP0() << "  Execution Space: Serial (CPU)" << std::endl;
    aperi::CoutP0() << "  Serial concurrency: " << Kokkos::Serial::concurrency() << std::endl;
#else
    aperi::CoutP0() << "  Execution Space: Unknown" << std::endl;
#endif
    aperi::CoutP0() << "  Started at: " << std::put_time(&start_tm, "%Y-%m-%d %H:%M:%S") << std::endl;
    aperi::CoutP0() << "############################################\n"
                    << std::endl;
}

void PrintFooter(const std::chrono::system_clock::time_point& end_time, const std::chrono::system_clock::time_point& start_time, const std::string& timer_filename) {
    std::time_t end_time_t = std::chrono::system_clock::to_time_t(end_time);
    std::tm end_tm = *std::localtime(&end_time_t);
    std::chrono::duration<double> total_time = end_time - start_time;

    aperi::CoutP0() << "aperi-mech finished successfully!" << std::endl;
    aperi::CoutP0() << "Finished at: " << std::put_time(&end_tm, "%Y-%m-%d %H:%M:%S") << std::endl;
    aperi::CoutP0() << "Total time: " << std::scientific << std::setprecision(2) << total_time.count() << " seconds" << std::endl;
    aperi::CoutP0() << "For detailed performance data, check the timer log file: " << timer_filename << std::endl;
    aperi::CoutP0() << "(use the print_timing_log.py script for a more readable output)" << std::endl;
    aperi::CoutP0() << "############################################" << std::endl;
}

void PrintUsage(const char* argv0) {
    aperi::CoutP0() << "Usage: " << argv0 << " <input_filename>" << std::endl;
    aperi::CoutP0() << "       " << argv0 << " <input_filename> --dump-performance-data [runstring]" << std::endl;
    aperi::CoutP0() << "       " << argv0 << " --version" << std::endl;
    aperi::CoutP0() << "       " << argv0 << " --help" << std::endl;
    Kokkos::finalize();
    MPI_Finalize();
}

int main(int argc, char* argv[]) {
    MPI_Init(&argc, &argv);
    try {
        // Initialize Kokkos and MPI and get communicator for the current process
        Kokkos::initialize(argc, argv);
        MPI_Comm p_comm = MPI_COMM_WORLD;

        // Create csv files of timing data or not
        bool dump_performance_data = false;
        std::string performance_data_runstring = "";

        // Check if the first command-line argument is "--version"
        if (argc > 1) {
            if (std::string(argv[1]) == "--version") {
                PrintVersion();
                Kokkos::finalize();
                MPI_Finalize();
                return 0;
            }
            if (std::string(argv[1]) == "--help") {
                PrintUsage(argv[0]);
                return 0;
            }
        }
        if (argc == 1) {
            aperi::CerrP0() << "ERROR: No command-line arguments provided." << std::endl;
            PrintUsage(argv[0]);
            return 1;
        }
        if (argc > 2) {
            if (std::string(argv[2]) == "--dump-performance-data") {
                dump_performance_data = true;
                if (argc > 3) {
                    performance_data_runstring = std::string(argv[3]);
                }
            } else {
                aperi::CerrP0() << "ERROR: Invalid command-line argument provided." << std::endl;
                PrintUsage(argv[0]);
                return 1;
            }
        }
        if (argc > 4) {
            aperi::CerrP0() << "ERROR: Too many command-line arguments provided." << std::endl;
            PrintUsage(argv[0]);
            return 1;
        }

        // Get size of the current process
        int size;
        MPI_Comm_size(p_comm, &size);

        // Get start time
        auto start_time = std::chrono::system_clock::now();

        // Print header and number of processes
        PrintHeader(start_time, size);
        // Check if input filename is provided as a command-line argument
        if (argc < 2) {
            aperi::CerrP0() << "Usage: " << argv[0] << " <input_filename>" << std::endl;
            MPI_Finalize();
            return 1;
        }

        // Get input filename from command-line argument
        std::string input_filename = argv[1];

        // Create a name for the timer file: input_filename - extension + _timer.log
        std::string timer_filename = "timing_" + input_filename.substr(0, input_filename.find_last_of('.')) + ".log";

        // Replace spaces with underscores
        std::replace(timer_filename.begin(), timer_filename.end(), ' ', '_');

        // Remove the file if it already exists
        std::remove(timer_filename.c_str());

        // Set the default log file for all timers created by this factory
        aperi::SimpleTimerFactory::SetDefaultLogFile(timer_filename);

        // Set whether all timers created should use accurate timing (Kokkos::fence())
        aperi::SimpleTimerFactory::SetAccurateTimers(dump_performance_data);
        {
            // Create a simple timer to measure the total time taken by the application
            auto timer = aperi::SimpleTimerFactory::Create(aperi::ApplicationTimerType::Total, aperi::application_timer_map);

            // Run the application
            RunApplication(input_filename, p_comm);
        }

        // Print footer
        auto end_time = std::chrono::system_clock::now();
        PrintFooter(end_time, start_time, timer_filename);

        // Finalize Kokkos and MPI
        Kokkos::finalize();
        MPI_Finalize();

        return 0;
    } catch (const std::exception& e) {
        std::cerr << "Fatal error: " << e.what() << std::endl;
        MPI_Abort(MPI_COMM_WORLD, 1);
    }
}
