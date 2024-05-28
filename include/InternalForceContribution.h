#pragma once

#include <memory>
#include <stdexcept>
#include <string>

#include "Element.h"
#include "FieldData.h"
#include "ForceContribution.h"
#include "IoInputFile.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

struct InternalForceContributionParameters {
    // Constructor using YAML node
    InternalForceContributionParameters(const YAML::Node& part, const std::shared_ptr<IoInputFile>& io_input_file, std::shared_ptr<aperi::MeshData> input_mesh_data) {
        YAML::Node material_node = io_input_file->GetMaterialFromPart(part);
        material = CreateMaterial(material_node);
        mesh_data = input_mesh_data;
        part_name = part["set"].as<std::string>();
        integration_scheme = "gauss_quadrature";
        formulation_type = "finite_element";
        if (part["formulation"] && part["formulation"]["integration_scheme"]) {
            if (part["formulation"]["integration_scheme"]["strain_smoothing"]) {
                integration_scheme = "strain_smoothing";
            } else if (part["formulation"]["integration_scheme"]["gauss_quadrature"]) {
                integration_scheme = "gauss_quadrature";
                integration_order = part["formulation"]["integration_scheme"]["gauss_quadrature"]["integration_order"].as<int>();
            } else {
                throw std::runtime_error("Unsupported integration scheme");
            }
        }
    }
    std::shared_ptr<Material> material = nullptr;
    std::shared_ptr<aperi::MeshData> mesh_data = nullptr;
    std::string part_name = "";
    std::string integration_scheme = "gauss_quadrature";
    int integration_order = 1;
    std::string formulation_type = "finite_element";
};

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
    InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, const std::string& part_name, bool use_strain_smoothing = false);

    /**
     * @brief Constructs an InternalForceContribution object.
     *
     * @param parameters The parameters associated with the force contribution.
     */
    InternalForceContribution(const InternalForceContributionParameters& parameters);

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
    void SetupInternalForceContribution();

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
inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(const InternalForceContributionParameters& internal_force_contribution_parameters) {
    return std::make_shared<InternalForceContribution>(internal_force_contribution_parameters);
}

}  // namespace aperi