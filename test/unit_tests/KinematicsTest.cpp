#include <gtest/gtest.h>

#include <string>

#include "KinematicsTestFixture.h"
#include "UnitTestFieldUtils.h"

/**
 * ===============================================
 * Element reproducing kernel tests.
 * ===============================================
 */
TEST_F(KinematicsTestFixture, ElementReproducingKernelSimpleRotation) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelRandomDisplacement) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelLinearDeformationGradient) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelLinearDeformationGradientMultipleIncrements) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradientMultipleIncrements(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelRandomDisplacementThenRotation) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelRandomDisplacementWhileRotating) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacementWhileRotating(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelLinearDeformationGradientThenRotations) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelLinearDeformationGradientWhileRotating) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradientWhileRotating(lagrangian_formulation_type);
}

/**
 * ===============================================
 * Nodal reproducing kernel tests.
 * ===============================================
 */
TEST_F(KinematicsTestFixture, NodalReproducingKernelSimpleRotation) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelRandomDisplacement) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelLinearDeformationGradient) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelLinearDeformationGradientMultipleIncrements) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradientMultipleIncrements(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelRandomDisplacementThenRotation) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelRandomDisplacementWhileRotating) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacementWhileRotating(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelLinearDeformationGradientThenRotations) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelLinearDeformationGradientWhileRotating) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradientWhileRotating(lagrangian_formulation_type);
}

/**
 * ===============================================
 * Updated Lagrangian nodal reproducing kernel tests.
 * ===============================================
 */
TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelSimpleRotation) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelRandomDisplacement) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelLinearDeformationGradient) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelLinearDeformationGradientMultipleIncrements) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradientMultipleIncrements(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelRandomDisplacementThenRotation) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelRandomDisplacementWhileRotating) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacementWhileRotating(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelLinearDeformationGradientThenRotations) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelLinearDeformationGradientWhileRotating) {
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradientWhileRotating(lagrangian_formulation_type);
}

/**
 * ===============================================
 * Nodal reproducing kernel with f_bar tests.
 * ===============================================
 */
TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarSimpleRotation) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = false;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarRandomDisplacement) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = false;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarLinearDeformationGradient) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = false;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarRandomDisplacementThenRotation) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = false;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarLinearDeformationGradientThenRotations) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = false;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

/**
 * ===============================================
 * Nodal reproducing kernel with f_bar and bubbles tests.
 * ===============================================
 */
TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarBubblesSimpleRotation) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = true;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarBubblesRandomDisplacement) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = true;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarBubblesLinearDeformationGradient) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = true;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarBubblesRandomDisplacementThenRotation) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = true;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarBubblesLinearDeformationGradientThenRotations) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = true;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

/**
 * ===============================================
 * Element reproducing kernel tests, Updated Lagrangian formulation.
 * ===============================================
 */
TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelSimpleRotation) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelRandomDisplacement) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelLinearDeformationGradient) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelLinearDeformationGradientMultipleIncrements) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradientMultipleIncrements(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelRandomDisplacementThenRotation) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelRandomDisplacementWhileRotating) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacementWhileRotating(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelLinearDeformationGradientThenRotations) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedElementReproducingKernelLinearDeformationGradientWhileRotating) {
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradientWhileRotating(lagrangian_formulation_type);
}
