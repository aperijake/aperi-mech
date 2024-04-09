#include "InternalForceContribution.h"

#include <memory>
#include <stdexcept>

#include "Element.h"

namespace aperi {

using MatrixType = Eigen::Matrix<double, 4, 3>;
using MatrixType2 = Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3>;

struct DebugFunctor {
    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<MatrixType, 3> &field_data_to_gather, MatrixType &force) const {
        // print all the data
        for (int i = 0; i < 3; i++) {
            printf("field_data_to_gather[%i](0,0):", i);
            printf(" %f\n", field_data_to_gather[i](0, 0));
        }
    }
};

template <typename ComputeInternalForceFunc>
struct ComputeForceFunctor {
    ComputeForceFunctor(ComputeInternalForceFunc& func) : m_func(func) {}
    KOKKOS_INLINE_FUNCTION void operator()(const Kokkos::Array<MatrixType, 3> &field_data_to_gather, MatrixType &force) const {
        // Compute the internal force
        printf("ComputeFunc\n");
        m_func(field_data_to_gather[0], field_data_to_gather[1], field_data_to_gather[2], force);
        printf("post ComputeFunc, force(0,0): %f\n", force(0, 0));
    }
    ComputeInternalForceFunc& m_func;
};


InternalForceContribution::InternalForceContribution(std::shared_ptr<Material> material, std::shared_ptr<aperi::MeshData> mesh_data, std::string part_name) : m_material(material), m_mesh_data(mesh_data), m_part_name(part_name) {
    // Get the number of nodes per element
    m_num_nodes_per_element = m_mesh_data->GetNumNodesPerElement(part_name);
    if (m_num_nodes_per_element != 4) {
        throw std::runtime_error("Unsupported element topology");
    }

    // Create the element
    m_element = CreateElement(m_num_nodes_per_element);

    // Create the element processor
    CreateElementProcessor();
}

void InternalForceContribution::ComputeElementInternalForce(const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &node_coordinates, const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &node_displacements, const Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 4, 3> &node_velocities, Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &force) const {
    // Compute the internal force
    force = m_element->ComputeInternalForce(node_coordinates, node_displacements, node_velocities, m_material);
}

void InternalForceContribution::ComputeForce() {
    m_element_processor->for_each_element([&](const std::array<Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3>, 3> &field_data_to_gather, Eigen::Matrix<double, Eigen::Dynamic, 3, Eigen::RowMajor, 8, 3> &force) {
        // Compute the internal force
        ComputeElementInternalForce(field_data_to_gather[0], field_data_to_gather[1], field_data_to_gather[2], force);
    });
    // m_ngp_element_processor->for_each_element([&](const Kokkos::Array<MatrixType2, 3> &field_data_to_gather, MatrixType2 &force) {
    //     // Compute the internal force
    //     ComputeElementInternalForce(field_data_to_gather[0], field_data_to_gather[1], field_data_to_gather[2], force);
    // });
    Element::ComputeInternalForceFunctor elem_compute_force = m_element->GetComputeInternalForceFunctor();
    ComputeForceFunctor<Element::ComputeInternalForceFunctor> compute_force_functor(elem_compute_force);
    m_ngp_element_processor->for_each_element_debug(compute_force_functor);
}

}  // namespace aperi
