#include <gtest/gtest.h>

#include <Kokkos_Core.hpp>

#include "PortableVector.h"

using namespace aperi;

// Helper class with public methods for KOKKOS_LAMBDAs
class PortableVectorTestHelper {
   public:
    template <typename T>
    static void PushBackValues(PortableVector<T>& vec, const std::vector<T>& values) {
        auto push_back_functor = vec.GetPushBackFunctor();

        Kokkos::View<T*> d_values("values", values.size());
        auto h_values = Kokkos::create_mirror_view(d_values);

        for (size_t i = 0; i < values.size(); i++) {
            h_values(i) = values[i];
        }

        Kokkos::deep_copy(d_values, h_values);

        Kokkos::parallel_for(
            values.size(), KOKKOS_LAMBDA(const int& i) {
                push_back_functor(d_values(i));
            });

        Kokkos::fence();
    }

    template <typename T>
    static void AccessValues(const PortableVector<T>& vec, Kokkos::View<T*> result, int count) {
        auto data = vec.m_data;  // Get the device-accessible Kokkos::View
        Kokkos::parallel_for(
            1, KOKKOS_LAMBDA(const int&) {
                for (int i = 0; i < count; i++) {
                    result(i) = data(i);
                }
            });
        Kokkos::fence();
    }
};

// Test basic construction
TEST(PortableVectorTest, ConstructorTest) {
    PortableVector<int> vec(10);
    EXPECT_EQ(vec.SizeHost(), 0);
    EXPECT_EQ(vec.CapacityHost(), 10);
}

// Test pushing back elements
TEST(PortableVectorTest, PushBack) {
    PortableVector<double> vec(5);

    // Use the helper class instead of direct lambdas
    PortableVectorTestHelper::PushBackValues(vec, {1.0, 2.0, 3.0});

    EXPECT_EQ(vec.SizeHost(), 3);

    // Get host mirror of data
    auto data_host = vec.GetDataHost();

    // Now check values directly from host mirror
    EXPECT_DOUBLE_EQ(data_host(0), 1.0);
    EXPECT_DOUBLE_EQ(data_host(1), 2.0);
    EXPECT_DOUBLE_EQ(data_host(2), 3.0);
}

// Test copy constructor
TEST(PortableVectorTest, CopyConstructor) {
    PortableVector<double> vec1(5);

    // Use the helper class to access values
    PortableVectorTestHelper::PushBackValues(vec1, {1.5, 2.5});

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
    // Use the helper class to access values
    PortableVectorTestHelper::PushBackValues(vec1, {3.5});

    EXPECT_EQ(vec1.SizeHost(), 3);
    EXPECT_EQ(vec2.SizeHost(), 2);
}

// Test move constructor
TEST(PortableVectorTest, MoveConstructor) {
    PortableVector<int> vec1(3);

    // Use the helper class to access values
    PortableVectorTestHelper::PushBackValues(vec1, {10, 20});

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

// Test push_back on a larger vector
TEST(PortableVectorTest, PushBackLarge) {
    const int num_elements = 100;
    PortableVector<int> vec(num_elements);

    // Use the helper class to push back values
    std::vector<int> values(num_elements);
    for (int i = 0; i < num_elements; ++i) {
        values[i] = i;
    }
    PortableVectorTestHelper::PushBackValues(vec, values);

    // Size should be num_elements
    EXPECT_EQ(vec.SizeHost(), num_elements);

    // Get host mirror and verify values
    auto data_host = vec.GetDataHost();
    std::vector<bool> found(num_elements, false);

    for (int i = 0; i < num_elements; ++i) {
        EXPECT_GE(data_host(i), 0);
        EXPECT_LT(data_host(i), num_elements);
        found[data_host(i)] = true;
    }

    // Every value should be found
    for (int i = 0; i < num_elements; ++i) {
        EXPECT_TRUE(found[i]) << "Value " << i << " not found";
    }
}

// Test the clear function
TEST(PortableVectorTest, Clear) {
    PortableVector<int> vec(5);

    // Use the helper class to push back values
    PortableVectorTestHelper::PushBackValues(vec, {1, 2});

    EXPECT_EQ(vec.SizeHost(), 2);

    vec.Clear();

    EXPECT_EQ(vec.SizeHost(), 0);
}

// Test the () operator
TEST(PortableVectorTest, OperatorParentheses) {
    PortableVector<double> vec(5);
    Kokkos::View<double*> other_data("other_data", 5);

    // Use the helper class to push back values
    PortableVectorTestHelper::PushBackValues(vec, {1.1, 2.2, 3.3});

    EXPECT_EQ(vec.SizeHost(), 3);

    // Use the helper class to access values
    PortableVectorTestHelper::AccessValues(vec, other_data, 3);

    auto other_data_host = Kokkos::create_mirror_view(other_data);
    Kokkos::deep_copy(other_data_host, other_data);

    EXPECT_DOUBLE_EQ(other_data_host(0), 1.1);
    EXPECT_DOUBLE_EQ(other_data_host(1), 2.2);
    EXPECT_DOUBLE_EQ(other_data_host(2), 3.3);
}
