#include "MathUtils.h"

#include <array>
#include <cmath>
#include <stdexcept>
#include <vector>

namespace aperi {
// Compute the cross product of two vectors
std::array<double, 3> Cross(const std::array<double, 3> &v1, const std::array<double, 3> &v2) {
    std::array<double, 3> cross;
    cross[0] = v1[1] * v2[2] - v1[2] * v2[1];
    cross[1] = v1[2] * v2[0] - v1[0] * v2[2];
    cross[2] = v1[0] * v2[1] - v1[1] * v2[0];

    return cross;
}

// Subtracts two vectors
std::array<double, 3> Subtract(const std::array<double, 3> &v1, const std::array<double, 3> &v2) {
    std::array<double, 3> result;
    for (int i = 0; i < 3; ++i) {
        result[i] = v1[i] - v2[i];
    }
    return result;
}

// Add two vectors
std::array<double, 3> Add(const std::array<double, 3> &v1, const std::array<double, 3> &v2) {
    std::array<double, 3> result;
    for (int i = 0; i < 3; ++i) {
        result[i] = v1[i] + v2[i];
    }
    return result;
}

// Dot product of two vectors
double Dot(const std::array<double, 3> &v1, const std::array<double, 3> &v2) {
    double result = 0;
    for (int i = 0; i < 3; ++i) {
        result += v1[i] * v2[i];
    }
    return result;
}

// Compute the volume of a tetrahedron
double TetVolume(const std::array<std::array<double, 3>, 4> &tet) {
    std::array<double, 3> v1 = Subtract(tet[1], tet[0]);
    std::array<double, 3> v2 = Subtract(tet[2], tet[0]);
    std::array<double, 3> v3 = Subtract(tet[3], tet[0]);

    return std::abs(Dot(v1, Cross(v2, v3))) / 6.0;
}

// Change the length of a vector
// TODO (jake) get rid of this for a more general function
void ChangeLength(std::vector<double> &vector, double new_magnitude) {
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
double ConstantInterpolation(double x, const std::vector<double> &abscissa, const std::vector<double> &ordinate) {
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
double LinearInterpolation(double x, const std::vector<double> &abscissa, const std::vector<double> &ordinate) {
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
