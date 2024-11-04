#pragma once

#include <mpi.h>

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <algorithm>
#include <array>
#include <iterator>
#include <map>
#include <memory>
#include <numeric>
#include <stk_mesh/base/BulkData.hpp>
#include <stk_mesh/base/Field.hpp>
#include <stk_mesh/base/FieldBLAS.hpp>
#include <stk_mesh/base/ForEachEntity.hpp>
#include <stk_mesh/base/GetEntities.hpp>
#include <stk_mesh/base/GetNgpField.hpp>
#include <stk_mesh/base/GetNgpMesh.hpp>
#include <stk_mesh/base/MetaData.hpp>
#include <stk_mesh/base/NgpField.hpp>
#include <stk_mesh/base/NgpForEachEntity.hpp>
#include <stk_mesh/base/NgpMesh.hpp>
#include <stk_mesh/base/Selector.hpp>
#include <stk_mesh/base/Types.hpp>
#include <stk_topology/topology.hpp>
#include <stk_util/parallel/Parallel.hpp>
#include <stk_util/parallel/ParallelComm.hpp>
#include <stk_util/parallel/ParallelReduce.hpp>
#include <vector>

#include "AperiStkUtils.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"

namespace aperi {

// Power method to estimate the largest eigenvalue of the system (M^{-1}K) for the time step
class PowerMethodProcessor {
    typedef stk::mesh::Field<double> DoubleField;
    typedef stk::mesh::Field<uint64_t> UnsignedField;
    typedef stk::mesh::NgpField<double> NgpDoubleField;
    typedef stk::mesh::NgpField<uint64_t> NgpUnsignedField;

    // Define and enum for the field index
    enum FieldIndex { DISPLACEMENT = 0,
                      DISPLACEMENT_IN,
                      FORCE,
                      FORCE_IN,
                      EIGENVECTOR,
                      NUM_FIELDS };

