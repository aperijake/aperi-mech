#pragma once

#include <chrono>
#include <fstream>
#include <mutex>
#include <string>

namespace aperi {

/**
 * @brief Logs start and end events to a file for timing analysis.
 *
 * Thread-safe. Optionally uses Kokkos::fence() for accurate timing.
 * Honors global enable/disable flag from SimpleTimerFactory.
 */
class SimpleTimer {
   public:
    /**
     * @brief Construct a timer with a name, log file, optional metadata, and accurate timer flag.
     *
     * Logs a "START" event on construction.
     *
     * @param name Name of the timer/event.
     * @param log_file Path to the log file.
     * @param metadata Optional metadata string.
     * @param accurate_timer If true, use Kokkos::fence() before timing.
     */
    SimpleTimer(const std::string& name, const std::string& log_file, const std::string& metadata = "", bool accurate_timer = false);

    /**
     * @brief Destructor logs the "END" event with elapsed time.
     */
    ~SimpleTimer();

   private:
    std::string m_name;                                                        ///< Name of the timer/event
    std::string m_log_file;                                                    ///< Path to the log file
    std::string m_metadata;                                                    ///< Optional metadata string
    bool m_accurate_timer;                                                     ///< If true, use Kokkos::fence() before timing
    std::chrono::time_point<std::chrono::high_resolution_clock> m_start_time;  ///< Start time

    static std::mutex s_log_mutex;  ///< Mutex for thread-safe file writes

    /**
     * @brief Helper to log an event (either "START" or "END") with timestamp, elapsed time (for END), and metadata.
     *
     * @param event_type Type of event ("START" or "END").
     * @param time_point Time point of the event.
     * @param elapsed Elapsed time (only used for "END", 0.0 for "START").
     */
    void LogEvent(const std::string& event_type, const std::chrono::time_point<std::chrono::high_resolution_clock>& time_point, double elapsed) const;

    /**
     * @brief Returns true if timing output is enabled (delegates to factory).
     */
    static bool IsEnabled();
};

}  // namespace aperi
