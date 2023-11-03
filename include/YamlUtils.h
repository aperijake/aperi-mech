#pragma once

#include <yaml-cpp/yaml.h>

#include <iostream>  // for cerr, cout, endl
#include <string>    // for string
#include <utility>   // for pair
#include <vector>    // for vector

namespace acm {

// Get a YAML node, checking if it exists
inline std::pair<YAML::Node, int> GetNode(const YAML::Node& node, const std::string& name) {
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
inline std::pair<T, int> GetScalarValue(const YAML::Node& node, const std::string& name, bool verbose = false) {
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

// Get a sequence of values, checking if it exists
template <typename T>
inline std::pair<std::vector<T>, int> GetValueSequence(const YAML::Node& node, const std::string& name, bool verbose = false) {
    std::vector<T> values;
    int return_code = 0;
    if (!node[name.c_str()].IsDefined()) {
        std::cerr << "Error: " << name << " not found." << std::endl;
        return_code = 1;
    } else if (!node[name].IsSequence()) {
        std::cerr << "Error: " << name << " must be a sequence." << std::endl;
        return_code = 1;
    }

    try {
        for (const auto& value : node[name]) {
            values.push_back(value.as<T>());
        }
        if (verbose) {
            std::cout << name << ": ";
            for (const auto& value : values) {
                std::cout << value << " ";
            }
            std::cout << std::endl;
        }
    } catch (const YAML::Exception& e) {
        std::cerr << "Error reading " << name << ". Not a sequence?: " << e.what() << std::endl;
        return_code = 1;
    }
    return std::make_pair(values, return_code);
}

}  // namespace acm