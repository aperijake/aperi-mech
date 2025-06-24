#include <gtest/gtest.h>
#include <mpi.h>

#include <Kokkos_Core.hpp>
#include <Kokkos_UnorderedMap.hpp>
#include <chrono>
#include <cstdlib>
#include <fstream>
#include <iomanip>
#include <iostream>
#include <map>
#include <string>
#include <unordered_map>
#include <unordered_set>

#include "stk_util/environment/memory_util.hpp"
#include "stk_util/environment/perf_util.hpp"

// Helper to print a table row
void PrintTableRow(
    const std::string& name,
    double reset_time, double reset_ratio,
    double populate_time, double populate_ratio,
    double access_time, double access_ratio,
    double total_time, double total_ratio) {
    std::cout << "| " << std::setw(35) << name
              << " | " << std::setw(14) << std::scientific << std::setprecision(3) << 1e-6 * reset_time
              << " | " << std::setw(14) << std::fixed << std::setprecision(4) << reset_ratio
              << " | " << std::setw(14) << std::scientific << std::setprecision(3) << 1e-6 * populate_time
              << " | " << std::setw(14) << std::fixed << std::setprecision(4) << populate_ratio
              << " | " << std::setw(14) << std::scientific << std::setprecision(3) << 1e-6 * access_time
              << " | " << std::setw(14) << std::fixed << std::setprecision(4) << access_ratio
              << " | " << std::setw(14) << std::scientific << std::setprecision(3) << 1e-6 * total_time
              << " | " << std::setw(14) << std::fixed << std::setprecision(4) << total_ratio
              << " |" << std::endl;
}

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

    double ResetStdMap() {
        auto start = std::chrono::high_resolution_clock::now();
        m_map_std_map.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeMaps() {
        auto start = std::chrono::high_resolution_clock::now();
        m_map_host_mirror.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeMapsDevice() {
        auto start = std::chrono::high_resolution_clock::now();
        m_map.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeSets() {
        auto start = std::chrono::high_resolution_clock::now();
        m_set_host_mirror.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double SizeSetsDevice() {
        auto start = std::chrono::high_resolution_clock::now();
        m_set.clear();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    void PopulateRandomView(size_t size, size_t potential_unique_values = 100, size_t seed = 0) {
        m_random_indices = Kokkos::View<uint64_t*>("random_indices", size);
        m_random_indices_host_mirror = Kokkos::create_mirror_view(m_random_indices);
        srand(seed);
        for (size_t i = 0; i < size; ++i) {
            uint64_t random_value = std::rand() % potential_unique_values;
            m_random_indices_host_mirror(i) = random_value;
        }
        Kokkos::deep_copy(m_random_indices, m_random_indices_host_mirror);
        Kokkos::fence();
    }

    double PopulateStdUnorderedMap() {
        m_map_std.clear();
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_map_std.insert({m_random_indices_host_mirror(i), i});
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateStdUnorderedSet() {
        m_set_std.clear();
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_set_std.insert(m_random_indices_host_mirror(i));
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateStdMap() {
        m_map_std_map.clear();
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_map_std_map.insert({m_random_indices_host_mirror(i), i});
        }
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedMapOnHost() {
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_map_host_mirror.insert(m_random_indices_host_mirror(i), i);
        }
        Kokkos::fence();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedMapOnDevice() {
        auto start = std::chrono::high_resolution_clock::now();
        auto map = m_map;
        auto random_indices = m_random_indices;
        Kokkos::parallel_for(
            "populate_kokkos_unordered_map", random_indices.extent(0), KOKKOS_LAMBDA(const size_t i) { map.insert(random_indices(i), i); });
        Kokkos::fence();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedSetOnHost() {
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            m_set_host_mirror.insert(m_random_indices_host_mirror(i));
        }
        Kokkos::fence();
        auto end = std::chrono::high_resolution_clock::now();
        auto duration = std::chrono::duration_cast<std::chrono::nanoseconds>(end - start);
        return duration.count();
    }

    double PopulateKokkosUnorderedSetOnDevice() {
        auto start = std::chrono::high_resolution_clock::now();
        auto set = m_set;
        auto random_indices = m_random_indices;
        Kokkos::parallel_for(
            "populate_kokkos_unordered_set", random_indices.extent(0), KOKKOS_LAMBDA(const size_t i) { set.insert(random_indices(i)); });
        Kokkos::fence();
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

    std::pair<double, double> RunStdMapNTimes(size_t n) {
        double reset_time = 0;
        double populate_time = 0;
        for (size_t i = 0; i < n; ++i) {
            reset_time += ResetStdMap();
            populate_time += PopulateStdMap();
        }
        return {reset_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedMapOnDeviceNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(num_unique_indices);
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeMapsDevice();
            populate_time += PopulateKokkosUnorderedMapOnDevice();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedSetOnDeviceNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        m_set = Kokkos::UnorderedMap<uint64_t, void>(num_unique_indices);
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeSetsDevice();
            populate_time += PopulateKokkosUnorderedSetOnDevice();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedMapOnHostNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        m_map = Kokkos::UnorderedMap<uint64_t, uint64_t>(num_unique_indices);
        m_map_host_mirror = Kokkos::create_mirror(m_map);
        Kokkos::deep_copy(m_map_host_mirror, m_map);
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeMaps();
            populate_time += PopulateKokkosUnorderedMapOnHost();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    std::pair<double, double> RunKokkosUnorderedSetOnHostNTimes(size_t n, size_t num_unique_indices) {
        double size_time = 0;
        double populate_time = 0;
        m_set = Kokkos::UnorderedMap<uint64_t, void>(num_unique_indices);
        m_set_host_mirror = Kokkos::create_mirror(m_set);
        Kokkos::deep_copy(m_set_host_mirror, m_set);
        for (size_t i = 0; i < n; ++i) {
            size_time += SizeSets();
            populate_time += PopulateKokkosUnorderedSetOnHost();
        }
        return {size_time / 1000.0, populate_time / 1000.0};  // Convert to microseconds
    }

    // Access timing for std::unordered_map
    double AccessStdUnorderedMap() {
        auto start = std::chrono::high_resolution_clock::now();
        volatile uint64_t sum = 0;
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            auto it = m_map_std.find(m_random_indices_host_mirror(i));
            if (it != m_map_std.end()) sum += it->second;
        }
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1000.0;  // Convert to microseconds
    }

    // Access timing for std::map
    double AccessStdMap() {
        auto start = std::chrono::high_resolution_clock::now();
        volatile uint64_t sum = 0;
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            auto it = m_map_std_map.find(m_random_indices_host_mirror(i));
            if (it != m_map_std_map.end()) sum += it->second;
        }
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1000.0;  // Convert to microseconds
    }

    // Access timing for std::unordered_set
    double AccessStdUnorderedSet() {
        auto start = std::chrono::high_resolution_clock::now();
        volatile size_t found = 0;
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            found += m_set_std.find(m_random_indices_host_mirror(i)) != m_set_std.end();
        }
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1000.0;  // Convert to microseconds
    }

    // Access timing for Kokkos::UnorderedMap on host
    double AccessKokkosUnorderedMapOnHost() {
        auto start = std::chrono::high_resolution_clock::now();
        volatile uint64_t sum = 0;
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            auto idx = m_map_host_mirror.find(m_random_indices_host_mirror(i));
            if (idx != m_map_host_mirror.capacity()) sum += m_map_host_mirror.value_at(idx);
        }
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1000.0;  // Convert to microseconds
    }

    // Access timing for Kokkos::UnorderedMap on device
    double AccessKokkosUnorderedMapOnDevice() {
        Kokkos::View<uint64_t> sum("sum");
        auto map = m_map;
        auto random_indices = m_random_indices;
        auto start = std::chrono::high_resolution_clock::now();
        Kokkos::parallel_reduce(
            "access_kokkos_unordered_map",
            random_indices.extent(0),
            KOKKOS_LAMBDA(const size_t i, uint64_t& lsum) {
                auto idx = map.find(random_indices(i));
                if (idx != map.capacity()) lsum += map.value_at(idx);
            },
            sum);
        Kokkos::fence();
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1000.0;  // Convert to microseconds
    }

    // Access timing for Kokkos::UnorderedSet on host
    double AccessKokkosUnorderedSetOnHost() {
        auto start = std::chrono::high_resolution_clock::now();
        volatile size_t found = 0;
        for (size_t i = 0; i < m_random_indices_host_mirror.extent(0); ++i) {
            found += m_set_host_mirror.exists(m_random_indices_host_mirror(i));
        }
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1000.0;  // Convert to microseconds
    }

    // Access timing for Kokkos::UnorderedSet on device
    double AccessKokkosUnorderedSetOnDevice() {
        Kokkos::View<size_t> found("found");
        auto set = m_set;
        auto random_indices = m_random_indices;
        auto start = std::chrono::high_resolution_clock::now();
        Kokkos::parallel_reduce(
            "access_kokkos_unordered_set",
            random_indices.extent(0),
            KOKKOS_LAMBDA(const size_t i, size_t& lfound) {
                lfound += set.exists(random_indices(i));
            },
            found);
        Kokkos::fence();
        auto end = std::chrono::high_resolution_clock::now();
        return std::chrono::duration_cast<std::chrono::nanoseconds>(end - start).count() / 1000.0;  // Convert to microseconds
    }

    void RunTest(size_t num_indices, size_t num_unique_indices, size_t num_iterations) {
        PopulateRandomView(num_indices, num_unique_indices);

        auto [std_unordered_map_reset_time, std_unordered_map_populate_time] = RunStdUnorderedMapNTimes(num_iterations);
        auto [std_map_reset_time, std_map_populate_time] = RunStdMapNTimes(num_iterations);
        auto [std_unordered_set_reset_time, std_unordered_set_populate_time] = RunStdUnorderedSetNTimes(num_iterations);
        auto [kokkos_map_host_size_time, kokkos_map_host_populate_time] = RunKokkosUnorderedMapOnHostNTimes(num_iterations, num_unique_indices);
        auto [kokkos_set_host_size_time, kokkos_set_host_populate_time] = RunKokkosUnorderedSetOnHostNTimes(num_iterations, num_unique_indices);
        auto [kokkos_map_device_size_time, kokkos_map_device_populate_time] = RunKokkosUnorderedMapOnDeviceNTimes(num_iterations, num_unique_indices);
        auto [kokkos_set_device_size_time, kokkos_set_device_populate_time] = RunKokkosUnorderedSetOnDeviceNTimes(num_iterations, num_unique_indices);

        // Access timings
        double std_unordered_set_access_time = AccessStdUnorderedSet();
        double std_unordered_map_access_time = AccessStdUnorderedMap();
        double std_map_access_time = AccessStdMap();
        double kokkos_map_host_access_time = AccessKokkosUnorderedMapOnHost();
        double kokkos_set_host_access_time = AccessKokkosUnorderedSetOnHost();
        double kokkos_map_device_access_time = AccessKokkosUnorderedMapOnDevice();
        double kokkos_set_device_access_time = AccessKokkosUnorderedSetOnDevice();

        double std_unordered_set_total_time = std_unordered_set_reset_time + std_unordered_set_populate_time + std_unordered_set_access_time;

        CheckKokkosVsStdSet();
        CheckKokkosVsStdMap();
        Kokkos::deep_copy(m_set_host_mirror, m_set);
        CheckKokkosVsStdSet();

        std::cout << std::scientific << std::uppercase << std::setprecision(1);
        std::cout << "### Parameters: " << static_cast<double>(num_iterations) << " iterations with " << static_cast<double>(num_indices) << " indices and " << static_cast<double>(num_unique_indices) << " unique indices" << std::endl
                  << std::endl;
        std::cout << "| " << std::setw(35) << "Test"
                  << " | " << std::setw(14) << "Reset Time"
                  << " | " << std::setw(14) << "Reset Ratio"
                  << " | " << std::setw(14) << "Populate Time"
                  << " | " << std::setw(14) << "Populate Ratio"
                  << " | " << std::setw(14) << "Access Time"
                  << " | " << std::setw(14) << "Access Ratio"
                  << " | " << std::setw(14) << "Total Time"
                  << " | " << std::setw(14) << "Total Ratio"
                  << " |" << std::endl;
        // Print markdown separator line
        std::cout << "|";
        std::cout << std::string(37, '-') << "|";
        std::cout << std::string(16, '-') << "|";
        std::cout << std::string(16, '-') << "|";
        std::cout << std::string(16, '-') << "|";
        std::cout << std::string(16, '-') << "|";
        std::cout << std::string(16, '-') << "|";
        std::cout << std::string(16, '-') << "|";
        std::cout << std::string(16, '-') << "|";
        std::cout << std::string(16, '-') << "|" << std::endl;

        // Print markdown units line
        std::cout << "|";
        std::cout << std::setw(37) << " "
                  << "|";
        std::cout << std::setw(16) << "(seconds)"
                  << "|";
        std::cout << std::setw(16) << " "
                  << "|";
        std::cout << std::setw(16) << "(seconds)"
                  << "|";
        std::cout << std::setw(16) << " "
                  << "|";
        std::cout << std::setw(16) << "(seconds)"
                  << "|";
        std::cout << std::setw(16) << " "
                  << "|";
        std::cout << std::setw(16) << "(seconds)"
                  << "|";
        std::cout << std::setw(16) << " "
                  << "|" << std::endl;
        std::cout << std::fixed;

        PrintTableRow("Std unordered set",
                      std_unordered_set_reset_time, 1.0,
                      std_unordered_set_populate_time, 1.0,
                      std_unordered_set_access_time, 1.0,
                      std_unordered_set_total_time, 1.0);

        PrintTableRow("Std unordered map",
                      std_unordered_map_reset_time, std_unordered_map_reset_time / std_unordered_set_reset_time,
                      std_unordered_map_populate_time, std_unordered_map_populate_time / std_unordered_set_populate_time,
                      std_unordered_map_access_time, std_unordered_map_access_time / std_unordered_set_access_time,
                      (std_unordered_map_reset_time + std_unordered_map_populate_time + std_unordered_map_access_time), (std_unordered_map_reset_time + std_unordered_map_populate_time + std_unordered_map_access_time) / std_unordered_set_total_time);

        PrintTableRow("Std map",
                      std_map_reset_time, std_map_reset_time / std_unordered_set_reset_time,
                      std_map_populate_time, std_map_populate_time / std_unordered_set_populate_time,
                      std_map_access_time, std_map_access_time / std_unordered_set_access_time,
                      (std_map_reset_time + std_map_populate_time + std_map_access_time), (std_map_reset_time + std_map_populate_time + std_map_access_time) / std_unordered_set_total_time);

        PrintTableRow("Kokkos unordered map on host",
                      kokkos_map_host_size_time, kokkos_map_host_size_time / std_unordered_set_reset_time,
                      kokkos_map_host_populate_time, kokkos_map_host_populate_time / std_unordered_set_populate_time,
                      kokkos_map_host_access_time, kokkos_map_host_access_time / std_unordered_set_access_time,
                      (kokkos_map_host_size_time + kokkos_map_host_populate_time + kokkos_map_host_access_time), (kokkos_map_host_size_time + kokkos_map_host_populate_time + kokkos_map_host_access_time) / std_unordered_set_total_time);

        PrintTableRow("Kokkos unordered set on host",
                      kokkos_set_host_size_time, kokkos_set_host_size_time / std_unordered_set_reset_time,
                      kokkos_set_host_populate_time, kokkos_set_host_populate_time / std_unordered_set_populate_time,
                      kokkos_set_host_access_time, kokkos_set_host_access_time / std_unordered_set_access_time,
                      (kokkos_set_host_size_time + kokkos_set_host_populate_time + kokkos_set_host_access_time), (kokkos_set_host_size_time + kokkos_set_host_populate_time + kokkos_set_host_access_time) / std_unordered_set_total_time);

        PrintTableRow("Kokkos unordered map on device",
                      kokkos_map_device_size_time, kokkos_map_device_size_time / std_unordered_set_reset_time,
                      kokkos_map_device_populate_time, kokkos_map_device_populate_time / std_unordered_set_populate_time,
                      kokkos_map_device_access_time, kokkos_map_device_access_time / std_unordered_set_access_time,
                      (kokkos_map_device_size_time + kokkos_map_device_populate_time + kokkos_map_device_access_time), (kokkos_map_device_size_time + kokkos_map_device_populate_time + kokkos_map_device_access_time) / std_unordered_set_total_time);

        PrintTableRow("Kokkos unordered set on device",
                      kokkos_set_device_size_time, kokkos_set_device_size_time / std_unordered_set_reset_time,
                      kokkos_set_device_populate_time, kokkos_set_device_populate_time / std_unordered_set_populate_time,
                      kokkos_set_device_access_time, kokkos_set_device_access_time / std_unordered_set_access_time,
                      (kokkos_set_device_size_time + kokkos_set_device_populate_time + kokkos_set_device_access_time), (kokkos_set_device_size_time + kokkos_set_device_populate_time + kokkos_set_device_access_time) / std_unordered_set_total_time);

        std::cout << std::endl;
    }

    Kokkos::View<uint64_t*> m_random_indices;
    Kokkos::View<uint64_t*>::HostMirror m_random_indices_host_mirror;

    Kokkos::UnorderedMap<uint64_t, uint64_t> m_map;
    Kokkos::UnorderedMap<uint64_t, uint64_t>::HostMirror m_map_host_mirror;

    Kokkos::UnorderedMap<uint64_t, void> m_set;
    Kokkos::UnorderedMap<uint64_t, void>::HostMirror m_set_host_mirror;

    std::unordered_map<uint64_t, uint64_t> m_map_std;
    std::unordered_set<uint64_t> m_set_std;
    std::map<uint64_t, uint64_t> m_map_std_map;
};

TEST_F(UnorderedMapFixture, UnorderedMapTest) {
    // This runs all the tests and creates a table of results.
    // No memory checking is done here as it is cleaner to do it in the individual tests (below).
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }

    std::vector<double> num_indices_list = {1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7};
    std::vector<double> fill_ratios = {0.001, 0.01, 0.1, 1.0};
    size_t max_num_iterations_times_num_indices = 1e7;
    size_t max_num_iterations = 1e4;

    std::cout << "# Unordered Map, Set, and Map Performance Tests" << std::endl;
    std::cout << "This test measures the performance of unordered maps and sets in C++ using Kokkos and standard library implementations." << std::endl
              << std::endl;
    std::cout << "## Test Results" << std::endl
              << std::endl;

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
            RunTest(num_indices, num_unique_indices, num_iterations);
        }
    }
}

enum class ContainerScenario {
    StdUnorderedSet,
    StdUnorderedMap,
    StdMap,
    KokkosUnorderedMapHost,
    KokkosUnorderedSetHost,
    KokkosUnorderedMapDevice,
    KokkosUnorderedSetDevice
};

struct PerfTestParams {
    size_t num_indices;
    size_t num_unique_indices;
    size_t num_iterations;
    ContainerScenario scenario;
    std::string name() const {
        std::ostringstream oss;
        oss << "N_" << num_indices << "_U_" << num_unique_indices << "_I_" << num_iterations;
        switch (scenario) {
            case ContainerScenario::StdUnorderedSet:
                oss << "_StdUnorderedSet";
                break;
            case ContainerScenario::StdUnorderedMap:
                oss << "_StdUnorderedMap";
                break;
            case ContainerScenario::StdMap:
                oss << "_StdMap";
                break;
            case ContainerScenario::KokkosUnorderedMapHost:
                oss << "_KokkosMapHost";
                break;
            case ContainerScenario::KokkosUnorderedSetHost:
                oss << "_KokkosSetHost";
                break;
            case ContainerScenario::KokkosUnorderedMapDevice:
                oss << "_KokkosMapDevice";
                break;
            case ContainerScenario::KokkosUnorderedSetDevice:
                oss << "_KokkosSetDevice";
                break;
        }
        return oss.str();
    }
};

class UnorderedMapPerfTest : public UnorderedMapFixture, public ::testing::WithParamInterface<PerfTestParams> {};

TEST_P(UnorderedMapPerfTest, RunPerfCase) {
    // This runs a single test case with the given parameters, checking memory and performance.
    // A csv file is created with the results. You need to manually manage deleting the csv file if you want to run a fresh set of tests.
    int num_procs;
    MPI_Comm_size(MPI_COMM_WORLD, &num_procs);
    if (num_procs > 1) {
        GTEST_SKIP_("Test only runs with 1 or fewer processes.");
    }
    const auto& p = GetParam();
    PopulateRandomView(p.num_indices, p.num_unique_indices);

    std::cout << "# Unordered Map, Set, and Map Performance Test: " << p.name() << std::endl;

    // Only run the selected scenario
    std::pair<double, double> reset_populate_times;
    double access_time = 0.0;
    std::string scenario_name;
    if (p.scenario == ContainerScenario::StdUnorderedSet) {
        reset_populate_times = RunStdUnorderedSetNTimes(p.num_iterations);
        access_time = AccessStdUnorderedSet();
        scenario_name = "Std unordered set";
    } else if (p.scenario == ContainerScenario::StdUnorderedMap) {
        reset_populate_times = RunStdUnorderedMapNTimes(p.num_iterations);
        access_time = AccessStdUnorderedMap();
        scenario_name = "Std unordered map";
    } else if (p.scenario == ContainerScenario::StdMap) {
        reset_populate_times = RunStdMapNTimes(p.num_iterations);
        access_time = AccessStdMap();
        scenario_name = "Std map";
    } else if (p.scenario == ContainerScenario::KokkosUnorderedMapHost) {
        reset_populate_times = RunKokkosUnorderedMapOnHostNTimes(p.num_iterations, p.num_unique_indices);
        access_time = AccessKokkosUnorderedMapOnHost();
        scenario_name = "Kokkos unordered map on host";
    } else if (p.scenario == ContainerScenario::KokkosUnorderedSetHost) {
        reset_populate_times = RunKokkosUnorderedSetOnHostNTimes(p.num_iterations, p.num_unique_indices);
        access_time = AccessKokkosUnorderedSetOnHost();
        scenario_name = "Kokkos unordered set on host";
    } else if (p.scenario == ContainerScenario::KokkosUnorderedMapDevice) {
        reset_populate_times = RunKokkosUnorderedMapOnDeviceNTimes(p.num_iterations, p.num_unique_indices);
        access_time = AccessKokkosUnorderedMapOnDevice();
        scenario_name = "Kokkos unordered map on device";
    } else if (p.scenario == ContainerScenario::KokkosUnorderedSetDevice) {
        reset_populate_times = RunKokkosUnorderedSetOnDeviceNTimes(p.num_iterations, p.num_unique_indices);
        access_time = AccessKokkosUnorderedSetOnDevice();
        scenario_name = "Kokkos unordered set on device";
    }

    // Memory usage reporting
    MPI_Comm comm = MPI_COMM_WORLD;
    size_t max_hwm = stk::get_max_hwm_across_procs(comm);

    // Get GPU memory info if device scenario
    size_t gpu_used = 0;
    size_t gpu_free = 0;
    stk::get_gpu_memory_info(gpu_used, gpu_free);

    // CSV output
    std::string csv_filename = "unordered_map_perf_results.csv";
    std::ifstream infile(csv_filename);
    bool file_exists = infile.good();
    infile.close();

    std::ofstream csv(csv_filename, std::ios::app);
    if (!file_exists) {
        csv << "scenario,num_indices,num_unique_indices,num_iterations,reset_time_us,populate_time_us,access_time_us,total_time_us,max_hwm_bytes,gpu_used_bytes\n";
    }
    double reset_time = reset_populate_times.first;
    double populate_time = reset_populate_times.second;
    double total_time = reset_time + populate_time + access_time;
    csv << "\"" << scenario_name << "\","
        << p.num_indices << ","
        << p.num_unique_indices << ","
        << p.num_iterations << ","
        << reset_time << ","
        << populate_time << ","
        << access_time << ","
        << total_time << ","
        << max_hwm << ","
        << gpu_used << "\n";
    csv.close();
}

// Generate all parameter combinations
std::vector<PerfTestParams> GeneratePerfParams() {
    std::vector<double> num_indices_list = {1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7};
    std::vector<double> fill_ratios = {0.001, 0.01, 0.1, 1.0};
    size_t max_num_iterations_times_num_indices = 1e7;
    size_t max_num_iterations = 1e4;
    std::vector<PerfTestParams> params;
    for (auto num_indices_d : num_indices_list) {
        auto num_indices = static_cast<size_t>(num_indices_d);
        for (auto fill_ratio : fill_ratios) {
            size_t num_iterations = max_num_iterations;
            auto num_unique_indices = static_cast<size_t>(num_indices * fill_ratio);
            if (num_unique_indices == 0) continue;
            if (num_indices * num_iterations > max_num_iterations_times_num_indices) {
                num_iterations = static_cast<size_t>(max_num_iterations_times_num_indices / num_indices);
            }
            for (int scenario = 0; scenario < 7; ++scenario) {
                params.push_back({num_indices, num_unique_indices, num_iterations, static_cast<ContainerScenario>(scenario)});
            }
        }
    }
    return params;
}

INSTANTIATE_TEST_SUITE_P(
    UnorderedMapPerfCases,
    UnorderedMapPerfTest,
    ::testing::ValuesIn(GeneratePerfParams()),
    [](const ::testing::TestParamInfo<UnorderedMapPerfTest::ParamType>& info) {
        return info.param.name();
    });