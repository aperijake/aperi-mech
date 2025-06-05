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

// Test the tetrahedron volume computation
TEST(MathUtilsTest, TetVolume) {
    // Test Case 1: Regular tetrahedron (unit)
    {
        Eigen::Matrix<double, 4, 3, Eigen::RowMajor> tet;
        tet.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        tet.row(1) = Eigen::Vector3d(1.0, 0.0, 0.0);
        tet.row(2) = Eigen::Vector3d(0.0, 1.0, 0.0);
        tet.row(3) = Eigen::Vector3d(0.0, 0.0, 1.0);

        double volume = aperi::TetVolume(tet);
        double expected = 1.0 / 6.0;  // Volume of this unit tetrahedron is 1/6
        EXPECT_NEAR(volume, expected, 1.0e-12);
    }

    // Test Case 2: Scaled tetrahedron (uniform scale by 2)
    {
        Eigen::Matrix<double, 4, 3, Eigen::RowMajor> tet;
        tet.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        tet.row(1) = Eigen::Vector3d(2.0, 0.0, 0.0);
        tet.row(2) = Eigen::Vector3d(0.0, 2.0, 0.0);
        tet.row(3) = Eigen::Vector3d(0.0, 0.0, 2.0);

        double volume = aperi::TetVolume(tet);
        double expected = 8.0 / 6.0;  // Scale by 2 in each dimension: 2³/6 = 8/6
        EXPECT_NEAR(volume, expected, 1.0e-12);
    }

    // Test Case 3: Translated tetrahedron (shouldn't change volume)
    {
        Eigen::Matrix<double, 4, 3, Eigen::RowMajor> tet;
        tet.row(0) = Eigen::Vector3d(1.0, 1.0, 1.0);
        tet.row(1) = Eigen::Vector3d(2.0, 1.0, 1.0);
        tet.row(2) = Eigen::Vector3d(1.0, 2.0, 1.0);
        tet.row(3) = Eigen::Vector3d(1.0, 1.0, 2.0);

        double volume = aperi::TetVolume(tet);
        double expected = 1.0 / 6.0;  // Same as unit tet, just translated
        EXPECT_NEAR(volume, expected, 1.0e-12);
    }

    // Test Case 4: Irregular tetrahedron
    {
        Eigen::Matrix<double, 4, 3, Eigen::RowMajor> tet;
        tet.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        tet.row(1) = Eigen::Vector3d(3.0, 0.0, 0.0);
        tet.row(2) = Eigen::Vector3d(0.0, 2.0, 0.0);
        tet.row(3) = Eigen::Vector3d(0.0, 0.0, 4.0);

        double volume = aperi::TetVolume(tet);
        double expected = 3.0 * 2.0 * 4.0 / 6.0;  // Volume = (base area × height)/3 = (3×2×4)/6
        EXPECT_NEAR(volume, expected, 1.0e-12);
    }

    // Test Case 5: Zero-volume (degenerate) tetrahedron
    {
        Eigen::Matrix<double, 4, 3, Eigen::RowMajor> tet;
        tet.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        tet.row(1) = Eigen::Vector3d(1.0, 0.0, 0.0);
        tet.row(2) = Eigen::Vector3d(2.0, 0.0, 0.0);
        tet.row(3) = Eigen::Vector3d(3.0, 0.0, 0.0);  // All points on a line

        double volume = aperi::TetVolume(tet);
        EXPECT_NEAR(volume, 0.0, 1.0e-12);
    }

    // Test Case 6: Negative orientation (should still give positive volume)
    {
        Eigen::Matrix<double, 4, 3, Eigen::RowMajor> tet;
        tet.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        tet.row(1) = Eigen::Vector3d(0.0, 1.0, 0.0);  // Swapped vertices 1 and 2
        tet.row(2) = Eigen::Vector3d(1.0, 0.0, 0.0);  // which negates the volume
        tet.row(3) = Eigen::Vector3d(0.0, 0.0, 1.0);

        double volume = aperi::TetVolume(tet);
        double expected = 1.0 / 6.0;  // Using abs() should give same volume
        EXPECT_NEAR(volume, expected, 1.0e-12);
    }
}

