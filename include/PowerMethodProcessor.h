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
#include <string>
#include <vector>

#include "AperiStkUtils.h"
#include "Constants.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "MeshData.h"
#include "Solver.h"

namespace aperi {

// Power method convergence stats
struct PowerMethodStats {
    double eigenvalue = 0;
    double stable_time_step = 0;
    size_t num_iterations = 0;
    bool converged = false;
    std::vector<double> eigenvalues_for_iterations;

    void Reset(size_t max_num_iterations) {
        eigenvalue = 0;
        stable_time_step = 0;
        num_iterations = 0;
        converged = false;
        eigenvalues_for_iterations.clear();
        eigenvalues_for_iterations.resize(max_num_iterations, 0.0);
    }

    void SetStats(double eigenvalue, double stable_time_step, size_t num_iterations, bool converged) {
        this->eigenvalue = eigenvalue;
        this->stable_time_step = stable_time_step;
        this->num_iterations = num_iterations;
        this->converged = converged;
    }

    std::string Message() {
        if (converged) {
            return "Power method, iterations: " + std::to_string(num_iterations);
        } else {
            return "Power method, not converged";
        }
    }

    void PrintStats() {
        aperi::CoutP0() << "Power method stats:" << std::endl;
        aperi::CoutP0() << "  Eigenvalue: " << eigenvalue << std::endl;
        aperi::CoutP0() << "  Stable time step: " << stable_time_step << std::endl;
        aperi::CoutP0() << "  Number of iterations: " << num_iterations << std::endl;
        aperi::CoutP0() << "  Converged: " << converged << std::endl;
    }

