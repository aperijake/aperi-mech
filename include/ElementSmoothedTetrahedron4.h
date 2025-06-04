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
#include "MeshLabelerParameters.h"
#include "NeighborSearchProcessor.h"
#include "QuadratureSmoothed.h"
#include "ShapeFunctionsFunctorTet4.h"
#include "SmoothedCellDataProcessor.h"

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
    ElementSmoothedTetrahedron4(
        const std::string& displacement_field_name,
        const std::vector<std::string>& part_names,
        std::shared_ptr<MeshData> mesh_data,
        std::shared_ptr<Material> material,
        const aperi::LagrangianFormulationType& lagrangian_formulation_type,
        const aperi::MeshLabelerParameters& mesh_labeler_parameters,
        bool use_f_bar,
        bool enable_accurate_timers)
        : ElementBase(TET4_NUM_NODES,
                      displacement_field_name,
                      part_names,
                      mesh_data,
                      material,
                      lagrangian_formulation_type,
                      mesh_labeler_parameters,
                      enable_accurate_timers),
          m_use_f_bar(use_f_bar) {
        // F bar not supported for this element type right now
        if (m_use_f_bar) {
            std::runtime_error("F bar is not supported for ElementSmoothedTetrahedron4.");
        }
        // Initialize element processing
        CreateElementForceProcessor();
        CreateSmoothedCellDataProcessor();
        LabelParts();
        FindNeighbors();
        BuildSmoothedCellData();
        BuildQuadratureFunctor();
        UpdateShapeFunctions();
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
        m_compute_force = std::make_shared<aperi::ComputeInternalForceSmoothedCell>(m_mesh_data, m_displacement_field_name, "force_coefficients", *this->m_material, m_lagrangian_formulation_type, m_use_f_bar);
    }

    void FindNeighbors() {
        // Loop over all elements and store the neighbors
        aperi::NeighborSearchProcessor search_processor(m_mesh_data, m_part_names, m_timer_manager->AreAccurateTimersEnabled());
        bool set_first_function_value_to_one = true;
        search_processor.add_nodes_ring_0_nodes(set_first_function_value_to_one);
        search_processor.SyncFieldsToHost();  // Just needed for output
    }

    void CreateSmoothedCellDataProcessor() {
        m_strain_smoothing_processor = std::make_shared<aperi::SmoothedCellDataProcessor>(m_mesh_data, m_part_names, m_lagrangian_formulation_type, m_mesh_labeler_parameters, m_use_f_bar, m_timer_manager->AreAccurateTimersEnabled());
    }

    void LabelParts() {
        m_strain_smoothing_processor->LabelParts();
    }

    void BuildQuadratureFunctor() {
        // Create a host version of the functor
        m_smoothed_quadrature_host_functor = std::make_shared<SmoothedQuadratureTet4>();
    }

    void BuildSmoothedCellData() {
        m_smoothed_cell_data = m_strain_smoothing_processor->BuildSmoothedCellData<TET4_NUM_NODES>(TET4_NUM_NODES, true);

        // Add the strain smoothing timer manager to the timer manager
        m_timer_manager->AddChild(m_strain_smoothing_processor->GetTimerManager());
    }

    void ComputeSmoothedQuadrature() {
        m_strain_smoothing_processor->ComputeFunctionDerivatives<TET4_NUM_NODES>(*m_smoothed_quadrature_host_functor.get(), true);
    }

    void PopulateElementOutputs() override {
        // Set the element outputs
        m_strain_smoothing_processor->PopulateElementOutputs();
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
    bool m_use_f_bar;
    std::shared_ptr<aperi::ComputeInternalForceSmoothedCell> m_compute_force;
    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;
    std::shared_ptr<aperi::SmoothedQuadratureTet4> m_smoothed_quadrature_host_functor;
    std::shared_ptr<aperi::SmoothedCellDataProcessor> m_strain_smoothing_processor;
};

}  // namespace aperi
