#include "ContactForceContribution/Base.h"

namespace aperi {

/**
 * @brief Constructor for ContactForceContribution.
 */
ContactForceContribution::ContactForceContribution(
    std::shared_ptr<aperi::MeshData> mesh_data,
    std::vector<std::string> set_names)
    : m_mesh_data(mesh_data),
      m_set_names(set_names) {}

}  // namespace aperi
