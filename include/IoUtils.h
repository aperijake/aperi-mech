#pragma once

#include <string>

#include "IoInputFile.h"
#include "IoMesh.h"

IoInputFile ReadInputFile(const std::string& filename);
IoMesh ReadMesh(stk::ParallelMachine comm, const std::string& filename);
void WriteResults(IoMesh& io_mesh, const std::string& filename);