#pragma once

#include <mpi.h>

#include <memory>
#include <string>
#include <vector>

namespace acm {
class IoInputFile;
class IoMesh;
class FieldManager;
class InternalForceContribution;
class ExternalForceContribution;
class Solver;

class Application {
   public:
    Application(MPI_Comm& comm) : m_comm(comm) {}
    ~Application() {}

    void Run(std::string& input_filename);
    void Finalize();

   private:
    MPI_Comm m_comm;
    std::shared_ptr<acm::IoInputFile> m_io_input_file;
    std::shared_ptr<acm::IoMesh> m_io_mesh;
    std::vector<std::shared_ptr<acm::InternalForceContribution>> m_internal_force_contributions;
    std::vector<std::shared_ptr<acm::ExternalForceContribution>> m_external_force_contributions;
    std::shared_ptr<acm::FieldManager> m_field_manager;
    std::shared_ptr<acm::Solver> m_solver;
};

}  // namespace acm
