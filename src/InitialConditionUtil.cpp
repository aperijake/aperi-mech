#include "InitialConditionUtil.h"

#include <yaml-cpp/yaml.h>

#include "IoInputFile.h"
#include "LogUtils.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "NodeProcessor.h"

namespace aperi {

void SetInitialFieldValues(std::shared_ptr<aperi::MeshData> mesh_data, const std::string& set_name, const std::string& field_name, const std::vector<std::pair<size_t, double>>& components_and_values) {
    // NodeProcessor(const std::vector<FieldQueryData> field_query_data_vec, std::shared_ptr<aperi::MeshData> mesh_data, const std::vector<std::string> &sets = {}) {
    std::vector<FieldQueryData> field_query_data_vec;
    field_query_data_vec.push_back({field_name, FieldQueryState::NP1});

    NodeProcessor node_processor(field_query_data_vec, mesh_data, {set_name});

    // Loop over each node
    node_processor.for_each_node({}, components_and_values, [](size_t i_component_start, const std::vector<double>& data, const std::vector<std::pair<size_t, double>>& components_and_values, std::vector<double*>& field_data) {
        // Apply the boundary condition, loop over the components
        for (auto&& component_value : components_and_values) {
            field_data[0][i_component_start + component_value.first] = component_value.second;
        }
    });
}

void AddInitialConditions(std::vector<YAML::Node>& initial_conditions, std::shared_ptr<aperi::MeshData> mesh_data) {
    // Loop over initial conditions
    for (const auto& initial_condition : initial_conditions) {
        // Get this initial condition node
        const YAML::Node initial_condition_node = initial_condition.begin()->second;

        // Get the components and values
        std::vector<std::pair<size_t, double>> components_and_values = aperi::GetComponentsAndValues(initial_condition_node);

        // Get the type of initial condition
        const std::string type = initial_condition.begin()->first.as<std::string>();

        // Loop over sets from initial condition
        aperi::CoutP0() << "Adding initial condition for sets:" << std::endl;
        std::vector<std::string> sets;
        if (initial_condition_node["sets"]) {
            sets = initial_condition_node["sets"].as<std::vector<std::string>>();
            aperi::CoutP0() << "  " << sets.back() << std::endl;
        }

        // Loop over sets
        for (const auto& set : sets) {
            SetInitialFieldValues(mesh_data, set, type, components_and_values);
        }
    }
}

}  // namespace aperi