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

enum PatchTestIntegrationScheme { GAUSS_QUADRATURE,
                                  ELEMENT_STRAIN_SMOOTHING,
                                  NODAL_STRAIN_SMOOTHING,
                                  ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS,
                                  NODAL_STRAIN_SMOOTHING_FORCE_TWO_PASS };

inline bool SkipTest() {
    bool skip = false;
    // Skip if running on GPU and in Release mode
    // TODO(jake): Get rid of this when we can. It is only here because of some strange compiling issues that lead to a segfault.
    // As with ShapeFunctionsFunctorReproducingKernel, a segfault on the GPU in Release mode, but works fine in Debug mode or on the CPU.
    // Spent a lot of time trying to figure out why, but couldn't find the issue.
#ifdef NDEBUG
    bool using_gpu = Kokkos::DefaultExecutionSpace::concurrency() > 1;
    if (using_gpu) {
        skip = true;
    }
#endif
    return skip;
}

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

    void RunFullyPrescribedBoundaryConditionProblem(const std::string& mesh_string, const std::array<double, 3>& displacement_direction, double magnitude, const std::string& first_surface_set, const std::string& second_surface_set, const PatchTestIntegrationScheme& integration_scheme = PatchTestIntegrationScheme::GAUSS_QUADRATURE, bool use_reproducing_kernel = false, aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total, bool generate_mesh = true, int num_subcells = 1) {
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
        if (integration_scheme != PatchTestIntegrationScheme::GAUSS_QUADRATURE) {
            // Create strain smoothing node
            YAML::Node element_smoothing_cell_node;
            element_smoothing_cell_node["subdomains"] = num_subcells;
            YAML::Node strain_smoothing_node;
            if (integration_scheme == PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING) {
                strain_smoothing_node["element_smoothing_cell"] = element_smoothing_cell_node;
            } else if (integration_scheme == PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS) {
                strain_smoothing_node["element_smoothing_cell"] = element_smoothing_cell_node;
                strain_smoothing_node["force_one_pass_method"] = true;
            } else if (integration_scheme == PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING) {
                strain_smoothing_node["nodal_smoothing_cell"] = element_smoothing_cell_node;
            } else if (integration_scheme == PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING_FORCE_TWO_PASS) {
                strain_smoothing_node["nodal_smoothing_cell"] = element_smoothing_cell_node;
                strain_smoothing_node["force_two_pass_method"] = true;
            } else {
                throw std::runtime_error("Invalid integration scheme");
            }
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

        // Add formulation type
        if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated) {
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["lagrangian_formulation"]["updated"] = YAML::Node();
        } else if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["lagrangian_formulation"]["semi"]["update_interval"] = 2;
        }

        CreateInputFile();

        RunSolver();
        m_displacement_gradient = Eigen::Matrix3d::Zero();
    }

    Eigen::Matrix3d GetExpectedFirstPKStress(const Eigen::Matrix3d& expected_displacement_gradient) {
        // Calculate the expected deformation gradient
        const Eigen::Matrix3d expected_deformation_gradient = expected_displacement_gradient + Eigen::Matrix3d::Identity();

        // Calculate the expected Green-Lagrange strain
        const Eigen::Matrix3d expected_green_lagrange_strain = 0.5 * (expected_deformation_gradient.transpose() * expected_deformation_gradient - Eigen::Matrix3d::Identity());

        // Calculate the expected Lame parameters
        const double lambda = m_youngs_modulus * m_poissons_ratio / ((1.0 + m_poissons_ratio) * (1.0 - 2.0 * m_poissons_ratio));
        const double mu = m_youngs_modulus / (2.0 * (1.0 + m_poissons_ratio));

        // Calculate the expected PK2 stress
        const Eigen::Matrix<double, 3, 3> expected_pk2_stress = lambda * expected_green_lagrange_strain.trace() * Eigen::Matrix3d::Identity() + 2.0 * mu * expected_green_lagrange_strain;

        // Calculate the expected first PK stress
        return expected_deformation_gradient * expected_pk2_stress;
    }

    Eigen::Vector3d GetExpectedPositiveForces(int face_direction, double cross_section_area, const Eigen::Matrix3d& expected_displacement_gradient) {
        // P = F S
        // Force = /sum_ip B P J w = /sum_ip B F S J w // sum over integration points, ip
        // Unit cube:
        //  Force = B F S

        // Set the normal vector for the face
        Eigen::Vector3d normal_vector = Eigen::Vector3d::Zero();
        normal_vector(face_direction) = 1.0;

        // Calculate the expected force in the reference configuration
        Eigen::Vector3d expected_force = GetExpectedFirstPKStress(expected_displacement_gradient) * normal_vector * cross_section_area;

        return expected_force;
    }

    void CheckMass(const double volume, const std::vector<std::string>& set_names = {}) {
        // Check the mass
        auto density = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
        double mass = density * volume;
        std::array<double, 3> expected_mass = {mass, mass, mass};
        // Check the mass
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None, 1.0e-12);
    }

    void CheckDisplacementGradient(const Eigen::Matrix3d& expected_displacement_gradient, const std::vector<std::string>& set_names = {}) {
        // Convert the expected displacement gradient to an array
        std::array<double, 9> expected_displacement_gradient_array = {expected_displacement_gradient(0, 0), expected_displacement_gradient(0, 1), expected_displacement_gradient(0, 2), expected_displacement_gradient(1, 0), expected_displacement_gradient(1, 1), expected_displacement_gradient(1, 2), expected_displacement_gradient(2, 0), expected_displacement_gradient(2, 1), expected_displacement_gradient(2, 2)};
        // Check the displacement gradient
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT>(*m_solver->GetMeshData(), set_names, m_displacement_gradient_field_name, expected_displacement_gradient_array, aperi::FieldQueryState::None, 1.0e-9);
    }

    void CheckStress(const Eigen::Matrix3d& expected_pk1_stress, const std::vector<std::string>& set_names = {}) {
        // Put into an array for comparison, row major
        std::array<double, 9> expected_pk1_stress_array = {expected_pk1_stress(0, 0), expected_pk1_stress(0, 1), expected_pk1_stress(0, 2), expected_pk1_stress(1, 0), expected_pk1_stress(1, 1), expected_pk1_stress(1, 2), expected_pk1_stress(2, 0), expected_pk1_stress(2, 1), expected_pk1_stress(2, 2)};

        CheckEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT>(*m_solver->GetMeshData(), set_names, m_pk1_stress_field_name, expected_pk1_stress_array, aperi::FieldQueryState::None, 1.0e-8);
    }

    void CheckForceSum(const Eigen::Vector3d& expected_force, const std::vector<std::string>& set_names = {}) {
        // Convert the expected force to an array
        std::array<double, 3> expected_force_array = {expected_force(0), expected_force(1), expected_force(2)};

        // Check the force on the surface
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), set_names, m_force_field_name, expected_force_array, aperi::FieldQueryState::None, 1.0e-8);
    }

    void CheckDisplacement(const Eigen::Vector3d& expected_displacement, const std::vector<std::string>& set_names = {}) {
        // Convert the expected displacement to an array
        std::array<double, 3> expected_displacement_array = {expected_displacement(0), expected_displacement(1), expected_displacement(2)};

        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), set_names, m_displacement_field_name, expected_displacement_array, aperi::FieldQueryState::None, 1.0e-9);
    }

    void CheckVelocity(const Eigen::Vector3d& expected_velocity, const std::vector<std::string>& set_names = {}) {
        // Convert the expected velocity to an array
        std::array<double, 3> expected_velocity_array = {expected_velocity(0), expected_velocity(1), expected_velocity(2)};

        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), set_names, m_velocity_field_name, expected_velocity_array, aperi::FieldQueryState::None, 1.0e-4);
    }

    void CheckAcceleration(const Eigen::Vector3d& expected_acceleration, const std::vector<std::string>& set_names = {}) {
        // Convert the expected acceleration to an array
        std::array<double, 3> expected_acceleration_array = {expected_acceleration(0), expected_acceleration(1), expected_acceleration(2)};

        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), set_names, m_acceleration_field_name, expected_acceleration_array, aperi::FieldQueryState::None);
    }

    void CheckPatchTestForces() {
        // Check the force balance
        std::array<double, 3> expected_zero = {0.0, 0.0, 0.0};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, m_force_field_name, expected_zero, aperi::FieldQueryState::None, 1.0e-12);

        double tolerance = 1.0e-8;  // Large tolerance due to explicit dynamics

        // Get the expected force in the positive x direction
        double cross_section_area = m_elements_y * m_elements_z;
        Eigen::Vector3d expected_force_positive = GetExpectedPositiveForces(0, cross_section_area, m_displacement_gradient);
        // Put into an array for comparison
        std::array<double, 3> expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        std::array<double, 3> expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, m_force_field_name, expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, m_force_field_name, expected_force_negative_array, aperi::FieldQueryState::None, tolerance);

        // Get the expected force in the positive y direction
        cross_section_area = m_elements_x * m_elements_z;
        expected_force_positive = GetExpectedPositiveForces(1, cross_section_area, m_displacement_gradient);
        // Put into an array for comparison
        expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_3"}, m_force_field_name, expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_4"}, m_force_field_name, expected_force_negative_array, aperi::FieldQueryState::None, tolerance);

        // Get the expected force in the positive z direction
        cross_section_area = m_elements_x * m_elements_y;
        expected_force_positive = GetExpectedPositiveForces(2, cross_section_area, m_displacement_gradient);
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
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None, 1.0e-12);

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

    void RunTensionPatchTests(bool tets, PatchTestIntegrationScheme integration_scheme, bool reproducing_kernel, aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total, bool generate_mesh = true, std::string mesh_filename = "") {
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
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_1", "surface_2", integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(0, 0) = 2.0 * magnitude / m_elements_x;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);

        // -----------------------
        // Tension in y

        // Displacement boundary conditions
        displacement_direction = {0.0, 1.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the y faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_3", "surface_4", integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(1, 1) = 2.0 * magnitude / m_elements_y;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);

        // -----------------------
        // Tension in z

        // Displacement boundary conditions
        displacement_direction = {0.0, 0.0, 1.0};

        // Run the problem, apply the displacement boundary conditions on the z faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_5", "surface_6", integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(2, 2) = 2.0 * magnitude / m_elements_z;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
    }

    void RunCompressionPatchTests(bool tets, PatchTestIntegrationScheme integration_scheme, bool reproducing_kernel, aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total, bool generate_mesh = true, std::string mesh_filename = "") {
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
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_1", "surface_2", integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(0, 0) = 2.0 * magnitude / m_elements_x;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);

        // -----------------------
        // Compression in y

        // Displacement boundary conditions
        displacement_direction = {0.0, 1.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the y faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_3", "surface_4", integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(1, 1) = 2.0 * magnitude / m_elements_y;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);

        // -----------------------
        // Compression in z

        // Displacement boundary conditions
        displacement_direction = {0.0, 0.0, 1.0};

        // Run the problem, apply the displacement boundary conditions on the z faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_5", "surface_6", integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh);

        // Set the deformation gradient
        m_displacement_gradient(2, 2) = 2.0 * magnitude / m_elements_z;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest(keep_mesh);
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
    std::string m_displacement_gradient_field_name = "displacement_gradient";
    std::string m_pk1_stress_field_name = "pk1_stress";
    std::string m_velocity_field_name = "velocity_coefficients";
    std::string m_acceleration_field_name = "acceleration_coefficients";
    Eigen::Vector3d m_center_of_mass = Eigen::Vector3d::Zero();
    // std::array<double, 3> m_rigid_body_translation; // TODO(jake): Implement rigid body translation
    // std::array<std::array<double, 3>, 3> m_rigid_body_rotation; // TODO(jake): Implement rigid body rotation
    Eigen::Matrix3d m_displacement_gradient = Eigen::Matrix3d::Zero();
};
