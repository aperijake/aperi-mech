#pragma once

#include <memory>
#include <vector>

#include "BoundaryCondition.h"
#include "Constants.h"
#include "ExternalForceContribution.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldUtils.h"
#include "FunctionValueUtils.h"
#include "InternalForceContribution.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "Selector.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoPreprocessor.h"
#endif

namespace aperi {

class BoundaryCondition;
class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;

inline void FindNeighbors(std::shared_ptr<MeshData> mesh_data, const ReproducingKernelInfo& reproducing_kernel_info) {
    if (reproducing_kernel_info.part_names.empty()) {
        return;
    }

    // Loop over all elements and store the neighbors
    aperi::NeighborSearchProcessor search_processor(mesh_data);
    search_processor.AddNeighborsWithinVariableSizedBall(reproducing_kernel_info.part_names, reproducing_kernel_info.kernel_radius_scale_factors);

    search_processor.SyncFieldsToHost();  // Just needed for output

    // Print the number of neighbors statistics
    aperi::Selector selector(reproducing_kernel_info.part_names, mesh_data.get(), SelectorOwnership::OWNED);
    NeighborStats node_stats = GetNumNeighborStats(mesh_data, selector);
    node_stats.Print();
}

inline void SetFieldDataForLagrangianFormulation(std::shared_ptr<MeshData> mesh_data, const aperi::LagrangianFormulationType& lagrangian_formulation_type) {
    // Copy the coordinates field to the current coordinates field, if using the updated formulation or semi-Lagrangian formulation
    if (lagrangian_formulation_type == LagrangianFormulationType::Updated || lagrangian_formulation_type == LagrangianFormulationType::Semi) {
        aperi::Field<double> coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        aperi::Field<double> current_coordinates_n_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"current_coordinates_n", FieldQueryState::None});
        aperi::Field<double> current_coordinates_np1_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"current_coordinates_np1", FieldQueryState::None});
        aperi::CopyField(coordinates_field, current_coordinates_n_field);
        aperi::CopyField(coordinates_field, current_coordinates_np1_field);
        // If using the semi-Lagrangian formulation, copy the reference coordinates field to the reference coordinates field
        if (lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            aperi::Field<double> reference_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"reference_coordinates", FieldQueryState::None});
            aperi::CopyField(coordinates_field, reference_coordinates_field);
        }
    }
}

/**
 * @brief This function runs the pre-processing steps for the solver.
 *
 * This function runs the pre-processing steps for the solver.
 *
 * @param io_mesh The input/output mesh object.
 * @param force_contributions The vector of internal force contributions.
 * @param external_force_contributions The vector of external force contributions.
 * @param boundary_conditions The vector of boundary conditions.
 * @return void
 */
inline void DoPreprocessing(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, aperi::LagrangianFormulationType lagrangian_formulation_type) {
    // Get the mesh data
    std::shared_ptr<aperi::MeshData> mesh_data = io_mesh->GetMeshData();

    // Set the field data for the Lagrangian formulation
    SetFieldDataForLagrangianFormulation(mesh_data, lagrangian_formulation_type);

    // Run the other pre-processing steps
#ifdef USE_PROTEGO_MECH
    protego::DoPreprocessing(io_mesh, force_contributions, external_force_contributions, boundary_conditions);
#endif
    // Best to do neighbor search all together. Do preprocessing first pass, then find neighbors, then do second pass.
    aperi::ReproducingKernelInfo reproducing_kernel_info;
    for (const auto& force_contribution : force_contributions) {
        force_contribution->Preprocess();
        // Get the reproducing kernel info
        aperi::ReproducingKernelInfo this_reproducing_kernel_info = force_contribution->GetReproducingKernelInfo();
        if (!this_reproducing_kernel_info.part_names.empty()) {
            reproducing_kernel_info.part_names.insert(reproducing_kernel_info.part_names.end(), this_reproducing_kernel_info.part_names.begin(), this_reproducing_kernel_info.part_names.end());
            reproducing_kernel_info.kernel_radius_scale_factors.insert(reproducing_kernel_info.kernel_radius_scale_factors.end(), this_reproducing_kernel_info.kernel_radius_scale_factors.begin(), this_reproducing_kernel_info.kernel_radius_scale_factors.end());
        }
    }
    FindNeighbors(mesh_data, reproducing_kernel_info);
    for (const auto& force_contribution : force_contributions) {
        force_contribution->FinishPreprocessing();
    }
    for (const auto& external_force_contribution : external_force_contributions) {
        external_force_contribution->Preprocess();
    }
    for (const auto& boundary_condition : boundary_conditions) {
        boundary_condition->Preprocess();
    }
}

}  // namespace aperi
