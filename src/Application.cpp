#include "Application.h"

#include <yaml-cpp/yaml.h>

#include <chrono>

#include "BoundaryCondition.h"
#include "ExternalForceContribution.h"
#include "FieldData.h"
#include "InitialConditionUtil.h"
#include "InternalForceContribution.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "LogUtils.h"
#include "MeshLabeler.h"
#include "Preprocessor.h"
#include "Scheduler.h"
#include "Solver.h"
#include "TimeStepper.h"
#include "YamlUtils.h"

namespace aperi {

void Application::Run(const std::string& input_filename) {
    aperi::CoutP0() << "############################################" << std::endl;
    aperi::CoutP0() << "Starting Application" << std::endl;
    aperi::CoutP0() << " - Reading Input File and Mesh" << std::endl;
    auto start_mesh_read = std::chrono::high_resolution_clock::now();
    // TODO(jake): hard coding to 1 procedure for now. Fix this when we have multiple procedures.
    int procedure_id = 0;

    // Create an IO input file object and read the input file
    m_io_input_file = CreateIoInputFile(input_filename);

    // Get parts
    std::vector<YAML::Node> parts = m_io_input_file->GetParts(procedure_id);

    // Get part names, and check if any parts use strain smoothing
    std::vector<std::string> part_names;
    part_names.reserve(parts.size());
    bool has_strain_smoothing = false;
    for (auto part : parts) {
        part_names.push_back(part["set"].as<std::string>());
        // Check if integration scheme is "strain_smoothing"
        if (part["formulation"]["integration_scheme"]["strain_smoothing"]) {
            has_strain_smoothing = true;
        }
    }

    // Create an IO mesh object
    IoMeshParameters io_mesh_parameters;  // Default parameters
    io_mesh_parameters.compose_output = true;
    m_io_mesh = CreateIoMesh(m_comm, io_mesh_parameters);

    // Read the mesh
    m_io_mesh->ReadMesh(m_io_input_file->GetMeshFile(procedure_id), part_names);
    auto end_mesh_read = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "   Finished Reading Input and Mesh. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_mesh_read - start_mesh_read).count() << " ms" << std::endl;
    aperi::CoutP0() << " - Setting up for the Solver" << std::endl;
    auto start_solver_setup = std::chrono::high_resolution_clock::now();

    bool uses_generalized_fields = false;

    // Loop over parts, create materials, and add parts to force contributions
    aperi::CoutP0() << "   - Adding parts to force contributions: " << std::endl;
    for (const auto& part : parts) {
        // Create InternalForceContributionParameters
        aperi::CoutP0() << "      " << part["set"].as<std::string>() << std::endl;
        InternalForceContributionParameters internal_force_contribution_parameters(part, m_io_input_file, m_io_mesh->GetMeshData());
        m_internal_force_contributions.push_back(CreateInternalForceContribution(internal_force_contribution_parameters));
        uses_generalized_fields = internal_force_contribution_parameters.approximation_space_parameters->UsesGeneralizedFields() || uses_generalized_fields;
    }

    // Get field data
    std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, has_strain_smoothing, false /* add_debug_fields */);

    // Create a mesh labeler
    std::shared_ptr<MeshLabeler> mesh_labeler = CreateMeshLabeler();
    // Add mesh labeler fields to the field data
    std::vector<FieldData> mesh_labeler_field_data = mesh_labeler->GetFieldData();
    field_data.insert(field_data.end(), mesh_labeler_field_data.begin(), mesh_labeler_field_data.end());

    // Add fields to the mesh and complete initialization
    aperi::CoutP0() << "   - Adding fields to the mesh and completing initialization" << std::endl;
    auto start_complete_initialization = std::chrono::high_resolution_clock::now();
    m_io_mesh->AddFields(field_data);
    m_io_mesh->CompleteInitialization();
    auto end_complete_initialization = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "     Finished adding fields to the mesh and completing initialization. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_complete_initialization - start_complete_initialization).count() << " ms" << std::endl;

