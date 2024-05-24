#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <cstdlib>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ApplicationTestFixture.h"
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

// Fixture for ElementBase tests
class ElementBasicsTest : public ::testing::Test {
   protected:
    // Setup
    void SetUp() override {
        m_evaluation_points_parametric_coordinates = {
            {0.0, 0.0, 0.0},
            {1.0, 0.0, 0.0},
            {0.0, 1.0, 0.0},
            {0.0, 0.0, 1.0},
            {0.5, 0.5, 0.0},
            {0.25, 0.25, 0.25}};

        m_expected_values = {
            {1.0, 0.0, 0.0, 0.0},
            {0.0, 1.0, 0.0, 0.0},
            {0.0, 0.0, 1.0, 0.0},
            {0.0, 0.0, 0.0, 1.0},
            {0.0, 0.5, 0.5, 0.0},
            {0.25, 0.25, 0.25, 0.25}};
        // Seed the random number generator
        std::srand(42);
    }

    // Check partition of unity
    static void CheckPartitionOfUnity(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions) {
        // Check the partition of unity
        double sum = shape_functions.sum();
        EXPECT_NEAR(sum, 1.0, 1.0e-12);
    }

    // Check partition of nullity
    static void CheckPartitionOfNullity(const Eigen::Matrix<double, 1, Eigen::Dynamic>& shape_function_derivatives) {
        // Check the partition of nullity
        double sum = shape_function_derivatives.sum();
        EXPECT_NEAR(sum, 0.0, 1.0e-12);
    }

