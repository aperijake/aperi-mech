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
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "Material.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "QuadratureGaussian.h"
#include "ShapeFunctionsFunctorHex8.h"

namespace aperi {

/**
 * @brief Represents a 8-node hexahedron element.
 *
 * This class inherits from the ElementBase base class and provides a specific implementation
 * for a 8-node hexahedron element. It contains functionality to compute the internal force
 * of the element.
 */
class ElementHexahedron8 : public ElementBase {
   public:
    /**
     * @brief Constructs a ElementHexahedron8 object.
     */
    ElementHexahedron8(const std::vector<FieldQueryData<double>> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material) : ElementBase(HEX8_NUM_NODES, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data) {
        CreateElementForceProcessor();
        CreateFunctors();
    }

    /**
     * @brief Destroys a ElementHexahedron8 object.
     */
    virtual ~ElementHexahedron8() {
        DestroyFunctors();
    }

    /**
     * @brief Creates the element processor associated with the element.
     */
    void CreateElementForceProcessor() {
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

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function derivatives
        size_t compute_shape_function_derivatives_functor_size = sizeof(ShapeFunctionsFunctorHex8);
        auto compute_shape_function_derivatives_functor = (ShapeFunctionsFunctorHex8 *)Kokkos::kokkos_malloc(compute_shape_function_derivatives_functor_size);
        assert(compute_shape_function_derivatives_functor != nullptr);

        // Functor for 1-pt gauss quadrature
        size_t integration_functor_size = sizeof(Quadrature<8, HEX8_NUM_NODES>);
        auto integration_functor = (Quadrature<8, HEX8_NUM_NODES> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Quadrature points and weights. TODO(jake): Move to a more general location.
        // 2x2x2 Gauss quadrature
        const double location = 1.0 / std::sqrt(3.0);
        Eigen::Matrix<double, 8, 3> gauss_points;
        gauss_points << -location, -location, -location,
            location, -location, -location,
            location, location, -location,
            -location, location, -location,
            -location, -location, location,
            location, -location, location,
            location, location, location,
            -location, location, location;
        const Eigen::Matrix<double, 8, 1> gauss_weights = Eigen::Matrix<double, 8, 1>::Constant(1.0);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateElementHexahedron8Functors", 1, KOKKOS_LAMBDA(const int &) {
                new ((ShapeFunctionsFunctorHex8 *)compute_shape_function_derivatives_functor) ShapeFunctionsFunctorHex8();
                new ((Quadrature<8, HEX8_NUM_NODES> *)integration_functor) Quadrature<8, HEX8_NUM_NODES>(gauss_points, gauss_weights);
            });

        // Set the functors
        m_shape_functions_functor = compute_shape_function_derivatives_functor;
        m_integration_functor = integration_functor;
    }

    void DestroyFunctors() {
        auto shape_functions_functor = m_shape_functions_functor;
        auto integration_functor = m_integration_functor;
        Kokkos::parallel_for(
            "DestroyHexahedron8Functors", 1, KOKKOS_LAMBDA(const int &) {
                shape_functions_functor->~ShapeFunctionsFunctorHex8();
                integration_functor->~Quadrature();
            });

        Kokkos::kokkos_free(m_shape_functions_functor);
        Kokkos::kokkos_free(m_integration_functor);

        m_shape_functions_functor = nullptr;
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
        ComputeInternalForceFromIntegrationPointFunctor<HEX8_NUM_NODES, ShapeFunctionsFunctorHex8, Quadrature<8, HEX8_NUM_NODES>, Material::StressFunctor> compute_force_functor(*m_shape_functions_functor, *m_integration_functor, *this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<HEX8_NUM_NODES>(compute_force_functor);
    }

   private:
    ShapeFunctionsFunctorHex8 *m_shape_functions_functor;
    Quadrature<8, HEX8_NUM_NODES> *m_integration_functor;
    const std::vector<FieldQueryData<double>> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ElementForceProcessor<2, false>> m_element_processor;
};

}  // namespace aperi