    void PrintHistory() {
        aperi::CoutP0() << "Power method history:" << std::endl;
        for (size_t i = 0; i < eigenvalues_for_iterations.size(); i++) {
            aperi::CoutP0() << "  Iteration " << i << ": " << eigenvalues_for_iterations[i] << std::endl;
        }
    }
};

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
                      MAX_EDGE_LENGTH,
                      NUM_FIELDS };

   public:
    PowerMethodProcessor(std::shared_ptr<aperi::MeshData> mesh_data, std::shared_ptr<aperi::ExplicitSolver> solver) : m_mesh_data(mesh_data), m_solver(solver) {
        assert(mesh_data != nullptr);

        m_bulk_data = mesh_data->GetBulkData();
        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
        stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();

        LagrangianFormulationType formulation = solver->GetLagrangianFormulationType();
        bool is_incremental = formulation == LagrangianFormulationType::Updated || formulation == LagrangianFormulationType::Semi;

        std::string displacement_field_name = is_incremental ? "displacement_coefficients_inc" : "displacement_coefficients";

        // Get the selector
        std::vector<std::string> sets = {};
        m_selector = StkGetSelector(sets, meta_data);
        assert(m_selector.is_empty(stk::topology::ELEMENT_RANK) == false);

        // Append "_active" to each set name and create a selector for the active entities
        std::vector<std::string> active_sets = {"universal_active_part"};
        m_active_selector = StkGetSelector(active_sets, meta_data);

        // Get the displacement_temp field, temporary field to store the displacement at n+1
        m_displacement_in_field = StkGetField(FieldQueryData<double>{"displacement_np1_temp", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_displacement_in_field = &stk::mesh::get_updated_ngp_field<double>(*m_displacement_in_field);

        // Get the displacement_coefficients field, field to store the displacement coefficients
        m_displacement_field = StkGetField(FieldQueryData<double>{displacement_field_name, FieldQueryState::NP1, FieldDataTopologyRank::NODE}, meta_data);
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

        // Get the max edge length field
        m_max_edge_length_field = StkGetField(FieldQueryData<double>{"max_edge_length", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_max_edge_length_field = &stk::mesh::get_updated_ngp_field<double>(*m_max_edge_length_field);

        // Get the essential_boundary field, indicator for if the dof is in the essential boundary set
        m_essential_boundary_field = StkGetField(FieldQueryData<uint64_t>{"essential_boundary", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
        m_ngp_essential_boundary_field = &stk::mesh::get_updated_ngp_field<uint64_t>(*m_essential_boundary_field);

        // Initialize the EntityProcessor
        InitializeEntityProcessor(displacement_field_name);

        // Check if all nodes are in the essential boundary set
        CheckEssentialBoundaries();

        // Randomize the displacement coefficients for the initial guess at the eigenvector. Scale later to be epsilon * max_edge_length * random value
        m_node_processor->ConsistentlyRandomizeField(FieldIndex::EIGENVECTOR, -1.0, 1.0);
    }

    void CheckEssentialBoundaries() {
        std::array<FieldQueryData<uint64_t>, 1> field_query_data_vec = {FieldQueryData<uint64_t>{"essential_boundary", FieldQueryState::None}};
        std::vector<std::string> sets = {};
        ActiveNodeProcessor<1, uint64_t> m_essential_boundary_node_processor(field_query_data_vec, m_mesh_data, sets);

        // Get the min and max values of the essential boundary field
        std::pair<uint64_t, uint64_t> essential_boundary_min_max = m_essential_boundary_node_processor.MinMaxField(0);

        // If min != 0, then all nodes are in the essential boundary set
        if (essential_boundary_min_max.first != 0) {
            // Throw an exception if all nodes are in the essential boundary set
            throw std::runtime_error("All nodes are in the essential boundary set. Cannot run the power method. Use the direct_time_stepper instead.");
        }
    }

    void InitializeEntityProcessor(const std::string &displacement_field_name) {
        // Order of the fields in the field_query_data_vec must match the FieldIndex enum
        std::array<FieldQueryData<double>, FieldIndex::NUM_FIELDS> field_query_data_vec = {
            FieldQueryData<double>{displacement_field_name, FieldQueryState::NP1},
            FieldQueryData<double>{"displacement_np1_temp", FieldQueryState::None},
            FieldQueryData<double>{"force_coefficients", FieldQueryState::None},
            FieldQueryData<double>{"force_coefficients_temp", FieldQueryState::None},
            FieldQueryData<double>{"eigenvector", FieldQueryState::None},
            FieldQueryData<double>{"max_edge_length", FieldQueryState::None}};
        std::vector<std::string> sets = {};
        m_node_processor = std::make_unique<ActiveNodeProcessor<FieldIndex::NUM_FIELDS, double>>(field_query_data_vec, m_mesh_data, sets);
    }

    void InitializeEigenvector(double epsilon) {
        // Scale the eigenvector to be epsilon * max_edge_length * random value

        // Get the ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_displacement_field = *m_ngp_displacement_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_active_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the max edge length
                double l = ngp_displacement_field(node_index, 0);

                // Number of components
                const size_t num_components = ngp_displacement_field.get_num_components_per_entity(node_index);
                // Loop over the components
                for (size_t i = 0; i < num_components; ++i) {
                    // Scale the eigenvector to be epsilon * max_edge_length * random value
                    ngp_displacement_field(node_index, i) *= epsilon * l;
                }
            });
    }

    void PerturbDisplacementCoefficients(double epsilon) {
        /* Perturb the displacement coefficients by epsilon, u_epsilon = u + v * l * epsilon
            - Only nodes not in the essential boundary set are perturbed
            - u:         displacement_in field, the displacement at time n+1
            - v:         displacement field, which is the eigenvector
            - l:         max_edge_length field, the scaling factor for the eigenvector
            - u_epsilon: displacement field, overwriting the eigenvector, v
        */

        // Get the ngp mesh
        auto ngp_mesh = m_ngp_mesh;

        // Get the ngp fields
        auto ngp_displacement_in_field = *m_ngp_displacement_in_field;
        auto ngp_displacement_field = *m_ngp_displacement_field;
        auto ngp_essential_boundary_field = *m_ngp_essential_boundary_field;
        auto ngp_max_edge_length_field = *m_ngp_max_edge_length_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_active_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Number of components
                const size_t num_components = ngp_displacement_in_field.get_num_components_per_entity(node_index);

                // Loop over the components
                for (size_t i = 0; i < num_components; ++i) {
                    // Get the displacement input to the power method
                    double u = ngp_displacement_in_field(node_index, i);

                    // If the node is in the essential boundary set, do not perturb the displacement coefficients
                    if (ngp_essential_boundary_field(node_index, i) == 1) {
                        // Set the displacement field to the displacement input to the power method, no perturbation
                        ngp_displacement_field(node_index, i) = u;
                        continue;
                    }

                    // Get the eigenvector value
                    double v = ngp_displacement_field(node_index, i);

                    // Get the max edge length
                    double l = ngp_max_edge_length_field(node_index, 0);

                    // Perturb the displacement coefficients by epsilon, v = u + v * l * epsilon
                    ngp_displacement_field(node_index, i) = u + v * l * epsilon;
                }
            });
    }

    void ComputeNextEigenvector(double epsilon) {
        /* Compute the next eigenvector
            Compute v_n+1 = (M^{-1}K) v_n, where:
            (M^{-1}K) v_n = M^{-1} (F(u + \epsilon v_n) - F(u)) / (epsilon * l)

            - v_n+1:               displacement field, the next eigenvector, computed in place
            - f(u):                force_in field, computed outside of the power method
            - f(u + \epsilon v_n): force field, computed before this function
            - l:                   max_edge_length field
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
        auto ngp_max_edge_length_field = *m_ngp_max_edge_length_field;

        // Loop over all the buckets
        stk::mesh::for_each_entity_run(
            ngp_mesh, stk::topology::NODE_RANK, m_active_selector,
            KOKKOS_LAMBDA(const stk::mesh::FastMeshIndex &node_index) {
                // Get the max edge length
                double l = ngp_max_edge_length_field(node_index, 0);
                double l_epsilon = l * epsilon;

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
                    ngp_displacement_field(node_index, i) = (force_u_epsilon - force_u) / (l_epsilon * mass);
                }
            });
    }

    double ComputeStableTimeIncrement(double time, double time_increment, size_t num_iterations = 50, double epsilon = 1.e-5, double tolerance = 1.e-2) {
        /*
            Compute the stable time increment using the power method to estimate the largest eigenvalue of the system (M^{-1}K) for the time step.
            The stable time increment is computed as 2 / sqrt(lambda_max), where lambda_max is the largest eigenvalue of the system.

            - num_iterations:        The number of power iterations to perform
            - epsilon:               The perturbation factor for the displacement coefficients
            - tolerance:             The tolerance for the power method convergence
        */

        m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);

        assert(m_solver != nullptr);

        // Copy the displacement coefficients to the displacement temp field
        m_node_processor->CopyFieldData(FieldIndex::DISPLACEMENT, FieldIndex::DISPLACEMENT_IN);

        // Copy the eigenvector to the displacement coefficients field
        // Eigenvector is randomized in the constructor. Will be overwritten by the power method for the next time this is called.
        m_node_processor->CopyFieldData(FieldIndex::EIGENVECTOR, FieldIndex::DISPLACEMENT);

        // Copy the force coefficients to the force coefficients temp field
        m_node_processor->CopyFieldData(FieldIndex::FORCE, FieldIndex::FORCE_IN);

        // Initialize the eigenvector if it is not already initialized
        if (m_eigenvector_is_initialized == false) {
            InitializeEigenvector(epsilon);
            m_eigenvector_is_initialized = true;
        }

        // Convergence tolerance squared
        double tolerance_squared = tolerance * tolerance;

        // Initialize the eigenvalue
        double lambda_n = m_power_method_stats.eigenvalue;
        double lambda_np1 = lambda_n;

        // Initialize the power method stats
        m_power_method_stats.Reset(num_iterations);

        // Set the current stable time increment to the input time increment
        double current_stable_time_increment = time_increment == 0.0 ? 1.0 : time_increment;

        bool converged = false;
        size_t num_iterations_required = num_iterations;

        // Loop over the power iterations
        for (size_t k = 0; k < num_iterations; ++k) {
            // Update lambda_n
            lambda_n = lambda_np1;

            // Perturb the displacement coefficients by epsilon, u + v * \epsilon
            PerturbDisplacementCoefficients(epsilon);

            // Compute the force with the perturbed displacement coefficients
            m_solver->ComputeForce(time, current_stable_time_increment);
            m_solver->CommunicateForce();

            // Compute the next eigenvector
            ComputeNextEigenvector(epsilon);

            // Normalize the eigenvector
            lambda_np1 = m_node_processor->NormalizeField(FieldIndex::DISPLACEMENT);

            // Compute the stable time increment
            current_stable_time_increment = 2.0 / std::sqrt(lambda_np1);

            // Add the eigenvalue to the stats
            m_power_method_stats.eigenvalues_for_iterations[k] = lambda_np1;

            // Check for convergence
            if (std::abs(lambda_np1 - lambda_n) < tolerance_squared * lambda_np1) {
                converged = true;
                num_iterations_required = k + 1;
                break;
            }
        }

        double lambda_max = lambda_np1;

        if (!converged) {
            lambda_max = std::max(lambda_n, lambda_np1);
        }

        // Compute the stable time increment
        double stable_time_increment = 2.0 / std::sqrt(lambda_max);

        // Update the power method stats
        m_power_method_stats.SetStats(lambda_max, stable_time_increment, num_iterations_required, converged);
        // m_power_method_stats.PrintStats();

        // Copy the displacement coefficient field to the eigenvector field
        m_node_processor->CopyFieldData(FieldIndex::DISPLACEMENT, FieldIndex::EIGENVECTOR);

        // Copy the displacement temp to the displacement coefficients field. Force will be cleared in the next iteration so no need to copy it
        m_node_processor->CopyFieldData(FieldIndex::DISPLACEMENT_IN, FieldIndex::DISPLACEMENT);

        return stable_time_increment;
    }

    PowerMethodStats GetPowerMethodStats() { return m_power_method_stats; }

   private:
    std::shared_ptr<aperi::MeshData> m_mesh_data;     // The mesh data object.
    std::shared_ptr<aperi::ExplicitSolver> m_solver;  // The solver object.
    bool m_eigenvector_is_initialized = false;        // Flag for if the eigenvector is initialized
    stk::mesh::BulkData *m_bulk_data;                 // The bulk data object.
    stk::mesh::Selector m_selector;                   // The selector
    stk::mesh::Selector m_active_selector;            // The active selector
    stk::mesh::NgpMesh m_ngp_mesh;                    // The ngp mesh object.

    DoubleField *m_displacement_in_field;       // The scratch displacement field, stores the displacement at n+1
    DoubleField *m_displacement_field;          // The displacement coefficients field, the input displacement field, u_n+1
    DoubleField *m_mass_field;                  // The mass field
    DoubleField *m_force_field;                 // The force field, for calculating the force with a small perturbation, f(u + \epsilon v)
    DoubleField *m_force_in_field;              // The force field, input for force, f(u)
    DoubleField *m_max_edge_length_field;       // The max edge length field
    UnsignedField *m_essential_boundary_field;  // The essential boundary field, flag for if the dof is in the essential boundary set

    NgpDoubleField *m_ngp_displacement_in_field;       // The ngp scratch displacement field
    NgpDoubleField *m_ngp_displacement_field;          // The ngp displacement coefficients field
    NgpDoubleField *m_ngp_mass_field;                  // The ngp mass field
    NgpDoubleField *m_ngp_force_field;                 // The ngp force field
    NgpDoubleField *m_ngp_force_in_field;              // The ngp force field
    NgpDoubleField *m_ngp_max_edge_length_field;       // The ngp max edge length field
    NgpUnsignedField *m_ngp_essential_boundary_field;  // The ngp essential boundary field

    std::unique_ptr<ActiveNodeProcessor<FieldIndex::NUM_FIELDS, double>> m_node_processor;  // The node processor

    PowerMethodStats m_power_method_stats;  // Stats for the last power method run
};

}  // namespace aperi
