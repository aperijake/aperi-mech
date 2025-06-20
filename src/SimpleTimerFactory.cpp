#include "SimpleTimerFactory.h"

namespace aperi {

// Set the default log file path for all timers
void SimpleTimerFactory::SetDefaultLogFile(const std::string& filename) {
    GetLogFileRef() = filename;
}

// Set whether all timers should use accurate timing
void SimpleTimerFactory::SetAccurateTimers(bool enabled) {
    GetAccurateTimersRef() = enabled;
}

// Enable or disable timing output globally
void SimpleTimerFactory::SetEnabled(bool enabled) {
    GetEnabledRef() = enabled;
}

// Check if timing output is enabled
bool SimpleTimerFactory::IsEnabled() {
    return GetEnabledRef();
}

// Create a new SimpleTimer with the current default log file and accurate timer setting
std::unique_ptr<SimpleTimer> SimpleTimerFactory::Create(const std::string& name, const std::string& metadata) {
    return std::make_unique<SimpleTimer>(name, GetLogFileRef(), metadata, GetAccurateTimersRef());
}

// Get the current default log file path
const std::string& SimpleTimerFactory::GetDefaultLogFile() {
    return GetLogFileRef();
}

// Get the current accurate timer flag
bool SimpleTimerFactory::GetAccurateTimers() {
    return GetAccurateTimersRef();
}

// Static accessor for the log file path
std::string& SimpleTimerFactory::GetLogFileRef() {
    static std::string log_file = "timing.log";
    return log_file;
}

// Static accessor for the accurate timer flag
bool& SimpleTimerFactory::GetAccurateTimersRef() {
    static bool accurate = false;
    return accurate;
}

// Static accessor for the enable/disable flag
bool& SimpleTimerFactory::GetEnabledRef() {
    static bool enabled = true;
    return enabled;
}

}  // namespace aperi
