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

#define REAL_MAX 1.7976931348623157e+308
#define REAL_EPSILON 2.2204460492503131e-16

using UnsignedField = stk::mesh::Field<Unsigned>;
using NgpUnsignedField = stk::mesh::NgpField<Unsigned>;
using RealField = stk::mesh::Field<Real>;
using NgpRealField = stk::mesh::NgpField<Real>;

using UnsignedLongField = stk::mesh::Field<UnsignedLong>;
using NgpUnsignedLongField = stk::mesh::NgpField<UnsignedLong>;

using ExecSpace = stk::ngp::ExecSpace;

using Entity = stk::mesh::Entity;
using ConnectedEntities = stk::mesh::NgpMesh::ConnectedEntities;
using EntityVector = stk::mesh::EntityVector;

// Neighbor search-related type definitions
// Node ID and processor ID. Global ID is stk::mesh::EntityId (uint64_t) and local ID is unsigned. Using uint64_t to be large enough for all cases.
using NodeIdentProc = stk::search::IdentProc<uint64_t, int>;
using NodeAndDistanceIdentProc = stk::search::IdentProc<Kokkos::pair<uint64_t, Real>, int>;
using SphereIdentProc = stk::search::BoxIdentProc<stk::search::Sphere<Real>, NodeAndDistanceIdentProc>;
using PointIdentProc = stk::search::BoxIdentProc<stk::search::Point<Real>, NodeIdentProc>;
using Intersection = stk::search::IdentProcIntersection<NodeIdentProc, NodeAndDistanceIdentProc>;

using RangeViewType = Kokkos::View<SphereIdentProc*, ExecSpace>;
using DomainViewType = Kokkos::View<PointIdentProc*, ExecSpace>;
using ResultViewType = Kokkos::View<Intersection*, ExecSpace>;

// Traits for getting information from search results
template <typename T>
struct SearchResultTraits;

// Specialization for Intersection
template <>
struct SearchResultTraits<aperi::Intersection> {
    static int domain_proc(const aperi::Intersection& result) {
        return result.domainIdentProc.proc();
    }
    static int range_proc(const aperi::Intersection& result) {
        return result.rangeIdentProc.proc();
    }
    static auto domain_id(const aperi::Intersection& result) {
        return result.domainIdentProc.id();
    }
    static auto range_id(const aperi::Intersection& result) {
        return result.rangeIdentProc.id().first;
    }
};

}  // namespace aperi
