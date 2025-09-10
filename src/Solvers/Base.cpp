#include "Solvers/Base.h"

#include <chrono>
#include <numeric>

#include "FieldData.h"
#include "FunctionEvaluationProcessor.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "Selector.h"

namespace aperi {

Solver::Solver(std::shared_ptr<aperi::IoMesh> io_mesh,
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
            // Create kinematics processor for generalized fields
            std::array<aperi::FieldQueryData<double>, 1> src_field_query_data_kinematics;
            src_field_query_data_kinematics[0] = {"displacement_coefficients" + displacement_name_append, FieldQueryState::NP1};

            std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data_kinematics;
            dest_field_query_data_kinematics[0] = {"displacement" + displacement_name_append, FieldQueryState::None};
            m_kinematics_from_generalized_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<1>>(src_field_query_data_kinematics, dest_field_query_data_kinematics, mp_mesh_data);

            // Create force processor for generalized fields
            std::array<aperi::FieldQueryData<double>, 1> src_field_query_data_force;
            src_field_query_data_force[0] = {"force", FieldQueryState::None};

            std::array<aperi::FieldQueryData<double>, 1> dest_field_query_data_force;
            dest_field_query_data_force[0] = {"force_coefficients", FieldQueryState::None};
            m_force_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<1>>(src_field_query_data_force, dest_field_query_data_force, mp_mesh_data);
        }
    }
}

void Solver::UpdateFieldsFromGeneralizedFields() {
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeValuesFromGeneralizedFields();
    }
}

}  // namespace aperi