    // Label the mesh
    aperi::CoutP0() << "   - Labeling the mesh" << std::endl;
    auto start_labeling = std::chrono::high_resolution_clock::now();
    for (const auto& part : parts) {
        MeshLabelerParameters mesh_labeler_parameters(part, m_io_mesh->GetMeshData());
        mesh_labeler->LabelPart(mesh_labeler_parameters);
    }
    auto end_labeling = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "     Finished labeling the mesh. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_labeling - start_labeling).count() << " ms" << std::endl;

    // Create the field results file
    aperi::CoutP0() << "   - Creating the field results file" << std::endl;
    auto start_field_results_file = std::chrono::high_resolution_clock::now();
    m_io_mesh->CreateFieldResultsFile(m_io_input_file->GetOutputFile(procedure_id), field_data);
    auto end_field_results_file = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "     Finished creating the field results file. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_field_results_file - start_field_results_file).count() << " ms" << std::endl;

    // Get loads
    std::vector<YAML::Node> loads = m_io_input_file->GetLoads(procedure_id);

    // Loop over loads and add them to force contributions
    aperi::CoutP0() << "   - Adding loads to force contributions: " << std::endl;
    for (auto load : loads) {
        auto name = load.begin()->first.as<std::string>();
        aperi::CoutP0() << "     " << name << std::endl;
        m_external_force_contributions.push_back(CreateExternalForceContribution(load, m_io_mesh->GetMeshData()));
    }

    // Set initial conditions
    std::vector<YAML::Node> initial_conditions = m_io_input_file->GetInitialConditions(procedure_id);
    aperi::AddInitialConditions(initial_conditions, m_io_mesh->GetMeshData());

    // Get boundary conditions
    std::vector<YAML::Node> boundary_conditions = m_io_input_file->GetBoundaryConditions(procedure_id);

    // Loop over boundary conditions and add them to the vector of boundary conditions
    aperi::CoutP0() << "   - Adding boundary conditions: " << std::endl;
    for (auto boundary_condition : boundary_conditions) {
        auto name = boundary_condition.begin()->first.as<std::string>();
        aperi::CoutP0() << "      " << name << std::endl;
        m_boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition, m_io_mesh->GetMeshData()));
    }

    // Get the time stepper
    std::shared_ptr<aperi::TimeStepper> time_stepper = CreateTimeStepper(m_io_input_file->GetTimeStepper(procedure_id));

    // Get the output scheduler
    std::shared_ptr<aperi::Scheduler<double>> output_scheduler = CreateTimeIncrementScheduler(m_io_input_file->GetOutputScheduler(procedure_id));

    // Run pre-processing
    aperi::DoPreprocessing(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, m_boundary_conditions);

    // Print element data, if not using strain smoothing (strain smoothing prints its own data)
    if (!has_strain_smoothing) {
        m_io_mesh->GetMeshData()->PrintElementCounts();
    }

    // Create solver
    m_solver = aperi::CreateSolver(m_io_mesh, m_internal_force_contributions, m_external_force_contributions, m_boundary_conditions, time_stepper, output_scheduler);
    auto end_solver_setup = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "   Finished Setting up for the Solver. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_solver_setup - start_solver_setup).count() << " ms" << std::endl;

    // Run solver
    aperi::CoutP0() << " - Starting Solver" << std::endl;
    auto start_solver = std::chrono::high_resolution_clock::now();
    m_solver->Solve();
    auto end_solver = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "   Finished Solver. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_solver - start_solver).count() << " ms" << std::endl;

    // Finalize
    Finalize();
}

void Application::Finalize() {
    MPI_Barrier(m_comm);
    m_io_mesh->Finalize();
    aperi::CoutP0() << "Application Finalized" << std::endl;
    aperi::CoutP0() << "############################################" << std::endl;
}

}  // namespace aperi
