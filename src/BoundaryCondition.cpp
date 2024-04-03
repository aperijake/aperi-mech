#include "BoundaryCondition.h"

#include <yaml-cpp/yaml.h>

#include "IoInputFile.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "NodeProcessor.h"

namespace aperi {

// Apply the velocity boundary condition (displacement is converted to velocity earlier)
void BoundaryCondition::ApplyVelocity(double time) {
    // Get the time function values
    double time_scale = m_velocity_time_function(time);

    // Loop over the nodes
    for (auto&& component_value : m_components_and_values) {
        auto fill_field_functor = FillFieldFunctor(component_value.second * time_scale);
        m_node_processor_velocity->for_dof_i(fill_field_functor, component_value.first);
    }
    m_node_processor_velocity->MarkAllFieldsModifiedOnDevice();
}

// Apply the acceleration boundary condition
void BoundaryCondition::ApplyAcceleration(double time) {
    // Get the time function values
    double time_scale = m_acceleration_time_function(time);

    // Loop over the nodes
    for (auto&& component_value : m_components_and_values) {
        auto fill_field_functor = FillFieldFunctor(component_value.second * time_scale);
        m_node_processor_acceleration->for_dof_i(fill_field_functor, component_value.first);
    }
    m_node_processor_acceleration->MarkAllFieldsModifiedOnDevice();
}

// Set the time function
std::pair<std::function<double(double)>, std::function<double(double)>> SetTimeFunctions(const YAML::Node& boundary_condition, const std::string& bc_type) {
    // Get the time function node
    const YAML::Node time_function_node = boundary_condition["time_function"].begin()->second;

    // Get the type of time function
    std::string time_function_type = boundary_condition["time_function"].begin()->first.as<std::string>();

    // Create a velocity vs time function
    std::function<double(double)> velocity_time_function;

    // Create an acceleration vs time function
    std::function<double(double)> acceleration_time_function;

    // Set the time function
    if (time_function_type == "ramp_function") {
        // Get the abscissa and ordinate
        std::vector<double> abscissa = time_function_node["abscissa_values"].as<std::vector<double>>();
        std::vector<double> ordinate = time_function_node["ordinate_values"].as<std::vector<double>>();

        std::vector<double> ordinate_derivate(ordinate.size());
        for (size_t i = 0; i < ordinate.size() - 1; ++i) {
            ordinate_derivate[i] = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
        }
        ordinate_derivate[ordinate.size() - 1] = 0.0;

        // If type is 'displacement', convert ordinate to velocity. Will be a piecewise constant function
        if (bc_type == "displacement") {
            velocity_time_function = [abscissa, ordinate_derivate](double time) {
                return aperi::ConstantInterpolation(time, abscissa, ordinate_derivate);
            };
            acceleration_time_function = [abscissa, ordinate_derivate](double time) {
                return 0.0;
            };
        } else if (bc_type == "velocity") {
            velocity_time_function = [abscissa, ordinate](double time) {
                return aperi::LinearInterpolation(time, abscissa, ordinate);
            };
            acceleration_time_function = [abscissa, ordinate_derivate](double time) {
                return aperi::ConstantInterpolation(time, abscissa, ordinate_derivate);
            };
        } else {
            // Throw an error if the type is not 'velocity' or 'displacement'. Should not happen.
            throw std::runtime_error("Boundary condition type must be 'velocity' or 'displacement'. Found: " + bc_type + ".");
        }

    } else {
        throw std::runtime_error("Time function type '" + time_function_type + "' not found.");
    }
    return std::make_pair(velocity_time_function, acceleration_time_function);
}

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, std::shared_ptr<aperi::MeshData> mesh_data) {
    // Get the boundary condition node
    const YAML::Node boundary_condition_node = boundary_condition.begin()->second;

    // Components and values of the boundary condition vector
    std::vector<std::pair<size_t, double>> component_value_vector = aperi::GetComponentsAndValues(boundary_condition_node);

    // Get the type of boundary condition, lowercase
    std::string type = boundary_condition.begin()->first.as<std::string>();
    std::transform(type.begin(), type.end(), type.begin(), ::tolower);

    // Get the velocity and acceleration time functions
    std::pair<std::function<double(double)>, std::function<double(double)>> time_functions = SetTimeFunctions(boundary_condition_node, type);

    // Loop over sets from boundary condition
    std::vector<std::string> sets;
    if (boundary_condition_node["sets"]) {
        sets = boundary_condition_node["sets"].as<std::vector<std::string>>();
    }

    return std::make_shared<BoundaryCondition>(component_value_vector, time_functions, sets, mesh_data);
}

}  // namespace aperi
