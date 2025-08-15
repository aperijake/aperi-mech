#pragma once

#include <memory>
#include <string>
#include <vector>

#include "InitialCondition/Base.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {
class MeshData;

/**
 * @brief Concrete implementation of InitialCondition.
 */
class ComponentAndValueInitialCondition : public InitialCondition {
   public:
    /**
     * @brief Constructor for ComponentAndValueInitialCondition.
     *
     * @param mesh_data Shared pointer to mesh data object.
     * @param field_name Name of the field to which the initial condition applies.
     * @param sets Names of the sets where the initial condition should be applied.
     * @param components_and_values Vector of component indices and their corresponding values.
     */
    ComponentAndValueInitialCondition(
        std::shared_ptr<aperi::MeshData> mesh_data,
        const std::string& field_name,
        const std::vector<std::string>& sets,
        const std::vector<std::pair<size_t, double>>& components_and_values);

    /**
     * @brief Apply the initial condition.
     */
    void Apply() override;

   private:
    std::vector<std::pair<size_t, double>> m_components_and_values;  ///< Vector of component indices and their corresponding values.
};

}  // namespace aperi