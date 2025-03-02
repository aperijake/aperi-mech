#pragma once

#include <array>
#include <cmath>
#include <memory>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

#include "EntityProcessor.h"
#include "ForceContribution.h"
#include "IoInputFile.h"
#include "MeshData.h"

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
     * @param mesh_data The mesh data object.
     * @param components_and_values The components and values of the force.
     */
    ExternalForceContribution(std::shared_ptr<aperi::MeshData> mesh_data, std::vector<std::string> set_names, std::vector<std::pair<size_t, double>> components_and_values, std::function<double(double)> time_function) : m_mesh_data(mesh_data), m_set_names(set_names), m_components_and_values(components_and_values), m_time_function(time_function) {}

    virtual ~ExternalForceContribution() = default;

    /**
     * @brief Computes the force exerted by the external source.
     *
     * This function overrides the ComputeForce() function from the base class.
     */
    void ComputeForce(double time, double time_increment) override = 0;

   protected:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                   /**< The mesh data object. */
    std::vector<std::string> m_set_names;                           /**< The set names of the force. */
    std::vector<std::pair<size_t, double>> m_components_and_values; /**< The components and values of the force. */
    std::function<double(double)> m_time_function;                  /**< The time function for the force. */
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
     * @param mesh_data The mesh data object.
     * @param magnitude The magnitude of the traction force.
     * @param direction The direction of the traction force.
     */
    ExternalForceContributionTraction(std::shared_ptr<aperi::MeshData> mesh_data, std::vector<std::string> set_names, std::vector<std::pair<size_t, double>> components_and_values, std::function<double(double)> time_function) : ExternalForceContribution(mesh_data, set_names, components_and_values, time_function) {
        // Throw error because this is not implemented yet
        throw std::runtime_error("Error: Traction not implemented yet");
    }

    virtual ~ExternalForceContributionTraction() = default;

    /**
     * @brief Computes the traction force.
     *
     * This function overrides the ComputeForce function in the base class.
     */
    void ComputeForce(double time, double time_increment) override {}
};

struct ComputeGravityForceFunctor {
    ComputeGravityForceFunctor(double gravity_value) : m_gravity_value(gravity_value) {}

    KOKKOS_INLINE_FUNCTION void operator()(double *force, const double *mass) const {
        *force += m_gravity_value * *mass;
    }
    double m_gravity_value;
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
     * @param mesh_data The mesh data object.
     * @param components_and_values The components and values of the gravity force.
     */
    ExternalForceContributionGravity(std::shared_ptr<aperi::MeshData> mesh_data, std::vector<std::string> set_names, std::vector<std::pair<size_t, double>> components_and_values, std::function<double(double)> time_function) : ExternalForceContribution(mesh_data, set_names, components_and_values, time_function) {
        std::array<FieldQueryData<double>, 2> field_query_data;
        field_query_data[0] = {"force_coefficients", FieldQueryState::None};
        field_query_data[1] = {"mass", FieldQueryState::None};
        m_node_processor = std::make_shared<aperi::NodeProcessor<2>>(field_query_data, m_mesh_data, m_set_names);
    }

    virtual ~ExternalForceContributionGravity() = default;

    /**
     * @brief Computes the force due to gravity on the mesh.
     *
     * This function calculates the gravity force vector and applies it to the mesh nodes.
     * The force is computed as the product of the gravity vector and the mass of each node.
     *
     * @note The force field should be zeroed out before applying the gravity force.
     */
    void ComputeForce(double time, double time_increment) override {
        // Get the scale factor for the gravity force
        double scale_factor = m_time_function(time);
        // Assert that the scale factor is not nan
        assert(!std::isnan(scale_factor));

        // Loop over the nodes
        for (auto component_value : m_components_and_values) {
            // Create the functor to compute the gravity force
            ComputeGravityForceFunctor compute_gravity_force_functor(component_value.second * scale_factor);
            // Compute the gravity force for the component
            m_node_processor->for_component_i_owned(compute_gravity_force_functor, component_value.first);
        }
        m_node_processor->MarkFieldModifiedOnDevice(0);
    }

   private:
    std::shared_ptr<aperi::NodeProcessor<2>> m_node_processor; /**< The node processor object. */
};

/**
 * @brief Creates a shared pointer to an ExternalForceContribution object.
 *
 * This function takes a YAML node and a mesh data object as input and creates a shared pointer
 * to an ExternalForceContribution object based on the type specified in the YAML node. The type can
 * be either "traction_load" or "gravity_load". The magnitude and direction of the force are also
 * extracted from the YAML node. If the type is not recognized, a nullptr is returned.
 *
 * @param load The YAML node containing the force load information.
 * @param mesh_data The mesh data object.
 * @return A shared pointer to an ExternalForceContribution object, or nullptr if the type is not recognized.
 */
inline std::shared_ptr<ExternalForceContribution> CreateExternalForceContribution(YAML::Node &load, std::shared_ptr<MeshData> mesh_data) {
    std::string type = load.begin()->first.as<std::string>();
    YAML::Node load_node = load.begin()->second;

    // Get the components and values
    std::vector<std::pair<size_t, double>> components_and_values = aperi::GetComponentsAndValues(load_node);

    // Get the time function
    std::function<double(double)> time_function = GetTimeFunction(load_node);

    // Get the set names
    // Loop over sets from boundary condition
    std::vector<std::string> sets;
    if (load_node["sets"]) {
        sets = load_node["sets"].as<std::vector<std::string>>();
    }

    if (type == "traction_load") {
        return std::make_shared<ExternalForceContributionTraction>(mesh_data, sets, components_and_values, time_function);
    } else if (type == "gravity_load") {
        return std::make_shared<ExternalForceContributionGravity>(mesh_data, sets, components_and_values, time_function);
    } else {
        return nullptr;
    }
}

}  // namespace aperi