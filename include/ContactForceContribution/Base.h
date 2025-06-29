#pragma once

#include <functional>
#include <memory>
#include <string>
#include <utility>
#include <vector>

#include "ForceContribution.h"
#include "MeshData.h"

namespace aperi {

/**
 * @class ContactForceContribution
 * @brief Abstract base class for contact force contributions in a mechanical system.
 *
 * This class provides an interface for computing contact forces (e.g., pinball, planar)
 * applied to a mesh. Derived classes must implement the ComputeForce method.
 */
class ContactForceContribution : public ForceContribution {
   public:
    /**
     * @brief Constructor.
     * @param mesh_data Shared pointer to mesh data.
     * @param set_names Names of sets to which the force applies.
     */
    ContactForceContribution(std::shared_ptr<aperi::MeshData> mesh_data,
                             std::vector<std::string> set_names);

    /**
     * @brief Virtual destructor.
     */
    virtual ~ContactForceContribution() = default;

    /**
     * @brief Compute the contact force and apply it to the mesh.
     * @param time Current simulation time.
     * @param time_increment Time step size.
     */
    virtual void ComputeForce(double time, double time_increment) override = 0;

   protected:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  ///< Mesh data object.
    std::vector<std::string> m_set_names;          ///< Names of sets for the force.
};

}  // namespace aperi
