#include <gtest/gtest.h>

#include <Eigen/Dense>
#include <string>

#include "PatchTestFixture.h"

class ForceTest : public PatchTest {
   protected:
    void SetUp() override {
        PatchTest::SetUp();
    }

    void TearDown() override {
        PatchTest::TearDown();
    }

    void RunShearTest(double magnitude, int load_surface, int load_direction, bool incremental = false) {
        if (m_num_procs != 1 && load_direction == 2) {
            // Exit if the number of processors is not 1
            // TODO(jake): Add support for parallel tests. Problem is that this is explicit and IOSS requires a at least 1 element per processor in z direction.
            // Thus, all DOFs are not constrained and some noise will be present in the fields.
            return;
        }

        std::vector<int> num_elements = {m_num_procs, m_num_procs, m_num_procs};
        num_elements[load_direction] = 1;
        std::string side_sets = "sideset:";
        if (load_direction == 0) {
            side_sets += "xX";
        } else if (load_direction == 1) {
            side_sets += "yY";
        } else if (load_direction == 2) {
            side_sets += "zZ";
        }

        std::string mesh_string;
        for (int i = 0; i < 3; i++) {
            mesh_string += std::to_string(num_elements[i]);
            if (i < 2) {
                mesh_string += "x";
            }
        }
        mesh_string += "|" + side_sets + "|tets";

        // Set the displacement direction
        std::array<double, 3> displacement_direction = {0.0, 0.0, 0.0};
        displacement_direction[load_surface] = 1.0;

        // Volume of the mesh
        double volume = m_num_procs * m_num_procs;  // 1 x num_procs x num_procs mesh

        // Cross section area for loading direction
        double cross_section_area = m_num_procs * m_num_procs;

        // Run the problem, apply the displacement boundary conditions on the faces
        RunFullyPrescribedBoundaryConditionProblem(mesh_string, displacement_direction, magnitude, "surface_1", "surface_2", PatchTestIntegrationScheme::GAUSS_QUADRATURE, false, incremental, true);

        // Set the expected displacement gradient
        m_displacement_gradient(load_surface, load_direction) = 2.0 * magnitude;

        // Get the expected forces
        Eigen::Vector3d expected_force = GetExpectedPositiveForces(load_direction, cross_section_area, m_displacement_gradient);

        // Check the force balance and the other fields
        CheckForcesAndFields(expected_force, volume);
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
TEST_F(ForceTest, ExplicitShearYXForceIncremental) {
    RunShearTest(0.1, 1, 0, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zx.
TEST_F(ForceTest, ExplicitShearZXForceIncremental) {
    RunShearTest(0.1, 2, 0, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xy.
TEST_F(ForceTest, ExplicitShearXYForceIncremental) {
    RunShearTest(0.1, 0, 1, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in zy.
TEST_F(ForceTest, ExplicitShearZYForceIncremental) {
    RunShearTest(0.1, 2, 1, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in xz.
TEST_F(ForceTest, ExplicitShearXZForceIncremental) {
    RunShearTest(0.1, 0, 2, true);
}

// Tests element calculations. Explicit test for a simple cube in shear in yz.
TEST_F(ForceTest, ExplicitShearYZForceIncremental) {
    RunShearTest(0.1, 1, 2, true);
}