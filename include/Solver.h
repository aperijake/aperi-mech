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
#include "SimpleTimerFactory.h"
#include "TimerTypes.h"

namespace aperi {

class BoundaryCondition;
class IoMesh;
class ContactForceContribution;
class ExternalForceContribution;
class TimeStepper;
template <typename EventType>
class Scheduler;

/**
 * @class Solver
 * @brief Abstract base class for solving mechanical problems.
 *
 * The Solver class provides an interface for solving mechanical problems.
 * It defines pure virtual functions for solving the problem and computing forces.
 * Derived classes must implement these functions to provide specific solving algorithms.
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
    Solver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler<double>> output_scheduler, std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler)
        : m_io_mesh(io_mesh), m_internal_force_contributions(force_contributions), m_external_force_contributions(external_force_contributions), m_contact_force_contributions(contact_force_contributions), m_boundary_conditions(boundary_conditions), m_time_stepper(time_stepper), m_output_scheduler(output_scheduler), m_reference_configuration_update_scheduler(reference_configuration_update_scheduler) {
        mp_mesh_data = m_io_mesh->GetMeshData();
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_processors);
        m_uses_generalized_fields = false;
        m_uses_one_pass_method = false;
        m_lagrangian_formulation_type = m_internal_force_contributions[0]->GetLagrangianFormulationType();
        m_active_selector = aperi::Selector({"universal_active_part"}, mp_mesh_data.get());
        for (const auto &force_contribution : m_internal_force_contributions) {
            if (force_contribution->UsesGeneralizedFields()) {
                m_uses_generalized_fields = true;
            }
            if (force_contribution->UsesOnePassMethod()) {
                m_uses_one_pass_method = true;
            }
            assert(m_lagrangian_formulation_type == force_contribution->GetLagrangianFormulationType());
        }

        if (m_uses_generalized_fields) {
            if (m_uses_one_pass_method == false) {
                std::string displacement_name_append = "";
                if (!m_uses_one_pass_method && (m_lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated || m_lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi)) {
                    displacement_name_append = "_inc";
                }
                // Create a value from generalized field processor for fields that need to be computed for internal force contributions
                std::array<aperi::FieldQueryData<double>, 1> src_field_query_data_kinematics;
                src_field_query_data_kinematics[0] = {"displacement_coefficients" + displacement_name_append, FieldQueryState::NP1};
                // Will need to add velocity here at some point, but not needed for now

                std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data_kinematics;
                dest_field_query_data_kinematics[0] = {"displacement" + displacement_name_append, FieldQueryState::None};
                m_kinematics_from_generalized_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<1>>(src_field_query_data_kinematics, dest_field_query_data_kinematics, mp_mesh_data);

                // Create a value from generalized field processor for the force field
                std::array<aperi::FieldQueryData<double>, 1> src_field_query_data_force;
                src_field_query_data_force[0] = {"force", FieldQueryState::None};

                std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data_force;
                dest_field_query_data_force[0] = {"force_coefficients", FieldQueryState::None};
                m_force_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<1>>(src_field_query_data_force, dest_field_query_data_force, mp_mesh_data);
            }
        }
    }

    /**
     * @brief Virtual destructor for Solver class.
     */
    virtual ~Solver() = default;

    /**
     * @brief Pure virtual function for solving the mechanical problem.
     * @return The average time taken to solve an increment of the mechanical problem.
     *
     * This function must be implemented by derived classes to provide a specific solving algorithm.
     */
    virtual double Solve() = 0;

    /**
     * @brief Get the mesh data object.
     * @return A shared pointer to the mesh data object.
     */
    std::shared_ptr<aperi::MeshData> GetMeshData() { return mp_mesh_data; }

    /**
     * @brief Updates the field states. N -> NP1 and NP1 -> N.
     *
     */
    virtual void UpdateFieldStates() = 0;

    /**
     * @brief Updates the fields from the generalized fields.
     */
    void UpdateFieldsFromGeneralizedFields();

    /**
     * @brief Pure virtual function for computing forces.
     *
     * This function must be implemented by derived classes to compute the forces acting on the mesh.
     */
    virtual void ComputeForce(double time, double time_increment) = 0;

    /**
     * @brief Pure virtual function for communicating forces.
     *
     * This function must be implemented by derived classes to communicate the forces between processors.
     */
    virtual void CommunicateForce() = 0;

    /**
     * @brief Get the Lagrangian formulation type.
     *
     * @return The LagrangianFormulationType object.
     */
    aperi::LagrangianFormulationType GetLagrangianFormulationType() { return m_lagrangian_formulation_type; }

   protected:
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
};

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
