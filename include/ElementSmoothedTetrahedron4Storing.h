#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementBase.h"
#include "ElementProcessor.h"
#include "ElementUtils.h"
#include "Kokkos_Core.hpp"
#include "Material.h"

namespace aperi {

/*
Options:
- Create view of views for neighbors and shape function derivatives
   - Pros:
   - Cons: Look-up index for neighbors and shape function derivatives?
- Create a StoredCell class that stores the neighbors and shape function derivatives, one for each element/cell
   - Pros: No need to look-up index for neighbors and shape function derivatives
   - Cons: Will stk for_each_entity be optimized for this?
*/

// Functor for computing shape function derivatives and storing them
class ComputeAndStoreShapeFunctionsFunctor {
   public:
    ComputeAndStoreShapeFunctionsFunctor() = default;

    // KOKKOS_INLINE_FUNCTION void operator()(const int &i) const {
    //     // Get the element
    //     auto element = m_element_processor->GetElement(i);

    //     // Get the physical nodal coordinates
    //     Eigen::Matrix<double, tet4_num_nodes, 3> node_coordinates;
    //     for (size_t j = 0; j < tet4_num_nodes; ++j) {
    //         node_coordinates.row(j) = element->GetNode(j)->GetCoordinates();
    //     }

    //     // Compute the shape function derivatives
    //     Eigen::Matrix<double, tet4_num_nodes, 3> shape_function_derivatives = m_compute_functions_functor->derivatives(0.0, 0.0, 0.0);

    //     // Store the shape function derivatives
    //     for (size_t j = 0; j < tet4_num_nodes; ++j) {
    //         m_shape_function_derivatives(i, j) = shape_function_derivatives.row(j);
    //     }
    // }

   // private:
   //  ElementGatherScatterProcessor<tet4_num_nodes> *m_element_processor;
   //  Tet4FunctionsFunctor *m_compute_functions_functor;
   //  Kokkos::View<Kokkos::View<Eigen::Vector3d *> *> m_shape_function_derivatives;
};

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
    ElementSmoothedTetrahedron4Storing() : ElementBase(tet4_num_nodes), m_compute_functions_functor(nullptr), m_integration_functor(nullptr) {
        // Find and store the element neighbors
        FindAndStoreElementNeighbors(); // For tet, loop over all elements and put nodes in the neighbors field
        ComputeAndStoreShapeFunctionDerivatives();
        // CreateFunctors();
    }

    /**
     * @brief Destroys a ElementSmoothedTetrahedron4Storing object.
     */
    ~ElementSmoothedTetrahedron4Storing() {
        DestroyFunctors();
    }

    void FindAndStoreElementNeighbors() {
        // Loop over all elements and store the neighbors
        aperi::MeshNeighborSearchProcessor search_processor(m_element_processor->GetMeshData(), m_element_processor->GetSets());
        search_processor.add_element_nodes();
    }

    void ComputeAndStoreShapeFunctionDerivatives() {
        /*
            // Loop over all elements, will need to get the physical nodal coordinates for each element to compute the shape function derivatives
            // compute_and_store_shape_function_derivatives_functor will need an integration functor
            m_element_processor->for_each_element_gather_scatter_nodal_data<tet4_num_nodes>(compute_and_store_shape_function_derivatives_functor);
        */
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function derivatives
        size_t compute_tet4_functions_functor_functor_size = sizeof(Tet4FunctionsFunctor);
        auto compute_tet4_functions_functor_functor = (Tet4FunctionsFunctor *)Kokkos::kokkos_malloc(compute_tet4_functions_functor_functor_size);
        assert(compute_tet4_functions_functor_functor != nullptr);

        // Functor for 1-pt gauss quadrature
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
     * @brief Calls the Tet4FunctionsFunctor to compute the shape function derivatives.
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape functions of the element.
     */
    Eigen::Matrix<double, tet4_num_nodes, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const override {
        return m_compute_functions_functor->derivatives(xi, eta, zeta);
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape functions of the element.
     */
    Eigen::Matrix<double, tet4_num_nodes, 1> ComputeShapeFunctions(double xi, double eta, double zeta) const override {
        return m_compute_functions_functor->values(xi, eta, zeta);
    }

    /**
     * @brief Computes the internal force of all elements.
     *
     */
    void ComputeInternalForceAllElements() override {
        assert(m_material != nullptr);
        assert(m_element_processor != nullptr);
        assert(m_integration_functor != nullptr);

        // Create the compute force functor
        ComputeInternalForceFunctor<tet4_num_nodes, Tet4FunctionsFunctor, SmoothedQuadrature<tet4_num_nodes>, Material::StressFunctor> compute_force_functor(*m_compute_functions_functor, *m_integration_functor, *m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<tet4_num_nodes>(compute_force_functor);
    }

   private:
    Tet4FunctionsFunctor *m_compute_functions_functor;
    SmoothedQuadrature<tet4_num_nodes> *m_integration_functor;

};

}  // namespace aperi
