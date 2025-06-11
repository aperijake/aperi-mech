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

}  // namespace aperi
