#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>

namespace aperi {

// Element base class. TODO(jake): Move to a separate file
class Element {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;

   public:
    Element(stk::mesh::BulkData &bulk_data, const VectorField *displacement_field, const VectorField *velocity_field, const VectorField *force_field, std::shared_ptr<Material> material, size_t num_nodes) : m_bulk_data(bulk_data), m_displacement_field(displacement_field), m_velocity_field(velocity_field), m_force_field(force_field), m_material(material), m_num_nodes(num_nodes) {}

    virtual void ComputeInternalForce(stk::mesh::Entity const *nodes) = 0;

   protected:
    stk::mesh::BulkData &m_bulk_data;
    const VectorField *m_displacement_field;
    const VectorField *m_velocity_field;
    const VectorField *m_force_field;
    std::shared_ptr<Material> m_material;
    size_t m_num_nodes;
};

// Create a derived element, aperi::Tetrahedron4
class Tetrahedron4 : public Element {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;

   public:
    Tetrahedron4(stk::mesh::BulkData &bulk_data, const VectorField *displacement_field, const VectorField *velocity_field, const VectorField *force_field, std::shared_ptr<Material> material) : Element(bulk_data, displacement_field, velocity_field, force_field, material, 4) {
    }

    void ComputeInternalForce(stk::mesh::Entity const *nodes) override {
        // Gather the node's displacement, velocity, and force
        double *p_element_node_displacement[12];  // 4 nodes * 3 components
        double *p_element_node_velocity[12];
        double *p_element_node_force[12];

        for (int i = 0; i < 4; ++i) {
            // Get the node
            stk::mesh::Entity node = nodes[i];
            // Get the node's displacement
            p_element_node_displacement[i * 3] = stk::mesh::field_data(*m_displacement_field, node);
            // Get the node's velocity
            p_element_node_velocity[i * 3] = stk::mesh::field_data(*m_velocity_field, node);
            // Get the node's force
            p_element_node_force[i * 3] = stk::mesh::field_data(*m_force_field, node);
        }
        // Compute the stress and internal force
    }
};

void InternalForceContribution::ComputeForce() {
    // Get the part selector
    stk::mesh::Selector selector = stk::mesh::Selector(*m_part);

    // Get the bulk data and meta data
    stk::mesh::BulkData &bulk_data = m_part->mesh_meta_data().mesh_bulk_data();
    stk::mesh::MetaData &meta_data = m_part->mesh_meta_data();

    // Get the force field
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
    VectorField *force_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "force");

    // Get the displacement and velocity fields
    VectorField *displacement_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "displacement");
    VectorField *velocity_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "velocity");

    // Create the element. TODO(jake): Allow for different element types. Also, do once and store in a member variable
    Tetrahedron4 element(bulk_data, displacement_field, velocity_field, force_field, m_material);

    // Loop over the elements
    for (stk::mesh::Bucket *bucket : selector.get_buckets(stk::topology::ELEMENT_RANK)) {
        for (auto &&mesh_element : *bucket) {
            // Get the element's nodes
            stk::mesh::Entity const *element_nodes = bulk_data.begin_nodes(mesh_element);
            element.ComputeInternalForce(element_nodes);
        }
    }
}

}  // namespace aperi