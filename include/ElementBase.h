#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementProcessor.h"
#include "Material.h"

namespace aperi {

static constexpr int tet4_num_nodes = 4;

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
    ElementBase(size_t num_nodes) : m_num_nodes(num_nodes), m_element_processor(nullptr), m_material(nullptr) {}

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
     * @brief Computes the internal force of the element.
     *
     */
    virtual void ComputeInternalForceAllElements() = 0;

    /**
     * @brief Sets the element processor associated with the force contribution.
     *
     * @param element_processor The element processor associated with the force contribution.
     */
    void SetElementProcessor(std::shared_ptr<aperi::ElementProcessor<3>> element_processor) {
        m_element_processor = element_processor;
    }

    /**
     * @brief Sets the material of the element.
     *
     * @param material The material of the element.
     */
    void SetMaterial(std::shared_ptr<Material> material) {
        m_material = material;
    }

   protected:
    size_t m_num_nodes;                                               ///< The number of nodes in the element.
    std::shared_ptr<aperi::ElementProcessor<3>> m_element_processor;  ///< The element processor associated with the force contribution.
    std::shared_ptr<Material> m_material;                             ///< The material of the element.
};

/**
    * @brief Functor for computing the shape function values and derivatives of a 4-node tetrahedron element.
    * @param xi The xi, or r, coordinate of the element.
    * @param eta The eta, or s, coordinate of the element.
    * @param zeta The zeta, or t, coordinate of the element.
    * @return The shape function derivatives of the element.
    *
    * This functor computes the shape function derivatives, dN/dxi, dN/deta, dN/dzeta

*/
struct Tet4FunctionsFunctor {
    /**
     * @brief Computes the shape function derivatives of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 3> derivatives(double xi, double eta, double zeta) const {
        Eigen::Matrix<double, tet4_num_nodes, 3> shape_function_derivatives;
        shape_function_derivatives << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        return shape_function_derivatives;
    }

    /**
     * @brief Computes the shape functions of the element.
     */
    KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, tet4_num_nodes, 1> values(double xi, double eta, double zeta) const {
        Eigen::Matrix<double, tet4_num_nodes, 1> shape_functions;
        shape_functions << 1.0 - xi - eta - zeta,
            xi,
            eta,
            zeta;
        return shape_functions;
    }
};

}  // namespace aperi