    // Check linear completeness
    static void CheckLinearCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_point_phyiscal_coordinates) {
        // Check the linear completeness
        const Eigen::Matrix<double, 1, 3>& calculated_physical_coordinates = shape_functions.transpose() * neighbor_coordinates;
        for (size_t i = 0; i < 3; ++i) {
            EXPECT_NEAR(calculated_physical_coordinates(0, i), evaluation_point_phyiscal_coordinates(0, i), 1.0e-12);
        }
    }

    // Check shape function completeness
    static void CheckShapeFunctionCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 3>& node_coordinates, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const Eigen::Matrix<double, 1, 3>& evaluation_points_parametric_coordinates) {
        // Check the partition of unity
        CheckPartitionOfUnity(shape_functions);

        // Calculate the physical coordinates of the evaluation point
        aperi::ShapeFunctionsFunctorTet4 functions_functor;
        // Calculate the shape functions at the evaluation point
        Eigen::Matrix<double, Eigen::Dynamic, 1> cell_shape_functions = functions_functor.values(evaluation_points_parametric_coordinates, node_coordinates, node_coordinates, 4);
        const Eigen::Matrix<double, 1, 3>& evaluation_point_physical_coordinates = cell_shape_functions.transpose() * node_coordinates;

        // Check the linear completeness
        CheckLinearCompleteness(shape_functions, neighbor_coordinates, evaluation_point_physical_coordinates);
    }

    // Check shape function values
    static void CheckShapeFunctionValues(const Eigen::Matrix<double, Eigen::Dynamic, 1>& shape_functions, const Eigen::Matrix<double, Eigen::Dynamic, 1>& expected_shape_functions, size_t expected_num_shape_functions) {
        // Check the number of shape functions
        EXPECT_EQ((size_t)shape_functions.rows(), expected_num_shape_functions);

        // Check the shape function values
        for (size_t i = 0; i < expected_num_shape_functions; ++i) {
            EXPECT_NEAR(shape_functions[i], expected_shape_functions[i], 1.0e-12);
        }
    }

    // Check shape function derivative completeness
    static void CheckShapeFunctionDerivativeCompleteness(const Eigen::Matrix<double, Eigen::Dynamic, 3>& shape_function_derivatives) {
        // Check the shape function derivatives
        for (size_t j = 0; j < 3; ++j) {
            // Check the partition of nullity
            CheckPartitionOfNullity(shape_function_derivatives.col(j));
        }
    }

    // Check shape function derivative values
    static void CheckShapeFunctionDerivativeValues(const Eigen::Matrix<double, Eigen::Dynamic, 3>& shape_function_derivatives, const Eigen::Matrix<double, Eigen::Dynamic, 3>& expected_shape_function_derivatives, size_t expected_num_shape_functions) {
        // Check the number of shape functions
        EXPECT_EQ((size_t)shape_function_derivatives.rows(), expected_num_shape_functions);

        // Check the shape function derivatives
        for (size_t j = 0; j < 3; ++j) {
            // Check the shape function derivatives
            for (size_t i = 0; i < expected_num_shape_functions; ++i) {
                EXPECT_NEAR(shape_function_derivatives(i, j), expected_shape_function_derivatives(i, j), 1.0e-12);
            }
        }
    }

    template <typename FunctionsFunctor>
    void TestFunctionsFunctorValues(FunctionsFunctor& functions_functor, const Eigen::Matrix<double, 4, 3>& node_coordinates, const Eigen::Matrix<double, Eigen::Dynamic, 3>& neighbor_coordinates, const size_t expected_num_shape_functions = 4, bool check_values = true) {
        for (size_t i = 0; i < m_evaluation_points_parametric_coordinates.size(); ++i) {
            // Check the shape functions
            Eigen::Matrix<double, Eigen::Dynamic, 1> shape_functions = functions_functor.values(m_evaluation_points_parametric_coordinates[i], node_coordinates, neighbor_coordinates, expected_num_shape_functions);
            CheckShapeFunctionCompleteness(shape_functions, node_coordinates, neighbor_coordinates, m_evaluation_points_parametric_coordinates[i]);
            if (check_values) {
                CheckShapeFunctionValues(shape_functions, m_expected_values[i], expected_num_shape_functions);
            }
        }
    }

    template <typename FunctionsFunctor>
    void TestFunctionsFunctorDerivatives(FunctionsFunctor& functions_functor, const Eigen::Matrix<double, 4, 3>& /*node_coordinates*/, const size_t expected_num_shape_functions = 4) {
        // Expected shape function derivatives
        Eigen::Matrix<double, 4, 3> expected_shape_function_derivatives;
        expected_shape_function_derivatives << -1.0, -1.0, -1.0,
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0;
        // Check the shape function derivatives
        for (auto& m_evaluation_points_parametric_coordinate : m_evaluation_points_parametric_coordinates) {
            Eigen::Matrix<double, 4, 3> shape_function_derivatives = functions_functor.derivatives(m_evaluation_points_parametric_coordinate);
            CheckShapeFunctionDerivativeCompleteness(shape_function_derivatives);
            CheckShapeFunctionDerivativeValues(shape_function_derivatives, expected_shape_function_derivatives, expected_num_shape_functions);
        }
    }

    std::vector<Eigen::Matrix<double, 3, 1>> m_evaluation_points_parametric_coordinates;
    std::vector<Eigen::Matrix<double, 4, 1>> m_expected_values;
};

// Test shape functions for a tet4 element
TEST_F(ElementBasicsTest, Tet4ShapeFunctions) {
    // Create the tet4 functions functor
    aperi::ShapeFunctionsFunctorTet4 functions_functor;

    const Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    TestFunctionsFunctorValues(functions_functor, node_coordinates, node_coordinates);
    TestFunctionsFunctorDerivatives(functions_functor, node_coordinates);
}

