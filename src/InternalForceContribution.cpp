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

    // Create the element.
    m_element = CreateElement(m_num_nodes_per_element, m_use_strain_smoothing);

    // Create the element processor
    CreateElementProcessor();

    // Set the element processor for the element
    m_element->SetElementProcessor(m_element_processor);

    // Set the material for the element
    m_element->SetMaterial(m_material);
}

void InternalForceContribution::ComputeForce() {
    // Compute the internal force for all elements
    m_element->ComputeInternalForceAllElements();
}

}  // namespace aperi
