#pragma once

#include <gtest/gtest.h>
#include <yaml-cpp/yaml.h>

#include <string>

#include "ComputeInternalForceSmoothedCell.h"
#include "Constants.h"
#include "Field.h"
#include "FieldData.h"
#include "FieldUtils.h"
#include "FunctionEvaluationProcessor.h"
#include "LogUtils.h"
#include "Materials/Base.h"
#include "Materials/Factory.h"
#include "MeshLabelerTestFixture.h"
#include "Preprocessor.h"
#include "QuadratureSmoothed.h"
#include "SmoothedCellDataProcessor.h"
#include "Types.h"
#include "UnitTestNodalMeshUtils.h"

class KinematicsTestFixture : public MeshLabelerTestFixture {
   protected:
    void SetUp() override {
        // Run MeshLabelerTestFixture::SetUp first
        MeshLabelerTestFixture::SetUp();

        // Skip this test if we have more than 4 processes
        if (m_num_procs > 4) {
            GTEST_SKIP() << "This test is only valid for 4 or fewer processes.";
        }

        // Set the rotation center
        m_rotation_center << -0.4, 1.3, 2.6;

        // Set the rotation matrix using an axis-angle representation
        Eigen::Vector3d rotation_axis(-0.3, 0.5, 0.8);
        rotation_axis.normalize();           // Normalize the axis
        double rotation_angle = M_PI / 3.0;  // 60 degrees in radians
        m_rotation_matrix = Eigen::AngleAxisd(rotation_angle, rotation_axis).toRotationMatrix();
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

    void UpdateShapeFunctions(const aperi::LagrangianFormulationType &lagrangian_formulation_type, bool check_for_new_shape_functions, bool use_one_pass_method) {
        // Get the current shape functions
        Eigen::Matrix<double, Eigen::Dynamic, aperi::MAX_NODE_NUM_NEIGHBORS> shape_functions_in = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, aperi::MAX_NODE_NUM_NEIGHBORS>(*m_mesh_data, {"block_1"}, "function_values", aperi::FieldQueryState::None, false /*parallel_communicate*/);

        // Compute the shape functions
        ComputeReproducingKernelShapeFunctions(m_mesh_data, m_part_names, lagrangian_formulation_type);

        // Check that the shape functions are different
        if (check_for_new_shape_functions) {
            Eigen::Matrix<double, Eigen::Dynamic, aperi::MAX_NODE_NUM_NEIGHBORS> shape_functions_out = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, aperi::MAX_NODE_NUM_NEIGHBORS>(*m_mesh_data, {"block_1"}, "function_values", aperi::FieldQueryState::None, false /*parallel_communicate*/);
            EXPECT_GT((shape_functions_out - shape_functions_in).norm(), 1e-10) << "Shape functions should be different after recomputing.";
        }

        m_strain_smoothing_processor->ComputeFunctionDerivatives<aperi::HEX8_NUM_NODES>(*m_smoothed_quadrature_host_functor.get(), use_one_pass_method);
    }

    void SetupReproducingKernel(aperi::LagrangianFormulationType lagrangian_formulation_type, double support_scale, size_t num_subcells, bool activate_center_node, bool use_f_bar, bool element_integration) {
        ASSERT_NE(lagrangian_formulation_type, aperi::LagrangianFormulationType::Semi);  // Semi Lagrangian is not supported in this test fixture
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
        // Use updated lagrangian formulation type to get fields. It will give extra field for total lagrangian that we will use here.
        std::vector<aperi::FieldData> extra_fields = aperi::GetFieldData(uses_generalized_fields, use_strain_smoothing, aperi::LagrangianFormulationType::Updated, use_one_pass_method);
        if (use_f_bar) {
            extra_fields.push_back(aperi::FieldData("displacement_gradient_bar", aperi::FieldDataRank::TENSOR, aperi::FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
            extra_fields.push_back(aperi::FieldData("pk1_stress_bar", aperi::FieldDataRank::TENSOR, aperi::FieldDataTopologyRank::ELEMENT, 2, std::vector<double>{}));
        }
        // Add the generalized current coordinates fields which is needed for the random tests
        extra_fields.push_back(aperi::FieldData("generalized_current_coordinates_np1", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, 1, std::vector<double>{}));
        extra_fields.push_back(aperi::FieldData("generalized_current_coordinates_n", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, 1, std::vector<double>{}));
        extra_fields.push_back(aperi::FieldData("temp", aperi::FieldDataRank::VECTOR, aperi::FieldDataTopologyRank::NODE, 1, std::vector<double>{}));

        AddFieldsAndCreateMeshLabeler(extra_fields);
        if (element_integration) {
            LabelGeneratedElementMesh(m_mesh_data, num_subcells);
        } else {
            LabelGeneratedNodalMesh(m_mesh_data, num_subcells, activate_center_node);
        }

        // Also use updated lagrangian formulation type to set the fields
        SetFieldDataForLagrangianFormulation(m_mesh_data, aperi::LagrangianFormulationType::Updated);
        aperi::Field<double> coordinates_field(m_mesh_data, aperi::FieldQueryData<double>{m_mesh_data->GetCoordinatesFieldName(), aperi::FieldQueryState::None});
        aperi::Field<double> generalized_current_coordinates_n_field(m_mesh_data, aperi::FieldQueryData<double>{"generalized_current_coordinates_n", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
        aperi::Field<double> generalized_current_coordinates_np1_field(m_mesh_data, aperi::FieldQueryData<double>{"generalized_current_coordinates_np1", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
        aperi::CopyField(coordinates_field, generalized_current_coordinates_n_field);
        aperi::CopyField(coordinates_field, generalized_current_coordinates_np1_field);

        SetMaxEdgeLengthAndFindNeighbors(m_mesh_data, m_part_names, {support_scale});

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

        // Update the shape functions
        UpdateShapeFunctions(lagrangian_formulation_type, false /*check for new shape functions*/, use_one_pass_method);
    }

    void SetupNodalReproducingKernel(aperi::LagrangianFormulationType lagrangian_formulation_type, double support_scale = 1.1, size_t num_subcells = 1, bool activate_center_node = false, bool use_f_bar = false) {
        SetupReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar, false);
    }

    void SetupElementReproducingKernel(aperi::LagrangianFormulationType lagrangian_formulation_type, double support_scale = 1.1, size_t num_subcells = 1, bool activate_center_node = false, bool use_f_bar = false) {
        SetupReproducingKernel(lagrangian_formulation_type, support_scale, num_subcells, activate_center_node, use_f_bar, true);
    }

    void ComputeFunctionValues(std::string source_field_name, aperi::FieldQueryState source_field_state, std::string dest_field_name, aperi::FieldQueryState dest_field_state) {
        constexpr size_t num_fields = 1;
        std::array<aperi::FieldQueryData<double>, num_fields> src_field_query_data;
        src_field_query_data[0] = {source_field_name, source_field_state};

        std::array<aperi::FieldQueryData<double>, num_fields> dest_field_query_data;
        dest_field_query_data[0] = {dest_field_name, dest_field_state};
        auto output_value_from_generalized_field_processor = std::make_shared<aperi::FunctionEvaluationProcessor<num_fields>>(src_field_query_data, dest_field_query_data, m_mesh_data, m_part_names);
        output_value_from_generalized_field_processor->SyncAllSourceFieldsDeviceToHost();
        output_value_from_generalized_field_processor->CommunicateAllSourceFieldData();
        output_value_from_generalized_field_processor->MarkAllSourceFieldsModifiedOnHost();
        output_value_from_generalized_field_processor->SyncAllSourceFieldsHostToDevice();

        // Compute the values of the destination fields from the source fields
        output_value_from_generalized_field_processor->ComputeValues();
        output_value_from_generalized_field_processor->MarkAllDestinationFieldsModifiedOnDevice();
        output_value_from_generalized_field_processor->SyncAllDestinationFieldsDeviceToHost();
    }

    void UpdateDisplacementsAndCoordinates() {
        // Compute the physical displacement increment field from the generalized displacement coefficients
        ComputeFunctionValues("displacement_coefficients_inc", aperi::FieldQueryState::None, "displacement_inc", aperi::FieldQueryState::None);
        // Compute the displacement coefficients field from the generalized displacement coefficients. The coefficients are already in the NP1 state so displacement will be in the NP1 state.
        ComputeFunctionValues("displacement_coefficients", aperi::FieldQueryState::NP1, "displacement", aperi::FieldQueryState::None);
        aperi::Field<double> displacement_inc_field(m_mesh_data, aperi::FieldQueryData<double>{"displacement_inc", aperi::FieldQueryState::None});
        aperi::Field<double> current_coordinates_n_field(m_mesh_data, aperi::FieldQueryData<double>{"current_coordinates_n", aperi::FieldQueryState::None});
        aperi::Field<double> current_coordinates_np1_field(m_mesh_data, aperi::FieldQueryData<double>{"current_coordinates_np1", aperi::FieldQueryState::None});
        aperi::SwapFields(current_coordinates_n_field, current_coordinates_np1_field);

        // Update the current coordinates field
        aperi::AXPBYZField(1.0, current_coordinates_n_field, 1.0, displacement_inc_field, current_coordinates_np1_field);

        // Swap the generalized current coordinates fields
        aperi::Field<double> generalized_current_coordinates_n_field(m_mesh_data, aperi::FieldQueryData<double>{"generalized_current_coordinates_n", aperi::FieldQueryState::None});
        aperi::Field<double> generalized_current_coordinates_np1_field(m_mesh_data, aperi::FieldQueryData<double>{"generalized_current_coordinates_np1", aperi::FieldQueryState::None});
        aperi::SwapFields(generalized_current_coordinates_n_field, generalized_current_coordinates_np1_field);

        // Mark the fields as modified on device
        current_coordinates_np1_field.MarkModifiedOnDevice();
        current_coordinates_np1_field.Communicate();
    }

    void PrepareForNextIncrement(aperi::LagrangianFormulationType lagrangian_formulation_type, bool check_for_new_shape_functions = false) {
        if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated) {
            UpdateShapeFunctions(lagrangian_formulation_type, check_for_new_shape_functions, true /*use one pass method*/);
        } else if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Incremental) {
            aperi::Field<aperi::Unsigned> num_neighbors_field(m_mesh_data, aperi::FieldQueryData<aperi::Unsigned>{"num_neighbors", aperi::FieldQueryState::None, aperi::FieldDataTopologyRank::NODE});
            aperi::Selector selector = aperi::Selector(m_part_names, m_mesh_data.get(), aperi::SelectorOwnership::OWNED);
            aperi::AddValue(num_neighbors_field, -3, selector);  // Decrement the number of neighbors
            UpdateShapeFunctions(lagrangian_formulation_type, check_for_new_shape_functions, true /*use one pass method*/);
        }
        m_mesh_data->UpdateFieldDataStates(true /*rotate device state*/);
    }

    void ComputeIncrement() {
        // Set the displacement coefficients fields. Really just needed for total lagrangian, but we set them for all formulations for consistency.
        aperi::Field<double> displacement_coefficients_field_n(m_mesh_data, aperi::FieldQueryData<double>{"displacement_coefficients", aperi::FieldQueryState::N});
        aperi::Field<double> displacement_coefficients_field_np1(m_mesh_data, aperi::FieldQueryData<double>{"displacement_coefficients", aperi::FieldQueryState::NP1});
        aperi::Field<double> displacement_coefficients_inc_field(m_mesh_data, aperi::FieldQueryData<double>{"displacement_coefficients_inc", aperi::FieldQueryState::None});
        aperi::Field<double> generalized_current_coordinates_n_field(m_mesh_data, aperi::FieldQueryData<double>{"generalized_current_coordinates_n", aperi::FieldQueryState::None});
        aperi::Field<double> generalized_current_coordinates_np1_field(m_mesh_data, aperi::FieldQueryData<double>{"generalized_current_coordinates_np1", aperi::FieldQueryState::None});

        // Set the displacement np1 field to be the sum of the displacement n and the increment
        aperi::AXPBYZField(1.0, displacement_coefficients_field_n, 1.0, displacement_coefficients_inc_field, displacement_coefficients_field_np1, m_active_part_names);

        // Set the generalized current coordinates np1 field to be the sum of the generalized current coordinates n and the displacement coefficients increment
        aperi::AXPBYZField(1.0, generalized_current_coordinates_n_field, 1.0, displacement_coefficients_inc_field, generalized_current_coordinates_np1_field, m_active_part_names);

        // Mark the fields as modified on device
        displacement_coefficients_field_np1.MarkModifiedOnDevice();
        generalized_current_coordinates_np1_field.MarkModifiedOnDevice();
        displacement_coefficients_field_np1.Communicate();
        generalized_current_coordinates_np1_field.Communicate();

        m_compute_force->UpdateFields();  // Updates the ngp fields
        m_compute_force->SetTimeIncrement(1.0e-6);
        m_compute_force->ForEachCellComputeForce(*m_smoothed_cell_data);
        m_compute_force->MarkFieldsModifiedOnDevice();
        m_strain_smoothing_processor->PopulateElementOutputs();
        UpdateDisplacementsAndCoordinates();
    }

    void CheckDisplacementIsZero() {
        Eigen::Matrix<double, Eigen::Dynamic, 3> displacement_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, {"block_1"}, "displacement", aperi::FieldQueryState::NP1);
        EXPECT_NEAR(displacement_np1.norm(), 0.0, 1.0e-10) << "Displacement is not zero";
    }

    void CheckDisplacementIsNonZero() {
        Eigen::Matrix<double, Eigen::Dynamic, 3> displacement_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, {"block_1"}, "displacement", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_np1.norm(), 1.0e-10) << "Displacement is zero";
    }

    Eigen::Matrix<double, Eigen::Dynamic, 9> ComputeGreenLagrangeStrain(const Eigen::Matrix<double, Eigen::Dynamic, 9> &displacement_gradient_np1) {
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange(displacement_gradient_np1.rows(), 9);
        for (size_t i = 0, e = displacement_gradient_np1.rows(); i < e; ++i) {
            const Eigen::Matrix<double, 1, 9> &displacement_gradient_row = displacement_gradient_np1.row(i);
            const Eigen::Matrix3d deformation_gradient_mat = displacement_gradient_row.reshaped<Eigen::RowMajor>(3, 3) + Eigen::Matrix3d::Identity();
            const Eigen::Matrix3d right_cauchy_green_mat = deformation_gradient_mat.transpose() * deformation_gradient_mat;
            const Eigen::Matrix3d green_lagrange_mat = 0.5 * (right_cauchy_green_mat - Eigen::Matrix3d::Identity());
            green_lagrange.row(i) = green_lagrange_mat.reshaped<Eigen::RowMajor>(1, 9);
        }
        return green_lagrange;
    }

    void TestNoDisplacement() {
        ComputeIncrement();
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
    void TestSimpleRotation(aperi::LagrangianFormulationType lagrangian_formulation_type) {
        TestNoDisplacement();
        PrepareForNextIncrement(lagrangian_formulation_type);

        aperi::FieldQueryData<double> mesh_coordinates_field_query_data{"current_coordinates_np1", aperi::FieldQueryState::None};
        aperi::FieldQueryData<double> displacement_inc_field_query_data{"displacement_coefficients_inc", aperi::FieldQueryState::None};
        SetRotationIncrement(*m_mesh_data, m_active_part_names, mesh_coordinates_field_query_data, displacement_inc_field_query_data, m_rotation_matrix, m_rotation_center);
        ComputeIncrement();
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
    void TestRandomDisplacement(aperi::LagrangianFormulationType lagrangian_formulation_type, bool check_original_state = true) {
        if (check_original_state) {
            TestNoDisplacement();
            PrepareForNextIncrement(lagrangian_formulation_type);
        }

        aperi::FieldQueryData<double> displacement_inc_field_query_data{"displacement_coefficients_inc", aperi::FieldQueryState::None};
        SetRandomIncrement(*m_mesh_data, m_active_part_names, displacement_inc_field_query_data, -0.1, 0.1);

        ComputeIncrement();
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
    Eigen::Matrix3d TestLinearDeformationGradient(aperi::LagrangianFormulationType lagrangian_formulation_type, bool check_original_state = true, const Eigen::Matrix3d &previous_deformation_gradient = Eigen::Matrix3d::Identity()) {
        if (check_original_state) {
            TestNoDisplacement();
            PrepareForNextIncrement(lagrangian_formulation_type);
        }

        Eigen::Matrix3d deformation_gradient = GetRandomParallelConsistentMatrix<double, 3, 3>() * 0.1 + Eigen::Matrix3d::Identity();
        aperi::FieldQueryData<double> mesh_coordinates_field_query_data{"current_coordinates_np1", aperi::FieldQueryState::None};
        aperi::FieldQueryData<double> displacement_inc_field_query_data{"displacement_coefficients_inc", aperi::FieldQueryState::None};
        SetLinearDeformationIncrement(*m_mesh_data, m_active_part_names, mesh_coordinates_field_query_data, displacement_inc_field_query_data, deformation_gradient);

        ComputeIncrement();
        CheckDisplacementIsNonZero();

        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_gradient_np1.norm(), 1.0e-12) << "Displacement gradient is zero";

        std::ostringstream oss;
        bool has_failure = false;
        // Check that the displacement gradient is equal to the deformation gradient - identity
        for (size_t i = 0, e = displacement_gradient_np1.rows(); i < e; ++i) {
            const Eigen::Matrix<double, 1, 9> deformation_gradient_row = displacement_gradient_np1.row(i);
            const Eigen::Matrix3d deformation_gradient_mat = deformation_gradient_row.reshaped<Eigen::RowMajor>(3, 3) + Eigen::Matrix3d::Identity();
            const Eigen::Matrix3d difference = deformation_gradient_mat - deformation_gradient * previous_deformation_gradient;
            double norm_difference = difference.norm();
            if (norm_difference > 1.0e-12) {
                has_failure = true;
                oss << "Displacement gradient is not equal to the deformation gradient - identity for element " << i << " of " << displacement_gradient_np1.rows() - 1 << std::endl
                    << "Norm difference for element " << i << " is: " << norm_difference << std::endl
                    << "Expected deformation gradient = " << (deformation_gradient * previous_deformation_gradient).reshaped<Eigen::RowMajor>(1, 9) << std::endl
                    << "Output deformation gradient =   " << deformation_gradient_mat.reshaped<Eigen::RowMajor>(1, 9) << std::endl
                    << "Increment deformation gradient = " << deformation_gradient.reshaped<Eigen::RowMajor>(1, 9) << std::endl
                    << "Previous deformation gradient =  " << previous_deformation_gradient.reshaped<Eigen::RowMajor>(1, 9) << std::endl;
            }
        }
        // Parallel check for failures
        bool global_failure;
        MPI_Allreduce(&has_failure, &global_failure, 1, MPI_C_BOOL, MPI_LOR, MPI_COMM_WORLD);
        EXPECT_FALSE(global_failure);
        if (global_failure) {
            std::string error_message = oss.str();
            aperi::Cout() << error_message << std::endl;
        }

        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        EXPECT_GT(green_lagrange.norm(), 1.0e-12) << "Green Lagrange is zero";

        return deformation_gradient * previous_deformation_gradient;
    }

    void TestLinearDeformationGradientMultipleIncrements(aperi::LagrangianFormulationType lagrangian_formulation_type) {
        TestNoDisplacement();
        PrepareForNextIncrement(lagrangian_formulation_type);
        Eigen::Matrix3d previous_deformation_gradient = TestLinearDeformationGradient(lagrangian_formulation_type, false);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);
        previous_deformation_gradient = TestLinearDeformationGradient(lagrangian_formulation_type, false, previous_deformation_gradient);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);
        previous_deformation_gradient = TestLinearDeformationGradient(lagrangian_formulation_type, false, previous_deformation_gradient);
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
    void TestRandomDisplacementThenRotation(aperi::LagrangianFormulationType lagrangian_formulation_type) {
        TestNoDisplacement();
        PrepareForNextIncrement(lagrangian_formulation_type);
        TestRandomDisplacement(lagrangian_formulation_type, false);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);
        TestRandomDisplacement(lagrangian_formulation_type, false);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);
        TestRandomDisplacement(lagrangian_formulation_type, false);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);

        // Get the Green Lagrange strain before rotation (state has already been updated)
        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_n = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::N);
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange_n = ComputeGreenLagrangeStrain(displacement_gradient_n);

