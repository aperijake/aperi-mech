#include "ExternalForceContribution/Traction.h"

#include <stdexcept>

namespace aperi {

/**
 * @brief Constructor throws as traction is not implemented.
 */
ExternalForceContributionTraction::ExternalForceContributionTraction(
    std::shared_ptr<aperi::MeshData> mesh_data,
    std::vector<std::string> set_names,
    std::vector<std::pair<size_t, double>> components_and_values,
    std::function<double(double)> time_function)
    : ExternalForceContribution(mesh_data, set_names, components_and_values, time_function) {
    throw std::runtime_error("Error: Traction not implemented yet");
}

/**
 * @brief Not implemented.
 */
void ExternalForceContributionTraction::ComputeForce(double /*time*/, double /*time_increment*/) {
    // Not implemented
}

}  // namespace aperi
