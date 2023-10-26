#pragma once
#include <stdexcept>  // for runtime_error
#include <string>     // for string
#include <vector>     // for vector
#include <yaml-cpp/yaml.h>
#include <utility>  // for pair
#include <iostream> // for cerr

class IoInputFile {
   public:
    IoInputFile(std::string filename) : m_filename(filename) {
        int return_code = Read(m_filename);
        if (return_code != 0) throw std::runtime_error("Error reading input file");
    };

    int Read(const std::string& filename);
    int CheckInput(bool verbose = false) const;
    static int Write(const std::string& filename, const YAML::Node& yaml_data);

    // Accessors
    std::pair<std::string, int> GetMeshFileWithCheck() const {
        std::string mesh_file;
        std::pair<YAML::Node, int> mesh_node_pair = GetNode(yaml_file, "mesh");
        if (mesh_node_pair.second) return std::make_pair(mesh_file, 1);
        YAML::Node mesh_node = mesh_node_pair.first;
        return GetScalarValue<std::string>(mesh_node, "file");
    }
    std::string GetMeshFile() const {
        std::pair<YAML::Node, int> mesh_node_pair = GetNode(yaml_file, "mesh");
        YAML::Node mesh_node = mesh_node_pair.first;
         return GetScalarValue<std::string>(mesh_node, "file").first;
    }

    std::pair<std::string, int> GetOutputFileWithCheck() const {
        std::string output_file;
        std::pair<YAML::Node, int> output_node_pair = GetNode(yaml_file, "output");
        if (output_node_pair.second) return std::make_pair(output_file, 1);
        YAML::Node output_node = output_node_pair.first;
        return GetScalarValue<std::string>(output_node, "file");
    }
    std::string GetOutputFile() const {
        std::pair<YAML::Node, int> output_node_pair = GetNode(yaml_file, "output");
        YAML::Node output_node = output_node_pair.first;
        return GetScalarValue<std::string>(output_node, "file").first;
    }

    std::vector<YAML::Node> GetInitialConditions() const {
        std::vector<YAML::Node> initial_conditions;
        for (const auto& initial_condition : yaml_file["initial_conditions"]) {
            initial_conditions.push_back(initial_condition);
        }
        return initial_conditions;
    }

   private:
    // Get a YAML node, checking if it exists
    std::pair<YAML::Node, int> GetNode(const YAML::Node& node, const std::string& name) const {
        YAML::Node value;
        int return_code = 0;
        if (!node[name.c_str()].IsDefined()) {
            std::cerr << "Error: " << name << " not found." << std::endl;
            return_code = 1;
        }
        try {
            value = node[name].as<YAML::Node>();
        } catch (const YAML::Exception& e) {
            std::cerr << "Error reading " << name << ". Not a node?: " << e.what() << std::endl;
            return_code = 1;
        }
        return std::make_pair(value, return_code);
    }

    // Get a scalar string, checking if it exists
    template <typename T>
    std::pair<T, int> GetScalarValue(const YAML::Node& node, const std::string& name, bool verbose = false) const {
        T value;
        int return_code = 0;
        if (!node[name.c_str()].IsDefined()) {
            std::cerr << "Error: " << name << " not found." << std::endl;
            return_code = 1;
        } else if (!node[name].IsScalar()) {
            std::cerr << "Error: " << name << " must be a scalar value." << std::endl;
            return_code = 1;
        }

        try {
            value = node[name].as<T>();
            if (verbose) {
                std::cout << name << ": " << value << std::endl;
            }
        } catch (const YAML::Exception& e) {
            std::cerr << "Error reading " << name << ". Not a string?: " << e.what() << std::endl;
            return_code = 1;
        }
        return std::make_pair(value, return_code);
    }

    std::string m_filename;
    YAML::Node yaml_file;

};