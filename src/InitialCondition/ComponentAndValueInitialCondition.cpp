#include "InitialCondition/ComponentAndValueInitialCondition.h"

#include <memory>

#include "EntityProcessor.h"
#include "Field.h"
#include "IoInputFile.h"
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

/**
 * @brief Functor to fill initial values in the field.
 */
struct FillInitialValueFunctor {
    explicit FillInitialValueFunctor(double value) : m_value(value) {}
    KOKKOS_INLINE_FUNCTION void operator()(double* value) const { *value = m_value; }
    double m_value;
};

/**
 * @brief Constructor for ComponentAndValueInitialCondition.
 */
ComponentAndValueInitialCondition::ComponentAndValueInitialCondition(
    std::shared_ptr<aperi::MeshData> mesh_data,
    const std::string& field_name,
    const std::vector<std::string>& sets,
    const std::vector<std::pair<size_t, double>>& components_and_values)
    : InitialCondition(mesh_data, field_name, sets),
      m_components_and_values(components_and_values) {}

/**
 * @brief Apply the initial condition.
 */
void ComponentAndValueInitialCondition::Apply() {
    // Create the field query data
    std::array<FieldQueryData<double>, 1> field_query_data;
    field_query_data[0] = {m_field_name, FieldQueryState::NP1};

    // Create the node processor
    NodeProcessor<1> node_processor(field_query_data, m_mesh_data, m_sets);

    // Loop over components and values
    for (auto component_and_value : m_components_and_values) {
        // Create the functor to fill the field
        auto fill_inital_value_functor = FillInitialValueFunctor(component_and_value.second);
        // Fill the field for the component
        node_processor.for_component_i(fill_inital_value_functor, component_and_value.first, 0);
    }

    // Mark all fields as modified on the device
    node_processor.MarkAllFieldsModifiedOnDevice();
    node_processor.SyncAllFieldsDeviceToHost();
}

}  // namespace aperi
