#pragma once

#include <mpi.h>

#include <memory>
#include <string>
#include <vector>

namespace aperi {
class BoundaryCondition;
class IoInputFile;
class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;
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
    Application(MPI_Comm& comm) : m_comm(comm) {}

    /**
     * @brief Destructor.
     */
    ~Application() {}

    /**
     * @brief The main driver for the application.
     *
     * This method reads the input file, gets the field data and initial conditions,
     * creates the IO mesh object, reads the mesh, and creates the field results file.
     *
     * @param input_filename The name of the input file.
     */
    void Run(const std::string& input_filename);

    /**
     * @brief Finalizes the application.
     *
     * This method should be called at the end of the application to clean up resources.
     */
    void Finalize();

   private:
    MPI_Comm m_comm;                                                                                ///< The MPI_Comm object for managing the parallel computation.
    std::shared_ptr<aperi::IoInputFile> m_io_input_file;                                            ///< The input file.
    std::shared_ptr<aperi::IoMesh> m_io_mesh;                                                       ///< The IO mesh object.
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> m_internal_force_contributions;  ///< The internal force contributions.
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> m_external_force_contributions;  ///< The external force contributions.
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;                   ///< The boundary conditions.
    std::shared_ptr<aperi::Solver> m_solver;                                                        ///< The solver.
};

}  // namespace aperi
