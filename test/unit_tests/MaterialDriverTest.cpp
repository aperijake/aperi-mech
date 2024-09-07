#include <MaterialDriver.h>
#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <vector>

#include "CaptureOutputTestFixture.h"
#include "UnitTestUtils.h"

/*
material:
    neo_hookean:
        density: 1
        youngs_modulus: 4.4989775051124745e+6
        poissons_ratio: 0.4996591683708248
stress_output: cauchy
displacement_gradients:
    - matrix:
        - [1.0, 0.0, 0.0]
        - [0.0, -0.2927726653, 0.0]
        - [0.0, 0.0, -0.2927726653]
    - matrix:
        - [-0.2927726653, 0.0, 0.0]
        - [0.0, 1.0, 0.0]
        - [0.0, 0.0, -0.2927726653]
    - matrix:
        - [-0.2927726653, 0.0, 0.0]
        - [0.0, -0.2927726653, 0.0]
        - [0.0, 0.0, 1.0]
*/

class MaterialDriverTest : public CaptureOutputTest {
   protected:
    void SetUp() override {
        int num_procs;
        MPI_Comm_size(MPI_COMM_WORLD, &num_procs);

        if (num_procs > 1) {
            GTEST_SKIP() << "Skipping test because the number of processes is greater than 1.";
        }

        double bulk_modulus = 2.2e9;  // Pa
        double mu = 1.5e6;            // Pa
        double youngs_modulus = 9.0 * mu * bulk_modulus / (3.0 * bulk_modulus + mu);
        double poissons_ratio = (3.0 * bulk_modulus - 2.0 * mu) / (2.0 * (3.0 * bulk_modulus + mu));
        // Create the input yaml node
        m_input_node["material"]["neo_hookean"]["density"] = 1.0;
        m_input_node["material"]["neo_hookean"]["youngs_modulus"] = youngs_modulus;
        m_input_node["material"]["neo_hookean"]["poissons_ratio"] = poissons_ratio;
        m_input_node["stress_output"] = "cauchy";
        YAML::Node displacement_gradients_node(YAML::NodeType::Sequence);

        // First matrix
        YAML::Node matrix1(YAML::NodeType::Sequence);
        matrix1.push_back(YAML::Node(std::vector<double>{1.0, 0.0, 0.0}));
        matrix1.push_back(YAML::Node(std::vector<double>{0.0, -0.2927726653, 0.0}));
        matrix1.push_back(YAML::Node(std::vector<double>{0.0, 0.0, -0.2927726653}));
        YAML::Node matrix_node1;
        matrix_node1["matrix"] = matrix1;
        displacement_gradients_node.push_back(matrix_node1);

        // Second matrix (as an example, you would fill in the actual values)
        YAML::Node matrix2(YAML::NodeType::Sequence);
        matrix2.push_back(YAML::Node(std::vector<double>{-0.2927726653, 0.0, 0.0}));
        matrix2.push_back(YAML::Node(std::vector<double>{0.0, 1.0, 0.0}));
        matrix2.push_back(YAML::Node(std::vector<double>{0.0, 0.0, -0.2927726653}));
        YAML::Node matrix_node2;
        matrix_node2["matrix"] = matrix2;
        displacement_gradients_node.push_back(matrix_node2);

        // Third matrix (as an example, you would fill in the actual values)
        YAML::Node matrix3(YAML::NodeType::Sequence);
        matrix3.push_back(YAML::Node(std::vector<double>{-0.2927726653, 0.0, 0.0}));
        matrix3.push_back(YAML::Node(std::vector<double>{0.0, -0.2927726653, 0.0}));
        matrix3.push_back(YAML::Node(std::vector<double>{0.0, 0.0, 1.0}));
        YAML::Node matrix_node3;
        matrix_node3["matrix"] = matrix3;
        displacement_gradients_node.push_back(matrix_node3);

        // Finally, add the displacement_gradients_node to the main input node
        m_input_node["displacement_gradients"] = displacement_gradients_node;
    }

    YAML::Node m_input_node;
};

