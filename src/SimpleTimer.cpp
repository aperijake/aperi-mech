#include "SimpleTimer.h"

#include <iomanip>
#include <sstream>

#include "Kokkos_Core.hpp"
#include "SimpleTimerFactory.h"

namespace aperi {

// Static mutex definition for thread-safe logging
std::mutex SimpleTimer::s_log_mutex;

// Constructor: Optionally fences for accuracy, records start time, logs "START" event
SimpleTimer::SimpleTimer(const std::string& name, const std::string& log_file, const std::string& metadata, bool accurate_timer)
    : m_name(name), m_log_file(log_file), m_metadata(metadata), m_accurate_timer(accurate_timer) {
    if (m_accurate_timer) {
        Kokkos::fence();
    }
    m_start_time = std::chrono::high_resolution_clock::now();
    if (IsEnabled()) {
        LogEvent("START", m_start_time);
    }
}

// Destructor: Optionally fences for accuracy, logs "END" event
SimpleTimer::~SimpleTimer() {
    if (m_accurate_timer) {
        Kokkos::fence();
    }
    auto end_time = std::chrono::high_resolution_clock::now();
    if (IsEnabled()) {
        LogEvent("END", end_time);
    }
}

bool SimpleTimer::IsEnabled() {
    return SimpleTimerFactory::IsEnabled();
}

// Log an event (START or END) to the log file with timestamp and optional metadata
void SimpleTimer::LogEvent(const std::string& event_type, const std::chrono::time_point<std::chrono::high_resolution_clock>& time_point) const {
    // Convert time_point to seconds since epoch with high precision
    auto epoch = time_point.time_since_epoch();
    double timestamp = std::chrono::duration<double>(epoch).count();

    // Format: EVENT_TYPE,TIMER_NAME,TIMESTAMP[,METADATA]
    std::ostringstream oss;
    oss << std::fixed << std::setprecision(9)
        << event_type << ","
        << m_name << ","
        << timestamp;
    if (!m_metadata.empty()) {
        oss << "," << m_metadata;
    }

    // Thread-safe append to log file
    std::lock_guard<std::mutex> lock(s_log_mutex);
    std::ofstream ofs(m_log_file, std::ios::app);
    if (ofs.is_open()) {
        ofs << oss.str() << std::endl;
    }
}

}  // namespace aperi
