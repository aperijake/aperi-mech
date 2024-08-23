#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"

namespace aperi {

struct SmoothedQuadratureTet4 {
    KOKKOS_INLINE_FUNCTION SmoothedQuadratureTet4() {
        /* Face ordering
        4-node tetrahedron face node ordering per Seacas: https://sandialabs.github.io/seacas-docs/html/element_types.html
        */
        m_face_nodes << 0, 1, 3,
            1, 2, 3,
            0, 3, 2,
            0, 2, 1;
    }

    KOKKOS_INLINE_FUNCTION bool CheckPartitionOfNullity(const Eigen::Matrix<double, aperi::TET4_NUM_NODES, 3> &b_matrix) const {
        double tolerance = 1.0e-6;
        for (size_t k = 0; k < 3; ++k) {
            if (b_matrix.col(k).sum() < 0.0 - tolerance || b_matrix.col(k).sum() > 0.0 + tolerance) {
                return false;
            }
        }
        return true;
    }

    // Compute the B matrix and integration weight for a given gauss point, function values are provided
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, aperi::TET4_NUM_NODES, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, aperi::TET4_NUM_NODES, 3> &cell_node_coordinates) const {
        Eigen::Matrix<double, aperi::TET4_NUM_NODES, 3> b_matrix = Eigen::Matrix<double, aperi::TET4_NUM_NODES, 3>::Zero();
        // const Eigen::Matrix<double, aperi::TET4_NUM_NODES, aperi::TET4_NUM_NODES> cell_node_function_values = Eigen::Matrix<double, aperi::TET4_NUM_NODES, aperi::TET4_NUM_NODES>::Identity();

        double volume = 0.0;

        // Loop over faces
        for (size_t j = 0; j < m_num_faces; ++j) {
            // Get the area weighted face normal, cross product of two edges
            const Eigen::Vector3d edge1 = cell_node_coordinates.row(m_face_nodes(j, 1)) - cell_node_coordinates.row(m_face_nodes(j, 0));
            const Eigen::Vector3d edge2 = cell_node_coordinates.row(m_face_nodes(j, 2)) - cell_node_coordinates.row(m_face_nodes(j, 0));

            const Eigen::Vector3d face_normal = edge1.cross(edge2) / 2.0;  // Area weighted normal

            // Add the contribution of the current face to the volume
            volume += cell_node_coordinates.row(m_face_nodes(j, 0)).dot(face_normal);

            // Compute the smoothed shape function derivatives. Add the contribution of the current face to the smoothed shape function derivatives.
            for (size_t k = 0; k < aperi::TET4_NUM_NODES; ++k) {
                // double shape_function_value = 0.0;
                // for (size_t l = 0; l < 3; ++l) {  // Loop over nodes per face
                //     shape_function_value += cell_node_function_values(k, m_face_nodes(j, l));
                // }
                // shape_function_value /= 3.0;  // for the average of the 3 nodes
                // b_matrix.row(k) += shape_function_value * face_normal.transpose();
                for (size_t l = 0; l < 3; ++l) {  // Loop over nodes per face
                    if (k == m_face_nodes(j, l)) {
                        b_matrix.row(k) += face_normal.transpose() / 3.0;  // for the average of the 3 nodes
                        break;
                    }
                }
            }
        }
        volume /= 3.0;  // 3x volume
        b_matrix /= volume;
        assert(CheckPartitionOfNullity(b_matrix));

        return Kokkos::make_pair(b_matrix, volume);
    }

    KOKKOS_INLINE_FUNCTION int NumGaussPoints() const {
        return 1;
    }

    Eigen::Matrix<size_t, 4, 3> m_face_nodes;
    size_t m_num_faces = 4;
};

struct SmoothedQuadratureHex8 {
    KOKKOS_INLINE_FUNCTION SmoothedQuadratureHex8() {
        /* Face ordering
        8-node hexhedron face node ordering per Seacas: https://sandialabs.github.io/seacas-docs/html/element_types.html
        */
        m_face_nodes << 0, 1, 5, 4,
            1, 2, 6, 5,
            2, 3, 7, 6,
            0, 4, 7, 3,
            0, 3, 2, 1,
            4, 5, 6, 7;
    }

    KOKKOS_INLINE_FUNCTION bool CheckPartitionOfNullity(const Eigen::Matrix<double, aperi::HEX8_NUM_NODES, 3> &b_matrix) const {
        double tolerance = 1.0e-6;
        for (size_t k = 0; k < 3; ++k) {
            if (b_matrix.col(k).sum() < 0.0 - tolerance || b_matrix.col(k).sum() > 0.0 + tolerance) {
                return false;
            }
        }
        return true;
    }

    // Compute the B matrix and integration weight for a given gauss point, function values are provided
    KOKKOS_INLINE_FUNCTION Kokkos::pair<Eigen::Matrix<double, aperi::HEX8_NUM_NODES, 3>, double> ComputeBMatrixAndWeight(const Eigen::Matrix<double, aperi::HEX8_NUM_NODES, 3> &cell_node_coordinates) const {
        Eigen::Matrix<double, aperi::HEX8_NUM_NODES, 3> b_matrix = Eigen::Matrix<double, aperi::HEX8_NUM_NODES, 3>::Zero();
        // const Eigen::Matrix<double, aperi::HEX8_NUM_NODES, aperi::HEX8_NUM_NODES> cell_node_function_values = Eigen::Matrix<double, aperi::HEX8_NUM_NODES, aperi::HEX8_NUM_NODES>::Identity();

        double volume = 0.0;

        // Loop over faces
        for (size_t j = 0; j < m_num_faces; ++j) {
            // Get the area weighted face normal, cross product of two edges
            const Eigen::Vector3d edge1 = cell_node_coordinates.row(m_face_nodes(j, 1)) - cell_node_coordinates.row(m_face_nodes(j, 0));
            const Eigen::Vector3d edge2 = cell_node_coordinates.row(m_face_nodes(j, 2)) - cell_node_coordinates.row(m_face_nodes(j, 0));

            const Eigen::Vector3d face_normal = edge1.cross(edge2);  // Area weighted normal

            // Add the contribution of the current face to the volume
            volume += cell_node_coordinates.row(m_face_nodes(j, 0)).dot(face_normal);

            // Compute the smoothed shape function derivatives. Add the contribution of the current face to the smoothed shape function derivatives.
            for (size_t k = 0; k < aperi::HEX8_NUM_NODES; ++k) {
                // double shape_function_value = 0.0;
                // for (size_t l = 0; l < 3; ++l) {  // Loop over nodes per face
                //     shape_function_value += cell_node_function_values(k, m_face_nodes(j, l));
                // }
                // shape_function_value /= 3.0;  // for the average of the 3 nodes
                // b_matrix.row(k) += shape_function_value * face_normal.transpose();
                for (size_t l = 0; l < 4; ++l) {  // Loop over nodes per face
                    if (k == m_face_nodes(j, l)) {
                        b_matrix.row(k) += face_normal.transpose();
                        break;
                    }
                }
            }
        }
        volume /= 3.0;  // 3x volume
        b_matrix /= volume;
        assert(CheckPartitionOfNullity(b_matrix));

        return Kokkos::make_pair(b_matrix, volume);
    }

    KOKKOS_INLINE_FUNCTION int NumGaussPoints() const {
        return 1;
    }

    Eigen::Matrix<size_t, 6, 4> m_face_nodes;
    size_t m_num_faces = 6;
};
}  // namespace aperi
