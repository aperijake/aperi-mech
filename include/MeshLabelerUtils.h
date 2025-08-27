#pragma once

#include <memory>
#include <string>
#include <vector>

#include "MeshData.h"

namespace aperi {

void AddExtraNodesToSurfaceParts(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets);

}  // namespace aperi
