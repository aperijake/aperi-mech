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

namespace aperi {

/**
 * @brief Represents a 4-node tetrahedron element with smoothed derivatives.
 *
 * This class inherits from the ElementBase base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class ElementSmoothedTetrahedron4Storing : public ElementBase {
   public:
    /**
     * @brief Constructs a ElementSmoothedTetrahedron4Storing object.
     */
    ElementSmoothedTetrahedron4Storing(const std::vector<FieldQueryData> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material = nullptr) : ElementBase(tet4_num_nodes, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data) {
        // Find and store the element neighbors
        CreateElementProcessor();
        CreateFunctors();
        ComputeNeighborValues();
    }

    /**
     * @brief Destroys a ElementSmoothedTetrahedron4Storing object.
     */
    ~ElementSmoothedTetrahedron4Storing() {
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
        aperi::MeshNeighborSearchProcessor search_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        search_processor.add_element_nodes();
        search_processor.for_each_neighbor_compute_derivatives<tet4_num_nodes>(m_compute_functions_functor, m_integration_functor);
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function derivatives
        size_t compute_tet4_functions_functor_functor_size = sizeof(Tet4FunctionsFunctor);
        auto compute_tet4_functions_functor_functor = (Tet4FunctionsFunctor *)Kokkos::kokkos_malloc(compute_tet4_functions_functor_functor_size);
        assert(compute_tet4_functions_functor_functor != nullptr);

        // Functor for smooth quadrature
        size_t integration_functor_size = sizeof(SmoothedQuadrature<tet4_num_nodes>);
        auto integration_functor = (SmoothedQuadrature<tet4_num_nodes> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateSmoothedTetrahedron4StoringFunctors", 1, KOKKOS_LAMBDA(const int &) {
                new ((Tet4FunctionsFunctor *)compute_tet4_functions_functor_functor) Tet4FunctionsFunctor();
                new ((SmoothedQuadrature<tet4_num_nodes> *)integration_functor) SmoothedQuadrature<tet4_num_nodes>();
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
                compute_functions_functor->~Tet4FunctionsFunctor();
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
        FlexibleComputeInternalForceFunctor<tet4_num_nodes, Material::StressFunctor> compute_force_functor(*this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<tet4_num_nodes>(compute_force_functor);
    }

   private:
    Tet4FunctionsFunctor *m_compute_functions_functor;
    SmoothedQuadrature<tet4_num_nodes> *m_integration_functor;
    const std::vector<FieldQueryData> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ElementGatherScatterProcessor<3, true>> m_element_processor;
};

}  // namespace aperi
