#include "Application.h"

#include <yaml-cpp/yaml.h>

#include <chrono>
#include <filesystem>
#include <fstream>

#include "BoundaryCondition.h"
#include "ContactForceContribution/Base.h"
#include "ContactForceContribution/Factory.h"
#include "ExternalForceContribution/Base.h"
#include "ExternalForceContribution/Factory.h"
#include "FieldData.h"
#include "InitialCondition/Base.h"
#include "InitialCondition/Factory.h"
#include "InternalForceContribution.h"
#include "IoInputFile.h"
#include "IoMesh.h"
#include "LogUtils.h"
#include "MeshDataUtils.h"
#include "MeshLabeler.h"
#include "Preprocessor.h"
#include "Scheduler.h"
#include "SimpleTimerFactory.h"
#include "Solvers/Base.h"
#include "Solvers/Factory.h"
#include "TimeStepper.h"
#include "YamlUtils.h"

namespace aperi {

void Application::CreateSolverAndRun(const std::string& input_filename, bool add_faces) {
    // Create the solver
    std::shared_ptr<Solver> solver = CreateSolver(input_filename, add_faces);

    // Run the solver
    Run(solver);
}

std::shared_ptr<aperi::Solver> Application::CreateSolver(const YAML::Node& yaml_data, bool add_faces) {
    aperi::CoutP0() << "Reading Input YAML Data" << std::endl;

    // Create an IO input file object and read the input file
    std::shared_ptr<aperi::IoInputFile> io_input_file = aperi::CreateIoInputFile(yaml_data);

    // Create the solver
    return CreateSolver(io_input_file, add_faces);
}

std::shared_ptr<aperi::Solver> Application::CreateSolver(const std::string& input_filename, bool add_faces) {
    aperi::CoutP0() << "Reading Input File '" << input_filename << "'. Contents:" << std::endl;
    aperi::CoutP0() << "--------------------------------------------" << std::endl;
    // Dump the full input file contents to the log
    std::ifstream infile(input_filename);
    if (infile) {
        std::string line;
        while (std::getline(infile, line)) {
            aperi::CoutP0() << line << std::endl;
        }
    } else {
        aperi::CoutP0() << "Could not open input file: " << input_filename << std::endl;
    }
    aperi::CoutP0() << "--------------------------------------------" << std::endl;

    // Create an IO input file object and read the input file
    std::shared_ptr<aperi::IoInputFile> io_input_file = aperi::CreateIoInputFile(input_filename);

    // Create the solver
    return CreateSolver(io_input_file, add_faces);
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

// TODO(jake): This is a temporary function to check for the presence of the neo-hookean_with_damage material. Make this more general.
bool NeedsFaces(const std::vector<YAML::Node>& parts) {
#ifdef USE_PROTEGO_MECH
    for (const auto& part : parts) {
        if (part["material"]["neo_hookean_with_damage"].IsDefined()) {
            return true;
        }
    }
#endif
    return false;
}

// Find a file in a list of directories, including the current working directory. TODO(jake): Move this to a utility function
std::string FindFileInDirectories(const std::string& file, const std::vector<std::string>& directories) {
    // Get the current working directory
    std::filesystem::path current_path = std::filesystem::current_path();

    // Check if the file exists in the current working directory if directories is empty
    if (directories.empty()) {
        std::filesystem::path file_path = current_path / file;
        if (std::filesystem::exists(file_path)) {
            return file_path.string();
        }
        throw std::runtime_error("File '" + file + "' not found in the current working directory: " + current_path.string() + " and no search directories provided");
    }

    // Check if the file exists in the provided directories relative to the current working directory
    for (const auto& directory : directories) {
        std::filesystem::path relative_path = current_path / directory / file;
        if (std::filesystem::exists(relative_path)) {
            return relative_path.string();
        }
    }

    // If the file is not found, throw an exception
    std::string search_directories;
    for (const auto& directory : directories) {
        search_directories += (current_path / directory).string() + ", ";
    }
    throw std::runtime_error("File '" + file + "' not found in directories: " + search_directories);
}

std::shared_ptr<aperi::IoMesh> CreateIoMeshAndReadMesh(const std::string& mesh_file, const std::vector<std::string>& mesh_search_directories, const std::vector<std::string>& part_names, bool add_faces, MPI_Comm& comm) {
    // Find the mesh file in the search directories
    std::string mesh_file_path = aperi::FindFileInDirectories(mesh_file, mesh_search_directories);

    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::ReadInputMesh, aperi::application_timer_map);

    // Create an IO mesh object
    IoMeshParameters io_mesh_parameters;  // Default parameters
    io_mesh_parameters.compose_output = true;
    io_mesh_parameters.add_faces = add_faces;
    std::shared_ptr<aperi::IoMesh> io_mesh = aperi::CreateIoMesh(comm, io_mesh_parameters);

    // Read the mesh
    io_mesh->ReadMesh(mesh_file_path, part_names);

    return io_mesh;
}

void CreateFieldResultsFile(std::shared_ptr<aperi::IoMesh> io_mesh, const std::string& output_file) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateFieldResultsFile, aperi::application_timer_map);

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

