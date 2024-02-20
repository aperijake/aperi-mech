#pragma once

#include <memory>
#include <stdexcept>
#include <stk_mesh/base/Part.hpp>
#include <stk_mesh/base/Selector.hpp>

#include "Element.h"
#include "ForceContribution.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Represents an internal force contribution.
 *
 * This class inherits from the base class ForceContribution and provides
 * functionality to compute internal forces.
 */
class InternalForceContribution : public ForceContribution {
   public:
    /**
     * @brief Constructs an InternalForceContribution object.
     *
     * @param material A shared pointer to the Material object associated with the force contribution.
     * @param part A pointer to the stk::mesh::Part object associated with the force contribution.
     */
    InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name);

    /**
     * @brief Gets the Material object associated with the force contribution.
     *
     * @return A shared pointer to the Material object.
     */
    std::shared_ptr<Material> GetMaterial() const {
        return m_material;
    }

    /**
     * @brief Gets the stk::mesh::Part object associated with the force contribution.
     *
     * @return A pointer to the stk::mesh::Part object.
     */
    stk::mesh::Part *GetPart() const {
        return m_part;
    }

    /**
     * @brief Computes the internal forces.
     *
     * This function overrides the ComputeForce function from the base class.
     * It calculates the internal forces for the force contribution.
     */
    void ComputeForce() override;

   private:
    std::shared_ptr<Material> m_material;            ///< A shared pointer to the Material object.
    stk::mesh::Part *m_part;                         ///< A pointer to the stk::mesh::Part object.
    stk::mesh::BulkData *m_bulk_data;                ///< The bulk data associated with the force contribution.
    stk::mesh::MetaData *m_meta_data;                ///< The meta data associated with the force contribution.
    std::shared_ptr<aperi::MeshData> m_mesh_data;    ///< The mesh data associated with the force contribution.
    stk::mesh::Selector m_selector;                  ///< The selector associated with the force contribution. (TODO(jake): Move to base class?))
    std::shared_ptr<aperi::Element> m_element;       ///< The element associated with the force contribution.
    stk::mesh::Field<double> *m_coordinates_field;   ///< The coordinates field associated with the force contribution.
    stk::mesh::Field<double> *m_displacement_field;  ///< The displacement field associated with the force contribution.
    stk::mesh::Field<double> *m_velocity_field;      ///< The velocity field associated with the force contribution.
    stk::mesh::Field<double> *m_force_field;         ///< The force field associated with the force contribution.
};

/**
 * @brief Creates an internal force contribution object.
 *
 * This function creates and returns a shared pointer to an InternalForceContribution object.
 * The InternalForceContribution object is initialized with the given material and part.
 *
 * @param material A shared pointer to the Material object.
 * @param part A pointer to the stk::mesh::Part object.
 * @return A shared pointer to the created InternalForceContribution object.
 */
inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name) {
    return std::make_shared<InternalForceContribution>(material, mesh_data, part_name);
}

}  // namespace aperi