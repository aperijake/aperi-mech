#pragma once

#include <Kokkos_Core.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_search/BoxIdent.hpp>
#include <stk_search/CoarseSearch.hpp>
#include <stk_search/IdentProc.hpp>
#include <stk_search/Point.hpp>
#include <stk_search/SearchMethod.hpp>
#include <stk_search/Sphere.hpp>
#include <stk_util/ngp/NgpSpaces.hpp>

namespace aperi {

using Real = double;
using Unsigned = uint64_t;
using UnsignedLong = unsigned long;

using UnsignedField = stk::mesh::Field<Unsigned>;
using NgpUnsignedField = stk::mesh::NgpField<Unsigned>;
using RealField = stk::mesh::Field<Real>;
using NgpRealField = stk::mesh::NgpField<Real>;

using UnsignedLongField = stk::mesh::Field<UnsignedLong>;
using NgpUnsignedLongField = stk::mesh::NgpField<UnsignedLong>;

using ExecSpace = stk::ngp::ExecSpace;

// Neighbor search-related type definitions
using NodeGlobalIdentProc = stk::search::IdentProc<stk::mesh::EntityId, int>;
using PointGlobalIdentProc = stk::search::BoxIdentProc<stk::search::Point<Real>, NodeGlobalIdentProc>;
using SphereGlobalIdentProc = stk::search::BoxIdentProc<stk::search::Sphere<Real>, NodeGlobalIdentProc>;
using IntersectionGlobalGlobal = stk::search::IdentProcIntersection<NodeGlobalIdentProc, NodeGlobalIdentProc>;

using DomainViewGlobalType = Kokkos::View<PointGlobalIdentProc *, ExecSpace>;
using RangeViewGlobalType = Kokkos::View<SphereGlobalIdentProc *, ExecSpace>;
using ResultViewGlobalGlobalType = Kokkos::View<IntersectionGlobalGlobal *, ExecSpace>;

using NodeLocalIdentProc = stk::search::IdentProc<unsigned, int>;
using PointLocalIdentProc = stk::search::BoxIdentProc<stk::search::Point<Real>, NodeLocalIdentProc>;
using IntersectionLocalGlobal = stk::search::IdentProcIntersection<NodeLocalIdentProc, NodeGlobalIdentProc>;
using DomainViewLocalType = Kokkos::View<PointLocalIdentProc *, ExecSpace>;
using ResultViewLocalGlobalType = Kokkos::View<IntersectionLocalGlobal *, ExecSpace>;

}  // namespace aperi
