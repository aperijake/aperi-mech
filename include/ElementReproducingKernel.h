#pragma once

#include <Eigen/Dense>
#include <chrono>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ComputeInternalForceSmoothedCell.h"
#include "Constants.h"
#include "ElementBase.h"
#include "FieldData.h"
#include "FunctionValueStorageProcessor.h"
#include "Kokkos_Core.hpp"
#include "Material.h"
#include "MeshData.h"
#include "NeighborSearchProcessor.h"
#include "QuadratureSmoothed.h"
#include "ShapeFunctionsFunctorReproducingKernel.h"
#include "ShapeFunctionsFunctorTet4.h"
#include "StrainSmoothingProcessor.h"

namespace aperi {

/**
 * @brief Reproducing kernel functions smoothed over an element/integration cell.
 *
 * This class inherits from the ElementBase base class and provides a specific implementation
 * for a reproducing kernel element. It contains functionality to compute the internal force
 * of the element.
 */
template <size_t NumCellNodes>
class ElementReproducingKernel : public ElementBase {
   public:
    /**
     * @brief Constructs a ElementReproducingKernel object.
     */
    ElementReproducingKernel(const std::string &displacement_field_name, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material, double kernel_radius_scale_factor, bool use_one_pass_method, const aperi::LagrangianFormulationType &lagrangian_formulation_type) : ElementBase(NumCellNodes, material), m_displacement_field_name(displacement_field_name), m_part_names(part_names), m_mesh_data(mesh_data), m_kernel_radius_scale_factor(kernel_radius_scale_factor), m_use_one_pass_method(use_one_pass_method), m_lagrangian_formulation_type(lagrangian_formulation_type) {
        // Find and store the element neighbors
        CreateElementForceProcessor();
        FindNeighbors();
        CreateFunctionValueStorageProcessor();
        CreateStrainSmoothingProcessor();
        BuildSmoothedCellData();
    }

    /**
     * @brief Destroys a ElementReproducingKernel object.
     */
    virtual ~ElementReproducingKernel() {}

    void UpdateShapeFunctions() override {
        ComputeAndStoreFunctionValues();
        ComputeFunctionDerivatives();
    }

    /**
     * @brief Builds the quadrature functor.
     *
     * This function is a pure virtual function that must be implemented by derived classes.
     */
    virtual void BuildQuadratureFunctor() = 0;

    /**
     * @brief Computes the function derivatives.
     *
     * This function is a pure virtual function that must be implemented by derived classes.
     */
    virtual void ComputeFunctionDerivatives() = 0;

    /**
     * @brief Builds the smoothed cell data.
     *
     * This function builds the smoothed cell data for the element.
     */
    void BuildSmoothedCellData() {
        // Build the smoothed cell data
        m_smoothed_cell_data = m_strain_smoothing_processor->BuildSmoothedCellData<NumCellNodes>(NumCellNodes, m_use_one_pass_method);

        // Add the strain smoothing timer manager to the timer manager
        m_timer_manager->AddChild(m_strain_smoothing_processor->GetTimerManager());
    }

    void CreateElementForceProcessor() {
        // Create a scoped timer
        auto timer = m_timer_manager->CreateScopedTimer(ElementTimerType::CreateElementForceProcessor);

        if (!m_mesh_data) {
            // Allowing for testing
            aperi::CoutP0() << "No mesh data provided. Cannot create element processor. Skipping." << std::endl;
            return;
        }

        // Create the element processor
        std::string force_field_name = m_use_one_pass_method ? "force_coefficients" : "force";

        // Create the element processor
        assert(m_material != nullptr);
        m_compute_force = std::make_shared<aperi::ComputeInternalForceSmoothedCell>(m_mesh_data, m_displacement_field_name, force_field_name, *this->m_material, m_lagrangian_formulation_type);
    }

    void CreateFunctionValueStorageProcessor() {
        if (!m_mesh_data) {
            // Allowing for testing
            aperi::CoutP0() << "No mesh data provided. Cannot create element processor. Skipping." << std::endl;
            return;
        }

        // Create the function value storage processor
        m_function_value_storage_processor = std::make_shared<aperi::FunctionValueStorageProcessor>(m_mesh_data, m_part_names);
    }

