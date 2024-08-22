#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <cstdlib>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ApplicationTestFixture.h"
#include "Constants.h"
#include "Element.h"
#include "ElementBase.h"
#include "EntityProcessor.h"
#include "FieldData.h"
#include "IoMesh.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"
#include "ShapeFunctionsFunctorTet4.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"
#include "yaml-cpp/yaml.h"

class ElementStrainSmoothingTest : public ::testing::Test {
   protected:
    // Run the strain smoothed formulation
    void RunStrainSmoothedFormulation(int num_elems_z, const std::shared_ptr<aperi::ApproximationSpaceParameters>& approximation_space_parameters) {
        // Make a mesh
        aperi::IoMeshParameters io_mesh_parameters;
        io_mesh_parameters.mesh_type = "generated";
        io_mesh_parameters.compose_output = true;
        m_io_mesh = CreateIoMesh(MPI_COMM_WORLD, io_mesh_parameters);
        bool uses_generalized_fields = approximation_space_parameters->UsesGeneralizedFields();
        bool use_strain_smoothing = true;
        std::vector<aperi::FieldData> field_data = aperi::GetFieldData(uses_generalized_fields, use_strain_smoothing);
        m_io_mesh->ReadMesh("1x1x" + std::to_string(num_elems_z) + "|tets", {"block_1"});
        m_io_mesh->AddFields(field_data);
        m_io_mesh->CompleteInitialization();
        std::shared_ptr<aperi::MeshData> mesh_data = m_io_mesh->GetMeshData();

        // Make an element processor
        std::vector<aperi::FieldQueryData<double>> field_query_data_gather_vec(3);  // not used, but needed for the constructor. TODO(jake) change this?
        field_query_data_gather_vec[0] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
        field_query_data_gather_vec[1] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
        field_query_data_gather_vec[2] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
        const std::vector<std::string> part_names = {"block_1"};

        // Strain smoothing parameters
        auto integration_scheme_parameters = std::make_shared<aperi::IntegrationSchemeStrainSmoothingParameters>();

        // Create the element
        std::shared_ptr<aperi::ElementBase> element = aperi::CreateElement(aperi::ElementTopology::Tetrahedron4, approximation_space_parameters, integration_scheme_parameters, field_query_data_gather_vec, part_names, mesh_data);

        std::array<aperi::FieldQueryData<double>, 5> elem_field_query_data_gather_vec;
        elem_field_query_data_gather_vec[0] = {"function_values", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE};
        elem_field_query_data_gather_vec[1] = {"function_derivatives_x", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        elem_field_query_data_gather_vec[2] = {"function_derivatives_y", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        elem_field_query_data_gather_vec[3] = {"function_derivatives_z", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        elem_field_query_data_gather_vec[4] = {"volume", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::ELEMENT};
        auto entity_processor = std::make_shared<aperi::ElementProcessor<5>>(elem_field_query_data_gather_vec, mesh_data, part_names);
        entity_processor->MarkAllFieldsModifiedOnDevice();
        entity_processor->SyncAllFieldsDeviceToHost();

        // Check the volume
        std::array<double, 1> expected_volume;
        expected_volume[0] = num_elems_z;
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "volume", expected_volume, aperi::FieldQueryState::None);

        // Check the partition of unity for the shape functions
        if (approximation_space_parameters->GetApproximationSpaceType() == aperi::ApproximationSpaceType::ReproducingKernel) {  // not storing shape function values for FiniteElement
            CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::NODE>(*mesh_data, {"block_1"}, "function_values", 1.0, aperi::FieldQueryState::None);
        }

        // Check partition of nullity for the shape function derivatives
        CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_x", 0.0, aperi::FieldQueryState::None);
        CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_y", 0.0, aperi::FieldQueryState::None);
        CheckEntityFieldSumOfComponents<aperi::FieldDataTopologyRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_z", 0.0, aperi::FieldQueryState::None);
    }

    std::shared_ptr<aperi::IoMesh> m_io_mesh;
};

// Smoothed tet4 element
TEST_F(ElementStrainSmoothingTest, SmoothedTet4Storing) {
    // Get number of processors
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);

    // Tet4 element
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceFiniteElementParameters>();

    RunStrainSmoothedFormulation(num_procs, approximation_space_parameters);
}

// Smoothed reproducing kernel on tet4 element
TEST_F(ElementStrainSmoothingTest, ReproducingKernelOnTet4) {
    // Get number of processors
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);

