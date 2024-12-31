#pragma once

#include <memory>
#include <stdexcept>
#include <string>

#include "Element.h"
#include "FieldData.h"
#include "ForceContribution.h"
#include "InternalForceContributionParameters.h"
#include "IoInputFile.h"
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
     * @param parameters The parameters associated with the force contribution.
     */
    InternalForceContribution(InternalForceContributionParameters parameters) : m_internal_force_contribution_parameters(std::move(parameters)) {}

    /**
     * @brief Destroys an InternalForceContribution object.
     */
    virtual ~InternalForceContribution() {}

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
        return m_internal_force_contribution_parameters.material;
    }

    /**
     * @brief Gets the field data associated with the force contribution.
     *
     * @return A vector of FieldData objects.
     */
    std::vector<FieldData> GetFieldData() const {
        return m_internal_force_contribution_parameters.material->GetFieldData();
    }

    /**
     * @brief Gets the part name object associated with the force contribution.
     *
     * @return A string representing the part name.
     */
    std::string GetPartName() const {
        return m_internal_force_contribution_parameters.part_name;
    }

    /**
     * @brief Gets whether the element uses generalized fields.
     *
     * @return True if the element uses generalized fields, false otherwise.
     */
    bool UsesGeneralizedFields() const {
        return m_internal_force_contribution_parameters.approximation_space_parameters->UsesGeneralizedFields();
    }

    /**
     * @brief Gets whether the element uses one pass method.
     *
     * @return True if the element uses one pass method, false otherwise.
     */
    bool UsesOnePassMethod() const {
        return m_internal_force_contribution_parameters.integration_scheme_parameters->UsesOnePassMethod();
    }

    /**
     * @brief Preprocesses the internal force contribution.
     *
     * This function overrides the Preprocess function from the base class.
     * It preprocesses the internal force contribution.
     */
    void Preprocess() override;

    /**
     * @brief Get element TimerManager.
     *
     * @return A shared pointer to the TimerManager object.
     */
    std::shared_ptr<TimerManager<ElementTimerType>> GetElementTimerManager() const {
        return m_element->GetTimerManager();
    }

   protected:
    InternalForceContributionParameters m_internal_force_contribution_parameters;  ///< The parameters associated with the force contribution.
    std::shared_ptr<aperi::ElementBase> m_element;                                 ///< The element associated with the force contribution.
};

/**
 * @brief Creates an internal force contribution object.
 *
 * This function creates and returns a shared pointer to an InternalForceContribution object.
 * The InternalForceContribution object is initialized with the given parameters.
 *
 * @param internal_force_contribution_parameters A reference to the InternalForceContributionParameters object containing the initialization parameters.
 * @return A shared pointer to the created InternalForceContribution object.
 */
inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(const InternalForceContributionParameters& internal_force_contribution_parameters) {
    return std::make_shared<InternalForceContribution>(internal_force_contribution_parameters);
}

}  // namespace aperi