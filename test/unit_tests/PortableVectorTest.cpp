#include <gtest/gtest.h>

#include <Kokkos_Core.hpp>

#include "PortableVector.h"

using namespace aperi;

class PortableVectorTest : public ::testing::Test {
   protected:
    void SetUp() override {
        // Already initialized by test runner
    }

    void TearDown() override {
        // Will be finalized by test runner
    }
};

// Test basic construction
TEST_F(PortableVectorTest, ConstructorTest) {
    PortableVector<int> vec(10);
    EXPECT_EQ(vec.SizeHost(), 0);
    EXPECT_EQ(vec.CapacityHost(), 10);
}

// Test pushing back elements
TEST_F(PortableVectorTest, PushBack) {
    PortableVector<double> vec(5);

    // Get the push_back functor from vec
    auto push_back_functor = vec.GetPushBackFunctor();

    Kokkos::parallel_for(
        "TestPushBack", 1, KOKKOS_LAMBDA(const int&) {
            push_back_functor(1.0);
            push_back_functor(2.0);
            push_back_functor(3.0);
        });

    Kokkos::fence();
    EXPECT_EQ(vec.SizeHost(), 3);

    // Get host mirror of data
    auto data_host = vec.GetDataHost();

    // Now check values directly from host mirror
    EXPECT_DOUBLE_EQ(data_host(0), 1.0);
    EXPECT_DOUBLE_EQ(data_host(1), 2.0);
    EXPECT_DOUBLE_EQ(data_host(2), 3.0);
}

// Test copy constructor
TEST_F(PortableVectorTest, CopyConstructor) {
    PortableVector<double> vec1(5);

    auto vec1_push_back_functor = vec1.GetPushBackFunctor();

    Kokkos::parallel_for(
        1, KOKKOS_LAMBDA(const int&) {
            vec1_push_back_functor(1.5);
            vec1_push_back_functor(2.5);
        });

    Kokkos::fence();

    // Create a copy
    PortableVector<double> vec2(vec1);

    // Check the copy has the same data
    EXPECT_EQ(vec2.SizeHost(), 2);
    EXPECT_EQ(vec2.CapacityHost(), 5);

    // Get host mirror and verify data
    auto data_host = vec2.GetDataHost();
    EXPECT_DOUBLE_EQ(data_host(0), 1.5);
    EXPECT_DOUBLE_EQ(data_host(1), 2.5);

    // Check they're independent (modifying one doesn't affect the other)
    Kokkos::parallel_for(
        1, KOKKOS_LAMBDA(const int&) {
            vec1_push_back_functor(3.5);
        });
    Kokkos::fence();

    EXPECT_EQ(vec1.SizeHost(), 3);
    EXPECT_EQ(vec2.SizeHost(), 2);
}

// Test move constructor
TEST_F(PortableVectorTest, MoveConstructor) {
    PortableVector<int> vec1(3);

    auto vec1_push_back_functor = vec1.GetPushBackFunctor();

    Kokkos::parallel_for(
        1, KOKKOS_LAMBDA(const int&) {
            vec1_push_back_functor(10);
            vec1_push_back_functor(20);
        });

    Kokkos::fence();

    // Move construct
    PortableVector<int> vec2(std::move(vec1));

    // Check vec2 has taken ownership
    EXPECT_EQ(vec2.SizeHost(), 2);
    EXPECT_EQ(vec2.CapacityHost(), 3);

    // Check that vec1 is in a valid-but-empty state
    EXPECT_EQ(vec1.SizeHost(), 0);
    EXPECT_EQ(vec1.CapacityHost(), 0);

    // Verify the data was moved using host mirror
    auto data_host = vec2.GetDataHost();
    EXPECT_EQ(data_host(0), 10);
    EXPECT_EQ(data_host(1), 20);
}

// Test parallel push_back
TEST_F(PortableVectorTest, ParallelPushBack) {
    const int numElements = 100;
    PortableVector<int> vec(numElements);

    auto push_back_functor = vec.GetPushBackFunctor();

    // Push elements in parallel
    Kokkos::parallel_for(
        numElements, KOKKOS_LAMBDA(const int i) {
            push_back_functor(i);
        });

    Kokkos::fence();

    // Size should be numElements
    EXPECT_EQ(vec.SizeHost(), numElements);

    // Get host mirror and verify values
    auto data_host = vec.GetDataHost();
    std::vector<bool> found(numElements, false);

    for (int i = 0; i < numElements; ++i) {
        EXPECT_GE(data_host(i), 0);
        EXPECT_LT(data_host(i), numElements);
        found[data_host(i)] = true;
    }

    // Every value should be found
    for (int i = 0; i < numElements; ++i) {
        EXPECT_TRUE(found[i]) << "Value " << i << " not found";
    }
}

// Test the clear function
TEST_F(PortableVectorTest, Clear) {
    PortableVector<int> vec(5);

    auto push_back_functor = vec.GetPushBackFunctor();

    Kokkos::parallel_for(
        1, KOKKOS_LAMBDA(const int&) {
            push_back_functor(1);
            push_back_functor(2);
        });

    Kokkos::fence();

    EXPECT_EQ(vec.SizeHost(), 2);

    vec.Clear();

    EXPECT_EQ(vec.SizeHost(), 0);
}

// Test the () operator
TEST_F(PortableVectorTest, OperatorParentheses) {
    PortableVector<double> vec(5);
    Kokkos::View<double*> other_data("other_data", 5);

    auto push_back_functor = vec.GetPushBackFunctor();

    Kokkos::parallel_for(
        1, KOKKOS_LAMBDA(const int&) {
            push_back_functor(1.1);
            push_back_functor(2.2);
            push_back_functor(3.3);
        });

    Kokkos::fence();

    EXPECT_EQ(vec.SizeHost(), 3);

    Kokkos::parallel_for(
        1, KOKKOS_LAMBDA(const int&) {
            other_data(0) = vec(0);
            other_data(1) = vec(1);
            other_data(2) = vec(2);
        });

    Kokkos::fence();

    auto other_data_host = Kokkos::create_mirror_view(other_data);
    Kokkos::deep_copy(other_data_host, other_data);

    EXPECT_DOUBLE_EQ(other_data_host(0), 1.1);
    EXPECT_DOUBLE_EQ(other_data_host(1), 2.2);
    EXPECT_DOUBLE_EQ(other_data_host(2), 3.3);
}