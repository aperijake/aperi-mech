#pragma once

#include "ExternalForceContribution/Base.h"

namespace aperi {

/**
 * @class ExternalForceContributionTraction
 * @brief Represents an external traction force contribution.
 *
 * This class is a placeholder for traction force implementation.
 */
class ExternalForceContributionTraction : public ExternalForceContribution {
   public:
    /**
     * @brief Constructor.
     * @param mesh_data Shared pointer to mesh data.
     * @param set_names Names of sets to which the traction applies.
     * @param components_and_values Pairs of component indices and their values.
     * @param time_function Function describing time dependence of the force.
     * @throws std::runtime_error Always, as traction is not implemented.
     */
    ExternalForceContributionTraction(std::shared_ptr<aperi::MeshData> mesh_data,
                                      std::vector<std::string> set_names,
                                      std::vector<std::pair<size_t, double>> components_and_values,
                                      std::function<double(double)> time_function);

    /**
     * @brief Destructor.
     */
    virtual ~ExternalForceContributionTraction() = default;

    /**
     * @brief Compute the traction force (not implemented).
     */
    void ComputeForce(double time, double time_increment) override;
};

}  // namespace aperi
