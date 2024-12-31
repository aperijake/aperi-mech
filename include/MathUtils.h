#pragma once

#include <Eigen/Dense>
#include <Kokkos_ArithTraits.hpp>
#include <Kokkos_Core.hpp>
#include <array>
#include <cmath>
#include <stdexcept>
#include <vector>

namespace aperi {

// Compute the cross product of two vectors
std::array<double, 3> Cross(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Subtracts two vectors
std::array<double, 3> Subtract(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Add two vectors
std::array<double, 3> Add(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Dot product of two vectors
double Dot(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Compute the volume of a tetrahedron
double TetVolume(const std::array<std::array<double, 3>, 4> &tet);

// Compute the volume of a tetrahedron using Eigen
KOKKOS_INLINE_FUNCTION
double TetVolume(const Eigen::Matrix<double, 4, 3, Eigen::RowMajor> &tet) {
    Eigen::Vector3d v1 = tet.row(1) - tet.row(0);
    Eigen::Vector3d v2 = tet.row(2) - tet.row(0);
    Eigen::Vector3d v3 = tet.row(3) - tet.row(0);

    return Kokkos::ArithTraits<double>::abs(v1.dot(v2.cross(v3))) / 6.0;
}

// Get the magnitude of a vector
template <typename T>
double Magnitude(const T &vector) {
    double magnitude = 0.0;
    for (const auto &component : vector) {
        magnitude += component * component;
    }
    return std::sqrt(magnitude);
}

// Change the length of a vector in place, returns the original magnitude
template <typename T>
double ChangeLength(T &vector, double new_magnitude) {
    double magnitude = Magnitude(vector);
    double scale_factor = new_magnitude / magnitude;
    for (auto &component : vector) {
        component *= scale_factor;
    }
    return magnitude;
}

// Normalize a vector in place, returns the original magnitude
template <typename T>
double Normalize(T &vector) {
    return ChangeLength(vector, 1.0);
}

// Constant interpolation
template <typename T>
double ConstantInterpolation(double x, const T &abscissa, const T &ordinate) {
    assert(abscissa.size() == ordinate.size());
    assert(abscissa.size() > 0);
    if (abscissa.size() == 1) {
        return ordinate[0];
    }
    if (x < abscissa[0]) {
        return 0.0;
    }
    if (x > abscissa.back()) {
        return ordinate.back();
    }
    for (size_t i = 0; i < abscissa.size() - 1; ++i) {
        if (x >= abscissa[i] && x <= abscissa[i + 1]) {
            return ordinate[i];
        }
    }
    throw std::runtime_error("Constant interpolation failed.");
}

// Linear interpolation
template <typename T>
double LinearInterpolation(double x, const T &abscissa, const T &ordinate) {
    assert(abscissa.size() == ordinate.size());
    assert(abscissa.size() > 0);
    if (abscissa.size() == 1) {
        return ordinate[0];
    }
    if (x < abscissa[0]) {
        return ordinate[0];
    }
    if (x > abscissa.back()) {
        return ordinate.back();
    }
    for (size_t i = 0; i < abscissa.size() - 1; ++i) {
        if (x >= abscissa[i] && x <= abscissa[i + 1]) {
            double slope = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
            return ordinate[i] + slope * (x - abscissa[i]);
        }
    }
    throw std::runtime_error("Linear interpolation failed.");
}

// Smooth step function
template <typename T>
double SmoothStepInterpolation(double x, const T &abscissa, const T &ordinate) {
    assert(abscissa.size() == ordinate.size());
    assert(abscissa.size() > 0);
    /* a = A_0 for t <= t_0
         = A_0 + (A_1 - A_0) t_s^3 (10 - 15t_s + 6t_s^2) for t_0 < t < t_1
         = A_1 for t >= t_1
       where t_s = (t - t_0) / (t_1 - t_0)
    */
    if (abscissa.size() == 1 || x < abscissa[0]) {
        return ordinate[0];
    }
    if (x > abscissa.back()) {
        return ordinate.back();
    }
    for (size_t i = 0; i < abscissa.size() - 1; ++i) {
        if (x >= abscissa[i] && x <= abscissa[i + 1]) {
            double t_s = (x - abscissa[i]) / (abscissa[i + 1] - abscissa[i]);
            return ordinate[i] + (ordinate[i + 1] - ordinate[i]) * t_s * t_s * t_s * (10.0 - 15.0 * t_s + 6.0 * t_s * t_s);
        }
    }
    throw std::runtime_error("Smooth step interpolation failed.");
}

template <typename T>
double SmoothStepInterpolationDerivative(double x, const T &abscissa, const T &ordinate) {
    assert(abscissa.size() == ordinate.size());
    assert(abscissa.size() > 0);
    if (abscissa.size() == 1 || x < abscissa[0] || x > abscissa.back()) {
        return 0.0;
    }
    for (size_t i = 0; i < abscissa.size() - 1; ++i) {
        if (x >= abscissa[i] && x <= abscissa[i + 1]) {
            double t_s = (x - abscissa[i]) / (abscissa[i + 1] - abscissa[i]);
            return (ordinate[i + 1] - ordinate[i]) * (30.0 * t_s * t_s - 60.0 * t_s * t_s * t_s + 30.0 * t_s * t_s * t_s * t_s) / (abscissa[i + 1] - abscissa[i]);
        }
    }
    throw std::runtime_error("Smooth step interpolation derivative failed.");
}

template <typename T>
double SmoothStepInterpolationSecondDerivative(double x, const T &abscissa, const T &ordinate) {
    assert(abscissa.size() == ordinate.size());
    assert(abscissa.size() > 0);
    if (abscissa.size() == 1 || x < abscissa[0] || x > abscissa.back()) {
        return 0.0;
    }
    for (size_t i = 0; i < abscissa.size() - 1; ++i) {
        if (x >= abscissa[i] && x <= abscissa[i + 1]) {
            double t_s = (x - abscissa[i]) / (abscissa[i + 1] - abscissa[i]);
            return (ordinate[i + 1] - ordinate[i]) * (60.0 * t_s - 180.0 * t_s * t_s + 120.0 * t_s * t_s * t_s) / ((abscissa[i + 1] - abscissa[i]) * (abscissa[i + 1] - abscissa[i]));
        }
    }
    throw std::runtime_error("Smooth step interpolation second derivative failed.");
}

template <typename T>
int RoundDownOrderOfMagnitude(T num) {
    if (num <= 0) {
        throw std::invalid_argument("Input must be positive");
    }
    int power = std::floor(std::log10(num));
    return std::pow(10, power);
}

template <typename T>
KOKKOS_INLINE_FUNCTION size_t SortAndRemoveDuplicates(T &arr, size_t relevant_length) {
    // Bubble sort. TODO(jake): Replace with a more efficient algorithm
    if (relevant_length == 0) return 0;
    // Sort the array
    bool swapped;
    for (size_t i = 0; i < relevant_length - 1; ++i) {
        swapped = false;
        for (size_t j = 0; j < relevant_length - i - 1; ++j) {
            if (arr[j] > arr[j + 1]) {
                auto temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }

    // Remove duplicates
    size_t index = 1;
    for (size_t i = 1; i < relevant_length; ++i) {
        if (arr[i] != arr[i - 1]) {
            arr[index++] = arr[i];
        }
    }

    // Return the number of unique elements
    return index;
}

template <typename T>
KOKKOS_INLINE_FUNCTION size_t RemoveDuplicates(T &arr, size_t relevant_length) {
    if (relevant_length == 0) return 0;

    size_t index = 0;  // Index to keep track of unique elements

    for (size_t j = 1; j < relevant_length; ++j) {
        bool found = false;
        for (size_t i = 0; i <= index; ++i) {
            if (arr[i] == arr[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            arr[++index] = arr[j];
        }
    }

    // Return the number of unique elements
    return index + 1;
}

template <int Size>
KOKKOS_FORCEINLINE_FUNCTION Eigen::Matrix<double, Size, Size> InvertMatrix(const Eigen::Matrix<double, Size, Size> &mat) {
#ifndef KOKKOS_ENABLE_CUDA
    assert(mat.fullPivLu().isInvertible());
    return mat.fullPivLu().inverse();  // Does not work on the gpu as of eigen 3.4
#else
    return mat.inverse();
#endif
}

KOKKOS_INLINE_FUNCTION double ComputeKernel(const Eigen::Vector<double, 3> &vector_neighbor_to_point, double R) {
    const double normalized_radius = vector_neighbor_to_point.norm() / (R);
    // Calculate the kernel value using a cubic b-spline kernel
    if (normalized_radius < 0.5) {
        return 1.0 + 6.0 * normalized_radius * normalized_radius * (-1.0 + normalized_radius);
    } else if (normalized_radius < 1.0) {
        return 2.0 * (1.0 + normalized_radius * (-3.0 + 3.0 * normalized_radius - 1.0 * normalized_radius * normalized_radius));
    }
    return 0.0;
}

template <typename T>
KOKKOS_FUNCTION constexpr auto DetApIm1(const Eigen::MatrixBase<T> &A) {
    // From the Cayley-Hamilton theorem, we get that for any N by N matrix A,
    // det(A - I) - 1 = I1(A) + I2(A) + ... + IN(A),
    // where the In are the principal invariants of A.

    return A(0, 0) + A(1, 1) + A(2, 2) - A(0, 1) * A(1, 0) * (1 + A(2, 2)) + A(0, 0) * A(1, 1) * (1 + A(2, 2)) - A(0, 2) * A(2, 0) * (1 + A(1, 1)) - A(1, 2) * A(2, 1) * (1 + A(0, 0)) + A(0, 0) * A(2, 2) + A(1, 1) * A(2, 2) + A(0, 1) * A(1, 2) * A(2, 0) + A(0, 2) * A(1, 0) * A(2, 1);
}

}  // namespace aperi
