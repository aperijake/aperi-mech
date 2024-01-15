#pragma once
#include <yaml-cpp/yaml.h>

#include <iostream>   // for cerr
#include <stdexcept>  // for runtime_error
#include <string>     // for string
#include <utility>    // for pair
#include <vector>     // for vector

#include "YamlUtils.h"

namespace acm {
class IoInputFile {
   public:
    IoInputFile(std::string filename, bool check_input = true) : m_filename(filename) {
        int return_code = Read();
        if (return_code != 0) throw std::runtime_error("Error reading input file");
        if (check_input && CheckInputWithSchema() != 0) throw std::runtime_error("Error checking input file");
    };

    IoInputFile(const YAML::Node& yaml_data, bool check_input = true) : m_yaml_file(yaml_data) {
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

    // Get the time stepper for a specific procedure id
    YAML::Node GetTimeStepper(int procedure_id, bool exit_on_error = true) const {
        std::pair<YAML::Node, int> procedures_node_pair = GetNode(m_yaml_file, "procedures");
        if (exit_on_error && procedures_node_pair.second != 0) throw std::runtime_error("Error getting procedures");

        YAML::Node procedure_node = procedures_node_pair.first[procedure_id].begin()->second;
        std::pair<YAML::Node, int> node_pair = GetNode(procedure_node, "time_stepper");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting time stepper");
        return node_pair.first;
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
    std::string m_schema_filename = "../stk-crk/input/input_schema.yaml";  // TODO(jake): fix this to be relative to the executable
    YAML::Node m_yaml_schema_file;
};

// IoInputFile factory function
inline std::unique_ptr<IoInputFile> CreateIoInputFile(std::string filename, bool check_input = true) {
    return std::make_unique<IoInputFile>(filename, check_input);
}

inline std::unique_ptr<IoInputFile> CreateIoInputFile(const YAML::Node& yaml_data, bool check_input = true) {
    return std::make_unique<IoInputFile>(yaml_data, check_input);
}

}  // namespace acm