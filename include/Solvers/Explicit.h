#pragma once

#include <memory>
#include <vector>

#include "Constants.h"
#include "EntityProcessor.h"
#include "ExplicitTimeIntegrator.h"
#include "Field.h"
#include "FieldData.h"
#include "FunctionEvaluationProcessor.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "MeshData.h"
#include "Selector.h"
#include "Solvers/Base.h"

namespace aperi {

class BoundaryCondition;
class IoMesh;
class ContactForceContribution;
class ExternalForceContribution;
class TimeStepper;
template <typename EventType>
class Scheduler;

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
    ExplicitSolver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler<double>> output_scheduler, std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler)
        : Solver(io_mesh, force_contributions, external_force_contributions, contact_force_contributions, boundary_conditions, time_stepper, output_scheduler, reference_configuration_update_scheduler) {
        // Set the force node processor for zeroing the force field
        m_node_processor_force = CreateNodeProcessorForce();
        if (m_uses_generalized_fields) {
            m_node_processor_force_local = CreateNodeProcessorForceLocal();
        }
    }

    ~ExplicitSolver() {}

    // Set the temporal varying output fields
    void SetTemporalVaryingOutputFields() {
        m_temporal_varying_output_fields.push_back(aperi::Field<double>(mp_mesh_data, aperi::FieldQueryData<double>{"force_coefficients", FieldQueryState::None, FieldDataTopologyRank::NODE}));
        m_temporal_varying_output_fields.push_back(aperi::Field<double>(mp_mesh_data, aperi::FieldQueryData<double>{"displacement_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}));
        m_temporal_varying_output_fields.push_back(aperi::Field<double>(mp_mesh_data, aperi::FieldQueryData<double>{"velocity_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}));
        m_temporal_varying_output_fields.push_back(aperi::Field<double>(mp_mesh_data, aperi::FieldQueryData<double>{"acceleration_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}));
        m_temporal_varying_output_fields.push_back(aperi::Field<double>(mp_mesh_data, aperi::FieldQueryData<double>{"displacement_gradient", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}));
        m_temporal_varying_output_fields.push_back(aperi::Field<double>(mp_mesh_data, aperi::FieldQueryData<double>{"pk1_stress", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}));

        std::shared_ptr<aperi::Field<double>> state_field_ptr = aperi::GetField<double>(mp_mesh_data, aperi::FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT});
        if (state_field_ptr != nullptr) {
            m_temporal_varying_output_fields.push_back(*state_field_ptr);
        }
        std::shared_ptr<aperi::Field<double>> ref_disp_grad_field_ptr = aperi::GetField<double>(mp_mesh_data, aperi::FieldQueryData<double>{"reference_displacement_gradient", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
        if (ref_disp_grad_field_ptr != nullptr) {
            m_temporal_varying_output_fields.push_back(*ref_disp_grad_field_ptr);
        }
    }

    // Create a node processor for force
    std::shared_ptr<ActiveNodeProcessor<1>> CreateNodeProcessorForce() {
        std::array<FieldQueryData<double>, 1> field_query_data_vec;
        field_query_data_vec[0] = {"force_coefficients", FieldQueryState::None};
        return std::make_shared<ActiveNodeProcessor<1>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for local force
    std::shared_ptr<NodeProcessor<1>> CreateNodeProcessorForceLocal() {
        std::array<FieldQueryData<double>, 1> field_query_data_vec;
        field_query_data_vec[0] = {"force", FieldQueryState::None};
        return std::make_shared<NodeProcessor<1>>(field_query_data_vec, mp_mesh_data);
    }

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
    /**
     * @brief Updates the field states. N -> NP1 and NP1 -> N.
     *
     */
    void UpdateFieldStates() override;

    std::shared_ptr<ActiveNodeProcessor<1>> m_node_processor_force;
    std::shared_ptr<NodeProcessor<1>> m_node_processor_force_local;
    std::vector<aperi::Field<double>> m_temporal_varying_output_fields;

    /**
     * @brief Writes the output.
     */
    void WriteOutput(double time);

    /**
     * @brief Updates the shape functions.
     * @param n The current time step index.
     * @param explicit_time_integrator The explicit time integrator object.
     */
    void UpdateShapeFunctions(size_t n, const std::shared_ptr<ExplicitTimeIntegrator> &explicit_time_integrator);
};

}  // namespace aperi
