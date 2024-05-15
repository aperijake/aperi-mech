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
#include "QuadratureSmoothed.h"
#include "ShapeFunctionsFunctorTet4.h"

namespace aperi {

/**
 * @brief Represents a 4-node tetrahedron element with smoothed derivatives.
 *
 * This class inherits from the ElementBase base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class ElementSmoothedTetrahedron4 : public ElementBase {
   public:
    /**
     * @brief Constructs a ElementSmoothedTetrahedron4 object.
     */
    ElementSmoothedTetrahedron4(const std::vector<FieldQueryData> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<aperi::MeshData> mesh_data, std::shared_ptr<Material> material = nullptr) : ElementBase(TET4_NUM_NODES, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data) {
        CreateElementProcessor();
        CreateFunctors();
    }

    /**
     * @brief Destroys a ElementSmoothedTetrahedron4 object.
     */
    ~ElementSmoothedTetrahedron4() {
        DestroyFunctors();
    }

    void CreateElementProcessor() {
        // Create the element processor
        const FieldQueryData field_query_data_scatter = {"force", FieldQueryState::NP1};
        m_element_processor = std::make_shared<ElementGatherScatterProcessor<3, false>>(m_field_query_data_gather, field_query_data_scatter, m_mesh_data, m_part_names);
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function derivatives
        size_t compute_tet4_functions_functor_functor_size = sizeof(ShapeFunctionsFunctorTet4);
        auto compute_tet4_functions_functor_functor = (ShapeFunctionsFunctorTet4 *)Kokkos::kokkos_malloc(compute_tet4_functions_functor_functor_size);
        assert(compute_tet4_functions_functor_functor != nullptr);

        // Functor for 1-pt gauss quadrature
        size_t integration_functor_size = sizeof(SmoothedQuadrature<TET4_NUM_NODES>);
        auto integration_functor = (SmoothedQuadrature<TET4_NUM_NODES> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateSmoothedTetrahedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                new ((ShapeFunctionsFunctorTet4 *)compute_tet4_functions_functor_functor) ShapeFunctionsFunctorTet4();
                new ((SmoothedQuadrature<TET4_NUM_NODES> *)integration_functor) SmoothedQuadrature<TET4_NUM_NODES>();
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
                compute_functions_functor->~ShapeFunctionsFunctorTet4();
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
        ComputeInternalForceFunctor<TET4_NUM_NODES, ShapeFunctionsFunctorTet4, SmoothedQuadrature<TET4_NUM_NODES>, Material::StressFunctor> compute_force_functor(*m_compute_functions_functor, *m_integration_functor, *this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<TET4_NUM_NODES>(compute_force_functor);
    }

   private:
    ShapeFunctionsFunctorTet4 *m_compute_functions_functor;
    SmoothedQuadrature<TET4_NUM_NODES> *m_integration_functor;
    const std::vector<FieldQueryData> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ElementGatherScatterProcessor<3, false>> m_element_processor;
};

}  // namespace aperi
