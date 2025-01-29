#include <gtest/gtest.h>

#include <Eigen/Dense>

#include "PatchTestFixture.h"

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, Tet4PatchTestsTension) {
    bool tets = true;
    PatchTestIntegrationScheme integration_scheme = PatchTestIntegrationScheme::GAUSS_QUADRATURE;
    bool reproducing_kernel = false;
    RunTensionPatchTests(tets, integration_scheme, reproducing_kernel);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, Tet4PatchTestsCompression) {
    bool tets = true;
    PatchTestIntegrationScheme integration_scheme = PatchTestIntegrationScheme::GAUSS_QUADRATURE;
    bool reproducing_kernel = false;
    RunCompressionPatchTests(tets, integration_scheme, reproducing_kernel);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, Tet4IncrementalPatchTestsTension) {
    bool tets = true;
    PatchTestIntegrationScheme integration_scheme = PatchTestIntegrationScheme::GAUSS_QUADRATURE;
    bool reproducing_kernel = false;
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    RunTensionPatchTests(tets, integration_scheme, reproducing_kernel, lagrangian_formulation_type);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, Tet4IncrementalPatchTestsCompression) {
    bool tets = true;
    PatchTestIntegrationScheme integration_scheme = PatchTestIntegrationScheme::GAUSS_QUADRATURE;
    bool reproducing_kernel = false;
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    RunCompressionPatchTests(tets, integration_scheme, reproducing_kernel, lagrangian_formulation_type);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, SmoothedTet4PatchTestsTension) {
    bool tets = true;
    PatchTestIntegrationScheme integration_scheme = PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING;
    bool reproducing_kernel = false;
    RunTensionPatchTests(tets, integration_scheme, reproducing_kernel);
}

// Tests element calculations. Patch test so checks the displacement of free nodes. Also, checks the forces.
TEST_F(PatchTest, SmoothedTet4PatchTestsCompression) {
    bool tets = true;
    PatchTestIntegrationScheme integration_scheme = PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING;
    bool reproducing_kernel = false;
    RunCompressionPatchTests(tets, integration_scheme, reproducing_kernel);
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
