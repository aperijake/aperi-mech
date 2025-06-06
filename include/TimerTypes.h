#pragma once

#include <map>
#include <string>

namespace aperi {

enum class FunctionValueStorageProcessorTimerType {
    Instantiate,
    ComputeFunctionValues,
    NONE
};

inline const std::map<FunctionValueStorageProcessorTimerType, std::string> function_value_storage_processor_timer_map = {
    {FunctionValueStorageProcessorTimerType::Instantiate, "Instantiate"},
    {FunctionValueStorageProcessorTimerType::ComputeFunctionValues, "ComputeFunctionValues"},
    {FunctionValueStorageProcessorTimerType::NONE, "NONE"}};

//
// Add other timer types and maps here as needed
//

}  // namespace aperi
