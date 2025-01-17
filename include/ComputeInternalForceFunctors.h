#pragma once

#include <Eigen/Dense>
#include <memory>

#include "Kokkos_Core.hpp"
#include "Material.h"

namespace aperi {

template <typename StressFunctor>
struct ComputeStressOnSmoothingCellFunctor {
    ComputeStressOnSmoothingCellFunctor(StressFunctor &stress_functor)
        : m_stress_functor(stress_functor) {}

    KOKKOS_INLINE_FUNCTION const Eigen::Matrix<double, 3, 3> operator()(const Kokkos::Array<Eigen::Matrix<double, 3, 3>, 1> &gathered_node_data_gradient, const double *state_old = nullptr, double *state_new = nullptr, size_t state_bucket_offset = 1) const {
        // PK1 stress
        Eigen::Matrix<double, 3, 3> pk1_stress;

        // Create a map around the state_old and state_new pointers
        Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic> stride(3, 1);
        auto pk1_stress_map = Eigen::Map<Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(pk1_stress.data(), stride);
        auto displacement_gradient_map = Eigen::Map<const Eigen::Matrix<double, 3, 3>, 0, Eigen::Stride<Eigen::Dynamic, Eigen::Dynamic>>(gathered_node_data_gradient[0].data(), stride);

        // Create a map around the state_old and state_new pointers
        Eigen::InnerStride<Eigen::Dynamic> state_stride(state_bucket_offset);
        auto state_old_map = Eigen::Map<const Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_old, m_stress_functor.NumberOfStateVariables(), state_stride);
        auto state_new_map = Eigen::Map<Eigen::VectorXd, 0, Eigen::InnerStride<Eigen::Dynamic>>(state_new, m_stress_functor.NumberOfStateVariables(), state_stride);

        // Compute the stress of the element.
        double timestep = 1.0;  // TODO(jake): This should be passed in
        m_stress_functor.GetStress(&displacement_gradient_map, nullptr, &state_old_map, &state_new_map, timestep, pk1_stress_map);

        return pk1_stress;
    }
    StressFunctor &m_stress_functor;  ///< Functor for computing the stress of the material
};

}  // namespace aperi