    void CreateStrainSmoothingProcessor() {
        if (!m_mesh_data) {
            // Allowing for testing
            aperi::CoutP0() << "No mesh data provided. Cannot create element processor. Skipping." << std::endl;
            return;
        }

        // Make the strain smoothing processor
        m_strain_smoothing_processor = std::make_shared<aperi::StrainSmoothingProcessor>(m_mesh_data, m_part_names, m_lagrangian_formulation_type);
    }

    void FindNeighbors() {
        // Loop over all elements and store the neighbors
        aperi::NeighborSearchProcessor search_processor(m_mesh_data, m_part_names);
        search_processor.add_nodes_neighbors_within_variable_ball(m_kernel_radius_scale_factor, false /*add debug fields*/);

        search_processor.SyncFieldsToHost();  // Just needed for output
        search_processor.PrintNumNeighborsStats();

        m_timer_manager->AddChild(search_processor.GetTimerManager());
    }

    // TODO(jake): Get rid of this wrapper class. It is only here because of some strange compiling issues that lead to a segfault.
    // Using a wrapper class seems to fix the issue.
    // Using ShapeFunctionsFunctorReproducingKernel directly in the compute_and_store_function_values function causes a segfault on the GPU in Release mode,
    // but works fine in Debug mode or on the CPU. Spent a lot of time trying to figure out why, but couldn't find the issue.
    template <size_t MaxNumNeighbors, typename Bases>
    struct FunctionFunctorWrapper {
        KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, MaxNumNeighbors, 1> Values(const Eigen::Matrix<double, MaxNumNeighbors, 1> &kernel_values, const Bases &bases, const Eigen::Matrix<double, MaxNumNeighbors, 3> &shifted_neighbor_coordinates, size_t actual_num_neighbors) const {
            return compute_node_functions_functor.Values(kernel_values, bases, shifted_neighbor_coordinates, actual_num_neighbors);
        }
        aperi::ShapeFunctionsFunctorReproducingKernel<MaxNumNeighbors> compute_node_functions_functor;
    };

    void ComputeAndStoreFunctionValues() {
        // Create an instance of the functor
        FunctionFunctorWrapper<MAX_NODE_NUM_NEIGHBORS, aperi::BasesLinear> compute_node_functions_functor;

        // Create the bases
        aperi::BasesLinear bases;

        // Compute and store the function values
        m_function_value_storage_processor->compute_and_store_function_values<MAX_NODE_NUM_NEIGHBORS>(compute_node_functions_functor, bases);

        // Add the timer manager
        m_timer_manager->AddChild(m_function_value_storage_processor->GetTimerManager());
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

    /**
     * @brief Gets the SmoothedCellData object.
     *
     * @return A shared pointer to the SmoothedCellData object.
     */
    std::shared_ptr<SmoothedCellData> GetSmoothedCellData() const override {
        return m_smoothed_cell_data;
    }

   protected:
    const std::string m_displacement_field_name;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    double m_kernel_radius_scale_factor;
    std::shared_ptr<aperi::ComputeInternalForceSmoothedCell> m_compute_force;
    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;
    std::shared_ptr<aperi::FunctionValueStorageProcessor> m_function_value_storage_processor;
    std::shared_ptr<aperi::StrainSmoothingProcessor> m_strain_smoothing_processor;
    bool m_use_one_pass_method;
    aperi::LagrangianFormulationType m_lagrangian_formulation_type;
};

/**
 * @brief Reproducing kernel functions smoothed over an tet4 element/integration cell.
 *
 * This class inherits from the ElementReproducingKernel base class and provides a specific implementation
 * for a reproducing kernel tet4 element. It contains functionality to compute the internal force
 * of the element.
 */
class ElementReproducingKernelTet4 : public ElementReproducingKernel<aperi::TET4_NUM_NODES> {
   public:
    /**
     * @brief Constructs a ElementReproducingKernelTet4 object.
     */
    ElementReproducingKernelTet4(const std::string &displacement_field_name, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material, double kernel_radius_scale_factor, bool use_one_pass_method, const aperi::LagrangianFormulationType &lagrangian_formulation_type) : ElementReproducingKernel<aperi::TET4_NUM_NODES>(displacement_field_name, part_names, mesh_data, material, kernel_radius_scale_factor, use_one_pass_method, lagrangian_formulation_type) {
        BuildQuadratureFunctor();
        UpdateShapeFunctions();
    }

