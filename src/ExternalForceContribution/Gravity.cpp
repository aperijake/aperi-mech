#include "ExternalForceContribution/Gravity.h"

#include <cassert>
#include <cmath>

#include "Field.h"
#include "FieldData.h"

namespace aperi {

/**
 * @brief Constructor for GravityForceFunctor.
 */
GravityForceFunctor::GravityForceFunctor(const std::shared_ptr<aperi::MeshData> &mesh_data,
                                         double gravity_component_0, double gravity_component_1, double gravity_component_2,
                                         const Kokkos::View<double[1]> &time_scale_factor)
    : m_gravity_vector(Kokkos::View<double[3]>("gravity_vector")),
      m_mass(mesh_data, FieldQueryData<double>{"mass", FieldQueryState::None, FieldDataTopologyRank::NODE}),
      m_force_coefficients(mesh_data, FieldQueryData<double>{"force_coefficients", FieldQueryState::None, FieldDataTopologyRank::NODE}),
      m_time_scale_factor(time_scale_factor) {
    assert(m_mass.IsValid());
    assert(m_force_coefficients.IsValid());
    Kokkos::View<double[3]>::HostMirror host_gravity_vector = Kokkos::create_mirror_view(m_gravity_vector);
    host_gravity_vector(0) = gravity_component_0;
    host_gravity_vector(1) = gravity_component_1;
    host_gravity_vector(2) = gravity_component_2;
    Kokkos::deep_copy(m_gravity_vector, host_gravity_vector);
}

/**
 * @brief Constructor for ExternalForceContributionGravity.
 */
ExternalForceContributionGravity::ExternalForceContributionGravity(
    std::shared_ptr<aperi::MeshData> mesh_data,
    std::vector<std::string> set_names,
    std::array<double, 3> values,
    std::function<double(double)> time_function)
    : ExternalForceContribution(mesh_data, set_names, values, time_function),
      m_node_iterator(mesh_data, aperi::Selector(set_names, mesh_data.get(), aperi::SelectorOwnership::OWNED)),
      m_time_scale_factor(Kokkos::View<double[1]>("time_scale_factor")),
      m_gravity_functor(mesh_data, values[0], values[1], values[2], m_time_scale_factor) {
    if (!m_mesh_data) {
        throw std::runtime_error("Mesh data is null.");
    }
}

/**
 * @brief Compute and apply gravity force to mesh nodes.
 */
void ExternalForceContributionGravity::ComputeForce(aperi::Field<aperi::Real> &force_field, double time, double /*time_increment*/) {
    double scale_factor = m_time_function(time);
    Kokkos::deep_copy(m_time_scale_factor, scale_factor);
    assert(!std::isnan(scale_factor));
    m_gravity_functor.SetForceField(force_field);
    m_gravity_functor.UpdateFields();
    m_node_iterator.ForEachNode(m_gravity_functor);
}

}  // namespace aperi
