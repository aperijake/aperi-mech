#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ComputeInternalForceFunctors.h"
#include "ElementBase.h"
#include "ElementForceProcessor.h"
#include "FieldData.h"
#include "InternalForceProcessor.h"
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "Material.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "QuadratureGaussian.h"
#include "ShapeFunctionsFunctorTet4.h"

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
    ElementTetrahedron4(const std::vector<FieldQueryData<double>> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material) : ElementBase(TET4_NUM_NODES, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data) {
        CreateElementForceProcessor();
        CreateFunctors();
        CreateInternalForceProcessor();
        ComputeElementVolume();
    }

    /**
     * @brief Destroys a ElementTetrahedron4 object.
     */
    virtual ~ElementTetrahedron4() {
        DestroyFunctors();
    }

    /**
     * @brief Creates the element processor associated with the element.
     */
    void CreateElementForceProcessor() {
        // Create a scoped timer
        auto timer = m_timer_manager->CreateScopedTimer(ElementTimerType::CreateElementForceProcessor);

        // Create the element processor
        if (!m_mesh_data) {
            // Allowing for testing
            aperi::CoutP0() << "No mesh data provided. Cannot create element processor. Skipping." << std::endl;
            return;
        }
        const FieldQueryData<double> field_query_data_scatter = {"force_coefficients", FieldQueryState::None};
        bool has_state = false;
        if (m_material) {
            has_state = m_material->HasState();
        }
        m_element_processor = std::make_shared<aperi::ElementForceProcessor<2, false>>(m_field_query_data_gather, field_query_data_scatter, m_mesh_data, m_part_names, has_state);
    }

    void CreateInternalForceProcessor() {
        // Create a scoped timer
        auto timer = m_timer_manager->CreateScopedTimer(ElementTimerType::CreateElementForceProcessor);

        // Create the element processor
        if (!m_mesh_data) {
            // Allowing for testing
            aperi::CoutP0() << "No mesh data provided. Cannot create element processor. Skipping." << std::endl;
            return;
        }
        const FieldQueryData<double> field_query_data_scatter = {"force_coefficients", FieldQueryState::None};

        // Create the compute force functor
        assert(this->m_material != nullptr);
        assert(m_shape_functions_functor != nullptr);
        assert(m_integration_functor != nullptr);

        // Create the element node processor
        m_element_node_processor = std::make_shared<aperi::ElementNodeProcessor<TET4_NUM_NODES>>(m_mesh_data, m_part_names);

        // Create the compute force functor
        // TODO(jake) Passing in the base class StressFunctor. This likely causes polymorphism vtable lookups, but avoids bloating with all Material / Element classes.
        // Leaving as is for now. My need to rethink how this is done in the Material class. Use a function pointer to get stress?
        m_compute_force = std::make_shared<aperi::ComputeForce<TET4_NUM_NODES, ShapeFunctionsFunctorTet4, Quadrature<1, TET4_NUM_NODES>, Material::StressFunctor>>(m_mesh_data, "displacement_coefficients", "force_coefficients", *m_shape_functions_functor, *m_integration_functor, *this->m_material);
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Create a scoped timer
        auto timer = m_timer_manager->CreateScopedTimer(ElementTimerType::Other);

        // Functor for computing shape function derivatives
        size_t compute_shape_function_derivatives_functor_size = sizeof(ShapeFunctionsFunctorTet4);
        auto compute_shape_function_derivatives_functor = (ShapeFunctionsFunctorTet4 *)Kokkos::kokkos_malloc(compute_shape_function_derivatives_functor_size);
        assert(compute_shape_function_derivatives_functor != nullptr);

        // Functor for 1-pt gauss quadrature
        size_t integration_functor_size = sizeof(Quadrature<1, TET4_NUM_NODES>);
        auto integration_functor = (Quadrature<1, TET4_NUM_NODES> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Quadrature points and weights. TODO(jake): Move to a more general location.
        const Eigen::Matrix<double, 1, 3> gauss_points = Eigen::Matrix<double, 1, 3>::Constant(0.25);
        const Eigen::Matrix<double, 1, 1> gauss_weights = Eigen::Matrix<double, 1, 1>::Constant(1.0 / 6.0);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateElementTetraHedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                new ((ShapeFunctionsFunctorTet4 *)compute_shape_function_derivatives_functor) ShapeFunctionsFunctorTet4();
                new ((Quadrature<1, TET4_NUM_NODES> *)integration_functor) Quadrature<1, TET4_NUM_NODES>(gauss_points, gauss_weights);
            });

        // Set the functors
        m_shape_functions_functor = compute_shape_function_derivatives_functor;
        m_integration_functor = integration_functor;
    }

    void DestroyFunctors() {
        auto shape_functions_functor = m_shape_functions_functor;
        auto integration_functor = m_integration_functor;
        Kokkos::parallel_for(
            "DestroyTetrahedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                shape_functions_functor->~ShapeFunctionsFunctorTet4();
                integration_functor->~Quadrature();
            });

        Kokkos::kokkos_free(m_shape_functions_functor);
        Kokkos::kokkos_free(m_integration_functor);

        m_shape_functions_functor = nullptr;
        m_integration_functor = nullptr;
    }

    /**
     * @brief Computes the volume of all elements.
     *
     */
    void ComputeElementVolume() {
        // Create a scoped timer
        auto timer = m_timer_manager->CreateScopedTimer(ElementTimerType::Other);

        assert(m_element_processor != nullptr);
        assert(m_integration_functor != nullptr);

        // Create the compute force functor, no stress functor needed
        ComputeInternalForceFromIntegrationPointFunctor<TET4_NUM_NODES, ShapeFunctionsFunctorTet4, Quadrature<1, TET4_NUM_NODES>, Material::StressFunctor> compute_force_functor(*m_shape_functions_functor, *m_integration_functor, *this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->ComputeElementVolume<TET4_NUM_NODES>(0, compute_force_functor);
    }

    /**
     * @brief Computes the internal force of all elements.
     *
     */
    void ComputeInternalForceAllElements(double time_increment) override {
        assert(m_element_node_processor != nullptr);
        assert(m_compute_force != nullptr);
        m_compute_force->UpdateFields();  // Updates the ngp fields
        m_compute_force->SetTimeIncrement(time_increment);
        // Loop over all elements and compute the internal force
        m_element_node_processor->for_each_element_and_nodes(*m_compute_force);
    }

   private:
    ShapeFunctionsFunctorTet4 *m_shape_functions_functor;
    Quadrature<1, TET4_NUM_NODES> *m_integration_functor;
    std::shared_ptr<aperi::ElementNodeProcessor<TET4_NUM_NODES>> m_element_node_processor;                                                                    // The element node processor.
    std::shared_ptr<aperi::ComputeForce<TET4_NUM_NODES, ShapeFunctionsFunctorTet4, Quadrature<1, TET4_NUM_NODES>, Material::StressFunctor>> m_compute_force;  // The compute force functor.
    const std::vector<FieldQueryData<double>> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ElementForceProcessor<2, false>> m_element_processor;
};

}  // namespace aperi