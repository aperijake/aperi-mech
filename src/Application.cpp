#include "Application.h"

#include <yaml-cpp/yaml.h>

#include <stk_util/environment/Env.hpp>  // for outputP0

#include "FieldManager.h"
#include "InitialConditionManager.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "Solver.h"

namespace acm {

void Application::Run(std::string& input_filename) {
    // Create an IO input file object and read the input file
    m_io_input_file = CreateIoInputFile(input_filename);

    // Get field data and initial conditions
    std::vector<acm::FieldData> field_data = acm::GetFieldData();
    std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions();
    AddInitialConditions(initial_conditions, field_data);

    // Create field manager
    m_field_manager = CreateFieldManager(field_data);

    // Create an IO mesh object
    IoMeshParameters io_mesh_parameters;  // Default parameters
    io_mesh_parameters.compose_output = true;
    m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

    // Read the mesh
    m_io_mesh->ReadMesh(m_io_input_file->GetMeshFile(), m_field_manager);

    // Create the field results file
    m_io_mesh->CreateFieldResultsFile(m_io_input_file->GetOutputFile());

    // Create solver
    m_solver = acm::CreateSolver(m_io_mesh);

    // Run solver
    sierra::Env::outputP0() << "Starting Solver" << std::endl;
    m_solver->Solve();
    sierra::Env::outputP0() << "Finished Solver" << std::endl;

    // Finalize
    Finalize();
}

void Application::Finalize() {
    MPI_Barrier(m_comm);
    m_io_mesh->Finalize();
}

}  // namespace acm