#pragma once

#include <memory>
#include <stk_mesh/base/Field.hpp>

#include "Material.h"

namespace stk {
namespace mesh {
class BulkData;
class Entity;
class MetaData;
}  // namespace mesh
class topology;
}  // namespace stk

namespace aperi {

/**
 * @brief Represents an element in a mesh.
 *
 * This class provides a base implementation for elements in a mesh.
 * TODO(jake): THIS NEEDS A LOT OF WORK. BULK_DATA NEEDED? VOIGT NOTATION? DATA STRUCTURES?
 */
class Element {
    typedef stk::mesh::Field<double> DoubleField;

   public:
    /**
     * @brief Constructs an Element object.
     *
     * @param bulk_data The bulk data object for the mesh.
     * @param num_nodes The number of nodes in the element.
     */
    Element(stk::mesh::BulkData &bulk_data, size_t num_nodes) : m_bulk_data(bulk_data), m_num_nodes(num_nodes) {}

    /**
     * @brief Computes the internal force of the element.
     *
     * This method is pure virtual and must be implemented by derived classes.
     * It computes the internal force of the element based on the given nodes.
     *
     * @param nodes An array of entity pointers representing the nodes of the element.
     * @param displacement_field The displacement field.
     * @param velocity_field The velocity field.
     * @param force_field The force field.
     * @param material The material of the element.
     */

    virtual std::vector<double> ComputeShapeFunctions(double xi, double eta, double zeta) const = 0;

    virtual std::vector<std::array<double, 3>> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const = 0;

    // Compute Jacobian matrix
    std::array<std::array<double, 3>, 3> ComputeJacobianMatrix(const std::vector<std::array<double, 3>> &shape_function_derivatives, const std::vector<std::array<double, 3>> &node_coordinates) const;

