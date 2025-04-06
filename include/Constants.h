#pragma once

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

enum class ElementTopology { None,
                             Tetrahedron4,
                             Hexahedron8 };

enum class ApproximationSpaceType { FiniteElement,
                                    ReproducingKernel };

enum class IntegrationSchemeType { GaussQuadrature,
                                   StrainSmoothing };

enum class LagrangianFormulationType { Total,
                                       Updated,
                                       Semi };

}  // namespace aperi
