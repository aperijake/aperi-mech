#include "ExternalForceContribution/Gravity.h"

#include <cassert>
#include <cmath>

namespace aperi {

/**
 * @brief Constructor for gravity functor.
 */
ComputeGravityForceFunctor::ComputeGravityForceFunctor(double gravity_value)
    : m_gravity_value(gravity_value) {}

/**
 * @brief Applies gravity to a node's force using its mass.
 */
KOKKOS_INLINE_FUNCTION
void ComputeGravityForceFunctor::operator()(double *force, const double *mass) const {
    *force += m_gravity_value * *mass;
}

/**
 * @brief Constructor for ExternalForceContributionGravity.
 */
ExternalForceContributionGravity::ExternalForceContributionGravity(
    std::shared_ptr<aperi::MeshData> mesh_data,
    std::vector<std::string> set_names,
    std::vector<std::pair<size_t, double>> components_and_values,
    std::function<double(double)> time_function)
    : ExternalForceContribution(mesh_data, set_names, components_and_values, time_function) {
    std::array<FieldQueryData<double>, 2> field_query_data;
    field_query_data[0] = {"force_coefficients", FieldQueryState::None};
    field_query_data[1] = {"mass", FieldQueryState::None};
    m_node_processor = std::make_shared<aperi::NodeProcessor<2>>(field_query_data, m_mesh_data, m_set_names);
}

/**
 * @brief Compute and apply gravity force to mesh nodes.
 */
void ExternalForceContributionGravity::ComputeForce(double time, double /*time_increment*/) {
    double scale_factor = m_time_function(time);
    assert(!std::isnan(scale_factor));
    for (auto component_value : m_components_and_values) {
        ComputeGravityForceFunctor compute_gravity_force_functor(component_value.second * scale_factor);
        m_node_processor->for_component_i_owned(compute_gravity_force_functor, component_value.first);
    }
    m_node_processor->MarkFieldModifiedOnDevice(0);
}

}  // namespace aperi
