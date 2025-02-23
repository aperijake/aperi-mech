#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ComputeElementVolumeFunctor.h"
#include "ComputeInternalForceGaussian.h"
#include "Constants.h"
#include "ElementBase.h"
#include "Field.h"
#include "FieldData.h"
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "Material.h"
#include "MeshData.h"
#include "MeshLabelerParameters.h"
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
    ElementTetrahedron4(
        const std::string &displacement_field_name,
        const std::vector<std::string> &part_names,
        std::shared_ptr<MeshData> mesh_data,
        std::shared_ptr<Material> material,
        const aperi::LagrangianFormulationType &lagrangian_formulation_type,
        const aperi::MeshLabelerParameters &mesh_labeler_parameters)
        : ElementBase(TET4_NUM_NODES,
                      displacement_field_name,
                      part_names,
                      mesh_data,
                      material,
                      lagrangian_formulation_type,
                      mesh_labeler_parameters) {
        CreateFunctors();
        CreateElementForceProcessor();
        CreateSmoothedCellDataProcessor();
        LabelParts();
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

        // Create the compute force functor
        assert(this->m_material != nullptr);
        assert(m_shape_functions_functor != nullptr);
        assert(m_integration_functor != nullptr);

        // Create the element node processor
        m_element_node_processor = std::make_shared<aperi::ElementNodeProcessor<TET4_NUM_NODES>>(m_mesh_data, m_part_names);

        // Create the compute force functor
        m_compute_force = std::make_shared<aperi::ComputeInternalForceGaussian<TET4_NUM_NODES, ShapeFunctionsFunctorTet4, Quadrature<1, TET4_NUM_NODES>>>(m_mesh_data, m_displacement_field_name, "force_coefficients", *m_shape_functions_functor, *m_integration_functor, *this->m_material, m_lagrangian_formulation_type);
    }

    void CreateSmoothedCellDataProcessor() {
        m_strain_smoothing_processor = std::make_shared<aperi::SmoothedCellDataProcessor>(m_mesh_data, m_part_names, m_lagrangian_formulation_type, m_mesh_labeler_parameters);
    }

    void LabelParts() {
        // Check that the mesh data is provided
        if (!m_mesh_data) {
            // Allowing for testing
            aperi::CoutP0() << "No mesh data provided. Cannot label parts. Skipping." << std::endl;
            return;
        }

        // Label the parts
        m_strain_smoothing_processor->LabelParts();
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

        // Check that the functors are created
        assert(m_element_node_processor != nullptr);
        assert(m_shape_functions_functor != nullptr);
        assert(m_integration_functor != nullptr);

        // Functor for computing the element volume
        auto compute_volume_functor = aperi::ComputeElementVolumeFunctor<TET4_NUM_NODES, ShapeFunctionsFunctorTet4, Quadrature<1, TET4_NUM_NODES>, Material::StressFunctor>(m_mesh_data, *m_shape_functions_functor, *m_integration_functor);

        // Loop over all elements and compute the volume
        m_element_node_processor->for_each_element_and_nodes(compute_volume_functor);

        auto element_volume_field = aperi::Field<double>(m_mesh_data, FieldQueryData<double>{"volume", FieldQueryState::None, FieldDataTopologyRank::ELEMENT});
        element_volume_field.MarkModifiedOnDevice();
        element_volume_field.SyncDeviceToHost();
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
        m_compute_force->MarkFieldsModifiedOnDevice();
    }

   private:
    ShapeFunctionsFunctorTet4 *m_shape_functions_functor;
    Quadrature<1, TET4_NUM_NODES> *m_integration_functor;
    std::shared_ptr<aperi::ElementNodeProcessor<TET4_NUM_NODES>> m_element_node_processor;
    std::shared_ptr<aperi::ComputeInternalForceGaussian<TET4_NUM_NODES, ShapeFunctionsFunctorTet4, Quadrature<1, TET4_NUM_NODES>>> m_compute_force;
    std::shared_ptr<aperi::SmoothedCellDataProcessor> m_strain_smoothing_processor;
};

}  // namespace aperi