#pragma once

#include <memory>

#include "Constants.h"
#include "FieldData.h"
#include "Materials/Base.h"
#include "MeshData.h"
#include "MeshLabelerParameters.h"
#include "SimpleTimerFactory.h"
#include "TimerTypes.h"

namespace aperi {

class SmoothedCellData;

struct ReproducingKernelInfo {
    std::vector<std::string> part_names;
    std::vector<double> kernel_radius_scale_factors;
};

/**
 * @brief Represents an element in a mesh.
 *
 * This class provides a base implementation for elements in a mesh.
 */
class ElementBase {
   public:
    /**
     * @brief Constructs an ElementBase object.
     */
    ElementBase(
        size_t num_nodes,
        const std::string& displacement_field_name,
        const std::vector<std::string>& part_names,
        std::shared_ptr<MeshData> mesh_data,
        std::shared_ptr<Material> material,
        const aperi::LagrangianFormulationType& lagrangian_formulation_type,
        const aperi::MeshLabelerParameters& mesh_labeler_parameters)
        : m_num_nodes(num_nodes),
          m_material(material),
          m_displacement_field_name(displacement_field_name),
          m_part_names(part_names),
          m_mesh_data(mesh_data),
          m_lagrangian_formulation_type(lagrangian_formulation_type),
          m_mesh_labeler_parameters(mesh_labeler_parameters) {
    }

    virtual ~ElementBase() = default;

    /**
     * @brief Checks if an event happened that requires a shape function update.
     *
     * @return True if an update is needed, false otherwise.
     */
    virtual bool CheckIfUpdateIsNeeded() const {
        return false;
    }

    virtual void UpdateShapeFunctions() {}

    /**
     * @brief Gets the number of nodes in the element.
     *
     * @return The number of nodes in the element.
     */
    size_t GetNumNodes() const {
        return m_num_nodes;
    }

    /**
     * @brief Computes the internal force of the element.
     *
     */
    virtual void ComputeInternalForceAllElements(double time_increment) = 0;

    /**
     * @brief Populates the element outputs.
     */
    virtual void PopulateElementOutputs() {
        // Default implementation does nothing
    }

    /**
     * @brief Gets the SmoothedCellData object.
     *
     * @return A shared pointer to the SmoothedCellData object.
     */
    virtual std::shared_ptr<SmoothedCellData> GetSmoothedCellData() const {
        return nullptr;
    }

    std::vector<std::string> GetPartNames() const {
        return m_part_names;
    }

    virtual std::vector<aperi::FieldData> GetFieldData() const {
        return m_material->GetFieldData();
    }

    virtual ReproducingKernelInfo GetReproducingKernelInfo() const {
        return ReproducingKernelInfo{{}, {}};
    }

    virtual void FinishPreprocessing() {}

   protected:
    size_t m_num_nodes;                    ///< The number of nodes in the element.
    std::shared_ptr<Material> m_material;  ///< The material of the element.

    // New protected members moved from derived classes
    std::string m_displacement_field_name;
    std::vector<std::string> m_part_names;
    std::shared_ptr<aperi::MeshData> m_mesh_data;
    aperi::LagrangianFormulationType m_lagrangian_formulation_type;
    aperi::MeshLabelerParameters m_mesh_labeler_parameters;
};

}  // namespace aperi
