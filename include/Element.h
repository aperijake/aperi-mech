#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Material.h"
#include "Kokkos_Core.hpp"

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
     * @note The object-oriented design cause a low-level virtual function call in the element internal force calculation.
     *       The performance didn't seem to be too affected by this, but it's something to keep in mind.
     *       I did try to replace with a lambda function, but that performed worse.
     *       I also tried to replace with a template function, but that didn't work because the number of nodes is not known at compile time.
     *
     * @param num_nodes The number of nodes in the element.
     */
    Element(size_t num_nodes) : m_num_nodes(num_nodes) {}

    /**
     * @brief Gets the number of nodes in the element.
     *
     * @return The number of nodes in the element.
     */
    size_t GetNumNodes() const {
        return m_num_nodes;
    }

    /**
     * @brief Computes the shape functions of the element.
     *
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape functions of the element.
     */
    virtual Eigen::Matrix<double, 4, 1> ComputeShapeFunctions(double xi, double eta, double zeta) const = 0;

    /**
     * @brief Computes the shape function derivatives of the element.
     *
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape function derivatives of the element.
     */
    virtual Eigen::Matrix<double, 4, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const = 0;

    /**
     * @brief Computes the internal force of the element. Wraps the actual computation of the internal force.
     *
     * @param node_coordinates The coordinates of the nodes of the element.
     * @param node_displacements The displacements of the nodes of the element.
     * @param node_velocities The velocities of the nodes of the element.
     * @param material The material of the element.
     * @return The internal force of the element.
     */
    Eigen::Matrix<double, 4, 3> ComputeInternalForce(const Eigen::Matrix<double, 4, 3> &node_coordinates, const Eigen::Matrix<double, 4, 3> &node_displacements, const Eigen::Matrix<double, 4, 3> &node_velocities, std::shared_ptr<Material> material) const;

    struct ComputeInternalForceFunctor {
        KOKKOS_INLINE_FUNCTION void operator()(const Eigen::Matrix<double, 4, 3> &node_coordinates, const Eigen::Matrix<double, 4, 3> &node_displacements, const Eigen::Matrix<double, 4, 3> &node_velocities, Eigen::Matrix<double, 4, 3> &force) const {
            // Compute the internal force
            printf("Element::ComputeInternalForceTest\n");
            printf("pre fill force(0,0): %f\n", force(0, 0));
            force.fill(1.3);
            printf("post fill force(0,0): %f\n", force(0, 0));
            //force = ComputeInternalForce(node_coordinates, node_displacements, node_velocities, m_material);
        }
    };

    ComputeInternalForceFunctor GetComputeInternalForceFunctor() {
        return ComputeInternalForceFunctor();
    }
 //   Eigen::Matrix<double, 4, 3> ComputeInternalForceTest(const Eigen::Matrix<double, 4, 3> &node_coordinates, const Eigen::Matrix<double, 4, 3> &node_displacements, const Eigen::Matrix<double, 4, 3> &node_velocities) const;
//KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 4, 3> Element::ComputeInternalForceTest(const Eigen::Matrix<double, 4, 3> &node_coordinates, const Eigen::Matrix<double, 4, 3> &node_displacements, const Eigen::Matrix<double, 4, 3> &node_velocities) const {
//    printf("Element::ComputeInternalForceTest\n");
//    Eigen::Matrix<double, 4, 3> shape_function_derivatives;
//    shape_function_derivatives.fill(1.3);
//    // const Eigen::Matrix<double, 4, 3> shape_function_derivatives = ComputeShapeFunctionDerivatives(0.0, 0.0, 0.0);
//    return shape_function_derivatives;
//    //return Element::DoInternalForceCalc<4>(shape_function_derivatives, node_coordinates, node_displacements, node_velocities);
//}



   protected:
    /**
     * @brief Template function to compute the internal force of the element. Handles the actual computation of the internal force.
     * @note Templating this way prevents the calling function from having to know the number of nodes in the element.
     *       It also was a moderate performance improvement over have Eigen::Dynamic sizes on the matrices.
     *
     * @param shape_function_derivatives The shape function derivatives of the element.
     * @param node_coordinates The coordinates of the nodes of the element.
     * @param node_displacements The displacements of the nodes of the element.
     * @param node_velocities The velocities of the nodes of the element.
     * @param material The material of the element.
     * @return The internal force of the element.
     */
    template <size_t N>
    Eigen::Matrix<double, N, 3> DoInternalForceCalc(const Eigen::Matrix<double, N, 3> &shape_function_derivatives, const Eigen::Matrix<double, N, 3> &node_coordinates, const Eigen::Matrix<double, N, 3> &node_displacements, const Eigen::Matrix<double, N, 3> &node_velocities, std::shared_ptr<Material> material) const;

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

    Eigen::Matrix<double, 4, 1> ComputeShapeFunctions(double xi, double eta, double zeta) const override {
        Eigen::Matrix<double, 4, 1> shape_functions;
        shape_functions << 1.0 - xi - eta - zeta,
            xi,
            eta,
            zeta;
        return shape_functions;
    }

    // dN/dxi, dN/deta, dN/dzeta
    Eigen::Matrix<double, 4, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const override {
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
 * @param num_nodes The number of nodes in the element.
 * @return A shared pointer to the created Element object.
 */
inline std::shared_ptr<Element> CreateElement(size_t num_nodes) {
    if (num_nodes == 4) {
        return std::make_shared<Tetrahedron4>();
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
