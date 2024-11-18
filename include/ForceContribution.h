#pragma once

namespace aperi {

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
    virtual void ComputeForce() = 0;
};

}  // namespace aperi
