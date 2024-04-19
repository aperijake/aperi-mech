#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"
#include "Material.h"

namespace aperi {

// Compute (B_I F)^T, voigt notation, 3 x 6
KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 3, 6> ComputeBFTranspose(const Eigen::Matrix<double, 1, 3> &bI_vector, const Eigen::Matrix<double, 3, 3> &displacement_gradient) {
    Eigen::Matrix<double, 3, 6> bf_transpose;
    bf_transpose(0, 0) = bI_vector(0, 0) * (displacement_gradient(0, 0) + 1.0);
    bf_transpose(1, 1) = bI_vector(0, 1) * (displacement_gradient(1, 1) + 1.0);
    bf_transpose(2, 2) = bI_vector(0, 2) * (displacement_gradient(2, 2) + 1.0);

    bf_transpose(0, 1) = bI_vector(0, 1) * displacement_gradient(0, 1);
    bf_transpose(0, 2) = bI_vector(0, 2) * displacement_gradient(0, 2);
    bf_transpose(1, 0) = bI_vector(0, 0) * displacement_gradient(1, 0);
    bf_transpose(1, 2) = bI_vector(0, 2) * displacement_gradient(1, 2);
    bf_transpose(2, 0) = bI_vector(0, 0) * displacement_gradient(2, 0);
    bf_transpose(2, 1) = bI_vector(0, 1) * displacement_gradient(2, 1);

    bf_transpose(0, 3) = bI_vector(0, 1) * displacement_gradient(0, 2) + bI_vector(0, 2) * displacement_gradient(0, 1);
    bf_transpose(0, 4) = bI_vector(0, 0) * displacement_gradient(0, 2) + bI_vector(0, 2) * (displacement_gradient(0, 0) + 1.0);
    bf_transpose(0, 5) = bI_vector(0, 0) * displacement_gradient(0, 1) + bI_vector(0, 1) * (displacement_gradient(0, 0) + 1.0);

    bf_transpose(1, 3) = bI_vector(0, 1) * displacement_gradient(1, 2) + bI_vector(0, 2) * (displacement_gradient(1, 1) + 1.0);
    bf_transpose(1, 4) = bI_vector(0, 0) * displacement_gradient(1, 2) + bI_vector(0, 2) * displacement_gradient(1, 0);
    bf_transpose(1, 5) = bI_vector(0, 0) * (displacement_gradient(1, 1) + 1.0) + bI_vector(0, 1) * displacement_gradient(1, 0);

    bf_transpose(2, 3) = bI_vector(0, 1) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 1);
    bf_transpose(2, 4) = bI_vector(0, 0) * (displacement_gradient(2, 2) + 1.0) + bI_vector(0, 2) * displacement_gradient(2, 0);
    bf_transpose(2, 5) = bI_vector(0, 0) * displacement_gradient(2, 1) + bI_vector(0, 1) * displacement_gradient(2, 0);

    return bf_transpose;
}

// Functor for computing the internal force of an element with NumNodes nodes.
// IntegrationFunctor is a functor that computes the B matrix and integration weight for a given gauss point.
// StressFunctor is a functor that computes the stress of the material.
template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeInternalForceFunctor {
    ComputeInternalForceFunctor(FunctionsFunctor &functions_functor, IntegrationFunctor &integration_functor, StressFunctor &stress_functor)
        : m_functions_functor(functions_functor), m_integration_functor(integration_functor), m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<Eigen::Matrix<double, NumNodes, 3>, 3> &field_data_to_gather, Eigen::Matrix<double, NumNodes, 3> &force) const {
        const Eigen::Matrix<double, NumNodes, 3> &node_coordinates = field_data_to_gather[0];
        const Eigen::Matrix<double, NumNodes, 3> &node_displacements = field_data_to_gather[1];
        // const Eigen::Matrix<double, NumNodes, 3> &node_velocities = field_data_to_gather[2];

        force.fill(0.0);

        // Loop over all gauss points
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Compute the B matrix and integration weight for a given gauss point
            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);

            // Compute displacement gradient
            const Eigen::Matrix3d displacement_gradient = node_displacements.transpose() * b_matrix_and_weight.first;

            // Compute the Green Lagrange strain tensor. TODO: Get rid of this and go straight to voigt notation
            // E = 0.5 * (H + H^T + H^T * H)
            const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (displacement_gradient + displacement_gradient.transpose() + displacement_gradient.transpose() * displacement_gradient);

            // Green Lagrange strain tensor in voigt notation
            Eigen::Matrix<double, 6, 1> green_lagrange_strain_tensor_voigt;
            green_lagrange_strain_tensor_voigt << green_lagrange_strain_tensor(0, 0), green_lagrange_strain_tensor(1, 1), green_lagrange_strain_tensor(2, 2), green_lagrange_strain_tensor(1, 2), green_lagrange_strain_tensor(0, 2), green_lagrange_strain_tensor(0, 1);

            // Compute the stress and internal force of the element.
            const Eigen::Matrix<double, 6, 1> stress = m_stress_functor(green_lagrange_strain_tensor_voigt);

            for (size_t i = 0; i < NumNodes; ++i) {
                // Compute (B_I F)^T
                const Eigen::Matrix<double, 3, 6> bF_IT = ComputeBFTranspose(b_matrix_and_weight.first.row(i), displacement_gradient);

                force.row(i) -= (bF_IT * stress).transpose() * b_matrix_and_weight.second;
            }
        }
    }

    FunctionsFunctor &m_functions_functor;      ///< Functor for computing the shape function values and derivatives
    IntegrationFunctor &m_integration_functor;  ///< Functor for computing the B matrix and integration weight
    StressFunctor &m_stress_functor;            ///< Functor for computing the stress of the material
};

