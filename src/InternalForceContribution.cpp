#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <utility>

#include "Element.h"
#include "Field.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "FunctionEvaluationProcessor.h"
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

    if (UsesGeneralizedFields()) {
        // Create a value from generalized field processor for all generalized fields
        std::array<aperi::FieldQueryData<double>, 3> src_field_query_data;
        src_field_query_data[0] = {"displacement_coefficients", FieldQueryState::NP1};
        src_field_query_data[1] = {"velocity_coefficients", FieldQueryState::NP1};
        src_field_query_data[2] = {"acceleration_coefficients", FieldQueryState::NP1};

        std::array<aperi::FieldQueryData<double>, 3> dest_field_query_data;
        dest_field_query_data[0] = {"displacement", FieldQueryState::None};
        dest_field_query_data[1] = {"velocity", FieldQueryState::None};
        dest_field_query_data[2] = {"acceleration", FieldQueryState::None};
        m_output_value_from_generalized_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<3>>(src_field_query_data, dest_field_query_data, m_internal_force_contribution_parameters.mesh_data, part_names);
    }
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

void InternalForceContribution::ComputeValuesFromGeneralizedFields() const {
    if (UsesGeneralizedFields()) {
        // Make sure all source fields are up to date on the device
        m_output_value_from_generalized_field_processor->SyncAllSourceFieldsDeviceToHost();
        m_output_value_from_generalized_field_processor->CommunicateAllSourceFieldData();
        m_output_value_from_generalized_field_processor->MarkAllSourceFieldsModifiedOnHost();
        m_output_value_from_generalized_field_processor->SyncAllSourceFieldsHostToDevice();

        // Compute the values of the destination fields from the source fields
        m_output_value_from_generalized_field_processor->ComputeValues();
        m_output_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        m_output_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();
    }
}

}  // namespace aperi
