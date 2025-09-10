#pragma once

#include <memory>
#include <vector>

#include "Solvers/Base.h"
#include "Solvers/Explicit.h"

namespace aperi {

class BoundaryCondition;
class InternalForceContribution;
class IoMesh;
class ContactForceContribution;
class ExternalForceContribution;
class TimeStepper;
template <typename EventType>
class Scheduler;

/**
 * @brief Creates a solver object.
 *
 * This function creates a solver object with the given parameters.
 *
 * @param io_mesh The input/output mesh object.
 * @param force_contributions The vector of internal force contributions.
 * @param external_force_contributions The vector of external force contributions.
 * @param boundary_conditions The vector of boundary conditions.
 * @param time_stepper The time stepper object.
 * @return A shared pointer to the created solver object.
 */
inline std::shared_ptr<Solver> CreateSolver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler<double>> output_scheduler, std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler) {
    return std::make_shared<ExplicitSolver>(io_mesh, force_contributions, external_force_contributions, contact_force_contributions, boundary_conditions, time_stepper, output_scheduler, reference_configuration_update_scheduler);
}

}  // namespace aperi
