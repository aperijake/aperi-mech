#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <memory>
#include <vector>

#include "ConnectedEntityProcessor.h"
#include "Field.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "Selector.h"
#include "Types.h"

namespace aperi {

class MaxEdgeLengthProcessor {
   public:
    MaxEdgeLengthProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {})
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

        // Get fields using aperi::Field
        m_node_active_field = aperi::Field<Unsigned>(mesh_data, FieldQueryData<Unsigned>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE});
        m_coordinates_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE});
        m_max_edge_length_field = aperi::Field<double>(mesh_data, FieldQueryData<double>{"max_edge_length", FieldQueryState::None, FieldDataTopologyRank::NODE});
    }

    void ComputeMaxEdgeLength() {
        // Sync fields to device
        m_node_active_field.UpdateField();
        m_coordinates_field.UpdateField();
        m_max_edge_length_field.UpdateField();

        // Prepare connectivity processor for device
        auto connectivity = m_connectivity;

        // Loop over all nodes in the mesh using the active selector
        aperi::ForEachNode(
            KOKKOS_CLASS_LAMBDA(const aperi::Index &node_idx) {
                // Get the node's coordinates
                Eigen::Matrix<double, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = m_coordinates_field(node_idx, j);
                }

                double max_edge_length = 0.0;

                // Get elements connected to this node
                auto connected_elements = connectivity.GetNodeElements(node_idx);
                for (size_t i = 0; i < connected_elements.size(); ++i) {
                    aperi::Index elem_idx = connectivity.GetEntityIndex(connected_elements[i]);
                    // Get nodes of the element
                    auto elem_nodes = connectivity.GetElementNodes(elem_idx);
                    for (size_t j = 0; j < elem_nodes.size(); ++j) {
                        aperi::Index neighbor_idx = connectivity.GetEntityIndex(elem_nodes[j]);
                        Eigen::Matrix<double, 1, 3> neighbor_coordinates;
                        for (size_t k = 0; k < 3; ++k) {
                            neighbor_coordinates(0, k) = m_coordinates_field(neighbor_idx, k);
                        }
                        double active_scale_factor = m_node_active_field(neighbor_idx, 0) == 0.0 ? 2.0 : 1.0;
                        double length = (coordinates - neighbor_coordinates).norm() * active_scale_factor;
                        max_edge_length = Kokkos::max(max_edge_length, length);
                    }
                }
                m_max_edge_length_field(node_idx, 0) = max_edge_length;
            },
            *m_mesh_data, m_active_selector);

        // Perform parallel max (syncs to and from device automatically)
        m_max_edge_length_field.ParallelMax();
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::vector<std::string> m_sets;
    aperi::Selector m_selector;
    aperi::Selector m_active_selector;
    aperi::Field<double> m_coordinates_field;
    aperi::Field<Unsigned> m_node_active_field;
    aperi::Field<double> m_max_edge_length_field;
    aperi::ConnectedEntityProcessor m_connectivity;
};

}  // namespace aperi