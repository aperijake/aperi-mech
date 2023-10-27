#include "IoInputFile.h"

#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

int IoInputFile::Read() {
    try {
        // Load and the YAML input file
        m_yaml_file = YAML::LoadFile(m_filename);
    } catch (const YAML::Exception& e) {
        std::cerr << "Error reading YAML input file: " << e.what() << std::endl;
        return 1;
    }
    return 0;
}

int IoInputFile::Write(const std::string& filename, const YAML::Node& yaml_data) {
    int return_code = 0;
    try {
        // Open a file for writing
        std::ofstream out_file(filename);

        // Check if the file is open
        if (out_file.is_open()) {
            // Write data to the file
            out_file << yaml_data;
            out_file.close();
            std::cout << "YAML file successfully written." << std::endl;
        } else {
            std::cerr << "Error: Unable to open the file for writing." << std::endl;
            return_code = 1;
        }
    } catch (const YAML::Exception& e) {
        std::cerr << "Error writing YAML file: " << e.what() << std::endl;
        return_code = 1;
    }
    return return_code;
}

// Make sure the input file is valid
int IoInputFile::CheckInput(bool verbose) const {
    int return_code = 0;

    // Check if mesh file exists
    std::pair<YAML::Node, int> mesh_node_pair = GetNode(m_yaml_file, "mesh");
    if (mesh_node_pair.second) {
        return_code = 1;
    } else {
        if (GetScalarValue<std::string>(mesh_node_pair.first, "file", verbose).second) return_code = 1;
    }

    // Check if output file exists
    std::pair<YAML::Node, int> output_node_pair = GetNode(m_yaml_file, "output");
    if (output_node_pair.second) {
        return_code = 1;
    } else {
        if (GetScalarValue<std::string>(output_node_pair.first, "file", verbose).second) return_code = 1;
    }

    // Check if initial conditions are valid
    std::vector<YAML::Node> initial_conditions = GetInitialConditions();
    if (verbose) std::cout << "Initial Conditions:" << std::endl;
    for (const auto& initial_condition : initial_conditions) {
        std::pair<std::string, int> type_pair = GetScalarValue<std::string>(initial_condition, "type", verbose);
        if (type_pair.second) {
            return_code = 1;
        } else if (type_pair.first != "velocity") {
            std::cerr << "Error: Initial condition type must be velocity." << std::endl;
            return_code = 1;
        }
        if (GetScalarValue<std::string>(initial_condition, "name", verbose).second) return_code = 1;
        if (GetScalarValue<std::string>(initial_condition, "location", verbose).second) return_code = 1;
        if (GetScalarValue<double>(initial_condition, "magnitude", verbose).second) return_code = 1;

        std::pair<std::vector<double>, int> direction_pair = GetValueSequence<double>(initial_condition, "direction", verbose);
        if (direction_pair.second) {
            return_code = 1;
        } else {
            if (direction_pair.first.size() != 3) {
                std::cout << "Error: Direction should have three items. Has: " << direction_pair.first.size() << std::endl;
                return_code = 1;
            } else {
                bool has_value = false;
                for (const auto& direction : direction_pair.first) {
                    if (direction != 0) has_value = true;
                }
                if (!has_value) {
                    std::cout << "Error: Direction must have at least one non-zero value." << std::endl;
                    return_code = 1;
                }
            }
        }
    }
    return return_code;
}