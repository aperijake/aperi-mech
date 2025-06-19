#include "SimpleTimerFactory.h"

namespace aperi {

// Set the default log file path for all timers
void SimpleTimerFactory::SetDefaultLogFile(const std::string& filename) {
    GetLogFile() = filename;
}

// Set whether all timers should use accurate timing
void SimpleTimerFactory::SetAccurateTimers(bool enabled) {
    GetAccurateTimers() = enabled;
}

// Create a new SimpleTimer with the current default log file and accurate timer setting
std::unique_ptr<SimpleTimer> SimpleTimerFactory::Create(const std::string& name, const std::string& metadata) {
    return std::make_unique<SimpleTimer>(name, GetLogFile(), metadata, GetAccurateTimers());
}

// Static accessor for the log file path
std::string& SimpleTimerFactory::GetLogFile() {
    static std::string log_file = "timing.log";
    return log_file;
}

// Static accessor for the accurate timer flag
bool& SimpleTimerFactory::GetAccurateTimers() {
    static bool accurate = false;
    return accurate;
}

void SimpleTimerFactory::SetEnabled(bool enabled) {
    GetEnabled() = enabled;
}

bool SimpleTimerFactory::IsEnabled() {
    return GetEnabled();
}

bool& SimpleTimerFactory::GetEnabled() {
    static bool enabled = true;
    return enabled;
}

}  // namespace aperi
