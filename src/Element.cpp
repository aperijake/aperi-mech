#include "Element.h"

#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_topology/topology.hpp>

#include "Material.h"

namespace aperi {

// Compute Jacobian matrix
std::array<std::array<double, 3>, 3> Element::ComputeJacobianMatrix(const std::vector<std::array<double, 3>> &shape_function_derivatives, const std::vector<std::array<double, 3>> &node_coordinates) const {
    // The Jacobian matrix is a 3 x 3 matrix representing the partial derivatives of the coordinates with respect to the parent coordinates
    /*
      \mathbf{x} = \sum_I N_I(\mathbf{\xi}) * \mathbf{x_I}
      J_ij = \frac{\partial x_i}{\partial \xi_j} = \sum_I \frac{\partial N_I}{\partial \xi_j} * x_{Ii}
    */
    std::array<std::array<double, 3>, 3> jacobian_matrix = {};  // Initialize jacobian_matrix to zero
    for (int k = 0, e = node_coordinates.size(); k < e; ++k) {
        for (int i = 0; i < 3; ++i) {
            for (int j = 0; j < 3; ++j) {
                jacobian_matrix[i][j] += shape_function_derivatives[k][j] * node_coordinates[k][i];
            }
        }
    }
    return jacobian_matrix;
}

// Compute Jacobian matrix, from xi, eta, zeta
std::array<std::array<double, 3>, 3> Element::ComputeJacobianMatrix(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const {
    std::vector<std::array<double, 3>> shape_function_derivatives = ComputeShapeFunctionDerivatives(xi, eta, zeta);
    std::array<std::array<double, 3>, 3> jacobian_matrix = ComputeJacobianMatrix(shape_function_derivatives, node_coordinates);
    return jacobian_matrix;
}

// Compute Jacobian determinant, TODO(jake): Move this to a utility class and optimize
double Element::ComputeJacobianDeterminant(const std::array<std::array<double, 3>, 3> &jacobian_matrix) const {
    double jacobian_determinant = jacobian_matrix[0][0] * (jacobian_matrix[1][1] * jacobian_matrix[2][2] - jacobian_matrix[1][2] * jacobian_matrix[2][1]) - jacobian_matrix[0][1] * (jacobian_matrix[1][0] * jacobian_matrix[2][2] - jacobian_matrix[1][2] * jacobian_matrix[2][0]) + jacobian_matrix[0][2] * (jacobian_matrix[1][0] * jacobian_matrix[2][1] - jacobian_matrix[1][1] * jacobian_matrix[2][0]);
    return jacobian_determinant;
}

// Compute Jacobian determinant, from xi, eta, zeta
double Element::ComputeJacobianDeterminant(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const {
    std::array<std::array<double, 3>, 3> jacobian_matrix = ComputeJacobianMatrix(xi, eta, zeta, node_coordinates);
    double jacobian_determinant = ComputeJacobianDeterminant(jacobian_matrix);
    return jacobian_determinant;
}

// Compute inverse of Jacobian matrix, from jacobian matrix and determinant
std::array<std::array<double, 3>, 3> Element::ComputeInverseJacobianMatrix(const std::array<std::array<double, 3>, 3> &jacobian_matrix, double jacobian_determinant) const {
    // The inverse Jacobian matrix is a 3 x 3 matrix representing the partial derivatives of the parent coordinates with respect to the coordinates
    /*
      J^{-1}_{ij} = \frac{\partial \xi_i}{\partial x_j}
    */
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
std::array<std::array<double, 3>, 3> Element::ComputeInverseJacobianMatrix(const std::array<std::array<double, 3>, 3> &jacobian_matrix) const {
    double jacobian_determinant = ComputeJacobianDeterminant(jacobian_matrix);
    return ComputeInverseJacobianMatrix(jacobian_matrix, jacobian_determinant);
}

// Compute inverse of Jacobian matrix, TODO(jake): Move this to a utility class and optimize
std::array<std::array<double, 3>, 3> Element::ComputeInverseJacobianMatrix(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const {
    // Compute the Jacobian matrix
    std::array<std::array<double, 3>, 3> jacobian_matrix = ComputeJacobianMatrix(xi, eta, zeta, node_coordinates);
    std::array<std::array<double, 3>, 3> inverse_jacobian_matrix = ComputeInverseJacobianMatrix(jacobian_matrix);
    return inverse_jacobian_matrix;
}

// Compute B matrix, m_num_nodes x NSD, using inverse Jacobian matrix and shape function derivatives
std::vector<std::array<double, 3>> Element::ComputeBMatrix(const std::array<std::array<double, 3>, 3> &inverse_jacobian_matrix, const std::vector<std::array<double, 3>> &shape_function_derivatives) const {
    std::vector<std::array<double, 3>> b_matrix(m_num_nodes);
    // B = shape_function_derivatives * inverse_jacobian_matrix
    for (size_t i = 0; i < m_num_nodes; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            for (size_t k = 0; k < 3; ++k) {
                b_matrix[i][j] += shape_function_derivatives[i][k] * inverse_jacobian_matrix[k][j];
            }
        }
    }
    return b_matrix;
}

// Compute B matrix, NSD x m_num_nodes, using xi, eta, zeta and node coordinates
std::vector<std::array<double, 3>> Element::ComputeBMatrix(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates) const {
    // Compute the inverse Jacobian matrix
    std::array<std::array<double, 3>, 3> inverse_jacobian_matrix = ComputeInverseJacobianMatrix(xi, eta, zeta, node_coordinates);
    // Compute the shape function derivatives
    std::vector<std::array<double, 3>> shape_function_derivatives = ComputeShapeFunctionDerivatives(xi, eta, zeta);
    // Compute the B matrix
    return ComputeBMatrix(inverse_jacobian_matrix, shape_function_derivatives);
}

// Compute the displacement gradient, B * u, (NSD x m_num_nodes) x (m_num_nodes x NSD) = 3 x 3
std::array<std::array<double, 3>, 3> Element::ComputeDisplacementGradient(const std::vector<std::array<double, 3>> &b_matrix, const std::vector<double> &node_displacements) const {
    std::array<std::array<double, 3>, 3> displacement_gradient;
    displacement_gradient.fill({0.0, 0.0, 0.0});
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            for (size_t k = 0; k < m_num_nodes; ++k) {
                displacement_gradient[i][j] += b_matrix[k][j] * node_displacements[k * 3 + i];
            }
        }
    }
    return displacement_gradient;
}

// Compute the displacement gradient, B^T * u, (NSD x m_num_nodes) x (m_num_nodes x NS) = 3 x 3, using xi, eta, zeta and node coordinates
std::array<std::array<double, 3>, 3> Element::ComputeDisplacementGradient(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates, const std::vector<double> &node_displacements) const {
    // Compute the B matrix
    std::vector<std::array<double, 3>> b_matrix = ComputeBMatrix(xi, eta, zeta, node_coordinates);
    // Compute the displacement gradient
    std::array<std::array<double, 3>, 3> displacement_gradient = ComputeDisplacementGradient(b_matrix, node_displacements);
    return displacement_gradient;
}

// Compute the deformation gradient, I + B * u, 3 x 3
std::array<std::array<double, 3>, 3> Element::ComputeDeformationGradient(const std::array<std::array<double, 3>, 3> &displacement_gradient) const {
    std::array<std::array<double, 3>, 3> deformation_gradient = displacement_gradient;
    for (size_t i = 0; i < 3; ++i) {
        deformation_gradient[i][i] += 1.0;
    }
    return deformation_gradient;
}

// Compute the deformation gradient, I + B * u, 3 x 3, using xi, eta, zeta and node coordinates
std::array<std::array<double, 3>, 3> Element::ComputeDeformationGradient(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates, const std::vector<double> &node_displacements) const {
    // Compute the displacement gradient
    std::array<std::array<double, 3>, 3> d_gradient = ComputeDisplacementGradient(xi, eta, zeta, node_coordinates, node_displacements);
    // Add identity matrix to displacement gradient to get deformation gradient
    for (size_t i = 0; i < 3; ++i) {
        d_gradient[i][i] += 1.0;
    }
    return d_gradient;
}

// Compute the Green Lagrange strain tensor, 3 x 3
// E = 0.5 * (H + H^T + H^T * H)
std::array<std::array<double, 3>, 3> Element::ComputeGreenLagrangeStrainTensor(const std::array<std::array<double, 3>, 3> &displacement_gradient) const {
    std::array<std::array<double, 3>, 3> green_lagrange_strain_tensor;
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            green_lagrange_strain_tensor[i][j] = 0.5 * (displacement_gradient[i][j] + displacement_gradient[j][i]);
        }
    }
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            for (size_t k = 0; k < 3; ++k) {
                green_lagrange_strain_tensor[i][j] += 0.5 * displacement_gradient[k][i] * displacement_gradient[k][j];
            }
        }
    }
    return green_lagrange_strain_tensor;
}

