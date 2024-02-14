#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>

#include "Element.h"

namespace aperi {

InternalForceContribution::InternalForceContribution(std::shared_ptr<Material> material, stk::mesh::Part *part) : m_material(material), m_part(part) {
    // Get the bulk data and meta data
    m_bulk_data = &m_part->mesh_meta_data().mesh_bulk_data();
    m_meta_data = &m_part->mesh_meta_data();

    // Get the part selector
    m_selector = stk::mesh::Selector(*m_part);

    // Get the force field
    m_force_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, "force");

    // Get the displacement and velocity fields
    m_displacement_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, "displacement");
    m_velocity_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, "velocity");

    // Get the coordinates field
    m_coordinates_field = m_meta_data->get_field<double>(stk::topology::NODE_RANK, m_meta_data->coordinate_field_name());

    // Get the element topology
    stk::topology element_topology = m_part->topology();

    // Create the element
    m_element = CreateElement(*m_bulk_data, element_topology);
}

void InternalForceContribution::ComputeForce() {
    // Loop over the elements
    for (stk::mesh::Bucket *bucket : m_selector.get_buckets(stk::topology::ELEMENT_RANK)) {
        for (auto &&mesh_element : *bucket) {
            // Get the element's nodes
            stk::mesh::Entity const *element_nodes = m_bulk_data->begin_nodes(mesh_element);
            m_element->ComputeInternalForce(element_nodes, m_coordinates_field, m_displacement_field, m_velocity_field, m_force_field, m_material);
        }
    }
}

}  // namespace aperi