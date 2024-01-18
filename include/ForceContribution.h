#pragma once

#include <memory>
#include <stdexcept>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBase.hpp>
#include <stk_mesh/base/FieldState.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/Part.hpp>
#include <stk_topology/topology.hpp>

#include "Material.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {

/**
 * @brief The base class for force contributions.
 *
 * This class provides an interface for computing forces.
 */
class ForceContribution {
   public:
    ForceContribution() = default;
    ~ForceContribution() = default;
    virtual void ComputeForce() = 0;
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
     * @param part A pointer to the stk::mesh::Part object associated with the force contribution.
     */
    InternalForceContribution(std::shared_ptr<Material> material, stk::mesh::Part *part) : m_material(material), m_part(part) {}

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
    void ComputeForce() override {}

   private:
    std::shared_ptr<Material> m_material;  ///< A shared pointer to the Material object.
    stk::mesh::Part *m_part;               ///< A pointer to the stk::mesh::Part object.
};

/**
 * @class ExternalForceContribution
 * @brief Represents an external force contribution in a mechanical system.
 *
 * This class inherits from the ForceContribution base class and provides
 * functionality to compute the force exerted by an external source on the system.
 */
class ExternalForceContribution : public ForceContribution {
   public:
    /**
     * @brief Constructs an ExternalForceContribution object.
     *
     * @param meta_data The meta data of the mesh.
     * @param magnitude The magnitude of the external force.
     * @param direction The direction of the external force.
     */
    ExternalForceContribution(stk::mesh::MetaData &meta_data, double magnitude, std::array<double, 3> direction) : m_meta_data(meta_data), m_magnitude(magnitude), m_direction(direction) {}

    /**
     * @brief Computes the force exerted by the external source.
     *
     * This function overrides the ComputeForce() function from the base class.
     */
    void ComputeForce() override {}

   protected:
    stk::mesh::MetaData &m_meta_data;  /**< The meta data of the mesh. */
    double m_magnitude;                /**< The magnitude of the external force. */
    std::array<double, 3> m_direction; /**< The direction of the external force. */
};

/**
 * @brief Represents an external force contribution due to traction.
 *
 * This class inherits from ExternalForceContribution and provides a specific implementation for traction forces.
 */
class ExternalForceContributionTraction : public ExternalForceContribution {
   public:
    /**
     * @brief Constructs an ExternalForceContributionTraction object.
     *
     * @param meta_data The meta data of the mesh.
     * @param magnitude The magnitude of the traction force.
     * @param direction The direction of the traction force.
     */
    ExternalForceContributionTraction(stk::mesh::MetaData &meta_data, double magnitude, std::array<double, 3> direction) : ExternalForceContribution(meta_data, magnitude, direction) {
        // Throw error because this is not implemented yet
        throw std::runtime_error("Error: Traction not implemented yet");
    }

    /**
     * @brief Computes the traction force.
     *
     * This function overrides the ComputeForce function in the base class.
     */
    void ComputeForce() override {}
};

/**
 * @brief Represents an external force contribution due to gravity.
 *
 * This class inherits from ExternalForceContribution and provides the implementation
 * for computing the force due to gravity on a mesh.
 */
class ExternalForceContributionGravity : public ExternalForceContribution {
   public:
    /**
     * @brief Constructs an ExternalForceContributionGravity object.
     *
     * @param meta_data The meta data of the mesh.
     * @param magnitude The magnitude of the gravity force.
     * @param direction The direction of the gravity force.
     */
    ExternalForceContributionGravity(stk::mesh::MetaData &meta_data, double magnitude, std::array<double, 3> direction) : ExternalForceContribution(meta_data, magnitude, direction) {}

    /**
     * @brief Computes the force due to gravity on the mesh.
     *
     * This function calculates the gravity force vector and applies it to the mesh nodes.
     * The force is computed as the product of the gravity vector and the mass of each node.
     *
     * @note The force field should be zeroed out before applying the gravity force.
     */
    void ComputeForce() override {
        typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;
        VectorField *force_field = m_meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "force");
        VectorField *mass_field = m_meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "mass");

        VectorField &force_field_at_state = force_field->field_of_state(stk::mesh::StateNP1);

        // Gravity vector
        std::array<double, 3> gravity;
        for (unsigned i = 0; i < 3; ++i) {
            gravity[i] = m_magnitude * m_direction[i];
        }

        stk::mesh::BulkData &bulk_data = m_meta_data.mesh_bulk_data();

        // Loop over all the buckets
        // TODO(jake): Do for specific part
        for (stk::mesh::Bucket *bucket : bulk_data.buckets(stk::topology::NODE_RANK)) {
            // Get the field data for the bucket
            double *force_data_at_state_for_bucket = stk::mesh::field_data(force_field_at_state, *bucket);
            double *mass_data_for_bucket = stk::mesh::field_data(*mass_field, *bucket);

            unsigned num_values_per_node = stk::mesh::field_scalars_per_entity(*force_field, *bucket);

            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Compute the gravity force
                for (unsigned i = 0; i < num_values_per_node; ++i) {
                    int iI = i_node * num_values_per_node + i;
                    force_data_at_state_for_bucket[iI] = gravity[i] * mass_data_for_bucket[iI];  // TODO(jake): this should be +=, but we need to zero out the force field first
                }
            }
        }
    }
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
inline std::shared_ptr<InternalForceContribution> CreateInternalForceContribution(std::shared_ptr<Material> material, stk::mesh::Part *part) {
    return std::make_shared<InternalForceContribution>(material, part);
}

/**
 * @brief Creates a shared pointer to an ExternalForceContribution object.
 *
 * This function takes a YAML node and a mesh metadata object as input and creates a shared pointer
 * to an ExternalForceContribution object based on the type specified in the YAML node. The type can
 * be either "traction_load" or "gravity_load". The magnitude and direction of the force are also
 * extracted from the YAML node. If the type is not recognized, a nullptr is returned.
 *
 * @param load The YAML node containing the force load information.
 * @param meta_data The mesh metadata object.
 * @return A shared pointer to an ExternalForceContribution object, or nullptr if the type is not recognized.
 */
inline std::shared_ptr<ExternalForceContribution> CreateExternalForceContribution(YAML::Node &load, stk::mesh::MetaData &meta_data) {
    std::string type = load.begin()->first.as<std::string>();
    YAML::Node load_node = load.begin()->second;
    double magnitude = load_node["magnitude"].as<double>();
    std::array<double, 3> direction = load_node["direction"].as<std::array<double, 3>>();
    if (type == "traction_load") {
        return std::make_shared<ExternalForceContributionTraction>(meta_data, magnitude, direction);
    } else if (type == "gravity_load") {
        return std::make_shared<ExternalForceContributionGravity>(meta_data, magnitude, direction);
    } else {
        return nullptr;
    }
}

}  // namespace aperi