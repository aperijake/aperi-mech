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

void Application::CreateSolverAndRun(const std::string& input_filename) {
    // Create the solver
    std::shared_ptr<Solver> solver = CreateSolver(input_filename);

    // Run the solver
    Run(solver);
}

std::shared_ptr<aperi::Solver> Application::CreateSolver(const YAML::Node& yaml_data) {
    aperi::CoutP0() << "Reading Input YAML Data" << std::endl;

    // Create an IO input file object and read the input file
    std::shared_ptr<aperi::IoInputFile> io_input_file = aperi::CreateIoInputFile(yaml_data);

    // Create the solver
    return CreateSolver(io_input_file);
}

std::shared_ptr<aperi::Solver> Application::CreateSolver(const std::string& input_filename) {
    aperi::CoutP0() << "Reading Input File '" << input_filename << "'" << std::endl;

    // Create an IO input file object and read the input file
    std::shared_ptr<aperi::IoInputFile> io_input_file = aperi::CreateIoInputFile(input_filename);

    // Create the solver
    return CreateSolver(io_input_file);
}

std::vector<std::string> GetPartNames(const std::vector<YAML::Node>& parts) {
    std::vector<std::string> part_names;
    part_names.reserve(parts.size());
    for (const auto& part : parts) {
        part_names.push_back(part["set"].as<std::string>());
    }
    return part_names;
}

bool HasStrainSmoothing(const std::vector<YAML::Node>& parts) {
    for (const auto& part : parts) {
        if (part["formulation"]["integration_scheme"]["strain_smoothing"]) {
            return true;
        }
    }
    return false;
}

std::shared_ptr<aperi::IoMesh> CreateIoMeshAndReadMesh(const std::string& mesh_file, const std::vector<std::string>& part_names, MPI_Comm& comm, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::ReadInputMesh);

    // Print reading mesh
    aperi::CoutP0() << " - Reading Mesh: '" << mesh_file << "'" << std::endl;

    // Create an IO mesh object
    IoMeshParameters io_mesh_parameters;  // Default parameters
    io_mesh_parameters.compose_output = true;
    std::shared_ptr<aperi::IoMesh> io_mesh = aperi::CreateIoMesh(comm, io_mesh_parameters);

    // Read the mesh
    io_mesh->ReadMesh(mesh_file, part_names);

    return io_mesh;
}

void CreateFieldResultsFile(std::shared_ptr<aperi::IoMesh> io_mesh, const std::string& output_file, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::CreateFieldResultsFile);

    // Print creating field results file
    aperi::CoutP0() << " - Creating Field Results File: '" << output_file << "'" << std::endl;

    // Create the field results file
    io_mesh->CreateFieldResultsFile(output_file);
}

