#include "Element.h"

#include <Eigen/Dense>
#include <memory>

#include "Material.h"

namespace aperi {

// Compute the internal force of all elements.
// TODO(jake): This function probably could be templated and moved to the Element base class.
void Tetrahedron4::ComputeInternalForceAllElements() {
    assert(m_material != nullptr);
    assert(m_element_processor != nullptr);
    assert(m_integration_functor != nullptr);

    // Create the compute force functor
    ComputeInternalForceFunctor<tet4_num_nodes, ComputeShapeFunctionDerivativesFunctor, TetOnePointGaussQuadrature<tet4_num_nodes>, Material::StressFunctor> compute_force_functor(*m_compute_shape_function_derivatives_functor, *m_integration_functor, *m_material->GetStressFunctor());

    // Loop over all elements and compute the internal force
    m_element_processor->for_each_element<tet4_num_nodes>(compute_force_functor);
}

}  // namespace aperi
