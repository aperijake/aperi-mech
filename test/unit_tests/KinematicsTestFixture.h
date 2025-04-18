#pragma once

#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <string>

#include "ComputeInternalForceSmoothedCell.h"
#include "Constants.h"
#include "FieldData.h"
#include "LogUtils.h"
#include "Material.h"
#include "MeshLabelerTestFixture.h"
#include "QuadratureSmoothed.h"
#include "SmoothedCellDataProcessor.h"
#include "UnitTestNodalMeshUtils.h"
#include "ValueFromGeneralizedFieldProcessor.h"

class KinematicsTestFixture : public MeshLabelerTestFixture {
   protected:
    void SetUp() override {
        // Run MeshLabelerTestFixture::SetUp first
        MeshLabelerTestFixture::SetUp();
    }

    void TearDown() override {
        // Run MeshLabelerTestFixture::TearDown last
        MeshLabelerTestFixture::TearDown();
    }

    void CreateAndReadNodalMesh() {
        std::vector<size_t> num_elements = GetNumElementForNodalMesh(m_num_nodes_x, m_num_nodes_y, m_num_nodes_z);

        // Create a nodal mesh string
        std::string mesh_string = std::to_string(num_elements[0]) + "x" + std::to_string(num_elements[1]) + "x" + std::to_string(num_elements[2]);

        // Create the mesh
        CreateIoMeshGenerated();
        m_io_mesh->ReadMesh(mesh_string, {"block_1"});
    }

    std::shared_ptr<aperi::Material> CreateDummyMaterial() {
        // Make a dummy material
        YAML::Node material_node;
        material_node["elastic"]["youngs_modulus"] = 1.0;
        material_node["elastic"]["poissons_ratio"] = 0.3;
        material_node["elastic"]["density"] = 1.0;
        return aperi::CreateMaterial(material_node);
    }

    void SetupReproducingKernel(aperi::LagrangianFormulationType lagrangian_formulation_type, double support_scale, size_t num_subcells, bool activate_center_node, bool use_f_bar, bool element_integration) {
        // Lagrangian formulation type
        bool uses_generalized_fields = true;
        bool use_strain_smoothing = true;

        // Create the element processor
        bool use_one_pass_method = true;
        std::string force_field_name = use_one_pass_method ? "force_coefficients" : "force";

        size_t num_neighbors = use_one_pass_method ? aperi::MAX_NODE_NUM_NEIGHBORS * 3 : aperi::HEX8_NUM_NODES;

        // Displement field name
        std::string displacement_field_name = "displacement_coefficients";

        CreateAndReadNodalMesh();
        std::vector<aperi::FieldData> extra_fields = aperi::GetFieldData(uses_generalized_fields, use_strain_smoothing, lagrangian_formulation_type, false);

        AddFieldsAndCreateMeshLabeler(extra_fields);
        if (element_integration) {
            LabelGeneratedElementMesh(m_mesh_data, num_subcells, activate_center_node);
        } else {
            LabelGeneratedNodalMesh(m_mesh_data, num_subcells, activate_center_node);
        }
        ComputeReproducingKernelShapeFunctions(m_mesh_data, m_part_names, {support_scale});

        // Create the material
        m_material = CreateDummyMaterial();

        // Create the element processor
        m_compute_force = std::make_shared<aperi::ComputeInternalForceSmoothedCell>(m_mesh_data, displacement_field_name, force_field_name, *this->m_material, lagrangian_formulation_type, use_f_bar);

        // Mesh labeler parameters
        aperi::MeshLabelerParameters mesh_labeler_parameters;
        mesh_labeler_parameters.num_subcells = num_subcells;
        mesh_labeler_parameters.activate_center_node = activate_center_node;

        // Create the strain smoothing processor
        m_strain_smoothing_processor = std::make_shared<aperi::SmoothedCellDataProcessor>(m_mesh_data, m_part_names, lagrangian_formulation_type, mesh_labeler_parameters, use_f_bar);

        // Build the smoothed cell data
        m_smoothed_cell_data = m_strain_smoothing_processor->BuildSmoothedCellData<aperi::HEX8_NUM_NODES>(num_neighbors, use_one_pass_method);

        // Create the smoothed quadrature functor
        m_smoothed_quadrature_host_functor = std::make_shared<aperi::SmoothedQuadratureHex8>();

        // Compute the function derivatives
        m_strain_smoothing_processor->ComputeFunctionDerivatives<aperi::HEX8_NUM_NODES>(*m_smoothed_quadrature_host_functor.get(), use_one_pass_method);
    }

