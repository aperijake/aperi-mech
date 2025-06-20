#pragma once

#include <map>
#include <memory>
#include <string>

#include "ManualScopeTimer.h"
#include "SimpleTimerFactory.h"

namespace aperi {

/**
 * @brief Factory for creating ManualScopeTimer instances using SimpleTimerFactory settings.
 */
class ManualScopeTimerFactory {
   public:
    /**
     * @brief Create a new ManualScopeTimer using the shared log file and accurate timer setting.
     * @param name Name of the timer/event.
     * @param metadata Optional metadata string.
     * @return Unique pointer to a ManualScopeTimer.
     */
    static std::unique_ptr<ManualScopeTimer> Create(const std::string& name, const std::string& metadata = "") {
        return std::make_unique<ManualScopeTimer>(
            name,
            SimpleTimerFactory::GetDefaultLogFile(),
            metadata,
            SimpleTimerFactory::GetAccurateTimers());
    }

    /**
     * @brief Create a new ManualScopeTimer using an enum and a mapping.
     * @param timer_enum Enum value for the timer.
     * @param enum_map Map from enum to string.
     * @param metadata Optional metadata string.
     * @return Unique pointer to a ManualScopeTimer.
     */
    template <typename EnumType>
    static std::unique_ptr<ManualScopeTimer> Create(EnumType timer_enum, const std::map<EnumType, std::string>& enum_map, const std::string& metadata = "") {
        auto it = enum_map.find(timer_enum);
        std::string name = (it != enum_map.end()) ? it->second : "UNKNOWN";
        return Create(name, metadata);
    }
};

}  // namespace aperi