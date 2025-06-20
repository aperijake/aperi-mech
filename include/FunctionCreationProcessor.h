#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <array>
#include <map>
#include <memory>
#include <string>
#include <vector>

#include "AperiStkUtils.h"
#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "ForEachEntity.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "SimpleTimerFactory.h"
#include "Timer.h"
#include "TimerTypes.h"
#include "Types.h"

#ifdef USE_PROTEGO_MECH
#include "ProtegoFunctionCreationProcessor.h"
namespace aperi {
using protego::FunctionCreationProcessor;
}
#else

namespace aperi {

/**
 * @brief Processes and stores function values on mesh nodes.
 *
 * This class is responsible for computing and storing function values
 * associated with mesh nodes, including handling neighbor relationships,
 * kernel computations, and synchronization of field data.
 */
class FunctionCreationProcessor {
   public:
    /**
     * @brief Constructs the FunctionCreationProcessor.
     * @param mesh_data Shared pointer to mesh data.
     * @param sets List of mesh sets to process.
     * @param lagrangian_formulation_type The Lagrangian formulation type.
     * @param enable_accurate_timers Flag to enable accurate timing.
     */
    FunctionCreationProcessor(
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
    inline std::shared_ptr<aperi::TimerManager<FunctionCreationProcessorTimerType> > GetTimerManager() {
        return std::make_shared<aperi::TimerManager<FunctionCreationProcessorTimerType> >(m_timer_manager);
    }

    /**
     * @brief Computes and stores function values for each node.
     *
     * @tparam MaxNumNeighbors Maximum number of neighbors per node.
     * @tparam FunctionFunctor Functor type providing function value computation.
     * @tparam Bases Type representing basis functions.
     * @param function_functor Functor to compute function values.
     * @param bases Basis functions for computation.
     * @param use_evaluation_point_kernels If true, centers kernel at evaluation point (matches Compadre).
     */
    template <size_t MaxNumNeighbors, typename FunctionFunctor, typename Bases>
    void compute_and_store_function_values(FunctionFunctor &function_functor, const Bases &bases, const bool use_evaluation_point_kernels = false) {
        // Start timer for function value computation
        auto timer = m_timer_manager.CreateScopedTimerWithInlineLogging(FunctionCreationProcessorTimerType::ComputeFunctionValues, "Compute Function Values");

        // Update and get the device mesh
        m_ngp_mesh_data = m_mesh_data->GetUpdatedNgpMesh();

        // Update the fields to ensure they are current
        m_num_neighbors_field.UpdateField();
        m_neighbors_field.UpdateField();
        m_coordinates_field.UpdateField();
        m_function_values_field.UpdateField();
        m_kernel_radius_field.UpdateField();

        // Use aperi::ForEachNode for iteration
        aperi::ForEachNode(
            KOKKOS_CLASS_LAMBDA(const aperi::Index &idx) {
                // Get the number of neighbors for this node
                size_t num_neighbors = m_num_neighbors_field(idx, 0);
                assert(num_neighbors <= MAX_NODE_NUM_NEIGHBORS);

                // Get coordinates of the current node
                Eigen::Matrix<Real, 1, 3> coordinates;
                for (size_t j = 0; j < 3; ++j) {
                    coordinates(0, j) = m_coordinates_field(idx, j);
                }

                Eigen::Matrix<Real, MaxNumNeighbors, 3> shifted_neighbor_coordinates;
                Eigen::Matrix<Real, MaxNumNeighbors, 1> kernel_values;

                // Use the kernel radius of the evaluation point by default
                Real kernel_radius = m_kernel_radius_field(idx, 0);

                for (size_t i = 0; i < num_neighbors; ++i) {
                    // Use LocalOffsetToIndex for neighbor lookup
                    Unsigned neighbor_local_offset = m_neighbors_field(idx, i);
                    aperi::Index neighbor_index = m_ngp_mesh_data.LocalOffsetToIndex(neighbor_local_offset);

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
                Eigen::Matrix<Real, MaxNumNeighbors, 1> function_values = function_functor.Values(kernel_values, bases, shifted_neighbor_coordinates, num_neighbors);

                // Store computed function values in the field
                for (size_t i = 0; i < num_neighbors; ++i) {
                    m_function_values_field(idx, i) = function_values(i, 0);
                }
            },
            *m_mesh_data, m_selector);

        // Mark the function values field as modified on device
        m_function_values_field.MarkModifiedOnDevice();
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                             // The mesh data object.
    std::vector<std::string> m_sets;                                          // The sets to process.
    aperi::TimerManager<FunctionCreationProcessorTimerType> m_timer_manager;  // The timer manager.

    aperi::Selector m_selector;          // The selector
    aperi::NgpMeshData m_ngp_mesh_data;  // The ngp mesh data object

    aperi::Field<Unsigned> m_num_neighbors_field;  // Field for storing the number of neighbors per node.
    aperi::Field<Unsigned> m_neighbors_field;      // Field for storing neighbor indices for each node.
    aperi::Field<Real> m_function_values_field;    // Field for storing computed function values at each node.
    aperi::Field<Real> m_kernel_radius_field;      // Field with kernel radius for each node.
    aperi::Field<Real> m_coordinates_field;        // Field with coordinates of each node.
};

}  // namespace aperi
#endif
