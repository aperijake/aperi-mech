#pragma once

#include <memory>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_topology/topology.hpp>
#include <vector>

#include "IoMesh.h"

namespace acm {

class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;

class Solver {
   public:
    Solver(std::shared_ptr<acm::IoMesh> io_mesh, std::vector<std::shared_ptr<acm::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<acm::ExternalForceContribution>> external_force_contributions)
        : m_io_mesh(io_mesh), m_internal_force_contributions(force_contributions), m_external_force_contributions(external_force_contributions) {}
    virtual ~Solver() = default;

    virtual void Solve() = 0;

   protected:
    virtual void ComputeForce() = 0;

    std::shared_ptr<acm::IoMesh> m_io_mesh;
    std::vector<std::shared_ptr<acm::InternalForceContribution>> m_internal_force_contributions;
    std::vector<std::shared_ptr<acm::ExternalForceContribution>> m_external_force_contributions;
};

// Explicit dynamic solver
class ExplicitSolver : public Solver {
    typedef stk::mesh::Field<double, stk::mesh::Cartesian> VectorField;

   public:
    ExplicitSolver(std::shared_ptr<acm::IoMesh> io_mesh, std::vector<std::shared_ptr<acm::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<acm::ExternalForceContribution>> external_force_contributions)
        : Solver(io_mesh, force_contributions, external_force_contributions) {
        // Get the meta data
        stk::mesh::MetaData &meta_data = m_io_mesh->GetMetaData();

        // Get the displacement, velocity, and acceleration fields
        displacement_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "displacement");
        velocity_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "velocity");
        acceleration_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "acceleration");
        force_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "force");
        mass_field = meta_data.get_field<VectorField>(stk::topology::NODE_RANK, "mass");
    }
    ~ExplicitSolver() {}

    void Solve() override;

   protected:
    void ComputeForce() override;
    void ComputeAcceleration();
    void ComputeFirstPartialUpdate(double time, double time_step);
    void ComputeSecondPartialUpdate(double time, double time_step);

    VectorField *displacement_field;
    VectorField *velocity_field;
    VectorField *acceleration_field;
    VectorField *force_field;
    VectorField *mass_field;
};

// Solver factory
inline std::unique_ptr<Solver> CreateSolver(std::shared_ptr<acm::IoMesh> io_mesh, std::vector<std::shared_ptr<acm::InternalForceContribution>> force_contributions, std::vector<std::shared_ptr<acm::ExternalForceContribution>> external_force_contributions) {
    return std::make_unique<ExplicitSolver>(io_mesh, force_contributions, external_force_contributions);
}

}  // namespace acm