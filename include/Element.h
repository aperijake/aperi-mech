#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "Constants.h"
#include "ElementBase.h"
#include "ElementReproducingKernel.h"
#include "ElementSmoothedTetrahedron4.h"
#include "ElementTetrahedron4.h"
#include "FieldData.h"
#include "InternalForceContributionParameters.h"
#include "Material.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Creates an element object.
 *
 * This function creates and returns a shared pointer to an ElementBase object based on the given
 * parameters. The element is created based on the given topology and is initialized with the
 * given bulk data.
 *
 * @param num_nodes The number of nodes in the element.
 * @return A shared pointer to the created ElementBase object.
 */
inline std::shared_ptr<ElementBase> CreateElement(const aperi::ElementTopology& element_topology, const std::shared_ptr<ApproximationSpaceParameters>& approximation_space_parameters, const std::shared_ptr<IntegrationSchemeParameters>& integration_scheme_parameters, std::vector<FieldQueryData<double>> field_query_data_gather = {}, std::vector<std::string> part_names = {}, std::shared_ptr<aperi::MeshData> mesh_data = nullptr, std::shared_ptr<Material> material = nullptr) {
    // TODO(jake): Clean up this function
    if (element_topology == ElementTopology::Tetrahedron4) {
        if (ApproximationSpaceType::FiniteElement == approximation_space_parameters->GetApproximationSpaceType()) {
            if (integration_scheme_parameters->GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {
                return std::make_shared<ElementSmoothedTetrahedron4>(field_query_data_gather, part_names, mesh_data, material);
            } else {  // GaussQuadrature. TODO(jake) actually plumb in parameters for GaussQuadrature
                return std::make_shared<ElementTetrahedron4>(field_query_data_gather, part_names, mesh_data, material);
            }
        } else if (ApproximationSpaceType::ReproducingKernel == approximation_space_parameters->GetApproximationSpaceType()) {
            if (integration_scheme_parameters->GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {
                double kernel_radius_scale_factor = approximation_space_parameters->GetKernelRadiusScaleFactor();
                return std::make_shared<ElementReproducingKernelTet4>(field_query_data_gather, part_names, mesh_data, material, kernel_radius_scale_factor);
            } else {
                throw std::runtime_error("Gauss Quadrature is not supported for Reproducing Kernel");
            }
        } else {
            throw std::runtime_error("Unsupported approximation space: " + approximation_space_parameters->GetApproximationSpace());
        }
    } else if (element_topology == ElementTopology::Hexahedron8) {
        if (ApproximationSpaceType::FiniteElement == approximation_space_parameters->GetApproximationSpaceType()) {
            throw std::runtime_error("Finite Element is not supported for Hexahedron8");
        } else if (ApproximationSpaceType::ReproducingKernel == approximation_space_parameters->GetApproximationSpaceType()) {
            if (integration_scheme_parameters->GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {
                double kernel_radius_scale_factor = approximation_space_parameters->GetKernelRadiusScaleFactor();
                return std::make_shared<ElementReproducingKernelHex8>(field_query_data_gather, part_names, mesh_data, material, kernel_radius_scale_factor);
            } else {
                throw std::runtime_error("Gauss Quadrature is not supported for Reproducing Kernel");
            }
        } else {
            throw std::runtime_error("Unsupported approximation space: " + approximation_space_parameters->GetApproximationSpace());
        }
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
