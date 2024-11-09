#pragma once

#include <memory>
#include <vector>

#include "EntityProcessor.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "MeshData.h"
#include "Timer.h"
#include "ValueFromGeneralizedFieldProcessor.h"

namespace aperi {

class BoundaryCondition;
class IoMesh;
class ExternalForceContribution;
class TimeStepper;
template <typename EventType>
class Scheduler;

enum class SolverTimerType {
    UpdateFieldStates,
    ApplyBoundaryConditions,
    ComputeForce,
    TimeIntegrationNodalUpdates,
    CommunicateDisplacements,
    CommunicateForce,
    TimeStepCompute,
    NONE
};

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
    Solver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler<double>> output_scheduler)
        : m_io_mesh(io_mesh), m_internal_force_contributions(force_contributions), m_external_force_contributions(external_force_contributions), m_boundary_conditions(boundary_conditions), m_time_stepper(time_stepper), m_output_scheduler(output_scheduler) {
        mp_mesh_data = m_io_mesh->GetMeshData();
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_processors);
        m_uses_generalized_fields = false;
        m_uses_one_pass_method = false;
        for (const auto &force_contribution : m_internal_force_contributions) {
            if (force_contribution->UsesGeneralizedFields()) {
                m_uses_generalized_fields = true;
            }
            if (force_contribution->UsesOnePassMethod()) {
                m_uses_one_pass_method = true;
            }
        }
        if (m_uses_generalized_fields) {
            // Create a value from generalized field processor for all generalized fields
            std::array<aperi::FieldQueryData<double>, 3> src_field_query_data;
            src_field_query_data[0] = {"displacement_coefficients", FieldQueryState::NP1};
            src_field_query_data[1] = {"velocity_coefficients", FieldQueryState::NP1};
            src_field_query_data[2] = {"acceleration_coefficients", FieldQueryState::NP1};

            std::array<aperi::FieldQueryData<double>, 3> dest_field_query_data;
            dest_field_query_data[0] = {"displacement", FieldQueryState::None};
            dest_field_query_data[1] = {"velocity", FieldQueryState::None};
            dest_field_query_data[2] = {"acceleration", FieldQueryState::None};
            m_output_value_from_generalized_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<3>>(src_field_query_data, dest_field_query_data, mp_mesh_data);

            if (m_uses_one_pass_method == false) {
                // Create a value from generalized field processor for fields that need to be computed for internal force contributions
                std::array<aperi::FieldQueryData<double>, 1> src_field_query_data_kinematics;
                src_field_query_data_kinematics[0] = {"displacement_coefficients", FieldQueryState::NP1};
                // Will need to add velocity here at some point, but not needed for now

                std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data_kinematics;
                dest_field_query_data_kinematics[0] = {"displacement", FieldQueryState::None};
                m_kinematics_from_generalized_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<1>>(src_field_query_data_kinematics, dest_field_query_data_kinematics, mp_mesh_data);

                // Create a value from generalized field processor for the force field
                std::array<aperi::FieldQueryData<double>, 1> src_field_query_data_force;
                src_field_query_data_force[0] = {"force_local", FieldQueryState::None};

                std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data_force;
                dest_field_query_data_force[0] = {"force_coefficients", FieldQueryState::None};
                m_force_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<1>>(src_field_query_data_force, dest_field_query_data_force, mp_mesh_data);
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
    virtual void ComputeForce(const SolverTimerType &timer_type) = 0;

    /**
     * @brief Pure virtual function for communicating forces.
     *
     * This function must be implemented by derived classes to communicate the forces between processors.
     */
    virtual void CommunicateForce(const SolverTimerType &timer_type) = 0;

   protected:
    std::shared_ptr<aperi::IoMesh> m_io_mesh;                                                                       ///< The input/output mesh object.
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> m_internal_force_contributions;                  ///< The vector of internal force contributions.
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> m_external_force_contributions;                  ///< The vector of external force contributions.
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;                                   ///< The vector of boundary conditions.
    std::shared_ptr<aperi::TimeStepper> m_time_stepper;                                                             ///< The time stepper object.
    std::shared_ptr<aperi::Scheduler<double>> m_output_scheduler;                                                   ///< The output scheduler object.
    std::shared_ptr<aperi::MeshData> mp_mesh_data;                                                                  ///< The mesh data object.
    int m_num_processors;                                                                                           ///< The number of processors.
    bool m_uses_generalized_fields;                                                                                 ///< Whether the solver uses generalized fields.
    bool m_uses_one_pass_method;                                                                                    ///< Whether the solver uses the one-pass method.
    std::shared_ptr<aperi::ValueFromGeneralizedFieldProcessor<3>> m_output_value_from_generalized_field_processor;  ///< The value from generalized field processor.
    std::shared_ptr<aperi::ValueFromGeneralizedFieldProcessor<1>> m_kinematics_from_generalized_field_processor;    ///< The kinematics from generalized field processor.
    std::shared_ptr<aperi::ValueFromGeneralizedFieldProcessor<1>> m_force_field_processor;                          ///< The force field processor.
};

inline std::vector<std::string> explicit_solver_timer_names = {"UpdateFieldStates", "ApplyBoundaryConditions", "ComputeForce", "TimeIntegrationNodalUpdates", "CommunicateDisplacements", "CommunicateForce", "TimeStepCompute", "TimeStepCommunicate"};

/**
 * @class ExplicitSolver
 * @brief Represents an explicit solver for a mechanical system.
 *
 * This class is responsible for solving the mechanical system using an explicit time integration scheme.
 * It takes in various force contributions and a time stepper to advance the simulation over time.
 */
class ExplicitSolver : public Solver {
   public:
    /**
     * @brief Constructs an ExplicitSolver object.
     *
     * @param io_mesh The input/output mesh representing the mechanical system.
     * @param force_contributions A vector of internal force contributions applied to the mechanical system.
     * @param external_force_contributions A vector of external force contributions applied to the mechanical system.
     * @param time_stepper The time stepper used to advance the simulation over time.
     * @param output_scheduler The output scheduler used to control the output of the simulation.
     */
    ExplicitSolver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler<double>> output_scheduler)
        : Solver(io_mesh, force_contributions, external_force_contributions, boundary_conditions, time_stepper, output_scheduler), m_timer_manager("Explicit Solver", explicit_solver_timer_names) {
        // Set the force node processor for zeroing the force field
        m_node_processor_force = CreateNodeProcessorForce();
        m_node_processor_all = CreateNodeProcessorAll();  // TODO(jake): I am not sure if this is needed anymore
        if (m_uses_generalized_fields) {
            m_node_processor_force_local = CreateNodeProcessorForceLocal();
        }
    }

    ~ExplicitSolver() {}

    // Create node processor for all fields to make syncing easier
    std::shared_ptr<ActiveNodeProcessor<8>> CreateNodeProcessorAll() {
        std::array<FieldQueryData<double>, 8> field_query_data_vec;
        field_query_data_vec[0] = {"force_coefficients", FieldQueryState::None};
        field_query_data_vec[1] = {"displacement_coefficients", FieldQueryState::N};
        field_query_data_vec[2] = {"displacement_coefficients", FieldQueryState::NP1};
        field_query_data_vec[3] = {"velocity_coefficients", FieldQueryState::N};
        field_query_data_vec[4] = {"velocity_coefficients", FieldQueryState::NP1};
        field_query_data_vec[5] = {"acceleration_coefficients", FieldQueryState::N};
        field_query_data_vec[6] = {"acceleration_coefficients", FieldQueryState::NP1};
        field_query_data_vec[7] = {"mass", FieldQueryState::None};
        return std::make_shared<ActiveNodeProcessor<8>>(field_query_data_vec, mp_mesh_data);
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
        field_query_data_vec[0] = {"force_local", FieldQueryState::None};
        return std::make_shared<NodeProcessor<1>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for the first partial update
    std::shared_ptr<ActiveNodeProcessor<3>> CreateNodeProcessorFirstUpdate() {
        // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
        std::array<FieldQueryData<double>, 3> field_query_data_vec;
        field_query_data_vec[0] = {"velocity_coefficients", FieldQueryState::NP1};
        field_query_data_vec[1] = {"velocity_coefficients", FieldQueryState::N};
        field_query_data_vec[2] = {"acceleration_coefficients", FieldQueryState::N};
        return std::make_shared<ActiveNodeProcessor<3>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for updating displacements
    std::shared_ptr<ActiveNodeProcessor<3>> CreateNodeProcessorUpdateDisplacements() {
        // Compute the second partial update nodal displacements: d^{n+1} = d^n + Δt^{n+½}v^{n+½}
        std::array<FieldQueryData<double>, 3> field_query_data_vec;
        field_query_data_vec[0] = {"displacement_coefficients", FieldQueryState::NP1};
        field_query_data_vec[1] = {"displacement_coefficients", FieldQueryState::N};
        field_query_data_vec[2] = {"velocity_coefficients", FieldQueryState::NP1};
        return std::make_shared<ActiveNodeProcessor<3>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for the second partial update
    std::shared_ptr<ActiveNodeProcessor<2>> CreateNodeProcessorSecondUpdate() {
        // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
        std::array<FieldQueryData<double>, 2> field_query_data_vec;
        field_query_data_vec[0] = {"velocity_coefficients", FieldQueryState::NP1};
        field_query_data_vec[1] = {"acceleration_coefficients", FieldQueryState::NP1};
        return std::make_shared<ActiveNodeProcessor<2>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for the acceleration
    std::shared_ptr<ActiveNodeProcessor<3>> CreateNodeProcessorAcceleration() {
        // Compute the acceleration: a^{n+1} = f^{n+1}/m
        std::array<FieldQueryData<double>, 3> field_query_data_vec;
        field_query_data_vec[0] = {"acceleration_coefficients", FieldQueryState::NP1};
        field_query_data_vec[1] = {"force_coefficients", FieldQueryState::None};
        field_query_data_vec[2] = {"mass", FieldQueryState::None};
        return std::make_shared<ActiveNodeProcessor<3>>(field_query_data_vec, mp_mesh_data);
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
    void ComputeForce(const SolverTimerType &timer_type = SolverTimerType::ComputeForce) override;

    /**
     * @brief Communicates the force.
     *
     * This function is responsible for communicating the force.
     * It overrides the base class function.
     */
    void CommunicateForce(const SolverTimerType &timer_type = SolverTimerType::CommunicateForce) override;

   protected:
    /**
     * @brief Updates the field states. N -> NP1 and NP1 -> N.
     *
     */
    void UpdateFieldStates() override;

    /**
     * @brief Computes the acceleration.
     *
     * This function is responsible for calculating the acceleration.
     *
     * @param node_processor_acceleration The node processor for the acceleration.
     */
    void ComputeAcceleration(const std::shared_ptr<ActiveNodeProcessor<3>> &node_processor_acceleration);

    /**
     * @brief Computes the first partial update for the solver.
     *
     * @param half_time_step The half time step size.
     * @param node_processor_first_update The node processor for the first update.
     */
    void ComputeFirstPartialUpdate(double half_time_increment, const std::shared_ptr<ActiveNodeProcessor<3>> &node_processor_first_update);

    /**
     * @brief Computes the second partial update for the solver.
     *
     * @param half_time_step The half time step size.
     * @param node_processor_second_update The node processor for the second update.
     */
    void ComputeSecondPartialUpdate(double half_time_increment, const std::shared_ptr<ActiveNodeProcessor<2>> &node_processor_second_update);

    /**
     * @brief Updates the displacements.
     *
     * @param time_increment The time increment.
     * @param node_processor_update_nodal_displacements The node processor for updating the nodal displacements.
     */
    void UpdateDisplacements(double time_increment, const std::shared_ptr<ActiveNodeProcessor<3>> &node_processor_update_displacements);

    /**
     * @brief Communicates the displacements.
     *
     * @param node_processor_update_displacements The node processor for updating the nodal displacements.
     */
    void CommunicateDisplacements(const std::shared_ptr<ActiveNodeProcessor<3>> &node_processor_update_displacements);

    std::shared_ptr<ActiveNodeProcessor<1>> m_node_processor_force;
    std::shared_ptr<NodeProcessor<1>> m_node_processor_force_local;
    std::shared_ptr<ActiveNodeProcessor<8>> m_node_processor_all;
    aperi::TimerManager<SolverTimerType> m_timer_manager;

    /**
     * @brief Writes the output.
     */
    void WriteOutput(double time);
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
 * @return A unique pointer to the created solver object.
 */
inline std::unique_ptr<Solver> CreateSolver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler<double>> output_scheduler) {
    return std::make_unique<ExplicitSolver>(io_mesh, force_contributions, external_force_contributions, boundary_conditions, time_stepper, output_scheduler);
}

}  // namespace aperi
