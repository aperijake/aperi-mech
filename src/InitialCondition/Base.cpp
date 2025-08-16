#include "InitialCondition/Base.h"

#include <yaml-cpp/yaml.h>

#include <utility>

#include "EntityProcessor.h"
#include "IoInputFile.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Constructor for InitialCondition.
 */
InitialCondition::InitialCondition(std::shared_ptr<aperi::MeshData> mesh_data,
                                   const std::string& field_name,
                                   const std::vector<std::string>& set_names)
    : m_mesh_data(mesh_data),
      m_field_name(field_name),
      m_sets(set_names) {}

}  // namespace aperi
