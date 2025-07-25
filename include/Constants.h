#pragma once

#include <limits>

#include "Types.h"

namespace aperi {

static constexpr size_t TET4_NUM_NODES = 4;
static constexpr size_t TET4_NUM_FACES = 4;
static constexpr size_t HEX8_NUM_NODES = 8;
static constexpr size_t HEX8_NUM_FACES = 6;
static constexpr size_t MAX_CELL_NUM_NODES = 8;  // Allow up to 8-node hexahedrons
static constexpr size_t FEM_NODE_NUM_NEIGHBORS = 1;
static constexpr size_t MAX_NODE_NUM_NEIGHBORS = 40;
static constexpr size_t MAX_ELEMENT_NUM_NODES = HEX8_NUM_NODES;
static constexpr size_t MAX_ELEMENT_NUM_FACES = HEX8_NUM_FACES;
static constexpr size_t MAX_FACE_NUM_NODES = 4;
static constexpr Unsigned INVALID_ID = std::numeric_limits<Unsigned>::max();
static constexpr Unsigned UNSIGNED_MAX = std::numeric_limits<Unsigned>::max();
static constexpr UnsignedLong UNSIGNED_LONG_MAX = std::numeric_limits<UnsignedLong>::max();

enum class ElementTopology { None,
                             Tetrahedron4,
                             Hexahedron8 };

enum class ApproximationSpaceType { FiniteElement,
                                    ReproducingKernel };

enum class IntegrationSchemeType { GaussQuadrature,
                                   StrainSmoothing };

enum class LagrangianFormulationType { Total,
                                       Incremental,
                                       Updated,
                                       Semi };

}  // namespace aperi
