#include "Solvers/Base.h"

#include <chrono>
#include <numeric>

#include "FieldData.h"
#include "FunctionEvaluationProcessor.h"
#include "InternalForceContribution.h"
#include "IoMesh.h"
#include "Selector.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoFieldData.h"
#endif

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

std::vector<FieldData> Solver::GetFieldData(bool uses_generalized_fields, bool use_strain_smoothing, aperi::LagrangianFormulationType lagrangian_formulation_type, bool output_coefficients) {
    std::vector<FieldData> field_data;

    field_data.push_back(FieldData("max_edge_length", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));       // The maximum edge length for the node
    field_data.push_back(FieldData("essential_boundary", FieldDataRank::VECTOR, FieldDataTopologyRank::NODE, 1, std::vector<Unsigned>{}));  // Indicator for essential boundary conditions

    // Element data
    field_data.push_back(FieldData("displacement_gradient", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
    field_data.push_back(FieldData("pk1_stress", FieldDataRank::TENSOR, FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
    field_data.push_back(FieldData("volume", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));
    field_data.push_back(FieldData("bulk_modulus", FieldDataRank::SCALAR, FieldDataTopologyRank::ELEMENT, 1, std::vector<double>{}));

    // TODO(jake): Add ability to turn this on / off per part
    if (use_strain_smoothing) {
        // TODO(jake): Some of these fields are only really needed for RK, but NeighborSearchProcessor needs to be refactored to allow for this

        // Node neighbor data.
        field_data.push_back(FieldData("num_neighbors", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<Unsigned>{}));  // The number of neighbors for the node
        field_data.push_back(FieldData("kernel_radius", FieldDataRank::SCALAR, FieldDataTopologyRank::NODE, 1, std::vector<double>{}));    // The kernel radius for the node

        Unsigned max_node_num_neighbors = uses_generalized_fields ? MAX_NODE_NUM_NEIGHBORS : FEM_NODE_NUM_NEIGHBORS;
        field_data.push_back(FieldData("neighbors", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, max_node_num_neighbors, std::vector<Unsigned>{}, false));      // The neighbors of the node
        field_data.push_back(FieldData("function_values", FieldDataRank::CUSTOM, FieldDataTopologyRank::NODE, 1, max_node_num_neighbors, std::vector<double>{}, false));  // The function values of neighbors at the node

#ifdef USE_PROTEGO_MECH
        std::vector<FieldData> protego_field_data = protego::GetFieldData();
        field_data.insert(field_data.end(), protego_field_data.begin(), protego_field_data.end());
#endif
    }

    return field_data;
}

void Solver::UpdateFieldStates() {
    bool rotate_device_states = true;
    mp_mesh_data->UpdateFieldDataStates(rotate_device_states);
}

void Solver::WriteOutput(double time) {
    if (m_uses_generalized_fields) {
        UpdateFieldsFromGeneralizedFields();
    }
    for (auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->PopulateElementOutputs();
    }
    // Write field results
    for (auto &field : m_temporal_varying_output_fields) {
        field.UpdateField();
        field.SyncDeviceToHost();
    }
    m_io_mesh->WriteFieldResults(time);
}

}  // namespace aperi
