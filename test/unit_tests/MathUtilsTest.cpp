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
TEST(MathUtilsTests, RemoveDuplicates) {
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
