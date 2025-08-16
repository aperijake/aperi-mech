#include "MaxEdgeLengthProcessor.h"

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>

#include "FieldData.h"
#include "ForEachEntity.h"
#include "LogUtils.h"
#include "MathUtils.h"

namespace aperi {

/**
 * @brief A class to compute the maximum edge length for each node in a mesh.
 * @details This class iterates over nodes and their connected elements to compute the maximum edge length
 *          based on the coordinates of the nodes and their activity status.
 */
struct MaxEdgeLengthFunctor {
    aperi::Field<Unsigned> m_node_active_field;
    aperi::Field<Real> m_coordinates_field;
    aperi::Field<Real> m_max_edge_length_field;
    decltype(std::declval<std::shared_ptr<aperi::MeshData>>()->GetUpdatedNgpMesh()) ngp_mesh_data;

    MaxEdgeLengthFunctor(
        aperi::Field<Unsigned> node_active_field,
        aperi::Field<Real> coordinates_field,
        aperi::Field<Real> max_edge_length_field,
        decltype(std::declval<std::shared_ptr<aperi::MeshData>>()->GetUpdatedNgpMesh()) ngp_mesh_data)
        : m_node_active_field(node_active_field),
          m_coordinates_field(coordinates_field),
          m_max_edge_length_field(max_edge_length_field),
          ngp_mesh_data(ngp_mesh_data) {}

    KOKKOS_FUNCTION
    void operator()(const aperi::Index &node_idx) const {
        Eigen::Matrix<Real, 1, 3> coordinates;
        for (size_t j = 0; j < 3; ++j) {
            coordinates(0, j) = m_coordinates_field(node_idx, j);
        }

        Real max_edge_length = m_max_edge_length_field(node_idx, 0);

        auto connected_elements = ngp_mesh_data.GetNodeElements(node_idx);
        for (size_t i = 0; i < connected_elements.size(); ++i) {
            aperi::Index elem_idx = ngp_mesh_data.GetEntityIndex(connected_elements[i]);
            auto elem_nodes = ngp_mesh_data.GetElementNodes(elem_idx);
            for (size_t j = 0; j < elem_nodes.size(); ++j) {
                aperi::Index neighbor_idx = ngp_mesh_data.GetEntityIndex(elem_nodes[j]);
                Eigen::Matrix<Real, 1, 3> neighbor_coordinates;
                for (size_t k = 0; k < 3; ++k) {
                    neighbor_coordinates(0, k) = m_coordinates_field(neighbor_idx, k);
                }
                Real active_scale_factor = m_node_active_field(neighbor_idx, 0) == 0.0 ? 2.0 : 1.0;
                Real length = (coordinates - neighbor_coordinates).norm() * active_scale_factor;
                max_edge_length = Kokkos::max(max_edge_length, length);
            }
        }
        m_max_edge_length_field(node_idx, 0) = max_edge_length;
    }
};

// Constructor: initializes selectors and fields
MaxEdgeLengthProcessor::MaxEdgeLengthProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets)
    : m_mesh_data(mesh_data), m_sets(sets), m_ngp_mesh_data(mesh_data->GetUpdatedNgpMesh()) {
    if (!m_mesh_data) {
        throw std::runtime_error("Mesh data is null.");
    }
    // Create selectors for the sets and active sets
    m_selector = aperi::Selector(sets, mesh_data.get());
    std::vector<std::string> active_sets;
    for (const std::string &set : sets) {
        active_sets.push_back(set + "_active");
    }
    // If sets are not named, get the universal active part.
    if (active_sets.empty()) {
        active_sets.emplace_back("universal_active_part");
    }
    m_active_selector = aperi::Selector(active_sets, mesh_data.get());

    // Initialize fields for node activity, coordinates, and output
    m_node_active_field = aperi::Field<Unsigned>(mesh_data, FieldQueryData<Unsigned>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE});
    m_coordinates_field = aperi::Field<Real>(mesh_data, FieldQueryData<Real>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE});
    m_max_edge_length_field = aperi::Field<Real>(mesh_data, FieldQueryData<Real>{"max_edge_length", FieldQueryState::None, FieldDataTopologyRank::NODE});
}

void MaxEdgeLengthProcessor::ComputeMaxEdgeLength() {
    // Update fields to ensure they are ready for computation
    m_node_active_field.UpdateField();
    m_coordinates_field.UpdateField();
    m_max_edge_length_field.UpdateField();

    // Copy mesh connectivity for device functor
    auto ngp_mesh_data = m_ngp_mesh_data;

    // Create and execute the functor for each node
    MaxEdgeLengthFunctor functor(m_node_active_field, m_coordinates_field, m_max_edge_length_field, ngp_mesh_data);
    aperi::ForEachNode(functor, *m_mesh_data, m_active_selector);

    // Perform parallel max reduction and sync as needed
    m_max_edge_length_field.MarkModifiedOnDevice();
    m_max_edge_length_field.ParallelMax();
}

}  // namespace aperi
