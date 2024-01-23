#pragma once

#include <array>
#include <cmath>
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

// Change the length of a vector
template <typename T>
void ChangeLength(T &vector, double new_magnitude) {
    double magnitude = 0.0;
    for (const auto &component : vector) {
        magnitude += component * component;
    }
    double scale_factor = new_magnitude / std::sqrt(magnitude);
    for (auto &component : vector) {
        component *= scale_factor;
    }
}

// Constant interpolation
double ConstantInterpolation(double x, const std::vector<double> &abscissa, const std::vector<double> &ordinate);

// Linear interpolation
double LinearInterpolation(double x, const std::vector<double> &abscissa, const std::vector<double> &ordinate);

}  // namespace aperi
