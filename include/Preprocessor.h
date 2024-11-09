#pragma once

#include <memory>
#include <vector>

#include "MaxEdgeLengthProcessor.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoPreprocessor.h"
#endif

namespace aperi {

class BoundaryCondition;
class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;

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
inline void DoPreprocessing(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions) {
    // Calculate the maximum edge length
    aperi::MaxEdgeLengthProcessor max_edge_length_processor(io_mesh->GetMeshData());
    max_edge_length_processor.ComputeMaxEdgeLength();

    // Run the other pre-processing steps
#ifdef USE_PROTEGO_MECH
    protego::DoPreprocessing(io_mesh, force_contributions, external_force_contributions, boundary_conditions);
#endif
    for (const auto& force_contribution : force_contributions) {
        force_contribution->Preprocess();
    }
    for (const auto& external_force_contribution : external_force_contributions) {
        external_force_contribution->Preprocess();
    }
}

}  // namespace aperi
