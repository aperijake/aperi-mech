#include "Application.h"

#include <yaml-cpp/yaml.h>

#include "BoundaryCondition.h"
#include "ExternalForceContribution.h"
#include "FieldData.h"
#include "InitialConditionUtil.h"
#include "InternalForceContribution.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "LogUtils.h"
#include "Scheduler.h"
#include "Solver.h"
#include "TimeStepper.h"
#include "YamlUtils.h"

namespace aperi {

void Application::Run(const std::string& input_filename) {
    // TODO(jake): hard coding to 1 procedure for now. Fix this when we have multiple procedures.
    int procedure_id = 0;

    // Create an IO input file object and read the input file
    m_io_input_file = CreateIoInputFile(input_filename);

    // Create an IO mesh object
    // STK QUESTION: Most of IoMesh is from /stk/stk_io/example
    // STK QUESTION: Should that example be elsewhere in the repo?
    // STK QUESTION: Is this the best way to do this?
    IoMeshParameters io_mesh_parameters;  // Default parameters
    io_mesh_parameters.compose_output = true;
    m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

    // Get parts
    std::vector<YAML::Node> parts = m_io_input_file->GetParts(procedure_id);

    // Get part names
    std::vector<std::string> part_names;
    for (auto part : parts) {
        part_names.push_back(part["set"].as<std::string>());
    }

    // Get field data
    std::vector<aperi::FieldData> field_data = aperi::GetFieldData();

    // Read the mesh
    m_io_mesh->ReadMesh(m_io_input_file->GetMeshFile(procedure_id), part_names, field_data);

    // Create the field results file
    m_io_mesh->CreateFieldResultsFile(m_io_input_file->GetOutputFile(procedure_id));

    // Loop over parts, create materials, and add parts to force contributions
    for (auto part : parts) {
        YAML::Node material_node = m_io_input_file->GetMaterialFromPart(part);
        std::shared_ptr<aperi::Material> material = CreateMaterial(material_node);
        std::string part_location = part["set"].as<std::string>();
        aperi::CoutP0() << "Adding part " << part_location << " to force contributions" << std::endl;
        stk::mesh::Part* stk_part = m_io_mesh->GetMetaData().get_part(part_location);
        m_internal_force_contributions.push_back(CreateInternalForceContribution(material, stk_part));
    }

    // Get loads
    std::vector<YAML::Node> loads = m_io_input_file->GetLoads(procedure_id);

    // Loop over loads and add them to force contributions
    for (auto load : loads) {
        std::string name = load.begin()->first.as<std::string>();
        aperi::CoutP0() << "Adding load " << name << " to force contributions" << std::endl;
        m_external_force_contributions.push_back(CreateExternalForceContribution(load, m_io_mesh->GetMetaData()));
    }

    // Set initial conditions
    std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(procedure_id);
    aperi::AddInitialConditions(initial_conditions, m_io_mesh->GetMeshData());

    // Get boundary conditions
    std::vector<YAML::Node> boundary_conditions = m_io_input_file->GetBoundaryConditions(procedure_id);

    // Loop over boundary conditions and add them to the vector of boundary conditions
    for (auto boundary_condition : boundary_conditions) {
        std::string name = boundary_condition.begin()->first.as<std::string>();
        aperi::CoutP0() << "Adding boundary condition " << name << " to boundary conditions" << std::endl;
        m_boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition, m_io_mesh->GetMeshData()));
    }

    // Get the time stepper
    std::shared_ptr<aperi::TimeStepper> time_stepper = CreateTimeStepper(m_io_input_file->GetTimeStepper(procedure_id));

    // Get the output scheduler
    std::shared_ptr<aperi::Scheduler> output_scheduler = CreateScheduler(m_io_input_file->GetOutputScheduler(procedure_id));

    // Create solver
    m_solver = aperi::CreateSolver(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, m_boundary_conditions, time_stepper, output_scheduler);

    // Run solver
    aperi::CoutP0() << "Starting Solver" << std::endl;
    m_solver->Solve();
    aperi::CoutP0() << "Finished Solver" << std::endl;

    // Finalize
    Finalize();
}

void Application::Finalize() {
    MPI_Barrier(m_comm);
    m_io_mesh->Finalize();
    aperi::CoutP0() << "Application Finalized" << std::endl;
}

}  // namespace aperi
