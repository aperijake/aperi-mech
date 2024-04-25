#pragma once

#include <Eigen/Dense>
#include <memory>

#include "ElementBase.h"
#include "ElementSmoothedTetrahedron4.h"
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
inline std::shared_ptr<ElementBase> CreateElement(size_t num_nodes, bool use_strain_smoothing = false) {
    if (num_nodes == tet4_num_nodes) {
        if (use_strain_smoothing) {
            return std::make_shared<ElementSmoothedTetrahedron4>();
        } else {
            return std::make_shared<ElementTetrahedron4>();
        }
    } else {
        throw std::runtime_error("Unsupported element topology");
    }
}

}  // namespace aperi
