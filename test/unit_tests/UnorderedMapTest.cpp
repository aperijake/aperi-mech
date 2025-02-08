#include <gtest/gtest.h>
#include <mpi.h>

#include <Kokkos_Core.hpp>
#include <Kokkos_UnorderedMap.hpp>
#include <chrono>
#include <cstdlib>
#include <iomanip>
#include <iostream>
#include <unordered_map>
#include <unordered_set>

// UnorderedMapFixture
class UnorderedMapFixture : public ::testing::Test {
   protected:
    void SetUp() override {
    }

    void TearDown() override {
    }

    void SizeViewsAndMaps(size_t size) {
        m_random_indices = Kokkos::View<uint64_t *>("random_indices", size);
        m_random_indices_host_mirror = Kokkos::create_mirror_view(m_random_indices);
        m_random_indices_host_native = Kokkos::View<uint64_t *, Kokkos::HostSpace>("random_indices", size);
        m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(size);
        m_map_host_mirror = Kokkos::create_mirror(m_map);
        m_map_host_native = Kokkos::UnorderedMap<uint64_t, uint64_t, Kokkos::HostSpace>(size);
        Kokkos::deep_copy(m_map_host_mirror, m_map);  // This is needed or inserting into the host map will get stuck in an infinite loop
    }

    void PopulateRandomView(size_t size, size_t potential_unique_values = 100, size_t seed = 0) {
        srand(seed);
        for (size_t i = 0; i < size; ++i) {
            uint64_t random_value = std::rand() % potential_unique_values;
            m_random_indices_host_mirror(i) = random_value;
            m_random_indices_host_native(i) = random_value;
        }
        Kokkos::deep_copy(m_random_indices, m_random_indices_host_mirror);
    }

    void PopulateStdUnorderedMap() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            m_map_std.insert({m_random_indices_host_mirror(i), i});
        }
    }

    void PopulateStdUnorderedMapNative() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            m_map_std_native.insert({m_random_indices_host_native(i), i});
        }
    }

    void PopulateStdUnorderedSet() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            m_set_std.insert(m_random_indices_host_mirror(i));
        }
    }

    void PopulateStdUnorderedSetNative() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            m_set_std_native.insert(m_random_indices_host_native(i));
        }
    }

    void PopulateKokkosUnorderedMapOnHost() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            m_map_host_mirror.insert(m_random_indices_host_mirror(i), i);
        }
    }

    void PopulateKokkosUnorderedMapOnHostNative() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            m_map_host_native.insert(m_random_indices_host_native(i), i);
        }
    }

    void CheckKokkosVsUnorderedMap() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            auto kokkos_value = m_map_host_mirror.value_at(m_map_host_mirror.find(m_random_indices_host_mirror(i)));
            auto std_value = m_map_std.find(m_random_indices_host_mirror(i));
            auto kokkos_value_native = m_map_host_native.value_at(m_map_host_native.find(m_random_indices_host_native(i)));
            auto std_value_native = m_map_std_native.find(m_random_indices_host_native(i));
            EXPECT_EQ(kokkos_value, std_value->second);
            EXPECT_EQ(kokkos_value_native, std_value_native->second);
            EXPECT_EQ(kokkos_value, kokkos_value_native);
        }
    }

    Kokkos::View<uint64_t *> m_random_indices;
    Kokkos::View<uint64_t *>::HostMirror m_random_indices_host_mirror;
    Kokkos::View<uint64_t *, Kokkos::HostSpace> m_random_indices_host_native;

    Kokkos::UnorderedMap<uint64_t, uint64_t> m_map;
    Kokkos::UnorderedMap<uint64_t, uint64_t>::HostMirror m_map_host_mirror;
    Kokkos::UnorderedMap<uint64_t, uint64_t, Kokkos::HostSpace> m_map_host_native;

    std::unordered_map<uint64_t, uint64_t> m_map_std;
    std::unordered_map<uint64_t, uint64_t> m_map_std_native;
    std::unordered_set<uint64_t> m_set_std;
    std::unordered_set<uint64_t> m_set_std_native;
};

