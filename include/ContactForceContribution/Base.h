#pragma once

#include <functional>
#include <memory>
#include <string>
#include <utility>
#include <vector>

#include "ForceContribution.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

template <typename T>
class Field;

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
     * @param force_field The field to which the computed force will be applied.
     * @param time Current simulation time.
     * @param time_increment Time step size.
     */
    virtual void ComputeForce(aperi::Field<aperi::Real>& force_field, double time, double time_increment) override = 0;

    /**
     * @brief Get the names of the sets to which the force applies.
     * @return Vector of set names.
     */
    const std::vector<std::string>& GetSets() const {
        return m_set_names;
    }

   protected:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  ///< Mesh data object.
    std::vector<std::string> m_set_names;          ///< Names of sets for the force.
};

}  // namespace aperi