std::shared_ptr<aperi::Solver> Application::CreateSolver(std::shared_ptr<IoInputFile> io_input_file) {
    aperi::CoutP0() << "############################################" << std::endl;
    aperi::CoutP0() << "Starting Application: Creating Solver" << std::endl;

    auto timer_manager = std::make_shared<aperi::TimerManager<ApplicationTimerType>>("Application Setup", application_timer_names);

    // TODO(jake): hard coding to 1 procedure for now. Fix this when we have multiple procedures.
    auto start_mesh_read = std::chrono::high_resolution_clock::now();
    int procedure_id = 0;

    // Get parts
    std::vector<YAML::Node> parts = io_input_file->GetParts(procedure_id);

    // Get part names
    std::vector<std::string> part_names = GetPartNames(parts);

    // Get the mesh file
    std::string mesh_file = io_input_file->GetMeshFile(procedure_id);

    // Get the output file
    std::string output_file = io_input_file->GetOutputFile(procedure_id);

    // Get boundary conditions
    std::vector<YAML::Node> boundary_condition_nodes = io_input_file->GetBoundaryConditions(procedure_id);

    // Get loads
    std::vector<YAML::Node> loads = io_input_file->GetLoads(procedure_id);

    // Get initial conditions
    std::vector<YAML::Node> initial_conditions = io_input_file->GetInitialConditions(procedure_id);

    // Get the time stepper node
    YAML::Node time_stepper_node = io_input_file->GetTimeStepper(procedure_id);

    // Get the output scheduler node
    YAML::Node output_scheduler_node = io_input_file->GetOutputScheduler(procedure_id);

    // Create the IO mesh object and read the mesh
    std::shared_ptr<aperi::IoMesh> io_mesh = CreateIoMeshAndReadMesh(mesh_file, part_names, m_comm, timer_manager);

    // Create the field results file
    CreateFieldResultsFile(io_mesh, output_file, timer_manager);

    // Print the performance summary, percent of time spent in each step
    timer_manager->PrintTimers();

    aperi::CoutP0() << " - Setting up for the Solver" << std::endl;
    auto start_solver_setup = std::chrono::high_resolution_clock::now();

    // Get the time stepper
    std::shared_ptr<aperi::TimeStepper> time_stepper = CreateTimeStepper(time_stepper_node);

    bool uses_generalized_fields = false;

    // Loop over parts, create materials, and add parts to force contributions
    aperi::CoutP0() << "   - Adding parts to force contributions: " << std::endl;
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> internal_force_contributions;
    for (const auto& part : parts) {
        // Create InternalForceContributionParameters
        std::string part_name = part["set"].as<std::string>();
        aperi::CoutP0() << "      " << part_name << std::endl;
        InternalForceContributionParameters internal_force_contribution_parameters(part, io_input_file, io_mesh->GetMeshData());
        internal_force_contributions.push_back(CreateInternalForceContribution(internal_force_contribution_parameters));
        uses_generalized_fields = internal_force_contribution_parameters.approximation_space_parameters->UsesGeneralizedFields() || uses_generalized_fields;
        // Add field data from the material. TODO(jake) Change this to just add the field on this part.
        std::vector<aperi::FieldData> material_field_data = internal_force_contribution_parameters.material->GetFieldData();
        io_mesh->AddFields(material_field_data, {part_name});
        io_mesh->AddFieldResultsOutput(material_field_data);
    }

    // Check if strain smoothing is used
    bool has_strain_smoothing = HasStrainSmoothing(parts);

    // Get general field data
    std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, has_strain_smoothing, false /* add_debug_fields */);

    // Add time stepper field data
    std::vector<aperi::FieldData> time_stepper_field_data = time_stepper->GetFieldData();
    field_data.insert(field_data.end(), time_stepper_field_data.begin(), time_stepper_field_data.end());

    // Create a mesh labeler
    std::shared_ptr<MeshLabeler> mesh_labeler = CreateMeshLabeler();
    // Add mesh labeler fields to the field data
    std::vector<FieldData> mesh_labeler_field_data = mesh_labeler->GetFieldData();
    field_data.insert(field_data.end(), mesh_labeler_field_data.begin(), mesh_labeler_field_data.end());

    // Add fields to the mesh and complete initialization
    aperi::CoutP0() << "   - Adding fields to the mesh and completing initialization" << std::endl;
    auto start_complete_initialization = std::chrono::high_resolution_clock::now();
    io_mesh->AddFields(field_data);
    io_mesh->AddFieldResultsOutput(field_data);
    io_mesh->CompleteInitialization();
    auto end_complete_initialization = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "     Finished adding fields to the mesh and completing initialization. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_complete_initialization - start_complete_initialization).count() << " ms" << std::endl;

    // Label the mesh
    aperi::CoutP0() << "   - Labeling the mesh" << std::endl;
    auto start_labeling = std::chrono::high_resolution_clock::now();
    for (const auto& part : parts) {
        MeshLabelerParameters mesh_labeler_parameters(part, io_mesh->GetMeshData());
        mesh_labeler->LabelPart(mesh_labeler_parameters);
    }
    auto end_labeling = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "     Finished labeling the mesh. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_labeling - start_labeling).count() << " ms" << std::endl;

    // Loop over loads and add them to force contributions
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions;
    aperi::CoutP0() << "   - Adding loads to force contributions: " << std::endl;
    for (auto load : loads) {
        auto name = load.begin()->first.as<std::string>();
        aperi::CoutP0() << "     " << name << std::endl;
        external_force_contributions.push_back(CreateExternalForceContribution(load, io_mesh->GetMeshData()));
    }

    // Set initial conditions
    aperi::AddInitialConditions(initial_conditions, io_mesh->GetMeshData());

    // Loop over boundary conditions and add them to the vector of boundary conditions
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions;
    aperi::CoutP0() << "   - Adding boundary conditions: " << std::endl;
    for (auto boundary_condition_node : boundary_condition_nodes) {
        auto name = boundary_condition_node.begin()->first.as<std::string>();
        aperi::CoutP0() << "      " << name << std::endl;
        boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition_node, io_mesh->GetMeshData()));
    }

    // Get the output scheduler
    std::shared_ptr<aperi::Scheduler<double>> output_scheduler = CreateTimeIncrementScheduler(output_scheduler_node);

    // Run pre-processing
    aperi::DoPreprocessing(io_mesh, internal_force_contributions, external_force_contributions, boundary_conditions);

    // Print element data, if not using strain smoothing (strain smoothing prints its own data)
    if (!has_strain_smoothing) {
        io_mesh->GetMeshData()->PrintElementCounts();
    }

    // Create solver
    std::shared_ptr<aperi::Solver> solver = aperi::CreateSolver(io_mesh, internal_force_contributions, external_force_contributions, boundary_conditions, time_stepper, output_scheduler);
    auto end_solver_setup = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "   Finished Setting up for the Solver. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_solver_setup - start_solver_setup).count() << " ms" << std::endl;

    return solver;
}

double Application::Run(std::shared_ptr<aperi::Solver> solver) {
    // Run solver
    aperi::CoutP0() << " - Starting Solver" << std::endl;
    auto start_solver = std::chrono::high_resolution_clock::now();
    double time_per_step = solver->Solve();
    auto end_solver = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << "   Finished Solver. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_solver - start_solver).count() << " ms" << std::endl;

    MPI_Barrier(m_comm);

    // Finalize
    Finalize();

    return time_per_step;
}

void Application::Finalize() {
    aperi::CoutP0() << "Application Finalized" << std::endl;
    aperi::CoutP0() << "############################################" << std::endl;
}

}  // namespace aperi
