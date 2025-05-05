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

    } else if (material_node["linear_elastic"].IsDefined()) {
        YAML::Node elastic_node = material_node["linear_elastic"];
        material_properties->material_type = MaterialType::LINEAR_ELASTIC;
        material_properties->density = elastic_node["density"].as<double>();
        double poissons_ratio = elastic_node["poissons_ratio"].as<double>();
        double youngs_modulus = elastic_node["youngs_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        return std::make_shared<LinearElasticMaterial>(material_properties);

    } else if (material_node["neo_hookean"].IsDefined()) {
        YAML::Node neo_hookean_node = material_node["neo_hookean"];
        material_properties->material_type = MaterialType::NEO_HOOKEAN;
        material_properties->density = neo_hookean_node["density"].as<double>();
        double poissons_ratio = neo_hookean_node["poissons_ratio"].as<double>();
        double youngs_modulus = neo_hookean_node["youngs_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        return std::make_shared<NeoHookeanMaterial>(material_properties);

    } else if (material_node["neo_hookean_with_damage"].IsDefined()) {
        YAML::Node neo_hookean_node = material_node["neo_hookean_with_damage"];
        material_properties->material_type = MaterialType::NEO_HOOKEAN_WITH_DAMAGE;
        material_properties->density = neo_hookean_node["density"].as<double>();
        double poissons_ratio = neo_hookean_node["poissons_ratio"].as<double>();
        double youngs_modulus = neo_hookean_node["youngs_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        double I1_critical = neo_hookean_node["I1_critical"].as<double>();
        double beta = neo_hookean_node["beta"].as<double>();
        material_properties->properties.emplace("I1_critical", I1_critical);
        material_properties->properties.emplace("beta", beta);

        return std::make_shared<NeoHookeanWithDamageMaterial>(material_properties);

    } else if (material_node["plastic"].IsDefined()) {
        YAML::Node plastic_node = material_node["plastic"];
        material_properties->material_type = MaterialType::PLASTIC;
        material_properties->density = plastic_node["density"].as<double>();
        double poissons_ratio = plastic_node["poissons_ratio"].as<double>();
        double youngs_modulus = plastic_node["youngs_modulus"].as<double>();
        double yield_stress = plastic_node["yield_stress"].as<double>();
        double hardening_modulus = plastic_node["hardening_modulus"].as<double>();

        material_properties->properties.emplace("poissons_ratio", poissons_ratio);
        material_properties->properties.emplace("youngs_modulus", youngs_modulus);
        material_properties->properties.emplace("yield_stress", yield_stress);
        material_properties->properties.emplace("hardening_modulus", hardening_modulus);
        // 2 mu = E / (1 + nu)
        material_properties->properties.emplace("two_mu", youngs_modulus / (1.0 + poissons_ratio));
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        material_properties->properties.emplace("lambda", youngs_modulus * poissons_ratio / ((1.0 + poissons_ratio) * (1.0 - 2.0 * poissons_ratio)));

        return std::make_shared<PlasticMaterial>(material_properties);

    } else if (material_node["drucker_prager"].IsDefined()) {
        YAML::Node dp_node = material_node["drucker_prager"];
        material_properties->material_type = MaterialType::DRUCKER_PRAGER;
        material_properties->density = dp_node["density"].as<double>();
        double bulk_modulus = dp_node["bulk_modulus"].as<double>();
        double shear_modulus = dp_node["shear_modulus"].as<double>();
        double A1 = dp_node["A1"].as<double>();
        double A2 = dp_node["A2"].as<double>();
        double A2G = dp_node["A2G"].as<double>();

        material_properties->properties.emplace("bulk_modulus", bulk_modulus);
        material_properties->properties.emplace("shear_modulus", shear_modulus);
        material_properties->properties.emplace("A1", A1);
        material_properties->properties.emplace("A2", A2);
        material_properties->properties.emplace("A2G", A2G);
        return std::make_shared<DruckerPragerMaterial>(material_properties);

    } else if (material_node["power_law_creep"].IsDefined()) {
        YAML::Node dp_node = material_node["power_law_creep"];
        material_properties->material_type = MaterialType::POWER_LAW_CREEP;
        material_properties->density = dp_node["density"].as<double>();
        double bulk_modulus = dp_node["bulk_modulus"].as<double>();
        double shear_modulus = dp_node["shear_modulus"].as<double>();
        double A = dp_node["A"].as<double>();
        double n = dp_node["n"].as<double>();
        double m = dp_node["m"].as<double>();

        material_properties->properties.emplace("bulk_modulus", bulk_modulus);
        material_properties->properties.emplace("shear_modulus", shear_modulus);
        material_properties->properties.emplace("A", A);
        material_properties->properties.emplace("n", n);
        material_properties->properties.emplace("m", m);
        if (dp_node["constant_temperature"].IsDefined()) {
            material_properties->properties.emplace("constant_temperature", dp_node["constant_temperature"].as<double>());
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
