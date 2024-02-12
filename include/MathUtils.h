#pragma once

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
    if (abscissa.size() != ordinate.size()) {
        throw std::runtime_error("Abscissa and ordinate vectors must be the same size.");
    }
    if (abscissa.size() == 0) {
        throw std::runtime_error("Abscissa and ordinate vectors must have at least one element.");
    }
    if (abscissa.size() == 1) {
        return ordinate[0];
    }
    if (x < abscissa[0]) {
        return 0.0;
    }
    if (x > abscissa[abscissa.size() - 1]) {
        return ordinate[abscissa.size() - 1];
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
    if (abscissa.size() != ordinate.size()) {
        throw std::runtime_error("Abscissa and ordinate vectors must be the same size.");
    }
    if (abscissa.size() == 0) {
        throw std::runtime_error("Abscissa and ordinate vectors must have at least one element.");
    }
    if (abscissa.size() == 1) {
        return ordinate[0];
    }
    if (x < abscissa[0]) {
        return ordinate[0];
    }
    if (x > abscissa[abscissa.size() - 1]) {
        return ordinate[abscissa.size() - 1];
    }
    for (size_t i = 0; i < abscissa.size() - 1; ++i) {
        if (x >= abscissa[i] && x <= abscissa[i + 1]) {
            double slope = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
            return ordinate[i] + slope * (x - abscissa[i]);
        }
    }
    throw std::runtime_error("Linear interpolation failed.");
}

}  // namespace aperi
