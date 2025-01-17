#pragma once

#include <Eigen/Dense>
#include <array>
#include <chrono>
#include <memory>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_topology/topology.hpp>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"
#include "SmoothedCellData.h"

namespace aperi {

/**
 * @brief A class for processing elements in a mesh.
 *
 * This class provides functionality to process elements in a mesh.
 * It can gather data from fields on the nodes of the elements, apply a function to the gathered data, and scatter the results back to the nodes.
 */
template <size_t NumFields>
class ElementForceProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;

   public:
    /**
     * @brief Constructs an ElementForceProcessor object.
     * @param field_query_data_gather_vec An array of FieldQueryData objects representing the fields to gather.
     * @param field_query_data_scatter A FieldQueryData object representing the field to scatter.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param sets A vector of strings representing the sets to process.
     */
    ElementForceProcessor(const std::vector<FieldQueryData<double>> &field_query_data_gather_vec, const FieldQueryData<double> field_query_data_scatter, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets, bool has_state = false) : m_mesh_data(mesh_data), m_sets(sets), m_has_state(has_state) {
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
            aperi::CoutP0() << "Warning: ElementForceProcessor selector is empty." << std::endl;
        }
        m_owned_selector = m_selector & meta_data->locally_owned_part();

        // Get the fields to gather and scatter
        for (size_t i = 0; i < NumFields; ++i) {
            m_fields_to_gather[i] = StkGetField(field_query_data_gather_vec[i], meta_data);
            m_ngp_fields_to_gather[i] = &stk::mesh::get_updated_ngp_field<double>(*m_fields_to_gather[i]);
        }
        m_field_to_scatter = StkGetField(field_query_data_scatter, meta_data);
        m_ngp_field_to_scatter = &stk::mesh::get_updated_ngp_field<double>(*m_field_to_scatter);

        if (has_state) {
            m_state_old = StkGetField(FieldQueryData<double>{"state", FieldQueryState::N, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_state_old = &stk::mesh::get_updated_ngp_field<double>(*m_state_old);

            m_state_new = StkGetField(FieldQueryData<double>{"state", FieldQueryState::NP1, FieldDataTopologyRank::ELEMENT}, meta_data);
            m_ngp_state_new = &stk::mesh::get_updated_ngp_field<double>(*m_state_new);
        }
    }

    template <typename StressFunctor>
    void for_each_cell_gather_scatter_nodal_data(const SmoothedCellData &scd, StressFunctor &stress_functor) {
        // Get th ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        Kokkos::Array<NgpDoubleField, NumFields> ngp_fields_to_gather;
        for (size_t i = 0; i < NumFields; ++i) {
            ngp_fields_to_gather[i] = *m_ngp_fields_to_gather[i];
        }
        auto ngp_field_to_scatter = *m_ngp_field_to_scatter;

        // Get the number of cells
        const size_t num_cells = scd.NumCells();

        bool has_state = m_has_state;

        // Get the state fields
        NgpDoubleField ngp_state_old;
        NgpDoubleField ngp_state_new;
        if (has_state) {
            ngp_state_old = *m_ngp_state_old;
            ngp_state_new = *m_ngp_state_new;
        }

        // Loop over all the cells
        Kokkos::parallel_for(
            "for_each_cell_gather_scatter_nodal_data", num_cells, KOKKOS_LAMBDA(const size_t cell_id) {
                // Set up the field data to gather
                Kokkos::Array<Eigen::Matrix<double, 3, 3>, NumFields> field_data_to_gather_gradient;
                for (size_t f = 0; f < NumFields; ++f) {
                    field_data_to_gather_gradient[f].setZero();
                }

                const auto node_local_offsets = scd.GetCellNodeLocalOffsets(cell_id);
                const auto node_function_derivatives = scd.GetCellFunctionDerivatives(cell_id);

                const size_t num_nodes = node_local_offsets.extent(0);

                // Pre-allocation for the function derivatives
                Eigen::Matrix<double, 1, 3> function_derivatives;

                // Compute the field gradients
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Populate the function derivatives
                    const size_t derivative_offset = k * 3;
                    for (size_t j = 0; j < 3; ++j) {
                        function_derivatives(j) = node_function_derivatives(derivative_offset + j);
                    }

                    // Add the field gradient
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(node);
                    for (size_t f = 0; f < NumFields; ++f) {
                        // Perform the matrix multiplication for field_data_to_gather_gradient
                        for (size_t i = 0; i < 3; ++i) {
                            field_data_to_gather_gradient[f].row(i) += ngp_fields_to_gather[f](node_index, i) * function_derivatives;
                        }
                    }
                }

                // Get the state fields
                double *state_new = nullptr;
                double *state_old = nullptr;
                if (has_state) {
                    const auto element_local_offsets = scd.GetCellElementLocalOffsets(cell_id);
                    const stk::mesh::Entity element(element_local_offsets[0]);
                    const stk::mesh::FastMeshIndex elem_index = ngp_mesh.fast_mesh_index(element);
                    state_old = &ngp_state_old(elem_index, 0);
                    state_new = &ngp_state_new(elem_index, 0);
                }
                size_t state_bucket_size = 1;

                // Compute the stress and internal force of the element.
                double volume = scd.GetCellVolume(cell_id);
                const Eigen::Matrix<double, 3, 3> pk1_stress_transpose_neg_volume = stress_functor(field_data_to_gather_gradient, state_old, state_new, state_bucket_size).transpose() * -volume;

                // Scatter the force to the nodes
                for (size_t k = 0; k < num_nodes; ++k) {
                    // Populate the function derivatives
                    const size_t derivative_offset = k * 3;
                    for (size_t j = 0; j < 3; ++j) {
                        function_derivatives(j) = node_function_derivatives(derivative_offset + j);
                    }

                    // Calculate the force
                    const Eigen::Matrix<double, 1, 3> force = function_derivatives * pk1_stress_transpose_neg_volume;

                    // Add the force to the node
                    const stk::mesh::Entity node(node_local_offsets[k]);
                    const stk::mesh::FastMeshIndex node_index = ngp_mesh.fast_mesh_index(node);
                    for (size_t j = 0; j < 3; ++j) {
                        Kokkos::atomic_add(&ngp_field_to_scatter(node_index, j), force(j));
                    }
                }
            });
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                        // The mesh data object.
    std::vector<std::string> m_sets;                                     // The sets to process.
    bool m_has_state;                                                    // Whether the material has state
    stk::mesh::BulkData *m_bulk_data;                                    // The bulk data object.
    stk::mesh::Selector m_selector;                                      // The selector
    stk::mesh::Selector m_owned_selector;                                // The selector for owned entities
    stk::mesh::NgpMesh m_ngp_mesh;                                       // The ngp mesh object.
    std::array<DoubleField *, NumFields> m_fields_to_gather;             // The fields to gather
    DoubleField *m_field_to_scatter;                                     // The field to scatter
    DoubleField *m_state_new;                                            // The state field
    DoubleField *m_state_old;                                            // The state field
    std::array<DoubleField *, 3> m_element_function_derivatives_fields;  // The function derivatives fields
    Kokkos::Array<NgpDoubleField *, NumFields> m_ngp_fields_to_gather;   // The ngp fields to gather
    NgpDoubleField *m_ngp_field_to_scatter;                              // The ngp field to scatter
    NgpDoubleField *m_ngp_state_new;                                     // The ngp state field
    NgpDoubleField *m_ngp_state_old;                                     // The ngp state field
};

}  // namespace aperi
