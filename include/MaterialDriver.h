#pragma once

#include <yaml-cpp/yaml.h>

#include <Kokkos_Core.hpp>
#include <algorithm>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

#include "LogUtils.h"
#include "Materials/Base.h"
#include "Materials/Factory.h"
#include "MathUtils.h"

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
                                                         const Kokkos::View<aperi::StressOutputType*> stress_output_type_view,
                                                         double timestep,
                                                         const Kokkos::View<Eigen::Matrix<double, 3, 3>*> displacement_gradients,
                                                         const Kokkos::View<Eigen::Matrix<double, 3, 3>*> initial_displacement_gradient,
                                                         size_t num_state_variables,
                                                         Kokkos::View<double*> state_n) {
    // Set up the stress output
    Kokkos::View<Eigen::Matrix<double, 3, 3>*> stress("stress", displacement_gradients.size());

    // Set the new state
    Kokkos::View<double*> state_np1("state_np1", num_state_variables);

    // Loop over the displacement gradients in a Kokkos parallel_for, but do it serially so the state history is correct
    Kokkos::parallel_for(
        "CalculateStress", Kokkos::TeamPolicy<Kokkos::DefaultExecutionSpace>(displacement_gradients.size(), 1, 1), KOKKOS_LAMBDA(const Kokkos::TeamPolicy<>::member_type& team) {
        const int i = team.league_rank();

        auto stress_output_type = stress_output_type_view(0);

        // Default stride for Eigen::Matrix<double, 3, 3>
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(3, 1);

        // Get the displacement gradient
        Eigen::Matrix<double, 3, 3> displacement_gradient_np1 = displacement_gradients(i);
        auto displacement_gradient_map = Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(displacement_gradient_np1.data(), stride);

        // Get the previous displacement gradient
        Eigen::Matrix<double, 3, 3> displacement_gradient_n = i == 0 ? initial_displacement_gradient(0) : displacement_gradients(i-1);

        // Compute the velocity gradient. (F_n+1 - F_n) / dt * F_n_inv
        Eigen::Matrix<double, 3, 3> velocity_gradient = (displacement_gradient_np1 - displacement_gradient_n) / timestep * InvertMatrix<3>(displacement_gradient_n + Eigen::Matrix3d::Identity());
        auto velocity_gradient_map = Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(velocity_gradient.data(), stride);

        // Set up the pk1 stress map
        Eigen::Matrix<double, 3, 3> pk1_stress_np1;
        Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>> pk1_stress_map(pk1_stress_np1.data(), stride);

        // Set up the state maps
        Eigen::InnerStride<Eigen::Dynamic> state_stride(1);
        const auto state_n_map = Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_n.data(), num_state_variables, state_stride);
        auto state_np1_map = Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_np1.data(), num_state_variables, state_stride);

        // Run the stress calculation. TODO(jake) need to plumb in old stress for some materials
        stress_functor->GetStress(&displacement_gradient_map, &velocity_gradient_map, &state_n_map, &state_np1_map, timestep, nullptr, pk1_stress_map);

        // Manually copy the new state to the old state for the next iteration (deep_copy was freezing)
        for (size_t j = 0; j < num_state_variables; ++j) {
            state_n(j) = state_np1(j);
        }

        // Convert the stress to the desired output type
        if (stress_output_type == aperi::StressOutputType::SECOND_PIOLA_KIRCHHOFF) {
            // Convert first Piola-Kirchhoff stress to second Piola-Kirchhoff stress
            Eigen::Matrix<double, 3, 3> deformation_gradient = displacement_gradient_np1 + Eigen::Matrix<double, 3, 3>::Identity();
            stress(i) = deformation_gradient.inverse() * pk1_stress_np1;
        } else if (stress_output_type == aperi::StressOutputType::CAUCHY) {
            // Convert first Piola-Kirchhoff stress to Cauchy stress
            Eigen::Matrix<double, 3, 3> deformation_gradient = displacement_gradient_np1 + Eigen::Matrix<double, 3, 3>::Identity();
            double J = deformation_gradient.determinant();
            stress(i) = pk1_stress_np1 * deformation_gradient.transpose() / J;
        } else if (stress_output_type == aperi::StressOutputType::FIRST_PIOLA_KIRCHHOFF) {
            // Return the first Piola-Kirchhoff stress
            stress(i) = pk1_stress_np1;
        } else {
            Kokkos::printf("Invalid stress output type\n");
            return;
        } });
    return stress;
}

std::vector<Eigen::Matrix3d> RunMaterialDriver(YAML::Node input_node) {
    // Get the data from the input file
    YAML::Node material_node;
    YAML::Node displacement_gradients_node;
    aperi::StressOutputType stress_output_type = aperi::StressOutputType::CAUCHY;

    // Default timestep
    double timestep = 1.0;

    // Default initial displacement gradient
    Eigen::Matrix3d initial_displacement_gradient_mat = Eigen::Matrix3d::Zero();

    // Default to no state variables
    size_t num_state_variables = 0;
    Kokkos::View<double*> initial_state;

    // Error stream for logging
    aperi::CerrP0 error_stream;

    try {
        // Get the material node from the input file
        if (!input_node["material"]) {
            error_stream << "Material node not found in the input file\n";
            return {};
        }
        material_node = input_node["material"];

        // Get the timestep from the input file if it exists
        if (input_node["timestep"]) {
            timestep = input_node["timestep"].as<double>();
        }

        // Get the displacement gradients node from the input file
        if (!input_node["displacement_gradients"]) {
            error_stream << "Displacement gradients node not found in the input file\n";
            return {};
        }
        displacement_gradients_node = input_node["displacement_gradients"];

        // Get the initial displacement gradients node from the input file if it exists
        if (input_node["initial_displacement_gradient"]) {
            initial_displacement_gradient_mat = aperi::CreateMatrix(input_node["initial_displacement_gradient"]);
        }

        // Get the initial state from the input file if it exists
        if (input_node["initial_state"]) {
            std::vector<double> initial_state_vec = input_node["initial_state"].as<std::vector<double>>();
            num_state_variables = initial_state_vec.size();
            initial_state = Kokkos::View<double*>("state_n", num_state_variables);

            // Create a host mirror of the Kokkos view
            auto initial_state_host = Kokkos::create_mirror_view(initial_state);

            // Copy data from the vector to the host mirror
            for (size_t i = 0; i < initial_state_vec.size(); ++i) {
                initial_state_host(i) = initial_state_vec[i];
            }

            // Deep copy the host mirror to the device view
            Kokkos::deep_copy(initial_state, initial_state_host);
        }

        // Get the stress output type from the input file if it exists
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
                error_stream << "Invalid stress output type: " << stress_output_type_str << "\n";
                error_stream << "Valid options are: FIRST_PIOLA_KIRCHHOFF, SECOND_PIOLA_KIRCHHOFF, CAUCHY\n";
                return {};
            }
        }

        // Further processing...
    } catch (const YAML::Exception& e) {
        error_stream << "Error parsing YAML file: " << e.what() << "\n";
    }

    // Create a Kokkos views of the displacement gradients
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

    // Set the initial displacement gradient
    Kokkos::View<Eigen::Matrix<double, 3, 3>*> initial_displacement_gradient("initial_displacement_gradient", 1);
    Kokkos::deep_copy(initial_displacement_gradient, initial_displacement_gradient_mat);

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
    Kokkos::View<Eigen::Matrix<double, 3, 3>*> stress = RunStressCalc(stress_functor, stress_output_type_device, timestep, displacement_gradients, initial_displacement_gradient, num_state_variables, initial_state);

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
