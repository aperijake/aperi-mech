#pragma once

#include <mpi.h>

#include <memory>
#include <string>

class IoInputFile;
class IoMesh;

namespace acm {
class FieldManager;
class Solver;

class Application {
   public:
    Application(MPI_Comm& comm) : m_comm(comm) {}
    ~Application() {}

    void Run(std::string& input_filename);

   private:
    MPI_Comm m_comm;
    std::shared_ptr<IoInputFile> m_io_input_file;
    std::shared_ptr<IoMesh> m_io_mesh;
    std::shared_ptr<acm::FieldManager> m_field_manager;
    std::shared_ptr<acm::Solver> m_solver;
};

}  // namespace acm
