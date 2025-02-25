#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <string>

#include "Constants.h"
#include "PatchTestFixture.h"

class ForceTest : public PatchTest {
   protected:
    void SetUp() override {
        PatchTest::SetUp();
    }

    void TearDown() override {
        PatchTest::TearDown();
    }

    void RunShearTest(double magnitude, int load_direction, int load_surface, const aperi::LagrangianFormulationType& lagrangian_formulation_type, const PatchTestIntegrationScheme& integration_scheme, bool reproducing_kernel, int num_subcells, std::string mesh_string = "") {
        if (m_num_procs != 1 && load_surface == 2) {
            // Exit if the number of processors is not 1
            // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
            // Thus, all DOFs are not constrained and some noise will be present in the fields.
            return;
        }

        int base_size = m_num_procs;
        std::vector<int> num_elements = {base_size, base_size, base_size};
        num_elements[load_surface] = 1;
        std::vector<std::string> side_sets;
        if (load_surface == 0) {
            side_sets.push_back("surface_1");
            side_sets.push_back("surface_2");
        } else if (load_surface == 1) {
            side_sets.push_back("surface_3");
            side_sets.push_back("surface_4");
        } else if (load_surface == 2) {
            side_sets.push_back("surface_5");
            side_sets.push_back("surface_6");
        } else {
            throw std::runtime_error("Invalid load surface");
        }

        bool generate_mesh = false;

        if (mesh_string.empty()) {
            generate_mesh = true;
            // Generate the mesh string if not provided
            for (int i = 0; i < 3; i++) {
                mesh_string += std::to_string(num_elements[i]);
                if (i < 2) {
                    mesh_string += "x";
                }
            }
            mesh_string += "|sideset:xXyYzZ|tets";
        }

        // Set the displacement direction
        std::array<double, 3> displacement_direction = {0.0, 0.0, 0.0};
        displacement_direction[load_direction] = 1.0;

        // Volume of the mesh
        double volume = num_elements[0] * num_elements[1] * num_elements[2];

        // Run the problem, apply the displacement boundary conditions on the faces
        RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, side_sets[0], side_sets[1], integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh, num_subcells);

        // Set the expected displacement gradient
        m_displacement_gradient(load_direction, load_surface) = 2.0 * magnitude;

        if (reproducing_kernel) {
            SetFieldNamesWithoutCoefficients();  // Test on actual fields instead of coefficients
        }

        // Check the mass
        CheckMass(volume, {});

        // Check the displacement gradient
        CheckDisplacementGradient(m_displacement_gradient);

        // Check the pk1 stress
        Eigen::Matrix3d expected_pk1_stress = GetExpectedFirstPKStress(m_displacement_gradient);
        CheckStress(expected_pk1_stress);

        // Check the acceleration, should be zero
        Eigen::Vector3d expected_zero = Eigen::Vector3d::Zero();
        CheckAcceleration(expected_zero);

        // Set the force field name for reproducing kernel with ELEMENT_STRAIN_SMOOTHING
        if (reproducing_kernel && integration_scheme == PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING) {
            m_force_field_name = "force";  // Local field
        }

        // Check the force balance, the force sum should be zero
        CheckForceSum(expected_zero, side_sets);

        std::vector<std::string> all_surfaces = {"surface_1", "surface_2", "surface_3", "surface_4", "surface_5", "surface_6"};
        // Get the expected forces
        for (int i = 0; i < 3; i++) {
            bool is_load_surface = i == load_surface;
            if (!is_load_surface && reproducing_kernel && integration_scheme == PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS) {
                // Skip the non-load surfaces for reproducing kernel with ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS
                continue;
            }
            // Get the cross section area of the surface
            double cross_section_area = 1.0;
            for (int j = 0; j < 3; j++) {
                if (j == i) {
                    continue;
                }
                cross_section_area *= num_elements[j];
            }

            Eigen::Vector3d expected_force = GetExpectedPositiveForces(i, cross_section_area, m_displacement_gradient);

            // Check the force, one surface at a time
            CheckForceSum(expected_force, {all_surfaces[i * 2]});
            CheckForceSum(-expected_force, {all_surfaces[i * 2 + 1]});
        }

