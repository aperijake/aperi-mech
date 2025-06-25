#include "ExternalForceContribution/Base.h"

namespace aperi {

/**
 * @brief Constructor for ExternalForceContribution.
 */
ExternalForceContribution::ExternalForceContribution(
    std::shared_ptr<aperi::MeshData> mesh_data,
    std::vector<std::string> set_names,
    std::vector<std::pair<size_t, double>> components_and_values,
    std::function<double(double)> time_function)
    : m_mesh_data(mesh_data),
      m_set_names(set_names),
      m_components_and_values(components_and_values),
      m_time_function(time_function) {}

}  // namespace aperi
