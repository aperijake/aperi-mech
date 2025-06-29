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
 * @class ExternalForceContribution
 * @brief Abstract base class for external force contributions in a mechanical system.
 *
 * This class provides an interface for computing external forces (e.g., gravity, traction)
 * applied to a mesh. Derived classes must implement the ComputeForce method.
 */
class ExternalForceContribution : public ForceContribution {
   public:
    /**
     * @brief Constructor.
     * @param mesh_data Shared pointer to mesh data.
     * @param set_names Names of sets to which the force applies.
     * @param components_and_values Pairs of component indices and their values.
     * @param time_function Function describing time dependence of the force.
     */
    ExternalForceContribution(std::shared_ptr<aperi::MeshData> mesh_data,
                              std::vector<std::string> set_names,
                              std::vector<std::pair<size_t, double>> components_and_values,
                              std::function<double(double)> time_function);

    /**
     * @brief Virtual destructor.
     */
    virtual ~ExternalForceContribution() = default;

    /**
     * @brief Compute the external force and apply it to the mesh.
     * @param time Current simulation time.
     * @param time_increment Time step size.
     */
    virtual void ComputeForce(double time, double time_increment) override = 0;

   protected:
    std::shared_ptr<aperi::MeshData> m_mesh_data;                    ///< Mesh data object.
    std::vector<std::string> m_set_names;                            ///< Names of sets for the force.
    std::vector<std::pair<size_t, double>> m_components_and_values;  ///< Component indices and values.
    std::function<double(double)> m_time_function;                   ///< Time-dependent scaling function.
};

}  // namespace aperi