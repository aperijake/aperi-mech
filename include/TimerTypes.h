#pragma once

#include <map>
#include <string>

namespace aperi {

// FunctionCreation timer types
enum class FunctionCreationProcessorTimerType {
    Instantiate,
    ComputeFunctionValues,
    NONE
};

inline const std::map<FunctionCreationProcessorTimerType, std::string> function_value_storage_processor_timer_map = {
    {FunctionCreationProcessorTimerType::Instantiate, "Instantiate"},
    {FunctionCreationProcessorTimerType::ComputeFunctionValues, "ComputeFunctionValues"},
    {FunctionCreationProcessorTimerType::NONE, "NONE"}};

// NeighborSearchProcessor timer types
enum class NeighborSearchProcessorTimerType {
    Instantiate,
    ComputeKernelRadius,
    CreateNodePoints,
    CreateNodeSpheres,
    CoarseSearch,
    KokkosDeepCopy,
    GhostNodeNeighbors,
    CalculateResultsDistances,
    SortSearchResults,
    UnpackSearchResultsIntoField,
    NONE
};

inline const std::map<NeighborSearchProcessorTimerType, std::string> neighbor_search_processor_timer_names_map = {
    {NeighborSearchProcessorTimerType::Instantiate, "Instantiate"},
    {NeighborSearchProcessorTimerType::ComputeKernelRadius, "ComputeKernelRadius"},
    {NeighborSearchProcessorTimerType::CreateNodePoints, "CreateNodePoints"},
    {NeighborSearchProcessorTimerType::CreateNodeSpheres, "CreateNodeSpheres"},
    {NeighborSearchProcessorTimerType::CoarseSearch, "CoarseSearch"},
    {NeighborSearchProcessorTimerType::KokkosDeepCopy, "KokkosDeepCopy"},
    {NeighborSearchProcessorTimerType::GhostNodeNeighbors, "GhostNodeNeighbors"},
    {NeighborSearchProcessorTimerType::CalculateResultsDistances, "CalculateResultsDistances"},
    {NeighborSearchProcessorTimerType::SortSearchResults, "SortSearchResults"},
    {NeighborSearchProcessorTimerType::UnpackSearchResultsIntoField, "UnpackSearchResultsIntoField"},
    {NeighborSearchProcessorTimerType::NONE, "NONE"}};

// Application timer types
enum class ApplicationTimerType {
    ReadInputMesh,
    CreateFieldResultsFile,
    CreateTimeStepper,
    CreateInternalForceContribution,
    AddFieldsToMesh,
    LabelMesh,
    CreateExternalForceContribution,
    AddInitialConditions,
    CreateBoundaryConditions,
    CreateOutputScheduler,
    Preprocessing,
    NONE
};

inline const std::map<ApplicationTimerType, std::string> application_timer_map = {
    {ApplicationTimerType::ReadInputMesh, "ReadInputMesh"},
    {ApplicationTimerType::CreateFieldResultsFile, "CreateFieldResultsFile"},
    {ApplicationTimerType::CreateTimeStepper, "CreateTimeStepper"},
    {ApplicationTimerType::CreateInternalForceContribution, "CreateInternalForceContribution"},
    {ApplicationTimerType::AddFieldsToMesh, "AddFieldsToMesh"},
    {ApplicationTimerType::LabelMesh, "LabelMesh"},
    {ApplicationTimerType::CreateExternalForceContribution, "CreateExternalForceContribution"},
    {ApplicationTimerType::AddInitialConditions, "AddInitialConditions"},
    {ApplicationTimerType::CreateBoundaryConditions, "CreateBoundaryConditions"},
    {ApplicationTimerType::CreateOutputScheduler, "CreateOutputScheduler"},
    {ApplicationTimerType::Preprocessing, "Preprocessing"},
    {ApplicationTimerType::NONE, "NONE"}};

enum class ElementTimerType {
    CreateElementForceProcessor,
    Other,
    NONE
};

inline const std::map<ElementTimerType, std::string> element_timer_map = {
    {ElementTimerType::CreateElementForceProcessor, "CreateElementForceProcessor"},
    {ElementTimerType::Other, "Other"},
    {ElementTimerType::NONE, "NONE"}};

}  // namespace aperi
