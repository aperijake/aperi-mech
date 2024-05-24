#pragma once

#include <Eigen/Dense>
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
double TetVolume(const Eigen::Matrix<double, 4, 3, Eigen::RowMajor> &tet);

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

}  // namespace aperi