TEST_F(MaterialDriverTest, RunMaterialDriver) {
    // Run the material driver
    std::vector<Eigen::Matrix3d> cauchy_stresses = aperi::RunMaterialDriver(m_input_node);

    // Check the stress values
    ASSERT_EQ(cauchy_stresses.size(), 3);

    // Expected stress values, uniaxial tension in x, then y, then z
    double expected_stress_val = 5.24795e+06;
    double tolerance = expected_stress_val * 1e-6;
    for (size_t k = 0; k < 3; ++k) {
        for (size_t i = 0; i < 3; ++i) {
            for (size_t j = 0; j < 3; ++j) {
                if (i == j && i == k) {
                    EXPECT_NEAR(cauchy_stresses[k](i, j), expected_stress_val, tolerance);
                } else {
                    EXPECT_NEAR(cauchy_stresses[k](i, j), 0.0, tolerance);
                }
            }
        }
    }
}

TEST_F(MaterialDriverTest, InvalidMaterialNode) {
    // Create an input node without the material node
    YAML::Node input_node;
    std::vector<Eigen::Matrix3d> cauchy_stresses = aperi::RunMaterialDriver(input_node);
    EXPECT_TRUE(cauchy_stresses.empty());
}

// Test different stress output types
TEST_F(MaterialDriverTest, StressOutputTypes) {
    // Set the stress output type to first piola kirchhoff
    m_input_node["stress_output"] = "first_piola_kirchhoff";

    // Set the displacement gradients to be one random matrix
    srand(143);
    Eigen::Matrix3d displacement_gradient = Eigen::Matrix3d::Random();
    YAML::Node displacement_gradients_node(YAML::NodeType::Sequence);
    YAML::Node matrix;
    matrix.push_back(YAML::Node(std::vector<double>{displacement_gradient(0, 0), displacement_gradient(0, 1), displacement_gradient(0, 2)}));
    matrix.push_back(YAML::Node(std::vector<double>{displacement_gradient(1, 0), displacement_gradient(1, 1), displacement_gradient(1, 2)}));
    matrix.push_back(YAML::Node(std::vector<double>{displacement_gradient(2, 0), displacement_gradient(2, 1), displacement_gradient(2, 2)}));
    YAML::Node matrix_node;
    matrix_node["matrix"] = matrix;
    displacement_gradients_node.push_back(matrix_node);
    m_input_node["displacement_gradients"] = displacement_gradients_node;

    // Run the material driver
    std::vector<Eigen::Matrix3d> first_piola_kirchhoff_stresses = aperi::RunMaterialDriver(m_input_node);

    // Change the stress output type to cauchy
    m_input_node["stress_output"] = "cauchy";

    // Run the material driver
    std::vector<Eigen::Matrix3d> cauchy_stresses = aperi::RunMaterialDriver(m_input_node);

    // Change the stress output type to second piola kirchhoff
    m_input_node["stress_output"] = "second_piola_kirchhoff";

    // Run the material driver
    std::vector<Eigen::Matrix3d> second_piola_kirchhoff_stresses = aperi::RunMaterialDriver(m_input_node);

    // Covert the first piola kirchhoff stress to cauchy and second piola kirchhoff stresses
    Eigen::Matrix3d deformation_gradient = displacement_gradient + Eigen::Matrix3d::Identity();
    double j = deformation_gradient.determinant();
    Eigen::Matrix3d cauchy_from_first_piola_kirchhoff = 1.0 / j * first_piola_kirchhoff_stresses[0] * deformation_gradient.transpose();
    Eigen::Matrix3d second_piola_kirchhoff_from_first_piola_kirchhoff = deformation_gradient.inverse() * first_piola_kirchhoff_stresses[0];

    // Check that the stresses are consistent
    double stress_mag = first_piola_kirchhoff_stresses[0].norm();
    double tolerance = stress_mag * 1e-6;
    for (size_t i = 0; i < 3; ++i) {
        for (size_t j = 0; j < 3; ++j) {
            EXPECT_NEAR(cauchy_stresses[0](i, j), cauchy_from_first_piola_kirchhoff(i, j), tolerance);
            EXPECT_NEAR(second_piola_kirchhoff_stresses[0](i, j), second_piola_kirchhoff_from_first_piola_kirchhoff(i, j), tolerance);
        }
    }
}