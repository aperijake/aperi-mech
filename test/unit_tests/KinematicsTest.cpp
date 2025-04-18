#include <gtest/gtest.h>

#include <string>

#include "KinematicsTestFixture.h"
#include "UnitTestFieldUtils.h"

TEST_F(KinematicsTestFixture, ElementReproducingKernelSimpleRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestSimpleRotation();
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelRandomDisplacement) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacement();
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelLinearDeformationGradient) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradient();
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelRandomDisplacementThenRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacementThenRotation();
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelSimpleRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel();
    TestSimpleRotation();
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelRandomDisplacement) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel();
    TestRandomDisplacement();
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelLinearDeformationGradient) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel();
    TestLinearDeformationGradient();
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelRandomDisplacementThenRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel();
    TestRandomDisplacementThenRotation();
}