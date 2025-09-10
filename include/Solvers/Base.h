#pragma once

#include <memory>
#include <vector>

#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "FunctionEvaluationProcessor.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "MeshData.h"
#include "Selector.h"

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
    Solver(std::shared_ptr<aperi::IoMesh> io_mesh,
           std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions,
           std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions,
           std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions,
           std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions,
           std::shared_ptr<aperi::TimeStepper> time_stepper,
           std::shared_ptr<aperi::Scheduler<double>> output_scheduler,
           std::shared_ptr<aperi::Scheduler<size_t>> reference_configuration_update_scheduler)
        : m_io_mesh(io_mesh),
          m_internal_force_contributions(force_contributions),
          m_external_force_contributions(external_force_contributions),
          m_contact_force_contributions(contact_force_contributions),
          m_boundary_conditions(boundary_conditions),
          m_time_stepper(time_stepper),
          m_output_scheduler(output_scheduler),
          m_reference_configuration_update_scheduler(reference_configuration_update_scheduler) {
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

}  // namespace aperi
