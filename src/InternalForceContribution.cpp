#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>

#include "Element.h"

namespace aperi {

InternalForceContribution::InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name) : m_material(material), m_mesh_data(mesh_data) {
    // Get the bulk data and meta data
    m_bulk_data = m_mesh_data->GetBulkData();
    m_meta_data = &m_bulk_data->mesh_meta_data();

    // Get the part
    m_part = m_meta_data->get_part(part_name);

    // Get the part selector
    m_selector = stk::mesh::Selector(*m_part);

    // Get the force field
    m_force_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, "force");

    // Get the displacement and velocity fields
    m_displacement_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, "displacement");
    m_velocity_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, "velocity");

    // Get the coordinates field
    m_coordinates_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, m_meta_data->coordinate_field_name());

    // Use the element topology to set the number of nodes per element
    size_t num_nodes_per_element = 0;
    if (m_part->topology() == stk::topology::TET_4) {
        num_nodes_per_element = 4;
    } else {
        throw std::runtime_error("Unsupported element topology");
    }

    // Create the element
    m_element = CreateElement(num_nodes_per_element);
}

void InternalForceContribution::ComputeForce() {
    // Get the number of nodes per element and set up the matrices
    size_t num_nodes_per_element = m_element->GetNumNodes();
    // 4 is max number of nodes per element. We only have tet4 elements for now. Will need to change this if we add more elements.
    Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 4, 3> node_coordinates;
    Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 4, 3> node_displacements;
    Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 4, 3> node_velocities;
    Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 4, 3> force;
    node_coordinates.resize(num_nodes_per_element, 3);
    node_displacements.resize(num_nodes_per_element, 3);
    node_velocities.resize(num_nodes_per_element, 3);
    force.resize(num_nodes_per_element, 3);

    // Loop over the elements
    for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
        for (auto &&mesh_element : *bucket) {
            // Get the element's nodes
            stk::mesh::Entity const *element_nodes = m_bulk_data->begin_nodes(mesh_element);

            // Gather the coordinates, displacements, and velocities of the nodes
            for (size_t i = 0; i < num_nodes_per_element; ++i) {
                double *element_node_coordinates = stk::mesh::field_data(*m_coordinates_field, element_nodes[i]);
                double *element_node_displacements = stk::mesh::field_data(*m_displacement_field, element_nodes[i]);
                double *element_node_velocities = stk::mesh::field_data(*m_velocity_field, element_nodes[i]);
                for (size_t j = 0; j < 3; ++j) {
                    node_coordinates(i, j) = element_node_coordinates[j];
                    node_displacements(i, j) = element_node_displacements[j];
                    node_velocities(i, j) = element_node_velocities[j];
                }
            }

            // Compute the internal force
            force = m_element->ComputeInternalForce(node_coordinates, node_displacements, node_velocities, m_material);

            // Scatter the force to the nodes
            for (size_t i = 0; i < num_nodes_per_element; ++i) {
                double *element_node_force = stk::mesh::field_data(*m_force_field, element_nodes[i]);
                for (size_t j = 0; j < 3; ++j) {
                    element_node_force[j] += force(i, j);
                }
            }
        }
    }
}

}  // namespace aperi
