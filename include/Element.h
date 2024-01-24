#pragma once

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/FieldState.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_topology/topology.hpp>

#include "Material.h"

namespace aperi {

/**
 * @brief Represents an element in a mesh.
 *
 * This class provides a base implementation for elements in a mesh. It contains
 * fields for storing displacement, velocity, and force data, as well as a material
 * and the number of nodes in the element.
 */
class Element {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;

   public:
    /**
     * @brief Constructs an Element object.
     *
     * @param bulk_data The bulk data object for the mesh.
     * @param displacement_field The field storing displacement data.
     * @param velocity_field The field storing velocity data.
     * @param force_field The field storing force data.
     * @param material The material associated with the element.
     * @param num_nodes The number of nodes in the element.
     */
    Element(stk::mesh::BulkData &bulk_data, const VectorField *displacement_field, const VectorField *velocity_field, const VectorField *force_field, std::shared_ptr<Material> material, size_t num_nodes) : m_bulk_data(bulk_data), m_displacement_field(displacement_field), m_velocity_field(velocity_field), m_force_field(force_field), m_material(material), m_num_nodes(num_nodes) {}

    /**
     * @brief Computes the internal force of the element.
     *
     * This method is pure virtual and must be implemented by derived classes.
     * It computes the internal force of the element based on the given nodes.
     *
     * @param nodes An array of entity pointers representing the nodes of the element.
     */
    virtual void ComputeInternalForce(stk::mesh::Entity const *nodes) = 0;

   protected:
    stk::mesh::BulkData &m_bulk_data;         ///< The bulk data object for the mesh.
    const VectorField *m_displacement_field;  ///< The field storing displacement data.
    const VectorField *m_velocity_field;      ///< The field storing velocity data.
    const VectorField *m_force_field;         ///< The field storing force data.
    std::shared_ptr<Material> m_material;     ///< The material associated with the element.
    size_t m_num_nodes;                       ///< The number of nodes in the element.
};

/**
 * @brief Represents a 4-node tetrahedron element.
 *
 * This class inherits from the Element base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class Tetrahedron4 : public Element {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;

   public:
    /**
     * @brief Constructs a Tetrahedron4 object.
     *
     * @param bulk_data The bulk data object for the mesh.
     * @param displacement_field The field storing displacement data.
     * @param velocity_field The field storing velocity data.
     * @param force_field The field storing force data.
     * @param material The material associated with the element.
     */
    Tetrahedron4(stk::mesh::BulkData &bulk_data, const VectorField *displacement_field, const VectorField *velocity_field, const VectorField *force_field, std::shared_ptr<Material> material) : Element(bulk_data, displacement_field, velocity_field, force_field, material, 4) {
    }

    /**
     * @brief Computes the internal force of the element.
     *
     * This method overrides the base class method and computes the internal force of the element
     * based on the given nodes.
     *
     * @param nodes An array of entity pointers representing the nodes of the element.
     */
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
        // Compute the stress and internal force of the element. TODO(jake): Implement.
    }
};

/**
 * @brief Creates an element object.
 *
 * This function creates and returns a shared pointer to an Element object based on the given
 * parameters. The element is created based on the given topology and is initialized with the
 * given displacement, velocity, and force fields, material, and bulk data.
 *
 * @param bulk_data The bulk data object for the mesh.
 * @param displacement_field The field storing displacement data.
 * @param velocity_field The field storing velocity data.
 * @param force_field The field storing force data.
 * @param material The material associated with the element.
 * @param topology The topology of the element.
 * @return A shared pointer to the created Element object.
 */
inline std::shared_ptr<Element> CreateElement(stk::mesh::BulkData &bulk_data, const stk::mesh::Field<double, stk::mesh::Cartesian> *displacement_field, const stk::mesh::Field<double, stk::mesh::Cartesian> *velocity_field, const stk::mesh::Field<double, stk::mesh::Cartesian> *force_field, std::shared_ptr<Material> material, stk::topology topology) {
    if (topology == stk::topology::TET_4) {
        return std::make_shared<Tetrahedron4>(bulk_data, displacement_field, velocity_field, force_field, material);
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi