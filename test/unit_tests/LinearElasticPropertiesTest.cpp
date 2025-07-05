#include <gtest/gtest.h>

#include "Materials/Base.h"

using aperi::LinearElasticProperties;

// Helper to reset all properties to NaN
void Reset(LinearElasticProperties& p) {
    p.shear_modulus = std::numeric_limits<double>::quiet_NaN();
    p.lambda = std::numeric_limits<double>::quiet_NaN();
    p.youngs_modulus = std::numeric_limits<double>::quiet_NaN();
    p.poisson_ratio = std::numeric_limits<double>::quiet_NaN();
    p.bulk_modulus = std::numeric_limits<double>::quiet_NaN();
}

TEST(LinearElasticPropertiesTest, AllValidPairs) {
    // E = 200, nu = 0.3, G = 76.923, K = 166.667, lambda = 115.385
    const double E = 200.0, nu = 0.3, G = 76.92307692307692, K = 166.66666666666666, lambda = 115.38461538461539;

    // E + nu
    {
        LinearElasticProperties p;
        Reset(p);
        p.youngs_modulus = E;
        p.poisson_ratio = nu;
        p.CompleteProperties();
        EXPECT_NEAR(p.shear_modulus, G, 1e-3);
        EXPECT_NEAR(p.bulk_modulus, K, 1e-3);
        EXPECT_NEAR(p.lambda, lambda, 1e-3);
    }

    // E + G
    {
        LinearElasticProperties p;
        Reset(p);
        p.youngs_modulus = E;
        p.shear_modulus = G;
        p.CompleteProperties();
        EXPECT_NEAR(p.poisson_ratio, nu, 1e-3);
        EXPECT_NEAR(p.bulk_modulus, K, 1e-3);
        EXPECT_NEAR(p.lambda, lambda, 1e-3);
    }

    // E + lambda
    {
        LinearElasticProperties p;
        Reset(p);
        p.youngs_modulus = E;
        p.lambda = lambda;
        p.CompleteProperties();
        EXPECT_NEAR(p.poisson_ratio, nu, 1e-3);
        EXPECT_NEAR(p.shear_modulus, G, 1e-3);
        EXPECT_NEAR(p.bulk_modulus, K, 1e-3);
    }

    // E + K
    {
        LinearElasticProperties p;
        Reset(p);
        p.youngs_modulus = E;
        p.bulk_modulus = K;
        p.CompleteProperties();
        EXPECT_NEAR(p.poisson_ratio, nu, 1e-3);
        EXPECT_NEAR(p.shear_modulus, G, 1e-3);
        EXPECT_NEAR(p.lambda, lambda, 1e-3);
    }

    // G + nu
    {
        LinearElasticProperties p;
        Reset(p);
        p.shear_modulus = G;
        p.poisson_ratio = nu;
        p.CompleteProperties();
        EXPECT_NEAR(p.youngs_modulus, E, 1e-3);
        EXPECT_NEAR(p.lambda, lambda, 1e-3);
        EXPECT_NEAR(p.bulk_modulus, K, 1e-3);
    }

    // G + lambda
    {
        LinearElasticProperties p;
        Reset(p);
        p.shear_modulus = G;
        p.lambda = lambda;
        p.CompleteProperties();
        EXPECT_NEAR(p.youngs_modulus, E, 1e-3);
        EXPECT_NEAR(p.poisson_ratio, nu, 1e-3);
        EXPECT_NEAR(p.bulk_modulus, K, 1e-3);
    }

    // G + K
    {
        LinearElasticProperties p;
        Reset(p);
        p.shear_modulus = G;
        p.bulk_modulus = K;
        p.CompleteProperties();
        EXPECT_NEAR(p.youngs_modulus, E, 1e-3);
        EXPECT_NEAR(p.poisson_ratio, nu, 1e-3);
        EXPECT_NEAR(p.lambda, lambda, 1e-3);
    }

    // lambda + nu
    {
        LinearElasticProperties p;
        Reset(p);
        p.lambda = lambda;
        p.poisson_ratio = nu;
        p.CompleteProperties();
        EXPECT_NEAR(p.youngs_modulus, E, 1e-3);
        EXPECT_NEAR(p.shear_modulus, G, 1e-3);
        EXPECT_NEAR(p.bulk_modulus, K, 1e-3);
    }

    // lambda + K
    {
        LinearElasticProperties p;
        Reset(p);
        p.lambda = lambda;
        p.bulk_modulus = K;
        p.CompleteProperties();
        EXPECT_NEAR(p.youngs_modulus, E, 1e-3);
        EXPECT_NEAR(p.shear_modulus, G, 1e-3);
        EXPECT_NEAR(p.poisson_ratio, nu, 1e-3);
    }

    // K + nu
    {
        LinearElasticProperties p;
        Reset(p);
        p.bulk_modulus = K;
        p.poisson_ratio = nu;
        p.CompleteProperties();
        EXPECT_NEAR(p.youngs_modulus, E, 1e-3);
        EXPECT_NEAR(p.shear_modulus, G, 1e-3);
        EXPECT_NEAR(p.lambda, lambda, 1e-3);
    }
}

TEST(LinearElasticPropertiesTest, InvalidNumberOfProperties) {
    // Only one property
    LinearElasticProperties p;
    Reset(p);
    p.youngs_modulus = 200.0;
    EXPECT_THROW(p.CompleteProperties(), std::runtime_error);

    // More than two properties
    Reset(p);
    p.youngs_modulus = 200.0;
    p.poisson_ratio = 0.3;
    p.shear_modulus = 76.9;
    EXPECT_THROW(p.CompleteProperties(), std::runtime_error);

    // None set
    Reset(p);
    EXPECT_THROW(p.CompleteProperties(), std::runtime_error);
}

TEST(LinearElasticPropertiesTest, PhysicalBounds) {
    // Negative modulus
    LinearElasticProperties p;
    Reset(p);
    p.youngs_modulus = -100.0;
    p.poisson_ratio = 0.3;
    EXPECT_THROW(p.CompleteProperties(), std::runtime_error);

    // Poisson's ratio out of bounds
    Reset(p);
    p.youngs_modulus = 100.0;
    p.poisson_ratio = 0.6;
    EXPECT_THROW(p.CompleteProperties(), std::runtime_error);

    // lambda too small
    Reset(p);
    p.shear_modulus = 100.0;
    p.lambda = -100.0;
    EXPECT_THROW(p.CompleteProperties(), std::runtime_error);
}
