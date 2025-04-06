#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <chrono>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/FieldParallel.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/ngp/NgpSpaces.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

class MaxEdgeLengthProcessor {
    using DoubleField = stk::mesh::Field<double>;
    using NgpDoubleField = stk::mesh::NgpField<double>;
    using UnsignedField = stk::mesh::Field<unsigned long>;
    using NgpUnsignedField = stk::mesh::NgpField<unsigned long>;

   public:
    MaxEdgeLengthProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Create the selector for the sets
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: MaxEdgeLengthProcessor selector is empty." << std::endl;
        }

        // Append "_active" to each set name and create a selector for the active entities
        std::vector<std::string> active_sets;
        for (const std::string &set : sets) {
            active_sets.push_back(set + "_active");
        }
        m_active_selector = StkGetSelector(active_sets, meta_data);
        // Warn if the active selector is empty.
        if (m_active_selector.is_empty(stk::topology::NODE_RANK)) {
            aperi::CoutP0() << "Warning: MaxEdgeLengthProcessor active selector is empty." << std::endl;
        }

        // Get the node active field
        m_node_active_field = StkGetField(FieldQueryData<unsigned long>{"active", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_node_active_field = &stk::mesh::get_updated_ngp_field<unsigned long>(*m_node_active_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the max edge length field
        m_max_edge_length_field = StkGetField(FieldQueryData<double>{"max_edge_length", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_max_edge_length_field = &stk::mesh::get_updated_ngp_field<double>(*m_max_edge_length_field);
    }

    void ComputeMaxEdgeLength() {
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_max_edge_length_field = *m_ngp_max_edge_length_field;
        auto ngp_active_field = *m_ngp_node_active_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_active_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the node's coordinates
                Eigen::Matrix<double, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = ngp_coordinates_field(node_index, j);
                }
                // Get the kernel radius
                double max_edge_length = 0.0;
                stk::mesh::NgpMesh::ConnectedEntities connected_entities = ngp_mesh.get_connected_entities(stk::topology::NODE_RANK, node_index, stk::topology::ELEMENT_RANK);
                for (size_t i = 0; i < connected_entities.size(); ++i) {
                    stk::mesh::FastMeshIndex elem_index = ngp_mesh.fast_mesh_index(connected_entities[i]);
                    stk::mesh::NgpMesh::ConnectedNodes connected_nodes = ngp_mesh.get_nodes(stk::topology::ELEM_RANK, elem_index);
                    for (size_t j = 0; j < connected_nodes.size(); ++j) {
                        stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(connected_nodes[j]);
                        Eigen::Matrix<double, 1, 3> neighbor_coordinates;
                        for (size_t k = 0; k < 3; ++k) {
                            neighbor_coordinates(0, k) = ngp_coordinates_field(neighbor_index, k);
                        }
                        // If the neighbor is not active, then expecting this is a refined, nodal integration mesh where the distance to the nearest active node would be double the edge length.
                        double active_scale_factor = ngp_active_field(neighbor_index, 0) == 0.0 ? 2.0 : 1.0;
                        double length = (coordinates - neighbor_coordinates).norm() * active_scale_factor;
                        max_edge_length = Kokkos::max(max_edge_length, length);
                    }
                }
                ngp_max_edge_length_field(node_index, 0) = max_edge_length;
            });
        ngp_max_edge_length_field.clear_sync_state();
        ngp_max_edge_length_field.modify_on_device();
        ngp_max_edge_length_field.sync_to_host();

        // Get the parallel max edge length
        stk::mesh::parallel_max(*m_bulk_data, {m_max_edge_length_field});
        ngp_max_edge_length_field.modify_on_host();
        ngp_max_edge_length_field.sync_to_device();
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_active_selector;         // The active selector
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
    DoubleField *m_coordinates_field;              // The coordinates field
    UnsignedField *m_node_active_field;            // The active field
    DoubleField *m_max_edge_length_field;          // The kernel radius field
    NgpDoubleField *m_ngp_coordinates_field;       // The ngp coordinates field
    NgpUnsignedField *m_ngp_node_active_field;     // The ngp active field
    NgpDoubleField *m_ngp_max_edge_length_field;   // The ngp kernel radius field
};

}  // namespace aperi