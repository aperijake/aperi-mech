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
};

struct ElasticMaterialProperties : public MaterialProperties {
    ElasticMaterialProperties() {
        material_type = MaterialType::ELASTIC;
    }
    double youngs_modulus;
    double poissons_ratio;
};

class Material {
   public:
    Material() = default;
    virtual ~Material() = default;
};

class ElasticMaterial : public Material {
   public:
    ElasticMaterial(std::shared_ptr<ElasticMaterialProperties> elastic_material_properties) : m_elastic_material_properties(elastic_material_properties) {}
    virtual ~ElasticMaterial() = default;

   private:
    std::shared_ptr<ElasticMaterialProperties> m_elastic_material_properties;
};

std::shared_ptr<Material> CreateMaterial(YAML::Node& material_node) {
    std::string material_type_string = material_node["type"].as<std::string>();
    if (material_type_string == "elastic") {
        auto elastic_material_properties = std::make_shared<ElasticMaterialProperties>();
        elastic_material_properties->density = material_node["density"].as<double>();
        elastic_material_properties->youngs_modulus = material_node["youngs_modulus"].as<double>();
        return std::make_shared<ElasticMaterial>(elastic_material_properties);
    } else {
        return nullptr;
    }
}

}  // namespace acm