#include "FunctionValueStorageProcessor.h"

#ifndef USE_PROTEGO_MECH

namespace aperi {

FunctionValueStorageProcessor::FunctionValueStorageProcessor(
    std::shared_ptr<aperi::MeshData> mesh_data,
    const std::vector<std::string> &sets,
    const aperi::LagrangianFormulationType &lagrangian_formulation_type,
    bool enable_accurate_timers)
    : m_mesh_data(mesh_data),
      m_sets(sets),
      m_timer_manager("Function Value Storage Processor", function_value_storage_processor_timer_map, enable_accurate_timers),
      m_num_neighbors_field(mesh_data, FieldQueryData<Unsigned>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}),
      m_neighbors_field(mesh_data, FieldQueryData<Unsigned>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}),
      m_function_values_field(mesh_data, FieldQueryData<Real>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}),
      m_kernel_radius_field(mesh_data, FieldQueryData<Real>{"kernel_radius", FieldQueryState::None, FieldDataTopologyRank::NODE}),
      m_ngp_mesh_data(mesh_data->GetUpdatedNgpMesh()) {
    // Check for null mesh data pointer
    if (mesh_data == nullptr) {
        throw std::runtime_error("Mesh data is null.");
    }

    // Start instantiation timer
    auto timer = m_timer_manager.CreateScopedTimer(FunctionValueStorageProcessorTimerType::Instantiate);

    // Initialize the selector based on the provided sets
    m_selector = aperi::Selector(sets, mesh_data.get());

    // For coordinates, select the correct field name
    std::string coordinate_field_name = mesh_data->GetCoordinatesFieldName();
    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated) {
        coordinate_field_name = "current_coordinates_np1";
    } else if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        coordinate_field_name = "reference_coordinates";
    }
    m_coordinates_field = aperi::Field<Real>(mesh_data, FieldQueryData<Real>{coordinate_field_name, FieldQueryState::None, FieldDataTopologyRank::NODE});
}

void FunctionValueStorageProcessor::FinishPreprocessing() {
    // No preprocessing required at this time
}

void FunctionValueStorageProcessor::SyncFieldsToHost() {
    // Synchronize function values field from device to host
    m_function_values_field.SyncDeviceToHost();
}

}  // namespace aperi

#endif  // !USE_PROTEGO_MECH
