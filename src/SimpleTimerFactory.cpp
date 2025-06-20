#include "SimpleTimerFactory.h"

namespace aperi {

void SimpleTimerFactory::SetDefaultLogFile(const std::string& filename) {
    GetLogFileRef() = filename;
}

void SimpleTimerFactory::SetAccurateTimers(bool enabled) {
    GetAccurateTimersRef() = enabled;
}

void SimpleTimerFactory::SetEnabled(bool enabled) {
    GetEnabledRef() = enabled;
}

bool SimpleTimerFactory::IsEnabled() {
    return GetEnabledRef();
}

std::unique_ptr<SimpleTimer> SimpleTimerFactory::Create(const std::string& name, const std::string& metadata) {
    return std::make_unique<SimpleTimer>(name, GetLogFileRef(), metadata, GetAccurateTimersRef());
}

const std::string& SimpleTimerFactory::GetDefaultLogFile() {
    return GetLogFileRef();
}

bool SimpleTimerFactory::GetAccurateTimers() {
    return GetAccurateTimersRef();
}

std::string& SimpleTimerFactory::GetLogFileRef() {
    static std::string log_file = "timing.log";
    return log_file;
}

bool& SimpleTimerFactory::GetAccurateTimersRef() {
    static bool accurate = false;
    return accurate;
}

bool& SimpleTimerFactory::GetEnabledRef() {
    static bool enabled = true;
    return enabled;
}

}  // namespace aperi
