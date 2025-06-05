#pragma once

#include <Eigen/Dense>
#include <cmath>

#include "Kokkos_Core.hpp"

namespace aperi {
namespace tensor {

template <typename T>
KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 3, 3>
isotropic_part(const T& a) {
    return a.trace() / 3.0 * Eigen::Matrix<double, 3, 3>::Identity();
}

template <typename T>
KOKKOS_INLINE_FUNCTION Eigen::Matrix<double, 3, 3>
deviatoric_part(const T& a) {
    return a - isotropic_part(a);
}

template <typename T>
KOKKOS_INLINE_FUNCTION double double_dot(T& a, T& b) {
    auto result = (a.array() * b.array()).sum();
    return result;
}

template <typename T>
KOKKOS_INLINE_FUNCTION double magnitude(const T& a) {
    return Kokkos::sqrt(double_dot(a, a));
}

template <typename T>
KOKKOS_INLINE_FUNCTION void get_lode_components(const T& a, double& z, double& s, T& E) {
    /* Return Lode components of second order tensor A

    Args
    ----
    a: Second order tensor

    Returns
    -------
    z:  Z component of A
    s:  S component of A
    E: Basis tensor of deviatoric part of A
    */

    z = a.trace() / Kokkos::sqrt(3.0);
    auto dev = tensor::deviatoric_part(a);
    s = tensor::magnitude(dev);
    E.setZero();
    if (Kokkos::abs(s) > 1.0e-10) {
        E = dev / s;
    }
    return;
}

}  // namespace tensor
}  // namespace aperi