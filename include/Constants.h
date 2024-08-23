#pragma once

namespace aperi {

static constexpr size_t TET4_NUM_NODES = 4;
static constexpr size_t HEX8_NUM_NODES = 8;
static constexpr size_t MAX_CELL_NUM_NODES = 8;  // Allow up to 8-node hexahedrons
static constexpr size_t FEM_NODE_NUM_NEIGHBORS = 1;
static constexpr size_t MAX_NODE_NUM_NEIGHBORS = 40;

enum class ElementTopology { None,
                             Tetrahedron4,
                             Hexahedron8 };

}  // namespace aperi
