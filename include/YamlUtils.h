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
    if (node.Type() == YAML::NodeType::Sequence) {
        // Loop through sequence to find node
        try {
            for (const auto& node_i : node) {
                if (node_i[name.c_str()].IsDefined()) {
                    value = node_i[name.c_str()].as<YAML::Node>();
                    return std::make_pair(value, return_code);
                }
            }
        } catch (const YAML::Exception& e) {
            std::cerr << "Error reading '" << name << "' as a sequence. " << e.what() << std::endl;
            return_code = 1;
        }
    }
    if (!node[name.c_str()].IsDefined()) {
        std::cerr << "Error: '" << name << "' not found in:\n " << node << ". Of type: " << node.Type() << "." << std::endl;
        return_code = 1;
    }
    try {
        value = node[name].as<YAML::Node>();
    } catch (const YAML::Exception& e) {
        std::cerr << "Error reading '" << name << "'. " << e.what() << std::endl;
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
        std::cerr << "Error: " << name << " not found in:\n " << node << "." << std::endl;
        return_code = 1;
    } else if (!node[name].IsScalar()) {
        std::cerr << "Error: " << name << " must be a scalar value. Found: " << node[name].Type() << "." << std::endl;
        return_code = 1;
    }

    try {
        value = node[name].as<T>();
        if (verbose) {
            std::cout << name << ": " << value << std::endl;
        }
    } catch (const YAML::Exception& e) {
        std::cerr << "Error reading '" << name << "'. " << e.what() << std::endl;
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
        std::cerr << "Error: '" << name << "' not found in:\n " << node << "." << std::endl;
        return_code = 1;
    } else if (!node[name].IsSequence()) {
        std::cerr << "Error: '" << name << "' must be a sequence. Found: " << node[name].Type() << "." << std::endl;
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
        std::cerr << "Error reading sequence '" << name << "'. " << e.what() << std::endl;
        return_code = 1;
    }
    return std::make_pair(values, return_code);
}

// Get a value sequence and check that it is a valid direction vector
inline std::pair<std::vector<double>, int> GetDirectionVector(const YAML::Node& node, const std::string& name, bool verbose = false) {
    std::pair<std::vector<double>, int> values_pair = GetValueSequence<double>(node, name, verbose);
    std::vector<double> values = values_pair.first;
    int return_code = values_pair.second;
    if (values.size() != 3) {
        std::cerr << "Error: direction vector '" << name << "' must be a vector of length 3. Found: " << values.size() << "." << std::endl;
        return_code = 1;
    }
    bool has_value = false;
    for (const auto& value : values) {
        if (value != 0) has_value = true;
    }
    if (!has_value) {
        std::cerr << "Error: direction vector '" << name << "' must have at least one non-zero value." << std::endl;
        return_code = 1;
    }
    return std::make_pair(values, return_code);
}

// Get a value or sequence of values, checking if it exists
inline std::pair<std::vector<YAML::Node>, int> GetValueOrValueSequence(const YAML::Node& node, const std::string& name, bool verbose = false) {
    std::vector<YAML::Node> values;
    int return_code = 0;
    if (!node[name.c_str()].IsDefined()) {
        std::cerr << "Error: " << name << " not found in:\n " << node << "." << std::endl;
        return_code = 1;
    } else if (node[name].IsSequence()) {
        return GetValueSequence<YAML::Node>(node, name, verbose);
    } else {
        try {
            values.push_back(node[name].as<YAML::Node>());
            if (verbose) {
                std::cout << name << ": " << values[0] << std::endl;
            }
        } catch (const YAML::Exception& e) {
            std::cerr << "Error reading '" << name << "'." << e.what() << std::endl;
            return_code = 1;
        }
    }
    return std::make_pair(values, return_code);
}

}  // namespace acm