#pragma once

#include <memory>
#include <vector>

#include "Solvers/Base.h"
#include "Solvers/Explicit.h"
#include "Types.h"
#ifdef USE_PROTEGO_MECH
#include "ProtegoSolvers/Static.h"
#endif

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
 * @param solver_type The type of solver to create (e.g., EXPLICIT, STATIC).
 * @param io_mesh The input/output mesh object.
 * @param force_contributions The vector of internal force contributions.
 * @param external_force_contributions The vector of external force contributions.
 * @param boundary_conditions The vector of boundary conditions.
 * @param time_stepper The time stepper object.
 * @param output_scheduler The output scheduler object.
 * @param reference_configuration_update_scheduler The reference configuration update scheduler object.
 * @return A shared pointer to the created solver object.
 */
inline std::shared_ptr<Solver> CreateSolver(aperi::SolverType solver_type,
                                            std::shared_ptr<aperi::IoMesh> io_mesh,
                                            std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions,
                                            std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions,
                                            std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions,
                                            std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions,
                                            std::shared_ptr<aperi::TimeStepper> time_stepper,
                                            std::shared_ptr<aperi::Scheduler<double>> output_scheduler,
                                            std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler) {
    if (solver_type == aperi::SolverType::STATIC) {
#ifdef USE_PROTEGO_MECH
        return std::make_shared<StaticSolver>(io_mesh,
                                              force_contributions,
                                              external_force_contributions,
                                              contact_force_contributions,
                                              boundary_conditions,
                                              time_stepper,
                                              output_scheduler,
                                              reference_configuration_update_scheduler);
#else
        throw std::runtime_error("Static solver is not available. protego-mech is required for this feature.");
#endif
    } else if (solver_type == aperi::SolverType::EXPLICIT) {
        return std::make_shared<ExplicitSolver>(io_mesh,
                                                force_contributions,
                                                external_force_contributions,
                                                contact_force_contributions,
                                                boundary_conditions,
                                                time_stepper,
                                                output_scheduler,
                                                reference_configuration_update_scheduler);
    } else {
        throw std::runtime_error("Unrecognized solver type.");
    }
}

inline std::vector<aperi::FieldData> GetSolverFieldData(aperi::SolverType solver_type, bool uses_generalized_fields, bool use_strain_smoothing, aperi::LagrangianFormulationType formulation_type, bool output_coefficients) {
    if (solver_type == aperi::SolverType::STATIC) {
#ifdef USE_PROTEGO_MECH
        return StaticSolver::GetFieldData(uses_generalized_fields, use_strain_smoothing, formulation_type, output_coefficients);
#else
        throw std::runtime_error("Static solver is not available. protego-mech is required for this feature.");
#endif
    } else if (solver_type == aperi::SolverType::EXPLICIT) {
        return ExplicitSolver::GetFieldData(uses_generalized_fields, use_strain_smoothing, formulation_type, output_coefficients);
    } else {
        throw std::runtime_error("Unrecognized solver type.");
    }
}

}  // namespace aperi
