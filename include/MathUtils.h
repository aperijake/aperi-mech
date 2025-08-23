#pragma once

#include <Eigen/Dense>
#include <Eigen/Geometry>
#include <Kokkos_ArithTraits.hpp>
#include <Kokkos_Core.hpp>
#include <array>
#include <cmath>
#include <stdexcept>
#include <vector>

#ifdef USE_PROTEGO_MECH
#include "ProtegoMathUtils.h"
#endif

namespace aperi {

// Compute the cross product of two vectors
std::array<double, 3> Cross(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Subtracts two vectors
std::array<double, 3> Subtract(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Add two vectors
std::array<double, 3> Add(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Dot product of two vectors
double Dot(const std::array<double, 3> &v1, const std::array<double, 3> &v2);

// Compute the volume of a tetrahedron using Eigen
KOKKOS_INLINE_FUNCTION
double TetVolume(const Eigen::Matrix<double, 4, 3, Eigen::RowMajor> &tet) {
    Eigen::Vector3d v1 = tet.row(1) - tet.row(0);
    Eigen::Vector3d v2 = tet.row(2) - tet.row(0);
    Eigen::Vector3d v3 = tet.row(3) - tet.row(0);

    return Kokkos::ArithTraits<double>::abs(v1.dot(v2.cross(v3))) / 6.0;
}

// Compute the volume of a hexahedron using the scalar triple product
KOKKOS_INLINE_FUNCTION
double ComputeHexahedronVolume(const Eigen::Matrix<double, 8, 3> &coordinates) {
    // Decompose the hexahedron into 6 tetrahedra
    // These indices define tetrahedra that together cover the hexahedron
    Kokkos::Array<Kokkos::Array<int, 4>, 6> tetrahedra;
    tetrahedra[0] = {0, 1, 3, 7};
    tetrahedra[1] = {1, 2, 3, 7};
    tetrahedra[2] = {1, 5, 7, 6};
    tetrahedra[3] = {1, 6, 2, 7};
    tetrahedra[4] = {0, 7, 4, 5};
    tetrahedra[5] = {0, 5, 1, 7};

    double volume = 0.0;

    // Compute the volume of each tetrahedron using TetVolume
    for (int i = 0; i < 6; i++) {
        // Create a 4x3 matrix for the tetrahedron
        Eigen::Matrix<double, 4, 3, Eigen::RowMajor> tet;
        tet.row(0) = coordinates.row(tetrahedra[i][0]);
        tet.row(1) = coordinates.row(tetrahedra[i][1]);
        tet.row(2) = coordinates.row(tetrahedra[i][2]);
        tet.row(3) = coordinates.row(tetrahedra[i][3]);

        volume += TetVolume(tet);
    }

    return volume;
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
#ifdef USE_PROTEGO_MECH
    return protego::InvertMatrix<Size>(mat);
#else
#ifndef KOKKOS_ENABLE_CUDA
    // assert(mat.fullPivLu().isInvertible());
    return mat.fullPivLu().inverse();  // Does not work on the gpu as of eigen 3.4
#else
    return mat.inverse();
#endif
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

struct VectorElementIntersectionData {
    bool intersects = false;
    int entry_face = -1;
    int exit_face = -1;
    double entry_distance = -1.0;
    double exit_distance = 2.0;
};

/**
 * @brief Check if a vector intersects with a set of planes that define an element.
 * @tparam NumFaces The number of faces of the element.
 * @param A The start point of the vector.
 * @param B The end point of the vector.
 * @param planes The planes to check against.
 * @param actual_num_faces The actual number of faces to check against.
 * @return A VectorElementIntersectionData structure containing the intersection data.
 */
template <size_t NumFaces>
KOKKOS_FUNCTION VectorElementIntersectionData VectorElementIntersection(const Eigen::Vector3d &A, const Eigen::Vector3d &B, const Kokkos::Array<Eigen::Hyperplane<double, 3>, NumFaces> &planes, size_t actual_num_faces = NumFaces) {
    KOKKOS_ASSERT(NumFaces > 0);
    KOKKOS_ASSERT(actual_num_faces <= NumFaces);
    VectorElementIntersectionData result;
    const Eigen::Vector3d dir = B - A;
    const double length = dir.norm();

    // Handle zero-length segment
    if (length < 1e-14) {
        result.intersects = false;
        return result;
    }

    // Use absolute epsilon for geometric comparisons
    const double eps = 1e-12 * length;

    double global_entry = 0.0;
    double global_exit = 1.0;
    int entry_face = -1;
    int exit_face = -1;

    for (size_t i = 0; i < actual_num_faces; ++i) {
        const auto &plane = planes[i];
        const double S_A = plane.signedDistance(A);
        const double S_B = plane.signedDistance(B);

        // Current face's valid interval
        double t_start, t_end;

        if (S_A <= eps && S_B <= eps) {
            continue;  // No restriction from this face
        } else if (S_A > eps && S_B > eps) {
            result.intersects = false;
            return result;  // Early exit
        } else {
            const double denom = S_A - S_B;
            if (Kokkos::abs(denom) < eps) {  // Parallel case
                if (S_A > eps) {             // Fully outside
                    result.intersects = false;
                    return result;
                }
                continue;  // Fully inside face's half-space
            }

            const double t = S_A / denom;
            t_start = (S_A > eps) ? t : 0.0;
            t_end = (S_B > eps) ? t : 1.0;
        }

        // Update global constraints
        if (t_start > global_entry) {
            global_entry = t_start;
            entry_face = static_cast<int>(i);
        }
        if (t_end < global_exit) {
            global_exit = t_end;
            exit_face = static_cast<int>(i);
        }

        if (global_entry > global_exit) {
            result.intersects = false;
            return result;  // No overlap
        }
    }

    result.entry_distance = Kokkos::clamp(global_entry, 0.0, 1.0);
    result.exit_distance = Kokkos::clamp(global_exit, 0.0, 1.0);
    result.intersects = (result.entry_distance <= result.exit_distance);
    result.entry_face = (result.entry_distance > 0.0) ? entry_face : -1;
    result.exit_face = (result.exit_distance < 1.0) ? exit_face : -1;

    return result;
}

/**
 * @brief Check if a point is near an edge defined by two points.
 * @param edge_point_0 The first point defining the edge.
 * @param edge_point_1 The second point defining the edge.
 * @param point The point to check.
 * @param realtive_tolerance The tolerance relative to the edge length.
 * @return True if the point is near the edge, false otherwise.
 */
KOKKOS_INLINE_FUNCTION bool NearEdge(const Eigen::Vector3d &point, const Eigen::Vector3d &edge_point_0, const Eigen::Vector3d &edge_point_1, double realtive_tolerance = 1.0e-6) {
    Eigen::Vector3d edge_vector = edge_point_1 - edge_point_0;
    Eigen::Vector3d point_vector = point - edge_point_0;

    double edge_length_squared = edge_vector.squaredNorm();
    double projection = point_vector.dot(edge_vector) / edge_length_squared;
    double tolerance = realtive_tolerance * edge_length_squared;

    // Check if the point is within the tolerance distance from the edge
    if (projection < -tolerance || projection > 1.0 + tolerance) {
        return false;  // Point is outside the edge segment
    }

    Eigen::Vector3d projection_point = edge_point_0 + projection * edge_vector;
    double distance_squared = (point - projection_point).squaredNorm();

    return distance_squared <= tolerance;
}

/**
 * @brief Check if two points are close to each other.
 * @param point The first point.
 * @param other_points The second point.
 * @param tolerance The tolerance for closeness.
 * @return True if the points are close, false otherwise.
 */
KOKKOS_INLINE_FUNCTION bool PointsAreClose(const Eigen::Vector3d &point, const Eigen::Vector3d &other_points, double tolerance = 1.0e-6) {
    return (point - other_points).squaredNorm() <= tolerance;
}

/**
 * @brief Calculate the squared radius of a ball that contains a list of points.
 * @tparam MaxNumPoints The maximum number of points.
 * @param points The list of points to check.
 * @param num_points The actual number of points in the list to check.
 * @return The squared radius of the ball that contains the points.
 * @note The function assumes that the points are in 3D space.
 */
template <size_t MaxNumPoints>
KOKKOS_INLINE_FUNCTION double CalculateSquaredRadius(const Kokkos::Array<Eigen::Vector3d, MaxNumPoints> &points, size_t num_points = MaxNumPoints) {
    // Calculate the center of the points
    Eigen::Vector3d center = Eigen::Vector3d::Zero();
    for (size_t i = 0; i < num_points; ++i) {
        center += points[i];
    }
    center /= num_points;

    // Calculate the ball radius
    double radius_squared = 0.0;
    for (size_t i = 0; i < num_points; ++i) {
        radius_squared = Kokkos::max(radius_squared, (points[i] - center).squaredNorm());
    }

    return radius_squared;
}

/**
 * @brief Check if a point is near another point from a list of points.
 * @param point The point to check.
 * @param points The list of points to check against.
 * @param relative_tolerance The tolerance relative to the ball radius of the list of points.
 * @return index of the point in the list if found, -1 otherwise.
 */
template <size_t NumPoints>
KOKKOS_INLINE_FUNCTION int NearPoint(const Eigen::Vector3d &point, const Kokkos::Array<Eigen::Vector3d, NumPoints> &points, double relative_tolerance = 1.0e-6) {
    // Calculate the absolute tolerance
    double tolerance = relative_tolerance * CalculateSquaredRadius(points);

    // Check if the point is close to any point in the list
    for (size_t i = 0; i < NumPoints; ++i) {
        if (PointsAreClose(point, points[i], tolerance)) {
            return static_cast<int>(i);
        }
    }
    return -1;
}

}  // namespace aperi