std::shared_ptr<aperi::TimeStepper> CreateStepper(const YAML::Node& time_stepper_node) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateTimeStepper, aperi::application_timer_map);

    // Create the time stepper
    return aperi::CreateTimeStepper(time_stepper_node);
}

std::vector<std::shared_ptr<aperi::InternalForceContribution>> CreateInternalForceContribution(const std::vector<YAML::Node>& parts, const LagrangianFormulationType& lagrangian_formulation_type, std::shared_ptr<IoInputFile> io_input_file, std::shared_ptr<aperi::IoMesh> io_mesh) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateInternalForceContribution, aperi::application_timer_map);

    // Create a vector of internal force contributions
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> internal_force_contributions;

    // Loop over parts, create materials, and add parts to force contributions
    aperi::CoutP0() << "   Blocks: " << std::endl;
    for (const auto& part : parts) {
        // Create InternalForceContributionParameters
        std::string part_name = part["set"].as<std::string>();
        aperi::CoutP0() << "      " << part_name << std::endl;
        InternalForceContributionParameters internal_force_contribution_parameters(part, io_input_file, io_mesh->GetMeshData());
        internal_force_contribution_parameters.lagrangian_formulation_type = lagrangian_formulation_type;
        internal_force_contributions.push_back(CreateInternalForceContribution(internal_force_contribution_parameters));
        std::vector<aperi::FieldData> part_field_data = internal_force_contribution_parameters.material->GetFieldData();
        // If uses f_bar, add displacement_gradient to the field data. TODO(jake): Move this somewhere else
        if (internal_force_contribution_parameters.integration_scheme_parameters->UsesFBar()) {
            part_field_data.push_back(aperi::FieldData("displacement_gradient_bar", aperi::FieldDataRank::TENSOR, aperi::FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
            part_field_data.push_back(aperi::FieldData("pk1_stress_bar", aperi::FieldDataRank::TENSOR, aperi::FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
        }
        io_mesh->AddFields(part_field_data, {part_name});
        io_mesh->AddFieldResultsOutput(part_field_data);
    }

    return internal_force_contributions;
}

void AddFieldsToMesh(std::shared_ptr<aperi::IoMesh> io_mesh, std::shared_ptr<aperi::TimeStepper> time_stepper, bool uses_generalized_fields, bool has_strain_smoothing, aperi::LagrangianFormulationType formulation_type, bool output_coefficients) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::AddFieldsToMesh, aperi::application_timer_map);

    // Get general field data
    std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, has_strain_smoothing, formulation_type, output_coefficients);

    // Create a mesh labeler
    // Add mesh labeler fields to the field data
    std::vector<aperi::FieldData> mesh_labeler_field_data = aperi::MeshLabeler::GetFieldData();
    field_data.insert(field_data.end(), mesh_labeler_field_data.begin(), mesh_labeler_field_data.end());

    // Add time stepper field data
    std::vector<aperi::FieldData> time_stepper_field_data = time_stepper->GetFieldData();
    field_data.insert(field_data.end(), time_stepper_field_data.begin(), time_stepper_field_data.end());

    // Add fields to the mesh and complete initialization
    io_mesh->AddFields(field_data);
    io_mesh->AddFieldResultsOutput(field_data);
    io_mesh->CompleteInitialization();
}

std::vector<std::shared_ptr<aperi::ExternalForceContribution>> CreateExternalForceContribution(const std::vector<YAML::Node>& loads, std::shared_ptr<aperi::IoMesh> io_mesh) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateExternalForceContribution, aperi::application_timer_map);

    // Loop over loads and add them to force contributions
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions;
    aperi::CoutP0() << "   Loads: " << std::endl;
    for (auto load : loads) {
        auto name = load.begin()->first.as<std::string>();
        aperi::CoutP0() << "      " << name << std::endl;
        external_force_contributions.push_back(CreateExternalForceContribution(load, io_mesh->GetMeshData()));
    }

    return external_force_contributions;
}

std::vector<std::shared_ptr<aperi::ContactForceContribution>> CreateContactForceContribution(const std::vector<YAML::Node>& contact_specs, std::shared_ptr<aperi::IoMesh> io_mesh, bool use_generalized_fields, const LagrangianFormulationType& formulation_type) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateExternalForceContribution, aperi::application_timer_map);

    // Loop over contact specs and add them to force contributions
    std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions;
    aperi::CoutP0() << "   Contact: " << std::endl;
    for (auto contact_spec : contact_specs) {
        auto name = contact_spec.begin()->first.as<std::string>();
        aperi::CoutP0() << "      " << name << std::endl;
        contact_force_contributions.push_back(CreateContactForceContribution(contact_spec, io_mesh->GetMeshData(), use_generalized_fields, formulation_type));
    }

    return contact_force_contributions;
}

