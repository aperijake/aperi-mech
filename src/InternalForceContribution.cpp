#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <utility>

#include "Element.h"
#include "FieldData.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

InternalForceContribution::InternalForceContribution(InternalForceContributionParameters parameters) : m_internal_force_contribution_parameters(std::move(parameters)) {
    // Setup the internal force contribution
    SetupInternalForceContribution();
}

void InternalForceContribution::SetupInternalForceContribution() {
    // Get the number of nodes per element
    m_num_nodes_per_element = m_internal_force_contribution_parameters.mesh_data->GetNumNodesPerElement(m_internal_force_contribution_parameters.part_name);
    if (m_num_nodes_per_element != 4) {
        throw std::runtime_error("Unsupported element topology");
    }

    // Get the field query data and part names
    const std::vector<std::string> part_names = {m_internal_force_contribution_parameters.part_name};
    std::vector<FieldQueryData> field_query_data_gather;
    if (m_internal_force_contribution_parameters.integration_scheme_parameters->GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {  // TODO(jake): this doesn't have to have coordinates
        field_query_data_gather.resize(2);
        field_query_data_gather[0] = FieldQueryData{"displacement", FieldQueryState::NP1};
        field_query_data_gather[1] = FieldQueryData{"velocity", FieldQueryState::NP1};
    } else {
        field_query_data_gather.resize(3);
        field_query_data_gather[0] = FieldQueryData{m_internal_force_contribution_parameters.mesh_data->GetCoordinatesFieldName(), FieldQueryState::None};
        field_query_data_gather[1] = FieldQueryData{"displacement", FieldQueryState::NP1};
        field_query_data_gather[2] = FieldQueryData{"velocity", FieldQueryState::NP1};
    }

    // Create the element.
    m_element = CreateElement(m_num_nodes_per_element, m_internal_force_contribution_parameters.approximation_space_parameters, m_internal_force_contribution_parameters.integration_scheme_parameters, field_query_data_gather, part_names, m_internal_force_contribution_parameters.mesh_data, m_internal_force_contribution_parameters.material);
}

}  // namespace aperi
