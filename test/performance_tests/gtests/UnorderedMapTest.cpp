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

    double ResetStdUnorderedMap() {
        auto start = std::chrono::high_resolution_clock::now();
        m_map_std.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double ResetStdUnorderedSet() {
        auto start = std::chrono::high_resolution_clock::now();
        m_set_std.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeMaps(size_t size) {
        if (size != m_map_host_mirror.capacity()) {
            m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(size);
            m_map_host_mirror = Kokkos::create_mirror(m_map);
            Kokkos::deep_copy(m_map_host_mirror, m_map);
        }
        auto start = std::chrono::high_resolution_clock::now();
        m_map_host_mirror.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeMapsDevice(size_t size) {
        if (size != m_map.capacity()) {
            m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(size);
        }
        auto start = std::chrono::high_resolution_clock::now();
        // m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(size);
        m_map.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeSets(size_t size) {
        if (size != m_set_host_mirror.capacity()) {
            m_set = Kokkos::UnorderedMap<uint64_t, void>(size);
            m_set_host_mirror = Kokkos::create_mirror(m_set);
            Kokkos::deep_copy(m_set_host_mirror, m_set);
        }
        auto start = std::chrono::high_resolution_clock::now();
        m_set_host_mirror.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeSetsDevice(size_t size) {
        if (size != m_set.capacity()) {
            m_set = Kokkos::UnorderedMap<uint64_t, void>(size);
        }
        auto start = std::chrono::high_resolution_clock::now();
        // m_set = Kokkos::UnorderedMap<uint64_t, void>(size);
        m_set.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
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

    double PopulateStdUnorderedMap() {
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_map_std.insert({m_random_indices_host_mirror(i), i});
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateStdUnorderedSet() {
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_set_std.insert(m_random_indices_host_mirror(i));
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedMapOnHost() const {
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_map_host_mirror.insert(m_random_indices_host_mirror(i), i);
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedMapOnDevice() const {
        auto start = std::chrono::high_resolution_clock::now();
        auto map = m_map;
        auto random_indices = m_random_indices;
        Kokkos::parallel_for(
            "populate_kokkos_unordered_map", random_indices.extent(0), KOKKOS_LAMBDA(const size_t i) { map.insert(random_indices(i), i); });
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedSetOnHost() const {
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_set_host_mirror.insert(m_random_indices_host_mirror(i));
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedSetOnDevice() const {
        auto start = std::chrono::high_resolution_clock::now();
        auto set = m_set;
        auto random_indices = m_random_indices;
        Kokkos::parallel_for(
            "populate_kokkos_unordered_set", random_indices.extent(0), KOKKOS_LAMBDA(const size_t i) { set.insert(random_indices(i)); });
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    void CheckKokkosVsStdMap() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            auto kokkos_value = m_map_host_mirror.value_at(m_map_host_mirror.find(m_random_indices_host_mirror(i)));
            auto std_value = m_map_std.find(m_random_indices_host_mirror(i));
            EXPECT_EQ(kokkos_value, std_value->second);
        }
    }

    void CheckKokkosVsStdSet() {
        for (size_t i = 0; i < m_random_indices.extent(0); ++i) {
            EXPECT_EQ(m_set_host_mirror.exists(m_random_indices_host_mirror(i)), m_set_std.find(m_random_indices_host_mirror(i)) != m_set_std.end());
        }
    }

    std::pair<double, double> RunStdUnorderedMapNTimes(size_t n) {
        double reset_time = 0;
        double populate_time = 0;
        for (size_t i = 0; i < n; ++i) {
            reset_time += ResetStdUnorderedMap();
            populate_time += PopulateStdUnorderedMap();
        }
        return {reset_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunStdUnorderedSetNTimes(size_t n) {
        double reset_time = 0;
        double populate_time = 0;
        for (size_t i = 0; i < n; ++i) {
            reset_time += ResetStdUnorderedSet();
            populate_time += PopulateStdUnorderedSet();
        }
        return {reset_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedMapOnDeviceNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeMapsDevice(num_unique_indices);
            populate_time += PopulateKokkosUnorderedMapOnDevice();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedSetOnDeviceNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeSetsDevice(num_unique_indices);
            populate_time += PopulateKokkosUnorderedSetOnDevice();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedMapOnHostNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeMaps(num_unique_indices);
            populate_time += PopulateKokkosUnorderedMapOnHost();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedSetOnHostNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeSets(num_unique_indices);
            populate_time += PopulateKokkosUnorderedSetOnHost();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    void RunTest(size_t num_indices, size_t num_unique_indices, size_t num_iterations) {
        PopulateRandomView(num_indices, num_unique_indices);

        auto [std_unordered_map_reset_time, std_unordered_map_populate_time] = RunStdUnorderedMapNTimes(num_iterations);
        auto [std_unordered_set_reset_time, std_unordered_set_populate_time] = RunStdUnorderedSetNTimes(num_iterations);
        auto [kokkos_map_host_size_time, kokkos_map_host_populate_time] = RunKokkosUnorderedMapOnHostNTimes(num_iterations, num_unique_indices);
        auto [kokkos_set_host_size_time, kokkos_set_host_populate_time] = RunKokkosUnorderedSetOnHostNTimes(num_iterations, num_unique_indices);
        CheckKokkosVsStdSet();
        CheckKokkosVsStdMap();

        auto [kokkos_map_device_size_time, kokkos_map_device_populate_time] = RunKokkosUnorderedMapOnDeviceNTimes(num_iterations, num_unique_indices);
        auto [kokkos_set_device_size_time, kokkos_set_device_populate_time] = RunKokkosUnorderedSetOnDeviceNTimes(num_iterations, num_unique_indices);
        Kokkos::deep_copy(m_set_host_mirror, m_set);
        CheckKokkosVsStdSet();
        // Map is expected to be different on device as the order of insertion is not guaranteed to be the same

        double std_unordered_set_total_time = std_unordered_set_reset_time + std_unordered_set_populate_time;

        std::cout << "------------------------------------------------------------------------------------------------------------------------------------------------" << std::endl;
        std::cout << std::setw(35) << "Test"
                  << " | " << std::setw(15) << "Reset Time"
                  << " | " << std::setw(15) << "Reset Ratio"
                  << " | " << std::setw(15) << "Populate Time"
                  << " | " << std::setw(15) << "Populate Ratio"
                  << " | " << std::setw(15) << "Total Time"
                  << " | " << std::setw(15) << "Total Ratio" << std::endl;
        std::cout << std::setw(35) << ""
                  << " | " << std::setw(15) << "(seconds)"
                  << " | " << std::setw(15) << ""
                  << " | " << std::setw(15) << "(seconds)"
                  << " | " << std::setw(15) << ""
                  << " | " << std::setw(15) << "(seconds)"
                  << " | " << std::setw(15) << "" << std::endl;
        std::cout << "------------------------------------------------------------------------------------------------------------------------------------------------" << std::endl;
        std::cout << std::setw(35) << "Std unordered set"
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * std_unordered_set_reset_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << 1.0
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * std_unordered_set_populate_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << 1.0
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * std_unordered_set_total_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << 1.0 << std::endl;
        std::cout << std::setw(35) << "Std unordered map"
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * std_unordered_map_reset_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (std_unordered_map_reset_time / std_unordered_set_reset_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * std_unordered_map_populate_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (std_unordered_map_populate_time / std_unordered_set_populate_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * (std_unordered_map_reset_time + std_unordered_map_populate_time)
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << ((std_unordered_map_reset_time + std_unordered_map_populate_time) / std_unordered_set_total_time) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered map on host"
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_map_host_size_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_map_host_size_time / std_unordered_set_reset_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_map_host_populate_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_map_host_populate_time / std_unordered_set_populate_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * (kokkos_map_host_size_time + kokkos_map_host_populate_time)
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << ((kokkos_map_host_size_time + kokkos_map_host_populate_time) / std_unordered_set_total_time) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered set on host"
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_set_host_size_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_set_host_size_time / std_unordered_set_reset_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_set_host_populate_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_set_host_populate_time / std_unordered_set_populate_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * (kokkos_set_host_size_time + kokkos_set_host_populate_time)
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << ((kokkos_set_host_size_time + kokkos_set_host_populate_time) / std_unordered_set_total_time) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered map on device"
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_map_device_size_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_map_device_size_time / std_unordered_set_reset_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_map_device_populate_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_map_device_populate_time / std_unordered_set_populate_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * (kokkos_map_device_size_time + kokkos_map_device_populate_time)
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << ((kokkos_map_device_size_time + kokkos_map_device_populate_time) / std_unordered_set_total_time) << std::endl;
        std::cout << std::setw(35) << "Kokkos unordered set on device"
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_set_device_size_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_set_device_size_time / std_unordered_set_reset_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * kokkos_set_device_populate_time
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << (kokkos_set_device_populate_time / std_unordered_set_populate_time)
                  << " | " << std::setw(15) << std::scientific << std::setprecision(3) << 1e-6 * (kokkos_set_device_size_time + kokkos_set_device_populate_time)
                  << " | " << std::setw(15) << std::fixed << std::setprecision(4) << ((kokkos_set_device_size_time + kokkos_set_device_populate_time) / std_unordered_set_total_time) << std::endl;
        std::cout << "------------------------------------------------------------------------------------------------------------------------------------------------" << std::endl;
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

    std::vector<double> num_indices_list = {1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7};
    std::vector<double> fill_ratios = {0.001, 0.01, 0.1, 1.0};
    int max_num_iterations_times_num_indices = 1e7;
    size_t max_num_iterations = 1e4;
    for (auto num_indices_d : num_indices_list) {
        auto num_indices = static_cast<size_t>(num_indices_d);
        for (auto fill_ratio : fill_ratios) {
            size_t num_iterations = max_num_iterations;
            auto num_unique_indices = static_cast<size_t>(num_indices * fill_ratio);
            if (num_unique_indices == 0) {
                continue;
            }
            if (num_indices * num_iterations > max_num_iterations_times_num_indices) {
                // Change the number of iterations to keep the total number of operations under max_num_iterations_times_num_indices
                num_iterations = static_cast<size_t>(max_num_iterations_times_num_indices / num_indices);
            }
            std::cout << "------------------------------------------------------------------------------------------------------------------------------------------------" << std::endl;
            std::cout << std::scientific << std::uppercase << std::setprecision(1);
            std::cout << "Testing " << static_cast<double>(num_iterations) << " iterations with " << static_cast<double>(num_indices) << " indices and " << static_cast<double>(num_unique_indices) << " unique indices." << std::endl;
            std::cout << std::fixed;
            RunTest(num_indices, num_unique_indices, num_iterations);
            std::cout << "------------------------------------------------------------------------------------------------------------------------------------------------" << std::endl;
        }
    }
}