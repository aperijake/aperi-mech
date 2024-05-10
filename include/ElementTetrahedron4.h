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
#include "LogUtils.h"
#include "Material.h"
#include "MeshData.h"
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
    ElementTetrahedron4(const std::vector<FieldQueryData> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material = nullptr) : ElementBase(tet4_num_nodes, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data) {
        CreateElementProcessor();
        CreateFunctors();
    }

    /**
     * @brief Destroys a ElementTetrahedron4 object.
     */
    ~ElementTetrahedron4() {
        DestroyFunctors();
    }

    /**
     * @brief Creates the element processor associated with the element.
     */
    void CreateElementProcessor() {
        // Create the element processor
        if (!m_mesh_data) {
            // Allowing for testing
            aperi::CoutP0() << "No mesh data provided. Cannot create element processor. Skipping." << std::endl;
            return;
        }
        const FieldQueryData field_query_data_scatter = {"force", FieldQueryState::NP1};
        m_element_processor = std::make_shared<aperi::ElementGatherScatterProcessor<3, false>>(m_field_query_data_gather, field_query_data_scatter, m_mesh_data, m_part_names);
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for computing shape function derivatives
        size_t compute_shape_function_derivatives_functor_size = sizeof(ShapeFunctionsFunctorTet4);
        auto compute_shape_function_derivatives_functor = (ShapeFunctionsFunctorTet4 *)Kokkos::kokkos_malloc(compute_shape_function_derivatives_functor_size);
        assert(compute_shape_function_derivatives_functor != nullptr);

        // Functor for 1-pt gauss quadrature
        size_t integration_functor_size = sizeof(Quadrature<1, tet4_num_nodes>);
        auto integration_functor = (Quadrature<1, tet4_num_nodes> *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Quadrature points and weights. TODO(jake): Move to a more general location.
        const Eigen::Matrix<double, 1, 3> gauss_points = Eigen::Matrix<double, 1, 3>::Constant(0.25);
        const Eigen::Matrix<double, 1, 1> gauss_weights = Eigen::Matrix<double, 1, 1>::Constant(1.0 / 6.0);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateElementTetraHedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                new ((ShapeFunctionsFunctorTet4 *)compute_shape_function_derivatives_functor) ShapeFunctionsFunctorTet4();
                new ((Quadrature<1, tet4_num_nodes> *)integration_functor) Quadrature<1, tet4_num_nodes>(gauss_points, gauss_weights);
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
     * @brief Computes the internal force of all elements.
     *
     */
    void ComputeInternalForceAllElements() override {
        assert(this->m_material != nullptr);
        assert(m_element_processor != nullptr);
        assert(m_integration_functor != nullptr);

        // Create the compute force functor
        ComputeInternalForceFunctor<tet4_num_nodes, ShapeFunctionsFunctorTet4, Quadrature<1, tet4_num_nodes>, Material::StressFunctor> compute_force_functor(*m_shape_functions_functor, *m_integration_functor, *this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<tet4_num_nodes>(compute_force_functor);
    }

   private:
    ShapeFunctionsFunctorTet4 *m_shape_functions_functor;
    Quadrature<1, tet4_num_nodes> *m_integration_functor;
    const std::vector<FieldQueryData> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ElementGatherScatterProcessor<3, false>> m_element_processor;
};

}  // namespace aperi