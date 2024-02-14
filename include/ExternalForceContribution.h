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

#include "ForceContribution.h"
#include "IoInputFile.h"
#include "Material.h"

namespace YAML {
class Node;
}  // namespace YAML

namespace aperi {

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
     * @param components_and_values The components and values of the force.
     */
    ExternalForceContribution(stk::mesh::MetaData &meta_data, std::vector<std::pair<int, double>> components_and_values) : m_meta_data(meta_data), m_components_and_values(components_and_values) {}

    /**
     * @brief Computes the force exerted by the external source.
     *
     * This function overrides the ComputeForce() function from the base class.
     */
    void ComputeForce() override {}

   protected:
    stk::mesh::MetaData &m_meta_data;                            /**< The meta data of the mesh. */
    std::vector<std::pair<int, double>> m_components_and_values; /**< The components and values of the force. */
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
    ExternalForceContributionTraction(stk::mesh::MetaData &meta_data, std::vector<std::pair<int, double>> components_and_values) : ExternalForceContribution(meta_data, components_and_values) {
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
     * @param components_and_values The components and values of the gravity force.
     */
    ExternalForceContributionGravity(stk::mesh::MetaData &meta_data, std::vector<std::pair<int, double>> components_and_values) : ExternalForceContribution(meta_data, components_and_values) {}

    /**
     * @brief Computes the force due to gravity on the mesh.
     *
     * This function calculates the gravity force vector and applies it to the mesh nodes.
     * The force is computed as the product of the gravity vector and the mass of each node.
     *
     * @note The force field should be zeroed out before applying the gravity force.
     */
    void ComputeForce() override {
        typedef stk::mesh::Field<double> DoubleField;
        DoubleField *force_field = m_meta_data.get_field<double>(stk::topology::NODE_RANK, "force");
        DoubleField *mass_field = m_meta_data.get_field<double>(stk::topology::NODE_RANK, "mass");

        DoubleField &force_field_at_state = force_field->field_of_state(stk::mesh::StateNP1);

        stk::mesh::BulkData &bulk_data = m_meta_data.mesh_bulk_data();

        unsigned num_values_per_node = 3;  // Number of values per node

        // Loop over all the buckets
        // TODO(jake): Do for specific part
        for (stk::mesh::Bucket *bucket : bulk_data.buckets(stk::topology::NODE_RANK)) {
            assert(num_values_per_node == stk::mesh::field_scalars_per_entity(*force_field, *bucket));
            // Get the field data for the bucket
            double *force_data_at_state_for_bucket = stk::mesh::field_data(force_field_at_state, *bucket);
            double *mass_data_for_bucket = stk::mesh::field_data(*mass_field, *bucket);

            for (size_t i_node = 0; i_node < bucket->size(); i_node++) {
                // Compute the gravity force
                for (auto &&component_value : m_components_and_values) {
                    int iI = i_node * num_values_per_node + component_value.first;
                    force_data_at_state_for_bucket[iI] += component_value.second * mass_data_for_bucket[iI];
                }
            }
        }
    }
};

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
    // Get the components and values
    std::vector<std::pair<int, double>> components_and_values = aperi::GetComponentsAndValues(load_node);
    if (type == "traction_load") {
        return std::make_shared<ExternalForceContributionTraction>(meta_data, components_and_values);
    } else if (type == "gravity_load") {
        return std::make_shared<ExternalForceContributionGravity>(meta_data, components_and_values);
    } else {
        return nullptr;
    }
}

}  // namespace aperi