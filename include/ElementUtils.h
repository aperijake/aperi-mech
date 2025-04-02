#pragma once

#include <Eigen/Dense>
#include <Eigen/Geometry>
#include <Kokkos_Core.hpp>

#include "Field.h"

namespace aperi {

KOKKOS_INLINE_FUNCTION Eigen::Vector3d ComputeCentroid(const Kokkos::Array<Eigen::Vector3d, 8>& coordinates) {
    Eigen::Vector3d centroid(0.0, 0.0, 0.0);
    for (size_t i = 0; i < 8; i++) {
        centroid += coordinates[i];
    }
    centroid /= 8.0;
    return centroid;
}

KOKKOS_INLINE_FUNCTION Kokkos::Array<Eigen::Vector3d, 8> GetHexNodeCoordinates(const Kokkos::Array<aperi::Index, 8>& nodes, const aperi::Field<double>& coordinates_field) {
    Kokkos::Array<Eigen::Vector3d, 8> coordinates;
    for (int i = 0; i < 8; i++) {
        coordinates[i] = coordinates_field.GetEigenVectorMap<3>(nodes[i]);
    }
    return coordinates;
}

KOKKOS_INLINE_FUNCTION Kokkos::Array<size_t, 4> GetHexFaceIndices(const int face_index) {
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
     */
    KOKKOS_ASSERT(face_index >= 0 && face_index < 6);
    Kokkos::Array<size_t, 4> face_indices;
    switch (face_index) {
        case 0:
            face_indices = {0, 1, 5, 4};  // front
            break;
        case 1:
            face_indices = {1, 2, 6, 5};  // right
            break;
        case 2:
            face_indices = {2, 3, 7, 6};  // back
            break;
        case 3:
            face_indices = {0, 4, 7, 3};  // left
            break;
        case 4:
            face_indices = {0, 3, 2, 1};  // bottom
            break;
        case 5:
            face_indices = {4, 5, 6, 7};  // top
            break;
        default:
            KOKKOS_ASSERT(false);
            break;
    }
    return face_indices;
}

KOKKOS_INLINE_FUNCTION void ExtractHexFaceNodesAndCoordinates(const int face_id, const Kokkos::Array<aperi::Index, 8>& nodes, const Kokkos::Array<Eigen::Vector3d, 8>& coordinates, Kokkos::Array<aperi::Index, 4>& face_nodes, Kokkos::Array<Eigen::Vector3d, 4>& face_coordinates) {
    KOKKOS_ASSERT(face_id >= 0 && face_id < 6);
    // Get the face indices
    const Kokkos::Array<size_t, 4> face_indices = aperi::GetHexFaceIndices(face_id);

    for (size_t i = 0; i < 4; i++) {
        face_nodes[i] = nodes[face_indices[i]];
        face_coordinates[i] = coordinates[face_indices[i]];
    }
}

KOKKOS_INLINE_FUNCTION Kokkos::Array<Eigen::Hyperplane<double, 3>, 6> GetHexFacePlanes(const Kokkos::Array<Eigen::Vector3d, 8>& coordinates) {
    // Unit hex element planes. front, right, back, left, bottom, top
    Kokkos::Array<Eigen::Hyperplane<double, 3>, 6> planes;
    planes[0] = Eigen::Hyperplane<double, 3>::Through(coordinates[5], coordinates[1], coordinates[0]);  // y=1 plane (front)
    planes[1] = Eigen::Hyperplane<double, 3>::Through(coordinates[6], coordinates[2], coordinates[1]);  // x=1 plane (right)
    planes[2] = Eigen::Hyperplane<double, 3>::Through(coordinates[7], coordinates[3], coordinates[2]);  // y=0 plane (back)
    planes[3] = Eigen::Hyperplane<double, 3>::Through(coordinates[7], coordinates[4], coordinates[0]);  // x=0 plane (left)
    planes[4] = Eigen::Hyperplane<double, 3>::Through(coordinates[2], coordinates[3], coordinates[0]);  // z=0 plane (bottom)
    planes[5] = Eigen::Hyperplane<double, 3>::Through(coordinates[6], coordinates[5], coordinates[4]);  // z=1 plane (top)

    // Assert the planes are flat by checking the fourth point is on the plane
    KOKKOS_ASSERT(planes[0].absDistance(coordinates[4]) <= 1.0e-12);
    KOKKOS_ASSERT(planes[1].absDistance(coordinates[5]) <= 1.0e-12);
    KOKKOS_ASSERT(planes[2].absDistance(coordinates[6]) <= 1.0e-12);
    KOKKOS_ASSERT(planes[3].absDistance(coordinates[3]) <= 1.0e-12);
    KOKKOS_ASSERT(planes[4].absDistance(coordinates[1]) <= 1.0e-12);
    KOKKOS_ASSERT(planes[5].absDistance(coordinates[7]) <= 1.0e-12);

    return planes;
}
}  // namespace aperi