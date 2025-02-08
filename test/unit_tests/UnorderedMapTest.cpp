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
   public:
    void SetUp() override {
    }

    void TearDown() override {
    }

    void Reset() {
        // m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>();
        // m_map_host_mirror = Kokkos::create_mirror(m_map);
        // m_set = Kokkos::UnorderedMap<uint64_t, void>();
        // m_set_host_mirror = Kokkos::create_mirror(m_set);
        m_map_std.clear();
        m_set_std.clear();
    }

    void SizeMaps(size_t size) {
        m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(size);
        m_map_host_mirror = Kokkos::create_mirror(m_map);
        Kokkos::deep_copy(m_map_host_mirror, m_map);  // This is needed or inserting into the host map will get stuck in an infinite loop
    }

    void SizeMapsDevice(size_t size) {
        m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(size);
    }

    void SizeSets(size_t size) {
        m_set = Kokkos::UnorderedMap<uint64_t, void>(size);
        m_set_host_mirror = Kokkos::create_mirror(m_set);
        Kokkos::deep_copy(m_set_host_mirror, m_set);
    }

    void SizeSetsDevice(size_t size) {
        m_set = Kokkos::UnorderedMap<uint64_t, void>(size);
    }

    void PopulateRandomView(size_t size, size_t potential_unique_values = 100, size_t seed = 0) {
        m_random_indices = Kokkos::View<uint64_t *>("random_indices", size);
        m_random_indices_host_mirror = Kokkos::create_mirror_view(m_random_indices);
        srand(seed);
        for (size_t i = 0; i < size; ++i) {
            uint64_t random_value = std::rand() % potential_unique_values;
            m_random_indices_host_mirror(i) = random_value;
        }
        Kokkos::deep_copy(m_random_indices, m_random_indices_host_mirror);
    }

    void PopulateStdUnorderedMap() {
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_map_std.insert({m_random_indices_host_mirror(i), i});
        }
    }

    void PopulateStdUnorderedSet() {
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_set_std.insert(m_random_indices_host_mirror(i));
        }
    }

    void PopulateKokkosUnorderedMapOnHost() {
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_map_host_mirror.insert(m_random_indices_host_mirror(i), i);
        }
    }

    void PopulateKokkosUnorderedMapOnDevice() {
        auto map = m_map;
        auto random_indices = m_random_indices;
        Kokkos::parallel_for(
            "populate_kokkos_unordered_map", random_indices.extent(0), KOKKOS_LAMBDA(const size_t i) { map.insert(random_indices(i), i); });
    }

    void PopulateKokkosUnorderedSetOnHost() {
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_set_host_mirror.insert(m_random_indices_host_mirror(i));
        }
    }

    void PopulateKokkosUnorderedSetOnDevice() {
        auto set = m_set;
        auto random_indices = m_random_indices;
        Kokkos::parallel_for(
            "populate_kokkos_unordered_set", random_indices.extent(0), KOKKOS_LAMBDA(const size_t i) { set.insert(random_indices(i)); });
    }

    void do_map_check() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            // Check the maps
            auto kokkos_value = m_map_host_mirror.value_at(m_map_host_mirror.find(m_random_indices_host_mirror(i)));
            auto std_value = m_map_std.find(m_random_indices_host_mirror(i));
            EXPECT_EQ(kokkos_value, std_value->second);
        }
    }

    void do_set_check() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            // Check the sets
            EXPECT_EQ(m_set_host_mirror.exists(m_random_indices_host_mirror(i)), m_set_std.find(m_random_indices_host_mirror(i)) != m_set_std.end());
        }
    }

    void CheckKokkosVsStd() {
        do_map_check();
        do_set_check();
        Kokkos::deep_copy(m_set_host_mirror, m_set);
        // do_set_check();
        //  Device map wouldn't have the same values as the host map due to threads and what value are being inserted into the map first.
    }

    void RunTest(size_t num_indices, size_t num_unique_indices) {
        // Reset the maps
        Reset();

        // Populate the random indices
        PopulateRandomView(num_indices, num_unique_indices);

        // Populate the std unordered map. Timed.
        auto start_std = std::chrono::high_resolution_clock::now();
        PopulateStdUnorderedMap();
        auto end_std = std::chrono::high_resolution_clock::now();
        auto duration_std = std::chrono::duration_cast<std::chrono::microseconds>(end_std - start_std);

        // Populate the std unordered set. Timed.
        auto start_std_set = std::chrono::high_resolution_clock::now();
        PopulateStdUnorderedSet();
        auto end_std_set = std::chrono::high_resolution_clock::now();
        auto duration_std_set = std::chrono::duration_cast<std::chrono::microseconds>(end_std_set - start_std_set);

        // Populate the kokkos unordered map on device. Timed.
        auto start_kokkos_device = std::chrono::high_resolution_clock::now();
        SizeMapsDevice(num_unique_indices);
        PopulateKokkosUnorderedMapOnDevice();
        auto end_kokkos_device = std::chrono::high_resolution_clock::now();
        auto duration_kokkos_device = std::chrono::duration_cast<std::chrono::microseconds>(end_kokkos_device - start_kokkos_device);

        // Populate the kokkos unordered set on device. Timed.
        auto start_kokkos_set_device = std::chrono::high_resolution_clock::now();
        SizeSetsDevice(num_unique_indices);
        PopulateKokkosUnorderedSetOnDevice();
        auto end_kokkos_set_device = std::chrono::high_resolution_clock::now();
        auto duration_kokkos_set_device = std::chrono::duration_cast<std::chrono::microseconds>(end_kokkos_set_device - start_kokkos_set_device);

        // Populate the kokkos unordered map. Timed.
        auto start_kokkos = std::chrono::high_resolution_clock::now();
        SizeMaps(num_unique_indices);
        PopulateKokkosUnorderedMapOnHost();
        auto end_kokkos = std::chrono::high_resolution_clock::now();
        auto duration_kokkos = std::chrono::duration_cast<std::chrono::microseconds>(end_kokkos - start_kokkos);

        // Populate the kokkos unordered set. Timed.
        auto start_kokkos_set = std::chrono::high_resolution_clock::now();
        SizeSets(num_unique_indices);
        PopulateKokkosUnorderedSetOnHost();
        auto end_kokkos_set = std::chrono::high_resolution_clock::now();
        auto duration_kokkos_set = std::chrono::duration_cast<std::chrono::microseconds>(end_kokkos_set - start_kokkos_set);

        // Print a table of the times relative to the std unordered set
        std::cout << "-------------------------------------------------------------" << std::endl;
        std::cout << std::setw(35) << "Test"
                  << " | " << std::setw(10) << "Time (us)"
                  << " | " << std::setw(6) << "Ratio to std unordered set" << std::endl;
        std::cout << "-------------------------------------------------------------" << std::endl;
        std::cout << std::setw(35) << "Std unordered set"
                  << " | " << std::setw(10) << duration_std_set.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_std_set.count()) / static_cast<double>(duration_std_set.count()) << std::endl;
        std::cout << std::setw(35) << "Std unordered map"
                  << " | " << std::setw(10) << duration_std.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_std.count()) / static_cast<double>(duration_std_set.count()) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered set"
                  << " | " << std::setw(10) << duration_kokkos_set.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_kokkos_set.count()) / static_cast<double>(duration_std_set.count()) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered map"
                  << " | " << std::setw(10) << duration_kokkos.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_kokkos.count()) / static_cast<double>(duration_std_set.count()) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered map on device"
                  << " | " << std::setw(10) << duration_kokkos_device.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_kokkos_device.count()) / static_cast<double>(duration_std_set.count()) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered set on device"
                  << " | " << std::setw(10) << duration_kokkos_set_device.count() << " | " << std::setw(6) << std::fixed << std::setprecision(2) << static_cast<double>(duration_kokkos_set_device.count()) / static_cast<double>(duration_std_set.count()) << std::endl;
        std::cout << "-------------------------------------------------------------" << std::endl;

        // Check the kokkos unordered map against the std unordered map
        CheckKokkosVsStd();
    }

    Kokkos::View<uint64_t *> m_random_indices;
    Kokkos::View<uint64_t *>::HostMirror m_random_indices_host_mirror;

    Kokkos::UnorderedMap<uint64_t, uint64_t> m_map;
    Kokkos::UnorderedMap<uint64_t, uint64_t>::HostMirror m_map_host_mirror;

    Kokkos::UnorderedMap<uint64_t, void> m_set;
    Kokkos::UnorderedMap<uint64_t, void>::HostMirror m_set_host_mirror;

    std::unordered_map<uint64_t, uint64_t> m_map_std;
    std::unordered_set<uint64_t> m_set_std;
};

TEST_F(UnorderedMapFixture, UnorderedMapTest) {
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }

    std::vector<double> num_indices_list = {1e3, 1e4, 1e5, 1e6, 1e7};  //, 1e8};
    std::vector<double> fill_ratios = {0.001, 0.01, 0.1, 1.0};
    for (auto num_indices : num_indices_list) {
        for (auto fill_ratio : fill_ratios) {
            size_t num_unique_indices = static_cast<size_t>(num_indices * fill_ratio);
            std::cout << "---------------------------------------------" << std::endl;
            std::cout << "Testing with " << static_cast<size_t>(num_indices) << " indices and " << num_unique_indices << " unique indices." << std::endl;
            RunTest(static_cast<size_t>(num_indices), num_unique_indices);
            std::cout << "---------------------------------------------" << std::endl
                      << std::endl;
        }
    }
}