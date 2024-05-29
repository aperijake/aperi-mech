#pragma once

#include <memory>
#include <stdexcept>
#include <string>

#include "IoInputFile.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

enum class ApproximationSpaceType { FiniteElement, ReproducingKernel };
enum class IntegrationSchemeType { GaussQuadrature, StrainSmoothing };

class ApproximationSpaceParameters {
   public:
    ApproximationSpaceParameters(std::string approximation_space = "finite_element") : approximation_space(approximation_space) {
        if (approximation_space == "finite_element") {
            approximation_space_type = ApproximationSpaceType::FiniteElement;
        } else if (approximation_space == "reproducing_kernel") {
            approximation_space_type = ApproximationSpaceType::ReproducingKernel;
        } else {
            throw std::runtime_error("Unsupported approximation space");
        }
    }

    virtual double GetKernelRadiusScaleFactor() const {
        throw std::runtime_error("Kernel radius scale factor not supported for this approximation space");
    }

    ApproximationSpaceType GetApproximationSpaceType() const {
        return approximation_space_type;
    }

    std::string GetApproximationSpace() const {
        return approximation_space;
    }

   protected:
    std::string approximation_space = "finite_element";
    ApproximationSpaceType approximation_space_type = ApproximationSpaceType::FiniteElement;
};

class ApproximationSpaceFiniteElementParameters : public ApproximationSpaceParameters {
   public:
    ApproximationSpaceFiniteElementParameters() : ApproximationSpaceParameters("finite_element") {}
    ApproximationSpaceFiniteElementParameters(const YAML::Node& finite_element_node) : ApproximationSpaceParameters("finite_element") {}
};

class ApproximationSpaceReproducingKernelParameters : public ApproximationSpaceParameters {
   public:
    ApproximationSpaceReproducingKernelParameters() : ApproximationSpaceParameters("reproducing_kernel") {}
    ApproximationSpaceReproducingKernelParameters(double kernel_radius_scale_factor) : ApproximationSpaceParameters("reproducing_kernel"), kernel_radius_scale_factor(kernel_radius_scale_factor) {}
    ApproximationSpaceReproducingKernelParameters(const YAML::Node& reproduction_kernel_node) : ApproximationSpaceParameters("reproducing_kernel") {
        kernel_radius_scale_factor = reproduction_kernel_node["kernel_radius_scale_factor"].as<double>();
    }
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

struct IntegrationSchemeParameters {
    IntegrationSchemeParameters(std::string integration_scheme = "gauss_quadrature") : integration_scheme(integration_scheme) {
        if (integration_scheme == "gauss_quadrature") {
            integration_scheme_type = IntegrationSchemeType::GaussQuadrature;
        } else if (integration_scheme == "strain_smoothing") {
            integration_scheme_type = IntegrationSchemeType::StrainSmoothing;
        } else {
            throw std::runtime_error("Unsupported integration scheme");
        }
    }

    virtual int GetIntegrationOrder() const {
        throw std::runtime_error("Integration order not supported for this integration scheme");
    }

    IntegrationSchemeType GetIntegrationSchemeType() const {
        return integration_scheme_type;
    }

    std::string GetIntegrationScheme() const {
        return integration_scheme;
    }

   protected:
    std::string integration_scheme = "gauss_quadrature";
    IntegrationSchemeType integration_scheme_type = IntegrationSchemeType::GaussQuadrature;
};

struct IntegrationSchemeGaussQuadratureParameters : public IntegrationSchemeParameters {
    IntegrationSchemeGaussQuadratureParameters(const YAML::Node& gauss_quadrature_node) : IntegrationSchemeParameters("gauss_quadrature") {
        integration_order = gauss_quadrature_node["integration_order"].as<int>();
    }
    int GetIntegrationOrder() const override {
        return integration_order;
    }
    int integration_order = 1;
};

struct IntegrationSchemeStrainSmoothingParameters : public IntegrationSchemeParameters {
    IntegrationSchemeStrainSmoothingParameters() : IntegrationSchemeParameters("strain_smoothing") {}
    IntegrationSchemeStrainSmoothingParameters(const YAML::Node& strain_smoothing_node) : IntegrationSchemeParameters("strain_smoothing") {}
};

inline IntegrationSchemeParameters CreateIntegrationScheme(const YAML::Node& integration_scheme_node) {
    if (integration_scheme_node["gauss_quadrature"]) {
        return IntegrationSchemeGaussQuadratureParameters(integration_scheme_node["gauss_quadrature"]);
    } else if (integration_scheme_node["strain_smoothing"]) {
        return IntegrationSchemeStrainSmoothingParameters(integration_scheme_node["strain_smoothing"]);
    } else {
        throw std::runtime_error("Unsupported integration scheme");
    }
}

struct InternalForceContributionParameters {
    // Constructor using YAML node
    InternalForceContributionParameters(const YAML::Node& part, const std::shared_ptr<IoInputFile>& io_input_file, std::shared_ptr<aperi::MeshData> input_mesh_data) {
        YAML::Node material_node = io_input_file->GetMaterialFromPart(part);
        material = CreateMaterial(material_node);
        mesh_data = input_mesh_data;
        part_name = part["set"].as<std::string>();
        if (part["formulation"] && part["formulation"]["approximation_space"]) {
            approximation_space_parameters = CreateApproximationSpace(part["formulation"]["approximation_space"]);
        } else {
            approximation_space_parameters = std::make_shared<ApproximationSpaceParameters>();
        }
        if (part["formulation"] && part["formulation"]["integration_scheme"]) {
            integration_scheme_parameters = CreateIntegrationScheme(part["formulation"]["integration_scheme"]);
        } else {
            integration_scheme_parameters = IntegrationSchemeParameters();
        }
    }
    std::shared_ptr<Material> material = nullptr;
    std::shared_ptr<aperi::MeshData> mesh_data = nullptr;
    std::string part_name = "";
    std::shared_ptr<ApproximationSpaceParameters> approximation_space_parameters;
    IntegrationSchemeParameters integration_scheme_parameters;
};

}  // namespace aperi