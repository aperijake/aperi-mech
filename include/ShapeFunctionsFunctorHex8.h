#pragma once

#include <Eigen/Dense>

#include "Constants.h"

namespace aperi {

/**
 * @brief Functor for computing the shape function values and derivatives of a 8-node hexahedron element.
 * @todo Hexahedron shape functions are not fully implemented. This class should work. Still need to test it and add mass matrix computation.
 *
 * Reference:
 *   Hughes, T.J.R. The Finite Element Method: Linear Static and Dynamic Finite Element Analysis. Dover Civil and Mechanical Engineering. Dover Publications, 2012.
 *   Section 3.5 ~Page 225
 *    Nodes:
 *   7-------6
 * /|      /|
 * 4-------5 |
 * | |     | |
 * | 3-----|-2
 * |/      |/
 * 0-------1
 *
 * - Node 0: -1, -1, -1
 * - Node 1:  1, -1, -1
 * - Node 2:  1,  1, -1
 * - Node 3: -1,  1, -1
 * - Node 4: -1, -1,  1
 * - Node 5:  1, -1,  1
 * - Node 6:  1,  1,  1
 * - Node 7: -1,  1,  1
 *
 * Shape functions:
 * N0 = 1/8 * (1 - xi) * (1 - eta) * (1 - zeta)
 * N1 = 1/8 * (1 + xi) * (1 - eta) * (1 - zeta)
 * N2 = 1/8 * (1 + xi) * (1 + eta) * (1 - zeta)
 * N3 = 1/8 * (1 - xi) * (1 + eta) * (1 - zeta)
 * N4 = 1/8 * (1 - xi) * (1 - eta) * (1 + zeta)
 * N5 = 1/8 * (1 + xi) * (1 - eta) * (1 + zeta)
 * N6 = 1/8 * (1 + xi) * (1 + eta) * (1 + zeta)
 * N7 = 1/8 * (1 - xi) * (1 + eta) * (1 + zeta)
 *
 */
struct ShapeFunctionsFunctorHex8 {
    /**
     * @brief Computes the shape function derivatives of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, HEX8_NUM_NODES, 3> Derivatives(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Eigen::Matrix<double, HEX8_NUM_NODES, 3> shape_function_derivatives;
        shape_function_derivatives << -0.125 * (1.0 - parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)), -0.125 * (1.0 - parametric_coordinates(0)) * (1.0 - parametric_coordinates(2)), -0.125 * (1.0 - parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)),
            0.125 * (1.0 - parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)), -0.125 * (1.0 + parametric_coordinates(0)) * (1.0 - parametric_coordinates(2)), -0.125 * (1.0 + parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)),
            0.125 * (1.0 + parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)), 0.125 * (1.0 + parametric_coordinates(0)) * (1.0 - parametric_coordinates(2)), -0.125 * (1.0 + parametric_coordinates(0)) * (1.0 + parametric_coordinates(1)),
            -0.125 * (1.0 + parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)), 0.125 * (1.0 - parametric_coordinates(0)) * (1.0 - parametric_coordinates(2)), -0.125 * (1.0 - parametric_coordinates(0)) * (1.0 + parametric_coordinates(1)),
            -0.125 * (1.0 - parametric_coordinates(1)) * (1.0 + parametric_coordinates(2)), -0.125 * (1.0 - parametric_coordinates(0)) * (1.0 + parametric_coordinates(2)), 0.125 * (1.0 - parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)),
            0.125 * (1.0 - parametric_coordinates(1)) * (1.0 + parametric_coordinates(2)), -0.125 * (1.0 + parametric_coordinates(0)) * (1.0 + parametric_coordinates(2)), 0.125 * (1.0 + parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)),
            0.125 * (1.0 + parametric_coordinates(1)) * (1.0 + parametric_coordinates(2)), 0.125 * (1.0 + parametric_coordinates(0)) * (1.0 + parametric_coordinates(2)), 0.125 * (1.0 + parametric_coordinates(0)) * (1.0 + parametric_coordinates(1)),
            -0.125 * (1.0 + parametric_coordinates(1)) * (1.0 + parametric_coordinates(2)), 0.125 * (1.0 - parametric_coordinates(0)) * (1.0 + parametric_coordinates(2)), 0.125 * (1.0 - parametric_coordinates(0)) * (1.0 + parametric_coordinates(1));
        return shape_function_derivatives;
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, HEX8_NUM_NODES, 1> Values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Eigen::Matrix<double, HEX8_NUM_NODES, 1> shape_functions;
        shape_functions << 0.125 * (1.0 - parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)),
            0.125 * (1.0 + parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)),
            0.125 * (1.0 + parametric_coordinates(0)) * (1.0 + parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)),
            0.125 * (1.0 - parametric_coordinates(0)) * (1.0 + parametric_coordinates(1)) * (1.0 - parametric_coordinates(2)),
            0.125 * (1.0 - parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)) * (1.0 + parametric_coordinates(2)),
            0.125 * (1.0 + parametric_coordinates(0)) * (1.0 - parametric_coordinates(1)) * (1.0 + parametric_coordinates(2)),
            0.125 * (1.0 + parametric_coordinates(0)) * (1.0 + parametric_coordinates(1)) * (1.0 + parametric_coordinates(2)),
            0.125 * (1.0 - parametric_coordinates(0)) * (1.0 + parametric_coordinates(1)) * (1.0 + parametric_coordinates(2));
        return shape_functions;
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @param node_coordinates The physical coordinates of the nodes of the element (not needed for ShapeFunctionsFunctorHex8)
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, HEX8_NUM_NODES, 1> Values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates, const Eigen::Matrix<double, HEX8_NUM_NODES, 3>& /*node_coordinates*/, const Eigen::Matrix<double, HEX8_NUM_NODES, 3>& /*neighbor_coordinates*/, size_t /*actual_num_neighbors = 8*/) const {
        // Node coordinates and neighbor coordinates are not used in this function, but needed for the interface.
        return Values(parametric_coordinates);
    }
};

}  // namespace aperi