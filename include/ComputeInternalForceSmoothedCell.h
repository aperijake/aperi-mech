#pragma once

#include <Eigen/Dense>
#include <Kokkos_Core.hpp>
#include <memory>

#include "ComputeInternalForceBase.h"
#include "Field.h"
#include "FieldData.h"
#include "Index.h"
#include "Materials/Base.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "SmoothedCellData.h"
#include "Types.h"

namespace aperi {

/**
 * @brief Functor for material separation that does nothing.
 * This is used when no material separation is needed.
 */
struct MaterialSeparationFunctorNoOp {
    KOKKOS_INLINE_FUNCTION void operator()(const size_t & /*subcell_id*/) const {
        // No operation for material separation
    }
};

/**
 * @brief Functor for computing the internal force of an element using strain smoothing.
 */
class ComputeInternalForceSmoothedCellBase : public ComputeInternalForceBase<aperi::Material::StressFunctor> {
   public:
    /**
     * @brief Constructs a ComputeInternalForceSmoothedCellBase object.
     * @param mesh_data A shared pointer to the MeshData object.
     * @param displacements_field_name The name of the displacements field.
     * @param force_field_name The name of the force field.
     * @param material The material object.
     * @param lagrangian_formulation_type The Lagrangian formulation type.
     */
    ComputeInternalForceSmoothedCellBase(std::shared_ptr<aperi::MeshData> mesh_data,
                                         std::string displacements_field_name,
                                         const std::string &force_field_name,
                                         const Material &material,
                                         const LagrangianFormulationType &lagrangian_formulation_type,
                                         bool use_f_bar)
        : ComputeInternalForceBase(mesh_data, displacements_field_name, force_field_name, material, lagrangian_formulation_type, use_f_bar) {
        m_material_separation_functor_no_op = std::make_shared<MaterialSeparationFunctorNoOp>();
    }

    /**
     * @brief Destructor for ComputeInternalForceSmoothedCellBase.
     */
    virtual ~ComputeInternalForceSmoothedCellBase() = default;

    /**
     * @brief Resets anything needed for the next increment.
     */
    virtual void ResetForIncrement() {
    }

    /**
     * @brief Preprocessing steps that have mesh modification.
     */
    virtual void PreprocessingWithMeshModification(const SmoothedCellDataSizes &smoothed_cell_data_sizes, const std::vector<std::string> &parts) {
        // Preprocessing logic here
    }

    /**
     * @brief Finishes preprocessing after instantiation and other required operations from elsewhere have been completed.
     */
    virtual void FinishPreprocessing() {
        // Finish preprocessing logic here
    }

    virtual size_t NumFailedSubcells() const {
        return 0;
    }

    virtual std::shared_ptr<void> GetMaterialSeparatorData() const {
        return nullptr;
    }

    KOKKOS_INLINE_FUNCTION
    void ComputeDisplacementGradientAndJ(const SmoothedCellData &scd,
                                         const aperi::Index &elem_index,
                                         const size_t subcell_id,
                                         const size_t num_nodes,
                                         const Kokkos::View<aperi::Index *> &node_indicies,
                                         const Kokkos::View<double *> &node_function_derivatives,
                                         const bool use_f_bar) const {
        // Create maps for the function derivatives and displacement
        Eigen::Map<const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor>> b_matrix_map(node_function_derivatives.data(), num_nodes, 3);
        Eigen::Matrix<double, 3, 3> this_displacement_gradient = Eigen::Matrix<double, 3, 3>::Zero();

        // Calculate the displacement gradient
        for (size_t k = 0; k < num_nodes; ++k) {
            const aperi::Index node_index = node_indicies(k);
            const auto displacement_np1 = m_displacement_np1_field.GetConstEigenVectorMap<3>(node_index);
            // Perform the matrix multiplication for field_data_to_gather_gradient
            this_displacement_gradient += displacement_np1 * b_matrix_map.row(k);
        }

        // Compute the field gradients, non-bar version
        ComputeDisplacementGradient(elem_index(), this_displacement_gradient);

        // Compute the J value for the subcell
        if (use_f_bar) {
            if (m_lagrangian_formulation_type == LagrangianFormulationType::Total) {
                scd.GetSubcellJ(subcell_id) = aperi::DetApIm1(this_displacement_gradient) + 1.0;
            } else {
                auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetEigenMatrixMap<3, 3>(elem_index());
                scd.GetSubcellJ(subcell_id) = aperi::DetApIm1(displacement_gradient_np1_map) + 1.0;
            }
        }
    }