std::vector<std::unique_ptr<aperi::InitialCondition>> AddInitialConditions(const std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::IoMesh> io_mesh) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::AddInitialConditions, aperi::application_timer_map);

    // Loop over initial conditions and add them to the mesh
    std::vector<std::unique_ptr<aperi::InitialCondition>> initial_conditions_vector;
    aperi::CoutP0() << "   Initial Conditions: " << std::endl;
    for (auto initial_condition : initial_conditions) {
        auto name = initial_condition.begin()->first.as<std::string>();
        aperi::CoutP0() << "      " << name << std::endl;
        initial_conditions_vector.push_back(aperi::CreateInitialCondition(initial_condition, io_mesh->GetMeshData()));
    }
    return initial_conditions_vector;
}

std::vector<std::shared_ptr<aperi::BoundaryCondition>> CreateBoundaryConditions(const std::vector<YAML::Node>& boundary_condition_nodes, std::shared_ptr<aperi::IoMesh> io_mesh) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateBoundaryConditions, aperi::application_timer_map);

    // Loop over boundary conditions and add them to the vector of boundary conditions
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions;
    aperi::CoutP0() << "   Boundary Conditions: " << std::endl;
    for (auto boundary_condition_node : boundary_condition_nodes) {
        auto name = boundary_condition_node.begin()->first.as<std::string>();
        aperi::CoutP0() << "      " << name << std::endl;
        boundary_conditions.push_back(aperi::CreateBoundaryCondition(boundary_condition_node, io_mesh->GetMeshData()));
    }

    return boundary_conditions;
}

std::shared_ptr<aperi::Scheduler<double>> CreateOutputScheduler(const YAML::Node& output_scheduler_node) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateOutputScheduler, aperi::application_timer_map);

    // Create the output scheduler
    return aperi::CreateTimeIncrementScheduler(output_scheduler_node);
}

std::shared_ptr<aperi::Scheduler<size_t>> CreateReferenceConfigurationUpdateScheduler(int reference_configuration_update_interval) {
    // Create a scoped timer. just labeling it as CreateOutputScheduler for now
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::CreateOutputScheduler, aperi::application_timer_map);

    // Create the reference configuration update scheduler
    int start_n = reference_configuration_update_interval;  // Skip step 0 as it is the initial configuration and will be initialized in the pre-processing step
    return aperi::CreateStepScheduler(start_n, reference_configuration_update_interval);
}

void Preprocessing(std::shared_ptr<aperi::IoMesh> io_mesh, const std::vector<std::shared_ptr<aperi::InternalForceContribution>>& internal_force_contributions, const std::vector<std::shared_ptr<aperi::ExternalForceContribution>>& external_force_contributions, const std::vector<std::shared_ptr<aperi::ContactForceContribution>>& contact_force_contributions, const std::vector<std::shared_ptr<aperi::BoundaryCondition>>& boundary_conditions, const std::vector<std::unique_ptr<aperi::InitialCondition>>& initial_conditions, const LagrangianFormulationType& lagrangian_formulation_type) {
    // Create a scoped timer
    auto simple_timer = aperi::SimpleTimerFactory::Create(ApplicationTimerType::Preprocessing, aperi::application_timer_map);

    // Run pre-processing
    aperi::DoPreprocessing(io_mesh, internal_force_contributions, external_force_contributions, contact_force_contributions, boundary_conditions, initial_conditions, lagrangian_formulation_type);
}

