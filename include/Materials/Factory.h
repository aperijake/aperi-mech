#pragma once

#include <yaml-cpp/yaml.h>

#include <memory>
#include <string>

#include "Materials/Base.h"
#include "Materials/DruckerPrager.h"
#include "Materials/Elastic.h"
#include "Materials/LinearElastic.h"
#include "Materials/NeoHooke.h"
#include "Materials/NeoHookeWithDamage.h"
#include "Materials/Plastic.h"
#include "Materials/PowerLawCreep.h"

namespace aperi {

inline void FillLinearElasticProperties(std::shared_ptr<MaterialProperties> material_properties, YAML::Node& node) {
    if (node["poissons_ratio"].IsDefined()) {
        material_properties->linear_elastic_properties.poisson_ratio = node["poissons_ratio"].as<double>();
    }
    if (node["youngs_modulus"].IsDefined()) {
        material_properties->linear_elastic_properties.youngs_modulus = node["youngs_modulus"].as<double>();
    }
    if (node["shear_modulus"].IsDefined()) {
        material_properties->linear_elastic_properties.shear_modulus = node["shear_modulus"].as<double>();
    }
    if (node["lambda"].IsDefined()) {
        material_properties->linear_elastic_properties.lambda = node["lambda"].as<double>();
    }
    if (node["bulk_modulus"].IsDefined()) {
        material_properties->linear_elastic_properties.bulk_modulus = node["bulk_modulus"].as<double>();
    }
    material_properties->linear_elastic_properties.CompleteProperties();
}

/**
 * @brief Create a material based on the given YAML node.
 * @param material_node The YAML node representing the material.
 * @return A shared pointer to the created material, or nullptr if the material type is not defined.
 */
inline std::shared_ptr<Material> CreateMaterial(YAML::Node& material_node) {
    auto material_properties = std::make_shared<MaterialProperties>();

    if (material_node["elastic"].IsDefined()) {
        YAML::Node material_model_node = material_node["elastic"];
        material_properties->material_type = MaterialType::ELASTIC;
        material_properties->density = material_model_node["density"].as<double>();
        FillLinearElasticProperties(material_properties, material_model_node);

        return std::make_shared<ElasticMaterial>(material_properties);

    } else if (material_node["linear_elastic"].IsDefined()) {
        YAML::Node material_model_node = material_node["linear_elastic"];
        material_properties->material_type = MaterialType::LINEAR_ELASTIC;
        material_properties->density = material_model_node["density"].as<double>();
        FillLinearElasticProperties(material_properties, material_model_node);

        return std::make_shared<LinearElasticMaterial>(material_properties);

    } else if (material_node["neo_hookean"].IsDefined()) {
        YAML::Node material_model_node = material_node["neo_hookean"];
        material_properties->material_type = MaterialType::NEO_HOOKEAN;
        material_properties->density = material_model_node["density"].as<double>();
        FillLinearElasticProperties(material_properties, material_model_node);

        return std::make_shared<NeoHookeanMaterial>(material_properties);

    } else if (material_node["neo_hookean_with_damage"].IsDefined()) {
        YAML::Node material_model_node = material_node["neo_hookean_with_damage"];
        material_properties->material_type = MaterialType::NEO_HOOKEAN_WITH_DAMAGE;
        material_properties->density = material_model_node["density"].as<double>();
        FillLinearElasticProperties(material_properties, material_model_node);

        double I1_critical = material_model_node["I1_critical"].as<double>();
        double I1_failure = material_model_node["I1_failure"].as<double>();
        double alpha = material_model_node["alpha"].as<double>();
        double max_effective_damage = 0.99;
        double max_damage_increment = 1.0;
        double stop_failing_at_time = -1.0;
        double fail_all_at_time = -1.0;
        if (material_model_node["maximum_damage"].IsDefined()) {
            max_effective_damage = material_model_node["maximum_damage"].as<double>();
        }
        if (material_model_node["maximum_damage_increment"].IsDefined()) {
            max_damage_increment = material_model_node["maximum_damage_increment"].as<double>();
        }
        if (material_model_node["stop_failing_at_time"].IsDefined()) {
            stop_failing_at_time = material_model_node["stop_failing_at_time"].as<double>();
        }
        if (material_model_node["fail_all_at_time"].IsDefined()) {
            fail_all_at_time = material_model_node["fail_all_at_time"].as<double>();
        }
        material_properties->properties.emplace("I1_critical", I1_critical);
        material_properties->properties.emplace("I1_failure", I1_failure);
        material_properties->properties.emplace("alpha", alpha);
        material_properties->properties.emplace("maximum_damage", max_effective_damage);
        material_properties->properties.emplace("maximum_damage_increment", max_damage_increment);
        material_properties->properties.emplace("stop_failing_at_time", stop_failing_at_time);
        material_properties->properties.emplace("fail_all_at_time", fail_all_at_time);

        return std::make_shared<NeoHookeanWithDamageMaterial>(material_properties);

    } else if (material_node["plastic"].IsDefined()) {
        YAML::Node material_model_node = material_node["plastic"];
        material_properties->material_type = MaterialType::PLASTIC;
        material_properties->density = material_model_node["density"].as<double>();
        FillLinearElasticProperties(material_properties, material_model_node);

        double yield_stress = material_model_node["yield_stress"].as<double>();
        double hardening_modulus = material_model_node["hardening_modulus"].as<double>();
        material_properties->properties.emplace("yield_stress", yield_stress);
        material_properties->properties.emplace("hardening_modulus", hardening_modulus);

        return std::make_shared<PlasticMaterial>(material_properties);

    } else if (material_node["drucker_prager"].IsDefined()) {
        YAML::Node material_model_node = material_node["drucker_prager"];
        material_properties->material_type = MaterialType::DRUCKER_PRAGER;
        material_properties->density = material_model_node["density"].as<double>();
        FillLinearElasticProperties(material_properties, material_model_node);

        double A1 = material_model_node["A1"].as<double>();
        double A2 = material_model_node["A2"].as<double>();
        double A2G = material_model_node["A2G"].as<double>();

        material_properties->properties.emplace("A1", A1);
        material_properties->properties.emplace("A2", A2);
        material_properties->properties.emplace("A2G", A2G);

        return std::make_shared<DruckerPragerMaterial>(material_properties);

    } else if (material_node["power_law_creep"].IsDefined()) {
        YAML::Node material_model_node = material_node["power_law_creep"];
        material_properties->material_type = MaterialType::POWER_LAW_CREEP;
        material_properties->density = material_model_node["density"].as<double>();
        FillLinearElasticProperties(material_properties, material_model_node);

        double A = material_model_node["A"].as<double>();
        double n = material_model_node["n"].as<double>();
        double m = material_model_node["m"].as<double>();

        material_properties->properties.emplace("A", A);
        material_properties->properties.emplace("n", n);
        material_properties->properties.emplace("m", m);
        if (material_model_node["constant_temperature"].IsDefined()) {
            material_properties->properties.emplace("constant_temperature", material_model_node["constant_temperature"].as<double>());
            material_properties->properties.emplace("use_constant_temperature", 1);
        } else {
            material_properties->properties.emplace("constant_temperature", 0.0);
            material_properties->properties.emplace("use_constant_temperature", 0);
        }

        return std::make_shared<PowerLawCreepMaterial>(material_properties);

    } else {
        return nullptr;
    }
}

}  // namespace aperi
