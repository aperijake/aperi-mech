#include <yaml-cpp/yaml.h>

#include <algorithm>
#include <iostream>
#include <iomanip>
#include <string>

#include "LogUtils.h"
#include "Material.h"

namespace aperi {

enum class StressOutputType {
    FIRST_PIOLA_KIRCHHOFF,
    SECOND_PIOLA_KIRCHHOFF,
    CAUCHY
};

Eigen::Matrix<double, 3, 3> CreateMatrix(const YAML::Node& input_node) {
    // Grab the matrix node, check if it exists and is a sequence of 3 elements
    if (!input_node["matrix"]) {
        throw std::runtime_error("CreateMatrix: Expected a matrix node.");
    }
    const YAML::Node& matrix_node = input_node["matrix"];

    if (!matrix_node.IsSequence() || matrix_node.size() != 3) {
        throw std::runtime_error("CreateMatrix: Expected a sequence of 3 elements for the matrix.");
    }

    Eigen::Matrix<double, 3, 3> matrix;
    for (int i = 0; i < 3; ++i) {
        const YAML::Node& row_node = matrix_node[i];
        if (!row_node.IsSequence() || row_node.size() != 3) {
            throw std::runtime_error("CreateMatrix: Expected each row to be a sequence of 3 elements.");
        }
        for (int j = 0; j < 3; ++j) {
            if (!row_node[j]) {
                throw std::runtime_error("CreateMatrix: Invalid node at matrix[" + std::to_string(i) + "][" + std::to_string(j) + "].");
            }
            matrix(i, j) = row_node[j].as<double>();
        }
    }
    return matrix;
}

std::vector<Eigen::Matrix3d> RunMaterialDriver(YAML::Node input_node) {
    // Get the data from the input file
    YAML::Node material_node;
    YAML::Node displacement_gradients_node;
    aperi::StressOutputType stress_output_type = aperi::StressOutputType::CAUCHY;
    try {
        if (!input_node["material"]) {
            aperi::CerrP0() << "Material node not found in the input file\n";
            return {};
        }
        material_node = input_node["material"];

        if (!input_node["displacement_gradients"]) {
            aperi::CerrP0() << "Displacement gradients node not found in the input file\n";
            return {};
        }
        displacement_gradients_node = input_node["displacement_gradients"];

        if (input_node["stress_output"]) {
            std::string stress_output_type_str = input_node["stress_output"].as<std::string>();
            std::transform(stress_output_type_str.begin(), stress_output_type_str.end(), stress_output_type_str.begin(), ::toupper);
            if (stress_output_type_str == "FIRST_PIOLA_KIRCHHOFF") {
                stress_output_type = aperi::StressOutputType::FIRST_PIOLA_KIRCHHOFF;
            } else if (stress_output_type_str == "SECOND_PIOLA_KIRCHHOFF") {
                stress_output_type = aperi::StressOutputType::SECOND_PIOLA_KIRCHHOFF;
            } else if (stress_output_type_str == "CAUCHY") {
                stress_output_type = aperi::StressOutputType::CAUCHY;
            } else {
                aperi::CerrP0() << "Invalid stress output type: " << stress_output_type_str << "\n";
                aperi::CerrP0() << "Valid options are: FIRST_PIOLA_KIRCHHOFF, SECOND_PIOLA_KIRCHHOFF, CAUCHY\n";
                return {};
            }
        }

        // Further processing...
    } catch (const YAML::Exception& e) {
        aperi::CerrP0() << "Error parsing YAML file: " << e.what() << "\n";
    }

    // Create a material object from the material node
    std::shared_ptr<aperi::Material> material = aperi::CreateMaterial(material_node);

    // Get the stress calc functor from the material object
    aperi::Material::StressFunctor* stress_functor = material->GetStressFunctor();

    // Initialize the stress vector
    std::vector<Eigen::Matrix3d> stresses(displacement_gradients_node.size());

    // Loop over the displacement gradients
    size_t i = 0;
    for (YAML::const_iterator it = displacement_gradients_node.begin(); it != displacement_gradients_node.end(); ++it) {
        // Get the matrix node from the displacement gradient node
        YAML::Node matrix_node = it->as<YAML::Node>();

        // Create a displacement gradient matrix from the matrix node
        Eigen::Matrix<double, 3, 3> displacement_gradient = aperi::CreateMatrix(matrix_node);

        // Run the stress calculation
        Eigen::Matrix<double, 3, 3> stress = stress_functor->operator()(displacement_gradient);  // First Piola-Kirchhoff stress

        if (stress_output_type == aperi::StressOutputType::SECOND_PIOLA_KIRCHHOFF) {
            // Convert first Piola-Kirchhoff stress to second Piola-Kirchhoff stress
            Eigen::Matrix<double, 3, 3> deformation_gradient = displacement_gradient + Eigen::Matrix<double, 3, 3>::Identity();
            stress = deformation_gradient.inverse() * stress;
        } else if (stress_output_type == aperi::StressOutputType::CAUCHY) {
            // Convert first Piola-Kirchhoff stress to Cauchy stress
            Eigen::Matrix<double, 3, 3> deformation_gradient = displacement_gradient + Eigen::Matrix<double, 3, 3>::Identity();
            double J = deformation_gradient.determinant();
            stress = stress * deformation_gradient.transpose() / J;
        } else if (stress_output_type != aperi::StressOutputType::FIRST_PIOLA_KIRCHHOFF) {
            aperi::CerrP0() << "Invalid stress output type\n";
            return {};
        }
        aperi::CoutP0() << std::scientific << std::setprecision(12)
                        << stress(0, 0) << " " << stress(0, 1) << " " << stress(0, 2) << " "
                        << stress(1, 0) << " " << stress(1, 1) << " " << stress(1, 2) << " "
                        << stress(2, 0) << " " << stress(2, 1) << " " << stress(2, 2) << std::endl;

        stresses[i] = stress;
        ++i;
    }

    return stresses;
}

std::vector<Eigen::Matrix3d> RunMaterialDriver(const std::string& input_filename) {
    YAML::Node input_node;
    try {
        input_node = YAML::LoadFile(input_filename);
    } catch (const YAML::Exception& e) {
        aperi::CerrP0() << "Error parsing YAML file: " << e.what() << "\n";
    }
    return RunMaterialDriver(input_node);
}

}  // namespace aperi