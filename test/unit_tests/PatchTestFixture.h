#pragma once
#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <cstdlib>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "Constants.h"
#include "Element.h"
#include "ElementBase.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "IoMesh.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"
#include "yaml-cpp/yaml.h"

// Fixture for patch tests
class PatchTest : public SolverTest {
   protected:
    void SetUp() override {
        // Run SolverTest::SetUp first
        SolverTest::SetUp();

        // // Set the rigid body translation, no translation by default. TODO(jake): Add rigid body translation and rotation
        // m_rigid_body_translation = {0.0, 0.0, 0.0};

        // // Set the rigid body rotation matrix, no rotation by default
        // m_rigid_body_rotation[0] = {1.0, 0.0, 0.0};
        // m_rigid_body_rotation[1] = {0.0, 1.0, 0.0};
        // m_rigid_body_rotation[2] = {0.0, 0.0, 1.0};
    }

    void TearDown() override {
        // Run SolverTest::TearDown last
        SolverTest::TearDown();
    }

    void RunFullyPrescribedBoundaryConditionProblem(const std::string& mesh_string, const std::array<double, 3>& displacement_direction, double magnitude, const std::string& first_surface_set, const std::string& second_surface_set, bool use_strain_smoothing = false, bool use_reproducing_kernel = false, bool generate_mesh = true) {
        // Create the mesh
        if (generate_mesh) {
            CreateTestMesh(mesh_string);
        } else {
            m_mesh_filename = mesh_string;
        }

        // Displacement boundary conditions
        m_yaml_data = CreateTestYaml();
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("loads");
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"].remove("initial_conditions");
        AddDisplacementBoundaryConditions(m_yaml_data, "smooth_step_function");
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["sets"][0] = first_surface_set;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["magnitude"] = -magnitude * 2.0;  // Only running half of smooth step so need to double the magnitude
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][0] = displacement_direction[0];
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][1] = displacement_direction[1];
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["vector"]["direction"][2] = displacement_direction[2];
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]["displacement"]["time_function"]["smooth_step_function"]["abscissa_values"][1] = m_final_time * 2.0;  // Half of smooth step

        // Change the final time
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["direct_time_stepper"]["time_end"] = m_final_time;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["time_stepper"]["direct_time_stepper"]["time_increment"] = 0.1;

        // Change the output time increment and final time
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["output"]["time_increment"] = m_final_time;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["output"]["time_end"] = m_final_time;

        // Deep copy the first boundary condition to create a second boundary condition
        YAML::Node second_boundary_condition = Clone(m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"][0]);
        // Change the boundary condition to apply to a different set
        second_boundary_condition["displacement"]["sets"][0] = second_surface_set;
        // Change the magnitude and direction of the second boundary condition
        second_boundary_condition["displacement"]["vector"]["magnitude"] = magnitude * 2.0;
        // Add a second boundary condition
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"].push_back(second_boundary_condition);

        // Change the young's modulus, poisson's ratio, and density
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["youngs_modulus"] = m_youngs_modulus;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["poissons_ratio"] = m_poissons_ratio;
        m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"] = 0.08;  // Each node has a mass of around 0.01

        // Add strain smoothing
        if (use_strain_smoothing) {
            // Create strain smoothing node
            YAML::Node element_smoothing_cell_node;
            element_smoothing_cell_node["subdomains"] = 1;
            YAML::Node strain_smoothing_node;
            strain_smoothing_node["element_smoothing_cell"] = element_smoothing_cell_node;
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["integration_scheme"]["strain_smoothing"] = strain_smoothing_node;
            // Remove the gauss_quadrature node
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["integration_scheme"].remove("gauss_quadrature");
        }

        // Add reproducing kernel
        if (use_reproducing_kernel) {
            // Create reproducing kernel node
            YAML::Node reproducing_kernel_node;
            reproducing_kernel_node["reproducing_kernel"]["kernel_radius_scale_factor"] = 1.1;
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["approximation_space"] = reproducing_kernel_node;
        }

        CreateInputFile();

        RunSolver();
    }

    static Eigen::Vector3d GetExpectedPositiveForces(int face_direction, double cross_section_area, const Eigen::Matrix<double, 6, 1>& expected_second_piola_kirchhoff_stress, const Eigen::Matrix3d& expected_displacement_gradient) {
        const Eigen::Matrix3d expected_deformation_gradient = expected_displacement_gradient + Eigen::Matrix3d::Identity();
        // S = P * F^-T
        // P = S F^T
        // Force = /sum_ip B P J w = /sum_ip B S F^T J w // sum over integration points, ip
        // Unit cube:
        //  Force = B S F^T
        Eigen::Vector3d expected_force;
        if (face_direction == 0) {
            expected_force(0) = expected_second_piola_kirchhoff_stress(0) * expected_deformation_gradient(0, 0) + expected_second_piola_kirchhoff_stress(5) * expected_deformation_gradient(0, 1) + expected_second_piola_kirchhoff_stress(4) * expected_deformation_gradient(0, 2);
            expected_force(1) = expected_second_piola_kirchhoff_stress(0) * expected_deformation_gradient(1, 0) + expected_second_piola_kirchhoff_stress(5) * expected_deformation_gradient(1, 1) + expected_second_piola_kirchhoff_stress(4) * expected_deformation_gradient(1, 2);
            expected_force(2) = expected_second_piola_kirchhoff_stress(0) * expected_deformation_gradient(2, 0) + expected_second_piola_kirchhoff_stress(5) * expected_deformation_gradient(2, 1) + expected_second_piola_kirchhoff_stress(4) * expected_deformation_gradient(2, 2);
        } else if (face_direction == 1) {
            expected_force(0) = expected_second_piola_kirchhoff_stress(5) * expected_deformation_gradient(0, 0) + expected_second_piola_kirchhoff_stress(1) * expected_deformation_gradient(0, 1) + expected_second_piola_kirchhoff_stress(3) * expected_deformation_gradient(0, 2);
            expected_force(1) = expected_second_piola_kirchhoff_stress(5) * expected_deformation_gradient(1, 0) + expected_second_piola_kirchhoff_stress(1) * expected_deformation_gradient(1, 1) + expected_second_piola_kirchhoff_stress(3) * expected_deformation_gradient(1, 2);
            expected_force(2) = expected_second_piola_kirchhoff_stress(5) * expected_deformation_gradient(2, 0) + expected_second_piola_kirchhoff_stress(1) * expected_deformation_gradient(2, 1) + expected_second_piola_kirchhoff_stress(3) * expected_deformation_gradient(2, 2);
        } else if (face_direction == 2) {
            expected_force(0) = expected_second_piola_kirchhoff_stress(4) * expected_deformation_gradient(0, 0) + expected_second_piola_kirchhoff_stress(3) * expected_deformation_gradient(0, 1) + expected_second_piola_kirchhoff_stress(2) * expected_deformation_gradient(0, 2);
            expected_force(1) = expected_second_piola_kirchhoff_stress(4) * expected_deformation_gradient(1, 0) + expected_second_piola_kirchhoff_stress(3) * expected_deformation_gradient(1, 1) + expected_second_piola_kirchhoff_stress(2) * expected_deformation_gradient(1, 2);
            expected_force(2) = expected_second_piola_kirchhoff_stress(4) * expected_deformation_gradient(2, 0) + expected_second_piola_kirchhoff_stress(3) * expected_deformation_gradient(2, 1) + expected_second_piola_kirchhoff_stress(2) * expected_deformation_gradient(2, 2);
        } else {
            throw std::runtime_error("Invalid face direction");
        }
        // Size multiplier due to the number of unit cubes
        expected_force *= cross_section_area;
        return expected_force;
    }

    void CheckForcesAndFields(const Eigen::Vector3d& expected_force_eig, double volume) {
        // Convert the expected force to an array
        std::array<double, 3> expected_force = {expected_force_eig(0), expected_force_eig(1), expected_force_eig(2)};

        // Get the expected negative force
        std::array<double, 3> expected_force_negative = {-expected_force[0], -expected_force[1], -expected_force[2]};

        // Check the force balance
        std::array<double, 3> expected_zero = {0.0, 0.0, 0.0};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, m_force_field_name, expected_zero, aperi::FieldQueryState::None, 1.0e-8);

        // Check the force on the first set
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, m_force_field_name, expected_force, aperi::FieldQueryState::None, 1.0e-8);

        // Check the force on the second set
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, m_force_field_name, expected_force_negative, aperi::FieldQueryState::None, 1.0e-8);

        // Check the mass
        auto density = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
        double mass = density * volume;
        std::array<double, 3> expected_mass = {mass, mass, mass};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None);

        // Check the boundary conditions
        const YAML::Node boundary_conditions = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];
        auto direction = boundary_conditions[1]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
        double magnitude = boundary_conditions[1]["displacement"]["vector"]["magnitude"].as<double>() / 2.0;  // Only running half of smooth step so actual magnitude is half
        std::array<double, 3> expected_displacement_positive = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
        // Peak velocity for a smooth step function (should be set to be the end of the simulation)
        std::array<double, 3> expected_velocity_positive = {1.875 * expected_displacement_positive[0] / m_final_time, 1.875 * expected_displacement_positive[1] / m_final_time, 1.875 * expected_displacement_positive[2] / m_final_time};
        std::array<double, 3> expected_displacement_negative = {-expected_displacement_positive[0], -expected_displacement_positive[1], -expected_displacement_positive[2]};
        std::array<double, 3> expected_velocity_negative = {-expected_velocity_positive[0], -expected_velocity_positive[1], -expected_velocity_positive[2]};

        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, m_displacement_field_name, expected_displacement_negative, aperi::FieldQueryState::None, 1.0e-9);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, m_displacement_field_name, expected_displacement_positive, aperi::FieldQueryState::None, 1.0e-9);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, m_velocity_field_name, expected_velocity_negative, aperi::FieldQueryState::None, 1.0e-4);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, m_velocity_field_name, expected_velocity_positive, aperi::FieldQueryState::None, 1.0e-4);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, m_acceleration_field_name, expected_zero, aperi::FieldQueryState::None);
    }

    Eigen::Matrix<double, 6, 1> GetExpectedSecondPiolaKirchhoffStress() {
        // 2 mu = E / (1 + nu)
        double two_mu = m_youngs_modulus / (1.0 + m_poissons_ratio);
        // lambda = E * nu / ((1 + nu) * (1 - 2 * nu))
        double lambda = m_youngs_modulus * m_poissons_ratio / ((1.0 + m_poissons_ratio) * (1.0 - 2.0 * m_poissons_ratio));

        // Compute the Green Lagrange strain tensor. TODO(jake): Get rid of this and go straight to voigt notation
        // E = 0.5 * (H + H^T + H^T * H)
        const Eigen::Matrix3d green_lagrange_strain_tensor = 0.5 * (m_displacement_gradient + m_displacement_gradient.transpose() + m_displacement_gradient.transpose() * m_displacement_gradient);
        // Green Lagrange strain tensor in voigt notation
        Eigen::Matrix<double, 6, 1> green_lagrange_strain;
        green_lagrange_strain << green_lagrange_strain_tensor(0, 0), green_lagrange_strain_tensor(1, 1), green_lagrange_strain_tensor(2, 2), green_lagrange_strain_tensor(1, 2), green_lagrange_strain_tensor(0, 2), green_lagrange_strain_tensor(0, 1);

        Eigen::Matrix<double, 6, 1> stress;
        const double lambda_trace_strain = lambda * (green_lagrange_strain(0) + green_lagrange_strain(1) + green_lagrange_strain(2));
        stress(0) = lambda_trace_strain + two_mu * green_lagrange_strain(0);
        stress(1) = lambda_trace_strain + two_mu * green_lagrange_strain(1);
        stress(2) = lambda_trace_strain + two_mu * green_lagrange_strain(2);
        stress(3) = two_mu * green_lagrange_strain(3);
        stress(4) = two_mu * green_lagrange_strain(4);
        stress(5) = two_mu * green_lagrange_strain(5);
        return stress;
    }

    void CheckPatchTestForces() {
        // Check the force balance
        std::array<double, 3> expected_zero = {0.0, 0.0, 0.0};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, m_force_field_name, expected_zero, aperi::FieldQueryState::None);

        double tolerance = 1.0e-8;  // Large tolerance due to explicit dynamics

        // Get the expected second piola kirchhoff stress
        Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = GetExpectedSecondPiolaKirchhoffStress();

        // Get the expected force in the positive x direction
        double cross_section_area = m_elements_y * m_elements_z;
        Eigen::Vector3d expected_force_positive = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        std::array<double, 3> expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        std::array<double, 3> expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, m_force_field_name, expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, m_force_field_name, expected_force_negative_array, aperi::FieldQueryState::None, tolerance);

        // Get the expected force in the positive y direction
        cross_section_area = m_elements_x * m_elements_z;
        expected_force_positive = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_3"}, m_force_field_name, expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_4"}, m_force_field_name, expected_force_negative_array, aperi::FieldQueryState::None, tolerance);

        // Get the expected force in the positive z direction
        cross_section_area = m_elements_x * m_elements_y;
        expected_force_positive = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_5"}, m_force_field_name, expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_6"}, m_force_field_name, expected_force_negative_array, aperi::FieldQueryState::None, tolerance);
    }

    void CheckPatchTest() {
        // Check the mass
        auto density = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
        double mass = density * m_elements_x * m_elements_y * m_elements_z;
        std::array<double, 3> expected_mass = {mass, mass, mass};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None);

        // Check the boundary conditions
        Eigen::Matrix3d velocity_gradient = m_displacement_gradient * 1.875 / m_final_time;  // Peak velocity for a smooth step function (should be set to be the end of the simulation)

        CheckEntityFieldPatchValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), m_acceleration_field_name, m_center_of_mass, Eigen::Matrix3d::Zero(), aperi::FieldQueryState::None);
        CheckEntityFieldPatchValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), m_displacement_field_name, m_center_of_mass, m_displacement_gradient, aperi::FieldQueryState::None, 1.0e-9);  // Large tolerance due to explicit dynamics
        CheckEntityFieldPatchValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), m_velocity_field_name, m_center_of_mass, velocity_gradient, aperi::FieldQueryState::None, 1.0e-4);            // Large tolerance due to explicit dynamics

        CheckPatchTestForces();
    }

    void SetMeshSpecs(double elements_x, double elements_y, double elements_z, bool tets = true, bool generate_mesh = true, std::string mesh_filename = "") {
        m_elements_x = elements_x;
        m_elements_y = elements_y;
        m_elements_z = elements_z;
        if (generate_mesh) {
            m_center_of_mass(0) = 0.5 * m_elements_x;
            m_center_of_mass(1) = 0.5 * m_elements_y;
            m_center_of_mass(2) = 0.5 * m_elements_z;
            m_mesh_string = std::to_string(m_elements_x) + "x" + std::to_string(m_elements_y) + "x" + std::to_string(m_elements_z) + "|sideset:xXyYzZ";
            if (tets) {
                m_mesh_string += "|tets";
            }
        } else {
            m_mesh_string = mesh_filename;
            // Assumes the center of mass is at the origin. If not, need to update the center of mass
        }
    }

    void RunTensionPatchTests(bool tets, bool strain_smoothing, bool reproducing_kernel, bool generate_mesh = true, std::string mesh_filename = "") {
        // Return if running in parallel. Need larger blocks to run in parallel and there are too many dynamic oscillations with explicit dynamics
        if (m_num_procs > 1) {
            return;
        }

        // Keep the mesh if not generating the mesh
        bool keep_mesh = !generate_mesh;

        // Set the mesh specs, 2 x 2 x 2 mesh
        SetMeshSpecs(2, 2, 2, tets, generate_mesh, mesh_filename);

        // -----------------------
        // Tension in x
        // magnitude of the displacement, both positive and negative sides
        double magnitude = 0.1;

        // Displacement boundary conditions
        std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the x faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_1", "surface_2", strain_smoothing, reproducing_kernel, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(0, 0) = 2.0 * magnitude / m_elements_x;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Tension in y

        // Displacement boundary conditions
        displacement_direction = {0.0, 1.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the y faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_3", "surface_4", strain_smoothing, reproducing_kernel, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(1, 1) = 2.0 * magnitude / m_elements_y;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Tension in z

        // Displacement boundary conditions
        displacement_direction = {0.0, 0.0, 1.0};

        // Run the problem, apply the displacement boundary conditions on the z faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_5", "surface_6", strain_smoothing, reproducing_kernel, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(2, 2) = 2.0 * magnitude / m_elements_z;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
        m_displacement_gradient = Eigen::Matrix3d::Zero();
    }

    void RunCompressionPatchTests(bool tets, bool strain_smoothing, bool reproducing_kernel, bool generate_mesh = true, std::string mesh_filename = "") {
        // Return if running in parallel. Need larger blocks to run in parallel and there are too many dynamic oscillations with explicit dynamics
        if (m_num_procs > 1) {
            return;
        }

        // Keep the mesh if not generating the mesh
        bool keep_mesh = !generate_mesh;

        // Set the mesh specs, 2 x 2 x 2 mesh
        SetMeshSpecs(2, 2, 2, tets, generate_mesh, mesh_filename);

        // -----------------------
        // Compression in x
        // magnitude of the displacement, both positive and negative sides
        double magnitude = -0.1;

        // Displacement boundary conditions
        std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the x faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_1", "surface_2", strain_smoothing, reproducing_kernel, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(0, 0) = 2.0 * magnitude / m_elements_x;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Compression in y

        // Displacement boundary conditions
        displacement_direction = {0.0, 1.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the y faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_3", "surface_4", strain_smoothing, reproducing_kernel, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(1, 1) = 2.0 * magnitude / m_elements_y;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Compression in z

        // Displacement boundary conditions
        displacement_direction = {0.0, 0.0, 1.0};

        // Run the problem, apply the displacement boundary conditions on the z faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_5", "surface_6", strain_smoothing, reproducing_kernel, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(2, 2) = 2.0 * magnitude / m_elements_z;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
        m_displacement_gradient = Eigen::Matrix3d::Zero();
    }

    void SetFieldNamesWithoutCoefficients() {
        m_displacement_field_name = "displacement";
        m_velocity_field_name = "velocity";
        m_acceleration_field_name = "acceleration";
    }

    double m_youngs_modulus = 1.0;
    double m_poissons_ratio = 0.0;
    double m_final_time = 10.0;
    double m_elements_x;
    double m_elements_y;
    double m_elements_z;
    std::string m_mesh_string;
    std::string m_force_field_name = "force_coefficients";
    std::string m_displacement_field_name = "displacement_coefficients";
    std::string m_velocity_field_name = "velocity_coefficients";
    std::string m_acceleration_field_name = "acceleration_coefficients";
    Eigen::Vector3d m_center_of_mass;
    // std::array<double, 3> m_rigid_body_translation; // TODO(jake): Implement rigid body translation
    // std::array<std::array<double, 3>, 3> m_rigid_body_rotation; // TODO(jake): Implement rigid body rotation
    Eigen::Matrix3d m_displacement_gradient = Eigen::Matrix3d::Zero();
};