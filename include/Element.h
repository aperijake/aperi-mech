#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementBase.h"
#include "ElementSmoothedTetrahedron4.h"
#include "ElementSmoothedTetrahedron4Storing.h"
#include "ElementTetrahedron4.h"

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
inline std::shared_ptr<ElementBase> CreateElement(size_t num_nodes, bool use_strain_smoothing = false, bool store_shape_function_derivatives = false, std::shared_ptr<aperi::ElementGatherScatterProcessor<3>> element_processor = nullptr, std::shared_ptr<Material> material = nullptr) {
    if (num_nodes == tet4_num_nodes) {
        if (use_strain_smoothing) {
            if (store_shape_function_derivatives) {
                return std::make_shared<ElementSmoothedTetrahedron4Storing>(element_processor, material);
            } else {
                return std::make_shared<ElementSmoothedTetrahedron4>(element_processor, material);
            }
        } else {
            if (store_shape_function_derivatives) {
                throw std::runtime_error("Storing shape function derivatives is not supported for ElementTetrahedron4");
            }
            return std::make_shared<ElementTetrahedron4>(element_processor, material);
        }
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
