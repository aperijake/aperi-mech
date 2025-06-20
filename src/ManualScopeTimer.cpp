#include "ManualScopeTimer.h"

#include <mpi.h>

#include <iomanip>
#include <sstream>

#include "Kokkos_Core.hpp"
#include "SimpleTimerFactory.h"

namespace aperi {

std::mutex ManualScopeTimer::s_log_mutex;

ManualScopeTimer::ManualScopeTimer(const std::string& name, const std::string& log_file, const std::string& metadata, bool accurate_timer)
    : m_name(name), m_log_file(log_file), m_metadata(metadata), m_accurate_timer(accurate_timer) {}

void ManualScopeTimer::Start() {
    if (m_accurate_timer) {
        Kokkos::fence();
    }
    m_last_start = std::chrono::high_resolution_clock::now();
    ++m_active;
    double ts = Now();
    if (!m_has_started) {
        m_first_start_time = ts;
        m_has_started = true;
    }
}

void ManualScopeTimer::Stop() {
    if (m_active <= 0) return;  // Ignore unmatched Stop
    if (m_accurate_timer) {
        Kokkos::fence();
    }
    auto end = std::chrono::high_resolution_clock::now();
    double elapsed = std::chrono::duration<double>(end - m_last_start).count();
    m_total_time += elapsed;
    --m_active;
    double ts = Now();
    m_last_end_time = ts;
    m_has_stopped = true;
}

void ManualScopeTimer::Dump() const {
    if (!IsEnabled()) return;
    int rank = 0;
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    if (rank != 0) return;

    std::lock_guard<std::mutex> lock(s_log_mutex);
    std::ofstream ofs(m_log_file, std::ios::app);
    if (!ofs.is_open()) return;
    // Log ACCUMULATOR_START with 0.0 elapsed for compatibility
    ofs << "ACCUMULATOR_START," << m_name << "," << std::fixed << std::setprecision(9) << m_first_start_time << "," << 0.0;
    if (!m_metadata.empty()) ofs << "," << m_metadata;
    ofs << std::endl;
    // Log ACCUMULATOR_END with total elapsed
    ofs << "ACCUMULATOR_END," << m_name << "," << std::fixed << std::setprecision(9) << m_last_end_time << "," << m_total_time;
    if (!m_metadata.empty()) ofs << "," << m_metadata;
    ofs << std::endl;
}

bool ManualScopeTimer::IsEnabled() {
    return SimpleTimerFactory::IsEnabled();
}

double ManualScopeTimer::GetTotalTime() const {
    return m_total_time;
}

double ManualScopeTimer::Now() const {
    auto now = std::chrono::high_resolution_clock::now();
    auto epoch = now.time_since_epoch();
    return std::chrono::duration<double>(epoch).count();
}

}  // namespace aperi