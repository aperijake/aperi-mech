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
 * This class provides a base implementation for elements in a mesh.
 * TODO(jake): THIS NEEDS A LOT OF WORK. BULK_DATA NEEDED? VOIGT NOTATION? DATA STRUCTURES?
 */
class Element {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;

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
     */
    virtual void ComputeInternalForce(stk::mesh::Entity const *nodes) = 0;

    virtual std::vector<double> ComputeShapeFunctions(double xi, double eta, double zeta) = 0;

    virtual std::vector<std::array<double, 3>> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) = 0;

    // Compute Jacobian matrix
    std::array<std::array<double, 3>, 3> ComputeJacobianMatrix(std::vector<std::array<double, 3>> shape_function_derivatives, std::vector<std::array<double, 3>> node_coordinates) {
        // The Jacobian matrix is a 3 x 3 matrix representing the partial derivatives of the coordinates with respect to the parent coordinates
        /*
          \mathbf{x} = \sum_I N_I(\mathbf{\xi}) * \mathbf{x_I}
          J_ij = \frac{\partial x_i}{\partial \xi_j} = \sum_I \frac{\partial N_I}{\partial \xi_j} * x_{Ii}
        */
        std::array<std::array<double, 3>, 3> jacobian_matrix = {};  // Initialize jacobian_matrix to zero
        for (int I = 0, e = node_coordinates.size(); I < e; ++I) {
            for (int i = 0; i < 3; ++i) {
                for (int j = 0; j < 3; ++j) {
                    jacobian_matrix[i][j] += shape_function_derivatives[I][j] * node_coordinates[I][i];
                }
            }
        }
        return jacobian_matrix;
    }

    // Compute Jacobian matrix, from xi, eta, zeta
    std::array<std::array<double, 3>, 3> ComputeJacobianMatrix(double xi, double eta, double zeta, std::vector<std::array<double, 3>> node_coordinates) {
        std::vector<std::array<double, 3>> shape_function_derivatives = ComputeShapeFunctionDerivatives(xi, eta, zeta);
        std::array<std::array<double, 3>, 3> jacobian_matrix = ComputeJacobianMatrix(shape_function_derivatives, node_coordinates);
        return jacobian_matrix;
    }

    // Compute Jacobian determinant, TODO(jake): Move this to a utility class and optimize
    double ComputeJacobianDeterminant(std::array<std::array<double, 3>, 3> jacobian_matrix) {
        double jacobian_determinant = jacobian_matrix[0][0] * (jacobian_matrix[1][1] * jacobian_matrix[2][2] - jacobian_matrix[1][2] * jacobian_matrix[2][1]) - jacobian_matrix[0][1] * (jacobian_matrix[1][0] * jacobian_matrix[2][2] - jacobian_matrix[1][2] * jacobian_matrix[2][0]) + jacobian_matrix[0][2] * (jacobian_matrix[1][0] * jacobian_matrix[2][1] - jacobian_matrix[1][1] * jacobian_matrix[2][0]);
        return jacobian_determinant;
    }

    // Compute Jacobian determinant, from xi, eta, zeta
    double ComputeJacobianDeterminant(double xi, double eta, double zeta, std::vector<std::array<double, 3>> node_coordinates) {
        std::array<std::array<double, 3>, 3> jacobian_matrix = ComputeJacobianMatrix(xi, eta, zeta, node_coordinates);
        double jacobian_determinant = ComputeJacobianDeterminant(jacobian_matrix);
        return jacobian_determinant;
    }

    // Compute inverse of Jacobian matrix, TODO(jake): Move this to a utility class and optimize
    std::array<std::array<double, 3>, 3> ComputeInverseJacobianMatrix(std::array<std::array<double, 3>, 3> jacobian_matrix) {
        // The inverse Jacobian matrix is a 3 x 3 matrix representing the partial derivatives of the parent coordinates with respect to the coordinates
        /*
          J^{-1}_{ij} = \frac{\partial \xi_i}{\partial x_j}
        */
        double jacobian_determinant = ComputeJacobianDeterminant(jacobian_matrix);
        std::array<std::array<double, 3>, 3> inverse_jacobian_matrix;
        inverse_jacobian_matrix[0][0] = (jacobian_matrix[1][1] * jacobian_matrix[2][2] - jacobian_matrix[1][2] * jacobian_matrix[2][1]) / jacobian_determinant;
        inverse_jacobian_matrix[0][1] = (jacobian_matrix[0][2] * jacobian_matrix[2][1] - jacobian_matrix[0][1] * jacobian_matrix[2][2]) / jacobian_determinant;
        inverse_jacobian_matrix[0][2] = (jacobian_matrix[0][1] * jacobian_matrix[1][2] - jacobian_matrix[0][2] * jacobian_matrix[1][1]) / jacobian_determinant;
        inverse_jacobian_matrix[1][0] = (jacobian_matrix[1][2] * jacobian_matrix[2][0] - jacobian_matrix[1][0] * jacobian_matrix[2][2]) / jacobian_determinant;
        inverse_jacobian_matrix[1][1] = (jacobian_matrix[0][0] * jacobian_matrix[2][2] - jacobian_matrix[0][2] * jacobian_matrix[2][0]) / jacobian_determinant;
        inverse_jacobian_matrix[1][2] = (jacobian_matrix[0][2] * jacobian_matrix[1][0] - jacobian_matrix[0][0] * jacobian_matrix[1][2]) / jacobian_determinant;
        inverse_jacobian_matrix[2][0] = (jacobian_matrix[1][0] * jacobian_matrix[2][1] - jacobian_matrix[1][1] * jacobian_matrix[2][0]) / jacobian_determinant;
        inverse_jacobian_matrix[2][1] = (jacobian_matrix[0][1] * jacobian_matrix[2][0] - jacobian_matrix[0][0] * jacobian_matrix[2][1]) / jacobian_determinant;
        inverse_jacobian_matrix[2][2] = (jacobian_matrix[0][0] * jacobian_matrix[1][1] - jacobian_matrix[0][1] * jacobian_matrix[1][0]) / jacobian_determinant;
        return inverse_jacobian_matrix;
    }

    // Compute inverse of Jacobian matrix, TODO(jake): Move this to a utility class and optimize
    std::array<std::array<double, 3>, 3> ComputeInverseJacobianMatrix(double xi, double eta, double zeta, std::vector<std::array<double, 3>> node_coordinates) {
        // Compute the Jacobian matrix
        std::array<std::array<double, 3>, 3> jacobian_matrix = ComputeJacobianMatrix(xi, eta, zeta, node_coordinates);
        std::array<std::array<double, 3>, 3> inverse_jacobian_matrix = ComputeInverseJacobianMatrix(jacobian_matrix);
        return inverse_jacobian_matrix;
    }

    // Compute B matrix, NSD x m_num_nodes, using inverse Jacobian matrix and shape function derivatives
    std::vector<std::vector<double>> ComputeBMatrix(std::array<std::array<double, 3>, 3> inverse_jacobian_matrix, std::vector<std::array<double, 3>> shape_function_derivatives) {
        std::vector<std::vector<double>> b_matrix(3, std::vector<double>(m_num_nodes, 0.0));
        // B = inverse_jacobian_matrix * shape_function_derivatives
        for (size_t i = 0; i < 3; ++i) {
            for (size_t j = 0; j < m_num_nodes; ++j) {
                for (size_t k = 0; k < 3; ++k) {
                    b_matrix[i][j] += inverse_jacobian_matrix[i][k] * shape_function_derivatives[j][k];
                }
            }
        }
        return b_matrix;
    }

    // Compute B matrix, NSD x m_num_nodes, using xi, eta, zeta and node coordinates
    std::vector<std::vector<double>> ComputeBMatrix(double xi, double eta, double zeta, std::vector<std::array<double, 3>> node_coordinates) {
        // Compute the inverse Jacobian matrix
        std::array<std::array<double, 3>, 3> inverse_jacobian_matrix = ComputeInverseJacobianMatrix(xi, eta, zeta, node_coordinates);
        // Compute the shape function derivatives
        std::vector<std::array<double, 3>> shape_function_derivatives = ComputeShapeFunctionDerivatives(xi, eta, zeta);
        // Compute the B matrix
        return ComputeBMatrix(inverse_jacobian_matrix, shape_function_derivatives);
    }

    // Compute the displacement gradient, B * u, (NSD x m_num_nodes) x (m_num_nodes x NSD) = 3 x 3
    std::array<std::array<double, 3>, 3> ComputeDisplacementGradient(std::vector<std::vector<double>> b_matrix, std::vector<double> node_displacements) {
        std::array<std::array<double, 3>, 3> displacement_gradient;
        displacement_gradient.fill({0.0, 0.0, 0.0});
        for (size_t i = 0; i < 3; ++i) {
            for (size_t j = 0; j < 3; ++j) {
                for (size_t k = 0; k < m_num_nodes; ++k) {
                    displacement_gradient[i][j] += b_matrix[i][k] * node_displacements[k * 3 + j];
                }
            }
        }
        return displacement_gradient;
    }

    // Compute the displacement gradient, B * u, (NSD x m_num_nodes) x (m_num_nodes x NS) = 3 x 3, using xi, eta, zeta and node coordinates
    std::array<std::array<double, 3>, 3> ComputeDisplacementGradient(double xi, double eta, double zeta, std::vector<std::array<double, 3>> node_coordinates, std::vector<double> node_displacements) {
        // Compute the B matrix
        std::vector<std::vector<double>> b_matrix = ComputeBMatrix(xi, eta, zeta, node_coordinates);
        // Compute the displacement gradient
        std::array<std::array<double, 3>, 3> displacement_gradient = ComputeDisplacementGradient(b_matrix, node_displacements);
        return displacement_gradient;
    }

    // Compute the deformation gradient, I + B * u, 3 x 3
    std::array<std::array<double, 3>, 3> ComputeDeformationGradient(const std::array<std::array<double, 3>, 3> &displacement_gradient) {
        std::array<std::array<double, 3>, 3> deformation_gradient = displacement_gradient;
        for (size_t i = 0; i < 3; ++i) {
            deformation_gradient[i][i] += 1.0;
        }
        return deformation_gradient;
    }

    // Compute the deformation gradient, I + B * u, 3 x 3, using xi, eta, zeta and node coordinates
    std::array<std::array<double, 3>, 3> ComputeDeformationGradient(double xi, double eta, double zeta, std::vector<std::array<double, 3>> node_coordinates, std::vector<double> node_displacements) {
        // Compute the displacement gradient
        std::array<std::array<double, 3>, 3> d_gradient = ComputeDisplacementGradient(xi, eta, zeta, node_coordinates, node_displacements);
        // Add identity matrix to displacement gradient to get deformation gradient
        for (size_t i = 0; i < 3; ++i) {
            d_gradient[i][i] += 1.0;
        }
        return d_gradient;
    }

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
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;

   public:
    /**
     * @brief Constructs a Tetrahedron4 object.
     *
     * @param bulk_data The bulk data object for the mesh.
     */
    Tetrahedron4(stk::mesh::BulkData &bulk_data) : Element(bulk_data, 4) {
    }

    std::vector<double> ComputeShapeFunctions(double xi, double eta, double zeta) override {
        std::vector<double> shape_functions(4);
        shape_functions[0] = 1.0 - xi - eta - zeta;
        shape_functions[1] = xi;
        shape_functions[2] = eta;
        shape_functions[3] = zeta;
        return shape_functions;
    }

    // dN/dxi, dN/deta, dN/dzeta
    std::vector<std::array<double, 3>> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) override {
        std::vector<std::array<double, 3>> shape_function_derivatives(4);
        shape_function_derivatives[0] = {-1.0, -1.0, -1.0};
        shape_function_derivatives[1] = {1.0, 0.0, 0.0};
        shape_function_derivatives[2] = {0.0, 1.0, 0.0};
        shape_function_derivatives[3] = {0.0, 0.0, 1.0};
        return shape_function_derivatives;
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
            // stk::mesh::Entity node = nodes[i];
            //// Get the node's displacement
            // p_element_node_displacement[i * 3] = stk::mesh::field_data(*m_displacement_field, node);
            //// Get the node's velocity
            // p_element_node_velocity[i * 3] = stk::mesh::field_data(*m_velocity_field, node);
            //// Get the node's force
            // p_element_node_force[i * 3] = stk::mesh::field_data(*m_force_field, node);
        }
        // Compute the stress and internal force of the element. TODO(jake): Implement.
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