#pragma once

#include <mpi.h>

#include <memory>
#include <string>
#include <vector>

#include "Timer.h"

namespace YAML {
class Node;
}

namespace aperi {
class BoundaryCondition;
class IoInputFile;
class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;
class Solver;

enum class ApplicationTimerType {
    ReadInputMesh,
    CreateFieldResultsFile,
    CreateTimeStepper,
    CreateInternalForceContribution,
    AddFieldsToMesh,
    LabelMesh,
    CreateExternalForceContribution,
    AddInitialConditions,
    CreateBoundaryConditions,
    CreateOutputScheduler,
    Preprocessing,
    NONE
};

inline const std::map<ApplicationTimerType, std::string> application_timer_map = {
    {ApplicationTimerType::ReadInputMesh, "ReadInputMesh"},
    {ApplicationTimerType::CreateFieldResultsFile, "CreateFieldResultsFile"},
    {ApplicationTimerType::CreateTimeStepper, "CreateTimeStepper"},
    {ApplicationTimerType::CreateInternalForceContribution, "CreateInternalForceContribution"},
    {ApplicationTimerType::AddFieldsToMesh, "AddFieldsToMesh"},
    {ApplicationTimerType::LabelMesh, "LabelMesh"},
    {ApplicationTimerType::CreateExternalForceContribution, "CreateExternalForceContribution"},
    {ApplicationTimerType::AddInitialConditions, "AddInitialConditions"},
    {ApplicationTimerType::CreateBoundaryConditions, "CreateBoundaryConditions"},
    {ApplicationTimerType::CreateOutputScheduler, "CreateOutputScheduler"},
    {ApplicationTimerType::Preprocessing, "Preprocessing"},
    {ApplicationTimerType::NONE, "NONE"}};

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
    Application(MPI_Comm comm, bool dump_performance_data = false, const std::string& performance_data_runstring = "")
        : m_comm(comm), m_dump_performance_data(dump_performance_data), m_performance_data_runstring(performance_data_runstring) {}

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
     */
    void CreateSolverAndRun(const std::string& input_filename);

    /**
     * @brief A method to create the solver.
     *
     * This method reads the input yaml data, creates the IoInputFile object, and calls the Run method that
     * takes an IoInputFile object.
     *
     * @param input_filename The name of the input file.
     */
    std::shared_ptr<aperi::Solver> CreateSolver(const std::string& input_filename);

    /**
     * @brief A method to create the solver.
     *
     * This method reads the input yaml data, creates the IoInputFile object, and calls the Run method that
     * takes an IoInputFile object.
     *
     * @param yaml_data The YAML node representing the input data.
     */
    std::shared_ptr<aperi::Solver> CreateSolver(const YAML::Node& yaml_data);

    /**
     * @brief A method to create the solver.
     *
     * This method takes an IoInputFile object and creates the solver.
     */
    std::shared_ptr<aperi::Solver> CreateSolver(std::shared_ptr<aperi::IoInputFile> io_input_file);

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
    MPI_Comm m_comm;                                      ///< The MPI_Comm object for managing the parallel computation.
    const bool m_dump_performance_data;                   ///< A flag to determine if performance data should be dumped to a CSV file.
    const std::string m_performance_data_runstring = "";  ///< The runstring for the performance data.
};

}  // namespace aperi
