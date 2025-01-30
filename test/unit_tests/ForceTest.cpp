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

    void RunShearTest(double magnitude, int load_direction, int load_surface, const aperi::LagrangianFormulationType& lagrangian_formulation_type = aperi::LagrangianFormulationType::Total) {
        if (m_num_procs != 1 && load_direction == 2) {
            // Exit if the number of processors is not 1
            // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
            // Thus, all DOFs are not constrained and some noise will be present in the fields.
            return;
        }

        std::vector<int> num_elements = {m_num_procs, m_num_procs, m_num_procs};
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

        std::string mesh_string;
        for (int i = 0; i < 3; i++) {
            mesh_string += std::to_string(num_elements[i]);
            if (i < 2) {
                mesh_string += "x";
            }
        }
        mesh_string += "|sideset:xXyYzZ|tets";

        // Set the displacement direction
        std::array<double, 3> displacement_direction = {0.0, 0.0, 0.0};
        displacement_direction[load_direction] = 1.0;

        // Volume of the mesh
        double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

        // Cross section area for loading direction
        double cross_section_area = m_num_procs * m_num_procs;

        // Run the problem, apply the displacement boundary conditions on the faces
        RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, side_sets[0], side_sets[1], PatchTestIntegrationScheme::GAUSS_QUADRATURE, false, lagrangian_formulation_type, true);

        // Set the expected displacement gradient
        m_displacement_gradient(load_direction, load_surface) = 2.0 * magnitude;

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

        // Check the force balance, the force sum should be zero
        CheckForceSum(expected_zero, side_sets);

        std::vector<std::string> all_surfaces = {"surface_1", "surface_2", "surface_3", "surface_4", "surface_5", "surface_6"};
        // Get the expected forces
        for (int i = 0; i < 3; i++) {
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
    }
};

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForce) {
    RunShearTest(0.1, 1, 0);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForce) {
    RunShearTest(0.1, 2, 0);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForce) {
    RunShearTest(0.1, 0, 1);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForce) {
    RunShearTest(0.1, 2, 1);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForce) {
    RunShearTest(0.1, 0, 2);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForce) {
    RunShearTest(0.1, 1, 2);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceUpdated) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Updated);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceUpdated) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Updated);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceUpdated) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Updated);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceUpdated) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Updated);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceUpdated) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Updated);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceUpdated) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Updated);
}

// Tests element calculations. Explicit test for a simple cube in shear in yx.
TEST_F(ForceTest, ExplicitShearYXForceSemi) {
    RunShearTest(0.1, 1, 0, aperi::LagrangianFormulationType::Semi);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceSemi) {
    RunShearTest(0.1, 2, 0, aperi::LagrangianFormulationType::Semi);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceSemi) {
    RunShearTest(0.1, 0, 1, aperi::LagrangianFormulationType::Semi);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceSemi) {
    RunShearTest(0.1, 2, 1, aperi::LagrangianFormulationType::Semi);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceSemi) {
    RunShearTest(0.1, 0, 2, aperi::LagrangianFormulationType::Semi);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceSemi) {
    RunShearTest(0.1, 1, 2, aperi::LagrangianFormulationType::Semi);
}