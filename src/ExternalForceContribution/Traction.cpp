#include "ExternalForceContribution/Traction.h"

#include <stdexcept>

namespace aperi {

/**
 * @brief Constructor throws as traction is not implemented.
 */
ExternalForceContributionTraction::ExternalForceContributionTraction(
    std::shared_ptr<aperi::MeshData> mesh_data,
    std::vector<std::string> set_names,
    std::array<double, 3> values,
    std::function<double(double)> time_function)
    : ExternalForceContribution(mesh_data, set_names, values, time_function) {
    throw std::runtime_error("Error: Traction not implemented yet");
}

/**
 * @brief Not implemented.
 */
void ExternalForceContributionTraction::ComputeForce(aperi::Field<aperi::Real>& /*force_field*/, double /*time*/, double /*time_increment*/) {
    // Not implemented
}

}  // namespace aperi
