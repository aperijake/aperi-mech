#include "Application.h"

#include <yaml-cpp/yaml.h>

#include <stk_util/environment/Env.hpp>  // for outputP0

#include "FieldManager.h"
#include "ForceContribution.h"
#include "InitialConditionManager.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "Solver.h"
#include "YamlUtils.h"

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

    // Get parts
    std::vector<YAML::Node> parts = m_io_input_file->GetParts();

    // Loop over parts, create materials, and add parts to force contributions
    for (auto part : parts) {
        YAML::Node material_node = m_io_input_file->GetMaterialFromPart(part);
        std::shared_ptr<acm::Material> material = CreateMaterial(material_node);
        std::string part_location = part["location"].as<std::string>();
        // TODO(jake): add part to ForceContribution
        m_force_contributions.push_back(CreateInternalForceContribution(material));
    }

    // Get loads
    std::vector<YAML::Node> loads = m_io_input_file->GetLoads();

    // Loop over loads and add them to force contributions
    for (auto load : loads) {
        m_external_force_contributions.push_back(CreateExternalForceContribution(load));
    }

    // Create solver
    m_solver = acm::CreateSolver(m_io_mesh, m_force_contributions, m_external_force_contributions);

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