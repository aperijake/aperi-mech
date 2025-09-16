#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <utility>

#include "Element.h"
#include "Field.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "Materials/Base.h"
#include "MeshData.h"
#include "Selector.h"
namespace aperi {

// Functor to set bulk modulus field for an element
struct SetBulkModulusField {
    aperi::Field<aperi::Real> bulk_modulus_field;
    double bulk_modulus;

    SetBulkModulusField(aperi::Field<aperi::Real> field, double value)
        : bulk_modulus_field(field), bulk_modulus(value) {}

    // Must be host/device for CUDA compatibility if needed
    KOKKOS_FUNCTION
    void operator()(const aperi::Index &index) const {
        bulk_modulus_field(index, 0) = bulk_modulus;
    }
};

void InternalForceContribution::Preprocess() {
    // Get the field query data and part names
    const std::vector<std::string> part_names = {m_internal_force_contribution_parameters.part_name};
    std::string displacement_field_name = "displacement_coefficients";
    if (m_internal_force_contribution_parameters.integration_scheme_parameters->GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {
        if (UsesGeneralizedFields() && (!UsesOnePassMethod())) {
            // If using generalized fields, use the gathered fields
            displacement_field_name = "displacement";
        }
    }

    // Get the number of nodes per element
    aperi::ElementTopology element_topology = m_internal_force_contribution_parameters.mesh_data->GetElementTopology(m_internal_force_contribution_parameters.part_name);

    // Create the element.
    m_element = CreateElement(element_topology, m_internal_force_contribution_parameters.approximation_space_parameters, m_internal_force_contribution_parameters.integration_scheme_parameters, displacement_field_name, m_internal_force_contribution_parameters.lagrangian_formulation_type, m_internal_force_contribution_parameters.mesh_labeler_parameters, part_names, m_internal_force_contribution_parameters.mesh_data, m_internal_force_contribution_parameters.material);
}

void InternalForceContribution::FinishPreprocessing() {
    m_element->FinishPreprocessing();

    // Populate the the bulk_modulus element properties
    aperi::Field bulk_modulus_field = aperi::Field(m_internal_force_contribution_parameters.mesh_data, aperi::FieldQueryData<double>{"bulk_modulus", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT});

    const double bulk_modulus = m_internal_force_contribution_parameters.material->GetMaterialProperties()->linear_elastic_properties.bulk_modulus;

    aperi::Selector selector({m_internal_force_contribution_parameters.part_name}, m_internal_force_contribution_parameters.mesh_data.get());

    SetBulkModulusField set_bulk_modulus_functor(bulk_modulus_field, bulk_modulus);
    aperi::ForEachElement(set_bulk_modulus_functor,
                          *m_internal_force_contribution_parameters.mesh_data, selector);
    // Mark the bulk_modulus field as modified on device
    bulk_modulus_field.MarkModifiedOnDevice();
}

}  // namespace aperi
