#include <gtest/gtest.h>

#include <cassert>
#include <cmath>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

template <int Dim>
struct Tensor {
    Tensor() = default;

    explicit Tensor(const double* in) {
        for (int i = 0; i < Dim; ++i) {
            for (int j = 0; j < Dim; ++j) {
                data[Dim * i + j] = in[Dim * i + j];
            }
        }
    }

    double& operator()(int i, int j) {
        return data[Dim * i + j];
    }

    const double& operator()(int i, int j) const {
        return data[Dim * i + j];
    }

    Tensor& operator*=(double scale) {
        for (int i = 0; i < Dim; ++i) {
            for (int j = 0; j < Dim; ++j) {
                (*this)(i, j) *= scale;
            }
        }
        return *this;
    }

    double data[Dim * Dim];
};

template <int Dim>
double InnerProduct(const Tensor<Dim>& F, const Tensor<Dim>& G) {
    double prod = 0.0;
    for (int i = 0; i < Dim; ++i) {
        for (int j = 0; j < Dim; ++j) {
            prod += F(i, j) * G(i, j);
        }
    }
    return prod;
}

inline double Det(const Tensor<3>& F) {
    double t1 =
        F(0, 0) * F(1, 1) * F(2, 2) +
        F(0, 1) * F(1, 2) * F(2, 0) +
        F(0, 2) * F(1, 0) * F(2, 1);
    double t2 =
        F(0, 0) * F(1, 2) * F(2, 1) +
        F(0, 1) * F(1, 0) * F(2, 2) +
        F(0, 2) * F(1, 1) * F(2, 0);
    return t1 - t2;
}

inline void DerivDet(const Tensor<3>& F, Tensor<3>& dF) {
    // this is just J * F^{-T}, J = det(F)
    dF(0, 0) = (F(1, 1) * F(2, 2) - F(2, 1) * F(1, 2));
    dF(1, 0) = (F(0, 2) * F(2, 1) - F(0, 1) * F(2, 2));
    dF(2, 0) = (F(0, 1) * F(1, 2) - F(0, 2) * F(1, 1));
    dF(0, 1) = (F(1, 2) * F(2, 0) - F(1, 0) * F(2, 2));
    dF(1, 1) = (F(0, 0) * F(2, 2) - F(0, 2) * F(2, 0));
    dF(2, 1) = (F(1, 0) * F(0, 2) - F(0, 0) * F(1, 2));
    dF(0, 2) = (F(1, 0) * F(2, 1) - F(2, 0) * F(1, 1));
    dF(1, 2) = (F(2, 0) * F(0, 1) - F(0, 0) * F(2, 1));
    dF(2, 2) = (F(0, 0) * F(1, 1) - F(1, 0) * F(0, 1));
}

/// compute the weighted average of J = det(F) for all Fs within the element
template <int Dim>
double JBar(const std::vector<Tensor<Dim>>& Fs,
            const std::vector<double>& weights) {
    assert(Fs.size() == weights.size());

    double jbar = 0.0;
    for (int i = 0; i < Fs.size(); ++i) {
        jbar += Det(Fs[i]) * weights[i];
    }

    return jbar;
}

/// compute the scale factor to get all Fs in the element to have the same J_bar
template <int Dim>
double JScale(const double J_bar, const double J) {
    if constexpr (Dim == 2) {
        return std::sqrt(J_bar / J);
    } else if constexpr (Dim == 3) {
        return std::cbrt(J_bar / J);
    } else {
        assert(false);
        return J_bar / J;
    }
}

/// compute the sensitivity of the F scale factor to the input J_bar and J
template <int Dim>
void DerivJScale(double J_bar, double J, double& d_Jbar, double& d_J) {
    double jscale = JScale<Dim>(J_bar, J);
    d_Jbar = (1.0 / Dim) * jscale / J_bar;
    d_J = -(1.0 / Dim) * jscale / J;
}

