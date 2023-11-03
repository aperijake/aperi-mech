#pragma once

#include <memory>
#include <vector>

namespace acm {

class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;

class Solver {
   public:
    Solver(std::shared_ptr<acm::IoMesh> io_mesh, std::vector<std::shared_ptr<acm::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<acm::ExternalForceContribution>> external_force_contributions)
        : m_io_mesh(io_mesh), m_force_contributions(force_contributions), m_external_force_contributions(external_force_contributions) {}
    virtual ~Solver() = default;

    virtual void Solve() = 0;

   protected:
    std::shared_ptr<acm::IoMesh> m_io_mesh;
    std::vector<std::shared_ptr<acm::InternalForceContribution>> m_force_contributions;
    std::vector<std::shared_ptr<acm::ExternalForceContribution>> m_external_force_contributions;
};

// Explicit dynamic solver
class ExplicitSolver : public Solver {
   public:
    ExplicitSolver(std::shared_ptr<acm::IoMesh> io_mesh, std::vector<std::shared_ptr<acm::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<acm::ExternalForceContribution>> external_force_contributions)
        : Solver(io_mesh, force_contributions, external_force_contributions) {}
    ~ExplicitSolver() {}

    void Solve() override;
};

// Solver factory
inline std::unique_ptr<Solver> CreateSolver(std::shared_ptr<acm::IoMesh> io_mesh, std::vector<std::shared_ptr<acm::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<acm::ExternalForceContribution>> external_force_contributions) {
    return std::make_unique<ExplicitSolver>(io_mesh, force_contributions, external_force_contributions);
}

}  // namespace acm