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
    TestSimpleRotation(lagrangian_formulation_type);
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
    TestRandomDisplacement(lagrangian_formulation_type);
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
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelRandomDisplacementThenRotation) {
    // Setup element reproducing kernel. Small support so effectively FEM
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, ElementReproducingKernelLinearDeformationGradientThenRotations) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    double support_scale = 0.1;
    SetupElementReproducingKernel(lagrangian_formulation_type, support_scale);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelSimpleRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelRandomDisplacement) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelLinearDeformationGradient) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelRandomDisplacementThenRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelLinearDeformationGradientThenRotations) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelSimpleRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestSimpleRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelRandomDisplacement) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacement(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelLinearDeformationGradient) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestLinearDeformationGradient(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, UpdatedLagrangianNodalReproducingKernelRandomDisplacementThenRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    // Setup nodal reproducing kernel
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Updated;
    SetupNodalReproducingKernel(lagrangian_formulation_type);
    TestRandomDisplacementThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarSimpleRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = false;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}

TEST_F(KinematicsTestFixture, NodalReproducingKernelFbarBubblesSimpleRotation) {
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
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
    // Skip this test if we have more than 4 processes
    if (m_num_procs > 4) {
        GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
    }
    aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total;
    // Setup nodal reproducing kernel with f_bar
    double support_scale = 1.1;
    size_t num_subcells = 0;  // 0 means all elements are subcells
    bool activate_center_node = true;
    bool use_f_bar = true;
    SetupNodalReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar);
    TestLinearDeformationGradientThenRotation(lagrangian_formulation_type);
}
