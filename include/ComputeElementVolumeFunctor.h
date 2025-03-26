#pragma once

#include <Eigen/Dense>
#include <array>
#include <chrono>
#include <memory>

#include "Field.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Functor for computing the volume of an element using standard quadrature.
 * @tparam NumNodes The max number of nodes in the element.
 * @tparam FunctionsFunctor The functor for computing the shape functions.
 * @tparam IntegrationFunctor The functor for computing the integration points and weights.
 * @tparam StressFunctor The functor for computing the stress.
 *
 * @param mesh_data The mesh data.
 * @param functions_functor The functor for computing the shape functions.
 * @param integration_functor The functor for computing the integration points and weights.
 *
 * This functor computes the volume of an element using standard quadrature. The volume is computed by looping over all gauss points and integrating the volume.
 *
 */
template <size_t NumNodes, typename FunctionsFunctor, typename IntegrationFunctor, typename StressFunctor>
struct ComputeElementVolumeFunctor {
    ComputeElementVolumeFunctor(const std::shared_ptr<aperi::MeshData> &mesh_data,
                                const FunctionsFunctor &functions_functor,
                                const IntegrationFunctor &integration_functor)
        : m_functions_functor(functions_functor),
          m_integration_functor(integration_functor) {
        // Get the field data
        m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None});
        m_element_volume_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
    }

    /**
     * @brief Functor for computing the internal force of an element.
     * @param elem_index The element index.
     * @param nodes The nodes of the element.
     * @param actual_num_nodes The actual number of nodes in the element.
     */
    KOKKOS_FUNCTION void operator()(const aperi::Index &elem_index, const Kokkos::Array<aperi::Index, NumNodes> &nodes, size_t actual_num_nodes) const {
        // Set up the field data to gather
        Eigen::Matrix<double, NumNodes, 3> node_coordinates = Eigen::Matrix<double, NumNodes, 3>::Zero();

        // Gather the field data for each node
        for (size_t i = 0; i < actual_num_nodes; ++i) {
            node_coordinates.row(i).noalias() = m_coordinates_field.GetEigenMatrix<1, 3>(nodes[i]);
        }
        // Apply the function to compute the element volume
        double element_volume = 0.0;

        // Loop over all gauss points and integrate the volume
        for (int gauss_id = 0; gauss_id < m_integration_functor.NumGaussPoints(); ++gauss_id) {
            // Compute the B matrix and integration weight for a given gauss point
            const Kokkos::pair<Eigen::Matrix<double, NumNodes, 3>, double> b_matrix_and_weight = m_integration_functor.ComputeBMatrixAndWeight(node_coordinates, m_functions_functor, gauss_id);

            // Compute the volume of the element
            element_volume += b_matrix_and_weight.second;
        }

        // Store the computed volume to the field
        m_element_volume_field.data(elem_index)[0] = element_volume;
    }

   private:
    aperi::Field<double> m_coordinates_field;             // The field for the node coordinates
    mutable aperi::Field<double> m_element_volume_field;  // The field for the element volume

    const FunctionsFunctor &m_functions_functor;      // Functor for computing the shape function values and derivatives
    const IntegrationFunctor &m_integration_functor;  // Functor for computing the B matrix and integration weight
};

}  // namespace aperi
