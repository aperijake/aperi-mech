#pragma once

#include <map>
#include <string>

namespace aperi {

enum class FunctionCreationProcessorTimerType {
    Instantiate,
    ComputeFunctionValues,
    NONE
};

inline const std::map<FunctionCreationProcessorTimerType, std::string> function_value_storage_processor_timer_map = {
    {FunctionCreationProcessorTimerType::Instantiate, "Instantiate"},
    {FunctionCreationProcessorTimerType::ComputeFunctionValues, "ComputeFunctionValues"},
    {FunctionCreationProcessorTimerType::NONE, "NONE"}};

//
// Add other timer types and maps here as needed
//

}  // namespace aperi
