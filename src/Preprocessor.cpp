#include "Preprocessor.h"

#include "BoundaryCondition.h"
#include "Constants.h"
#include "ContactForceContribution/Base.h"
#include "ExternalForceContribution/Base.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldUtils.h"
#include "FunctionValueUtils.h"
#include "InitialCondition/Base.h"
#include "InternalForceContribution.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "Selector.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoPreprocessor.h"
#endif

namespace aperi {

/**
 * @brief Finds neighbors for mesh elements based on reproducing kernel info.
 */
void FindNeighbors(std::shared_ptr<MeshData> mesh_data, const ReproducingKernelInfo& reproducing_kernel_info) {
    // If no parts are specified, skip neighbor search.
    if (reproducing_kernel_info.part_names.empty()) {
        return;
    }

    // Create a search processor and perform neighbor search within variable-sized balls.
    aperi::NeighborSearchProcessor search_processor(mesh_data);
    search_processor.AddNeighborsWithinVariableSizedBall(
        reproducing_kernel_info.part_names,
        reproducing_kernel_info.kernel_radius_scale_factors);

    // Sync neighbor fields to host memory for output or further processing.
    search_processor.SyncFieldsToHost();

    // Print statistics about the number of neighbors for the selected nodes.
    aperi::Selector selector(
        reproducing_kernel_info.part_names,
        mesh_data.get(),
        SelectorOwnership::OWNED);
    NeighborStats node_stats = GetNumNeighborStats(mesh_data, selector);
    node_stats.Print();
}

/**
 * @brief Sets up field data for the chosen Lagrangian formulation.
 */
void SetFieldDataForLagrangianFormulation(
    std::shared_ptr<MeshData> mesh_data,
    const aperi::LagrangianFormulationType& lagrangian_formulation_type) {
    // Only perform field setup for updated or semi-Lagrangian formulations.
    if (lagrangian_formulation_type == LagrangianFormulationType::Updated ||
        lagrangian_formulation_type == LagrangianFormulationType::Semi) {
        // Copy the coordinates field to the current coordinates fields.
        aperi::Field<double> coordinates_field(
            mesh_data,
            FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        aperi::Field<double> current_coordinates_n_field(
            mesh_data,
            FieldQueryData<double>{"current_coordinates_n", FieldQueryState::None});
        aperi::Field<double> current_coordinates_np1_field(
            mesh_data,
            FieldQueryData<double>{"current_coordinates_np1", FieldQueryState::None});
        aperi::CopyField(coordinates_field, current_coordinates_n_field);
        aperi::CopyField(coordinates_field, current_coordinates_np1_field);

        // For semi-Lagrangian, also copy to the reference coordinates field.
        if (lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            aperi::Field<double> reference_coordinates_field(
                mesh_data,
                FieldQueryData<double>{"reference_coordinates", FieldQueryState::None});
            aperi::CopyField(coordinates_field, reference_coordinates_field);
        }
    }
}

/**
 * @brief Runs all pre-processing steps required before the solver starts.
 */
void DoPreprocessing(
    std::shared_ptr<aperi::IoMesh> io_mesh,
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions,
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions,
    std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions,
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions,
    const std::vector<std::unique_ptr<aperi::InitialCondition>>& initial_conditions,
    aperi::LagrangianFormulationType lagrangian_formulation_type) {
    // Retrieve mesh data from the mesh object.
    std::shared_ptr<aperi::MeshData> mesh_data = io_mesh->GetMeshData();

    // Set up field data for the chosen Lagrangian formulation.
    SetFieldDataForLagrangianFormulation(mesh_data, lagrangian_formulation_type);

#ifdef USE_PROTEGO_MECH
    // Run Protego-specific preprocessing if enabled.
    protego::DoPreprocessing(io_mesh, force_contributions, external_force_contributions, contact_force_contributions, boundary_conditions);
#endif

    // Gather reproducing kernel info from all internal force contributions.
    aperi::ReproducingKernelInfo reproducing_kernel_info;
    for (const auto& force_contribution : force_contributions) {
        force_contribution->Preprocess();
        aperi::ReproducingKernelInfo this_reproducing_kernel_info = force_contribution->GetReproducingKernelInfo();
        if (!this_reproducing_kernel_info.part_names.empty()) {
            reproducing_kernel_info.part_names.insert(
                reproducing_kernel_info.part_names.end(),
                this_reproducing_kernel_info.part_names.begin(),
                this_reproducing_kernel_info.part_names.end());
            reproducing_kernel_info.kernel_radius_scale_factors.insert(
                reproducing_kernel_info.kernel_radius_scale_factors.end(),
                this_reproducing_kernel_info.kernel_radius_scale_factors.begin(),
                this_reproducing_kernel_info.kernel_radius_scale_factors.end());
        }
    }

    // Perform neighbor search for all relevant parts.
    FindNeighbors(mesh_data, reproducing_kernel_info);

    // Apply all initial conditions.
    for (const auto& initial_condition : initial_conditions) {
        initial_condition->Apply();
    }

    // Finish preprocessing for all internal force contributions.
    for (const auto& force_contribution : force_contributions) {
        force_contribution->FinishPreprocessing();
    }

    // Preprocess all external force contributions.
    for (const auto& external_force_contribution : external_force_contributions) {
        external_force_contribution->Preprocess();
    }

    // Preprocess all boundary conditions.
    for (const auto& boundary_condition : boundary_conditions) {
        boundary_condition->Preprocess();
    }

    // Preprocess all contact force contributions.
    for (const auto& contact_force_contribution : contact_force_contributions) {
        contact_force_contribution->Preprocess();
    }
}

}  // namespace aperi
