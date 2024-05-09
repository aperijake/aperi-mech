#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementProcessor.h"
#include "Material.h"

namespace aperi {

static constexpr size_t tet4_num_nodes = 4;

/**
 * @brief Represents an element in a mesh.
 *
 * This class provides a base implementation for elements in a mesh.
 */
class ElementBase {
   public:
    /**
     * @brief Constructs an ElementBase object.
     * @note The object-oriented design cause a low-level virtual function call in the element internal force calculation.
     *       The performance didn't seem to be too affected by this, but it's something to keep in mind.
     *       I did try to replace with a lambda function, but that performed worse.
     *       I also tried to replace with a template function, but that didn't work because the number of nodes is not known at compile time.
     *
     * @param num_nodes The number of nodes in the element.
     */
    ElementBase(size_t num_nodes, std::shared_ptr<Material> material = nullptr) : m_num_nodes(num_nodes), m_material(material) {}

    /**
     * @brief Gets the number of nodes in the element.
     *
     * @return The number of nodes in the element.
     */
    size_t GetNumNodes() const {
        return m_num_nodes;
    }

    /**
     * @brief Computes the internal force of the element.
     *
     */
    virtual void ComputeInternalForceAllElements() = 0;

    /**
     * @brief Sets the material of the element.
     *
     * @param material The material of the element.
     */
    void SetMaterial(std::shared_ptr<Material> material) {
        m_material = material;
    }

   protected:
    size_t m_num_nodes;                    ///< The number of nodes in the element.
    std::shared_ptr<Material> m_material;  ///< The material of the element.
};

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
struct Tet4FunctionsFunctor {
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
     * @param node_coordinates The physical coordinates of the nodes of the element (not needed for Tet4FunctionsFunctor)
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates, const Eigen::Matrix<double, tet4_num_nodes, 3>& node_coordinates, const Eigen::Matrix<double, tet4_num_nodes, 3>& neighbor_coordinates) const {
        // Node coordinates and neighbor coordinates are not used in this function, but needed for the interface.
        return values(parametric_coordinates);
    }

};

struct ReproducingKernelOnTet4FunctionsFunctor {
    /**
     * @brief Computes the shape function derivatives of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 3> derivatives(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Kokkos::abort("Not implemented. Should not be calling derivatives on ReproducingKernelOnTet4FunctionsFunctor now.");
        return Eigen::Matrix<double, tet4_num_nodes, 3>::Zero();
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @return The shape function values of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates) const {
        Kokkos::abort("Not implemented. Reproducing kernel needs physical coordinates. Call 'values' with physical coordinates.");
        return Eigen::Matrix<double, tet4_num_nodes, 1>::Zero();
    }


    /**
     * @brief Computes the shape functions of the element.
     * @param parametric_coordinates The parametric coordinates of the element (xi, eta, zeta).
     * @param cell_node_coordinates The physical coordinates of the nodes of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 1> values(const Eigen::Matrix<double, 3, 1>& parametric_coordinates, const Eigen::Matrix<double, tet4_num_nodes, 3>& cell_node_coordinates, const Eigen::Matrix<double, tet4_num_nodes, 3>& neighbor_coordinates) const {
        Eigen::Matrix<double, 1, tet4_num_nodes> shape_functions;
        shape_functions << 1.0 - parametric_coordinates(0) - parametric_coordinates(1) - parametric_coordinates(2),
            parametric_coordinates(0),
            parametric_coordinates(1),
            parametric_coordinates(2);
        Eigen::Matrix<double, 1, 3> evaluation_point_physical_coordinates = shape_functions * cell_node_coordinates;

        // Allocate moment matrix (M) and M^-1
        Eigen::Matrix<double, 4, 4> M = Eigen::Matrix<double, 4, 4>::Zero();
        Eigen::Matrix<double, 4, 4> M_inv;

        // Allocate basis vector (H)
        Eigen::Vector<double, 4> H = Eigen::Vector<double, 4>::Zero();
        H(0) = 1.0;

        // Loop over neighbor nodes
        for (size_t i = 0; i < 4; i++) {
            // Compute basis vector (H)
            H(1) = evaluation_point_physical_coordinates(0) - neighbor_coordinates(i, 0);
            H(2) = evaluation_point_physical_coordinates(1) - neighbor_coordinates(i, 1);
            H(3) = evaluation_point_physical_coordinates(2) - neighbor_coordinates(i, 2);

            double phi_z = 1.0;

            // Compute moment matrix (M)
            M += phi_z *  H * H.transpose();
        }

        // Compute M^-1
        M_inv = M.fullPivLu().inverse();

        // Loop over neighbor nodes again
        Eigen::Matrix<double, tet4_num_nodes, 1> function_values;
        for (size_t i = 0; i < 4; i++) {
            // Compute basis vector (H)
            H(1) = evaluation_point_physical_coordinates(0) - neighbor_coordinates(i, 0);
            H(2) = evaluation_point_physical_coordinates(1) - neighbor_coordinates(i, 1);
            H(3) = evaluation_point_physical_coordinates(2) - neighbor_coordinates(i, 2);

            double phi_z = 1.0;

            // Compute shape function value
            function_values(i, 0) = (M_inv.row(0) * H * phi_z)(0);
        }

        return function_values;
    }

};

}  // namespace aperi