// Compute the Green Lagrange strain tensor, 3 x 3, using xi, eta, zeta and node coordinates
std::array<std::array<double, 3>, 3> Element::ComputeGreenLagrangeStrainTensor(double xi, double eta, double zeta, const std::vector<std::array<double, 3>> &node_coordinates, const std::vector<double> &node_displacements) const {
    // Compute the displacement gradient
    std::array<std::array<double, 3>, 3> displacement_gradient = ComputeDisplacementGradient(xi, eta, zeta, node_coordinates, node_displacements);
    // Compute the Green Lagrange strain tensor
    std::array<std::array<double, 3>, 3> green_lagrange_strain_tensor = ComputeGreenLagrangeStrainTensor(displacement_gradient);
    return green_lagrange_strain_tensor;
}

// Compute (B_I F)^T, voigt notation, 3 x 6
std::array<std::array<double, 6>, 3> Element::ComputeBFTranspose(const std::array<double, 3> &bI_vector, const std::array<std::array<double, 3>, 3> &displacement_gradient) const {
    std::array<std::array<double, 6>, 3> bf_transpose;
    bf_transpose[0][0] = bI_vector[0] * (displacement_gradient[0][0] + 1.0);
    bf_transpose[1][1] = bI_vector[1] * (displacement_gradient[1][1] + 1.0);
    bf_transpose[2][2] = bI_vector[2] * (displacement_gradient[2][2] + 1.0);

    bf_transpose[0][1] = bI_vector[1] * displacement_gradient[0][1];
    bf_transpose[0][2] = bI_vector[2] * displacement_gradient[0][2];
    bf_transpose[1][0] = bI_vector[0] * displacement_gradient[1][0];
    bf_transpose[1][2] = bI_vector[2] * displacement_gradient[1][2];
    bf_transpose[2][0] = bI_vector[0] * displacement_gradient[2][0];
    bf_transpose[2][1] = bI_vector[1] * displacement_gradient[2][1];

    bf_transpose[0][3] = bI_vector[1] * displacement_gradient[0][2] + bI_vector[2] * displacement_gradient[0][1];
    bf_transpose[0][4] = bI_vector[0] * displacement_gradient[0][2] + bI_vector[2] * (displacement_gradient[0][0] + 1.0);
    bf_transpose[0][5] = bI_vector[0] * displacement_gradient[0][1] + bI_vector[1] * (displacement_gradient[0][0] + 1.0);

    bf_transpose[1][3] = bI_vector[1] * displacement_gradient[1][2] + bI_vector[2] * (displacement_gradient[1][1] + 1.0);
    bf_transpose[1][4] = bI_vector[0] * displacement_gradient[1][2] + bI_vector[2] * displacement_gradient[1][0];
    bf_transpose[1][5] = bI_vector[0] * (displacement_gradient[1][1] + 1.0) + bI_vector[1] * displacement_gradient[1][0];

    bf_transpose[2][3] = bI_vector[1] * (displacement_gradient[2][2] + 1.0) + bI_vector[2] * displacement_gradient[2][1];
    bf_transpose[2][4] = bI_vector[0] * (displacement_gradient[2][2] + 1.0) + bI_vector[2] * displacement_gradient[2][0];
    bf_transpose[2][5] = bI_vector[0] * displacement_gradient[2][1] + bI_vector[1] * displacement_gradient[2][0];

    return bf_transpose;
}