// Test the hexahedron volume computation
TEST(MathUtilsTest, ComputeHexahedronVolume) {
    // Test Case 1: Unit cube [0,1]^3
    {
        Eigen::Matrix<double, 8, 3> cube;
        cube.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        cube.row(1) = Eigen::Vector3d(1.0, 0.0, 0.0);
        cube.row(2) = Eigen::Vector3d(1.0, 1.0, 0.0);
        cube.row(3) = Eigen::Vector3d(0.0, 1.0, 0.0);
        cube.row(4) = Eigen::Vector3d(0.0, 0.0, 1.0);
        cube.row(5) = Eigen::Vector3d(1.0, 0.0, 1.0);
        cube.row(6) = Eigen::Vector3d(1.0, 1.0, 1.0);
        cube.row(7) = Eigen::Vector3d(0.0, 1.0, 1.0);

        double volume = aperi::ComputeHexahedronVolume(cube);
        EXPECT_NEAR(volume, 1.0, 1.0e-12);
    }

    // Test Case 2: Scaled cube - scale by 2 in each direction
    {
        Eigen::Matrix<double, 8, 3> scaled_cube;
        scaled_cube.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        scaled_cube.row(1) = Eigen::Vector3d(2.0, 0.0, 0.0);
        scaled_cube.row(2) = Eigen::Vector3d(2.0, 2.0, 0.0);
        scaled_cube.row(3) = Eigen::Vector3d(0.0, 2.0, 0.0);
        scaled_cube.row(4) = Eigen::Vector3d(0.0, 0.0, 2.0);
        scaled_cube.row(5) = Eigen::Vector3d(2.0, 0.0, 2.0);
        scaled_cube.row(6) = Eigen::Vector3d(2.0, 2.0, 2.0);
        scaled_cube.row(7) = Eigen::Vector3d(0.0, 2.0, 2.0);

        double volume = aperi::ComputeHexahedronVolume(scaled_cube);
        EXPECT_NEAR(volume, 8.0, 1.0e-12);  // 2³ = 8
    }

    // Test Case 3: Rectangular prism
    {
        Eigen::Matrix<double, 8, 3> prism;
        prism.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        prism.row(1) = Eigen::Vector3d(2.0, 0.0, 0.0);
        prism.row(2) = Eigen::Vector3d(2.0, 3.0, 0.0);
        prism.row(3) = Eigen::Vector3d(0.0, 3.0, 0.0);
        prism.row(4) = Eigen::Vector3d(0.0, 0.0, 4.0);
        prism.row(5) = Eigen::Vector3d(2.0, 0.0, 4.0);
        prism.row(6) = Eigen::Vector3d(2.0, 3.0, 4.0);
        prism.row(7) = Eigen::Vector3d(0.0, 3.0, 4.0);

        double volume = aperi::ComputeHexahedronVolume(prism);
        EXPECT_NEAR(volume, 24.0, 1.0e-12);  // 2 × 3 × 4 = 24
    }

    // Test Case 4: Non-planar faces - "twisted" cube
    {
        Eigen::Matrix<double, 8, 3> twisted_cube;
        twisted_cube.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        twisted_cube.row(1) = Eigen::Vector3d(1.0, 0.0, 0.0);
        twisted_cube.row(2) = Eigen::Vector3d(1.0, 1.0, 0.0);
        twisted_cube.row(3) = Eigen::Vector3d(0.0, 1.0, 0.0);
        twisted_cube.row(4) = Eigen::Vector3d(0.0, 0.0, 1.0);
        twisted_cube.row(5) = Eigen::Vector3d(1.0, 0.0, 1.0);
        twisted_cube.row(6) = Eigen::Vector3d(1.0, 1.0, 1.0);
        // Modify one vertex to create non-planar face
        twisted_cube.row(7) = Eigen::Vector3d(0.0, 1.0, 1.5);

        double volume = aperi::ComputeHexahedronVolume(twisted_cube);
        // Volume should be larger than 1.0 since we're extending one vertex outward
        EXPECT_GT(volume, 1.0);

        // Create a reference cube for comparison
        Eigen::Matrix<double, 8, 3> reference_cube = twisted_cube;
        reference_cube.row(7) = Eigen::Vector3d(0.0, 1.0, 1.0);

        double reference_volume = aperi::ComputeHexahedronVolume(reference_cube);
        EXPECT_GT(volume, reference_volume);
    }

    // Test Case 5: Translated cube - should maintain volume
    {
        Eigen::Matrix<double, 8, 3> translated_cube;
        translated_cube.row(0) = Eigen::Vector3d(1.0, 2.0, 3.0);
        translated_cube.row(1) = Eigen::Vector3d(2.0, 2.0, 3.0);
        translated_cube.row(2) = Eigen::Vector3d(2.0, 3.0, 3.0);
        translated_cube.row(3) = Eigen::Vector3d(1.0, 3.0, 3.0);
        translated_cube.row(4) = Eigen::Vector3d(1.0, 2.0, 4.0);
        translated_cube.row(5) = Eigen::Vector3d(2.0, 2.0, 4.0);
        translated_cube.row(6) = Eigen::Vector3d(2.0, 3.0, 4.0);
        translated_cube.row(7) = Eigen::Vector3d(1.0, 3.0, 4.0);

        double volume = aperi::ComputeHexahedronVolume(translated_cube);
        EXPECT_NEAR(volume, 1.0, 1.0e-12);
    }

    // Test Case 6: Zero-volume hexahedron (all vertices on one plane)
    {
        Eigen::Matrix<double, 8, 3> flat_hex;
        flat_hex.row(0) = Eigen::Vector3d(0.0, 0.0, 0.0);
        flat_hex.row(1) = Eigen::Vector3d(1.0, 0.0, 0.0);
        flat_hex.row(2) = Eigen::Vector3d(1.0, 1.0, 0.0);
        flat_hex.row(3) = Eigen::Vector3d(0.0, 1.0, 0.0);
        flat_hex.row(4) = Eigen::Vector3d(0.0, 0.0, 0.0);
        flat_hex.row(5) = Eigen::Vector3d(1.0, 0.0, 0.0);
        flat_hex.row(6) = Eigen::Vector3d(1.0, 1.0, 0.0);
        flat_hex.row(7) = Eigen::Vector3d(0.0, 1.0, 0.0);

        double volume = aperi::ComputeHexahedronVolume(flat_hex);
        EXPECT_NEAR(volume, 0.0, 1.0e-12);
    }
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

// Test the smooth step interpolation
TEST(MathUtilsTest, SmoothStepInterpolation) {
    std::vector<double> abscissa = {0.0, 1.0, 2.0, 3.0};
    std::vector<double> ordinate = {0.0, 1.0, 2.0, 3.0};

    // Value at t_s = 0.75
    double t_s_75 = 0.75 * 0.75 * 0.75 * (10.0 - 15.0 * 0.75 + 6.0 * 0.75 * 0.75);

    // Value at t_s = 0.6
    double t_s_6 = 0.6 * 0.6 * 0.6 * (10.0 - 15.0 * 0.6 + 6.0 * 0.6 * 0.6);

    std::vector<double> eval_points = {-0.5, 0.0, 0.5, 0.75, 1.0, 1.5, 2.0, 2.6, 3.0};
    std::vector<double> expected_values = {0.0, 0.0, 0.5, t_s_75, 1.0, 1.5, 2.0, t_s_6 + 2.0, 3.0};

    for (size_t i = 0; i < eval_points.size(); ++i) {
        double result = aperi::SmoothStepInterpolation(eval_points[i], abscissa, ordinate);
        EXPECT_DOUBLE_EQ(result, expected_values[i]);
    }
}

// Test the smooth step interpolation derivative
TEST(MathUtilsTest, SmoothStepInterpolationDerivative) {
    std::vector<double> abscissa = {0.0, 1.0, 2.0, 3.0};
    std::vector<double> ordinate = {0.0, 1.0, 2.0, 3.0};

    // lambda function for the derivative
    auto derivative = [](double x) {
        return 30.0 * x * x - 60.0 * x * x * x + 30.0 * x * x * x * x;
    };

    std::vector<double> eval_points = {-0.5, 0.0, 0.5, 0.75, 1.0, 1.5, 2.0, 2.6, 3.0};
    std::vector<double> expected_values = {0.0, 0.0, derivative(0.5), derivative(0.75), 0.0, derivative(0.5), 0.0, derivative(0.6), 0.0};

    for (size_t i = 0; i < eval_points.size(); ++i) {
        double result = aperi::SmoothStepInterpolationDerivative(eval_points[i], abscissa, ordinate);
        EXPECT_NEAR(result, expected_values[i], 1.0e-14);
    }
}

// Test the smooth step interpolation second derivative
TEST(MathUtilsTest, SmoothStepInterpolationSecondDerivative) {
    std::vector<double> abscissa = {0.0, 1.0, 2.0, 3.0};
    std::vector<double> ordinate = {0.0, 1.0, 2.0, 3.0};

    // lambda function for the second derivative
    auto second_derivative = [](double x) {
        return 60.0 * x - 180.0 * x * x + 120.0 * x * x * x;
    };
    std::vector<double> eval_points = {-0.5, 0.0, 0.5, 0.75, 1.0, 1.5, 2.0, 2.6, 3.0};
    std::vector<double> expected_values = {0.0, 0.0, second_derivative(0.5), second_derivative(0.75), 0.0, second_derivative(0.5), 0.0, second_derivative(0.6), 0.0};

    for (size_t i = 0; i < eval_points.size(); ++i) {
        double result = aperi::SmoothStepInterpolationSecondDerivative(eval_points[i], abscissa, ordinate);
        EXPECT_NEAR(result, expected_values[i], 1.0e-14);
    }
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

template <typename T, typename Func>
void RunTestDevice(const std::vector<T> &values, const std::vector<T> &expected, Func &func) {
    // Test on device with Kokkos
    Kokkos::View<T *> values_view("values_view", values.size());

    // Set up host views
    auto values_host = Kokkos::create_mirror_view(values_view);

    // Set up values on host
    for (size_t i = 0; i < values.size(); ++i) {
        values_host(i) = values[i];
    }

    // Copy to device
    Kokkos::deep_copy(values_view, values_host);

    // Create a view for num_unique
    Kokkos::View<size_t *> num_unique("num_unique", 1);

    // Run the function
    Kokkos::parallel_for(
        "MathUtilsTest", Kokkos::RangePolicy<>(0, 1),
        KOKKOS_LAMBDA(const int /*i*/) {
            func(values_view, values_view.size(), num_unique);
        });

    // Copy num_unique back to the host
    Kokkos::View<size_t *>::HostMirror num_unique_host = Kokkos::create_mirror_view(num_unique);
    Kokkos::deep_copy(num_unique_host, num_unique);

    // Now you can use h_num_unique_view() on the host
    EXPECT_EQ(num_unique_host(0), expected.size());

    Kokkos::fence();

    // Copy values back to host
    Kokkos::deep_copy(values_host, values_view);

    // Check the results
    for (size_t i = 0; i < expected.size(); ++i) {
        EXPECT_EQ(values_host(i), expected[i]);
    }
}

// Sort and remove functor
template <typename T>
struct SortAndRemoveDuplicatesFunctor {
    KOKKOS_INLINE_FUNCTION void operator()(Kokkos::View<T *> values_view, size_t num_values, const Kokkos::View<size_t *> &num_unique) const {
        num_unique(0) = aperi::SortAndRemoveDuplicates(values_view, num_values);
    }
};

// Remove duplicates functor
template <typename T>
struct RemoveDuplicatesFunctor {
    KOKKOS_INLINE_FUNCTION void operator()(Kokkos::View<T *> values_view, size_t num_values, const Kokkos::View<size_t *> &num_unique) const {
        num_unique(0) = aperi::RemoveDuplicates(values_view, num_values);
    }
};

template <typename T>
void RunSortAndRemoveDuplicatesTestDevice(const std::vector<T> &values, const std::vector<T> &expected) {
    SortAndRemoveDuplicatesFunctor<T> func;
    RunTestDevice(values, expected, func);
}

template <typename T>
void RunRemoveDuplicatesTestDevice(const std::vector<T> &values, const std::vector<T> &expected) {
    RemoveDuplicatesFunctor<T> func;
    RunTestDevice(values, expected, func);
}

template <typename T>
void RunSortAndRemoveDuplicatesTest(const std::vector<T> &values, const std::vector<T> &expected) {
    std::vector<T> sorted_values = values;
    size_t num_unique = aperi::SortAndRemoveDuplicates(sorted_values, sorted_values.size());
    EXPECT_EQ(num_unique, expected.size());
    sorted_values.resize(num_unique);
    EXPECT_EQ(sorted_values, expected);
}

template <typename T>
void RunRemoveDuplicatesTest(const std::vector<T> &values, const std::vector<T> &expected) {
    std::vector<T> unique_values = values;
    size_t num_unique = aperi::RemoveDuplicates(unique_values, unique_values.size());
    EXPECT_EQ(num_unique, expected.size());
    unique_values.resize(num_unique);
    EXPECT_EQ(unique_values, expected);
}

// Test the sort and remove duplicates function
TEST(MathUtilsTest, SortAndRemoveDuplicates) {
    std::vector<double> values = {1.0, 2.0, 3.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0};
    std::vector<double> expected = {1.0, 2.0, 3.0, 4.0, 5.0, 6.0};
    RunSortAndRemoveDuplicatesTest(values, expected);
    RunSortAndRemoveDuplicatesTestDevice(values, expected);

    std::vector<double> values2 = {6.0, 5.0, 4.0, 3.0, 2.0, 1.0};
    std::vector<double> expected2 = {1.0, 2.0, 3.0, 4.0, 5.0, 6.0};
    RunSortAndRemoveDuplicatesTest(values2, expected2);
    RunSortAndRemoveDuplicatesTestDevice(values2, expected2);

    std::vector<size_t> values3 = {10, 19, 20, 22, 28, 14, 20, 22, 23, 24, 26, 32, 13, 19, 22, 23, 25, 31, 23, 29, 31, 32, 33, 35, 41};
    std::vector<size_t> expected3 = {10, 13, 14, 19, 20, 22, 23, 24, 25, 26, 28, 29, 31, 32, 33, 35, 41};
    RunSortAndRemoveDuplicatesTest(values3, expected3);
    RunSortAndRemoveDuplicatesTestDevice(values3, expected3);
}

// Test the remove duplicates function
TEST(MathUtilsTest, RemoveDuplicates) {
    std::vector<double> values = {1.0, 2.0, 3.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0};
    std::vector<double> expected = {1.0, 2.0, 3.0, 4.0, 5.0, 6.0};
    RunRemoveDuplicatesTest(values, expected);
    RunRemoveDuplicatesTestDevice(values, expected);

    std::vector<double> values2 = {6.0, 5.0, 4.0, 3.0, 2.0, 1.0};
    const std::vector<double> &expected2 = values2;
    RunRemoveDuplicatesTest(values2, expected2);
    RunRemoveDuplicatesTestDevice(values2, expected2);

    std::vector<size_t> values3 = {10, 19, 20, 22, 28, 14, 20, 22, 23, 24, 26, 32, 13, 19, 22, 23, 25, 31, 23, 29, 31, 32, 33, 35, 41};
    std::vector<size_t> expected3 = {10, 19, 20, 22, 28, 14, 23, 24, 26, 32, 13, 25, 31, 29, 33, 35, 41};
    RunRemoveDuplicatesTest(values3, expected3);
    RunRemoveDuplicatesTestDevice(values3, expected3);
}

// Test kernel value
TEST(MathUtilsTest, KernelValue) {
    Eigen::Vector3d vector_neighbor_to_point = {0.0, 0.0, 0.0};
    double r = 2.0;
    double alpha = 1.6;
    double kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r * alpha);
    EXPECT_NEAR(kernel_value, 1.0, 1.0e-12);

    vector_neighbor_to_point = {r * alpha, 0.0, 0.0};
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r * alpha);
    EXPECT_NEAR(kernel_value, 0.0, 1.0e-12);

    vector_neighbor_to_point = {0.0, r * alpha / 2.0, 0.0};
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r * alpha);
    EXPECT_NEAR(kernel_value, 0.25, 1.0e-12);

    double epsilon = 1.0e-6;
    vector_neighbor_to_point(1) += epsilon;
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r * alpha);
    EXPECT_NEAR(kernel_value, 0.25, epsilon);

    vector_neighbor_to_point(1) -= 2.0 * epsilon;
    kernel_value = aperi::ComputeKernel(vector_neighbor_to_point, r * alpha);
    EXPECT_NEAR(kernel_value, 0.25, epsilon);
}

