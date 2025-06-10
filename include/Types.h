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

// Search-related type definitions
using ExecSpace = stk::ngp::ExecSpace;
using NodeIdentProc = stk::search::IdentProc<stk::mesh::EntityId, int>;
using SphereIdentProc = stk::search::BoxIdentProc<stk::search::Sphere<Real>, NodeIdentProc>;
using PointIdentProc = stk::search::BoxIdentProc<stk::search::Point<Real>, NodeIdentProc>;
using Intersection = stk::search::IdentProcIntersection<NodeIdentProc, NodeIdentProc>;

using RangeViewType = Kokkos::View<SphereIdentProc *, ExecSpace>;
using DomainViewType = Kokkos::View<PointIdentProc *, ExecSpace>;
using ResultViewType = Kokkos::View<Intersection *, ExecSpace>;
using FastMeshIndicesViewType = Kokkos::View<stk::mesh::FastMeshIndex *, ExecSpace>;

}  // namespace aperi