// Test reproducing kernel shape functions on a tet4 element
TEST_F(ElementBasicsTest, ReproducingKernelOnTet4ShapeFunctionsTetOnly) {
    // Create the tet4 functions functor
    aperi::ShapeFunctionsFunctorReproducingKernelOnTet4<4> functions_functor;

    Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    TestFunctionsFunctorValues(functions_functor, node_coordinates, node_coordinates);

    // Randomize the node coordinates
    node_coordinates = Eigen::Matrix<double, 4, 3>::Random();
    // Find the bounding box dimensions
    Eigen::Matrix<double, 3, 1> min = node_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = node_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    node_coordinates = (node_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    TestFunctionsFunctorValues(functions_functor, node_coordinates, node_coordinates);
}

// Test reproducing kernel shape functions on a tet4 element
TEST_F(ElementBasicsTest, ReproducingKernelOnTet4ShapeFunctionsMoreNeighbors) {
    // Create the tet4 functions functor
    aperi::ShapeFunctionsFunctorReproducingKernelOnTet4<8> functions_functor;
    Eigen::Matrix<double, 4, 3> node_coordinates = Eigen::Matrix<double, 4, 3>::Identity();
    Eigen::Matrix<double, 8, 3> neighbor_coordinates = Eigen::Matrix<double, 8, 3>::Random() * 3.0;
    // Find the bounding box dimensions
    Eigen::Matrix<double, 3, 1> min = neighbor_coordinates.colwise().minCoeff();
    Eigen::Matrix<double, 3, 1> max = neighbor_coordinates.colwise().maxCoeff();
    Eigen::Matrix<double, 3, 1> bounding_box_dimensions = max - min;
    // Scale to be within the unit cube
    neighbor_coordinates = (neighbor_coordinates.rowwise() - min.transpose()).array().rowwise() / bounding_box_dimensions.transpose().array();
    TestFunctionsFunctorValues(functions_functor, node_coordinates, neighbor_coordinates, 8, false);
}

// Test kernel value
TEST(KernelTest, KernelValue) {
    Eigen::Vector3d vector_neighbor_to_point = {0.0, 0.0, 0.0};
    double r = 2.0;
    double alpha = 1.6;
    double kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r, alpha);
    EXPECT_NEAR(kernel_value, 1.0, 1.0e-12);

    vector_neighbor_to_point = {r * alpha, 0.0, 0.0};
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r, alpha);
    EXPECT_NEAR(kernel_value, 0.0, 1.0e-12);

    vector_neighbor_to_point = {0.0, r * alpha / 2.0, 0.0};
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r, alpha);
    EXPECT_NEAR(kernel_value, 0.25, 1.0e-12);

    double epsilon = 1.0e-6;
    vector_neighbor_to_point(1) += epsilon;
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r, alpha);
    EXPECT_NEAR(kernel_value, 0.25, epsilon);

    vector_neighbor_to_point(1) -= 2.0 * epsilon;
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r, alpha);
    EXPECT_NEAR(kernel_value, 0.25, epsilon);
}

