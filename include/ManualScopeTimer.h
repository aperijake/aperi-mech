#pragma once

#include <chrono>
#include <fstream>
#include <mutex>
#include <string>

namespace aperi {

/**
 * @brief Timer with explicit Start/Stop, logs only one start and one end event, accumulates total time.
 */
class ManualScopeTimer {
   public:
    ManualScopeTimer(const std::string& name, const std::string& log_file, const std::string& metadata = "", bool accurate_timer = false);

    // Start timing (can be called multiple times, only logs the first start)
    void Start();

    // Stop timing (can be called multiple times, only logs the last stop)
    void Stop();

    // Write the accumulator start and end events to the log file
    void Dump() const;

    // Get total accumulated time
    double GetTotalTime() const;

   private:
    std::string m_name;
    std::string m_log_file;
    std::string m_metadata;
    bool m_accurate_timer;
    double m_total_time = 0.0;
    int m_active = 0;  // Number of unmatched Start() calls

    std::chrono::time_point<std::chrono::high_resolution_clock> m_last_start;
    double m_first_start_time = 0.0;
    double m_last_end_time = 0.0;
    bool m_has_started = false;
    bool m_has_stopped = false;

    static std::mutex s_log_mutex;

    double Now() const;

    /**
     * @brief Returns true if timing output is enabled (delegates to SimpleTimerFactory).
     */
    static bool IsEnabled();
};

}  // namespace aperi