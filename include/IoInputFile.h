#pragma once
#include <yaml-cpp/yaml.h>

#include <iostream>   // for cerr
#include <stdexcept>  // for runtime_error
#include <string>     // for string
#include <utility>    // for pair
#include <vector>     // for vector

#include "Constants.h"
#include "MathUtils.h"
#include "YamlUtils.h"

namespace aperi {

/**
 * @class IoInputFile
 * @brief Class for handling input files in YAML format.
 *
 * This class provides methods for reading from and writing to YAML files,
 * as well as accessing specific data within the files.
 */
class IoInputFile {
   public:
    IoInputFile(std::string filename, bool check_input = true) : m_filename(filename) {
        int return_code = Read();
        if (return_code != 0) throw std::runtime_error("Error reading input file");
        if (check_input && CheckInputWithSchema() != 0) throw std::runtime_error("Error checking input file");
    };

    IoInputFile(const YAML::Node& yaml_data) : m_yaml_file(yaml_data) {
        if (CheckInputWithSchema() != 0) throw std::runtime_error("Error checking input file");
    };

    int Read();
    int CheckInputWithSchema(bool verbose = false);
    static int Write(const std::string& filename, const YAML::Node& yaml_data);

    // Get mesh file for a specific procedure id
    std::string GetMeshFile(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node geometry_node = procedures_node_pair.first[procedure_id].begin()->second["geometry"];
        std::pair<std::string, int> string_pair = GetScalarValue<std::string>(geometry_node, "mesh");
        if (exit_on_error && string_pair.second != 0) throw std::runtime_error("Error getting mesh file");
        return string_pair.first;
    }

    // Get the mesh search directories for a specific procedure id
    std::vector<std::string> GetMeshSearchDirectories(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node geometry_node = procedures_node_pair.first[procedure_id].begin()->second["geometry"];
        // Check if mesh_search_directories are defined, if not return empty vector
        // TODO(jake): this is a hack, fix this. Should use schema to check if mesh_search_directories are optional
        if (!geometry_node["mesh_search_directories"].IsDefined()) {
            return std::vector<std::string>();
        }
        std::pair<std::vector<std::string>, int> string_pair = GetValueSequence<std::string>(geometry_node, "mesh_search_directories");
        if (exit_on_error && string_pair.second != 0) throw std::runtime_error("Error getting mesh search directories");
        return string_pair.first;
    }

    // Get output file for a specific procedure id
    std::string GetOutputFile(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        std::pair<YAML::Node, int> node_pair = GetNode(procedure_node, "output");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting output file");
        YAML::Node node = node_pair.first;
        return GetScalarValue<std::string>(node, "file").first;
    }

    // Get initial conditions for a specific procedure id
    std::vector<YAML::Node> GetInitialConditions(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        // Check if initial_conditions are defined, if not return empty vector
        // TODO(jake): this is a hack, fix this. Should use schema to check if initial_conditions are optional
        if (!procedure_node["initial_conditions"].IsDefined()) {
            return std::vector<YAML::Node>();
        }
        std::pair<std::vector<YAML::Node>, int> node_pair = GetValueSequence<YAML::Node>(procedure_node, "initial_conditions");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting initial conditions");
        return node_pair.first;
    }

    // Get parts for a specific procedure id
    std::vector<YAML::Node> GetParts(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node geometry_node = procedures_node_pair.first[procedure_id].begin()->second["geometry"];
        std::pair<std::vector<YAML::Node>, int> node_pair = GetValueSequence<YAML::Node>(geometry_node, "parts");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting parts");
        std::vector<YAML::Node> parts;
        // Strip off outer part node
        for (const auto& part : node_pair.first) {
            std::pair<YAML::Node, int> part_pair = GetNode(part, "part");
            if (exit_on_error && part_pair.second != 0) throw std::runtime_error("Error getting part");
            parts.push_back(part_pair.first);
        }
        return parts;
    }

    // Get loads for a specific procedure id
    std::vector<YAML::Node> GetLoads(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        // Check if loads are defined, if not return empty vector
        // TODO(jake): this is a hack, fix this. Should use schema to check if loads are optional
        if (!procedure_node["loads"].IsDefined()) {
            return std::vector<YAML::Node>();
        }
        std::pair<std::vector<YAML::Node>, int> node_pair = GetValueSequence<YAML::Node>(procedure_node, "loads");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting loads");
        return node_pair.first;
    }

