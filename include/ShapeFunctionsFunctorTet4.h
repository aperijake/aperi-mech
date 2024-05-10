#pragma once

#include <Eigen/Dense>

#include "Constants.h"

namespace aperi {

/**
 * @brief Functor for computing the shape function values and derivatives of a 4-node tetrahedron element.
 *
 * Reference:
 *   Hughes, T.J.R. The Finite Element Method: Linear Static and Dynamic Finite Element Analysis. Dover Civil and Mechanical Engineering. Dover Publications, 2012.
 *   Figure 3.I.8, Equations 3.I.19 to 3.I.22. ~Page 273
 *   But, node ordering is different from the reference and is as follows.
 *   - Node 0: at u = 1
 *   - Node 1: at r = 1 = xi
 *   - Node 2: at s = 1 = eta
 *   - Node 3: at t = 1 = zeta
 */
struct ShapeFunctionsFunctorTet4 {
    /**
     * @brief Computes the shape function derivatives of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 3> derivatives(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Eigen::Matrix<double, tet4_num_nodes, 3> shape_function_derivatives;
        shape_function_derivatives << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        return shape_function_derivatives;
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Eigen::Matrix<double, tet4_num_nodes, 1> shape_functions;
        shape_functions << 1.0 - parametric_coordinates(0) - parametric_coordinates(1) - parametric_coordinates(2),
            parametric_coordinates(0),
            parametric_coordinates(1),
            parametric_coordinates(2);
        return shape_functions;
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @param node_coordinates The physical coordinates of the nodes of the element (not needed for ShapeFunctionsFunctorTet4)
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates, const Eigen::Matrix<double, tet4_num_nodes, 3>& node_coordinates, const Eigen::Matrix<double, tet4_num_nodes, 3>& neighbor_coordinates, size_t actual_num_neighbors = 4) const {
        // Node coordinates and neighbor coordinates are not used in this function, but needed for the interface.
        return values(parametric_coordinates);
    }
};

}  // namespace aperi