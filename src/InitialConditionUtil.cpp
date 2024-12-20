#include "InitialConditionUtil.h"

#include <yaml-cpp/yaml.h>

#include <utility>

#include "EntityProcessor.h"
#include "IoInputFile.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"

namespace aperi {

struct FillInitialValueFunctor {
    explicit FillInitialValueFunctor(double value) : m_value(value) {}
    KOKKOS_INLINE_FUNCTION void operator()(double* value) const { *value = m_value; }
    double m_value;
};

void SetInitialFieldValues(std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string>& set_names, const std::string& field_name, const std::vector<std::pair<size_t, double>>& components_and_values) {
    // Create the field query data
    std::array<FieldQueryData<double>, 1> field_query_data;
    field_query_data[0] = {field_name, FieldQueryState::NP1};

    // Create the node processor
    NodeProcessor<1> node_processor(field_query_data, std::move(mesh_data), set_names);

    // Loop over components and values
    for (auto component_and_value : components_and_values) {
        // Create the functor to fill the field
        auto fill_inital_value_functor = FillInitialValueFunctor(component_and_value.second);
        // Fill the field for the component
        node_processor.for_component_i(fill_inital_value_functor, component_and_value.first, 0);
    }

    // Mark all fields as modified on the device
    node_processor.MarkAllFieldsModifiedOnDevice();
}

void AddInitialConditions(const YAML::Node& initial_condition, const std::shared_ptr<aperi::MeshData>& mesh_data) {
    // Get this initial condition node
    const YAML::Node initial_condition_node = initial_condition.begin()->second;

    // Get the components and values
    std::vector<std::pair<size_t, double>> components_and_values = aperi::GetComponentsAndValues(initial_condition_node);

    // Get the type of initial condition
    const auto field = initial_condition.begin()->first.as<std::string>() + "_coefficients";

    // Loop over sets from initial condition
    std::vector<std::string> sets;
    if (initial_condition_node["sets"]) {
        sets = initial_condition_node["sets"].as<std::vector<std::string>>();
    }

    // Set the initial field values
    SetInitialFieldValues(mesh_data, sets, field, components_and_values);
}

}  // namespace aperi
