#pragma once

#include <Eigen/Dense>
#include <memory>
#include <stdexcept>
#include <string>
#include <vector>

#include "ElementBase.h"
#include "ElementReproducingKernel.h"
#include "ElementSmoothedTetrahedron4.h"
#include "ElementSmoothedTetrahedron4Storing.h"
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
inline std::shared_ptr<ElementBase> CreateElement(size_t num_nodes, std::vector<FieldQueryData> field_query_data_gather = {}, std::vector<std::string> part_names = {}, std::shared_ptr<aperi::MeshData> mesh_data = nullptr, const ApproximationSpaceParameters& approximation_space_parameters = ApproximationSpaceParameters(), const IntegrationSchemeParameters &integration_scheme_parameters = IntegrationSchemeParameters(), std::shared_ptr<Material> material = nullptr) {
    if (num_nodes == TET4_NUM_NODES) {
        if (ApproximationSpaceType::FiniteElement == approximation_space_parameters.GetApproximationSpaceType()) {
            if (integration_scheme_parameters.GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {
                if (integration_scheme_parameters.StoreShapeFunctionDerivatives()) {
                    return std::make_shared<ElementSmoothedTetrahedron4Storing>(field_query_data_gather, part_names, mesh_data, material);
                    } else { // TODO(jake): this is probably not needed in the future. just used for testing now
                    return std::make_shared<ElementSmoothedTetrahedron4>(field_query_data_gather, part_names, mesh_data, material);
                }
            } else {  // GaussQuadrature
                if (integration_scheme_parameters.StoreShapeFunctionDerivatives()) {
                    throw std::runtime_error("Storing shape function derivatives is not supported for Element Tetrahedron4 with Gauss Quadrature");
                } else {
                    return std::make_shared<ElementTetrahedron4>(field_query_data_gather, part_names, mesh_data, material);
                }
            }
        } else if (ApproximationSpaceType::ReproducingKernel == approximation_space_parameters.GetApproximationSpaceType()) {
            if (integration_scheme_parameters.GetIntegrationSchemeType() == IntegrationSchemeType::StrainSmoothing) {
                if (integration_scheme_parameters.StoreShapeFunctionDerivatives()) {
                    double kernel_radius_scale_factor = approximation_space_parameters.GetKernelRadiusScaleFactor();
                    return std::make_shared<ElementReproducingKernel>(field_query_data_gather, part_names, mesh_data, material, kernel_radius_scale_factor);
                } else {
                    throw std::runtime_error("Storing shape function derivatives is required for Reproducing Kernel with Strain Smoothing");
                }
            } else {
                throw std::runtime_error("Gauss Quadrature is not supported for Reproducing Kernel");
            }
        } else {
            throw std::runtime_error("Unsupported approximation space: " + approximation_space_parameters.GetApproximationSpace());
        }
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