void Element::ComputeInternalForce(stk::mesh::Entity const *nodes, const DoubleField *coordinate_field, const DoubleField *displacement_field, const DoubleField *velocity_field, const DoubleField *force_field, std::shared_ptr<Material> material) const {
    // Gather the node's displacement, force, and coordinates
    std::vector<double> node_displacement(3 * m_num_nodes);  // 4 nodes * 3 components
    std::vector<std::array<double, 3>> node_coordinates(m_num_nodes);

    for (size_t i = 0; i < m_num_nodes; ++i) {
        // Get the node
        stk::mesh::Entity node = nodes[i];
        // std::cout << "node: " << node << std::endl;
        //  Get the node's coordinates
        double *coordinates = stk::mesh::field_data(*coordinate_field, node);
        node_coordinates[i] = {coordinates[0], coordinates[1], coordinates[2]};
        // Get the node's displacement
        double *displacement = stk::mesh::field_data(*displacement_field, node);
        node_displacement[i * 3] = displacement[0];
        node_displacement[i * 3 + 1] = displacement[1];
        node_displacement[i * 3 + 2] = displacement[2];
    }
    // Compute the shape function derivatives
    const std::vector<std::array<double, 3>> shape_function_derivatives = ComputeShapeFunctionDerivatives(0.0, 0.0, 0.0);

    // Compute Jacobian matrix
    const std::array<std::array<double, 3>, 3> jacobian = ComputeJacobianMatrix(shape_function_derivatives, node_coordinates);

    // Compute Jacobian determinant
    const double jacobian_determinant = ComputeJacobianDeterminant(jacobian);

    // Compute inverse of Jacobian matrix
    const std::array<std::array<double, 3>, 3> inverse_jacobian = ComputeInverseJacobianMatrix(jacobian, jacobian_determinant);

    // Compute B matrix
    const std::vector<std::array<double, 3>> b_matrix = ComputeBMatrix(inverse_jacobian, shape_function_derivatives);

    // Compute displacement gradient
    const std::array<std::array<double, 3>, 3> displacement_gradient = ComputeDisplacementGradient(b_matrix, node_displacement);

    // Compute the Green Lagrange strain tensor
    const std::array<std::array<double, 3>, 3> green_lagrange_strain_tensor = ComputeGreenLagrangeStrainTensor(displacement_gradient);

    // Compute the stress and internal force of the element.
    const std::array<double, 6> stress = material->GetStress(green_lagrange_strain_tensor);

    /*
    std::cout << "node_coordinates: " << node_coordinates[0][0] << " " << node_coordinates[0][1] << " " << node_coordinates[0][2] << std::endl;
    std::cout << "                  " << node_coordinates[1][0] << " " << node_coordinates[1][1] << " " << node_coordinates[1][2] << std::endl;
    std::cout << "                  " << node_coordinates[2][0] << " " << node_coordinates[2][1] << " " << node_coordinates[2][2] << std::endl;
    std::cout << "                  " << node_coordinates[3][0] << " " << node_coordinates[3][1] << " " << node_coordinates[3][2] << std::endl;

    std::cout << "node_displacement: " << node_displacement[0] << " " << node_displacement[1] << " " << node_displacement[2] << std::endl;
    std::cout << "                   " << node_displacement[3] << " " << node_displacement[4] << " " << node_displacement[5] << std::endl;
    std::cout << "                   " << node_displacement[6] << " " << node_displacement[7] << " " << node_displacement[8] << std::endl;
    std::cout << "                   " << node_displacement[9] << " " << node_displacement[10] << " " << node_displacement[11] << std::endl;

    std::cout << "shape_function_derivatives: " << shape_function_derivatives[0][0] << " " << shape_function_derivatives[0][1] << " " << shape_function_derivatives[0][2] << std::endl;
    std::cout << "                           " << shape_function_derivatives[1][0] << " " << shape_function_derivatives[1][1] << " " << shape_function_derivatives[1][2] << std::endl;
    std::cout << "                           " << shape_function_derivatives[2][0] << " " << shape_function_derivatives[2][1] << " " << shape_function_derivatives[2][2] << std::endl;
    std::cout << "                           " << shape_function_derivatives[3][0] << " " << shape_function_derivatives[3][1] << " " << shape_function_derivatives[3][2] << std::endl;

    std::cout << "jacobian: " << jacobian[0][0] << " " << jacobian[0][1] << " " << jacobian[0][2] << std::endl;
    std::cout << "          " << jacobian[1][0] << " " << jacobian[1][1] << " " << jacobian[1][2] << std::endl;
    std::cout << "          " << jacobian[2][0] << " " << jacobian[2][1] << " " << jacobian[2][2] << std::endl;

    std::cout << "jacobian_determinant: " << jacobian_determinant << std::endl;

    std::cout << "inverse_jacobian: " << inverse_jacobian[0][0] << " " << inverse_jacobian[0][1] << " " << inverse_jacobian[0][2] << std::endl;
    std::cout << "                  " << inverse_jacobian[1][0] << " " << inverse_jacobian[1][1] << " " << inverse_jacobian[1][2] << std::endl;
    std::cout << "                  " << inverse_jacobian[2][0] << " " << inverse_jacobian[2][1] << " " << inverse_jacobian[2][2] << std::endl;

    std::cout << "displacement_gradient: " << displacement_gradient[0][0] << " " << displacement_gradient[0][1] << " " << displacement_gradient[0][2] << std::endl;
    std::cout << "                      " << displacement_gradient[1][0] << " " << displacement_gradient[1][1] << " " << displacement_gradient[1][2] << std::endl;
    std::cout << "                      " << displacement_gradient[2][0] << " " << displacement_gradient[2][1] << " " << displacement_gradient[2][2] << std::endl;

    std::cout << "b_matrix: " << b_matrix[0][0] << " " << b_matrix[0][1] << " " << b_matrix[0][2] << " " << b_matrix[0][3] << std::endl;
    std::cout << "           " << b_matrix[1][0] << " " << b_matrix[1][1] << " " << b_matrix[1][2] << " " << b_matrix[1][3] << std::endl;
    std::cout << "           " << b_matrix[2][0] << " " << b_matrix[2][1] << " " << b_matrix[2][2] << " " << b_matrix[2][3] << std::endl;

    std::cout << "green_lagrange_strain_tensor: " << green_lagrange_strain_tensor[0][0] << " " << green_lagrange_strain_tensor[0][1] << " " << green_lagrange_strain_tensor[0][2] << std::endl;
    std::cout << "                              " << green_lagrange_strain_tensor[1][0] << " " << green_lagrange_strain_tensor[1][1] << " " << green_lagrange_strain_tensor[1][2] << std::endl;
    std::cout << "                              " << green_lagrange_strain_tensor[2][0] << " " << green_lagrange_strain_tensor[2][1] << " " << green_lagrange_strain_tensor[2][2] << std::endl;

    std::cout << "stress: " << stress[0] << " " << stress[1] << " " << stress[2] << " " << stress[3] << " " << stress[4] << " " << stress[5] << std::endl;
    */

    std::array<std::array<double, 6>, 3> bF_IT;
    for (size_t i = 0; i < m_num_nodes; ++i) {
        // Compute (B_I F)^T
        bF_IT = ComputeBFTranspose(b_matrix[i], displacement_gradient);

        double *element_node_force = stk::mesh::field_data(*force_field, nodes[i]);
        // Compute the internal force
        for (int j = 0; j < 3; ++j) {
            for (int k = 0; k < 6; ++k) {
                element_node_force[j] -= bF_IT[j][k] * stress[k] * jacobian_determinant / 6.0;  // weight = 1/6 for tetrahedron
            }
        }
    }
}

}  // namespace aperi
