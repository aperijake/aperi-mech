#pragma once

#include <map>
#include <string>

namespace aperi {

// Add FunctionCreationProcessorTimerType from FunctionEvaluationProcessor.h
enum class FunctionCreationProcessorTimerType {
    Instantiate,
    ComputeFunctionValues,
    NONE
};

inline const std::map<FunctionCreationProcessorTimerType, std::string> function_value_storage_processor_timer_map = {
    {FunctionCreationProcessorTimerType::Instantiate, "Instantiate"},
    {FunctionCreationProcessorTimerType::ComputeFunctionValues, "ComputeFunctionValues"},
    {FunctionCreationProcessorTimerType::NONE, "NONE"}};

// Add NeighborSearchProcessorTimerType from NeighborSearchProcessor.h
enum class NeighborSearchProcessorTimerType {
    Instantiate,
    KokkosDeepCopy,
    CoarseSearch,
    UnpackSearchResultsIntoField,
    GhostNodeNeighbors,
    CreateNodeSpheres,
    CreateNodePoints,
    ComputeKernelRadius,
    NONE
};

inline const std::map<NeighborSearchProcessorTimerType, std::string> neighbor_search_processor_timer_names_map = {
    {NeighborSearchProcessorTimerType::Instantiate, "Instantiate"},
    {NeighborSearchProcessorTimerType::KokkosDeepCopy, "KokkosDeepCopy"},
    {NeighborSearchProcessorTimerType::CoarseSearch, "CoarseSearch"},
    {NeighborSearchProcessorTimerType::UnpackSearchResultsIntoField, "UnpackSearchResultsIntoField"},
    {NeighborSearchProcessorTimerType::GhostNodeNeighbors, "GhostNodeNeighbors"},
    {NeighborSearchProcessorTimerType::CreateNodeSpheres, "CreateNodeSpheres"},
    {NeighborSearchProcessorTimerType::CreateNodePoints, "CreateNodePoints"},
    {NeighborSearchProcessorTimerType::ComputeKernelRadius, "ComputeKernelRadius"},
    {NeighborSearchProcessorTimerType::NONE, "NONE"}};

}  // namespace aperi
