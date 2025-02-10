#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ComputeInternalForceSmoothedCell.h"
#include "Constants.h"
#include "ElementBase.h"
#include "Field.h"
#include "FieldData.h"
#include "Kokkos_Core.hpp"
#include "LogUtils.h"
#include "Material.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "QuadratureSmoothed.h"
#include "ShapeFunctionsFunctorTet4.h"
#include "StrainSmoothingProcessor.h"

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
    ElementSmoothedTetrahedron4(const std::string &displacement_field_name, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material, const aperi::LagrangianFormulationType &lagrangian_formulation_type) : ElementBase(TET4_NUM_NODES, material), m_displacement_field_name(displacement_field_name), m_part_names(part_names), m_mesh_data(mesh_data), m_lagrangian_formulation_type(lagrangian_formulation_type) {
        // Find and store the element neighbors
        CreateElementForceProcessor();
        FindNeighbors();
        BuildSmoothedCellData();
        ComputeSmoothedQuadrature();
    }

    /**
     * @brief Destroys a ElementSmoothedTetrahedron4 object.
     */
    virtual ~ElementSmoothedTetrahedron4() {}

    void UpdateShapeFunctions() override {
        ComputeSmoothedQuadrature();
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

        // Create the element processor
        assert(m_material != nullptr);
        m_compute_force = std::make_shared<aperi::ComputeInternalForceSmoothedCell>(m_mesh_data, m_displacement_field_name, "force_coefficients", *this->m_material, m_lagrangian_formulation_type);
    }

    void FindNeighbors() {
        // Loop over all elements and store the neighbors
        aperi::NeighborSearchProcessor search_processor(m_mesh_data, m_part_names);
        bool set_first_function_value_to_one = true;
        search_processor.add_nodes_ring_0_nodes(set_first_function_value_to_one);
        search_processor.SyncFieldsToHost();  // Just needed for output
    }

    void BuildSmoothedCellData() {
        // Create the integration functor
        // size_t integration_functor_size = sizeof(SmoothedQuadratureTet4);
        // auto integration_functor = (SmoothedQuadratureTet4 *)Kokkos::kokkos_malloc(integration_functor_size);
        // assert(integration_functor != nullptr);

        // // Initialize the functors
        // Kokkos::parallel_for(
        //     "CreateSmoothedTetrahedron4StoringFunctors", 1, KOKKOS_LAMBDA(const int &) {
        //         new ((SmoothedQuadratureTet4 *)integration_functor) SmoothedQuadratureTet4();
        //     });

        // Create a host version of the functor
        m_smoothed_quadrature_host_functor = std::make_shared<SmoothedQuadratureTet4>();

        // Build the smoothed cell data
        m_strain_smoothing_processor = std::make_shared<aperi::StrainSmoothingProcessor>(m_mesh_data, m_part_names, m_lagrangian_formulation_type);
        m_smoothed_cell_data = m_strain_smoothing_processor->BuildSmoothedCellData<TET4_NUM_NODES>(TET4_NUM_NODES, true);

        // Add the strain smoothing timer manager to the timer manager
        m_timer_manager->AddChild(m_strain_smoothing_processor->GetTimerManager());

        // // Destroy the integration functor
        // Kokkos::parallel_for(
        //     "DestroySmoothedTetrahedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
        //         integration_functor->~SmoothedQuadratureTet4();
        //     });

        // Kokkos::kokkos_free(integration_functor);
    }

    void ComputeSmoothedQuadrature() {
        m_strain_smoothing_processor->ComputeFunctionDerivatives<TET4_NUM_NODES>(*m_smoothed_quadrature_host_functor.get(), true);
    }

    /**
     * @brief Gets the SmoothedCellData object.
     *
     * @return A shared pointer to the SmoothedCellData object.
     */
    std::shared_ptr<SmoothedCellData> GetSmoothedCellData() const override {
        return m_smoothed_cell_data;
    }

    /**
     * @brief Computes the internal force of all elements.
     *
     */
    void ComputeInternalForceAllElements(double time_increment) override {
        assert(this->m_material != nullptr);
        assert(m_compute_force != nullptr);

        // Loop over all elements and compute the internal force
        m_compute_force->UpdateFields();  // Updates the ngp fields
        m_compute_force->SetTimeIncrement(time_increment);
        m_compute_force->ForEachCellComputeForce(*m_smoothed_cell_data);
        m_compute_force->MarkFieldsModifiedOnDevice();
    }

   private:
    const std::string m_displacement_field_name;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ComputeInternalForceSmoothedCell> m_compute_force;
    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;
    aperi::LagrangianFormulationType m_lagrangian_formulation_type;
    std::shared_ptr<aperi::SmoothedQuadratureTet4> m_smoothed_quadrature_host_functor;
    std::shared_ptr<aperi::StrainSmoothingProcessor> m_strain_smoothing_processor;
};

}  // namespace aperi
