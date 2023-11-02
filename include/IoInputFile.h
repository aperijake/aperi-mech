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
        if (check_input && CheckInput() != 0) throw std::runtime_error("Error checking input file");
    };

    int Read();
    int CheckInput(bool verbose = false) const;
    static int Write(const std::string& filename, const YAML::Node& yaml_data);

    // Accessors
    std::string GetMeshFile(bool exit_on_error = false) const {
        std::pair<YAML::Node, int> node_pair = GetNode(m_yaml_file, "mesh");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting mesh file");
        YAML::Node node = node_pair.first;
        return GetScalarValue<std::string>(node, "file").first;
    }

    std::string GetOutputFile(bool exit_on_error = false) const {
        std::pair<YAML::Node, int> node_pair = GetNode(m_yaml_file, "output");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting output file");
        YAML::Node node = node_pair.first;
        return GetScalarValue<std::string>(node, "file").first;
    }

    std::vector<YAML::Node> GetInitialConditions(bool exit_on_error = false) const {
        std::pair<std::vector<YAML::Node>, int> node_pair = GetValueSequence<YAML::Node>(m_yaml_file, "initial_conditions");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting initial conditions");
        return node_pair.first;
    }

    std::vector<YAML::Node> GetParts(bool exit_on_error = false) const {
        std::pair<std::vector<YAML::Node>, int> node_pair = GetValueSequence<YAML::Node>(m_yaml_file, "parts");
        if (exit_on_error && node_pair.second != 0) throw std::runtime_error("Error getting parts");
        return node_pair.first;
    }

   private:
    std::string m_filename;
    YAML::Node m_yaml_file;
};

// IoInputFile factory function
inline std::unique_ptr<IoInputFile> CreateIoInputFile(std::string filename, bool check_input = true) {
    return std::make_unique<IoInputFile>(filename, check_input);
}

}  // namespace acm