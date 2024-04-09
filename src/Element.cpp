#include "Element.h"

#include <Eigen/Dense>
#include <memory>

#include "Material.h"

namespace aperi {

Eigen::Matrix<double, 4, 3> Element::ComputeInternalForce(const Eigen::Matrix<double, 4, 3> &node_coordinates, const Eigen::Matrix<double, 4, 3> &node_displacements, const Eigen::Matrix<double, 4, 3> &node_velocities, std::shared_ptr<Material> material) const {
    const Eigen::Matrix<double, 4, 3> shape_function_derivatives = ComputeShapeFunctionDerivatives(0.0, 0.0, 0.0);
    return Element::DoInternalForceCalc<4>(shape_function_derivatives, node_coordinates, node_displacements, node_velocities, material);
}

template <size_t N>
Eigen::Matrix<double, N, 3> Element::DoInternalForceCalc(const Eigen::Matrix<double, N, 3> &shape_function_derivatives, const Eigen::Matrix<double, N, 3> &node_coordinates, const Eigen::Matrix<double, N, 3> &node_displacements, const Eigen::Matrix<double, N, 3> &node_velocities, std::shared_ptr<Material> material) const {
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
