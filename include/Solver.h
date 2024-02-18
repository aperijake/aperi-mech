#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_topology/topology.hpp>
#include <vector>

#include "IoMesh.h"

namespace aperi {

class BoundaryCondition;
class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;
class TimeStepper;
class Scheduler;

class NodeProcessor {
    typedef stk::mesh::Field<double> DoubleField;

   public:
    NodeProcessor(const std::vector<DoubleField *> fields, stk::mesh::BulkData *bulk_data)
        : m_fields(fields), m_bulk_data(bulk_data) {}

    // Loop over each node and apply the function
    void for_each_dof(const std::vector<double> &data, void (*func)(size_t iI, const std::vector<double> &data, std::vector<double *> &field_data)) const {
        size_t num_values_per_node = 3;                     // Number of values per node
        std::vector<double *> field_data(m_fields.size());  // Array to hold field data

        // Loop over all the buckets
        for (stk::mesh::Bucket *bucket : m_bulk_data->buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            for (size_t i = 0, e = m_fields.size(); i < e; ++i) {
                field_data[i] = stk::mesh::field_data(*m_fields[i], *bucket);
            }
            // Loop over each node in the bucket
            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Loop over each component of the node
                for (size_t i = 0; i < num_values_per_node; i++) {
                    size_t iI = i_node * num_values_per_node + i;  // Index into the field data
                    func(iI, data, field_data);                    // Call the function
                }
            }
        }
    }

   private:
    const std::vector<DoubleField *> m_fields;  // The fields to process
    stk::mesh::BulkData *m_bulk_data;           // The bulk data object.
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
    Solver(std::shared_ptr<aperi::IoMesh> io_mesh, std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions, std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions, std::shared_ptr<aperi::TimeStepper> time_stepper, std::shared_ptr<aperi::Scheduler> output_scheduler)
        : m_io_mesh(io_mesh), m_internal_force_contributions(force_contributions), m_external_force_contributions(external_force_contributions), m_boundary_conditions(boundary_conditions), m_time_stepper(time_stepper), m_output_scheduler(output_scheduler) {
        meta_data = &m_io_mesh->GetMetaData();
        bulk_data = &m_io_mesh->GetBulkData();
    }

    /**
     * @brief Virtual destructor for Solver class.
     */
    virtual ~Solver() = default;

    /**
     * @brief Pure virtual function for solving the mechanical problem.
     *
     * This function must be implemented by derived classes to provide a specific solving algorithm.
     */
    virtual void Solve() = 0;

    /**
     * @brief Get the bulk data object.
     * @return A pointer to the bulk data object.
     */
    stk::mesh::BulkData *GetBulkData() { return bulk_data; }

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
    stk::mesh::MetaData *meta_data;                                                                 ///< The meta data object.
    stk::mesh::BulkData *bulk_data;                                                                 ///< The bulk data object.
};

/**
 * @class ExplicitSolver
 * @brief Represents an explicit solver for a mechanical system.
 *
 * This class is responsible for solving the mechanical system using an explicit time integration scheme.
 * It takes in various force contributions and a time stepper to advance the simulation over time.
 */
class ExplicitSolver : public Solver {
    typedef stk::mesh::Field<double> DoubleField;

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
        // Get the displacement, velocity, and acceleration fields
        displacement_field = meta_data->get_field<double>(stk::topology::NODE_RANK, "displacement");
        velocity_field = meta_data->get_field<double>(stk::topology::NODE_RANK, "velocity");
        acceleration_field = meta_data->get_field<double>(stk::topology::NODE_RANK, "acceleration");
        force_field = meta_data->get_field<double>(stk::topology::NODE_RANK, "force");
        mass_field = meta_data->get_field<double>(stk::topology::NODE_RANK, "mass");

