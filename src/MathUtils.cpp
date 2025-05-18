#include "MathUtils.h"

#include <Eigen/Dense>
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

}  // namespace aperi