    // Get contact specs for a specific procedure id
    std::vector<YAML::Node> GetContact(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        // Check if contact is defined, if not return empty vector
        // TODO(jake): this is a hack, fix this. Should use schema to check if contact is optional
        if (!procedure_node["contact"].IsDefined()) {
            return std::vector<YAML::Node>();
        }
        std::pair<std::vector<YAML::Node>, int> node_pair = GetValueSequence<YAML::Node>(procedure_node, "contact");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting contact specs");
        return node_pair.first;
    }

    // Get boundary conditions for a specific procedure id
    std::vector<YAML::Node> GetBoundaryConditions(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        // Check if boundary_conditions are defined, if not return empty vector
        // TODO(jake): this is a hack, fix this. Should use schema to check if boundary_conditions are optional
        if (!procedure_node["boundary_conditions"].IsDefined()) {
            return std::vector<YAML::Node>();
        }
        std::pair<std::vector<YAML::Node>, int> node_pair = GetValueSequence<YAML::Node>(procedure_node, "boundary_conditions");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting boundary conditions");
        return node_pair.first;
    }

    // Get the Lagrangian formulation type
    LagrangianFormulationType GetLagrangianFormulationType(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        // If lagrangian_formulation is not defined, default to false
        if (!procedure_node["lagrangian_formulation"].IsDefined()) {
            return LagrangianFormulationType::Total;
        }
        // Check if the lagrangian_formulation is a map
        if (!procedure_node["lagrangian_formulation"].IsMap()) {
            if (exit_on_error) throw std::runtime_error("Error getting Lagrangian formulation type. 'lagrangian_formulation' must be a map.");
            return LagrangianFormulationType::Total;
        }
        YAML::Node lagrangian_node = procedure_node["lagrangian_formulation"];

        // Check if the lagrangian_formulation has a "total" key
        if (lagrangian_node["total"]) {
            return LagrangianFormulationType::Total;
        }

        // Check if the lagrangian_formulation has an "updated" key
        if (lagrangian_node["updated"]) {
            return LagrangianFormulationType::Updated;
        }

        // Check if the lagrangian_formulation has a "semi" key
        if (lagrangian_node["semi"]) {
            return LagrangianFormulationType::Semi;
        } else {
            if (exit_on_error) throw std::runtime_error("Error getting Lagrangian formulation type. Must have 'total', 'updated', or 'semi' key.");
            return LagrangianFormulationType::Total;
        }
    }

    // Get the time stepper for a specific procedure id
    YAML::Node GetTimeStepper(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        std::pair<YAML::Node, int> node_pair = GetNode(procedure_node, "time_stepper");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting time stepper");
        return node_pair.first;
    }

    // Get the output scheduler for a specific procedure id
    YAML::Node GetOutputScheduler(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        std::pair<YAML::Node, int> node_pair = GetNode(procedure_node, "output");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting output scheduler");
        return node_pair.first;
    }

    // Get the reference configuration update scheduler for a specific procedure id
    int GetSemiLagrangianConfigurationUpdateInterval(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        std::pair<YAML::Node, int> node_pair = GetNode(procedure_node, "lagrangian_formulation");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting lagrangian formulation");

        // Check if the lagrangian_formulation has a "semi" key
        if (node_pair.first["semi"]) {
            // Get update_interval node
            std::pair<int, int> update_interval_pair = GetScalarValue<int>(node_pair.first["semi"], "update_interval");
            if (exit_on_error && update_interval_pair.second != 0) throw std::runtime_error("Error getting update interval.");
            return update_interval_pair.first;
        } else {
            if (exit_on_error) throw std::runtime_error("Error getting reference configuration update scheduler. Must have 'semi' key.");
            return -1;
        }
    }

    // Get material from a part
    static YAML::Node GetMaterialFromPart(const YAML::Node& part, bool exit_on_error = true) {
        std::pair<YAML::Node, int> node_pair = GetNode(part, "material");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting material");
        return node_pair.first;
    }

