#pragma once

#include <memory>
#include <vector>

// Only forward declare types used as pointers/references in this header.
namespace aperi {
class BoundaryCondition;
class IoMesh;
class InternalForceContribution;
class ExternalForceContribution;
class ContactForceContribution;
class InitialCondition;
class MeshData;
struct ReproducingKernelInfo;
enum class LagrangianFormulationType;
}  // namespace aperi

/**
 * @file Preprocessor.h
 * @brief Declarations for preprocessing utilities in the aperi mechanical solver.
 */

namespace aperi {

/**
 * @brief Finds neighbors for mesh elements based on reproducing kernel info.
 *
 * This function performs a neighbor search for all mesh elements specified in the
 * reproducing kernel info, storing the neighbor relationships in the mesh data.
 * It also prints statistics about the number of neighbors found.
 *
 * @param mesh_data Shared pointer to mesh data.
 * @param reproducing_kernel_info Information about which parts and kernel radii to use.
 */
void FindNeighbors(std::shared_ptr<MeshData> mesh_data, const ReproducingKernelInfo& reproducing_kernel_info);

/**
 * @brief Sets up field data for the chosen Lagrangian formulation.
 *
 * Copies coordinate fields as needed for the updated or semi-Lagrangian formulations.
 * For the semi-Lagrangian formulation, also copies the reference coordinates.
 *
 * @param mesh_data Shared pointer to mesh data.
 * @param lagrangian_formulation_type The type of Lagrangian formulation in use.
 */
void SetFieldDataForLagrangianFormulation(std::shared_ptr<MeshData> mesh_data, const aperi::LagrangianFormulationType& lagrangian_formulation_type);

/**
 * @brief Runs all pre-processing steps required before the solver starts.
 *
 * This includes setting up field data, running neighbor searches, applying initial
 * conditions, and preprocessing all force and boundary condition contributions.
 *
 * @param io_mesh The input/output mesh object.
 * @param force_contributions The vector of internal force contributions.
 * @param external_force_contributions The vector of external force contributions.
 * @param contact_force_contributions The vector of contact force contributions.
 * @param boundary_conditions The vector of boundary conditions.
 * @param initial_conditions The vector of initial conditions.
 * @param lagrangian_formulation_type The type of Lagrangian formulation in use.
 */
void DoPreprocessing(std::shared_ptr<aperi::IoMesh> io_mesh,
                     std::vector<std::shared_ptr<aperi::InternalForceContribution>> force_contributions,
                     std::vector<std::shared_ptr<aperi::ExternalForceContribution>> external_force_contributions,
                     std::vector<std::shared_ptr<aperi::ContactForceContribution>> contact_force_contributions,
                     std::vector<std::shared_ptr<aperi::BoundaryCondition>> boundary_conditions,
                     const std::vector<std::unique_ptr<aperi::InitialCondition>>& initial_conditions,
                     aperi::LagrangianFormulationType lagrangian_formulation_type);

}  // namespace aperi