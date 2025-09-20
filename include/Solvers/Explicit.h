#pragma once

#include <memory>
#include <vector>

#include "EntityProcessor.h"
#include "Field.h"
#include "Solvers/Base.h"

namespace aperi {

class IoMesh;
class InternalForceContribution;
class ContactForceContribution;
class ExternalForceContribution;
template <size_t NumFields>
class FunctionEvaluationProcessor;
class BoundaryCondition;
class TimeStepper;
template <typename EventType>
class Scheduler;
class ExplicitTimeIntegrator;

/**
 * @class ExplicitSolver
 * @brief Represents an explicit solver for a mechanical system.
 *
 * This class is responsible for solving the mechanical system using an explicit time integration scheme.
 * It takes in various force contributions and a time stepper to advance the simulation over time.
 */
class ExplicitSolver : public Solver, public std::enable_shared_from_this<ExplicitSolver> {
   public:
    /**
     * @brief Constructs an ExplicitSolver object.
     *
     * @param io_mesh The input/output mesh representing the mechanical system.
     * @param force_contributions A vector of internal force contributions applied to the mechanical system.
     * @param external_force_contributions A vector of external force contributions applied to the mechanical system.
     * @param contact_force_contributions A vector of contact force contributions applied to the mechanical system.
     * @param time_stepper The time stepper used to advance the simulation over time.
     * @param output_scheduler The output scheduler used to control the output of the simulation.
     * @param reference_configuration_update_scheduler The reference configuration update scheduler used to update the reference configuration.
     */
    ExplicitSolver(std::shared_ptr<aperi::IoMesh> io_mesh,
                   std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions,
                   std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions,
                   std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions,
                   std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions,
                   std::shared_ptr<aperi::TimeStepper> time_stepper,
                   std::shared_ptr<aperi::Scheduler<double>> output_scheduler,
                   std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler)
        : Solver(io_mesh,
                 force_contributions,
                 external_force_contributions,
                 contact_force_contributions,
                 boundary_conditions,
                 time_stepper,
                 output_scheduler,
                 reference_configuration_update_scheduler),
          m_force_coefficients_field(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"force_coefficients", FieldQueryState::None, aperi::FieldDataTopologyRank::NODE}) {
        // Set the force node processor for zeroing the force field
        if (m_uses_generalized_fields) {
            m_local_force_coefficients_field = aperi::Field<aperi::Real>(mp_mesh_data, aperi::FieldQueryData<aperi::Real>{"force", FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
        }
        CreateOutputValueFromGeneralizedFieldProcessors();
    }

    ~ExplicitSolver() {}

    /**
     * @brief Function to get default field data.
     * @return A vector of default FieldData.
     */
    static std::vector<aperi::FieldData> GetFieldData(bool uses_generalized_fields, bool use_strain_smoothing, aperi::LagrangianFormulationType formulation_type, bool output_coefficients);

    /**
     * @brief Build the mass matrix.
     *
     * This function builds the mass matrix for the system.
     */
    void BuildMassMatrix();

    /**
     * @brief Solves the mechanical system.
     *
     * This function overrides the base class function and is responsible for solving the mechanical system using an explicit time integration scheme.
     */
    double Solve() override;

    /**
     * @brief Computes the force.
     *
     * This function is responsible for calculating the force.
     * It overrides the base class function.
     */
    void ComputeForce(double time, double time_increment) override;

    /**
     * @brief Communicates the force.
     *
     * This function is responsible for communicating the force.
     * It overrides the base class function.
     */
    void CommunicateForce() override;

   protected:
    // Set the temporal varying output fields
    void SetTemporalVaryingOutputFields() override;

    /**
     * @brief Creates processors to compute output values from generalized fields.
     */
    void CreateOutputValueFromGeneralizedFieldProcessors();

    /**
     * @brief Updates fields from generalized fields.
     */
    void UpdateFieldsFromGeneralizedFields() override;

    /**
     * @brief Updates the shape functions.
     * @param n The current time step index.
     * @param explicit_time_integrator The explicit time integrator object.
     */
    void UpdateShapeFunctions(size_t n, const std::shared_ptr<ExplicitTimeIntegrator> &explicit_time_integrator);

    // Logging functions
    void LogLine(int width = 89) const;
    void LogRow(const std::array<std::string, 5> &row) const;
    void LogHeader() const;
    void LogEvent(const size_t n, const double time, const double time_increment, const double this_runtime, const std::string &event = "") const;

    aperi::Field<aperi::Real> m_force_coefficients_field;        ///< The force coefficients field
    aperi::Field<aperi::Real> m_local_force_coefficients_field;  ///< The local force coefficients field

    std::vector<std::shared_ptr<aperi::FunctionEvaluationProcessor<3>>> m_output_value_from_generalized_field_processors;  ///< To compute output values from generalized fields
};
}  // namespace aperi