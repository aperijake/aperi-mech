#include "FunctionValueStorageProcessor.h"

namespace aperi {

FunctionValueStorageProcessor::FunctionValueStorageProcessor(
    std::shared_ptr<aperi::MeshData> mesh_data,
    const std::vector<std::string> &sets,
    const aperi::LagrangianFormulationType &lagrangian_formulation_type,
    bool enable_accurate_timers)
    : m_mesh_data(mesh_data),
      m_sets(sets),
      m_timer_manager("Function Value Storage Processor", function_value_storage_processor_timer_map, enable_accurate_timers) {
    // Check for null mesh data pointer
    if (mesh_data == nullptr) {
        throw std::runtime_error("Mesh data is null.");
    }

    // Start instantiation timer
    auto timer = m_timer_manager.CreateScopedTimer(FunctionValueStorageProcessorTimerType::Instantiate);

    // Initialize mesh and selectors
    m_bulk_data = mesh_data->GetBulkData();
    m_ngp_mesh = stk::mesh::get_updated_ngp_mesh(*m_bulk_data);
    stk::mesh::MetaData *meta_data = &m_bulk_data->mesh_meta_data();
    m_selector = StkGetSelector(sets, meta_data);

    // Warn if selector is empty (no elements selected)
    if (m_selector.is_empty(stk::topology::ELEMENT_RANK)) {
        aperi::CoutP0() << "Warning: FunctionValueStorageProcessor selector is empty." << std::endl;
    }

    // Determine which coordinates field to use based on formulation type
    std::string coordinate_field_name = mesh_data->GetCoordinatesFieldName();
    if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Updated) {
        coordinate_field_name = "current_coordinates_np1";
    } else if (lagrangian_formulation_type == aperi::LagrangianFormulationType::Semi) {
        coordinate_field_name = "reference_coordinates";
    }

    // Retrieve and initialize all required fields
    UnsignedField *num_neighbors_field = StkGetField(FieldQueryData<Unsigned>{"num_neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_num_neighbors_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*num_neighbors_field);

    UnsignedField *neighbors_field = StkGetField(FieldQueryData<Unsigned>{"neighbors", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_neighbors_field = &stk::mesh::get_updated_ngp_field<Unsigned>(*neighbors_field);

    RealField *coordinates_field = StkGetField(FieldQueryData<double>{coordinate_field_name, FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_coordinates_field = &stk::mesh::get_updated_ngp_field<double>(*coordinates_field);

    RealField *function_values_field = StkGetField(FieldQueryData<double>{"function_values", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_function_values_field = &stk::mesh::get_updated_ngp_field<double>(*function_values_field);

    RealField *kernel_radius_field = StkGetField(FieldQueryData<double>{"kernel_radius", FieldQueryState::None, FieldDataTopologyRank::NODE}, meta_data);
    m_ngp_kernel_radius_field = &stk::mesh::get_updated_ngp_field<double>(*kernel_radius_field);
}

void FunctionValueStorageProcessor::FinishPreprocessing() {
    // No preprocessing required at this time
}

void FunctionValueStorageProcessor::SyncFieldsToHost() {
    // Synchronize function values field from device to host
    m_ngp_function_values_field->sync_to_host();
}

}  // namespace aperi
