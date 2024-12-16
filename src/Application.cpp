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

bool UsesGeneralizedFields(const std::vector<std::shared_ptr<aperi::InternalForceContribution>>& internal_force_contributions) {
    bool uses_generalized_fields = false;
    for (const auto& internal_force_contribution : internal_force_contributions) {
        if (internal_force_contribution->UsesGeneralizedFields()) {
            uses_generalized_fields = true;
            break;
        }
    }
    return uses_generalized_fields;
}

std::shared_ptr<aperi::TimeStepper> CreateTimeStepper(const YAML::Node& time_stepper_node, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::CreateTimeStepper);

    // Print creating time stepper
    aperi::CoutP0() << " - Creating Time Stepper" << std::endl;

    // Create the time stepper
    return aperi::CreateTimeStepper(time_stepper_node);
}

std::vector<std::shared_ptr<aperi::InternalForceContribution>> CreateInternalForceContribution(const std::vector<YAML::Node>& parts, std::shared_ptr<IoInputFile> io_input_file, std::shared_ptr<aperi::IoMesh> io_mesh, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::CreateInternalForceContribution);

    // Print adding parts to force contributions
    aperi::CoutP0() << " - Adding parts to force contributions: " << std::endl;

    // Create a vector of internal force contributions
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> internal_force_contributions;

    // Loop over parts, create materials, and add parts to force contributions
    for (const auto& part : parts) {
        // Create InternalForceContributionParameters
        std::string part_name = part["set"].as<std::string>();
        aperi::CoutP0() << "      " << part_name << std::endl;
        InternalForceContributionParameters internal_force_contribution_parameters(part, io_input_file, io_mesh->GetMeshData());
        internal_force_contributions.push_back(CreateInternalForceContribution(internal_force_contribution_parameters));
        std::vector<aperi::FieldData> material_field_data = internal_force_contribution_parameters.material->GetFieldData();
        io_mesh->AddFields(material_field_data, {part_name});
        io_mesh->AddFieldResultsOutput(material_field_data);
    }

    return internal_force_contributions;
}

void AddFieldsToMesh(std::shared_ptr<aperi::IoMesh> io_mesh, std::shared_ptr<aperi::TimeStepper> time_stepper, bool uses_generalized_fields, bool has_strain_smoothing, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::AddFieldsToMesh);

    // Print adding fields to the mesh and completing initialization
    aperi::CoutP0() << " - Adding fields to the mesh and completing initialization" << std::endl;

    // Get general field data
    std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, has_strain_smoothing, false /* add_debug_fields */);

    // Add time stepper field data
    std::vector<aperi::FieldData> time_stepper_field_data = time_stepper->GetFieldData();
    field_data.insert(field_data.end(), time_stepper_field_data.begin(), time_stepper_field_data.end());

    // Create a mesh labeler
    // Add mesh labeler fields to the field data
    std::vector<aperi::FieldData> mesh_labeler_field_data = aperi::MeshLabeler::GetFieldData();
    field_data.insert(field_data.end(), mesh_labeler_field_data.begin(), mesh_labeler_field_data.end());

    // Add fields to the mesh and complete initialization
    io_mesh->AddFields(field_data);
    io_mesh->AddFieldResultsOutput(field_data);
    io_mesh->CompleteInitialization();
}

void LabelMesh(std::shared_ptr<aperi::IoMesh> io_mesh, const std::vector<YAML::Node>& parts, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::LabelMesh);

    // Print labeling mesh
    aperi::CoutP0() << " - Labeling Mesh" << std::endl;

    // Create a mesh labeler
    std::shared_ptr<MeshLabeler> mesh_labeler = CreateMeshLabeler();

    // Label the mesh
    for (const auto& part : parts) {
        MeshLabelerParameters mesh_labeler_parameters(part, io_mesh->GetMeshData());
        mesh_labeler->LabelPart(mesh_labeler_parameters);
    }
}

std::vector<std::shared_ptr<aperi::ExternalForceContribution>> CreateExternalForceContribution(const std::vector<YAML::Node>& loads, std::shared_ptr<aperi::IoMesh> io_mesh, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::CreateExternalForceContribution);

    // Loop over loads and add them to force contributions
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions;
    aperi::CoutP0() << " - Adding loads to force contributions: " << std::endl;
    for (auto load : loads) {
        auto name = load.begin()->first.as<std::string>();
        aperi::CoutP0() << "    " << name << std::endl;
        external_force_contributions.push_back(CreateExternalForceContribution(load, io_mesh->GetMeshData()));
    }

    return external_force_contributions;
}

void AddInitialConditions(const std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::IoMesh> io_mesh, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::AddInitialConditions);

    // Print adding initial conditions
    aperi::CoutP0() << " - Adding initial conditions: " << std::endl;

    // Loop over initial conditions and add them to the mesh
    for (auto initial_condition : initial_conditions) {
        auto name = initial_condition.begin()->first.as<std::string>();
        aperi::CoutP0() << "    " << name << std::endl;
        aperi::AddInitialConditions(initial_condition, io_mesh->GetMeshData());
    }
}

