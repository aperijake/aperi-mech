#pragma once

#include <memory>
#include <stdexcept>
#include <string>

#include "Constants.h"
#include "IoInputFile.h"
#include "LogUtils.h"
#include "Materials/Base.h"
#include "Materials/Factory.h"
#include "MeshData.h"
#include "MeshLabelerParameters.h"

namespace aperi {

class ApproximationSpaceParameters {
   public:
    ApproximationSpaceParameters() = default;

    virtual ~ApproximationSpaceParameters() = default;

    virtual double GetKernelRadiusScaleFactor() const {
        throw std::runtime_error("Kernel radius scale factor not supported for this approximation space");
    }

    ApproximationSpaceType GetApproximationSpaceType() const {
        return approximation_space_type;
    }

    std::string GetApproximationSpace() const {
        return approximation_space;
    }

    bool UsesGeneralizedFields() const {
        return uses_generalized_fields;
    }

   protected:
    std::string approximation_space = "finite_element";
    bool uses_generalized_fields = false;
    ApproximationSpaceType approximation_space_type = ApproximationSpaceType::FiniteElement;
};

class ApproximationSpaceFiniteElementParameters : public ApproximationSpaceParameters {
   public:
    ApproximationSpaceFiniteElementParameters() {
        approximation_space = "finite_element";
        approximation_space_type = ApproximationSpaceType::FiniteElement;
    }
    ApproximationSpaceFiniteElementParameters(const YAML::Node& /*finite_element_node*/) {
        approximation_space = "finite_element";
        approximation_space_type = ApproximationSpaceType::FiniteElement;
    }
    virtual ~ApproximationSpaceFiniteElementParameters() = default;
};

class ApproximationSpaceReproducingKernelParameters : public ApproximationSpaceParameters {
   public:
    ApproximationSpaceReproducingKernelParameters() {
        approximation_space = "reproducing_kernel";
        uses_generalized_fields = true;
        approximation_space_type = ApproximationSpaceType::ReproducingKernel;
    }
    ApproximationSpaceReproducingKernelParameters(double kernel_radius_scale_factor) : kernel_radius_scale_factor(kernel_radius_scale_factor) {
        approximation_space = "reproducing_kernel";
        uses_generalized_fields = true;
        approximation_space_type = ApproximationSpaceType::ReproducingKernel;
    }
    ApproximationSpaceReproducingKernelParameters(const YAML::Node& reproduction_kernel_node) {
        approximation_space = "reproducing_kernel";
        uses_generalized_fields = true;
        approximation_space_type = ApproximationSpaceType::ReproducingKernel;
        kernel_radius_scale_factor = reproduction_kernel_node["kernel_radius_scale_factor"].as<double>();
    }

    virtual ~ApproximationSpaceReproducingKernelParameters() = default;

    double GetKernelRadiusScaleFactor() const override {
        return kernel_radius_scale_factor;
    }

   protected:
    double kernel_radius_scale_factor = 0.03;
};

inline std::shared_ptr<ApproximationSpaceParameters> CreateApproximationSpace(const YAML::Node& approximation_space_node) {
    if (approximation_space_node["finite_element"]) {
        return std::make_shared<ApproximationSpaceFiniteElementParameters>(approximation_space_node["finite_element"]);
    } else if (approximation_space_node["reproducing_kernel"]) {
        return std::make_shared<ApproximationSpaceReproducingKernelParameters>(approximation_space_node["reproducing_kernel"]);
    } else {
        throw std::runtime_error("Unsupported approximation space");
    }
}

class IntegrationSchemeParameters {
   public:
    IntegrationSchemeParameters() = default;

    virtual ~IntegrationSchemeParameters() = default;

    virtual int GetIntegrationOrder() const {
        throw std::runtime_error("Integration order not supported for this integration scheme");
    }

    IntegrationSchemeType GetIntegrationSchemeType() const {
        return integration_scheme_type;
    }

    std::string GetIntegrationScheme() const {
        return integration_scheme;
    }

    bool UsesOnePassMethod() const {
        return uses_one_pass_method;
    }

    bool UsesFBar() const {
        return uses_f_bar;
    }

   protected:
    std::string integration_scheme = "gauss_quadrature";
    IntegrationSchemeType integration_scheme_type = IntegrationSchemeType::GaussQuadrature;
    bool uses_one_pass_method = true;
    bool uses_f_bar = false;
};

class IntegrationSchemeGaussQuadratureParameters : public IntegrationSchemeParameters {
   public:
    IntegrationSchemeGaussQuadratureParameters() {
        integration_scheme = "gauss_quadrature";
        integration_scheme_type = IntegrationSchemeType::GaussQuadrature;
    }

