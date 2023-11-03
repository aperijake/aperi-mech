#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <string>

namespace YAML {
class Node;
}  // namespace YAML

namespace acm {

enum MaterialType {
    ELASTIC,
    NONE
};

struct MaterialProperties {
    MaterialType material_type = MaterialType::NONE;
    double density;
    std::map<std::string, double> properties;
};

class Material {
   public:
    Material(std::shared_ptr<MaterialProperties> material_properties) : m_material_properties(material_properties) {}
    // Get density
    double GetDensity() const {
        return m_material_properties->density;
    }
    virtual ~Material() = default;

   private:
    std::shared_ptr<MaterialProperties> m_material_properties;
};

class ElasticMaterial : public Material {
   public:
    ElasticMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {}
    virtual ~ElasticMaterial() = default;
};

inline std::shared_ptr<Material> CreateMaterial(YAML::Node& material_node) {
    std::string material_type_string = material_node["type"].as<std::string>();
    auto material_properties = std::make_shared<MaterialProperties>();
    material_properties->density = material_node["density"].as<double>();

    if (material_type_string == "elastic") {
        material_properties->material_type = MaterialType::ELASTIC;
        material_properties->properties.emplace("poissons_ratio", material_node["poissons_ratio"].as<double>());
        material_properties->properties.emplace("youngs_modulus", material_node["youngs_modulus"].as<double>());
        return std::make_shared<ElasticMaterial>(material_properties);
    } else {
        return nullptr;
    }
}

}  // namespace acm