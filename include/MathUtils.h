#pragma once

#include <array>
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
void ChangeLength(std::vector<double> &vector, double new_magnitude);

// Constant interpolation
double ConstantInterpolation(double x, const std::vector<double> &abscissa, const std::vector<double> &ordinate);

// Linear interpolation
double LinearInterpolation(double x, const std::vector<double> &abscissa, const std::vector<double> &ordinate);

}  // namespace aperi
