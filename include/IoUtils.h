#pragma once

#include <string>

#include "IoInputFile.h"
#include "IoMesh.h"

namespace acm {
class FieldManager;
}  // namespace acm

IoInputFile ReadInputFile(const std::string& filename);
IoMesh ReadMesh(stk::ParallelMachine comm, const std::string& filename, std::shared_ptr<acm::FieldManager> field_manager = nullptr);
void WriteResults(IoMesh& io_mesh, const std::string& filename);