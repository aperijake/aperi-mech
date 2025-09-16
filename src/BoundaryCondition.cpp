#include "BoundaryCondition.h"

#include <yaml-cpp/yaml.h>

#include "EntityProcessor.h"
#include "IoInputFile.h"
#include "MathUtils.h"
#include "MeshData.h"
#include "Types.h"

namespace aperi {

// Apply the displacement boundary condition
void BoundaryCondition::ApplyDisplacement(double time) const {
    assert(m_node_processor_displacement != nullptr);
    // Check if the time is within the active time range
    if (time < m_active_time_start || time > m_active_time_end) {
        return;
    }

    // Get the time function values
    double time_scale = m_displacement_time_function(time);

    // Loop over the nodes
    for (auto&& component_value : m_components_and_values) {
        auto fill_field_functor = FillFieldFunctor(component_value.second * time_scale);
        m_node_processor_displacement->for_component_i(fill_field_functor, component_value.first, 0);
    }
    m_node_processor_displacement->MarkAllFieldsModifiedOnDevice();
}

// Apply the velocity boundary condition (displacement is converted to velocity earlier)
void BoundaryCondition::ApplyVelocity(double time) const {
    // Velocity BCs do not make sense for static solves
    assert(m_solver_type != aperi::SolverType::STATIC);
    assert(m_node_processor_velocity != nullptr);
    // Check if the time is within the active time range
    if (time < m_active_time_start || time > m_active_time_end) {
        return;
    }

    // Get the time function values
    double time_scale = m_velocity_time_function(time);

    // Loop over the nodes
    for (auto&& component_value : m_components_and_values) {
        auto fill_field_functor = FillFieldFunctor(component_value.second * time_scale);
        m_node_processor_velocity->for_component_i(fill_field_functor, component_value.first, 0);
    }
    m_node_processor_velocity->MarkAllFieldsModifiedOnDevice();
}

// Apply the acceleration boundary condition
void BoundaryCondition::ApplyAcceleration(double time) const {
    // Acceleration BCs do not make sense for static solves
    assert(m_solver_type != aperi::SolverType::STATIC);
    assert(m_node_processor_acceleration != nullptr);
    // Check if the time is within the active time range
    if (time < m_active_time_start || time > m_active_time_end) {
        return;
    }

    // Get the time function values
    double time_scale = m_acceleration_time_function(time);

    // Loop over the nodes
    for (auto&& component_value : m_components_and_values) {
        auto fill_field_functor = FillFieldFunctor(component_value.second * time_scale);
        m_node_processor_acceleration->for_component_i(fill_field_functor, component_value.first, 0);
    }
    m_node_processor_acceleration->MarkAllFieldsModifiedOnDevice();
}

// Set the flag to mark the field as on an essential boundary
void BoundaryCondition::SetEssentialBoundaryFlag() {
    // Loop over the nodes
    Unsigned essential_boundary_flag = 1;
    for (auto&& component_value : m_components_and_values) {
        auto fill_field_functor = FillFieldFunctor(essential_boundary_flag);
        m_node_processor_boundary->for_component_i(fill_field_functor, component_value.first, 0);
    }
    m_node_processor_boundary->MarkAllFieldsModifiedOnDevice();
}

// Set the time function
std::array<std::function<double(double)>, 3> SetTimeFunctions(const YAML::Node& boundary_condition, const std::string& bc_type, const aperi::SolverType solver_type) {
    // Get the time function node
    const YAML::Node time_function_node = boundary_condition["time_function"].begin()->second;

    // Get the type of time function
    auto time_function_type = boundary_condition["time_function"].begin()->first.as<std::string>();

    // Throw if the solver type is static, the bc_type is velocity, and the time function type is smooth_step_function
    if (solver_type == aperi::SolverType::STATIC && bc_type == "velocity" && time_function_type == "smooth_step_function") {
        throw std::runtime_error("Velocity boundary conditions with 'smooth_step_function' time functions are not supported for static solves.");
    }

    // Create a displacement vs time function
    std::function<double(double)> displacement_time_function;

    // Create a velocity vs time function
    std::function<double(double)> velocity_time_function;

    // Create an acceleration vs time function
    std::function<double(double)> acceleration_time_function;

    // Set the time function
    if (time_function_type == "ramp_function") {
        // Get the abscissa and ordinate
        auto abscissa = time_function_node["abscissa_values"].as<std::vector<double>>();
        auto ordinate = time_function_node["ordinate_values"].as<std::vector<double>>();
        if (abscissa.size() != ordinate.size()) {
            throw std::runtime_error("Abscissa and ordinate vectors must be the same size.");
        }
        if (abscissa.empty()) {
            throw std::runtime_error("Abscissa and ordinate vectors must have at least one value.");
        }

        std::vector<double> ordinate_derivate(ordinate.size());
        for (size_t i = 0; i < ordinate.size() - 1; ++i) {
            ordinate_derivate[i] = (ordinate[i + 1] - ordinate[i]) / (abscissa[i + 1] - abscissa[i]);
        }
        ordinate_derivate[ordinate.size() - 1] = 0.0;

        // If type is 'displacement', convert ordinate to velocity. Will be a piecewise constant function
        if (bc_type == "displacement") {
            displacement_time_function = [abscissa, ordinate](double time) {
                return aperi::LinearInterpolation(time, abscissa, ordinate);
            };
            velocity_time_function = [abscissa, ordinate_derivate](double time) {
                return aperi::ConstantInterpolation(time, abscissa, ordinate_derivate);
            };
            acceleration_time_function = [abscissa, ordinate_derivate](double /*time*/) {
                return 0.0;
            };
        } else if (bc_type == "velocity") {
            displacement_time_function = [abscissa, ordinate](double time) {
                return aperi::IntegratedLinearInterpolation(time, abscissa, ordinate);
            };
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
    } else if (time_function_type == "smooth_step_function") {
        // Get the abscissa and ordinate
        auto abscissa = time_function_node["abscissa_values"].as<std::vector<double>>();
        auto ordinate = time_function_node["ordinate_values"].as<std::vector<double>>();

        if (abscissa.size() != ordinate.size()) {
            throw std::runtime_error("Abscissa and ordinate vectors must be the same size.");
        }
        if (abscissa.empty()) {
            throw std::runtime_error("Abscissa and ordinate vectors must have at least one value.");
        }

        // If type is 'displacement', convert ordinate to velocity. Will be a piecewise constant function
        if (bc_type == "displacement") {
            displacement_time_function = [abscissa, ordinate](double time) {
                return aperi::SmoothStepInterpolation(time, abscissa, ordinate);
            };
            velocity_time_function = [abscissa, ordinate](double time) {
                return aperi::SmoothStepInterpolationDerivative(time, abscissa, ordinate);
            };
            acceleration_time_function = [abscissa, ordinate](double time) {
                return aperi::SmoothStepInterpolationSecondDerivative(time, abscissa, ordinate);
            };
        } else if (bc_type == "velocity") {
            displacement_time_function = [abscissa, ordinate](double time) {
                // Should not be called for velocity BC
                printf("Error: Displacement time function called for a smooth step velocity BC. Not supported.\n");
                KOKKOS_ASSERT(false);
                return 0.0;  // Not used for velocity BC
            };
            velocity_time_function = [abscissa, ordinate](double time) {
                return aperi::SmoothStepInterpolation(time, abscissa, ordinate);
            };
            acceleration_time_function = [abscissa, ordinate](double time) {
                return aperi::SmoothStepInterpolationDerivative(time, abscissa, ordinate);
            };
        } else {
            // Throw an error if the type is not 'velocity' or 'displacement'. Should not happen.
            throw std::runtime_error("Boundary condition type must be 'velocity' or 'displacement'. Found: " + bc_type + ".");
        }
    } else {
        throw std::runtime_error("Time function type '" + time_function_type + "' not found.");
    }
    return std::array<std::function<double(double)>, 3>{displacement_time_function, velocity_time_function, acceleration_time_function};
}

std::shared_ptr<BoundaryCondition> CreateBoundaryCondition(const YAML::Node& boundary_condition, const std::shared_ptr<aperi::MeshData>& mesh_data, const aperi::SolverType solver_type) {
    // Get the boundary condition node
    const YAML::Node boundary_condition_node = boundary_condition.begin()->second;

    // Components and values of the boundary condition vector
    std::vector<std::pair<size_t, double>> component_value_vector = aperi::GetComponentsAndValues(boundary_condition_node);

    // Get the type of boundary condition, lowercase
    auto type = boundary_condition.begin()->first.as<std::string>();
    std::transform(type.begin(), type.end(), type.begin(), ::tolower);

    // Get the velocity and acceleration time functions
    std::array<std::function<double(double)>, 3> time_functions = SetTimeFunctions(boundary_condition_node, type, solver_type);

    // Get the active time range
    std::pair<double, double> active_time_range = aperi::GetActiveTimeRange(boundary_condition_node);

    // Loop over sets from boundary condition
    std::vector<std::string> sets;
    if (boundary_condition_node["sets"]) {
        sets = boundary_condition_node["sets"].as<std::vector<std::string>>();
    }

    return std::make_shared<BoundaryCondition>(component_value_vector, time_functions, solver_type, sets, mesh_data, active_time_range.first, active_time_range.second);
}

}  // namespace aperi
