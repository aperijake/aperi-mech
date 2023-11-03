#pragma once

#include <memory>
#include <stdexcept>

#include "Material.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace acm {
class ForceContribution {
   public:
    ForceContribution() = default;
    ~ForceContribution() = default;
};

class InternalForceContribution : public ForceContribution {
   public:
    InternalForceContribution(std::shared_ptr<Material> material) : m_material(material) {}
    std::shared_ptr<Material> GetMaterial() const {
        return m_material;
    }
   private:
    std::shared_ptr<Material> m_material;
};

class ExternalForceContribution : public ForceContribution {
   public:
    ExternalForceContribution(double magnitude, std::array<double, 3> direction) : m_magnitude(magnitude), m_direction(direction) {}
   private:
    double m_magnitude;
    std::array<double, 3> m_direction;
};

class ExternalForceContributionTraction : public ExternalForceContribution {
    public:
    ExternalForceContributionTraction(double magnitude, std::array<double, 3> direction) : ExternalForceContribution(magnitude, direction) {
        // Throw error because this is not implemented yet
        throw std::runtime_error("Error: Traction not implemented yet");
    }
};

class ExternalForceContributionGravity : public ExternalForceContribution {
   public:
    ExternalForceContributionGravity(double magnitude, std::array<double, 3> direction) : ExternalForceContribution(magnitude, direction) {}
};

inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(std::shared_ptr<Material> material) {
    return std::make_shared<InternalForceContribution>(material);
}

inline std::shared_ptr<ExternalForceContribution> CreateExternalForceContribution(YAML::Node& load) {
    std::string type = load["type"].as<std::string>();
    double magnitude = load["magnitude"].as<double>();
    std::array<double, 3> direction = load["direction"].as<std::array<double, 3>>();
    if (type == "traction") {
        return std::make_shared<ExternalForceContributionTraction>(magnitude, direction);
    } else if (type == "gravity") {
        return std::make_shared<ExternalForceContributionGravity>(magnitude, direction);
    } else {
        return nullptr;
    }
}

}  // namespace acm