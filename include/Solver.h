#pragma once

#include <memory>

namespace acm {

class IoMesh;

class Solver {
   public:
    Solver(std::shared_ptr<acm::IoMesh> io_mesh) : m_io_mesh(io_mesh) {}
    virtual ~Solver() = default;

    virtual void Solve() = 0;

   protected:
    std::shared_ptr<acm::IoMesh> m_io_mesh;
};

// Explicit dynamic solver
class ExplicitSolver : public Solver {
   public:
    ExplicitSolver(std::shared_ptr<acm::IoMesh> io_mesh) : Solver(io_mesh) {}
    ~ExplicitSolver() {}

    void Solve() override;
};

// Solver factory
inline std::unique_ptr<Solver> CreateSolver(std::shared_ptr<acm::IoMesh> io_mesh) {
    return std::make_unique<ExplicitSolver>(io_mesh);
}

}  // namespace acm