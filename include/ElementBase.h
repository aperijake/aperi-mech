#pragma once

#include <memory>

#include "Material.h"
#include "Timer.h"

namespace aperi {

class SmoothedCellData;

enum class ElementTimerType {
    CreateElementForceProcessor,
    Other,
    NONE
};

inline const std::map<ElementTimerType, std::string> element_timer_map = {
    {ElementTimerType::CreateElementForceProcessor, "CreateElementForceProcessor"},
    {ElementTimerType::Other, "Other"},
    {ElementTimerType::NONE, "NONE"}};

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
    ElementBase(size_t num_nodes, std::shared_ptr<Material> material = nullptr) : m_num_nodes(num_nodes), m_material(material) {
        m_timer_manager = std::make_shared<aperi::TimerManager<ElementTimerType>>("Element", element_timer_map);
    }

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
    virtual void ComputeInternalForceAllElements(double time_increment) = 0;

    /**
     * @brief Sets the material of the element.
     *
     * @param material The material of the element.
     */
    void SetMaterial(std::shared_ptr<Material> material) {
        m_material = material;
    }

    /**
     * @brief Gets the SmoothedCellData object.
     *
     * @return A shared pointer to the SmoothedCellData object.
     */
    virtual std::shared_ptr<SmoothedCellData> GetSmoothedCellData() const {
        return nullptr;
    }

    /**
     * @brief Gets the timer manager for the element.
     *
     * @return A shared pointer to the timer manager for the element.
     */
    std::shared_ptr<aperi::TimerManager<ElementTimerType>> GetTimerManager() const {
        return m_timer_manager;
    }

   protected:
    size_t m_num_nodes;                                                      ///< The number of nodes in the element.
    std::shared_ptr<Material> m_material;                                    ///< The material of the element.
    std::shared_ptr<aperi::TimerManager<ElementTimerType>> m_timer_manager;  ///< The timer manager for the element.
};

}  // namespace aperi
