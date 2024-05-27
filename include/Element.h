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
inline std::shared_ptr<ElementBase> CreateElement(size_t num_nodes, std::vector<FieldQueryData> field_query_data_gather = {}, std::vector<std::string> part_names = {}, std::shared_ptr<aperi::MeshData> mesh_data = nullptr, bool use_strain_smoothing = false, bool store_shape_function_derivatives = false, std::shared_ptr<Material> material = nullptr) {
    if (num_nodes == TET4_NUM_NODES) {
        if (use_strain_smoothing) {
            if (store_shape_function_derivatives) {
                // return std::make_shared<ElementSmoothedTetrahedron4Storing>(field_query_data_gather, part_names, mesh_data, material);
                return std::make_shared<ElementReproducingKernel>(field_query_data_gather, part_names, mesh_data, material, 0.03); // Hardcoded kernel_radius_scale_factor for now
            } else {
                return std::make_shared<ElementSmoothedTetrahedron4>(field_query_data_gather, part_names, mesh_data, material);
            }
        } else {
            if (store_shape_function_derivatives) {
                throw std::runtime_error("Storing shape function derivatives is not supported for ElementTetrahedron4");
            }
            return std::make_shared<ElementTetrahedron4>(field_query_data_gather, part_names, mesh_data, material);
        }
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
