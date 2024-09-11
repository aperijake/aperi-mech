#pragma once

#include <yaml-cpp/yaml.h>

#include <Kokkos_Core.hpp>
#include <algorithm>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

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

KOKKOS_INLINE_FUNCTION
Kokkos::View<Eigen::Matrix<double, 3, 3>*> RunStressCalc(aperi::Material::StressFunctor* stress_functor,
                                                         const Kokkos::View<Eigen::Matrix<double, 3, 3>*> displacement_gradients,
                                                         const Kokkos::View<aperi::StressOutputType*> stress_output_type_view) {
    Kokkos::View<Eigen::Matrix<double, 3, 3>*> stress("stress", displacement_gradients.size());

    // Loop over the displacement gradients in a Kokkos parallel_for
    Kokkos::parallel_for(
        "CalculateStress", displacement_gradients.size(), KOKKOS_LAMBDA(const size_t i) {
        auto stress_output_type = stress_output_type_view(0);
        // Get the displacement gradient
        Eigen::Matrix<double, 3, 3> displacement_gradient = displacement_gradients(i);

        // Run the stress calculation
        Eigen::Matrix<double, 3, 3> pk1_stress = stress_functor->operator()(displacement_gradient);  // First Piola-Kirchhoff stress

        // Convert the stress to the desired output type
        if (stress_output_type == aperi::StressOutputType::SECOND_PIOLA_KIRCHHOFF) {
            // Convert first Piola-Kirchhoff stress to second Piola-Kirchhoff stress
            Eigen::Matrix<double, 3, 3> deformation_gradient = displacement_gradient + Eigen::Matrix<double, 3, 3>::Identity();
            stress(i) = deformation_gradient.inverse() * pk1_stress;
        } else if (stress_output_type == aperi::StressOutputType::CAUCHY) {
            // Convert first Piola-Kirchhoff stress to Cauchy stress
            Eigen::Matrix<double, 3, 3> deformation_gradient = displacement_gradient + Eigen::Matrix<double, 3, 3>::Identity();
            double J = deformation_gradient.determinant();
            stress(i) = pk1_stress * deformation_gradient.transpose() / J;
        } else if (stress_output_type == aperi::StressOutputType::FIRST_PIOLA_KIRCHHOFF) {
            // Return the first Piola-Kirchhoff stress
            stress(i) = pk1_stress;
        } else {
            aperi::CerrP0() << "Invalid stress output type\n";
            return;
        } });
    return stress;
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

    // Create a Kokkos view of the displacement gradients
    Kokkos::View<Eigen::Matrix<double, 3, 3>*> displacement_gradients("displacement_gradients", displacement_gradients_node.size());

    // Create a host mirror of the Kokkos view
    auto displacement_gradients_host = Kokkos::create_mirror_view(displacement_gradients);

    // Loop over the displacement gradients
    size_t i = 0;
    for (YAML::const_iterator it = displacement_gradients_node.begin(); it != displacement_gradients_node.end(); ++it) {
        // Get the matrix node from the displacement gradient node
        YAML::Node matrix_node = it->as<YAML::Node>();

        // Create a displacement gradient matrix from the matrix node
        Eigen::Matrix<double, 3, 3> displacement_gradient = aperi::CreateMatrix(matrix_node);

        // Store the displacement gradient in the Kokkos view
        displacement_gradients_host(i) = displacement_gradient;
        ++i;
    }

    // Deep copy the host mirror to the device view
    Kokkos::deep_copy(displacement_gradients, displacement_gradients_host);

    // Set the stress output
    Kokkos::View<aperi::StressOutputType*> stress_output_type_device("stress_output_type", 1);

    // Create a host mirror of the Kokkos view
    auto stress_output_type_host = Kokkos::create_mirror_view(stress_output_type_device);

    // Set the stress output type
    stress_output_type_host(0) = stress_output_type;

    // Deep copy the host mirror to the device view
    Kokkos::deep_copy(stress_output_type_device, stress_output_type_host);

    // Create a material object from the material node
    std::shared_ptr<aperi::Material> material = aperi::CreateMaterial(material_node);

    // Get the stress calc functor from the material object
    aperi::Material::StressFunctor* stress_functor = material->GetStressFunctor();

    // Run the stress calculation
    Kokkos::View<Eigen::Matrix<double, 3, 3>*> stress = RunStressCalc(stress_functor, displacement_gradients, stress_output_type_device);

    // Create a host mirror of the Kokkos view
    auto stress_host = Kokkos::create_mirror_view(stress);

    // Deep copy the device view to the host mirror
    Kokkos::deep_copy(stress_host, stress);

    // Initialize the stress vector. TODO(jake): Get rid of the extra copy?
    std::vector<Eigen::Matrix3d> stresses(displacement_gradients_node.size());

    // Print the stresses
    for (size_t i = 0; i < stress_host.size(); ++i) {
        stresses[i] = stress_host(i);
        aperi::CoutP0() << std::scientific << std::setprecision(12)
                        << stresses[i](0, 0) << " " << stresses[i](0, 1) << " " << stresses[i](0, 2) << " "
                        << stresses[i](1, 0) << " " << stresses[i](1, 1) << " " << stresses[i](1, 2) << " "
                        << stresses[i](2, 0) << " " << stresses[i](2, 1) << " " << stresses[i](2, 2) << std::endl;
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