    // Reproducing kernel on tet4 element
    double kernel_radius_scale_factor = 0.03;  // Small so it is like a tet4
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    // This doubling as a shape function test as well. TODO(jake) split this into two tests.
    RunStrainSmoothedFormulation(num_procs, approximation_space_parameters);
}

// Smoothed reproducing kernel on tet4 element with more neighbors
TEST_F(ElementStrainSmoothingTest, ReproducingKernelOnTet4MoreNeighbors) {
    // Get number of processors
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);

    // Exit if more than 4 procs
    if (num_procs > 4) {
        return;
    }

    // Reproducing kernel on tet4 element
    double kernel_radius_scale_factor = 3.4;  // Large so it gets all nodes as neighbors. Block in 1x1x4 so further away node-element pair is sqrt(3^2 + 1^2 + 1^2) = sqrt(11) ~ 3.3
    auto approximation_space_parameters = std::make_shared<aperi::ApproximationSpaceReproducingKernelParameters>(kernel_radius_scale_factor);

    // This doubling as a shape function test as well.
    // The two-pass approach is used so strain smoothing is just on the finite element and should be independent of the number of neighbors.
    // TODO(jake) split this into two tests.
    RunStrainSmoothedFormulation(4, approximation_space_parameters);
}

// Fixture for ElementBase patch tests
class ElementPatchAndForceTest : public SolverTest {
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

    void RunFullyPrescribedBoundaryConditionProblem(const std::string& mesh_string, const std::array<double, 3>& displacement_direction, double magnitude, const std::string& first_surface_set, const std::string& second_surface_set, bool use_strain_smoothing = false) {
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
            YAML::Node strain_smoothing_node;
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["integration_scheme"]["strain_smoothing"] = strain_smoothing_node;
            // Remove the gauss_quadrature node
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["integration_scheme"].remove("gauss_quadrature");
        }

        CreateInputFile();

