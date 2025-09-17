#pragma once

#include <memory>
#include <vector>

#include "Constants.h"
#include "Field.h"
#include "Selector.h"

namespace aperi {
class BoundaryCondition;
class IoMesh;
class ContactForceContribution;
class ExternalForceContribution;
struct FieldData;
class TimeStepper;
class InternalForceContribution;
class MeshData;
template <typename EventType>
class Scheduler;
template <size_t N>
class FunctionEvaluationProcessor;
}  // namespace aperi

namespace aperi {

/**
 * @class Solver
 * @brief Abstract base class for solving mechanical problems.
 *
 * Provides an interface for solving mechanical problems with pure virtual functions
 * for solving and force computation. Derived classes implement specific algorithms.
 */
class Solver {
   public:
    /**
     * @brief Constructor for Solver class.
     * @param io_mesh The input/output mesh object.
     * @param force_contributions The vector of internal force contributions.
     * @param external_force_contributions The vector of external force contributions.
     * @param time_stepper The time stepper object.
     */
    Solver(std::shared_ptr<aperi::IoMesh> io_mesh,
           std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions,
           std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions,
           std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions,
           std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions,
           std::shared_ptr<aperi::TimeStepper> time_stepper,
           std::shared_ptr<aperi::Scheduler<double>> output_scheduler,
           std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler);

    /**
     * @brief Virtual destructor.
     */
    virtual ~Solver() = default;

    /**
     * @brief Solves the mechanical problem.
     * @return The average time taken to solve an increment.
     */
    virtual double Solve() = 0;

    /**
     * @brief Gets the mesh data object.
     * @return A shared pointer to the mesh data.
     */
    std::shared_ptr<aperi::MeshData> GetMeshData() { return mp_mesh_data; }

    /**
     * @brief Updates field states (N -> NP1 and NP1 -> N).
     */
    void UpdateFieldStates();

    /**
     * @brief Updates fields from generalized fields.
     */
    virtual void UpdateFieldsFromGeneralizedFields() = 0;

    /**
     * @brief Computes forces.
     * @param time Current time.
     * @param time_increment Time increment.
     */
    virtual void ComputeForce(double time, double time_increment) = 0;

    /**
     * @brief Communicates forces between processors.
     */
    virtual void CommunicateForce() = 0;

    /**
     * @brief Gets the Lagrangian formulation type.
     * @return The formulation type.
     */
    aperi::LagrangianFormulationType GetLagrangianFormulationType() { return m_lagrangian_formulation_type; }

    /**
     * @brief Function to get default field data.
     * @return A vector of default FieldData.
     */
    static std::vector<aperi::FieldData> GetFieldData(bool uses_generalized_fields, bool use_strain_smoothing, aperi::LagrangianFormulationType formulation_type, bool output_coefficients);

   protected:
    /**
     * @brief Sets the temporal varying output fields.
     */
    virtual void SetTemporalVaryingOutputFields() = 0;

    /**
     * @brief Writes the output.
     */
    void WriteOutput(double time);

    std::shared_ptr<aperi::IoMesh> m_io_mesh;                                                              ///< The input/output mesh object.
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> m_internal_force_contributions;         ///< The vector of internal force contributions.
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> m_external_force_contributions;         ///< The vector of external force contributions.
    std::vector<std::shared_ptr<aperi::ContactForceContribution>> m_contact_force_contributions;           ///< The vector of contact force contributions.
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;                          ///< The vector of boundary conditions.
    std::shared_ptr<aperi::TimeStepper> m_time_stepper;                                                    ///< The time stepper object.
    std::shared_ptr<aperi::Scheduler<double>> m_output_scheduler;                                          ///< The output scheduler object.
    std::shared_ptr<aperi::Scheduler<size_t>> m_reference_configuration_update_scheduler;                  ///< The reference configuration update scheduler object.
    std::shared_ptr<aperi::MeshData> mp_mesh_data;                                                         ///< The mesh data object.
    int m_num_processors;                                                                                  ///< The number of processors.
    bool m_uses_generalized_fields;                                                                        ///< Whether the solver uses generalized fields.
    bool m_uses_one_pass_method;                                                                           ///< Whether the solver uses the one-pass method.
    aperi::LagrangianFormulationType m_lagrangian_formulation_type;                                        ///< The Lagrangian formulation type.
    std::shared_ptr<aperi::FunctionEvaluationProcessor<1>> m_kinematics_from_generalized_field_processor;  ///< The kinematics from generalized field processor.
    std::shared_ptr<aperi::FunctionEvaluationProcessor<1>> m_force_field_processor;                        ///< The force field processor.
    aperi::Selector m_active_selector;                                                                     ///< The active selector.

    std::vector<aperi::Field<aperi::Real>> m_temporal_varying_output_fields;  ///< Fields that vary with time and should be output
};
}  // namespace aperi