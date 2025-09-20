#pragma once

#include <Kokkos_Core.hpp>
#include <array>
#include <functional>
#include <memory>

#include "ExternalForceContribution/Base.h"
#include "Field.h"
#include "ForEachEntity.h"
#include "Types.h"

namespace aperi {

/**
 * @struct GravityForceFunctor
 * @brief A functor that computes and applies gravity forces to mesh nodes.
 */
struct GravityForceFunctor {
    /**
     * @brief Constructor for GravityForceFunctor.
     * @param mesh_data Shared pointer to mesh data for field access.
     * @param gravity_component_0 X-component of gravity vector.
     * @param gravity_component_1 Y-component of gravity vector.
     * @param gravity_component_2 Z-component of gravity vector.
     * @param time_scale_factor Kokkos view for time-dependent scaling.
     */
    GravityForceFunctor(const std::shared_ptr<aperi::MeshData> &mesh_data,
                        double gravity_component_0, double gravity_component_1, double gravity_component_2,
                        const Kokkos::View<double[1]> &time_scale_factor);

    void UpdateFields() {
        m_mass.UpdateField();
        m_force_coefficients.UpdateField();
    }

    void SetForceField(const aperi::Field<aperi::Real> &force_field) {
        m_force_coefficients = force_field;
    }

    /**
     * @brief Device function to apply gravity force to a single node.
     * @param node_index Index of the node to process.
     */
    KOKKOS_FUNCTION void operator()(const aperi::Index &node_index) const {
        KOKKOS_ASSERT(node_index.IsValid());
        KOKKOS_ASSERT(m_mass.GetNumComponentsPerEntity(node_index) == 3);
        KOKKOS_ASSERT(m_force_coefficients.GetNumComponentsPerEntity(node_index) == 3);
        // Apply gravity: F = m * g * scale_factor
        for (size_t i = 0; i < 3; ++i) {
            m_force_coefficients(node_index, i) += m_gravity_vector(i) * m_mass(node_index, i) * m_time_scale_factor(0);
        }
    }

   private:
    Kokkos::View<double[3]> m_gravity_vector;                // The gravity vector
    aperi::Field<aperi::Real> m_mass;                        // The generalized mass field
    mutable aperi::Field<aperi::Real> m_force_coefficients;  // The generalized force field
    Kokkos::View<double[1]> m_time_scale_factor;             // The time scaling factor
};

/**
 * @class ExternalForceContributionGravity
 * @brief Represents an external gravity force contribution.
 */
class ExternalForceContributionGravity : public ExternalForceContribution {
   public:
    /**
     * @brief Constructor.
     * @param mesh_data Shared pointer to mesh data.
     * @param set_names Names of sets to which gravity applies.
     * @param values Array of gravity values for x, y, z components.
     * @param time_function Function describing time dependence of the force.
     */
    ExternalForceContributionGravity(std::shared_ptr<aperi::MeshData> mesh_data,
                                     std::vector<std::string> set_names,
                                     std::array<double, 3> values,
                                     std::function<double(double)> time_function);

    /**
     * @brief Destructor.
     */
    virtual ~ExternalForceContributionGravity() = default;

    /**
     * @brief Compute the gravity force and apply it to the mesh.
     * @param force_field The field to which the computed force will be applied.
     * @param time Current simulation time.
     * @param time_increment Time step size.
     */
    void ComputeForce(aperi::Field<aperi::Real> &force_field, double time, double time_increment) override;

   private:
    aperi::ForEachNodeWithCaching m_node_iterator;  ///< Cached bucket IDs for all nodes
    Kokkos::View<double[1]> m_time_scale_factor;    ///< The time scaling factor
    aperi::Field<aperi::Real> m_mass;               ///< The mass field
    GravityForceFunctor m_gravity_functor;          ///< Functor to compute gravity force
};

}  // namespace aperi