        CreateTestMesh(mesh_string);

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
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "force_coefficients", expected_zero, aperi::FieldQueryState::None, 1.0e-8);

        // Check the force on the first set
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "force_coefficients", expected_force, aperi::FieldQueryState::None, 1.0e-8);

        // Check the force on the second set
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "force_coefficients", expected_force_negative, aperi::FieldQueryState::None, 1.0e-8);

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

        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "displacement_coefficients", expected_displacement_negative, aperi::FieldQueryState::N, 1.0e-9);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "displacement_coefficients", expected_displacement_positive, aperi::FieldQueryState::N, 1.0e-9);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "velocity_coefficients", expected_velocity_negative, aperi::FieldQueryState::N, 1.0e-4);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "velocity_coefficients", expected_velocity_positive, aperi::FieldQueryState::N, 1.0e-4);
        CheckEntityFieldValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration_coefficients", expected_zero, aperi::FieldQueryState::N);
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
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "force_coefficients", expected_zero, aperi::FieldQueryState::None);

        double tolerance = 1.0e-8;  // Large tolerance due to explicit dynamics

        // Get the expected second piola kirchhoff stress
        Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = GetExpectedSecondPiolaKirchhoffStress();

        // Get the expected force in the positive x direction
        double cross_section_area = m_elements_y * m_elements_z;
        Eigen::Vector3d expected_force_positive = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        std::array<double, 3> expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        std::array<double, 3> expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "force_coefficients", expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "force_coefficients", expected_force_negative_array, aperi::FieldQueryState::None, tolerance);

        // Get the expected force in the positive y direction
        cross_section_area = m_elements_x * m_elements_z;
        expected_force_positive = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_3"}, "force_coefficients", expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_4"}, "force_coefficients", expected_force_negative_array, aperi::FieldQueryState::None, tolerance);

        // Get the expected force in the positive z direction
        cross_section_area = m_elements_x * m_elements_y;
        expected_force_positive = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_5"}, "force_coefficients", expected_force_positive_array, aperi::FieldQueryState::None, tolerance);
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {"surface_6"}, "force_coefficients", expected_force_negative_array, aperi::FieldQueryState::None, tolerance);
    }

    void CheckPatchTest() {
        // Check the mass
        auto density = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
        double mass = density * m_elements_x * m_elements_y * m_elements_z;
        std::array<double, 3> expected_mass = {mass, mass, mass};
        CheckEntityFieldSum<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None);

        // Check the boundary conditions
        Eigen::Matrix3d velocity_gradient = m_displacement_gradient * 1.875 / m_final_time;  // Peak velocity for a smooth step function (should be set to be the end of the simulation)

        CheckEntityFieldPatchValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), "acceleration_coefficients", m_center_of_mass, Eigen::Matrix3d::Zero(), aperi::FieldQueryState::N);
        CheckEntityFieldPatchValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), "displacement_coefficients", m_center_of_mass, m_displacement_gradient, aperi::FieldQueryState::N, 1.0e-9);  // Large tolerance due to explicit dynamics
        CheckEntityFieldPatchValues<aperi::FieldDataTopologyRank::NODE>(*m_solver->GetMeshData(), "velocity_coefficients", m_center_of_mass, velocity_gradient, aperi::FieldQueryState::N, 1.0e-4);            // Large tolerance due to explicit dynamics

        CheckPatchTestForces();
    }

    void SetMeshSpecs(double elements_x, double elements_y, double elements_z) {
        m_elements_x = elements_x;
        m_elements_y = elements_y;
        m_elements_z = elements_z;
        m_mesh_string = std::to_string(m_elements_x) + "x" + std::to_string(m_elements_y) + "x" + std::to_string(m_elements_z) + "|sideset:xXyYzZ|tets";
        m_center_of_mass(0) = 0.5 * m_elements_x;
        m_center_of_mass(1) = 0.5 * m_elements_y;
        m_center_of_mass(2) = 0.5 * m_elements_z;
    }

    void RunTensionPatchTests(bool strain_smoothing = false) {
        // Return if running in parallel. Need larger blocks to run in parallel and there are too many dynamic oscillations with explicit dynamics
        if (m_num_procs > 1) {
            return;
        }

        // Set the mesh specs, 2 x 2 x 2 mesh
        SetMeshSpecs(2, 2, 2);

        // -----------------------
        // Tension in x
        // magnitude of the displacement, both positive and negative sides
        double magnitude = 0.1;

        // Displacement boundary conditions
        std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the x faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_1", "surface_2", strain_smoothing);

        // Set the deformation gradient
        m_displacement_gradient(0, 0) = 2.0 * magnitude / m_elements_x;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest();
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Tension in y

        // Displacement boundary conditions
        displacement_direction = {0.0, 1.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the y faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_3", "surface_4", strain_smoothing);

        // Set the deformation gradient
        m_displacement_gradient(1, 1) = 2.0 * magnitude / m_elements_y;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest();
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Tension in z

        // Displacement boundary conditions
        displacement_direction = {0.0, 0.0, 1.0};

        // Run the problem, apply the displacement boundary conditions on the z faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_5", "surface_6", strain_smoothing);

        // Set the deformation gradient
        m_displacement_gradient(2, 2) = 2.0 * magnitude / m_elements_z;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest();
        m_displacement_gradient = Eigen::Matrix3d::Zero();
    }

    void RunCompressionPatchTests(bool strain_smoothing = false) {
        // Return if running in parallel. Need larger blocks to run in parallel and there are too many dynamic oscillations with explicit dynamics
        if (m_num_procs > 1) {
            return;
        }

        // Set the mesh specs, 2 x 2 x 2 mesh
        SetMeshSpecs(2, 2, 2);

        // -----------------------
        // Compression in x
        // magnitude of the displacement, both positive and negative sides
        double magnitude = -0.1;

        // Displacement boundary conditions
        std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the x faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_1", "surface_2", strain_smoothing);

        // Set the deformation gradient
        m_displacement_gradient(0, 0) = 2.0 * magnitude / m_elements_x;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest();
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Compression in y

        // Displacement boundary conditions
        displacement_direction = {0.0, 1.0, 0.0};

        // Run the problem, apply the displacement boundary conditions on the y faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_3", "surface_4", strain_smoothing);

        // Set the deformation gradient
        m_displacement_gradient(1, 1) = 2.0 * magnitude / m_elements_y;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest();
        m_displacement_gradient = Eigen::Matrix3d::Zero();

        // -----------------------
        // Compression in z

        // Displacement boundary conditions
        displacement_direction = {0.0, 0.0, 1.0};

        // Run the problem, apply the displacement boundary conditions on the z faces
        RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_5", "surface_6", strain_smoothing);

        // Set the deformation gradient
        m_displacement_gradient(2, 2) = 2.0 * magnitude / m_elements_z;

        // Check the force balance and the other fields
        CheckPatchTest();

        ResetSolverTest();
        m_displacement_gradient = Eigen::Matrix3d::Zero();
    }

    double m_youngs_modulus = 1.0;
    double m_poissons_ratio = 0.0;
    double m_final_time = 10.0;
    double m_elements_x;
    double m_elements_y;
    double m_elements_z;
    std::string m_mesh_string;
    Eigen::Vector3d m_center_of_mass;
    // std::array<double, 3> m_rigid_body_translation; // TODO(jake): Implement rigid body translation
    // std::array<std::array<double, 3>, 3> m_rigid_body_rotation; // TODO(jake): Implement rigid body rotation
    Eigen::Matrix3d m_displacement_gradient = Eigen::Matrix3d::Zero();
};

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(ElementPatchAndForceTest, Tet4PatchTestsTension) {
    RunTensionPatchTests();
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(ElementPatchAndForceTest, Tet4PatchTestsCompression) {
    RunCompressionPatchTests();
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(ElementPatchAndForceTest, SmoothedTet4PatchTestsTension) {
    RunTensionPatchTests(true);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(ElementPatchAndForceTest, SmoothedTet4PatchTestsCompression) {
    RunCompressionPatchTests(true);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
// TODO(jake): Prescribe more of the boundary conditions to get this to work
// TEST_F(ElementPatchAndForceTest, Tet4PatchTestsShearX){
//    // Return if running in parallel. Need larger blocks to run in parallel and there are too many dynamic oscillations with explicit dynamics
//    if (m_num_procs > 1) {
//        return;
//    }
//
//    // Set the mesh specs, 2 x 2 x 2 mesh
//    SetMeshSpecs(2, 2, 2);
//
//    // -----------------------
//    // Shear on Y face
//    // magnitude of the displacement, both positive and negative sides
//    double magnitude = 0.1;
//
//    // Displacement boundary conditions
//    std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};
//
//    // Run the problem, apply the displacement boundary conditions on the x faces
//    RunFullyPrescribedBoundaryConditionProblem(m_mesh_string, displacement_direction, magnitude, "surface_3", "surface_4");
//
//    // Set the deformation gradient
//    m_displacement_gradient(0, 1) = 2.0 * magnitude / m_elements_x;
//
//    // Check the force balance and the other fields
//    CheckPatchTest();
//
//    ResetSolverTest();
//    m_displacement_gradient = Eigen::Matrix3d::Zero();
//}

// Tests element calculations. Explicit test for a simple cube in shear in yx. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchAndForceTest, ExplicitShearYXForce) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 1.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = "1x" + std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "|sideset:xX|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, "surface_1", "surface_2");

    // Set the expected displacement gradient
    m_displacement_gradient(1, 0) = 2.0 * magnitude;

    // Set the expected second piola kirchhoff stress
    Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = {0.02, 0.0, 0.0, 0.0, 0.0, 0.1};

    // Get the expected forces
    Eigen::Vector3d expected_force = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchAndForceTest, ExplicitShearZXForce) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 0.0, 1.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = "1x" + std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "|sideset:xX|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, "surface_1", "surface_2");

    // Set the expected displacement gradient
    m_displacement_gradient(2, 0) = 2.0 * magnitude;

    // Set the expected second piola kirchhoff stress
    Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = {0.02, 0.0, 0.0, 0.0, 0.1, 0.0};

    // Get the expected forces
    Eigen::Vector3d expected_force = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchAndForceTest, ExplicitShearXYForce) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:yY|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, "surface_1", "surface_2");

    // Set the expected displacement gradient
    m_displacement_gradient(0, 1) = 2.0 * magnitude;

    // Set the expected second piola kirchhoff stress
    Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = {0.0, 0.02, 0.0, 0.0, 0.0, 0.1};

    // Get the expected forces
    Eigen::Vector3d expected_force = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchAndForceTest, ExplicitShearZYForce) {
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 0.0, 1.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:yY|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs * m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, "surface_1", "surface_2");

    // Set the expected displacement gradient
    m_displacement_gradient(2, 1) = 2.0 * magnitude;

    // Set the expected second piola kirchhoff stress
    Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = {0.0, 0.02, 0.0, 0.1, 0.0, 0.0};

    // Get the expected forces
    Eigen::Vector3d expected_force = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchAndForceTest, ExplicitShearXZForce) {
    // Exit if the number of processors is not 1
    // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
    // Thus, all DOFs are not constrained and some noise will be present in the fields.
    if (m_num_procs != 1) {
        return;
    }

    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1 * m_num_procs;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {1.0, 0.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x1x" + std::to_string(m_num_procs) + "|sideset:zZ|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, "surface_1", "surface_2");

    // Set the expected displacement gradient
    m_displacement_gradient(0, 2) = 2.0 * magnitude / m_num_procs;

    // Set the expected second piola kirchhoff stress
    Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = {0.0, 0.0, 0.02, 0.0, 0.1, 0.0};

    // Get the expected forces
    Eigen::Vector3d expected_force = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz. No loads, just two displacement boundary condition. All DOFs are constrained so not a proper patch test.
TEST_F(ElementPatchAndForceTest, ExplicitShearYZForce) {
    // Exit if the number of processors is not 1
    // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
    // Thus, all DOFs are not constrained and some noise will be present in the fields.
    if (m_num_procs != 1) {
        return;
    }
    // magnitude of the displacement, both positive and negative sides
    double magnitude = 0.1 * m_num_procs;

    // Displacement boundary conditions
    std::array<double, 3> displacement_direction = {0.0, 1.0, 0.0};

    // Create a mesh that is num_procs x num_procs x 1
    std::string mesh_string = std::to_string(m_num_procs) + "x" + std::to_string(m_num_procs) + "x1" + "|sideset:zZ|tets";

    // Volume of the mesh
    double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

    // Cross section area for loading direction
    double cross_section_area = m_num_procs;

    // Run the problem, apply the displacement boundary conditions on the x faces
    RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, "surface_1", "surface_2");

    // Set the expected displacement gradient
    m_displacement_gradient(1, 2) = 2.0 * magnitude / m_num_procs;

    // Set the expected second piola kirchhoff stress
    Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = {0.0, 0.0, 0.02, 0.1, 0.0, 0.0};

    // Get the expected forces
    Eigen::Vector3d expected_force = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);

    // Check the force balance and the other fields
    CheckForcesAndFields(expected_force, volume);
}