/// modify the defmormations gradients within the element
/// so that they all have the same J = det(F), J_bar
template <int Dim>
void FBar(const std::vector<Tensor<Dim>>& Fs,
          const std::vector<double>& weights,
          std::vector<Tensor<Dim>>& Fbars) {
    double jbar = JBar(Fs, weights);
    for (int n = 0; n < Fs.size(); ++n) {
        Fbars[n] = Fs[n];
        Fbars[n] *= JScale<Dim>(jbar, Det(Fs[n]));
    }
}

// P_bars_p =  P_q : d{Fbars_q}/d{F_p}
template <int Dim>
void VjpFBar(const std::vector<Tensor<Dim>>& Fs,
             const std::vector<double>& weights,
             const std::vector<Tensor<Dim>>& Fbars,
             const std::vector<Tensor<Dim>>& Pbars,
             std::vector<Tensor<Dim>>& Ps) {
    const double jbar = Det(Fbars[0]);

    double d_jscale_d_jbar;
    double d_jscale_d_j;

    double dual_pressure = 0.0;

    for (int n = 0; n < Fs.size(); ++n) {
        const double j = Det(Fs[n]);
        DerivJScale<Dim>(jbar, j, d_jscale_d_jbar, d_jscale_d_j);
        // in the future can probably rewrite in terms of Fbars[n]
        dual_pressure += d_jscale_d_jbar * InnerProduct(Pbars[n], Fs[n]) * weights[n];
    }

    for (int n = 0; n < Fs.size(); ++n) {
        const double j = Det(Fs[n]);
        const double jscale = JScale<Dim>(jbar, j);
        Ps[n] = Pbars[n];
        Ps[n] *= jscale;

        DerivJScale<Dim>(jbar, j, d_jscale_d_jbar, d_jscale_d_j);

        Tensor<Dim> d_j_d_f;
        DerivDet(Fs[n], d_j_d_f);

        // in the future can probably rewrite in terms of Fbars[n]
        double pressure_like_term = dual_pressure + d_jscale_d_j * InnerProduct(Pbars[n], Fs[n]);
        for (int i = 0; i < Dim; ++i) {
            for (int j = 0; j < Dim; ++j) {
                Ps[n](i, j) += pressure_like_term * d_j_d_f(i, j);
            }
        }
    }
}

template <int Dim>
inline double FakeEnergy(const Tensor<Dim>& F) {
    double energy = 0.0;
    for (int i = 0; i < Dim; ++i) {
        for (int j = 0; j < Dim; ++j) {
            energy += F(i, j) * F(i, j);
        }
    }
    return 0.5 * energy;
}

/// using a fake 'hyperelastic' energy, compute the total element energy for testing
template <int Dim>
double ElementEnergyPerVolume(const std::vector<Tensor<Dim>>& Fs,
                              const std::vector<double>& weights,
                              std::vector<Tensor<Dim>>& Fbars) {  // essentially scratch space
    Fbars.resize(Fs.size());
    FBar(Fs, weights, Fbars);

    double total_energy = 0.0;
    for (int n = 0; n < Fs.size(); ++n) {
        total_energy += weights[n] * FakeEnergy(Fbars[n]);
    }
    return total_energy;
}

/// this actually returns the derivative of the element energy divided by
/// the quadrature weight, so the output can be interpreted as the first-PK stress
template <int Dim>
void DerivElementEnergyPerVolume(const std::vector<Tensor<Dim>>& Fs,
                                 const std::vector<double>& weights,
                                 const std::vector<Tensor<Dim>>& Fbars,
                                 std::vector<Tensor<Dim>>& Pbars,
                                 std::vector<Tensor<Dim>>& Ps) {
    for (int n = 0; n < Fs.size(); ++n) {
        Pbars[n] = Fbars[n];
    }

    VjpFBar(Fs, weights, Fbars, Pbars, Ps);
}