   private:
    std::string m_filename;
    YAML::Node m_yaml_file;
};

// Get component and value pairs
inline std::vector<std::pair<size_t, double>> GetComponentsAndValues(const YAML::Node& parent_node, bool exit_on_error = true) {
    std::vector<std::pair<size_t, double>> component_value_pair;
    if (parent_node["vector"]) {
        // Get the magnitude and direction, and change the length to match the magnitude
        const double magnitude = parent_node["vector"]["magnitude"].as<double>();
        std::vector<double> values = parent_node["vector"]["direction"].as<std::vector<double>>();
        aperi::ChangeLength(values, magnitude);
        for (size_t i = 0; i < values.size(); ++i) {
            component_value_pair.push_back(std::make_pair(i, values[i]));
        }
    } else if (parent_node["components"]) {
        // Loop over the yaml nodes
        if (parent_node["components"]["X"]) {
            component_value_pair.push_back(std::make_pair(0, parent_node["components"]["X"].as<double>()));
        }
        if (parent_node["components"]["Y"]) {
            component_value_pair.push_back(std::make_pair(1, parent_node["components"]["Y"].as<double>()));
        }
        if (parent_node["components"]["Z"]) {
            component_value_pair.push_back(std::make_pair(2, parent_node["components"]["Z"].as<double>()));
        }
    } else {
        if (exit_on_error) throw std::runtime_error("Error getting component and value pairs. Needs to be a 'vector' or 'components' node.");
    }
    return component_value_pair;
}

// Get the time function
inline std::function<double(double)> GetTimeFunction(const YAML::Node& node_containing_time_function) {
    // Create a velocity vs time function
    std::function<double(double)> time_function;

    // Check if the node contains a time function
    if (!node_containing_time_function["time_function"]) {
        // Return a constant function if no time function is provided
        return [](double /*time*/) { return 1.0; };
    }

    // Get the time function node
    const YAML::Node time_function_node = node_containing_time_function["time_function"].begin()->second;

    // Get the type of time function
    auto time_function_type = node_containing_time_function["time_function"].begin()->first.as<std::string>();

    // Get the abscissa and ordinate
    auto abscissa = time_function_node["abscissa_values"].as<std::vector<double>>();
    auto ordinate = time_function_node["ordinate_values"].as<std::vector<double>>();

    if (abscissa.size() != ordinate.size()) {
        throw std::runtime_error("Abscissa and ordinate vectors must be the same size.");
    }
    if (abscissa.empty()) {
        throw std::runtime_error("Abscissa and ordinate vectors must have at least one value.");
    }

    // Set the time function
    if (time_function_type == "ramp_function") {
        time_function = [abscissa, ordinate](double time) {
            return aperi::LinearInterpolation(time, abscissa, ordinate);
        };
    } else if (time_function_type == "smooth_step_function") {
        time_function = [abscissa, ordinate](double time) {
            return aperi::SmoothStepInterpolation(time, abscissa, ordinate);
        };
    } else {
        throw std::runtime_error("Time function type '" + time_function_type + "' not found.");
    }
    return time_function;
}

// Get the active time range
inline std::pair<double, double> GetActiveTimeRange(const YAML::Node& node_containing_time_range) {
    // Check if the node contains an active time range
    if (!node_containing_time_range["active_time_range"]) {
        return {0.0, std::numeric_limits<double>::max()};
    }

    // Get the active time range node
    const YAML::Node active_time_range_node = node_containing_time_range["active_time_range"];

    // Get the start and end times
    double start_time = active_time_range_node["time_start"].as<double>();
    double end_time = active_time_range_node["time_end"].as<double>();

    return {start_time, end_time};
}

// IoInputFile factory function
inline std::unique_ptr<IoInputFile> CreateIoInputFile(std::string filename, bool check_input = true) {
    return std::make_unique<IoInputFile>(filename, check_input);
}

inline std::unique_ptr<IoInputFile> CreateIoInputFile(const YAML::Node& yaml_data) {
    return std::make_unique<IoInputFile>(yaml_data);
}

// Recursive function to check subitems against a schema
int RecursiveCheckSubitems(const std::vector<YAML::Node>& input_nodes, const YAML::Node& schema_sub_node, bool verbose);

}  // namespace aperi