TEST(MathUtilsTest, DetApIm1) {
    Eigen::Matrix3d matrix = Eigen::Matrix3d::Random();
    Eigen::Matrix3d matrix_ap_i = matrix + Eigen::Matrix3d::Identity();
    double det = matrix_ap_i.determinant();
    double det_ap_i = aperi::DetApIm1(matrix) + 1.0;
    EXPECT_NEAR(det_ap_i, det, 1.0e-12);
}

TEST(MathUtilsTest, ElementIntersects) {
    // Unit hex element planes
    /*
     * Reference:
     *   Hughes, T.J.R. The Finite Element Method: Linear Static and Dynamic Finite Element Analysis. Dover Civil and Mechanical Engineering. Dover Publications, 2012.
     *   Section 3.5 ~Page 225
     *    Nodes:
     *   7-------6
     *  /|      /|      +z
     * 4-------5 |      |
     * | |     | |      |
     * | 3-----|-2      o---- +x
     * |/      |/      /
     * 0-------1      -y
     *
     * Changing the coordinates to be in the range [0, 1] for the unit cube instead of [-1, 1] for the parent element
     * - Node 0:  0,  0,  0
     * - Node 1:  1,  0,  0
     * - Node 2:  1,  1,  0
     * - Node 3:  0,  1,  0
     * - Node 4:  0,  0,  1
     * - Node 5:  1,  0,  1
     * - Node 6:  1,  1,  1
     * - Node 7:  0,  1,  1
     */
    // Define the vertices of the unit cube
    Eigen::Vector3d v0(0.0, 0.0, 0.0);  // Origin vertex
    Eigen::Vector3d v1(1.0, 0.0, 0.0);  // Vertex at (1,0,0)
    Eigen::Vector3d v2(1.0, 1.0, 0.0);  // Vertex at (1,1,0)
    Eigen::Vector3d v3(0.0, 1.0, 0.0);  // Vertex at (0,1,0)
    Eigen::Vector3d v4(0.0, 0.0, 1.0);  // Vertex at (0,0,1)
    Eigen::Vector3d v5(1.0, 0.0, 1.0);  // Vertex at (1,0,1)
    Eigen::Vector3d v6(1.0, 1.0, 1.0);  // Vertex at (1,1,1)
    Eigen::Vector3d v7(0.0, 1.0, 1.0);  // Vertex at (0,1,1)

    // Unit hex element planes. front, right, back, left, bottom, top
    Kokkos::Array<Eigen::Hyperplane<double, 3>, 6> planes;
    planes[0] = Eigen::Hyperplane<double, 3>::Through(v5, v1, v0);  // y=1 plane (front)
    planes[1] = Eigen::Hyperplane<double, 3>::Through(v6, v2, v1);  // x=1 plane (right)
    planes[2] = Eigen::Hyperplane<double, 3>::Through(v7, v3, v2);  // y=0 plane (back)
    planes[3] = Eigen::Hyperplane<double, 3>::Through(v7, v4, v0);  // x=0 plane (left)
    planes[4] = Eigen::Hyperplane<double, 3>::Through(v2, v3, v0);  // z=0 plane (bottom)
    planes[5] = Eigen::Hyperplane<double, 3>::Through(v6, v5, v4);  // z=1 plane (top)

    // Intersects and exits on the right face
    Eigen::Vector3d a(-1.0, 0.5, 0.5);
    Eigen::Vector3d b(2.0, 0.5, 0.5);
    aperi::VectorElementIntersectionData result = aperi::VectorElementIntersection(a, b, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 3);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects and exits on the left face
    Eigen::Vector3d c(2.0, 0.5, 0.5);
    Eigen::Vector3d d(-1.0, 0.5, 0.5);
    result = aperi::VectorElementIntersection(c, d, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 1);
    EXPECT_EQ(result.exit_face, 3);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects and exits on the front face
    Eigen::Vector3d e(0.5, -1.0, 0.5);
    Eigen::Vector3d f(0.5, 2.0, 0.5);
    result = aperi::VectorElementIntersection(e, f, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 0);
    EXPECT_EQ(result.exit_face, 2);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects and exits on the back face
    Eigen::Vector3d g(0.5, 2.0, 0.5);
    Eigen::Vector3d h(0.5, -1.0, 0.5);
    result = aperi::VectorElementIntersection(g, h, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 2);
    EXPECT_EQ(result.exit_face, 0);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects and exits on the top face
    Eigen::Vector3d i(0.5, 0.5, -1.0);
    Eigen::Vector3d j(0.5, 0.5, 2.0);
    result = aperi::VectorElementIntersection(i, j, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 4);
    EXPECT_EQ(result.exit_face, 5);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects and exits on the bottom face
    Eigen::Vector3d k(0.5, 0.5, 2.0);
    Eigen::Vector3d l(0.5, 0.5, -1.0);
    result = aperi::VectorElementIntersection(k, l, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 5);
    EXPECT_EQ(result.exit_face, 4);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Check if the vector does not intersect the element
    Eigen::Vector3d m(2.0, 2.0, 2.0);
    Eigen::Vector3d n(3.0, 3.0, 3.0);
    result = aperi::VectorElementIntersection(m, n, planes);
    EXPECT_FALSE(result.intersects);
    EXPECT_EQ(result.exit_face, -1);

    // Intersects and exits on the right face, but starts inside the element
    Eigen::Vector3d o(0.5, 0.5, 0.5);
    Eigen::Vector3d p(1.5, 0.5, 0.5);
    result = aperi::VectorElementIntersection(o, p, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, -1);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 0.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 0.5, 1.0e-10);

    // Is all on the left face, but enters on the bottom face and exits on the top face
    Eigen::Vector3d q(0.0, 0.1, -1.0);
    Eigen::Vector3d r(0.0, 0.9, 2.0);
    result = aperi::VectorElementIntersection(q, r, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 4);
    EXPECT_EQ(result.exit_face, 5);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);
}