    // Compute Jacobian matrix, from xi, eta, zeta
    std::array<std::array<double, 3>, 3> ComputeJacobianMatrix(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const;

    // Compute Jacobian determinant, TODO(jake): Move this to a utility class and optimize
    double ComputeJacobianDeterminant(const std::array<std::array<double, 3>, 3> &jacobian_matrix) const;

    // Compute Jacobian determinant, from xi, eta, zeta
    double ComputeJacobianDeterminant(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const;

    // Compute inverse of Jacobian matrix, from jacobian matrix and determinant
    std::array<std::array<double, 3>, 3> ComputeInverseJacobianMatrix(const std::array<std::array<double, 3>, 3> &jacobian_matrix, double jacobian_determinant) const;

    // Compute inverse of Jacobian matrix, TODO(jake): Move this to a utility class and optimize
    std::array<std::array<double, 3>, 3> ComputeInverseJacobianMatrix(const std::array<std::array<double, 3>, 3> &jacobian_matrix) const;

    // Compute inverse of Jacobian matrix, TODO(jake): Move this to a utility class and optimize
    std::array<std::array<double, 3>, 3> ComputeInverseJacobianMatrix(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const;

    // Compute B matrix, m_num_nodes x NSD, using inverse Jacobian matrix and shape function derivatives
    std::vector<std::array<double, 3>> ComputeBMatrix(const std::array<std::array<double, 3>, 3> &inverse_jacobian_matrix, const std::vector<std::array<double, 3>> &shape_function_derivatives) const;

    // Compute B matrix, NSD x m_num_nodes, using xi, eta, zeta and node coordinates
    std::vector<std::array<double, 3>> ComputeBMatrix(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const;

    // Compute the displacement gradient, B * u, (NSD x m_num_nodes) x (m_num_nodes x NSD) = 3 x 3
    std::array<std::array<double, 3>, 3> ComputeDisplacementGradient(const std::vector<std::array<double, 3>> &b_matrix, const std::vector<double> &node_displacements) const;

    // Compute the displacement gradient, B^T * u, (NSD x m_num_nodes) x (m_num_nodes x NS) = 3 x 3, using xi, eta, zeta and node coordinates
    std::array<std::array<double, 3>, 3> ComputeDisplacementGradient(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates, const std::vector<double> &node_displacements) const;

    // Compute the deformation gradient, I + B * u, 3 x 3
    std::array<std::array<double, 3>, 3> ComputeDeformationGradient(const std::array<std::array<double, 3>, 3> &displacement_gradient) const;

    // Compute the deformation gradient, I + B * u, 3 x 3, using xi, eta, zeta and node coordinates
    std::array<std::array<double, 3>, 3> ComputeDeformationGradient(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates, const std::vector<double> &node_displacements) const;

    // Compute the Green Lagrange strain tensor, 3 x 3
    std::array<std::array<double, 3>, 3> ComputeGreenLagrangeStrainTensor(const std::array<std::array<double, 3>, 3> &displacement_gradient) const;

    // Compute the Green Lagrange strain tensor, 3 x 3, using xi, eta, zeta and node coordinates
    std::array<std::array<double, 3>, 3> ComputeGreenLagrangeStrainTensor(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates, const std::vector<double> &node_displacements) const;

    // Compute (B_I F)^T, voigt notation, 3 x 6
    std::array<std::array<double, 6>, 3> ComputeBFTranspose(const std::array<double, 3> &bI_vector, const std::array<std::array<double, 3>, 3> &displacement_gradient) const;

    /**
     * @brief Computes the internal force of the element.
     *
     * This method overrides the base class method and computes the internal force of the element
     * based on the given nodes.
     *
     * @param nodes An array of entity pointers representing the nodes of the element.
     */
    void ComputeInternalForce(stk::mesh::Entity const *nodes, const DoubleField *coordinate_field, const DoubleField *displacement_field, const DoubleField *velocity_field, const DoubleField *force_field, std::shared_ptr<Material> material) const;

   protected:
    stk::mesh::BulkData &m_bulk_data;  ///< The bulk data object for the mesh.
    size_t m_num_nodes;                ///< The number of nodes in the element.
};

/**
 * @brief Represents a 4-node tetrahedron element.
 *
 * This class inherits from the Element base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class Tetrahedron4 : public Element {
    typedef stk::mesh::Field<double> DoubleField;

   public:
    /**
     * @brief Constructs a Tetrahedron4 object.
     *
     * @param bulk_data The bulk data object for the mesh.
     */
    Tetrahedron4(stk::mesh::BulkData &bulk_data) : Element(bulk_data, 4) {
    }

    std::vector<double> ComputeShapeFunctions(double xi, double eta, double zeta) const override {
        std::vector<double> shape_functions(4);
        shape_functions[0] = 1.0 - xi - eta - zeta;
        shape_functions[1] = xi;
        shape_functions[2] = eta;
        shape_functions[3] = zeta;
        return shape_functions;
    }

    // dN/dxi, dN/deta, dN/dzeta
    std::vector<std::array<double, 3>> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const override {
        std::vector<std::array<double, 3>> shape_function_derivatives(4);
        shape_function_derivatives[0] = {-1.0, -1.0, -1.0};
        shape_function_derivatives[1] = {1.0, 0.0, 0.0};
        shape_function_derivatives[2] = {0.0, 1.0, 0.0};
        shape_function_derivatives[3] = {0.0, 0.0, 1.0};
        return shape_function_derivatives;
    }
};

/**
 * @brief Creates an element object.
 *
 * This function creates and returns a shared pointer to an Element object based on the given
 * parameters. The element is created based on the given topology and is initialized with the
 * given bulk data.
 *
 * @param bulk_data The bulk data object for the mesh.
 * @param topology The topology of the element.
 * @return A shared pointer to the created Element object.
 */
inline std::shared_ptr<Element> CreateElement(stk::mesh::BulkData &bulk_data, stk::topology topology) {
    if (topology == stk::topology::TET_4) {
        return std::make_shared<Tetrahedron4>(bulk_data);
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
