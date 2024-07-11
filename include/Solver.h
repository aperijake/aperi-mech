#pragma once

#include <memory>
#include <vector>

#include "EntityProcessor.h"
#include "IoMesh.h"
#include "InternalForceContribution.h"
#include "MeshData.h"

namespace aperi {

class BoundaryCondition;
class IoMesh;
class ExternalForceContribution;
class TimeStepper;
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
    Solver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler> output_scheduler)
        : m_io_mesh(io_mesh), m_internal_force_contributions(force_contributions), m_external_force_contributions(external_force_contributions), m_boundary_conditions(boundary_conditions), m_time_stepper(time_stepper), m_output_scheduler(output_scheduler) {
        mp_mesh_data = m_io_mesh->GetMeshData();
        MPI_Comm_size(MPI_COMM_WORLD, &m_num_processors);
        m_uses_generalized_fields = false;
        for (const auto &force_contribution : m_internal_force_contributions) {
            if (force_contribution->UsesGeneralizedFields()) {
                m_uses_generalized_fields = true;
                break;
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

   protected:
    /**
     * @brief Pure virtual function for computing forces.
     *
     * This function must be implemented by derived classes to compute the forces acting on the mesh.
     */
    virtual void ComputeForce() = 0;

    std::shared_ptr<aperi::IoMesh> m_io_mesh;                                                       ///< The input/output mesh object.
    std::vector<std::shared_ptr<aperi::InternalForceContribution>> m_internal_force_contributions;  ///< The vector of internal force contributions.
    std::vector<std::shared_ptr<aperi::ExternalForceContribution>> m_external_force_contributions;  ///< The vector of external force contributions.
    std::vector<std::shared_ptr<aperi::BoundaryCondition>> m_boundary_conditions;                   ///< The vector of boundary conditions.
    std::shared_ptr<aperi::TimeStepper> m_time_stepper;                                             ///< The time stepper object.
    std::shared_ptr<aperi::Scheduler> m_output_scheduler;                                           ///< The output scheduler object.
    std::shared_ptr<aperi::MeshData> mp_mesh_data;                                                  ///< The mesh data object.
    int m_num_processors;                                                                           ///< The number of processors.
    bool m_uses_generalized_fields;                                                                  ///< Whether the solver uses generalized fields.
};

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
    ExplicitSolver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler> output_scheduler)
        : Solver(io_mesh, force_contributions, external_force_contributions, boundary_conditions, time_stepper, output_scheduler) {
        // Set the force node processor for zeroing the force field
        m_node_processor_force = CreateNodeProcessorForce();
        m_node_processor_all = CreateNodeProcessorAll();
    }

    ~ExplicitSolver() {}

    // Create node processor for all fields to make syncing easier
    std::shared_ptr<NodeProcessor<9>> CreateNodeProcessorAll() {
        std::array<FieldQueryData, 9> field_query_data_vec;
        field_query_data_vec[0] = {"force", FieldQueryState::N};
        field_query_data_vec[1] = {"force", FieldQueryState::NP1};
        field_query_data_vec[2] = {"displacement", FieldQueryState::N};
        field_query_data_vec[3] = {"displacement", FieldQueryState::NP1};
        field_query_data_vec[4] = {"velocity", FieldQueryState::N};
        field_query_data_vec[5] = {"velocity", FieldQueryState::NP1};
        field_query_data_vec[6] = {"acceleration", FieldQueryState::N};
        field_query_data_vec[7] = {"acceleration", FieldQueryState::NP1};
        field_query_data_vec[8] = {"mass", FieldQueryState::None};
        return std::make_shared<NodeProcessor<9>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for force
    std::shared_ptr<NodeProcessor<1>> CreateNodeProcessorForce() {
        std::array<FieldQueryData, 1> field_query_data_vec;
        field_query_data_vec[0] = {"force", FieldQueryState::NP1};
        return std::make_shared<NodeProcessor<1>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for the first partial update
    std::shared_ptr<NodeProcessor<3>> CreateNodeProcessorFirstUpdate() {
        // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
        std::array<FieldQueryData, 3> field_query_data_vec;
        field_query_data_vec[0] = {"velocity", FieldQueryState::NP1};
        field_query_data_vec[1] = {"velocity", FieldQueryState::N};
        field_query_data_vec[2] = {"acceleration", FieldQueryState::N};
        return std::make_shared<NodeProcessor<3>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for updating displacements
    std::shared_ptr<NodeProcessor<3>> CreateNodeProcessorUpdateDisplacements() {
        // Compute the second partial update nodal displacements: d^{n+1} = d^n + Δt^{n+½}v^{n+½}
        std::array<FieldQueryData, 3> field_query_data_vec;
        field_query_data_vec[0] = {"displacement", FieldQueryState::NP1};
        field_query_data_vec[1] = {"displacement", FieldQueryState::N};
        field_query_data_vec[2] = {"velocity", FieldQueryState::NP1};
        return std::make_shared<NodeProcessor<3>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for the second partial update
    std::shared_ptr<NodeProcessor<2>> CreateNodeProcessorSecondUpdate() {
        // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
        std::array<FieldQueryData, 2> field_query_data_vec;
        field_query_data_vec[0] = {"velocity", FieldQueryState::NP1};
        field_query_data_vec[1] = {"acceleration", FieldQueryState::NP1};
        return std::make_shared<NodeProcessor<2>>(field_query_data_vec, mp_mesh_data);
    }

    // Create a node processor for the acceleration
    std::shared_ptr<NodeProcessor<3>> CreateNodeProcessorAcceleration() {
        // Compute the acceleration: a^{n+1} = f^{n+1}/m
        std::array<FieldQueryData, 3> field_query_data_vec;
        field_query_data_vec[0] = {"acceleration", FieldQueryState::NP1};
        field_query_data_vec[1] = {"force", FieldQueryState::NP1};
        field_query_data_vec[2] = {"mass", FieldQueryState::None};
        return std::make_shared<NodeProcessor<3>>(field_query_data_vec, mp_mesh_data);
    }

    /**
     * @brief Solves the mechanical system.
     *
     * This function overrides the base class function and is responsible for solving the mechanical system using an explicit time integration scheme.
     */
    double Solve() override;

   protected:
    /**
     * @brief Computes the force.
     *
     * This function is responsible for calculating the force.
     * It overrides the base class function.
     */
    void ComputeForce() override;

    /**
     * @brief Computes the acceleration.
     *
     * This function is responsible for calculating the acceleration.
     *
     * @param node_processor_acceleration The node processor for the acceleration.
     */
    static void ComputeAcceleration(const std::shared_ptr<NodeProcessor<3>> &node_processor_acceleration);

    /**
     * @brief Computes the first partial update for the solver.
     *
     * @param half_time_step The half time step size.
     * @param node_processor_first_update The node processor for the first update.
     */
    static void ComputeFirstPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor<3>> &node_processor_first_update);

    /**
     * @brief Computes the second partial update for the solver.
     *
     * @param half_time_step The half time step size.
     * @param node_processor_second_update The node processor for the second update.
     */
    static void ComputeSecondPartialUpdate(double half_time_increment, const std::shared_ptr<NodeProcessor<2>> &node_processor_second_update);

    /**
     * @brief Updates the displacements.
     *
     * @param time_increment The time increment.
     * @param node_processor_update_nodal_displacements The node processor for updating the nodal displacements.
     */
    void UpdateDisplacements(double time_increment, const std::shared_ptr<NodeProcessor<3>> &node_processor_update_displacements);

    /**
     * @brief Updates the field states. N -> NP1 and NP1 -> N.
     *
     */
    void UpdateFieldStates();

    std::shared_ptr<NodeProcessor<1>> m_node_processor_force;
    std::shared_ptr<NodeProcessor<9>> m_node_processor_all;

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
inline std::unique_ptr<Solver> CreateSolver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler> output_scheduler) {
    return std::make_unique<ExplicitSolver>(io_mesh, force_contributions, external_force_contributions, boundary_conditions, time_stepper, output_scheduler);
}

}  // namespace aperi
