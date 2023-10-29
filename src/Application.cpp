#include "Application.h"

#include <yaml-cpp/yaml.h>

#include <stk_io/Heartbeat.hpp>

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

    // Create solver
    m_solver = acm::CreateSolver();

    // Run solver
    m_solver->Solve();

    // Write results
    stk::io::HeartbeatType heartbeat_type = stk::io::NONE;  // Format of heartbeat output. One of binary = stk::io::NONE, stk::io::BINARY, stk::io::CSV, stk::io::TS_CSV, stk::io::TEXT, stk::io::TS_TEXT, stk::io::SPYHIS;
    int interpolation_intervals = 0;                        // Number of intervals to divide each input time step into
    m_io_mesh->WriteFieldResults(m_io_input_file->GetOutputFile(), heartbeat_type, interpolation_intervals);
}

}  // namespace acm