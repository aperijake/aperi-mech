#pragma once

#include <mpi.h>

#include <memory>
#include <string>
#include <vector>

#include "TimerTypes.h"  // Added include

namespace YAML {
class Node;
}

namespace aperi {
class IoInputFile;
class Solver;

/**
 * @class Application
 * @brief Main class for managing the application.
 *
 * This class is responsible for running the application, which includes reading the input file,
 * getting the field data and initial conditions, creating the IO mesh object, reading the mesh,
 * and creating the field results file.
 */
class Application {
   public:
    /**
     * @brief Constructor that takes an MPI_Comm object.
     * @param comm The MPI_Comm object for managing the parallel computation.
     */
    Application(MPI_Comm comm, bool dump_performance_data = false)
        : m_comm(comm) {}

    /**
     * @brief Destructor.
     */
    ~Application() {}

    /**
     * @brief A method to create and run the application.
     *
     * This method reads the input file, creates the IO mesh object, and calls the Run method that
     * takes an IoInputFile object.
     *
     * @param input_filename The name of the input file.
     * @param add_faces A flag to determine if faces should be added to the mesh.
     */
    void CreateSolverAndRun(const std::string& input_filename, bool add_faces = false);

    /**
     * @brief A method to create the solver.
     *
     * This method reads the input yaml data, creates the IoInputFile object, and calls the Run method that
     * takes an IoInputFile object.
     *
     * @param input_filename The name of the input file.
     * @param add_faces A flag to determine if faces should be added to the mesh.
     */
    std::shared_ptr<aperi::Solver> CreateSolver(const std::string& input_filename, bool add_faces = false);

    /**
     * @brief A method to create the solver.
     *
     * This method reads the input yaml data, creates the IoInputFile object, and calls the Run method that
     * takes an IoInputFile object.
     *
     * @param yaml_data The YAML node representing the input data.
     * @param add_faces A flag to determine if faces should be added to the mesh.
     */
    std::shared_ptr<aperi::Solver> CreateSolver(const YAML::Node& yaml_data, bool add_faces = false);

    /**
     * @brief A method to create the solver.
     *
     * This method takes an IoInputFile object and creates the solver.
     *
     * @param io_input_file The IoInputFile object.
     * @param add_faces A flag to determine if faces should be added to the mesh.
     */
    std::shared_ptr<aperi::Solver> CreateSolver(std::shared_ptr<aperi::IoInputFile> io_input_file, bool add_faces = false);

    /**
     * @brief Runs the application.
     *
     * This takes in a solver object and runs it.
     *
     * @param solver The solver object.
     * @return The average compute time per step.
     */
    double Run(std::shared_ptr<aperi::Solver> solver);

    /**
     * @brief Finalizes the application.
     */
    void Finalize();

   private:
    MPI_Comm m_comm;  ///< The MPI_Comm object for managing the parallel computation.
};

}  // namespace aperi