#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementProcessor.h"
#include "Material.h"

namespace aperi {

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

}  // namespace aperi