#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <utility>

#include "Element.h"
#include "FieldData.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

void InternalForceContribution::Preprocess() {
    // Get the field query data and part names
    const std::vector<std::string> part_names = {m_internal_force_contribution_parameters.part_name};
    std::vector<FieldQueryData<double>> field_query_data_gather;
    if (m_internal_force_contribution_parameters.integration_scheme_parameters->GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {  // TODO(jake): this doesn't have to have coordinates
        field_query_data_gather.resize(2);
        if (UsesGeneralizedFields() && (!UsesOnePassMethod())) {
            // If using generalized fields, use the gathered fields
            field_query_data_gather[0] = FieldQueryData<double>{"displacement", FieldQueryState::None};
            field_query_data_gather[1] = FieldQueryData<double>{"velocity", FieldQueryState::None};
        } else {
            field_query_data_gather[0] = FieldQueryData<double>{"displacement_coefficients", FieldQueryState::NP1};
            field_query_data_gather[1] = FieldQueryData<double>{"velocity_coefficients", FieldQueryState::NP1};
        }
    } else {
        field_query_data_gather.resize(3);
        field_query_data_gather[0] = FieldQueryData<double>{m_internal_force_contribution_parameters.mesh_data->GetCoordinatesFieldName(), FieldQueryState::None};
        field_query_data_gather[1] = FieldQueryData<double>{"displacement_coefficients", FieldQueryState::NP1};
        field_query_data_gather[2] = FieldQueryData<double>{"velocity_coefficients", FieldQueryState::NP1};
    }

    // Get the number of nodes per element
    aperi::ElementTopology element_topology = m_internal_force_contribution_parameters.mesh_data->GetElementTopology(m_internal_force_contribution_parameters.part_name);

    // Create the element.
    m_element = CreateElement(element_topology, m_internal_force_contribution_parameters.approximation_space_parameters, m_internal_force_contribution_parameters.integration_scheme_parameters, field_query_data_gather, part_names, m_internal_force_contribution_parameters.mesh_data, m_internal_force_contribution_parameters.material);
}

}  // namespace aperi
