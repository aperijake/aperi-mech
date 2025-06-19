#pragma once

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
    static std::unique_ptr<SimpleTimer> Create(
        const std::string& name, const std::string& metadata = "");

   private:
    /**
     * @brief Accessor for the static log file path.
     * @return Reference to the log file path string.
     */
    static std::string& GetLogFile();

    /**
     * @brief Accessor for the static accurate timer flag.
     * @return Reference to the accurate timer flag.
     */
    static bool& GetAccurateTimers();
};

}  // namespace aperi