TEST_F(UnorderedMapFixture, UnorderedMapTest) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }

    size_t num_indices = 1e7;
    size_t num_unique_indices = 1e5;

    // Set up the views and maps
    SizeViewsAndMaps(num_indices);

    // Populate the random indices
    PopulateRandomView(num_indices, num_unique_indices);

    // Populate the std unordered map. Timed.
    auto start_std = std::chrono::high_resolution_clock::now();
    PopulateStdUnorderedMap();
    auto end_std = std::chrono::high_resolution_clock::now();
    auto duration_std = std::chrono::duration_cast<std::chrono::microseconds>(end_std - start_std);
    std::cout << "Std unordered map took " << duration_std.count() << " microseconds." << std::endl;

    // Populate the std unordered map native. Timed.
    auto start_std_native = std::chrono::high_resolution_clock::now();
    PopulateStdUnorderedMapNative();
    auto end_std_native = std::chrono::high_resolution_clock::now();
    auto duration_std_native = std::chrono::duration_cast<std::chrono::microseconds>(end_std_native - start_std_native);
    std::cout << "Std unordered map native took " << duration_std_native.count() << " microseconds." << std::endl;

    // Populate the std unordered set. Timed.
    auto start_std_set = std::chrono::high_resolution_clock::now();
    PopulateStdUnorderedSet();
    auto end_std_set = std::chrono::high_resolution_clock::now();
    auto duration_std_set = std::chrono::duration_cast<std::chrono::microseconds>(end_std_set - start_std_set);
    std::cout << "Std unordered set took " << duration_std_set.count() << " microseconds." << std::endl;

    // Populate the std unordered set native. Timed.
    auto start_std_set_native = std::chrono::high_resolution_clock::now();
    PopulateStdUnorderedSetNative();
    auto end_std_set_native = std::chrono::high_resolution_clock::now();
    auto duration_std_set_native = std::chrono::duration_cast<std::chrono::microseconds>(end_std_set_native - start_std_set_native);
    std::cout << "Std unordered set native took " << duration_std_set_native.count() << " microseconds." << std::endl;

    // Populate the kokkos unordered map. Timed.
    auto start_kokkos = std::chrono::high_resolution_clock::now();
    PopulateKokkosUnorderedMapOnHost();
    auto end_kokkos = std::chrono::high_resolution_clock::now();
    auto duration_kokkos = std::chrono::duration_cast<std::chrono::microseconds>(end_kokkos - start_kokkos);
    std::cout << "Kokkos unordered map took " << duration_kokkos.count() << " microseconds." << std::endl;

    // Populate the kokkos unordered map native. Timed.
    auto start_kokkos_native = std::chrono::high_resolution_clock::now();
    PopulateKokkosUnorderedMapOnHostNative();
    auto end_kokkos_native = std::chrono::high_resolution_clock::now();
    auto duration_kokkos_native = std::chrono::duration_cast<std::chrono::microseconds>(end_kokkos_native - start_kokkos_native);
    std::cout << "Kokkos unordered map native took " << duration_kokkos_native.count() << " microseconds." << std::endl;

    // Print a table of the times relative to the std unordered map
    std::cout << "------------------------------------------------------" << std::endl;
    std::cout << std::setw(35) << "Test"
              << " | " << std::setw(10) << "Time (us)"
              << " | " << std::setw(6) << "Ratio" << std::endl;
    std::cout << "------------------------------------------------------" << std::endl;
    std::cout << std::setw(35) << "Std unordered map"
              << " | " << std::setw(10) << duration_std.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << 1.00 << std::endl;
    std::cout << std::setw(35) << "Std unordered map native"
              << " | " << std::setw(10) << duration_std_native.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_std_native.count()) / static_cast<double>(duration_std.count()) << std::endl;
    std::cout << std::setw(35) << "Std unordered set"
              << " | " << std::setw(10) << duration_std_set.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_std_set.count()) / static_cast<double>(duration_std.count()) << std::endl;
    std::cout << std::setw(35) << "Std unordered set native"
              << " | " << std::setw(10) << duration_std_set_native.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_std_set_native.count()) / static_cast<double>(duration_std.count()) << std::endl;
    std::cout << std::setw(35) << "Kokkos unordered map"
              << " | " << std::setw(10) << duration_kokkos.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_kokkos.count()) / static_cast<double>(duration_std.count()) << std::endl;
    std::cout << std::setw(35) << "Kokkos unordered map native"
              << " | " << std::setw(10) << duration_kokkos_native.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_kokkos_native.count()) / static_cast<double>(duration_std.count()) << std::endl;

    // Check the kokkos unordered map against the std unordered map
    CheckKokkosVsUnorderedMap();
}