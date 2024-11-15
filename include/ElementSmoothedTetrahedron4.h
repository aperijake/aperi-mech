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
#include "Material.h"
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
    ElementSmoothedTetrahedron4(const std::vector<FieldQueryData<double>> &field_query_data_gather, const std::vector<std::string> &part_names, std::shared_ptr<MeshData> mesh_data, std::shared_ptr<Material> material) : ElementBase(TET4_NUM_NODES, material), m_field_query_data_gather(field_query_data_gather), m_part_names(part_names), m_mesh_data(mesh_data) {
        // Find and store the element neighbors
        CreateElementForceProcessor();
        CreateFunctors();
        ComputeNeighborValues();
    }

    /**
     * @brief Destroys a ElementSmoothedTetrahedron4 object.
     */
    virtual ~ElementSmoothedTetrahedron4() {
        DestroyFunctors();
    }

    void CreateElementForceProcessor() {
        // Create the element processor
        const FieldQueryData<double> field_query_data_scatter = {"force_coefficients", FieldQueryState::None};
        m_element_processor = std::make_shared<ElementForceProcessor<1, true>>(m_field_query_data_gather, field_query_data_scatter, m_mesh_data, m_part_names);
    }

    void ComputeNeighborValues() {
        assert(m_element_processor != nullptr);
        // Loop over all elements and store the neighbors
        aperi::NeighborSearchProcessor search_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        bool set_first_function_value_to_one = true;
        search_processor.add_nodes_ring_0_nodes(set_first_function_value_to_one);
        search_processor.SyncFieldsToHost();  // Just needed for output
        aperi::StrainSmoothingProcessor strain_smoothing_processor(m_element_processor->GetMeshData(), this->m_element_processor->GetSets());
        strain_smoothing_processor.for_each_neighbor_compute_derivatives<TET4_NUM_NODES>(m_integration_functor);
        strain_smoothing_processor.ComputeCellVolumeFromElementVolume();
        m_smoothed_cell_data = strain_smoothing_processor.BuildSmoothedCellData(TET4_NUM_NODES);
    }

    // Create and destroy functors. Must be public to run on device.
    void CreateFunctors() {
        // Functor for smooth quadrature
        size_t integration_functor_size = sizeof(SmoothedQuadratureTet4);
        auto integration_functor = (SmoothedQuadratureTet4 *)Kokkos::kokkos_malloc(integration_functor_size);
        assert(integration_functor != nullptr);

        // Initialize the functors
        Kokkos::parallel_for(
            "CreateSmoothedTetrahedron4StoringFunctors", 1, KOKKOS_LAMBDA(const int &) {
                new ((SmoothedQuadratureTet4 *)integration_functor) SmoothedQuadratureTet4();
            });

        // Set the functors
        m_integration_functor = integration_functor;
    }

    void DestroyFunctors() {
        auto integration_functor = m_integration_functor;
        Kokkos::parallel_for(
            "DestroySmoothedTetrahedron4Functors", 1, KOKKOS_LAMBDA(const int &) {
                integration_functor->~SmoothedQuadratureTet4();
            });

        Kokkos::kokkos_free(m_integration_functor);

        m_integration_functor = nullptr;
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
    void ComputeInternalForceAllElements() override {
        assert(this->m_material != nullptr);
        assert(m_element_processor != nullptr);
        assert(m_integration_functor != nullptr);

        // Create the compute force functor
        ComputeInternalForceFromSmoothingCellFunctor<TET4_NUM_NODES, Material::StressFunctor> compute_force_functor(*this->m_material->GetStressFunctor());

        // Loop over all elements and compute the internal force
        m_element_processor->for_each_element_gather_scatter_nodal_data<TET4_NUM_NODES>(compute_force_functor);
    }

   private:
    SmoothedQuadratureTet4 *m_integration_functor;
    const std::vector<FieldQueryData<double>> m_field_query_data_gather;
    const std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    std::shared_ptr<aperi::ElementForceProcessor<1, true>> m_element_processor;
    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;
};

}  // namespace aperi
