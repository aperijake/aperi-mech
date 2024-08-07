#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
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

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoFunctionValueStorageProcessor.h"
#endif

namespace aperi {

#ifndef USE_PROTEGO_MECH

class FunctionValueStorageProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

   public:
    FunctionValueStorageProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) : m_mesh_data(mesh_data), m_sets(sets) {
        // Throw an exception if the mesh data is null.
        if (mesh_data == nullptr) {
            throw std::runtime_error("Mesh data is null.");
        }
        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
        m_selector = StkGetSelector(sets, meta_data);
        // Warn if the selector is empty.
        if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
            aperi::CoutP0() << "Warning: NeighborSearchProcessor selector is empty." << std::endl;
        }

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the number of neighbors field
        m_num_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_num_neighbors_field);

        // Get the neighbors field
        m_neighbors_field = StkGetField(FieldQueryData<uint64_t>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_neighbors_field);

        // Get the coordinates field
        m_coordinates_field = StkGetField(FieldQueryData<double>{mesh_data->GetCoordinatesFieldName(), FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*m_coordinates_field);

        // Get the function values field
        m_function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*m_function_values_field);

        // Get the kernel radius field
        m_kernel_radius_field = StkGetField(FieldQueryData<double>{"kernel_radius", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_kernel_radius_field = &stk::mesh::get_updated_ngp_field<double>(*m_kernel_radius_field);
    }

    // use_evaluation_point_kernels is a flag to center the kernel at the evaluation point instead of the neighbor node. This is to match Compadre.
    template <size_t NumNodes, typename FunctionFunctor>
    void compute_and_store_function_values(FunctionFunctor &function_functor, const bool use_evaluation_point_kernels = false) {
        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_num_neighbors_field = *m_ngp_num_neighbors_field;
        auto ngp_neighbors_field = *m_ngp_neighbors_field;
        auto ngp_coordinates_field = *m_ngp_coordinates_field;
        auto ngp_function_values_field = *m_ngp_function_values_field;
        auto npg_kernel_radius_field = *m_ngp_kernel_radius_field;

        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of neighbors
                size_t num_neighbors = ngp_num_neighbors_field(node_index, 0);

                Eigen::Matrix<double, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = ngp_coordinates_field(node_index, j);
                }

                Eigen::Matrix<double, NumNodes, 3> shifted_neighbor_coordinates;
                Eigen::Matrix<double, NumNodes, 1> kernel_values;

                double kernel_radius = npg_kernel_radius_field(node_index, 0);  // for use_evaluation_point_kernels = true, to match Compadre

                for (size_t i = 0; i < num_neighbors; ++i) {
                    // Create the entity
                    stk::mesh::Entity entity(ngp_neighbors_field(node_index, i));
                    stk::mesh::FastMeshIndex neighbor_index = ngp_mesh.fast_mesh_index(entity);
                    // Get the neighbor's coordinates
                    for (size_t j = 0; j < 3; ++j) {
                        shifted_neighbor_coordinates(i, j) = coordinates(0, j) - ngp_coordinates_field(neighbor_index, j);
                    }
                    // Get the neighbor's kernel radius
                    if (!use_evaluation_point_kernels) {
                        kernel_radius = npg_kernel_radius_field(neighbor_index, 0);
                    }
                    // Compute the kernel value
                    kernel_values(i, 0) = aperi::ComputeKernel(shifted_neighbor_coordinates.row(i), kernel_radius);
                }

                // Compute the function values
                Eigen::Matrix<double, NumNodes, 1> function_values = function_functor.values(kernel_values, shifted_neighbor_coordinates, num_neighbors);

                for (size_t i = 0; i < num_neighbors; ++i) {
                    ngp_function_values_field(node_index, i) = function_values(i, 0);
                }
            });
        m_ngp_function_values_field->clear_sync_state();
        m_ngp_function_values_field->modify_on_device();
    }

    void SyncFieldsToHost() {
        m_ngp_function_values_field->sync_to_host();
    }

    void CommunicateAllFieldData() const {
        stk::mesh::communicate_field_data(*m_bulk_data, {m_function_values_field});
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_owned_selector;          // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.
    UnsignedField *m_num_neighbors_field;          // The number of neighbors field
    UnsignedField *m_neighbors_field;              // The neighbors field
    DoubleField *m_coordinates_field;              // The coordinates field
    DoubleField *m_function_values_field;          // The function values field
    DoubleField *m_kernel_radius_field;            // The kernel radius field
    NgpUnsignedField *m_ngp_num_neighbors_field;   // The ngp number of neighbors field
    NgpUnsignedField *m_ngp_neighbors_field;       // The ngp neighbors field
    NgpDoubleField *m_ngp_coordinates_field;       // The ngp coordinates field
    NgpDoubleField *m_ngp_function_values_field;   // The ngp function values field
    NgpDoubleField *m_ngp_kernel_radius_field;     // The ngp kernel radius field
};

#else  // USE_PROTEGO_MECH
using protego::FunctionValueStorageProcessor;
#endif

}  // namespace aperi