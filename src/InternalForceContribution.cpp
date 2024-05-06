#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>

#include "Element.h"

namespace aperi {

InternalForceContribution::InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name, bool use_strain_smoothing) : m_material(material), m_mesh_data(mesh_data), m_part_name(part_name), m_use_strain_smoothing(use_strain_smoothing) {
    // Get the number of nodes per element
    m_num_nodes_per_element = m_mesh_data->GetNumNodesPerElement(part_name);
    if (m_num_nodes_per_element != 4) {
        throw std::runtime_error("Unsupported element topology");
    }

    // Get the field query data and part names
    const std::vector<std::string> part_names = {m_part_name};
    std::vector<FieldQueryData> field_query_data_gather;
    bool use_precomputed_derivatives = false;
    if (m_use_strain_smoothing) {
        field_query_data_gather.resize(3);
        field_query_data_gather[0] = FieldQueryData{m_mesh_data->GetCoordinatesFieldName(), FieldQueryState::None};
        field_query_data_gather[1] = FieldQueryData{"displacement", FieldQueryState::NP1};
        field_query_data_gather[2] = FieldQueryData{"velocity", FieldQueryState::NP1};
        use_precomputed_derivatives = true;
    } else {
        field_query_data_gather.resize(3);
        field_query_data_gather[0] = FieldQueryData{m_mesh_data->GetCoordinatesFieldName(), FieldQueryState::None};
        field_query_data_gather[1] = FieldQueryData{"displacement", FieldQueryState::NP1};
        field_query_data_gather[2] = FieldQueryData{"velocity", FieldQueryState::NP1};
    }

    // Create the element.
    m_element = CreateElement(m_num_nodes_per_element, field_query_data_gather, part_names, m_mesh_data, m_use_strain_smoothing, use_precomputed_derivatives, m_material);
}
}  // namespace aperi
