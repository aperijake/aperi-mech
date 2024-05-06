#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>

#include "Element.h"

namespace aperi {

InternalForceContributionNoPrecompute::InternalForceContributionNoPrecompute(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name, bool use_strain_smoothing) : InternalForceContribution(material, mesh_data, part_name, use_strain_smoothing) {
    std::vector<FieldQueryData> field_query_data_gather(3);
    field_query_data_gather[0] = FieldQueryData{m_mesh_data->GetCoordinatesFieldName(), FieldQueryState::None};
    field_query_data_gather[1] = FieldQueryData{"displacement", FieldQueryState::NP1};
    field_query_data_gather[2] = FieldQueryData{"velocity", FieldQueryState::NP1};
    // const FieldQueryData field_query_data_scatter = {"force", FieldQueryState::NP1};

    const std::vector<std::string> part_names = {m_part_name};

    // m_element_processor = std::make_shared<ElementGatherScatterProcessor<3, false>>(field_query_data_gather_vec, field_query_data_scatter, m_mesh_data, part_names);

    // Create the element.
    bool use_precomputed_derivatives = false;
    m_element = CreateElement(m_num_nodes_per_element, field_query_data_gather, part_names, m_mesh_data, m_use_strain_smoothing, use_precomputed_derivatives, m_material);
}

InternalForceContributionPrecompute::InternalForceContributionPrecompute(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name, bool use_strain_smoothing) : InternalForceContribution(material, mesh_data, part_name, use_strain_smoothing) {
    std::vector<FieldQueryData> field_query_data_gather(3);
    field_query_data_gather[0] = FieldQueryData{m_mesh_data->GetCoordinatesFieldName(), FieldQueryState::None};
    field_query_data_gather[1] = FieldQueryData{"displacement", FieldQueryState::NP1};
    field_query_data_gather[2] = FieldQueryData{"velocity", FieldQueryState::NP1};
    const FieldQueryData field_query_data_scatter = {"force", FieldQueryState::NP1};

    const std::vector<std::string> part_names = {m_part_name};

    // m_element_processor = std::make_shared<ElementGatherScatterProcessor<3, true>>(field_query_data_gather_vec, field_query_data_scatter, m_mesh_data, part_names);

    // Create the element.
    bool use_precomputed_derivatives = true;
    m_element = CreateElement(m_num_nodes_per_element, field_query_data_gather, part_names, m_mesh_data, m_use_strain_smoothing, use_precomputed_derivatives, m_material);
}



}  // namespace aperi