   public:
    PowerMethodProcessor(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets, ExplicitSolver *solver) : m_mesh_data(mesh_data), m_sets(sets), m_solver(solver) {
        assert(mesh_data != nullptr);

        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        // Get the selector
        m_selector = StkGetSelector(m_sets, meta_data);
        assert(m_selector.is_empty(stk::topology::ELEMENT_RANK) == false);

        stk::mesh::Selector full_owned_selector = m_bulk_data->mesh_meta_data().locally_owned_part();
        m_owned_selector = m_selector & full_owned_selector;

        // Get the displacement_temp field, temporary field to store the displacement at n+1
        m_displacement_in_field = StkGetField(FieldQueryData<double>{"displacement_np1_temp", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_displacement_in_field = &stk::mesh::get_updated_ngp_field<double>(*m_displacement_in_field);

        // Get the displacement_coefficients field, field to store the displacement coefficients
        m_displacement_field = StkGetField(FieldQueryData<double>{"displacement_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_displacement_field = &stk::mesh::get_updated_ngp_field<double>(*m_displacement_field);

        // Get the mass field
        m_mass_field = StkGetField(FieldQueryData<double>{"mass", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_mass_field = &stk::mesh::get_updated_ngp_field<double>(*m_mass_field);

        // Get the force field
        m_force_field = StkGetField(FieldQueryData<double>{"force_coefficients", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_force_field = &stk::mesh::get_updated_ngp_field<double>(*m_force_field);

        // Get the force_coefficients_temp field, temporary field to store the force at n+1
        m_force_in_field = StkGetField(FieldQueryData<double>{"force_coefficients_temp", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_force_in_field = &stk::mesh::get_updated_ngp_field<double>(*m_force_in_field);

        // Get the essential_boundary field, indicator for if the dof is in the essential boundary set
        m_essential_boundary_field = StkGetField(FieldQueryData<uint64_t>{"essential_boundary", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_essential_boundary_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_essential_boundary_field);

        // Initialize the EntityProcessor later
        InitializeEntityProcessor();

        // Randomize the displacement coefficients for the initial guess at the eigenvector
        // Using a small perturbation to avoid a excessively inverting elements
        m_node_processor->RandomizeField(FieldIndex::EIGENVECTOR, -1.0e-6, 1.0e-6);
    }

    void InitializeEntityProcessor() {
        // Order of the fields in the field_query_data_vec must match the FieldIndex enum
        std::array<FieldQueryData<double>, FieldIndex::NUM_FIELDS> field_query_data_vec = {
            FieldQueryData<double>{"displacement_coefficients", FieldQueryState::NP1},
            FieldQueryData<double>{"displacement_np1_temp", FieldQueryState::None},
            FieldQueryData<double>{"force_coefficients", FieldQueryState::None},
            FieldQueryData<double>{"force_coefficients_temp", FieldQueryState::None},
            FieldQueryData<double>{"eigenvector", FieldQueryState::None}};
        m_node_processor = std::make_unique<EntityProcessor<stk::topology::BEGIN_RANK, false, FieldIndex::NUM_FIELDS, double>>(field_query_data_vec, m_mesh_data, m_sets);
    }

    void PerturbDisplacementCoefficients(double epsilon) {
        /* Perturb the displacement coefficients by epsilon, u_epsilon = u + v * \epsilon.
            - Only nodes not in the essential boundary set are perturbed
            - u:         displacement_in field, the displacement at time n+1
            - v:         displacement field, which is the eigenvector
            - u_epsilon: displacement field, overwriting the eigenvector, v
        */

        // Get the ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_displacement_in_field = *m_ngp_displacement_in_field;
        auto ngp_displacement_field = *m_ngp_displacement_field;
        auto ngp_essential_boundary_field = *m_ngp_essential_boundary_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Number of components
                const size_t num_components = ngp_displacement_in_field.get_num_components_per_entity(node_index);

                // Loop over the components
                for (size_t i = 0; i < num_components; ++i) {
                    // If the node is in the essential boundary set, do not perturb the displacement coefficients
                    if (ngp_essential_boundary_field(node_index, i) == 1) {
                        continue;
                    }

                    // Get the eigenvector value
                    double v = ngp_displacement_field(node_index, i);

                    // Get the displacement
                    double u = ngp_displacement_in_field(node_index, i);

                    // Perturb the displacement coefficients by epsilon, v = u + v * \epsilon
                    ngp_displacement_field(node_index, i) = u + v * epsilon;
                }
            });
    }

    void ComputeNextEigenvector(double epsilon) {
        /* Compute the next eigenvector
            Compute v_n+1 = (M^{-1}K) v_n, where:
            (M^{-1}K) v_n = M^{-1} (F(u + \epsilon v_n) - F(u)) / \epsilon

            - v_n+1:               displacement field, the next eigenvector, computed in place
            - f(u):                force_in field, computed outside of the power method
            - f(u + \epsilon v_n): force field, computed before this function
            - M:                   mass field

            - The eigenvector is zeroed out for nodes in the essential boundary set
        */

        // Get the ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_mass_field = *m_ngp_mass_field;
        auto ngp_force_field = *m_ngp_force_field;
        auto ngp_force_in_field = *m_ngp_force_in_field;
        auto ngp_displacement_field = *m_ngp_displacement_field;
        auto ngp_essential_boundary_field = *m_ngp_essential_boundary_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the number of components
                const size_t num_components = ngp_mass_field.get_num_components_per_entity(node_index);

                // Loop over the components
                for (size_t i = 0; i < num_components; ++i) {
                    // If the node is in the essential boundary set, zero out the eigenvector
                    if (ngp_essential_boundary_field(node_index, i) == 1) {
                        ngp_displacement_field(node_index, i) = 0.0;
                        continue;
                    }

                    // Get the mass
                    double mass = ngp_mass_field(node_index, i);

                    // Get the force from the perturbed displacement
                    double force_u_epsilon = ngp_force_field(node_index, i);

                    // Get the force from the current displacement
                    double force_u = ngp_force_in_field(node_index, i);

                    // Compute v_n+1 = (M^{-1}K) v_n = M^{-1} (F(u + \epsilon v_n) - F(u)) / \epsilon
                    ngp_displacement_field(node_index, i) = (force_u_epsilon - force_u) / (epsilon * mass);
                }
            });
    }

    double ComputeStableTimeIncrement(size_t num_iterations = 50, double epsilon = 1.e-4, double tolerance = 1.e-2) {
        /*
            Compute the stable time increment using the power method to estimate the largest eigenvalue of the system (M^{-1}K) for the time step.
            The stable time increment is computed as 2 / sqrt(lambda_max), where lambda_max is the largest eigenvalue of the system.

            - num_iterations:        The number of power iterations to perform
            - epsilon:               The perturbation factor for the displacement coefficients
            - tolerance:             The tolerance for the power method convergence
        */

        // Copy the displacement coefficients to the displacement temp field
        m_node_processor->CopyFieldData(FieldIndex::DISPLACEMENT, FieldIndex::DISPLACEMENT_IN);

        // Copy the eigenvector to the displacement coefficients field
        // Eigenvector is randomized in the constructor. Will be overwritten by the power method for the next time this is called.
        m_node_processor->CopyFieldData(FieldIndex::EIGENVECTOR, FieldIndex::DISPLACEMENT);

        // Copy the force coefficients to the force coefficients temp field
        m_node_processor->CopyFieldData(FieldIndex::FORCE, FieldIndex::FORCE_IN);

        // Convergence tolerance squared
        double tolerance_squared = tolerance * tolerance;

        // Initialize the eigenvalue
        double lambda_n = 0.0;
        double lambda_np1 = 0.0;

        bool converged = false;

        // Loop over the power iterations
        for (size_t k = 0; k < num_iterations; ++k) {
            // Update lambda_n
            lambda_n = lambda_np1;

            // Perturb the displacement coefficients by epsilon, u + v * \epsilon
            PerturbDisplacementCoefficients(epsilon);

            // Compute the force with the perturbed displacement coefficients
            m_solver->ComputeForce();
            m_solver->CommunicateForce();

            // Compute the next eigenvector
            ComputeNextEigenvector(epsilon);

            // Normalize the eigenvector
            lambda_np1 = m_node_processor->NormalizeField(FieldIndex::DISPLACEMENT);

            printf(" Iteration: %lu, Eigenvalue: %e\n", k, lambda_np1);

            // Check for convergence
            if (std::abs(lambda_np1 - lambda_n) < tolerance_squared * lambda_np1) {
                printf(" Converged in %lu iterations\n", k + 1);
                converged = true;
                break;
            }
        }

        double lambda_max = lambda_np1;

        if (!converged) {
            lambda_max = std::max(lambda_n, lambda_np1);
            printf(" Power method did not converge after %lu iterations\n", num_iterations);
        }

        // Compute the stable time increment
        double stable_time_increment = 2.0 / std::sqrt(lambda_max);

        // Copy the displacement coefficient field to the eigenvector field
        m_node_processor->CopyFieldData(FieldIndex::DISPLACEMENT, FieldIndex::EIGENVECTOR);

        // Copy the displacement temp to the displacement coefficients field. Force will be cleared in the next iteration so no need to copy it
        m_node_processor->CopyFieldData(FieldIndex::DISPLACEMENT_IN, FieldIndex::DISPLACEMENT);

        return stable_time_increment;
    }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;  // The mesh data object.
    std::vector<std::string> m_sets;               // The sets to process.
    ExplicitSolver *m_solver;                      // The solver object.
    stk::mesh::BulkData *m_bulk_data;              // The bulk data object.
    stk::mesh::Selector m_selector;                // The selector
    stk::mesh::Selector m_owned_selector;          // The local selector
    stk::mesh::NgpMesh m_ngp_mesh;                 // The ngp mesh object.

    DoubleField *m_displacement_in_field;       // The scratch displacement field, stores the displacement at n+1
    DoubleField *m_displacement_field;          // The displacement coefficients field, the input displacement field, u_n+1
    DoubleField *m_mass_field;                  // The mass field
    DoubleField *m_force_field;                 // The force field, for calculating the force with a small perturbation, f(u + \epsilon v)
    DoubleField *m_force_in_field;              // The force field, input for force, f(u)
    UnsignedField *m_essential_boundary_field;  // The essential boundary field, flag for if the dof is in the essential boundary set

    NgpDoubleField *m_ngp_displacement_in_field;       // The ngp scratch displacement field
    NgpDoubleField *m_ngp_displacement_field;          // The ngp displacement coefficients field
    NgpDoubleField *m_ngp_mass_field;                  // The ngp mass field
    NgpDoubleField *m_ngp_force_field;                 // The ngp force field
    NgpDoubleField *m_ngp_force_in_field;              // The ngp force field
    NgpUnsignedField *m_ngp_essential_boundary_field;  // The ngp essential boundary field

    std::unique_ptr<EntityProcessor<stk::topology::NODE_RANK, false, FieldIndex::NUM_FIELDS, double>> m_node_processor;  // The entity processor
};

}  // namespace aperi