std::shared_ptr<aperi::Solver> Application::CreateSolver(std::shared_ptr<IoInputFile> io_input_file, bool add_faces) {
    aperi::CoutP0() << " Creating Solver" << std::endl;

    // TODO(jake): hard coding to 1 procedure for now. Fix this when we have multiple procedures.
    int procedure_id = 0;

    // Get parts
    std::vector<YAML::Node> parts = io_input_file->GetParts(procedure_id);

    // Get part names
    std::vector<std::string> part_names = GetPartNames(parts);

    // Get the mesh file
    std::string mesh_file = io_input_file->GetMeshFile(procedure_id);

    // Get the mesh search directories
    std::vector<std::string> mesh_search_directories = io_input_file->GetMeshSearchDirectories(procedure_id);

    // Create the IO mesh object and read the mesh
    add_faces = add_faces || NeedsFaces(parts);
    std::shared_ptr<aperi::IoMesh> io_mesh = CreateIoMeshAndReadMesh(mesh_file, mesh_search_directories, part_names, add_faces, m_comm);

    // Create the field results file
    std::string output_file = io_input_file->GetOutputFile(procedure_id);
    CreateFieldResultsFile(io_mesh, output_file);

    // Get the time stepper
    YAML::Node time_stepper_node = io_input_file->GetTimeStepper(procedure_id);
    std::shared_ptr<aperi::TimeStepper> time_stepper = CreateStepper(time_stepper_node);

    // Get the formulation type
    LagrangianFormulationType formulation_type = io_input_file->GetLagrangianFormulationType(procedure_id);

    // Create internal force contributions
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> internal_force_contributions = CreateInternalForceContribution(parts, formulation_type, io_input_file, io_mesh);

    // Check if strain smoothing is used
    bool has_strain_smoothing = HasStrainSmoothing(parts);

    // Check if generalized fields are used
    bool uses_generalized_fields = UsesGeneralizedFields(internal_force_contributions);

    // Get flag for outputting coefficients
    YAML::Node output_scheduler_node = io_input_file->GetOutputScheduler(procedure_id);
    bool output_coefficients = false;
    if (output_scheduler_node["output_coefficients"]) {
        output_coefficients = output_scheduler_node["output_coefficients"].as<bool>();
    }

    // Add fields to the mesh
    AddFieldsToMesh(io_mesh, time_stepper, uses_generalized_fields, has_strain_smoothing, formulation_type, output_coefficients);

    // Create external force contributions
    std::vector<YAML::Node> loads = io_input_file->GetLoads(procedure_id);
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions = CreateExternalForceContribution(loads, io_mesh);

    // Create contact if needed
    std::vector<YAML::Node> contact = io_input_file->GetContact(procedure_id);
    std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions = CreateContactForceContribution(contact, io_mesh, uses_generalized_fields, formulation_type);

    // Create boundary conditions
    std::vector<YAML::Node> boundary_condition_nodes = io_input_file->GetBoundaryConditions(procedure_id);
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions = CreateBoundaryConditions(boundary_condition_nodes, io_mesh);

    // Get the output scheduler
    std::shared_ptr<aperi::Scheduler<double>> output_scheduler = CreateOutputScheduler(output_scheduler_node);

    // Get the reference configuration update scheduler
    std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler = nullptr;
    if (formulation_type == LagrangianFormulationType::Semi) {
        int reference_configuration_update_interval = io_input_file->GetSemiLagrangianConfigurationUpdateInterval(procedure_id);
        reference_configuration_update_scheduler = CreateReferenceConfigurationUpdateScheduler(reference_configuration_update_interval);
    } else if (formulation_type == LagrangianFormulationType::Updated) {
        int reference_configuration_update_interval = 1;
        reference_configuration_update_scheduler = CreateReferenceConfigurationUpdateScheduler(reference_configuration_update_interval);
    }

    // Set initial conditions
    std::vector<YAML::Node> initial_condition_nodes = io_input_file->GetInitialConditions(procedure_id);
    std::vector<std::unique_ptr<aperi::InitialCondition>> initial_conditions = AddInitialConditions(initial_condition_nodes, io_mesh);

    // Pre-processing
    Preprocessing(io_mesh, internal_force_contributions, external_force_contributions, contact_force_contributions, boundary_conditions, initial_conditions, formulation_type);

    // Print element data, if not using strain smoothing (strain smoothing prints its own data)
    if (!has_strain_smoothing) {
        PrintElementCounts(io_mesh->GetMeshData());
    }

    // Print the number of nodes
    PrintNodeCounts(io_mesh->GetMeshData());

    // Create solver
    std::shared_ptr<aperi::Solver> solver = aperi::CreateSolver(io_mesh, internal_force_contributions, external_force_contributions, contact_force_contributions, boundary_conditions, time_stepper, output_scheduler, reference_configuration_update_scheduler);

    aperi::CoutP0() << " - Solver Created" << std::endl;
    aperi::CoutP0() << "############################################" << std::endl;
    return solver;
}

double Application::Run(std::shared_ptr<aperi::Solver> solver) {
    // Run solver
    aperi::CoutP0() << "\n\n############################################" << std::endl;
    aperi::CoutP0() << " Running Solver" << std::endl;
    auto start_solver = std::chrono::high_resolution_clock::now();
    double time_per_step = solver->Solve();
    auto end_solver = std::chrono::high_resolution_clock::now();
    aperi::CoutP0() << " - Solver Finished. Time: " << std::chrono::duration_cast<std::chrono::milliseconds>(end_solver - start_solver).count() << " ms" << std::endl;
    aperi::CoutP0() << "############################################" << std::endl;

    MPI_Barrier(m_comm);

    // Finalize
    Finalize();

    return time_per_step;
}

void Application::Finalize() {}

}  // namespace aperi
