#pragma once

#include <Kokkos_Core.hpp>
#include <limits>
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

constexpr Real REAL_MAX = std::numeric_limits<Real>::max();

using UnsignedField = stk::mesh::Field<Unsigned>;
using NgpUnsignedField = stk::mesh::NgpField<Unsigned>;
using RealField = stk::mesh::Field<Real>;
using NgpRealField = stk::mesh::NgpField<Real>;

using UnsignedLongField = stk::mesh::Field<UnsignedLong>;
using NgpUnsignedLongField = stk::mesh::NgpField<UnsignedLong>;

using ExecSpace = stk::ngp::ExecSpace;

// Neighbor search-related type definitions
// Node ID and processor ID. Global ID is stk::mesh::EntityId (uint64_t) and local ID is unsigned. Using uint64_t to be large enough for all cases.
using NodeIdentProc = stk::search::IdentProc<uint64_t, int>;
using NodeAndDistanceIdentProc = stk::search::IdentProc<Kokkos::pair<uint64_t, Real>, int>;
using SphereIdentProc = stk::search::BoxIdentProc<stk::search::Sphere<Real>, NodeAndDistanceIdentProc>;
using PointIdentProc = stk::search::BoxIdentProc<stk::search::Point<Real>, NodeIdentProc>;
using Intersection = stk::search::IdentProcIntersection<NodeIdentProc, NodeAndDistanceIdentProc>;

using RangeViewType = Kokkos::View<SphereIdentProc *, ExecSpace>;
using DomainViewType = Kokkos::View<PointIdentProc *, ExecSpace>;
using ResultViewType = Kokkos::View<Intersection *, ExecSpace>;

}  // namespace aperi