        // Get the field states
        displacement_field_n = &displacement_field->field_of_state(stk::mesh::StateN);
        displacement_field_np1 = &displacement_field->field_of_state(stk::mesh::StateNP1);
        velocity_field_n = &velocity_field->field_of_state(stk::mesh::StateN);
        velocity_field_np1 = &velocity_field->field_of_state(stk::mesh::StateNP1);
        acceleration_field_n = &acceleration_field->field_of_state(stk::mesh::StateN);
        acceleration_field_np1 = &acceleration_field->field_of_state(stk::mesh::StateNP1);
        force_field_np1 = &force_field->field_of_state(stk::mesh::StateNP1);
        mass_field_n = &mass_field->field_of_state(stk::mesh::StateNone);
    }

    ~ExplicitSolver() {}

    // Create a node processor for the first partial update
    std::shared_ptr<NodeProcessor> CreateNodeProcessorFirstUpdate() {
        // Compute the first partial update nodal velocities: v^{n+½} = v^n + (t^{n+½} − t^n)a^n
        std::vector<DoubleField *> fields = {velocity_field_np1, velocity_field_n, acceleration_field_n};
        return std::make_shared<NodeProcessor>(fields, &m_io_mesh->GetBulkData());
    }

    // Create a node processor for updating displacements
    std::shared_ptr<NodeProcessor> CreateNodeProcessorUpdateDisplacements() {
        // Compute the second partial update nodal displacements: d^{n+1} = d^n + Δt^{n+½}v^{n+½}
        std::vector<DoubleField *> fields = {displacement_field_np1, displacement_field_n, velocity_field_np1};
        return std::make_shared<NodeProcessor>(fields, &m_io_mesh->GetBulkData());
    }

    // Create a node processor for the second partial update
    std::shared_ptr<NodeProcessor> CreateNodeProcessorSecondUpdate() {
        // Compute the second partial update nodal velocities: v^{n+1} = v^{n+½} + (t^{n+1} − t^{n+½})a^{n+1}
        std::vector<DoubleField *> fields = {velocity_field_np1, acceleration_field_np1};
        return std::make_shared<NodeProcessor>(fields, &m_io_mesh->GetBulkData());
    }

    // Create a node processor for the acceleration
    std::shared_ptr<NodeProcessor> CreateNodeProcessorAcceleration() {
        // Compute the acceleration: a^{n+1} = f^{n+1}/m
        std::vector<DoubleField *> fields = {acceleration_field_np1, force_field_np1, mass_field_n};
        return std::make_shared<NodeProcessor>(fields, &m_io_mesh->GetBulkData());
    }

    /**
     * @brief Solves the mechanical system.
     *
     * This function overrides the base class function and is responsible for solving the mechanical system using an explicit time integration scheme.
     */
    void Solve() override;

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
    void ComputeAcceleration(const std::shared_ptr<NodeProcessor> &node_processor_acceleration);

    /**
     * @brief Computes the first partial update for the solver.
     *
     * @param half_time_step The half time step size.
     * @param node_processor_first_update The node processor for the first update.
     */
    void ComputeFirstPartialUpdate(double half_time_step, const std::shared_ptr<NodeProcessor> &node_processor_first_update);

    /**
     * @brief Computes the second partial update for the solver.
     *
     * @param half_time_step The half time step size.
     * @param node_processor_second_update The node processor for the second update.
     */
    void ComputeSecondPartialUpdate(double half_time_step, const std::shared_ptr<NodeProcessor> &node_processor_second_update);

    /**
     * @brief Updates the displacements.
     *
     * @param time_increment The time increment.
     * @param node_processor_update_nodal_displacements The node processor for updating the nodal displacements.
     */
    void UpdateDisplacements(double time_increment, const std::shared_ptr<NodeProcessor> &node_processor_update_nodal_displacements);

    DoubleField *displacement_field;  ///< Pointer to the displacement field.
    DoubleField *velocity_field;      ///< Pointer to the velocity field.
    DoubleField *acceleration_field;  ///< Pointer to the acceleration field.
    DoubleField *force_field;         ///< Pointer to the force field.
    DoubleField *mass_field;          ///< Pointer to the mass field.
    DoubleField *displacement_field_n;
    DoubleField *displacement_field_np1;
    DoubleField *velocity_field_n;
    DoubleField *velocity_field_np1;
    DoubleField *acceleration_field_n;
    DoubleField *acceleration_field_np1;
    DoubleField *force_field_np1;
    DoubleField *mass_field_n;
    std::shared_ptr<NodeProcessor> m_node_processor_first_update;
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