    KOKKOS_INLINE_FUNCTION
    void ComputeFbar(const SmoothedCellData &scd, const size_t cell_id) const {
        // Get the subcell indices
        const auto subcell_indices = scd.GetCellSubcells(cell_id);

        // Cell J value
        double cell_j_bar = 0.0;

        // Loop over all the subcells to compute J-bar
        for (size_t i = 0, e = subcell_indices.extent(0); i < e; ++i) {
            const size_t subcell_id = subcell_indices(i);

            // Get the subcell J value
            const double subcell_j = scd.GetSubcellJ(subcell_id);

            // Get the subcell volume
            const double subcell_volume = scd.GetSubcellVolume(subcell_id);

            // Add the unscaled subcell J value to the cell J-bar value
            cell_j_bar = cell_j_bar + subcell_j * subcell_volume;
        }

        // Get the cell volume
        const double cell_volume = scd.GetCellVolume(cell_id);

        // Scale the cell J-bar value by the cell volume
        cell_j_bar = cell_j_bar / cell_volume;

        // Store the cell J-bar value
        scd.GetCellJBar(cell_id) = cell_j_bar;

        // Loop over all the subcells
        for (size_t i = 0, e = subcell_indices.extent(0); i < e; ++i) {
            const size_t subcell_id = subcell_indices(i);

            // Get the subcell element indices
            const auto element_indices = scd.GetSubcellElementIndices(subcell_id);
            const auto element_index = element_indices(0);

            // Get the displacement gradient maps
            const auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(element_index());
            auto displacement_gradient_bar_np1_map = m_displacement_gradient_bar_np1_field.GetEigenMatrixMap<3, 3>(element_index());

            // Get the subcell J-bar value
            const double subcell_j = scd.GetSubcellJ(subcell_id);

            // Compute the ratio
            const double j_ratio = cell_j_bar / subcell_j;

            if (Kokkos::abs(j_ratio - 1.0) < 3.0 * REAL_EPSILON) {
                displacement_gradient_bar_np1_map = displacement_gradient_np1_map;
                continue;
            }

            // Compute the scale factor
            const double j_scale = Kokkos::cbrt(j_ratio);

            // Scale the displacement gradient
            // F_bar = F * j_scale
            // H = F - I
            // H_bar = F_bar - I = (F * j_scale - I) = (H + I) * j_scale - I = H * j_scale + I * (j_scale - 1)
            displacement_gradient_bar_np1_map = displacement_gradient_np1_map * j_scale;
            displacement_gradient_bar_np1_map.diagonal().array() += (j_scale - 1.0);
        }
    }

    template <typename MaterialSeparationFunctor>
    KOKKOS_INLINE_FUNCTION void ComputeStressAndHandleMaterialSeparation(const aperi::Index &elem_index,
                                                                         const size_t &subcell_id,
                                                                         MaterialSeparationFunctor material_separation_functor,
                                                                         const bool &use_f_bar,
                                                                         const double &time) const {
        // Default stride for a 3x3 matrix
        const Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> mat3_stride(3, 1);

        // Get the displacement gradient map
        const auto displacement_gradient_np1_map = use_f_bar ? m_displacement_gradient_bar_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index()) : m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(elem_index());

        // Store the velocity gradient in a local variable to extend its lifetime
        const Eigen::Matrix<double, 3, 3> velocity_gradient = m_needs_velocity_gradient ? ComputeVelocityGradient(elem_index()) : Eigen::Matrix<double, 3, 3>::Zero();
        const auto velocity_gradient_map = Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(velocity_gradient.data(), 3, 3, mat3_stride);

        // Get the number of state variables
        const size_t num_state_variables = m_has_state ? m_stress_functor.NumberOfStateVariables() : 0;

        // Get the stride
        const size_t stride = m_has_state ? m_state_np1_field.GetStride(elem_index) : 0;

        // Get the state maps
        Eigen::InnerStride<Eigen::Dynamic> state_stride(stride);
        const auto state_n_map = m_has_state ? m_state_n_field.GetConstEigenVectorMap(elem_index(), num_state_variables) : Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);
        auto state_np1_map = m_has_state ? m_state_np1_field.GetEigenVectorMap(elem_index(), num_state_variables) : Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(nullptr, 0, state_stride);

