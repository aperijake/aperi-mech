#include "MaxEdgeLengthProcessor.h"

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>

#include "FieldData.h"
#include "ForEachEntity.h"
#include "LogUtils.h"
#include "MathUtils.h"

namespace aperi {

// Constructor: initializes selectors and fields
MaxEdgeLengthProcessor::MaxEdgeLengthProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets)
    : m_mesh_data(mesh_data), m_sets(sets), m_connectivity(mesh_data) {
    if (!m_mesh_data) {
        throw std::runtime_error("Mesh data is null.");
    }
    // Create selectors for the sets and active sets
    m_selector = aperi::Selector(sets, mesh_data.get());
    std::vector<std::string> active_sets;
    for (const std::string &set : sets) {
        active_sets.push_back(set + "_active");
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

    // Copy connectivity processor for device lambda capture
    auto connectivity = m_connectivity;

    // Iterate over all nodes in the mesh using the active selector
    aperi::ForEachNode(
        KOKKOS_CLASS_LAMBDA(const aperi::Index &node_idx) {
            // Gather coordinates for the current node
            Eigen::Matrix<Real, 1, 3> coordinates;
            for (size_t j = 0; j < 3; ++j) {
                coordinates(0, j) = m_coordinates_field(node_idx, j);
            }

            Real max_edge_length = 0.0;

            // Loop over all elements connected to this node
            auto connected_elements = connectivity.GetNodeElements(node_idx);
            for (size_t i = 0; i < connected_elements.size(); ++i) {
                aperi::Index elem_idx = connectivity.GetEntityIndex(connected_elements[i]);
                // Loop over all nodes of the connected element
                auto elem_nodes = connectivity.GetElementNodes(elem_idx);
                for (size_t j = 0; j < elem_nodes.size(); ++j) {
                    aperi::Index neighbor_idx = connectivity.GetEntityIndex(elem_nodes[j]);
                    // Gather coordinates for the neighbor node
                    Eigen::Matrix<Real, 1, 3> neighbor_coordinates;
                    for (size_t k = 0; k < 3; ++k) {
                        neighbor_coordinates(0, k) = m_coordinates_field(neighbor_idx, k);
                    }
                    // Scale by 2.0 if neighbor is inactive
                    Real active_scale_factor = m_node_active_field(neighbor_idx, 0) == 0.0 ? 2.0 : 1.0;
                    Real length = (coordinates - neighbor_coordinates).norm() * active_scale_factor;
                    // Track the maximum edge length found
                    max_edge_length = Kokkos::max(max_edge_length, length);
                }
            }
            // Store the result in the output field
            m_max_edge_length_field(node_idx, 0) = max_edge_length;
        },
        *m_mesh_data, m_active_selector);

    // Perform parallel max reduction and sync as needed
    m_max_edge_length_field.ParallelMax();
}

}  // namespace aperi
