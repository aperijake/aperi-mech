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
 * @brief Represents a 4-node tetrahedron element.
 *
 * This class inherits from the ElementBase base class and provides a specific implementation
 * for a 4-node tetrahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class ElementTetrahedron4 : public ElementBase {
   public:
    /**
     * @brief Constructs a ElementTetrahedron4 object.
     */
    ElementTetrahedron4() : ElementBase(tet4_num_nodes), m_compute_shape_function_derivatives_functor(nullptr), m_integration_functor(nullptr) {
        CreateFunctors();
    }

    /**
     * @brief Destroys a ElementTetrahedron4 object.
     */
    ~ElementTetrahedron4() {
        DestroyFunctors();
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function derivatives
        size_t compute_shape_function_derivatives_functor_size = sizeof(Tet4FunctionDerivativesFunctor);
        auto compute_shape_function_derivatives_functor = (Tet4FunctionDerivativesFunctor *)Kokkos::kokkos_malloc(compute_shape_function_derivatives_functor_size);
        assert(compute_shape_function_derivatives_functor != nullptr);

        // Functor for 1-pt gauss quadrature
        size_t integration_functor_size = sizeof(Quadrature<1, tet4_num_nodes>);
        auto integration_functor = (Quadrature<1, tet4_num_nodes> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Quadrature points and weights
        const Eigen::Matrix<double, 1, 3> gauss_points = Eigen::Matrix<double, 1, 3>::Constant(1.0 / 3.0);
        const Eigen::Matrix<double, 1, 1> gauss_weights = Eigen::Matrix<double, 1, 1>::Constant(1.0 / 6.0);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateElementTetraHedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                new ((Tet4FunctionDerivativesFunctor *)compute_shape_function_derivatives_functor) Tet4FunctionDerivativesFunctor();
                new ((Quadrature<1, tet4_num_nodes> *)integration_functor) Quadrature<1, tet4_num_nodes>(gauss_points, gauss_weights);
            });

        // Set the functors
        m_compute_shape_function_derivatives_functor = compute_shape_function_derivatives_functor;
        m_integration_functor = integration_functor;
    }

    void DestroyFunctors() {
        Kokkos::parallel_for(
            "DestroyTetrahedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                m_compute_shape_function_derivatives_functor->~Tet4FunctionDerivativesFunctor();
                m_integration_functor->~Quadrature();
            });

        Kokkos::kokkos_free(m_compute_shape_function_derivatives_functor);
        Kokkos::kokkos_free(m_integration_functor);

        m_compute_shape_function_derivatives_functor = nullptr;
        m_integration_functor = nullptr;
    }

    /**
     * @brief Calls the Tet4FunctionDerivativesFunctor to compute the shape function derivatives.
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape functions of the element.
     */
    Eigen::Matrix<double, tet4_num_nodes, 3> ComputeShapeFunctionDerivatives(double xi, double eta, double zeta) const override {
        return Tet4FunctionDerivativesFunctor()(xi, eta, zeta);
    }

    /**
     * @brief Computes the shape functions of the element.
     * @param xi The xi coordinate of the element.
     * @param eta The eta coordinate of the element.
     * @param zeta The zeta coordinate of the element.
     * @return The shape functions of the element.
     */
    Eigen::Matrix<double, tet4_num_nodes, 1> ComputeShapeFunctions(double xi, double eta, double zeta) const override {
        return Tet4ShapeFunctionsFunctor()(xi, eta, zeta);
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
        ComputeInternalForceFunctor<tet4_num_nodes, Tet4FunctionDerivativesFunctor, Quadrature<1, tet4_num_nodes>, Material::StressFunctor> compute_force_functor(*m_compute_shape_function_derivatives_functor, *m_integration_functor, *m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element<tet4_num_nodes>(compute_force_functor);
    }

   private:
    Tet4FunctionDerivativesFunctor *m_compute_shape_function_derivatives_functor;
    Quadrature<1, tet4_num_nodes> *m_integration_functor;
};

}  // namespace aperi
