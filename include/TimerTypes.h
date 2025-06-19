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
    {FunctionCreationProcessorTimerType::Instantiate, "FunctionCreationProcessor_Instantiate"},
    {FunctionCreationProcessorTimerType::ComputeFunctionValues, "FunctionCreationProcessor_ComputeFunctionValues"},
    {FunctionCreationProcessorTimerType::NONE, "FunctionCreationProcessor_NONE"}};

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
    {NeighborSearchProcessorTimerType::Instantiate, "NeighborSearchProcessor_Instantiate"},
    {NeighborSearchProcessorTimerType::ComputeKernelRadius, "NeighborSearchProcessor_ComputeKernelRadius"},
    {NeighborSearchProcessorTimerType::CreateNodePoints, "NeighborSearchProcessor_CreateNodePoints"},
    {NeighborSearchProcessorTimerType::CreateNodeSpheres, "NeighborSearchProcessor_CreateNodeSpheres"},
    {NeighborSearchProcessorTimerType::CoarseSearch, "NeighborSearchProcessor_CoarseSearch"},
    {NeighborSearchProcessorTimerType::KokkosDeepCopy, "NeighborSearchProcessor_KokkosDeepCopy"},
    {NeighborSearchProcessorTimerType::GhostNodeNeighbors, "NeighborSearchProcessor_GhostNodeNeighbors"},
    {NeighborSearchProcessorTimerType::CalculateResultsDistances, "NeighborSearchProcessor_CalculateResultsDistances"},
    {NeighborSearchProcessorTimerType::SortSearchResults, "NeighborSearchProcessor_SortSearchResults"},
    {NeighborSearchProcessorTimerType::UnpackSearchResultsIntoField, "NeighborSearchProcessor_UnpackSearchResultsIntoField"},
    {NeighborSearchProcessorTimerType::NONE, "NeighborSearchProcessor_NONE"}};

// Application timer types
enum class ApplicationTimerType {
    Total,
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
    {ApplicationTimerType::Total, "Application_Total"},
    {ApplicationTimerType::ReadInputMesh, "Application_ReadInputMesh"},
    {ApplicationTimerType::CreateFieldResultsFile, "Application_CreateFieldResultsFile"},
    {ApplicationTimerType::CreateTimeStepper, "Application_CreateTimeStepper"},
    {ApplicationTimerType::CreateInternalForceContribution, "Application_CreateInternalForceContribution"},
    {ApplicationTimerType::AddFieldsToMesh, "Application_AddFieldsToMesh"},
    {ApplicationTimerType::LabelMesh, "Application_LabelMesh"},
    {ApplicationTimerType::CreateExternalForceContribution, "Application_CreateExternalForceContribution"},
    {ApplicationTimerType::AddInitialConditions, "Application_AddInitialConditions"},
    {ApplicationTimerType::CreateBoundaryConditions, "Application_CreateBoundaryConditions"},
    {ApplicationTimerType::CreateOutputScheduler, "Application_CreateOutputScheduler"},
    {ApplicationTimerType::Preprocessing, "Application_Preprocessing"},
    {ApplicationTimerType::NONE, "Application_NONE"}};

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