        // Set the rotation increment
        aperi::FieldQueryData<double> mesh_coordinates_field_query_data{"current_coordinates_np1", aperi::FieldQueryState::None};
        aperi::FieldQueryData<double> displacement_inc_field_query_data{"displacement_coefficients_inc", aperi::FieldQueryState::None};
        SetRotationIncrement(*m_mesh_data, m_active_part_names, mesh_coordinates_field_query_data, displacement_inc_field_query_data, m_rotation_matrix, m_rotation_center);

        // Get the expected coordinates after rotation
        Eigen::Matrix<double, Eigen::Dynamic, 3> expected_coordinates_np2 = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, m_active_part_names, "current_coordinates_np1", aperi::FieldQueryState::None) + GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, m_active_part_names, "displacement_coefficients_inc", aperi::FieldQueryState::None);

        // Recaculate the rotation increment if the lagrangian formulation type is Total or Incremental
        if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Total || lagrangian_formulation_type == aperi::LagrangianFormulationType::Incremental) {
            mesh_coordinates_field_query_data = aperi::FieldQueryData<double>{"generalized_current_coordinates_n", aperi::FieldQueryState::None};
            SetRotationIncrement(*m_mesh_data, m_active_part_names, mesh_coordinates_field_query_data, displacement_inc_field_query_data, m_rotation_matrix, m_rotation_center);
        }

        ComputeIncrement();
        CheckDisplacementIsNonZero();

        // Check that the coordinates after rotation match the expected coordinates
        Eigen::Matrix<double, Eigen::Dynamic, 3> actual_coordinates_np2 = GetEntityFieldValues<aperi::FieldDataTopologyRank::NODE, double, 3>(*m_mesh_data, m_active_part_names, "current_coordinates_np1", aperi::FieldQueryState::None);
        EXPECT_LT((expected_coordinates_np2 - actual_coordinates_np2).norm(), 1.0e-12) << "Coordinates after rotation do not match expected coordinates.";

        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_gradient_np1.norm(), 1.0e-12) << "Displacement gradient is zero";

        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange_np1 = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange_diff = green_lagrange_np1 - green_lagrange_n;
        EXPECT_NEAR(green_lagrange_diff.norm(), 0.0, 1.0e-12) << "Green Lagrange difference after rotation is not zero."
                                                              << "\nGreen Lagrange with rotation norm:\n"
                                                              << green_lagrange_np1
                                                              << "\nGreen Lagrange without rotation norm:\n"
                                                              << green_lagrange_n;
    }

    void TestLinearDeformationGradientThenRotation(aperi::LagrangianFormulationType lagrangian_formulation_type) {
        TestNoDisplacement();
        PrepareForNextIncrement(lagrangian_formulation_type);
        Eigen::Matrix3d previous_deformation_gradient = TestLinearDeformationGradient(lagrangian_formulation_type, false);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);
        previous_deformation_gradient = TestLinearDeformationGradient(lagrangian_formulation_type, false, previous_deformation_gradient);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);
        previous_deformation_gradient = TestLinearDeformationGradient(lagrangian_formulation_type, false, previous_deformation_gradient);
        PrepareForNextIncrement(lagrangian_formulation_type, true /*check for new shape functions*/);

        // Get the Green Lagrange strain before rotation (state has already been updated)
        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_n = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::N);
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange_n = ComputeGreenLagrangeStrain(displacement_gradient_n);

        // Rotate
        aperi::FieldQueryData<double> mesh_coordinates_field_query_data{"current_coordinates_np1", aperi::FieldQueryState::None};
        aperi::FieldQueryData<double> displacement_inc_field_query_data{"displacement_coefficients_inc", aperi::FieldQueryState::None};
        SetRotationIncrement(*m_mesh_data, m_active_part_names, mesh_coordinates_field_query_data, displacement_inc_field_query_data, m_rotation_matrix, m_rotation_center);
        ComputeIncrement();
        CheckDisplacementIsNonZero();

        Eigen::Matrix<double, Eigen::Dynamic, 9> displacement_gradient_np1 = GetEntityFieldValues<aperi::FieldDataTopologyRank::ELEMENT, double, 9>(*m_mesh_data, {"block_1"}, "displacement_gradient", aperi::FieldQueryState::NP1);
        EXPECT_GT(displacement_gradient_np1.norm(), 1.0e-12) << "Displacement gradient is zero";

        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange_np1 = ComputeGreenLagrangeStrain(displacement_gradient_np1);
        Eigen::Matrix<double, Eigen::Dynamic, 9> green_lagrange_diff = green_lagrange_np1 - green_lagrange_n;
        EXPECT_NEAR(green_lagrange_diff.norm(), 0.0, 1.0e-12) << "Green Lagrange difference after rotation is not zero."
                                                              << "\nGreen Lagrange with rotation:\n"
                                                              << green_lagrange_n.row(0)
                                                              << "\nGreen Lagrange without rotation:\n"
                                                              << green_lagrange_np1.row(0);
    }

    size_t m_num_nodes_x = 2;
    size_t m_num_nodes_y = 2;
    size_t m_num_nodes_z = 5;  // 4 was causing issues with 4 procs as 1 proc was getting cells
    std::vector<std::string> m_part_names = {"block_1"};
    std::vector<std::string> m_active_part_names = {"block_1_active"};
    Eigen::Vector3d m_rotation_center;
    Eigen::Matrix3d m_rotation_matrix;

    std::shared_ptr<aperi::ComputeInternalForceSmoothedCell> m_compute_force;
    std::shared_ptr<aperi::SmoothedCellData> m_smoothed_cell_data;
    std::shared_ptr<aperi::SmoothedCellDataProcessor> m_strain_smoothing_processor;
    std::shared_ptr<aperi::SmoothedQuadratureHex8> m_smoothed_quadrature_host_functor;
    std::shared_ptr<aperi::Material> m_material;
};