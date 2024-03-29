#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>

#include "Element.h"

namespace aperi {

InternalForceContribution::InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name) : m_material(material), m_mesh_data(mesh_data), m_part_name(part_name) {
    // Get the number of nodes per element
    m_num_nodes_per_element = m_mesh_data->GetNumNodesPerElement(part_name);
    if (m_num_nodes_per_element != 4) {
        throw std::runtime_error("Unsupported element topology");
    }

    // Create the element
    m_element = CreateElement(m_num_nodes_per_element);

    // Create the element processor
    CreateElementProcessor();
}

void InternalForceContribution::ComputeElementInternalForce(const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &node_coordinates, const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &node_displacements, const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 4, 3> &node_velocities, Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &force) const {
    // Compute the internal force
    force = m_element->ComputeInternalForce(node_coordinates, node_displacements, node_velocities, m_material);
}

void InternalForceContribution::ComputeForce() {
    m_element_processor->for_each_element([&](const std::array<Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3>, 3> &field_data_to_gather, Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &force) {
        // Compute the internal force
        ComputeElementInternalForce(field_data_to_gather[0], field_data_to_gather[1], field_data_to_gather[2], force);
    });
}

}  // namespace aperi
