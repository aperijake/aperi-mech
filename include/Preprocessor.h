#pragma once

#include <memory>
#include <vector>

#ifdef USE_PROTEGO_MECH
#include "ProtegoPreprocessor.h"
#endif

namespace aperi {

class BoundaryCondition;
class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;

/**
 * @brief Creates a solver object.
 *
 * This function creates a solver object with the given parameters.
 *
 * @param io_mesh The input/output mesh object.
 * @param force_contributions The vector of internal force contributions.
 * @param external_force_contributions The vector of external force contributions.
 * @return A unique pointer to the created solver object.
 */
inline void DoPreprocessing(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions) {
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
