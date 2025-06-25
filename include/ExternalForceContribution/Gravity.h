#pragma once

#include <array>
#include <memory>

#include "EntityProcessor.h"
#include "ExternalForceContribution/Base.h"

namespace aperi {

/**
 * @struct ComputeGravityForceFunctor
 * @brief Functor for applying gravity force to a node.
 */
struct ComputeGravityForceFunctor {
    /**
     * @brief Constructor.
     * @param gravity_value Gravity acceleration value.
     */
    ComputeGravityForceFunctor(double gravity_value);

    /**
     * @brief Applies gravity to a node's force using its mass.
     * @param force Pointer to force value.
     * @param mass Pointer to mass value.
     */
    KOKKOS_INLINE_FUNCTION void operator()(double *force, const double *mass) const;

    double m_gravity_value;  ///< Gravity acceleration.
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
     * @param components_and_values Pairs of component indices and their values.
     * @param time_function Function describing time dependence of the force.
     */
    ExternalForceContributionGravity(std::shared_ptr<aperi::MeshData> mesh_data,
                                     std::vector<std::string> set_names,
                                     std::vector<std::pair<size_t, double>> components_and_values,
                                     std::function<double(double)> time_function);

    /**
     * @brief Destructor.
     */
    virtual ~ExternalForceContributionGravity() = default;

    /**
     * @brief Compute the gravity force and apply it to the mesh.
     * @param time Current simulation time.
     * @param time_increment Time step size.
     */
    void ComputeForce(double time, double time_increment) override;

   private:
    std::shared_ptr<aperi::NodeProcessor<2>> m_node_processor;  ///< Node processor for gravity.
};

}  // namespace aperi