TEST(MathUtilsTest, ElementIntersectsTet) {
    // Tet element planes
    /*
      Nodes:
        0:  0,  0,  0
        1:  1,  0,  0
        2:  0,  1,  0
        3:  0,  0,  1

      Faces:
        0: 0, 1, 3
        1: 1, 2, 3
        2: 0, 3, 2
        3: 0, 2, 1
     */
    // Define the vertices of the unit cube
    Eigen::Vector3d v0(0.0, 0.0, 0.0);
    Eigen::Vector3d v1(1.0, 0.0, 0.0);
    Eigen::Vector3d v2(0.0, 1.0, 0.0);
    Eigen::Vector3d v3(0.0, 0.0, 1.0);

    // Tet element planes
    Kokkos::Array<Eigen::Hyperplane<double, 3>, 4> planes;
    planes[0] = Eigen::Hyperplane<double, 3>::Through(v3, v1, v0);
    planes[1] = Eigen::Hyperplane<double, 3>::Through(v3, v2, v1);
    planes[2] = Eigen::Hyperplane<double, 3>::Through(v2, v3, v0);
    planes[3] = Eigen::Hyperplane<double, 3>::Through(v1, v2, v0);

    // Intersects, left to right. Very near the edge
    double epsilon = 1.0e-14;
    Eigen::Vector3d a(-1.0, epsilon, epsilon);
    Eigen::Vector3d b(2.0, epsilon, epsilon);
    aperi::VectorElementIntersectionData result = aperi::VectorElementIntersection(a, b, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 2);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects, left to right. Towards the middle of the face
    a = Eigen::Vector3d(-1.0, 0.5, 0.5);
    b = Eigen::Vector3d(2.0, 0.5, 0.5);
    result = aperi::VectorElementIntersection(a, b, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 2);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);

    // Intersects, bottom to top
    a = Eigen::Vector3d(epsilon, epsilon, -1.0);
    b = Eigen::Vector3d(epsilon, epsilon, 2.0);
    result = aperi::VectorElementIntersection(a, b, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 3);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects, bottom to top. Towards the middle of the face
    a = Eigen::Vector3d(0.5, 0.5, -1.0);
    b = Eigen::Vector3d(0.5, 0.5, 2.0);
    result = aperi::VectorElementIntersection(a, b, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 3);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);

    // Intersects, front to back. Near the edge
    a = Eigen::Vector3d(epsilon, -1.0, epsilon);
    b = Eigen::Vector3d(epsilon, 2.0, epsilon);
    result = aperi::VectorElementIntersection(a, b, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 0);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
    EXPECT_NEAR(result.exit_distance, 2.0 / 3.0, 1.0e-10);

    // Intersects, front to back. Towards the middle of the face
    a = Eigen::Vector3d(0.5, -1.0, 0.5);
    b = Eigen::Vector3d(0.5, 2.0, 0.5);
    result = aperi::VectorElementIntersection(a, b, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.entry_face, 0);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_NEAR(result.entry_distance, 1.0 / 3.0, 1.0e-10);
}