TEST_F(ElementBasicsTest, SmoothedTet4Storing) {
    // Get number of processors
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);

    // Smoothed tet4 element with storing shape function derivatives needs an element processor to be created
    bool use_strain_smoothing = true;
    bool store_shape_function_derivatives = true;

    // Make a mesh
    aperi::IoMeshParameters io_mesh_parameters;
    io_mesh_parameters.mesh_type = "generated";
    io_mesh_parameters.compose_output = true;
    std::shared_ptr<aperi::IoMesh> io_mesh = CreateIoMesh(MPI_COMM_WORLD, io_mesh_parameters);
    std::vector<aperi::FieldData> field_data = aperi::GetFieldData();
    io_mesh->ReadMesh("1x1x" + std::to_string(num_procs) + "|tets", {"block_1"}, field_data);
    std::shared_ptr<aperi::MeshData> mesh_data = io_mesh->GetMeshData();

    // Make an element processor
    std::vector<aperi::FieldQueryData> field_query_data_gather_vec(3);  // not used, but needed for the constructor. TODO(jake) change this?
    field_query_data_gather_vec[0] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
    field_query_data_gather_vec[1] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
    field_query_data_gather_vec[2] = {mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None};
    const std::vector<std::string> part_names = {"block_1"};

    // Create the element
    std::shared_ptr<aperi::ElementBase> element = aperi::CreateElement(4, field_query_data_gather_vec, part_names, mesh_data, use_strain_smoothing, store_shape_function_derivatives);

    std::array<aperi::FieldQueryData, 5> elem_field_query_data_gather_vec;
    elem_field_query_data_gather_vec[0] = {"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataRank::ELEMENT};
    elem_field_query_data_gather_vec[1] = {"function_derivatives_x", aperi::FieldQueryState::None, aperi::FieldDataRank::ELEMENT};
    elem_field_query_data_gather_vec[2] = {"function_derivatives_y", aperi::FieldQueryState::None, aperi::FieldDataRank::ELEMENT};
    elem_field_query_data_gather_vec[3] = {"function_derivatives_z", aperi::FieldQueryState::None, aperi::FieldDataRank::ELEMENT};
    elem_field_query_data_gather_vec[4] = {"volume", aperi::FieldQueryState::None, aperi::FieldDataRank::ELEMENT};
    auto entity_processor = std::make_shared<aperi::ElementProcessor<5>>(elem_field_query_data_gather_vec, mesh_data, part_names);
    entity_processor->MarkAllFieldsModifiedOnDevice();
    entity_processor->SyncAllFieldsDeviceToHost();

    // Check the number of neighbors
    std::array<int, 1> expected_num_neighbors = {4};
    CheckEntityFieldValues<aperi::FieldDataRank::ELEMENT>(*mesh_data, {"block_1"}, "num_neighbors", expected_num_neighbors, aperi::FieldQueryState::None);

    // TODO(jake): Check the neighbors.

    // Check the volume
    CheckEntityFieldSum<aperi::FieldDataRank::ELEMENT>(*mesh_data, {"block_1"}, "volume", {static_cast<double>(num_procs)}, aperi::FieldQueryState::None);

    // Check partition of nullity for the shape function derivatives
    CheckEntityFieldSumOfComponents<aperi::FieldDataRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_x", 0.0, aperi::FieldQueryState::None);
    CheckEntityFieldSumOfComponents<aperi::FieldDataRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_y", 0.0, aperi::FieldQueryState::None);
    CheckEntityFieldSumOfComponents<aperi::FieldDataRank::ELEMENT>(*mesh_data, {"block_1"}, "function_derivatives_z", 0.0, aperi::FieldQueryState::None);
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
            m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["formulation"]["integration_scheme"] = "strain_smoothing";
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
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "force", expected_zero, aperi::FieldQueryState::N, 1.0e-8);

        // Check the force on the first set
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "force", expected_force, aperi::FieldQueryState::N, 1.0e-8);

        // Check the force on the second set
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "force", expected_force_negative, aperi::FieldQueryState::N, 1.0e-8);

        // Check the mass
        auto density = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
        double mass = density * volume;
        std::array<double, 3> expected_mass = {mass, mass, mass};
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None);

        // Check the boundary conditions
        const YAML::Node boundary_conditions = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["boundary_conditions"];
        auto direction = boundary_conditions[1]["displacement"]["vector"]["direction"].as<std::array<double, 3>>();
        double magnitude = boundary_conditions[1]["displacement"]["vector"]["magnitude"].as<double>() / 2.0;  // Only running half of smooth step so actual magnitude is half
        std::array<double, 3> expected_displacement_positive = {magnitude * direction[0], magnitude * direction[1], magnitude * direction[2]};
        // Peak velocity for a smooth step function (should be set to be the end of the simulation)
        std::array<double, 3> expected_velocity_positive = {1.875 * expected_displacement_positive[0] / m_final_time, 1.875 * expected_displacement_positive[1] / m_final_time, 1.875 * expected_displacement_positive[2] / m_final_time};
        std::array<double, 3> expected_displacement_negative = {-expected_displacement_positive[0], -expected_displacement_positive[1], -expected_displacement_positive[2]};
        std::array<double, 3> expected_velocity_negative = {-expected_velocity_positive[0], -expected_velocity_positive[1], -expected_velocity_positive[2]};

        CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "displacement", expected_displacement_negative, aperi::FieldQueryState::N, 1.0e-9);
        CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "displacement", expected_displacement_positive, aperi::FieldQueryState::N, 1.0e-9);
        CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "velocity", expected_velocity_negative, aperi::FieldQueryState::N, 1.0e-4);
        CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "velocity", expected_velocity_positive, aperi::FieldQueryState::N, 1.0e-4);
        CheckEntityFieldValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "acceleration", expected_zero, aperi::FieldQueryState::N);
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
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "force", expected_zero, aperi::FieldQueryState::N);

        double tolerance = 1.0e-8;  // Large tolerance due to explicit dynamics

        // Get the expected second piola kirchhoff stress
        Eigen::Matrix<double, 6, 1> expected_second_piola_kirchhoff_stress = GetExpectedSecondPiolaKirchhoffStress();

        // Get the expected force in the positive x direction
        double cross_section_area = m_elements_y * m_elements_z;
        Eigen::Vector3d expected_force_positive = GetExpectedPositiveForces(0, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        std::array<double, 3> expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        std::array<double, 3> expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_1"}, "force", expected_force_positive_array, aperi::FieldQueryState::N, tolerance);
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_2"}, "force", expected_force_negative_array, aperi::FieldQueryState::N, tolerance);

        // Get the expected force in the positive y direction
        cross_section_area = m_elements_x * m_elements_z;
        expected_force_positive = GetExpectedPositiveForces(1, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_3"}, "force", expected_force_positive_array, aperi::FieldQueryState::N, tolerance);
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_4"}, "force", expected_force_negative_array, aperi::FieldQueryState::N, tolerance);

        // Get the expected force in the positive z direction
        cross_section_area = m_elements_x * m_elements_y;
        expected_force_positive = GetExpectedPositiveForces(2, cross_section_area, expected_second_piola_kirchhoff_stress, m_displacement_gradient);
        // Put into an array for comparison
        expected_force_positive_array = {expected_force_positive(0), expected_force_positive(1), expected_force_positive(2)};
        expected_force_negative_array = {-expected_force_positive(0), -expected_force_positive(1), -expected_force_positive(2)};
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_5"}, "force", expected_force_positive_array, aperi::FieldQueryState::N, tolerance);
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {"surface_6"}, "force", expected_force_negative_array, aperi::FieldQueryState::N, tolerance);
    }

    void CheckPatchTest() {
        // Check the mass
        auto density = m_yaml_data["procedures"][0]["explicit_dynamics_procedure"]["geometry"]["parts"][0]["part"]["material"]["elastic"]["density"].as<double>();
        double mass = density * m_elements_x * m_elements_y * m_elements_z;
        std::array<double, 3> expected_mass = {mass, mass, mass};
        CheckEntityFieldSum<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), {}, "mass", expected_mass, aperi::FieldQueryState::None);

        // Check the boundary conditions
        Eigen::Matrix3d velocity_gradient = m_displacement_gradient * 1.875 / m_final_time;  // Peak velocity for a smooth step function (should be set to be the end of the simulation)

        CheckEntityFieldPatchValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), "acceleration", m_center_of_mass, Eigen::Matrix3d::Zero(), aperi::FieldQueryState::N);
        CheckEntityFieldPatchValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), "displacement", m_center_of_mass, m_displacement_gradient, aperi::FieldQueryState::N, 1.0e-9);  // Large tolerance due to explicit dynamics
        CheckEntityFieldPatchValues<aperi::FieldDataRank::NODE>(*m_solver->GetMeshData(), "velocity", m_center_of_mass, velocity_gradient, aperi::FieldQueryState::N, 1.0e-4);            // Large tolerance due to explicit dynamics

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
