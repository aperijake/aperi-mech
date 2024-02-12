#include <MathUtils.h>
#include <gtest/gtest.h>

#include <array>

// Test the cross product of two vectors
TEST(MathUtilsTest, Cross) {
    std::array<double, 3> v1 = {1.0, 0.0, 0.0};
    std::array<double, 3> v2 = {0.0, 1.0, 0.0};

    std::array<double, 3> result = aperi::Cross(v1, v2);
    std::array<double, 3> expected = {0.0, 0.0, 1.0};

    EXPECT_EQ(result, expected);
}

// Test the subtraction of two vectors
TEST(MathUtilsTest, Subtract) {
    std::array<double, 3> v1 = {1.1, 0.0, 0.0};
    std::array<double, 3> v2 = {0.0, 2.2, 0.0};

    std::array<double, 3> result = aperi::Subtract(v1, v2);
    std::array<double, 3> expected = {1.1, -2.2, 0.0};

    EXPECT_EQ(result, expected);
}

// Test the addition of two vectors
TEST(MathUtilsTest, Add) {
    std::array<double, 3> v1 = {1.1, 0.0, 0.0};
    std::array<double, 3> v2 = {0.0, 2.2, 0.0};

    std::array<double, 3> result = aperi::Add(v1, v2);
    std::array<double, 3> expected = {1.1, 2.2, 0.0};

    EXPECT_EQ(result, expected);
}

// Test the dot product of two vectors
TEST(MathUtilsTest, Dot) {
    std::array<double, 3> v1 = {1.1, 0.0, 0.0};
    std::array<double, 3> v2 = {0.0, 2.2, 0.0};
    std::array<double, 3> v3 = {0.0, 3.3, 0.0};

    double result = aperi::Dot(v1, v2);
    double expected = 0.0;
    EXPECT_DOUBLE_EQ(result, expected);

    double result2 = aperi::Dot(v2, v3);
    double expected2 = 7.26;
    EXPECT_DOUBLE_EQ(result2, expected2);
}

// Test the volume of a tetrahedron
TEST(MathUtilsTest, TetVolume) {
    std::array<std::array<double, 3>, 4> tet = {{{0.0, 0.0, 0.0}, {1.0, 0.0, 0.0}, {0.0, 1.0, 0.0}, {0.0, 0.0, 1.0}}};
    double result = aperi::TetVolume(tet);
    double expected = 1.0 / 6.0;
    EXPECT_DOUBLE_EQ(result, expected);
}

// Test the magnitude of a vector
TEST(MathUtilsTest, Magnitude) {
    std::array<double, 3> vector = {1.0, 0.0, 0.0};
    double result = aperi::Magnitude(vector);
    double expected = 1.0;
    EXPECT_DOUBLE_EQ(result, expected);

    std::array<double, 3> vector2 = {1.0, 1.0, 1.0};
    double result2 = aperi::Magnitude(vector2);
    double expected2 = std::sqrt(3.0);
    EXPECT_DOUBLE_EQ(result2, expected2);

    std::array<double, 3> vector3 = {2.0, -3.0, 4.0};
    double result3 = aperi::Magnitude(vector3);
    double expected3 = std::sqrt(29.0);
    EXPECT_DOUBLE_EQ(result3, expected3);
}

// Test the change of length of a vector
TEST(MathUtilsTest, ChangeLength) {
    std::array<double, 3> vector = {1.0, 0.0, 0.0};
    double magnitude = aperi::ChangeLength(vector, 2.0);
    EXPECT_DOUBLE_EQ(magnitude, 1.0);
    std::array<double, 3> expected = {2.0, 0.0, 0.0};
    EXPECT_EQ(vector, expected);

    std::array<double, 3> vector2 = {1.0, 1.0, 1.0};
    double expected_magnitude = std::sqrt(3.0);
    magnitude = aperi::ChangeLength(vector2, 1.0);
    EXPECT_DOUBLE_EQ(magnitude, expected_magnitude);
    std::array<double, 3> expected2 = {1.0 / expected_magnitude, 1.0 / expected_magnitude, 1.0 / expected_magnitude};
    EXPECT_EQ(vector2, expected2);
}

// Test the constant interpolation
TEST(MathUtilsTest, ConstantInterpolation) {
    std::vector<double> abscissa = {0.0, 1.0, 2.0, 3.0};
    std::vector<double> ordinate = {0.0, 1.0, 2.0, 3.0};

    double result = aperi::ConstantInterpolation(1.5, abscissa, ordinate);
    double expected = 1.0;
    EXPECT_DOUBLE_EQ(result, expected);

    double result2 = aperi::ConstantInterpolation(3.5, abscissa, ordinate);
    double expected2 = 3.0;
    EXPECT_DOUBLE_EQ(result2, expected2);

    double result3 = aperi::ConstantInterpolation(0.0, abscissa, ordinate);
    double expected3 = 0.0;
    EXPECT_DOUBLE_EQ(result3, expected3);

    double result4 = aperi::ConstantInterpolation(-0.5, abscissa, ordinate);
    double expected4 = 0.0;
    EXPECT_DOUBLE_EQ(result4, expected4);

    double result5 = aperi::ConstantInterpolation(3.0, abscissa, ordinate);
    double expected5 = 2.0;
    EXPECT_DOUBLE_EQ(result5, expected5);
}

// Test the linear interpolation
TEST(MathUtilsTest, LinearInterpolation) {
    std::vector<double> abscissa = {0.0, 1.0, 2.0, 3.0};
    std::vector<double> ordinate = {0.0, 1.0, 2.0, 3.0};

    double result = aperi::LinearInterpolation(1.5, abscissa, ordinate);
    double expected = 1.5;
    EXPECT_DOUBLE_EQ(result, expected);

    double result2 = aperi::LinearInterpolation(3.5, abscissa, ordinate);
    double expected2 = 3.0;
    EXPECT_DOUBLE_EQ(result2, expected2);

    double result3 = aperi::LinearInterpolation(0.0, abscissa, ordinate);
    double expected3 = 0.0;
    EXPECT_DOUBLE_EQ(result3, expected3);

    double result4 = aperi::LinearInterpolation(-0.5, abscissa, ordinate);
    double expected4 = 0.0;
    EXPECT_DOUBLE_EQ(result4, expected4);

    double result5 = aperi::LinearInterpolation(3.0, abscissa, ordinate);
    double expected5 = 3.0;
    EXPECT_DOUBLE_EQ(result5, expected5);
}

// Test normalizing a vector
TEST(MathUtilsTest, Normalize) {
    std::array<double, 3> vector = {1.0, 1.0, 1.0};
    double expected_magnitude = std::sqrt(3.0);
    double magnitude = aperi::Normalize(vector);
    EXPECT_DOUBLE_EQ(magnitude, expected_magnitude);
    std::array<double, 3> expected = {1.0 / expected_magnitude, 1.0 / expected_magnitude, 1.0 / expected_magnitude};
    EXPECT_EQ(vector, expected);

    std::array<double, 3> vector3 = {1.0, 0.0, 0.0};
    expected_magnitude = aperi::Normalize(vector3);
    EXPECT_DOUBLE_EQ(expected_magnitude, 1.0);
    std::array<double, 3> expected3 = {1.0, 0.0, 0.0};
    EXPECT_EQ(vector3, expected3);
}