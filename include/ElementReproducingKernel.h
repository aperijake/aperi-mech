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
#include "Kokkos_Core.hpp"
#include "Material.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "QuadratureSmoothed.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"

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
    ElementReproducingKernel(const std::vector<FieldQueryData> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material = nullptr) : ElementBase(TET4_NUM_NODES, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data) {
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
        const FieldQueryData field_query_data_scatter = {"force", FieldQueryState::NP1};
        m_element_processor = std::make_shared<ElementGatherScatterProcessor<3, true>>(m_field_query_data_gather, field_query_data_scatter, m_mesh_data, m_part_names);
    }

    void ComputeNeighborValues() {
        assert(m_element_processor != nullptr);
        // Loop over all elements and store the neighbors
        aperi::NeighborSearchProcessor<aperi::FieldDataRank::ELEMENT> search_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        search_processor.add_ring_0_nodes();
        aperi::StrainSmoothingProcessor strain_smoothing_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        strain_smoothing_processor.for_each_neighbor_compute_derivatives<MAX_CELL_NUM_NEIGHBORS>(m_compute_functions_functor, m_integration_functor);
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function derivatives
        size_t compute_tet4_functions_functor_functor_size = sizeof(ShapeFunctionsFunctorReproducingKernelOnTet4<MAX_CELL_NUM_NEIGHBORS>);
        auto compute_tet4_functions_functor_functor = (ShapeFunctionsFunctorReproducingKernelOnTet4<MAX_CELL_NUM_NEIGHBORS> *)Kokkos::kokkos_malloc(compute_tet4_functions_functor_functor_size);
        assert(compute_tet4_functions_functor_functor != nullptr);

        // Functor for smooth quadrature
        size_t integration_functor_size = sizeof(SmoothedQuadrature<MAX_CELL_NUM_NEIGHBORS>);
        auto integration_functor = (SmoothedQuadrature<MAX_CELL_NUM_NEIGHBORS> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateSmoothedTetrahedron4StoringFunctors", 1, KOKKOS_LAMBDA(const int &) {
                new ((ShapeFunctionsFunctorReproducingKernelOnTet4<MAX_CELL_NUM_NEIGHBORS> *)compute_tet4_functions_functor_functor) ShapeFunctionsFunctorReproducingKernelOnTet4<MAX_CELL_NUM_NEIGHBORS>();
                new ((SmoothedQuadrature<MAX_CELL_NUM_NEIGHBORS> *)integration_functor) SmoothedQuadrature<MAX_CELL_NUM_NEIGHBORS>();
            });

        // Set the functors
        m_compute_functions_functor = compute_tet4_functions_functor_functor;
        m_integration_functor = integration_functor;
    }

    void DestroyFunctors() {
        auto compute_functions_functor = m_compute_functions_functor;
        auto integration_functor = m_integration_functor;
        Kokkos::parallel_for(
            "DestroySmoothedTetrahedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                compute_functions_functor->~ShapeFunctionsFunctorReproducingKernelOnTet4<MAX_CELL_NUM_NEIGHBORS>();
                integration_functor->~SmoothedQuadrature();
            });

        Kokkos::kokkos_free(m_compute_functions_functor);
        Kokkos::kokkos_free(m_integration_functor);

        m_compute_functions_functor = nullptr;
        m_integration_functor = nullptr;
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
    ShapeFunctionsFunctorReproducingKernelOnTet4<MAX_CELL_NUM_NEIGHBORS> *m_compute_functions_functor;
    SmoothedQuadrature<MAX_CELL_NUM_NEIGHBORS> *m_integration_functor;
    const std::vector<FieldQueryData> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ElementGatherScatterProcessor<3, true>> m_element_processor;
};

}  // namespace aperi
