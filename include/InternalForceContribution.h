#pragma once

#include <memory>
#include <stdexcept>
#include <string>

#include "Element.h"
#include "ElementProcessor.h"
#include "FieldData.h"
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
     * @param mesh_data A shared pointer to the MeshData object associated with the force contribution.
     * @param part_name The name of the part associated with the force contribution.
     */
    InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name, bool use_strain_smoothing = false);

    /**
     * @brief Computes the internal forces.
     *
     * This function overrides the ComputeForce function from the base class.
     * It calculates the internal forces for the force contribution.
     */
    void ComputeForce() override {
        assert(m_element != nullptr);
        // Compute the internal force for all elements
        m_element->ComputeInternalForceAllElements();
    }

    /**
     * @brief Gets the Material object associated with the force contribution.
     *
     * @return A shared pointer to the Material object.
     */
    std::shared_ptr<Material> GetMaterial() const {
        return m_material;
    }

    /**
     * @brief Gets the part name object associated with the force contribution.
     *
     * @return A string representing the part name.
     */
    std::string GetPartName() const {
        return m_part_name;
    }

   protected:
    std::shared_ptr<aperi::Material> m_material;    ///< A shared pointer to the Material object.
    std::shared_ptr<aperi::MeshData> m_mesh_data;   ///< The mesh data associated with the force contribution.
    std::string m_part_name;                        ///< The name of the part associated with the force contribution.
    size_t m_num_nodes_per_element;                 ///< The number of nodes per element.
    bool m_use_strain_smoothing;                    ///< A flag indicating whether strain smoothing is used.
    std::shared_ptr<aperi::ElementBase> m_element;  ///< The element associated with the force contribution.
};

/**
 * @brief Creates an internal force contribution object.
 *
 * This function creates and returns a shared pointer to an InternalForceContribution object.
 * The InternalForceContribution object is initialized with the given material and part.
 *
 * @param material A shared pointer to the Material object.
 * @param mesh_data A shared pointer to the MeshData object.
 * @param part_name The name of the part associated with the force contribution.
 * @return A shared pointer to the created InternalForceContribution object.
 */
inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name, bool use_strain_smoothing = false) {
    return std::make_shared<InternalForceContribution>(material, mesh_data, part_name, use_strain_smoothing);
}

}  // namespace aperi