TEST(MathUtilsTest, ElementIntersectsProblemCases) {
    /*
    Points_0,Points_1,Points_2
     0.5,0.5,0
     0,0,0.5
     0,0.25,0.75
     0,0.5,0.5
     0.5,0.5,0.5
     -0.166666667,0.166666667,0.666666667
     0.166666667,0.5,0.666666667
     0.166666667,0.166666667,0.666666667
    */
    // Define the vertices of the cube
    Eigen::Vector3d v0(0.5, 0.5, 0.0);
    Eigen::Vector3d v1(0.0, 0.0, 0.5);
    Eigen::Vector3d v2(0.0, 0.25, 0.75);
    Eigen::Vector3d v3(0.0, 0.5, 0.5);
    Eigen::Vector3d v4(0.5, 0.5, 0.5);
    Eigen::Vector3d v5(-1.0 / 6.0, 1.0 / 6.0, 2.0 / 3.0);
    Eigen::Vector3d v6(1.0 / 6.0, 0.5, 2.0 / 3.0);
    Eigen::Vector3d v7(1.0 / 6.0, 1.0 / 6.0, 2.0 / 3.0);

    // Unit hex element planes
    Kokkos::Array<Eigen::Hyperplane<double, 3>, 6> planes;
    planes[0] = Eigen::Hyperplane<double, 3>::Through(v0, v4, v6);
    planes[1] = Eigen::Hyperplane<double, 3>::Through(v0, v1, v7);
    planes[2] = Eigen::Hyperplane<double, 3>::Through(v0, v3, v5);
    planes[3] = Eigen::Hyperplane<double, 3>::Through(v1, v5, v2);
    planes[4] = Eigen::Hyperplane<double, 3>::Through(v2, v6, v4);
    planes[5] = Eigen::Hyperplane<double, 3>::Through(v2, v5, v3);

    Eigen::Vector3d from(0.0, 0.25, 0.75);
    Eigen::Vector3d to(0.5, -0.5, 0.0);
    aperi::VectorElementIntersectionData result = aperi::VectorElementIntersection(from, to, planes);
    EXPECT_TRUE(result.intersects);
    EXPECT_EQ(result.exit_face, 1);
    EXPECT_EQ(result.entry_distance, 0.0);
    EXPECT_NEAR(result.exit_distance, 0.2, 1.0e-10);
}

