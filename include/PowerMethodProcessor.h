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
        m_displacement_temp_field = StkGetField(FieldQueryData<double>{"displacement_temp", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_displacement_temp_field = &stk::mesh::get_updated_ngp_field<double>(*m_displacement_temp_field);

        // Get the displacement_coefficients field, field to store the displacement coefficients
        m_displacement_coefficients_field = StkGetField(FieldQueryData<double>{"displacement_coefficients", FieldQueryState::NP1, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_displacement_coefficients_field = &stk::mesh::get_updated_ngp_field<double>(*m_displacement_coefficients_field);

        // Get the mass field
        m_mass_field = StkGetField(FieldQueryData<double>{"mass", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_mass_field = &stk::mesh::get_updated_ngp_field<double>(*m_mass_field);

        // Get the force field
        m_force_field = StkGetField(FieldQueryData<double>{"force_coefficients", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_force_field = &stk::mesh::get_updated_ngp_field<double>(*m_force_field);

        // Get the force_coefficients_temp field, temporary field to store the force at n+1
        m_force_coefficients_temp_field = StkGetField(FieldQueryData<double>{"force_coefficients_temp", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_force_coefficients_temp_field = &stk::mesh::get_updated_ngp_field<double>(*m_force_coefficients_temp_field);

        // Get the essential_boundary field, indicator for if the dof is in the essential boundary set
        m_essential_boundary_field = StkGetField(FieldQueryData<uint64_t>{"essential_boundary", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_essential_boundary_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_essential_boundary_field);

        // Initialize the EntityProcessor later
        InitializeEntityProcessor();
    }

    void InitializeEntityProcessor() {
        std::array<FieldQueryData<double>, 4> field_query_data_vec = {
            FieldQueryData<double>{"displacement_coefficients", FieldQueryState::NP1},
            FieldQueryData<double>{"displacement_temp", FieldQueryState::None},
            FieldQueryData<double>{"force_coefficients", FieldQueryState::None},
            FieldQueryData<double>{"force_coefficients_temp", FieldQueryState::None}};
        m_node_processor = std::make_unique<EntityProcessor<stk::topology::BEGIN_RANK, false, 4, double>>(field_query_data_vec, m_mesh_data, m_sets);
    }

    void PerturbDisplacementCoefficients(double epsilon) {
        // Perturb the displacement coefficients by epsilon, v = u + v * \epsilon * essential_boundary
        // u is the displacement_coefficients_temp field
        // v is the displacement_coefficients field
        // essential_boundary is the essential_boundary field

        auto ngp_mesh = m_ngp_mesh;
        // Get the ngp fields
        auto ngp_displacement_temp_field = *m_ngp_displacement_temp_field;
        auto ngp_displacement_coefficients_field = *m_ngp_displacement_coefficients_field;
        auto ngp_essential_boundary_field = *m_ngp_essential_boundary_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the essential boundary value
                uint64_t essential_boundary = ngp_essential_boundary_field(node_index, 0);

                if (essential_boundary == 1.0) {
                    return;
                }

                // Get the displacement coefficients
                double displacement_coefficients = ngp_displacement_coefficients_field(node_index, 0);

                // Get the displacement temp
                double displacement_temp = ngp_displacement_temp_field(node_index, 0);

                // Perturb the displacement coefficients by epsilon, v = u + v * \epsilon
                ngp_displacement_coefficients_field(node_index, 0) = displacement_temp + displacement_coefficients * epsilon;
            });
    }

    void ApplySystemDirectionTangent(double epsilon) {
        /*
            Compute v_n+1 = (M^{-1}K) v_n, where:
            (M^{-1}K) v_n = M^{-1} (F(u + \epsilon v_n) - F(u)) / \epsilon

            v_n+1 will be calculated in place in the displacement coefficients field
            f(u) is the force_coefficients_temp field
            f(u + \epsilon v_n) is the force_coefficients field
            M is the mass field
        */

        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_mass_field = *m_ngp_mass_field;
        auto ngp_force_field = *m_ngp_force_field;
        auto ngp_force_coefficients_temp_field = *m_ngp_force_coefficients_temp_field;
        auto ngp_displacement_coefficients_field = *m_ngp_displacement_coefficients_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the mass
                double mass = ngp_mass_field(node_index, 0);

                // Get the force coefficients
                double force_coefficients = ngp_force_field(node_index, 0);

                // Get the force coefficients temp
                double force_coefficients_temp = ngp_force_coefficients_temp_field(node_index, 0);

                // Compute v_n+1 = (M^{-1}K) v_n
                ngp_displacement_coefficients_field(node_index, 0) = (force_coefficients - force_coefficients_temp) / epsilon / mass;
            });
    }

    double ComputeStableTimeIncrement() {
        /*
            1. Need scratch STK fields for storing displacement and n+1. Need new field and force_coefficients_epsilon field
            2. Loop over power iterations
               a. Compute v_n+1 = (M^{-1}K) v_n
               b. Normalize v_n+1
            3. Compute the Rayleigh quotient. lambda = v^T M^{-1}K v, using apply_system_directional_tangent
        */

        // Copy the displacement coefficients to the displacement temp field
        m_node_processor->CopyFieldData(0, 1);

        // Copy the force coefficients to the force coefficients temp field
        m_node_processor->CopyFieldData(2, 3);

        // Episilon for the perturbation
        double epsilon = 1.e-4;

        // Number of power iterations
        size_t num_iterations = 20;

        // Loop over the power iterations
        for (size_t k = 0; k < num_iterations; ++k) {
            // Perturb the displacement coefficients by epsilon, u + v * \epsilon * essential_boundary
            PerturbDisplacementCoefficients(epsilon);

            // Compute the force with the perturbed displacement coefficients
            m_solver->ComputeForce();
            m_solver->CommunicateForce();

            // Apply the system directional tangent
            ApplySystemDirectionTangent(epsilon);

            // Normalize the eigenvector
            m_node_processor->NormalizeField(0);
        }

        // Compute the Rayleigh quotient
        double lambda = m_node_processor->ComputeDotProduct(0, 0);

        // Compute the stable time increment
        double stable_time_increment = 2.0 / std::sqrt(lambda);

        // Copy the displacement temp to the displacement coefficients field
        m_node_processor->CopyFieldData(1, 0);

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

    DoubleField *m_displacement_temp_field;          // The scratch displacement field, stores the displacement at n+1
    DoubleField *m_displacement_coefficients_field;  // The displacement coefficients field, the input displacement field, u_n+1
    DoubleField *m_mass_field;                       // The mass field
    DoubleField *m_force_field;                      // The force field, for calculating the force with a small perturbation, f(u + \epsilon v)
    DoubleField *m_force_coefficients_temp_field;    // The force field, input for force, f(u)
    UnsignedField *m_essential_boundary_field;       // The essential boundary field, flag for if the dof is in the essential boundary set

    NgpDoubleField *m_ngp_displacement_temp_field;          // The ngp scratch displacement field
    NgpDoubleField *m_ngp_displacement_coefficients_field;  // The ngp displacement coefficients field
    NgpDoubleField *m_ngp_mass_field;                       // The ngp mass field
    NgpDoubleField *m_ngp_force_field;                      // The ngp force field
    NgpDoubleField *m_ngp_force_coefficients_temp_field;    // The ngp force field
    NgpUnsignedField *m_ngp_essential_boundary_field;       // The ngp essential boundary field

    std::unique_ptr<EntityProcessor<stk::topology::NODE_RANK, false, 4, double>> m_node_processor;  // The node processor
};

}  // namespace aperi
