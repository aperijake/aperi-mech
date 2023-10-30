#pragma once

#include <memory>

namespace acm {

class Solver {
   public:
    Solver() = default;
    virtual ~Solver() = default;

    virtual void Solve() = 0;
};

// Explicit dynamic solver
class ExplicitSolver : public Solver {
   public:
    ExplicitSolver() {}
    ~ExplicitSolver() {}

    void Solve() override;
};

// Solver factory
inline std::unique_ptr<Solver> CreateSolver() {
    return std::make_unique<ExplicitSolver>();
}

}  // namespace acm