// Test the NearPoint function
TEST(MathUtilsTest, NearPoint) {
    // Test case 1: A point that is exactly equal to one of the points in the array
    {
        Kokkos::Array<Eigen::Vector3d, 3> points = {
            Eigen::Vector3d(0.0, 0.0, 0.0),
            Eigen::Vector3d(1.0, 0.0, 0.0),
            Eigen::Vector3d(0.0, 1.0, 0.0)};
        Eigen::Vector3d test_point(1.0, 0.0, 0.0);
        int result = aperi::NearPoint<3>(test_point, points);
        EXPECT_EQ(result, 1);  // Should find the second point (index 1)
    }

    // Test case 2: A point that is close to one of the points (within tolerance)
    {
        Kokkos::Array<Eigen::Vector3d, 3> points = {
            Eigen::Vector3d(0.0, 0.0, 0.0),
            Eigen::Vector3d(1.0, 0.0, 0.0),
            Eigen::Vector3d(0.0, 1.0, 0.0)};
        // With custom tolerance and ball radius squared 5/9
        Eigen::Vector3d test_point(1.0, 1e-4, 1e-4);
        int result = aperi::NearPoint<3>(test_point, points, 0.01);
        EXPECT_EQ(result, 1);  // Should find the second point (index 1)
    }

    // Test case 3: A point that is not close to any point in the array
    {
        Kokkos::Array<Eigen::Vector3d, 3> points = {
            Eigen::Vector3d(0.0, 0.0, 0.0),
            Eigen::Vector3d(1.0, 0.0, 0.0),
            Eigen::Vector3d(0.0, 1.0, 0.0)};
        Eigen::Vector3d test_point(0.5, 0.5, 0.5);
        int result = aperi::NearPoint<3>(test_point, points);
        EXPECT_EQ(result, -1);  // Should not find any point
    }

    // Test case 4: An edge case with a single point in the array
    {
        Kokkos::Array<Eigen::Vector3d, 1> points = {
            Eigen::Vector3d(0.0, 0.0, 0.0)};
        Eigen::Vector3d test_point(0.0, 0.0, 0.0);
        int result = aperi::NearPoint<1>(test_point, points);
        EXPECT_EQ(result, 0);  // Should find the only point
    }

    // Test case 5: A case with a custom tolerance value
    {
        Kokkos::Array<Eigen::Vector3d, 3> points = {
            Eigen::Vector3d(0.0, 0.0, 0.0),
            Eigen::Vector3d(1.0, 0.0, 0.0),
            Eigen::Vector3d(0.0, 1.0, 0.0)};
        // Center is (1/3, 1/3, 0), max squared distance is 5/9
        // With tolerance 0.1, threshold is 5/9 * 0.1 ≈ 0.056
        // Distance squared from (0.9, 0.1, 0.1) to (1,0,0) is 0.03
        Eigen::Vector3d test_point(0.9, 0.1, 0.1);
        int result = aperi::NearPoint<3>(test_point, points, 0.1);
        EXPECT_EQ(result, 1);  // Should find the second point (index 1)
    }

    // Test case 6: Points with large separation
    {
        Kokkos::Array<Eigen::Vector3d, 3> points = {
            Eigen::Vector3d(0.0, 0.0, 0.0),
            Eigen::Vector3d(10.0, 0.0, 0.0),
            Eigen::Vector3d(0.0, 10.0, 0.0)};
        // Center is (10/3, 10/3, 0), max squared distance is 200/9
        Eigen::Vector3d test_point(10.0, 0.001, 0.001);
        int result = aperi::NearPoint<3>(test_point, points, 0.0001);
        EXPECT_EQ(result, 1);  // Should find the second point (index 1)
    }

    // Test case 7: Point close to multiple points (should return the first match)
    {
        Kokkos::Array<Eigen::Vector3d, 3> points = {
            Eigen::Vector3d(0.0, 0.0, 0.0),
            Eigen::Vector3d(1.0, 0.0, 0.0),
            Eigen::Vector3d(1.0, 1e-8, 0.0)  // Very close to the second point
        };
        // Point equally close to points at index 1 and 2
        Eigen::Vector3d test_point(1.0, 5e-9, 0.0);
        int result = aperi::NearPoint<3>(test_point, points, 0.01);
        EXPECT_EQ(result, 1);  // Should return the first match (index 1)
    }
}