void TestDerivJScale() {
    double j = 1.310;
    double jbar = 0.84;
    double d_j;
    double d_jbar;

    double jscale = JScale<3>(jbar, j);
    DerivJScale<3>(jbar, j, d_jbar, d_j);

    static constexpr double k_eps = 1e-7;

    double jbar_p = jbar + k_eps;
    double d_jbar_fd = (JScale<3>(jbar_p, j) - jscale) / k_eps;
    EXPECT_NEAR(d_jbar_fd, d_jbar, 1e-6);

    double j_p = j + k_eps;
    double d_j_fd = (JScale<3>(jbar, j_p) - jscale) / k_eps;
    EXPECT_NEAR(d_j_fd, d_j, 1e-6);
}

template <int Dim>
void TestDerivDet(Tensor<Dim> F) {
    Tensor<Dim> d_fd_j;
    Tensor<Dim> d_fd_j_fd;  // finite difference
    double det_f = Det(F);

    DerivDet(F, d_fd_j);

    static constexpr double k_eps = 1e-7;
    for (int i = 0; i < Dim; ++i) {
        for (int j = 0; j < Dim; ++j) {
            // perturb the F matrix
            F(i, j) += k_eps;
            double det_fp = Det(F);
            d_fd_j_fd(i, j) = (det_fp - det_f) / k_eps;
            EXPECT_NEAR(d_fd_j_fd(i, j), d_fd_j(i, j), 1e-6) << "i = " << i << " j = " << j << std::endl;
            // reset the F matrix
            F(i, j) -= k_eps;
        }
    }
}

template <int Dim>
void TestDerivElementEnergyPerVolume(std::vector<Tensor<Dim>>& Fs,
                                     const std::vector<double>& weights) {
    // scratch space
    std::vector<Tensor<Dim>> fbars(Fs.size());
    std::vector<Tensor<Dim>> pbars(Fs.size());
    std::vector<Tensor<Dim>> ps(Fs.size());

    std::vector<Tensor<Dim>> d_energy_d_fs(Fs.size());
    std::vector<Tensor<Dim>> d_energy_d_fs_fd(Fs.size());

    const double energy = ElementEnergyPerVolume(Fs, weights, fbars);
    DerivElementEnergyPerVolume(Fs, weights, fbars, pbars, d_energy_d_fs);

    static constexpr double k_eps = 1e-7;

    for (int n = 0; n < Fs.size(); ++n) {
        for (int i = 0; i < Dim; ++i) {
            for (int j = 0; j < Dim; ++j) {
                Fs[n](i, j) += k_eps;
                const double energy_p = ElementEnergyPerVolume(Fs, weights, fbars);
                const double fd = (energy_p - energy) / (k_eps * weights[n]);
                d_energy_d_fs_fd[n](i, j) = fd;
                EXPECT_NEAR(fd, d_energy_d_fs[n](i, j), 1e-6) << "n = " << n << " i = " << i << " j = " << j << std::endl;
                Fs[n](i, j) -= k_eps;
            }
        }
    }
}

TEST(FBarTest, FbarTest) {
    constexpr int k_dim = 3;

    // Fraction of volume for each subcell
    std::vector<double> weights{0.2, 0.3, 0.25, 0.25};

    std::vector<Tensor<3>> fs;
    for (int n = 0; n < weights.size(); ++n) {
        double vals[k_dim * k_dim] =
            {1.0 + 0.01 * n, 0.1 - 0.012 * n, -0.1,
             0.2, 1.1 - 0.02 * n, -0.2 + 0.005 * n,
             -0.015, 0.02, 0.9 + 0.03 * n};
        fs.emplace_back(vals);
        TestDerivDet(fs[n]);
    }

    TestDerivJScale();

    // check that after f_bar, all Fs have the same J
    auto fbars = fs;
    FBar(fs, weights, fbars);

    double jbar = JBar(fs, weights);
    for (auto& f : fbars) {
        EXPECT_NEAR(Det(f), jbar, 1e-12);
    }

    TestDerivElementEnergyPerVolume(fs, weights);
}
