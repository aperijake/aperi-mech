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
#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "Timer.h"
#include "Types.h"

namespace aperi {
enum class FunctionValueStorageProcessorTimerType {
    Instantiate,
    ComputeFunctionValues,
    NONE
};

inline const std::map<FunctionValueStorageProcessorTimerType, std::string> function_value_storage_processor_timer_map = {
    {FunctionValueStorageProcessorTimerType::Instantiate, "Instantiate"},
    {FunctionValueStorageProcessorTimerType::ComputeFunctionValues, "ComputeFunctionValues"},
    {FunctionValueStorageProcessorTimerType::NONE, "NONE"}};
}  // namespace aperi

#ifdef USE_PROTEGO_MECH
#include "ProtegoFunctionValueStorageProcessor.h"
#endif

namespace aperi {

#ifndef USE_PROTEGO_MECH

/**
 * @brief Processes and stores function values on mesh nodes.
 *
 * This class is responsible for computing and storing function values
 * associated with mesh nodes, including handling neighbor relationships,
 * kernel computations, and synchronization of field data.
 */
class FunctionValueStorageProcessor {
   public:
    /**
     * @brief Constructs the FunctionValueStorageProcessor.
     * @param mesh_data Shared pointer to mesh data.
     * @param sets List of mesh sets to process.
     * @param lagrangian_formulation_type The Lagrangian formulation type.
     * @param enable_accurate_timers Flag to enable accurate timing.
     */
    FunctionValueStorageProcessor(
        std::shared_ptr<aperi::MeshData> mesh_data,
        const std::vector<std::string> &sets,
        const aperi::LagrangianFormulationType &lagrangian_formulation_type,
        bool enable_accurate_timers);

    /**
     * @brief Finalizes any preprocessing steps required before computation.
     */
    void FinishPreprocessing();

    /**
     * @brief Synchronizes all relevant fields from device to host.
     */
    void SyncFieldsToHost();

    /**
     * @brief Retrieves the TimerManager for this processor.
     * @return Shared pointer to the TimerManager.
     */
    inline std::shared_ptr<aperi::TimerManager<FunctionValueStorageProcessorTimerType>> GetTimerManager() {
        return std::make_shared<aperi::TimerManager<FunctionValueStorageProcessorTimerType>>(m_timer_manager);
    }

    /**
     * @brief Computes and stores function values for each node.
     *
     * @tparam NumNodes Maximum number of neighbors per node.
     * @tparam FunctionFunctor Functor type providing function value computation.
     * @tparam Bases Type representing basis functions.
     * @param function_functor Functor to compute function values.
     * @param bases Basis functions for computation.
     * @param use_evaluation_point_kernels If true, centers kernel at evaluation point (matches Compadre).
     */
    template <size_t NumNodes, typename FunctionFunctor, typename Bases>
    void compute_and_store_function_values(FunctionFunctor &function_functor, const Bases &bases, const bool use_evaluation_point_kernels = false) {
        // Start timer for function value computation
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(FunctionValueStorageProcessorTimerType::ComputeFunctionValues, "Compute Function Values");

        // Update and get the device mesh
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        auto ngp_mesh = m_ngp_mesh;

        // Update the fields to ensure they are current
        m_num_neighbors_field.UpdateField();
        m_neighbors_field.UpdateField();
        m_coordinates_field.UpdateField();
        m_function_values_field.UpdateField();
        m_kernel_radius_field.UpdateField();

        // Log the number of nodes being processed
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                aperi::Index idx(node_index);

                // Get the number of neighbors for this node
                size_t num_neighbors = m_num_neighbors_field(idx, 0);
                assert(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);

                // Get coordinates of the current node
                Eigen::Matrix<Real, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = m_coordinates_field(idx, j);
                }

                Eigen::Matrix<Real, NumNodes, 3> shifted_neighbor_coordinates;
                Eigen::Matrix<Real, NumNodes, 1> kernel_values;

                // Use the kernel radius of the evaluation point by default
                Real kernel_radius = m_kernel_radius_field(idx, 0);

                for (size_t i = 0; i < num_neighbors; ++i) {
                    // Get neighbor entity and its index
                    stk::mesh::Entity entity(m_neighbors_field(idx, i));
                    aperi::Index neighbor_index(ngp_mesh.fast_mesh_index(entity));

                    // Compute shifted coordinates relative to the current node
                    for (size_t j = 0; j < 3; ++j) {
                        shifted_neighbor_coordinates(i, j) = coordinates(0, j) - m_coordinates_field(neighbor_index, j);
                    }

                    // Optionally use the neighbor's kernel radius
                    if (!use_evaluation_point_kernels) {
                        kernel_radius = m_kernel_radius_field(neighbor_index, 0);
                    }

                    // Compute the kernel value for this neighbor
                    kernel_values(i, 0) = aperi::ComputeKernel(shifted_neighbor_coordinates.row(i), kernel_radius);
                }

                // Compute function values using the provided functor
                Eigen::Matrix<Real, NumNodes, 1> function_values = function_functor.Values(kernel_values, bases, shifted_neighbor_coordinates, num_neighbors);

                // Store computed function values in the field
                for (size_t i = 0; i < num_neighbors; ++i) {
                    m_function_values_field(idx, i) = function_values(i, 0);
                }
            });

        // Mark the function values field as modified on device
        m_function_values_field.MarkModifiedOnDevice();
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                                 // The mesh data object.
    std::vector<std::string> m_sets;                                              // The sets to process.
    aperi::TimerManager<FunctionValueStorageProcessorTimerType> m_timer_manager;  // The timer manager.

    stk::mesh::BulkData *m_bulk_data;  // The bulk data object.
    stk::mesh::Selector m_selector;    // The selector
    stk::mesh::NgpMesh m_ngp_mesh;     // The ngp mesh object.

    aperi::Field<Unsigned> m_num_neighbors_field;
    aperi::Field<Unsigned> m_neighbors_field;
    aperi::Field<Real> m_coordinates_field;
    aperi::Field<Real> m_function_values_field;
    aperi::Field<Real> m_kernel_radius_field;
};

#else  // USE_PROTEGO_MECH
using protego::FunctionValueStorageProcessor;
#endif

}  // namespace aperi
