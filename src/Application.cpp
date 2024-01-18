#include "Application.h"

#include <yaml-cpp/yaml.h>

#include <stk_util/environment/Env.hpp>  // for outputP0

#include "FieldManager.h"
#include "ForceContribution.h"
#include "InitialConditionManager.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "Solver.h"
#include "TimeStepper.h"
#include "YamlUtils.h"

namespace aperi {

void Application::Run(std::string& input_filename) {
    // TODO(jake): hard coding to 1 procedure for now. Fix this when we have multiple procedures.
    int procedure_id = 0;

    // Create an IO input file object and read the input file
    m_io_input_file = CreateIoInputFile(input_filename);

    // Get field data and initial conditions
    // STK QUESTION: Thoughts on how I am doing this.
    std::vector<aperi::FieldData> field_data = aperi::GetFieldData();
    std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(procedure_id);
    AddInitialConditions(initial_conditions, field_data);

    // Create field manager
    m_field_manager = CreateFieldManager(field_data);

    // Create an IO mesh object
    // STK QUESTION: Most of the next few sections are from /stk/stk_io/example
    // STK QUESTION: Should that example be elsewhere in the repo?
    // STK QUESTION: Is this the best way to do this?
    IoMeshParameters io_mesh_parameters;  // Default parameters
    io_mesh_parameters.compose_output = true;
    m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

    // Read the mesh
    m_io_mesh->ReadMesh(m_io_input_file->GetMeshFile(procedure_id), m_field_manager);

    // Create the field results file
    m_io_mesh->CreateFieldResultsFile(m_io_input_file->GetOutputFile(procedure_id));

    // Get parts
    std::vector<YAML::Node> parts = m_io_input_file->GetParts(procedure_id);

    // Loop over parts, create materials, and add parts to force contributions
    for (auto part : parts) {
        YAML::Node material_node = m_io_input_file->GetMaterialFromPart(part);
        std::shared_ptr<aperi::Material> material = CreateMaterial(material_node);
        std::string part_location = part["set"].as<std::string>();
        std::cout << "Adding part " << part_location << " to force contributions" << std::endl;
        // TODO(jake): Make sure the part exists. This will just continue if it doesn't.
        // STK QUESTION: How do I check if a part exists? I could probably RTFM this one.
        // STK QUESTION: Is declaring a part here the right thing to do? Is there a more appropriate way?
        // STK QUESTION: Would it be better to pass a selector here instead of a part?
        stk::mesh::Part* stk_part = &m_io_mesh->GetMetaData().declare_part(part_location, stk::topology::ELEMENT_RANK);
        m_internal_force_contributions.push_back(CreateInternalForceContribution(material, stk_part));
    }

    // Get loads
    std::vector<YAML::Node> loads = m_io_input_file->GetLoads(procedure_id);

    // Loop over loads and add them to force contributions
    for (auto load : loads) {
        std::string name = load.begin()->first.as<std::string>();
        std::cout << "Adding load " << name << " to force contributions" << std::endl;
        m_external_force_contributions.push_back(CreateExternalForceContribution(load, m_io_mesh->GetMetaData()));
    }

    // Get the time stepper
    std::shared_ptr<aperi::TimeStepper> time_stepper = CreateTimeStepper(m_io_input_file->GetTimeStepper(procedure_id));

    // Create solver
    m_solver = aperi::CreateSolver(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, time_stepper);

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

}  // namespace aperi