    void SetupNodalReproducingKernel(aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total, double support_scale = 1.1, size_t num_subcells = 1, bool activate_center_node = false, bool use_f_bar = false) {
        SetupReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar, false);
    }

    void SetupElementReproducingKernel(aperi::LagrangianFormulationType lagrangian_formulation_type = aperi::LagrangianFormulationType::Total, double support_scale = 1.1, size_t num_subcells = 1, bool activate_center_node = false, bool use_f_bar = false) {
        SetupReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar, true);
    }

    void ComputeForce() {
        m_compute_force->UpdateFields();  // Updates the ngp fields
        m_compute_force->SetTimeIncrement(1.0e-6);
        m_compute_force->ForEachCellComputeForce(*m_smoothed_cell_data);
        m_compute_force->MarkFieldsModifiedOnDevice();
        m_strain_smoothing_processor->PopulateElementOutputs();
    }

    void ComputeValueFromGeneralizedField() {
        std::array<aperi::FieldQueryData<double>, 3> src_field_query_data;
        src_field_query_data[0] = {"displacement_coefficients", aperi::FieldQueryState::NP1};
        src_field_query_data[1] = {"velocity_coefficients", aperi::FieldQueryState::NP1};
        src_field_query_data[2] = {"acceleration_coefficients", aperi::FieldQueryState::NP1};

        std::array<aperi::FieldQueryData<double>, 3> dest_field_query_data;
        dest_field_query_data[0] = {"displacement", aperi::FieldQueryState::None};
        dest_field_query_data[1] = {"velocity", aperi::FieldQueryState::None};
        dest_field_query_data[2] = {"acceleration", aperi::FieldQueryState::None};
        auto output_value_from_generalized_field_processor = std::make_shared<aperi::ValueFromGeneralizedFieldProcessor<3>>(src_field_query_data, dest_field_query_data, m_mesh_data, m_part_names);
        output_value_from_generalized_field_processor->SyncAllSourceFieldsDeviceToHost();
        output_value_from_generalized_field_processor->CommunicateAllSourceFieldData();
        output_value_from_generalized_field_processor->MarkAllSourceFieldsModifiedOnHost();
        output_value_from_generalized_field_processor->SyncAllSourceFieldsHostToDevice();

        // Compute the values of the destination fields from the source fields
        output_value_from_generalized_field_processor->compute_value_from_generalized_field();
        output_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        output_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();
    }

    void CheckDisplacementIsZero() {
        Eigen::Matrix<double, Eigen::Dynamic, 3> displacement_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, {"block_1"}, "displacement_coefficients", aperi::FieldQueryState::NP1);
        EXPECT_NEAR(displacement_np1.norm(), 0.0, 1.0e-10) << "Displacement is not zero";
    }

    void CheckDisplacementIsNonZero() {
        Eigen::Matrix<double, Eigen::Dynamic, 3> displacement_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, {"block_1"}, "displacement_coefficients", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_np1.norm(), 1.0e-10) << "Displacement is zero";
    }

    Eigen::Matrix<double, Eigen::Dynamic, 9> ComputeGreenLagrangeStrain(const Eigen::Matrix<double, Eigen::Dynamic, 9> &displacement_gradient_np1) {
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange(displacement_gradient_np1.rows(), 9);
        for (size_t i = 0; i < displacement_gradient_np1.rows(); ++i) {
            const Eigen::Matrix3d deformationt_gradient_mat = displacement_gradient_np1.row(i).reshaped<Eigen::RowMajor>(3, 3) + Eigen::Matrix3d::Identity();
            const Eigen::Matrix3d right_cauchy_green_mat = deformationt_gradient_mat.transpose() * deformationt_gradient_mat;
            const Eigen::Matrix3d green_lagrange_mat = 0.5 * (right_cauchy_green_mat - Eigen::Matrix3d::Identity());
            green_lagrange.row(i) = green_lagrange_mat.reshaped<Eigen::RowMajor>(1, 9);
        }
        return green_lagrange;
    }

    void TestNoDisplacement() {
        ComputeForce();
        CheckDisplacementIsZero();

        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_NEAR(displacement_gradient_np1.norm(), 0.0, 1.0e-12) << "Displacement gradient is not zero";

        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        EXPECT_NEAR(green_lagrange.norm(), 0.0, 1.0e-12) << "Green Lagrange is not zero";
    }

    /**
     * Check the displacement gradient and Green Lagrange strain for a simple rotation
     * - Sets the displacement to be a simple rotation
     * - Check that the displacement gradient is non-zero after the rotation
     * - Check that the Green Lagrange strain is zero after the rotation
     */
    void TestSimpleRotation() {
        TestNoDisplacement();

        // Create a rotation matrix
        Eigen::Matrix<double, 3, 3> rotation_matrix;
        rotation_matrix << 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0;  // Rotation about z-axis
        Eigen::Vector3d rotation_center = {0.5, 0.5, 0.5};
        RotateDisplacements(*m_mesh_data, m_active_part_names, "displacement_coefficients", rotation_matrix, rotation_center, aperi::FieldQueryState::NP1);
        ComputeForce();
        CheckDisplacementIsNonZero();

        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_gradient_np1.norm(), 1.0e-12) << "Displacement gradient is zero";

        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        EXPECT_NEAR(green_lagrange.norm(), 0.0, 1.0e-12) << "Green Lagrange is not zero";
    }

    /**
     * Check the displacement gradient and Green Lagrange strain for a random displacement
     * - Sets the displacement to be random
     * - Check that the displacement gradient is non-zero after
     * - Check that the Green Lagrange strain is non-zero after
     */
    void TestRandomDisplacement() {
        TestNoDisplacement();

        AddRandomValueToDisplacements(*m_mesh_data, m_active_part_names, "displacement_coefficients", -0.1, 0.1, aperi::FieldQueryState::NP1);

        ComputeForce();
        CheckDisplacementIsNonZero();

        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_gradient_np1.norm(), 1.0e-12) << "Displacement gradient is zero";

        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        EXPECT_GT(green_lagrange.norm(), 1.0e-12) << "Green Lagrange is zero";
    }

    /**
     * Check the displacement gradient and Green Lagrange strain for a linear deformation gradient
     * - Sets the displacement to be a linear deformation gradient
     * - Check that the displacement gradient is non-zero after
     * - Check that the Green Lagrange strain is non-zero after
     */
    void TestLinearDeformationGradient() {
        TestNoDisplacement();

        Eigen::Matrix3d deformation_gradient = GetRandomParallelConsistentMatrix<double, 3, 3>() * 0.1 + Eigen::Matrix3d::Identity();
        ApplyLinearDeformationGradient(*m_mesh_data, m_active_part_names, "displacement_coefficients", deformation_gradient, aperi::FieldQueryState::NP1);

        ComputeForce();
        CheckDisplacementIsNonZero();

        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_gradient_np1.norm(), 1.0e-12) << "Displacement gradient is zero";
        // Check that the displacement gradient is equal to the deformation gradient - identity
        for (size_t i = 0; i < displacement_gradient_np1.rows(); ++i) {
            const Eigen::Matrix3d deformationt_gradient_mat = displacement_gradient_np1.row(i).reshaped<Eigen::RowMajor>(3, 3) + Eigen::Matrix3d::Identity();
            const Eigen::Matrix3d difference = deformationt_gradient_mat - deformation_gradient;
            EXPECT_NEAR(difference.norm(), 0.0, 1.0e-12) << "Displacement gradient is not equal to the deformation gradient - identity for element " << i << " of " << displacement_gradient_np1.rows() - 1;
            if (difference.norm() > 1.0e-12) {
                aperi::CoutP0() << "output deformation_gradient =\n"
                                << deformationt_gradient_mat << std::endl;
                aperi::CoutP0() << "input def_gradient =\n"
                                << deformation_gradient << std::endl;
            }
        }

        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        EXPECT_GT(green_lagrange.norm(), 1.0e-12) << "Green Lagrange is zero";
    }

    /**
     * Check the displacement gradient and Green Lagrange strain for a random displacement then rotation
     * - Sets the displacement to be random
     * - Check that the displacement gradient is non-zero after the rotation
     * - Check that the Green Lagrange strain is non-zero after the rotation
     *
     * - Rigidly rotate the deformed mesh
     * - Check that the displacement gradient is non-zero after the rotation
     * - Check that the Green Lagrange strain is the same after the rotation
     */
    void TestRandomDisplacementThenRotation() {
        TestNoDisplacement();
        TestRandomDisplacement();

        // Get the Green Lagrange strain before rotation
        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange = ComputeGreenLagrangeStrain(displacement_gradient_np1);

        // Rotate
        Eigen::Matrix<double, 3, 3> rotation_matrix;
        rotation_matrix << 0.0, -1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0;  // Rotation about z-axis
        Eigen::Vector3d rotation_center = {0.5, 0.5, 0.5};
        RotateDisplacements(*m_mesh_data, m_active_part_names, "displacement_coefficients", rotation_matrix, rotation_center, aperi::FieldQueryState::NP1);
        ComputeForce();
        CheckDisplacementIsNonZero();

        displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_gradient_np1.norm(), 1.0e-12) << "Displacement gradient is zero";

        Eigen::Matrix<double, Eigen::Dynamic, 9> new_green_lagrange = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange_diff = new_green_lagrange - green_lagrange;
        EXPECT_NEAR(green_lagrange_diff.norm(), 0.0, 1.0e-12) << "Green Lagrange difference after rotation is not zero";
    }

    size_t m_num_nodes_x = 2;
    size_t m_num_nodes_y = 2;
    size_t m_num_nodes_z = 5;  // 4 was causing issues with 4 procs as 1 proc was getting cells
    std::vector<std::string> m_part_names = {"block_1"};
    std::vector<std::string> m_active_part_names = {"block_1_active"};

    std::shared_ptr<aperi::ComputeInternalForceSmoothedCell> m_compute_force;
    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;
    std::shared_ptr<aperi::SmoothedCellDataProcessor> m_strain_smoothing_processor;
    std::shared_ptr<aperi::SmoothedQuadratureHex8> m_smoothed_quadrature_host_functor;
    std::shared_ptr<aperi::Material> m_material;
};