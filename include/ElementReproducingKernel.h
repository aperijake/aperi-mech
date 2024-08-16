#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ElementBase.h"
#include "ElementProcessor.h"
#include "ElementUtils.h"
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
 * @brief Represents a 4-node tetrahedron element with smoothed derivatives.
 *
 * This class inherits from the ElementBase base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class ElementReproducingKernel : public ElementBase {
   public:
    /**
     * @brief Constructs a ElementReproducingKernel object.
     */
    ElementReproducingKernel(const std::vector<FieldQueryData<double>> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material = nullptr, double kernel_radius_scale_factor = 1.0) : ElementBase(TET4_NUM_NODES, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data), m_kernel_radius_scale_factor(kernel_radius_scale_factor) {
        // Find and store the element neighbors
        CreateElementProcessor();
        CreateFunctors();
        ComputeNeighborValues();
    }

    /**
     * @brief Destroys a ElementReproducingKernel object.
     */
    ~ElementReproducingKernel() {
        DestroyFunctors();
    }

    void CreateElementProcessor() {
        // Create the element processor
        const FieldQueryData<double> field_query_data_scatter = {"force_local", FieldQueryState::None};
        m_element_processor = std::make_shared<ElementGatherScatterProcessor<2, true>>(m_field_query_data_gather, field_query_data_scatter, m_mesh_data, m_part_names);
    }

    void ComputeNeighborValues() {
        assert(m_element_processor != nullptr);
        // Loop over all elements and store the neighbors
        aperi::NeighborSearchProcessor search_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        search_processor.add_nodes_neighbors_within_variable_ball(m_kernel_radius_scale_factor, false /*add debug fields*/);

        search_processor.SyncFieldsToHost();  // Just needed for output
        search_processor.PrintNumNeighborsStats();

        aperi::FunctionValueStorageProcessor function_value_storage_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        function_value_storage_processor.compute_and_store_function_values<MAX_NODE_NUM_NEIGHBORS>(*m_compute_node_functions_functor);

        aperi::StrainSmoothingProcessor strain_smoothing_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        strain_smoothing_processor.for_each_neighbor_compute_derivatives<TET4_NUM_NODES>(m_compute_fem_functions_functor, m_integration_functor);
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function values at nodes
        size_t compute_node_functions_functor_size = sizeof(ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS>);
        auto compute_node_functions_functor = (ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS> *)Kokkos::kokkos_malloc(compute_node_functions_functor_size);
        assert(compute_node_functions_functor != nullptr);

        // Functor for smooth quadrature
        size_t integration_functor_size = sizeof(SmoothedQuadrature<TET4_NUM_NODES>);
        auto integration_functor = (SmoothedQuadrature<TET4_NUM_NODES> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Functor for computing fem shape functions on the element
        size_t compute_tet4_functions_functor_functor_size = sizeof(ShapeFunctionsFunctorTet4);
        auto compute_tet4_functions_functor_functor = (ShapeFunctionsFunctorTet4 *)Kokkos::kokkos_malloc(compute_tet4_functions_functor_functor_size);
        assert(compute_tet4_functions_functor_functor != nullptr);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
                new ((ShapeFunctionsFunctorTet4 *)compute_tet4_functions_functor_functor) ShapeFunctionsFunctorTet4();
                new ((ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS> *)compute_node_functions_functor) ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS>();
                new ((SmoothedQuadrature<TET4_NUM_NODES> *)integration_functor) SmoothedQuadrature<TET4_NUM_NODES>();
            });

        // Set the functors
        m_compute_node_functions_functor = compute_node_functions_functor;
        m_compute_fem_functions_functor = compute_tet4_functions_functor_functor;
        m_integration_functor = integration_functor;
    }

    void DestroyFunctors() {
        auto compute_node_functions_functor = m_compute_node_functions_functor;
        auto integration_functor = m_integration_functor;
        auto compute_fem_functions_functor = m_compute_fem_functions_functor;
        Kokkos::parallel_for(
            "DestroySmoothedTetrahedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                compute_node_functions_functor->~ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS>();
                integration_functor->~SmoothedQuadrature();
                compute_fem_functions_functor->~ShapeFunctionsFunctorTet4();
            });

        Kokkos::kokkos_free(m_compute_node_functions_functor);
        Kokkos::kokkos_free(m_integration_functor);
        Kokkos::kokkos_free(m_compute_fem_functions_functor);

        m_compute_node_functions_functor = nullptr;
        m_integration_functor = nullptr;
        m_compute_fem_functions_functor = nullptr;
    }

    /**
     * @brief Computes the internal force of all elements.
     *
     */
    void ComputeInternalForceAllElements() override {
        assert(this->m_material != nullptr);
        assert(m_element_processor != nullptr);
        assert(m_integration_functor != nullptr);

        // Create the compute force functor
        FlexibleComputeInternalForceFunctor<TET4_NUM_NODES, Material::StressFunctor> compute_force_functor(*this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<TET4_NUM_NODES>(compute_force_functor);
    }

   private:
    ShapeFunctionsFunctorReproducingKernel<MAX_NODE_NUM_NEIGHBORS> *m_compute_node_functions_functor;
    ShapeFunctionsFunctorTet4 *m_compute_fem_functions_functor;
    SmoothedQuadrature<TET4_NUM_NODES> *m_integration_functor;
    const std::vector<FieldQueryData<double>> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    double m_kernel_radius_scale_factor;
    std::shared_ptr<aperi::ElementGatherScatterProcessor<2, true>> m_element_processor;
};

}  // namespace aperi
