#include "IoInputFile.h"

#include <yaml-cpp/yaml.h>

#include <filesystem>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>

namespace acm {
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
            if (!(out_file << yaml_data)) throw YAML::Exception(YAML::Mark::null_mark(), "Error writing YAML file.");
            out_file.close();
            std::cout << "YAML file successfully written." << std::endl;
        } else {
            throw YAML::Exception(YAML::Mark::null_mark(), "Unable to open the file for writing.");
        }
    } catch (const YAML::Exception& e) {
        std::cerr << "Error writing YAML file: " << e.what() << std::endl;
        return_code = 1;
    }
    return return_code;
}

bool IsValidDirection(const std::pair<std::vector<double>, int>& direction_pair) {
    if (direction_pair.second) {
        return false;
    }
    if (direction_pair.first.size() != 3) {
        std::cout << "Error: Direction should have three items. Has: " << direction_pair.first.size() << std::endl;
        return false;
    }
    bool has_value = false;
    for (const auto& direction : direction_pair.first) {
        if (direction != 0) has_value = true;
    }
    if (!has_value) {
        std::cout << "Error: Direction must have at least one non-zero value." << std::endl;
        return false;
    }
    return true;
}

std::pair<std::map<std::string, YAML::Node>, int> GetInputNodes(const YAML::Node& input_node, const std::map<std::string, std::string>& names_types, bool verbose = false) {
    // Loop through one_or_more_of_names_types
    std::map<std::string, YAML::Node> found_names_and_nodes;
    int found_count = 0;
    for (const auto& name_type : names_types) {
        std::string type = name_type.second;
        std::string name = name_type.first;
        // Look for schema info in input file
        if (type == "map" || type == "sequence") {
            std::pair<YAML::Node, int> node_pair = GetNode(input_node, name);
            if (!node_pair.second) {
                found_names_and_nodes.emplace(name, node_pair.first);
                ++found_count;
            }
        } else if (type == "float") {
            std::pair<double, int> scalar_pair = GetScalarValue<double>(input_node, name, verbose);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "string") {
            std::pair<std::string, int> scalar_pair = GetScalarValue<std::string>(input_node, name, verbose);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else if (type == "double_list") {
            std::pair<std::vector<double>, int> scalar_pair = GetValueSequence<double>(input_node, name, verbose);
            if (!scalar_pair.second) {
                ++found_count;
            }
        } else {
            throw std::runtime_error("Schema Error: 'one_or_more_of' subitems must be of type 'node', 'float', 'string', or 'double_list'.");
        }
    }
    return std::make_pair(found_names_and_nodes, found_count);
}

std::map<std::string, std::string> ParseSubitemSchema(const YAML::Node& schema_item_node, const std::string& subitem_string, bool verbose = false) {
    std::pair<std::vector<YAML::Node>, int> schema_subitems_pair = GetValueSequence<YAML::Node>(schema_item_node, subitem_string, verbose);
    std::vector<YAML::Node> schema_subitems = schema_subitems_pair.first;
    std::map<std::string, std::string> schema_subitems_names_types;
    for (const auto& schema_item : schema_subitems) {
        // Get schema info
        std::string node_name = schema_item.begin()->first.as<std::string>();
        std::pair<YAML::Node, int> node_pair = GetNode(schema_item, node_name);
        if (node_pair.second) {
            throw std::runtime_error("Schema Error: items node '" + node_name + "' not found.");
        }
        std::pair<std::string, int> type_pair = GetScalarValue<std::string>(node_pair.first, "type", verbose);
        if (type_pair.second) {
            throw std::runtime_error("Schema Error: 'type' node not found for item '" + node_name + "'.");
        }
        schema_subitems_names_types.emplace(node_name, type_pair.first);
    }
    // Check schema correctness
    if (schema_subitems_names_types.size() == 0) {
        throw std::runtime_error("Schema Error: '" + subitem_string + "' node must have at least one item.");
    }
    return schema_subitems_names_types;
}

std::pair<std::vector<std::pair<YAML::Node, YAML::Node>>, int> ParseSubitems(const YAML::Node& input_node, const std::vector<YAML::Node>& schema_subitems, bool verbose = false) {
    // Debugging
    bool debug = false;
    if (debug) {
        std::cout << "\n\n#############################" << std::endl;
        std::cout << "Parsing subitems." << std::endl;
        std::cout << "\nSchema:" << std::endl;
        for (const auto& schema_subitem : schema_subitems) {
            std::cout << schema_subitem << " " << std::endl;
        }
        std::cout << "\nInput:\n"
                  << input_node << std::endl;
        std::cout << "-----------------------------\n\n"
                  << std::endl;
    }
    std::vector<std::pair<YAML::Node, YAML::Node>> found_nodes_and_associated_schema;
    int return_code = 0;
    // Loop over schema_subitems
    for (const auto& schema_subitem : schema_subitems) {
        // Handle one_or_more_of
        if (schema_subitem["one_or_more_of"].IsDefined()) {
            // Map from schema_subitem name to type
            std::map<std::string, std::string> one_or_more_of_names_types = ParseSubitemSchema(schema_subitem, "one_or_more_of", verbose);

            // Check input_node for the correct subitems / type and return the ones that are nodes for recursive checking. Also return the number of found subitems
            std::pair<std::map<std::string, YAML::Node>, int> found_one_or_more_of_pair = GetInputNodes(input_node, one_or_more_of_names_types, verbose);

            // Make sure at least one schema_subitem is found
            if (found_one_or_more_of_pair.second == 0) {
                std::cerr << "Error: 'one_or_more_of' subitems must have at least one schema_subitem." << std::endl;
                return_code = 1;
            }

            // Map found nodes to associated schema
            for (const auto& found_node : found_one_or_more_of_pair.first) {
                std::string name = found_node.first;
                std::pair<YAML::Node, int> node_pair = GetNode(schema_subitem["one_or_more_of"], name);
                if (node_pair.second) {
                    throw std::runtime_error("Schema Error: items node '" + name + "' not found.");
                }
                found_nodes_and_associated_schema.push_back(std::make_pair(found_node.second, node_pair.first));
                // Debugging
                if (debug) {
                    std::cout << "#####################" << std::endl;
                    std::cout << "\nFound in ParseSubitems:" << std::endl;
                    std::cout << "\nName: " << name << std::endl;
                    std::cout << "\nFound node:" << std::endl;
                    std::cout << found_node.second << std::endl;
                    std::cout << "\nAssociated schema:" << std::endl;
                    std::cout << node_pair.first << std::endl;
                    std::cout << "----------------------" << std::endl;
                }
            }
        }

        // Handle one_of
        if (schema_subitem["one_of"].IsDefined()) {
            std::map<std::string, std::string> one_of_names_types = ParseSubitemSchema(schema_subitem, "one_of", verbose);
            std::pair<std::map<std::string, YAML::Node>, int> found_one_of_pair = GetInputNodes(input_node, one_of_names_types, verbose);

            // Make sure only one schema_subitem is found
            if (found_one_of_pair.second != 1) {
                std::cerr << "Error: 'one_of' subitems must have one and only one schema_subitem." << std::endl;
                return_code = 1;
            }

            // Map found nodes to associated schema
            for (const auto& found_node : found_one_of_pair.first) {
                std::string name = found_node.first;
                std::pair<YAML::Node, int> node_pair = GetNode(schema_subitem["one_of"], name);
                if (node_pair.second) {
                    throw std::runtime_error("Schema Error: items node '" + name + "' not found.");
                }
                found_nodes_and_associated_schema.push_back(std::make_pair(found_node.second, node_pair.first));
            }
        }

        // Handle all_of
        if (schema_subitem["all_of"].IsDefined()) {
            std::map<std::string, std::string> all_of_names_types = ParseSubitemSchema(schema_subitem, "all_of", verbose);
            std::pair<std::map<std::string, YAML::Node>, int> found_all_of_pair = GetInputNodes(input_node, all_of_names_types, verbose);

            // Make sure all subitems are found
            if (found_all_of_pair.second != (int)all_of_names_types.size()) {
                std::cerr << "Error: 'all_of' subitems must have all subitems." << std::endl;
                return_code = 1;
            }

            // Map found nodes to associated schema
            for (const auto& found_node : found_all_of_pair.first) {
                std::string name = found_node.first;
                std::pair<YAML::Node, int> node_pair = GetNode(schema_subitem["all_of"], name);
                if (node_pair.second) {
                    throw std::runtime_error("Schema Error: items node '" + name + "' not found.");
                }
                found_nodes_and_associated_schema.push_back(std::make_pair(found_node.second, node_pair.first));
            }
        }

        // Handle optional
        if (schema_subitem["optional"].IsDefined()) {
            std::map<std::string, std::string> optional_names_types = ParseSubitemSchema(schema_subitem, "optional", verbose);
            std::pair<std::map<std::string, YAML::Node>, int> found_optional_pair = GetInputNodes(input_node, optional_names_types, verbose);

            // Map found nodes to associated schema
            for (const auto& found_node : found_optional_pair.first) {
                std::string name = found_node.first;
                std::pair<YAML::Node, int> node_pair = GetNode(schema_subitem["optional"], name);
                if (node_pair.second) {
                    throw std::runtime_error("Schema Error: items node '" + name + "' not found.");
                }
                found_nodes_and_associated_schema.push_back(std::make_pair(found_node.second, node_pair.first));
            }
        }
    }
    return std::make_pair(found_nodes_and_associated_schema, return_code);
}

int RecursiveCheckSubitems(const std::vector<YAML::Node>& input_nodes, const YAML::Node& schema_sub_node, bool verbose) {
    bool debug = false;

    if (debug) {
        static int count = 0;
        std::cout << "\n\n#############################" << std::endl;
        std::cout << "Recursive check subitems: " << count << std::endl;
        count++;
        std::cout << "-----------------------------\n\n"
                  << std::endl;
    }

    std::pair<std::vector<YAML::Node>, int> schema_sub_node_subitems_pair = GetValueOrValueSequence(schema_sub_node, "subitems", verbose);
    if (schema_sub_node_subitems_pair.second) {
        std::string sub_node_name = schema_sub_node.begin()->first.as<std::string>();
        throw std::runtime_error("Schema Error: 'subitems' node not found in '" + sub_node_name + "'.");
    }
    std::vector<YAML::Node> schema_sub_node_subitems = schema_sub_node_subitems_pair.first;

    // Read input node
    int return_code = 0;
    // Loop over input_nodes
    for (const auto& input_node : input_nodes) {
        // Get nodes in next level of schema, check input on this level
        std::pair<std::vector<std::pair<YAML::Node, YAML::Node>>, int> found_input_nodes_and_associated_schema_pair = ParseSubitems(input_node, schema_sub_node_subitems, verbose);
        if (found_input_nodes_and_associated_schema_pair.second) {
            return_code = 1;
        }
        std::vector<std::pair<YAML::Node, YAML::Node>> found_input_nodes_and_associated_schema = found_input_nodes_and_associated_schema_pair.first;  // Example: vector of pairs of explicit_dynamic_procedure and schema for explicit_dynamic_procedure

        // Recursively check the found_nodes
        for (const auto& found_input_node_and_associated_schema : found_input_nodes_and_associated_schema) {
            int recursive_return_code = RecursiveCheckSubitems({found_input_node_and_associated_schema.first}, found_input_node_and_associated_schema.second, verbose);
            if (recursive_return_code) {
                return_code = 1;
            }
        }
    }

    return return_code;
}

int IoInputFile::CheckInputWithSchema(bool verbose) {
    try {
        // Load and the YAML input file
        m_yaml_schema_file = YAML::LoadFile(m_schema_filename);
    } catch (const YAML::Exception& e) {
        std::cerr << "Schema Error reading YAML schema file: " << e.what() << std::endl;
        return 1;
    }

    // Want to hand it the procedures node in the input file, and the procedures node in the schema file
    // Get schema subitems
    std::pair<YAML::Node, int> schema_sub_node_pair = GetNode(m_yaml_schema_file, "procedures");
    // Throw error if parent node is not found
    if (schema_sub_node_pair.second) {
        std::cerr << "Schema Error: 'procedures' node not found." << std::endl;
        throw std::runtime_error("Schema Error: 'procedures' node not found.");
    }
    YAML::Node schema_sub_node = schema_sub_node_pair.first;

    // Get input parent nodes subsequence
    std::pair<std::vector<YAML::Node>, int> input_nodes_pair = GetValueOrValueSequence(m_yaml_file, "procedures", verbose);
    if (input_nodes_pair.second) {
        std::cerr << "Input Error: 'procedures' node not found." << std::endl;
        throw std::runtime_error("Input Error: 'procedures' node not found.");
    }
    std::vector<YAML::Node> input_nodes = input_nodes_pair.first;  // Example: vector of one explicit_dynamic_procedure

    return RecursiveCheckSubitems(input_nodes, schema_sub_node, verbose);
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

    // Check if parts are valid
    std::pair<std::vector<YAML::Node>, int> parts_pair = GetValueSequence<YAML::Node>(m_yaml_file, "parts", verbose);
    if (parts_pair.second) {
        return_code = 1;
    } else {
        std::vector<YAML::Node> parts = parts_pair.first;
        for (const auto& part : parts) {
            if (GetScalarValue<std::string>(part, "name", verbose).second) return_code = 1;
            if (GetScalarValue<std::string>(part, "location", verbose).second) return_code = 1;
            std::pair<YAML::Node, int> material_model_pair = GetNode(part, "material");
            if (material_model_pair.second) {
                return_code = 1;
            } else {
                YAML::Node material_model = material_model_pair.first;
                if (GetScalarValue<std::string>(material_model, "type", verbose).second) return_code = 1;
                if (GetScalarValue<double>(material_model, "density", verbose).second) return_code = 1;
                if (GetScalarValue<double>(material_model, "youngs_modulus", verbose).second) return_code = 1;
                if (GetScalarValue<double>(material_model, "poissons_ratio", verbose).second) return_code = 1;
            }
        }
    }

    // Check if initial conditions are valid
    std::pair<std::vector<YAML::Node>, int> initial_conditions_pair = GetValueSequence<YAML::Node>(m_yaml_file, "initial_conditions", verbose);
    if (initial_conditions_pair.second) {
        return_code = 1;
    } else {
        std::vector<YAML::Node> initial_conditions = initial_conditions_pair.first;
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
            if (!IsValidDirection(direction_pair)) {
                return_code = 1;
            }
        }
    }

    // Check if loads are valid
    if (m_yaml_file["loads"].IsDefined()) {  // loads are optional
        std::pair<std::vector<YAML::Node>, int> loads_pair = GetValueSequence<YAML::Node>(m_yaml_file, "loads", verbose);
        if (loads_pair.second) {
            return_code = 1;
        } else {
            std::vector<YAML::Node> loads = loads_pair.first;
            for (const auto& load : loads) {
                std::pair<std::string, int> type_pair = GetScalarValue<std::string>(load, "type", verbose);
                if (type_pair.second) {
                    return_code = 1;
                } else if (type_pair.first != "traction" && type_pair.first != "gravity") {
                    std::cerr << "Error: Load type must be traction or gravity." << std::endl;
                    return_code = 1;
                }
                if (GetScalarValue<std::string>(load, "name", verbose).second) return_code = 1;
                if (GetScalarValue<std::string>(load, "location", verbose).second) return_code = 1;
                if (GetScalarValue<double>(load, "magnitude", verbose).second) return_code = 1;

                std::pair<std::vector<double>, int> direction_pair = GetValueSequence<double>(load, "direction", verbose);
                if (!IsValidDirection(direction_pair)) {
                    return_code = 1;
                }
            }
        }
    }
    return return_code;
}

}  // namespace acm