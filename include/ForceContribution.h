#pragma once

#include <memory>

#include "Material.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace acm {
class ForceContribution {
   public:
    ForceContribution(std::shared_ptr<Material> material) : m_material(material) {}

    std::shared_ptr<Material> GetMaterial() const {
        return m_material;
    }

   private:
    std::shared_ptr<Material> m_material;
};

inline std::shared_ptr<ForceContribution> CreateForceContribution(std::shared_ptr<Material> material) {
    return std::make_shared<ForceContribution>(material);
}

}  // namespace acm