#pragma once

#include <map>
#include <memory>
#include <string>

#include "SimpleTimer.h"

namespace aperi {

/**
 * @brief Factory for creating SimpleTimer instances with a default log file and accurate timer option.
 */
class SimpleTimerFactory {
   public:
    /**
     * @brief Set the default log file for all timers created by this factory.
     * @param filename Path to the log file.
     */
    static void SetDefaultLogFile(const std::string& filename);

    /**
     * @brief Set whether all timers created should use accurate timing (Kokkos::fence()).
     * @param enabled True to enable accurate timers.
     */
    static void SetAccurateTimers(bool enabled);

    /**
     * @brief Create a new SimpleTimer with the default log file and accurate timer setting.
     * @param name Name of the timer/event.
     * @param metadata Optional metadata string.
     * @return Unique pointer to a SimpleTimer.
     */
    static std::unique_ptr<SimpleTimer> Create(const std::string& name, const std::string& metadata = "");

    /**
     * @brief Create a new SimpleTimer using an enum value for the timer name.
     * @param timer_enum The enum value representing the timer.
     * @param enum_map A map from enum values to timer names.
     * @param metadata Optional metadata string.
     * @return Unique pointer to a SimpleTimer.
     */
    template <typename EnumType>
    static std::unique_ptr<SimpleTimer> Create(EnumType timer_enum, const std::map<EnumType, std::string>& enum_map, const std::string& metadata = "") {
        auto it = enum_map.find(timer_enum);
        std::string name = (it != enum_map.end()) ? it->second : "UNKNOWN";
        return Create(name, metadata);
    }

    /**
     * @brief Enable or disable writing timing output globally.
     * @param enabled True to enable, false to disable.
     */
    static void SetEnabled(bool enabled);

    /**
     * @brief Check if writing timing output is enabled.
     * @return True if enabled, false if disabled.
     */
    static bool IsEnabled();

    /**
     * @brief Get the current default log file path.
     * @return Reference to the log file path string.
     */
    static const std::string& GetDefaultLogFile();

    /**
     * @brief Get the current accurate timer flag.
     * @return True if accurate timers are enabled.
     */
    static bool GetAccurateTimers();

   private:
    /**
     * @brief Accessor for the static log file path.
     * @return Reference to the log file path string.
     */
    static std::string& GetLogFileRef();

    /**
     * @brief Accessor for the static accurate timer flag.
     * @return Reference to the accurate timer flag.
     */
    static bool& GetAccurateTimersRef();

    /**
     * @brief Accessor for the static enable/disable flag.
     * @return Reference to the enable/disable flag.
     */
    static bool& GetEnabledRef();
};

}  // namespace aperi
