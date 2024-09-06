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
#include "PatchTestFixture.h"
#include "SolverTestFixture.h"
#include "UnitTestUtils.h"
#include "yaml-cpp/yaml.h"

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, Tet4PatchTestsTension) {
    bool tets = true;
    bool strain_smoothing = false;
    bool reproducing_kernel = false;
    RunTensionPatchTests(tets, strain_smoothing, reproducing_kernel);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, Tet4PatchTestsCompression) {
    bool tets = true;
    bool strain_smoothing = false;
    bool reproducing_kernel = false;
    RunCompressionPatchTests(tets, strain_smoothing, reproducing_kernel);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, SmoothedTet4PatchTestsTension) {
    bool tets = true;
    bool strain_smoothing = true;
    bool reproducing_kernel = false;
    RunTensionPatchTests(tets, strain_smoothing, reproducing_kernel);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, SmoothedTet4PatchTestsCompression) {
    bool tets = true;
    bool strain_smoothing = true;
    bool reproducing_kernel = false;
    RunCompressionPatchTests(tets, strain_smoothing, reproducing_kernel);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
// TODO(jake): Prescribe more of the boundary conditions to get this to work
// TEST_F(PatchTest, Tet4PatchTestsShearX){
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
TEST_F(PatchTest, ExplicitShearYXForce) {
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
TEST_F(PatchTest, ExplicitShearZXForce) {
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
TEST_F(PatchTest, ExplicitShearXYForce) {
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
TEST_F(PatchTest, ExplicitShearZYForce) {
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
TEST_F(PatchTest, ExplicitShearXZForce) {
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
TEST_F(PatchTest, ExplicitShearYZForce) {
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