// Functor for 1-pt gauss quadrature on a tetrahedron
template <size_t NumQuadPoints, size_t NumFunctions>
struct Quadrature {
    KOKKOS_INLINE_FUNCTION Quadrature(const Eigen::Matrix<double, NumQuadPoints, 3> &gauss_points, const Eigen::Matrix<double, NumQuadPoints, 1> &gauss_weights) : m_gauss_points(gauss_points), m_gauss_weights(gauss_weights) {}

    // Compute the B matrix and integration weight for a given gauss point
    template <typename FunctionFunctor>
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, NumFunctions, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, NumFunctions, 3> &node_coordinates, FunctionFunctor &function_functor, int gauss_id) const {
        assert(gauss_id <= NumQuadPoints);

        // Compute shape function derivatives
        const Eigen::Matrix<double, NumFunctions, 3> shape_function_derivatives = function_functor.derivatives(m_gauss_points(gauss_id, 0), m_gauss_points(gauss_id, 1), m_gauss_points(gauss_id, 2));

        // Compute Jacobian matrix
        const Eigen::Matrix3d jacobian = node_coordinates.transpose() * shape_function_derivatives;

        // Compute Jacobian determinant
        const double jacobian_determinant = jacobian.determinant();

        // Compute inverse of Jacobian matrix
        const Eigen::Matrix3d inverse_jacobian = jacobian.inverse();

        // Compute B matrix
        const Eigen::Matrix<double, NumFunctions, 3> b_matrix = shape_function_derivatives * inverse_jacobian;

        // Compute the integration weight
        const double integration_weight = m_gauss_weights(gauss_id) * jacobian_determinant;

        return Kokkos::make_pair(b_matrix, integration_weight);
    }

    KOKKOS_INLINE_FUNCTION int NumGaussPoints() const {
        return NumQuadPoints;
    }

    Eigen::Matrix<double, NumQuadPoints, 3> m_gauss_points;
    Eigen::Matrix<double, NumQuadPoints, 1> m_gauss_weights;
};

template <size_t NumFunctions>
struct SmoothedQuadrature {
    KOKKOS_INLINE_FUNCTION SmoothedQuadrature() {
        /* Face ordering
        4-node tetrahedron face node ordering per Seacas: https://sandialabs.github.io/seacas-docs/html/element_types.html
        */
        m_face_nodes << 0, 1, 3,
            1, 2, 3,
            0, 3, 2,
            0, 2, 1;
        /*
        Evaluation points. 1/3 for each node on face. Set to 1/3 everywhere below. Override the values that should be zero here.
        In shape function evaluation, the nodes are ordered as follows:
        - 1: u
        - 2: r = xi
        - 3: s = eta
        - 4: t = zeta
        */
        m_eval_points(0, 1) = 0.0;
        m_eval_points(2, 0) = 0.0;
        m_eval_points(3, 2) = 0.0;
    }

    // Compute the B matrix and integration weight for a given gauss point
    template <typename FunctionFunctor>
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, NumFunctions, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, NumFunctions, 3> &node_coordinates, FunctionFunctor &function_functor, int gauss_id) const {
        assert(gauss_id < 1);

        Eigen::Matrix<double, NumFunctions, 3> b_matrix = Eigen::Matrix<double, NumFunctions, 3>::Zero();

        double volume = 0.0;

        // Loop over faces
        for (size_t j = 0; j < m_num_faces; ++j) {
            // Get the area weighted face normal, cross product of two edges
            const Eigen::Vector3d edge1 = node_coordinates.row(m_face_nodes(j, 1)) - node_coordinates.row(m_face_nodes(j, 0));
            const Eigen::Vector3d edge2 = node_coordinates.row(m_face_nodes(j, 2)) - node_coordinates.row(m_face_nodes(j, 0));

            const Eigen::Vector3d face_normal = edge1.cross(edge2) / 2.0;  // Area weighted normal

            // Add the contribution of the current face to the volume
            volume += node_coordinates.row(m_face_nodes(j, 0)).dot(face_normal);

            // Get the shape functions for the evaluation point. Only one evaluation point per face now.
            const Eigen::Matrix<double, NumFunctions, 1> shape_function_values = function_functor.values(m_eval_points(j, 0), m_eval_points(j, 1), m_eval_points(j, 2));

            // Compute the smoothed shape function derivatives. Add the contribution of the current evaluation point to the smoothed shape function derivatives.
            for (size_t k = 0; k < NumFunctions; ++k) {
                b_matrix.row(k) += shape_function_values(k) * face_normal.transpose();
            }
        }
        volume /= 3.0;  // 3x volume
        b_matrix /= volume;

        return Kokkos::make_pair(b_matrix, volume);
    }

    KOKKOS_INLINE_FUNCTION int NumGaussPoints() const {
        return 1;
    }

    Eigen::Matrix<double, 4, 3> m_eval_points = Eigen::Matrix<double, 4, 3>::Constant(1.0 / 3.0);
    Eigen::Matrix<int, 4, 3> m_face_nodes;
    size_t m_num_faces = 4;
};
}  // namespace aperi
