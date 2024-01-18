#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <string>

namespace aperi {

/**
 * @brief Enum representing the type of material.
 */
enum MaterialType {
    ELASTIC, /**< Elastic material type */
    NONE /**< No material type */
};

/**
 * @brief Struct representing the properties of a material.
 */
struct MaterialProperties {
    MaterialType material_type = MaterialType::NONE; /**< The type of material */
    double density; /**< The density of the material */
    std::map<std::string, double> properties; /**< Additional properties of the material */
};

/**
 * @brief Base class for materials.
 */
class Material {
   public:
    /**
     * @brief Constructor for Material class.
     * @param material_properties The properties of the material.
     */
    Material(std::shared_ptr<MaterialProperties> material_properties) : m_material_properties(material_properties) {}

    /**
     * @brief Get the density of the material.
     * @return The density of the material.
     */
    double GetDensity() const {
        return m_material_properties->density;
    }

    /**
     * @brief Virtual destructor for Material class.
     */
    virtual ~Material() = default;

   private:
    std::shared_ptr<MaterialProperties> m_material_properties; /**< The properties of the material */
};

/**
 * @brief Derived class for elastic materials.
 */
class ElasticMaterial : public Material {
   public:
    /**
     * @brief Constructor for ElasticMaterial class.
     * @param material_properties The properties of the elastic material.
     */
    ElasticMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {}

    /**
     * @brief Virtual destructor for ElasticMaterial class.
     */
    virtual ~ElasticMaterial() = default;
};

/**
 * @brief Create a material based on the given YAML node.
 * @param material_node The YAML node representing the material.
 * @return A shared pointer to the created material, or nullptr if the material type is not defined.
 */
inline std::shared_ptr<Material> CreateMaterial(YAML::Node& material_node) {
    auto material_properties = std::make_shared<MaterialProperties>();

    if (material_node["elastic"].IsDefined()) {
        YAML::Node elastic_node = material_node["elastic"];
        material_properties->material_type = MaterialType::ELASTIC;
        material_properties->density = elastic_node["density"].as<double>();
        material_properties->properties.emplace("poissons_ratio", elastic_node["poissons_ratio"].as<double>());
        material_properties->properties.emplace("youngs_modulus", elastic_node["youngs_modulus"].as<double>());
        return std::make_shared<ElasticMaterial>(material_properties);
    } else {
        return nullptr;
    }
}

}  // namespace aperi