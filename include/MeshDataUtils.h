#pragma once

#include "MeshData.h"

namespace aperi {

void PrintNodeCounts(std::shared_ptr<MeshData> meshData, bool print_each_processor = false);
void PrintElementCounts(std::shared_ptr<MeshData> meshData);

}  // namespace aperi
