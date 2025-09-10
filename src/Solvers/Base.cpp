#include "Solvers/Base.h"

#include <chrono>
#include <numeric>

#include "InternalForceContribution.h"

namespace aperi {

void Solver::UpdateFieldsFromGeneralizedFields() {
    for (const auto &internal_force_contribution : m_internal_force_contributions) {
        internal_force_contribution->ComputeValuesFromGeneralizedFields();
    }
}

}  // namespace aperi
