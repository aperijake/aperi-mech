#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ComputeInternalForceFunctors.h"
#include "ElementBase.h"
#include "ElementProcessor.h"
#include "FieldData.h"
#include "FunctionValueStorageProcessor.h"
#include "Kokkos_Core.hpp"
#include "Material.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "QuadratureSmoothed.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"
#include "ShapeFunctionsFunctorTet4.h"

namespace aperi {

/**
 * @brief Reproducing kernel functions smoothed over an element/integration cell.
 *
 * This class inherits from the ElementBase base class and provides a specific implementation
 * for a reproducing kernel element. It contains functionality to compute the internal force
 * of the element.
 */
template <size_t NumCellNodes>
class ElementReproducingKernel : public ElementBase {
   public:
    /**
     * @brief Constructs a ElementReproducingKernel object.
     */
    ElementReproducingKernel(const std::vector<FieldQueryData<double>> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material = nullptr, double kernel_radius_scale_factor = 1.0) : ElementBase(NumCellNodes, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data), m_kernel_radius_scale_factor(kernel_radius_scale_factor) {
        // Find and store the element neighbors
        CreateElementProcessor();
        FindNeighbors();
        ComputeAndStoreFunctionValues();
        if (NumCellNodes == 4) {
            ComputeSmoothedQuadratureTet4();
        } else {
            throw std::runtime_error("ElementReproducingKernel only supports 4-node tetrahedron elements.");
        }
    }

    /**
     * @brief Destroys a ElementReproducingKernel object.
     */
    ~ElementReproducingKernel() {}

    void CreateElementProcessor() {
        // Create the element processor
        const FieldQueryData<double> field_query_data_scatter = {"force_local", FieldQueryState::None};
        m_element_processor = std::make_shared<ElementGatherScatterProcessor<2, true>>(m_field_query_data_gather, field_query_data_scatter, m_mesh_data, m_part_names);
    }

    void FindNeighbors() {
        // Loop over all elements and store the neighbors
        aperi::NeighborSearchProcessor search_processor(m_mesh_data, m_part_names);
        search_processor.add_nodes_neighbors_within_variable_ball(m_kernel_radius_scale_factor, false /*add debug fields*/);

        search_processor.SyncFieldsToHost();  // Just needed for output
        search_processor.PrintNumNeighborsStats();
    }

    void ComputeAndStoreFunctionValues() {
        // Functor for computing shape function values at nodes
        size_t compute_node_functions_functor_size = sizeof(ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS>);
        auto compute_node_functions_functor = (ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS> *)Kokkos::kokkos_malloc(compute_node_functions_functor_size);
        assert(compute_node_functions_functor != nullptr);

        // Initialize the functor
        Kokkos::parallel_for(
            "CreateReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
                new ((ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS> *)compute_node_functions_functor) ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS>();
            });

        aperi::FunctionValueStorageProcessor function_value_storage_processor(m_mesh_data, m_part_names);
        function_value_storage_processor.compute_and_store_function_values<MAX_NODE_NUM_NEIGHBORS>(*compute_node_functions_functor);

        // Destroy the functor
        Kokkos::parallel_for(
            "DestroyReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
                compute_node_functions_functor->~ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS>();
            });

        Kokkos::kokkos_free(compute_node_functions_functor);
    }

    void ComputeSmoothedQuadratureTet4() {
        // Functor for smooth quadrature
        size_t integration_functor_size = sizeof(SmoothedQuadratureTet4);
        auto integration_functor = (SmoothedQuadratureTet4 *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
                new ((SmoothedQuadratureTet4 *)integration_functor) SmoothedQuadratureTet4();
            });

        aperi::StrainSmoothingProcessor strain_smoothing_processor(m_mesh_data, m_part_names);
        strain_smoothing_processor.for_each_neighbor_compute_derivatives<NumCellNodes>(integration_functor);

        // Destroy the functors
        Kokkos::parallel_for(
            "DestroyReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
                integration_functor->~SmoothedQuadratureTet4();
            });

        Kokkos::kokkos_free(integration_functor);
    }

    /**
     * @brief Computes the internal force of all elements.
     *
     */
    void ComputeInternalForceAllElements() override {
        assert(this->m_material != nullptr);
        assert(m_element_processor != nullptr);

        // Create the compute force functor
        ComputeInternalForceFromSmoothingCellFunctor<NumCellNodes, Material::StressFunctor> compute_force_functor(*this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<NumCellNodes>(compute_force_functor);
    }

   private:
    const std::vector<FieldQueryData<double>> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    double m_kernel_radius_scale_factor;
    std::shared_ptr<aperi::ElementGatherScatterProcessor<2, true>> m_element_processor;
};

}  // namespace aperi