    IntegrationSchemeGaussQuadratureParameters(const YAML::Node& gauss_quadrature_node) {
        integration_scheme = "gauss_quadrature";
        integration_scheme_type = IntegrationSchemeType::GaussQuadrature;
        integration_order = gauss_quadrature_node["integration_order"].as<int>();
        if (gauss_quadrature_node["force_one_pass_method"] || gauss_quadrature_node["force_two_pass_method"]) {
            // Print a warning that these do not apply to Gauss Quadrature
            aperi::CoutP0() << "Warning: 'force_one_pass_method' and 'force_two_pass_method' do not apply to Gauss Quadrature" << std::endl;
        }
    }

    virtual ~IntegrationSchemeGaussQuadratureParameters() = default;

    int GetIntegrationOrder() const override {
        return integration_order;
    }

   protected:
    int integration_order = 1;
};

class IntegrationSchemeStrainSmoothingParameters : public IntegrationSchemeParameters {
   public:
    IntegrationSchemeStrainSmoothingParameters(bool use_one_pass_method_in = true) {
        integration_scheme = "strain_smoothing";
        integration_scheme_type = IntegrationSchemeType::StrainSmoothing;
        uses_one_pass_method = use_one_pass_method_in;
    }
    IntegrationSchemeStrainSmoothingParameters(const YAML::Node& strain_smoothing_node) {
        integration_scheme = "strain_smoothing";
        integration_scheme_type = IntegrationSchemeType::StrainSmoothing;
        uses_one_pass_method = true;  // Default to one pass method, default for nodal smoothing

        // If the strain smoothing node has a "element_smoothing_cell" key, then it is a two pass method
        if (strain_smoothing_node["element_smoothing_cell"]) {
            uses_one_pass_method = false;
        }

        // If the strain smoothing node has a "force_one_pass_method" or "force_two_pass_method" key, then force the method
        bool force_one_pass = false;
        bool force_two_pass = false;
        if (strain_smoothing_node["force_one_pass_method"]) {
            force_one_pass = strain_smoothing_node["force_one_pass_method"].as<bool>();
            if (force_one_pass) {
                uses_one_pass_method = true;
            }
        }
        if (strain_smoothing_node["force_two_pass_method"]) {
            force_two_pass = strain_smoothing_node["force_two_pass_method"].as<bool>();
            if (force_two_pass) {
                uses_one_pass_method = false;
            }
        }
        if (force_one_pass && force_two_pass) {
            throw std::runtime_error("Cannot force both one pass and two pass methods");
        }

        if (strain_smoothing_node["use_f_bar"]) {
            uses_f_bar = strain_smoothing_node["use_f_bar"].as<bool>();
        }
    }
    virtual ~IntegrationSchemeStrainSmoothingParameters() = default;
};

inline std::shared_ptr<IntegrationSchemeParameters> CreateIntegrationScheme(const YAML::Node& integration_scheme_node) {
    if (integration_scheme_node["gauss_quadrature"]) {
        return std::make_shared<IntegrationSchemeGaussQuadratureParameters>(integration_scheme_node["gauss_quadrature"]);
    } else if (integration_scheme_node["strain_smoothing"]) {
        return std::make_shared<IntegrationSchemeStrainSmoothingParameters>(integration_scheme_node["strain_smoothing"]);
    } else {
        throw std::runtime_error("Unsupported integration scheme");
    }
}

struct InternalForceContributionParameters {
    // Default constructor
    InternalForceContributionParameters() = default;

    // Constructor using YAML node
    InternalForceContributionParameters(const YAML::Node& part, const std::shared_ptr<IoInputFile>& io_input_file, std::shared_ptr<aperi::MeshData> input_mesh_data) {
        YAML::Node material_node = io_input_file->GetMaterialFromPart(part);
        material = CreateMaterial(material_node);
        mesh_data = input_mesh_data;
        part_name = part["set"].as<std::string>();
        if (part["formulation"] && part["formulation"]["approximation_space"]) {
            approximation_space_parameters = CreateApproximationSpace(part["formulation"]["approximation_space"]);
        } else {
            approximation_space_parameters = std::make_shared<ApproximationSpaceFiniteElementParameters>();
        }
        if (part["formulation"] && part["formulation"]["integration_scheme"]) {
            integration_scheme_parameters = CreateIntegrationScheme(part["formulation"]["integration_scheme"]);
        } else {
            integration_scheme_parameters = std::make_shared<IntegrationSchemeGaussQuadratureParameters>();
        }
        if (part["formulation"]) {
            mesh_labeler_parameters = MeshLabelerParameters(part);
        }
    }

    virtual ~InternalForceContributionParameters() = default;

    std::shared_ptr<Material> material = nullptr;
    std::shared_ptr<aperi::MeshData> mesh_data = nullptr;
    std::string part_name = "";
    std::shared_ptr<ApproximationSpaceParameters> approximation_space_parameters = nullptr;
    std::shared_ptr<IntegrationSchemeParameters> integration_scheme_parameters = nullptr;
    LagrangianFormulationType lagrangian_formulation_type = LagrangianFormulationType::Total;
    MeshLabelerParameters mesh_labeler_parameters;
};

}  // namespace aperi