        // Get the pk1 stress map
        auto pk1_stress_map = use_f_bar ? m_pk1_stress_bar_field.GetEigenMatrixMap<3, 3>(elem_index()) : m_pk1_stress_field.GetEigenMatrixMap<3, 3>(elem_index());
        const auto pk1_stress_n_map = m_needs_old_stress ? use_f_bar ? m_pk1_stress_bar_n_field.GetConstEigenMatrixMap<3, 3>(elem_index()) : m_pk1_stress_n_field.GetConstEigenMatrixMap<3, 3>(elem_index()) : Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(nullptr, 3, 3, mat3_stride);

        // Compute the stress, pk1_bar value if using F-bar
        m_stress_functor.GetStress(&displacement_gradient_np1_map, &velocity_gradient_map, &state_n_map, &state_np1_map, m_time_increment_device(0), &pk1_stress_n_map, pk1_stress_map);

        // Handle material separation
        if (m_stress_functor.CheckSeparationState(&state_np1_map, time) == MaterialSeparationState::JUST_FAILED) {
            // Do nothing in base class, but in derived classes we handle material separation
            material_separation_functor(subcell_id);
        }
    }

    KOKKOS_INLINE_FUNCTION
    void UnBarStress(const SmoothedCellData &scd, const size_t cell_id) const {
        // Get the subcell indices
        const auto subcell_indices = scd.GetCellSubcells(cell_id);

        // Get the cell J value reference
        const double cell_j_bar = scd.GetCellJBar(cell_id);

        // Dual pressure
        double dual_pressure = 0.0;

        // Loop over all the subcells, calculate the dual pressure
        for (size_t i = 0, e = subcell_indices.extent(0); i < e; ++i) {
            const size_t subcell_id = subcell_indices(i);

            // Get the subcell element indices
            const auto element_indices = scd.GetSubcellElementIndices(subcell_id);
            const auto element_index = element_indices(0);

            // Get the subcell J value
            const double subcell_j = scd.GetSubcellJ(subcell_id);

            // Get the subcell volume
            const double subcell_volume = scd.GetSubcellVolume(subcell_id);

            // Get the J scale factor
            const double j_scale = Kokkos::cbrt(cell_j_bar / subcell_j);

            // Get the d_jscale_d_jbar value
            const double d_jscale_d_jbar = j_scale / (3.0 * cell_j_bar);

            // Get the pk1_stress_bar map
            const auto pk1_stress_bar_map = m_pk1_stress_bar_field.GetConstEigenMatrixMap<3, 3>(element_index());

            // Get the displacement gradient map
            const auto displacement_gradient_np1_map = m_displacement_gradient_np1_field.GetConstEigenMatrixMap<3, 3>(element_index());

            // Add to the dual pressure
            dual_pressure += d_jscale_d_jbar * subcell_volume * (pk1_stress_bar_map.cwiseProduct(displacement_gradient_np1_map).sum() + pk1_stress_bar_map.trace());
        }

        // Get the cell volume
        const double cell_volume = scd.GetCellVolume(cell_id);

        // Scale the dual pressure by the cell volume
        dual_pressure = dual_pressure / cell_volume;

        // Loop over all the subcells, calculate the pk1 stress
        for (size_t i = 0, e = subcell_indices.extent(0); i < e; ++i) {
            const size_t subcell_id = subcell_indices(i);

            // Get the subcell element indices
            const auto element_indices = scd.GetSubcellElementIndices(subcell_id);
            const auto element_index = element_indices(0);

            // Get the subcell J value
            const double subcell_j = scd.GetSubcellJ(subcell_id);

            // Compute the J scale factor
            const double j_scale = Kokkos::cbrt(cell_j_bar / subcell_j);

            // Get the pk1 stress map
            auto pk1_stress_map = m_pk1_stress_field.GetEigenMatrixMap<3, 3>(element_index());

            // Get the pk1_stress_bar map
            const auto pk1_stress_bar_map = m_pk1_stress_bar_field.GetConstEigenMatrixMap<3, 3>(element_index());

            // Compute the pk1 stress
            pk1_stress_map = pk1_stress_bar_map * j_scale;

            // Calculate the d_j_scale_d_j value
            const double d_j_scale_d_j = -j_scale / (3.0 * subcell_j);

            // Deformation gradient
            Eigen::Matrix3d F = m_displacement_gradient_np1_field.GetEigenMatrix<3, 3>(element_index());
            F.diagonal().array() += 1.0;

            // Calculate the scalar multiplier first
            const double scalar_term = (dual_pressure + d_j_scale_d_j * pk1_stress_bar_map.cwiseProduct(F).sum()) * subcell_j;

            // Add to the pk1 stress
            pk1_stress_map = pk1_stress_map + scalar_term * aperi::InvertMatrix(F).transpose();
        }
    }

    KOKKOS_INLINE_FUNCTION
    void ComputeInternalForce(const SmoothedCellData &scd,
                              const aperi::Index &elem_index,
                              const size_t subcell_id,
                              const size_t num_nodes,
                              const Kokkos::View<aperi::Index *> &node_indicies,
                              const Kokkos::View<double *> &node_function_derivatives,
                              const bool use_f_bar) const {
        // Create maps for the function derivatives and displacement
        Eigen::Map<const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor>> b_matrix_map(node_function_derivatives.data(), num_nodes, 3);

        // Compute the stress and internal force of the element.
        const double volume = scd.GetSubcellVolume(subcell_id);

        // Get the pk1 stress map
        const auto pk1_stress_map = m_pk1_stress_field.GetConstEigenMatrixMap<3, 3>(elem_index());

        // Compute the stress term
        Eigen::Matrix<double, 3, 3> stress_term = pk1_stress_map.transpose() * -volume;

        // Adjust for the B matrix and weight not being in the original configuration for updated or semi Lagrangian formulations
        if (m_lagrangian_formulation_type == LagrangianFormulationType::Updated || m_lagrangian_formulation_type == LagrangianFormulationType::Semi) {
            // Compute the deformation gradient
            Eigen::Matrix<double, 3, 3> F_reference = m_reference_displacement_gradient_field.GetEigenMatrix<3, 3>(elem_index());
            F_reference.diagonal().array() += 1.0;

            // Adjust the stress to account for the difference in configuration
            stress_term = F_reference * stress_term / F_reference.determinant();
        }

        // Scatter the force to the nodes
        for (size_t k = 0; k < num_nodes; ++k) {
            // Calculate the force
            const Eigen::Matrix<double, 1, 3> force = b_matrix_map.row(k) * stress_term;

            // Add the force to the node
            const aperi::Index node_index = node_indicies(k);
            // Scatter the force to the nodes
            m_force_field.AtomicAdd(node_index, force);
        }
    }

    template <typename MaterialSeparationFunctor>
    void ForEachCellComputeForceFbar(const SmoothedCellData &scd, MaterialSeparationFunctor &material_separation_functor) {
        size_t num_cells = scd.NumCells();
        size_t num_subcells = scd.NumSubcells();

        bool use_f_bar = true;

        // Loop over all the subcells
        Kokkos::parallel_for(
            "for_each_subcell_compute_displacement_gradient", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                const auto element_indices = scd.GetSubcellElementIndices(subcell_id);
                const aperi::Index elem_index = element_indices(0);

                // Get the node indices and function derivatives
                const auto node_indicies = scd.GetSubcellNodeIndices(subcell_id);
                const auto node_function_derivatives = scd.GetSubcellFunctionDerivatives(subcell_id);

                const size_t num_nodes = node_indicies.extent(0);

                // Compute the displacement gradient
                ComputeDisplacementGradientAndJ(scd, elem_index, subcell_id, num_nodes, node_indicies, node_function_derivatives, use_f_bar);
            });

        // Loop over cells. Compute and store F-bar
        Kokkos::parallel_for(
            "for_each_cell_compute_f_bar", num_cells, KOKKOS_CLASS_LAMBDA(const size_t cell_id) {
                ComputeFbar(scd, cell_id);
            });

        // Loop over all the subcells
        Kokkos::parallel_for(
            "for_each_subcell_compute_stress", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                const auto element_indices = scd.GetSubcellElementIndices(subcell_id);
                const aperi::Index elem_index = element_indices(0);
                // Compute the stress and handle material separation
                ComputeStressAndHandleMaterialSeparation(elem_index, subcell_id, material_separation_functor, use_f_bar, m_time_device(0));
            });

        // Unbar the stress
        // Loop over all the cells
        Kokkos::parallel_for(
            "for_each_cell_unbar_stress", num_cells, KOKKOS_CLASS_LAMBDA(const size_t cell_id) {
                UnBarStress(scd, cell_id);
            });

        // Loop over all the subcells
        Kokkos::parallel_for(
            "for_each_subcell_compute_internal_force", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                // Get the subcell element indices
                const auto element_indices = scd.GetSubcellElementIndices(subcell_id);
                const aperi::Index elem_index = element_indices(0);

                // Get the node indices and function derivatives
                const auto node_indicies = scd.GetSubcellNodeIndices(subcell_id);
                const auto node_function_derivatives = scd.GetSubcellFunctionDerivatives(subcell_id);
                const size_t num_nodes = node_indicies.extent(0);

                // Compute the internal force
                ComputeInternalForce(scd, elem_index, subcell_id, num_nodes, node_indicies, node_function_derivatives, use_f_bar);
            });
    }

    template <typename MaterialSeparationFunctor>
    void ForEachCellComputeForce(const SmoothedCellData &scd, MaterialSeparationFunctor &material_separation_functor) {
        size_t num_subcells = scd.NumSubcells();

        bool use_f_bar = false;

        // Loop over all the subcells
        Kokkos::parallel_for(
            "for_each_subcell_compute_displacement_gradient", num_subcells, KOKKOS_CLASS_LAMBDA(const size_t subcell_id) {
                // Get the subcell element indices
                const auto element_indices = scd.GetSubcellElementIndices(subcell_id);
                const aperi::Index elem_index = element_indices(0);

                // Get the node indices and function derivatives
                const auto node_indicies = scd.GetSubcellNodeIndices(subcell_id);
                const auto node_function_derivatives = scd.GetSubcellFunctionDerivatives(subcell_id);
                const size_t num_nodes = node_indicies.extent(0);

                // Compute the displacement gradient
                ComputeDisplacementGradientAndJ(scd, elem_index, subcell_id, num_nodes, node_indicies, node_function_derivatives, use_f_bar);

                // Compute the stress and handle material separation
                ComputeStressAndHandleMaterialSeparation(elem_index, subcell_id, material_separation_functor, use_f_bar, m_time_device(0));

                // Compute the internal force
                ComputeInternalForce(scd, elem_index, subcell_id, num_nodes, node_indicies, node_function_derivatives, use_f_bar);
            });
    }

    /**
     * @brief Computes the internal force for each cell.
     * @param scd The smoothed cell data.
     */
    template <typename MaterialSepartionFunctor>
    void ForEachCellComputeForce_Impl(const SmoothedCellData &scd, MaterialSepartionFunctor &material_separation_functor) {
        // Reset for the next increment
        ResetForIncrement();

        // Get the number of cells and subcells
        const size_t num_cells = scd.NumCells();
        const size_t num_subcells = scd.NumSubcells();
        assert(num_subcells >= num_cells);

        // If using f_bar, only use it if there are more subcells than cells
        bool use_f_bar = m_use_f_bar && num_subcells != num_cells;

        if (use_f_bar) {
            ForEachCellComputeForceFbar(scd, material_separation_functor);
        } else {
            ForEachCellComputeForce(scd, material_separation_functor);
        }
    }

    /**
     * @brief Computes the internal force for each cell.
     * @param scd The smoothed cell data.
     */
    virtual void ForEachCellComputeForce(const SmoothedCellData &scd) {
        // Use the no-op material separation functor by default
        KOKKOS_ASSERT(m_material_separation_functor_no_op != nullptr);
        ForEachCellComputeForce_Impl(scd, *m_material_separation_functor_no_op);
    }

   protected:
    std::shared_ptr<aperi::MaterialSeparationFunctorNoOp> m_material_separation_functor_no_op;
};

/**
 * @brief Standard implementation of internal force computation
 */
class AperiComputeInternalForceSmoothedCell : public ComputeInternalForceSmoothedCellBase {
   public:
    // Inherit constructor
    using ComputeInternalForceSmoothedCellBase::ComputeInternalForceSmoothedCellBase;

    virtual ~AperiComputeInternalForceSmoothedCell() = default;
};

}  // namespace aperi

#ifdef USE_PROTEGO_MECH
#include "ProtegoComputeInternalForceSmoothedCell.h"
#endif

namespace aperi {

#ifdef USE_PROTEGO_MECH
using ComputeInternalForceSmoothedCell = protego::ProtegoComputeInternalForceSmoothedCell;
#else
using ComputeInternalForceSmoothedCell = AperiComputeInternalForceSmoothedCell;
#endif

}  // namespace aperi
