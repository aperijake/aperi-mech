#pragma once

#include <yaml-cpp/yaml.h>

#include <Eigen/Dense>
#include <memory>
#include <string>

namespace aperi {

/**
 * @brief Enum representing the type of material.
 */
enum MaterialType {
    ELASTIC, /**< Elastic material type */
    NONE     /**< No material type */
};

/**
 * @brief Struct representing the properties of a material.
 */
struct MaterialProperties {
    MaterialType material_type = MaterialType::NONE; /**< The type of material */
    double density;                                  /**< The density of the material */
    std::map<std::string, double> properties;        /**< Additional properties of the material */
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

    virtual Eigen::Matrix<double, 6, 1> GetStress(const Eigen::Matrix<double, 6, 1>& green_lagrange_strain) const = 0;

    /**
     * @brief Virtual destructor for Material class.
     */
    virtual ~Material() = default;

   protected:
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
    ElasticMaterial(std::shared_ptr<MaterialProperties> material_properties) : Material(material_properties) {
        m_lambda = m_material_properties->properties.at("lambda");
        m_two_mu = m_material_properties->properties.at("two_mu");
    }

    Eigen::Matrix<double, 6, 1> GetStress(const Eigen::Matrix<double, 6, 1>& green_lagrange_strain) const override {
        Eigen::Matrix<double, 6, 1> stress;
        double lambda_trace_strain = m_lambda * (green_lagrange_strain(0) + green_lagrange_strain(1) + green_lagrange_strain(2));
        stress(0) = lambda_trace_strain + m_two_mu * green_lagrange_strain(0);
        stress(1) = lambda_trace_strain + m_two_mu * green_lagrange_strain(1);
        stress(2) = lambda_trace_strain + m_two_mu * green_lagrange_strain(2);
        stress(3) = m_two_mu * green_lagrange_strain(3);
        stress(4) = m_two_mu * green_lagrange_strain(4);
        stress(5) = m_two_mu * green_lagrange_strain(5);
        return stress;
    }

    /**
     * @brief Virtual destructor for ElasticMaterial class.
     */
    virtual ~ElasticMaterial() = default;

   private:
    double m_lambda; /**< The lambda parameter of the elastic material */
    double m_two_mu; /**< The two mu parameter of the elastic material */
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
        double poissons_ratio = elastic_node["poissons_ratio"].as<double>();
        double youngs_modulus = elastic_node["youngs_modulus"].as<double>();
        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));
        return std::make_shared<ElasticMaterial>(material_properties);
    } else {
        return nullptr;
    }
}

}  // namespace aperi
