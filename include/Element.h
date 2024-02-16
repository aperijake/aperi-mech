#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stk_topology/topology.hpp>

#include "Material.h"

namespace aperi {

/**
 * @brief Represents an element in a mesh.
 *
 * This class provides a base implementation for elements in a mesh.
 */
class Element {
   public:
    /**
     * @brief Constructs an Element object.
     *
     * @param num_nodes The number of nodes in the element.
     */
    Element(size_t num_nodes) : m_num_nodes(num_nodes) {}

    virtual std::vector<double> ComputeShapeFunctions(double xi, double eta, double zeta) const = 0;

    virtual std::vector<std::array<double, 3>> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const = 0;

    // TODO(jake): Get rid of function above then get rid of dummy parameter
    virtual Eigen::Matrix<double, 4, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta, bool dummy) const = 0;

    /**
     * @brief Computes the internal force of the element.
     *
     * @param node_coordinates The coordinates of the nodes of the element.
     * @param node_displacements The displacements of the nodes of the element.
     * @param node_velocities The velocities of the nodes of the element.
     * @param material The material of the element.
     * @return The internal force of the element.
     */
    Eigen::Matrix<double, 4, 3> ComputeInternalForce(const Eigen::Matrix<double, 4, 3> &node_coordinates, const Eigen::Matrix<double, 4, 3> &node_displacements, const Eigen::Matrix<double, 4, 3> &node_velocities, std::shared_ptr<Material> material) const;

   protected:
    size_t m_num_nodes;  ///< The number of nodes in the element.
};

/**
 * @brief Represents a 4-node tetrahedron element.
 *
 * This class inherits from the Element base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class Tetrahedron4 : public Element {
   public:
    /**
     * @brief Constructs a Tetrahedron4 object.
     *
     */
    Tetrahedron4() : Element(4) {
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

    // dN/dxi, dN/deta, dN/dzeta
    Eigen::Matrix<double, 4, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta, bool dummy) const override {
        Eigen::Matrix<double, 4, 3> shape_function_derivatives;
        shape_function_derivatives << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
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
 * @param topology The topology of the element.
 * @return A shared pointer to the created Element object.
 */
inline std::shared_ptr<Element> CreateElement(stk::topology topology) {
    if (topology == stk::topology::TET_4) {
        return std::make_shared<Tetrahedron4>();
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

Eigen::Matrix<double, 3, 6> ComputeBFTranspose(const Eigen::Matrix<double, 1, 3> &bI_vector, const Eigen::Matrix<double, 3, 3> &displacement_gradient);

template <size_t N>
Eigen::Matrix<double, N, 3> InternalForceCalc(const Eigen::Matrix<double, N, 3> &shape_function_derivatives, const Eigen::Matrix<double, N, 3> &node_coordinates, const Eigen::Matrix<double, N, 3> &node_displacements, const Eigen::Matrix<double, N, 3> &node_velocities, std::shared_ptr<Material> material) {
    // Compute Jacobian matrix
    const Eigen::Matrix3d jacobian = node_coordinates.transpose() * shape_function_derivatives;

    // Compute Jacobian determinant
    const double jacobian_determinant = jacobian.determinant();

    // Compute inverse of Jacobian matrix
    const Eigen::Matrix3d inverse_jacobian = jacobian.inverse();

    // Compute B matrix
    const Eigen::Matrix<double, N, 3> b_matrix = shape_function_derivatives * inverse_jacobian;

    // Compute displacement gradient
    const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix;

    // Compute the Green Lagrange strain tensor. TODO(jake): Get rid of this and go straight to voigt notation
    // E = 0.5 * (H + H^T + H^T * H)
    const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (displacement_gradient + displacement_gradient.transpose() + displacement_gradient.transpose() * displacement_gradient);

    // Green Lagrange strain tensor in voigt notation
    Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
    green_lagrange_strain_tensor_voigt << green_lagrange_strain_tensor(0, 0), green_lagrange_strain_tensor(1, 1), green_lagrange_strain_tensor(2, 2), green_lagrange_strain_tensor(1, 2), green_lagrange_strain_tensor(0, 2), green_lagrange_strain_tensor(0, 1);

    // Compute the stress and internal force of the element.
    const Eigen::Matrix<double, 6, 1> stress = material->GetStress(green_lagrange_strain_tensor_voigt);

    Eigen::Matrix<double, N, 3> internal_force;
    internal_force.fill(0.0);

    Eigen::Matrix<double, 3, 6> bF_IT;
    for (size_t i = 0; i < N; ++i) {
        // Compute (B_I F)^T
        bF_IT = ComputeBFTranspose(b_matrix.row(i), displacement_gradient);

        internal_force.row(i) -= (bF_IT * stress).transpose() * jacobian_determinant / 6.0;  // weight = 1/6 for tetrahedron
    }

    return internal_force;
}

}  // namespace aperi
