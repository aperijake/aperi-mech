
#pragma once

#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/NgpField.hpp>

namespace aperi {

using Real = double;
using Unsigned = uint64_t;

using UnsignedField = stk::mesh::Field<Unsigned>;
using NgpUnsignedField = stk::mesh::NgpField<Unsigned>;
using RealField = stk::mesh::Field<Real>;
using NgpRealField = stk::mesh::NgpField<Real>;

using UnsignedLongField = stk::mesh::Field<unsigned long>;
using NgpUnsignedLongField = stk::mesh::NgpField<unsigned long>;

}  // namespace aperi
