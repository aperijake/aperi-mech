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

    void RunShearTest(double magnitude, int load_direction, int load_surface, const aperi::LagrangianFormulationType& lagrangian_formulation_type, const PatchTestIntegrationScheme& integration_scheme, bool reproducing_kernel, std::string mesh_string = "") {
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
        RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, side_sets[0], side_sets[1], integration_scheme, reproducing_kernel, lagrangian_formulation_type, generate_mesh);

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
};

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForce) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForce) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForce) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForce) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForce) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForce) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceUpdated) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceUpdated) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceUpdated) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceUpdated) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceUpdated) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceUpdated) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSemi) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSemi) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSemi) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSemi) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSemi) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSemi) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::GAUSS_QUADRATURE, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSmoothedTet4) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSmoothedTet4) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSmoothedTet4) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSmoothedTet4) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSmoothedTet4) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSmoothedTet4) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSmoothedTet4Updated) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSmoothedTet4Updated) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSmoothedTet4Updated) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSmoothedTet4Updated) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSmoothedTet4Updated) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSmoothedTet4Updated) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSmoothedTet4Semi) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSmoothedTet4Semi) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSmoothedTet4Semi) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSmoothedTet4Semi) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSmoothedTet4Semi) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSmoothedTet4Semi) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, false);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceReproducingKernel) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceReproducingKernel) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceReproducingKernel) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceReproducingKernel) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceReproducingKernel) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceReproducingKernel) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceUpdatedReproducingKernel) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceUpdatedReproducingKernel) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceUpdatedReproducingKernel) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceUpdatedReproducingKernel) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceUpdatedReproducingKernel) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceUpdatedReproducingKernel) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSemiReproducingKernel) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSemiReproducingKernel) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSemiReproducingKernel) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSemiReproducingKernel) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSemiReproducingKernel) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSemiReproducingKernel) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceReproducingKernelOnePass) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceReproducingKernelOnePass) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceReproducingKernelOnePass) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceReproducingKernelOnePass) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceReproducingKernelOnePass) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceReproducingKernelOnePass) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceUpdatedReproducingKernelOnePass) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceUpdatedReproducingKernelOnePass) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceUpdatedReproducingKernelOnePass) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceUpdatedReproducingKernelOnePass) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceUpdatedReproducingKernelOnePass) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceUpdatedReproducingKernelOnePass) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSemiReproducingKernelOnePass) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSemiReproducingKernelOnePass) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSemiReproducingKernelOnePass) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSemiReproducingKernelOnePass) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSemiReproducingKernelOnePass) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSemiReproducingKernelOnePass) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::ELEMENT_STRAIN_SMOOTHING_FORCE_ONE_PASS, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Total, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSemiReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSemiReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSemiReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSemiReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSemiReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSemiReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Semi, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceUpdatedReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceUpdatedReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceUpdatedReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceUpdatedReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceUpdatedReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceUpdatedReproducingKernelNodal) {
    if (SkipTest() || m_num_procs != 1) {
        GTEST_SKIP();
    }
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Updated, PatchTestIntegrationScheme::NODAL_STRAIN_SMOOTHING, true, "test_inputs/thex_1x1x1_brick.exo");
}
