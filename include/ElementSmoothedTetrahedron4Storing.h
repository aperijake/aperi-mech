#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementBase.h"
#include "ElementProcessor.h"
#include "ElementUtils.h"
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
    ElementSmoothedTetrahedron4Storing(std::shared_ptr<aperi::ElementGatherScatterProcessor<3>> element_processor = nullptr, std::shared_ptr<Material> material = nullptr) : ElementBase(tet4_num_nodes, element_processor, material) {
        // Find and store the element neighbors
        CreateFunctors();
        ComputeNeighborValues();
    }

    /**
     * @brief Destroys a ElementSmoothedTetrahedron4Storing object.
     */
    ~ElementSmoothedTetrahedron4Storing() {
        DestroyFunctors();
    }

    void ComputeNeighborValues() {
        assert(m_element_processor != nullptr);
        // Loop over all elements and store the neighbors
        aperi::MeshNeighborSearchProcessor search_processor(m_element_processor->GetMeshData(), m_element_processor->GetSets());
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