// Test the NearEdge function
TEST(MathUtilsTest, NearEdge) {
    // Test case 1: Point exactly on the edge
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 0.0, 0.0);
        Eigen::Vector3d test_point(0.5, 0.0, 0.0);
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_TRUE(result);
    }

    // Test case 2: Point very close to the edge (within tolerance)
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 0.0, 0.0);
        Eigen::Vector3d test_point(0.5, 1.0e-4, 0.0);
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_TRUE(result);
    }

    // Test case 3: Point away from the edge (outside tolerance)
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 0.0, 0.0);
        Eigen::Vector3d test_point(0.5, 0.1, 0.0);
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_FALSE(result);
    }

    // Test case 4: Point projecting before the start of the edge
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 0.0, 0.0);
        Eigen::Vector3d test_point(-0.1, 0.0, 0.0);
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_FALSE(result);

        // With higher tolerance, it should detect the point
        result = aperi::NearEdge(test_point, edge_point_0, edge_point_1, 0.1);
        EXPECT_TRUE(result);
    }

    // Test case 5: Point projecting after the end of the edge
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 0.0, 0.0);
        Eigen::Vector3d test_point(1.1, 0.0, 0.0);
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_FALSE(result);

        // With higher tolerance, it should detect the point
        result = aperi::NearEdge(test_point, edge_point_0, edge_point_1, 0.2);
        EXPECT_TRUE(result);
    }

    // Test case 6: Point near the endpoint of the edge
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 0.0, 0.0);
        Eigen::Vector3d test_point(0.0, 1.0e-4, 0.0);
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_TRUE(result);
    }

    // Test case 7: Point with custom tolerance
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 0.0, 0.0);
        Eigen::Vector3d test_point(0.5, 0.05, 0.0);

        // With default tolerance, point is too far
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_FALSE(result);

        // With increased tolerance, point should be detected
        result = aperi::NearEdge(test_point, edge_point_0, edge_point_1, 0.1);
        EXPECT_TRUE(result);
    }

    // Test case 8: 3D edge
    {
        Eigen::Vector3d edge_point_0(0.0, 0.0, 0.0);
        Eigen::Vector3d edge_point_1(1.0, 1.0, 1.0);
        Eigen::Vector3d test_point(0.5, 0.5, 0.5);
        bool result = aperi::NearEdge(test_point, edge_point_0, edge_point_1);
        EXPECT_TRUE(result);

        // Adding a small offset
        Eigen::Vector3d test_point_offset(0.5, 0.5, 0.51);
        result = aperi::NearEdge(test_point_offset, edge_point_0, edge_point_1);
        EXPECT_FALSE(result);

        // With increased tolerance
        result = aperi::NearEdge(test_point_offset, edge_point_0, edge_point_1, 0.01);
        EXPECT_TRUE(result);
    }
}