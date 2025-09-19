#pragma once

#include <memory>

#include "Types.h"

namespace aperi {

template <typename T>
class Field;

/**
 * @brief The base class for force contributions.
 *
 * This class provides an interface for computing forces.
 */
class ForceContribution {
   public:
    ForceContribution() = default;
    virtual ~ForceContribution() = default;
    virtual void Preprocess(){};
    /**
     * @brief Compute the force and apply it to the mesh.
     * @param force_field The field to which the computed force will be applied.
     * @param time Current simulation time.
     * @param time_increment Time step size.
     */
    virtual void ComputeForce(aperi::Field<aperi::Real>& force_field, double time, double time_increment) = 0;
};

}  // namespace aperi