        // Check displacement
        Eigen::Vector3d expected_displacement = magnitude * Eigen::Vector3d(displacement_direction[0], displacement_direction[1], displacement_direction[2]);
        CheckDisplacement(expected_displacement, {side_sets[1]});
        CheckDisplacement(-expected_displacement, {side_sets[0]});

        // Check velocity
        Eigen::Vector3d expected_velocity = 1.875 * expected_displacement / m_final_time;
        CheckVelocity(expected_velocity, {side_sets[1]});
        CheckVelocity(-expected_velocity, {side_sets[0]});

        // This avoids deleting the static mesh in the destructor
        bool keep_mesh = !generate_mesh;
        ResetSolverTest(keep_mesh);
    }

    // Helper method to run all 6 shear scenarios
    void RunAllShearScenarios(double magnitude,
                              const aperi::LagrangianFormulationType& lagrangian_formulation_type,
                              const PatchTestIntegrationScheme& integration_scheme,
                              bool reproducing_kernel,
                              int num_subcells,
                              std::string mesh_string = "") {
        // All possible load direction and surface combinations
        const std::vector<std::pair<int, int>> scenarios = {
            {1, 0},  // yx
            {2, 0},  // zx
            {0, 1},  // xy
            {2, 1},  // zy
            {0, 2},  // xz
            {1, 2}   // yz
        };

        for (const auto& [direction, surface] : scenarios) {
            RunShearTest(magnitude, direction, surface, lagrangian_formulation_type, integration_scheme, reproducing_kernel, num_subcells, mesh_string);
        }
    }
};

// Basic Gauss quadrature tests
TEST_F(ForceTest, ExplicitShearForce) {
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false, 1);
}

// Updated Lagrangian tests
TEST_F(ForceTest, ExplicitShearForceUpdated) {
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false, 1);
}

// Semi Lagrangian tests
TEST_F(ForceTest, ExplicitShearForceSemi) {
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false, 1);
}

// Element strain smoothing tests
TEST_F(ForceTest, ExplicitShearForceSmoothedTet4) {
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false, 1);
}

// Updated Lagrangian with element strain smoothing tests
TEST_F(ForceTest, ExplicitShearForceSmoothedTet4Updated) {
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false, 1);
}

// Semi Lagrangian with element strain smoothing tests
TEST_F(ForceTest, ExplicitShearForceSmoothedTet4Semi) {
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false, 1);
}

// Reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceReproducingKernel) {
    if (SkipTest()) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true, 1);
}

// Updated Lagrangian with reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceUpdatedReproducingKernel) {
    if (SkipTest()) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true, 1);
}

// Semi Lagrangian with reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceSemiReproducingKernel) {
    if (SkipTest()) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true, 1);
}

// One pass reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceReproducingKernelOnePass) {
    if (SkipTest()) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true, 1);
}

// Updated Lagrangian with one pass reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceUpdatedReproducingKernelOnePass) {
    if (SkipTest()) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true, 1);
}

// Semi Lagrangian with one pass reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceSemiReproducingKernelOnePass) {
    if (SkipTest()) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true, 1);
}

// Nodal reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, 1, "test_inputs/thex_1x1x1_brick.exo");
}

// Semi Lagrangian with nodal reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceSemiReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, 1, "test_inputs/thex_1x1x1_brick.exo");
}

// Updated Lagrangian with nodal reproducing kernel tests
TEST_F(ForceTest, ExplicitShearForceUpdatedReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, 1, "test_inputs/thex_1x1x1_brick.exo");
}

// Reproducing kernel tests with subcells
TEST_F(ForceTest, ExplicitShearForceReproducingKernelNodalSubcells) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    // 0 subcells means every element is a subcell
    RunAllShearScenarios(0.1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, 0, "test_inputs/thex_1x1x1_brick.exo");
}