std::vector<std::shared_ptr<aperi::BoundaryCondition>> CreateBoundaryConditions(const std::vector<YAML::Node>& boundary_condition_nodes, std::shared_ptr<aperi::IoMesh> io_mesh, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::CreateBoundaryConditions);

    // Print adding boundary conditions
    aperi::CoutP0() << " - Adding boundary conditions: " << std::endl;

    // Loop over boundary conditions and add them to the vector of boundary conditions
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions;
    for (auto boundary_condition_node : boundary_condition_nodes) {
        auto name = boundary_condition_node.begin()->first.as<std::string>();
        aperi::CoutP0() << "    " << name << std::endl;
        boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition_node, io_mesh->GetMeshData()));
    }

    return boundary_conditions;
}

std::shared_ptr<aperi::Scheduler<double>> CreateOutputScheduler(const YAML::Node& output_scheduler_node, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::CreateOutputScheduler);

    // Print creating output scheduler
    aperi::CoutP0() << " - Creating Output Scheduler" << std::endl;

    // Create the output scheduler
    return aperi::CreateTimeIncrementScheduler(output_scheduler_node);
}

void Preprocessing(std::shared_ptr<aperi::IoMesh> io_mesh, const std::vector<std::shared_ptr<aperi::InternalForceContribution>>& internal_force_contributions, const std::vector<std::shared_ptr<aperi::ExternalForceContribution>>& external_force_contributions, const std::vector<std::shared_ptr<aperi::BoundaryCondition>>& boundary_conditions, std::shared_ptr<aperi::TimerManager<ApplicationTimerType>>& timer_manager) {
    // Create a scoped timer
    auto timer = timer_manager->CreateScopedTimer(ApplicationTimerType::Preprocessing);

    // Print pre-processing
    aperi::CoutP0() << " - Pre-processing" << std::endl;

    // Run pre-processing
    aperi::DoPreprocessing(io_mesh, internal_force_contributions, external_force_contributions, boundary_conditions);
}

std::shared_ptr<aperi::Solver> Application::CreateSolver(std::shared_ptr<IoInputFile> io_input_file) {
    aperi::CoutP0() << "############################################" << std::endl;
    aperi::CoutP0() << "Starting Application: Creating Solver" << std::endl;

    auto timer_manager = std::make_shared<aperi::TimerManager<ApplicationTimerType>>("Application Setup", application_timer_map);

    // TODO(jake): hard coding to 1 procedure for now. Fix this when we have multiple procedures.
    int procedure_id = 0;

    // Get parts
    std::vector<YAML::Node> parts = io_input_file->GetParts(procedure_id);

    // Get part names
    std::vector<std::string> part_names = GetPartNames(parts);

    // Get the mesh file
    std::string mesh_file = io_input_file->GetMeshFile(procedure_id);

    // Create the IO mesh object and read the mesh
    std::shared_ptr<aperi::IoMesh> io_mesh = CreateIoMeshAndReadMesh(mesh_file, part_names, m_comm, timer_manager);

    // Create the field results file
    std::string output_file = io_input_file->GetOutputFile(procedure_id);
    CreateFieldResultsFile(io_mesh, output_file, timer_manager);

    // Get the time stepper
    YAML::Node time_stepper_node = io_input_file->GetTimeStepper(procedure_id);
    std::shared_ptr<aperi::TimeStepper> time_stepper = CreateTimeStepper(time_stepper_node, timer_manager);

    // Create internal force contributions
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> internal_force_contributions = CreateInternalForceContribution(parts, io_input_file, io_mesh, timer_manager);

    // Check if strain smoothing is used
    bool has_strain_smoothing = HasStrainSmoothing(parts);

    // Check if generalized fields are used
    bool uses_generalized_fields = UsesGeneralizedFields(internal_force_contributions);

    // Add fields to the mesh
    AddFieldsToMesh(io_mesh, time_stepper, uses_generalized_fields, has_strain_smoothing, timer_manager);

    // Label the mesh
    LabelMesh(io_mesh, parts, timer_manager);

    // Create external force contributions
    std::vector<YAML::Node> loads = io_input_file->GetLoads(procedure_id);
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions = CreateExternalForceContribution(loads, io_mesh, timer_manager);

    // Set initial conditions
    std::vector<YAML::Node> initial_conditions = io_input_file->GetInitialConditions(procedure_id);
    AddInitialConditions(initial_conditions, io_mesh, timer_manager);

    // Create boundary conditions
    std::vector<YAML::Node> boundary_condition_nodes = io_input_file->GetBoundaryConditions(procedure_id);
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions = CreateBoundaryConditions(boundary_condition_nodes, io_mesh, timer_manager);

    // Get the output scheduler
    YAML::Node output_scheduler_node = io_input_file->GetOutputScheduler(procedure_id);
    std::shared_ptr<aperi::Scheduler<double>> output_scheduler = CreateOutputScheduler(output_scheduler_node, timer_manager);

    // Pre-processing
    Preprocessing(io_mesh, internal_force_contributions, external_force_contributions, boundary_conditions, timer_manager);

    // Print element data, if not using strain smoothing (strain smoothing prints its own data)
    if (!has_strain_smoothing) {
        io_mesh->GetMeshData()->PrintElementCounts();
    }

    // Print the performance summary, percent of time spent in each step
    timer_manager->PrintTimers();

    // Create solver
    std::shared_ptr<aperi::Solver> solver = aperi::CreateSolver(io_mesh, internal_force_contributions, external_force_contributions, boundary_conditions, time_stepper, output_scheduler);

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