    void BuildQuadratureFunctor() override {
        // TODO(jake): Device functor not currently used, but will be. Commenting out for now.
        // Functor for smooth quadrature
        // size_t integration_functor_size = sizeof(SmoothedQuadratureTet4);
        // auto integration_functor = (SmoothedQuadratureTet4 *)Kokkos::kokkos_malloc(integration_functor_size);
        // assert(integration_functor != nullptr);

        //// Initialize the functors
        // Kokkos::parallel_for(
        //     "CreateReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
        //         new ((SmoothedQuadratureTet4 *)integration_functor) SmoothedQuadratureTet4();
        //     });

        // Create a host version of the functor
        m_smoothed_quadrature_host_functor = std::make_shared<SmoothedQuadratureTet4>();

        //// Destroy the functors
        // Kokkos::parallel_for(
        //     "DestroyReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
        //         integration_functor->~SmoothedQuadratureTet4();
        //     });

        // Kokkos::kokkos_free(integration_functor);
    }

    void ComputeFunctionDerivatives() override {
        m_strain_smoothing_processor->ComputeFunctionDerivatives<TET4_NUM_NODES>(*m_smoothed_quadrature_host_functor.get(), m_use_one_pass_method);
    }

   private:
    std::shared_ptr<aperi::SmoothedQuadratureTet4> m_smoothed_quadrature_host_functor;
};

/**
 * @brief Reproducing kernel functions smoothed over an hex8 element/integration cell.
 *
 * This class inherits from the ElementReproducingKernel base class and provides a specific implementation
 * for a reproducing kernel hex8 element. It contains functionality to compute the internal force
 * of the element.
 */
class ElementReproducingKernelHex8 : public ElementReproducingKernel<aperi::HEX8_NUM_NODES> {
   public:
    /**
     * @brief Constructs a ElementReproducingKernelHex8 object.
     */
    ElementReproducingKernelHex8(const std::string &displacement_field_name, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material, double kernel_radius_scale_factor, bool use_one_pass_method, const aperi::LagrangianFormulationType &lagrangian_formulation_type) : ElementReproducingKernel<aperi::HEX8_NUM_NODES>(displacement_field_name, part_names, mesh_data, material, kernel_radius_scale_factor, use_one_pass_method, lagrangian_formulation_type) {
        BuildQuadratureFunctor();
        UpdateShapeFunctions();
    }

    void BuildQuadratureFunctor() override {
        // Functor for smooth quadrature
        // size_t integration_functor_size = sizeof(SmoothedQuadratureHex8);
        // auto integration_functor = (SmoothedQuadratureHex8 *)Kokkos::kokkos_malloc(integration_functor_size);
        // assert(integration_functor != nullptr);

        //// Initialize the functors
        // Kokkos::parallel_for(
        //     "CreateReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
        //         new ((SmoothedQuadratureHex8 *)integration_functor) SmoothedQuadratureHex8();
        //     });

        // Create a host version of the functor
        m_smoothed_quadrature_host_functor = std::make_shared<SmoothedQuadratureHex8>();

        // Destroy the functors
        // Kokkos::parallel_for(
        //    "DestroyReproducingKernelFunctors", 1, KOKKOS_LAMBDA(const int &) {
        //        integration_functor->~SmoothedQuadratureHex8();
        //    });

        // Kokkos::kokkos_free(integration_functor);
    }

    void ComputeFunctionDerivatives() override {
        m_strain_smoothing_processor->ComputeFunctionDerivatives<HEX8_NUM_NODES>(*m_smoothed_quadrature_host_functor.get(), m_use_one_pass_method);
    }

   private:
    std::shared_ptr<aperi::SmoothedQuadratureHex8> m_smoothed_quadrature_host_functor;
};

}  // namespace aperi
